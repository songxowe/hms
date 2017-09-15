package com.softfactory.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.softfactory.pojo.Emp;

/**
 * 雇员管理 映射器接口
 * 
 * @author SONG
 *
 */
@Repository("empMapper")
public interface EmpMapper {
  /**
   * 新增雇员
   * @param emp
   * @return
   */
  // 设置 jdbcType=INTEGER 允许空值 [VARCHAR / DATE / DOUBLE]
  @Insert("insert into EMP(EMPNO,ENAME,HIREDATE,SAL,DEPTNO) values(#{empno},#{ename},#{hiredate,jdbcType=DATE},#{sal},#{dept.deptno})")
  @SelectKey(statement="select SEQ_EMP.nextval from dual",keyProperty="empno",resultType=int.class,before=true)
  int add(Emp emp);
  
  /**
   * 修改雇员
   * @param emp
   * @return
   */
  @Update("update EMP set ENAME=#{ename},HIREDATE=#{hiredate},SAL=#{sal},DEPTNO=#{dept.deptno,jdbcType=INTEGER} where EMPNO=#{empno}")
  int modify(Emp emp);
  
  /**
   * 根据主键id删除雇员
   * @param empno
   * @return
   */
  @Delete("delete from EMP where EMPNO=#{empno}")
  int remove(Integer empno);
  
  /**
   * 根据主键id查询雇员
   * @param empno
   * @return
   */
  //@Select("select EMPNO,ENAME,HIREDATE,SAL,DEPTNO from EMP where EMPNO=#{empno}")
  Emp findById(Integer empno);
  
  /**
   * 分页查询 + 条件查询
   * @param pageno
   * @param pagesize
   * @param sort
   * @param order
   * @param ename
   * @return
   */
  List<Emp> findPager(
      @Param("pageno") Integer pageno, 
      @Param("pagesize") Integer pagesize, 
      @Param("sort") String sort,
      @Param("order") String order, 
      @Param("ename") String ename,
      @Param("deptno") Integer deptno);

  /**
   * 查询分页记录总数 + 条件查询
   * @param ename
   * @return
   */
  long findPagerTotal(@Param("ename") String ename, @Param("deptno") Integer deptno);

}