package com.hms.dao;

import com.hms.pojo.Guest;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("guestMapper")
public interface GuestMapper {
    @Insert("INSERT INTO guest(" +
            "  check_id, group_id, roomNO, guest_name, voucher,voucher_no, guest_phone, guest_birthdate, " +
            "  guest_sex, guest_race, guest_address, mainguest, other_one, other_two, other_three)" +
            "VALUES ("+
            "#{checkId,jdbcType=INTEGER},#{groupId,jdbcType=INTEGER},#{room.roomId,jdbcType=INTEGER}"+
            ",#{guestName,jdbcType=VARCHAR},#{voucher,jdbcType=VARCHAR},#{voucherNo,jdbcType=VARCHAR}"+
            ",#{guestPhone,jdbcType=VARCHAR},#{guestBirthdate,jdbcType=DATE},#{guestSex,jdbcType=VARCHAR}"+
            ",#{guestRace,jdbcType=VARCHAR},#{guestAddress,jdbcType=VARCHAR},#{mainguest,jdbcType=VARCHAR}"+
            ",#{otherOne,jdbcType=VARCHAR},#{otherTwo,jdbcType=VARCHAR},#{otherThree,jdbcType=VARCHAR}"+
            ")"
    )
    @SelectKey(statement="select AUTO_INCREMENT from INFORMATION_SCHEMA.TABLES  where TABLE_NAME='guest'",
            keyProperty="guestId",resultType=int.class,before=true)
    int add(Guest guest);

    @Update("UPDATE guest SET roomNO = #{roomId,jdbcType=INTEGER} where check_id = #{checkId}")
    int modifyRoomChange(@Param("checkId") Integer checkId, @Param("roomId") Integer roomId);

    List<Guest> findByCheckid(Integer checkId);
}
