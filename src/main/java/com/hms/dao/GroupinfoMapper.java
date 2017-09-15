package com.hms.dao;

import com.hms.pojo.Groupinfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository("groupinfoMapper")
public interface GroupinfoMapper {

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
    int add(Groupinfo groupinfo);

    Groupinfo findById(@Param("groupId") Integer groupId);

    int modify(Groupinfo groupinfo);
}
