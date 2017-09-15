package com.hms.dao;

import com.hms.pojo.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("memberMapper")
public interface MemberMapper {
    //新增会员
    @Insert({"insert into member(membertype_id,voucher,voucher_no,member_name,member_sex,member_phone,member_birthdate,member_address,member_hobby,member_password,operater,active_time,member_status,member_score,member_remaining,member_consume,lastchange_time)" +
            "values(#{membertype.membertypeId},#{voucher,jdbcType=VARCHAR},#{voucherNo,jdbcType=VARCHAR},#{memberName,jdbcType=VARCHAR},#{memberSex,jdbcType=VARCHAR},#{memberPhone,jdbcType=VARCHAR},#{memberBirthdate,jdbcType=DATE},#{memberAddress,jdbcType=VARCHAR},#{memberHobby,jdbcType=VARCHAR},#{memberPassword,jdbcType=VARCHAR},#{operater,jdbcType=VARCHAR},now(),'正常',#{memberScore,jdbcType=INTEGER},#{memberRemaining,jdbcType=DOUBLE},#{memberConsume,jdbcType=DOUBLE},now())"})
    Integer add(Member member);

    //修改会员
    @Update("update member set " +
            "membertype_id=#{membertype.membertypeId,jdbcType=INTEGER}," +
            "member_status=#{memberStatus,jdbcType=VARCHAR}," +
            "member_score=#{memberScore,jdbcType=INTEGER}," +
            "member_remaining=#{memberRemaining,jdbcType=DOUBLE} ," +
            "member_password=#{memberPassword,jdbcType=VARCHAR},"+
            "member_consume=#{memberConsume,jdbcType=DOUBLE},lastchange_time=now() " +
            "where member_id=#{memberId}")
    Integer modify(Member member);

    //id查询

    Member findById(@Param("memberId") Integer memberId);

   /* 旧方法 //分页+多条件查询
    List<Member> findPager(
            @Param("pageno") Integer pageno,
            @Param("pagesize") Integer pagesize,
            @Param("pageno") String sort,
            @Param("pageno") String order,
            @Param("memberId") Integer memberId,
            @Param("membertypeId") Integer membertypeId,
            @Param("memberName") String memberName,
            @Param("memberPhone") String memberPhone,
            @Param("memberStatus") String memberStatus
    );

    long findPagerTotal(@Param("memberId") Integer memberId,
                        @Param("membertypeId") Integer membertypeId,
                        @Param("memberName") String memberName,
                        @Param("memberPhone") String memberPhone,
                        @Param("memberStatus") String memberStatus
    );*/


    List<Member> findByParam(@Param("memberId") Integer memberId,
                             @Param("membertypeId") Integer membertypeId,
                             @Param("memberName") String memberName,
                             @Param("memberPhone") String memberPhone,
                             @Param("memberStatus") String memberStatus);
}
