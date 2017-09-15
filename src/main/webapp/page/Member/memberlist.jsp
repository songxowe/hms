<%--
  Created by IntelliJ IDEA.
  User: Yuan
  Date: 2017/8/21
  Time: 14:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>简单点酒店管理平台</title>
    <link href="page/css/main.css" type="text/css" rel="stylesheet"/>
    <link href="page/css/tch.css" type="text/css" rel="stylesheet"/>
    <script type="text/javascript" src="page/Scripts/easyui/jquery-1.8.0.min.js"></script>
    <%--&lt;%&ndash;    <script type="text/javascript" src="../page/Scripts/public/jquery.cookie.js"></script>&ndash;%&gt;
    <script type="text/javascript" src="page/Scripts/public/Base.js"></script>
    <script type="text/javascript" src="page/Scripts/public/Paging.js"></script>
    <script type="text/javascript" src="page/Member/js/vip_manage.js"></script>--%>
</head>
<body>
<div class="main" style="width: 98%; margin-left: 1%;">
    <div class="ftt_search fontYaHei">
        <label>条件：</label>
        <input type="text" style="width: 180px" placeholder="请输入会员卡号" name="memberId" id="memberId"/>
        <input type="text" style="width: 180px" placeholder="请输入电话" name="memberPhone" id="memberPhone"/>
        <input type="text" style="width: 180px" placeholder="请输入姓名" name="memberName" id="memberName"/>
        <label style="margin-left: 20px;">卡状态：</label><select style="width: 80px; margin-right: 25px"
                                                              name="memberStatus" id="memberStatus">
        <option value="">全部</option>
        <!--<option value="0">新卡</option>
            <option value="1">未激活</option>-->
        <option value="10" selected="selected">正常</option>
        <option value="20">挂失</option>
        <option value="21">过期</option>
        <option value="30">作废</option>
    </select>
        <label>余额为负:</label><input type="checkbox" style="width:18px;height:18px" id="NegativeAmount"/>
        <input type="button" class="qtantj" value="查询" id="btnQuery"/>
    </div>
    <div style="width:160px; float: left">
        <ul class="vip_member" id="li_kind" style="width: 100%">
        </ul>
        <div class="vip_db" style="margin: 0px; width: 100%">
            <!--<input type="button" value="积分设置" class="add_price_type" onclick="javascript: top.openTab('/Member/vip_credit.html', '积分设置', true)" style="margin-top: 10px" />-->
            <input class="add_price_type" type="button" value="充值方案" id="Rechargesolution" style="margin-top: 10px">
        </div>
    </div>
    <div style="margin-left:160px">
        <table cellpadding="0" cellspacing="0" class="vip_member" id="tblgood" style="width: 100%">
            <thead>
            <th width="8%">卡号</th>
            <th width="5%">类型</th>
            <th width="7%">姓名</th>
            <th width="8%">电话</th>
            <th width="5%">状态</th>
            <th width="7%">卡内积分</th>
            <th width="7%">卡余额</th>
            <th width="5%">性别</th>
            <th width="8%">生日</th>
            <th width="5%">证件类型</th>
            <th width="10%">证件号码</th>
            <th width="10%">发卡时间</th>
            <th width="8%">操作员</th>
            </thead>
        </table>
        <c:forEach var="member" items="${members}">
            <tbody>
            <tr width="8%">${member.memberId}</tr>
            <tr width="5%">${member.memertype.membertype_name}</tr>
            <tr width="7%">${member.memberName}</tr>
            <tr width="8%">${member.memberPhone}</tr>
            <tr width="5%">${member.memberStatus}</tr>
            <tr width="7%">${member.memberScore}</tr>
            <tr width="7%">${member.memberMoney}</tr>
            <tr width="5%">${member.memberSex}</tr>
            <tr width="10%">${member.memberBirthdate}</tr>
            <tr width="8%">${member.Voucher}</tr>
            <tr width="5%">${member.VoucherNo}</tr>
            <tr width="10%">${member.activeTime}</tr>
            <tr width="8%">${member.operater}</tr>
            </tbody>

        </c:forEach>


        <table cellpadding="0" cellspacing="0" class="vip_member" id="Table1" style="width: 100%">
            <tr>
                <td colspan="5" width="33%" style="text-align: right">当前合计：</td>
                <td width="7%" style="text-align: right" id="pointsPage">0.00</td>
                <td width="7%" style="text-align: right" id="amountPage">0.00</td>
                <td colspan="7" width="53%">&nbsp;</td>
            </tr>
            <tr>
                <td colspan="5" width="33%" style="text-align: right">总合计：</td>
                <td width="7%" style="text-align: right" id="points">0.00</td>
                <td width="7%" style="text-align: right" id="amount">0.00</td>
                <td colspan="7" width="53%">&nbsp;</td>
            </tr>
        </table>
        <div class="vip_db" style="margin-left: 0px; width: 100%">
            <div class="fl">
                <input type="button" value="会员发卡" class="bus_add" id="MemberCard"/>
                <input type="button" value="会员充值" class="bus_add" id="Recharge"/>
                <input type="button" value="积分兑换" class="bus_add" id="Pointsfor"/>
                <input type="button" value="积分调整" class="bus_add" id="MemberScore"/>
                <input type="button" value="会员挂失" class="bus_add" id="Memberloss"/>
            </div>
            <div class="fr">
                <div id="divPage" data-need="search"></div>
            </div>
            <div class="fl" style="margin-top: 10px; width: 100%">
                <input type="button" value="会员换卡" class="bus_add" id="MemberIn"/>
                <input type="button" value="会员续卡" class="bus_add" id="MemberRenew"/>
                <input type="button" value="会员退卡" class="bus_add" id="MemberOut"/>
                <input type="button" value="会员升级" class="bus_add" id="Memberup"/>
                <input type="button" value="密码重置" class="bus_add" id="Setpassword"/>
                <input type="button" value="会员导出" class="bus_add" id="MemberExport"/>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">

</script>
</body>
</html>

