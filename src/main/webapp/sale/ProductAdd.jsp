<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp" %>
    <link href="${pageContext.request.contextPath }/resources/sale/css/main.css" type="text/css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath }/resources/sale/css/tch.css" type="text/css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath }/resources/sale/css/jquery.autocomplete.css" rel="stylesheet" />
    <%--<link href="${pageContext.request.contextPath }/resources/sale/css/bootstrap.min.css" rel="stylesheet" />

    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/sale/js/jquery.autocomplete.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/sale/js/Base.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/sale/js/frontop_productfeeadd.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/sale/js/DefineBill.js"></script>--%>


</head>
<body>
<!--楼层弹出窗口-->
<div class="ruzhu_infor" style="width: 860px">
    <div class="line">
        <div class="fl">商品入账</div>
        <div class="errortips" id="divErrorTips"></div>
        <div class="fr" style="margin-left: 20px;">入住单号：<span id="OrderNo">${checkinfo.checkId}</span></div>

    </div>
    <div class="types">
        <ul>
            <li style="margin-right: 42px; display: inline">
                <label style="width: 50px">房号：</label><p class="RoomNo">${room.roomNo}</p>
            </li>
            <li style="margin-right: 42px; display: inline">
                <label>房间类型：</label><p class="RoomTypeName">${room.roomType.roomTypeName}</p>
            </li>
            <li style="margin-right: 42px; display: inline">
                <label>客人姓名：</label><p class="Customer_Name">${guest.guestName}</p>
            </li>
            <li style="margin-right: 0px; display: inline">
                <label>入住时间：</label><p class="EnterDate"><fmt:formatDate value="${checkinfo.inTime}" pattern="yyyy-MM-dd HH:mm"/> </p>
            </li>
            <li style="margin-right: 42px; display: inline">
                <label style="width: 50px">来源：</label><p class="Source">${checkinfo.guestType}</p>
            </li>
            <li style="margin-right: 42px; display: inline">
                <label>开房方式：</label><p class="OpenTypeName">${checkinfo.checkType} </p>
            </li>
            <li style="margin-right: 42px; display: inline">
                <label>房价方案：</label><p class="SchemeName">${checkinfo.roomCase.roomCaseName}</p>
            </li>
            <li style="margin-right: 0px; display: inline">
                <label>消费金额：</label><p class="TotalFee">daiding</p>
            </li>
        </ul>
    </div>

    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd">
        <ul>
            <li style="margin-right: 30px; display: inline">
                <label style="width: 92px">商品：</label>
                <select id="productSelect">

                </select>
            </li>
            <input type="hidden" id="productIdToTable" value="">
            <li style="margin-right: 30px; display: inline">
                <label style="width: 60px">商品类型：</label>
                <input type="text" id="productType" readonly="readonly" value="请选择商品" style="width: 80px" />

            </li>
            <li style="margin-right: 30px; display: inline">
                <label style="width: 60px">单价：</label>
                <input type="text" id="productPrice" readonly="readonly" value="请选择商品" style="width: 80px" />
            </li>
            <li style="color: #0788BD; padding-top: 3px; padding-left: 20px">
                <img optag='add' id="imgAdd" src="${pageContext.request.contextPath }/resources/sale/img/01.png" width="20" height="20" style="margin-right: 10px; display: inline; cursor: pointer" />
            </li>
        </ul>

        <ul>
        <li style="margin-right: 128px; display: inline">

        </li>
        <li style="display:inline">

        </li>
    </ul>
    </div>

    <div class="types">
        <div style="width: 100%; background: #00ADEF; float: left">
            <table cellpadding="0" cellspacing="0" class="ruzhu" style="width: 98%;">
                <tbody>
                <th width="60">编号</th>
                <th>商品名称</th>
                <th width="60">单位</th>
                <th width="80">单价</th>
                <th>数量</th>
                <th width="90">金额</th>

                <th width="100">操作</th>
                </tbody>
            </table>
        </div>
        <div class="gundong">
            <table cellpadding="0" cellspacing="0" class="ruzhu tbProducts">
                <tbody id="productList">
                </tbody>
            </table>
        </div>
        <div style="width: 100%; float: left; border: 1px solid #ddd; border-top: 0px">
            <table cellpadding="0" cellspacing="0" class="ruzhu" style="width: 98%; border: 0px;">
                <tbody>
                <tr>
                    <td width="50" style="border: 0;color:red" colspan="3"></td>
                    <!--  <td style="border: 0;"></td>
                      <td width="70" style="border: 0;"></td>-->
                    <td width="150" style="text-align: right; border: 0;">合计：</td>
                   <%-- <td width="130" style="border: 0;">共 <span id="TotalNumber">0</span>件</td>--%>
                    <td width="80" style=" border: 0;" ><span id="TotalAmount">0</span>元</td>
                    <td width="80" style="text-align: right; font-weight: bold; border: 0;" class="RowScore none" id="TotalScore"></td>
                    <td width="90" style="border: 0;"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="types" style="margin-top: 0px">
        <ul style="float: left; width: 560px">
            <li style="margin-right: 20px; display: inline">
                <label>支付方式：</label>
                <select style="width: 100px" id="PayMethod">
                    <option value="">入账</option>
                </select></li>
            <li>
                <label>备注：</label><input type="text" id="Remark" style="width: 210px" /></li>
        </ul>
        <ul style="float: right; width: 284px">
           <li>
                <input type="button" class="bus_add " id="btnSubmit" value="确认" />
           </li>
            <li style="margin-right: 0px">
                <input type="button" class="bus_dell " id="btnClose" value="关闭" style="margin-right: 0px" /></li>
        </ul>
    </div>
