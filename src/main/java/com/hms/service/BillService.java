package com.hms.service;

import com.hms.dao.BillMapper;
import com.hms.pojo.Bill;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("billService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class BillService {

    @Resource(name = "billMapper")
    private BillMapper billMapper;

    public Bill findById(@Param("billId") Integer billId){
        return billMapper.findById(billId);
    }
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int add(Bill bill){
        return billMapper.add(bill);
    }
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int modify(Bill bill){
        return billMapper.modify(bill);
    }

    public Bill findByCheckId(Integer checkId){
        List<Bill> bills = billMapper.findByCheckId(checkId);
        if(bills.size()==0){
            System.out.println("无bill信息");
            return null;
        }else if(bills.size()==2){
            System.out.println("多条bill信息  内部数据逻辑错误");
            return null;
        }else {
            return bills.get(0);
        }
    }

    public Bill findByGroupId(Integer groupId){
        List<Bill> bills = billMapper.findByGroupId(groupId);
        if(bills.size()==0){
            System.out.println("无bill信息");
            return null;
        }else if(bills.size()==2){
            System.out.println("多条bill信息  内部数据逻辑错误");
            return null;
        }else {
            return bills.get(0);
        }
    }
}
