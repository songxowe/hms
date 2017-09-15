<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp"%>

    <link href="${pageContext.request.contextPath }/resources/soriqe/css/main(1).css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/soriqe/js/jquery-1.8.0.min.js"></script>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/soriqe/css/easyui.css">
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/soriqe/js/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/soriqe/js/jquery.timers-1.1.2.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/soriqe/js/Base.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/soriqe/js/jquery.cookie.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/soriqe/js/RoomState.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/soriqe/js/DefineBill.js"></script>
    <script src="${pageContext.request.contextPath }/resources/soriqe/js/PagePermission.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/soriqe/js/roomState-index.js"></script>

    <style type="text/css">
        html, body {
            -moz-user-select: none;
            -khtml-user-select: none;
            user-select: none;
        }

        .menu-item {
            font-size: 14px;
        }
    </style>
    <script type="text/javascript">
        document.oncontextmenu = function (e) {
            return false;
        }
    </script>
    <script language="javascript" type="text/javascript">
        $(document).ready(function () {
            $(".ftt_search .fr p").click(function () {
                $("#ftt_type").removeClass();
                $(".ftt_search .fr p span").css("display", "none");
                if ($(this).attr("class") == "big") {
                    $(".ftt_search .fr .big span").css("display", "block");
                    $("#ftt_type").addClass("ftt_big");
                    $.cookie('size_cookie', "ftt_big", {expires: 365});
                    $('.name').attr("style", "width:80px");
                }
                if ($(this).attr("class") == "small") {
                    $(".ftt_search .fr  .small span").css("display", "block");
                    $("#ftt_type").addClass("ftt_small");
                    $.cookie('size_cookie', "ftt_small", {expires: 365});
                    $('.name').attr("style", "");
                }
                else if ($(this).attr("class") == "middle") {
                    $(".ftt_search .fr .middle span").css("display", "block");
                    $("#ftt_type").addClass("ftt_middle");
                    $.cookie('size_cookie', "ftt_middle", {expires: 365});
                    $('.name').attr("style", "");
                }
            });
        });
    </script>
</head>


