package com.hms.dao;

import com.hms.pojo.Membertype;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("membertypeMapper")
public interface MembertypeMapper {

    @Insert("insert into membertype (membertype_name,default_money,default_score,discount_rate) values(#{membertypeName},#{defaultMoney},#{defaultScore},#{discountRate})")
    Integer add(Membertype membertype);

    @Update("update membertype set membertype_name=#{membertypeName},default_money=#{defaultMoney},default_score=#{defaultScore},discount_rate=#{discountRate} where membertype_id=#{membertypeId}")
    Integer modify(Membertype membertype);

    @Delete("delete from membertype where membertype_id=#{membertypeId}")
    Integer remove(Integer id);

    @Select("select membertype_name membertypeName,default_money defaultMoney,default_score defaultScore,discount_rate discountRate from membertype where membertype_id=#{membertypeId}")
    Membertype findById(Integer id);

    @Select("select membertype_id membertypeId,membertype_name membertypeName,default_money defaultMoney,default_score defaultScore,discount_rate discountRate from membertype")
    List<Membertype> find();

}
