package com.hms.service;

import com.hms.dao.ProductMapper;
import com.hms.pojo.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


@Service("productService")
@Transactional(readOnly = true,propagation = Propagation.NOT_SUPPORTED)
public class ProductService {
    @Resource(name = "productMapper")
    private ProductMapper productMapper;
    public int add(Product product){
        return productMapper.add(product);
    }
    public List<Product> find(String productName){
        return productMapper.find(productName);
    }
    public int remove(Integer productId){
        return productMapper.remove(productId);
    }
    public int modfiy(Product product){
        return  productMapper.modfiy(product);
    }
    public Product findById(Integer productId){
        return  productMapper.findById(productId);
    }
}
