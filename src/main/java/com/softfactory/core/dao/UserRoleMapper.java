package com.softfactory.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.softfactory.pojo.Role;

@Repository("userRoleMapper")
public interface UserRoleMapper {

  List<Role> findPager(@Param("pageno") Integer pageno, @Param("pagesize") Integer pagesize, @Param("sort") String sort,
      @Param("order") String order, @Param("name") String name, @Param("code") String code,
      @Param("descn") String descn, @Param("authorize") String authorize, @Param("userId") Integer userId);

  long findPagerTotal(@Param("name") String name, @Param("code") String code, @Param("descn") String descn,
      @Param("authorize") String authorize, @Param("userId") Integer userId);

  @Select("select ID,NAME,CODE,DESCN from SYS_ROLES where ID in (select ROLE_ID from SYS_USER_ROLE where USER_ID=#{userId})")
  List<Role> findRole(@Param("userId") Integer userId);

  @Delete("delete from SYS_USER_ROLE where USER_ID=#{userId} and ROLE_ID=#{roleId}")
  void removeUserRole(@Param("userId") Integer userId, @Param("roleId") Integer roleId);

  @Insert("insert into SYS_USER_ROLE(USER_ID,ROLE_ID) values(#{userId},#{roleId})")
  void addUserRole(@Param("userId") Integer userId, @Param("roleId") Integer roleId);
}
