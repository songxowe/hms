package com.hms.test;

import com.hms.pojo.Chargecase;
import com.hms.service.ChargecaseService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

public class ChargecaseTest {

    private ChargecaseService chargecaseService;

    @Before
    public void init(){
        ApplicationContext ax = new ClassPathXmlApplicationContext("applicationContext.xml");
        chargecaseService = ax.getBean("chargecaseService", ChargecaseService.class);
    }
    @Test
    public void add(){
        Chargecase chargecase=new Chargecase();
        chargecase.setChargecaseMoney(888d);
        chargecase.setChargecaseName("test");
        chargecase.setChargecaseScore(888);
        chargecase.setChargecaseStatus("启用");
        Integer count=chargecaseService.add(chargecase);
        if(count>0){
            System.out.println("OK");
        }else{
            System.out.println("error");
        }
    }
    @Test
    public void modify(){
        Chargecase chargecase=new Chargecase();
        chargecase.setChargecaseName("充2万送1800");
        chargecase.setChargecaseId(1);
        Integer count=chargecaseService.modify(chargecase);
        if(count>0){
            System.out.println("OK");
        }else{
            System.out.println("error");
        }
    }
    @Test
    public void findByParam(){
       // List<Chargecase> list=chargecaseService.findByParam("888");
       // for(Chargecase c:list){
         //   System.out.println(c.getChargecaseName());
       // }

    }


}
