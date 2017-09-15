<%--
  Created by IntelliJ IDEA.
  User: soriqe
  Date: 2017/8/18
  Time: 15:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
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
    <div class="line">添加房型</div>
    <ul>
        <li>
            <label>房型名称：</label><input type="text" id="roomTypeName" maxlength="10" />
        </li>

        <li>
            <label>备注：</label>
            <textarea  rows="8" cols="40" id="roomTypeRemark"></textarea>
        </li>
        <li>
            <label>&nbsp;</label>
            <input type="button" id="submitFrom" value="保存" class="bus_add"  />
        </li>
    </ul>
</div>

<script>
    $(function () {

        $("#submitFrom").click(function () {
           //alert("submitFrom.click()...")
            $.ajax({
                type: 'POST',
                url: "../../addRoomType",
                data: {"roomTypeName":$.trim($("#roomTypeName").val()),
                    "roomTypeRemark":$.trim($("#roomTypeRemark").val())
                },
                success: function (data) {
                    if (data.success) {
                        $.messager.show({
                            title: "提示",
                            msg: "房型" + $("#roomTypeName").val() + "添加成功!",
                            timeout: 3000
                        });
                        $("#win").window("close", true);
                    }
                },
                dataType: "JSON"
            });
        })


    })

</script>

</body>
</html>

