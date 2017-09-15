package com.hms.pojo;

import java.io.Serializable;

public class Expensetrue implements Serializable {
    private static final long serialVersionUID = 6482160438419016955L;

    private Integer expensetrueId;
    private String expensetrueName;
    private String expensetrueType;
    private Integer expensetrueUnit;
    private Double expensetruePrice;
    private String expensetrueStatus;

    private Integer billId;

    public Expensetrue() {
    }

    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }

    public Integer getExpensetrueId() {
        return expensetrueId;
    }

    public void setExpensetrueId(Integer expensetrueId) {
        this.expensetrueId = expensetrueId;
    }

    public String getExpensetrueName() {
        return expensetrueName;
    }

    public void setExpensetrueName(String expensetrueName) {
        this.expensetrueName = expensetrueName;
    }

    public String getExpensetrueType() {
        return expensetrueType;
    }

    public void setExpensetrueType(String expensetrueType) {
        this.expensetrueType = expensetrueType;
    }

    public Integer getExpensetrueUnit() {
        return expensetrueUnit;
    }

    public void setExpensetrueUnit(Integer expensetrueUnit) {
        this.expensetrueUnit = expensetrueUnit;
    }

    public Double getExpensetruePrice() {
        return expensetruePrice;
    }

    public void setExpensetruePrice(Double expensetruePrice) {
        this.expensetruePrice = expensetruePrice;
    }

    public String getExpensetrueStatus() {
        return expensetrueStatus;
    }

    public void setExpensetrueStatus(String expensetrueStatus) {
        this.expensetrueStatus = expensetrueStatus;
    }

    @Override
    public String toString() {
        return "Expensetrue{" +
                "expensetrueId=" + expensetrueId +
                ", expensetrueName='" + expensetrueName + '\'' +
                ", expensetrueType='" + expensetrueType + '\'' +
                ", expensetrueUnit=" + expensetrueUnit +
                ", expensetruePrice=" + expensetruePrice +
                ", expensetrueStatus='" + expensetrueStatus + '\'' +
                '}';
    }
}
