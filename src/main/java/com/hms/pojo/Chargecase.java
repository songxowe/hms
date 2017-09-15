package com.hms.pojo;

import org.springframework.format.annotation.NumberFormat;

public class Chargecase {
    private Integer chargecaseId;
    private String chargecaseName;
    @NumberFormat(pattern = "#,###.00")
    private Double chargecaseMoney;
    @NumberFormat(pattern = "#,###.00")
    private Double chargecaseExtra;
    private Integer chargecaseScore;
    private String chargecaseStatus;

    public Chargecase() {
    }

    public Chargecase(String chargecaseName, Double chargecaseMoney, Double chargecaseExtra, Integer chargecaseScore, String chargecaseStatus) {
        this.chargecaseName = chargecaseName;
        this.chargecaseMoney = chargecaseMoney;
        this.chargecaseExtra = chargecaseExtra;
        this.chargecaseScore = chargecaseScore;
        this.chargecaseStatus = chargecaseStatus;
    }

    public Integer getChargecaseId() {
        return chargecaseId;
    }

    public void setChargecaseId(Integer chargecaseId) {
        this.chargecaseId = chargecaseId;
    }

    public String getChargecaseName() {
        return chargecaseName;
    }

    public void setChargecaseName(String chargecaseName) {
        this.chargecaseName = chargecaseName;
    }

    public Double getChargecaseMoney() {
        return chargecaseMoney;
    }

    public void setChargecaseMoney(Double chargecaseMoney) {
        this.chargecaseMoney = chargecaseMoney;
    }

    public Double getChargecaseExtra() {
        return chargecaseExtra;
    }

    public void setChargecaseExtra(Double chargecaseExtra) {
        this.chargecaseExtra = chargecaseExtra;
    }

    public Integer getChargecaseScore() {
        return chargecaseScore;
    }

    public void setChargecaseScore(Integer chargecaseScore) {
        this.chargecaseScore = chargecaseScore;
    }

    public String getChargecaseStatus() {
        return chargecaseStatus;
    }

    public void setChargecaseStatus(String chargecaseStatus) {
        this.chargecaseStatus = chargecaseStatus;
    }

    @Override
    public String toString() {
        return "Chargecase{" +
                "chargecaseId=" + chargecaseId +
                ", chargecaseName='" + chargecaseName + '\'' +
                ", chargecaseMoney=" + chargecaseMoney +
                ", chargecaseExtra=" + chargecaseExtra +
                ", chargecaseScore=" + chargecaseScore +
                ", chargecaseStatus='" + chargecaseStatus + '\'' +
                '}';
    }
}
