package com.hms.controller;

import com.hms.pojo.Floor;
import com.hms.pojo.Room;
import com.hms.pojo.RoomCase;
import com.hms.pojo.RoomType;
import com.hms.service.RoomCaseService;
import com.hms.service.RoomTypeService;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class RoomCaseController {
    @Resource(name = "roomCaseService")
    private RoomCaseService roomCaseService;
    @Resource(name = "roomTypeService")
    private RoomTypeService roomTypeService;



    //房价方案主页
    @RequestMapping(value = "roomCaseIndex",produces = "application/json;charset=utf-8")
    public  String roomCaseIndex(ModelMap modelMap){

        List<RoomType> roomTypes = roomTypeService.find();//找到所有房型
        System.out.println(roomTypes.get(0).getRoomTypeId()+"roomTypes.get(0).getRoomTypeId()");
        List<RoomCase> roomCases = roomCaseService.findByParam(
                roomTypes.get(0).getRoomTypeId(),null,null,null,
                null,null,null,null,null
                );
        JSONObject jo = new JSONObject();
        jo.put("roomTypes",roomTypes);
        //System.out.println(jo.toString());
        jo.put("roomCases",roomCases);
        System.out.println(jo.toString());
        modelMap.put("jo",jo);

        return "page/roomcase";
    }


    //添加房价方案时将房型查找出来
    @RequestMapping(value = "findRoomTypeToAdd",produces = "application/json;charset=utf-8")
    public  String findRoomTypeToAdd(ModelMap modelMap){
        System.out.println("findRoomTypeToAdd()......");
        List<RoomType> roomTypes = roomTypeService.find();
        modelMap.put("roomTypes",roomTypes);
        return "page/roomcaseadd";
    }


    //加载所有房型
    @RequestMapping(value = "RoomCaseController_findRoomType",produces = "application/json;charset=utf-8")
    public @ResponseBody String RoomCaseController_findRoomType(){
        List<RoomType> roomTypes = roomTypeService.find();//找到所有房型
        JSON json = JSONSerializer.toJSON(roomTypes);

        System.out.println( "RoomCaseController_findRoomType"+json.toString());
        return json.toString();
    }

    //新增房价方案
    @RequestMapping(value = "roomCaseAdd",produces = "application/json;charset=utf-8")
    public @ResponseBody String roomCaseAdd(RoomCase roomCase){
        System.out.println(roomCase.getRoomCaseName()+"" +roomCase.getRoomType().getRoomTypeId()+"----------------");
        roomCase.setPriceStatus("可以使用");
        Boolean result=false;
        if(roomCase.getRoomCaseId() == null){
            int count = roomCaseService.addRoomCase(roomCase);
            if (count > 0 ){
                result = true;
            }
        }else {
            int count = roomCaseService.modifyRoomCase(roomCase);
            if (count > 0 ){
                result = true;
            }
        }
        List<RoomCase> roomCases = roomCaseService.findByParam(roomCase.getRoomType().getRoomTypeId(),null,null,null,null,null,null,null,null);




        JSONObject jo = new JSONObject();
        jo.put("roomCases",roomCases);
        jo.put("success",result);
        System.out.println(jo.toString()+"jo.toString()...");
        return jo.toString();
    }

    //根据Id查找指定房价方案
    @RequestMapping(value = "findRoomCaseById",produces = "application/json;charset=utf-8")
    public String findRoomCaseById(Integer roomCaseId,ModelMap modelMap){
        System.out.println("roomCaseId()..."+roomCaseId);
        RoomCase roomCase = roomCaseService.findById(roomCaseId);
        System.out.println(roomCase.getRoomType().getRoomTypeName()+" "+roomCase.getRoomCaseName());
        modelMap.put("roomCase",roomCase);
        return "page/roomcaseadd";
    }

    //房型改变时，加载对应房价方案    ---//通过房型 编号 查询所有房价方案
    @RequestMapping(value = "roomTypeChange",produces = "application/json;charset=utf-8")
    public @ResponseBody String roomTypeChange(@RequestParam(name = "roomTypeId") Integer roomTypeId){
        System.out.println("roomTypeChange()..."+ roomTypeId);
        List<RoomCase> roomCases = roomCaseService.findByParam(roomTypeId,null,null,null,null,
                null,null,null,null);
        JSON json = JSONSerializer.toJSON(roomCases);
        System.out.println("roomTypeChange()..json"+json.toString());
        return json.toString();
    }





}
