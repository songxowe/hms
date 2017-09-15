package com.hms.service;

import com.hms.dao.FloorMapper;
import com.hms.pojo.Floor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("floorService")
@Transactional(propagation = Propagation.NOT_SUPPORTED,readOnly = true)
public class FloorService {
    @Resource(name="floorMapper")
    private FloorMapper floorMapper;

    //添加楼层
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int addFloor(Floor floor){
        return  floorMapper.addFloor(floor);
    }

    //修改楼层
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int modifyFloor(Floor floor){
        return  floorMapper.modifyFloor(floor);
    }

    //删除楼层
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public  int removeFloor(Integer floorId){
        return floorMapper.removeFloor(floorId);
    }

    //根据id查询该层楼层信息
    public Floor findById(Integer floorId){
        return floorMapper.findById(floorId);
    }
    //查询所有楼层信息
    public List<Floor> find(){
        System.out.println("-----------");
       return floorMapper.find();

    }
}
