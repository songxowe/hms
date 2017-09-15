package com.hms.dao;

import com.hms.pojo.Book;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository("bookMapper")
public interface BookMapper {

    int add(Book book);

    Book findById(@Param("bookId") Integer bookId);

    List<Book> findWhenCheckin(@Param("bookId") Integer bookId);

    @Update("UPDATE book SET book_status = '已取消' WHERE book_status like '%已预%' AND  keep_time <#{time}")
    int updateBook(@Param("time") Date time);

}
