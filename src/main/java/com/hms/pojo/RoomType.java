package com.hms.pojo;
import java.io.Serializable;

///房型实体类
public class RoomType implements Serializable {

	private Integer roomTypeId;//主键id
	private String roomTypeName;//房型名称
	private String roomTypeRemark;//房型备注
	private String otherOne;
	private String otherTwo;
	private String otherThree;

	public RoomType(){

	}

	public Integer getRoomTypeId() {
		return roomTypeId;
	}

	public void setRoomTypeId(Integer roomTypeId) {
		this.roomTypeId = roomTypeId;
	}

	public String getRoomTypeName() {
		return roomTypeName;
	}

	public void setRoomTypeName(String roomTypeName) {
		this.roomTypeName = roomTypeName;
	}

	public String getRoomTypeRemark() {
		return roomTypeRemark;
	}

	public void setRoomTypeRemark(String roomTypeRemark) {
		this.roomTypeRemark = roomTypeRemark;
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