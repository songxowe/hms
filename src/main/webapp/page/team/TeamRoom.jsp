<%--
  Created by IntelliJ IDEA.
  User: the one
  Date: 2017/8/24 0024
  Time: 14:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>简单点酒店管理平台</title>
    <link href="${pageContext.request.contextPath }/resources/page/styles/main.css" type="text/css" rel="stylesheet"/>
    <link href="${pageContext.request.contextPath }/resources/page/styles/tch.css" type="text/css" rel="stylesheet"/>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/easyui/jquery-1.8.0.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/jquery.autocomplete.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/jquery.datetimepicker.js"></script>
    <link href="${pageContext.request.contextPath }/resources/page/Styles/jquery.autocomplete.css" rel="stylesheet"/>
    <link href="${pageContext.request.contextPath }/resources/pageStyles/jquery.datetimepicker.css" rel="stylesheet"/>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/pageScripts/public/Base.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/public/datetime.js"></script>
    <%--<script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/page/Team/TeamRoom.js"></script>--%>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/public/PagePermission.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/public/jquery.cookie.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/public/DefineBill.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath }/resources/page/Scripts/page/Team/myTeamRoom2.js"></script>
    <script type="text/javascript">
        $(function () {
            /*var data = postSynRequest("/Services/BasicService.aspx", null, "Common", "GetLogonUser");
            if (data != null && data.State.Success) {
                ControllerOrderAdd(data.Data);
            }*/
        });
    </script>
    <style type="text/css">
        /*针对会员开房时如果没有相关房价方案，提示信息的单独处理*/
        span.note_no1 {
            float: left;
            line-height: 18px;
            padding-left: 25px;
            background: url(${pageContext.request.contextPath }/resources/page/images/prompt.png) 0px -48px no-repeat;
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
<script type="text/javascript">
    function scrollDoor() {
    }

    scrollDoor.prototype = {
        sd: function (menus, divs, openClass, closeClass) {
            var _this = this;
            if (menus.length != divs.length) {
                alert("菜单层数量和内容层数量不一样!");
                return false;
            }
            for (var i = 0; i < menus.length; i++) {
                _this.$(menus[i]).value = i;
                _this.$(menus[i]).onclick = function () {

                    for (var j = 0; j < menus.length; j++) {
                        _this.$(menus[j]).className = closeClass;
                        _this.$(divs[j]).style.display = "none";
                    }
                    _this.$(menus[this.value]).className = openClass;
                    _this.$(divs[this.value]).style.display = "block";
                }
            }
        },
        $: function (oid) {
            if (typeof (oid) == "string")
                return document.getElementById(oid);
            return oid;
        }
    }
    window.onload = function () {
        var SDmodel = new scrollDoor();
        SDmodel.sd(["m01", "m02"], ["c01", "c02"], "ok", "");
    }

    function dyniframesize() {
        if (!window.opera) {
            $("#main_nu").css("height", $(document).height() - 60);
            $(".right").css("height", $(document).height() - 60);
        }
    }
</script>
<body style="overflow: hidden">
<!--团队开房-->
<div class="main " id="main_nu" style="width: 99%; margin-left: 1%; margin-bottom: 0px; overflow-y: auto">
    <div class="teamroom">
        <div class="right" style="height: 539px;">
            <ul class="first">
                <li>
                    <label>房型：</label><select id="selRoomTypes" style="width: 188px;">
                    <option value="903" data-allowhour="false">标准单间</option>
                    <option value="904" data-allowhour="false">双人间</option>
                    <option value="905" data-allowhour="true">豪华单间</option>
                    <option value="906" data-allowhour="false">基本间</option>
                </select></li>
                <li>
                    <label>房价方案：</label><select id="selRoomPriceSchemes" style="width: 188px;">
                    <option value="1319" data-roomtypeid="903" data-source="客人自入" selected="selected">无</option>

                </select></li>
                <li>
                    <label>开房方式：</label><select disabled="disabled" class="disabledcolor" id="selOpenTypes" style="width: 188px;">
                    <option selected value="天房">天房</option>
                    <%--<option value="钟点房">钟点房</option>
                    <option value="月租房">月租房</option>
                    <option value="午夜房">午夜房</option>--%>
                </select></li>
                <li style="width: 50%">
                    <label>标价：</label><input id="txtRoomPrice" type="text" value="0.00" disabled="disabled"
                                             class="disabledcolor"></li>
                <li style="width: 50%">
                    <label>折扣价：</label><input id="txtRoomDiscountPrice" type="text" value="0.00" data-price="1.00"></li>
                <%--<li>
                    <label>房间特征：</label>
                    <div id="TeamroomSelect">房间特征<span class="nones">▼</span><span class="select">▲</span></div>
                    <ul id="TeamroomBox" style="top: 162px; left: 741.2px;">
                        <li><input type="checkbox" id="ckbFeatures_30434" name="ckbFeatures" value="12"><label
                                for="ckbFeatures_30434">12</label></li>
                        <li><input type="checkbox" id="ckbFeatures_30435" name="ckbFeatures" value="1"><label
                                for="ckbFeatures_30435">1</label></li>
                        <li style="width:100%"><input type="button" value="查找" id="FeaturesSearch"
                                                      onclick="TeamRoom.FeaturesFilter()" class="qtantj"></li>
                    </ul>
                </li>--%>
            </ul>
            <ul id="ulRooms" class="second"
                style="height: 169px; overflow-y: scroll; overflow-x: hidden; border-bottom: 1px solid #b0bfe3">
                <li data-id="5400" data-roomno="11" featuresval="12" data-selected="false">11</li>
            </ul>
            <ul class="second" style="margin-bottom: 30px">
                <li class="last">
                    <p>全部房间：<label id="lblRoomCount">5</label></p>
                    <p>已选房间：<label id="lblSelectedRoomCount">0</label></p>
                    <p>最大可选：<label id="maxRoomCount">5</label></p>
                </li>
                <li class="last"><a id="aAddRooms" class="bus_add">添加</a></li>
            </ul>
        </div>
        <div class="left" style="position:absolute; height:400px; overflow:auto">
            <!--<div class="titles"><h1>团队开房</h1><p>单号：20141224050432</p></div>-->
            <div class="error">
                <div id="divErrors" class="errortips">
                    <!-- <span class="formTips note_no" id="btnRead"></span>
                    <span class="formTips note_no" id="prompt"></span>-->
                </div>
            </div>
            <div style="border: 1px solid #ddd; width: 98%; float: left; background: #f1f1f1; padding: 10px 1% 15px 1%; margin-top: 20px; position: relative">
                <p id="pBookNo"
                   style="position: absolute; border: 1px solid #ddd; top: -1px; right: 10px; padding: 5px 20px; display: none; background: #fff">
                    预订单号：<label id="lblBookNo"></label></p>
                <ul class="first">
                    <li>
                        <label>团名：</label><input id="txtTeamName" maxlength="30" type="text">
                    </li>
                    <li>
                        <label>领队姓名：</label><input id="txtLeaderName" maxlength="20" type="text"></li>
                    <li>
                        <label>领队电话：</label><input id="txtLeaderPhone" maxlength="11" type="text"></li>
                    <li>
                        <label style="">预定编号：</label>
                        <input id="bookId" type="text" value="" style="width: 70px; display: inline" />
                        <input name="bookMoney" value="0" hidden id="bookMoney" readonly type="text" />
                    </li>

                </ul>
                <ul class="first">
                    <li>
                        <label>来源：</label><select id="selCustomerSources">
                        <option value="客人自入">客人自入</option>
                        <option value="测试">测试</option>
                        <option value="[M]金卡">[M]金卡</option>
                        <option value="协议单位">协议单位</option>
                    </select></li>
                    <li id="liMemberCardNo" style="width: 488px; position: relative;">
                        <label>会员卡号：</label>
                        <div class="dis_yes" style="float:left">
                            <input id="txtMemberCardNo" maxlength="200" type="text" style="width: 370px"
                                   autocomplete="off" class="ac_input">
                            <label id="lblMemberCategoryName"
                                   style="display: none; text-align: right; position: absolute; right: 60px; top: 2px; width: 160px;">&nbsp;</label>
                        </div>
                        <div class="dis_no" style="display:none; float:left">
                            <input id="" type="text" value="酒店未开通会员功能"
                                   style="width: 370px; margin-right: 0px; display: inline" disabled="">
                            <a href="#" id="OpenModelSet"
                               style="text-align: right;color:#2eb1a9; position: absolute; right: 45px; top: 5px">开通功能</a>
                        </div>
                    </li>
                    <li id="liContractUnitName" style="width: 488px; display: none;">
                        <label>协议单位：</label><input id="txtContractUnitName" maxlength="200" type="text"
                                                   style="width: 370px">
                        <input id="hidContractUnitId" type="hidden" value="">
                    </li>
                </ul>
                <ul class="first">
                    <li>
                        <label>入住时间：</label><input id="txtEnterDate" maxlength="20" type="text" style="background: #eee"
                                                   readonly="readonly"></li>
                    <li>
                        <label>预住天数：</label>
                        <input id="btnReduceStayDays" class="jia" type="button" value="-">
                        <input id="txtStayDays" maxlength="3" type="text" value="1"
                               style="width: 66px; border-left: 0px; border-right: 0px; text-align: center">
                        <input id="btnAddStayDays" class="jia" type="button" value="+">
                    </li>
                    <li>
                        <label>预离时间：</label><input readonly id="txtLeaveDate" maxlength="20" type="text"></li>
                    <li style="display: none;">
                        <label>姓名：</label><input id="txtCustomerName" maxlength="100" type="text"></li>
                    <li style="display: none;">
                        <label>证件类型：</label><select id="selCardTypes">
                        <option value="身份证">身份证</option>
                        <option value="驾驶证">驾驶证</option>
                        <option value="士兵证">士兵证</option>
                        <option value="军官证">军官证</option>
                    </select></li>
                    <li style="display: none;">
                        <label>证件号码：</label><input id="txtCardNo" maxlength="60" type="text"></li>
                    <li style="display: none;">
                        <label>电话：</label><input id="txtCustomerPhone" maxlength="20" type="text"></li>
                    <li style="display: none;">
                        <label>出生年月：</label><input id="txtBirthDate" maxlength="10" type="text"></li>
                    <li style="display: none;">
                        <label>性别：</label><select id="selCustomerSex">
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select></li>
                    <li style="display: none;">
                        <label>名族：</label><select id="selEthnics">
                        <option value="汉族">汉族</option>
                        <option value="阿昌族">阿昌族</option>
                        <option value="白族">白族</option>
                        <option value="保安族">保安族</option>
                        <option value="布朗族">布朗族</option>
                        <option value="布依族">布依族</option>
                        <option value="朝鲜族">朝鲜族</option>
                        <option value="达斡尔族">达斡尔族</option>
                        <option value="傣族">傣族</option>
                        <option value="德昂族">德昂族</option>
                        <option value="侗族">侗族</option>
                        <option value="东乡族">东乡族</option>
                        <option value="独龙族">独龙族</option>
                        <option value="鄂伦春族">鄂伦春族</option>
                        <option value="俄罗斯族">俄罗斯族</option>
                        <option value="鄂温克族">鄂温克族</option>
                        <option value="高山族">高山族</option>
                        <option value="仡佬族">仡佬族</option>
                        <option value="哈尼族">哈尼族</option>
                        <option value="哈萨克族">哈萨克族</option>
                        <option value="赫哲族">赫哲族</option>
                        <option value="回族">回族</option>
                        <option value="基诺族">基诺族</option>
                        <option value="京族">京族</option>
                        <option value="景颇族">景颇族</option>
                        <option value="柯尔克孜族">柯尔克孜族</option>
                        <option value="拉祜族">拉祜族</option>
                        <option value="黎族">黎族</option>
                        <option value="傈僳族">傈僳族</option>
                        <option value="珞巴族">珞巴族</option>
                        <option value="满族">满族</option>
                        <option value="毛南族">毛南族</option>
                        <option value="门巴族">门巴族</option>
                        <option value="蒙古族">蒙古族</option>
                        <option value="苗族">苗族</option>
                        <option value="仫佬族">仫佬族</option>
                        <option value="纳西族">纳西族</option>
                        <option value="怒族">怒族</option>
                        <option value="普米族">普米族</option>
                        <option value="羌族">羌族</option>
                        <option value="撒拉族">撒拉族</option>
                        <option value="畲族">畲族</option>
                        <option value="水族">水族</option>
                        <option value="塔吉克族">塔吉克族</option>
                        <option value="塔塔尔族">塔塔尔族</option>
                        <option value="土族">土族</option>
                        <option value="土家族">土家族</option>
                        <option value="佤族">佤族</option>
                        <option value="维吾尔族">维吾尔族</option>
                        <option value="乌兹别克族">乌兹别克族</option>
                        <option value="锡伯族">锡伯族</option>
                        <option value="瑶族">瑶族</option>
                        <option value="彝族">彝族</option>
                        <option value="裕固族">裕固族</option>
                        <option value="藏族">藏族</option>
                        <option value="壮族">壮族</option>
                    </select></li>
                </ul>
            </div>

            <ul class="list" style="position: relative">
                <li id="m01" class="ok" value="0">入住信息</li>
                <li id="m02" value="1">住客信息</li>
            </ul>
            <div class="select_two" id="c01">
                <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <th width="70">房号</th>
                        <th width="150">房型</th>
                        <th width="90">标价</th>
                        <th width="90">折扣价</th>
                        <th>房价方案</th>
                        <th width="80">开房方式</th>
                        <th width="80">操作</th>
                    </tr>
                    </tbody>
                </table>
                <div style="height: 132px; overflow-y: scroll; width: 100%; float: left;">
                    <table id="tbSelectedRooms" cellpadding="0" cellspacing="0" style="width: 99%">
                        <tbody>
                        <!--                                <tr data-no="1">
                            <td>1010</td>
                            <td>标准单人间</td>
                            <td class="fr">128.00</td>
                            <td class="fr">300.00</td>
                            <td>标准单人间房价方案</td>
                            <td>天房</td>
                            <td>
                                <img width="9" height="9" src="${pageContext.request.contextPath }/resources/pageimages/010.gif" alt=""><span class="STYLE1"> [</span><a class="btnRowDelete" href="javascript:void(0)">删除</a><span class="STYLE1">]</span></td>
                        </tr>-->
                        <%--<tr data-no="11" data-id="" roomCaseId="" guestType="" checkType="" roomPrice="">
                            <td width="60">11</td>
                            <td width="140">标准单间</td>
                            <td class="fr" width="80">189.00</td>
                            <td class="fr" width="80">1.00</td>
                            <td>[无早]1默认方案</td>
                            <td width="70">天房</td>
                            <td width="66"><img width="9" height="9"
                                                src="${pageContext.request.contextPath }/resources/page/images/010.gif"
                                                alt=""><span class="STYLE1"> [</span><a class="btnRowDelete"
                                                                                        href="javascript:TeamRoom.removeSelectedRoom('11')">删除</a><span
                                    class="STYLE1">]</span></td>
                        </tr>--%>
                        </tbody>
                    </table>
                </div>
                <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr style="color: #0789BE">
                        <td colspan="7">
                            <p>总房数：<label id="lblSelectedRoomsCount">0</label></p>
                            <p>总房价：<label id="lblSelectedRoomsTotal">0</label></p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="select_two" id="c02" style="display: none;">
                <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <th width="70">房号</th>
                        <th width="90">姓名</th>
                        <th width="90">证件</th>
                        <th width="140">证件号码</th>
                        <th width="60">性别</th>
                        <th width="100">名族</th>
                        <th width="100">生日</th>
                        <th>地址</th>
                        <th width="80">操作</th>
                    </tr>
                    </tbody>
                </table>
                <div id="guestmsg" style="hidden">

                </div>
                <div style="height: 132px; overflow-y: scroll; width: 100%; float: left;">
                    <table id="tbCustomers" cellpadding="0" cellspacing="0" style="width: 99%">
                        <tbody>
                        <%--<tr style="display: table-row;">
                            <td width="60">
                                <select data-field="Rooms">
                                    <option value="11">11</option>
                                </select></td>
                            <td width="80">
                                <input type="text" data-field="CustomerName" maxlength="20" style="width: 70px"></td>
                            <td width="80">
                                <select data-field="CardTypes">
                                    <option value="身份证">身份证</option>
                                    <option value="驾驶证">驾驶证</option>
                                    <option value="士兵证">士兵证</option>
                                    <option value="军官证">军官证</option>
                                </select></td>
                            <td width="130">
                                <input type="text" data-field="CardNo" maxlength="30" style="width: 120px"></td>
                            <td width="50">
                                <select>
                                    <option value="男">男</option>
                                    <option value="女">女</option>
                                </select></td>
                            <td width="90">
                                <select data-field="Ethnics" style="width: 90px">
                                    <option value="汉族">汉族</option>
                                    <option value="阿昌族">阿昌族</option>
                                    <option value="白族">白族</option>
                                    <option value="保安族">保安族</option>
                                    <option value="布朗族">布朗族</option>
                                    <option value="布依族">布依族</option>
                                    <option value="朝鲜族">朝鲜族</option>
                                    <option value="达斡尔族">达斡尔族</option>
                                    <option value="傣族">傣族</option>
                                    <option value="德昂族">德昂族</option>
                                    <option value="侗族">侗族</option>
                                    <option value="东乡族">东乡族</option>
                                    <option value="独龙族">独龙族</option>
                                    <option value="鄂伦春族">鄂伦春族</option>
                                    <option value="俄罗斯族">俄罗斯族</option>
                                    <option value="鄂温克族">鄂温克族</option>
                                    <option value="高山族">高山族</option>
                                    <option value="仡佬族">仡佬族</option>
                                    <option value="哈尼族">哈尼族</option>
                                    <option value="哈萨克族">哈萨克族</option>
                                    <option value="赫哲族">赫哲族</option>
                                    <option value="回族">回族</option>
                                    <option value="基诺族">基诺族</option>
                                    <option value="京族">京族</option>
                                    <option value="景颇族">景颇族</option>
                                    <option value="柯尔克孜族">柯尔克孜族</option>
                                    <option value="拉祜族">拉祜族</option>
                                    <option value="黎族">黎族</option>
                                    <option value="傈僳族">傈僳族</option>
                                    <option value="珞巴族">珞巴族</option>
                                    <option value="满族">满族</option>
                                    <option value="毛南族">毛南族</option>
                                    <option value="门巴族">门巴族</option>
                                    <option value="蒙古族">蒙古族</option>
                                    <option value="苗族">苗族</option>
                                    <option value="仫佬族">仫佬族</option>
                                    <option value="纳西族">纳西族</option>
                                    <option value="怒族">怒族</option>
                                    <option value="普米族">普米族</option>
                                    <option value="羌族">羌族</option>
                                    <option value="撒拉族">撒拉族</option>
                                    <option value="畲族">畲族</option>
                                    <option value="水族">水族</option>
                                    <option value="塔吉克族">塔吉克族</option>
                                    <option value="塔塔尔族">塔塔尔族</option>
                                    <option value="土族">土族</option>
                                    <option value="土家族">土家族</option>
                                    <option value="佤族">佤族</option>
                                    <option value="维吾尔族">维吾尔族</option>
                                    <option value="乌兹别克族">乌兹别克族</option>
                                    <option value="锡伯族">锡伯族</option>
                                    <option value="瑶族">瑶族</option>
                                    <option value="彝族">彝族</option>
                                    <option value="裕固族">裕固族</option>
                                    <option value="藏族">藏族</option>
                                    <option value="壮族">壮族</option>
                                </select></td>
                            <td width="90">
                                <input type="text" data-field="BirthDate" maxlength="10"></td>
                            <td>
                                <input type="text" data-field="Address" maxlength="200" style="width: 180px;"></td>
                            <td width="66">
                                <img width="9" height="9" src="../images/010.gif" alt=""><span
                                    class="STYLE1"> [</span><a class="btnRowDelete"
                                                               href="javascript:void(0)">删除</a><span
                                    class="STYLE1">]</span></td>
                        </tr>
                        <tr data-row-template="true" style="display: none;">
                            <td width="60">
                                <select data-field="Rooms">
                                </select></td>
                            <td width="80">
                                <input type="text" data-field="CustomerName" maxlength="20" style="width: 70px"></td>
                            <td width="80">
                                <select data-field="CardTypes">
                                    <option value="身份证">身份证</option>
                                    <option value="驾驶证">驾驶证</option>
                                    <option value="士兵证">士兵证</option>
                                    <option value="军官证">军官证</option>
                                </select></td>
                            <td width="130">
                                <input type="text" data-field="CardNo" maxlength="30" style="width: 120px"></td>
                            <td width="50">
                                <select>
                                    <option value="男">男</option>
                                    <option value="女">女</option>
                                </select></td>
                            <td width="90">
                                <select data-field="Ethnics" style="width: 90px">
                                    <option value="汉族">汉族</option>
                                    <option value="阿昌族">阿昌族</option>
                                    <option value="白族">白族</option>
                                    <option value="保安族">保安族</option>
                                    <option value="布朗族">布朗族</option>
                                    <option value="布依族">布依族</option>
                                    <option value="朝鲜族">朝鲜族</option>
                                    <option value="达斡尔族">达斡尔族</option>
                                    <option value="傣族">傣族</option>
                                    <option value="德昂族">德昂族</option>
                                    <option value="侗族">侗族</option>
                                    <option value="东乡族">东乡族</option>
                                    <option value="独龙族">独龙族</option>
                                    <option value="鄂伦春族">鄂伦春族</option>
                                    <option value="俄罗斯族">俄罗斯族</option>
                                    <option value="鄂温克族">鄂温克族</option>
                                    <option value="高山族">高山族</option>
                                    <option value="仡佬族">仡佬族</option>
                                    <option value="哈尼族">哈尼族</option>
                                    <option value="哈萨克族">哈萨克族</option>
                                    <option value="赫哲族">赫哲族</option>
                                    <option value="回族">回族</option>
                                    <option value="基诺族">基诺族</option>
                                    <option value="京族">京族</option>
                                    <option value="景颇族">景颇族</option>
                                    <option value="柯尔克孜族">柯尔克孜族</option>
                                    <option value="拉祜族">拉祜族</option>
                                    <option value="黎族">黎族</option>
                                    <option value="傈僳族">傈僳族</option>
                                    <option value="珞巴族">珞巴族</option>
                                    <option value="满族">满族</option>
                                    <option value="毛南族">毛南族</option>
                                    <option value="门巴族">门巴族</option>
                                    <option value="蒙古族">蒙古族</option>
                                    <option value="苗族">苗族</option>
                                    <option value="仫佬族">仫佬族</option>
                                    <option value="纳西族">纳西族</option>
                                    <option value="怒族">怒族</option>
                                    <option value="普米族">普米族</option>
                                    <option value="羌族">羌族</option>
                                    <option value="撒拉族">撒拉族</option>
                                    <option value="畲族">畲族</option>
                                    <option value="水族">水族</option>
                                    <option value="塔吉克族">塔吉克族</option>
                                    <option value="塔塔尔族">塔塔尔族</option>
                                    <option value="土族">土族</option>
                                    <option value="土家族">土家族</option>
                                    <option value="佤族">佤族</option>
                                    <option value="维吾尔族">维吾尔族</option>
                                    <option value="乌兹别克族">乌兹别克族</option>
                                    <option value="锡伯族">锡伯族</option>
                                    <option value="瑶族">瑶族</option>
                                    <option value="彝族">彝族</option>
                                    <option value="裕固族">裕固族</option>
                                    <option value="藏族">藏族</option>
                                    <option value="壮族">壮族</option>
                                </select></td>
                            <td width="90">
                                <input type="text" data-field="BirthDate" maxlength="10"></td>
                            <td>
                                <input type="text" data-field="Address" maxlength="200" style="width: 180px;"></td>
                            <td width="66">
                                <img width="9" height="9" src="../images/010.gif" alt=""><span
                                    class="STYLE1"> [</span><a class="btnRowDelete"
                                                               href="javascript:void(0)">删除</a><span
                                    class="STYLE1">]</span></td>
                        </tr>--%>
                        </tbody>
                    </table>
                </div>
                <table cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr style="color: #0789BE">
                        <td colspan="9">
                            <input id="btnReadIdentityCard" class="bus_add" type="button" value="读身份证"
                                   style="margin-right: 0px; float: left"><a id="btnAddCustomer" class="butn"
                                                                             href="javascript:void(0);">+</a>
                            <p>总人数：<label id="lblCustomerCount">0</label></p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="divZF">
                <ul class="first">
                    <li>
                        <label>支付方式：</label><select style="width: 120px; margin-right: 32px; display: inline"
                                                    id="selPayMethods">
                        <option value="现金">现金</option>
                        <option value="支付宝">支付宝</option>
                        <option value="微信">微信</option>
                        <option value="刷卡">刷卡</option>
                    </select></li>
                    <li>
                        <label>押金：</label>
                        <input id="txtDeposit" name="PayAmount" maxlength="8" type="text"
                               style="width: 100px; margin-right: 25px; display: inline" value="">
                    </li>
                   <%-- <li style="width: 120px;" class="pAverageDeposit">
                        <div class="liAverageDeposit"><label>平摊押金：</label><input class="AverageDeposit"
                                                                                 style="width: 20px; height: 20px;"
                                                                                 type="checkbox"></div>
                    </li>
                    <li style="display: none" class="prepaidpay1">
                        <label class="paytitle">会员卡号：</label><input disabled="disabled" type="text" name="MemberCardNo"
                                                                    value=""><a href="javascript:void(0)"
                                                                                onclick="payment(this)"
                                                                                style="padding-left: 10px; margin-top: 5px; line-height: 24px;color: #2eb1a9;">选择</a>
                    </li>--%>
                    <li style="color: #0788BD; padding-top: 3px; padding-left: 20px">
                        <img optag="add" src="${pageContext.request.contextPath }/resources/page/images/01.png"
                             width="20" height="20" style="margin-right: 10px; display: inline; cursor: pointer">
                    </li>
                </ul>
                <%--<ul class="first">
                    <li><label>支付方式：</label><select style="width: 120px; margin-right: 32px; display: inline">
                        <option value="30288">现金</option>
                        <option value="30289">银行卡</option>
                        <option value="30290">网上支付</option>
                        <option value="-3">信用预授权</option>
                    </select></li>
                    <li><label>押金：</label><input maxlength="8" name="PayAmount" type="text" class="input_keynote"
                                                 style="width: 100px; margin-right: 25px; display: inline" value="">
                    </li>
                    <li style="width: 120px;">
                        <div class="liAverageDeposit"><label>平摊押金：</label><input class="AverageDeposit"
                                                                                 style="width:20px; height:20px;"
                                                                                 type="checkbox"></div>
                    </li>
                    <li style="display: none" class="prepaidpay"><label class="paytitle">会员卡号：</label><input
                            disabled="disabled" type="text" name="MemberCardNo" value=""><a href="javascript:void(0)"
                                                                                            onclick="payment(this)"
                                                                                            style="padding-left: 10px; margin-top: 5px; line-height: 24px;">选择</a>
                    </li>
                    <li style="color: #0788BD; padding-top: 3px; padding-left: 20px"><img opttag="add"
                                                                                          src="${pageContext.request.contextPath }/resources/page/images/01.png"
                                                                                          width="20" height="20"
                                                                                          style="margin-right:10px; display:inline; cursor:pointer">
                        <img opttag="del" src="${pageContext.request.contextPath }/resources/page/images/02.png"
                             width="20" height="20" style="cursor:pointer"></li>
                </ul>--%>
            </div>
            <ul class="first" style="display:none" id="liBookDeposit">
                <li>
                    <label>已交订金：</label><input id="txtBookDeposit" maxlength="10" type="text" value="0.00"></li>

            </ul>
            <ul class="first" style="margin-top:20px">
                <li>
                    <label>手工单号：</label><input id="ManualNumber" maxlength="20" type="text">
                </li>
                <li style="width: 688px">
                    <label>备注：</label><input id="txtRemark" maxlength="200" type="text" style="width: 570px"></li>
            </ul>
        </div>
    </div>
    <div class="teamroom_foot">
        <input id="btnSubmit" type="button" class="a_butn"/>
    </div>
</div>
<input id="hidBookId" type="hidden" value=""/>
<input id="hidBookNo" type="hidden" value=""/>
<input id="hidTeamId" type="hidden" value=""/>
<input id="txtWayPrint" type="hidden" value=""/>
<input type="hidden" id="membermoney" value="">
<script type="text/javascript">

    $(document).ready(function () {
        TeamRoom.init();
        dyniframesize();
    });
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
                        alert("订金："+data.subscription)
                    }
                }else {
                    alert("预定信息不存在")
                    $("#bookId").val('')
                    $("#bookMoney").val(0)
                }
            }
        })
    })
        $("#txtMemberCardNo").change(function () {

            var id = $("#txtMemberCardNo").val()
            if(id==null||id==''){
                //无回会员
                nomember()
            }
            $.ajax({
                url:"../../memberCheckinController?memberId="+id,
                type:"get",
                dataType:"json",
                success:function (data) {

                    if(data.memberId!=null&&data.memberId!=''&&data.memberId>0){
                        $("#membermoney").val(data.memberRemaining)
                        $("#divZF ul:gt(0)").remove()
                        $("#divZF ul:eq(0)").find("select").empty()
                        $("#divZF ul:eq(0)").find("select").append('<option value="会员卡">会员卡</option>')
                        $("#divZF ul:eq(0) li:eq(2)").attr("hidden",true)
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

    function nomember() {
        $("#txtMemberCardNo").val("")
        $("#divZF ul:eq(0)").find("select").empty()
        var text='<option value="现金">现金</option>\n' +
            '                        <option value="支付宝">支付宝</option>\n' +
            '                        <option value="微信">微信</option>\n' +
            '                        <option value="刷卡">刷卡</option>'
        $("#divZF ul:eq(0)").find("select").append(text)
        $("#divZF ul:eq(0) li:eq(2)").attr("hidden",false)
    }
</script>
</body>
</html>

