<%--
  Created by IntelliJ IDEA.
  User: Yuan
  Date: 2017/8/21
  Time: 14:40
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
    <form action="../../memberController_save" name="memberForm" id="memberForm">
        <label>会员卡号：</label><input width="100px" type="text" readonly="true " name="memberId"
                                   value="${member.memberId}"><br><br>
        <label>会员类型：</label><input width="100px" type="text" readonly="true "
                                   value="${member.membertype.membertypeName}"><br><br>
        <input type="hidden" name="membertype.membertypeId" value="${member.membertype.membertypeId}">

        <input type="hidden" name="memberStatus" value="${member.memberStatus}">
        <input type="hidden" name="memberRemaining" value="${member.memberRemaining}">
        <input type="hidden" name="memberConsume" value="${member.memberConsume}">
        <input type="hidden" name="memberScore" value="${member.memberScore}">

        <label>新 密 码：</label><input width="100px" type="password" name="memberPassword" id="pswd1"><br><br>
        <label>确认密码：</label><input width="100px" type="password" id="pswd2"><br><br>
        <span style="color: red;display: none" id="tip">密码前后不一致，重新输入</span>
        <button type="submit">确定</button>
    </form>
</div>
<script type="text/javascript">
    /*var pswd1 = $("#pswd1").val();
    var pswd2 = $("#pswd2").val();
    $("#pswd2").onblur(function () {
        if (pswd1 != pswd2) {
            $("#tip").style.display = "block";
        } else {
            $("#tip").style.display = "none";
        }
    })
*/
    $("#memberForm").form({
        url: "../../memberController_save",
        success: function (data) {
            if (data) {
                $.messager.show({
                    title: "提示",
                    msg: "密码重置成功!"
                });
                $("#editMember").window("close", true);
            }
        }
    });
</script>
</body>
</html>

