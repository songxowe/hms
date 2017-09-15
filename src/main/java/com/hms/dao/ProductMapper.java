package com.hms.dao;

import com.hms.pojo.Product;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("productMapper")
public interface ProductMapper {
    int add(Product product);
    int modfiy(Product product);
    int remove(@Param("productId") Integer productId);
    // @Select("select product_id productId,product_name productName from product")
     List<Product> find(@Param("productName") String productName);


     //List<Product> findByParam();
    Product findById(@Param("productId") Integer productId);


}
