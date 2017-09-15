package com.hms.test;

import com.hms.pojo.Floor;
import com.hms.pojo.Room;
import com.hms.pojo.RoomType;
import com.hms.pojo.Stock;
import com.hms.service.FloorService;
import com.hms.service.RoomService;
import com.hms.service.RoomTypeService;
import com.hms.service.StockService;
import com.hms.util.PageBean;
import org.apache.log4j.net.SocketServer;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.transaction.annotation.Transactional;

import java.net.Socket;
import java.util.List;

public class RoomTest {
    private RoomService roomService;
    private FloorService floorService;
    private RoomTypeService roomTypeService;
    private StockService stockService;

    @Before
    public void init(){
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        roomService = ctx.getBean("roomService",RoomService.class);
        floorService = ctx.getBean("floorService",FloorService.class);
        roomTypeService = ctx.getBean("roomTypeService",RoomTypeService.class);
        stockService = ctx.getBean("stockService",StockService.class);
    }
@Test
public  void sss(){
    Stock s = new Stock();
    s.setStockAbstract("2222");
    stockService.add(s);
}
    @Test
    public void add(){
//        System.out.println(floorService.findById(5).getFloorId());
//        Floor floor = floorService.findById(5);
//        System.out.println(roomTypeService.findById(7).getRoomTypeName());
//        RoomType roomType = roomTypeService.findById(7);
        Room room = new Room();
//        room.setFloor(floor);
//        room.setRoomType(roomType);
//        room.setRoomNo(1);
//        room.setRoomStatus(null);
//        room.setRoomRemark(null);
//        room.setOtherOne(null);
//        room.setOtherTwo(null);
//        room.setOtherThree(null);
//        System.out.println(roomService.addRoom(room));

        room.setRoomNo(1012);
        room.setRoomStatus("空闲");
        System.out.println(roomService.addRoom(room)+"111111111111");
    }

    @Test
    public void modify(){
        Room room = new Room();
        room.setRoomId(10);
        System.out.println(roomService.modifyRoom(room));
    }

    @Test
    public void remove(){
        System.out.println(roomService.removeRooom(10));
    }
    @Test
    public void findById(){
        Room room = roomService.findById(8);
        System.out.println(room.getRoomId());
        System.out.println(room.getFloor().getFloorId() + room.getRoomType().getRoomTypeName()+room.getOtherOne());
        System.out.println(room.getFloor().getOtherOne()+ "  " + room.getRoomType().getOtherOne());
    }

    @Test
    public void find(){
        /*Integer floorId = null;
        Integer roomTypeId = null;
        Integer roomNo = null;
        String roomStatus = null;
        PageBean<Room> pages = roomService.findRoomByPageBean(floorId,roomTypeId,roomNo,roomStatus);
        System.out.println(pages.getList().size());
        System.out.println(pages.getSize());
        System.out.println(pages.getPageNum());
        System.out.println(pages.getPages());
        System.out.println(pages.getPageSize());
        System.out.println(pages.getTotal());*/

        Integer floorId = 2;
        Integer roomTypeId = 7;
        Integer roomId = 10;
        String roomStatus = null;
        List<Room> rooms = roomService.findByParam(floorId,roomTypeId,roomId,roomStatus);

        for (Room room:rooms){
            System.out.println(room.getRoomId());
        }
    }

    @Test
    public void findByPram(){
        Integer floorId = 2;
        Integer roomTypeId = 7;
        Integer roomNo = null;
        String roomStatus = null;
        List<Room> rooms = roomService.findByParam(floorId,roomTypeId,roomNo,roomStatus);

        for (Room room:rooms){
            System.out.println(room.getRoomId());
        }
    }


}
