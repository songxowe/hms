package com.hms.test;

import com.hms.dao.BookroomMapper;
import com.hms.dao.CheckinfoMapper;
import com.hms.dao.RoomMapper;
import com.hms.pojo.*;
import com.hms.service.BillService;
import com.hms.service.CheckService;
import com.hms.service.CheckinAndBookService;
import com.hms.service.CheckinfoService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class CheckinfoTest {
    private CheckinfoService checkinfoService;
    private CheckinAndBookService checkinAndBookService;
    private BillService billService;

    @Before
    public void init(){
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        checkinfoService = ctx.getBean("checkinfoService",CheckinfoService.class);
        checkinAndBookService = ctx.getBean("checkinAndBookService",CheckinAndBookService.class);
        billService= ctx.getBean("billService",BillService.class);
    }


    //测试bill添加
    @Test
    public void billTestAdd(){
        Bill bill = billService.findById(1);
//        bill.setBillRemark("meiyoubeizhu");
//        bill.setCheckId(2);
//        bill.setDays(15);
//        bill.setExpenseId(2);
       // System.out.println(billService.add(bill));
        System.out.println(bill.getBillId());
        System.out.println(billService.add(new Bill()));
    }

    @Test
    public void findByCheckInfo(){
        List<Checkinfo> checkinfos = checkinfoService.findByCheckState();
        for (Checkinfo checkinfo:checkinfos){
            System.out.println(checkinfo.getRoom().getRoomNo()+" "+checkinfo.getRoom().getRoomId());
        }
    }

    @Test
    public void modify(){
        Checkinfo c = checkinfoService.findById(13);
        c.setCheckType("天房");
        c.setPreoutTime(new Date());
        System.out.println(c.getPreoutTime());
        checkinfoService.modify(c);
    }
    @Test
    public void findId(){
        Checkinfo c = checkinfoService.findById(14);
        System.out.println(c.getInTime());
        System.out.println(c.getPreoutTime());
    }

    @Test
    public void addStayTime(){
        Pay pay = new Pay();
        pay.setPayType("现金");
        pay.setPrepay(300d);
        checkinAndBookService.addStayTime(2,1,pay);
    }
    @Test
    public void addGroupStayTime(){
        Pay pay = new Pay();
        pay.setPayType("现金");
        pay.setPrepay(300d);
        checkinAndBookService.addGroupStayTime(2,4,pay);
    }

    @Test
    public void modifyRoomChange(){
        checkinAndBookService.roomChange(1,1,1012,158d,"房间不干净");
    }


    @Test
    public void checkinfobegin(){
        Date d = new Date();
        List<Checkinfo> l = checkinfoService.findByBegintime(new Date());
        System.out.println(l.get(0).getStrpreoutTime());
        /*List<Checkinfo> l = checkinfoService.findByCheckState();
        System.out.println(l.get(0).getRoom().getRoomNo());*/
    }
    @Test
    public void addGroupCheck(){
        Groupinfo groupinfo = new Groupinfo();
        groupinfo.setDiyId(110);
        groupinfo.setInTime(new Date());
        groupinfo.setGuestType("客人自入");
        groupinfo.setStayHours(3);
        groupinfo.setGroupName("牛耳公司");
        groupinfo.setGroupLeader("老宋");
        ////////////////////////////////
        Room r1 = new Room();
        r1.setRoomId(1);
        Room r2 = new Room();
        r2.setRoomId(2);
        Room r3 = new Room();
        r3.setRoomId(3);
        RoomType t1 = new RoomType();
        t1.setRoomTypeId(1);
        RoomType t2 = new RoomType();
        t2.setRoomTypeId(2);
        RoomType t3 = new RoomType();
        t3.setRoomTypeId(3);
        RoomCase rc1 = new RoomCase();
        rc1.setRoomCaseId(1);
        RoomCase rc2 = new RoomCase();
        rc2.setRoomCaseId(2);
        RoomCase rc3 = new RoomCase();
        rc3.setRoomCaseId(3);

        Checkinfo c1 = new Checkinfo();
        c1.setRoom(r1);
        c1.setRoomPrice(125d);
        c1.setRoomCase(rc1);
        Checkinfo c2 = new Checkinfo();
        c2.setRoom(r2);
        c2.setRoomPrice(155d);
        c2.setRoomCase(rc2);
        Checkinfo c3 = new Checkinfo();
        c3.setRoom(r1);
        c3.setRoomPrice(225d);
        c3.setRoomCase(rc3);
        List<Checkinfo> checkinfos = new ArrayList<Checkinfo>();
        checkinfos.add(c1);
        checkinfos.add(c2);
        checkinfos.add(c3);

        Guest g1 = new Guest();
        g1.setGuestSex("男");
        g1.setGuestPhone("13313133232");
        g1.setGuestAddress("长沙");
        g1.setGuestName("张曼");
        g1.setGuestBirthdate(new Date());
        g1.setRoom(r1);
        g1.setVoucher("身份证");
        g1.setVoucherNo("430202199910102343");
        g1.setGuestRace("土家族");
        Guest g2 = new Guest();
        g2.setGuestSex("男");
        g2.setGuestPhone("22213133232");
        g2.setGuestAddress("长沙");
        g2.setGuestName("张曼2");
        g2.setGuestBirthdate(new Date());
        g2.setRoom(r2);
        g2.setVoucher("身份证");
        g2.setVoucherNo("220202199910102343");
        g2.setGuestRace("土家族2");
        Guest g3 = new Guest();
        g3.setGuestSex("男");
        g3.setGuestPhone("33313133232");
        g3.setGuestAddress("长沙3");
        g3.setGuestName("张曼3");
        g3.setGuestBirthdate(new Date());
        g3.setRoom(r3);
        g3.setVoucher("身份证");
        g3.setVoucherNo("330202199910102343");
        g3.setGuestRace("土家族");
        List<Guest> guests = new ArrayList<Guest>();
        guests.add(g1);
        guests.add(g2);
        guests.add(g3);

        Pay p1 = new Pay();
        p1.setPrepay(350d);
        p1.setPayType("支付宝");
        Pay p2 = new Pay();
        p2.setPrepay(550d);
        p2.setPayType("支付宝");
        List<Pay> pays = new ArrayList<Pay>();
        pays.add(p1);
        pays.add(p2);
        checkinAndBookService.addGroupCheck(groupinfo,checkinfos,guests,pays);


    }

    @Test
    public void addbookrom(){
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        //BookroomMapper brm = ctx.getBean("bookroomMapper",BookroomMapper.class);
        CheckinfoMapper cm = ctx.getBean("checkinfoMapper",CheckinfoMapper.class);
        RoomMapper RoomMapper = ctx.getBean("roomMapper",RoomMapper.class);
        CheckService checkService = ctx.getBean("checkService",CheckService.class);
        BookroomMapper bookroomMapper = ctx.getBean("bookroomMapper",BookroomMapper.class);
        Date a = new Date();
        Date b;
        Date c;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(a);
        calendar.add(Calendar.MONTH,-1);
        calendar.setTime(a);
        calendar.add(Calendar.DATE,3);
        c = calendar.getTime();
        b = calendar.getTime();
        //List<Bookroom> bookrooms = bookroomMapper.findByTime(1,a,c);
        //System.out.println(bookrooms.size());
        //Room r = RoomMapper.findById(1);
       // System.out.println(r.getRoomType().getRoomTypeId());
        //System.out.println(checkService.canAddTime(1,2));
        System.out.println(checkService.canCheckin(6,a,c));
    }
    @Test
    public void addBook(){
        Book book = new Book();
        book.setAssureType("无担保");
        book.setBooker("小明");
        book.setBookPhone("13315515516");
        book.setBookRemark("备注");
        book.setBookStatus("已取房");
        book.setCheckType("天房");
        book.setComeTime(new Date());
        book.setDiyId(20170201);
        book.setGuestType("客人自入");
        book.setKeepTime(new Date());
        book.setLeaveTime(new Date());
        book.setPayType("支付宝");
        book.setSubscription(50d);

        Room r1 = new Room();
        r1.setRoomId(1);
        Room r2 = new Room();
        r2.setRoomId(2);
        RoomCase c1 = new RoomCase();
        c1.setRoomCaseId(1);
        RoomCase c2 = new RoomCase();
        c2.setRoomCaseId(2);
        RoomType t1 = new RoomType();
        t1.setRoomTypeId(1);
        RoomType t2 = new RoomType();
        t2.setRoomTypeId(2);

        Bookroom b1 = new Bookroom();
        b1.setRoomAmount(3);
        b1.setRoomCase(c1);
        b1.setRoomType(t1);
        Bookroom b2 = new Bookroom();
        b2.setRoomAmount(2);
        b2.setRoomCase(c2);
        b2.setRoomType(t2);
        List<Bookroom> bookrooms = new ArrayList<Bookroom>();
        bookrooms.add(b1);
        bookrooms.add(b2);
        checkinAndBookService.addBook(book,bookrooms);
    }


}
