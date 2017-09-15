package com.hms.service;

import com.hms.dao.*;
import com.hms.pojo.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("repertoryService")
@Transactional(readOnly = true,propagation = Propagation.NOT_SUPPORTED)
public class RepertoryService {

    @Resource(name = "repertoryMapper")
    private RepertoryMapper repertoryMapper;


    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int add(Repertory repertory ) {
     return repertoryMapper.add(repertory);
    }
    public List<Repertory> find() {
        return repertoryMapper.find();
    }
    public Repertory pfindByid(Integer productId,Integer warehouseId){
        return repertoryMapper.Pfindbyid(productId,warehouseId);
   }
   public int modfiy(Repertory repertory){
       return repertoryMapper.modfiy(repertory);
   }
}

