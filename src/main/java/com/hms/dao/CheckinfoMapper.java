package com.hms.dao;

import com.hms.pojo.Checkinfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository("checkinfoMapper")
public interface CheckinfoMapper {

    /*@Insert("insert into checkinfo(diy_id, member_id, roomcase_id, guest_type, check_type," +
            " room_price, in_time, stay_hours, preout_time, mainpay_room," +
            " pay_type, operater, sum_roomprice, check_remark, secret, " +
            " other_one, other_two, other_three)" +
            "VALUES(#{diyId,jdbcType=INTEGER},#{memberId,jdbcType=INTEGER},#{roomcase.roomcaseId,jdbcType=INTEGER}"+
            ",#{guestType,jdbcType=VARCHAR},#{checkType,jdbcType=VARCHAR},#{roomPrice,jdbcType=DOUBLE}"+
            ",#{inTime,jdbcType=DATE},#{stayHours,jdbcType=INTEGER},#{preoutTime,jdbcType=DATE}"+
            ",#{mainpayRoom,jdbcType=INTEGER},#{payType,jdbcType=VARCHAR},#{operater,jdbcType=VARCHAR}"+
            ",#{sumRoomprice,jdbcType=DOUBLE},#{checkRemark,jdbcType=VARCHAR},#{secret,jdbcType=VARCHAR}"+
            ",#{otherOne,jdbcType=VARCHAR},#{otherTwo,jdbcType=VARCHAR},#{otherThree,jdbcType=VARCHAR}"+
            ")"
    )
    @SelectKey(statement="select AUTO_INCREMENT from INFORMATION_SCHEMA.TABLES  where TABLE_NAME='checkinfo'",
            keyProperty="checkId",resultType=int.class,before=true)*/
    int add(Checkinfo checkinfo);

    Checkinfo findById(@Param("checkId") Integer checkId);

    int modify(Checkinfo checkinfo);

    List<Checkinfo> findByGroupId(@Param("groupId") Integer groupId);

    int findByTime(@Param("checkId") Integer checkId,@Param("roomTypeId") Integer roomTypeId,@Param("inTime") Date inTime);
    /*int canCheckinNum(@Param("roomTypeId") Integer roomTypeId,
                      @Param("inTime") Date inTime,roomTypeId
                      @Param("preoutTime") Date preoutTime);

    int canAddTime(@Param("roomTypeId") Integer roomTypeId,
                      @Param("inTime") Date inTime,
                      @Param("preoutTime") Date preoutTime);*/

    /**
     * 8-27  新增方法 by zjh
     * @param roomId
     * @return
     */

    List<Checkinfo> findByRoomId(@Param("roomId") Integer roomId);
    List<Checkinfo> findByBegintime(@Param("beginTime") Date beginTime);

    List<Checkinfo> findByCheckState();
}
