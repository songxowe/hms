package com.hms.pojo;


import java.io.Serializable;

//房间实体类
public class Room implements Serializable {

	private Integer roomId;//主键id
	//外键楼层表
	private Floor floor;
	//外键房型表
	private RoomType roomType;
	private Integer roomNo;//房间号
	private String roomStatus;//状态
	private String roomRemark;//备注
	private String otherOne;
	private String otherTwo;
	private String otherThree;

	public Room(){

	}

	public Integer getRoomId() {
		return roomId;
	}
	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
	}
	public Floor getFloor() {
		return floor;
	}
	public void setFloor(Floor floor) {
		this.floor = floor;
	}

	public RoomType getRoomType() {
		return roomType;
	}

	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}

	public Integer getRoomNo() {
		return roomNo;
	}
	public void setRoomNo(Integer roomNo) {
		this.roomNo = roomNo;
	}
	public String getRoomStatus() {
		return roomStatus;
	}
	public void setRoomStatus(String roomStatus) {
		this.roomStatus = roomStatus;
	}
	public String getRoomRemark() {
		return roomRemark;
	}
	public void setRoomRemark(String roomRemark) {
		this.roomRemark = roomRemark;
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