package com.hms.controller;

import com.hms.pojo.Floor;
import com.hms.pojo.Room;
import com.hms.pojo.RoomCase;
import com.hms.pojo.RoomType;
import com.hms.service.FloorService;
import com.hms.service.RoomService;
import com.hms.service.RoomTypeService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Controller
public class RoomController {
    @Resource(name = "roomService")
    private RoomService roomService;
    @Resource(name = "floorService")
    private FloorService floorService;
    @Resource(name = "roomTypeService")
    private RoomTypeService roomTypeService;

    //新增房间信息
    @RequestMapping(value= "addRoom",produces = "application/json;charset=utf-8")
    public @ResponseBody String addRoom(Room room){
        System.out.println("addRoom()..." + room.getRoomNo()+" "+room.getRoomType().getRoomTypeId()+ "  " + room.getRoomType().getRoomTypeName()+" "+ room.getFloor().getFloorId());
        room.setRoomStatus("空房");
        Boolean flag = false;
        int count = 0;
        System.out.println("执行到cout=0——》");
        count = roomService.addRoom(room);
        System.out.println("****");
        if (count > 0){
            flag = true;
        }
        JSONObject jo = new JSONObject();
        System.out.println(jo.toString());
        jo.put("success",flag);
        return jo.toString();
    }

    //g根据id 查找指定房间信息
    @RequestMapping(value = "findRoomById",produces = "text/html;charset=utf-8")
    public String findRoomById(Integer roomId, ModelMap modelMap){
        System.out.println("findRoomById()...roomId" + roomId);
        Room room = roomService.findById(roomId);
        System.out.println(room.getOtherOne() +room.getFloor().getFloorId() + room.getRoomType().getRoomTypeId()+ "room.getOtherOne()..........");
        modelMap.put("room",room);
        return "page/roomedit";
    }


    //修改房间信息
    @RequestMapping("editRoom")
    public @ResponseBody String editRoom(Room room){
        System.out.println("editRoom...."+room.getFloor().getFloorId()+" :"+room.getRoomType().getRoomTypeId());
        Boolean flag =false;
        int count = 0;
        count = roomService.modifyRoom(room);
        if (count > 0){
            flag = true;
        }
        JSONObject jo = new JSONObject();
        jo.put("success",flag);
        return jo.toString();
    }

    //删除房间型信息
    @RequestMapping(value = "removeRoom",produces = "application/json;charset=utf-8")
    public @ResponseBody String removeRoom(@RequestParam(value = "roomId",required = false) Integer roomId){
        Boolean flag =false;
        JSONObject jo = new JSONObject();
        Room room = roomService.findById(roomId);
        jo.put("roomName",room.getRoomNo());
        int count = 0;
        count = roomService.removeRooom(roomId);
        if (count > 0){
            flag = true;
        }

        jo.put("success",flag);
        return jo.toString();
    }



    /**
     * 房态
     * //根据参数查询所有房间信息
     * @param floorId  楼层id
     * @param roomTypeId  房型id
     * @param roomNo 房号
     * @param roomStatus 房间状态
     * @return
     */
    @RequestMapping(value = "findAllRoom",produces = "application/json;charset=utf-8")
    public String findAllRoom(@RequestParam(name = "floorId" ,required = false) Integer floorId,
                              @RequestParam(name = "roomTypeId",required = false) Integer roomTypeId,
                              @RequestParam(name = "roomNo",required = false) Integer roomNo,
                              @RequestParam(name = "roomStatus",required = false) String roomStatus,
                                ModelMap modelMap ){


        modelMap.remove("maps");
        System.out.println(floorId+" :floorId" +roomTypeId+" :roomTypeId"+ roomNo+" :roomNo"+ roomStatus+":roomStatus");
        //查出所有房间和楼层和房型
        List<Room> rooms =  roomService.findByParam(floorId,roomTypeId,roomNo,roomStatus);
        List<RoomType> roomTypes = roomTypeService.find();
        List<Floor> floors = floorService.find();
        List<HashMap<String,Object>> maps = new ArrayList<>();


        System.out.println(rooms.size() + " " + roomTypes.size() +" " + floors.size()+"size()()()()()()");
        //计算空房 入住。。。。 的各自房间数
        int kongfang = 0;
        int ruzhu = 0;
        int dasao = 0;
        int xiuli = 0;
        int yuliu = 0;

        for (Room room:rooms){
            if (room.getRoomStatus().equals( "空房")){
                kongfang ++;
            }
            if (room.getRoomStatus().equals( "入住")){
                ruzhu ++;
            }
            if (room.getRoomStatus().equals( "修理")){
                xiuli ++;
            }
            if (room.getRoomStatus().equals( "打扫")){
                dasao ++;
            }
            if (room.getRoomStatus().equals( "预留")){
                yuliu ++;
            }
        }
        modelMap.put("kongfang",kongfang);
        modelMap.put("ruzhu",ruzhu);
        modelMap.put("xiuli",xiuli);
        modelMap.put("dasao",dasao);
        modelMap.put("yuliu",yuliu);



        for (Floor floor:floors){
            HashMap<String,Object> map = new HashMap<>();
            map.put("floor",floor);
            List<Room> rs = new ArrayList<>();
            for (Room room:rooms){
                if (floor.getFloorId() == room.getFloor().getFloorId()){
                   rs.add(room);
                }
            }
            System.out.println(rs.size()+"rs.size()........");
            if(rs.size() > 0) {
                map.put("rooms", rs);
                maps.add(map);
            }
        }
        System.out.println(maps.toString());
        System.out.println("maps.size():"+maps.size());

        for (int i = 0;i< maps.size();i++){

                System.out.println( maps.get(i).get("rooms"));

        }
        modelMap.put("maps",maps);
        System.out.println(maps.toString());
        modelMap.put("floors",floors);
        modelMap.put("roomTypes",roomTypes);

        return "page/index";
    }

    //设置-----房间信息页面
    @RequestMapping(value = "roomIndex",produces =  "application/json;charset=utf-8")
    public String roomIndex(ModelMap modelMap){
        List<Floor> floors = floorService.find();
        List<RoomType> roomTypes = roomTypeService.find();
        List<Room> rooms = roomService.findByParam(null,null,null,null);

        modelMap.put("floors",floors);
        modelMap.put("roomTypes",roomTypes);
        modelMap.put("rooms",rooms);

        return "page/Set/room";
    }

    //未来房态
    @RequestMapping(value = "futureRoomState",produces =  "application/json;charset=utf-8")
    public String futureRoomState(ModelMap modelMap){

        List<Room> rooms = roomService.findByParam(null,null,null,null);
        List<RoomType> roomTypes = roomTypeService.find();
        modelMap.put("roomTypes",roomTypes);
        modelMap.put("rooms",rooms);
        return  "page/futureroomstate";
    }


}
