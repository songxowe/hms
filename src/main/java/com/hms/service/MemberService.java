package com.hms.service;


import com.github.pagehelper.PageHelper;
import com.hms.dao.MemberMapper;
import com.hms.pojo.Member;
import com.hms.util.PageBean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


@Service
public class MemberService {
    @Resource(name = "memberMapper")
    private MemberMapper memberMapper;

    @Transactional(propagation = Propagation.NOT_SUPPORTED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public int add(Member member) {
        return memberMapper.add(member);
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public int modify(Member member) {
        return memberMapper.modify(member);
    }

    public Member findById(Integer id) {
        return memberMapper.findById(id);
    }

  //分页查询

    //多条件查询
    public List<Member> findByParam(Integer memberId, Integer membertypeId,String memberName,String memberPhone,String memberStatus){
        return memberMapper.findByParam(memberId,membertypeId,memberName,memberPhone,memberStatus);
    }

    //分页多条件查询
    public PageBean<Member> findByPage(Integer memberId, Integer membertypeId, String memberName, String memberPhone, String memberStatus,Integer page,Integer pageSize){

        PageHelper.startPage(page,pageSize);
        List<Member> list = memberMapper.findByParam(memberId,membertypeId,memberName,memberPhone,memberStatus);
        return new PageBean<Member>(list);
    }
}
