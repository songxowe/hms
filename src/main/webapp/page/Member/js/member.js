$(function () {
    //初始页面时加载所有会员信息
    $("#memberDataGrid").datagrid({
        url: "../../memberController_list",
        title: "会员信息表",
        fitColumns: true,
        striped: true,
        rownumbers: true,
        columns: [[
            {field: "memberId", title: "会员卡号", width: 60, sortable: true},
            {field: "membertype", title: "会员类型", width: 60, sortable: true},
            {field: "memberName", title: "姓名", width: 60, sortable: true},
            {field: "memberPhone", title: "电话", width: 80, sortable: true},
            {field: "memberStatus", title: "状态", width: 50, sortable: true},
            {field: "memberScore", title: "积分", width: 60, sortable: true},
            {field: "memberRemaining", title: "余额", width: 60, sortable: true},
            {field: "memberSex", title: "性别", width: 40, sortable: true},
            {field: "memberBirthdate", title: "生日", width: 100, sortable: true},
            {field: "voucher", title: "证件类型", width: 80, sortable: true},
            {field: "voucherNo", title: "证件号码", width: 160, sortable: true},
            {field: "activeTime", title: "发卡时间", width: 100, sortable: true}
        ]],
        toolbar: "#searchMemberForm",
        pagination: true,
        pageSize: 10,
        pageList: [5, 10, 15, 20, 50],
        sortName: "memberId",
        sortOrder: "desc",
    });
    //多条件查询
    $("#btnQuery").click(function () {
        var memberId = $("#memberId").val();
        var memberPhone = $("#memberPhone").val();
        var memberName = $("#memberName").val();
        var memberStatus = $("#memberStatus").val();
        $("#memberDataGrid").datagrid(
            "load",
            {
                memberId: memberId,
                membertypeId: null,
                memberPhone: memberPhone,
                memberName: memberName,
                memberStatus: memberStatus,
            });
    })

    member_obj = {
        showEdit: function (state) {
            var info = "";
            var id = 0;
            var rows = $("#memberDataGrid").datagrid("getSelections");
            if (state == 'add') {
                info = "会员发卡";
                var url = "../../memberController_add";
            } else if (state == 'charge') {
                var membeId
                info = "会员充值";
                var url = "../../memberController_charge";
                if (rows.length == 1) {
                    id = rows[0].memberId;
                   // alert(id);
                    url += "?memberId=" + id;
                } else {
                    $.messager.alert("警告", "必须选中一行", "warning");
                    return;
                }

            } else if (state == 'scoreChange') {
                info = "积分调整";
                var url = "../../memberController_scoreChange";
                if (rows.length == 1) {
                    id = rows[0].memberId;
                    //alert(id);
                    url += "?memberId=" + id;
                } else {
                    $.messager.alert("警告", "必须选中一行", "warning");
                    return;
                }
            } else if (state == 'loss') {
                info = "会员挂失";
                var url = "../../memberController_loss";
                if (rows.length == 1) {
                    id = rows[0].memberId;
                   // alert(id);
                    url += "?memberId=" + id;
                } else {
                    $.messager.alert("警告", "必须选中一行", "warning");
                    return;
                }

            } else if (state == 'up') {
                info = "会员升级";
                var url = "../../memberController_up";
                if (rows.length == 1) {
                    id = rows[0].memberId;
                   // alert(id);
                    url += "?memberId=" + id;
                } else {
                    $.messager.alert("警告", "必须选中一行", "warning");
                    return;
                }
            } else if (state == 'out') {
                info = "会员退卡";
                var url = "../../memberController_out";
                if (rows.length == 1) {
                    id = rows[0].memberId;
                   // alert(id);
                    url += "?memberId=" + id;
                } else {
                    $.messager.alert("警告", "必须选中一行", "warning");
                    return;
                }

            } else if (state == 'password') {
                info = "密码重置";
                var url = "../../memberController_password";
                if (rows.length == 1) {
                    id = rows[0].memberId;
                   // alert(id);
                    url += "?memberId=" + id;
                } else {
                    $.messager.alert("警告", "必须选中一行", "warning");
                    return;
                }
            } else if (state == 'chargecase') {
                info = "充值方案";
               // alert("充值方案！");
                var url = "../../memberController_Newchargecase";
            }

            $("#editMember").window({
                title: info,
                width: 500,
                height: 560,
                modal: true,
                minimizable: false,
                href: url,
                onClose: function () {
                    $("#memberDataGrid").datagrid(
                        "reload");
                }
            });

        }
    }

/*    function getMember(memberId) {
        $("#editMember").window({
            title: "查看会员员详情",
            width: 500,
            height: 500,
            modal: true,
            minimizable: false,
            href: "../../memberController_view.html?memberId=" + memberId
        });
    }*/
})



