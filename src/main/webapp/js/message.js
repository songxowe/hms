var pager = undefined;
var pageSize = 10;
var reSetTotal = 1;
var pmsVerSion = 0;
$(function () {
    $('#StartDate').datetimepicker({
        lang: 'ch',
        format: 'Y-m-d H:i'
    });
    $('#EndDate').datetimepicker({
        lang: 'ch',
        format: 'Y-m-d H:i'
    });
    //var today = new Date();
    //var y = today.getFullYear();
    //var m = today.getMonth() + 1;
    //var d = today.getDate();
    //$('#StartDate').val(y + "-" + m + "-" + d + " 00:00");
    //$('#EndDate').val(y + "-" + m + "-" + d + " 23:59");
    pager = new JCPaging('pager', 1, pageSize, 0, function (page) {
        reSetTotal = 0;
        LoadData(page);
    });
    $("#btnSearch").click(function () {
        reSetTotal = 1;
        LoadData(1);
    });
    LoadData(1);

    $("#btnSetRead").click(function () {
        var ids = getSelected();
        if (ids == "") {
            alert("请选择要操作的提醒信息");
            return;
        }
        var res = postSynRequest("/services/basicservice.aspx", { ids: ids }, "BaseData", "MessageSetRead");
        if (!res.State.Success) {
            alert(res.State.Errkey);
        }
        else {
            alert("操作成功");
            top.loadRemind(false);
            window.location.reload();
        }
    });
    $("#btnCleanData").click(function () {
        if (confirm("是否需要将所有提示信息标为已读！"))
        {
            var res = postSynRequest("/services/basicservice.aspx", { ids: -1 }, "BaseData", "MessageSetRead");
            if (!res.State.Success) {
                alert(res.State.Errkey);
            }
            else {
                alert("操作成功");
                top.loadRemind(false);
                window.location.reload();
            }
        }
    })
});

function LoadData(page) {
    var startDate = $("#StartDate").val();
    var endDate = $("#EndDate").val();
    var type = $("#Type").val();
    var status = $("#Status").val();
    postRequest("/services/basicservice.aspx", {
            page: page,
            pageSize: pageSize,
            startDate: startDate,
            endDate: endDate,
            type: type,
            status: status,
            reSetTotal: reSetTotal
        },
        "BaseData", "MessageInit", false, function (data) {
            $("#tbList tbody tr").remove();
            if (data.State.Success) {
                if (data.Data.List != null && data.Data.List.length > 0) {
                    for (var i = 0; i < data.Data.List.length; i++) {
                        var item = data.Data.List[i];
                        var tr = $('<tr><td><input type="checkbox" name="ids" value="' + item.Id + '" class="ab_chect" /></td><td>' + item.StatusName + '</td><td>' + item.CreateDate + '</td><td>' + item.TypeName + '</td><td style="text-align: left;"><a href="###" data-type="' + item.Type + '" data-TargetId="' + item.TargetId + '" onclick="BtnLick(this)">' + item.RemindMsg + '</a></td></tr>');
                        if (item.StatusName == "未读") {
                            $(tr).css("color", "#0789BE");
                        }
                        $("#tbList tbody").append(tr);
                    }
                }
                if (reSetTotal == 1) {
                    pager.resetTotalCount(data.Data.Total);
                }
                pmsVerSion =data.Data.PmsVerSion;
            }
            else {
                alert(data.State.Errkey);
            }
        });
}
function BtnLick(obj) {
    var type = $(obj).attr("data-type");
    var TargetId = $(obj).attr("data-TargetId");
    if (type == 1 || type == 4 || type == 5) {
        if (pmsVerSion == "2") {
            openWin('/TopSpeed/Book/BookAdd.html?id=' + TargetId, 900, 400, "pwin");
        } else {
            openWin('/Book/BookAdd.html?id=' + TargetId, 920, 400, "pwin");
        }
    } else if (type == 2) {
        openWin('/Customer/OrderDetail.html?id=' + TargetId, 900, 530);
    } else if (type == 0) {
        top.openTab('/FrontOp/Version_update.html', "版本更新", true);
    } else if (type == 12) {
        $.cookie('reporttselect', 'GoodsDelivery.aspx', { path: '/Report' });
        top.openTab('/Report/Index.html', '报表', true);
        closeWin();
    }

}