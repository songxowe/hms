package com.softfactory.core.test;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.softfactory.core.service.UserService;
import com.softfactory.core.util.MD5;
import com.softfactory.pojo.User;

public class UserServiceTest {
  private UserService userService;

  @SuppressWarnings("resource")
  @Before
  public void init() {
    ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
    userService = ctx.getBean("userService", UserService.class);
  }

  @Test
  public void login() {
    String username = "admin";
    String password = MD5.getInstance().getMD5ofStr("admin");
    User user = userService.login(username, password);
    System.out.println(user.getUsername() + " " + user.getPhotoPath());
  }

  @Test
  public void t1() {
    System.out.println((int)0.9999999);
  }
}
