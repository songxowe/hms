<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../../commons/meta.jsp" %>
<!DOCTYPE html>


<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>简单点酒店管理平台</title>
    <%@ include file="../../commons/meta.jsp" %>

</head>
<body>
<div style="text-align: center;margin-top: 20px">
    <form action="" name="chargecaseForm" id="chargecaseForm" method="post">
        <label>充值方案：</label><input type="text" width="100px" name="chargecaseName"><br><br>
        <label>充值金额：</label><input type="number" step="0.01" min="0.00" width="100px" name="chargecaseMoney"><br><br>
        <label>赠送金额：</label><input type="number" step="0.01" min="0.00" width="100px" name="chargecaseExtra"><br><br>
        <label>赠送积分：</label><input type="number" min="0" width="100px" name="chargecaseScore"><br><br>
        <label>方案状态：</label><input type="text" readonly="true" width="100px" name="chargecaseStatus" value="启用"><br><br>
        <button type="submit">提交</button>
    </form>

</div>
<script type="text/javascript">
    $(function () {
        $("#chargecaseForm").form({
            url: "../../chargecaseController_add",
            success: function (data) {
                if (data) {
                    $.messager.show({
                        title: "提示",
                        msg: "方案新增成功!"
                    });
                    $("#editChargecase").window("close", true);
                }
            }
        });
    })

</script>
</body>
</html>

