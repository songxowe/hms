package com.softfactory.pojo;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

/**
 * 雇员实体类
 * 
 * @author SONG
 *
 */
public class Emp implements Serializable {
  private static final long serialVersionUID = 1L;
  private Integer empno;
  private String ename;

  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date hiredate;
  private Double sal;

  // N:1 多个雇员属于一个部门
  private Dept dept;

  public Emp() {

  }

  public Integer getEmpno() {
    return empno;
  }

  public void setEmpno(Integer empno) {
    this.empno = empno;
  }

  public String getEname() {
    return ename;
  }

  public void setEname(String ename) {
    this.ename = ename;
  }

  public Date getHiredate() {
    return hiredate;
  }

  public void setHiredate(Date hiredate) {
    this.hiredate = hiredate;
  }

  public Double getSal() {
    return sal;
  }

  public void setSal(Double sal) {
    this.sal = sal;
  }

  public Dept getDept() {
    return dept;
  }

  public void setDept(Dept dept) {
    this.dept = dept;
  }
}
