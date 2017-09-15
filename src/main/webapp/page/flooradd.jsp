
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../commons/taglib.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
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
<!--楼层弹出窗口-->
<div class="louceng">
    <div class="line">添加楼层</div>
    <ul>
        <li>
            <label>楼层：</label>
            <input id="floorId" type="text" maxlength="10"/>
           <%-- <input type="button" value="+" class="butn" onclick="AddFloor()" />--%>
        </li>
        <li class="floorlist"></li>
        <li>
            <label>&nbsp;</label>
            <input type="button" id="addFlood" value="保存" class="bus_add"/>
        </li>
    </ul>
</div>

<script>
    $(function () {

        $("#addFlood").click(function () {
            clear();
            //alert("click()..."+$.trim($("#floorId").val()))
            $.ajax({
                type:"POST",
                url:"../../addFloor",
                data:{"floorId":$.trim($("#floorId").val())},
                dataType:"JSON",
                success:function (data) {
                   if(data.success ){
                       $.messager.show( {
                           title : "提示",
                           msg : "楼层" + $("#floorId").val() + "添加成功!",
                           timeout:3000
                       });
                       $("#win").window("close",true);
                   }else {
                      // alert(data+"data=false")
                       $("#floorId").after('<span id = "temporary" class="formTips note_no" style="color: red">' + "楼层名称重复，请重新输入！" + '</span>');
                   }
                },
                error: function (msg) {
                    console.log("系统错误请与管理员联系", msg)
                }

            })
        })


    })

    function clear() {
        $("#temporary").remove();
    }
</script>

</body>
</html>

