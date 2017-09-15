package com.hms.service;

import com.hms.dao.*;
import com.hms.pojo.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service("checkoutService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class CheckoutService {
    @Resource(name = "checkinfoMapper")
    private CheckinfoMapper checkinfoMapper;
    @Resource(name = "groupinfoMapper")
    private GroupinfoMapper groupinfoMapper;
    @Resource(name = "billMapper")
    private BillMapper billMapper;
    @Resource(name = "expensetrueMapper")
    private ExpensetrueMapper expensetrueMapper;
    @Resource(name = "roomMapper")
    private RoomMapper roomMapper;

    /**
     * 结账 修改房间信息，bill信息 check信息
     * @param bill
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void checkout(Bill bill){
        Date now = new Date();
        bill.setOtherThree("退房时间："+now);
        billMapper.modify(bill);
        if(bill.getGroupId()!=null){
            for(Checkinfo checkinfo:checkinfoMapper.findByGroupId(bill.getGroupId())){
                checkinfo.setOtherTwo("退房时间："+now);
                checkinfo.setOtherOne("退房");
                Room room = roomMapper.findById(checkinfo.getRoom().getRoomId());
                room.setRoomStatus("空房");

                checkinfoMapper.modify(checkinfo);
                roomMapper.modifyRoom(room);
            }
        }else {
            Checkinfo checkinfo = checkinfoMapper.findById(bill.getCheckId());
            checkinfo.setOtherTwo("退房时间："+now);
            checkinfo.setOtherOne("退房");
            Room room = roomMapper.findById(checkinfo.getRoom().getRoomId());
            room.setRoomStatus("空房");
            checkinfoMapper.modify(checkinfo);
            roomMapper.modifyRoom(room);
        }
    }


    //获取团队入住的账单 根据入住时长更新账单金额
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Bill getBillByGroupCheck(Integer groupId) {
        Groupinfo groupinfo = groupinfoMapper.findById(groupId);
        if (groupinfo == null) {
            return null;
        }
        List<Checkinfo> checkinfos = checkinfoMapper.findByGroupId(groupId);
        if (checkinfos.size() == 0) {
            return null;
        }
        List<Bill> bills = billMapper.findByGroupId(groupId);

        if (bills.size() != 1) {
            System.out.println("group bill 数据逻辑错误");
            return null;
        }
        //*******************************//*
        Bill bill = bills.get(0);
        Double roomprices = 0d;
        Date now = new Date();
        System.out.println(now);
        for (Checkinfo checkinfo : checkinfos) {

            Date out = checkinfo.getPreoutTime();
            Date in = checkinfo.getInTime();
            if (now.getTime() < out.getTime()) {
                //提前
                System.out.println(out.getTime() - now.getTime());
                long td = (out.getTime() - now.getTime()) / (1000 * 60 * 60 * 24l);//提前天
                long th = ((out.getTime() - now.getTime()) % (1000 * 60 * 60 * 24l)) / (1000 * 60 * 60l);//提前小时
                System.out.println(td);
                System.out.println(th);
                if (th > 22) {
                    td++;
                    th = 0;
                } else if (th < 12) {
                    th = 0;
                }
                System.out.println("提前");
                System.out.println(td+";"+th);
                Double p = checkinfo.getSumRoomprice();
                p -= td * checkinfo.getRoomPrice();
                p -= th * checkinfo.getRoomPrice() * 0.1;
                roomprices += p;
            } else {
                //超时
                if (now.getTime() - out.getTime() < 1000 * 60 * 60 * 2) {
                    //2小时内免费
                    roomprices += checkinfo.getSumRoomprice();
                } else {
                    long td = (now.getTime() - out.getTime()) / (1000 * 60 * 60 * 24);//超时天
                    long th = ((now.getTime() - out.getTime()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);//超时小时
                    if (th > 10) {
                        td++;
                        th = 0;
                    }
                    System.out.println("超时");
                    System.out.println(td+";"+th);
                    Double p = checkinfo.getSumRoomprice();
                    p += td * checkinfo.getRoomPrice();
                    p += th * checkinfo.getRoomPrice() * 0.1;
                    roomprices += p;
                }
            }
        }

        bill.setRoomMoney(roomprices);
        bill.setReceive(roomprices);
        List<Expensetrue> expensetrues = expensetrueMapper.findByBillId(bill.getBillId());
        if (expensetrues.size() > 0) {
            Double dp = 0d;
            for (Expensetrue expensetrue : expensetrues) {
                if (expensetrue.getExpensetruePrice() != null && expensetrue.getExpensetrueUnit() != null) {
                    dp += expensetrue.getExpensetruePrice() * expensetrue.getExpensetrueUnit();
                }
            }
            bill.setReceive(bill.getReceive() + dp);
        }
        if(bill.getPrepay()!=null){
            bill.setRemaining(bill.getPrepay()-bill.getReceive());
        }
        bill.setBillRemark("预离时间："+checkinfos.get(0).getPreoutTime());
        billMapper.modify(bill);
        return bill;
    }

    //获取个人入住的账单  根据入住时长更新账单金额
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Bill getBillByOneCheck(Integer checkId) {
        Checkinfo checkinfo = checkinfoMapper.findById(checkId);
        if (checkinfo == null) {
            return null;
        } else {
            List<Bill> bills = billMapper.findByCheckId(checkId);
            if (bills.size() != 1) {
                System.out.println("数据逻辑错误！");
                return null;
            } else {
                Bill bill = bills.get(0);
                Date now = new Date();
                Date out = checkinfo.getPreoutTime();
                Date in = checkinfo.getInTime();
                if (now.getTime() < out.getTime()) {
                    //提前
                    System.out.println("提前退房"+(out.getTime() - now.getTime()));
                    long td = (out.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);//提前天
                    long th = (out.getTime() - (now.getTime()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);//提前小时
                    if (th > 22) {
                        td++;
                        th = 0;
                    } else if (th < 12) {
                        th = 0;
                    }
                    Double p = checkinfo.getSumRoomprice();
                    p -= td * checkinfo.getRoomPrice();
                    p -= th * checkinfo.getRoomPrice() * 0.1;
                    bill.setRoomMoney(p);
                    bill.setDays(checkinfo.getStayHours() - (int) td);
                } else {
                    //超时
                    System.out.println("延期退房");
                    if (now.getTime() - out.getTime() < 1000 * 60 * 60 * 2) {
                        //2小时内免费
                        bill.setRoomMoney(checkinfo.getSumRoomprice());
                        bill.setDays(checkinfo.getStayHours());
                    } else {
                        long td = (now.getTime() - out.getTime()) / (1000 * 60 * 60 * 24);//超时天
                        long th = ((now.getTime() - out.getTime()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);//超时小时
                        if (th > 10) {
                            td++;
                            th = 0;
                        }
                        Double p = checkinfo.getSumRoomprice();
                        p += td * checkinfo.getRoomPrice();
                        p += th * checkinfo.getRoomPrice() * 0.1;
                        bill.setRoomMoney(p);
                        bill.setDays(checkinfo.getStayHours() - (int) td);
                    }
                }
                System.out.println(bill.getRoomMoney());
                bill.setReceive(bill.getRoomMoney());
                List<Expensetrue> expensetrues = expensetrueMapper.findByBillId(bill.getBillId());
                if (expensetrues.size() > 0) {
                    Double dp = 0d;
                    for (Expensetrue expensetrue : expensetrues) {
                        if (expensetrue.getExpensetruePrice() != null && expensetrue.getExpensetrueUnit() != null) {
                            dp += expensetrue.getExpensetruePrice() * expensetrue.getExpensetrueUnit();
                        }
                    }
                    bill.setReceive(bill.getReceive() + dp);
                }
                if (bill.getPrepay() != null) {
                    bill.setRemaining(bill.getPrepay() - bill.getReceive());
                }
                bill.setBillRemark("预离时间："+checkinfo.getPreoutTime());
                billMapper.modify(bill);
                return bill;
            }
        }
    }
}
