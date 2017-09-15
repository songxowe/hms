<%--
  Created by IntelliJ IDEA.
  User: Yuan
  Date: 2017/8/21
  Time: 14:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../../commons/meta.jsp" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@ include file="../../commons/meta.jsp" %>
    <meta charset="utf-8"/>

</head>
<body>
<div style="text-align: center;margin-top: 20px">
    <form action="" name="memberForm" id="memberForm">
        <label>会员卡号：</label><input width="100px" type="text" readonly="true " name="memberId"
                                   value="${member.memberId}"><br><br>
        <label>会员类型：</label><input width="100px" type="text" readonly="true "
                                   value="${member.membertype.membertypeName}"><br><br>
        <input type="hidden" name="membertype.membertypeId" value="${member.membertype.membertypeId}">

        <label>会员状态：</label>
        <select style="width: 80px; margin-right: 25px" name="memberStatus">
            <option value="">全部</option>
            <option value="正常" selected>正常</option>
            <option value="挂失">挂失</option>
            <option value="过期">过期</option>
            <option value="作废">作废</option>
        </select><br><br>

        <input type="hidden" name="memberPassword" value="${member.memberPassword}">
        <input type="hidden" name="memberRemaining" value="${member.memberRemaining}">
        <input type="hidden" name="memberConsume" value="${member.memberConsume}">
        <input type="hidden" name="memberScore" value="${member.memberScore}">

        <button type="submit">确认</button>

    </form>
</div>
<script type="text/javascript">
    $("#memberForm").form({
        url: "../../memberController_save",
        success: function (data) {
            if (data) {
                $.messager.show({
                    title: "提示",
                    msg: "操作成功!"
                });
                $("#editMember").window("close", true);
            }
        }
    });
</script>

</body>
</html>

