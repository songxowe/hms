<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp" %>
    <link href="${pageContext.request.contextPath }/resources/css/main(1).css" type="text/css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/resources/css/tch.css" type="text/css" rel="stylesheet">

    <style>
        .Batchlable {
            position: absolute;
            left: 150px;
            top: 15px;
            color: #FFF;
        }

        .BatchSetDiv {
            float: left;
            padding-top: 10px;
            padding-bottom: 10px;
            display: none
        }

        .BatchSetDiv input {
            width: 80px;
            background: #FFF;
            border: 1px solid #ccc;
            height: 24px;
            padding-left: 10px;
            font-size: 14px;
            line-height: 24px;
        }

        .BatchSetDiv select {
            width: 110px;
            background: #FFF;
            border: 1px solid #ccc;
            height: 30px;
            padding-left: 5px;
            font-size: 14px;
        }

        .BatchSetDiv .door {
            float: left;
            margin-right: 40px
        }

        .BatchSetDiv .phone {
            float: left;
            margin-right: 40px
        }
    </style>
</head>
<body>

<div class="main">
    <h1 class="lock">房间状态设置</h1>
    <table cellpadding="0" cellspacing="0" class="lock" style="width: 48%; float: left;" id="lList">
        <thead>
        <tr>
            <th>房号</th>
            <th>房型</th>
            <th>楼层</th>
            <th width="120">房间状态</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="room" items="${requestScope.allRoom}">
            <tr>
                <td>${room.roomNo}</td>
                <td>${room.roomType.roomTypeName}</td>
                <td>${room.floor.floorId}</td>
                <td>${room.roomStatus}</td>
                <td><input type="button" onclick="changeRoomState(${room.roomId})" value="更改" ></td>
            </tr>
        </c:forEach>
        </tbody>
    </table>

</div>
<script>


   function changeRoomState(state) {
       //alert(state)

           var index = layer.open({
               type: 2,
               title:"消息---更该房间状态",
               content: '../roomStateOfRoom?roomId='+state,
               area: ['90%', '85%'],
               maxmin: true,


           })


   }

</script>


</body>
</html>