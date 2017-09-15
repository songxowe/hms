package com.softfactory.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.softfactory.pojo.Role;

@Repository("roleMapper")
public interface RoleMapper {

  @Insert("insert into SYS_ROLES(ID,NAME,CODE,DESCN) values(#{id},#{name},#{code},#{descn})")
  @SelectKey(statement = "select SEQ_SYS_ROLES.nextval from dual", keyProperty = "id", resultType = int.class, before = true)
  int add(Role role);

  @Update("update SYS_ROLES set NAME=#{name},CODE=#{code},DESCN=#{descn} where ID=#{id}")
  int modify(Role role);

  @Delete("delete SYS_ROLES where ID=#{id}")
  int remove(Integer id);

  @Select("select ID,NAME,CODE,DESCN from SYS_ROLES where ID=#{id}")
  Role findById(Integer id);

  @Select("select ID,NAME,CODE,DESCN from SYS_ROLES order by ID")
  List<Role> find();

  List<Role> findPager(@Param("pageno") Integer pageno, @Param("pagesize") Integer pagesize, @Param("sort") String sort,
      @Param("order") String order, @Param("name") String name, @Param("code") String code,
      @Param("descn") String descn);

  long findPagerTotal(@Param("name") String name, @Param("code") String code, @Param("descn") String descn);

  /**
   * 根据选中的角色id查询显示对应的menu
   * 
   * @param roleId
   * @return
   */
  @Select("select MENU_ID from SYS_MENU_ROLE where ROLE_ID=#{roleId} order by MENU_ID")
  List<Integer> findMenuRole(@Param("roleId") Integer roleId);
}
