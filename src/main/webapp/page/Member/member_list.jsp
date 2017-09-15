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
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Member/js/member.js"></script>

</head>
<body>

<div class="main" style="width: 98%; margin-left: 1%;">
    <!--查询条件-->
    <div class="ftt_search fontYaHei">
        <label>查询条件：</label>
        <input type="text" style="width: 180px" placeholder="请输入卡号" id="memberId"/>
        <input type="text" style="width: 180px" placeholder="请输入电话" id="memberPhone"/>
        <input type="text" style="width: 180px" placeholder="请输入姓名" id="memberName"/>

        <label style="margin-left: 20px;">卡状态：</label>
        <select style="width: 80px; margin-right: 25px" id="memberStatus">
            <option value="">全部</option>
            <option value="正常" selected="selected">正常</option>
            <option value="挂失">挂失</option>
            <option value="过期">过期</option>
            <option value="作废">作废</option>
        </select>
        <input type="button" class="qtantj" value="查询" id="btnQuery"/>
    </div>
    <!--会员信息表-->
    <div style="margin-top: 10px;">
        <table id="memberDataGrid">
        </table>
    </div>
    <!-- 新增雇员信息窗口 -->

    <!--会员操作-->
    <div style="margin-top:20px;text-align: center">
        <div style="margin-top: 20px; width: 100%">
            <div>
                <a href="#" class="easyui-linkbutton" onclick="member_obj.showEdit('add')">会员发卡</a>
                <a href="#" class="easyui-linkbutton" onclick="member_obj.showEdit('charge')">会员充值</a>
                <a href="#" class="easyui-linkbutton" onclick="member_obj.showEdit('scoreChange')">积分调整</a>
                <a href="#" class="easyui-linkbutton" onclick="member_obj.showEdit('chargecase')">充值方案</a>
            </div>
            <div style="margin-top: 20px; width: 100%">
                <a href="#" class="easyui-linkbutton" onclick="member_obj.showEdit('up')">会员升级</a>
                <a href="#" class="easyui-linkbutton" onclick="member_obj.showEdit('loss')">会员挂失</a>
                <a href="#" class="easyui-linkbutton" onclick="member_obj.showEdit('out')">会员退卡</a>
                <a href="#" class="easyui-linkbutton" onclick="member_obj.showEdit('password')">密码重置</a>
            </div>
        </div>
    </div>
    <div id="editMember">

    </div>


</div>
<div id="chargecasdeWin">

</div>
<script>
    $(function () {
        $("#chargecase").click(function () {
            $("#chargecasdeWin").window({
                title: "充值方案",
                width: 500,
                height: 560,
                modal: true,
                minimizable: false,
                href: '../../chargecase',
                onClose: function () {
                    $("#memberDataGrid").datagrid(
                        "reload");
                }
            });
        })
    })
</script>

</body>
</html>

