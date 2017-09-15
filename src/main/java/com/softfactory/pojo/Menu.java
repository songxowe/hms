package com.softfactory.pojo;

import java.io.Serializable;

/**
 * 菜单
 * 
 * @author SONG
 * 
 */
public class Menu implements Serializable {
  private static final long serialVersionUID = 1L;
  private Integer id;
  private Integer parentId;
  private Integer seq;
  private String name;
  private String descn;
  private String linkUrl;
  private String status;

  public Menu() {

  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getParentId() {
    return parentId;
  }

  public void setParentId(Integer parentId) {
    this.parentId = parentId;
  }

  public Integer getSeq() {
    return seq;
  }

  public void setSeq(Integer seq) {
    this.seq = seq;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescn() {
    return descn;
  }

  public void setDescn(String descn) {
    this.descn = descn;
  }

  public String getLinkUrl() {
    return linkUrl;
  }

  public void setLinkUrl(String linkUrl) {
    this.linkUrl = linkUrl;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

}
