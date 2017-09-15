package com.hms.test;

import com.hms.pojo.RoomCase;
import com.hms.pojo.RoomType;
import com.hms.service.RoomCaseService;
import com.hms.service.RoomTypeService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

public class RoomCaseTest {
    private RoomCaseService roomCaseService;
    private RoomTypeService roomTypeService;
    @Before
    public void init(){
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        roomCaseService = ctx.getBean("roomCaseService",RoomCaseService.class);
        roomTypeService = ctx.getBean("roomTypeService",RoomTypeService.class);
    }

    @Test
    public void add(){
        RoomType roomType = roomTypeService.findById(7);
        RoomCase roomCase = new RoomCase();
        roomCase.setRoomType(roomType);
        roomCase.setPayType("支付宝7");
        roomCase.setGuestType("自入7");
        roomCase.setPriceStatus("可以使用7");
        roomCase.setRoomCaseName("ceshi7");
        roomType = roomTypeService.findById(8);
        roomCaseService.addRoomCase(roomCase);
        roomCase = new RoomCase();
        roomCase.setRoomType(roomType);
        roomCase.setPayType("支付宝8");
        roomCase.setGuestType("自入8");
        roomCase.setPriceStatus("可以使用8");
        roomCase.setRoomCaseName("ceshi8");
        System.out.println(roomCaseService.addRoomCase(roomCase));
    }

    @Test
    public void modify(){
        RoomType roomType = roomTypeService.findById(8);
        RoomCase roomCase = new RoomCase();
        roomCase.setRoomType(roomType);
        roomCase.setRoomCaseId(1);
        roomCase.setPayType("支付宝yihao");
        roomCase.setGuestType("自入yihao");
        roomCase.setPriceStatus("可以使用");
        roomCase.setRoomCaseName("ceshi");
        System.out.println(roomCaseService.modifyRoomCase(roomCase));
    }


    @Test
    public void remove(){
        System.out.println(roomCaseService.removeRoomCase(1));
    }

    @Test
    public void findById(){
        RoomCase roomCase = roomCaseService.findById(2);
        System.out.println(roomCase.getRoomCaseName());
        System.out.println(roomCase.getRoomType().getRoomTypeId() + " " +roomCase.getRoomType().getRoomTypeName());
    }

    @Test
    public void findByParam(){
        List<RoomCase> roomCases = roomCaseService.findByParam(null,null,null,null,null,null,null,null,null);
        for (RoomCase roomCase:roomCases){
            System.out.println(roomCase.getRoomType().getRoomTypeName()+" " + roomCase.getRoomType().getRoomTypeId());
            System.out.println(roomCase.getRoomCaseName());
        }
    }
}
