package com.hms.service;

import com.hms.dao.BookroomMapper;
import com.hms.pojo.Bookroom;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service("bookroomService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class BookroomService {

    @Resource(name = "bookroomMapper")
    private BookroomMapper bookroomMapper;

    public List<Bookroom> findByTime(Integer roomTypeId, Date inTime, Date preoutTime) {
        return bookroomMapper.findByTime(roomTypeId, inTime, preoutTime);
    }
}
