package com.hms.controller;
import com.hms.pojo.Product;
import com.hms.pojo.Supplier;
import com.hms.service.ProductService;
import com.hms.service.SupplierService;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

import javax.annotation.Resource;


@Controller
public class ProductController {
    @Resource(name="productService")
    private  ProductService productService;
    @Resource(name = "supplierService")
    private  SupplierService supplierService;
    @RequestMapping(value = "product_find" ,produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String product_find(String productName ){
        List<Product> a=productService.find(productName);
        JSON json= JSONSerializer.toJSON(a);
        for (Product product: a){
            System.out.println("333233");
           // System.out.println(product.getProductName());
        }
        System.out.println("json.tostring()..."+json.toString());
        return json.toString();
    }
    @RequestMapping("product_save_1")
    public @ResponseBody String product_save(Product product){

        System.out.println("111");
        System.out.println(product.getProductId()+" "+product.getProductName());
        Integer count = 0;
        if (product!=null &&product.getProductId()!=null){
            System.out.println("修改");
            count += productService.modfiy(product);
            System.out.println(product.getProductId());
        }else {
            System.out.println("新增");
            count += productService.add(product);

        }

        return count.toString();
    }
    @RequestMapping(value = "product_finById",produces = "text/html;charset=UTF-8")
    public String product_finById(@RequestParam(required = false,value = "productId") Integer productId, ModelMap modelmap){
        if (productId !=null){
            Product product=productService.findById(productId);
            modelmap.put("product",product);
        }
        return "productedit";
    }
    @RequestMapping(value = "product_find2" ,produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String product_find2(String productName) {

        List<Product> products = productService.find(productName);
        Product product = new Product();
        product.setProductId(0);
        product.setProductName("请选择");
        products.add(0, product);
        JsonConfig jsonConfig = new JsonConfig();
        // 设置指定属性不在 json 格式数据中显示
        jsonConfig.setExcludes(new String[]{"loc"});
        JSON json = JSONSerializer.toJSON(products, jsonConfig);
        return json.toString();
    }
}
