package com.hms.pojo;

import org.springframework.format.annotation.NumberFormat;

public class Pay implements java.io.Serializable {

    private static final long serialVersionUID = 1L;
    private Integer payId;
    private Integer checkId;
    private Integer groupId;
    private String payType;
    @NumberFormat(pattern = "#,###.00")
    private Double prepay;
    private String otherOne;
    private String otherTwo;
    private String otherThree;

    // Constructors

    /**
     * default constructor
     */
    public Pay() {
    }


    // Property accessors

    public Integer getPayId() {
        return this.payId;
    }

    public void setPayId(Integer payId) {
        this.payId = payId;
    }


    public Integer getCheckId() {
        return checkId;
    }

    public void setCheckId(Integer checkId) {
        this.checkId = checkId;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getPayType() {
        return this.payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public Double getPrepay() {
        return this.prepay;
    }

    public void setPrepay(Double prepay) {
        this.prepay = prepay;
    }

    public String getOtherOne() {
        return this.otherOne;
    }

    public void setOtherOne(String otherOne) {
        this.otherOne = otherOne;
    }

    public String getOtherTwo() {
        return this.otherTwo;
    }

    public void setOtherTwo(String otherTwo) {
        this.otherTwo = otherTwo;
    }

    public String getOtherThree() {
        return this.otherThree;
    }

    public void setOtherThree(String otherThree) {
        this.otherThree = otherThree;
    }

    @Override
    public String toString() {
        return "Pay{" +
                "payId=" + payId +
                ", checkId=" + checkId +
                ", groupId=" + groupId +
                ", payType='" + payType + '\'' +
                ", prepay=" + prepay +
                ", otherOne='" + otherOne + '\'' +
                ", otherTwo='" + otherTwo + '\'' +
                ", otherThree='" + otherThree + '\'' +
                '}';
    }
}