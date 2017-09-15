package com.hms.service;

import com.hms.dao.MembertypeMapper;
import com.hms.pojo.Membertype;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional(propagation = Propagation.NOT_SUPPORTED,readOnly = true)
public class MembertypeService {
    @Resource(name = "membertypeMapper")
    private MembertypeMapper membertypeMapper;

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public Integer add(Membertype membertype){
        return membertypeMapper.add(membertype);
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public Integer modify(Membertype membertype){
        return membertypeMapper.modify(membertype);
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public Integer remove(Integer id){
        return membertypeMapper.remove(id);
    }

    public Membertype findById(Integer id){
        return membertypeMapper.findById(id);
    }

    public List<Membertype> find(){
        return membertypeMapper.find();
    }


}
