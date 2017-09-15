package com.hms.dao;

import com.hms.pojo.Bill;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("billMapper")
public interface BillMapper {

    Bill findById(@Param("billId") Integer billId);
    int add(Bill bill);
    int modify(Bill bill);

    List<Bill> findByCheckId(@Param("checkId") Integer checkId);
    List<Bill> findByGroupId(@Param("groupId") Integer groupId);

}
