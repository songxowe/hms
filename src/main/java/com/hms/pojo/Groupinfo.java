package com.hms.pojo;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import java.util.Date;


public class Groupinfo implements java.io.Serializable {


	private static final long serialVersionUID = 4153456501007106473L;
	private Integer groupId;
	private Integer diyId;
	private String groupName;
	private String groupLeader;
	private String leaderPhone;
	private Integer menderId;
	private String guestType;

	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date inTime;
	private Integer stayHours;
	@NumberFormat(pattern = "#,###.00")
	private Double sumMoney;
	private String otherOne;
	private String otherTwo;
	private String otherThree;


	// Constructors

	/** default constructor */
	public Groupinfo() {
	}

	
	// Property accessors

	public Integer getGroupId() {
		return this.groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	public Integer getDiyId() {
		return this.diyId;
	}

	public void setDiyId(Integer diyId) {
		this.diyId = diyId;
	}

	public String getGroupName() {
		return this.groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getGroupLeader() {
		return this.groupLeader;
	}

	public void setGroupLeader(String groupLeader) {
		this.groupLeader = groupLeader;
	}

	public String getLeaderPhone() {
		return this.leaderPhone;
	}

	public void setLeaderPhone(String leaderPhone) {
		this.leaderPhone = leaderPhone;
	}

	public Integer getMenderId() {
		return this.menderId;
	}

	public void setMenderId(Integer menderId) {
		this.menderId = menderId;
	}

	public String getGuestType() {
		return this.guestType;
	}

	public void setGuestType(String guestType) {
		this.guestType = guestType;
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

	public Double getSumMoney() {
		return this.sumMoney;
	}

	public void setSumMoney(Double sumMoney) {
		this.sumMoney = sumMoney;
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

}