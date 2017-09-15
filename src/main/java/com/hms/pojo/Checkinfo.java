package com.hms.pojo;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Checkinfo entity. @author MyEclipse Persistence Tools
 */

public class Checkinfo implements Serializable {


    private static final long serialVersionUID = -2709625443120179826L;
    private Integer checkId;
    private RoomCase roomCase;
    private Integer memberId;
    private Integer diyId;
    private String guestType;
    private String checkType;

    @NumberFormat(pattern = "#,###.00")
    private Double roomPrice;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date inTime;

    private Integer stayHours;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date preoutTime;
    private String strpreoutTime;

    private Integer mainpayRoom;
    private String payType;
    private String operater;

    @NumberFormat(pattern = "#,###.00")
    private Double sumRoomprice;
    private String checkRemark;
    private String secret;
    private String otherOne;
    private String otherTwo;
    private String otherThree;

    //新增属性
    private Integer groupId;
    private Room room;

    public String getStrpreoutTime() {
        return strpreoutTime;
    }

    public void setStrpreoutTime(String strpreoutTime) {
        this.strpreoutTime = strpreoutTime;
    }


// Constructors

    /**
     * default constructor
     */
    public Checkinfo() {
    }

    // Property accessors



    public Integer getCheckId() {
        return this.checkId;
    }

    public void setCheckId(Integer checkId) {
        this.checkId = checkId;
    }

    public RoomCase getRoomCase() {
        return this.roomCase;
    }

    public void setRoomCase(RoomCase roomCase) {
        this.roomCase = roomCase;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public Integer getDiyId() {
        return this.diyId;
    }

    public void setDiyId(Integer diyId) {
        this.diyId = diyId;
    }

    public String getGuestType() {
        return this.guestType;
    }

    public void setGuestType(String guestType) {
        this.guestType = guestType;
    }

    public String getCheckType() {
        return this.checkType;
    }

    public void setCheckType(String checkType) {
        this.checkType = checkType;
    }

    public Double getRoomPrice() {
        return this.roomPrice;
    }

    public void setRoomPrice(Double roomPrice) {
        this.roomPrice = roomPrice;
    }

    public Date getInTime() {
        return this.inTime;
    }

    public void setInTime(Date inTime) {
        this.inTime = inTime;
    }

    public Integer getStayHours() {
        return this.stayHours;
    }

    public void setStayHours(Integer stayHours) {
        this.stayHours = stayHours;
    }

    public Date getPreoutTime() {
        return this.preoutTime;
    }

    public void setPreoutTime(Date preoutTime) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.setStrpreoutTime(sdf.format(preoutTime));
        this.preoutTime = preoutTime;
    }

    public Integer getMainpayRoom() {
        return this.mainpayRoom;
    }

    public void setMainpayRoom(Integer mainpayRoom) {
        this.mainpayRoom = mainpayRoom;
    }

    public String getPayType() {
        return this.payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public String getOperater() {
        return this.operater;
    }

    public void setOperater(String operater) {
        this.operater = operater;
    }

    public Double getSumRoomprice() {
        return this.sumRoomprice;
    }

    public void setSumRoomprice(Double sumRoomprice) {
        this.sumRoomprice = sumRoomprice;
    }

    public String getCheckRemark() {
        return this.checkRemark;
    }

    public void setCheckRemark(String checkRemark) {
        this.checkRemark = checkRemark;
    }

    public String getSecret() {
        return this.secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
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

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    @Override
    public String toString() {
        return "Checkinfo{" +
                "checkId=" + checkId +
                ", roomCase=" + roomCase +
                ", memberId=" + memberId +
                ", diyId=" + diyId +
                ", guestType='" + guestType + '\'' +
                ", checkType='" + checkType + '\'' +
                ", roomPrice=" + roomPrice +
                ", inTime=" + inTime +
                ", stayHours=" + stayHours +
                ", preoutTime=" + preoutTime +
                ", mainpayRoom=" + mainpayRoom +
                ", payType='" + payType + '\'' +
                ", operater='" + operater + '\'' +
                ", sumRoomprice=" + sumRoomprice +
                ", checkRemark='" + checkRemark + '\'' +
                ", secret='" + secret + '\'' +
                ", otherOne='" + otherOne + '\'' +
                ", otherTwo='" + otherTwo + '\'' +
                ", otherThree='" + otherThree + '\'' +
                ", groupId=" + groupId +
                ", room=" + room +
                '}';
    }
}