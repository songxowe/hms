<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>


<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp" %>
    <link href="${pageContext.request.contextPath }/resources/futurejs/main.css" type="text/css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/resources/futurejs/tch(1).css" type="text/css" rel="stylesheet">

    <link href="${pageContext.request.contextPath }/resources/futurejs/jquery.datetimepicker.css" rel="stylesheet">
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/futurejs/jquery-1.8.0.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/futurejs/jquery.datetimepicker.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/futurejs/datetime.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/futurejs/Base.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/futurejs/layer.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath }/resources/futurejs/layer.css"
          id="layui_layer_skinlayercss" style="">
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/futurejs/futureroomstatus.js"></script>

    <style type="text/css">
        #tbRoomStatus, #tbRoomTitle {
            table-layout: fixed;
            text-align: center;
        }

        td, th {
            padding: 0px !important;
        }

        #tbRoomStatus td, #tbRoomTitle th {
            width: 65px !important;
            border-left: 0px !important;
            padding: 0px !important;
        }

        #tbRoomTitle th {
            font-weight: bold;
            font-size: 13px;
        }

        .booking_top_01 {
            width: 100%;
            float: left;
            margin-top: 56px;
        }

        .booking_bottom_01 {
            width: 100%;
            float: left;
            position: absolute;
            left: 0px;
            top: 98px;
            bottom: 0px;
            right: 0px;
            overflow: hidden;
        }

        .booking_bottom_right {
            margin-left: 120px;
            height: 100%;
            position: relative;
            -webkit-user-select: none;
            overflow-y: scroll;
            overflow-x: scroll;
        }

        .booking_bottom_left {
            width: 150px;
            float: left;
            overflow-y: hidden;
            overflow-x: scroll;
            height: 100%;
        }

        .booking_top_right {
            margin-left: 120px;
            overflow-x: hidden;
            overflow-y: scroll;
        }

        .booking_top_left {
            width: 150px;
            float: left;
        }

        .placeHolderTr td:hover {
            background: #FFFFFF;
            color: #333;
        }

        .placeHolderTr table {
            float: left;
            border: 4px solid #fff;
            margin: 10px 5px;
        }

        .placeHolderTr table th {
            background: #C8F0EE;
            border: 0px;
            color: #238580;
            height: 30px;
        }

        .placeHolderTr table td {
            background: #efefef;
            border: 0px;
            border-top: 1px solid #fff;
            height: 35px;
        }

        .placeHolderTr .remark {
            max-width: 100px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
            height: 30px;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            var sl = $(".booking_bottom_right").scrollLeft();
            var st = $(".booking_bottom_right").scrollTop();
            $(".booking_bottom_right").scroll(function () {
                var newsl = $(this).scrollLeft();
                var newst = $(this).scrollTop();
                if (sl != newsl) {
                    sl = newsl;
                    $(".booking_top_right").scrollLeft(sl);
                }
                if (st != newst) {
                    st = newst;
                    $(".booking_bottom_left").scrollTop(st);
                }
            });
        })
    </script>
</head>


<body>
<div class="main">
    <div class="ftt_search fontYaHei"
         style="position: fixed; left: 1%; top: 0px; background: #fff; padding: 15px 0px 10px 0px; z-index: 9; margin: 0px; width: 98%">
        <label>查询时间：</label>
        <input type="text" style="width: 120px" readonly="readonly" id="StartDate">
        <label style="padding-right: 10px; margin-left: -10px;">至</label>
        <input type="text" style="width: 120px" readonly="readonly" id="EndDate">


        <div id="rroomType" style="display: block;">
            <label>房型:</label>
            <select id="roomTypeOption">
                <option value="">请选择</option>
                <c:forEach var="roomType" items="${requestScope.roomTypes}">
                    <option value="${roomType.roomTypeId}">${roomType.roomTypeName}</option>
                </c:forEach>
            </select>
        </div>

        <label>房号:</label>
        <select id="roomNoOption">
            <option value="">请选择</option>
            <c:forEach var="roomNo" items="${requestScope.rooms}">
                <option value="${roomNo.roomId}">${roomNo.roomNo}</option>
            </c:forEach>
        </select>

        <input type="button" class="qtantj" value="查询" id="btnQuery">

    </div>
    <div class="booking_top_01">
        <div class="booking_top_left">
            <table cellpadding="0" cellspacing="0" class="booking" id="title">
                <thead>
                <tr>
                    <th>类别</th>
                </tr>
                </thead>
            </table>
        </div>
        <div class="booking_top_right">
            <table cellpadding="0" cellspacing="0" class="booking" id="tbRoomTitle">
                <thead>
                <tr id="tbTimeTitle">
                </tr>
                </thead>
            </table>
        </div>
    </div>
    <div class="booking_bottom_01">
        <div class="booking_bottom_left">
            <table cellpadding="0" cellspacing="0" class="booking" id="tbRoomStatusLeft">
                <tbody id="tbRoomLeft">

                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </div>


        <div class="booking_bottom_right">
            <table cellpadding="0" cellspacing="0" class="booking" id="tbRoomStatus">
                <thead>
                </thead>
                <tbody id="tbRoomBody">
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </div>
    </div>

