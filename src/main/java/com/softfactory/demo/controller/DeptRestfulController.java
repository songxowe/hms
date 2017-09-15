package com.softfactory.demo.controller;

import com.softfactory.core.util.Pager;
import com.softfactory.demo.service.DeptService;
import com.softfactory.pojo.Dept;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Controller
public class DeptRestfulController {
  @Resource(name = "deptService")
  private DeptService deptService;

  @RequestMapping(value = "Dept", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
  @ResponseBody
  public String add(Dept dept) {
    int count = deptService.add(dept);
    return String.valueOf(count);
  }

  @RequestMapping(value = "Dept", method = RequestMethod.PUT, produces = {"application/json;charset=UTF-8"})
  @ResponseBody
  public String modify(Dept dept) {
    int count = deptService.modify(dept);
    return String.valueOf(count);
  }

  @RequestMapping(value = "Dept", method = RequestMethod.DELETE, produces = {"application/json;charset=UTF-8"})
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

  //查询部门信息，输出json
  //itemsView/{id}里边的{id}表示占位符，通过@PathVariable获取占位符中的参数，
  //@PathVariable中名称要和占位符一致，形参名无需和其一致
  //如果占位符中的名称和形参名一致，在@PathVariable可以不指定名称
  @RequestMapping("/Dept/{id}")
  public @ResponseBody
  Dept itemsView(@PathVariable("id") Integer deptno) {
    Dept dept = deptService.find(deptno);
    return dept;
  }

  @RequestMapping(value = "Dept", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
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
}
