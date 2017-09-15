<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: soriqe
  Date: 2017/8/27
  Time: 20:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp" %>
    <link href="${pageContext.request.contextPath }/resources/sale/css/main.css" type="text/css" rel="stylesheet"/>
    <link href="${pageContext.request.contextPath }/resources/sale/css/tch.css" type="text/css" rel="stylesheet"/>
    <link href="${pageContext.request.contextPath }/resources/sale/css/jquery.autocomplete.css" rel="Stylesheet"
          type="text/css"/>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/sale/js/base.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/sale/js/jquery.autocomplete.min.js"></script>
    <%--<script type="text/javascript" src="${pageContext.request.contextPath }/resources/sale/js/DefineBill.js"></script>--%>

    <%--<script type="text/javascript" src="${pageContext.request.contextPath }/resources/sale/js/Bill.js"></script>--%>

    <!--弹窗组件-->
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/sale/js/layer.js"></script>
    <link href="${pageContext.request.contextPath }/resources/sale/css/layer.css" rel="stylesheet"/>
    <!--弹窗组件END-->
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/sale/js/PagePermission.js"></script>
    <script type="text/javascript">
        //$(function () {
        //    var data = postSynRequest("/Services/BasicService.aspx", null, "Common", "GetLogonUser");
        //    if (data != null && data.State.Success) {
        //        ControllerBillPageDom(data.Data);
        //    }
        //});
    </script>
</head>

