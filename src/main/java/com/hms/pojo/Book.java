package com.hms.pojo;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * Book entity. @author MyEclipse Persistence Tools
 */

public class Book implements Serializable {
	private static final long serialVersionUID = 5833350794433536800L;

	// Fields

	private Integer bookId;
	private String booker;
	private String bookPhone;
	private Integer webbookId;
	private String assureType;
	private Integer memberId;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date comeTime;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date leaveTime;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date keepTime;
	private String checkType;
	private String guestType;
	private String payType;
	private String operater;
	@NumberFormat(pattern = "#,###.00")
	private Double subscription;
	private Integer diyId;
	private String bookRemark;
	private String bookStatus;
	private String otherOne;
	private String otherTwo;
	private String otherThree;

	// Constructors

	/** default constructor */
	public Book() {
	}

	// Property accessors

	public Integer getBookId() {
		return this.bookId;
	}

	public void setBookId(Integer bookId) {
		this.bookId = bookId;
	}

	public String getBooker() {
		return this.booker;
	}

	public void setBooker(String booker) {
		this.booker = booker;
	}

	public String getBookPhone() {
		return this.bookPhone;
	}

	public void setBookPhone(String bookPhone) {
		this.bookPhone = bookPhone;
	}

	public Integer getWebbookId() {
		return this.webbookId;
	}

	public void setWebbookId(Integer webbookId) {
		this.webbookId = webbookId;
	}

	public String getAssureType() {
		return this.assureType;
	}

	public void setAssureType(String assureType) {
		this.assureType = assureType;
	}

	public Integer getMemberId() {
		return this.memberId;
	}

	public void setMemberId(Integer memberId) {
		this.memberId = memberId;
	}

	public Date getComeTime() {
		return this.comeTime;
	}

	public void setComeTime(Date comeTime) {
		this.comeTime = comeTime;
	}

	public Date getLeaveTime() {
		return this.leaveTime;
	}

	public void setLeaveTime(Date leaveTime) {
		this.leaveTime = leaveTime;
	}

	public Date getKeepTime() {
		return this.keepTime;
	}

	public void setKeepTime(Date keepTime) {
		this.keepTime = keepTime;
	}

	public String getCheckType() {
		return this.checkType;
	}

	public void setCheckType(String checkType) {
		this.checkType = checkType;
	}

	public String getGuestType() {
		return this.guestType;
	}

	public void setGuestType(String guestType) {
		this.guestType = guestType;
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

	public Double getSubscription() {
		return this.subscription;
	}

	public void setSubscription(Double subscription) {
		this.subscription = subscription;
	}

	public Integer getDiyId() {
		return this.diyId;
	}

	public void setDiyId(Integer diyId) {
		this.diyId = diyId;
	}

	public String getBookRemark() {
		return this.bookRemark;
	}

	public void setBookRemark(String bookRemark) {
		this.bookRemark = bookRemark;
	}

	public String getBookStatus() {
		return this.bookStatus;
	}

	public void setBookStatus(String bookStatus) {
		this.bookStatus = bookStatus;
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