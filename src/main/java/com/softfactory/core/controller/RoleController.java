package com.softfactory.core.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.math.NumberUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.softfactory.core.service.RoleService;
import com.softfactory.core.util.Pager;
import com.softfactory.pojo.Role;

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

@Controller
public class RoleController {
  @Resource(name = "roleService")
  private RoleService roleService;

  @RequestMapping("/roleController")
  public void list(@RequestParam(required = true, value = "page") Integer page,
      @RequestParam(required = true, value = "rows") Integer rows,
      @RequestParam(required = true, value = "sort") String sort,
      @RequestParam(required = true, value = "order") String order,
      @RequestParam(required = false, value = "name") String name,
      @RequestParam(required = false, value = "descn") String descn,
      @RequestParam(required = false, value = "code") String code, HttpServletResponse response) {

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

    Pager<Role> pager = roleService.findPager(pageno, pagesize, sort, order, name, code, descn);
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

  @RequestMapping("/roleController_save")
  public void save(Role role, HttpServletResponse response) {
    int count = 0;

    if (role != null && role.getId() != null) {
      count = roleService.modify(role);
    } else {
      count = roleService.add(role);
    }
    try {
      PrintWriter out = response.getWriter();
      out.println(count);
      out.flush();
      out.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @RequestMapping("/roleController_remove")
  public void remove(@RequestParam(required = true, value = "ids") String ids, HttpServletResponse response) {
    int count = 0;
    String[] roleIds = ids.split(",");
    for (int i = 0; i < roleIds.length; i++) {
      Integer id = NumberUtils.createInteger(roleIds[i]);
      count += roleService.remove(id);
    }

    try {
      PrintWriter out = response.getWriter();
      out.println(count);
      out.flush();
      out.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
