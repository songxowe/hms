var pager = undefined;
var pageSize = 10;
var reSetTotal = 1;

$(function () {
    $('#StartDate').datetimepicker({
        lang: 'ch',
        format: 'Y-m-d H:i'
    });
    $('#EndDate').datetimepicker({
        lang: 'ch',
        format: 'Y-m-d H:i'
    });
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    $('#StartDate').val(y + "-" + m + "-" + d + " 00:00");
    $('#EndDate').val(y + "-" + m + "-" + d + " 23:59");
    pager = new JCPaging('pager', 1, pageSize, 0, function (page) {
        reSetTotal = 0;
        LoadData(page);
    });
    $("#btnSearch").click(function () {
        reSetTotal = 1;
        LoadData(1);
    });
    LoadData(1);

    //网格单击事件
    $("#tbList tbody tr").click(function () {
        if ($(this).hasClass("select")) { return; }
        $("#tbList tr").removeClass("select");
        $(this).addClass("select");
    });

    $("#btnAdd").click(function () {
        openWin('/OtherFee/OtherFeeAdd.html', 862, 405, "pwin");
    });

    $("#btnWep").click(function () {
        var OrderNo = $("#tbList tbody tr.select").attr('data-orderNo');
        var amount = $("#tbList tbody tr.select").attr('data-amount');
        top.activeWin = window;
        openWin("/wepayrequest.aspx?orderNo=" + OrderNo + "&totalFee=" + amount + "&productId=" + OrderNo + "&Type=1&orderDetail=" + "单号=" + OrderNo, 520, 400, 'wepaywin');
    });

    $("#btnScanWep").click(function () {
        var OrderNo = $("#tbList tbody tr.select").attr('data-orderNo');
        var amount = $("#tbList tbody tr.select").attr('data-amount');
        top.activeWin = window;
        openWin("/wepayrequest.aspx?orderNo=" + OrderNo + "&totalFee=" + amount + "&productId=" + OrderNo + "&Type=2&orderDetail=" + "单号=" + OrderNo, 520, 400, 'wepaywin');
    });

    


    $("#btnDel").click(function () {
        if (!confirm("是否确定要删除？")) {
            return;
        }
        var id = $("#tbList tbody tr.select").attr('data-id');
        postRequest("/services/basicservice.aspx", { id: id }, "OtherFee", "OtherFeeDel", false, function (data) {
            if (data.State.Success) {
                alert("删除成功");
                window.location.reload();
            } else {
                alert(data.State.Des);
            }
        });
    });

    $("#btnPrint").click(function () {
        var dh = $("#tbList tbody tr.select").attr("data-id");
        if (dh == "" || dh == undefined) { alert("请选择需要打印的账单!"); return; }
        PrintOtherFee(dh);
        //openWin("/BillInfor/BillOtherFree.aspx?Id=" + dh + "&type=3", 800, 430, "pwin");
    });

    $(".orderno").live('click', function () {
        var orderNo = $(this).parent().parent().attr('data-orderNo');
        openWin('/OtherFee/OtherFeeDetail.html?orderNo=' + orderNo, 900, 470);
    });

    $("#btnAlipay").click(function () {
        var OrderNo = $("#tbList tbody tr.select").attr('data-orderNo');
        var amount = $("#tbList tbody tr.select").attr('data-amount');
        top.activeWin = window;
        openWin("/alipayrequest.aspx?orderNo=" + OrderNo + "&totalFee=" + amount + "&Type=1&productId=" + OrderNo + "&orderDetail=" + "单号=" + OrderNo, 520, 400, 'wepaywin');
    });
    $("#btnScanAlipay").click(function () {
        var OrderNo = $("#tbList tbody tr.select").attr('data-orderNo');
        var amount = $("#tbList tbody tr.select").attr('data-amount');
        top.activeWin = window;
        openWin("/alipayrequest.aspx?orderNo=" + OrderNo + "&totalFee=" + amount + "&Type=2&productId=" + OrderNo + "&orderDetail=" + "单号=" + OrderNo, 520, 400, 'wepaywin');
    });
});

