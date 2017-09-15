package com.hms.service;

import com.hms.dao.CheckinfoMapper;
import com.hms.dao.RoomCaseMapper;
import com.hms.dao.RoomMapper;
import com.hms.pojo.Checkinfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service("checkinfoService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class CheckinfoService {

    @Resource(name = "checkinfoMapper")
    private CheckinfoMapper checkinfoMapper;
    @Resource(name = "roomCaseMapper")
    private RoomCaseMapper roomCaseMapper;
    @Resource(name = "roomMapper")
    private RoomMapper roomMapper;

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int add(Checkinfo checkinfo) {
        return checkinfoMapper.add(checkinfo);
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int modify(Checkinfo checkinfo) {
        return checkinfoMapper.modify(checkinfo);
    }

    public Checkinfo findById(Integer checkId) {
        Checkinfo checkinfo = checkinfoMapper.findById(checkId);
        checkinfo.setRoomCase(roomCaseMapper.findById(checkinfo.getRoomCase().getRoomCaseId()));
        checkinfo.setRoom(roomMapper.findById(checkinfo.getRoom().getRoomId()));
        return checkinfo;
    }

    public List<Checkinfo> findByGroupId(Integer groupId){
        return checkinfoMapper.findByGroupId(groupId);
    }

    /**
     * 8-27  新增方法 by zjh
     * @param roomId
     * @return
     */
    public List<Checkinfo> findByRoomId(Integer roomId){
        return checkinfoMapper.findByRoomId(roomId);
    }


    public List<Checkinfo> findByBegintime(Date beginTime){
        return checkinfoMapper.findByBegintime(beginTime);
    }


    public List<Checkinfo> findByCheckState() {
        return checkinfoMapper.findByCheckState();
    }



}
