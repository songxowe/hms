package com.hms.pojo;

import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

//钟点房追加房价实体类
public class AddRent implements Serializable {

	private Integer addrentId;//主键id
	//外键 房型编号
	private RoomType roomType;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date beginTime;//该方案可以使用的开始时间

	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date endTime;//该方案可以使用的结束时间
	private Integer toHalfHour;//超过多少分钟按半小时收费
	private Integer toHour;//超过多少分钟按小时收费
	private Integer toDay;//超过多少小时按一天收费
	private Double hourPrice;//钟点房单价
	private Double addHourPrice;//约定之外每小时的加收价
	private Integer hours;//该方案可以开多少小时
	private Integer freeRoom;//每天可开房间数
	private String otherOne;//是否可用
	private String otherTwo;
	private String otherThree;


	public AddRent() {
	}

	public Integer getAddrentId() {
		return addrentId;
	}

	public void setAddrentId(Integer addrentId) {
		this.addrentId = addrentId;
	}

	public RoomType getRoomType() {
		return roomType;
	}

	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}

	public Date getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(Date beginTime) {
		this.beginTime = beginTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public Integer getToHalfHour() {
		return toHalfHour;
	}

	public void setToHalfHour(Integer toHalfHour) {
		this.toHalfHour = toHalfHour;
	}

	public Integer getToHour() {
		return toHour;
	}

	public void setToHour(Integer toHour) {
		this.toHour = toHour;
	}

	public Integer getToDay() {
		return toDay;
	}

	public void setToDay(Integer toDay) {
		this.toDay = toDay;
	}

	public Double getHourPrice() {
		return hourPrice;
	}

	public void setHourPrice(Double hourPrice) {
		this.hourPrice = hourPrice;
	}

	public Double getAddHourPrice() {
		return addHourPrice;
	}

	public void setAddHourPrice(Double addHourPrice) {
		this.addHourPrice = addHourPrice;
	}

	public Integer getHours() {
		return hours;
	}

	public void setHours(Integer hours) {
		this.hours = hours;
	}

	public Integer getFreeRoom() {
		return freeRoom;
	}

	public void setFreeRoom(Integer freeRoom) {
		this.freeRoom = freeRoom;
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