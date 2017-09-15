package com.hms.controller;

import com.hms.pojo.Warehouse;
import com.hms.service.WarehouseService;
import com.softfactory.pojo.Dept;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;


@Controller()
public class WarehouserController {
    @Resource(name = "warehouseService")
   private WarehouseService warehouseService;
    @RequestMapping(value = "warehouser_find",produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String warehouse_find(){
        List<Warehouse> warehouses=warehouseService.find();
        for (Warehouse w:warehouseService.find()){
          System.out.println(w.getWarehouseName());
        }
        JSON json= JSONSerializer.toJSON(warehouses);
        System.out.println("json.tostring()..."+json.toString());
        return json.toString();
    }
    @RequestMapping(value = "warehouse_save",produces = "text/html;charset=UTF-8")
    public String  warehouse_save(Warehouse warehouse) {
        int count=0;
        System.out.println("2222");
        if(warehouse!=null && warehouse.getWarehouseId()!=null){
            System.out.println("修改");
            warehouseService.modfiy(warehouse);
        }else {
            warehouseService.add(warehouse);
            System.out.println("新增");

        }
        return "warehouse";
    }

    @RequestMapping(value = "warehouse_findbyid",produces = "text/html;charset=UTF-8")
    public String warehouse_findbyid(@RequestParam(required = false,value = "warehouseId") Integer warehouseId, ModelMap modelMap){
        Warehouse warehouse=new Warehouse();
        System.out.println(1111);
        System.out.println(warehouseId);
        if (warehouseId!=null) {
            warehouse = warehouseService.findById(warehouseId);
            System.out.println(warehouse.getWarehouseName());
            modelMap.put("warehouse",warehouse);
        }
     return "warehouseEdit";

    }
    @RequestMapping(value = "warehouser_find2",produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String warehouse_find2(){
        List<Warehouse> warehouses=warehouseService.find();
        Warehouse warehouse = new Warehouse();
        warehouse.setWarehouseId(0);
        warehouse.setWarehouseName("请选择");

        warehouses.add(0, warehouse);

        JsonConfig jsonConfig = new JsonConfig();
        // 设置指定属性不在 json 格式数据中显示
        JSON json = JSONSerializer.toJSON(warehouses, jsonConfig);

        return json.toString();
    }
}
