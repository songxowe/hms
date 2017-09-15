package com.hms.pojo;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import java.io.Serializable;
import java.util.Date;


/**
 * Member entity. @author MyEclipse Persistence Tools
 */

public class Member implements Serializable {

    // Fields

    private Integer memberId;//卡号
    private Membertype membertype;
    private String voucher;//证件类型
    private String voucherNo;//证件号码
    private String memberName;//会员名
    private String memberSex;//会员性别
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date memberBirthdate;//会员生日
    private String memberPhone;//会员手机
    private String memberAddress;//会员地址
    private String memberHobby;//会员爱好
    private String memberPassword;//会员密码
    private String operater;//操作员
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date activeTime;//激活时间
    private String memberStatus;//会员状态
    private Integer memberScore;//会员积分
    @NumberFormat(pattern = "#,###.00")
    private Double memberRemaining;
    @NumberFormat(pattern = "#,###.00")
    private Double memberConsume;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date lastchangeTime;

    public Member(Integer memberId, Membertype membertype, String voucher, String voucherNo, String memberName, String memberSex, Date memberBirthdate, String memberPhone, String memberAddress, String memberHobby, String memberPassword, String operater, Date activeTime, String memberStatus, Integer memberScore, Double memberRemaining, Double memberConsume, Date lastchangeTime) {
        this.memberId = memberId;
        this.membertype = membertype;
        this.voucher = voucher;
        this.voucherNo = voucherNo;
        this.memberName = memberName;
        this.memberSex = memberSex;
        this.memberBirthdate = memberBirthdate;
        this.memberPhone = memberPhone;
        this.memberAddress = memberAddress;
        this.memberHobby = memberHobby;
        this.memberPassword = memberPassword;
        this.operater = operater;
        this.activeTime = activeTime;
        this.memberStatus = memberStatus;
        this.memberScore = memberScore;
        this.memberRemaining = memberRemaining;
        this.memberConsume = memberConsume;
        this.lastchangeTime = lastchangeTime;
    }

    public Member() {
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public Membertype getMembertype() {
        return membertype;
    }

    public void setMembertype(Membertype membertype) {
        this.membertype = membertype;
    }

    public String getVoucher() {
        return voucher;
    }

    public void setVoucher(String voucher) {
        this.voucher = voucher;
    }

    public String getVoucherNo() {
        return voucherNo;
    }

    public void setVoucherNo(String voucherNo) {
        this.voucherNo = voucherNo;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getMemberSex() {
        return memberSex;
    }

    public void setMemberSex(String memberSex) {
        this.memberSex = memberSex;
    }

    public Date getMemberBirthdate() {
        return memberBirthdate;
    }

    public void setMemberBirthdate(Date memberBirthdate) {
        this.memberBirthdate = memberBirthdate;
    }

    public String getMemberPhone() {
        return memberPhone;
    }

    public void setMemberPhone(String memberPhone) {
        this.memberPhone = memberPhone;
    }

    public String getMemberAddress() {
        return memberAddress;
    }

    public void setMemberAddress(String memberAddress) {
        this.memberAddress = memberAddress;
    }

    public String getMemberHobby() {
        return memberHobby;
    }

    public void setMemberHobby(String memberHobby) {
        this.memberHobby = memberHobby;
    }

    public String getMemberPassword() {
        return memberPassword;
    }

    public void setMemberPassword(String memberPassword) {
        this.memberPassword = memberPassword;
    }

    public String getOperater() {
        return operater;
    }

    public void setOperater(String operater) {
        this.operater = operater;
    }

    public Date getActiveTime() {
        return activeTime;
    }

    public void setActiveTime(Date activeTime) {
        this.activeTime = activeTime;
    }

    public String getMemberStatus() {
        return memberStatus;
    }

    public void setMemberStatus(String memberStatus) {
        this.memberStatus = memberStatus;
    }

    public Integer getMemberScore() {
        return memberScore;
    }

    public void setMemberScore(Integer memberScore) {
        this.memberScore = memberScore;
    }

    public Double getMemberRemaining() {
        return memberRemaining;
    }

    public void setMemberRemaining(Double memberRemaining) {
        this.memberRemaining = memberRemaining;
    }

    public Double getMemberConsume() {
        return memberConsume;
    }

    public void setMemberConsume(Double memberConsume) {
        this.memberConsume = memberConsume;
    }

    public Date getLastchangeTime() {
        return lastchangeTime;
    }

    public void setLastchangeTime(Date lastchangeTime) {
        this.lastchangeTime = lastchangeTime;
    }

    @Override
    public String toString() {
        return "Member{" +
                "memberId=" + memberId +
                ", membertype=" + membertype +
                ", voucher='" + voucher + '\'' +
                ", voucherNo='" + voucherNo + '\'' +
                ", memberName='" + memberName + '\'' +
                ", memberSex='" + memberSex + '\'' +
                ", memberBirthdate=" + memberBirthdate +
                ", memberPhone='" + memberPhone + '\'' +
                ", memberAddress='" + memberAddress + '\'' +
                ", memberHobby='" + memberHobby + '\'' +
                ", memberPassword='" + memberPassword + '\'' +
                ", operater='" + operater + '\'' +
                ", activeTime=" + activeTime +
                ", memberStatus='" + memberStatus + '\'' +
                ", memberScore=" + memberScore +
                ", memberRemaining=" + memberRemaining +
                ", memberConsume=" + memberConsume +
                ", lastchangeTime=" + lastchangeTime +
                '}';
    }
}