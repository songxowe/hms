package com.hms.pojo;

import org.springframework.format.annotation.NumberFormat;

import java.util.HashSet;
import java.util.Set;

/**
 * Expense entity. @author MyEclipse Persistence Tools
 */

public class Expense implements java.io.Serializable {

    // Fields

    private Integer expenseId;
    private Integer billid;
    private String expenseName;
    private String expenseType;
    private String expenseUnit;
    private Double expensePrice;
    private String expenseStatus;

    public Integer getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(Integer expenseId) {
        this.expenseId = expenseId;
    }

    public Integer getBillid() {
        return billid;
    }

    public void setBillid(Integer billid) {
        this.billid = billid;
    }

    public String getExpenseName() {
        return expenseName;
    }

    public void setExpenseName(String expenseName) {
        this.expenseName = expenseName;
    }

    public String getExpenseType() {
        return expenseType;
    }

    public void setExpenseType(String expenseType) {
        this.expenseType = expenseType;
    }

    public String getExpenseUnit() {
        return expenseUnit;
    }

    public void setExpenseUnit(String expenseUnit) {
        this.expenseUnit = expenseUnit;
    }

    public Double getExpensePrice() {
        return expensePrice;
    }

    public void setExpensePrice(Double expensePrice) {
        this.expensePrice = expensePrice;
    }

    public String getExpenseStatus() {
        return expenseStatus;
    }

    public void setExpenseStatus(String expenseStatus) {
        this.expenseStatus = expenseStatus;
    }
}