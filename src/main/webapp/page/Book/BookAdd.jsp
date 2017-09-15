<%--
  Created by IntelliJ IDEA.
  User: the one
  Date: 2017/8/23 0023
  Time: 19:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>简单点酒店管理平台</title>
    <%@ include file="../../commons/meta.jsp" %>
    <link href="${pageContext.request.contextPath }/resources/page/styles/main.css" type="text/css" rel="stylesheet"/>
    <link href="${pageContext.request.contextPath }/resources/page/styles/tch.css" type="text/css" rel="stylesheet"/>
    <link href="${pageContext.request.contextPath }/resources/page/Styles/jquery.datetimepicker.css" rel="stylesheet"/>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/easyui/jquery-1.8.0.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/jquery.autocomplete.min.js"></script>
    <link href="${pageContext.request.contextPath }/resources/page/Styles/jquery.autocomplete.css" rel="stylesheet"/>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/pageScripts/jquery.datetimepicker.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/public/Base.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/public/datetime.js"></script>
    <%--<script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/page/Book/bookadd.js"></script>--%>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/page/Book/mybookadd.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/public/PagePermission.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/public/jquery.cookie.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/public/DefineBill.js"></script>
    <style type="text/css">.Editing_EnterCount {
        display: none
    }

    .marginLeft {
        margin-left: 38px;
    }
    </style>
    <script type="text/javascript">
        $(function () {
            var data = postSynRequest("/Services/BasicService.aspx", null, "Common", "GetLogonUser");
            if (data != null && data.State.Success) {
                ControllerOrderAdd(data.Data);
            }

        });
        /*$("#MemberCardNo").change(function () {

            var id = $("#MemberCardNo").val()
            if (id == null || id == '') {
                //无回会员
                nomember()
            }
            $.ajax({
                url: "../../memberCheckinController?memberId=" + id,
                type: "get",
                dataType: "json",
                success: function (data) {
                    alert(data.memberId)
                    if (data.memberId != null && data.memberId != '' && data.memberId > 0) {
                        $("#membermoney").val(data.memberRemaining)

                        $("#PayMented").empty()
                        $("#PayMented").append('<option value="会员卡">会员卡</option>')
                    } else {
                        alert("会员号码错误")
                        nomember()
                    }
                }
            })

            $("#divZF").on("change", "ul li:eq(1) input", function () {
                var tp = $(this).val()
                if ($(this).parent().parent().find("li:eq(0) select").val() == '会员卡') {
                    if (tp > $("#membermoney").val()) {
                        alert("会员卡余额不足")
                        $(this).val('')
                    }
                }
            })
        })*/
        /*function nomember() {
            $("#MemberCardNo").val("")
            $("#PayMented").empty()
            var text = '<option value="现金">现金</option>\n' +
                '                        <option value="支付宝">支付宝</option>\n' +
                '                        <option value="微信">微信</option>\n' +
                '                        <option value="刷卡">刷卡</option>'
            $("#PayMented").append(text)
        }*/
    </script>
