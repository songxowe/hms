package com.softfactory.core.node;

public class MenuNode {
  private Integer id;
  private String text;
  private String state = "closed";
  private String url;
  private Integer parentId;

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getText() {
    return text;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setText(String text) {
    this.text = text;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public Integer getParentId() {
    return parentId;
  }

  public void setParentId(Integer parentId) {
    this.parentId = parentId;
  }
}
