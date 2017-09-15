<%--
  Created by IntelliJ IDEA.
  User: Yuan
  Date: 2017/8/21
  Time: 14:33
  To change this tmemberlate use File | Settings | File Tmemberlates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../../commons/meta.jsp" %>
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <%@ include file="../../commons/meta.jsp" %>
</head>
<body>
<div style="text-align: center;margin-top: 20px">
    <form action="" method="post" id="memberForm" name="memberForm">
        <label>会员类型：</label>
        <select name="membertype.membertypeId">
            <option value="1">普通卡</option>
            <option value="2">银卡</option>
            <option value="3">金卡</option>
            <option value="4">钻石卡</option>
            <option value="5">黑钻卡</option>
        </select><br><br>
        <label>姓名：</label><input type="text" width="100px" name="memberName" required="true"><br><br>
        <label>性别：</label>&nbsp;&nbsp; <select name="memberSex" value="${memberSex}">
        <option value="男">男</option>
        <option value="女">女</option>
    </select>
        <label>证件类型：</label><select name="voucher" value="${voucher}">
        <option value="身份证">身份证</option>
        <option value="驾驶证">驾驶证</option>
        <option value="军官证">军官证</option>
        <option value="士兵证">士兵证</option>
        <option value="护照">护照</option>
    </select><br><br>
        <label>证件号码：</label><input type="text" width="100px" name="voucherNo" required="true"><br><br>
        <label>手机号码：</label><input type="tetx" width="100px" name="memberPhone" required="true"><br><br>
        <label>出生日期：</label><input type="date" width="100px" name="memberBirthdate"><br><br>
        <label>会员密码：</label><input type="password" width="100px" name="memberPassword" required="true"><br><br>
        <label>会员喜好：</label><input type="text" width="100px" name="memberHobby"><br><br>
        <label>会员地址：</label><input type="text" width="100px" name="memberAddress"><br><br>
        <label>当前积分：</label><input type="number" width="100px" name="memberScore" value="0"><br><br>
        <label>当前余额：</label><input type="number" width="100px" name="memberRemaining" value="0.00"><br><br>
        <label>总消费额：</label><input type="number" width="100px" name="memberConsume" value="0.00"><br><br>
        <button type="submit">确认</button>&nbsp;&nbsp;&nbsp;&nbsp;<button type="reset">重置</button>
    </form>
</div>
<script type="text/javascript">
    $("#memberForm").form({
        url: "../../memberController_save",
        success: function (data) {
            if (data) {
                $.messager.show({
                    title: "提示",
                    msg: "会员新增成功!"
                });
                $("#editMember").window("close", true);
            }
        }
    });
</script>


</body>
</html>

