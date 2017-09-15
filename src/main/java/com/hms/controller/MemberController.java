package com.hms.controller;

import com.hms.pojo.Member;
import com.hms.pojo.Membertype;
import com.hms.service.MemberService;
import com.hms.util.JsonDateValueProcessor;
import com.hms.util.MembertypeValuesProcessor;
import com.hms.util.PageBean;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Date;

@Controller
public class MemberController {
    @Resource(name = "memberService")
    private MemberService memberService;

    //显示所有信息
    @RequestMapping(value = "memberController_list", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String list(@Param("memberId") Integer memberId,
                       @Param("membertypeId") Integer membertypeId,
                       @Param("memberName") String memberName,
                       @Param("memberPhone") String memberPhone,
                       @Param("memberStatus") String memberStatus,
                       @Param("page") Integer page,
                       @Param("rows") Integer rows) {
        System.out.println("memberController_list");
        PageBean<Member> list = memberService.findByPage(memberId, membertypeId, memberName, memberPhone, memberStatus, page, rows);
        list.setRows(list.getList());
        list.setPage(list.getPageNum());
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor());
        jsonConfig.registerJsonValueProcessor(Membertype.class, new MembertypeValuesProcessor());
        JSONObject jo = (JSONObject) JSONSerializer.toJSON(list, jsonConfig);
        return jo.toString();
    }


    @RequestMapping(value = "memberController_save", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String save(Member member) {
        System.out.println("memberController_save");
        int count = 0;
        if (member != null && member.getMemberId() != null) {
            count = memberService.modify(member);
            if (count > 0) {
                System.out.println("修改OK");
            } else {
                System.out.println("修改error");
            }

        } else {
            count = memberService.add(member);
            if (count > 0) {
                System.out.println("新增OK");
            } else {
                System.out.println("新增error");
            }
        }
        return String.valueOf(count);
    }

/*
    @RequestMapping("/memberController_view")
    public String view(@RequestParam(required = true, value = "memberId") Integer memberId, ModelMap modelMap) {
        if (memberId != null) {
            Member member = memberService.findById(memberId);
            modelMap.put("memeber", member);
        }
        return "member_view";
    }

    @RequestMapping("/memberController_findById")
    public String findById(@RequestParam(required = false, value = "memberId") Integer memberId, ModelMap modelMap) {
        if (memberId != null) {
            Member member = memberService.findById(memberId);
            modelMap.put("member", member);
        }
        return "member_edit";
    }

*/


    //------------------------------------------------list页面的弹窗方法----------------------------------------
    //开卡
    @RequestMapping(value = "/memberController_add", produces = "text/html;charset=UTF-8")
    public String add() {
        return "page/Member/member_add";
    }

    //充值
    @RequestMapping(value = "/memberController_charge", produces = "text/html;charset=UTF-8")
    public String charge(@RequestParam(required = true, value = "memberId") Integer memberId, ModelMap modelMap) {
        System.out.println("memberController_charge");
        if (memberId != null) {
            Member member = memberService.findById(memberId);
            modelMap.put("member", member);
        }
        return "page/Member/member_charge";
    }

    //挂失
    @RequestMapping(value = "/memberController_loss", produces = "text/html;charset=UTF-8")
    public String loss(@RequestParam(required = true, value = "memberId") Integer memberId, ModelMap modelMap) {
        System.out.println("memberController_loss");
        if (memberId != null) {
            Member member = memberService.findById(memberId);
            modelMap.put("member", member);
        }
        return "page/Member/member_loss";
    }

    //退卡
    @RequestMapping(value = "/memberController_out", produces = "text/html;charset=UTF-8")
    public String out(@RequestParam(required = true, value = "memberId") Integer memberId, ModelMap modelMap) {
        System.out.println("memberController_out");
        if (memberId != null) {
            Member member = memberService.findById(memberId);
            modelMap.put("member", member);
        }
        return "page/Member/member_out";
    }

    //升级
    @RequestMapping(value = "/memberController_up", produces = "text/html;charset=UTF-8")
    public String up(@RequestParam(required = true, value = "memberId") Integer memberId, ModelMap modelMap) {
        System.out.println("memberController_up");
        if (memberId != null) {
            Member member = memberService.findById(memberId);
            modelMap.put("member", member);
        }
        return "page/Member/member_up";
    }


    //密码重置
    @RequestMapping(value = "/memberController_password", produces = "text/html;charset=UTF-8")
    public String password(@RequestParam(required = true, value = "memberId") Integer memberId, ModelMap modelMap) {
        System.out.println("memberController_up");
        if (memberId != null) {
            Member member = memberService.findById(memberId);
            modelMap.put("member", member);
        }
        return "page/Member/member_password";
    }

    //j积分修改
    @RequestMapping(value = "/memberController_scoreChange", produces = "text/html;charset=UTF-8")
    public String scoreChange(@RequestParam(required = true, value = "memberId") Integer memberId, ModelMap modelMap) {
        System.out.println("memberController_scoreChange");
        if (memberId != null) {
            Member member = memberService.findById(memberId);
            modelMap.put("member", member);
        }
        return "page/Member/member_scoreChange";
    }


    //充值方案
    @RequestMapping(value = "/memberController_Newchargecase", produces = "text/html;charset=UTF-8")
    public String chargecase() {
        System.out.println("新增充值方案");
        return "page/Member/chargecase";
    }

}
