package com.hms.controller;

import com.hms.pojo.*;
import com.hms.service.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Controller
public class CheckoutController {
    @Resource(name = "billService")
    private BillService billService;
    @Resource(name = "expensetrueService")
    private ExpensetrueService expensetrueService;
    @Resource(name = "checkinfoService")
    private CheckinfoService checkinfoService;
    @Resource(name = "roomService")
    private RoomService roomService;
    @Resource(name = "groupinfoService")
    private GroupinfoService groupinfoService;

    @Resource(name = "checkoutService")
    private CheckoutService checkoutService;
    @Resource(name = "memberService")
    private MemberService memberService;

    //**单房结账
    @RequestMapping(value = "out_over", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String out_over(@RequestParam(required = true, value = "billId") Integer billId,
                           @RequestParam(required = false, value = "remark") String remark,
                           @RequestParam(required = false, value = "payType") String payType,
                           @RequestParam(required = false, value = "price") Double price,
                           @RequestParam(required = true, value = "inmomey") String inmomey,
                           @RequestParam(required = false, value = "memberId") Integer memberId) {
        int count = 0;
        //System.out.println(checkinfo.getInTime());
        System.out.println("out_over-----------");
        Bill bill = billService.findById(billId);
       if(remark!=null)
           bill.setBillRemark(remark);
       if(memberId!=null&&memberId>0){
           //会员信息
           Integer mid = memberId;
           Member member = memberService.findById(memberId);//----------------------------------------实际从memberService获得 通过mid
           if(inmomey.equals("是")){
               //退款
                member.setMemberRemaining(member.getMemberRemaining()+price);
                member.setMemberConsume(member.getMemberConsume()+bill.getPrepay()-price);
           }else {
               //补款
               member.setMemberRemaining(member.getMemberRemaining()-price);
               member.setMemberConsume(member.getMemberConsume()+bill.getPrepay()+price);
           }
           /***********************************************************************///------此处补充member修改方法
           memberService.modify(member);
           System.out.println("修改member");
       }
       checkoutService.checkout(bill);
        count = 1;

        return String.valueOf(count);
    }
    //**获得账单  跳转至bill.jsp
    @RequestMapping(value = "out_getBill", produces = "text/html;charset=UTF-8")
    public String out_getBill(@RequestParam(required = true, value = "roomId") Integer roomId, ModelMap modelMap) {
        String url = "sale/Bill";
        String error = "sale/error";
        int count = 0;
        List<Checkinfo> checkinfos = checkinfoService.findByRoomId(roomId);
        if(checkinfos.size()!=1){
            System.out.println("数据逻辑错误！");
            return error;
        }
        Checkinfo checkinfo = checkinfos.get(0);
        checkinfo.setRoom(roomService.findById(checkinfo.getRoom().getRoomId()));
        Bill bill;
        if(checkinfo.getGroupId()!=null){
            bill = checkoutService.getBillByGroupCheck(checkinfo.getGroupId());
        }else {
            bill = checkoutService.getBillByOneCheck(checkinfo.getCheckId());
        }
        if(bill==null){
            System.out.println("数据逻辑错误！");
            return error;
        }
        List<Expensetrue> expensetrues = expensetrueService.findByBillId(bill.getBillId());
        Member member = null;
        if(checkinfo.getMemberId()!=null){
            member = new Member();
            member.setMemberId(checkinfo.getMemberId());
            member.setMemberStatus("可用");
            member.setMemberRemaining(2333d);
            member.setMemberConsume(1000d);
        }
        Groupinfo groupinfo = null;

        int num = 1;
        if(checkinfo.getGroupId()!=null){
            num = checkinfoService.findByGroupId(checkinfo.getGroupId()).size();
            groupinfo = groupinfoService.findById(checkinfo.getGroupId());
        }
        modelMap.put("now",new Date());
        modelMap.put("groupinfo",groupinfo);
        modelMap.put("count",num);
        modelMap.put("bill",bill);
        modelMap.put("checkinfo",checkinfo);
        modelMap.put("list",expensetrues);
        //System.out.println(checkinfo.getInTime());
        System.out.println("跳转bill-----------");

        return url;
    }

    @RequestMapping(value = "out_test", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String test() {
        int count = 0;
        //System.out.println(checkinfo.getInTime());
        System.out.println("test-----------");

        return "22222";
    }

}
