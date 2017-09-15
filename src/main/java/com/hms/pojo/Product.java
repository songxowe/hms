package com.hms.pojo;

import org.springframework.format.annotation.NumberFormat;

import java.io.Serializable;

public class Product implements Serializable {
    private Integer productId;
    private String productName;
    private String productType;
        private String productUnit;
    @NumberFormat(pattern = "####.00")
    private Double productPrice;
    private String productStatus;

    public Product() {
    }




    public Integer getProductId() {
        return this.productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return this.productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductType() {
        return this.productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getProductUnit() {
        return this.productUnit;
    }

    public void setProductUnit(String productUnit) {
        this.productUnit = productUnit;
    }

    public Double getProductPrice() {
        return this.productPrice;
    }

    public void setProductPrice(Double productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductStatus() {
        return this.productStatus;
    }

    public void setProductStatus(String productStatus) {
        this.productStatus = productStatus;
    }


}
