package com.hms.controller;

import com.hms.pojo.RoomType;
import com.hms.service.RoomTypeService;
import net.sf.json.JSONObject;
import org.codehaus.jackson.map.util.JSONPObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
public class RoomTypeController {
    @Resource(name = "roomTypeService")
    private RoomTypeService roomTypeService;

    //添加房型信息
    @RequestMapping(value = "addRoomType",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
    public @ResponseBody String addRoomType(RoomType roomType){
        System.out.println(roomType.getRoomTypeName()+"roomtype.getroomtypename()...");
        Boolean flag = false;
        int count = 0;
        count = roomTypeService.addRoomType(roomType);
        if (count > 0){
            flag = true;
        }else {

        }
        JSONObject jo = new JSONObject();
        jo.put("success",flag);
        return jo.toString();
    }

    //根据id查找指定房型信息
    @RequestMapping(value = "findRoomTypeById",produces = "application/json;charset=utf-8")
    public String findRoomTypeById(@RequestParam(name = "roomTypeId",required = false) Integer roomTypeId, ModelMap modelMap){
        System.out.println("editroomtype()..." + roomTypeId);
        RoomType roomType = roomTypeService.findById(roomTypeId);
        System.out.println(roomType.getRoomTypeName()+roomType.getRoomTypeId()+"-------------");
        modelMap.put("roomType",roomType);
        return "page/roomtypeedit";
    }
    //修改房型信息
    @RequestMapping("editRoomType")
    public @ResponseBody String editRoomType(RoomType roomType){
        System.out.println("roomType.edit()..."+roomType.getRoomTypeName()+roomType.getRoomTypeId());
        Boolean flag =false;
        int count = 0;
        count = roomTypeService.modifyRoomType(roomType);
        if (count > 0){
            flag = true;
        }
        JSONObject jo = new JSONObject();
        jo.put("success",flag);
        return jo.toString();
    }

    //删除房型信息
    @RequestMapping(value = "removeRoomType",produces = "application/json;charset=utf-8")
    public @ResponseBody String removeRoomType(@RequestParam(value = "roomTypeId",required = false) Integer roomTypeId){
        Boolean flag =false;
        JSONObject jo = new JSONObject();
        RoomType roomType = roomTypeService.findById(roomTypeId);
        jo.put("roomTypeName",roomType.getRoomTypeName());
        int count = 0;
        count = roomTypeService.removeRoomType(roomTypeId);
        if (count > 0){
            flag = true;
        }

        jo.put("success",flag);
        return jo.toString();
    }

}
