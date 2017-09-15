package com.hms.service;

import com.hms.dao.ExpensetrueMapper;
import com.hms.pojo.Expensetrue;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("expensetrueService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class ExpensetrueService {

    @Resource(name = "expensetrueMapper")
    private ExpensetrueMapper expensetrueMapper;

    public Expensetrue findById(@Param("billId") Integer expensetrueId){
        return expensetrueMapper.findById(expensetrueId);
    }
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int add(Expensetrue expensetrue){
        return expensetrueMapper.add(expensetrue);
    }
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int modify(Expensetrue expensetrue){
        return expensetrueMapper.modify(expensetrue);
    }

    public List<Expensetrue> findByBillId(Integer billId){
        return expensetrueMapper.findByBillId(billId);
    }
}
