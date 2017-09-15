package com.hms.test;

import com.hms.pojo.Guest;
import com.hms.service.GuestService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

public class GuestTest {
    private GuestService guestService;

    @Before
    public void init(){
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        guestService = ctx.getBean("guestService",GuestService.class);
    }

    @Test
    public void modifyRoomChange(){
        guestService.modifyRoomChange(13,111);
    }


    @Test
    public  void find(){
        List<Guest> guests = guestService.findByCheckid(4);
        System.out.println(guests.size());
        Guest g = guests.get(0);
        System.out.println(g.toString());
    }
}
