package com.hms.service;

import com.hms.dao.MessageMapper;
import com.hms.pojo.Message;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional(propagation = Propagation.NOT_SUPPORTED,readOnly = true)
public class MessageService {
    @Resource(name = "messageMapper")
    private MessageMapper messageMapper;


    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int addMessage(Message message){
        return messageMapper.addMessage(message);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int modifyMessage(){
        return messageMapper.modifyMessage();
    }

    public int unReadCount(Integer messageStatus){
        return  messageMapper.unReadCount(messageStatus);
    }

    public List<Message> find(){
        return messageMapper.find();
    }
}
