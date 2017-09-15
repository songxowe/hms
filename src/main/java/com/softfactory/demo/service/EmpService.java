package com.softfactory.demo.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.softfactory.demo.dao.EmpMapper;
import com.softfactory.core.util.Pager;
import com.softfactory.pojo.Emp;

/**
 * 雇员管理业务逻辑类
 * 
 * @author SONG
 *
 */
@Service("empService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class EmpService {
  @Resource(name = "empMapper")
  private EmpMapper empMapper;

  public Pager<Emp> findPager(Integer pageno, Integer pagesize, String sort, String order, String ename,
      Integer deptno) {
    Pager<Emp> pager = new Pager<Emp>();
    // 设置分页数据
    pager.setRows(empMapper.findPager(pageno, pagesize, sort, order, ename, deptno));
    // 设置数据总数
    pager.setTotal(empMapper.findPagerTotal(ename, deptno));
    return pager;
  }

  @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public int add(Emp emp) {
    return empMapper.add(emp);
  }

  @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public int modify(Emp emp) {
    return empMapper.modify(emp);
  }

  @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public int remove(Integer empno) {
    return empMapper.remove(empno);
  }

  public Emp findById(Integer empno) {
    return empMapper.findById(empno);
  }
}
