package com.hms.pojo;

import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Membertype entity. @author MyEclipse Persistence Tools
 */

public class Membertype implements Serializable {

	// Fields

	private Integer membertypeId;
	private String membertypeName;
	private Double defaultMoney;
	private Integer defaultScore;
	private Double discountRate;


	// Constructors

	/** default constructor */
	public Membertype() {
	}

	public Membertype(String membertypeName, Double defaultMoney, Integer defaultScore, Double discountRate) {
		this.membertypeName = membertypeName;
		this.defaultMoney = defaultMoney;
		this.defaultScore = defaultScore;
		this.discountRate = discountRate;
	}

// Property accessors

	public Integer getMembertypeId() {
		return this.membertypeId;
	}

	public void setMembertypeId(Integer membertypeId) {
		this.membertypeId = membertypeId;
	}

	public String getMembertypeName() {
		return this.membertypeName;
	}

	public void setMembertypeName(String membertypeName) {
		this.membertypeName = membertypeName;
	}

	public Double getDefaultMoney() {
		return this.defaultMoney;
	}

	public void setDefaultMoney(Double defaultMoney) {
		this.defaultMoney = defaultMoney;
	}

	public Integer getDefaultScore() {
		return this.defaultScore;
	}

	public void setDefaultScore(Integer defaultScore) {
		this.defaultScore = defaultScore;
	}

	public Double getDiscountRate() {
		return this.discountRate;
	}

	public void setDiscountRate(Double discountRate) {
		this.discountRate = discountRate;
	}



}