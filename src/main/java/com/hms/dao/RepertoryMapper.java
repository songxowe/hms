package com.hms.dao;

import com.hms.pojo.Repertory;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("repertoryMapper")
public interface RepertoryMapper {
    int add(@Param("repertory") Repertory repertory);
    List<Repertory> find();
    int modfiy(@Param("repertory") Repertory repertory);
    Repertory Pfindbyid(@Param("productId") Integer productId,
                        @Param("warehouseId") Integer warehouseId);
}
