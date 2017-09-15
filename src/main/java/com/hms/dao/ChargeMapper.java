package com.hms.dao;

import com.hms.pojo.Charge;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository("chargeMapper")
public interface ChargeMapper {

    @Insert({"insert into charge (member_id,chargecase_id,pay_type,charge_time,last_money,charge_money,operater,charge_remark)" +
            "values(#{member.memberId,jdbcType=INTEGER},#{chargecase.chargecaseId,jdbcType=INTEGER},#{payType,jdbcType=VARCHAR},now(),#{lastMoney,jdbcType=DOUBLE},#{chargeMoney,jdbcType=DOUBLE},#{operater,jdbcType=VARCHAR},#{chargeRemark,jdbcType=VARCHAR})"})
    Integer add(Charge charge);

    Charge findById(Integer id);

    //分页+多条件查询
    /*List<Charge> findPager(
            @Param("pageno") Integer pageno,
            @Param("pagesize") Integer pagesize,
            @Param("sort") String sort,
            @Param("order") String order,
            @Param("memberId") Integer memberId,
            @Param("beginDate") Date beginDate,
            @Param("endDate") Date endDate);*/

    long findPagerTotal(@Param("memberId") Integer memberId,
                        @Param("beginDate") Date beginDate,
                        @Param("endDate") Date endDate);

    List<Charge> findByParam(@Param("memberId") Integer memberId,
                             @Param("beginDate") Date beginDate,
                             @Param("endDate") Date endDate);

}
