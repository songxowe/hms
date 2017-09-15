package com.softfactory.core.controller;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.softfactory.core.service.MenuService;
import com.softfactory.core.service.RoleService;
import com.softfactory.pojo.Role;

import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

@Controller
public class MenuRoleController {
  @Resource(name = "roleService")
  private RoleService roleService;

  @Resource(name = "menuService")
  private MenuService menuService;

  @RequestMapping("/menuRoleController_findRole")
  public String findRole(@RequestParam(required = true, value = "id") Integer id, ModelMap modelMap) {
    Role role = roleService.findById(id);
    modelMap.put("role", role);
    return "menurole";
  }

  @RequestMapping("/menuRoleController_findMenu")
  public void findMenu(@RequestParam(required = true, value = "roleId") Integer roleId, HttpServletResponse response) {
    response.setContentType("text/html;charset=utf-8");

    // 根据选中的角色id查询显示对应的menu
    List<Integer> menuIds = roleService.findMenuRole(roleId);

    JSON json = JSONSerializer.toJSON(menuIds);
    try {
      response.getWriter().println(json);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @RequestMapping("/menuRoleController")
  public void list(HttpServletResponse response) {
    response.setContentType("text/html;charset=utf-8");

    List<Role> roles = this.roleService.find();

    // 转JSON
    JsonConfig jsonConfig = new JsonConfig();
    JSON json = JSONSerializer.toJSON(roles, jsonConfig);
    try {
      response.getWriter().println(json);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @RequestMapping("/menuRoleController_save")
  public void save(@RequestParam(required = true, value = "roleId") Integer roleId,
      @RequestParam(required = true, value = "menuIds") String menuIds, HttpServletResponse response) {
    response.setContentType("text/html;charset=utf-8");

    List<Integer> oldMenuIds = roleService.findMenuRole(roleId);
    menuService.addMenuRole(roleId, menuIds, oldMenuIds);

    try {
      response.getWriter().println(roleId);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
