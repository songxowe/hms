package com.hms.dao;

import com.hms.pojo.RoomCase;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomCaseMapper {
    //添加房价方案
    @Insert("insert into roomcase(roomtype_id,roomcase_name,pay_type,guest_type,ordinary_price,weekend_price,night_price," +
            "month_price,price_type,room_default,price_status,sales,other_one,other_two,other_three) " +
            "values(#{roomType.roomTypeId},#{roomCaseName},#{payType},#{guestType},#{ordinaryPrice},#{weekendPrice},#{nightPrice},#{monthPrice},#{priceType},#{roomDefault},#{priceStatus},#{sales},#{otherOne},#{otherTwo},#{otherThree})")
    int addRoomCase(RoomCase roomCase);

    //修改房价方案
    @Update("update roomcase " +
            "set roomtype_id = #{roomType.roomTypeId},roomcase_name=#{roomCaseName},pay_type=#{payType},guest_type=#{guestType}," +
            "ordinary_price=#{ordinaryPrice},weekend_price=#{weekendPrice},night_price=#{nightPrice},month_price=#{monthPrice}," +
            "price_type=#{priceType},room_default=#{roomDefault},price_status=#{priceStatus},sales=#{sales},other_one=#{otherOne},other_two=#{otherTwo},other_three=#{otherThree}" +
            " where roomcase_id=#{roomCaseId}")
    int modifyRoomCase(RoomCase roomCase);

    //删除房价方案
    @Delete("delete from roomcase where roomcase_id=#{roomCaseId}")
    int removeRoomCase(Integer roomCaseId);

    //根据id查找房价方案
    RoomCase findById(@Param("roomCaseId") Integer roomCaseId);



    /**
     *  根据条件查找房价方案
     * @param roomTypeId
     * @param roomCaseName
     * @param payType
     * @param guestType
     * @param ordinaryPrice
     * @param weekendPrice
     * @param nightPrice
     * @param monthPrice
     * @param priceStatus
     * @return
     */
    List<RoomCase> findByParam(@Param("roomTypeId") Integer roomTypeId,
                               @Param("roomCaseName") String roomCaseName,
                               @Param("payType") String payType,
                               @Param("guestType") String guestType,
                               @Param("ordinaryPrice") Double ordinaryPrice,
                               @Param("weekendPrice") Double weekendPrice,
                               @Param("nightPrice") Double nightPrice,
                               @Param("monthPrice") Double monthPrice,
                               @Param("priceStatus") String priceStatus);
}
