<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%--
  Created by IntelliJ IDEA.
  User: the one
  Date: 2017/8/23 0023
  Time: 15:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>简单点酒店管理平台</title>
    <link href="${pageContext.request.contextPath }/resources/page/styles/main.css" rel="stylesheet"/>
    <link href="${pageContext.request.contextPath }/resources/page/styles/tch.css" rel="stylesheet"/>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/easyui/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/public/Base.js"></script>
    <%--<script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/Scripts/page/FrontOp/ContinuedLive.js"></script>--%>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/Scripts/page/FrontOp/myContinuedLive.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/public/DefineBill.js"></script>

</head>
<body>
<!--续住弹出窗口-->
<div class="ruzhu_infor" style="width: 860px">
    <input type="hidden" id="OrderNo" value="201708090002">
    <input type="hidden" id="StayNegative" value="0">
    <div class="line" id="DivList">
        <div class="fl">续住</div>
        <input type="hidden" id="checkId" value="${checkinfo.checkId}">
        <input type="hidden" id="groupId" value="${checkinfo.groupId}">
        <div class="fr" style="margin-left: 20px;">入住单号：<span>${checkinfo.diyId}</span></div>
    </div>

    <div class="types" id="ULList">
        <h1>
            <div class="errortips" id="btnRead"></div>
        </h1>
        <ul>
            <li style="margin-right: 42px; display:inline">
                <label style="width: 50px">房号：</label>
                <p>${checkinfo.room.roomId}</p></li>
            <li style="margin-right: 42px; display: inline">
                <label>房间类型：</label>
                <p>${checkinfo.room.roomType.roomTypeName}</p></li>
            <li style="margin-right: 42px; display: inline">
                <label>客人姓名：</label>
                <p>${guest.guestName}</p></li>
            <li style="margin-right: 0px; display: inline">
                <label>入住时间：</label>
                <p><fmt:formatDate value="${checkinfo.inTime}" pattern="yyyy-MM-dd HH:mm" />
                    </p></li>
            <li style="margin-right: 42px; display: inline">
                <label style="width: 50px">来源：</label>
                <p>${checkinfo.guestType}</p></li>
            <li style="margin-right: 42px; display: inline">
                <label>开房方式：</label>
                <p>${checkinfo.checkType}</p></li>
            <li style="margin-right: 42px; display: inline">
                <label>房价方案：</label>
                <p style="width:120px;">${checkinfo.roomCase.roomCaseName}</p></li>
            <li style="margin-right: 0px; display: inline">
                <label>已交押金：</label>
                <p>${allMoney}</p></li>
            <li style="margin-right: 42px; display: inline">
                <label style="width: 50px">余额：</label>
                <p>12450</p></li>
        </ul>
    </div>

    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd">
        <!-- <h1>
            <div class="fl">续住信息</div>
        </h1>-->
        <ul>
            <li style="margin-right: 90px; display: inline">
                <label>原定离期：</label>
                <input value="<fmt:formatDate value='${checkinfo.preoutTime}' pattern='yyyy-MM-dd HH:mm' />" type="text" id="WantLeaveDate" disabled="disabled" style="background: #eee; width: 144px"></li>
            <li style="margin-right: 90px; display: inline">
                <label>续住天数：</label>
                <input type="button" value="-" class="jia reduceDays" style="margin-left: -1px;">
                <input type="text" style="width: 60px" value="0" id="Days">
                <input type="button" value="+" class="jia addDays" style="margin-right: -1px;">
            </li>

            <li>
                <label>现定离期：</label><input value="<fmt:formatDate value='${checkinfo.preoutTime}' pattern='yyyy-MM-dd HH:mm' />" type="text" style="width: 170px" id="LeaveDate" disabled="disabled"></li>
        </ul>
        <ul>
            <li style="margin-right: 90px; display: inline">
                <label>支付方式：</label>
                <select id="PayMethod" style="width: 150px">
                    <option value="现金">现金</option>
                    <option value="支付宝">支付宝</option>
                    <option value="微信">微信</option>
                    <option value="刷卡">刷卡</option>
                </select>
            </li>
            <li style="margin-right: 90px">
                <label>押金：</label><input type="text" style="width: 110px" id="Deposit" maxlength="10"></li>
           <%-- <li style="">
                <label>手工单号：</label><input id="ManualNumber" maxlength="20" type="text">
            </li>--%>
        </ul>
        <ul>
            <li>
                <label>备注：</label><input type="text" style="width: 766px" id="Remark"></li>
        </ul>
    </div>

    <div class="types">
        <ul style="float: right; width: 184px">
            <li>
                <input type="button" class="bus_add" value="续住" id="btnSubmit">
            </li>
            <li style="margin-right: 0px">
                <input type="button" class="bus_dell " value="关闭" id="close" style="margin-right: 0px"></li>
        </ul>
    </div>

</div>
</body>
</html>

