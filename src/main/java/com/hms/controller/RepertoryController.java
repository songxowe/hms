package com.hms.controller;

import com.hms.pojo.Repertory;
import com.hms.service.RepertoryService;

import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import javax.annotation.Resource;
import java.util.List;

/*
*  消费表  控制器
*
 */

@Controller
public class RepertoryController {
    @Resource(name = "repertoryService")
    private RepertoryService repertoryService;

    @RequestMapping(value = "repertory_find" ,produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String repertory_find(){
        System.out.println("111");
        List<Repertory> repertories=repertoryService.find();
        JSON json = JSONSerializer.toJSON(repertories);
        System.out.println("toString-------"+json.toString());
        return json.toString();
    }

}
