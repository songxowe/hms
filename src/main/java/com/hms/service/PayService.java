package com.hms.service;

import com.hms.dao.PayMapper;
import com.hms.pojo.Pay;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("payService")
public class PayService {
    @Resource(name = "payMapper")
    private PayMapper payMapper;

    public int add(Pay pay){
        return payMapper.add(pay);
    }

    public List<Pay> findByCheckinfo(Integer checkId){
        return payMapper.findByCheckinfo(checkId);
    }
}
