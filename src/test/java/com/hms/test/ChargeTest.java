package com.hms.test;

import com.hms.pojo.Charge;
import com.hms.pojo.Chargecase;
import com.hms.pojo.Member;
import com.hms.service.ChargeService;
import com.hms.service.ChargecaseService;
import com.hms.service.MemberService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class ChargeTest {
    private ChargeService chargeService;
    private MemberService memberService;
    private ChargecaseService chargecaseService;

    @Before
    public void init() {
        ApplicationContext ax = new ClassPathXmlApplicationContext("applicationContext.xml");
        chargeService = ax.getBean("chargeService", ChargeService.class);
        memberService = ax.getBean("memberService", MemberService.class);
        chargecaseService = ax.getBean("chargecaseService", ChargecaseService.class);
    }

    @Test
    public void add() {
        Charge charge = new Charge();
        Integer memberId = 60;
        Integer ChargecaseId = 3;
        Member member = memberService.findById(60);
        Chargecase chargecase = chargecaseService.findById(3);
        Double money = chargecase.getChargecaseMoney() + chargecase.getChargecaseExtra();
        Integer score = chargecase.getChargecaseScore();
        Double lastMoney = member.getMemberRemaining();
        Integer nowScore = member.getMemberScore();

        member.setMemberRemaining(lastMoney + money);
        member.setMemberScore(nowScore + score);
        Integer m = memberService.modify(member);
        if (m > 0) {
            System.out.println("member OK");
        } else {
            System.out.println("member error");
        }
        charge.setLastMoney(lastMoney);
        charge.setChargeMoney(money);
        charge.setPayType("现金");
        charge.setMember(member);
        charge.setChargecase(chargecase);

        Integer c = chargeService.add(charge);
        if (c > 0) {
            System.out.println("charge OK");
        } else {
            System.out.println("chaege error");
        }

    }


}
