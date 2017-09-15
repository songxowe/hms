package com.hms.dao;

import com.hms.pojo.Room;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomMapper {

    //添加房间
    int addRoom(@Param("room") Room room);

    //修改房间信息
    @Update("update room " +
            "set floor_id=#{floor.floorId},roomtype_id = #{roomType.roomTypeId}, room_no=#{roomNo},room_status=#{roomStatus},room_remark=#{roomRemark},other_one = #{otherOne},other_two = #{otherTwo},other_three = #{otherOne} " +
            "where room_id=#{roomId}")
    int modifyRoom(Room room);

    //删除房间信息
    @Delete("delete from room where  room_id=#{roomId}")
    int removeRoom(Integer roomId);

    //根据id查询房间信息
    Room findById(@Param("roomId") Integer roomId);


    /**
     * //根据参数查询所有房间信息
     * @param floorId  楼层id
     * @param roomTypeId  房型id
     * @param roomNo 房号
     * @param roomStatus 房间状态
     * @return
     */
    List<Room> findByParam(@Param("floorId") Integer floorId,
                           @Param("roomTypeId") Integer roomTypeId,
                           @Param("roomNo") Integer roomNo,
                           @Param("roomStatus") String roomStatus);

    //修改房间状态用
    @Update("update room set room_status=#{roomStatus} where room_id=#{roomId} ")
    int upDateRoomStatus( @Param("roomId") Integer roomId,
                            @Param("roomStatus") String roomStatus);


    //未来房态图用
    List<Room> find(
                    @Param("roomTypeId") Integer roomTypeId,
                    @Param("roomId") Integer roomId
                 );

    /**添加方法 by zjh
     * 投入运营中的房间
     * @return
     *
     */
    @Select("SELECT count(room_id) FROM  room WHERE room_status NOT LIKE '%修理%' AND room_status NOT LIKE '%预留%'"+
            " and roomtype_id=#{roomTypeId}")
    int countCanUser(@Param("roomTypeId") Integer roomTypeId);

}
