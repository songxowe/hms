package com.hms.pojo;

import java.io.Serializable;

public class Warehouse implements Serializable {
    private  Integer warehouseId;
    private  String  warehouseName;
    private  String  warehouseStatus;


    public Integer getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Integer warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public String getWarehouseStatus() {
        return warehouseStatus;
    }

    public void setWarehouseStatus(String warehouseStatus) {
        this.warehouseStatus = warehouseStatus;
    }

    public Warehouse() {
        super();
    }
}
