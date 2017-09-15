package com.hms.service;

import com.github.pagehelper.PageHelper;
import com.hms.dao.ChargeMapper;
import com.hms.dao.MemberMapper;
import com.hms.pojo.Charge;
import com.hms.util.PageBean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service
public class ChargeService {

    @Resource(name = "chargeMapper")
    private ChargeMapper chargeMapper;


    @Transactional(propagation = Propagation.NOT_SUPPORTED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public Integer add(Charge charge) {
        return chargeMapper.add(charge);
    }

    public Charge findById(Integer id) {
        return chargeMapper.findById(id);
    }

    //多条件查询
    public List<Charge> findByParam(Integer memberId, Date beginDate, Date endDate) {
        return chargeMapper.findByParam(memberId, beginDate, endDate);
    }

    //多条件查询
    public PageBean<Charge> findByPage(Integer memberId, Date beginDate, Date endDate, Integer page, Integer pageSize) {
        PageHelper.startPage(page, pageSize);
        List<Charge> list = chargeMapper.findByParam(memberId, beginDate, endDate);
        return new PageBean<Charge>(list);
    }
}