<body>
<div class="main" style="width: 98%; margin-left: 1%; margin-bottom: 0px">
    <form method="post" action="findAllRoom" name="f">
    <div class="ftt_search fontYaHei" id="divQuery">
        <label>楼层：</label>
        <select id="floorId" name="floorId" style="width: 80px">
            <option value="">全部</option>
            <c:forEach var="floor" items="${requestScope.floors}">
                <option value="${floor.floorId}">${floor.floorId}</option>
            </c:forEach>
        </select>
        <label>房型：</label>
        <select id="roomTypeId" name="roomTypeId" style="width: 100px">
            <option value="">全部</option>
            <c:forEach var="roomType" items="${requestScope.roomTypes}">
                <option value="${roomType.roomTypeId}">${roomType.roomTypeName}</option>
            </c:forEach>
        </select>
        <label>房态：</label><select id="roomStatus" name = "roomStatus" style="width: 80px">
        <option value="">全部</option>
        <option value="空房">空房</option>
        <option value="入住">入住</option>
        <option value="打扫">打扫</option>
        <option value="修理">修理</option>
        <option value="预留">预留</option>
    </select>
        <div id="FeaturesSelect">

        </div>

        <input type="submit" class="qtantj" style="margin-left: 10px;" value="查询">
        <input type="button" class="qtantj" style="margin-left: 10px;" value="未来房态图"id="futherRoomStatus">

        <div class="fr">
            <p class="big"><span id="big" style="display: none;">&nbsp;</span></p>
            <p class="middle"><span id="middle" style="display: none;">&nbsp;</span></p>
            <p class="small"><span id="small" style="display: block;">&nbsp;</span></p>
            <label style="padding-right: 5px">房态图：</label>
        </div>
    </div>
    </form>
    <div class="ftt_small" id="ftt_type">

        <div class="ftt_main fontYaHei " id="div_rooms" style="height: 461px;">

            <c:forEach var="floor" items="${requestScope.maps}">
                <c:if test="${fn:length(floor.rooms) >0}">
                    <div id="800" class="div_floor_room">

                        <c:forEach var="room" items="${floor.rooms}" varStatus="rows">
                           <c:if test="${room.roomStatus == '入住'}">
                               <div name="div_202" id="div_5405" class="divroom" style="display: block;">
                                   <div class="divs red" featuresval="" zt="1" clecanstatus="0">
                                       <input type="radio"id="selectRoomId" name="selectRoomId" value="${room.roomId}" style="margin-left: 95px">
                                       <input type="hidden" id="${room.roomId}" value="${room.roomStatus}">
                                       <div class="room">${room.roomNo}</div>
                                       <div class="type">${room.roomType.roomTypeName}</div>
                                       <div class="features"></div>
                                   </div>
                               </div>

                           </c:if>
                            <c:if test="${room.roomStatus == '空房'}">

                                <div name="div_202" id="div_5405" class="divroom" style="display: block;">
                                    <div class="divs blue" featuresval="" zt="0" clecanstatus="0">
                                        <input type="radio"id="selectRoomId" name="selectRoomId" value="${room.roomId}" style="margin-left: 95px">
                                        <input type="hidden" id="${room.roomId}" value="${room.roomStatus}">
                                        <div class="room">${room.roomNo}</div>
                                        <div class="type">${room.roomType.roomTypeName}</div>
                                        <div class="features"></div>
                                    </div>
                                </div>

                            </c:if>
                            <c:if test="${room.roomStatus == '打扫'}">
                                <div name="div_202" id="div_5405" class="divroom" style="display: block;">
                                    <div class="divs gray" featuresval="" zt="2" clecanstatus="0"   >
                                        <input type="radio"id="selectRoomId" name="selectRoomId" value="${room.roomId}" style="margin-left: 95px">
                                        <input type="hidden" id="${room.roomId}" value="${room.roomStatus}">
                                        <div class="room">${room.roomNo}</div>
                                        <div class="type">${room.roomType.roomTypeName}</div>
                                        <div class="features"></div>
                                    </div>
                                </div>
                            </c:if>
                            <c:if test="${room.roomStatus == '修理'}">
                                <div name="div_202" id="div_5405" class="divroom" style="display: block;">
                                    <div class="divs black" featuresval="" zt="3" clecanstatus="0"   >
                                        <div class="room">${room.roomNo}</div>
                                        <div class="type">${room.roomType.roomTypeName}</div>
                                        <div class="features"></div>
                                    </div>
                                </div>
                            </c:if>
                            <c:if test="${room.roomStatus == '预留'}">
                                <div name="div_202" id="div_5405" class="divroom" style="display: block;">
                                    <div class="divs purple" featuresval="" zt="4" clecanstatus="0"   >
                                        <div class="room">${room.roomNo}</div>
                                        <div class="type">${room.roomType.roomTypeName}</div>
                                        <div class="features"></div>
                                    </div>
                                </div>
                            </c:if>
                            

                        </c:forEach>

                            <%--${floor.floor.floorId}楼层id
                            ${fn:length(floor.rooms) >0}房间数是否大于0
                            ${fn:length(floor.rooms)}房间数的长度--%>
                    </div>
                </c:if>
            </c:forEach>
        </div>

        <div class="ftt_sks fontYaHei" id="divFoot">


            <div class="colors">
                <div class="colorpanel" style="display: none;" data-type="0" id="kf_0">
                    <table width="253" border="0" cellspacing="0" cellpadding="0"
                           style="border:1px #000000 solid;border-bottom:none;border-collapse: collapse;display:none"
                           bordercolor="000000">
                        <tbody>
                        <tr height="30px">
                            <td colspan="21" bgcolor="#cccccc">
                                <table cellpadding="0" cellspacing="1" border="0" style="border-collapse: collapse;">
                                    <tbody>
                                    <tr>
                                        <td width="3"></td>
                                        <td><input type="text" id="DisColor" size="6" disabled=""
                                                   style="border:solid 1px #000000;background-color:#ffff00"></td>
                                        <td width="3"></td>
                                        <td><input type="text" id="HexColor" size="7"
                                                   style="border:inset 1px;font-family:Arial;" value="#000000"></td>
                                        <td align="right" width="100%"><span class="spnClose"
                                                                             style="cursor:hand;">Ⅹ</span>&nbsp;
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table width="253" class="tblColor" border="1" cellspacing="0" cellpadding="0"
                           style="border-collapse: collapse; margin-top: 30px" bordercolor="000000">
                        <tbody>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#003300"></td>
                            <td style="width:11px;height:12px;background-color:#006600"></td>
                            <td style="width:11px;height:12px;background-color:#009900"></td>
                            <td style="width:11px;height:12px;background-color:#00CC00"></td>
                            <td style="width:11px;height:12px;background-color:#00FF00"></td>
                            <td style="width:11px;height:12px;background-color:#330000"></td>
                            <td style="width:11px;height:12px;background-color:#333300"></td>
                            <td style="width:11px;height:12px;background-color:#336600"></td>
                            <td style="width:11px;height:12px;background-color:#339900"></td>
                            <td style="width:11px;height:12px;background-color:#33CC00"></td>
                            <td style="width:11px;height:12px;background-color:#33FF00"></td>
                            <td style="width:11px;height:12px;background-color:#660000"></td>
                            <td style="width:11px;height:12px;background-color:#663300"></td>
                            <td style="width:11px;height:12px;background-color:#666600"></td>
                            <td style="width:11px;height:12px;background-color:#669900"></td>
                            <td style="width:11px;height:12px;background-color:#66CC00"></td>
                            <td style="width:11px;height:12px;background-color:#66FF00"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#333333"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000033"></td>
                            <td style="width:11px;height:12px;background-color:#003333"></td>
                            <td style="width:11px;height:12px;background-color:#006633"></td>
                            <td style="width:11px;height:12px;background-color:#009933"></td>
                            <td style="width:11px;height:12px;background-color:#00CC33"></td>
                            <td style="width:11px;height:12px;background-color:#00FF33"></td>
                            <td style="width:11px;height:12px;background-color:#330033"></td>
                            <td style="width:11px;height:12px;background-color:#333333"></td>
                            <td style="width:11px;height:12px;background-color:#336633"></td>
                            <td style="width:11px;height:12px;background-color:#339933"></td>
                            <td style="width:11px;height:12px;background-color:#33CC33"></td>
                            <td style="width:11px;height:12px;background-color:#33FF33"></td>
                            <td style="width:11px;height:12px;background-color:#660033"></td>
                            <td style="width:11px;height:12px;background-color:#663333"></td>
                            <td style="width:11px;height:12px;background-color:#666633"></td>
                            <td style="width:11px;height:12px;background-color:#669933"></td>
                            <td style="width:11px;height:12px;background-color:#66CC33"></td>
                            <td style="width:11px;height:12px;background-color:#66FF33"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#666666"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000066"></td>
                            <td style="width:11px;height:12px;background-color:#003366"></td>
                            <td style="width:11px;height:12px;background-color:#006666"></td>
                            <td style="width:11px;height:12px;background-color:#009966"></td>
                            <td style="width:11px;height:12px;background-color:#00CC66"></td>
                            <td style="width:11px;height:12px;background-color:#00FF66"></td>
                            <td style="width:11px;height:12px;background-color:#330066"></td>
                            <td style="width:11px;height:12px;background-color:#333366"></td>
                            <td style="width:11px;height:12px;background-color:#336666"></td>
                            <td style="width:11px;height:12px;background-color:#339966"></td>
                            <td style="width:11px;height:12px;background-color:#33CC66"></td>
                            <td style="width:11px;height:12px;background-color:#33FF66"></td>
                            <td style="width:11px;height:12px;background-color:#660066"></td>
                            <td style="width:11px;height:12px;background-color:#663366"></td>
                            <td style="width:11px;height:12px;background-color:#666666"></td>
                            <td style="width:11px;height:12px;background-color:#669966"></td>
                            <td style="width:11px;height:12px;background-color:#66CC66"></td>
                            <td style="width:11px;height:12px;background-color:#66FF66"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#999999"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000099"></td>
                            <td style="width:11px;height:12px;background-color:#003399"></td>
                            <td style="width:11px;height:12px;background-color:#006699"></td>
                            <td style="width:11px;height:12px;background-color:#009999"></td>
                            <td style="width:11px;height:12px;background-color:#00CC99"></td>
                            <td style="width:11px;height:12px;background-color:#00FF99"></td>
                            <td style="width:11px;height:12px;background-color:#330099"></td>
                            <td style="width:11px;height:12px;background-color:#333399"></td>
                            <td style="width:11px;height:12px;background-color:#336699"></td>
                            <td style="width:11px;height:12px;background-color:#339999"></td>
                            <td style="width:11px;height:12px;background-color:#33CC99"></td>
                            <td style="width:11px;height:12px;background-color:#33FF99"></td>
                            <td style="width:11px;height:12px;background-color:#660099"></td>
                            <td style="width:11px;height:12px;background-color:#663399"></td>
                            <td style="width:11px;height:12px;background-color:#666699"></td>
                            <td style="width:11px;height:12px;background-color:#669999"></td>
                            <td style="width:11px;height:12px;background-color:#66CC99"></td>
                            <td style="width:11px;height:12px;background-color:#66FF99"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000CC"></td>
                            <td style="width:11px;height:12px;background-color:#0033CC"></td>
                            <td style="width:11px;height:12px;background-color:#0066CC"></td>
                            <td style="width:11px;height:12px;background-color:#0099CC"></td>
                            <td style="width:11px;height:12px;background-color:#00CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#00FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#3300CC"></td>
                            <td style="width:11px;height:12px;background-color:#3333CC"></td>
                            <td style="width:11px;height:12px;background-color:#3366CC"></td>
                            <td style="width:11px;height:12px;background-color:#3399CC"></td>
                            <td style="width:11px;height:12px;background-color:#33CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#33FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#6600CC"></td>
                            <td style="width:11px;height:12px;background-color:#6633CC"></td>
                            <td style="width:11px;height:12px;background-color:#6666CC"></td>
                            <td style="width:11px;height:12px;background-color:#6699CC"></td>
                            <td style="width:11px;height:12px;background-color:#66CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#66FFCC"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFFF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000FF"></td>
                            <td style="width:11px;height:12px;background-color:#0033FF"></td>
                            <td style="width:11px;height:12px;background-color:#0066FF"></td>
                            <td style="width:11px;height:12px;background-color:#0099FF"></td>
                            <td style="width:11px;height:12px;background-color:#00CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#00FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#3300FF"></td>
                            <td style="width:11px;height:12px;background-color:#3333FF"></td>
                            <td style="width:11px;height:12px;background-color:#3366FF"></td>
                            <td style="width:11px;height:12px;background-color:#3399FF"></td>
                            <td style="width:11px;height:12px;background-color:#33CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#33FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#6600FF"></td>
                            <td style="width:11px;height:12px;background-color:#6633FF"></td>
                            <td style="width:11px;height:12px;background-color:#6666FF"></td>
                            <td style="width:11px;height:12px;background-color:#6699FF"></td>
                            <td style="width:11px;height:12px;background-color:#66CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#66FFFF"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FF0000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990000"></td>
                            <td style="width:11px;height:12px;background-color:#993300"></td>
                            <td style="width:11px;height:12px;background-color:#996600"></td>
                            <td style="width:11px;height:12px;background-color:#999900"></td>
                            <td style="width:11px;height:12px;background-color:#99CC00"></td>
                            <td style="width:11px;height:12px;background-color:#99FF00"></td>
                            <td style="width:11px;height:12px;background-color:#CC0000"></td>
                            <td style="width:11px;height:12px;background-color:#CC3300"></td>
                            <td style="width:11px;height:12px;background-color:#CC6600"></td>
                            <td style="width:11px;height:12px;background-color:#CC9900"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC00"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF00"></td>
                            <td style="width:11px;height:12px;background-color:#FF0000"></td>
                            <td style="width:11px;height:12px;background-color:#FF3300"></td>
                            <td style="width:11px;height:12px;background-color:#FF6600"></td>
                            <td style="width:11px;height:12px;background-color:#FF9900"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC00"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF00"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#00FF00"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990033"></td>
                            <td style="width:11px;height:12px;background-color:#993333"></td>
                            <td style="width:11px;height:12px;background-color:#996633"></td>
                            <td style="width:11px;height:12px;background-color:#999933"></td>
                            <td style="width:11px;height:12px;background-color:#99CC33"></td>
                            <td style="width:11px;height:12px;background-color:#99FF33"></td>
                            <td style="width:11px;height:12px;background-color:#CC0033"></td>
                            <td style="width:11px;height:12px;background-color:#CC3333"></td>
                            <td style="width:11px;height:12px;background-color:#CC6633"></td>
                            <td style="width:11px;height:12px;background-color:#CC9933"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC33"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF33"></td>
                            <td style="width:11px;height:12px;background-color:#FF0033"></td>
                            <td style="width:11px;height:12px;background-color:#FF3333"></td>
                            <td style="width:11px;height:12px;background-color:#FF6633"></td>
                            <td style="width:11px;height:12px;background-color:#FF9933"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC33"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF33"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000FF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990066"></td>
                            <td style="width:11px;height:12px;background-color:#993366"></td>
                            <td style="width:11px;height:12px;background-color:#996666"></td>
                            <td style="width:11px;height:12px;background-color:#999966"></td>
                            <td style="width:11px;height:12px;background-color:#99CC66"></td>
                            <td style="width:11px;height:12px;background-color:#99FF66"></td>
                            <td style="width:11px;height:12px;background-color:#CC0066"></td>
                            <td style="width:11px;height:12px;background-color:#CC3366"></td>
                            <td style="width:11px;height:12px;background-color:#CC6666"></td>
                            <td style="width:11px;height:12px;background-color:#CC9966"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC66"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF66"></td>
                            <td style="width:11px;height:12px;background-color:#FF0066"></td>
                            <td style="width:11px;height:12px;background-color:#FF3366"></td>
                            <td style="width:11px;height:12px;background-color:#FF6666"></td>
                            <td style="width:11px;height:12px;background-color:#FF9966"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC66"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF66"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF00"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990099"></td>
                            <td style="width:11px;height:12px;background-color:#993399"></td>
                            <td style="width:11px;height:12px;background-color:#996699"></td>
                            <td style="width:11px;height:12px;background-color:#999999"></td>
                            <td style="width:11px;height:12px;background-color:#99CC99"></td>
                            <td style="width:11px;height:12px;background-color:#99FF99"></td>
                            <td style="width:11px;height:12px;background-color:#CC0099"></td>
                            <td style="width:11px;height:12px;background-color:#CC3399"></td>
                            <td style="width:11px;height:12px;background-color:#CC6699"></td>
                            <td style="width:11px;height:12px;background-color:#CC9999"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC99"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF99"></td>
                            <td style="width:11px;height:12px;background-color:#FF0099"></td>
                            <td style="width:11px;height:12px;background-color:#FF3399"></td>
                            <td style="width:11px;height:12px;background-color:#FF6699"></td>
                            <td style="width:11px;height:12px;background-color:#FF9999"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC99"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF99"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#00FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#9900CC"></td>
                            <td style="width:11px;height:12px;background-color:#9933CC"></td>
                            <td style="width:11px;height:12px;background-color:#9966CC"></td>
                            <td style="width:11px;height:12px;background-color:#9999CC"></td>
                            <td style="width:11px;height:12px;background-color:#99CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#99FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#CC00CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC33CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC66CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC99CC"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#CCFFCC"></td>
                            <td style="width:11px;height:12px;background-color:#FF00CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF33CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF66CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF99CC"></td>
                            <td style="width:11px;height:12px;background-color:#FFCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFCC"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FF00FF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#9900FF"></td>
                            <td style="width:11px;height:12px;background-color:#9933FF"></td>
                            <td style="width:11px;height:12px;background-color:#9966FF"></td>
                            <td style="width:11px;height:12px;background-color:#9999FF"></td>
                            <td style="width:11px;height:12px;background-color:#99CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#99FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#CC00FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC33FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC66FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC99FF"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCFF"></td>
                            <td style="width:11px;height:12px;background-color:#CCFFFF"></td>
                            <td style="width:11px;height:12px;background-color:#FF00FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF33FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF66FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF99FF"></td>
                            <td style="width:11px;height:12px;background-color:#FFCCFF"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFFF"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <em class="blue" id="kf">空房</em><a href="javascript:void(0);" onclick="BtnStatus(this,&#39;0&#39;)" id="state1"><b>${requestScope.kongfang}</b> 间&nbsp;&nbsp;62.5%</a>
            </div>


            <div class="colors">
                <div class="colorpanel" style="display: none;" data-type="1" id="rz_0">
                    <table width="253" border="0" cellspacing="0" cellpadding="0"
                           style="border:1px #000000 solid;border-bottom:none;border-collapse: collapse;display:none"
                           bordercolor="000000">
                        <tbody>
                        <tr height="30px">
                            <td colspan="21" bgcolor="#cccccc">
                                <table cellpadding="0" cellspacing="1" border="0" style="border-collapse: collapse;">
                                    <tbody>
                                    <tr>
                                        <td width="3"></td>
                                        <td><input type="text" id="DisColor" size="6" disabled=""
                                                   style="border:solid 1px #000000;background-color:#ffff00"></td>
                                        <td width="3"></td>
                                        <td><input type="text" id="HexColor" size="7"
                                                   style="border:inset 1px;font-family:Arial;" value="#000000"></td>
                                        <td align="right" width="100%"><span class="spnClose"
                                                                             style="cursor:hand;">Ⅹ</span>&nbsp;
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table width="253" class="tblColor" border="1" cellspacing="0" cellpadding="0"
                           style="border-collapse: collapse; margin-top: 30px" bordercolor="000000">
                        <tbody>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#003300"></td>
                            <td style="width:11px;height:12px;background-color:#006600"></td>
                            <td style="width:11px;height:12px;background-color:#009900"></td>
                            <td style="width:11px;height:12px;background-color:#00CC00"></td>
                            <td style="width:11px;height:12px;background-color:#00FF00"></td>
                            <td style="width:11px;height:12px;background-color:#330000"></td>
                            <td style="width:11px;height:12px;background-color:#333300"></td>
                            <td style="width:11px;height:12px;background-color:#336600"></td>
                            <td style="width:11px;height:12px;background-color:#339900"></td>
                            <td style="width:11px;height:12px;background-color:#33CC00"></td>
                            <td style="width:11px;height:12px;background-color:#33FF00"></td>
                            <td style="width:11px;height:12px;background-color:#660000"></td>
                            <td style="width:11px;height:12px;background-color:#663300"></td>
                            <td style="width:11px;height:12px;background-color:#666600"></td>
                            <td style="width:11px;height:12px;background-color:#669900"></td>
                            <td style="width:11px;height:12px;background-color:#66CC00"></td>
                            <td style="width:11px;height:12px;background-color:#66FF00"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#333333"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000033"></td>
                            <td style="width:11px;height:12px;background-color:#003333"></td>
                            <td style="width:11px;height:12px;background-color:#006633"></td>
                            <td style="width:11px;height:12px;background-color:#009933"></td>
                            <td style="width:11px;height:12px;background-color:#00CC33"></td>
                            <td style="width:11px;height:12px;background-color:#00FF33"></td>
                            <td style="width:11px;height:12px;background-color:#330033"></td>
                            <td style="width:11px;height:12px;background-color:#333333"></td>
                            <td style="width:11px;height:12px;background-color:#336633"></td>
                            <td style="width:11px;height:12px;background-color:#339933"></td>
                            <td style="width:11px;height:12px;background-color:#33CC33"></td>
                            <td style="width:11px;height:12px;background-color:#33FF33"></td>
                            <td style="width:11px;height:12px;background-color:#660033"></td>
                            <td style="width:11px;height:12px;background-color:#663333"></td>
                            <td style="width:11px;height:12px;background-color:#666633"></td>
                            <td style="width:11px;height:12px;background-color:#669933"></td>
                            <td style="width:11px;height:12px;background-color:#66CC33"></td>
                            <td style="width:11px;height:12px;background-color:#66FF33"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#666666"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000066"></td>
                            <td style="width:11px;height:12px;background-color:#003366"></td>
                            <td style="width:11px;height:12px;background-color:#006666"></td>
                            <td style="width:11px;height:12px;background-color:#009966"></td>
                            <td style="width:11px;height:12px;background-color:#00CC66"></td>
                            <td style="width:11px;height:12px;background-color:#00FF66"></td>
                            <td style="width:11px;height:12px;background-color:#330066"></td>
                            <td style="width:11px;height:12px;background-color:#333366"></td>
                            <td style="width:11px;height:12px;background-color:#336666"></td>
                            <td style="width:11px;height:12px;background-color:#339966"></td>
                            <td style="width:11px;height:12px;background-color:#33CC66"></td>
                            <td style="width:11px;height:12px;background-color:#33FF66"></td>
                            <td style="width:11px;height:12px;background-color:#660066"></td>
                            <td style="width:11px;height:12px;background-color:#663366"></td>
                            <td style="width:11px;height:12px;background-color:#666666"></td>
                            <td style="width:11px;height:12px;background-color:#669966"></td>
                            <td style="width:11px;height:12px;background-color:#66CC66"></td>
                            <td style="width:11px;height:12px;background-color:#66FF66"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#999999"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000099"></td>
                            <td style="width:11px;height:12px;background-color:#003399"></td>
                            <td style="width:11px;height:12px;background-color:#006699"></td>
                            <td style="width:11px;height:12px;background-color:#009999"></td>
                            <td style="width:11px;height:12px;background-color:#00CC99"></td>
                            <td style="width:11px;height:12px;background-color:#00FF99"></td>
                            <td style="width:11px;height:12px;background-color:#330099"></td>
                            <td style="width:11px;height:12px;background-color:#333399"></td>
                            <td style="width:11px;height:12px;background-color:#336699"></td>
                            <td style="width:11px;height:12px;background-color:#339999"></td>
                            <td style="width:11px;height:12px;background-color:#33CC99"></td>
                            <td style="width:11px;height:12px;background-color:#33FF99"></td>
                            <td style="width:11px;height:12px;background-color:#660099"></td>
                            <td style="width:11px;height:12px;background-color:#663399"></td>
                            <td style="width:11px;height:12px;background-color:#666699"></td>
                            <td style="width:11px;height:12px;background-color:#669999"></td>
                            <td style="width:11px;height:12px;background-color:#66CC99"></td>
                            <td style="width:11px;height:12px;background-color:#66FF99"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000CC"></td>
                            <td style="width:11px;height:12px;background-color:#0033CC"></td>
                            <td style="width:11px;height:12px;background-color:#0066CC"></td>
                            <td style="width:11px;height:12px;background-color:#0099CC"></td>
                            <td style="width:11px;height:12px;background-color:#00CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#00FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#3300CC"></td>
                            <td style="width:11px;height:12px;background-color:#3333CC"></td>
                            <td style="width:11px;height:12px;background-color:#3366CC"></td>
                            <td style="width:11px;height:12px;background-color:#3399CC"></td>
                            <td style="width:11px;height:12px;background-color:#33CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#33FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#6600CC"></td>
                            <td style="width:11px;height:12px;background-color:#6633CC"></td>
                            <td style="width:11px;height:12px;background-color:#6666CC"></td>
                            <td style="width:11px;height:12px;background-color:#6699CC"></td>
                            <td style="width:11px;height:12px;background-color:#66CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#66FFCC"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFFF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000FF"></td>
                            <td style="width:11px;height:12px;background-color:#0033FF"></td>
                            <td style="width:11px;height:12px;background-color:#0066FF"></td>
                            <td style="width:11px;height:12px;background-color:#0099FF"></td>
                            <td style="width:11px;height:12px;background-color:#00CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#00FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#3300FF"></td>
                            <td style="width:11px;height:12px;background-color:#3333FF"></td>
                            <td style="width:11px;height:12px;background-color:#3366FF"></td>
                            <td style="width:11px;height:12px;background-color:#3399FF"></td>
                            <td style="width:11px;height:12px;background-color:#33CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#33FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#6600FF"></td>
                            <td style="width:11px;height:12px;background-color:#6633FF"></td>
                            <td style="width:11px;height:12px;background-color:#6666FF"></td>
                            <td style="width:11px;height:12px;background-color:#6699FF"></td>
                            <td style="width:11px;height:12px;background-color:#66CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#66FFFF"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FF0000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990000"></td>
                            <td style="width:11px;height:12px;background-color:#993300"></td>
                            <td style="width:11px;height:12px;background-color:#996600"></td>
                            <td style="width:11px;height:12px;background-color:#999900"></td>
                            <td style="width:11px;height:12px;background-color:#99CC00"></td>
                            <td style="width:11px;height:12px;background-color:#99FF00"></td>
                            <td style="width:11px;height:12px;background-color:#CC0000"></td>
                            <td style="width:11px;height:12px;background-color:#CC3300"></td>
                            <td style="width:11px;height:12px;background-color:#CC6600"></td>
                            <td style="width:11px;height:12px;background-color:#CC9900"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC00"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF00"></td>
                            <td style="width:11px;height:12px;background-color:#FF0000"></td>
                            <td style="width:11px;height:12px;background-color:#FF3300"></td>
                            <td style="width:11px;height:12px;background-color:#FF6600"></td>
                            <td style="width:11px;height:12px;background-color:#FF9900"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC00"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF00"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#00FF00"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990033"></td>
                            <td style="width:11px;height:12px;background-color:#993333"></td>
                            <td style="width:11px;height:12px;background-color:#996633"></td>
                            <td style="width:11px;height:12px;background-color:#999933"></td>
                            <td style="width:11px;height:12px;background-color:#99CC33"></td>
                            <td style="width:11px;height:12px;background-color:#99FF33"></td>
                            <td style="width:11px;height:12px;background-color:#CC0033"></td>
                            <td style="width:11px;height:12px;background-color:#CC3333"></td>
                            <td style="width:11px;height:12px;background-color:#CC6633"></td>
                            <td style="width:11px;height:12px;background-color:#CC9933"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC33"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF33"></td>
                            <td style="width:11px;height:12px;background-color:#FF0033"></td>
                            <td style="width:11px;height:12px;background-color:#FF3333"></td>
                            <td style="width:11px;height:12px;background-color:#FF6633"></td>
                            <td style="width:11px;height:12px;background-color:#FF9933"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC33"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF33"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000FF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990066"></td>
                            <td style="width:11px;height:12px;background-color:#993366"></td>
                            <td style="width:11px;height:12px;background-color:#996666"></td>
                            <td style="width:11px;height:12px;background-color:#999966"></td>
                            <td style="width:11px;height:12px;background-color:#99CC66"></td>
                            <td style="width:11px;height:12px;background-color:#99FF66"></td>
                            <td style="width:11px;height:12px;background-color:#CC0066"></td>
                            <td style="width:11px;height:12px;background-color:#CC3366"></td>
                            <td style="width:11px;height:12px;background-color:#CC6666"></td>
                            <td style="width:11px;height:12px;background-color:#CC9966"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC66"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF66"></td>
                            <td style="width:11px;height:12px;background-color:#FF0066"></td>
                            <td style="width:11px;height:12px;background-color:#FF3366"></td>
                            <td style="width:11px;height:12px;background-color:#FF6666"></td>
                            <td style="width:11px;height:12px;background-color:#FF9966"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC66"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF66"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF00"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990099"></td>
                            <td style="width:11px;height:12px;background-color:#993399"></td>
                            <td style="width:11px;height:12px;background-color:#996699"></td>
                            <td style="width:11px;height:12px;background-color:#999999"></td>
                            <td style="width:11px;height:12px;background-color:#99CC99"></td>
                            <td style="width:11px;height:12px;background-color:#99FF99"></td>
                            <td style="width:11px;height:12px;background-color:#CC0099"></td>
                            <td style="width:11px;height:12px;background-color:#CC3399"></td>
                            <td style="width:11px;height:12px;background-color:#CC6699"></td>
                            <td style="width:11px;height:12px;background-color:#CC9999"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC99"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF99"></td>
                            <td style="width:11px;height:12px;background-color:#FF0099"></td>
                            <td style="width:11px;height:12px;background-color:#FF3399"></td>
                            <td style="width:11px;height:12px;background-color:#FF6699"></td>
                            <td style="width:11px;height:12px;background-color:#FF9999"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC99"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF99"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#00FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#9900CC"></td>
                            <td style="width:11px;height:12px;background-color:#9933CC"></td>
                            <td style="width:11px;height:12px;background-color:#9966CC"></td>
                            <td style="width:11px;height:12px;background-color:#9999CC"></td>
                            <td style="width:11px;height:12px;background-color:#99CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#99FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#CC00CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC33CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC66CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC99CC"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#CCFFCC"></td>
                            <td style="width:11px;height:12px;background-color:#FF00CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF33CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF66CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF99CC"></td>
                            <td style="width:11px;height:12px;background-color:#FFCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFCC"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FF00FF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#9900FF"></td>
                            <td style="width:11px;height:12px;background-color:#9933FF"></td>
                            <td style="width:11px;height:12px;background-color:#9966FF"></td>
                            <td style="width:11px;height:12px;background-color:#9999FF"></td>
                            <td style="width:11px;height:12px;background-color:#99CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#99FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#CC00FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC33FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC66FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC99FF"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCFF"></td>
                            <td style="width:11px;height:12px;background-color:#CCFFFF"></td>
                            <td style="width:11px;height:12px;background-color:#FF00FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF33FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF66FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF99FF"></td>
                            <td style="width:11px;height:12px;background-color:#FFCCFF"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFFF"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <em class="red" id="rz">入住</em><a href="javascript:void(0);" onclick="BtnStatus(this,&#39;1&#39;)"
                                                  id="state2"><b>${requestScope.ruzhu}</b> 间&nbsp;&nbsp;25%</a>
            </div>


            <div class="colors">
                <div class="colorpanel" style="display: none;" data-type="2" id="ds_0">
                    <table width="253" border="0" cellspacing="0" cellpadding="0"
                           style="border:1px #000000 solid;border-bottom:none;border-collapse: collapse;display:none"
                           bordercolor="000000">
                        <tbody>
                        <tr height="30px">
                            <td colspan="21" bgcolor="#cccccc">
                                <table cellpadding="0" cellspacing="1" border="0" style="border-collapse: collapse;">
                                    <tbody>
                                    <tr>
                                        <td width="3"></td>
                                        <td><input type="text" id="DisColor" size="6" disabled=""
                                                   style="border:solid 1px #000000;background-color:#ffff00"></td>
                                        <td width="3"></td>
                                        <td><input type="text" id="HexColor" size="7"
                                                   style="border:inset 1px;font-family:Arial;" value="#000000"></td>
                                        <td align="right" width="100%"><span class="spnClose"
                                                                             style="cursor:hand;">Ⅹ</span>&nbsp;
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table width="253" class="tblColor" border="1" cellspacing="0" cellpadding="0"
                           style="border-collapse: collapse; margin-top: 30px" bordercolor="000000">
                        <tbody>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#003300"></td>
                            <td style="width:11px;height:12px;background-color:#006600"></td>
                            <td style="width:11px;height:12px;background-color:#009900"></td>
                            <td style="width:11px;height:12px;background-color:#00CC00"></td>
                            <td style="width:11px;height:12px;background-color:#00FF00"></td>
                            <td style="width:11px;height:12px;background-color:#330000"></td>
                            <td style="width:11px;height:12px;background-color:#333300"></td>
                            <td style="width:11px;height:12px;background-color:#336600"></td>
                            <td style="width:11px;height:12px;background-color:#339900"></td>
                            <td style="width:11px;height:12px;background-color:#33CC00"></td>
                            <td style="width:11px;height:12px;background-color:#33FF00"></td>
                            <td style="width:11px;height:12px;background-color:#660000"></td>
                            <td style="width:11px;height:12px;background-color:#663300"></td>
                            <td style="width:11px;height:12px;background-color:#666600"></td>
                            <td style="width:11px;height:12px;background-color:#669900"></td>
                            <td style="width:11px;height:12px;background-color:#66CC00"></td>
                            <td style="width:11px;height:12px;background-color:#66FF00"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#333333"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000033"></td>
                            <td style="width:11px;height:12px;background-color:#003333"></td>
                            <td style="width:11px;height:12px;background-color:#006633"></td>
                            <td style="width:11px;height:12px;background-color:#009933"></td>
                            <td style="width:11px;height:12px;background-color:#00CC33"></td>
                            <td style="width:11px;height:12px;background-color:#00FF33"></td>
                            <td style="width:11px;height:12px;background-color:#330033"></td>
                            <td style="width:11px;height:12px;background-color:#333333"></td>
                            <td style="width:11px;height:12px;background-color:#336633"></td>
                            <td style="width:11px;height:12px;background-color:#339933"></td>
                            <td style="width:11px;height:12px;background-color:#33CC33"></td>
                            <td style="width:11px;height:12px;background-color:#33FF33"></td>
                            <td style="width:11px;height:12px;background-color:#660033"></td>
                            <td style="width:11px;height:12px;background-color:#663333"></td>
                            <td style="width:11px;height:12px;background-color:#666633"></td>
                            <td style="width:11px;height:12px;background-color:#669933"></td>
                            <td style="width:11px;height:12px;background-color:#66CC33"></td>
                            <td style="width:11px;height:12px;background-color:#66FF33"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#666666"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000066"></td>
                            <td style="width:11px;height:12px;background-color:#003366"></td>
                            <td style="width:11px;height:12px;background-color:#006666"></td>
                            <td style="width:11px;height:12px;background-color:#009966"></td>
                            <td style="width:11px;height:12px;background-color:#00CC66"></td>
                            <td style="width:11px;height:12px;background-color:#00FF66"></td>
                            <td style="width:11px;height:12px;background-color:#330066"></td>
                            <td style="width:11px;height:12px;background-color:#333366"></td>
                            <td style="width:11px;height:12px;background-color:#336666"></td>
                            <td style="width:11px;height:12px;background-color:#339966"></td>
                            <td style="width:11px;height:12px;background-color:#33CC66"></td>
                            <td style="width:11px;height:12px;background-color:#33FF66"></td>
                            <td style="width:11px;height:12px;background-color:#660066"></td>
                            <td style="width:11px;height:12px;background-color:#663366"></td>
                            <td style="width:11px;height:12px;background-color:#666666"></td>
                            <td style="width:11px;height:12px;background-color:#669966"></td>
                            <td style="width:11px;height:12px;background-color:#66CC66"></td>
                            <td style="width:11px;height:12px;background-color:#66FF66"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#999999"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000099"></td>
                            <td style="width:11px;height:12px;background-color:#003399"></td>
                            <td style="width:11px;height:12px;background-color:#006699"></td>
                            <td style="width:11px;height:12px;background-color:#009999"></td>
                            <td style="width:11px;height:12px;background-color:#00CC99"></td>
                            <td style="width:11px;height:12px;background-color:#00FF99"></td>
                            <td style="width:11px;height:12px;background-color:#330099"></td>
                            <td style="width:11px;height:12px;background-color:#333399"></td>
                            <td style="width:11px;height:12px;background-color:#336699"></td>
                            <td style="width:11px;height:12px;background-color:#339999"></td>
                            <td style="width:11px;height:12px;background-color:#33CC99"></td>
                            <td style="width:11px;height:12px;background-color:#33FF99"></td>
                            <td style="width:11px;height:12px;background-color:#660099"></td>
                            <td style="width:11px;height:12px;background-color:#663399"></td>
                            <td style="width:11px;height:12px;background-color:#666699"></td>
                            <td style="width:11px;height:12px;background-color:#669999"></td>
                            <td style="width:11px;height:12px;background-color:#66CC99"></td>
                            <td style="width:11px;height:12px;background-color:#66FF99"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000CC"></td>
                            <td style="width:11px;height:12px;background-color:#0033CC"></td>
                            <td style="width:11px;height:12px;background-color:#0066CC"></td>
                            <td style="width:11px;height:12px;background-color:#0099CC"></td>
                            <td style="width:11px;height:12px;background-color:#00CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#00FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#3300CC"></td>
                            <td style="width:11px;height:12px;background-color:#3333CC"></td>
                            <td style="width:11px;height:12px;background-color:#3366CC"></td>
                            <td style="width:11px;height:12px;background-color:#3399CC"></td>
                            <td style="width:11px;height:12px;background-color:#33CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#33FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#6600CC"></td>
                            <td style="width:11px;height:12px;background-color:#6633CC"></td>
                            <td style="width:11px;height:12px;background-color:#6666CC"></td>
                            <td style="width:11px;height:12px;background-color:#6699CC"></td>
                            <td style="width:11px;height:12px;background-color:#66CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#66FFCC"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFFF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000FF"></td>
                            <td style="width:11px;height:12px;background-color:#0033FF"></td>
                            <td style="width:11px;height:12px;background-color:#0066FF"></td>
                            <td style="width:11px;height:12px;background-color:#0099FF"></td>
                            <td style="width:11px;height:12px;background-color:#00CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#00FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#3300FF"></td>
                            <td style="width:11px;height:12px;background-color:#3333FF"></td>
                            <td style="width:11px;height:12px;background-color:#3366FF"></td>
                            <td style="width:11px;height:12px;background-color:#3399FF"></td>
                            <td style="width:11px;height:12px;background-color:#33CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#33FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#6600FF"></td>
                            <td style="width:11px;height:12px;background-color:#6633FF"></td>
                            <td style="width:11px;height:12px;background-color:#6666FF"></td>
                            <td style="width:11px;height:12px;background-color:#6699FF"></td>
                            <td style="width:11px;height:12px;background-color:#66CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#66FFFF"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FF0000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990000"></td>
                            <td style="width:11px;height:12px;background-color:#993300"></td>
                            <td style="width:11px;height:12px;background-color:#996600"></td>
                            <td style="width:11px;height:12px;background-color:#999900"></td>
                            <td style="width:11px;height:12px;background-color:#99CC00"></td>
                            <td style="width:11px;height:12px;background-color:#99FF00"></td>
                            <td style="width:11px;height:12px;background-color:#CC0000"></td>
                            <td style="width:11px;height:12px;background-color:#CC3300"></td>
                            <td style="width:11px;height:12px;background-color:#CC6600"></td>
                            <td style="width:11px;height:12px;background-color:#CC9900"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC00"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF00"></td>
                            <td style="width:11px;height:12px;background-color:#FF0000"></td>
                            <td style="width:11px;height:12px;background-color:#FF3300"></td>
                            <td style="width:11px;height:12px;background-color:#FF6600"></td>
                            <td style="width:11px;height:12px;background-color:#FF9900"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC00"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF00"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#00FF00"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990033"></td>
                            <td style="width:11px;height:12px;background-color:#993333"></td>
                            <td style="width:11px;height:12px;background-color:#996633"></td>
                            <td style="width:11px;height:12px;background-color:#999933"></td>
                            <td style="width:11px;height:12px;background-color:#99CC33"></td>
                            <td style="width:11px;height:12px;background-color:#99FF33"></td>
                            <td style="width:11px;height:12px;background-color:#CC0033"></td>
                            <td style="width:11px;height:12px;background-color:#CC3333"></td>
                            <td style="width:11px;height:12px;background-color:#CC6633"></td>
                            <td style="width:11px;height:12px;background-color:#CC9933"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC33"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF33"></td>
                            <td style="width:11px;height:12px;background-color:#FF0033"></td>
                            <td style="width:11px;height:12px;background-color:#FF3333"></td>
                            <td style="width:11px;height:12px;background-color:#FF6633"></td>
                            <td style="width:11px;height:12px;background-color:#FF9933"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC33"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF33"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000FF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990066"></td>
                            <td style="width:11px;height:12px;background-color:#993366"></td>
                            <td style="width:11px;height:12px;background-color:#996666"></td>
                            <td style="width:11px;height:12px;background-color:#999966"></td>
                            <td style="width:11px;height:12px;background-color:#99CC66"></td>
                            <td style="width:11px;height:12px;background-color:#99FF66"></td>
                            <td style="width:11px;height:12px;background-color:#CC0066"></td>
                            <td style="width:11px;height:12px;background-color:#CC3366"></td>
                            <td style="width:11px;height:12px;background-color:#CC6666"></td>
                            <td style="width:11px;height:12px;background-color:#CC9966"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC66"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF66"></td>
                            <td style="width:11px;height:12px;background-color:#FF0066"></td>
                            <td style="width:11px;height:12px;background-color:#FF3366"></td>
                            <td style="width:11px;height:12px;background-color:#FF6666"></td>
                            <td style="width:11px;height:12px;background-color:#FF9966"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC66"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF66"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF00"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990099"></td>
                            <td style="width:11px;height:12px;background-color:#993399"></td>
                            <td style="width:11px;height:12px;background-color:#996699"></td>
                            <td style="width:11px;height:12px;background-color:#999999"></td>
                            <td style="width:11px;height:12px;background-color:#99CC99"></td>
                            <td style="width:11px;height:12px;background-color:#99FF99"></td>
                            <td style="width:11px;height:12px;background-color:#CC0099"></td>
                            <td style="width:11px;height:12px;background-color:#CC3399"></td>
                            <td style="width:11px;height:12px;background-color:#CC6699"></td>
                            <td style="width:11px;height:12px;background-color:#CC9999"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC99"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF99"></td>
                            <td style="width:11px;height:12px;background-color:#FF0099"></td>
                            <td style="width:11px;height:12px;background-color:#FF3399"></td>
                            <td style="width:11px;height:12px;background-color:#FF6699"></td>
                            <td style="width:11px;height:12px;background-color:#FF9999"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC99"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF99"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#00FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#9900CC"></td>
                            <td style="width:11px;height:12px;background-color:#9933CC"></td>
                            <td style="width:11px;height:12px;background-color:#9966CC"></td>
                            <td style="width:11px;height:12px;background-color:#9999CC"></td>
                            <td style="width:11px;height:12px;background-color:#99CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#99FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#CC00CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC33CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC66CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC99CC"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#CCFFCC"></td>
                            <td style="width:11px;height:12px;background-color:#FF00CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF33CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF66CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF99CC"></td>
                            <td style="width:11px;height:12px;background-color:#FFCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFCC"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FF00FF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#9900FF"></td>
                            <td style="width:11px;height:12px;background-color:#9933FF"></td>
                            <td style="width:11px;height:12px;background-color:#9966FF"></td>
                            <td style="width:11px;height:12px;background-color:#9999FF"></td>
                            <td style="width:11px;height:12px;background-color:#99CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#99FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#CC00FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC33FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC66FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC99FF"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCFF"></td>
                            <td style="width:11px;height:12px;background-color:#CCFFFF"></td>
                            <td style="width:11px;height:12px;background-color:#FF00FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF33FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF66FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF99FF"></td>
                            <td style="width:11px;height:12px;background-color:#FFCCFF"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFFF"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <em class="gray" id="ds">打扫</em><a href="javascript:void(0);" onclick="BtnStatus(this,&#39;2&#39;)"
                                                   id="state3"><b>${requestScope.dasao}</b> 间&nbsp;&nbsp;12.5%</a>
            </div>


            <div class="colors">
                <div class="colorpanel" style="display: none;" data-type="3" id="xl_0">
                    <table width="253" border="0" cellspacing="0" cellpadding="0"
                           style="border:1px #000000 solid;border-bottom:none;border-collapse: collapse;display:none"
                           bordercolor="000000">
                        <tbody>
                        <tr height="30px">
                            <td colspan="21" bgcolor="#cccccc">
                                <table cellpadding="0" cellspacing="1" border="0" style="border-collapse: collapse;">
                                    <tbody>
                                    <tr>
                                        <td width="3"></td>
                                        <td><input type="text" id="DisColor" size="6" disabled=""
                                                   style="border:solid 1px #000000;background-color:#ffff00"></td>
                                        <td width="3"></td>
                                        <td><input type="text" id="HexColor" size="7"
                                                   style="border:inset 1px;font-family:Arial;" value="#000000"></td>
                                        <td align="right" width="100%"><span class="spnClose"
                                                                             style="cursor:hand;">Ⅹ</span>&nbsp;
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table width="253" class="tblColor" border="1" cellspacing="0" cellpadding="0"
                           style="border-collapse: collapse; margin-top: 30px" bordercolor="000000">
                        <tbody>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#003300"></td>
                            <td style="width:11px;height:12px;background-color:#006600"></td>
                            <td style="width:11px;height:12px;background-color:#009900"></td>
                            <td style="width:11px;height:12px;background-color:#00CC00"></td>
                            <td style="width:11px;height:12px;background-color:#00FF00"></td>
                            <td style="width:11px;height:12px;background-color:#330000"></td>
                            <td style="width:11px;height:12px;background-color:#333300"></td>
                            <td style="width:11px;height:12px;background-color:#336600"></td>
                            <td style="width:11px;height:12px;background-color:#339900"></td>
                            <td style="width:11px;height:12px;background-color:#33CC00"></td>
                            <td style="width:11px;height:12px;background-color:#33FF00"></td>
                            <td style="width:11px;height:12px;background-color:#660000"></td>
                            <td style="width:11px;height:12px;background-color:#663300"></td>
                            <td style="width:11px;height:12px;background-color:#666600"></td>
                            <td style="width:11px;height:12px;background-color:#669900"></td>
                            <td style="width:11px;height:12px;background-color:#66CC00"></td>
                            <td style="width:11px;height:12px;background-color:#66FF00"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#333333"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000033"></td>
                            <td style="width:11px;height:12px;background-color:#003333"></td>
                            <td style="width:11px;height:12px;background-color:#006633"></td>
                            <td style="width:11px;height:12px;background-color:#009933"></td>
                            <td style="width:11px;height:12px;background-color:#00CC33"></td>
                            <td style="width:11px;height:12px;background-color:#00FF33"></td>
                            <td style="width:11px;height:12px;background-color:#330033"></td>
                            <td style="width:11px;height:12px;background-color:#333333"></td>
                            <td style="width:11px;height:12px;background-color:#336633"></td>
                            <td style="width:11px;height:12px;background-color:#339933"></td>
                            <td style="width:11px;height:12px;background-color:#33CC33"></td>
                            <td style="width:11px;height:12px;background-color:#33FF33"></td>
                            <td style="width:11px;height:12px;background-color:#660033"></td>
                            <td style="width:11px;height:12px;background-color:#663333"></td>
                            <td style="width:11px;height:12px;background-color:#666633"></td>
                            <td style="width:11px;height:12px;background-color:#669933"></td>
                            <td style="width:11px;height:12px;background-color:#66CC33"></td>
                            <td style="width:11px;height:12px;background-color:#66FF33"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#666666"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000066"></td>
                            <td style="width:11px;height:12px;background-color:#003366"></td>
                            <td style="width:11px;height:12px;background-color:#006666"></td>
                            <td style="width:11px;height:12px;background-color:#009966"></td>
                            <td style="width:11px;height:12px;background-color:#00CC66"></td>
                            <td style="width:11px;height:12px;background-color:#00FF66"></td>
                            <td style="width:11px;height:12px;background-color:#330066"></td>
                            <td style="width:11px;height:12px;background-color:#333366"></td>
                            <td style="width:11px;height:12px;background-color:#336666"></td>
                            <td style="width:11px;height:12px;background-color:#339966"></td>
                            <td style="width:11px;height:12px;background-color:#33CC66"></td>
                            <td style="width:11px;height:12px;background-color:#33FF66"></td>
                            <td style="width:11px;height:12px;background-color:#660066"></td>
                            <td style="width:11px;height:12px;background-color:#663366"></td>
                            <td style="width:11px;height:12px;background-color:#666666"></td>
                            <td style="width:11px;height:12px;background-color:#669966"></td>
                            <td style="width:11px;height:12px;background-color:#66CC66"></td>
                            <td style="width:11px;height:12px;background-color:#66FF66"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#999999"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000099"></td>
                            <td style="width:11px;height:12px;background-color:#003399"></td>
                            <td style="width:11px;height:12px;background-color:#006699"></td>
                            <td style="width:11px;height:12px;background-color:#009999"></td>
                            <td style="width:11px;height:12px;background-color:#00CC99"></td>
                            <td style="width:11px;height:12px;background-color:#00FF99"></td>
                            <td style="width:11px;height:12px;background-color:#330099"></td>
                            <td style="width:11px;height:12px;background-color:#333399"></td>
                            <td style="width:11px;height:12px;background-color:#336699"></td>
                            <td style="width:11px;height:12px;background-color:#339999"></td>
                            <td style="width:11px;height:12px;background-color:#33CC99"></td>
                            <td style="width:11px;height:12px;background-color:#33FF99"></td>
                            <td style="width:11px;height:12px;background-color:#660099"></td>
                            <td style="width:11px;height:12px;background-color:#663399"></td>
                            <td style="width:11px;height:12px;background-color:#666699"></td>
                            <td style="width:11px;height:12px;background-color:#669999"></td>
                            <td style="width:11px;height:12px;background-color:#66CC99"></td>
                            <td style="width:11px;height:12px;background-color:#66FF99"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000CC"></td>
                            <td style="width:11px;height:12px;background-color:#0033CC"></td>
                            <td style="width:11px;height:12px;background-color:#0066CC"></td>
                            <td style="width:11px;height:12px;background-color:#0099CC"></td>
                            <td style="width:11px;height:12px;background-color:#00CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#00FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#3300CC"></td>
                            <td style="width:11px;height:12px;background-color:#3333CC"></td>
                            <td style="width:11px;height:12px;background-color:#3366CC"></td>
                            <td style="width:11px;height:12px;background-color:#3399CC"></td>
                            <td style="width:11px;height:12px;background-color:#33CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#33FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#6600CC"></td>
                            <td style="width:11px;height:12px;background-color:#6633CC"></td>
                            <td style="width:11px;height:12px;background-color:#6666CC"></td>
                            <td style="width:11px;height:12px;background-color:#6699CC"></td>
                            <td style="width:11px;height:12px;background-color:#66CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#66FFCC"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFFF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000FF"></td>
                            <td style="width:11px;height:12px;background-color:#0033FF"></td>
                            <td style="width:11px;height:12px;background-color:#0066FF"></td>
                            <td style="width:11px;height:12px;background-color:#0099FF"></td>
                            <td style="width:11px;height:12px;background-color:#00CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#00FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#3300FF"></td>
                            <td style="width:11px;height:12px;background-color:#3333FF"></td>
                            <td style="width:11px;height:12px;background-color:#3366FF"></td>
                            <td style="width:11px;height:12px;background-color:#3399FF"></td>
                            <td style="width:11px;height:12px;background-color:#33CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#33FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#6600FF"></td>
                            <td style="width:11px;height:12px;background-color:#6633FF"></td>
                            <td style="width:11px;height:12px;background-color:#6666FF"></td>
                            <td style="width:11px;height:12px;background-color:#6699FF"></td>
                            <td style="width:11px;height:12px;background-color:#66CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#66FFFF"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FF0000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990000"></td>
                            <td style="width:11px;height:12px;background-color:#993300"></td>
                            <td style="width:11px;height:12px;background-color:#996600"></td>
                            <td style="width:11px;height:12px;background-color:#999900"></td>
                            <td style="width:11px;height:12px;background-color:#99CC00"></td>
                            <td style="width:11px;height:12px;background-color:#99FF00"></td>
                            <td style="width:11px;height:12px;background-color:#CC0000"></td>
                            <td style="width:11px;height:12px;background-color:#CC3300"></td>
                            <td style="width:11px;height:12px;background-color:#CC6600"></td>
                            <td style="width:11px;height:12px;background-color:#CC9900"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC00"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF00"></td>
                            <td style="width:11px;height:12px;background-color:#FF0000"></td>
                            <td style="width:11px;height:12px;background-color:#FF3300"></td>
                            <td style="width:11px;height:12px;background-color:#FF6600"></td>
                            <td style="width:11px;height:12px;background-color:#FF9900"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC00"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF00"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#00FF00"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990033"></td>
                            <td style="width:11px;height:12px;background-color:#993333"></td>
                            <td style="width:11px;height:12px;background-color:#996633"></td>
                            <td style="width:11px;height:12px;background-color:#999933"></td>
                            <td style="width:11px;height:12px;background-color:#99CC33"></td>
                            <td style="width:11px;height:12px;background-color:#99FF33"></td>
                            <td style="width:11px;height:12px;background-color:#CC0033"></td>
                            <td style="width:11px;height:12px;background-color:#CC3333"></td>
                            <td style="width:11px;height:12px;background-color:#CC6633"></td>
                            <td style="width:11px;height:12px;background-color:#CC9933"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC33"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF33"></td>
                            <td style="width:11px;height:12px;background-color:#FF0033"></td>
                            <td style="width:11px;height:12px;background-color:#FF3333"></td>
                            <td style="width:11px;height:12px;background-color:#FF6633"></td>
                            <td style="width:11px;height:12px;background-color:#FF9933"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC33"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF33"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000FF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990066"></td>
                            <td style="width:11px;height:12px;background-color:#993366"></td>
                            <td style="width:11px;height:12px;background-color:#996666"></td>
                            <td style="width:11px;height:12px;background-color:#999966"></td>
                            <td style="width:11px;height:12px;background-color:#99CC66"></td>
                            <td style="width:11px;height:12px;background-color:#99FF66"></td>
                            <td style="width:11px;height:12px;background-color:#CC0066"></td>
                            <td style="width:11px;height:12px;background-color:#CC3366"></td>
                            <td style="width:11px;height:12px;background-color:#CC6666"></td>
                            <td style="width:11px;height:12px;background-color:#CC9966"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC66"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF66"></td>
                            <td style="width:11px;height:12px;background-color:#FF0066"></td>
                            <td style="width:11px;height:12px;background-color:#FF3366"></td>
                            <td style="width:11px;height:12px;background-color:#FF6666"></td>
                            <td style="width:11px;height:12px;background-color:#FF9966"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC66"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF66"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF00"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990099"></td>
                            <td style="width:11px;height:12px;background-color:#993399"></td>
                            <td style="width:11px;height:12px;background-color:#996699"></td>
                            <td style="width:11px;height:12px;background-color:#999999"></td>
                            <td style="width:11px;height:12px;background-color:#99CC99"></td>
                            <td style="width:11px;height:12px;background-color:#99FF99"></td>
                            <td style="width:11px;height:12px;background-color:#CC0099"></td>
                            <td style="width:11px;height:12px;background-color:#CC3399"></td>
                            <td style="width:11px;height:12px;background-color:#CC6699"></td>
                            <td style="width:11px;height:12px;background-color:#CC9999"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC99"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF99"></td>
                            <td style="width:11px;height:12px;background-color:#FF0099"></td>
                            <td style="width:11px;height:12px;background-color:#FF3399"></td>
                            <td style="width:11px;height:12px;background-color:#FF6699"></td>
                            <td style="width:11px;height:12px;background-color:#FF9999"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC99"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF99"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#00FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#9900CC"></td>
                            <td style="width:11px;height:12px;background-color:#9933CC"></td>
                            <td style="width:11px;height:12px;background-color:#9966CC"></td>
                            <td style="width:11px;height:12px;background-color:#9999CC"></td>
                            <td style="width:11px;height:12px;background-color:#99CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#99FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#CC00CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC33CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC66CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC99CC"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#CCFFCC"></td>
                            <td style="width:11px;height:12px;background-color:#FF00CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF33CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF66CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF99CC"></td>
                            <td style="width:11px;height:12px;background-color:#FFCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFCC"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FF00FF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#9900FF"></td>
                            <td style="width:11px;height:12px;background-color:#9933FF"></td>
                            <td style="width:11px;height:12px;background-color:#9966FF"></td>
                            <td style="width:11px;height:12px;background-color:#9999FF"></td>
                            <td style="width:11px;height:12px;background-color:#99CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#99FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#CC00FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC33FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC66FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC99FF"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCFF"></td>
                            <td style="width:11px;height:12px;background-color:#CCFFFF"></td>
                            <td style="width:11px;height:12px;background-color:#FF00FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF33FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF66FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF99FF"></td>
                            <td style="width:11px;height:12px;background-color:#FFCCFF"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFFF"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <em class="black" id="xl">修理</em><a href="javascript:void(0);" onclick="BtnStatus(this,&#39;3&#39;)"
                                                    id="state4"><b>${requestScope.xiuli}</b> 间&nbsp;&nbsp;0%</a>
            </div>


            <div class="colors">
                <div class="colorpanel" style="display: none;" data-type="4" id="yl_0">
                    <table width="253" border="0" cellspacing="0" cellpadding="0"
                           style="border:1px #000000 solid;border-bottom:none;border-collapse: collapse;display:none"
                           bordercolor="000000">
                        <tbody>
                        <tr height="30px">
                            <td colspan="21" bgcolor="#cccccc">
                                <table cellpadding="0" cellspacing="1" border="0" style="border-collapse: collapse;">
                                    <tbody>
                                    <tr>
                                        <td width="3"></td>
                                        <td><input type="text" id="DisColor" size="6" disabled=""
                                                   style="border:solid 1px #000000;background-color:#ffff00"></td>
                                        <td width="3"></td>
                                        <td><input type="text" id="HexColor" size="7"
                                                   style="border:inset 1px;font-family:Arial;" value="#000000"></td>
                                        <td align="right" width="100%"><span class="spnClose"
                                                                             style="cursor:hand;">Ⅹ</span>&nbsp;
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table width="253" class="tblColor" border="1" cellspacing="0" cellpadding="0"
                           style="border-collapse: collapse; margin-top: 30px" bordercolor="000000">
                        <tbody>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#003300"></td>
                            <td style="width:11px;height:12px;background-color:#006600"></td>
                            <td style="width:11px;height:12px;background-color:#009900"></td>
                            <td style="width:11px;height:12px;background-color:#00CC00"></td>
                            <td style="width:11px;height:12px;background-color:#00FF00"></td>
                            <td style="width:11px;height:12px;background-color:#330000"></td>
                            <td style="width:11px;height:12px;background-color:#333300"></td>
                            <td style="width:11px;height:12px;background-color:#336600"></td>
                            <td style="width:11px;height:12px;background-color:#339900"></td>
                            <td style="width:11px;height:12px;background-color:#33CC00"></td>
                            <td style="width:11px;height:12px;background-color:#33FF00"></td>
                            <td style="width:11px;height:12px;background-color:#660000"></td>
                            <td style="width:11px;height:12px;background-color:#663300"></td>
                            <td style="width:11px;height:12px;background-color:#666600"></td>
                            <td style="width:11px;height:12px;background-color:#669900"></td>
                            <td style="width:11px;height:12px;background-color:#66CC00"></td>
                            <td style="width:11px;height:12px;background-color:#66FF00"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#333333"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000033"></td>
                            <td style="width:11px;height:12px;background-color:#003333"></td>
                            <td style="width:11px;height:12px;background-color:#006633"></td>
                            <td style="width:11px;height:12px;background-color:#009933"></td>
                            <td style="width:11px;height:12px;background-color:#00CC33"></td>
                            <td style="width:11px;height:12px;background-color:#00FF33"></td>
                            <td style="width:11px;height:12px;background-color:#330033"></td>
                            <td style="width:11px;height:12px;background-color:#333333"></td>
                            <td style="width:11px;height:12px;background-color:#336633"></td>
                            <td style="width:11px;height:12px;background-color:#339933"></td>
                            <td style="width:11px;height:12px;background-color:#33CC33"></td>
                            <td style="width:11px;height:12px;background-color:#33FF33"></td>
                            <td style="width:11px;height:12px;background-color:#660033"></td>
                            <td style="width:11px;height:12px;background-color:#663333"></td>
                            <td style="width:11px;height:12px;background-color:#666633"></td>
                            <td style="width:11px;height:12px;background-color:#669933"></td>
                            <td style="width:11px;height:12px;background-color:#66CC33"></td>
                            <td style="width:11px;height:12px;background-color:#66FF33"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#666666"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000066"></td>
                            <td style="width:11px;height:12px;background-color:#003366"></td>
                            <td style="width:11px;height:12px;background-color:#006666"></td>
                            <td style="width:11px;height:12px;background-color:#009966"></td>
                            <td style="width:11px;height:12px;background-color:#00CC66"></td>
                            <td style="width:11px;height:12px;background-color:#00FF66"></td>
                            <td style="width:11px;height:12px;background-color:#330066"></td>
                            <td style="width:11px;height:12px;background-color:#333366"></td>
                            <td style="width:11px;height:12px;background-color:#336666"></td>
                            <td style="width:11px;height:12px;background-color:#339966"></td>
                            <td style="width:11px;height:12px;background-color:#33CC66"></td>
                            <td style="width:11px;height:12px;background-color:#33FF66"></td>
                            <td style="width:11px;height:12px;background-color:#660066"></td>
                            <td style="width:11px;height:12px;background-color:#663366"></td>
                            <td style="width:11px;height:12px;background-color:#666666"></td>
                            <td style="width:11px;height:12px;background-color:#669966"></td>
                            <td style="width:11px;height:12px;background-color:#66CC66"></td>
                            <td style="width:11px;height:12px;background-color:#66FF66"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#999999"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#000099"></td>
                            <td style="width:11px;height:12px;background-color:#003399"></td>
                            <td style="width:11px;height:12px;background-color:#006699"></td>
                            <td style="width:11px;height:12px;background-color:#009999"></td>
                            <td style="width:11px;height:12px;background-color:#00CC99"></td>
                            <td style="width:11px;height:12px;background-color:#00FF99"></td>
                            <td style="width:11px;height:12px;background-color:#330099"></td>
                            <td style="width:11px;height:12px;background-color:#333399"></td>
                            <td style="width:11px;height:12px;background-color:#336699"></td>
                            <td style="width:11px;height:12px;background-color:#339999"></td>
                            <td style="width:11px;height:12px;background-color:#33CC99"></td>
                            <td style="width:11px;height:12px;background-color:#33FF99"></td>
                            <td style="width:11px;height:12px;background-color:#660099"></td>
                            <td style="width:11px;height:12px;background-color:#663399"></td>
                            <td style="width:11px;height:12px;background-color:#666699"></td>
                            <td style="width:11px;height:12px;background-color:#669999"></td>
                            <td style="width:11px;height:12px;background-color:#66CC99"></td>
                            <td style="width:11px;height:12px;background-color:#66FF99"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000CC"></td>
                            <td style="width:11px;height:12px;background-color:#0033CC"></td>
                            <td style="width:11px;height:12px;background-color:#0066CC"></td>
                            <td style="width:11px;height:12px;background-color:#0099CC"></td>
                            <td style="width:11px;height:12px;background-color:#00CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#00FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#3300CC"></td>
                            <td style="width:11px;height:12px;background-color:#3333CC"></td>
                            <td style="width:11px;height:12px;background-color:#3366CC"></td>
                            <td style="width:11px;height:12px;background-color:#3399CC"></td>
                            <td style="width:11px;height:12px;background-color:#33CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#33FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#6600CC"></td>
                            <td style="width:11px;height:12px;background-color:#6633CC"></td>
                            <td style="width:11px;height:12px;background-color:#6666CC"></td>
                            <td style="width:11px;height:12px;background-color:#6699CC"></td>
                            <td style="width:11px;height:12px;background-color:#66CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#66FFCC"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFFF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000FF"></td>
                            <td style="width:11px;height:12px;background-color:#0033FF"></td>
                            <td style="width:11px;height:12px;background-color:#0066FF"></td>
                            <td style="width:11px;height:12px;background-color:#0099FF"></td>
                            <td style="width:11px;height:12px;background-color:#00CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#00FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#3300FF"></td>
                            <td style="width:11px;height:12px;background-color:#3333FF"></td>
                            <td style="width:11px;height:12px;background-color:#3366FF"></td>
                            <td style="width:11px;height:12px;background-color:#3399FF"></td>
                            <td style="width:11px;height:12px;background-color:#33CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#33FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#6600FF"></td>
                            <td style="width:11px;height:12px;background-color:#6633FF"></td>
                            <td style="width:11px;height:12px;background-color:#6666FF"></td>
                            <td style="width:11px;height:12px;background-color:#6699FF"></td>
                            <td style="width:11px;height:12px;background-color:#66CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#66FFFF"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FF0000"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990000"></td>
                            <td style="width:11px;height:12px;background-color:#993300"></td>
                            <td style="width:11px;height:12px;background-color:#996600"></td>
                            <td style="width:11px;height:12px;background-color:#999900"></td>
                            <td style="width:11px;height:12px;background-color:#99CC00"></td>
                            <td style="width:11px;height:12px;background-color:#99FF00"></td>
                            <td style="width:11px;height:12px;background-color:#CC0000"></td>
                            <td style="width:11px;height:12px;background-color:#CC3300"></td>
                            <td style="width:11px;height:12px;background-color:#CC6600"></td>
                            <td style="width:11px;height:12px;background-color:#CC9900"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC00"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF00"></td>
                            <td style="width:11px;height:12px;background-color:#FF0000"></td>
                            <td style="width:11px;height:12px;background-color:#FF3300"></td>
                            <td style="width:11px;height:12px;background-color:#FF6600"></td>
                            <td style="width:11px;height:12px;background-color:#FF9900"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC00"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF00"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#00FF00"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990033"></td>
                            <td style="width:11px;height:12px;background-color:#993333"></td>
                            <td style="width:11px;height:12px;background-color:#996633"></td>
                            <td style="width:11px;height:12px;background-color:#999933"></td>
                            <td style="width:11px;height:12px;background-color:#99CC33"></td>
                            <td style="width:11px;height:12px;background-color:#99FF33"></td>
                            <td style="width:11px;height:12px;background-color:#CC0033"></td>
                            <td style="width:11px;height:12px;background-color:#CC3333"></td>
                            <td style="width:11px;height:12px;background-color:#CC6633"></td>
                            <td style="width:11px;height:12px;background-color:#CC9933"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC33"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF33"></td>
                            <td style="width:11px;height:12px;background-color:#FF0033"></td>
                            <td style="width:11px;height:12px;background-color:#FF3333"></td>
                            <td style="width:11px;height:12px;background-color:#FF6633"></td>
                            <td style="width:11px;height:12px;background-color:#FF9933"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC33"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF33"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#0000FF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990066"></td>
                            <td style="width:11px;height:12px;background-color:#993366"></td>
                            <td style="width:11px;height:12px;background-color:#996666"></td>
                            <td style="width:11px;height:12px;background-color:#999966"></td>
                            <td style="width:11px;height:12px;background-color:#99CC66"></td>
                            <td style="width:11px;height:12px;background-color:#99FF66"></td>
                            <td style="width:11px;height:12px;background-color:#CC0066"></td>
                            <td style="width:11px;height:12px;background-color:#CC3366"></td>
                            <td style="width:11px;height:12px;background-color:#CC6666"></td>
                            <td style="width:11px;height:12px;background-color:#CC9966"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC66"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF66"></td>
                            <td style="width:11px;height:12px;background-color:#FF0066"></td>
                            <td style="width:11px;height:12px;background-color:#FF3366"></td>
                            <td style="width:11px;height:12px;background-color:#FF6666"></td>
                            <td style="width:11px;height:12px;background-color:#FF9966"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC66"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF66"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF00"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#990099"></td>
                            <td style="width:11px;height:12px;background-color:#993399"></td>
                            <td style="width:11px;height:12px;background-color:#996699"></td>
                            <td style="width:11px;height:12px;background-color:#999999"></td>
                            <td style="width:11px;height:12px;background-color:#99CC99"></td>
                            <td style="width:11px;height:12px;background-color:#99FF99"></td>
                            <td style="width:11px;height:12px;background-color:#CC0099"></td>
                            <td style="width:11px;height:12px;background-color:#CC3399"></td>
                            <td style="width:11px;height:12px;background-color:#CC6699"></td>
                            <td style="width:11px;height:12px;background-color:#CC9999"></td>
                            <td style="width:11px;height:12px;background-color:#CCCC99"></td>
                            <td style="width:11px;height:12px;background-color:#CCFF99"></td>
                            <td style="width:11px;height:12px;background-color:#FF0099"></td>
                            <td style="width:11px;height:12px;background-color:#FF3399"></td>
                            <td style="width:11px;height:12px;background-color:#FF6699"></td>
                            <td style="width:11px;height:12px;background-color:#FF9999"></td>
                            <td style="width:11px;height:12px;background-color:#FFCC99"></td>
                            <td style="width:11px;height:12px;background-color:#FFFF99"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#00FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#9900CC"></td>
                            <td style="width:11px;height:12px;background-color:#9933CC"></td>
                            <td style="width:11px;height:12px;background-color:#9966CC"></td>
                            <td style="width:11px;height:12px;background-color:#9999CC"></td>
                            <td style="width:11px;height:12px;background-color:#99CCCC"></td>
                            <td style="width:11px;height:12px;background-color:#99FFCC"></td>
                            <td style="width:11px;height:12px;background-color:#CC00CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC33CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC66CC"></td>
                            <td style="width:11px;height:12px;background-color:#CC99CC"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#CCFFCC"></td>
                            <td style="width:11px;height:12px;background-color:#FF00CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF33CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF66CC"></td>
                            <td style="width:11px;height:12px;background-color:#FF99CC"></td>
                            <td style="width:11px;height:12px;background-color:#FFCCCC"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFCC"></td>
                        </tr>
                        <tr style="height:12px;">
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#FF00FF"></td>
                            <td style="width:11px;height:12px;background-color:#000000"></td>
                            <td style="width:11px;height:12px;background-color:#9900FF"></td>
                            <td style="width:11px;height:12px;background-color:#9933FF"></td>
                            <td style="width:11px;height:12px;background-color:#9966FF"></td>
                            <td style="width:11px;height:12px;background-color:#9999FF"></td>
                            <td style="width:11px;height:12px;background-color:#99CCFF"></td>
                            <td style="width:11px;height:12px;background-color:#99FFFF"></td>
                            <td style="width:11px;height:12px;background-color:#CC00FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC33FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC66FF"></td>
                            <td style="width:11px;height:12px;background-color:#CC99FF"></td>
                            <td style="width:11px;height:12px;background-color:#CCCCFF"></td>
                            <td style="width:11px;height:12px;background-color:#CCFFFF"></td>
                            <td style="width:11px;height:12px;background-color:#FF00FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF33FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF66FF"></td>
                            <td style="width:11px;height:12px;background-color:#FF99FF"></td>
                            <td style="width:11px;height:12px;background-color:#FFCCFF"></td>
                            <td style="width:11px;height:12px;background-color:#FFFFFF"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <em class="purple" id="yl">预留</em><a href="javascript:void(0);" onclick="BtnStatus(this,&#39;4&#39;)"id="state5">
                <b>${requestScope.yuliu}</b> 间&nbsp;&nbsp;0%</a>
            </div>


            <div class="colors">
                <em id="restore" style="color: black">颜色还原</em>
            </div>


        </div>
        <div class="ftt_type">
            <span><a href="#" id="updateRoomState"><em class="me"></em>查看/更改房间状态</a></span>
            <span><a href="#" id="yuding"><em class="cleans"></em>预订</a></span>
            <span><a href="#" id="jiezhang"><em class="contact"></em>结账退房</a></span>
            <span><a href="#" id="xuzhu"><em class="leave"></em>续住</a></span>
            <span><a href="#" id="guoupkaifang"><em class="vip"></em>团队开房</a></span>
            <span><a href="#" id="kaifang"><em class="clock"></em>开房</a></span>
        </div>
    </div>
    </div>

</div>
<div id = "win"></div>
<script>

    $(function () {
        //预订
        $("#yuding").click(function showwind() {
            var index = layer.open({
                type: 2,
                title:"消息---通知",
                content: 'page/Book/BookAdd.jsp',
                area: ['100%', '100%'],
                maxmin: true,
                cancel:function () {
                    window.location.href = "../../findAllRoom";
                }


            })

        }),
        //续住
        $("#xuzhu").click(function showwind() {

            var selectRoomId=$('input:radio[name="selectRoomId"]:checked').val();
            var selectRoomStatus=$("#"+selectRoomId+"").val();

            if(selectRoomId == null && selectRoomStatus==null){
                $.messager.alert('消息','请选择房间进行操作！！！','info');
                return;
            }
            if(selectRoomStatus == '入住'){
                var index = layer.open({
                    type: 2,
                    title:"消息---续住",
                    content: '../findCheckinfo?roomId='+selectRoomId,
                    area: ['100%', '100%'],
                    maxmin: true,
                    cancel:function () {
                        window.location.href = "../../findAllRoom";
                    }
                })
            }
            if(selectRoomStatus == '打扫'){
                $.messager.alert('消息','正在打扫的房间不能续住','info');
                return;
            }
            if(selectRoomStatus == '空房'){
                $.messager.alert('消息','空房不能续住','info');
                return;
            }


        }) ,
            //结账
            $("#jiezhang").click(function showwind() {
                var selectRoomId=$('input:radio[name="selectRoomId"]:checked').val();
                var selectRoomStatus=$("#"+selectRoomId+"").val();

                //alert(selectRoomId+"id")
                var index = layer.open({
                    type: 2,
                    title:"消息---退房结账",
                    content: '../out_getBill?roomId='+selectRoomId,
                    area: ['100%', '100%'],
                    maxmin: true,
                    cancel:function () {
                        window.location.href = "../../findAllRoom";
                    }


                })

            }),
        //团队开房
        $("#guoupkaifang").click(function showwind() {
            var index = layer.open({
                type: 2,
                title:"消息---团队开房",
                content: 'page/team/TeamRoom.jsp',
                area: ['100%', '100%'],
                maxmin: true,
                cancel:function () {
                    window.location.href = "../../findAllRoom";
                }


            })

        }),
        //开房
        $("#kaifang").click(function showwind() {
            var selectRoomId=$('input:radio[name="selectRoomId"]:checked').val();
            var selectRoomStatus=$("#"+selectRoomId+"").val();
            //alert(selectRoomId +"roomId()"+selectRoomStatus)
            if(selectRoomId == null && selectRoomStatus==null){
                $.messager.alert('消息','请选择房间进行操作！！！','info');
                return;
            }
            if(selectRoomStatus == '打扫'){
                $.messager.alert('消息','请通知保洁打扫房间，并改变房间状态！！！','info');
               // alert("请通知保洁打扫房间，并改变房间状态！！！")
                return;
            }
            if(selectRoomStatus == '空房') {
                //alert("00-0")
                var index = layer.open({
                    type: 2,
                    title: "消息---开房",
                    content: '../checkinfoController_findRoom?roomId=' + selectRoomId,
                    area: ['100%', '100%'],
                    maxmin: true,
                    cancel: function () {
                        window.location.href = "../../findAllRoom";
                    }
                })
            }
            if(selectRoomStatus == '入住'){
                $.messager.alert('消息','该房间已被占用','info');
                return;
            }





        }),
        //显示未读消息
        $("#futherRoomStatus").click(function showwind() {
            var index = layer.open({
                type: 2,
                title:"消息---通知",
                content: '../futureRoomState',
                area: ['100%', '100%'],
                maxmin: true

            })

        }),
            $("#updateRoomState").click(function showwind() {
                var index = layer.open({
                    type: 2,
                    title:"消息---查看房间状态",
                    content: '../roomStateOfAllRoom',
                    area: ['90%', '85%'],
                    maxmin: true,
                    cancel:function () {
                        window.location.href = "../../findAllRoom";
                    }


                })

            })


    })

</script>



<%--<!--消息提醒-->
<div class="message_img " id="remindicon" style="display: block;">
    <a href="#" id="messageShow">
        <img id="showimg" src="${pageContext.request.contextPath }/resources/page/images/message.png"></a>
    <div class="number" id="messageNum">0</div>
</div>--%>




<%--<script>
    $(function () {
        //实时监听未读消息
        $(document).ready(function(){
           window.setInterval(checkMessage, 1000);
        });


        //显示未读消息
        $("#messageShow").click(function () {
            alert("-------")
            var url = "../../findAllMessage";
            var info = "消息--通知";
            var id = 0;
            //显示新窗体
            $("#win").window({
                title: info,
                width: 800,
                height: 450,
                modal: true,
                closable: true,
                minimizable: false,
                href: url,
                onClose: function () {
                    $("#menuDataGrid").datagrid(
                        "reload");
                    $("#parentMenuSelect").combotree("reload");
                }
            });
        })



        function checkMessage() {
            $.ajax({
                type: 'POST',
                url: "../../checkMessage",
                data: {},
                success: function (data) {
                    $("#messageNum").empty()
                    var text =  $("#messageNum").text()
                    text += data.count;
                    $("#messageNum").append(text);
                },
                dataType: "JSON"
            })
        }


    })

</script>--%>
</body>
</html>