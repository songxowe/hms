package com.hms.controller;

import com.hms.pojo.Chargecase;
import com.hms.service.ChargecaseService;
import com.hms.util.PageBean;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class ChargecaseController {
    @Resource(name = "chargecaseService")
    public ChargecaseService chargecaseService;

   /* @RequestMapping(value = "chargecseController_list", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String list(
            @Param("chargecaseName") String chargecaseName,
            @Param("page") Integer page,
            @Param("rows") Integer rows) {
        System.out.println("chargecaseController_list");
        PageBean<Chargecase> list = chargecaseService.findByPage(chargecaseName, page, rows);
        list.setRows(list.getList());
        list.setPage(list.getPageNum());
        JSONArray jo = (JSONArray) JSONSerializer.toJSON(list);
        return jo.toString();
    }
*/
    //下拉框加载
    @RequestMapping(value = "chargecaseController_find", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String find() {
        System.out.println("加载充值方案下拉框");
        List<Chargecase> chargecases = chargecaseService.find();
        Chargecase chargecase = new Chargecase();
        chargecase.setChargecaseId(0);
        chargecase.setChargecaseName("请选择充值方案");
        chargecase.setChargecaseMoney(0d);
        chargecase.setChargecaseScore(0);
        chargecase.setChargecaseStatus("");
        chargecases.add(0, chargecase);
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.setExcludes(new String[]{""});
        JSON json = JSONSerializer.toJSON(chargecases, jsonConfig);
        return json.toString();
    }

    //选择下拉框id后加载对应属性值
    @RequestMapping(value = "chargecaseController_findById", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String findById(@RequestParam(required = true, value = "chargecaseId") Integer chargecaseId, ModelMap modelMap) {
        System.out.println("加载对应的充值方案数据");
        Chargecase chargecase = chargecaseService.findById(chargecaseId);
        JSON json = JSONSerializer.toJSON(chargecase);
        System.out.println(json.toString());
        return json.toString();
    }

    @RequestMapping(value = "chargecaseController_add", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String save(Chargecase chargecase) {
        System.out.println("chargecaseController_add");
        int count = chargecaseService.add(chargecase);
        if (count > 0) {
            System.out.println("充值方案新增OK");
        } else {
            System.out.println("充值方案新增error");
        }
        return String.valueOf(count);
    }


}