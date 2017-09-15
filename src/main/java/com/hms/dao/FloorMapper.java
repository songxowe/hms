package com.hms.dao;

import com.hms.pojo.Floor;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("floorMapper")
public interface FloorMapper {
    //添加楼层
    @Insert("insert into floor(floor_id,other_one,other_two,other_three) values (#{floorId},#{otherOne},#{otherTwo},#{otherThree})")
    int addFloor(Floor floor);

    //修改楼层信息
    @Update("update floor set other_one = #{otherOne},other_two = #{otherTwo},other_three = #{otherOne} where  floor_id = #{floorId}")
    int modifyFloor(Floor floor);

    //删除楼层信息
    @Delete("delete from floor where floor_id = #{floorId}")
    int removeFloor(Integer floorId );

    //根据id查询该层楼层信息
    @Select("select floor_id floorId,other_one otherOne,other_two otherTwo,other_three otherThree from floor where floor_id=#{floorId}")
    Floor findById(Integer floorId);

    //查询所有楼层信息
   // @Select("select floor_id floorId,other_one otherOne,other_two otherTwo,other_three otherThree from floor")
    List<Floor> find();

}
