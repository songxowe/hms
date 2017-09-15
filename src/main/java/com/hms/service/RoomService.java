package com.hms.service;

import com.github.pagehelper.PageHelper;
import com.hms.dao.RoomMapper;
import com.hms.pojo.Room;
import com.hms.util.PageBean;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional(propagation = Propagation.NOT_SUPPORTED,readOnly = true)
public class RoomService {

    @Resource(name = "roomMapper")
    private RoomMapper roomMapper;

    //添加房间
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int addRoom(Room room){
        return roomMapper.addRoom(room);
    }

    //修改房间信息
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int modifyRoom(Room room){
        return roomMapper.modifyRoom(room);
    }

    //删除房间信息
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int removeRooom(Integer roomId){
        return  roomMapper.removeRoom(roomId);
    }

    //根据id查询房间信息
    public Room findById(Integer roomId){
        return  roomMapper.findById(roomId);
    }

    //根据条件查询房间信息
    public PageBean<Room> findRoomByPageBean(Integer floorId,Integer roomTypeId,Integer roomNo,String roomStatus){
        PageHelper.startPage(1,2);
        List<Room> rooms = roomMapper.findByParam(floorId,roomTypeId,roomNo,roomStatus);
        return new PageBean<Room>(rooms);
    }

    ////根据条件查询房间信息
    public List<Room> findByParam(Integer floorId,Integer roomTypeId,Integer roomNo,String roomStatus){
        List<Room> rooms = roomMapper.findByParam(floorId,roomTypeId,roomNo,roomStatus);
        return rooms;
    }

    public List<Room> find(Integer roomTypeId,Integer roomId){
        List<Room> rooms = roomMapper.find(roomTypeId,roomId);
        return rooms;
    }

    //修改房间状态用
    public int upDateRoomStatus(Integer roomId,String roomStatus){
        return roomMapper.upDateRoomStatus(roomId,roomStatus);
    }

}
