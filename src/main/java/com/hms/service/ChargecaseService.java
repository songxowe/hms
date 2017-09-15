package com.hms.service;

import com.github.pagehelper.PageHelper;
import com.hms.dao.ChargecaseMapper;
import com.hms.pojo.Chargecase;
import com.hms.util.PageBean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


@Service
public class ChargecaseService {
    @Resource(name = "chargecaseMapper")
    private ChargecaseMapper chargecaseMapper;

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public Integer add(Chargecase chargecase) {
        return chargecaseMapper.add(chargecase);
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public Integer modify(Chargecase chargecase) {
        return chargecaseMapper.modify(chargecase);
    }


    //多条件查询
/*
    public List<Chargecase> findByParam(String chargecaseName) {
        return chargecaseMapper.findByParam(chargecaseName);
    }
*/

    public Chargecase findById(Integer chargecaseId){
        return chargecaseMapper.findById(chargecaseId);
    }

   /* //多条件查询
    public PageBean<Chargecase> findByPage(String chargecaseName, Integer page, Integer pageSize) {
        PageHelper.startPage(page, pageSize);
        List<Chargecase> list = chargecaseMapper.findByParam(chargecaseName);
        return new PageBean<Chargecase>(list);
    }
*/
    public List<Chargecase> find() {
        return chargecaseMapper.find();
    }

}
