package com.hms.test;


import com.hms.pojo.Member;
import com.hms.pojo.Membertype;
import com.hms.service.MemberService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

public class MemberTest {
    private MemberService memberService;

    @Before
    public void init() {
        ApplicationContext ax = new ClassPathXmlApplicationContext("applicationContext.xml");
        memberService = ax.getBean("memberService", MemberService.class);
    }

    @Test
    public void add() {
        Membertype membertype = new Membertype();
        membertype.setMembertypeId(5);
        Member member = new Member();
        member.setMembertype(membertype);
        member.setMemberRemaining(20000d);
        member.setMemberPhone("18999223344");
        member.setMemberAddress("长沙市芙蓉区");
        member.setMemberSex("女");
        member.setMemberName("test1");
        Integer count = memberService.add(member);
        if (count > 0) {
            System.out.println("OK");
        } else {
            System.out.println("error");
        }
    }

    @Test
    public void modify() {
        Member member = new Member();
        Membertype membertype = new Membertype();
        membertype.setMembertypeId(1);
        member.setMembertype(membertype);
        member.setMemberId(19);
        Integer count = memberService.modify(member);
        if (count > 0) {
            System.out.println("OK");
        } else {
            System.out.println("error");
        }

    }

    @Test
    //多条件查询
    public void findByParam(){
        Integer memberId=null;
        Integer membertypeId=null;
        String memberName=null;
        String memberPhone=null;
        String memberStatus=null;
        List<Member> members=memberService.findByParam(memberId,membertypeId,memberName,memberPhone,memberStatus);
        System.out.println(members.size());
        for (Member m:members){
            System.out.println(m.getMembertype().getMembertypeName()+"\t"
                    +m.getMemberName()+"\t"+m.getMemberPhone()+"\t"+m.getVoucherNo());
        }

    }


    @Test
    public void findById() {
        Member member = memberService.findById(50);
        System.out.println(member.getMemberRemaining()+"\t"+member.getMemberScore() + "\t" + member.getMembertype().getMembertypeName());
    }

}
