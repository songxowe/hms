<%--
  Created by IntelliJ IDEA.
  User: the one
  Date: 2017/8/14 0014
  Time: 17:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE HTML>
<html>

<head>
    <title>房价方案设置</title>
    <meta charset="utf-8">
    <!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
    <%@ include file="../../commons/meta.jsp"%>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Set/js/index.js"></script>
</head>

<body>
<div class="easyui-layout" fit="true">

    <div data-options="region:'center'">
        <div id="editTool">
            <label style="margin-left: 20px;">房间类型：</label><select style="width: 80px; margin-right: 25px" id="Status"
                                                                   class="easyui-combobox">
            <option value="" selected="selected">全部</option>
            <!--<option value="0">新卡</option>
                <option value="1">未激活</option>-->
            <option value="10">双人间</option>
            <option value="20">单人间</option>
            <option value="21">豪华双人间</option>
        </select>

            <a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="advEmp()">查询</a>

        </div>
        <table id="dgEmp">
        </table>


        <div id="empView"></div>
    </div>

</div>

</body>

</html>

