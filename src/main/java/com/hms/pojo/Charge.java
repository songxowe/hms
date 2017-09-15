package com.hms.pojo;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * Charge entity. @author MyEclipse Persistence Tools
 */

public class Charge implements Serializable {

    // Fields

    private Integer chargeId;
    private Member member;
    private Chargecase chargecase;
    private String payType;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date chargeTime;
    @NumberFormat(pattern = "#,###.00")
    private Double lastMoney;
    @NumberFormat(pattern = "#,###.00")
    private Double chargeMoney;
    private String operater;
    private String chargeRemark;

    public Charge() {
    }

    public Charge(Member member, Chargecase chargecase, String payType, Date chargeTime, Double lastMoney, Double chargeMoney, String operater, String chargeRemark) {
        this.member = member;
        this.chargecase = chargecase;
        this.payType = payType;
        this.chargeTime = chargeTime;
        this.lastMoney = lastMoney;
        this.chargeMoney = chargeMoney;
        this.operater = operater;
        this.chargeRemark = chargeRemark;
    }

    public Integer getChargeId() {
        return chargeId;
    }

    public void setChargeId(Integer chargeId) {
        this.chargeId = chargeId;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Chargecase getChargecase() {
        return chargecase;
    }

    public void setChargecase(Chargecase chargecase) {
        this.chargecase = chargecase;
    }

    public String getPayType() {
        return payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public Date getChargeTime() {
        return chargeTime;
    }

    public void setChargeTime(Date chargeTime) {
        this.chargeTime = chargeTime;
    }

    public Double getLastMoney() {
        return lastMoney;
    }

    public void setLastMoney(Double lastMoney) {
        this.lastMoney = lastMoney;
    }

    public Double getChargeMoney() {
        return chargeMoney;
    }

    public void setChargeMoney(Double chargeMoney) {
        this.chargeMoney = chargeMoney;
    }

    public String getOperater() {
        return operater;
    }

    public void setOperater(String operater) {
        this.operater = operater;
    }

    public String getChargeRemark() {
        return chargeRemark;
    }

    public void setChargeRemark(String chargeRemark) {
        this.chargeRemark = chargeRemark;
    }
}
