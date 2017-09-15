<%--
  Created by IntelliJ IDEA.
  User: Yuan
  Date: 2017/8/21
  Time: 14:33
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
    <script type="text/javascript" src="../Scripts/jquery.autocomplete.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.datetimepicker.js"></script>
    <link href="../Styles/jquery.autocomplete.css" rel="stylesheet" />
    <link href="../Styles/jquery.datetimepicker.css" rel="stylesheet" />
    <script type="text/javascript" src="../Scripts/public/Base.js"></script>
    <script type="text/javascript" src="../Scripts/public/datetime.js"></script>
    <script type="text/javascript" src="../Scripts/page/Member/vip_membercard.js"></script>
    <script type="text/javascript" src="../Scripts/public/DefineBill.js"></script>
    <link href="../Scripts/layer/skin/layer.css" rel="stylesheet" />
    <script src="../Scripts/layer/layer.js"></script>
</head>
<body>
<!--楼层弹出窗口-->
<div class="vip_infor" style="width: 600px">
    <div class="line">
        <div class="fl" id="divfa">会员发卡</div>
        <div class="errortips" id="btnRead"></div>
        <input type="hidden" id="CardInfoId" />
        <input type="hidden" id="CardFees" />
        <input type="hidden" id="Price" />
        <input type="hidden" id="OpenAmount" />
        <input type="hidden" id="PrepaidEnable" />
    </div>
    <div class="types" id="CAdd" style="margin-top: 0px">
        <ul>
            <li>
                <label>会员卡号：</label>
                <input type="text" class="txt inps" id="MemberCardNo" maxlength="20" />
            </li>
            <li>
                <input type="button" class="credit" value="查询" id="btnSearch" />
                <input type="button" class="credit " value="读卡" id="btnReadCard" />
                <input type="button" class="credit " value="写卡" id="btnWriteCard" />
                <input type="button" class="credit " value="清卡" id="btnClearCard" />
            </li>
        </ul>
    </div>
    <div class="types" id="CEdit" style="margin: 0px">
        <ul>
            <li>
                <label>卡号：</label>
                <span style="width: 120px" class="txt inps" id="CCardNo">0</span>
            </li>
        </ul>
    </div>
    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd; margin-top: 0px">
        <ul>
            <li>
                <label style="width: 70px">姓名：</label>
                <input type="text" class="txt inps" style="width: 100px" id="Name" maxlength="20" />
            </li>
            <li>
                <label>性别：</label>
                <select class="txt" style="width: 86px" id="Sex">
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </li>
            <li>
                <label style="width: 70px">证件：</label>
                <select style="width: 98px" id="CardType">
                </select>
            </li>
            <li>
                <label style="width: 70px">证件号码：</label><input type="text" class="inps txt" style="width: 100px; margin-right:0px"
                                                               id="CardNo" maxlength="20" />
                <img src="../Images/scanner_iden.png" id="ReadCard" style="float: left;margin-right: 10px;height: 20px;margin-top: 2px;"
                     alt="读卡" title="读取身份证" />
            </li>
            <li>
                <label>类型：</label>
                <select class="txt" style="width: 86px;" id="CategoryId" onchange="CategoryType()">
                </select>
            </li>
            <li>
                <label style="width: 70px">销售员：</label>
                <select class="" style="width: 98px" id="SalerId">
                </select>
            </li>
            <li>
                <label style="width: 70px">手机号码：</label>
                <input type="text" class="inps txt" style="width: 100px" id="Phone" maxlength="11" />
            </li>
            <li>
                <label>生日：</label>
                <input type="text" class="inps txt" style="width: 78px" id="BirthDay" />
            </li>

            <li class="LiIsAddNewMemberInfo" style="display:none">
                <label style="width: 70px;" >新建资料：</label>
                <input type="checkbox" class="inps txt" style="margin-right: 10px;"  id="IsAddNewMemberInfo" />
                <label style="width: 30px;padding: 0;text-align: left;color:#0789BE;text-decoration: underline;" id="AddNewMemberInfoNote">说明</label>
            </li>

            <li id="pwdhide">
                <label style="width: 70px">卡密码：</label>
                <input type="password" class="inps " style="width: 92px;" id="Password" maxlength="15" />
            </li>
            <li style="width: 100%">
                <label style="width: 70px">喜好：</label>
                <input type="text" class="inps" style="width: 500px" id="Love" maxlength="100" />
            </li>
            <li style="width: 100%">
                <label style="width: 70px">地址：</label>
                <input type="text" class="inps" style="width: 500px" id="Address" maxlength="100" />
            </li>
            <li style="width: 100%">
                <label style="width: 70px">备注：</label>
                <input type="text" class="inps" style="width: 500px" id="Remark" maxlength="100" />
            </li>
        </ul>
    </div>
    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd" id="ShowMd">
        <ul>
            <li>
                <label style="width: 70px">支付方式：</label>
                <select class="txt" style="width: 100px" id="PayMethod">
                </select>
            </li>
            <li>
                <label style="width: 70px">收款金额：</label>
                <input type="text" class="txt inps" style="width: 70px" id="Amount" maxlength="10" />
                <input type="hidden" id="OrginAmount" maxlength="10" />
                <input type="hidden" id="OrginCardFee" maxlength="10" />
                <!--                   <label style="color: #0788bd;">说明：收款金额是卡费</label>-->
            </li>

            <li>
                <label style="width: 70px">充值金额：</label>
                <input type="text" class="inps" style="width: 70px" id="TopAmount" maxlength="10" disabled="disabled" />
            </li>
            <li>
                <label style="width: 70px">赠送积分：</label>
                <input type="text" class="inps" style="width: 96px" id="GiveScore" maxlength="10" disabled="disabled" />
            </li>
            <li>
                <label style="width: 107px">手工单号：</label>
                <input type="text" class="inps" style="width:70px" id="ManualNumber" maxlength="20" />
            </li>
            <li id="cardfeezr">
                <label style="width: 107px">卡费转入房账：</label>
                <input type="checkbox"  id="IsZrFz" />
            </li>

            <li style="width:90%;display:none;" id="zfzroom">
                <label style="width: 70px">转入房号：</label>
                <input type="text" class="inps" style="width: 450px" id="ZfzRoomNo" maxlength="10"  />
                <input type="hidden" id="zfzOrderId" />
                <input type="hidden" id="zfzOrderNo" />
            </li>
        </ul>
    </div>
    <div class="types" id="showDiv">
        <ul>
            <li>
                <label>&nbsp;&nbsp;总积分：</label>
                <span style="width: 90px" class="txt inps" id="TotalScore">0.00</span>
            </li>
            <li>
                <label>兑换积分：</label>
                <span style="width: 80px" class="txt inps" id="UsedScore">0.00</span>
            </li>
            <li>
                <label>剩余积分：</label>
                <span style="width: 80px" class="inps" id="UsableScore">0.00</span>
            </li>
            <li>
                <label>冻结积分：</label>
                <span style="width: 90px" class="txt inps" id="FrozenScore">0.00</span>
            </li>
            <li>
                <label>&nbsp;&nbsp;总储值：</label>
                <span style="width: 80px" class="txt inps" id="TotalAmount">0.00</span>
            </li>
            <li>
                <label>消费储值：</label>
                <span style="width: 80px" class="inps" id="UsedAmount">0.00</span>
            </li>
            <li>
                <label>储值余额：</label>
                <span style="width: 90px" class="txt inps" id="UsableAmount">0.00</span>
            </li>
            <li>
                <label>消费次数：</label>
                <span style="width: 80px" class="txt inps" id="ConsumeTimes">0.00</span>
            </li>
            <li>
                <label>消费金额：</label>
                <span style="width: 80px" class="inps" id="ConsumeAmount">0.00</span>
            </li>
            <li>
                <label>卡片状态：</label>
                <span style="width: 90px" class="txt inps" id="StatusName">&nbsp;</span>
            </li>
            <li>
                <label>发卡时间：</label>
                <span style="width: 80px" class="txt inps" id="OpenDate">&nbsp;</span>
            </li>
            <li>
                <label>有效时间：</label>
                <span style="width: 80px" class="inps" id="ExprieDate">&nbsp;</span>
            </li>
        </ul>
    </div>
    <div class="types">
        <ul style="float: right; width: 380px">
            <li id="ShowFee">
                <input type="checkbox" class="inps" id="NoCardFee" name="NoCardFee" value="1" onchange="BtnCardFee()" style="border: 0px; margin-top: 6px" />&nbsp;免卡费
            </li>
            <li id="ShowName">
                <input type="checkbox" class="inps" id="NoName" name="NoName" value="1" style="border: 0px; margin-top: 6px;" />&nbsp;发不计名卡
            </li>
            <li>
                <input type="button" class="bus_add " value="会员发卡" id="BtnSave" />
            </li>
            <li style="margin-right: 0px">
                <input type="button" id="BtnDel" class="bus_dell " value="关闭" style="margin-right: 0px" />
            </li>
        </ul>
    </div>
</div>
</body>
</html>

