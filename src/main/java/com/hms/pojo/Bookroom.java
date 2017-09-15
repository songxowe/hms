package com.hms.pojo;

import java.io.Serializable;

/**
 * Bookroom entity. @author MyEclipse Persistence Tools
 */

public class Bookroom implements Serializable {
    private static final long serialVersionUID = -2270755381375564240L;

    // Fields

    private Integer brId;
    private Integer bookId;
    private RoomCase roomCase;
    private RoomType roomType;
    private Integer roomAmount;
    private String otherOne;
    private String otherTwo;
    private String otherThree;

    // Constructors

    /**
     * default constructor
     */
    public Bookroom() {
    }


    // Property accessors

    public Integer getBrId() {
        return this.brId;
    }

    public void setBrId(Integer brId) {
        this.brId = brId;
    }

    public Integer getBookId() {
        return this.bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public RoomCase getRoomCase() {
        return roomCase;
    }

    public void setRoomCase(RoomCase roomCase) {
        this.roomCase = roomCase;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
    }

    public Integer getRoomAmount() {
        return this.roomAmount;
    }

    public void setRoomAmount(Integer roomAmount) {
        this.roomAmount = roomAmount;
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