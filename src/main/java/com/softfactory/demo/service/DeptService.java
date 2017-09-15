package com.softfactory.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.softfactory.demo.dao.DeptMapper;
import com.softfactory.core.util.Pager;
import com.softfactory.pojo.Dept;

/**
 * 部门管理业务逻辑类
 *
 * @author SONG
 */
@Service("deptService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class DeptService {
  @Resource(name = "deptMapper")
  private DeptMapper deptMapper;

  public Pager<Dept> findPager(Integer pageno, Integer pagesize, String sort, String order, String dname, String loc) {
    Pager<Dept> pager = new Pager<Dept>();
    // 设置分页数据
    pager.setRows(deptMapper.findPager(pageno, pagesize, sort, order, dname, loc));
    // 设置数据总数
    pager.setTotal(deptMapper.findPagerTotal(dname, loc));
    return pager;
  }

  @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public int add(Dept dept) {
    return deptMapper.add(dept);
  }

  @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public int modify(Dept dept) {
    return deptMapper.modify(dept);
  }

  @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public int remove(Integer deptno) {
    return deptMapper.remove(deptno);
  }

  public List<Dept> find() {
    return deptMapper.find();
  }

  public Dept find(Integer deptno) {
    return deptMapper.findById(deptno);
  }
}
