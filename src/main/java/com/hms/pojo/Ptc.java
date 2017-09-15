package com.hms.pojo;

import java.sql.Timestamp;

/**
 * Ptc entity. @author MyEclipse Persistence Tools
 */

public class Ptc implements java.io.Serializable {

	// Fields

	private Integer ptcId;
	private String ptcName;
	private String ptcType;
	private String ptcContacter;
	private String ptcPhone;
	private String oncredit;
	private Double currentMoney;
	private Double maxCredit;
	private String saler;
	private Timestamp ptcbeginDate;
	private Timestamp ptcendDate;
	private String ptcStatus;
	private String clearType;

	// Constructors

	/** default constructor */
	public Ptc() {
	}

	/** full constructor */
	public Ptc(String ptcName, String ptcType, String ptcContacter, String ptcPhone, String oncredit,
			Double currentMoney, Double maxCredit, String saler, Timestamp ptcbeginDate, Timestamp ptcendDate,
			String ptcStatus, String clearType) {
		this.ptcName = ptcName;
		this.ptcType = ptcType;
		this.ptcContacter = ptcContacter;
		this.ptcPhone = ptcPhone;
		this.oncredit = oncredit;
		this.currentMoney = currentMoney;
		this.maxCredit = maxCredit;
		this.saler = saler;
		this.ptcbeginDate = ptcbeginDate;
		this.ptcendDate = ptcendDate;
		this.ptcStatus = ptcStatus;
		this.clearType = clearType;
	}

	// Property accessors

	public Integer getPtcId() {
		return this.ptcId;
	}

	public void setPtcId(Integer ptcId) {
		this.ptcId = ptcId;
	}

	public String getPtcName() {
		return this.ptcName;
	}

	public void setPtcName(String ptcName) {
		this.ptcName = ptcName;
	}

	public String getPtcType() {
		return this.ptcType;
	}

	public void setPtcType(String ptcType) {
		this.ptcType = ptcType;
	}

	public String getPtcContacter() {
		return this.ptcContacter;
	}

	public void setPtcContacter(String ptcContacter) {
		this.ptcContacter = ptcContacter;
	}

	public String getPtcPhone() {
		return this.ptcPhone;
	}

	public void setPtcPhone(String ptcPhone) {
		this.ptcPhone = ptcPhone;
	}

	public String getOncredit() {
		return this.oncredit;
	}

	public void setOncredit(String oncredit) {
		this.oncredit = oncredit;
	}

	public Double getCurrentMoney() {
		return this.currentMoney;
	}

	public void setCurrentMoney(Double currentMoney) {
		this.currentMoney = currentMoney;
	}

	public Double getMaxCredit() {
		return this.maxCredit;
	}

	public void setMaxCredit(Double maxCredit) {
		this.maxCredit = maxCredit;
	}

	public String getSaler() {
		return this.saler;
	}

	public void setSaler(String saler) {
		this.saler = saler;
	}

	public Timestamp getPtcbeginDate() {
		return this.ptcbeginDate;
	}

	public void setPtcbeginDate(Timestamp ptcbeginDate) {
		this.ptcbeginDate = ptcbeginDate;
	}

	public Timestamp getPtcendDate() {
		return this.ptcendDate;
	}

	public void setPtcendDate(Timestamp ptcendDate) {
		this.ptcendDate = ptcendDate;
	}

	public String getPtcStatus() {
		return this.ptcStatus;
	}

	public void setPtcStatus(String ptcStatus) {
		this.ptcStatus = ptcStatus;
	}

	public String getClearType() {
		return this.clearType;
	}

	public void setClearType(String clearType) {
		this.clearType = clearType;
	}

}