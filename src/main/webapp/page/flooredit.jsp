<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp"%>
    <link href="${pageContext.request.contextPath }/resources/css/main.css" type="text/css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/resources/css/tch.css" type="text/css" rel="stylesheet">
</head>
<body>
<!--楼层弹出窗口-->
<div class="louceng">
    <div class="line">编辑楼层</div>
        <ul>
            <li>
                <label>楼层：</label><input id="floorId" type="text" maxlength="10" value="${requestScope.floor.floorId }"
                                         readonly/></li>
            <li>
                <label>排序：</label><input id="otherOne" type="text" maxlength="10"
                                         value="${requestScope.floor.otherOne }"/></li>
            <li>
                <label>备注：</label><textarea id="otherTwo" rows="8" cols="30">${requestScope.floor.otherTwo }</textarea>
            </li>
            <li>
                <label>&nbsp;</label><input id="save"value="保存" class="bus_add"/></li>
        </ul>
</div>

<script>
    $(function () {
        $("#save").click(function () {
            $.ajax({
                type: "POST",
                url: "../../editFloor",
                data: {
                    "floorId": $.trim($("#floorId").val()),
                    "otherOne": $.trim($("#otherOne").val()),
                    "otherTwo": $.trim($("#otherTwo").val())
                },
                dataType: "JSON",
                success:function (data) {
                    if (data.success) {
                        //alert("--------------")
                        $(function () {
                            $.messager.alert("操作提示", "操作成功！");
                        });
                        $("#win").window("close", true);
                    }
                },
                error :function (msg) {
                    console.log("系统错误请与管理员联系", msg)
                }
            })
        })
    })

</script>
</body>
</html>

