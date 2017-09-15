package com.hms.service;

import com.hms.pojo.Expense;
import com.hms.dao.ExpenseMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service("expenseService")
@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
public class ExpenseService {
    @Resource(name = "expenseMapper")
    private ExpenseMapper expenseMapper;

    /***********
     * 增加
     */
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT,rollbackFor = Exception.class)
    public int add(Expense expense){
        return expenseMapper.add(expense);
    }
    /***********
     * 修改
     */
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int modify(Expense expense){
        return expenseMapper.modify(expense);
    }

    /***********
     * 删除
     */

    /***********
     * 按Id查询
     */
    public Expense findById(Integer expenseId){
        return expenseMapper.findById(expenseId);
    }

    /***********
     * 查询
     */
    public List<Expense> find(String expenseName){
        return expenseMapper.find(expenseName);
    }



}
