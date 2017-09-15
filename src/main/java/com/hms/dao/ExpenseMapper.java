package com.hms.dao;


import com.hms.pojo.Expense;
import org.apache.ibatis.annotations.*;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("expenseMapper")
public interface ExpenseMapper {

    int add(Expense expense);


    int modify(Expense expense);

    Expense findById(Integer expenseId);

    List<Expense> find(@Param(value = "expenseName") String expenseName);


}
