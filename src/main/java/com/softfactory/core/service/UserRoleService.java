package com.softfactory.core.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.math.NumberUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.softfactory.core.dao.UserRoleMapper;
import com.softfactory.core.util.Constants;
import com.softfactory.core.util.Pager;
import com.softfactory.pojo.Role;

@Service("userRoleService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class UserRoleService {
  @Resource(name = "userRoleMapper")
  private UserRoleMapper userRoleMapper;

  public Pager<Role> findPager(Integer pageno, Integer pagesize, String sort, String order, String name, String code,
      String descn, String authorize, Integer userId) {
    Pager<Role> pager = new Pager<Role>();
    pager.setRows(userRoleMapper.findPager(pageno, pagesize, sort, order, name, code, descn, authorize, userId));
    pager.setTotal(userRoleMapper.findPagerTotal(name, code, descn, authorize, userId));

    List<Role> userRoles = userRoleMapper.findRole(userId);

    for (Role role : pager.getRows()) {
      for (Role r : userRoles) {
        // 判断是否授权
        if (role.getId() == r.getId()) {
          role.setAuthorize(Constants.STATUS_AUTH);
        } else {
          role.setAuthorize(Constants.STATUS_UNAUTH);
        }
      }
    }
    return pager;
  }

  /**
   * 用户角色管理操作
   * 
   * @param userId
   * @param roleId
   * @param isAuth
   */
  @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public void addUserRoles(Integer userId, String[] roleIds, boolean isAuth) {

    if (roleIds != null) {
      // 取消授权:删除原用户/角色
      List<Role> userRoles = userRoleMapper.findRole(userId);
      if (userRoles.size() > 0) {
        for (Role role : userRoles) {
          userRoleMapper.removeUserRole(userId, role.getId());
        }
      }

      if (isAuth) {
        // 授权:保存新用户/角色
        for (int i = 0; i < roleIds.length; i++) {
          userRoleMapper.addUserRole(userId, NumberUtils.createInteger(roleIds[i]));
        }
      }
    }

  }
}