function LoadData(page) {
    var startDate = $("#StartDate").val();
    var endDate = $("#EndDate").val();
    var orderNo = $("#OrderNo").val();
    postRequest("/services/basicservice.aspx", {
        page: page,
        pageSize: pageSize,
        startDate: startDate,
        endDate: endDate,
        orderNo: orderNo,
        reSetTotal: reSetTotal
    },
        "OtherFee", "IndexInit", false, function (data) {
            if (data.State.Success) {
                $("#tbList tbody tr").remove();
                if (data.Data.List != null && data.Data.List.length > 0) {
                    for (var i = 0; i < data.Data.List.length; i++) {
                        var item = data.Data.List[i];
                        var status = "未支付"
                        if (item.IsTemp == 1) {
                            status = "未支付";
                        } else {
                            status = "已支付";
                        }
                        $("#tbList tbody").append('<tr data-temp="' + item.IsTemp + '" data-orderNo="' + item.OrderNo + '" data-amount="' + item.Amount.toFixed(2) + '" data-id="' + item.Id + '" data-paymethod="' + item.PayMethod + '"><td>' + item.AccountDate + '</td><td><a href="javascript:void(0)" class="orderno">' + item.OrderNo + '<a></td><td>' + item.Number + '</td><td style="text-align: right">' + item.Amount.toFixed(2) + '</td><td>' + item.PayMethodName + '</td><td>' + status + '</td><td>' + item.OpterName + '</td><td style="text-align:left">' + item.Remark + '</td></tr>');
                    }
                }

                $(".pageTotalNumber").html(data.Data.PageTotalNumber);
                $(".pageTotalAmount").html(data.Data.PageTotalAmount.toFixed(2));
                if (reSetTotal == 1) {
                    $(".totalNumber").html(data.Data.TotalNumber);
                    $(".totalAmount").html(data.Data.TotalAmount.toFixed(2));
                    pager.resetTotalCount(data.Data.Total);
                }
                //网格单击事件
                $("#tbList tbody tr").die().live("click", function () {
                    if ($(this).hasClass("select")) { return; }
                    $("#tbList tr").removeClass("select");
                    $(this).addClass("select");

                    var temp = $("#tbList tbody tr.select").attr('data-temp');
                    var amount = $("#tbList tbody tr.select").attr('data-amount');
                    var paymethod = $("#tbList tbody tr.select").attr('data-paymethod');
                    if (temp == "1") {
                        $("#btnDel").removeClass("bus_dell");
                        
                        $("#btnDel").addClass("bus_add");

                        if (parseFloat(amount) > 0) {
                            if (paymethod == "-4") {
                                $("#btnWep").removeAttr("disabled");
                                $("#btnWep").removeClass("bus_dell");
                                $("#btnWep").addClass("bus_add");

                                $("#btnScanWep").removeAttr("disabled");
                                $("#btnScanWep").removeClass("bus_dell");
                                $("#btnScanWep").addClass("bus_add");

                                $("#btnAlipay").attr("disabled", "disabled");
                                $("#btnAlipay").addClass("bus_dell");

                                $("#btnScanAlipay").attr("disabled", "disabled");
                                $("#btnScanAlipay").addClass("bus_dell");
                            }
                            else if (paymethod == "-9") {
                                $("#btnAlipay").removeAttr("disabled");
                                $("#btnAlipay").removeClass("bus_dell");
                                $("#btnAlipay").addClass("bus_add");

                                $("#btnScanAlipay").removeAttr("disabled");
                                $("#btnScanAlipay").removeClass("bus_dell");
                                $("#btnScanAlipay").addClass("bus_add");

                                $("#btnWep").attr("disabled", "disabled");
                                $("#btnWep").addClass("bus_dell");
                                $("#btnScanWep").attr("disabled", "disabled");
                                $("#btnScanWep").addClass("bus_dell");
                            }
                        }
                        $("#btnDel").removeAttr("disabled");

                        $("#btnPrint").removeClass("bus_add");
                        $("#btnPrint").addClass("bus_dell");
                        $("#btnPrint").attr("disabled", "disabled");
                    } else {
                        $("#btnWep").removeClass("bus_add");
                        $("#btnScanWep").removeClass("bus_add");
                        $("#btnDel").removeClass("bus_add");
                        $("#btnScanAlipay").removeClass("bus_add");

                        

                        $("#btnWep").addClass("bus_dell");
                        $("#btnScanWep").addClass("bus_dell");
                        $("#btnAlipay").addClass("bus_dell");
                        $("#btnScanAlipay").addClass("bus_dell");
                        $("#btnDel").addClass("bus_dell");

                        $("#btnWep").attr("disabled", "disabled");
                        $("#btnScanWep").attr("disabled", "disabled");
                        $("#btnAlipay").attr("disabled", "disabled");
                        $("#btnDel").attr("disabled", "disabled");

                        $("#btnPrint").removeClass("bus_dell");
                        $("#btnPrint").addClass("bus_add");
                        $("#btnPrint").removeAttr("disabled");
                    }
                });
            }
            else {
                alert(data.State.Errkey);
            }
        });
}