package com.hms.controller;

import com.hms.pojo.*;
import com.hms.service.*;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class ProductSaleController {
    @Resource(name = "checkinfoService")
    private CheckinfoService checkinfoService;
    @Resource(name = "roomTypeService")
    private RoomTypeService roomTypeService;
    @Resource(name = "roomService")
    private RoomService roomService;
    @Resource(name = "guestService")
    private GuestService guestService;
    @Resource(name = "productService")
    private ProductService productService;

    //查询根据id 查询准确入住信息。
    @RequestMapping(value = "priductSaleFindChecInfoById", produces = "text/html;charset=UTF-8")
    public String priductSaleFindChecInfoById(@RequestParam(value = "checkInfoId",required = false) Integer checkInfoId, ModelMap modelMap){

        //获取入住时间 。开房方式 房价方案
        Checkinfo checkinfo =checkinfoService.findById(checkInfoId);
        //获取房间号。房型
        Room room = roomService.findById(checkinfo.getRoom().getRoomId());

        //获取房客
        List<Guest> guests = guestService.findByCheckid(checkInfoId);
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
        modelMap.put("checkinfo",checkinfo);
        modelMap.put("room",room);
        modelMap.put("guest",guest);


        return "sale/ProductAdd";
    }


    //获取s所有商品信息
    @RequestMapping(value = "productOfSale", produces = "text/html;charset=UTF-8")
    public @ResponseBody String productOfSale(){
        //获取所有商品信息
        List<Product> products = productService.find(null);
        JSON json = JSONSerializer.toJSON(products);
        System.out.println(json.toString() + "products().tostring...");
        return json.toString();
    }

    //通过id 获取单个商品详细信息
    @RequestMapping(value = "productOfSaleById", produces = "text/html;charset=UTF-8")
    public @ResponseBody String productOfSaleById(@RequestParam(value = "productId",required = false) Integer productId){
        //获取所有商品信息
        Product product = productService.findById(productId);
        JSON json = JSONSerializer.toJSON(product);
        System.out.println(json.toString() + "单个product().tostring...");
        return json.toString();
    }

}
