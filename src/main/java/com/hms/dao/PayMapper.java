package com.hms.dao;

import com.hms.pojo.Pay;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.SelectKey;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("payMapper")
public interface PayMapper {

    @Insert("INSERT INTO pay (" +
            "  check_id, group_id, pay_type, prepay, other_one, other_two, other_three) " +
            "VALUES ("+
            "#{checkId,jdbcType=INTEGER},#{groupId,jdbcType=INTEGER},#{payType,jdbcType=VARCHAR}"+
            ",#{prepay,jdbcType=DOUBLE}"+
            ",#{otherOne,jdbcType=VARCHAR},#{otherTwo,jdbcType=VARCHAR},#{otherThree,jdbcType=VARCHAR}"+
            ")")
    @SelectKey(statement="select AUTO_INCREMENT from INFORMATION_SCHEMA.TABLES  where TABLE_NAME='pay'",
            keyProperty="payId",resultType=int.class,before=true)
    int add(Pay pay);

    List<Pay> findByCheckinfo(Integer checkId);
}
