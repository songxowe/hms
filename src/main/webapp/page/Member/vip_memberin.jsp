<%--
  Created by IntelliJ IDEA.
  User: Yuan
  Date: 2017/8/21
  Time: 14:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>简单点酒店管理平台</title>
    <link href="../styles/main.css" type="text/css" rel="stylesheet" />
    <link href="../styles/tch.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="../Scripts/easyui/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="../Scripts/public/Base.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.autocomplete.min.js"></script>
    <link href="../Styles/jquery.autocomplete.css" rel="stylesheet" />
    <script type="text/javascript" src="../Scripts/jquery.datetimepicker.js"></script>

    <link href="../Styles/jquery.datetimepicker.css" rel="stylesheet" />
    <script type="text/javascript" src="../Scripts/public/datetime.js"></script>
    <script type="text/javascript" src="../Scripts/page/Member/vip_memberin.js"></script>
    <script type="text/javascript" src="../Scripts/public/DefineBill.js"></script>

</head>
<body>
<div class="vip_infor" style="width: 800px">
    <div class="line">
        <div class="fl">会员换卡</div>
        <input type="hidden" id="CardId" />
        <div class="errortips" id="btnRead"></div>
        <input type="hidden" id="CCardNo" />
    </div>
    <div class="types" style="margin: 0px">
        <ul>
            <li>
                <label>卡号：</label>
                <input type="text" class="txt inps" id="CardNo" maxlength="20" />
                <input type="button" class="credit" value="查询" id="btnQuery" />
                <input type="button" class="credit " value="读卡" id="btnReadCard" />
                <input type="button" class="credit " value="写卡" id="btnWriteCard" />
                <input type="button" class="credit " value="清卡" id="btnClearCard" />
            </li>
        </ul>
    </div>
    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd; margin-top: 0px">
        <ul>
            <li>
                <label>姓名：</label>
                <span class="txt inps" style="width: 80px" id="Name">&nbsp;</span></li>
            <li>
                <label style="width: 55px">证件：</label>
                <span class="txt inps" style="width: 90px" id="MemberType">&nbsp;</span></li>
            <li>
                <label>证件号码：</label>
                <span class="txt inps" id="MemberCardNo">&nbsp;</span></li>
            <li>
                <label>类型：</label>
                <span class=" inps" style="width: 80px" id="CategoryName">&nbsp;</span></li>
            <li>
                <label>生日：</label>
                <span class="inps txt" style="width: 80px" id="BirthDay">&nbsp;</span></li>
            <li>
                <label style="width: 55px">销售员：</label>
                <span class="inps txt" style="width: 90px" id="SalerMan">&nbsp;</span></li>
            <li>
                <label>手机号码：</label>
                <span class="inps" id="Phone">&nbsp;</span></li>
            <li style="width: 100%">
                <label>喜好：</label>
                <span class="inps" style="width: 730px" id="Love">&nbsp;</span></li>
            <li style="width: 100%">
                <label>地址：</label>
                <span class="inps" style="width: 730px" id="Address">&nbsp;</span></li>
            <li style="width: 100%">
                <label>备注：</label>
                <span class="inps" style="width: 730px" id="Remark">&nbsp;</span></li>
        </ul>
    </div>
    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd">
        <ul>
            <li>
                <label>&nbsp;&nbsp;总积分：</label>
                <span class="txt inps" style="width: 90px" id="TotalScore">0.00</span></li>
            <li>
                <label>兑换积分：</label>
                <span class="txt inps" style="width: 80px" id="UsedScore">0.00</span></li>
            <li>
                <label>剩余积分：</label>
                <span class="txt inps" style="width: 80px" id="UsableScore">0.00</span></li>

            <li>
                <label>冻结积分：</label>
                <span class="inps" style="width: 90px" id="FrozenScore">0.00</span>
            </li>
            <li>
                <label>&nbsp;&nbsp;总储值：</label>
                <span style="width: 90px" class="txt inps" id="TotalAmount">0.00</span>
            </li>
            <li>
                <label>消费储值：</label>
                <span style="width: 80px" class="inps txt " id="UsedAmount">0.00</span>
            </li>

            <li>
                <label>储值余额：</label>
                <span style="width: 80px" class="txt inps" id="UsableAmount">0.00</span>
            </li>
            <li>
                <label>消费次数：</label>
                <span class="inps" style="width: 90px" id="ConsumeTimes">0.00</span></li>
            <li>
                <label>消费金额：</label>
                <span class="txt inps" style="width: 90px" id="ConsumeAmount">0.00</span></li>

            <li>
                <label>卡片状态：</label>
                <span class="txt inps" style="width: 80px" id="StatusName">&nbsp;</span></li>
            <li>
                <label>发卡时间：</label>
                <span class="inps txt" style="width: 80px" id="OpenDate">&nbsp;</span></li>
            <li>
                <label>有效时间：</label>
                <span class="inps" style="width: 90px" id="ExprieDate">&nbsp;</span></li>
        </ul>
    </div>
    <!--会员换卡-->
    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd;">
        <ul>
            <li>
                <label style="width: 60px">新卡号：</label>
                <input type="text" class="inps txt" style="width: 300px" id="NewCard" /></li>
            <li>
                <label style="width: 70px">支付方式：</label>
                <select style="width: 90px" id="Paymethed">
                </select></li>
            <li>
                <label style="width: 100px">卡费金额：</label>
                <input type="text" class="inps" style="width: 90px" id="CardPrice" />
            </li>
        </ul>
    </div>
    <!--end-->

    <div class="types">
        <ul style="float: right; width: 174px">
            <li style="">
                <input type="button" class="bus_add " value="会员换卡" id="BtnSave" /></li>
            <li style="margin-right: 0px">
                <input type="button" class="bus_dell " id="BtnDel" value="关闭" style="margin-right: 0px" />
            </li>
        </ul>
    </div>

</div>
</body>
</html>
