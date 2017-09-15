package com.hms.dao;

import com.hms.pojo.Supplier;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("supplierMapper")
public interface SupplierMapper {

    int add(Supplier supplier);

    int modfiy(Supplier supplier);

    int remove(@Param("supplierId") Integer supplierId);

    List<Supplier> find(@Param("supplierName") String supplierName);

    Supplier findById(@Param("supplierId") Integer supplierId);

}
