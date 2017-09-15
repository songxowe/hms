package com.hms.service;

import com.hms.dao.*;
import com.hms.pojo.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service("checkinAndBookService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class CheckinAndBookService {
    @Resource(name = "checkinfoMapper")
    private CheckinfoMapper checkinfoMapper;
    @Resource(name = "guestMapper")
    private GuestMapper guestMapper;
    @Resource(name = "payMapper")
    private PayMapper payMapper;
    @Resource(name = "groupinfoMapper")
    private GroupinfoMapper groupinfoMapper;
    @Resource(name = "bookMapper")
    private BookMapper bookMapper;
    @Resource(name = "bookroomMapper")
    private BookroomMapper bookroomMapper;
    @Resource(name = "billMapper")
    private BillMapper billMapper;
    @Resource(name = "roomMapper")
    private RoomMapper roomMapper;
    @Resource(name = "memberMapper")
    private MemberMapper memberMapper;
    /**
     * 客户自由入住，生成入住信息、入住人员信息、押金支付信息
     *
     * @param checkinfo
     * @param guests
     * @param pays
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void addCheckinfoWithForeign(Checkinfo checkinfo, List<Guest> guests, List<Pay> pays) {
        checkinfoMapper.add(checkinfo);
        Guest guest;
        Pay pay;
        System.out.println("添加guest");
        for (int i = 0; i < guests.size(); i++) {
            //System.out.println("g"+i);
            guest = guests.get(i);
            guest.setCheckId(checkinfo.getCheckId());
            guest.setRoom(checkinfo.getRoom());
            guestMapper.add(guest);
            //System.out.println("g"+i+"over");
        }
        System.out.println("添加完成guest");
        System.out.println("添加pays");
        Double d = 0d;
        for (int i = 0; i < pays.size(); i++) {
            //System.out.println("p"+i);
            pay = pays.get(i);
            pay.setCheckId(checkinfo.getCheckId());
            payMapper.add(pay);
            //System.out.println("p"+i+"over");
            if(pay.getPrepay()!=null){
                d+=pay.getPrepay();
            }
            if(pay.getPayType().equals("会员卡")){
                Member member = memberMapper.findById(checkinfo.getMemberId());//-----------------------------------findById 获得member
                if(member!=null){
                    if(member.getMemberRemaining()!=null&&pay.getPrepay()!=null)
                        member.setMemberRemaining(member.getMemberRemaining()-pay.getPrepay());
                    memberMapper.modify(member);//-------------------------------------------------调用modify 修改member
                }

            }
        }
        System.out.println("添加完成pays");
        /*******************/         //--------------------------------------------------------------------修改房间状态
        //添加房间入住状态
        Room room = roomMapper.findById(checkinfo.getRoom().getRoomId());
        room.setRoomStatus("入住");
        roomMapper.modifyRoom(room);
        //添加入住账单
        Bill bill = new Bill();
        bill.setDays(checkinfo.getStayHours());
        bill.setCheckId(checkinfo.getCheckId());
        bill.setPrepay(d);
        bill.setRoomMoney(0d);
        bill.setRemaining(d);
        bill.setReceive(0d);
        billMapper.add(bill);
    }

    /**
     * 内部方法
     * 续住修改信息
     *
     * @param addTime 续住时间  单位根据租房方式确定
     * @param checkId 原入住信息编号
     * @param pay     补交费用
     */
    private void ast(Integer addTime, Integer checkId, Pay pay) {
        Checkinfo checkinfo = checkinfoMapper.findById(checkId);
        pay.setOtherOne("原定离期：" + checkinfo.getPreoutTime());
        Date d = checkinfo.getPreoutTime();//退房时间
        Calendar c = Calendar.getInstance();
        c.setTime(d);
        System.out.println("退房时间：" + d);
        if (checkinfo.getCheckType().equals("天房")) {
            System.out.println("天");
            c.add(Calendar.DATE, addTime);

        } else if (checkinfo.getCheckType().equals("钟点房")) {
            c.add(Calendar.HOUR, addTime);
        } else if (checkinfo.getCheckType().equals("月租房")) {
            c.add(Calendar.MONTH, addTime);
        }
        d = c.getTime();
        System.out.println("退房时间：" + d);
        checkinfo.setPreoutTime(d);//退房时间
        //修改入住时长
        checkinfo.setStayHours(checkinfo.getStayHours() + addTime);

        //修改总房价
        ////////如果为团队订房  修改团队信息
        if (checkinfo.getGroupId() != null) {
            pay.setGroupId(checkinfo.getGroupId());
            Groupinfo groupinfo = groupinfoMapper.findById(checkinfo.getGroupId());
            if (groupinfo.getStayHours() < checkinfo.getStayHours()) {
                groupinfo.setStayHours(checkinfo.getStayHours());
            }
            groupinfo.setSumMoney(groupinfo.getSumMoney() + addTime * checkinfo.getRoomPrice());
            groupinfoMapper.modify(groupinfo);
        }
        //设置个人总房价
        checkinfo.setSumRoomprice(checkinfo.getRoomPrice() * checkinfo.getStayHours());
        //修改入住信息
        checkinfoMapper.modify(checkinfo);
        //添加支付信息
        pay.setCheckId(checkinfo.getCheckId());
        pay.setOtherOne(pay.getOtherOne() + " 现定离期：" + checkinfo.getPreoutTime());
        payMapper.add(pay);
        //修改订单信息
        List<Bill> bills = billMapper.findByCheckId(checkId);
        if(bills.size()==1){
            Bill bill = bills.get(0);
            if(bill.getDays()!=null)
                bill.setDays(bill.getDays()+addTime);
            if(pay.getPrepay()!=null||bill.getPrepay()!=null){
                bill.setPrepay(bill.getPrepay()+pay.getPrepay());
            }

        }
        /*******************/

    }

    /**
     * 续住修改信息
     *
     * @param addTime 续住时间  单位根据租房方式确定
     * @param checkId 原入住信息编号
     * @param pay     补交费用
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void addStayTime(Integer addTime, Integer checkId, Pay pay) {
        this.ast(addTime, checkId, pay);
    }

    /**
     * 团队续住
     *
     * @param addTime
     * @param checkId
     * @param pay
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void addGroupStayTime(Integer addTime, Integer checkId, Pay pay) {
        Checkinfo checkinfo = checkinfoMapper.findById(checkId);
        if (checkinfo.getGroupId() != null) {
            List<Checkinfo> checkinfos = checkinfoMapper.findByGroupId(checkinfo.getGroupId());
            for (int i = 0; i < checkinfos.size(); i++) {
                this.ast(addTime, checkinfos.get(i).getCheckId(), pay);
            }
        }
        Groupinfo groupinfo = groupinfoMapper.findById(checkinfo.getGroupId());
        groupinfo.setStayHours(groupinfo.getStayHours()+addTime);
        groupinfoMapper.modify(groupinfo);
        //修改订单信息
        List<Bill> bills = billMapper.findByGroupId(groupinfo.getGroupId());
        if(bills.size()==1){
            Bill bill = bills.get(0);
            if(bill.getDays()!=null)
                bill.setDays(bill.getDays()+addTime);
            if(pay.getPrepay()!=null||bill.getPrepay()!=null){
                bill.setPrepay(bill.getPrepay()+pay.getPrepay());
            }
        }
    }

    /**
     * 换房修改信息
     *
     * @param checkId      原入住信息
     * @param roomcaseId   房价方案id
     * @param roomId       房间id
     * @param roomPrice    房间价格
     * @param changeResult 换房原因   checkinfo  -  other_three
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void roomChange(Integer checkId, Integer roomcaseId, Integer roomId, Double roomPrice, String changeResult) {
        Checkinfo checkinfo = checkinfoMapper.findById(checkId);
        //设置换房原因
        checkinfo.setOtherThree(changeResult);
        //设置换房 房间方案
        RoomCase roomcase = null;//通过findid   roomcaseId获得
        checkinfo.setRoomCase(roomcase);
        //设置换房 房间号
        Room room = new Room();
        room.setRoomId(roomId);
        checkinfo.setRoom(room);
        //设置房价
        checkinfo.setRoomPrice(roomPrice);

        //设置总房价
        Double sumRoomprice = roomPrice * checkinfo.getStayHours();
        ;
        ////////如果为团队订房 修改团队信息
        if (checkinfo.getGroupId() != null) {
            Groupinfo groupinfo = groupinfoMapper.findById(checkinfo.getGroupId());
            groupinfo.setSumMoney(groupinfo.getSumMoney() - checkinfo.getSumRoomprice() + sumRoomprice);
            groupinfoMapper.modify(groupinfo);
        }
        checkinfo.setSumRoomprice(sumRoomprice);
        //修改原房间状态为 打扫中
        /*****************/

        //修改入住人员信息的房间号
        guestMapper.modifyRoomChange(checkId, roomId);
        //修改现房间状态为 使用中
        /*****************/

        //修改入住信息
        checkinfoMapper.modify(checkinfo);


    }

    /**
     * 团队入住 添加信息
     *
     * @param groupinfo  团队信息
     * @param checkinfos 每间房单独入住信息
     * @param guests     入住人员信息
     * @param pays     支付信息
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void addGroupCheck(Groupinfo groupinfo, List<Checkinfo> checkinfos, List<Guest> guests, List<Pay> pays) {
        //添加团队信息
        groupinfoMapper.add(groupinfo);
        //添加支付信息
        System.out.println("checks长度"+checkinfos.size());
        Pay pay;
        Double billmoney = 0d;
        System.out.println("pays.size()"+pays.size());
        for (int i = 0; i < pays.size(); i++) {
            pay = pays.get(i);
            System.out.println(pay.getPayType()+pay.getPrepay());

            pay.setGroupId(groupinfo.getGroupId());
            if(pay.getPrepay()!=null){
            System.out.println("添加pay");
            payMapper.add(pay);
            System.out.println("添加pay成功");

                billmoney+=pay.getPrepay();
            }
            Member member = memberMapper.findById(groupinfo.getMenderId());//-----------------------------------findById 获得member
            if(member!=null){
                if(member.getMemberRemaining()!=null&&pay.getPrepay()!=null)
                    member.setMemberRemaining(member.getMemberRemaining()-pay.getPrepay());
                memberMapper.modify(member);//-------------------------------------------------调用modify 修改member
            }

        }

        /************/
        //添加入住信息
        Checkinfo checkinfo;
        Calendar c = Calendar.getInstance();
        Guest guest;
        Double sum = 0d;
        for (int i = 0; i < checkinfos.size(); i++) {
            checkinfo = checkinfos.get(i);
            checkinfo.setGroupId(groupinfo.getGroupId());//团队id
            checkinfo.setInTime(groupinfo.getInTime());//入住时间
            checkinfo.setStayHours(groupinfo.getStayHours());//时长
            Date d = groupinfo.getInTime();
            c.setTime(d);
            c.add(Calendar.DATE, groupinfo.getStayHours());
            //checkinfo.setPreoutTime(c.getTime());//预离时间
            checkinfo.setCheckType("天房");//入住类型
            checkinfo.setSumRoomprice(checkinfo.getRoomPrice() * groupinfo.getStayHours());//总房价

            sum += checkinfo.getSumRoomprice();
            System.out.println("添加checkinfo");
            checkinfoMapper.add(checkinfo);
            System.out.println("添加checkinfo成功");
            System.out.println(" guests.size()"+ guests.size());
            for (int j = 0; j < guests.size(); j++) {
                guest = guests.get(j);
                guest.setGroupId(groupinfo.getGroupId());//设置团队id
                if (guest.getRoom() != null && checkinfo.getRoom() != null) {
                    if (guest.getRoom().getRoomId() == checkinfo.getRoom().getRoomId()) {
                        guest.setCheckId(checkinfo.getCheckId());
                        guests.set(j,guest);
                    }
                }

            }


            /*****修改房间状态*******///--------------------------------------------------------------------修改房间状态
            //添加房间入住状态
            Room room = roomMapper.findById(checkinfo.getRoom().getRoomId());
            room.setRoomStatus("入住");
            roomMapper.modifyRoom(room);

            //更新groupinfo总房价
            groupinfo.setSumMoney(sum);
            groupinfoMapper.modify(groupinfo);
        }

        for (int j = 0; j < guests.size(); j++) {
            guest = guests.get(j);
            guestMapper.add(guest);
        }
        //上传账单信息
        Bill bill = new Bill();
        bill.setGroupId(groupinfo.getGroupId());
        bill.setDays(groupinfo.getStayHours());
        bill.setRoomMoney(0d);
        bill.setPrepay(billmoney);
        bill.setRemaining(billmoney);
        bill.setReceive(0d);
        billMapper.add(bill);
    }

    /**
     * 预定功能   添加预定信息
     * @param book  预定信息
     * @param bookrooms  预定房间集合
     */

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void addBook(Book book, List<Bookroom> bookrooms){
        bookMapper.add(book);
        Bookroom bookroom;
        for (int i = 0; i < bookrooms.size(); i++) {
            bookroom = bookrooms.get(i);

            bookroom.setBookId(book.getBookId());
            bookroomMapper.add(bookroom);
        }
    }
}
