package com.hms.service;

import com.hms.dao.AddRentMapper;
import com.hms.pojo.AddRent;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service
@Transactional(propagation = Propagation.NOT_SUPPORTED,readOnly = true)
public class AddRentService {
    @Resource(name="addRentMapper")
    private AddRentMapper addRentMapper;


    //添加钟点房加价方案
    public int addRent(AddRent addRent){
       return addRentMapper.addRent(addRent);
    }
    //修改钟点房加价方案
    public int modifyRent(AddRent addRent){
        return addRentMapper.modifyRent(addRent);
    }
    //删除钟点房加价方案
    public int removeRent(Integer addRentId){
        return addRentMapper.removeRent(addRentId);
    }
    //根据id朝找指定钟点房加价方案
    public AddRent findById(Integer addRentId){
        return addRentMapper.findById(addRentId);
    }

    //根据参数查找钟点房加价方案
    public List<AddRent> findByParam(Integer roomTypeId, Date beginTime, Date endTime, Double hourPrice, String otherOne){
        return addRentMapper.findByParam(roomTypeId,beginTime,endTime,hourPrice,otherOne);
    }
}
