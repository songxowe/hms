package com.hms.controller;

import com.hms.pojo.Floor;
import com.hms.pojo.RoomType;
import com.hms.service.FloorService;
import com.hms.service.RoomTypeService;
import com.sun.org.apache.bcel.internal.generic.NEW;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.xpath.operations.Bool;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import sun.plugin2.os.windows.FLASHWINFO;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class FloorController {
    @Resource(name = "floorService")
    private FloorService floorService;
    @Resource(name = "roomTypeService")
    private RoomTypeService roomTypeService;

    //添加楼层信息。
    @RequestMapping(value= "addFloor",produces = "application/json;charset=utf-8")
    public @ResponseBody String addFloor(@RequestParam(value = "floorId",required = false) Integer floorId){
        System.out.println(floorId+"----------------");
        Boolean result=false;
        //1.判断楼层是否存在
        Floor floor = floorService.findById(floorId);
        System.out.println(floor+"*****");
        if(floor == null){
            int flag = 0;
            floor = new Floor(); floor.setFloorId(floorId);
            System.out.println(floor.getFloorId());
            //2.判断楼层是否添加成功
            flag = floorService.addFloor(floor);
            System.out.println("flag=:"+flag);
            if (flag > 0){
                result = true;
            }else {
                result=false;
            }
        }else{
            result=false;
        }

        JSONObject jo = new JSONObject();
        jo.put("success",result);
        System.out.println(jo.toString()+"jo.toString()...");
        return jo.toString();
    }


    //根据id查找楼层信息
    @RequestMapping(value = "findFloor",produces = "application/json;charset=utf-8")
    public String findFloor(@RequestParam(value = "floorId",required = false) Integer floorId, ModelMap modelMap){
        System.out.println("floorId: " +floorId);
        Floor floor = floorService.findById(floorId);
        modelMap.put("floor",floor);
        return "page/flooredit";
    }

    //修改楼层信息。
    @RequestMapping(value = "editFloor")
    public @ResponseBody String editFloor(Floor floor){
        System.out.println(floor.getFloorId()+"floor.getfloorid()..." + floor.getOtherOne());
        Boolean flag = false;
        int count = floorService.modifyFloor(floor);
        if (count > 0){
            flag = true;
        }

        JSONObject jo = new JSONObject();
        jo.put("success",flag);
        System.out.println("flag:"+jo.toString());
        return jo.toString();
    }



    //删除楼层信息
    @RequestMapping(value = "removeFloor",produces = "application/json;charset=utf-8")
    public @ResponseBody String removeFloor(@RequestParam(value = "floorId",required = false) Integer floorId){
        Boolean flag =false;
        int count = 0;
        count = floorService.removeFloor(floorId);
        if (count > 0){
            flag = true;
        }
        JSONObject jo = new JSONObject();
        jo.put("success",flag);
        return jo.toString();
    }

    //查询所有楼层信息+查询所有房型信息
    @RequestMapping(value = "findFloorAndRoomType")
    public String findFloorAndRoomType(ModelMap modelMap){
        System.out.println("findFloorAndRoomType()...");
        List<Floor> floors =floorService.find();
        List<RoomType> roomTypes = roomTypeService.find();
/*
        for (RoomType roomType:roomTypes){
            System.out.print(roomType.getRoomTypeName());
        }
        System.out.println("-------------------------------------");
        for (Floor floor:floors){
            System.out.print(floor.getFloorId());
        }*/
        modelMap.put("floors",floors);
        modelMap.put("roomTypes",roomTypes);

        return "page/roomadd";
    }

    //查询所有楼层信息+查询所有房型信息 JSON
    @RequestMapping(value = "findFloorAndRoomTypeJson",produces = "application/json;charset=utf-8")
    public @ResponseBody String findFloorAndRoomTypeJson(){
        System.out.println("findFloorAndRoomType()...");
        List<Floor> floors =floorService.find();
        List<RoomType> roomTypes = roomTypeService.find();

        JSONArray floorJa = new JSONArray();
        JSONArray roomTypeJa = new JSONArray();
        for (Floor floor:floors){
            floorJa.add(floor);
        }
        for (RoomType roomType:roomTypes){
            roomTypeJa.add(roomType);
        }

        JSONObject jo = new JSONObject();
        jo.put("floor",floorJa);
        jo.put("roomType",roomTypeJa);
        System.out.println("=================================");
        System.out.println(jo.toString());
        System.out.println("=================================");

        return jo.toString();
    }


}