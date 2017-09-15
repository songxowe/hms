<%--
  Created by IntelliJ IDEA.
  User: soriqe
  Date: 2017/8/27
  Time: 20:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp" %>

    <link href="${pageContext.request.contextPath }/resources/sale/css/main.css" type="text/css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath }/resources/sale/css/tch.css" type="text/css" rel="stylesheet" />

    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/sale/js/Base.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/sale/js/frontop_feeadd.js"></script>
</head>

<body>
<!--楼层弹出窗口-->
<div class="ruzhu_infor" style="width: 860px">
    <div class="line">
        <div class="fl">费用入账</div><div id="divErrorTips"></div>
        <div class="fr">入住单号：<span id="OrderNo"></span></div>
    </div>
    <div class="types">
        <ul>
            <li style="margin-right: 20px; display: inline">
                <label style="width: 50px">房号：</label><p class="RoomNo"></p>
            </li>
            <li style="margin-right: 10px; display: inline">
                <label>房间类型：</label><p class="RoomTypeName"></p>
            </li>
            <li style="margin-right: 46px; display: inline">
                <label>客人姓名：</label><p class="Customer_Name"></p>
            </li>
            <li style="margin-right: 0px; display: inline">
                <label>入住时间：</label><p class="EnterDate"></p>
            </li>
            <li style="margin-right: 20px; display: inline">
                <label style="width: 50px">来源：</label><p class="Source"></p>
            </li>
            <li style="margin-right: 10px; display: inline">
                <label>开房方式：</label><p class="OpenTypeName"></p>
            </li>
            <li style="margin-right: 46px; display: inline">
                <label>房价方案：</label><p class="SchemeName"></p>
            </li>
            <li style="margin-right: 0px; display: inline">
                <label>消费金额：</label><p class="TotalFee"></p>
            </li>
        </ul>
    </div>
    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd">
        <ul>
            <li style="margin-right: 74px; display: inline">
                <label>费用类别：</label><select style="width: 160px" id="ItemTypeId">
                <option value="">请选择费用类别</option>
            </select></li>
            <li style="margin-right: 84px; display: inline">
                <label>费用名称：</label><select style="width: 210px" id="ItemId">
                <option value="">请选择费用名称</option>
            </select></li>
            <li style="margin-right: 0px; display: inline">
                <label>费用金额：</label><input type="text" id="Amount" style="width: 100px" value="" /></li>

            <li id="PayMethodLi" style="margin-right: 20px; display: none">
                <label>支付方式：</label>
                <select style="width: 100px" id="PayMethod">
                </select></li>
            <li id="ManualNumberLi" style="display:none">
                <label>手工单号：</label><input type="text" id="ManualNumber" maxlength="20" /></li>
            <li style="margin-right: 0px; display: inline">
                <label>备注：</label><input type="text" id="Remark" style="width: 768px" /></li>
        </ul>
    </div>
    <div class="types">
        <ul style="float: right; width: 184px">
            <li>
                <input type="button" class="bus_add " id="btnSubmit" value="入账" /></li>
            <li style="margin-right: 0px">
                <input type="button" class="bus_dell " id="btnClose" value="关闭" style="margin-right: 0px"/></li>
        </ul>
    </div>
</div>
</body>
</html>