</div>

<script>
    $(function () {
      /*  //alert($("#StartDate").val() + "000000000000000")
      /!*  $.ajax({
            type: 'POST',
            url: "../../roomState",
            data: {
                "sbeginTime": $.trim($("#StartDate").val()),
                "sendTime": $.trim($("#EndDate").val())
            },
            success: function (data) {

                //alert(data.checkinfos[1].room.roomId + " " + " ==" + " " + data.rooms[1].roomId)
                //加载时间日期title
                var tbTimeTitleText = "";
                var tbRoomLeft = "";
                var timeMonth = data.key[1].month + 1;
                var timeDay = data.key[1].date;
                //alert(data.key[0] + "date[0]" + timeMonth + " " + timeDay)


                //加载左侧
                $("#tbRoomLeft").empty()
                $.each(data.rooms, function (i) {
                    // //alert(data.rooms[i].roomType.roomTypeName +"***************" +data.rooms[i].roomNo)
                    tbRoomLeft += "<tr>"
                    tbRoomLeft += "<td style=\"width: 100px;display: table-cell;background: #EEA12B;color: #FFF;font-weight: lighter;font-size: 12px;line-height: 20px;\">"
                    tbRoomLeft += "" + data.rooms[i].roomType.roomTypeName + "";
                    tbRoomLeft += " </td>"
                    tbRoomLeft += " <td class=\"tis\">" + data.rooms[i].roomNo + "</td>"
                    tbRoomLeft += " </tr>"

                })
                $("#tbRoomLeft").append(tbRoomLeft)


                //判断时间
                $("#tbTimeTitle").empty()
                for (var i = 0; i < data.key[0]; i++) {

                    if (timeMonth == 1) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 2) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 29) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 3) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 4) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 31) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 5) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 6) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 31) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 7) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 8) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;

                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 9) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;

                        if (timeDay == 31) {
                            timeMonth++;
                            timeDay = 1;
                        }
                    }
                    if (timeMonth == 10) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 11) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 31) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 12) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth = 1;
                            timeDay = 1;
                        }
                    }

                }
                $("#tbTimeTitle").append(tbTimeTitleText);


                //加载body
                $("#tbRoomBody").empty()
                var btRoomBodyText = "";
                $.each(data.rooms, function (i) {
                    btRoomBodyText += "<tr id = " + data.rooms[i].roomNo + ">";
                    for (var i = 0; i < data.key[0]; i++) {
                        ////alert(data.checkinfos[0].room.roomId+" "+"111111111")

                        btRoomBodyText += "<td style=\"color:#0788BE\" ondblclick=\"btnDBclick(this,903)\" >"
                        btRoomBodyText += "空房"
                        btRoomBodyText += "</td>"


                    }
                    btRoomBodyText += "</tr>"
                })
                $("#tbRoomBody").append(btRoomBodyText);


            },
            dataType: "JSON"
        })*!/

        //alert("btnQuery().....")
        var roomNoVal = $("#roomNoOption").val();
        var roomTypeVal = $("#roomTypeOption").val()

        var sbeginTime = $.trim($("#StartDate").val());
        var sendTime = $.trim($("#EndDate").val());
        $.ajax({
            type: 'POST',
            url: "../../roomState",
            data: {
                "roomTypeId": roomTypeVal,
                "roomId": roomNoVal,
                "sbeginTime": $.trim($("#StartDate").val()),
                "sendTime": $.trim($("#EndDate").val())
            },
            success: function (data) {
                //加载时间日期title
                var tbTimeTitleText = "";
                var tbRoomLeft = "";
                var timeMonth = data.key[1].month + 1;
                var timeDay = data.key[1].date;
                //alert(data.key[0] + "date[0]" + timeMonth + " " + timeDay)
                //加载左侧
                $("#tbRoomLeft").empty()
                $.each(data.rooms, function (i) {
                    // //alert(data.rooms[i].roomType.roomTypeName +"***************" +data.rooms[i].roomNo)
                    tbRoomLeft += "<tr>"
                    tbRoomLeft += "<td style=\"width: 100px;display: table-cell;background: #EEA12B;color: #FFF;font-weight: lighter;font-size: 12px;line-height: 20px;\">"
                    tbRoomLeft += "" + data.rooms[i].roomType.roomTypeName + "";
                    tbRoomLeft += " </td>"
                    tbRoomLeft += " <td class=\"tis\">" + data.rooms[i].roomNo + "</td>"
                    tbRoomLeft += " </tr>"

                })
                $("#tbRoomLeft").append(tbRoomLeft)


                //判断时间
                $("#tbTimeTitle").empty()
                for (var i = 0; i <= data.key[0]; i++) {

                    if (timeMonth == 1) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 2) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 29) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 3) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 4) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 31) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 5) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 6) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 31) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 7) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 8) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;

                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;

                        }

                    }
                    if (timeMonth == 9) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;

                        if (timeDay == 31) {
                            timeMonth++;
                            timeDay = 1;
                        }
                    }
                    if (timeMonth == 10) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 11) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 31) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 12) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth = 1;
                            timeDay = 1;

                        }
                    }

                }
                $("#tbTimeTitle").append(tbTimeTitleText);


                //加载body
                $("#tbRoomBody").empty()
                var btRoomBodyText = "";
                //alert("房间数" + data.key[0])
                //alert("房间数" + data.key[0])
                //alert(data.date+"00000000-----000000000000")

                //alert(bdate)
                $.each(data.rooms, function (i) {
                    var bdate = new Date(data.date)
                    btRoomBodyText += "<tr id = " + data.rooms[i].roomNo + ">";
//alert(1)
                    for (var k = 0; k < data.key[0] + 1; k++) {
                        //alert(2)
                        ////alert(data.checkinfos)

                        var j = k
                        //$.each(data.checkinfos, function (j) {
                        ////alert("能循环啊")
                        ////alert(data.checkinfos[j].room.roomId)
                        var cs = []
                        var cinfo = {}
                        var statu = "空房"
                        $.each(data.checkinfos, function (n) {
                            ////alert(data.checkinfos[n].strpreoutTime)
                            ////alert(bdate)
                            ////alert(new Date(data.checkinfos[n].preoutTime)>bdate)
                            ///alert(44444444444444)

                            if(data.checkinfos[n].room.roomId==data.rooms[i].roomId){
                                ////alert(3)
                                //alert(2222222222222)
                                //alert(data.checkinfos[n].strpreoutTime>data.date)
                                /!*alert(data.checkinfos[n].strpreoutTime)
                                alert(data.date)
                                alert(data.checkinfos[n].strpreoutTime>data.date)*!/
                                //alert(new Date(data.checkinfos[n].strpreoutTime))
                                //alert(bdate)
                                //alert(new Date(data.checkinfos[n].strpreoutTime)>bdate)
                                if(new Date(data.checkinfos[n].strpreoutTime)>bdate){
                                    statu="在住"
                                }
                                //alert(4)
                            }
                        })

                        //if (data.checkinfos[j].room.roomId == data.rooms[k].roomId) {
                        btRoomBodyText += "<td style=\"color:#0788BE\" ondblclick=\"btnDBclick(this,903)\" >"
                        btRoomBodyText += statu
                        btRoomBodyText += "</td>"

                        bdate.setDate(bdate.getDate()+1)

                        //} else {
                        /!*    btRoomBodyText += "<td style=\"color:#0788BE\" ondblclick=\"btnDBclick(this,903)\" >"
                            btRoomBodyText += "空房"
                            btRoomBodyText += "</td>"

                        }*!/
                        //})


                    }
                    btRoomBodyText += "</tr>"
                })
                $("#tbRoomBody").append(btRoomBodyText);
            },

            dataType: "JSON"


        })

        //alert(roomNoVal + " " + roomTypeVal)*/


        //alert("btnQuery().....")
        var roomNoVal = $("#roomNoOption").val();
        var roomTypeVal = $("#roomTypeOption").val()

        var sbeginTime = $.trim($("#StartDate").val());
        var sendTime = $.trim($("#EndDate").val());
        $.ajax({
            type: 'POST',
            url: "../../roomState",
            data: {
                "roomTypeId": roomTypeVal,
                "roomId": roomNoVal,
                "sbeginTime": $.trim($("#StartDate").val()),
                "sendTime": $.trim($("#EndDate").val())
            },
            success: function (data) {
                //加载时间日期title
                var tbTimeTitleText = "";
                var tbRoomLeft = "";
                var timeMonth = data.key[1].month + 1;
                var timeDay = data.key[1].date;
                //alert(data.key[0] + "date[0]" + timeMonth + " " + timeDay)
                //加载左侧
                $("#tbRoomLeft").empty()
                $.each(data.rooms, function (i) {
                    // //alert(data.rooms[i].roomType.roomTypeName +"***************" +data.rooms[i].roomNo)
                    tbRoomLeft += "<tr>"
                    tbRoomLeft += "<td style=\"width: 100px;display: table-cell;background: #EEA12B;color: #FFF;font-weight: lighter;font-size: 12px;line-height: 20px;\">"
                    tbRoomLeft += "" + data.rooms[i].roomType.roomTypeName + "";
                    tbRoomLeft += " </td>"
                    tbRoomLeft += " <td class=\"tis\">" + data.rooms[i].roomNo + "</td>"
                    tbRoomLeft += " </tr>"

                })
                $("#tbRoomLeft").append(tbRoomLeft)


                //判断时间
                $("#tbTimeTitle").empty()
                for (var i = 0; i <= data.key[0]; i++) {

                    if (timeMonth == 1) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 2) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 29) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 3) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 4) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 31) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 5) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 6) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 31) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 7) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 8) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;

                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;

                        }

                    }
                    if (timeMonth == 9) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;

                        if (timeDay == 31) {
                            timeMonth++;
                            timeDay = 1;
                        }
                    }
                    if (timeMonth == 10) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 11) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 31) {
                            timeMonth++;
                            timeDay = 1;
                        }

                    }
                    if (timeMonth == 12) {
                        tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                        timeDay++;
                        if (timeDay == 32) {
                            timeMonth = 1;
                            timeDay = 1;

                        }
                    }

                }
                $("#tbTimeTitle").append(tbTimeTitleText);


                //加载body
                $("#tbRoomBody").empty()
                var btRoomBodyText = "";
                //alert("房间数" + data.key[0])
                //alert("房间数" + data.key[0])
                //alert(data.date+"00000000-----000000000000")

                //alert(bdate)
                $.each(data.rooms, function (i) {
                    var bdate = new Date(data.date)
                    btRoomBodyText += "<tr id = " + data.rooms[i].roomNo + ">";
//alert(1)
                    for (var k = 0; k < data.key[0] + 1; k++) {
                        //alert(2)
                        ////alert(data.checkinfos)

                        var j = k
                        //$.each(data.checkinfos, function (j) {
                        ////alert("能循环啊")
                        ////alert(data.checkinfos[j].room.roomId)
                        var cs = []
                        var cinfo = {}
                        var statu = "空房"
                        $.each(data.checkinfos, function (n) {
                            ////alert(data.checkinfos[n].strpreoutTime)
                            ////alert(bdate)
                            ////alert(new Date(data.checkinfos[n].preoutTime)>bdate)
                            ///alert(44444444444444)

                            if(data.checkinfos[n].room.roomId==data.rooms[i].roomId){
                                ////alert(3)
                                //alert(2222222222222)
                                //alert(data.checkinfos[n].strpreoutTime>data.date)
                                /*alert(data.checkinfos[n].strpreoutTime)
                                alert(data.date)
                                alert(data.checkinfos[n].strpreoutTime>data.date)*/
                                //alert(new Date(data.checkinfos[n].strpreoutTime))
                                //alert(bdate)
                                //alert(new Date(data.checkinfos[n].strpreoutTime)>bdate)
                                if(new Date(data.checkinfos[n].strpreoutTime)>bdate){
                                    statu="在住"
                                }
                                //alert(4)
                            }
                        })

                        //if (data.checkinfos[j].room.roomId == data.rooms[k].roomId) {
                        btRoomBodyText += "<td style=\"color:#0788BE\" ondblclick=\"btnDBclick(this,903)\" >"
                        btRoomBodyText += statu
                        btRoomBodyText += "</td>"

                        bdate.setDate(bdate.getDate()+1)

                        //} else {
                        /*    btRoomBodyText += "<td style=\"color:#0788BE\" ondblclick=\"btnDBclick(this,903)\" >"
                            btRoomBodyText += "空房"
                            btRoomBodyText += "</td>"

                        }*/
                        //})


                    }
                    btRoomBodyText += "</tr>"
                })
                $("#tbRoomBody").append(btRoomBodyText);
            },

            dataType: "JSON"


        })

        //alert(roomNoVal + " " + roomTypeVal)



        //查询按钮事件
        $("#btnQuery").click(function () {

            //alert("btnQuery().....")
            var roomNoVal = $("#roomNoOption").val();
            var roomTypeVal = $("#roomTypeOption").val()

            var sbeginTime = $.trim($("#StartDate").val());
            var sendTime = $.trim($("#EndDate").val());
            $.ajax({
                type: 'POST',
                url: "../../roomState",
                data: {
                    "roomTypeId": roomTypeVal,
                    "roomId": roomNoVal,
                    "sbeginTime": $.trim($("#StartDate").val()),
                    "sendTime": $.trim($("#EndDate").val())
                },
                success: function (data) {
                    //加载时间日期title
                    var tbTimeTitleText = "";
                    var tbRoomLeft = "";
                    var timeMonth = data.key[1].month + 1;
                    var timeDay = data.key[1].date;
                    //alert(data.key[0] + "date[0]" + timeMonth + " " + timeDay)
                    //加载左侧
                    $("#tbRoomLeft").empty()
                    $.each(data.rooms, function (i) {
                        // //alert(data.rooms[i].roomType.roomTypeName +"***************" +data.rooms[i].roomNo)
                        tbRoomLeft += "<tr>"
                        tbRoomLeft += "<td style=\"width: 100px;display: table-cell;background: #EEA12B;color: #FFF;font-weight: lighter;font-size: 12px;line-height: 20px;\">"
                        tbRoomLeft += "" + data.rooms[i].roomType.roomTypeName + "";
                        tbRoomLeft += " </td>"
                        tbRoomLeft += " <td class=\"tis\">" + data.rooms[i].roomNo + "</td>"
                        tbRoomLeft += " </tr>"

                    })
                    $("#tbRoomLeft").append(tbRoomLeft)


                    //判断时间
                    $("#tbTimeTitle").empty()
                    for (var i = 0; i <= data.key[0]; i++) {

                        if (timeMonth == 1) {
                            tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                            timeDay++;
                            if (timeDay == 32) {
                                timeMonth++;
                                timeDay = 1;
                            }

                        }
                        if (timeMonth == 2) {
                            tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                            timeDay++;
                            if (timeDay == 29) {
                                timeMonth++;
                                timeDay = 1;
                            }

                        }
                        if (timeMonth == 3) {
                            tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                            timeDay++;
                            if (timeDay == 32) {
                                timeMonth++;
                                timeDay = 1;
                            }

                        }
                        if (timeMonth == 4) {
                            tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                            timeDay++;
                            if (timeDay == 31) {
                                timeMonth++;
                                timeDay = 1;
                            }

                        }
                        if (timeMonth == 5) {
                            tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                            timeDay++;
                            if (timeDay == 32) {
                                timeMonth++;
                                timeDay = 1;
                            }

                        }
                        if (timeMonth == 6) {
                            tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                            timeDay++;
                            if (timeDay == 31) {
                                timeMonth++;
                                timeDay = 1;
                            }

                        }
                        if (timeMonth == 7) {
                            tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                            timeDay++;
                            if (timeDay == 32) {
                                timeMonth++;
                                timeDay = 1;
                            }

                        }
                        if (timeMonth == 8) {
                            tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                            timeDay++;

                            if (timeDay == 32) {
                                timeMonth++;
                                timeDay = 1;

                            }

                        }
                        if (timeMonth == 9) {
                            tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                            timeDay++;

                            if (timeDay == 31) {
                                timeMonth++;
                                timeDay = 1;
                            }
                        }
                        if (timeMonth == 10) {
                            tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                            timeDay++;
                            if (timeDay == 32) {
                                timeMonth++;
                                timeDay = 1;
                            }

                        }
                        if (timeMonth == 11) {
                            tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                            timeDay++;
                            if (timeDay == 31) {
                                timeMonth++;
                                timeDay = 1;
                            }

                        }
                        if (timeMonth == 12) {
                            tbTimeTitleText += "<th>" + timeMonth + "-" + timeDay + "</th>";
                            timeDay++;
                            if (timeDay == 32) {
                                timeMonth = 1;
                                timeDay = 1;

                            }
                        }

                    }
                    $("#tbTimeTitle").append(tbTimeTitleText);


                    //加载body
                    $("#tbRoomBody").empty()
                    var btRoomBodyText = "";
                    //alert("房间数" + data.key[0])
                    //alert("房间数" + data.key[0])
                    //alert(data.date+"00000000-----000000000000")

                    //alert(bdate)
                    $.each(data.rooms, function (i) {
                        var bdate = new Date(data.date)
                        btRoomBodyText += "<tr id = " + data.rooms[i].roomNo + ">";
//alert(1)
                        for (var k = 0; k < data.key[0] + 1; k++) {
    //alert(2)
                            ////alert(data.checkinfos)

                            var j = k
                            //$.each(data.checkinfos, function (j) {
                                ////alert("能循环啊")
                                ////alert(data.checkinfos[j].room.roomId)
                            var cs = []
                            var cinfo = {}
                            var statu = "空房"
                            $.each(data.checkinfos, function (n) {
                                ////alert(data.checkinfos[n].strpreoutTime)
                                ////alert(bdate)
                                ////alert(new Date(data.checkinfos[n].preoutTime)>bdate)
                                ///alert(44444444444444)

                                if(data.checkinfos[n].room.roomId==data.rooms[i].roomId){
                                    ////alert(3)
                                    //alert(2222222222222)
                                    //alert(data.checkinfos[n].strpreoutTime>data.date)
                                    /*alert(data.checkinfos[n].strpreoutTime)
                                    alert(data.date)
                                    alert(data.checkinfos[n].strpreoutTime>data.date)*/
                                    //alert(new Date(data.checkinfos[n].strpreoutTime))
                                    //alert(bdate)
                                    //alert(new Date(data.checkinfos[n].strpreoutTime)>bdate)
                                    if(new Date(data.checkinfos[n].strpreoutTime)>bdate){
                                        statu="在住"
                                    }
                                    //alert(4)
                                }
                            })

                                //if (data.checkinfos[j].room.roomId == data.rooms[k].roomId) {
                                    btRoomBodyText += "<td style=\"color:#0788BE\" ondblclick=\"btnDBclick(this,903)\" >"
                                    btRoomBodyText += statu
                                    btRoomBodyText += "</td>"

                            bdate.setDate(bdate.getDate()+1)

                                //} else {
                                /*    btRoomBodyText += "<td style=\"color:#0788BE\" ondblclick=\"btnDBclick(this,903)\" >"
                                    btRoomBodyText += "空房"
                                    btRoomBodyText += "</td>"

                                }*/
                            //})


                        }
                        btRoomBodyText += "</tr>"
                    })
                    $("#tbRoomBody").append(btRoomBodyText);
                },

                dataType: "JSON"


            })

            //alert(roomNoVal + " " + roomTypeVal)
        })


    })


    //二级联动
    $("#roomTypeOption").change(function () {
        //alert("-=-=-=-=-=-=-=-=-=-")
        $.ajax({
            type: 'POST',
            url: "../../twoUnit",
            data: {
                "roomTypeId": $("#roomTypeOption").val()
            },
            success: function (data) {
                //alert(data)
                //alert(data.rooms[0].roomNo)
                $("#roomNoOption").empty();
                var text = " <option value=\"\">请选择</option>";
                $.each(data.rooms, function (i) {

                    //alert(data.rooms[i] + "           -0")
                    text += "<option value=" + data.rooms[i].roomId + ">" + data.rooms[i].roomNo + "</option>";

                })
                $("#roomNoOption").append(text);
            },
            dataType: "JSON"
        })
    })


</script>

</body>
</html>