<body>
<!--入住弹出窗口-->
<div class="ruzhu_infor" style="overflow: hidden" id="divBill">
    <div class="line">
        <div class="fl" id="divTitle">结账</div>
        <input type="hidden" id="billId" value="${bill.billId}"/>
        <input type="hidden" id="UserName"/>
        <input type="hidden" id="IsshowDoorCard"/>
        <input type="hidden" id="hddOrderId"/>
        <div class="fr webno" style="margin-left: 20px; display: none;">网上单号 ：<span id="lblWebNo">&nbsp;</span></div>
        <div class="fr" style="margin-left: 20px;">入住单号 ：<span id="lblRZDH">&nbsp;${checkinfo.diyId}</span></div>
        <div class="fr none" id="divMemberCardNo">会员卡号：<span id="MemberCardNo">${member.memberId}</span> 卡余额:<span
                id="UsableAmount">${member.remaining}</span></div>
        <div class="fr none" id="divContractUnits" style="display: none">协议单位：<span id="ContractUnitsName"></span><span
                id="ContractUnitsId" style="display: none"></span></div>
        <div class="fr none" id="divJzsgdh" style="margin-left: 20px;">手工单号：<span
                id="lblJzsgdh">${groupinfo.diyId}</span></div>
        <div class="fr none" id="divTeamName" style="margin-left: 20px;">团队名称：<span
                id="lblTeamName">${groupinfo.groupName}</span></div>
        <div class="fr none" id="divLeaderName" style="margin-left: 20px;">领队名称：<span
                id="lblLeaderName">${groupinfo.groupLeader}</span></div>
        <div class="fr none" id="divLeaderPhone" style="margin-left: 20px;">领队电话：<span
                id="lblLeaderPhone">${groupinfo.leaderPhone}</span></div>
    </div>
    <div class="types">
        <h1 style="padding-bottom: 10px">
            <div class="fl">
                <label>房号：</label>
                <input type="text" value="${checkinfo.room.roomId}" readonly id="txtFH"
                       style="border: 1px solid #ddd; width: 80px; height: 20px; line-height: 20px"/>
                <%--<a href="javascript:void(0);" style="font-size: 12px; color: #0788BD; text-decoration: underline; margin: 0px 15px;" id="lblMSK">读门锁卡</a>--%>
                <%--<a href="javascript:void(0);" style="font-size: 12px; color: #0788BD; text-decoration: underline; display: none;" id="lblMX">查看明细</a>--%>
                <a href="javascript:void(0);" style="font-size: 12px; padding-left: 15px"
                   id="lblFHS">结账房间数：&nbsp;&nbsp;${count}</a>
            </div>
            <div class="fr">
                <label id="lblName" style="padding-right: 20px"></label>
                <label id="lblSource" style="padding-right: 20px">客人来源：&nbsp;${checkinfo.guestType}</label>
                <label id="lblRZSJ">入住时间：&nbsp;<fmt:formatDate value="${checkinfo.inTime}"
                                                               pattern="yyyy-MM-dd HH:mm:ss"/></label>
            </div>
        </h1>
        <h1 style="padding-bottom: 10px; display:none" id="lianfangstate">
            <div class="fl">
                <label class="lianfang" style="font-size: 14px;color: #333333;"></label>
            </div>
        </h1>
        <div style="width: 100%; background: #00ADEF; float: left">

            <table cellpadding="0" cellspacing="0" class="ruzhu" style="width: 98%">
                <tbody>
                <tr>
                    <th width="10%">房号</th>
                    <th width="10%">项目名称</th>
                    <th width="10%">消费金额</th>
                    <%--<th width="10%">支付方式</th>--%>
                    <th width="10%">收款金额</th>
                    <%--<th width="10%" class="RowScore none">积分兑换</th>--%>
                    <th width="25%">入账时间</th>
                    <%--<th width="10%">操作员</th>--%>
                    <th width="35%">备注</th>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="gundong">
            <table cellpadding="0" cellspacing="0" class="ruzhu " id="tblzw">
                <tbody>
                <tr>
                    <td width="10%">${checkinfo.room.roomId}</td>
                    <td width="10%">入住押金</td>
                    <td width="10%" style="text-align: right">0</td>
                    <%--<td width="10%" style="text-align: right"></td>--%>
                    <td width="10%" style="text-align: right">${bill.prepay}</td>
                    <%--<td width="10%" class="RowScore none"></td>--%>
                    <td width="25%"><fmt:formatDate value="${checkinfo.inTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                    <%--<td width="10%"></td>--%>
                    <td width="35%"></td>
                </tr>
                <tr>
                    <td width="10%">${checkinfo.room.roomId}</td>
                    <td width="10%">房费</td>
                    <td width="10%" style="text-align: right">${bill.roomMoney}</td>
                    <%--<td width="10%" style="text-align: right"></td>--%>
                    <td width="10%" style="text-align: right">0</td>
                    <%--<td width="10%" class="RowScore none"></td>--%>
                    <td width="25%"><fmt:formatDate value="${now}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                    <%--<td width="10%"></td>--%>
                    <td width="35%"></td>
                </tr>
                <c:forEach var="exp" items="${list}">
                    <tr>
                        <td width="10%">${checkinfo.room.roomId}</td>
                        <td width="10%">${exp.expensetrueName}</td>
                        <td width="10%" style="text-align: right">${exp.expensetruePrice*exp.expensetrueUnit}</td>
                            <%--<td width="10%" style="text-align: right"></td>--%>
                        <td width="10%" style="text-align: right">0</td>
                            <%--<td width="10%" class="RowScore none"></td>--%>
                        <td width="25%"><fmt:formatDate value="${now}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                            <%--<td width="10%"></td>--%>
                        <td width="35%">${exp.expensetrueStatus}</td>
                    </tr
                </c:forEach>
                </tbody>
            </table>
        </div>
    </div>
    <div class="types">
        <ul>
            <li style="margin-right: 22px; display: inline">
                <label style="width: 80px">消费金额：</label><input type="text" id="txtXF" value="10.00"
                                                               style="background: #5DC0CE" disabled="disabled"/></li>
            <li style="margin-right: 15px; display: inline">
                <label style="width: 76px">已收金额：</label><input type="text" id="txtYS" value="10.00"
                                                               style="background: #5DC0CE" disabled="disabled"/></li>
            <li style="margin-right: 22px; display: inline">
                <label id="lblBYS" tag='+'>本次应收：</label><input type="text" value="10.00" id="txtBYS"
                                                               style="background: #5DC0CE" disabled="disabled"
                                                               class="input_keynote"/></li>
            <%--<li style="margin-right: 22px; display: inline">
                <label style="width: 80px">预授权金额：</label><input type="text" id="txtYSC" value="0.00" style="background: #5DC0CE" disabled="disabled" /></li>--%>
            <li style="margin-right: 0px;display:none" class="RowScore none">
                <label style="width: 80px">兑换积分：</label><input type="text" value="0.00" id="txtScore"
                                                               style="background: #EEE" disabled="disabled"/><input
                    type="hidden" id="txtDhAmount"/></li>
        </ul>
        <!--<ul>
            <li style="margin-right: 22px; display: inline">
                <label style="width: 80px">预授权金额：</label><input type="text" id="txtYSC" value="0.00" style="background: #EEE" disabled="disabled" /></li>
            <li style="margin-right: 0px;">
                <label style="width: 75px">备注：</label><input type="text" id="txtDes" maxlength="100" value="0.00" style="width: 558px" /></li>
        </ul>-->
        <ul>
            <%--<li style="margin-right: 0px;">
                <label style="width:80px">手工单号：</label><input type="text" id="ManualNumber" value="" maxlength="20"/>
            </li>--%>
            <li style="margin-right: 0px;">
                <label style="width: 75px">备注：</label><input type="text" id="txtDes" maxlength="100" value=""
                                                             style="width: 584px"/></li>
        </ul>
        <ul id="ContractUnitsMeno">
            <li style="margin-right: 22px; display: inline"></li>
        </ul>
    </div>
    <%--<div class="types" style="margin-top: 0px; background: #EFEFEF; border: 1px solid #ddd" id="divInvoice">
        <h1 style="padding-bottom: 0px; border-bottom: 1px solid #ddd;">
            <div class="fr">
                <span style="font-size: 14px;">开发票</span>
                <a href="javascript:void(0)" class="sss btnOpenInvoice">展开>></a>
            </div>
        </h1>
        <ul class="divOpenInvoice none">
            <li style="margin-right: 22px; display: inline">
                <label>发票抬头：</label>
                <input type="text" id="txtTitle" style="width: 120px;" />
            </li>
            <li style="margin-right: 0px;">
                <label style="width: 80px;">发票金额：</label>
                <input type="text" id="txtAmount" style="width: 120px;" />
            </li>
            <li style="margin-right: 0px;">
                <label>备注：</label>
                <input type="text" id="txtRemark" style="width: 270px; margin-right:20px;" />
            </li>
            <li style="margin-right: 0px;">
                <input type="button" id="btn_SaveTitle" value="保存" class="bus_add" />
            </li>
        </ul>
    </div>--%>
    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd" id="divZF">
        <ul>
            <li style="margin-right: 30px; display: inline">
                <label>支付方式：</label><select class='zffs' style="width: 130px" id="selpay1">
                <option value="现金">现金</option>
                <option value="支付宝">支付宝</option>
                <option value="微信">微信</option>
                <option value="刷卡">刷卡</option>
            </select></li>
            <li style="margin-right: 30px; display: inline">
                <label id="lblPay1" class='paytitle'>收款金额：</label><input type="text" name="PayAmount" id="txtPay1"
                                                                         value="" class="input_keynote"/></li>
            <%--<li style="display: none;" class="prepaidpay">
                <label class='paytitle'>会员卡号：</label><input disabled="disabled" type="text" name="MemberCardNo"
                                                            value=""/><a href="javascript:void(0)"
                                                                         onclick="payment(this)"
                                                                         style="padding-left: 10px; margin-top: 5px; line-height: 24px;">选择</a>
            </li>
            <li style="display: none; margin-left: -30px;" class="contractunitsmanli">
                <label id="ContractUnitsManLable">签单人：</label><input type="text" name="ContractUnitsMan"
                                                                     value=""/></li>
            <li style="color: #0788BD; padding-top: 3px; padding-left: 20px">
                <img optag='add' src="${pageContext.request.contextPath }/resources/sale/img/01.png" width="20"
                     height="20" style="margin-right: 10px; display: inline; cursor: pointer"/>
            </li>--%>
        </ul>
    </div>
    <div class="types">
        <ul style="float: left; width: 500px; color: #0788BD; font-size: 14px; padding-top: 5px">
            <li style="width:100%; margin-top:5px; margin-bottom:0px">
                <a href="javascript:void(0);" onclick="Wappay(this)" id="ShowWei"
                   class="pay_scan"><span></span><b>微信支付</b></a>
                <a href="javascript:void(0);" onclick="Alipay(this)" id="ShowAli" class="pay_scan"><span
                        class="zhi"></span><b>支付宝支付</b></a>
                <a href="javascript:void(0);" onclick="ScanWappay(this)" id="ScanShowWei" class="pay_scan"><span></span><b>微信闪付</b></a>
                <a href="javascript:void(0);" onclick="ScanAlpay(this)" id="ScanShowAli" class="pay_scan"><span
                        class="zhi"></span><b>支付宝闪付</b></a>
            </li>
            <li id="ShowSign" style="display: none;  margin-top:10px">
                <input type="button" id="btnSign" class="bus_add" value="电子签名"/>
                <input type="button" id="btnReSign" class="bus_add" style="display:none;" value="重新签名"/>
                <img style="display: block; width:120px; height:40px; display:none;" id="imgSign" alt=""/>
            </li>
            <li style="margin-right: 20px;  margin-top:15px">
                <a href="javascript:void(0);" id="lblXF" style="font-weight: bold; font-size: 12px;">商品入账</a></li>
            <li style="margin-right: 20px;  margin-top:15px">
                <a href="javascript:void(0);" id="lblFY" style="font-weight: bold; font-size: 12px;">费用入账</a></li>
            <li style="margin-right: 20px;  margin-top:15px">
                <a href="javascript:void(0);" id="PartBill" style="font-weight: bold; font-size: 12px;">部分结账</a></li>
            <li style="margin-right: 20px;  margin-top:15px"><a href="javascript:void(0);" id="lblBackDeposit"
                                                                style="font-weight: bold; font-size: 12px;">退押金</a></li>
            <!--       <li style="margin-right: 20px; display: inline"><a href="javascript:void(0);" id="lblDoorClear" style="font-weight: bold; font-size: 12px;">门锁清卡</a></li>

               <li style="margin-right: 20px; display: inline; margin-top: 0px;" id="ShowWei"><a href="javascript:void(0);" onclick="Wappay(this)" style="font-weight: bold; font-size: 12px;">
                   <img src="../Images/wxpayment3.gif" /></a></li>
               <li style="margin-right: 0px; display: inline; margin-top: 0px;" id="ShowAli"><a href="javascript:void(0);" onclick="Alipay(this)" style="font-weight: bold; font-size: 12px;">
                   <img src="../Images/alipayment.gif" /></a></li>-->

        </ul>

        <ul style="float: right; width: 400px">
            <%--<li>
                <input type="button" class="bus_add" id="btnAddPrice" value="补差价"/>
            </li>--%>
            <li>
                <input type="hidden" id="listday"/>
                <input type="hidden" id="roomnumber"/>
                <input type="button" class="bus_add " onclick="tijiao()" id="btnOK" value="结账"/></li>
            <%--<li style="">
                <input type="button" class="bus_add " id="btnPrint" value="打印" /></li>--%>
            <li style="margin-right: 0px">
                <input type="button" class="bus_dell " onclick="close()" id="btnExit" value="关闭"
                       style="margin-right: 0px"/></li>
        </ul>
        <input type="hidden" id="txtPmsVersion" value=""/>
    </div>
