<%--
  Created by IntelliJ IDEA.
  User: the one
  Date: 2017/8/21 0021
  Time: 13:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>简单点酒店管理平台</title>
    <link href="${pageContext.request.contextPath }/resources/page/styles/main.css" type="text/css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath }/resources/page/styles/tch.css" type="text/css" rel="stylesheet" />

    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/easyui/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/layer/layer.js"></script>
    <%--<script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/jquery.autocomplete.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/jquery.datetimepicker.js"></script>--%>
    <%--<link href="${pageContext.request.contextPath }/resources/page/Styles/jquery.autocomplete.css" rel="stylesheet" />--%>
    <%--<link href="${pageContext.request.contextPath }/resources/page/Styles/jquery.datetimepicker.css" rel="stylesheet" />--%>
    <%--<script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/public/Base.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/public/datetime.js"></script>
    &lt;%&ndash;<script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/page/FrontOp/frontop_orderadd.js"></script>&ndash;%&gt;
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/public/PagePermission.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/public/jquery.cookie.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/public/DefineBill.js"></script>--%>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/page/FrontOp/myjs_orderadd.js"></script>

    <style type="text/css">
        /*针对会员开房时如果没有相关房价方案，提示信息的单独处理*/
        span.note_no1 {
            float: left;
            line-height: 18px;
            padding-left: 25px;
            background: url(../images/prompt.png) 0px -48px no-repeat;
            min-width: 20px;
            margin-left: 20px;
            margin-top: 5px;
            display: inline;
            color: #F00;
        }
        .errorborder1 {
            border-color: #FF8686 !important;
            outline: 0;
            -webkit-box-shadow: inset 0 1px 1px #FFCECE, 0 0 8px #FFCECE;
            box-shadow: inset 0 1px 1px #FFCECE, 0 0 8px #FFCECE;
        }
    </style>
</head>
<body>
<!--入住弹出窗口-->

