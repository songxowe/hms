package com.hms.test;

import com.hms.pojo.RoomType;
import com.hms.service.RoomTypeService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

public class RoomTypeTest {
    private RoomTypeService roomTypeService;

    @Before
    public void init(){
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        roomTypeService = ctx.getBean("roomTypeService",RoomTypeService.class);
    }

    @Test
    public void add(){
        RoomType roomType = new RoomType();
        roomType.setRoomTypeId(7);
        roomType.setRoomTypeName("test1RoomType");
        roomType.setRoomTypeRemark("roomType1备注");
        System.out.println(roomTypeService.addRoomType(roomType));
    }

    @Test
    public void modify(){
        RoomType roomType = new RoomType();
        roomType.setRoomTypeId(7);
        roomType.setRoomTypeName("modify testRoomType");
        roomType.setRoomTypeRemark("modify roomType备注");
        System.out.println(roomTypeService.modifyRoomType(roomType));
    }

    @Test
    public void remove(){
        System.out.println(roomTypeService.removeRoomType(7));
    }

    @Test
    public void findById(){
        RoomType roomType = roomTypeService.findById(8);
        System.out.println(roomType.getRoomTypeRemark() + " " + roomType.getRoomTypeName());
    }
    @Test
    public void find(){
        List<RoomType> roomTypes = roomTypeService.find();
        System.out.println(roomTypes.size());

        for (RoomType roomType:roomTypes){
            System.out.println(roomType.getRoomTypeName());
        }
    }
}
