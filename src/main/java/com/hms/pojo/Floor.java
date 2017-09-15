package com.hms.pojo;

import java.io.Serializable;

//楼层实体类
public class Floor implements Serializable {

	private Integer floorId;//楼层id
	private String otherOne;
	private String otherTwo;
	private String otherThree;
	//默认构造方法
	public Floor(){

	}

	//get and set
	public Integer getFloorId() {
		return floorId;
	}
	public String getOtherOne() {
		return otherOne;
	}
	public String getOtherTwo() {
		return otherTwo;
	}
	public String getOtherThree() {
		return otherThree;
	}
	public void setFloorId(Integer floorId) {
		this.floorId = floorId;
	}
	public void setOtherOne(String otherOne) {
		this.otherOne = otherOne;
	}
	public void setOtherTwo(String otherTwo) {
		this.otherTwo = otherTwo;
	}
	public void setOtherThree(String otherThree) {
		this.otherThree = otherThree;
	}

}