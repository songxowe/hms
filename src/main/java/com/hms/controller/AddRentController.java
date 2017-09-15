package com.hms.controller;

import com.hms.pojo.AddRent;
import com.hms.pojo.RoomType;
import com.hms.service.AddRentService;
import com.hms.service.RoomTypeService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class AddRentController {
    @Resource(name = "addRentService")
    private AddRentService addRentService;
    @Resource(name = "roomTypeService")
    private RoomTypeService roomTypeService;



    @RequestMapping(value = "addRentIndex",produces = "application/json;charset=utf-8")
    public String addRentIndex(ModelMap modelMap){

        List<RoomType> roomTypes = roomTypeService.find();
        List<AddRent> addRents = addRentService.findByParam(null,null,null,null,null);

        for (RoomType roomType:roomTypes){
            System.out.println(roomType.getRoomTypeName()+"rootypename()...");
        }
        System.out.println("----------------");
        for (AddRent addRent:addRents){
            System.out.println(addRent.getRoomType().getRoomTypeId() + " "+ addRent.getAddrentId());
        }
        modelMap.put("roomTypes" ,roomTypes);
        modelMap.put("addRents",addRents);


        return "page/addrent";
    }

}