<div class="ruzhu_infor" style="width: 860px">
    <form id="form" name="f" method="post" action="../../checkinfoController_addone">
    <div class="line">
        <a href="../../findCheckinfo.html?checkId=4">续住</a>
        <div class="fl ordertitle">入住信息</div>
        <div class="errortips" id="btnRead"></div>
        <div class="errortips" id="prompt"></div>
        <div class="fr bookno none">预定单号：<span id="BookNo"></span></div>
    </div>
    <div class="types" style="background: #EFEFEF; border: 1px solid #ddc39b">
        <ul>
            <li>
                <label style="width: 50px">房型：</label>
                <select name="room.roomType.roomTypeId" style="width: 140px; margin-right: 40px; display: inline" id="RoomTypeId" disabled="disabled" class="disabledcolor">
                    <option selected value="${room.roomType.roomTypeId}">${room.roomType.roomTypeName}</option>
                </select></li>
            <li>
                <label style="">房号：</label>
                <input id="RoomNo" readonly  type="text" class="disabledcolor" value="${room.roomNo}" style="width: 112px; margin-right: 40px; display: inline;" />
                <input id="RoomId" name="room.roomId" value="${room.roomId}" type="hidden" /></li>
            <li style="position: relative" id="MemberCardli">
                <label style="">会员卡号：</label>
                <div class="dis_yes" style="float: left">
                    <input name="memberId" id="MemberCardNo" type="text" value="" style="width: 230px; margin-right: 0px; display: inline" />
                    <label id="CategoryName" style="display: none; text-align: right; position: absolute; right: 65px; top: 3px">&nbsp;</label>
                    <%--<input id="IsMustQuery" type="checkbox" value="" style="width: 20px; margin-right: 0px; display: inline;height:15px;margin: 5px 0px 0px 0px;" />
                    <label for="IsMustQuery" style="width: 40px; text-align:left" title="勾选表示要完全匹配会员信息">全匹配</label>--%>
                </div>

            </li>
        </ul>
        <ul>
            <li>
                <label style="width: 50px">来源：</label>
                <select name="guestType" style="width: 140px; margin-right: 40px; display: inline" id="Source">
                    <option>客人自入</option>
                    <option>预约客户</option>
                    <option>单位入住</option>
                </select></li>
            <li>

                <label>房价方案：</label>
                <select name="roomCase.roomCaseId" style="width: 120px; margin-right: 40px; display: inline;" id="SchemeId">
                        <%--<c:forEach var="case" items="${list}">
                            <option weekendPrice="${case.weekendPrice}" ordinaryPrice="${case.ordinaryPrice}" value="${case.roomCaseId}">${case.roomCaseName}</option>
                        </c:forEach>--%>

                </select>
            </li>
            <li>
                <label>开房方式：</label>
                <select readonly="" disabled="disabled" class="disabledcolor" name="checkType" style="width: 112px; margin-right: 27px; display: inline" id="OpenType">

                    <option selected="selected">天房</option>
                    <%--<option>钟点房</option>
                    <option>月租房</option>--%>
                </select></li>
            <li>
                <label>房价：</label>
                <input name="roomPrice" value="120" type="text" style="width: 70px; display: inline" id="Price" class="input_keynote" maxlength="8" onkeyup="getTotalAccount()" />
            </li>
            <li>
                <label style="width: 50px">时间：</label>
                <input name="inTime" readonly id="EnterDate" type="text"  value="" style="width: 150px; margin-right: 40px; display: inline; background: #eee"  />
            </li>
            <li>
                <label data-type="day">预住天数：</label>
                <input type="button" value="-" class="jia reduceDays" style="margin-right: -1px;" />
                <input name="stayHours" type="text" style="width: 60px" value="1" id="Days" />
                <input type="button" value="+" class="jia addDays" style="margin-left: -1px; margin-right: 22px; display: inline" /></li>
            <li>
                <label style="margin-left: 20px">预离时间：</label><input value="" id="preoutTime" readonly name="preoutTime" type="text" style="width: 150px; margin-right: 10px; display: inline" />
            </li>
            <li>
                <label style="">主账单房：</label>
                <input id="GroupRoomNo" type="text" value="" style="width: 70px; display: inline" />
                <input name="mainpayRoom" id="GroupRoomId" type="hidden" /></li>
            <li>
                <label style="">预定编号：</label>
                <input id="bookId" type="text" value="" style="width: 70px; display: inline" />
                </li>
            <li>
                <label style="">定金：</label>

                <input name="bookMoney" value="0" id="bookMoney" class="disabledcolor" readonly type="text" /></li>
        </ul>
    </div>

    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd">
        <ul>
            <li>
                <label style="width: 50px">姓名：</label>
                <input id="Customer_Name" maxlength="20" type="text" style="width: 132px; margin-right: 40px; display: inline" />
                <input id="Customer_Id" type="hidden" />
            </li>
            <li>
                <label>证件类型：</label>
                <select id="Customer_CardType" style="width: 120px; margin-right: 40px; display: inline">
                    <!--<option value="">请选择证件类型</option>-->
                    <option value="身份证">身份证</option>
                    <option value="驾驶证">驾驶证</option>
                    <option value="军官证">军官证</option>
                </select></li>
            <li style="position: relative">
                <label>证件号码：</label><input id="Customer_CardNo" maxlength="20" type="text" style="width: 284px" />
                <a href="javascript:void(0);" id="btnCustomer" class="history" style="display: none;">查看客史</a>
            </li>
            <!--<li>
                <label>人数：</label>
                <input type="button" value="+" class="jia addPersonCount" style="margin-right: -1px;" />
                <input type="text" style="width: 20px" value="1" id="PersonCount" />
                <input type="button" value="-" class="jia reducePersonCount" style="margin-left: -1px;" /></li>-->
        </ul>
        <ul>
            <li>
                <label style="width: 50px">电话：</label><input id="Customer_Phone" maxlength="20" type="text" style="width: 132px; margin-right: 40px; display: inline" /></li>
            <li>
                <label>出生年月：</label><input id="Customer_Birthday" type="date" style="width: 112px; margin-right: 40px; display: inline" /></li>
            <li>
                <label>性别：</label>
                <select id="Customer_Sex" style="width: 60px; margin-right: 15px; display: inline">
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select></li>
            <li>
                <label style="width: 50px">民族：</label>
                <select id="Customer_Ethnic" style="width: 158px; margin-right: 0px; display: inline">
                    <option value="汉族">汉族</option>
                    <option value="苗族">苗族</option>
                    <option value="壮族">壮族</option>
                    <option value="傣族">傣族</option>
                </select></li>
            <li>
                <label style="width: 50px">地址：</label><input id="Customer_Address" maxlength="100" type="text" style="width: 786px" /></li>
        </ul>
    </div>
    <div class="types" style="margin-top: 0px">
        <h1 style="padding-bottom: 0px; border-bottom: 1px solid #ddd;">
            <div class="fr">
                <span style="font-size: 12px;">新增随客信息</span>
                <a href="javascript:void(0)" class="sss btnOpenCustomer">展开>></a>
            </div>
        </h1>
        <div class="divOtherCustomer none">
            <table cellpadding="0" cellspacing="0" class="ruzhu">
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>出生年月</th>
                    <th>性别</th>
                    <th>民族</th>
                    <th>证件类型</th>
                    <th width="160">证件号码</th>
                    <th width="180">地址</th>
                    <th width="65">操作</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <input type="button" value="+" class="butn btnAddOtherCustomer" />
        </div>
    </div>
    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd">
        <div id="divZF">
            <ul>
                <li>
                    <label>支付方式：</label>
                    <select class="payType" name="payType" id="PayMethod" style="width: 120px; margin-right: 32px; display: inline">
                        <!--<option value="">请选择支付方式</option>-->
                        <option value="现金">现金</option>
                        <option value="支付宝">支付宝</option>
                        <option value="微信">微信</option>
                        <option value="刷卡">刷卡</option>
                    </select>
                </li>
                <li>
                    <label>押金：</label><input id="Deposit" maxlength="8" type="text" class="input_keynote prepay" style="width: 100px; margin-right: 25px; display: inline" name="prepay" /></li>
                <li style="display: none" class="prepaidpay1">
                    <label class='paytitle'>会员卡号：</label><input id="memberId" disabled="disabled" type="text" name="MemberCardNo" value="" /><a href="javascript:void(0)" onclick="payment(this)" style="padding-left: 10px; margin-top: 5px; line-height: 24px;">选择</a></li>
                <li style="color: #0788BD; padding-top: 3px; padding-left: 20px">
                    <img optag='add' src="${pageContext.request.contextPath }/resources/page/images/01.png" width="20" height="20" style="margin-right: 10px; display: inline; cursor: pointer" />
                </li>
            </ul>
        </div>
        <ul>
            <li class="bookdeposit none">
                <label>已交订金：</label><input id="BookDeposit" value="" maxlength="10" readonly="readonly" type="text" style="width: 113px; margin-right: 32px; display: inline" /></li>
            <%--<li class="">
                <label>业务员：</label>
                <select id="Salesman" style="width: 120px; margin-right: 32px; display: inline">
                    <option value="">请选择</option>
                </select>
            </li>--%>
            <li>
                <label>总房价：</label><label id="spanTotalAccount" style="width: 100px;margin-right: 25px;">0.00</label>
            </li>
            <li class="bookdeposit none">
                <!--<label>已转订金：</label><input id="ReduceDeposit" value="0.00" maxlength="10" readonly="readonly" type="text" style="width: 100px; margin-right: 0px; display: inline" />-->
            </li>
        </ul>
        <ul>
            <li>
                <label>手工单号：</label><input id="Jzsgdh" maxlength="20" type="text" style="  margin-right: 26px;  text-align: center;"/>
            </li>
            <%--<li>
                <label>床号：</label><input id="BedNo" maxlength="20" type="text" />
            </li>--%>
            <li style="width: 100%">
                <label>备注：</label><textarea id="Remark" rows="4" cols="80"></textarea></li>
        </ul>
    </div>
    <div class="types" id="divBusinessReport" style="background: #EFEFEF; border: 1px solid #ddd;display:none">
        <ul style="float: left;">

            <li style="width:100%">
                <label>支付方式：</label>
                <select style="  margin-right: 26px;  text-align: center;    width: 127px;" id="PayMent">
                    <option selected="selected" value="v">现付</option>
                    <option value="预付">预付</option>
                </select>
                <label>收款方式：</label>
                <select style="  margin-right: 26px;  text-align: center;    width: 127px;" id="EnterPayMethodName">
                    <option value="现金">现金</option>
                    <option value="支付宝">支付宝</option>
                    <option value="微信">微信</option>
                    <option value="刷卡">刷卡</option>
                </select>
            </li>
            <li style="width:100%">
                <label>佣金类别：</label>
                <select style="  margin-right: 26px;width: 127px;" id="CommissionType">
                    <option>无</option>
                    <option>网站佣金</option>
                    <option>中介佣金</option>
                    <option>销售佣金</option>
                </select>
                <label>佣金总额：</label><input id="Commission" maxlength="20" type="text" disabled="disabled" style="  margin-right: 26px; background: #eee""/>
            </li>
            <li>
                <label>售单人：</label><input id="OrderTrackerone" maxlength="20" type="text" style="  margin-right: 26px;"/>
                <label>订单人：</label><input id="OrderTrackertwo" maxlength="20" type="text" style="  margin-right: 26px;"/>
                <label>跟单人：</label><input id="OrderTrackerthree" maxlength="20" type="text" style="  margin-right: 26px;"/>
            </li>
        </ul>
    </div>

    <div class="types">
        <ul style="float: left; width: 296px;">
            <li>
                <input type="button" class="bus_add btnReadMainCustomer" value="读取二代证"  title="'~'键为读取二代证"/></li>
            <li id="ShowSign" style="display: none;">
                <input type="button" class="bus_add" id="btnSign" value="电子签名" />
                <input type="button" class="bus_add" style="display: none;" id="btnReSign" value="重新签名" />
                <img style="display: none; width: 120px; height: 40px;float:left" id="imgSign" />
            </li>
        </ul>
        <ul style="float: right; width: 390px;">
            <%--<li style="margin-top: 15px;">
                <input type="checkbox" id="chkContinue" style="border: 0px; height: 14px; width: 14px; margin-top: 3px" />
                <label style="text-align: left; line-height: 18px" for="chkContinue">&nbsp;继续开房</label></li>
            <li style="margin-top: 15px;">
                <input type="checkbox" id="chkSecret" style="border: 0px; height: 14px; width: 14px; margin-top: 3px" />
                <label style="text-align: left; line-height: 18px" for="chkSecret">&nbsp;是否保密</label></li>--%>
            <li style="">
                <input type="button" class="bus_add" id="btnSubmit" value="开房" title="回车键为直接开房"/></li>
            <li style="margin-right: 0px">
                <input type="button" class="bus_dell " id="btnClose" value="关闭" style="margin-right: 0px" /></li>
        </ul>
    </div>
    </form>
