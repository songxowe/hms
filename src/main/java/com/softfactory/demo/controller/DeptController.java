package com.softfactory.demo.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.math.NumberUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softfactory.demo.service.DeptService;
import com.softfactory.core.util.Pager;
import com.softfactory.pojo.Dept;

import net.sf.json.JSON;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

/**
 * 部门管理 处理器/控制器
 *
 * @author SONG
 */
@Controller
public class DeptController {
  @Resource(name = "deptService")
  private DeptService deptService;

  @RequestMapping(value = "deptController", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String list(@RequestParam(required = true, value = "page") Integer page,
                     @RequestParam(required = true, value = "rows") Integer rows,
                     @RequestParam(required = true, value = "sort") String sort,
                     @RequestParam(required = true, value = "order") String order,
                     @RequestParam(required = false, value = "dname") String dname,
                     @RequestParam(required = false, value = "loc") String loc) {

    if (!StringUtils.isEmpty(dname)) {
      // tips:为了体验转换为大写 (若模糊查询中文则不需要)
      dname = "%" + dname.toUpperCase() + "%";
    }
    if (!StringUtils.isEmpty(loc)) {
      loc = "%" + loc.toUpperCase() + "%";
    }

    Integer pageno = (page - 1) * rows;
    Integer pagesize = page * rows;

    Pager<Dept> pager = deptService.findPager(pageno, pagesize, sort, order, dname, loc);

    JsonConfig jsonConfig = new JsonConfig();
    JSONObject json = (JSONObject) JSONSerializer.toJSON(pager, jsonConfig);

    return json.toString();
  }

  @RequestMapping(value = "deptController_remove", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String remove(@RequestParam(required = true, value = "ids") String ids) {
    int count = 0;
    String[] deptnos = ids.split(",");
    for (int i = 0; i < deptnos.length; i++) {
      Integer deptno = NumberUtils.createInteger(deptnos[i]);
      count += deptService.remove(deptno);
    }

    return String.valueOf(count);
  }

  @RequestMapping(value = "deptController_save", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String save(Dept dept) {
    int count = 0;
    if (dept != null && dept.getDeptno() != null) {
      count = deptService.modify(dept);
    } else {
      count = deptService.add(dept);
    }

    return String.valueOf(count);
  }

  @RequestMapping(value = "deptController_find", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String find() {
    List<Dept> depts = deptService.find();
    Dept dept = new Dept();
    dept.setDeptno(0);
    dept.setDname("请选择");
    dept.setLoc("");
    depts.add(0, dept);

    JsonConfig jsonConfig = new JsonConfig();
    // 设置指定属性不在 json 格式数据中显示
    jsonConfig.setExcludes(new String[]{"loc"});
    JSON json = JSONSerializer.toJSON(depts, jsonConfig);

    return json.toString();
  }
}
