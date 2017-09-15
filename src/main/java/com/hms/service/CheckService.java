package com.hms.service;

import com.hms.dao.*;
import com.hms.pojo.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service("checkService")
@Transactional(readOnly = true, propagation = Propagation.NOT_SUPPORTED)
public class CheckService {
    @Resource(name = "checkinfoMapper")
    private CheckinfoMapper checkinfoMapper;
    @Resource(name = "guestMapper")
    private GuestMapper guestMapper;
    @Resource(name = "payMapper")
    private PayMapper payMapper;
    @Resource(name = "groupinfoMapper")
    private GroupinfoMapper groupinfoMapper;
    @Resource(name = "bookMapper")
    private BookMapper bookMapper;
    @Resource(name = "bookroomMapper")
    private BookroomMapper bookroomMapper;
    @Resource(name = "roomMapper")
    private RoomMapper roomMapper;


    private boolean check(Checkinfo checkinfo , Room room , Date inTime, Date preoutTime, Integer num){
        boolean flag = false;
        if(checkinfo==null){
            checkinfo = new Checkinfo();
        }
        List<Bookroom> bookrooms = new ArrayList<Bookroom>();//时间段内已下预定
        bookrooms = bookroomMapper.findByTime(room.getRoomType().getRoomTypeId(), inTime, preoutTime);
        Integer totalRoom = roomMapper.countCanUser(room.getRoomType().getRoomTypeId());//总可用房间
        System.out.println("可用房间："+totalRoom);
        Integer maxNeed = checkinfoMapper.findByTime(null,room.getRoomType().getRoomTypeId(), inTime); //cometime 时刻最大需求房间数
        System.out.println("第一次需要最大值："+maxNeed);
        for (int i = 0; i < bookrooms.size(); i++) {
            Bookroom bookroom = bookrooms.get(i);
            Book book = bookMapper.findById(bookroom.getBookId());
            int using = checkinfoMapper.findByTime(checkinfo.getCheckId(),room.getRoomType().getRoomTypeId(), book.getComeTime());
            if(checkinfo.getPreoutTime()!=null && checkinfo.getPreoutTime().getTime() < book.getComeTime().getTime()){
                using += 1;
            }
            System.out.println("using"+i+"  :"+using);
            int tmp = using + bookroom.getRoomAmount();
            for (int j = 0; j < bookrooms.size(); j++) {
                Bookroom lastbr = bookrooms.get(j);
                Book lastb = bookMapper.findById(lastbr.getBookId());
                if (lastb.getLeaveTime().getTime() > book.getComeTime().getTime()) {
                    tmp += lastbr.getRoomAmount();
                }
            }
            System.out.println("tmp "+i +" :"+tmp);
            maxNeed = maxNeed > tmp ? maxNeed : tmp;
            System.out.println("maxNeed "+i +" :"+maxNeed);
        }
        if (maxNeed+num <= totalRoom) {
            flag = true;
        }
        return flag;
    }

    /**
     * 入住检查
     *
     * @param roomId
     * @param inTime
     * @param preoutTime
     * @return
     */
    public boolean canCheckin(Integer roomId, Date inTime, Date preoutTime) {
        Room room = roomMapper.findById(roomId);
        /*//时间段查找  入住单  预订单 统计房型总需求数  小于 总可用房间  返回false
        if(checkinfoMapper.canCheckinNum(room.getRoomType().getRoomTypeId(),inTime,preoutTime)>0){
            flag = true;
        }*/
        return this.check(null,room,inTime,preoutTime,1);
    }

    /**
     * 续房 检查
     *
     * @param addTime
     * @param checkId
     * @return
     */
    public boolean canAddTime(Integer addTime, Integer checkId) {
        boolean flag = false;
        Checkinfo checkinfo = checkinfoMapper.findById(checkId);
        Room room = roomMapper.findById(checkinfo.getRoom().getRoomId());
        Date preoutTime = null;
        Date inTime = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(inTime);
        if (checkinfo.getCheckType().equals("天房")) {
            c.add(Calendar.DATE, addTime);
        } else if (checkinfo.getCheckType().equals("月租房")) {
            c.add(Calendar.MONTH, addTime);
        } else if (checkinfo.getCheckType().equals("钟点房")) {
            c.add(Calendar.HOUR, addTime);
        }
        preoutTime = c.getTime();

        return this.check(checkinfo,room,inTime,preoutTime,0);
    }

