package com.hms.pojo;

import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * Guest entity. @author MyEclipse Persistence Tools
 */

public class Guest implements Serializable {

    private static final long serialVersionUID = 2606039682894881369L;
    private Integer guestId;
    private Integer checkId;
    private Integer groupId;
    private Room room;
    private String guestName;
    private String voucher;
    private String voucherNo;
    private String guestPhone;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date guestBirthdate;
    private String guestSex;
    private String guestRace;
    private String guestAddress;
    private String mainguest;
    private String otherOne;
    private String otherTwo;
    private String otherThree;

    // Constructors

    /**
     * default constructor
     */
    public Guest() {
    }


    // Property accessors

    public Integer getGuestId() {
        return this.guestId;
    }

    public void setGuestId(Integer guestId) {
        this.guestId = guestId;
    }

    public Integer getCheckId() {
        return checkId;
    }

    public void setCheckId(Integer checkId) {
        this.checkId = checkId;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public String getGuestName() {
        return this.guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public String getVoucher() {
        return this.voucher;
    }

    public void setVoucher(String voucher) {
        this.voucher = voucher;
    }

    public String getVoucherNo() {
        return this.voucherNo;
    }

    public void setVoucherNo(String voucherNo) {
        this.voucherNo = voucherNo;
    }

    public String getGuestPhone() {
        return this.guestPhone;
    }

    public void setGuestPhone(String guestPhone) {
        this.guestPhone = guestPhone;
    }

    public Date getGuestBirthdate() {
        return this.guestBirthdate;
    }

    public void setGuestBirthdate(Date guestBirthdate) {
        this.guestBirthdate = guestBirthdate;
    }

    public String getGuestSex() {
        return this.guestSex;
    }

    public void setGuestSex(String guestSex) {
        this.guestSex = guestSex;
    }

    public String getGuestRace() {
        return this.guestRace;
    }

    public void setGuestRace(String guestRace) {
        this.guestRace = guestRace;
    }

    public String getGuestAddress() {
        return this.guestAddress;
    }

    public void setGuestAddress(String guestAddress) {
        this.guestAddress = guestAddress;
    }

    public String getMainguest() {
        return this.mainguest;
    }

    public void setMainguest(String mainguest) {
        this.mainguest = mainguest;
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

    @Override
    public String toString() {
        return "Guest{" +
                "guestId=" + guestId +
                ", checkId=" + checkId +
                ", groupId=" + groupId +
                ", room=" + room +
                ", guestName='" + guestName + '\'' +
                ", voucher='" + voucher + '\'' +
                ", voucherNo='" + voucherNo + '\'' +
                ", guestPhone='" + guestPhone + '\'' +
                ", guestBirthdate=" + guestBirthdate +
                ", guestSex='" + guestSex + '\'' +
                ", guestRace='" + guestRace + '\'' +
                ", guestAddress='" + guestAddress + '\'' +
                ", mainguest='" + mainguest + '\'' +
                ", otherOne='" + otherOne + '\'' +
                ", otherTwo='" + otherTwo + '\'' +
                ", otherThree='" + otherThree + '\'' +
                '}';
    }
}