</div>

<table id="divEditRow" class="none">
    <tbody>
    <tr>
        <td>
            <input name="RowName" maxlength="25" type="text" value="" /></td>
        <td>
            <input name="RowBirthday" class="OtherCustomer_Birthday" type="date" value="" /></td>
        <td>
            <select name="RowSex">
                <option value="男">男</option>
                <option value="女</">女</option>
            </select></td>
        <td>
            <select name="RowEthnic">
                <option value="汉族">汉族</option>
                <option value="苗族">苗族</option>
                <option value="壮族">壮族</option>
                <option value="傣族">傣族</option>
            </select></td>
        <td>
            <select name="RowCardType">
                <!--<option value="">请选择</option>-->
                <option value="身份证">身份证</option>
                <option value="驾驶证">驾驶证</option>
                <option value="军官证">军官证</option>
            </select></td>
        <td>
            <input name="RowCardNo" maxlength="20" type="text" style="width: 160px" value="" /></td>
        <td>
            <input name="RowAddress" maxlength="100" type="text" style="width: 160px" value="" /></td>
        <td>
            <input type="hidden" name="RowData" />
            <input type="hidden" name="RowState" value="1" />
            <a href="javascript:void(0)" class="btnSave" onclick="RowSave(this)">
                <img src="${pageContext.request.contextPath }/resources/page/images/save.png" width="12" height="12" alt="" /></a>
            <a href="javascript:void(0)" onclick="RowDelete(this)">
                <img src="${pageContext.request.contextPath }/resources/page/images/010.gif" width="12" height="12" alt="" /></a>
        </td>
    </tr>
    </tbody>