</div>


<script>
    $(function () {
        /* $("#productList").on("change","tr td:eq(4) input",function () {
             alert(4)
             var p = $.trim($(this).parent().parent().find("td:eq(3)").text())
             var n = $(this).val()
             var s;
             if(p!=null&&p!=''&&n!=null&&n!=''){
                 s = parseInt(n)*parseFloat(p)
             }
             $(this).parent().parent().find("td:eq(5)").text(s)
         })*/
        //页面加载完成后获取所有的商品
        $.ajax({
            type: 'POST',
            url: "../../productOfSale",
            data: {},
            success: function (data) {
                $("#productSelect").empty();
                var text = "";
                text += "<option value=\"\">请选择</option>"
                $.each(data, function (i) {
                    text += "<option value=\"" + data[i].productId + "\">" + data[i].productName + "</option>"
                })
                $("#productSelect").append(text);


            },
            dataType: "JSON"
        }),

//选择商品，改变类型和价格
            $("#productSelect").change(function () {
                // alert("-----"+ $("#productSelect").val())
                $.ajax({
                    type: 'POST',
                    url: "../../productOfSaleById",
                    data: {"productId": $("#productSelect").val()},
                    success: function (data) {

                        $("#productType").attr("value", "" + data.productType + "")
                        $("#productPrice").attr("value", "￥：" + data.productPrice + "")
                        $("#productIdToTable").attr("value", "" + $("#productSelect").val() + "")
                    },
                    dataType: "JSON"
                })
            }),

            //单击+添加商品到表格
            $("#imgAdd").click(function () {
                if ($("#productSelect").val() != null) {
                    // alert("click")
                    $.ajax({
                        type: 'POST',
                        url: "../../productOfSaleById",
                        data: {"productId": $("#productSelect").val()},
                        success: function (data) {
                            //alert(data)
                            var text = "";
                            text += " <tr id='tr" + data.productId + "'>"
                            text += "<td width=\"50\">" + data.productId + ""
                            text += "<td>" + data.productName + "</td>"
                            text += " <td width=\"60\">单位</td>"
                            text += "  <td width=\"75\" style=\"text-align: right\">" + data.productPrice + "</td>"
                            text += "  <td width=\"120\">"
                            text += "<input type=\"number\" value = '1' onchange='sale_obj.chagne(this)' id =\"productSaleNum" + data.productId + "\" min='1'>"
                            text += "</td>"
                            text += " <td width=\"80\"  style=\"text-align: right\" class=\"RowAmount\" id =\"productSaleSum" + data.productId + "\">" + data.productPrice + "</td>"
                            text += "  <td width=\"90\" ><a href='#' onclick='sale_obj.remove(" + data.productId + ")'>删除</a></td>"
                            text += "  </tr>"
                            $("#productList").append(text);
                            getSumMoney();
                            // getSumNum();
                        },
                        dataType: "JSON"
                    })
                }
                if ($("#productSelect").val() == null || $("#productSelect").val() == '') {
                    $.messager.alert('消息', '选中商品后才能添加......', 'info');
                    return;
                }

            }),


            sale_obj = {
                //数量改变
                chagne: function (state) {
                    alert(4)
                    var p = $.trim($(state).parent().parent().find("td:eq(3)").text())
                    var n = $(state).val()
                    var s;
                    if (p != null && p != '' && n != null && n != '') {
                        s = parseInt(n) * parseFloat(p)
                    }
                    $(state).parent().parent().find("td:eq(5)").text(s)
                    getSumMoney();
                    //getSumNum()

                    /*alert("state" + state)
                    $.ajax({
                        type: 'POST',
                        url: "../../productOfSaleById",
                        data: {"productId": state},
                        success: function (data) {
                           var price = data.productPrice;
                           var num = $("#productSaleNum"+state).val();

                           sum = price * num;
                            $("#productSaleSum"+state).text(sum)
                            getSumNum();
                            getSumMoney();
                        },
                        dataType: "JSON"
                    })*/

                },


                //移除选中的
                remove: function (state) {
                    //alert("state" + state)
                    $("#tr" + state + "").remove();
                    //getSumNum();// 有问题
                    getSumMoney();

                }


            }


        //提交
        $("#btnSubmit").click(function () {
            $.ajax({
                type: 'POST',
                url: "../../productOfSaleById",
                data: {"productId": state},
                success: function (data) {
                }


            })

        })

        //计算总金额
        function getSumMoney() {
            var count = 0
            $("#productList tr").each(function () {
                var tc = $(this).find("td:eq(5)").text()
                alert(tc)
                if (tc != null && tc != '' && tc > 0) {
                    count += parseInt(tc);
                }
            })
            $("#TotalAmount").text(count)
        }


        //计算总数量
        function getSumNum() {
            alert(444)
            var sumNum = 0;
            $("#productList tr").each(function () {
                var num = $(this).find("td:eq(4) input").val()
                alert(num + "num")
                if (num != null && num != '' && num > 0) {
                    sumNum += parseInt(num);
                }
            })
            alert(sumNum + "summum")
            alert(str)
            $("#TotalNumber").text(str)
            //$("#TotalNumber").text("共"+sumNum+ "件")
        }

</script>

</body>
</html>
