var AuthInputMinusCost = undefined;//费用录入时输入负数需要授权
var IsAuthInputMinusCost = false;//输入负数时是否已经授权
$(function () {
    var orderId = getQueryParam("id");
    var isbill = getQueryParam("isbill");
    postRequest("/services/basicservice.aspx", { Id: orderId }, "RZXX", "FeeAddInit", false, function (data) {
        if (data.State.Success) {
            $("#OrderNo").html(data.Data.Order.OrderNo);
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
            if (data.Data.FeeTypes != null && data.Data.FeeTypes.length > 0) {
                for (var i = 0; i < data.Data.FeeTypes.length; i++) {
                    var item = data.Data.FeeTypes[i];
                    $("#ItemTypeId").append('<option value="' + item.Id + '">' + item.Name + '</option>');
                }
            }
            if (data.Data.Order.Status == 40) {
                $("#PayMethodLi").show();
                $("#ManualNumberLi").show();
                $("#Remark").css("width", "382px");
                $("#btnSubmit").val("确认");
            }
            AuthInputMinusCost = data.Data.AuthInputMinusCost;
            $("body").data("DiscountAuthorizationType", data.Data.DiscountAuthorizationType);//2017-01-10 微信授权
        }
        else {
            alert(data.State.Errkey);
        }
    });

    $("#ItemTypeId").change(function () {
        var typeId = $(this).val();
        $("#ItemId option").remove();
        //$("#ItemId").append('<option value="">请选择费用名称</option>');
        if (typeId != "") {
            postRequest("/services/basicservice.aspx", { FeeTypeId: typeId }, "RZXX", "GetFeeItems", false, function (data) {
                if (data.State.Success) {
                    if (data.Data != null && data.Data.length > 0) {
                        for (var i = 0; i < data.Data.length; i++) {
                            var item = data.Data[i];
                            $("#ItemId").append('<option value="' + item.Id + '" data-price="' + item.Price.toFixed(2) + '">' + item.Name + '</option>');
                        }
                    }
                    $("#ItemId").change();
                }
                else {
                    alert(data.State.Errkey);
                }
            });
        }
    });

    $("#ItemId").change(function () {
        $("#Amount").val($(this).find("option:selected").attr('data-price'));
    });

    $("#btnSubmit").click(function () {
        var postData = preSave();
        if (!postData) {
            return false;
        }
        $("#btnSubmit").attr("disabled", "disabled");
        postRequest("/services/basicservice.aspx", postData, "RZXX", "FeeAdd", false, function (data) {
            if (data.State.Success) {
                alert("操作成功");
                if (top.ActiveWin != undefined && top.ActiveWin.feeReturnMethod != undefined && top.ActiveWin.feeReturnMethod != null) {
                    try{
                        top.ActiveWin.feeReturnMethod();
                    } catch (e) { }
                    closeWin('pwin2', "2");
                }
                else {
                    closeWin('pwin2', "1");
                }
            }
            else {
                alert(data.State.Errkey);
                $("#btnSubmit").removeAttr("disabled");
            }
        });
    });

    $("#btnClose").click(function () {
        closeWin('pwin2', "1");
    });

    $("#Amount").focus(function () {
        $(this).select()
    }).blur(function () {
        FunAuthInputMinusCost($(this).val());
    });
});
//验证
function FunAuthInputMinusCost(v) {
    if (v != "" && parseInt(v) < 0 && AuthInputMinusCost == "1") {
        top.AuthorizationWin = window;
        CacelAction = CacelAction;////取消后需要刷新的数据
        RefreshParentAction = RefreshParentAction;////取消后需要刷新的数据
        if ($("body").data("DiscountAuthorizationType") == "1") {
            openWin("/FrontOp/WeChatAuthorization.html?authtype=3&remark=" + escape("费用录入负数，费用名称：" + $("#ItemId option:selected").text() + "，费用价格：" + $("#Amount").val()), 400, 200, "authorizationwin");
        } else
            openWin("/Set/FunctionAuthorization.html?FunctionName=AuthInputMinusCost", 400, 200, "authorizationwin");
    }
}
//验证成功后的回调
function RefreshParentAction() {
    IsAuthInputMinusCost = true;
}
//取消验证
function CacelAction() {
    $("#Amount").val(Math.abs($("#Amount").val()));
}

function preSave() {
    var res = true;
    $(".note_no").remove();
    $(".errorborder").removeClass('errorborder');
    var ItemTypeId = $("#ItemTypeId").val();
    if (ItemTypeId == "") {
        showTipsCollect(3, 'divErrorTips', '请选择费用类别', 'ItemTypeId');
        res = false;
    }
    var ItemId = $("#ItemId").val();
    if (ItemId == "") {
        showTipsCollect(3, 'divErrorTips', '请选择费用名称', 'ItemId');
        res = false;
    }
    var ItemName = $("#ItemId option:selected").text();
    var Amount = $("#Amount").val();
    if (Amount == "") {
        showTipsCollect(3, 'divErrorTips', '请输入费用金额', 'Amount');
        res = false;
    }
    if (Amount != "" && parseInt(Amount) == 0) {
        showTipsCollect(3, 'divErrorTips', '费用金额不能为0', 'Amount');
        res = false;
    }
    if (Amount != "" && !/^\-{0,1}\d+(\.{0,1}\d+)?$/.test(Amount)) {
        showTipsCollect(3, 'divErrorTips', '费用金额请输入数字', 'Amount');
        res = false;
    }
    if (AuthInputMinusCost == "1" && !IsAuthInputMinusCost && parseInt(Amount) < 0) {
        FunAuthInputMinusCost(Amount);
        return;
    }
    var PayMethod = "", PayMethodName = "";
    if (!$("#PayMethodLi").is(":hidden")) {
        PayMethod = $("#PayMethod").val();
        PayMethodName = $("#PayMethod option:selected").text();
    }
    var ManualNumber = "";
    if (!$("#ManualNumberLi").is("：hidden")) {
        if (isContainChina($("#ManualNumber").val())) {
            showTipsCollect(3, 'divErrorTips', '手工单号不能输入汉字', 'ManualNumber');
            res = false;
        }
        ManualNumber = $("#ManualNumber").val();
    }
    var Remark = $("#Remark").val();
    if (!res) return false;

    return {
        OrderId: getQueryParam("id"),
        ItemTypeId: ItemTypeId,
        ItemId: ItemId,
        ItemName: ItemName,
        Amount: Amount,
        Remark: Remark,
        PayMethod: PayMethod,
        PayMethodName: PayMethodName,
        ManualNumber: ManualNumber
    };
}