package com.hms.dao;

import com.hms.pojo.Warehouse;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("warehouseMapper")
public interface WarehouseMapper {
    @Insert("insert into warehouse(warehouse_name, warehouse_status)" +
            "values(#{warehouseName},#{warehouseStatus})")
    int add(Warehouse warehouse);
    @Select("select warehouse_id warehouseId, warehouse_name warehouseName, warehouse_status warehouseStatus from warehouse")
    List<Warehouse>find();
    @Update("update warehouse set warehouse_name=#{warehouseName}, warehouse_status=#{ warehouseStatus} " +
            "where  warehouse_id=#{ warehouseId}")
    int modify(Warehouse warehouse);
    @Delete("delete from warehouse where warehouse_id=#{warehouseId}")
    int remove(Integer WarehouseId);
    @Select("select warehouse_id warehouseId, warehouse_name warehouseName, warehouse_status warehouseStatus from warehouse where warehouse_id=#{warehouseId}")
    Warehouse findById(Integer warehouseId);


}
