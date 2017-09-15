package com.hms.test;

import com.hms.pojo.Groupinfo;
import com.hms.service.GroupinfoService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.Date;

public class GroupinfoTest {
    private GroupinfoService groupinfoService;

    @Before
    public void init(){
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        groupinfoService = ctx.getBean("groupinfoService",GroupinfoService.class);
    }

    @Test
    public void add(){
        Groupinfo g = new Groupinfo();
        g.setDiyId(1222);
        g.setGroupName("haha");
        g.setGuestType("自入");
        g.setInTime(new Date());
        g.setStayHours(3);
        g.setSumMoney(2000d);
        groupinfoService.add(g);
        System.out.println(g.getGroupId());
    }

    @Test
    public void findbyid(){
        Groupinfo g =groupinfoService.findById(1);
        System.out.println(g.getDiyId());
        System.out.println(g.getInTime());
    }

    @Test
    public void modify(){
        Groupinfo g =groupinfoService.findById(1);
        g.setDiyId(222222);
        groupinfoService.modify(g);
    }
}
