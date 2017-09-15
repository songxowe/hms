package com.hms.dao;

import com.hms.pojo.RoomType;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("roomTypeMapper")
public interface RoomTypeMapper {

    //添加房型
    @Insert("insert into roomtype(roomType_Name,roomType_Remark,other_One,other_Two,other_Three) values (#{roomTypeName},#{roomTypeRemark},#{otherOne},#{otherTwo},#{otherThree})")
    int addRoomType(RoomType roomType);

    //修改房型
    @Update("update roomtype set roomType_Name=#{roomTypeName},roomType_Remark=#{roomTypeRemark},other_One=#{otherOne},other_Two=#{otherTwo},other_Three=#{otherThree} where roomType_id=#{roomTypeId}")
    int modifyRoomType(RoomType roomType);

    //删除房型
    @Delete("delete from roomtype where roomType_id=#{roomTypeId}")
    int removeRoomType(Integer roomTypeId);

    //根据id查找房型
    @Select("select roomType_id roomTypeId,roomType_Name roomTypeName,roomType_Remark roomTypeRemark,other_One otherOne,other_Two otherTwo,other_Three otherThree from roomType where roomType_id = #{roomTypeId}")
    RoomType findById(Integer roomTypeId);

    //查询所有房型
    //@Select("select roomType_id roomTypeId,roomType_Name roomTypeName,roomType_Remark roomTypeRemark,other_One otherOne,other_Two otherTwo,other_Three otherThree from roomType")
    List<RoomType> find();
}