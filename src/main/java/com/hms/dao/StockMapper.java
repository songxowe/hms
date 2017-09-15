package com.hms.dao;

import com.hms.pojo.Stock;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("stockMapper")
public interface StockMapper {
    List<Stock> find();

    int add(@Param("stock") Stock stock);

    int remove(@Param("stockId") Integer stockId);

    int modfiy(@Param("stock") Stock stock);

    Stock findById(@Param("stockId") Integer stockId);
}
