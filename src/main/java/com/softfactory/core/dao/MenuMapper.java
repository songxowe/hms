package com.softfactory.core.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.softfactory.pojo.Menu;

@Repository("menuMapper")
public interface MenuMapper {

  @Select("SELECT DISTINCT MR.MENU_ID FROM SYS_MENU_ROLE MR,SYS_ROLES R,SYS_USER_ROLE UR WHERE MR.ROLE_ID=R.ID AND R.ID=UR.ROLE_ID AND UR.USER_ID=#{userId}")
  List<Integer> loadUserMenus(@Param("userId") Integer userId);

  @Select("SELECT ID,PARENT_ID parentId,SEQ,NAME,DESCN,LINK_URL linkUrl,STATUS FROM SYS_MENUS WHERE PARENT_ID IS NULL ORDER BY SEQ")
  List<Menu> loadTopMenus();

  @Select("SELECT ID,PARENT_ID parentId,SEQ,NAME,DESCN,LINK_URL linkUrl,STATUS FROM SYS_MENUS WHERE PARENT_ID=#{parentId} ORDER BY SEQ")
  List<Menu> loadChileMenus(@Param("parentId") Integer parentId);

  // ** CRUD *************************************************************
  @Insert("insert into SYS_MENUS(ID,PARENT_ID,SEQ,NAME,DESCN,LINK_URL,STATUS) values(#{id},#{parentId,jdbcType=INTEGER},#{seq},#{name},#{descn},#{linkUrl},#{status})")
  @SelectKey(statement = "select SEQ_SYS_MENUS.nextval from dual", keyProperty = "id", resultType = int.class, before = true)
  int add(Menu menu);

  @Update("update SYS_MENUS set PARENT_ID=#{parentId,jdbcType=INTEGER},SEQ=#{seq},NAME=#{name},DESCN=#{descn},LINK_URL=#{linkUrl},STATUS=#{status} where ID=#{id}")
  int modify(Menu menu);

  @Delete("delete from SYS_MENUS where ID=#{id}")
  int remove(Integer id);

  @Select("SELECT ID,PARENT_ID parentId,SEQ,NAME,DESCN,LINK_URL linkUrl,STATUS FROM SYS_MENUS WHERE ID=#{id}")
  Menu findById(Integer id);

  List<Menu> findPager(@Param("pageno") Integer pageno, @Param("pagesize") Integer pagesize, @Param("sort") String sort,
      @Param("order") String order, @Param("name") String ename, @Param("descn") String descn,
      @Param("parentId") Integer parentId);

  long findPagerTotal(@Param("name") String ename, @Param("descn") String descn, @Param("parentId") Integer parentId);

  @Delete("delete from SYS_MENU_ROLE where MENU_ID=#{menuId} and ROLE_ID=#{roleId}")
  void removeMenuRole(@Param("menuId") Integer menuId, @Param("roleId") Integer roleId);

  @Insert("insert into SYS_MENU_ROLE(MENU_ID,ROLE_ID) values(#{menuId},#{roleId})")
  void addMenuRole(@Param("menuId") Integer menuId, @Param("roleId") Integer roleId);
}
