package com.softfactory.pojo;

import java.io.Serializable;

/**
 * 系统用户信息类
 * 
 * @author SONG
 */
public class User implements Serializable {
  private static final long serialVersionUID = 1L;
  private Integer id;
  private String username;
  private String password;
  private String status;
  private String photoPath;

  public User() {

  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getPhotoPath() {
    return photoPath;
  }

  public void setPhotoPath(String photoPath) {
    this.photoPath = photoPath;
  }
}