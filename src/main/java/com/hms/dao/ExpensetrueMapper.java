package com.hms.dao;

import com.hms.pojo.Expensetrue;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("expensetrueMapper")
public interface ExpensetrueMapper {

    Expensetrue findById(@Param("expensetrueId") Integer expensetrueId);
    int add(Expensetrue expensetrue);
    int modify(Expensetrue expensetrue);

    List<Expensetrue> findByBillId(@Param("billId") Integer billId);

}
