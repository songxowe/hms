var PaymentCheckOk = undefined;
var Set_WayPrint = undefined;
var AuthInputShopInfo = undefined;//商品录入时输入负数需要授权
var IsAuthInputShopInfo = false;//商品负数时是否已经授权
$(function () {
    var productOptions = {
        minChars: 0,
        width: 360,
        matchContains: true,
        mustMatch: true,
        max: null,
        formatItem: function (row, rowNum, rowCount, searchItem) {
            return "<span style='width:60px;display:inline-block'>" + row.Code + "</span><span style='width:140px;display:inline-block'>" + row.Name + "</span><span style='width:60px;display:inline-block;text-align:right;'>" + row.Price + "</span><span style='width:60px;display:inline-block;text-align:right;'>" + row.Score + "</span>";
        },
        formatMatch: function (row, rowNum, rowCount) {
            return row.Code + row.Name + row.CName;
        },
        formatResult: function (row, rowNum, rowCount) {
            return row.Name;
        }
    };

    var orderId = getQueryParam("id");
    postRequest("/services/basicservice.aspx", { Id: orderId }, "RZXX", "ProductFeeAddInit", false, function (data) {
        if (data.State.Success) {
            $("#OrderNo").html(data.Data.Order.OrderNo);
            if (data.Data.Order.MemberCardNo != "") {
                $("#divMemberCardNo").show();
                $("#MemberCardNo").html(data.Data.Order.MemberCardNo);
                $("#UsableScore").html(data.Data.UsableScore);
                $("#FrozenScore").html(data.Data.FrozenScore);
                $("#SPFLId").val(data.Data.SPFLId);
                $("#DiscountPrice").val(data.Data.DiscountPrice);
                $("#SPDiscountValue").val(data.Data.SPDiscountValue);
                $("#UsableAmount").html(data.Data.UsableAmount);
                $(".RowScore").removeClass('none');
                if ((data.Data.SPFLId != "" && data.Data.DiscountPrice != "") || (data.Data.SPDiscountValue != "0" && data.Data.SPDiscountValue != "0.00")) {
                    $(".RowDiscount").removeClass('none');
                }
            }
            else {
                $("#divMemberCardNo").hide();
            }
            $(".RoomNo").html(data.Data.Order.RoomNo);
            $(".RoomTypeName").html(data.Data.Order.RoomTypeName);
            $(".Customer_Name").html(data.Data.Order.CustomerName);
            $(".EnterDate").html(data.Data.Order.StrEnterDate);
            $(".Source").html(data.Data.Order.CustomerSource);
            $(".OpenTypeName").html(data.Data.Order.OpenTypeName);
            $(".SchemeName").html(data.Data.Order.SchemeName == "" ? "无" : data.Data.Order.SchemeName);
            $(".TotalFee").html(data.Data.TotalFee);
            //绑定支付方式
            if (data.Data.PayMethods != null && data.Data.PayMethods.length > 0) {
                for (var i = 0; i < data.Data.PayMethods.length; i++) {
                    var item = data.Data.PayMethods[i];
                    $("#PayMethod").append('<option value="' + item.Id + '">' + item.Name + '</option>');
                }
            }
            //绑定商品选择框
            if (data.Data.Products != null && data.Data.Products.length > 0) {
                $("#ProductName").autocomplete(data.Data.Products, productOptions);
                $("#ProductName").result(function (event, data, formatted) {
                    if (data != undefined) {
                        $("#ProductId").val(data.Id);
                        $("#Price").val(data.Price);
                        $("#Code").val(data.Code);
                        $("#Unit").val(data.Unit);
                        $("#Score").val(data.Score);
                        $("#iSPFL").val(data.iSPFL);
                        $("#Number").focus();
                        $("#btnAdd").click();
                    }
                });
                $("#ProductName").change(function () {
                    if (this.value == "") {
                        $("#ProductId").val("");
                        $("#Price").val("");
                    }
                });
                $("#ProductName").keyup(function () {
                    if ($(this).val() == "") {
                        $("#ProductId").val("");
                        $("#Price").val("");
                    }
                });
            }
            if (data.Data.Order.Status == 40) {
                $("#PayMethod option:first").remove();
            }
            Set_WayPrint = data.Data.Set_WayPrint;//打印方式
            AuthInputShopInfo = data.Data.AuthInputShopInfo;
            $("body").data("DiscountAuthorizationType", data.Data.DiscountAuthorizationType);//2017-01-10 微信授权
            //加载销售人员列表
            if (data.Data.Sales != null && data.Data.Sales.length > 0) {
                for (var i = 0; i < data.Data.Sales.length; i++) {
                    var item = data.Data.Sales[i];
                    $("#sales").append('<option value="' + item.id + '">' + item.name + '</option>');
                }
            }
        }
        else {
            alert(data.State.Errkey);
        }
    });

    //添加商品
    $("#btnAdd").hide();
    $("#btnAdd").click(function () {
        var productId = $("#ProductId").val();
        var number = $("#Number").val();
        if (productId == "" || number == "") return false;
        var code = $("#Code").val();
        var unit = $("#Unit").val();
        var productName = $("#ProductName").val();
        var price = $("#Price").val();
        var score = $("#Score").val();
        var iSPFL = $("#iSPFL").val();

        var SPFLId = $("#SPFLId").val(); //商品类型Ids
        var DiscountPrice = $("#DiscountPrice").val();//商品类型折扣价
        var SPDiscountValue = $("#SPDiscountValue").val(); //商品类型统一折扣价


        var agio = 0;
        if (SPFLId != "" && DiscountPrice != "") {
            var ids = SPFLId.split(',');
            var spPrice = DiscountPrice.split(',');
            for (var i = 0; i < ids.length; i++) {
                if (ids[i] == iSPFL) {
                    agio = spPrice[i];
                }
            }
        } else {
            if (SPDiscountValue != "") {
                agio = parseFloat(SPDiscountValue);
            }
        }
        $(".tbProducts tbody tr").removeClass('select');
        var added = false;
        $(".tbProducts tbody tr").each(function () {
            var inputs = $(this).find("input[name='RowId']");
            if (inputs == null || inputs == undefined || inputs.length == 0) {
                var tds = $(this).find("td");
                $(tds[0]).html(code);
                $(tds[1]).html(productName);
                $(tds[2]).html(unit);
                $(tds[3]).html(price);
                if (agio > 0) {
                    $(tds[4]).html((price * (agio / 100)).toFixed(2));
                } else {
                    $(tds[4]).html(parseFloat(price).toFixed(2));
                }
                $(tds[5]).append('<input type="button" value="-" class="jia reduceProductNumber" style="margin-right: -1px; height: 26px;float:left; margin-left:12px; display:inline" />');
                $(tds[5]).append('<input type="text" name="RowNumber" class="ProductNumber" style="width: 40px; float:left; height:22px" value="' + number + '" />');
                $(tds[5]).append('<input type="button" value="+" class="jia addProductNumber" style="margin-left: -1px; height: 26px;float:left" />');
                if (agio > 0) {
                    $(tds[6]).html((parseFloat(price) * parseInt(number) * (agio / 100)).toFixed(2));
                } else {
                    $(tds[6]).html((parseFloat(price) * parseInt(number)).toFixed(2));
                }
                if (score == "-") {
                    $(tds[7]).html("-");
                }
                else {
                    $(tds[7]).html((parseFloat(score) * parseInt(number)).toFixed(2));
                }
                $(tds[8]).append('<input type="hidden" value="' + productId + '" name="RowId" />');
                $(tds[8]).append('<input type="hidden" value="' + price + '" name="RowPrice" />');
                $(tds[8]).append('<input type="hidden" value="' + score + '" name="RowScore" />');
                if (agio > 0) {
                    $(tds[8]).append('<input type="hidden" value="' + agio + '" name="RowDiscount" />');
                }
                $(tds[8]).append('<img src="../images/010.gif" width="9" height="9" /><span class="STYLE1">[</span><a href="javascript:void(0)" class="btnRowDelete">删除</a><span class="STYLE1">]</span>');
                added = true;
                return false;
            }
            else if ($(inputs[0]).val() == productId) {
                var objNumber = $(this).find("input[name='RowNumber']");
                $(objNumber).val(parseInt($(objNumber).val()) + parseInt(number));
                $(objNumber).blur();
                $(this).addClass('select');
                added = true;
                return false;
            }
        });
        if (!added) {
            var newRow = $($("#tbItem tbody").html());
            var tds = $(newRow).find("td");
            $(tds[0]).html(code);
            $(tds[1]).html(productName);
            $(tds[2]).html(unit);
            $(tds[3]).html(price);
            if (agio > 0) {
                $(tds[4]).html((price * (agio / 100)).toFixed(2));
                $(tds[6]).html((parseFloat(price) * parseInt(number) * (agio / 100)).toFixed(2));
                $(newRow).find("input[name='RowDiscount']").val(agio);
            } else {
                $(tds[4]).html(parseFloat(price).toFixed(2));
                $(tds[6]).html((parseFloat(price) * parseInt(number)).toFixed(2));
            }

            if (score == "-") {
                $(tds[7]).html("-");
            }
            else {
                $(tds[7]).html((parseFloat(score) * parseInt(number)).toFixed(2));
            }
            $(newRow).find("input[name='RowNumber']").val(number);
            $(newRow).find("input[name='RowId']").val(productId);
            $(newRow).find("input[name='RowPrice']").val(price);
            $(newRow).find("input[name='RowScore']").val(score);
            $(newRow).find("input[name='RowDiscount']").val(agio);
            $(".tbProducts tbody").append(newRow);
        }
        $("#ProductId").val('');
        $("#ProductName").val('');
        $("#Price").val('');
        $("#Code").val('');
        $("#Unit").val('');
        $("#Number").val('1');
        $("#ProductName").focus();
        calcTotal();
    });
    $("#Number").keyup(function (e) {
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            return;
        }
        var obj = this;
        if ($(obj).val().substring(0, 1) == "-") {
            var str = $(obj).val().substring(1);
            str = str.replace(/[^\d]/g, "");
            $(obj).val("-" + str);
        }
        else {
            $(obj).val($(obj).val().replace(/[^\d]/g, ""));
        }
        if (parseInt($(obj).val()) == 0) {
            $(obj).val(1);
        }
    });
    $(".ProductNumber").live("keyup", function (e) {
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            return;
        }
        var obj = this;
        if ($(obj).val().substring(0, 1) == "-") {
            var str = $(obj).val().substring(1);
            str = str.replace(/[^\d]/g, "");
            $(obj).val("-" + str);
        }
        else {
            $(obj).val($(obj).val().replace(/[^\d]/g, ""));
        }
        if (parseInt($(obj).val()) == 0 || $(obj).val() == "") {
            $(obj).val(1);
        }
        $(this).blur();
        $(this).focus();
    });
    $("#Number").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#btnAdd").click();
        }
    });

    //商品数量控件
    $(".addProductNumber").live("click", function () {
        var ProductNumber = parseInt($(this).prev().val());
        if (ProductNumber <= 0) {
            $(this).prev().val(1);
            $(this).prev().blur();
        }
        else if (ProductNumber < 99) {
            $(this).prev().val(ProductNumber + 1);
            $(this).prev().blur();
        }
    });
    $(".reduceProductNumber").live("click", function () {
        var ProductNumber = parseInt($(this).next().val());
        if (ProductNumber == 1) {
            $(this).next().val(-1);
            $(this).next().blur();
        }
        else if (ProductNumber > -99) {
            $(this).next().val(ProductNumber - 1);
            $(this).next().blur();
        }
    });
    $(".ProductNumber").live("blur", function () {
        var trobj = $(this).parent().parent();
        var number = parseInt($(this).val());
        var price = parseFloat($(trobj).find("input[name='RowPrice']").val());
        var score = $(trobj).find("input[name='RowScore']").val();
        var agio = $(trobj).find("input[name='RowDiscount']").val();
        if (agio != undefined) {
            $(trobj).find(".RowAmount").html((price * number * (agio / 100)).toFixed(2));
        } else {
            $(trobj).find(".RowAmount").html((price * number).toFixed(2));
        }
        if (score != "-") {
            $(trobj).find(".RowScore").html((parseFloat(score) * number).toFixed(2));
        }
        calcTotal();
    });

    //提交
    $("#btnSubmit").click(function () {
        SubmitForm();
    });

    //删除行
    $(".btnRowDelete").live("click", function () {
        $(this).parent().parent().remove();
        calcTotal();
    });

    $("#btnClose").click(function () {
        var ProductDatas = "";
        $(".tbProducts tbody tr").each(function () {
            if ($(this).find("input[name='RowId']").length > 0) {
                if (ProductDatas != "") ProductDatas += "&";
                var rowId = $(this).find("input[name='RowId']").val();
                var rowNumber = $(this).find("input[name='RowNumber']").val();
                ProductDatas += rowId + "|" + rowNumber;
            }
        });
        if (ProductDatas != "") {
            if (confirm("存在未入账的商品是否关闭?")) {
                closeWin('pwin2');
            }
        }
        else {
            closeWin('pwin2');
        }
    });
});

