package com.hms.pojo;

public class Repertory {
    private Integer repertoryId;
    private Warehouse warehouse;
    private Product product;
    private Integer productTotal;

    public Integer getRepertoryId() {
        return repertoryId;
    }

    public void setRepertoryId(Integer repertoryId) {
        this.repertoryId = repertoryId;
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

    public Integer getProductTotal() {
        return productTotal;
    }

    public void setProductTotal(Integer productTotal) {
        this.productTotal = productTotal;
    }

    public Repertory() {
        super();
    }

    @Override
    public String toString() {
        return "Repertory{" +
                "repertoryId=" + repertoryId +
                ", warehouse=" + warehouse +
                ", product=" + product +
                ", productTotal=" + productTotal +
                '}';
    }
}
