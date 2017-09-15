package com.hms.controller;

import com.hms.pojo.*;
import com.hms.service.*;
import com.hms.util.ReceivePojo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Controller
public class CheckinfoController {
    @Resource(name = "checkService")
    private CheckService checkService;

    @Resource(name = "bookroomService")
    private BookroomService bookroomService;

    @Resource(name = "roomService")
    private RoomService roomService;
    @Resource(name = "roomCaseService")
    private RoomCaseService roomCaseService;
    @Resource(name = "roomTypeService")
    private RoomTypeService roomTypeService;
    @Resource(name = "payService")
    private PayService payService;
    @Resource(name = "guestService")
    private GuestService guestService;
    @Resource(name = "checkinfoService")
    private CheckinfoService checkinfoService;
    @Resource(name = "checkinAndBookService")
    private CheckinAndBookService checkinAndBookService;

    //http://localhost:8086/checkinfoController_getRoomCount？roomTypeId=1&inTime="2017-08-26 12:00:00"&outTime="2017-08-27 12:00:00"
    //获得可预定房间数量  count
    @RequestMapping(value = "checkinfoController_getRoomCount", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String getRoomCount(@RequestParam(required = true, value = "roomTypeId") Integer roomTypeId,
                               Book book) {
        int count = 0;
        System.out.println("----可预定房间数------");
        System.out.println(roomTypeId);
        System.out.println(book.getComeTime());
        System.out.println(book.getLeaveTime());
        count = checkService.canBookNumber(roomTypeId, book.getComeTime(), book.getLeaveTime());
        System.out.println(count);
        return String.valueOf(count);
    }

    //预定
    @RequestMapping(value = "checkinfoController_book", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String book(Book book, ReceivePojo receivePojo) {
        int count = 0;
        System.out.println("----预定------");
        if(receivePojo.getBookrooms()==null)
            receivePojo.setBookrooms(new ArrayList<Bookroom>());
        for (Bookroom bookroom : receivePojo.getBookrooms()) {
            int tc = checkService.canBookNumber(bookroom.getRoomType().getRoomTypeId(), book.getComeTime(), book.getLeaveTime());
            if (tc < bookroom.getRoomAmount()) {
                count = 2;//验证失败
                break;
            }
        }
        if (count != 2) {
            System.out.println("添加预定信息");
            checkinAndBookService.addBook(book, receivePojo.getBookrooms());
            count = 1;
        } else {
            System.out.println("验证失败");
            count = 2;
        }
        return String.valueOf(count);
    }

    //个人入住
    @RequestMapping(value = "checkinfoController_addone", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String addone(Checkinfo checkinfo, ReceivePojo receivePojo) {
        int count = 0;
        System.out.println("----入住------");
        if(receivePojo.getGuests()==null)
            receivePojo.setGuests(new ArrayList<Guest>());
        if(receivePojo.getPays()==null)
            receivePojo.setPays(new ArrayList<Pay>());
        if (checkService.canCheckin(checkinfo.getRoom().getRoomId(), checkinfo.getInTime(), checkinfo.getPreoutTime())) {
            System.out.println("添加入住信息");
            checkinAndBookService.addCheckinfoWithForeign(checkinfo, receivePojo.getGuests(), receivePojo.getPays());
            count = 1;
        } else {
            System.out.println("验证失败");
            count = 2;
        }
        return String.valueOf(count);
    }

    //团队入住
    @RequestMapping(value = "checkinfoController_addGroup", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String addone(Groupinfo groupinfo, ReceivePojo receivePojo) {
        int count = 0;
        System.out.println("----团体入住------");
        if(receivePojo.getCheckinfos()==null)
            receivePojo.setCheckinfos(new ArrayList<Checkinfo>());
        if(receivePojo.getGuests()==null)
            receivePojo.setGuests(new ArrayList<Guest>());
        if(receivePojo.getPays()==null)
            receivePojo.setPays(new ArrayList<Pay>());

        List<Checkinfo> checkinfos = new ArrayList<Checkinfo>(receivePojo.getCheckinfos());
        if (checkService.groupCanCheckin(groupinfo, checkinfos)) {
            System.out.println("添加团体入住信息");
            checkinAndBookService.addGroupCheck(groupinfo,
                    receivePojo.getCheckinfos(),
                    receivePojo.getGuests(), receivePojo.getPays());
            count = 1;
        } else {
            System.out.println("验证失败");
            count = 2;
        }
        System.out.println("----结束团体入住------");
        return String.valueOf(count);
    }

    /*
    8-27 修改此方法 by zjh
     */
    //查询入住信息  跳转至续住登记
    @RequestMapping(value = "findCheckinfo", produces = "text/html;charset=UTF-8")
    public String findCheckinfo(@RequestParam(required = true, value = "roomId") Integer roomId, ModelMap modelMap) {

        System.out.println("----findCheckinfo------");
        String url = "page/FrontOp/ContinuedLive"; // 跳转url
        List<Checkinfo> checkinfos = checkinfoService.findByRoomId(roomId);
        if(checkinfos.size()==0){
            //未查到checkinfo 信息
            System.out.println("未查到checkinfo 信息-------");
            Checkinfo c = new Checkinfo();
            Room r = new Room();
            r.setRoomType(new RoomType());
            r.setFloor(new Floor());
            c.setRoom(r);
            c.setRoomCase(new RoomCase());
            Guest g = new Guest();
            g.setRoom(r);
            modelMap.put("checkinfo", c);
            modelMap.put("guest", g);
            modelMap.put("allMoney", 0);
            System.out.println("跳转");
            return url;
        }else if(checkinfos.size()>1){
            //信息不唯一  数据内部错误
            System.out.println("信息不唯一  数据内部错误---------");
            Checkinfo c = new Checkinfo();
            Room r = new Room();
            r.setRoomType(new RoomType());
            r.setFloor(new Floor());
            c.setRoom(r);
            c.setRoomCase(new RoomCase());
            Guest g = new Guest();
            g.setRoom(r);
            modelMap.put("checkinfo", c);
            modelMap.put("guest", g);
            modelMap.put("allMoney", 0);
            System.out.println("跳转");
            return url;
        }

        //业务代码
        Integer checkId = checkinfos.get(0).getCheckId();
        Checkinfo checkinfo = checkinfoService.findById(checkId);
        List<Guest> guests = guestService.findByCheckid(checkId);
        List<Pay> pays = payService.findByCheckinfo(checkId);
        Guest guest = null;

        if (guests.size() == 0) {
            //无入住人员  数据逻辑异常
            guest = new Guest();
        } else if (guests.size() == 1) {
            guest = guests.get(0);
        } else {
            for (Guest g : guests) {

                if (g.getMainguest() != null && g.getMainguest().equals("是")) {
                    guest = g;
                    break;
                }
            }
        }
        Double allMoney = 0d;
        for (Pay p : pays) {
            if (p.getPrepay() != null)
                allMoney += p.getPrepay();
        }
        modelMap.put("checkinfo", checkinfo);
        modelMap.put("guest", guest);
        modelMap.put("allMoney", allMoney);
        System.out.println("跳转");
        return url;
    }

    //添加续住   团队和个人
    @RequestMapping(value = "addCheckinfo", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String addCheckinfo(@RequestParam(required = true, value = "addTime") Integer addTime,
                               @RequestParam(required = true, value = "checkId") Integer checkId,
                               @RequestParam(required = true, value = "withgroup") boolean withgroup, Pay pay) {
        int count = 0;
        //System.out.println(checkinfo.getInTime());
        System.out.println("addCheckinfo-----------");
        System.out.println(withgroup);
        boolean flag = false;
        Checkinfo checkinfo = checkinfoService.findById(checkId);
        //检测
        if (withgroup) {
            //
            List<Checkinfo> checkinfos = checkinfoService.findByGroupId(checkinfo.getGroupId());
            flag = checkService.groupCanAdd(checkinfos, addTime);
        } else {
            flag = checkService.canAddTime(addTime, checkId);
        }
        if (flag) {
            if (withgroup) {
                //团体添加
                System.out.println("团体添加");
                checkinAndBookService.addGroupStayTime(addTime, checkId, pay);
            } else {
                //个人添加
                System.out.println("个人添加");
                checkinAndBookService.addStayTime(addTime, checkId, pay);
            }
            count = 1;
        } else {
            count = 2;
        }
        System.out.println(count+"count--------");
        return String.valueOf(count);
    }


    //查询房间信息 跳转至入住单
    @RequestMapping(value = "checkinfoController_findRoom", produces = "text/html;charset=UTF-8")
    public String findRoom(@RequestParam(required = true, value = "roomId") Integer roomId, ModelMap modelMap) {
        int count = 0;
        System.out.println("----跳转至入住单------");
        Room room = roomService.findById(roomId);
        //List<RoomCase> list = roomCaseService.findByParam(room.getRoomType().getRoomTypeId(),null,
        //       null,null,null,null,null,null,null);
        modelMap.put("room", room);
        //modelMap.put("list",list);
        return "page/FrontOp/OrderAdd";
    }


    ////////////////////////////////////////////////

    /***************加载下拉框******************************/
    //房型下拉框
    @RequestMapping(value = "checkinfoController_getRoomTypes", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String getRoomTypes() {
        int count = 0;
        System.out.println("----房型下拉框------");
        List<RoomType> list = roomTypeService.find();
        JSONArray ja = (JSONArray) JSONSerializer.toJSON(list);
        System.out.println(ja.toString());
        return ja.toString();
    }

    //房价方案下拉框
    @RequestMapping(value = "checkinfoController_getRoomCases", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String getRoomCases(@RequestParam(required = true, value = "roomTypeId") Integer roomTypeId) {
        int count = 0;
        System.out.println("----房价方案下拉框------");

        List<RoomCase> list = roomCaseService.findByParam(roomTypeId, null,
                null, null, null, null, null, null, null);
        JSONArray ja = (JSONArray) JSONSerializer.toJSON(list);
        System.out.println(ja.toString());
        return ja.toString();
    }

    //房间下拉框
    @RequestMapping(value = "checkinfoController_getRooms", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String getRooms(@RequestParam(required = true, value = "roomTypeId") Integer roomTypeId, Book book) {

        System.out.println("----房间下拉框------");
        System.out.println("roomTypeId" + roomTypeId);
        List<Room> list = roomService.findByParam(null, roomTypeId, null, "空房");
        System.out.println("3333333333333---" + list.size());
        List<Bookroom> bookrooms = bookroomService.findByTime(roomTypeId, book.getComeTime(), book.getLeaveTime());

        int count = 0;
        for (Bookroom bookroom : bookrooms) {
            if (bookroom.getRoomAmount() != null)
                count += bookroom.getRoomAmount();
        }
        System.out.println("------------------");
        JSONObject jo = new JSONObject();
        jo.put("list", list);
        jo.put("count", count);
        System.out.println("count--------" + count);
        System.out.println(jo.toString());
        return jo.toString();
    }

    @RequestMapping(value = "test", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String test() {
        int count = 0;
        //System.out.println(checkinfo.getInTime());
        System.out.println("test-----------");

        return "22222";
    }

}
