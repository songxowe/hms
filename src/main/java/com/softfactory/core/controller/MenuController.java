package com.softfactory.core.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.math.NumberUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.softfactory.core.node.MenuNode;
import com.softfactory.core.service.MenuService;
import com.softfactory.core.util.Constants;
import com.softfactory.core.util.Pager;
import com.softfactory.pojo.Menu;
import com.softfactory.pojo.User;

import net.sf.json.JSON;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

@Controller
public class MenuController {
  @Resource(name = "menuService")
  private MenuService menuService;

  /**
   * 读取指定用户的所有菜单项
   */
  @RequestMapping("/menuController_index")
  public void index(HttpServletRequest request, HttpServletResponse response) {
    response.setContentType("text/html;charset=UTF-8");
    User user = (User) request.getSession().getAttribute(Constants.USER_IN_SESSION);
    List<Integer> list = menuService.loadUserMenus(user.getId());

    int menuId = 0;
    List<Menu> menus = null;
    if (request.getParameter("id") != null && !"".equals(request.getParameter("id"))) {
      // 得到指定MenuId下的所有子菜单
      menuId = Integer.parseInt(request.getParameter("id"));
      menus = menuService.loadChileMenus(menuId);
    } else {
      // 得到所有顶层菜单
      menus = menuService.loadTopMenus();
    }

    // 得到当前用户的所有MenuID
    List<MenuNode> nodeList = new ArrayList<MenuNode>();
    for (Menu menu : menus) {
      if (list.contains(menu.getId())) {// 判断是否存在
        MenuNode node = convertMenuToNode(menu);
        nodeList.add(node);
      }
    }
    // 转JSON
    JSON topMenuJson = JSONSerializer.toJSON(nodeList);
    System.out.println("...........\n" + topMenuJson);
    try {
      response.getWriter().println(topMenuJson);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  /**
   * 将Menu转换成满足easyui的格式命名
   * 
   * @param menu
   * @return
   */
  public MenuNode convertMenuToNode(Menu menu) {
    MenuNode node = new MenuNode();
    node.setId(menu.getId());
    node.setText(menu.getName());
    node.setState("closed");

    List<Menu> menus = menuService.loadChileMenus(menu.getId());
    if (menus.size() == 0)
      node.setState("open");
    if (menu.getParentId() != null)
      node.setParentId(menu.getParentId());
    node.setUrl(menu.getLinkUrl());
    return node;
  }

  // ** CRUD *************************************************************

  @RequestMapping("/menuController")
  public void list(@RequestParam(required = true, value = "page") Integer page,
      @RequestParam(required = true, value = "rows") Integer rows,
      @RequestParam(required = true, value = "sort") String sort,
      @RequestParam(required = true, value = "order") String order,
      @RequestParam(required = false, value = "name") String name,
      @RequestParam(required = false, value = "descn") String descn,
      @RequestParam(required = false, value = "parentId") Integer parentId, HttpServletResponse response) {

    if (!StringUtils.isEmpty(name)) {
      name = "%" + name + "%";
    }
    if (!StringUtils.isEmpty(descn)) {
      descn = "%" + descn + "%";
    }

    int pageno = (page - 1) * rows; // 开始页
    int pagesize = page * rows; // 结束页

    Pager<Menu> pager = menuService.findPager(pageno, pagesize, sort, order, name, descn, parentId);
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

  /**
   * 读取所有菜单数据，初始化查询comboTree
   */
  @RequestMapping("/menuController_indexAllSearch")
  public void indexAllSearch(HttpServletRequest request, HttpServletResponse response) {
    loadComboTree("所有菜单", request, response);
  }

  /**
   * 读取所有菜单数据，初始化编辑comboTree
   * 
   * @return
   */
  @RequestMapping("/menuController_indexAllEdit")
  public void indexAllEdit(HttpServletRequest request, HttpServletResponse response) {
    loadComboTree("无父级菜单", request, response);
  }

  /**
   * 读取所有菜单数据，初始化树形菜单
   * 
   * @return
   */
  @RequestMapping("/menuController_indexAll")
  public String indexAll(HttpServletRequest request, HttpServletResponse response) {
    loadComboTree(null, request, response);
    return null;
  }

  private void loadComboTree(String title, HttpServletRequest request, HttpServletResponse response) {
    response.setContentType("text/html;charset=UTF-8");

    int menuId = 0;
    List<Menu> menus = null;
    if (request.getParameter("id") != null && !"".equals(request.getParameter("id"))) {
      // 得到指定MenuId下的所有子菜单
      menuId = Integer.parseInt(request.getParameter("id"));
      menus = menuService.loadChileMenus(menuId);
    } else {
      // 得到所有顶层菜单
      menus = menuService.loadTopMenus();

      if (title != null) {
        // 创建一个菜单，用于在查询框显示"所有菜单"
        Menu topAllMenu = new Menu();
        topAllMenu.setId(0);
        topAllMenu.setName(title);
        menus.add(topAllMenu);
      }
    }
    // 得到当前用户的所有MenuID
    List<MenuNode> nodeList = new ArrayList<MenuNode>();
    for (Menu menu : menus) {
      MenuNode node = convertMenuToNode(menu);
      nodeList.add(node);
    }
    // 转JSON
    JSON topMenuJson = JSONSerializer.toJSON(nodeList);
    try {
      response.getWriter().println(topMenuJson);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @RequestMapping("/menuController_view")
  public String view(@RequestParam(required = true, value = "id") Integer id, ModelMap modelMap) {
    if (id != null) {
      Menu menu = menuService.findById(id);
      modelMap.put("menu", menu);

      // 显示父级菜单
      if (menu.getParentId() != null) {
        Menu parentMenu = menuService.findById(menu.getParentId());
        modelMap.put("parentMenu", parentMenu);
      }
    }
    return "menuview";
  }

  /**
   * 根据菜单编号查找指定菜单
   * 
   * @return
   */
  @RequestMapping("/menuController_findById")
  public String findById(@RequestParam(required = false, value = "id") Integer id, ModelMap modelMap) {
    if (id != null) {
      Menu menu = menuService.findById(id);
      modelMap.put("menu", menu);

      // 显示父级菜单
      if (menu.getParentId() != null) {
        Menu parentMenu = menuService.findById(menu.getParentId());
        modelMap.put("parentMenu", parentMenu);
      }
    }
    return "menuedit";
  }

  @RequestMapping("/menuController_save")
  public void save(Menu menu, HttpServletResponse response) {
    int count = 0;

    if (menu.getParentId() == null || menu.getParentId() == 0) {
      menu.setParentId(null); // 无父级菜单
    }

    if (menu != null && menu.getId() != null) {
      count = menuService.modify(menu);
    } else {
      count = menuService.add(menu);
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

  @RequestMapping("/menuController_remove")
  public void remove(@RequestParam(required = true, value = "ids") String ids, HttpServletResponse response) {
    int count = 0;
    String[] menuIds = ids.split(",");
    for (int i = 0; i < menuIds.length; i++) {
      Integer id = NumberUtils.createInteger(menuIds[i]);
      count += menuService.remove(id);
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
