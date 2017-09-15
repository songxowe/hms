package com.hms.pojo;

import java.io.Serializable;

//房价方案实体类
public class RoomCase implements Serializable {

	private Integer roomCaseId;
	//外键房间类型表
	private RoomType roomType;
	private String roomCaseName;//房价名
	private String payType;//支付方式
	private String guestType;//客人来源
	private Double ordinaryPrice;//平时价
	private Double weekendPrice;//周末价
	private Double nightPrice;//午夜房房价
	private Double monthPrice;//月租房房价
	private String priceType;//价格类型
	private String roomDefault;//是否默认
	private String priceStatus;//房价状态
	private Integer sales;//销售量
	private String otherOne;
	private String otherTwo;
	private String otherThree;

	public RoomCase(){

	}


	public Integer getRoomCaseId() {
		return roomCaseId;
	}

	public void setRoomCaseId(Integer roomCaseId) {
		this.roomCaseId = roomCaseId;
	}

	public RoomType getRoomType() {
		return roomType;
	}

	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}

	public String getRoomCaseName() {
		return roomCaseName;
	}

	public void setRoomCaseName(String roomCaseName) {
		this.roomCaseName = roomCaseName;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

	public String getGuestType() {
		return guestType;
	}

	public void setGuestType(String guestType) {
		this.guestType = guestType;
	}

	public Double getOrdinaryPrice() {
		return ordinaryPrice;
	}

	public void setOrdinaryPrice(Double ordinaryPrice) {
		this.ordinaryPrice = ordinaryPrice;
	}

	public Double getWeekendPrice() {
		return weekendPrice;
	}

	public void setWeekendPrice(Double weekendPrice) {
		this.weekendPrice = weekendPrice;
	}

	public Double getNightPrice() {
		return nightPrice;
	}

	public void setNightPrice(Double nightPrice) {
		this.nightPrice = nightPrice;
	}

	public Double getMonthPrice() {
		return monthPrice;
	}

	public void setMonthPrice(Double monthPrice) {
		this.monthPrice = monthPrice;
	}

	public String getPriceType() {
		return priceType;
	}

	public void setPriceType(String priceType) {
		this.priceType = priceType;
	}

	public String getRoomDefault() {
		return roomDefault;
	}

	public void setRoomDefault(String roomDefault) {
		this.roomDefault = roomDefault;
	}

	public String getPriceStatus() {
		return priceStatus;
	}

	public void setPriceStatus(String priceStatus) {
		this.priceStatus = priceStatus;
	}

	public Integer getSales() {
		return sales;
	}

	public void setSales(Integer sales) {
		this.sales = sales;
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

}