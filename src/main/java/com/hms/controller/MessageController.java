package com.hms.controller;

import com.hms.pojo.Message;
import com.hms.pojo.Room;
import com.hms.service.MessageService;
import com.hms.service.RoomService;
import net.sf.json.JSONObject;
import org.apache.xpath.operations.Bool;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Controller
public class MessageController {

    @Resource
    private MessageService messageService;
    @Resource(name = "roomService")
    private RoomService roomService;

    @RequestMapping(value = "addMessage",produces = "application/json;charset=utf-8")
    public @ResponseBody String addMessage(){
        Message message = new Message();
        message.setMessageAlertTime(new Date());
        message.setMessageType(1);
        message.setMessageReadTime(null);
        message.setMessageStatus(0);
        message.setMessageRemark("房间号："+2001+"距离退房还有30分钟");
        int count = messageService.addMessage(message);
        JSONObject jo = new JSONObject();
        jo.put("success",count);
        return jo.toString();
    }


    //查找所有消息
    @RequestMapping(value = "findAllMessage",produces = "application/json;charset=utf-8")
    public String findAllMessage(ModelMap modelMap){
        List<Message> messages = messageService.find();
        for (Message message:messages){
            System.out.println(message.getMessageStatus()+" " + message.getMessageRemark());
        }

        System.out.println("findAllMessage().......................");
        modelMap.put("messages",messages);
        return "page/messageshow";
    }

    //阅读所有信息
    @RequestMapping(value = "readMessage",produces = "application/json;charset=utf-8")
    public String readMessage(){
        int count = messageService.modifyMessage();
        return "";
    }



    //下面为设置房间状态

    //查找所有的房间
    @RequestMapping(value = "roomStateOfAllRoom",produces = "application/json;charset=utf-8")
    public String roomStateOfAllRoom(ModelMap modelMap){
        List<Room> rooms = roomService.findByParam(null,null,null,null);
        modelMap.put("allRoom",rooms);
        return "page/roomsetstate";
    }

    //根据id找到指定房间
    @RequestMapping(value = "roomStateOfRoom",produces = "application/json;charset=utf-8")
    public String roomStateOfRoom(@RequestParam(value = "roomId") Integer roomId,ModelMap modelMap){
        Room room = roomService.findById(roomId);
        System.out.println(room.getRoomStatus()+"roomStatus()......");
        modelMap.put("room",room);
        return "page/roomstatechange";
    }



    //设置房间状态
    @RequestMapping(value = "setRoomState",produces = "application/json;charset=utf-8")
    public @ResponseBody String setRoomState(@RequestParam(value = "roomId",required = false) Integer roomId,
                                             @RequestParam(value = "roomStatus",required = false) String roomStatus){

        System.out.println("roomId:" + roomId+",roomStatus:"+roomStatus);
        Boolean flag = false;
        int count = roomService.upDateRoomStatus(roomId,roomStatus);
        if (count >0){
            flag = true;
        }
        JSONObject jo = new JSONObject();
        jo.put("success",flag);

        return jo.toString();
    }
}