    /**
     * 集团入住
     * @param groupinfo
     * @param checkinfos
     * @return
     */
    public boolean groupCanCheckin(Groupinfo groupinfo,List<Checkinfo> checkinfos){
        boolean flag = false;
        List<Room> rooms = new ArrayList<Room>();
        Date inTime = groupinfo.getInTime();
        Date preoutTime;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(inTime);
        calendar.add(Calendar.DATE,groupinfo.getStayHours());
        preoutTime = calendar.getTime();
        System.out.println("checkinfos.size()-"+checkinfos.size());
        for (int i = 0; i < checkinfos.size(); i++) {
            Checkinfo checkinfo = checkinfos.get(i);
            Room room = roomMapper.findById(checkinfo.getRoom().getRoomId());
            int num=1;
            for (int j = 1; j+i < checkinfos.size(); j++) {
                Checkinfo ci = checkinfos.get(j+i);
                Room tr =  roomMapper.findById(ci.getRoom().getRoomId());
                if(tr.getRoomType().getRoomTypeId()==room.getRoomType().getRoomTypeId()){
                    num++;
                    checkinfos.remove(ci);
                    j--;
                }

            }
            if(num>1){
                i--;
            }
            System.out.println("ss"+i);
            if(!this.check(null,room,groupinfo.getInTime(),preoutTime,num)){
                System.out.println("bk"+i);
                break;
            }else {
                if(i+1==checkinfos.size()){
                    flag = true;
                }
            }

        }
        return flag;
    }

    /**
     * 团体续房检测
     * @param checkinfos
     * @param addTime
     * @return
     */
    public boolean groupCanAdd(List<Checkinfo> checkinfos,Integer addTime){
        boolean flag = false;
        for (int k = 0; k < checkinfos.size(); k++) {
            Checkinfo checkinfo = checkinfos.get(k);
            Room room = roomMapper.findById(checkinfo.getRoom().getRoomId());
            Integer roomTypeId = room.getRoomType().getRoomTypeId();
            Date preoutTime = null;
            Date inTime = new Date();
            Calendar c = Calendar.getInstance();
            c.setTime(inTime);
            if (checkinfo.getCheckType().equals("天房")) {
                c.add(Calendar.DATE, addTime);
            } else if (checkinfo.getCheckType().equals("月租房")) {
                c.add(Calendar.MONTH, addTime);
            } else if (checkinfo.getCheckType().equals("钟点房")) {
                c.add(Calendar.HOUR, addTime);
            }
            preoutTime = c.getTime();

            List<Bookroom> bookrooms = new ArrayList<Bookroom>();//时间段内已下预定
            bookrooms = bookroomMapper.findByTime(roomTypeId, inTime, preoutTime);
            Integer totalRoom = roomMapper.countCanUser(room.getRoomType().getRoomTypeId());//总可用房间
            Integer maxNeed = checkinfoMapper.findByTime(null, roomTypeId, inTime); //cometime 时刻最大需求房间数
            int groupType=0;
            for(Checkinfo ci:checkinfos){
                Room ri = roomMapper.findById(ci.getRoom().getRoomId());
                if(ri.getRoomType().getRoomTypeId()==roomTypeId){
                    groupType++;
                }
            }

            for (int i = 0; i < bookrooms.size(); i++) {
                Bookroom bookroom = bookrooms.get(i);
                Book book = bookMapper.findById(bookroom.getBookId());
                int using = checkinfoMapper.findByTime(checkinfo.getCheckId(),roomTypeId , book.getComeTime());
                if(checkinfo.getPreoutTime()!=null && checkinfo.getPreoutTime().getTime() < book.getComeTime().getTime()){
                    using += groupType;
                }
                int tmp = using + bookroom.getRoomAmount();
                for (int j = 0; j < bookrooms.size(); j++) {
                    Bookroom lastbr = bookrooms.get(j);
                    Book lastb = bookMapper.findById(lastbr.getBookId());
                    if (lastb.getLeaveTime().getTime() > book.getComeTime().getTime()) {
                        tmp += lastbr.getRoomAmount();
                    }
                }
                maxNeed = maxNeed > tmp ? maxNeed : tmp;
            }
            if (maxNeed <= totalRoom) {
                if(k+1==checkinfos.size()){
                    flag = true;
                }
            }else {
                break;
            }
        }
        return flag;
    }



    public int canBookNumber(Integer roomTypeId,Date inTime,Date leaveTime){
        int count = 0;
        int using = checkinfoMapper.findByTime(null,roomTypeId,inTime);
        List<Bookroom> bookrooms = bookroomMapper.findByTime(roomTypeId,inTime,leaveTime);
        int booked=0;
        for (int i = 0; i <bookrooms.size() ; i++) {
            booked += bookrooms.get(i).getRoomAmount();
        }
        int total = roomMapper.countCanUser(roomTypeId);
        System.out.println("total"+total+" using"+using+" booked"+booked);
        return total-using-booked;
    }

}
