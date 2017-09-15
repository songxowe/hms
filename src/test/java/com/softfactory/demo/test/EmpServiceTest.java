package com.softfactory.demo.test;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.softfactory.demo.service.EmpService;
import com.softfactory.core.util.Pager;
import com.softfactory.pojo.Emp;

/**
 * 单元测试类
 * 
 * @author SONG
 *
 */
public class EmpServiceTest {
  private EmpService empService;

  @Test
  public void findPager() {
    // easyi 必需的参数
    Integer page = 1;
    Integer rows = 5;
    String sort = "ename";
    String order = "asc";

    // 条件查询的参数
    String ename = null;
    // ename = "%S%";
    Integer deptno = 0;

    // 处理记录的开始页/结束页
    Integer pageno = (page - 1) * rows;
    Integer pagesize = page * rows;

    Pager<Emp> pager = empService.findPager(pageno, pagesize, sort, order, ename, deptno);
    System.out.println("Total Rows: " + pager.getTotal());
    for (Emp emp : pager.getRows()) {
      System.out.println(emp.getEname() + " " + emp.getSal());
    }
  }

  @SuppressWarnings("resource")
  @Before
  public void init() {
    ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
    empService = ctx.getBean("empService", EmpService.class);
  }
}
