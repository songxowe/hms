<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp"%>
    <link href="${pageContext.request.contextPath }/resources/css/main.css" type="text/css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/resources/css/tch.css" type="text/css" rel="stylesheet">
</head>
<body>
<div class="fangxing">
    <div>
        <div class="line">编辑房型 </div>
        <div class="errortips" id="btnRead"></div>
    </div>
    <ul>
        <li>
            <label>房型名称：</label><input type="text" id="roomTypeName" value="${requestScope.roomType.roomTypeName}" maxlength="10" />
        </li>
       <li>
            <label>otherOee：</label><input type="text" id="otherOne" value="${requestScope.roomType.otherOne}" maxlength="3" />
       </li>
        <li>
            <label>备注：</label><textarea rows="8" cols="40" id="roomTypeRemark">${requestScope.roomType.roomTypeRemark}</textarea>
        </li>
        <li>
            <label>&nbsp;</label><input id="save" type="button" value="保存" class="bus_add"/></li>
    </ul>
</div>

<script>
    $("#save").click(function () {
        $.ajax({
            type:"POST",
            url:"../../editRoomType",
            data:{"roomTypeId":${requestScope.roomType.roomTypeId},
                "roomTypeName":$("#roomTypeName").val(),
                "roomTypeRemark":$("#roomTypeRemark").val(),
                "otherOne":$.trim($("#otherOne").val())
            },
            dataType:"JSON",
            success:function (data) {
                //alert(data.success)
                if (data.success){
                    //alert("--------------")
                    $(function () {
                        $.messager.alert("操作提示", "操作成功！");
                    });
                    $("#win").window("close",true);
                }
            },
            error :function (msg) {
                console.log("系统错误请与管理员联系", msg)
            }
        })



    })
</script>
</body>
</html>

