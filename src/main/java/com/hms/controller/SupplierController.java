package com.hms.controller;

import com.hms.pojo.Product;
import com.hms.pojo.Supplier;
import com.hms.pojo.Warehouse;
import com.hms.service.SupplierService;
import com.hms.service.WarehouseService;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.naming.Name;
import java.util.List;

@Controller
public class SupplierController {

     @Resource(name = "supplierService")
     private SupplierService supplierService;
     @Resource(name="warehouseService")
     private WarehouseService warehouseService;

     @RequestMapping(value = "supplierController_find",produces = "text/html;charset=UTF-8")
     @ResponseBody
     public String supplierController_find(String supplierName){
         List<Supplier> list = supplierService.find(supplierName);
         for (Supplier s:list){
             //System.out.println(s.getSupplierName());
         }
         JSON json = JSONSerializer.toJSON(list);
         System.out.println("json.tostring()..."+json.toString());
         return json.toString();
     }

    @RequestMapping(value = "supplierController_find2",produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String supplierController_find2(String supplierName){
        List<Supplier> suppliers = supplierService.find(supplierName);
        List<Warehouse> warehouses=warehouseService.find();
        JSONArray ja = new JSONArray();
        ja.add(suppliers);
        ja.add(warehouses);

        JSON json=JSONSerializer.toJSON(ja);
        System.out.println("json.tostring()..."+json.toString());
        return json.toString();
    }

    @RequestMapping(value = "supplier_save",produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String supplier_save(Supplier supplier){
        System.out.println(supplier.getSupplierName());
        int count=0;
        System.out.println(supplier);
        if (supplier !=null && supplier.getSupplierId()!=null){
            System.out.println("xiugai");
            count=supplierService.modfiy(supplier);
        }else{
            System.out.println("zengjia");
            count=supplierService.add(supplier);
        }
        System.out.println(count);
        return String.valueOf(count);
    }

    @RequestMapping(value = "supplier_findByid",produces = "text/html;charset=UTF-8")
    public String supplier_findByid(@RequestParam(required = false,value = "supplierId") Integer supplierId, ModelMap modelmap){
        System.out.println("1111111");
        System.out.println(supplierId);
        if (supplierId !=null){
            System.out.println(supplierId);
            Supplier supplier=supplierService.findById(supplierId);
            modelmap.put("supplier",supplier);
        }
        return "supplierEdit";
    }
//    @RequestMapping(value = "supplier_view",produces ="text/html;charset=UTF-8" )
//    public String supplier_view(@RequestParam(required = true,value = "supplierId") Integer supplierId,ModelMap modelMap){
//        if (supplierId!=null){
//            Supplier supplier=supplierService.findById(supplierId);
//            modelMap.put("supplier",supplier);
//
//        }
//        return "supplierview";
//    }
//    @RequestMapping(value = "supplier_remove",produces = "text/html;charset=UTF-8")
//    public String remove(@RequestParam(required = false ,value = "ids") String ids ,ModelMap modelMap)
//    {
//        int count=0;
//        System.out.println(ids);
//        String []suppliers=ids.split(",");
//        System.out.println(suppliers);
//        System.out.println("2221");
//        for(int i=0;i<suppliers.length;i++){
//            System.out.println("23333");
//            Integer supplierId = NumberUtils.createInteger(suppliers[i]);
//            count+=supplierService.remove(supplierId);
//            System.out.println("4444");
//        }
//        System.out.println(count+" eeeee");
//        return String.valueOf(count);
//    }
    @RequestMapping(value = "supplier_find2",produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String supplier_find2(String supplierName) {

        List<Supplier> suppliers = supplierService.find(supplierName);
        Supplier supplier = new Supplier();
        supplier.setSupplierId(0);
        supplier.setSupplierName("请选择");
        suppliers.add(0,supplier);
        JsonConfig jsonConfig = new JsonConfig();
        // 设置指定属性不在 json 格式数据中显示
        jsonConfig.setExcludes(new String[]{"loc"});
        JSON json = JSONSerializer.toJSON(suppliers, jsonConfig);
        return json.toString();
    }
}
