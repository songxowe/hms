package com.hms.service;

import com.hms.pojo.RoomCase;
import org.springframework.stereotype.Service;
import  com.hms.dao.RoomCaseMapper;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional(propagation = Propagation.NOT_SUPPORTED,readOnly = true)
public class RoomCaseService {

    @Resource(name = "roomCaseMapper")
    private RoomCaseMapper roomCaseMapper;

    //添加房价方案
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int addRoomCase(RoomCase roomCase){
        return roomCaseMapper.addRoomCase(roomCase);
    }

    //修改房价方案
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int modifyRoomCase(RoomCase roomCase){
        return roomCaseMapper.modifyRoomCase(roomCase);
    }

    //删除房价方案
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int removeRoomCase(Integer roomCaseId){
        return roomCaseMapper.removeRoomCase(roomCaseId);
    }

    //根据id查找指定房价方案
    public RoomCase findById(Integer roomCaseId){
        return roomCaseMapper.findById(roomCaseId);
    }
    //根据条件查询房价方案
    public List<RoomCase> findByParam(Integer roomTypeId,String roomCaseName,String payType,String guestType,Double ordinaryPrice, Double weekendPrice,Double nightPrice,Double monthPrice,String priceStatus){
        return roomCaseMapper.findByParam(roomTypeId,roomCaseName,payType,guestType,ordinaryPrice,weekendPrice,nightPrice,monthPrice,priceStatus);
    }

}
