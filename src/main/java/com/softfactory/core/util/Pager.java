package com.softfactory.core.util;

import java.util.List;

public class Pager<T> {
  private long total;// 总记录数
  private List<T> rows;// 每页记录的集合

  public long getTotal() {
    return total;
  }

  public void setTotal(long total) {
    this.total = total;
  }

  public List<T> getRows() {
    return rows;
  }

  public void setRows(List<T> rows) {
    this.rows = rows;
  }
}
