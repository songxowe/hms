package com.hms.controller;

import com.hms.pojo.Book;
import com.hms.pojo.Member;
import com.hms.service.BookService;
import com.hms.service.MemberService;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
public class MemberCheckinController {
    @Resource(name = "bookService")
    private BookService bookService;
    @Resource(name = "memberService")
    private MemberService memberService;

    @RequestMapping(value = "memberCheckinController", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String memberCheck(@RequestParam(required = true, value = "memberId") Integer memberId) {
        int count = 0;
        //System.out.println(checkinfo.getInTime());
        System.out.println("memberCheckinController-----------");
        Member member = memberService.findById(memberId);
        if(member==null){
            member=new Member();
        }

        JSONObject jo = (JSONObject)JSONSerializer.toJSON(member);
        return jo.toString();
    }

    @RequestMapping(value = "checkBook", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String checkBook(@RequestParam(required = true, value = "bookId") Integer bookId) {
        int count = 0;
        //System.out.println(checkinfo.getInTime());
        System.out.println("checkBook-----------");
        System.out.println(bookId);
        Book book = bookService.findWhenCheckin(bookId);
        System.out.println(44);
        if(book!=null){
            System.out.println(3);
            if(book.getBookStatus()==null||book.getBookStatus().indexOf("已预")==-1){
                System.out.println(2);
                book = null;
            }
        }
        if(book==null){
            book = new Book();
        }
        JSONObject jo = (JSONObject)JSONSerializer.toJSON(book);
        System.out.println(jo.toString());
        return jo.toString();
    }

}
