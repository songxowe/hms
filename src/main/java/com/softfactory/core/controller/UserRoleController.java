package com.softfactory.core.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.softfactory.core.service.UserRoleService;
import com.softfactory.core.util.Pager;
import com.softfactory.pojo.Role;

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

@Controller
public class UserRoleController {

  @Resource(name = "userRoleService")
  private UserRoleService userRoleService;

  @RequestMapping("userRoleController")
  public void list(@RequestParam(required = true, value = "page") Integer page,
      @RequestParam(required = true, value = "rows") Integer rows,
      @RequestParam(required = true, value = "sort") String sort,
      @RequestParam(required = true, value = "order") String order,
      @RequestParam(required = false, value = "name") String name,
      @RequestParam(required = false, value = "descn") String descn,
      @RequestParam(required = false, value = "code") String code,
      @RequestParam(required = false, value = "authorize") String authorize,
      @RequestParam(required = true, value = "userId") Integer userId, HttpServletResponse response) {

    if (!StringUtils.isEmpty(name)) {
      name = "%" + name + "%";
    }
    if (!StringUtils.isEmpty(descn)) {
      descn = "%" + descn + "%";
    }
    if (!StringUtils.isEmpty(code)) {
      code = "%" + code + "%";
    }   

    int pageno = (page - 1) * rows; // 开始页
    int pagesize = page * rows; // 结束页

    Pager<Role> pager = userRoleService.findPager(pageno, pagesize, sort, order, name, code, descn, authorize, userId);
    JsonConfig jsonConfig = new JsonConfig();
    try {
      PrintWriter out = response.getWriter();
      JSONObject json = (JSONObject) JSONSerializer.toJSON(pager, jsonConfig);
      out.println(json.toString());
      out.flush();
      out.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @RequestMapping("/userRoleController_grantOrRevoke")
  public void grantOrRevoke(@RequestParam(required = false, value = "itemlist") String itemlist,
      @RequestParam(required = false, value = "auth") String auth,
      @RequestParam(required = true, value = "userId") Integer userId, HttpServletResponse response) {

    boolean isAuth = false;
    if ("true".equals(auth))
      isAuth = true;

    String[] roleIds = itemlist.split(",");
    userRoleService.addUserRoles(userId, roleIds, isAuth);

    try {
      response.getWriter().println(roleIds.length);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