</div>

<script>
    tongji()
    var mid = $.trim($("#MemberCardNo").text())

    if (mid != null && mid != '') {
        $("#divMemberCardNo").attr("class", "fr")
    }
    var tn = $.trim($("#lblTeamName").text())

    if (tn != null && tn != '') {
        $("#divTeamName").attr("class", "fr")
        $("#divLeaderName").attr("class", "fr")
        $("#divLeaderPhone").attr("class", "fr")
    }

    function tongji() {

        var p1 = 0
        var p2 = 0
        $("#tblzw tbody tr").each(function () {
            var tp1 = parseFloat($(this).find("td:eq(2)").text())
            var tp2 = parseFloat($(this).find("td:eq(3)").text())
            if (tp1 != null && tp1 != '') {
                p1 += tp1
            }
            if (tp2 != null && tp2 != '') {
                p2 += tp2
            }
        })
        $("#txtXF").val(p1)
        $("#txtYS").val(p2)
        if (p1 <= p2) {
            $("#lblBYS").text("本次应退：")
            $("#txtBYS").val(p2 - p1)
            $("#lblPay1").text("退款金额：")
            $("#txtPay1").val(p2 - p1).attr("readonly", true)
            var mid = $.trim($("#MemberCardNo").text())
            if (mid != null && mid != '') {
                $("#selpay1").empty().append('<option value="会员卡">会员卡</option>')
            }
        } else {
            $("#lblBYS").text("本次应收：")
            $("#txtBYS").val(p1 - p2)
            $("#lblPay1").text("收款金额：")
            $("#txtPay1").val(p1 - p2).attr("readonly", true)
        }
    }

    function tijiao() {


        if ($("#lblBYS").text() == "本次应收：") {

            if ($("#txtPay1").val() < ($("#txtBYS").val())) {
                alert("请先付款")
                return
            }
        }
        //var diyId = $("#ManualNumber").val()
        var remark = $("#txtDes").val()
        var payType = $("#selpay1").val()
        var price = $("#txtPay1").val()
        var billId = $("#billId").val()
        var memberId = $.trim($("#MemberCardNo").text())
        var inmomey = "是"
        if ($("#lblBYS").text() == "本次应收：") {
            inmomey = "否"
        }
        $.ajax({
            url: "../out_over",
            type: "post",
            data: {
                remark: remark,
                payType: payType,
                price: price,
                billId: billId,
                inmomey: inmomey,
                memberId: memberId
            },
            dataType: "json",
            success: function (data) {
                if (data == 1) {
                    alert("您已结账")
                    close()
                } else {
                    alert("未知错误")
                }
            }
        })
    }

    function close() {
        //alert("close")
        window.location.href = "../../findAllRoom";
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    }
</script>
</body>

</html>
