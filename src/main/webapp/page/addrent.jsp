<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>


<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp"%>
    <link href="${pageContext.request.contextPath }/resources/css/main(1).css" type="text/css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/resources/css/tch.css" type="text/css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/resources/css/jquery.datetimepicker.css" rel="stylesheet">

    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/Base.js"></script>
    <script src="${pageContext.request.contextPath }/resources/js/jquery.datetimepicker.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/RentSet.js"></script>
    <style>
        .txt {
            margin-top: 5px !important;
            margin-left: -13px !important
        }
    </style>
</head>
<body>
<div class="main fontYaHei">
    <div class="system_set_add " id="jk" style="width: 100%; border: 0px;">
        <div class="lis fontYaHei" style="position:relative; padding:0px; border-bottom:0px; background:#efefef ">
            <a class="rent_a rent_select">钟点房加收房租</a>
            <input type="button" value="保存" class="bus_add  bcovs" id="btnSave" style="position:absolute; right:0px; top:56px">

        </div>
        <div class="errortips" id="btnRead"></div>
        <div class="lis day" style="border-bottom: 0px; display: none;">

        </div>
        <div class="lis hour" style="border-bottom: 0px; display: block;">
            <div class="fls" style="width:100%">
                <div class="first" style="padding-bottom:10px">
                    <h1 style="display:none">钟点房</h1>
                    <label>可开钟点房时间</label>
                    <input class="txt" type="text" id="txt_HourRoomStartDate"style="width: 50px;">
                    <label>至</label>
                    <input class="txt" type="text"id="txt_HourRoomEndDate"style="width: 50px;">
                    <label>，超</label>
                    <input type="text" class="txt" onblur="checkNumbers(this,true)" id="text_Hour" style="width:40px" maxlength="5">
                    <label>分钟按1小时加收</label>
                    <label>，超</label>
                    <input type="text" class="txt" onblur="checkNumbers(this,true)" id="text_HalfHour" style="width:40px" maxlength="5">
                    <label>分钟按半小时加收</label>
                    <input type="checkbox" class="checkbox" id="chk_IsDayRoom"><label>超</label>
                    <input type="text" class="txt" onblur="checkNumbers(this,true)"id="text_HowManyHour"style="width:30px"maxlength="5"disabled="disabled">
                    <label>小时自动转天房</label>
                </div>
                <table cellpadding="0" cellspacing="0" id="table_HourRoom">
                    <tbody>
                    <tr>
                        <th width="40"><input type="checkbox" id="choiceAll" onclick="ChoiceAll()" style="width: 100%">
                        </th>
                        <th width="200">房型</th>
                        <th width="60">钟点价</th>
                        <th width="100">会员钟点价</th>
                        <th width="50">小时</th>
                        <th width="100">加收价/小时</th>
                        <th width="120">会员加收价/小时</th>
                        <th width="100">每天可开房数</th>
                    </tr>

                    <c:forEach var="roomType" varStatus="rows" items="${requestScope.roomTypes}">
                        <c:forEach var="addRent" varStatus="rowsadd" items="${requestScope.addRents}">
                            <c:if test="${roomType.roomTypeId == addRent.roomType.roomTypeId}">
                                <tr>
                                    <td><input type="checkbox" class="box_HourRoom" id="box_HourRoom_0"
                                               style="width: 100%;height: 14px;"></td>
                                    <td>${roomType.roomTypeName}</td>
                                    <td><input type="text" onblur="checkNumber(this)" value="100.00" maxlength="5"
                                               id="text_StartHourPrice_0" style="width:70px;"></td>
                                    <td><input type="text" onblur="checkNumber(this)" value="80.00" maxlength="5"
                                               id="text_MemberStartHourPrice_0"></td>
                                    <td><input type="text" onblur="checkNumbers(this)" value="1" id="text_StartHours_0"
                                               maxlength="5" style="width:50px;"></td>
                                    <td><input type="text" onblur="checkNumber(this)" value="10.00" id="text_AddHourPrice_0"
                                               maxlength="5"></td>
                                    <td><input type="text" onblur="checkNumber(this)" value="8.00" id="text_MemberAddHourPrice_0"
                                               maxlength="5"><input type="hidden" id="hidden_HourRoomId_0" value="903"></td>
                                    <td><input type="text" onblur="checkNumber(this)" value="0" id="text_HoursRoomCount_0"
                                               maxlength="5"></td>
                                </tr>
                            </c:if>

                            <c:if test="${roomType.roomTypeId != addRent.roomType.roomTypeId}">
                                <c:if test="${fn:length(addRents) == rowsadd.index+1}">

                                    <tr>
                                        <td><input type="checkbox" class="box_HourRoom" id="box_HourRoom_0"
                                                   style="width: 100%;height: 14px;"></td>
                                        <td>${rowsadd.index+1}${roomType.roomTypeName}${fn:length(addRents)}</td>
                                        <td><input type="text" onblur="checkNumber(this)" value="0.00" maxlength="5"
                                                   id="text_StartHourPrice_0" style="width:70px;"></td>
                                        <td><input type="text" onblur="checkNumber(this)" value="0.00" maxlength="5"
                                                   id="text_MemberStartHourPrice_0"></td>
                                        <td><input type="text" onblur="checkNumbers(this)" value="0" id="text_StartHours_0"
                                                   maxlength="5" style="width:50px;"></td>
                                        <td><input type="text" onblur="checkNumber(this)" value="0.00" id="text_AddHourPrice_0"
                                                   maxlength="5"></td>
                                        <td><input type="text" onblur="checkNumber(this)" value="0.00" id="text_MemberAddHourPrice_0"
                                                   maxlength="5"><input type="hidden" id="hidden_HourRoomId_0" value="903"></td>
                                        <td><input type="text" onblur="checkNumber(this)" value="0" id="text_HoursRoomCount_0"
                                                   maxlength="5"></td>
                                    </tr>
                                </c:if>
                            </c:if>

                        </c:forEach>

                    </c:forEach>

                    </tbody>
                </table>
                <h4 style="color:red;float:right; line-height:40px">注：每天可开房数为0表示不作限制</h4>
            </div>
        </div>
    </div>
</div>



</body>
</html>
