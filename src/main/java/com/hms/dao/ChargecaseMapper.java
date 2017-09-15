package com.hms.dao;

import com.hms.pojo.Chargecase;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("chargecaseMapper")
public interface ChargecaseMapper {
    //新增充值方案
    @Insert({"insert into chargecase (chargecase_name,chargecase_money,chargecase_extra,chargecase_score,chargecase_status)" +
            "values(#{chargecaseName,jdbcType=VARCHAR},#{chargecaseMoney,jdbcType=DOUBLE},#{chargecaseExtra,jdbcType=DOUBLE},#{chargecaseScore,jdbcType=INTEGER},#{chargecaseStatus,jdbcType=VARCHAR})"})
    Integer add(Chargecase chargecase);

    //修改充值方案
    @Update({"update chargecase set chargecase_name=#{chargecaseName,jdbcType=VARCHAR},chargecase_money=#{chargecaseMoney,jdbcType=DOUBLE},chargecase_extra=#{chargecaseExtra,jdbcType=DOUBLE}," +
            "chargecase_score=#{chargecaseScore,jdbcType=INTEGER},chargecase_status=#{chargecaseStatus,jdbcType=VARCHAR} where chargecase_Id=#{chargecaseId}"})
    Integer modify(Chargecase chargecase);

    @Select({"select chargecase_id chargecaseId,chargecase_name chargecaseName,chargecase_money chargecaseMoney,chargecase_extra chargecaseExtra," +
            "chargecase_score chargecaseScore,chargecase_status chargecaseStatus from chargecase where chargecase_id=#{chaegecaseId}"})
    Chargecase findById(Integer chargecaseId);


    @Select({"select chargecase_id chargecaseId,chargecase_name chargecaseName,chargecase_money chargecaseMoney,chargecase_extra chargecaseExtra,chargecase_score chargecaseScore,chargecase_status chargecaseStatus from chargecase"})
    List<Chargecase> find();

    /*
        //分页+多条件查询
        List<Chargecase> findPager(
                @Param("pageno") Integer pageno,
                @Param("pagesize") Integer pagesize,
                @Param("pageno") String sort,
                @Param("pageno") String order,
                @Param("chargecaseName") String chargecaseName
        );

        long findPagerTotal(@Param("chargecaseName") String chargecaseName
        );*//*
    //分页查询
    @Select({"select chargecase_id chargecaseId,chargecase_name chargecaseName,chargecase_money chargecaseMoney,chargecase_score chargecaseScore,chargecase_status chargecaseStatus from chargecase where chargecase_name like CONCAT('%',#{chargecaseName},'%')"})
    List<Chargecase> findByParam(@Param("chargecaseName") String chargecaseName);
*/
}
