<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp"%>
    <link href="${pageContext.request.contextPath }/resources/css/main.css" type="text/css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/resources/css/tch.css" type="text/css" rel="stylesheet">
</head>
<body>
<div class="fangjian">
    <div class="line">编辑房间</div>
    <ul>

        <li>
            <label>房号：</label>
            <input type="text" value="${room.roomNo}" id="roomNo" readonly>
            <input type="hidden" value="${room.roomId}" id="roomId">
        </li>
        <li>
            <label>状态：</label>
            <input type="text" value="${room.roomStatus}" id="roomStatus" readonly>
        </li>
        <li>
            <label>变更为：</label>
            <select id="change" style="width: 194px">
                <option value="空房">请选择</option>
                <option value="预留">预留</option>
                <option value="空房">空房</option>
                <option value="打扫">打扫</option>
                <option value="修理">修理</option>
                <option value="入住">入住</option>
            </select>
        </li>
        <li>
            <label>&nbsp;</label>
            <input type="button" id="roomStateSave" value="保存" class="bus_add" />
        </li>

    </ul>
</div>

<script>
    $("#roomStateSave").click(function () {
        if($("#roomStatus").val() == $("#change").val()){
            alert("不能选择相同的状态")
            return
        }
        else {
            $.ajax({
                url:"../../setRoomState",
                type:"POST",
                data:{"roomId":$("#roomId").val(),
                    "roomStatus":$("#change").val()
                },
                dataType:"JSON",
                success:function (data) {
                    window.parent.location.reload("../roomStateOfAllRoom");
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                }
            })
        }
    })
</script>
</body>
</html>
