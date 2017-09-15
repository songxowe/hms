package com.hms.pojo;

/**
 * Userinfo entity. @author MyEclipse Persistence Tools
 */

public class Userinfo implements java.io.Serializable {

	// Fields

	private Integer userId;
	private String userName;
	private String password;
	private String permission;
	private String phone;
	private String userStatus;
	private Double imprest;

	// Constructors

	/** default constructor */
	public Userinfo() {
	}

	/** full constructor */
	public Userinfo(String userName, String password, String permission, String phone, String userStatus,
			Double imprest) {
		this.userName = userName;
		this.password = password;
		this.permission = permission;
		this.phone = phone;
		this.userStatus = userStatus;
		this.imprest = imprest;
	}

	// Property accessors

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPermission() {
		return this.permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getUserStatus() {
		return this.userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	public Double getImprest() {
		return this.imprest;
	}

	public void setImprest(Double imprest) {
		this.imprest = imprest;
	}

}