package com.hms.service;

import com.hms.dao.GuestMapper;
import com.hms.pojo.Guest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("guestService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class GuestService {

    @Resource(name = "guestMapper")
    private GuestMapper guestMapper;

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int add(Guest guest){
        return guestMapper.add(guest);
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int modifyRoomChange(Integer checkId,Integer roomId){
        return guestMapper.modifyRoomChange( checkId,roomId);
    }

    public List<Guest> findByCheckid(Integer checkId){
        return guestMapper.findByCheckid(checkId);
    }
}
