package com.hms.pojo;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
//localhost:8086/stock_add?supplier.supplierId=21&warehouse.warehouseId=1&product.productId=1&stockRemark="stockRemark"
public class Stock implements Serializable {
    private static final long serialVersionUID = -3765106361283385437L;
    private Integer stockId;
    private Supplier supplier;
    private Warehouse warehouse;
    private Product product;
    private String stockRemark;
    private String stockAbstract;
    private String stockIntroduction;
    private Integer stockQuantity;
    private String stockSumprice;
    @NumberFormat(pattern = "#,#,###.00")
    private Double stockPrice;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date stockDate;

    private String strDate;

    public String getStrDate() {

        return strDate;
    }

    public void setStrDate(String strDate) {

        this.strDate = strDate;
    }

    @Override
    public String toString() {
        return "Stock{" +
                "stockId=" + stockId +
                ", supplier=" + supplier +
                ", warehouse=" + warehouse +
                ", product=" + product +
                ", stockRemark='" + stockRemark + '\'' +
                ", stockAbstract='" + stockAbstract + '\'' +
                ", stockIntroduction='" + stockIntroduction + '\'' +
                ", stockQuantity=" + stockQuantity +
                ", stockSumprice='" + stockSumprice + '\'' +
                ", stockPrice=" + stockPrice +
                ", stockDate=" + stockDate +
                ", strDate='" + strDate + '\'' +
                '}';
    }

    public Double getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(Double stockPrice) {
        this.stockPrice = stockPrice;
    }

    public Integer getStockId() {
        return stockId;
    }

    public void setStockId(Integer stockId) {
        this.stockId = stockId;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getStockRemark() {
        return stockRemark;
    }

    public void setStockRemark(String stockRemark) {
        this.stockRemark = stockRemark;
    }

    public String getStockAbstract() {
        return stockAbstract;
    }

    public void setStockAbstract(String stockAbstract) {
        this.stockAbstract = stockAbstract;
    }

    public String getStockIntroduction() {
        return stockIntroduction;
    }

    public void setStockIntroduction(String stockIntroduction) {
        this.stockIntroduction = stockIntroduction;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getStockSumprice() {
        return stockSumprice;
    }

    public void setStockSumprice(String stockSumprice) {
        this.stockSumprice = stockSumprice;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Date getStockDate() {
        return stockDate;
    }

    public void setStockDate(Date stockDate) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.setStrDate(sdf.format(stockDate));

        this.stockDate = stockDate;
    }

    public Stock() {
        super();
    }
}