</table>
<table id="divDetailRow" class="none">
    <tbody>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <input type="hidden" name="RowData" />
            <input type="hidden" name="RowState" value="0" />
            <%--<a href="javascript:void(0)" onclick="RowEdit(this)">
                <img src="${pageContext.request.contextPath }/resources/page/images/037.gif" width="12" height="12" alt="" /></a>
            <a href="javascript:void(0)" onclick="RowDelete(this)">
                <img src="${pageContext.request.contextPath }/resources/page/images/010.gif" width="12" height="12" alt="" /></a></td>--%>
    </tr>
    </tbody>
</table>
<input type="hidden" id="membermoney" value="">
<script>
    $(function () {

        var typeid = $("#RoomTypeId").find("option:selected").val()
        var cases = []
        $.ajax({
            url:'../../checkinfoController_getRoomCases',
            type:"POST",
            data:{
                roomTypeId:typeid
            },
            dataType:"json",
            success:function (data) {
                var cases = data
                var caseoptions = ''
                for(i in cases){
                    caseoptions += '<option weekendPrice="'+cases[i].weekendPrice+'" ordinaryPrice="'+cases[i].ordinaryPrice+'" value="'+cases[i].roomCaseId+'">'+cases[i].roomCaseName+'</option>'
                }
                $("#SchemeId").empty().append(caseoptions)
                //加载房价
                var tpr = $("#SchemeId").find("option:selected").attr("ordinaryPrice")
                var nd = new Date()
                if(nd.getDay()==6||nd.getDay()==0){
                    if($("#SchemeId").find("option:selected").attr("weekendPrice")!='')
                        tpr = $("#SchemeId").find("option:selected").attr("weekendPrice")
                }
                $("#Price").val(tpr)
                var tdd = $("#Days").val()
                //alert(tdd+";"+tpr)
                var all =parseFloat(tpr)*parseInt(tdd)
                $("#spanTotalAccount").text(all)
            }

        })
        $("#bookId").change(function () {
            var bid = $("#bookId").val()
            if(bid==null|bid==''){
                $("#bookId").val('')
                $("#bookMoney").val(0)
                return
            }
            $.ajax({
                url:"../../checkBook?bookId="+bid,
                type:"get",
                dataType:"json",
                success:function (data) {
                    //alert(1111)
                    if(data.bookId!=null&&data.bookId!=''&&data.bookId>0){
                        if(data.subscription!=null&&data.subscription!=''){
                            $("#bookMoney").val(data.subscription)
                        }
                    }else {
                        alert("预定信息不存在")
                        $("#bookId").val('')
                        $("#bookMoney").val(0)
                    }
                }
            })

        })

        $("#SchemeId").change(function () {
            var tpr = $("#SchemeId").find("option:selected").attr("ordinaryPrice")
            var nd = new Date()
            if(nd.getDay()==6||nd.getDay()==0){
                if($("#SchemeId").find("option:selected").attr("weekendPrice")!='')
                    tpr = $("#SchemeId").find("option:selected").attr("weekendPrice")
            }
            $("#Price").val(tpr)
            var tdd = $("#stayHours").val()
            var all =parseFloat(tpr)*parseInt(tdd)
            $("#spanTotalAccount").text(all)
        })
    $("#MemberCardNo").change(function () {
        var id = $("#MemberCardNo").val()
        if(id==null||id==''){
            //无回会员
            nomember()
        }
        $.ajax({
            url:"../../memberCheckinController?memberId="+id,
            type:"get",
            dataType:"json",
            success:function (data) {
                //alert(data.memberId)
                if(data.memberId!=null&&data.memberId!=''&&data.memberId>0){
                    $("#membermoney").val(data.memberRemaining)
                    $("#divZF ul:gt(0)").remove()
                    $("#divZF ul:eq(0)").find(".payType").empty()
                    $("#divZF ul:eq(0)").find(".payType").append('<option value="会员卡">会员卡</option>')
                    $("#divZF ul:eq(0) li:eq(3)").attr("hidden",true)
                }else {
                    alert("会员号码错误")
                    nomember()
                }
            }
        })

        $("#divZF").on("change","ul li:eq(1) input",function () {
            var tp = $(this).val()
            if($(this).parent().parent().find("li:eq(0) select").val()=='会员卡'){
                if(tp>$("#membermoney").val()){
                    alert("会员卡余额不足")
                    $(this).val('')
                }
            }
        })
    })

    })
    function nomember() {
        $("#MemberCardNo").val("")
        $("#divZF ul:eq(0)").find(".payType").empty()
        var text='<option value="现金">现金</option>\n' +
            '                        <option value="支付宝">支付宝</option>\n' +
            '                        <option value="微信">微信</option>\n' +
            '                        <option value="刷卡">刷卡</option>'
        $("#divZF ul:eq(0)").find(".payType").append(text)
        $("#divZF ul:eq(0) li:eq(3)").attr("hidden",false)
    }
</script>
</body>
</html>
