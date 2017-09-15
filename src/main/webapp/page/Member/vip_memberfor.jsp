<%--
  Created by IntelliJ IDEA.
  User: Yuan
  Date: 2017/8/21
  Time: 14:34
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
    <link href="../Styles/jquery.autocomplete.css" rel="stylesheet" />
    <script type="text/javascript" src="../Scripts/easyui/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.autocomplete.min.js"></script>
    <script type="text/javascript" src="../Scripts/public/Base.js"></script>
    <script type="text/javascript" src="../Scripts/page/Member/vip_memberfor.js"></script>
</head>
<body>
<div class="ruzhu_infor" style="width: 860px">

    <div class="line">
        <div class="fl">积分兑换</div>
        <div class="errortips" id="divErrorTips"></div>
        <input type="hidden" id="CardId" />
        <input type="hidden" id="CCardNo" />
        <input type="hidden" id="TotalNum" />
        <input type="hidden" id="TotalPrice" />
    </div>
    <div class="types" id="CAdd">
        <ul>
            <li>
                <label>卡号：</label><input type="text" class="txt inps" id="CardNo" maxlength="20" /></li>
            <li>
                <input type="button" class="credit" value="查询" id="btnSearch" />
                <input type="button" class="credit " value="读卡" id="btnReadCard" />
                <input type="button" class="credit " value="写卡" id="btnWriteCard" style="display:none;"/>
                <input type="button" class="credit " value="清卡" id="btnClearCard" style="display:none;"/>
            </li>
        </ul>
    </div>
    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd">
        <ul>
            <li style="margin-right: 30px; display: inline">
                <label>姓&nbsp;&nbsp;名：</label>
                <span style="width: 120px; float: left; line-height: 24px;" class="txt inps" id="MemberName">&nbsp;</span>
            </li>
            <li style="margin-right: 30px; display: inline">
                <label style="width: 70px">手机号码：</label>
                <span style="width: 120px; float: left; line-height: 24px;" class="txt inps" id="Phone">&nbsp;</span>
            </li>
            <li style="margin-right: 30px; display: inline">
                <label>类&nbsp;&nbsp;&nbsp;型：</label>
                <span style="width: 120px; float: left; line-height: 24px;" class="txt inps" id="CategoryName">&nbsp;</span>
            </li>
        </ul>
    </div>

    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd">
        <ul>
            <li style="margin-right: 38px; display: inline">
                <label>总&nbsp;积&nbsp;分：</label><p id="TotalScore">0.00</p>
            </li>
            <li style="margin-right: 38px; display: inline">
                <label>兑换积分：</label><p id="UsedScore">0.00</p>
            </li>
            <li style="margin-right: 38px; display: inline">
                <label>剩余积分：</label><p id="UsableScore">0.00</p>
            </li>
            <li style="margin-right: 0px; display: inline">
                <label>冻结积分：</label><p id="FrozenScore">0.00</p>
            </li>

            <li style="margin-right: 38px; display: inline">
                <label>总&nbsp;储&nbsp;值：</label><p id="TotalAmount">0.00</p>
            </li>
            <li style="margin-right: 38px; display: inline">
                <label>消费储值：</label><p id="UsedAmount">0.00</p>
            </li>
            <li style="margin-right: 38px; display: inline">
                <label>储值余额：</label><p id="UsableAmount">0.00</p>
            </li>
            <li style="margin-right: 0px; display: inline">
                <label>发卡时间：</label><p id="OpenDate">&nbsp;</p>
            </li>


            <li style="margin-right: 38px; display: inline">
                <label>消费次数：</label>
                <p id="ConsumeTimes">0.00</p>
            </li>
            <li style="margin-right: 38px; display: inline">
                <label>消费金额：</label><p id="ConsumeAmount">0.00</p>
            </li>
            <li style="margin-right: 38px; display: inline">
                <label>卡片状态：</label><p id="Status">&nbsp;</p>
            </li>
            <li style="margin-right: 0px; display: inline">
                <label>有效时间：</label><p id="ExprieDate">&nbsp;</p>
            </li>

        </ul>
    </div>

    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd">
        <ul>
            <li style="margin-right: 30px; display: inline">
                <label style="width: 100px">编号/拼音码：</label><input type="text" id="ProductName" style="width: 260px" placeholder="输入编号/拼音码,直接回车录入" /></li>
            <li style="margin-right: 30px; display: inline">
                <label style="width: 60px">单价：</label><input type="text" id="Price" readonly="readonly" style="width: 80px" /></li>
            <li style="margin-right: 30px; display: inline">
                <label style="width: 60px">数量：</label><input type="text" id="Number" value="1" style="width: 60px" /></li>
            <li>
                <input type="hidden" id="ProductId" value="" />
                <input type="hidden" id="Code" value="" />
                <input type="hidden" id="Unit" value="" />
                <input type="hidden" id="Score" value="" />
                <input type="button" class="qtantj " value="加入" id="btnAdd" />
            </li>
        </ul>
    </div>

    <div class="types">
        <div style="width: 100%; background: #00ADEF; float: left">
            <table cellpadding="0" cellspacing="0" class="ruzhu" style="width: 98%;">
                <tbody>
                <th width="8%">编号</th>
                <th width="18%">商品名称</th>
                <th width="12%">单位</th>
                <th width="10%">单价</th>
                <th width="10%">兑换积分</th>
                <th width="14%">数量</th>
                <th width="8%">金额</th>
                <th width="8%">总积分</th>
                <th width="12%">操作</th>
                </tbody>
            </table>
        </div>
        <div class="gundong" style="height: 125px">
            <table cellpadding="0" cellspacing="0" class="ruzhu tbProducts">
                <tbody>
                <tr>
                    <td width="8%"></td>
                    <td width="18%"></td>
                    <td width="12%"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="14%"></td>
                    <td width="8%" style="text-align: right" class="RowAmount"></td>
                    <td width="8%" style="text-align: right" class="RowScore"></td>
                    <td width="12%"></td>
                </tr>
                <tr>
                    <td width="8%"></td>
                    <td width="18%"></td>
                    <td width="12%"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="14%"></td>
                    <td width="8%" style="text-align: right" class="RowAmount"></td>
                    <td width="8%" style="text-align: right" class="RowScore"></td>
                    <td width="12%"></td>
                </tr>
                <tr>
                    <td width="8%"></td>
                    <td width="18%"></td>
                    <td width="12%"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="14%"></td>
                    <td width="8%" style="text-align: right" class="RowAmount"></td>
                    <td width="8%" style="text-align: right" class="RowScore"></td>
                    <td width="12%"></td>
                </tr>
                <tr>
                    <td width="8%"></td>
                    <td width="18%"></td>
                    <td width="12%"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="14%"></td>
                    <td width="8%" style="text-align: right" class="RowAmount"></td>
                    <td width="8%" style="text-align: right" class="RowScore"></td>
                    <td width="12%"></td>
                </tr>
                <tr>
                    <td width="8%"></td>
                    <td width="18%"></td>
                    <td width="12%"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="14%"></td>
                    <td width="8%" style="text-align: right" class="RowAmount"></td>
                    <td width="8%" style="text-align: right" class="RowScore"></td>
                    <td width="12%"></td>
                </tr>
                <tr>
                    <td width="8%"></td>
                    <td width="18%"></td>
                    <td width="12%"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="14%"></td>
                    <td width="8%" style="text-align: right" class="RowAmount"></td>
                    <td width="8%" style="text-align: right" class="RowScore"></td>
                    <td width="12%"></td>
                </tr>
                <tr>
                    <td width="8%"></td>
                    <td width="18%"></td>
                    <td width="12%"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="14%"></td>
                    <td width="8%" style="text-align: right" class="RowAmount"></td>
                    <td width="8%" style="text-align: right" class="RowScore"></td>
                    <td width="12%"></td>
                </tr>
                <tr>
                    <td width="8%"></td>
                    <td width="18%"></td>
                    <td width="12%"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="10%" style="text-align: right"></td>
                    <td width="14%"></td>
                    <td width="8%" style="text-align: right" class="RowAmount"></td>
                    <td width="8%" style="text-align: right" class="RowScore"></td>
                    <td width="12%"></td>
                </tr>
                </tbody>
            </table>
        </div>
        <table cellpadding="0" cellspacing="0" class="ruzhu">
            <tbody>
            <tr>
                <td colspan="9" style="text-align: right"><b id="TotalNumber">共 0 件</b><b></b><b></b>
                    <b id="ZTotalScore">积分：0</b><b></b><b></b><b></b></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="types" style="margin-top: 0px">
        <ul style="float: right; width: 184px">
            <li>
                <input type="button" class="bus_add " value="积分兑换" id="btnSubmit" /></li>
            <li style="margin-right: 0px">
                <input type="button" class="bus_dell " value="关闭" id="btnClose" style="margin-right: 0px" /></li>
        </ul>
    </div>
</div>
<table id="tbItem" style="display: none;">
    <tbody>
    <tr>
        <td width="8%"></td>
        <td width="18%"></td>
        <td width="12%"></td>
        <td width="10%" style="text-align: right"></td>
        <td width="10%" style="text-align: right"></td>
        <td width="14%">
            <input type="button" value="-" class="jia reduceProductNumber" style="margin-right: -1px; height: 26px" /><input type="text" name="RowNumber" class="ProductNumber" style="width: 40px" value="1" /><input type="button" value="+" class="jia addProductNumber" style="margin-left: -1px; height: 26px" />
        </td>
        <td width="8%" style="text-align: right" class="RowAmount"></td>
        <td width="8%" style="text-align: right" class="RowScore"></td>
        <td width="12%">
            <input type="hidden" value="" name="RowId" /><input type="hidden" value="" name="RowPrice" /><input type="hidden" value="" name="RowScore" /><img src="../images/010.gif" width="9" height="9" /><span class="STYLE1">[</span><a href="javascript:void(0)" class="btnRowDelete">删除</a><span class="STYLE1">]</span></td>
    </tr>
    </tbody>
</table>
</body>
</html>

