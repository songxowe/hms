package com.hms.controller;

import com.hms.pojo.Checkinfo;
import com.hms.pojo.Message;
import com.hms.pojo.Room;
import com.hms.service.CheckinfoService;
import com.hms.service.MessageService;
import com.hms.service.RoomService;
import net.sf.json.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class FutureRoomStateController {
    @Resource(name = "roomService")
    private RoomService roomService;
    @Resource(name = "messageService")
    private MessageService messageService;
    @Resource(name = "checkinfoService")
    private CheckinfoService checkinfoService;




    @RequestMapping(value = "roomState",produces =  "application/json;charset=utf-8")
    public @ResponseBody String roomState(@RequestParam(value = "roomId",required = false) Integer roomId,
                                          @RequestParam(value = "roomTypeId",required = false)Integer roomTypeId,
                                          @RequestParam(value = "sbeginTime",required = false) String sbeginTime,
                                          @RequestParam(value = "sendTime",required = false) String sendTime, ModelMap modelMap){

        //获取页面上传时间
        //将数据库中在时间之内的数据查询出来


        System.out.println(sbeginTime + "  " + sendTime +" "+ roomId +" " + roomTypeId);
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdfhard=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        JSONObject jo = new JSONObject();
        try {
            Date beginTime = sdf.parse(sbeginTime);
            String ssbeginDate = sbeginTime + " 00:00:00";
            beginTime = sdfhard.parse(ssbeginDate);
            if(beginTime.getTime()<new Date().getTime())
                beginTime = new Date();
            /*Date sd = beginTime;
            sd.setHours(23);
            sd.setMinutes(59);
            sd.setSeconds(59);*/
            Date endTime = sdf.parse(sendTime);
            endTime.setHours(23);
            endTime.setMinutes(59);
            endTime.setSeconds(59);

            List<Room> rooms = roomService.find(roomTypeId,roomId);
            //获取入住信息表中的所有入住记录
            List<Checkinfo> checkinfos = new ArrayList<>(0);
            checkinfos = checkinfoService.findByBegintime(beginTime);
            /*List<HashMap<Integer,List<String>>> hashMapList = new ArrayList<>();
            for(Room room:rooms){
                HashMap<Integer,List<String>> hashMap = new HashMap<>();
                List<String> strs = new ArrayList<>();
                while(true){
                    if(sd.getTime()>endTime.getTime()){
                        break;
                    }
                    String stu = "入住";//roomId,beginTime,sd,
                    strs.add(stu);
                    beginTime.setDate(beginTime.getDate()+1);
                    sd.setDate(sd.getDate()+1);
                }
                hashMap.put(room.getRoomId(),strs);
                hashMapList.add(hashMap);
            }*/
            /*for (int i = 0; i < 2; i++) {
                Checkinfo c = new Checkinfo();

                String s = "2017-08-27"+" 12:23:25";


                 Room r = new Room();
                 if(i/2==0){
                     r.setRoomId(8);
                     r.setRoomNo(1021);
                 }else {
                     r.setRoomId(9);
                     r.setRoomNo(1022);
                 }

                c.setPreoutTime(sdfhard.parse(s));
                 c.setStrpreoutTime(s);
                 c.setRoom(r);
                checkinfos.add(c);
            }*/

            /*Room room;
            Checkinfo checkinfo ;
            for (int i =1;i<10;i++){
                room = new Room();
                room.setRoomId(i);
                checkinfo = new Checkinfo();
                checkinfo.setRoom(room);
                checkinfos.add(checkinfo);
            }*/

           /* for (Checkinfo checkinfo1:checkinfos){
                System.out.println(checkinfo1.getRoom().getRoomId());
            }*/


            //计算时间差
//            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");   
//      java.util.Date now = df.parse("2004-03-26 13:31:40");   
//   java.util.Date date=df.parse("2004-01-02 11:30:24");   
//   long l=now.getTime()-date.getTime();   
//   long day=l/(24*60*60*1000);   
//   long hour=(l/(60*60*1000)-day*24);   
//   long min=((l/(60*1000))-day*24*60-hour*60);   
//   long s=(l/1000-day*24*60*60-hour*60*60-min*60);   
//   System.out.println(""+day+"天"+hour+"小时"+min+"分"+s+"秒");
            long l = endTime.getTime() - beginTime.getTime();
            long day=l/(24*60*60*1000);

            JsonConfig jc = new JsonConfig();
            jc.setExcludes(new String[] { "beginTime" });
            jc.setExcludes(new String[] { "endTime" });
            JSONArray ja = new JSONArray();
            System.out.println("time----------"+sdfhard.format(beginTime));
            ja.add(day);
            ja.add(beginTime);
            System.out.println(sdfhard.format(beginTime));
            ja.add(endTime);
            jo.put("key",ja);
            jo.put("date",sdfhard.format(beginTime));
            jo.put("rooms",rooms);
            jo.put("checkinfos",checkinfos);

            System.out.println(jo.toString()+"jsonobject.tostring()...");

        }catch (Exception e){
            e.printStackTrace();
        }
        return jo.toString();
    }


    //二级联动
    @RequestMapping(value = "twoUnit",produces =  "application/json;charset=utf-8")
    private @ResponseBody String twoUnit(@RequestParam(value = "roomTypeId",required = false) Integer roomTypeId){

        System.out.println(roomTypeId+"roomTypeId");
        List<Room> rooms = roomService.findByParam(null,roomTypeId,null,null);
        for (Room room:rooms){
            System.out.println(room.getRoomId()+ "   "+room.getRoomType());
        }
        JSONObject jo = new JSONObject();
        jo.put("rooms",rooms);
        System.out.println("rooms()......."+jo.toString());
        return jo.toString();
    }



    @RequestMapping(value = "checkMessage",produces =  "application/json;charset=utf-8")
    public @ResponseBody String checkMessage(){
        //System.out.println("999999");
        int count = 0;
        JSONObject jo = new JSONObject();
        //获取入住信息表中所有的入住信息

        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Date nowTime = new Date();

        try {

            List<Checkinfo> checkinfos = checkinfoService.findByCheckState();
           /* List<Checkinfo> checkinfos = new ArrayList<>(0);


            Room room = new Room();
            room.setRoomNo(2001);

            Checkinfo checkinfo = new Checkinfo();
            checkinfo.setPreoutTime(sdf.parse("2017-08-26 14:41:08"));
            checkinfo.setRoom(room);
            checkinfos.add(checkinfo);
*/
            //System.out.println("--------------------------");
        for(Checkinfo checkinfo3:checkinfos){
            System.out.println(checkinfo3.getPreoutTime()+"preoutime()..."+checkinfo3.getCheckId());
            //计算时间差
//            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");   
//      java.util.Date now = df.parse("2004-03-26 13:31:40");   
//   java.util.Date date=df.parse("2004-01-02 11:30:24");   
//   long l=now.getTime()-date.getTime();   
//   long day=l/(24*60*60*1000);   
//   long hour=(l/(60*60*1000)-day*24);   
//   long min=((l/(60*1000))-day*24*60-hour*60);   
//   long s=(l/1000-day*24*60*60-hour*60*60-min*60);   
//   System.out.println(""+day+"天"+hour+"小时"+min+"分"+s+"秒");
           // System.out.println(sdf.format(nowTime)+"timg"+sdf.format(checkinfo.getPreoutTime()));

                    long checkL = checkinfo3.getPreoutTime().getTime()-nowTime.getTime() ;
                    long checkLDay = checkL / (24 * 60 * 60 * 1000);
                    long checkHour = (checkL / (60 * 60 * 1000) - checkLDay * 24);
                    long checkmin = ((checkL / (60 * 1000)) - checkLDay * 24 * 60 - checkHour * 60);
                    long checks=(checkL/1000-checkLDay*24*60*60-checkHour*60*60-checkmin*60);

           System.out.println("毫秒："+checkL+"==天："+checkLDay+"====== 小时："+checkHour +"====分钟："+checkmin+"====秒："+checks);

                    if(checkLDay == 0 && checkHour == 2  && checkmin ==0 && checks < 59){
                        System.out.println("向数据库中添加一条2小时提醒数据");

                        Message message = new Message();
                        message.setMessageAlertTime(new Date());
                        message.setMessageType(1);
                        message.setMessageReadTime(null);
                        message.setMessageStatus(0);
                        message.setMessageRemark("房间号："+checkinfo3.getRoom().getRoomNo()+"距离退房还有2小时");

                        messageService.addMessage(message);

                    }
                    if(checkLDay == 0 && checkHour == 0  && checkmin ==30 && checks < 59){
                        System.out.println("向数据库中添加一条30分钟提醒数据");

                        Message message = new Message();
                        message.setMessageAlertTime(new Date());
                        message.setMessageType(1);
                        message.setMessageReadTime(null);
                        message.setMessageStatus(0);
                        message.setMessageRemark("房间号："+checkinfo3.getRoom().getRoomNo()+"距离退房还有30分钟");

                        messageService.addMessage(message);
                    }
                }

                count = messageService.unReadCount(0);


                        jo.put("count",count);





           }catch (Exception e){
            e.printStackTrace();
        }


        return jo.toString();
    }

}
