package com.softfactory.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.softfactory.pojo.Dept;

/**
 * 部门管理 映射器接口
 *
 * @author SONG
 */
@Repository("deptMapper")
public interface DeptMapper {
  @Insert("insert into DEPT(DEPTNO,DNAME,LOC) values(#{deptno},#{dname},#{loc})")
  @SelectKey(statement = "select SEQ_DEPT.nextval from dual", keyProperty = "deptno", resultType = int.class, before = true)
  int add(Dept dept);

  @Update("update DEPT set DNAME=#{dname},LOC=#{loc} where DEPTNO=#{deptno}")
  int modify(Dept dept);

  @Delete("delete from DEPT where DEPTNO=#{deptno}")
  int remove(Integer deptno);

  @Select("select DEPTNO,DNAME,LOC from DEPT where DEPTNO=#{deptno}")
  Dept findById(Integer deptno);

  @Select("select DEPTNO,DNAME,LOC from DEPT")
  List<Dept> find();

  List<Dept> findPager(
          @Param("pageno") Integer pageno,
          @Param("pagesize") Integer pagesize,
          @Param("sort") String sort,
          @Param("order") String order,
          @Param("dname") String ename,
          @Param("loc") String loc);

  long findPagerTotal(@Param("dname") String ename, @Param("loc") String loc);
}
