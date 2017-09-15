package com.hms.pojo;

import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class Message implements Serializable {

    private  Integer messageId;
    private  Integer messageType;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date messageAlertTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date messageReadTime;
    private Integer messageStatus;
    private  String messageRemark;


    public Message(){

    }

    public Integer getMessageId() {
        return messageId;
    }

    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    public Integer getMessageType() {
        return messageType;
    }

    public void setMessageType(Integer messageType) {
        this.messageType = messageType;
    }

    public Date getMessageAlertTime() {
        return messageAlertTime;
    }

    public void setMessageAlertTime(Date messageAlertTime) {
        this.messageAlertTime = messageAlertTime;
    }

    public Date getMessageReadTime() {
        return messageReadTime;
    }

    public void setMessageReadTime(Date messageReadTime) {
        this.messageReadTime = messageReadTime;
    }

    public Integer getMessageStatus() {
        return messageStatus;
    }

    public void setMessageStatus(Integer messageStatus) {
        this.messageStatus = messageStatus;
    }

    public String getMessageRemark() {
        return messageRemark;
    }

    public void setMessageRemark(String messageRemark) {
        this.messageRemark = messageRemark;
    }
}
