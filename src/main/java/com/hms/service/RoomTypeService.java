package com.hms.service;

import com.hms.dao.RoomTypeMapper;
import com.hms.pojo.RoomType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional(propagation = Propagation.NOT_SUPPORTED,readOnly = true)
public class RoomTypeService {

    @Resource(name = "roomTypeMapper")
    private RoomTypeMapper roomTypeMapper;

    //添加房型
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = Exception.class)
    public int addRoomType(RoomType roomType){
        return roomTypeMapper.addRoomType(roomType);
    }

    //修改房型
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = Exception.class)
    public int modifyRoomType(RoomType roomType){
        return roomTypeMapper.modifyRoomType(roomType);
    }

    //删除房型
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = Exception.class)
    public int removeRoomType(Integer roomTypeId){
        return roomTypeMapper.removeRoomType(roomTypeId);
    }

    //根据id查找指定房型
    public RoomType findById(Integer roomTypeId){
        return roomTypeMapper.findById(roomTypeId);
    }
    //查找所有房型
    public List<RoomType> find(){
        System.out.println("-----------------");
        System.out.println(roomTypeMapper.find().size());
        return roomTypeMapper.find();
    }
}
