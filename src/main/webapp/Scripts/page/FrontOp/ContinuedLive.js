//模块名称:酒店客房资料
//功能说明:续住.
//代码编写:ccj
//编写时间:2014-10-08
var PaymentCheckOk = undefined;
var Set_WayPrint = undefined;
$(function () {
    var orderId = getQueryParam("id");

    postRequest("/Services/BasicService.aspx", { orderId: orderId }, "OrderUsl", "GetContinuedLive", false, function (data) {
        if (!data.State.Success) {//不正确的
            return false;
        }

        fillData(data.Data, data.Data.DepositPrice, data.Data.Amount);
        $("#LeaveDate").val(data.Data.LeaveDate);
        $("#StayNegative").val(data.Data.StayNegative);
        //判断钟点房的续住
        if (data.Data.order.OpenType == 2) {
            $(document.getElementsByClassName("jia addDays"))[0].disabled = true
            $(document.getElementsByClassName("jia reduceDays"))[0].disabled = true
            $("#Days").val(0)
            $("#Days")[0].disabled = true
            $("#LeaveDate").val($("#WantLeaveDate").val());
        }
        Set_WayPrint = data.Data.WayPrint;
        //绑定支付方式
        if (data.Data.PayMethods != null && data.Data.PayMethods.length > 0) {
            for (var i = 0; i < data.Data.PayMethods.length; i++) {
                var item = data.Data.PayMethods[i];
                if (item.Name == "现金") {
                    $("#" + item.Id).attr("selected");
                }
                $("#PayMethod").append('<option value="' + item.Id + '" id="' + item.Id + '">' + item.Name + '</option>');
            }
            $("#PayMethod").append('<option value="-3">信用预授权</option>');
        }

    });
    //预住天数事件绑定
    $(".addDays").click(function () {
        var days = parseInt($("#Days").val());
        if (days < 30) {
            $("#Days").val(days + 1);
            $("#Days").change();
        }
    });
    $(".reduceDays").click(function () {
        var days = parseInt($("#Days").val());
        if (days > -30) {
            $("#Days").val(days - 1);
            $("#Days").change();
        }
    });
    $("#Days").keyup(function (e) {
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            return;
        }
        var obj = this;
        $(obj).val($(obj).val().replace(/[^(\d||\-)]/g, ""));
        if ($(obj).val() == "0") {
            $(obj).val("1")
        }
    });
    $("#Deposit").focusout(function (e) {
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            alert(e.keyCode);
            return;
        }
        var obj = this;
        var reg = /^(-?\d+)(\.\d+)?$/;
        if ($(obj).val() != "" && !reg.test($(obj).val())) {
            $(obj).val($(obj).val().replace(/[^(\d)]/g, ""));
        } else if (parseFloat($(obj).val()) < 0) {
            $(obj).val("");
            alert("欲退押金请在房态图右键菜单中选中更多操作");
        }
    });
    $("#Days").change(function () {
        var days = parseInt($("#Days").val());
        var OrderNo = $("#OrderNo").val();
        postRequest("/services/basicservice.aspx", { days: days, OrderNo: OrderNo }, "OrderUsl", "GetWantLeaveDate", false, function (data) {
            if (data.State.Success) {
                $("#LeaveDate").val(data.Data);
            }
            else {
                alert(data.State.Errkey);
            }
        });
    });
    //续住
    $("#btnSubmit").click(function () {
        var OldLeaveDate = $("#WantLeaveDate").val();
        var days = $("#Days").val();
        var LeaveDate = $("#LeaveDate").val();
        var PayMethod = $("#PayMethod").val();
        var PayMethodName = $("#PayMethod option:selected").text();
        var Deposit = $("#Deposit").val();
        var Remark = $("#Remark").val();
        var OrderNo = $("#OrderNo").val();
        var OpenType = $("#OpenType").val();
        if (isContainChina($("#ManualNumber").val())) {
            alert("手工单号不能输入汉字");
            return false;
        }
        var ManualNumber = $("#ManualNumber").val();
        if (Deposit == "" || Deposit == undefined || parseFloat(Deposit) == 0) {
            if (!confirm("押金未输入是否保存?")) {
                return false;
            }
        }
        var result = checkData(Remark, PayMethod, Deposit, LeaveDate, OpenType);
        if (!result) { return false; }
        //微信支付处理 2016-09-06 
        if (parseInt(Deposit) < 0 && PayMethod == -4) {
            alert("该支付方式下押金要大于0");
            return false;
        }
        if (parseInt(Deposit) < 0) {
            var results = postSynRequest("/Services/BasicService.aspx", { PayMethod: PayMethod, OrderNo: OrderNo }, "OrderUsl", "AccountByOrderNo");
            if (!results.State.Success) {
                if (!confirm(PayMethodName + "支付方式下没有押金，是否退押金")) {
                    return false;
                }
            }
        }
        $("#btnSubmit").removeClass("bus_add");
        $("#btnSubmit").addClass("bus_dell");
        $("#btnSubmit").attr("disabled", "disabled");
        var postData = { days: days, LeaveDate: LeaveDate, PayMethod: PayMethod, PayMethodName: PayMethodName, Deposit: Deposit, Remark: Remark, OldLeaveDate: OldLeaveDate, OrderNo: OrderNo, OpenType: OpenType, ManualNumber: ManualNumber };
        if (PayMethod == -2) {
            var memberCardNo = $("#MemberCardNo").html();
            var url = "/member/payment.html?canedit=1&&cardno=" + memberCardNo + "&amount=" + Deposit;
            top.ActiveWin = window;
            openWin(url, 370, 400, 'paymentwin');
            Paymentclose = function () {
                $("#btnSubmit").removeClass("bus_dell");
                $("#btnSubmit").addClass("bus_add");
                $("#btnSubmit").removeAttr("disabled");
            };
            PaymentCheckOk = function (cardNo, amount, usableAmount) {
                postData.MemberCardNo = cardNo;
                postRequest("/Services/BasicService.aspx", postData, "OrderUsl", "ContinuedLiveAdd", false, function (data) {
                    if (!data.State.Success) {          //不正确的
                        alert(data.State.Des);
                        $("#btnSubmit").removeClass("bus_dell");
                        $("#btnSubmit").addClass("bus_add");
                        $("#btnSubmit").removeAttr("disabled");
                    }
                    else {
                        if (Set_WayPrint != undefined && Set_WayPrint != 2) {
                            if (confirm("续住成功,是否打印续住单!")) {
                                btnPrintClick(data.State.Data.AccId);
                            }
                        } else {
                            alert("续住成功");
                        }
                        if (data.State.Data.IsShowDoorCard) {
                            openWin('/FrontOp/DoorCard.html?id=' + data.State.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                        }
                        closeWin(); //RefreshParentWin(1);
                    }
                });
            }
        }
        else {
            postRequest("/Services/BasicService.aspx", postData, "OrderUsl", "ContinuedLiveAdd", false, function (data) {
                if (!data.State.Success) {          //不正确的
                    alert(data.State.Des);
                    $("#btnSubmit").removeClass("bus_dell");
                    $("#btnSubmit").addClass("bus_add");
                    $("#btnSubmit").removeAttr("disabled");
                }
                else {
                    //微信支付 处理 2016-09-06 
                    if (PayMethod == -4) {
                        var payType = PayMethodName == "微信支付" ? 1 : 2;//微信支付方式
                        openWin("/wepayrequest.aspx?orderNo=" + OrderNo + "&totalFee=" + Deposit + "&Type=" + payType + "&productId=YJ" + OrderNo + "|" + data.State.Data.AccId + "&orderDetail=" + "单号=" + OrderNo, 520, 400, 'paywin', "", function (callbackdata) {
                            var payResult = postSynRequest("/services/basicservice.aspx", { OrderNo: OrderNo, AccId: data.State.Data.AccId, PayMethod: 1 }, "RZXX", "PayHandle");

                            if (!payResult.State.Success) {
                                alert(payResult.State.Des);
                            }

                            if (Set_WayPrint != undefined && Set_WayPrint != "2") {
                                if (confirm("续住成功,是否打印续住单!")) {
                                    btnPrintClick(payResult.Data.AccId);
                                }
                            } else {
                                alert("续住成功");
                            }
                            if (data.State.Data.IsShowDoorCard) {
                                openWin('/FrontOp/DoorCard.html?id=' + data.State.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                            }
                            closeWin(); //RefreshParentWin(1);
                        }, "");
                    }
                    else if (PayMethod == -9) {
                        var payType = PayMethodName == "支付宝支付" ? 1 : 2;//支付宝支付
                        openWin("/alipayrequest.aspx?orderNo=" + OrderNo + "&totalFee=" + Deposit + "&Type=" + payType + "&productId=YJ" + OrderNo + "|" + data.State.Data.AccId + "&orderDetail=" + "单号=" + OrderNo, 520, 400, 'paywin', "", function (callbackdata) {
                            var payResult = postSynRequest("/services/basicservice.aspx", { OrderNo: OrderNo, AccId: data.State.Data.AccId, PayMethod: 2 }, "RZXX", "PayHandle");

                            if (!payResult.State.Success) {
                                alert(payResult.State.Des);
                            }

                            if (Set_WayPrint != undefined && Set_WayPrint != "2") {
                                if (confirm("续住成功,是否打印续住单!")) {
                                    btnPrintClick(payResult.Data.AccId);
                                }
                            } else {
                                alert("续住成功");
                            }
                            if (data.State.Data.IsShowDoorCard) {
                                openWin('/FrontOp/DoorCard.html?id=' + data.State.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                            }
                            closeWin(); //RefreshParentWin(1);
                        }, "");

                    } else {
                        if (Set_WayPrint != undefined && Set_WayPrint != "2") {
                            if (confirm("续住成功,是否打印续住单!")) {
                                btnPrintClick(data.State.Data.AccId);
                            }
                        } else {
                            alert("续住成功");
                        }
                        if (data.State.Data.IsShowDoorCard) {
                            openWin('/FrontOp/DoorCard.html?id=' + data.State.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                        }
                        closeWin(); //RefreshParentWin(1);
                    }
                }
            });
        }
    })
    //关闭
    $("#close").click(function () {
        closeWin();
    });

    $("#Deposit").focus(function () {
        $(this).select();
    })
})
//打印续住单
function btnPrintClick(accId) {
    var OrderNo = $("#OrderNo").val();
    var PayMethod = $("#PayMethod").val();
    PrintConLiveDY(OrderNo, PayMethod, Set_WayPrint, accId);
    //openWin("/BillInfor/ConLiveDY.html?orderno=" + OrderNo + "&pay=" + PayMethod, 800, 430, "pwin2",Set_WayPrint);
}

//检查合法性
function checkData(Remark, PayMethod, Deposit, OpenType) {
    $(".note_no").remove();
    $(".errorborder").removeClass('errorborder');
    if (isEmpty(PayMethod)) {
        showTipsCollect(3, 'btnRead', '请选择支付方式', 'PayMethod');
        return false;
    }
    if (!isEmpty(Deposit) && !isNumeric(Deposit)) {
        showTipsCollect(3, 'btnRead', '押金请输入数字', 'Deposit');
        return false;
    }
    var StayNegative = $("#StayNegative").val();
    if (StayNegative == "0") {
        if (parseInt(Deposit) < 0) {
            showTipsCollect(3, 'btnRead', '押金不允许输入负数', 'Deposit');
            return false;
        }
    }
    return true;
}
//初始化数据
function fillData(data, DepositPrice, Amount) {
    var ul = "<ul>";
    ul += "<li style='margin-right: 42px; display:inline'><label style='width: 50px'>房号：</label><p>" + data.order.RoomNo + "</p></li>";
    ul += "<li style='margin-right: 42px; display: inline'><label>房间类型：</label><p>" + data.order.RoomTypeName + "</p></li>";
    ul += "<li style='margin-right: 42px; display: inline'><label>客人姓名：</label><p>" + data.customer.Name + "</p></li>";
    ul += "<li style='margin-right: 0px; display: inline'><label>入住时间：</label><p>" + formatDateStr(data.order.EnterDate, "yyyy-MM-dd hh:mm") + "</p></li>";
    ul += "<li style='margin-right: 42px; display: inline'><label style='width: 50px'>来源：</label><p>" + data.order.Source + "</p></li>";
    ul += "<li style='margin-right: 42px; display: inline'><label>开房方式：</label><p>" + data.order.OpenTypeName + "</p></li>";
    if (data.order.OpenType == 1 || data.order.OpenType == 4 || data.order.OpenType == 5) {
        if (data.PriceScheme != null)
            ul += "<li style='margin-right: 42px; display: inline'><label>房价方案：</label><p style='width:120px;'>" + data.PriceScheme.Name + "</p></li>";
        else
            ul += "<li style='margin-right: 42px; display: inline'><label>房价方案：</label><p>无</p></li>";
    } else {
        ul += "<li style='margin-right: 42px; display: inline'><label>房价方案：</label><p>" + data.order.OpenTypeName + "</p></li>";
    }
    ul += "<li style='margin-right: 0px; display: inline'><label>已交押金：</label><p>" + DepositPrice.toFixed(2) + "</p></li>"
    ul += "<li style='margin-right: 42px; display: inline'><label style='width: 50px'>余额：</label><p>" + data.order.Balance + "</p></li>";
    ul += "</ul>";
    $("#ULList").append(ul);
    $("#DivList").append("<div class='fr' style='margin-left: 20px;'>入住单号：<span>" + data.order.OrderNo + "</span></div>");
    if (data.order.MemberCardNo != "") {
        $("#DivList").append('<div class="fr" id="divMemberCardNo">会员卡号：<span id="MemberCardNo">' + data.order.MemberCardNo + '</span>  卡余额:<span id="UsableAmount">' + data.UsableAmount + '</span></div>');
    }
    $("#WantLeaveDate").val(formatDateStr(data.order.WantLeaveDate, 'yyyy-MM-dd hh:mm'));
    $("#OrderNo").val(data.order.OrderNo);
    $("#OpenType").val(data.order.OpenType);
}