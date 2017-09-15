package com.hms.dao;

import com.hms.pojo.Ptc;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("ptcMapper")
public interface PtcMapper {
    @Insert({"insert into ptc(ptc_name,ptc_type,ptc_contacter,ptc_phone,ptc_address,credit,current_money,max_credit,saler,ptcbegin_date,ptcend_date,ptc_status,clear_type)" +
            "values(#{ptcName,jdbcType=VARCHAR},#{ptcType,jdbcType=VARCHAR},#{ptcContacter,jdbcType=VARCHAR},#{ptcPhone,jdbcType=VARCHAR},#{ptcAddress,jdbcType=VARCHAR},#{credit,jdbcType=VARCHAR},#{currentMoney,jdbcType=DOUBLE},#{maxCredit,jdbcType=DOUBLE},#{saler,jdbcType=VARCHAR},#{ptcbeginDate,jdbcType=DATE},#{ptcendDate,jdbcType=DATE},#{ptcStatus,jdbcType=VARCHAR},#{clearType,jdbcType=VARCHAR})"})
    Integer add(Ptc ptc);

   @Update({"update ptc set ptc_name=#{ptcName,jdbcType=VARCHAR},ptc_type=#{ptcType,jdbcType=VARCHAR},ptc_contacter=#{ptcContacter,jdbcType=VARCHAR},ptc_phone=#{ptcPhone,jdbcType=VARCHAR},ptc_address=#{ptcAddress,jdbcType=VARCHAR},credit=#{credit,jdbcType=VARCHAR},current_money=#{currentMoney,jdbcType=DOUBLE},max_credit=#{maxCredit,jdbcType=DOUBLE},saler=#{saler,jdbcType=VARCHAR},ptcbegin_date=#{ptcbeginDate,jdbcType=DATE},ptcend_date=#{ptcendDate,jdbcType=DATE},ptc_status=#{ptcStatus,jdbcType=VARCHAR},clear_type=#{clearType,jdbcType=VARCHAR} where ptc_id=#{ptcId}"})
    Integer modify(Ptc ptc);

    @Select("select ptc_id ptcId,ptc_name ptcName,ptc_type ptcType,ptc_contacter ptcContacter,ptc_phone ptcPhone,ptc_address ptcAddress,credit credit,current_money currentMoney,max_credit maxCredit,saler saler,ptcbegin_date ptcbeginDate,ptcend_date ptcendDate,ptc_status ptcStatus,clear_type clearType from ptc where ptc_id=#{ptcId}")
    Ptc findById(Integer id);

    @Select("select ptc_id ptcId,ptc_name ptcName,ptc_type ptcType,ptc_contacter ptcContacter,ptc_phone ptcPhone,ptc_address ptcAddress,credit credit,current_money currentMoney,max_credit maxCredit,saler saler,ptcbegin_date ptcbeginDate,ptcend_date ptcendDate,ptc_status ptcStatus,clear_type clearType from ptc")
    List<Ptc> findList();

}
