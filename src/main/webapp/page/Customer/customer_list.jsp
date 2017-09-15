<%--
  Created by IntelliJ IDEA.
  User: the one
  Date: 2017/8/14 0014
  Time: 16:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>

<head>

    <title>客人列表</title>
    <meta charset="utf-8">
    <!--
    <link rel="stylesheet" type="text/css" href="styles.css">
    -->
    <%@ include file="../../commons/meta.jsp"%>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Customer/js/index.js"></script>
</head>

<body>
<div class="easyui-layout" fit="true">

    <div data-options="region:'center'">
        <div id="editTool">
            <label>类型：</label>
            <select id="Options" class="easyui-combobox">
                <option value="1" selected="selected">在住客人</option>
                <option value="2">今日预离</option>
                <option value="3">已退房</option>
                <option value="4">房租催缴</option>
                <option value="5">挂单客人</option>
                <option value="6">撤单客人</option>
            </select>

            <label>时间：</label>
            <input type="text" class="easyui-datebox" style="width: 120px" id="StartDate" />

            <label style="padding-right: 0px; margin-left: 0px">至</label>
            <input type="text" class="easyui-datebox" style="width: 120px" id="EndDate" />

            <label>关键字：</label><input type="text" class="easyui-textbox" style="width: 180px" id="KeyStr" placeholder="单号\房号\会员卡号\姓名\备注"
        />

            <label>协议单位：</label><input type="text" id="txtContractUnit" value="" style="width: 180px" />
            <input type="hidden" id="ContractUnitId" value="0" />

            <label>房型：</label>
            <select id="RoomType" class="easyui-combobox">
                <option value="">不限</option>
            </select>

            <a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="advEmp()">查询</a>

        </div>
        <table id="dgEmp"></table>
        <div id="empView"></div>
    </div>

</div>

</body>

</html>
