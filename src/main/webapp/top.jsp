<%@page import="org.apache.catalina.connector.Request"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/top.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-2.1.1.min.js"></script>
</head>
<body>
<div class="rec">
    <img src="${pageContext.request.contextPath}/images/shopcar.png" id="middle">
    <h1>进&nbsp;&nbsp;销&nbsp;&nbsp;存&nbsp;&nbsp;管&nbsp;&nbsp;理&nbsp;&nbsp;系&nbsp;&nbsp;统</h1>
    <!--  <div class="show">
        <span class="user" id="username">${u.username}</span>
        <div class="operate">
            <ul>
                <li><a href="#"><img src="${pageContext.request.contextPath}/images/set.png" class="set">&nbsp;&nbsp;&nbsp;设置<img src="${pageContext.request.contextPath}/images/userbox_tri.png" id="tri"></a></li>
                <li><a href="#"><img src="${pageContext.request.contextPath}/images/personalinfo.png" class="perinfo">&nbsp;&nbsp;&nbsp;&nbsp;个人资料</a></li>
                <li id="logout"><img src="${pageContext.request.contextPath}/images/switch.png" class="outpic">&nbsp;&nbsp;&nbsp;退出</li>
            </ul>
        </div>
        <script type="text/javascript">
            $("operate").slideDown("slow");
        </script>
    </div>
    -->
</div>
</body>
</html>