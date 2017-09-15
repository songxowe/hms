<%--
  Created by IntelliJ IDEA.
  User: Yuan
  Date: 2017/8/21
  Time: 14:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../../commons/meta.jsp" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@ include file="../../commons/meta.jsp" %>
    <meta charset="utf-8"/>
    <title>会员充值</title>

</head>
<body>
<div style="text-align: center;margin-top: 20px">
    <form action="" name="chargeForm" id="chargeForm">
        <label>会员卡号：</label>
        <input width="100px" type="text"  id="memId"
               value="${member.memberId}"><br><br>
        <label>会员类型：</label>
        <input width="100px" type="text" readonly="true"
               value="${member.membertype.membertypeName}"><br><br>

        <label>当前金额：</label>
        <input width="100px" type="text" readonly="true " id="currentRemaiing"
               value="${member.memberRemaining}"><br><br>
        <label>当前积分：</label>
        <input width="100px" type="text" readonly="true " id="currentScore"
               value="${member.memberScore}"><br><br>

        <label>充值方案：</label>
        <input id="chargecase" class="easyui-combobox"
               value="${charge.chargecase.chargecaseId}"
               data-options="editable:false,valueField:'chargecaseId',textField:'chargecaseName',url:'../../chargecaseController_find'"/><br><br>
        <label>充值金额：</label>
        <input id="chargecaseMoney"><br><br>
        <label>附送金额：</label>
        <input id="chargecaseExtra"><br><br>
        <label>附送积分：</label>
        <input id="chargecaseScore"><br><br>

        <label>支付方式：</label>
        <select id="payType">
            <option value="现金">现金</option>
            <option value="银行卡">银行卡</option>
            <option value="信用卡">信用卡</option>
            <option value="支付宝">支付宝</option>
            <option value="微信支付">微信支付</option>
        </select><br><br>

        <input type="button" id="btnCharge" value="充值"></input>
    </form>
</div>

<script type="text/javascript">
    $(function () {
        //加载对应的充值方案的值
        $("#chargecase").combobox({
            onChange: function (newValue, oldValue) {
                var caseId = newValue;
                alert(caseId);
                $.ajax({
                    type: 'POST',
                    url: '../../chargecaseController_findById',
                    data: {chargecaseId: caseId},
                    dataType: "json",
                    success: function (data) {
                        $("#chargecaseMoney").val(data.chargecaseMoney);
                        $("#chargecaseExtra").val(data.chargecaseExtra);
                        $("#chargecaseScore").val(data.chargecaseScore);
                    }
                });
            }
        });
        //充值运算
        $("#btnCharge").click(function () {
            var memberId = $("#memId").val();
            var cId = $("#chargecase").combobox('getValue');
            var payType = $("#payType").val();
            alert(memberId+cId+payType);
            $.ajax({
                type: 'POST',
                url: '../../chargeController_add',
                data: {
                    memberId: memberId,
                    chargecaseId: cId,
                    payType: payType
                },
                success: function (data) {
                    $.messager.show({
                        title: "提示",
                        msg: "会员充值成功!" + data
                    });
                    $("#editMember").window("close", true);
                }
            })
        });


    });
</script>
</body>
</html>