</head>
<body>
<!--入住弹出窗口-->
<div class="ruzhu_infor" style="width: 900px">
    <div class="line">
        <div class="fl">预订信息</div>
        <div class="errortips" id="divErrTips"></div>
        <div class="fr none BookNo">预订单号 ：<span id="BookNo"></span></div>
        <input type="hidden" id="sul" value="1"/>
        <input type="hidden" id="sul1" value="1"/>
        <input type="hidden" id="sul2" value="1"/>
        <input type="hidden" id="sul3" value="1"/>
        <input type="hidden" id="txtBookType" value="0"/>
        <input type="hidden" id="Detail"/>
        <input type="hidden" id="roomid"/>
        <input type="hidden" id="roomNo"/>
    </div>
    <div class="types">
        <!--团队预定新增字段 -->
        <ul id="ulTeam" style="display: none;">
            <li style="margin-right: 38px; display: inline">
                <label>团名：</label><input type="text" id="txtTeamName" maxlength="20" value=""/>
            </li>
            <li style="margin-right: 38px; display: inline">
                <label>领队人：</label><input type="text" id="txtLeaderName" maxlength="20" value="" style="width: 110px;"/>
            </li>
            <li style="margin-right: 38px; display: inline">
                <label>领队电话：</label><input type="text" value="" id="txtLeaderPhone" style="width: 110px"/>
            </li>
        </ul>

        <ul>
            <li style="margin-right: 38px; display: inline;">
                <label>预订人：</label><input type="text" id="Name" maxlength="20" value=""/>
            </li>
            <li style="margin-right: 38px; display: inline">
                <label>电话：</label><input type="text" id="Phone" maxlength="20" value="" style="width: 110px;"/>
            </li>
            <li style="margin-right: 38px; display: inline">
                <label>网上单号：</label><input type="text" value="" id="WebNo" style="width: 110px"/>
            </li>
            <li style="margin-right: 0px; display: inline">
                <label>担保方式：</label>
                <select style="width: 118px;" id="WarrantMethod">
                    <option value="无担保">无担保</option>
                    <option value="网上预付">网上预付</option>
                    <option value="有担保">有担保</option>
                </select>
            </li>
        </ul>
        <ul>
            <li style="margin-right: 38px; display: inline; position: relative" id="MemberCardli">
                <label>会员卡号：</label>
                <div class="dis_yes" style="float: left">
                    <input type="text" value="" id="MemberCardNo"/>
                    <label id="CategoryName" style="position: absolute; right: 5px; top: 0px">&nbsp;</label>
                </div>
                <div class="dis_no" style="display: none; float: left">
                    <input id="" type="text" value="酒店未开通会员功能" style="margin-right: 0px; display: inline" disabled/>
                    <a href="#" id="OpenModelSet"
                       style="display: none; text-align: right; color: #2eb1a9; position: absolute; right: 45px; top: 5px">开通功能</a>
                </div>
            </li>
            <li style="margin-right: 38px; display: inline">
                <label class="lbldate">来店时间：</label>
                <input type="date" required value="" id="EnterDate" style="width: 110px"/>
            </li>
            <li style="margin-right: 38px; display: inline">
                <label>离店时间：</label>
                <input type="date" required value="" id="LeaveDate" style="width: 110px;"/>
            </li>
            <li style="margin-right: 0px; display: inline">
                <label>留房时间：</label>
                <input type="time" required value="12:00" id="ExpireDate" style="width: 110px"/>
            </li>
        </ul>
        <ul>
            <li style="margin-right: 38px; display: inline;">
                <label>开房方式：</label><%--<select id="OpenType" style="width: 128px;">
                <option value="天房">天房</option>--%>
                <input type="text" value="天房" readonly id="OpenType" style="width: 128px;">
                <%--<option value="钟点房">钟点房</option>--%>
                </input>
            </li>
            <li style="margin-right: 38px; display: inline;">
                <label>客人来源：</label>
                <select style="width: 116px" id="Source">
                    <option value="客人自入">客人自入</option>
                    <option value="网上下单">网上下单</option>
                </select>
            </li>
            <%--<li style="margin-right: 0px; display: inline;" class="source">
                <label>订单来源：</label>
                <input type="text" value="" id="BookSource" style="width: 110px" disabled="disabled"/>
            </li>--%>
            <li class="showAmount" style="margin-right: 0px; display: inline;">
                <label>支付方式：</label>
                <select style="width: 118px;" id="PayMented">
                    <option value="现金">现金</option>
                    <option value="支付宝">支付宝</option>
                    <option value="微信">微信</option>
                    <option value="刷卡">刷卡</option>
                </select>
            </li>
            <%--<li style="margin-right: 0px; margin-left:38px; display: inline;">
                <label>业务员：</label>
                <select style="width: 116px" id="Salesman">
                    <option value="">请选择业务员</option>
                </select>
            </li>--%>
            <li class="showAmount" style="margin-right: 38px; display: inline">
                <label style="width: 70px;">订金：</label>
                <input type="text" id="Amount" style="width: 120px;"/>
            </li>
            <li class="showAmount marginLeft" style="margin-right:0px; display:inline">
                <label>手工单号：</label>
                <input type="text" id="ManualNumber" maxlength="20" style="width:110px;"/>
            </li>
            <li style="margin-right: 0px; display: inline">
                <label>备注：</label>
                <textarea rows="2" cols="40" style="width: 794px; height: 40px;" id="Remark"></textarea>
            </li>
        </ul>
    </div>
    <div id="roomTypes" class="types" style="border: 1px solid #CCCCCC; background: #EfEfEf; padding-bottom: 10px">
        <ul class="show_room" id="room_first">
            <li style="margin-left: 10px; display: inline">
                <select class="sel_roomType" style="width: 113px">
                    <option value="单人间">单人间</option>
                </select>
            </li>
            <li style="margin-left: 10px; display: inline">
                <select class="sel_scheme" style="width: 180px;">
                    <option value="">无早</option>
                </select>
            </li>
            <li>
                <label style="width: 50px">房价：</label>
                <input value="0" type="text" style="width: 105px; color: #999;" disabled="disabled" name="Price"/>
            </li>
            <li>
                <label style="width: 50px">房数：</label>
                <input type="button" value="-" class="jia dec_room" style="margin-right: -1px;"/>
                <input type="text" readonly style="width: 36px; text-align: center" value="0" data-entercount="0"/>
                <input type="button" value="+" class="jia inc_room" style="margin-left: -1px;"/>
            </li>
            <li style="margin-left: 10px;">
                <input class="dfjyd addRow" type="button" value="+"/>
            </li>
            <li style="margin-left: 10px;"><span class="bookable_count">可订<b>0</b>间</span>

            </li>
        </ul>

        <%-- <ul class="show_room" style="display: none;">
             <li style="margin-left: 10px; display: inline">
                 <select class="sel_roomType" style="width: 113px">
                 </select>
             </li>
             <li style="margin-left: 10px; display: inline">
                 <select class="sel_scheme" style="width: 180px;">
                 </select>
             </li>
             <li>
                 <label style="width: 50px;">房价：</label><input type="text" style="width: 105px; color: #999;" disabled="disabled" name="Price" /></li>
             <li>
                 <label style="width: 50px">房数：</label>
                 <input type="button" value="-" class="jia dec_room" style="margin-right: -1px;" />
                 <input class="txt_roomCount" type="text" style="width: 36px; text-align: center" value="1" data-entercount="0"/>
                 <input type="button" value="+" class="jia inc_room" style="margin-left: -1px;" />
             </li>
             <li style="margin-left: 10px;">
                 <input class="dfjyd addRow" type="button" value="+"/>
                 <input class="dfjyd dfjydremove delRow" type="button" value="-" style="margin-left: 10px;"/>
             </li>
             <li style="margin-left: 10px;"><span class="bookable_count">可订<b>0</b>间</span>
                 <span class="Editing_EnterCount">,已住<b>0</b>间</span>
             </li>
         </ul>--%>

    </div>

    <div class="types">
        <ul>
            <li style="line-height: 26px; display: none;" id="ShowEnterRoomNo">已入住房号：<b style="color: #0789be"
                                                                                        id="EnterRoomNo">&nbsp;&nbsp;</b>
            </li>
            <li style="margin-right: 0px; float: right">
                <input type="button" class="bus_dell " value="关闭" id="btnClose"
                       style="margin-right: 0px; float: right"/>
            </li>
            <li style="float: right">
                <input type="button" class="bus_add " value="预订" id="btnSubmit"/>
            </li>
        </ul>
    </div>
</div>
<input type="hidden" id="membermoney" value="">

</body>
</html>

