package com.hms.test;

import com.hms.pojo.Supplier;
import com.hms.service.FloorService;
import com.hms.pojo.Floor;
import com.hms.service.SupplierService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

public class FloorTest {
    private FloorService floorService;
    private SupplierService supplierService;

    @Before
    public void init(){
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        floorService = ctx.getBean("floorService",FloorService.class);
        supplierService = ctx.getBean("supplierService",SupplierService.class);
    }

    @Test
    public  void su(){
        Supplier s = new Supplier();
        s.setSupplierName("ssss");
        supplierService.add(s);
    }
    @Test
    public void add(){
        Floor floor = new Floor();
        floor.setFloorId(7);
        floor.setOtherOne(null);
        floor.setOtherTwo(null);
        floor.setOtherThree(null);
        System.out.println( floorService.addFloor(floor));
    }
    @Test
    public void modify(){
        Floor floor = new Floor();
        floor.setFloorId(5);
        floor.setOtherOne("test");
        floor.setOtherTwo("test");
        floor.setOtherThree("test");
        System.out.println( floorService.modifyFloor(floor));
    }

    @Test
    public void remove(){
        System.out.println(floorService.removeFloor(3));
    }

    @Test
    public void findById(){
        Floor floor = floorService.findById(5);
        System.out.println(floor.getOtherOne());
    }
    @Test
    public void find(){
        List<Floor> floors = floorService.find();
        for (Floor floor:floors){
            System.out.println(floor.getFloorId());
        }
    }
}
