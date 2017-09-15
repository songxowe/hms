<%--
  Created by IntelliJ IDEA.
  User: Yuan
  Date: 2017/8/21
  Time: 14:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../../commons/meta.jsp" %>


<!DOCTYPE html>
<head>
    <meta charset="utf-8"/>
    <%@ include file="../../commons/meta.jsp" %>
    <title>简单点酒店管理平台</title>
    <%--&lt;%&ndash;  <link href="${pageContext.request.contextPath }/resources/page/styles/main.css" type="text/css" rel="stylesheet"/>&ndash;%&gt;
      <link href="${pageContext.request.contextPath }/resources/page/styles/tch.css" type="text/css" rel="stylesheet"/>--%>

</head>
<body>

<div class="main" style="width: 98%; margin-left: 1%;">
    <!--查询条件-->
    <div class="ftt_search fontYaHei">
        <label>查询条件：</label>
        <input type="text" style="width: 180px" placeholder="请输入卡号" id="memberId"/>
        <input type="date" style="width: 180px" placeholder="起始时间" id="beginDate"/>
        <input type="date" style="width: 180px" placeholder="截至时间" id="endDate"/>

        <input type="button" class="qtantj" value="查询" id="btnQuery"/>
    </div>
    <!--会员信息表-->
    <div style="margin-top: 10px;">
        <table id="chargeDataGrid">
        </table>
    </div>

</div>
<script type="text/javascript">
    $(function () {
        //初始页面时加载所有充值记录信息
        $("#memberDataGrid").datagrid({
            url: "../../chargeController_list",
            title: "充值记录表",
            fitColumns: true,
            striped: true,
            rownumbers: true,
            columns: [[
                {field: "member.memberId", title: "会员卡号", width: 100, sortable: true},
                {field: "member.memberName", title: "会员姓名", width: 100, sortable: true},
                {field: "chargecase", title: "充值方案", width: 150, sortable: true},
                {field: "payType", title: "支付方式", width: 80, sortable: true},
                {field: "lastMoney", title: "充值前金额", width: 80, sortable: true},
                {field: "chargeMoney", title: "充值金额", width: 80, sortable: true},
                {field: "chargeTime", title: "电话", width: 80, sortable: true},
                {field: "operater", title: "余额", width: 100, sortable: true},
                {field: "chargeRemark", title: "性别", width: 120, sortable: true}
            ]],
            toolbar: "#searchChargeForm",
            pagination: true,
            pageSize: 10,
            pageList: [5, 10, 15, 20, 50],
            sortName: "chargeId",
            sortOrder: "desc",
        });
        //多条件查询
        $("#btnQuery").click(function () {
            var memberId = $("#memberId").val();
            var beginDate = $("#beginDate").val();
            var endDate = $("#endDate").val();
            $("#chargeDataGrid").datagrid(
                "load",
                {
                    memberId: memberId,
                    beginDate: beginDate,
                    endDate: endDate,
                });
        })
    })

</script>
</body>
</html>

