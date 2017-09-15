package com.hms.service;

import com.hms.dao.GroupinfoMapper;
import com.hms.pojo.Groupinfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service("groupinfoService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class GroupinfoService {

    @Resource(name = "groupinfoMapper")
    private GroupinfoMapper groupinfoMapper;

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int add(Groupinfo groupinfo){
        return groupinfoMapper.add(groupinfo);
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int modify(Groupinfo groupinfo){
        return groupinfoMapper.modify(groupinfo);
    }

    public Groupinfo findById(Integer groupId){
        return groupinfoMapper.findById(groupId);
    }
}
