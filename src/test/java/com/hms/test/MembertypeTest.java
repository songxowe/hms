package com.hms.test;

import com.hms.pojo.Membertype;
import com.hms.service.MembertypeService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;


public class MembertypeTest {
    private MembertypeService membertypeService;

    @Before
    public void init(){
        ApplicationContext ax= new ClassPathXmlApplicationContext("applicationContext.xml");
        membertypeService=ax.getBean("membertypeService", MembertypeService.class);
    }
    @Test
    public void add(){
        Membertype membertype=new Membertype("金卡",10000d,1000,0.90);
        Integer count=membertypeService.add(membertype);
        if(count>0){
            System.out.println("OK");
        }else {
            System.out.println("error");
        }
    }
    @Test
    public void modify(){
        Membertype membertype=new Membertype();
        membertype.setMembertypeId(2);
        membertype.setDefaultMoney(8000d);
        membertype.setDefaultScore(800);
        membertype.setDiscountRate(0.95);
        membertype.setMembertypeName("普通会员");
        Integer count=membertypeService.modify(membertype);
        if(count>0){
            System.out.println("OK");
        }else {
            System.out.println("error");
        }
    }
    @Test
    public void remove(){
        Integer count = membertypeService.remove(2);
        if(count>0){
            System.out.println("OK");
        }else {
            System.out.println("error");
        }
    }
    @Test
    public void list(){
        List<Membertype> membertypes=membertypeService.find();
        System.out.println(membertypes.size());
        for(Membertype mt:membertypes){
            System.out.println(mt.getMembertypeName());
        }
    }

}
