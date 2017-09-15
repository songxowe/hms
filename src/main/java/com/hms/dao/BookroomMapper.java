package com.hms.dao;

import com.hms.pojo.Book;
import com.hms.pojo.Bookroom;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository("bookroomMapper")
public interface BookroomMapper {

    int add(Bookroom bookroom);

    Book findById(@Param("brId") Integer brId);

    List<Bookroom> findByTime(@Param("roomTypeId") Integer roomTypeId,
                              @Param("inTime") Date inTime,
                              @Param("preoutTime") Date preoutTime);

}
