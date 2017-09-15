package com.hms.service;

import com.hms.dao.BookMapper;
import com.hms.pojo.Book;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service("bookService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class BookService {

    @Resource(name = "bookMapper")
    private BookMapper bookMapper;

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int add(Book book){
        return bookMapper.add(book);
    }

    public Book findById(Integer bookId){
        return bookMapper.findById(bookId);
    }

    public Book findWhenCheckin(Integer bookId){
        List<Book> books = bookMapper.findWhenCheckin(bookId);
        if(books.size()==0){
            return null;
        }else {
            return books.get(0);
        }
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int updateBook(){
        return bookMapper.updateBook(new Date());
    }
}
