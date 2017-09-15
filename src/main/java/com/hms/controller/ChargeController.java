package com.hms.controller;

import com.hms.pojo.Charge;
import com.hms.pojo.Chargecase;
import com.hms.pojo.Member;
import com.hms.service.ChargeService;
import com.hms.service.ChargecaseService;
import com.hms.service.MemberService;
import com.hms.util.ChargecaseValuesProcessor;
import com.hms.util.JsonDateValueProcessor;
import com.hms.util.PageBean;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Date;

@Controller
public class ChargeController {
    @Resource(name = "chargeService")
    private ChargeService chargeService;
    @Resource(name = "memberService")
    private MemberService memberService;
    @Resource(name = "chargecaseService")
    private ChargecaseService chargecaseService;

    //显示充值记录（list）
    @RequestMapping(value = "chargeController_list", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String list(
            @Param("memberId") Integer memberId,
            @Param("beginDate") Date beginDate,
            @Param("endDate") Date endDate,
            @Param("page") Integer page,
            @Param("rows") Integer rows) {
        System.out.println("chargeController_list");
        PageBean<Charge> list = chargeService.findByPage(memberId, beginDate, endDate, page, rows);
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor());
        jsonConfig.registerJsonValueProcessor(Chargecase.class, new ChargecaseValuesProcessor());
        JSONObject jo = (JSONObject) JSONSerializer.toJSON(list, jsonConfig);
        System.out.println(list.getTotal());
        System.out.println(list.getPage());
        System.out.println(list.getRows().size());
        return jo.toString();
    }

    //充值业务（add）
    @RequestMapping(value = "chargeController_add", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String save(@Param("memberId") Integer memberId, @Param("chargecaseId") Integer chargecaseId, @Param("payType") String payType) {
        System.out.println("开启充值业务");
        Member member = memberService.findById(memberId);
        System.out.println("充值会员：" + member.getMemberName());
        Chargecase chargecase = chargecaseService.findById(chargecaseId);
        System.out.println("充值方案：" + chargecase.getChargecaseName());


        Double addMoeny = chargecase.getChargecaseMoney() + chargecase.getChargecaseExtra();//需要增加的金额
        Integer addScore = chargecase.getChargecaseScore();//需要增加的积分
        Double oldmoney = member.getMemberRemaining();//未充值的金额
        Integer score = member.getMemberScore(); //未充值的积分

        member.setMemberRemaining(oldmoney + addMoeny);
        member.setMemberScore(score + addScore);

        memberService.modify(member);
        Charge charge = new Charge();
        charge.setChargecase(chargecase);
        charge.setMember(member);
        charge.setLastMoney(oldmoney);
        charge.setChargeMoney(addMoeny);
        charge.setPayType(payType);
        Integer count = chargeService.add(charge);
        return String.valueOf(count);
    }


}
