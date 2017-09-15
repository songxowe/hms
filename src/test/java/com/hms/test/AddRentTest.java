package com.hms.test;

import com.hms.pojo.AddRent;
import com.hms.service.AddRentService;
import com.hms.service.RoomTypeService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class AddRentTest {
    private AddRentService addRentService;
    private RoomTypeService roomTypeService;

    @Before
    public void init(){
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        addRentService = ctx.getBean("addRentService",AddRentService.class);
        roomTypeService = ctx.getBean("roomTypeService",RoomTypeService.class);
    }

    @Test
    public void add(){
        AddRent addRent = new AddRent();
        addRent.setEndTime(new Date());
        addRent.setBeginTime(new Date());
        addRent.setRoomType(roomTypeService.findById(7));
        System.out.println(addRentService.addRent(addRent));
    }

    @Test
    public void modify(){
        AddRent addRent = new AddRent();
        addRent.setEndTime(new Date());
        addRent.setBeginTime(new Date());
        addRent.setRoomType(roomTypeService.findById(8));
        addRent.setAddrentId(1);
        addRent.setFreeRoom(1);
        addRent.setAddHourPrice(2d);
        System.out.println(addRentService.modifyRent(addRent));
    }

    @Test
    public void remove(){
        System.out.println(addRentService.removeRent(3));
    }

    @Test
    public void findById(){
        AddRent addRent = addRentService.findById(1);
        System.out.println(addRent.getRoomType().getOtherOne() + addRent.getRoomType().getRoomTypeId());
        System.out.println(addRent.getBeginTime() + addRent.getOtherOne());
    }

    @Test
    public void findByParam(){
        Integer roomTypeId = 7;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date beginTime= sdf.parse("2017-05-17");
            Date endTime= sdf.parse("2017-07-17");

            Double hourPrice= null;
            String otherOne= null;
            List<AddRent> addRents = addRentService.findByParam(roomTypeId, beginTime, endTime, hourPrice, otherOne);

        for (AddRent addRent:addRents){
            System.out.println("--------------------");
            System.out.println(addRent.getRoomType().getOtherOne() + addRent.getRoomType().getRoomTypeId());
            System.out.println(addRent.getOtherOne() + addRent.getBeginTime());
        }

        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
