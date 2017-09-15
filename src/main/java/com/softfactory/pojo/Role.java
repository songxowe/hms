package com.softfactory.pojo;

import java.io.Serializable;

/**
 * 系统角色信息
 * 
 * @author SONG
 */
public class Role implements Serializable {
  private static final long serialVersionUID = 1L;
  private Integer id;
  private String name;
  private String code;
  private String descn;
  private String authorize;

  public Role() {

  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getDescn() {
    return descn;
  }

  public void setDescn(String descn) {
    this.descn = descn;
  }

  public String getAuthorize() {
    return authorize;
  }

  public void setAuthorize(String authorize) {
    this.authorize = authorize;
  }
}