function calcTotal() {
    var totalCount = 0;
    var totalAmount = 0;
    var totalScore = 0;
    $(".tbProducts tbody tr").each(function () {
        if ($(this).find("input[name='RowId']").length > 0) {
            totalCount += parseInt($(this).find("input[name='RowNumber']").val());
            totalAmount += parseFloat($(this).find(".RowAmount").html());
            if ($(this).find(".RowScore").html() != "-") {
                totalScore += parseFloat($(this).find(".RowScore").html());
            }
        }
    });

    $("#TotalNumber").html('共 ' + totalCount + ' 件');
    $("#TotalAmount").html(totalAmount.toFixed(2) + ' 元');
    $("#TotalScore").html(totalScore.toFixed(2) + ' 分');
}

function SubmitForm() {
    var postData = preSave();
    if (!postData) {
        return false;
    }
    $("#btnSubmit").removeClass("bus_add");
    $("#btnSubmit").addClass("bus_dell");
    $("#btnSubmit").attr("disabled", "disabled");
    if (postData.PayMethod == "-2") {
        //输密码
        var memberCardNo = $("#MemberCardNo").html();
        var amount = $("#TotalAmount").html().replace(" 元", "");
        var url = "/member/payment.html?canedit=1&&cardno=" + memberCardNo + "&amount=" + amount;
        top.ActiveWin = window;
        openWin(url, 370, 400, 'paymentwin');
        PaymentCheckOk = function (cardNo, amount, usableAmount) {
            postData.MemberCardNo = cardNo;
            postRequest("/services/basicservice.aspx", postData, "RZXX", "ProductFeeAdd", false, function (data) {
                if (data.State.Success) {
                    alert("操作成功");
                    if (top.ActiveWin != undefined && top.ActiveWin.spReturnMethod != undefined && top.ActiveWin.spReturnMethod != null) {
                        top.ActiveWin.spReturnMethod();
                    }
                    if ($("#chkContinueAdd").attr('checked') == 'checked') {
                        window.location.reload();
                    }
                    else {
                        closeWin('pwin2');
                    }
                }
                else {
                    $("#btnSubmit").removeClass("bus_dell");
                    $("#btnSubmit").addClass("bus_add");
                    alert(data.State.Errkey);
                    $("#btnSubmit").removeAttr("disabled");
                }
            });
        }
    }
    else {
        postRequest("/services/basicservice.aspx", postData, "RZXX", "ProductFeeAdd", false, function (data) {
            if (data.State.Success) {
                if (top.ActiveWin != undefined && top.ActiveWin.spReturnMethod != undefined && top.ActiveWin.spReturnMethod != null) {
                    try{
                        top.ActiveWin.spReturnMethod();
                    } catch (e) { }
                }
                if (postData.PayMethod != "" && Set_WayPrint !=undefined && Set_WayPrint != "2") {
                    if (confirm("操作成功，是否打印凭证?")) {
                        PrintGoodsBill(data.Data.Id, Set_WayPrint);
                        //openWin("/BillInfor/BillOtherFree.aspx?Id=" + data.Data.Id, 800, 430, "pwin3", Set_WayPrint);
                    }
                } else {
                    alert("操作成功");
                }
                if ($("#chkContinueAdd").attr('checked') == 'checked') {
                    window.location.reload();
                }
                else {
                    closeWin('pwin2');
                }
            }
            else {
                alert(data.State.Errkey);
                $("#btnSubmit").removeAttr("disabled");
            }
        });
    }
}
function preSave() {
    //商品购买信息
    $(".note_no").remove();
    $(".errorborder").removeClass('errorborder');
    var ProductDatas = "";
    $(".tbProducts tbody tr").each(function () {
        if ($(this).find("input[name='RowId']").length > 0) {
            if (ProductDatas != "") ProductDatas += "&";
            var rowId = $(this).find("input[name='RowId']").val();
            var rowNumber = $(this).find("input[name='RowNumber']").val();
            var amount = $(this).find(".RowAmount").html();
            ProductDatas += rowId + "|" + rowNumber + "|" + amount;
        }
    });
    if (ProductDatas == "") {
        showTipsCollect(3, 'divErrorTips', '请录入商品信息', 'ProductName');
        return false;
    }

    var TotalAmount = $("#TotalAmount").html().replace(" 元", "")
    var amounts = $(".RowAmount");
    var totalNegAmounts = 0;
    for (var i = 0; i < amounts.length; i++)
    {
        var amount = parseFloat(amounts.eq(i).html());
        if (amount < 0)
            totalNegAmounts += amount;
    }
    if (AuthInputShopInfo == "1" && !IsAuthInputShopInfo && totalNegAmounts < 0) {
        FunAuthInputMinusCost(totalNegAmounts);
        return;
    }


    var PayMethod = $("#PayMethod").val();
    var isbill = getQueryParam("isbill");
    if (isbill == "1") {
        if (PayMethod == "" || PayMethod == "-1" || PayMethod == "-2") {
            alert("已结账的单号不能选择[入账，积分支付，储值卡]支付方式");
            return false;
        }
    }
    var PayMethodName = $("#PayMethod option:selected").text();
    var Remark = $("#Remark").val();
    var salesid = $("#sales").val();
    var salesname = $("#sales").find("option:selected").text();
    //showTips(1, 'btnSubmit', ' &nbsp;');
    if (isContainChina($("#ManualNumber").val())) {
        alert('手工单号不能输入汉字');
        return false;
    }
    var ManualNumber = $("#ManualNumber").val();//手工单号
    return {
        OrderId: getQueryParam("id"),
        ProductDatas: ProductDatas,
        PayMethod: PayMethod,
        PayMethodName: PayMethodName,
        Remark: Remark,
        salesid: salesid,
        salesname: salesname,
        ManualNumber: ManualNumber

    };
}
//验证
function FunAuthInputMinusCost(v) {
    if (v != "" && v < 0 && AuthInputShopInfo == "1") {
        top.AuthorizationWin = window;
        //CacelAction = CacelAction;////取消后需要刷新的数据
        RefreshParentAction = RefreshParentAction;////取消后需要刷新的数据
        if ($("body").data("DiscountAuthorizationType") == "1") {
            openWin("/FrontOp/WeChatAuthorization.html?authtype=5&remark=" + escape("商品录入负数，商品名称：" + $("#ItemId option:selected").text() + "，商品价格：" + $("#Amount").val()), 400, 200, "authorizationwin");
        } else
            openWin("/Set/FunctionAuthorization.html?FunctionName=AuthInputShopInfo", 400, 200, "authorizationwin");
    }
}
//验证成功后的回调
function RefreshParentAction() {
    IsAuthInputShopInfo = true;
}