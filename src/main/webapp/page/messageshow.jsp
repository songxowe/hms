<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>简单点酒店管理平台</title>


    <%--<%@ include file="/commons/meta.jsp" %>--%>

    <link href="${pageContext.request.contextPath }/resources/css/main.css" type="text/css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/resources/css/tch(1).css" type="text/css" rel="stylesheet">





</head>
<body>

<div class="main" style="width: 98%; margin-left: 1%;">

    <table cellpadding="0" cellspacing="0" class="ruzhu" id="tbList">
        <thead>
        <tr>
            <th width="70">标记</th>
            <th width="140">时间</th>
            <th width="120">类型</th>
            <th>内容</th>
        </tr>
        </thead>
        <tbody class="table table-bordered">
        <c:forEach var="message" items="${requestScope.messages}" varStatus="rows">
            <tr>

                <c:if test="${message.messageStatus ==1}">
                    <th width="70">已读</th>
                </c:if>
                <c:if test="${message.messageStatus ==0}">
                    <th width="70" style="color: red"><span>未读</span></th>
                </c:if>


                <th width="140"><fmt:formatDate pattern="yyyy-MM-dd HH:mm" value="${message.messageAlertTime }" /></th>
                <c:if test="${message.messageType ==1}">
                    <th width="120" style="color: #0000CC">退房提醒</th>
                </c:if>
                <c:if test="${message.messageType ==0}">
                    <th width="120" style="color: #000000">系统提醒</th>
                </c:if>

                <th>${message.messageRemark }</th>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>




<script >
    $(function () {



    })
    
</script>
</body>
</html>
