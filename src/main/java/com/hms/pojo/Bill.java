package com.hms.pojo;

import java.io.Serializable;

public class Bill implements Serializable {
    private static final long serialVersionUID = 6878914534007710117L;

    private Integer billId;
    private Integer checkId;
    private Integer expenseId;
    private Double receive;
    private Double prepay;
    private Integer days;
    private Double roomMoney;
    private Double remaining;
    private String billRemark;
    private String otherOne;
    private String otherTwo;
    private String otherThree;
    private Integer groupId;


    public Bill() {
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }

    public Integer getCheckId() {
        return checkId;
    }

    public void setCheckId(Integer checkId) {
        this.checkId = checkId;
    }

    public Integer getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(Integer expenseId) {
        this.expenseId = expenseId;
    }

    public Double getReceive() {
        return receive;
    }

    public void setReceive(Double receive) {
        this.receive = receive;
    }

    public Double getPrepay() {
        return prepay;
    }

    public void setPrepay(Double prepay) {
        this.prepay = prepay;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    public Double getRoomMoney() {
        return roomMoney;
    }

    public void setRoomMoney(Double roomMoney) {
        this.roomMoney = roomMoney;
    }

    public Double getRemaining() {
        return remaining;
    }

    public void setRemaining(Double remaining) {
        this.remaining = remaining;
    }

    public String getBillRemark() {
        return billRemark;
    }

    public void setBillRemark(String billRemark) {
        this.billRemark = billRemark;
    }

    public String getOtherOne() {
        return otherOne;
    }

    public void setOtherOne(String otherOne) {
        this.otherOne = otherOne;
    }

    public String getOtherTwo() {
        return otherTwo;
    }

    public void setOtherTwo(String otherTwo) {
        this.otherTwo = otherTwo;
    }

    public String getOtherThree() {
        return otherThree;
    }

    public void setOtherThree(String otherThree) {
        this.otherThree = otherThree;
    }

    @Override
    public String toString() {
        return "Bill{" +
                "billId=" + billId +
                ", checkId=" + checkId +
                ", expenseId=" + expenseId +
                ", receive=" + receive +
                ", prepay=" + prepay +
                ", days=" + days +
                ", roomMoney=" + roomMoney +
                ", remaining=" + remaining +
                ", billRemark='" + billRemark + '\'' +
                ", otherOne='" + otherOne + '\'' +
                ", otherTwo='" + otherTwo + '\'' +
                ", otherThree='" + otherThree + '\'' +
                '}';
    }
}
