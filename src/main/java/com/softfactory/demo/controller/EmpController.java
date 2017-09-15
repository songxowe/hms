package com.softfactory.demo.controller;

import java.util.Date;

import javax.annotation.Resource;

import org.apache.commons.lang.math.NumberUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softfactory.demo.service.EmpService;
import com.softfactory.core.util.DeptValueProcessor;
import com.softfactory.core.util.JsonDateValueProcessor;
import com.softfactory.core.util.Pager;
import com.softfactory.pojo.Dept;
import com.softfactory.pojo.Emp;

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

/**
 * 雇员管理 处理器/控制器
 *
 * @author SONG
 */
@Controller
public class EmpController {
  @Resource(name = "empService")
  private EmpService empService;

  @RequestMapping(value = "empController", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String list(@RequestParam(required = true, value = "page") Integer page,
                     @RequestParam(required = true, value = "rows") Integer rows,
                     @RequestParam(required = true, value = "sort") String sort,
                     @RequestParam(required = true, value = "order") String order,
                     @RequestParam(required = false, value = "ename") String ename,
                     @RequestParam(required = false, value = "deptno", defaultValue = "0") Integer deptno) {

    if (!StringUtils.isEmpty(ename)) {
      // tips:为了体验转换为大写 (若模糊查询中文则不需要)
      ename = "%" + ename.toUpperCase() + "%";
    }

    Integer pageno = (page - 1) * rows;
    Integer pagesize = page * rows;

    Pager<Emp> pager = empService.findPager(pageno, pagesize, sort, order, ename, deptno);

    JsonConfig jsonConfig = new JsonConfig();
    jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor());
    jsonConfig.registerJsonValueProcessor(Dept.class, new DeptValueProcessor());

    JSONObject json = (JSONObject) JSONSerializer.toJSON(pager, jsonConfig);

    return json.toString();
  }

  @RequestMapping(value = "empController_remove", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String remove(@RequestParam(required = true, value = "ids") String ids) {
    int count = 0;
    String[] empnos = ids.split(",");
    for (int i = 0; i < empnos.length; i++) {
      Integer empno = NumberUtils.createInteger(empnos[i]);
      count += empService.remove(empno);
    }

    return String.valueOf(count);
  }

  @RequestMapping(value = "empController_save", produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String save(Emp emp) {
    int count = 0;
    if (emp != null && emp.getEmpno() != null) {
      count = empService.modify(emp);
    } else {
      count = empService.add(emp);
    }

    return String.valueOf(count);
  }

  @RequestMapping("/empController_view")
  public String view(@RequestParam(required = true, value = "empno") Integer empno, ModelMap modelMap) {
    if (empno != null) {
      Emp emp = empService.findById(empno);
      modelMap.put("emp", emp);
    }
    return "empview";
  }

  /**
   * 根据雇员编号查找指定雇员
   *
   * @return
   */
  @RequestMapping("/empController_findById")
  public String findById(@RequestParam(required = false, value = "empno") Integer empno, ModelMap modelMap) {
    if (empno != null) {
      Emp emp = empService.findById(empno);
      modelMap.put("emp", emp);
    }
    return "empedit";
  }
}
