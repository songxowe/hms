package com.hms.controller;

import com.hms.pojo.Product;
import com.hms.pojo.Repertory;
import com.hms.pojo.Stock;
import com.hms.pojo.Warehouse;
import com.hms.service.RepertoryService;
import com.hms.service.StockService;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class StockController {
    @Resource(name = "stockService")
    private StockService stockService;
    @Resource(name = "repertoryService")
    private RepertoryService repertoryService;
    @RequestMapping(value = "stock_find",produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String stock_find(){
        System.out.println("1111");
        List<Stock> stock=stockService.find();
        System.out.println(stock.size());
        for (Stock s:stock){
            System.out.println(s.getProduct().getProductName());
        }
        JSON json= JSONSerializer.toJSON(stock);
        System.out.println("json.tostring()..."+json.toString());
        return json.toString();
    }
    @RequestMapping(value = "stock_add_1")
    @ResponseBody
    public String stock_add(Stock stock) {
        System.out.println("新增");
        System.out.println(stock.getStockRemark()+stock.getStockAbstract()+stock.getStockQuantity()+stock.getProduct().getProductId()+stock.getStockPrice());
        Integer count=0;
        count=stockService.add(stock);
        System.out.println("11111");
        Repertory repertory = repertoryService.pfindByid(stock.getProduct().getProductId(),stock.getWarehouse().getWarehouseId());
        System.out.println("222");
        if (repertory != null){
            System.out.println("3333");
                repertory.setProductTotal(repertory.getProductTotal()+stock.getStockQuantity());
            System.out.println("44444");
                count+= repertoryService.modfiy(repertory);
        }else {
            System.out.println("555");
            Repertory r = new Repertory();
            Product p = new Product();
            Warehouse w=new Warehouse();

            p.setProductId(stock.getProduct().getProductId());
            r.setProduct(p);

            w.setWarehouseId(stock.getWarehouse().getWarehouseId());
            r.setWarehouse(w);

            r.setProductTotal(stock.getStockQuantity());
            repertoryService.add(r);

        }
        if(stock==null){
            stock = new Stock();
        }
        JSON json=JSONSerializer.toJSON(stock);
        System.out.println(json.toString());
        return json.toString();
    }
}
