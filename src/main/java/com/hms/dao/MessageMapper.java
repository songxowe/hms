package com.hms.dao;

import com.hms.pojo.Message;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageMapper {

    @Insert("insert into message(messagetype,message_alerttime,message_readtime,messagestatus,messageremark) " +
            "values(#{messageType},#{messageAlertTime},#{messageReadTime},#{messageStatus},#{messageRemark})")
    int addMessage(Message message);

    @Update( "UPDATE message SET messagestatus = 1 where messagestatus =0")
    int modifyMessage();

    @Select("SELECT count(*) FROM message where messagestatus = #{messageStatus}")
    int unReadCount(Integer messageStatus);

    @Select("select messageid messageId,messagetype messageType,message_alerttime messageAlertTime,message_readtime messageReadTime,messagestatus messageStatus,messageremark messageRemark from message order by messagestatus asc")
    List<Message> find();

}
