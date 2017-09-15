package com.hms.dao;

import com.hms.pojo.AddRent;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AddRentMapper {

    //添加钟点房追加方案
    int addRent(@Param("addRent") AddRent addRent);

    //修改钟点房追加方案
    int modifyRent(@Param("addRent") AddRent addRent);

    //删除钟点房追加方案
    int removeRent(@Param("addRentId") Integer addRentId);

    //根据id查找指定钟点房追加方案
    AddRent findById(@Param("addRentId") Integer addRentId);

    /**
     * 根据条件查找钟点房追加方案
     * @param roomTypeId 房型
     * @param beginTime 方案可以使用的开始时间
     * @param endTime 该方案可以使用的结束时间
     * @param hourPrice 钟点房单价
     * @param otherOne 是否可用
     * @return
     */
    List<AddRent> findByParam(@Param("roomTypeId") Integer roomTypeId,
                              @Param("beginTime") Date beginTime,
                              @Param("endTime") Date endTime,
                              @Param("hourPrice") Double hourPrice,
                              @Param("otherOne") String otherOne);
}
