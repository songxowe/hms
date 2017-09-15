/*会员设置*/
var returnMethod = null;        //弹出窗体回调函数
$(function () {
    var pagesize = 8;
    var selspfl = 0;
    var addtag = false;
    var pageM = null;
    ///回调函数
    var callBack = function (data) {
        var attrid = $("#tr_" + data.Id).attr("id");
        if (attrid == null || attrid == undefined) {
            var datas = new Array();
            datas.push(data);
            showMember(datas);
        } else {
            editMember(data);
        }
    };
    //修改商品信息
    var editMember = function (row) {
        var orow = $("#tr_" + row.Id);
        $(orow).after(rowHTML(row));    //新增一条资料
        $(orow).remove();               //删除节点
    };
    //获取页面数据
    var getPageData = function () {
        var Status = $("#Status").val();
        var NegativeAmount = $("#NegativeAmount").attr("checked") == "checked" ? "0" : "";
        postRequest("/Services/BasicService.aspx", { spfl: 0, pagesize: pagesize, Status: Status, NegativeAmount: NegativeAmount }, "CardInfoUsl", "GetCardInfoPage", false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            fillSPFLData(data.Data.Mcategory);
            if (data.Data.List != null && data.Data.List.length > 0) {
                showMember(data.Data.List);
                if (pageM == null) {
                    pageM = new JCPaging("divPage", 1, pagesize, data.Data.Total, queryMember);
                    $("#pointsPage").html(data.Data.pointsPage.toFixed(2));
                    $("#amountPage").html(data.Data.amountPage.toFixed(2));
                }
                $("#points").html(data.Data.points.toFixed(2));
                $("#amount").html(data.Data.amount.toFixed(2));
            } else {
                $("#tblgood").append("<tr><td colspan='13' style='color:red;'></td></tr>");
            }
        });
    };
    //根据分类标识获取会员信息
    var queryMember = function (page, tag) {
        clearMember();
        if (tag == undefined || tag == null) { tag = false; }
        var key = $("#Members").val();
        var Status = $("#Status").val();
        var Days = $("#Days").val();
        var NegativeAmount = $("#NegativeAmount").attr("checked") == "checked" ? "0" : "";
        BtnShow(Status);
        postRequest("/Services/BasicService.aspx", { spfl: selspfl, pagesize: pagesize, key: key, page: page, Status: Status, Days: Days, NegativeAmount: NegativeAmount }, "CardInfoUsl", "GetCardInfoData", false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            if (data.Data.List != null && data.Data.List.length > 0) {
                showMember(data.Data.List);
                if (tag) {
                    if (pageM == null) {
                        $("#pointsPage").html(data.Data.pointsPage.toFixed(2));
                        $("#amountPage").html(data.Data.amountPage.toFixed(2));
                        pageM = new JCPaging("divPage", 1, pagesize, data.Data.Total, queryMember);
                    } else {
                        pageM.resetTotalCount(data.Data.Total);
                        $("#pointsPage").html(data.Data.pointsPage.toFixed(2));
                        $("#amountPage").html(data.Data.amountPage.toFixed(2));
                    }
                    $("#points").html(data.Data.points.toFixed(2));
                    $("#amount").html(data.Data.amount.toFixed(2));
                }
                $("#pointsPage").html(data.Data.pointsPage.toFixed(2));
                $("#amountPage").html(data.Data.amountPage.toFixed(2));
            } else {
                $("#tblgood tbody").append("<tr><td colspan='13' style='color:red;'>没有找到对应的数据</td></tr>");
                $("#pointsPage").html("0.00");
                $("#amountPage").html("0.00");
                $("#points").html("0.00");
                $("#amount").html("0.00");
            }
        });
        addtag = false;
    };
    //填充数据（左边栏）
    var fillSPFLData = function (Mcategory) {
        var html = "<li id='li_0' class='select nowShow'><span id='sp_0'>全部</span><em id='ShowAll' class='eyes'></em></li>"
        for (var i = 0; i < Mcategory.length; i++) {
            if (Mcategory[i].Status != 1)            
                html = html + "<li id='li_" + Mcategory[i].Id + "'><span id='sp_" + Mcategory[i].Id + "'>" + Mcategory[i].Name + "</span><em  id='ea_" + Mcategory[i].Id + "' class='edit'></em><em  id='em_" + Mcategory[i].Id + "' class='dell'></em><em  id='em_" + Mcategory[i].Id + "' class='hide eyes'></em></li>";
            else
                html = html + "<li id='li_" + Mcategory[i].Id + "' style='display:none'><span id='sp_" + Mcategory[i].Id + "'>" + Mcategory[i].Name + "</span><em  id='ea_" + Mcategory[i].Id + "' class='edit'></em><em  id='em_" + Mcategory[i].Id + "' class='dell'></em><em  id='em_" + Mcategory[i].Id + "' class='hide eyes'></em></li>";
        }
        html = html + " <li id='li_end' class='end'>&nbsp;</li>";
        html = html + " <li class='add'>";
        html = html + " <input type='button' value='添加' id='btnSPFLAdd' class='bus_add' /></li>";
        $("#li_kind").html(html);
        dSFPFLEvent();
    };
    //附加会员信息(右边)
    var showMember = function (datas) {
        var html = "";
        for (var i = 0; i < datas.length; i++) {
            html = rowHTML(datas[i]);
            $("#tblgood tr:last").after(html);
        }
        dSFPXXEvent();
    };
    //行内容
    var rowHTML = function (data) {
        var html = "";
        html = html + "<tr id='tr_" + data.Id.toString() + "' data-id='" + data.Id + "' data-status='" + data.Status + "'>";
        html = html + '<td><a href="javascript:void(0)" onclick="showCardLog(\'' + data.CardNo + '\',\'' + data.Status + '\')">' + data.CardNo + '</a></td>';
        html = html + "<td>" + data.CategoryName + "</td>";
        html = html + "<td>" + data.MemberName + "</td>";
        html = html + "<td>" + data.Phone + "</td>";
        html = html + "<td>" + data.StatusName + "</td>";
        html = html + "<td style='text-align:right'>" + data.UsableScore.toFixed(2) + "</td>";
        html = html + "<td style='text-align:right'>" + data.UsableAmount.toFixed(2) + "</td>";
        html = html + "<td>" + data.Sex + "</td>";
        if (data.BirthDay != null && data.BirthDay != undefined && data.BirthDay != "") {
            html = html + "<td>" + formatDateStr(data.BirthDay, "yyyy-MM-dd") + "</td>";
        } else {
            html = html + "<td>&nbsp;</td>";
        }
        html = html + "<td>" + data.MemberCardType + "</td>";
        html = html + "<td>" + data.MemberCardNo + "</td>";
        html = html + "<td>" + formatDateStr(data.OpenDate, "yyyy-MM-dd hh:mm") + "</td>";
        html = html + "<td>" + data.OpenName + "</td>";
        html = html + "<td><img src='/images/037.gif' width='9' height='9' /><span class='STYLE1'> [</span><a href='#' id='a_" + data.Id.toString() + "'>编辑</a><span class='STYLE1'>]</span> ";
        html = html + "</td></tr>";
        return html;
    };
    var dSFPXXEvent = function () {
        $("#tblgood tbody tr td a").die().live("click", spxxEditOrDelClick);
    };
    //会员详情 编辑/删除
    var spxxEditOrDelClick = function () {
        var caption = $(this).html();
        var attrid = $(this).attr("id");
        if (attrid == undefined || attrid == null || attrid.substring(0, 2) != 'a_') { return; }

        attrid = attrid.substring(2);
        switch (caption) {
            case "编辑":
                top.ActiveWin = window;
                returnMethod = callBack;
                openWin("/Member/vip_membercard.html?id=" + attrid, 630, 490, "pwin");
                break;
            default:
                break;
        }
    };
    //会员分类事件
    var dSFPFLEvent = function () {
        $("#btnSPFLAdd").die().live("click", spflAddClick);
        $("#li_kind em.dell").die().live("click", spflDelClick);
        $("#li_kind em.edit").die().live("click", spfEditClick);
        $("#li_kind em.hide").die().live("click", spfHideClick);
        $("#ShowAll").click(function () {
            if ($("#ShowAll").hasClass("ShowAll")) {
                $("#ShowAll").removeClass("ShowAll");               
                $("#li_kind li").each(function () {
                    if ($(this).hasClass("nowShow"))
                        $(this).hide();
                })
                $("#ShowAll").parent().addClass("nowShow");
            }
            else {
                $("#ShowAll").addClass("ShowAll");
                $("#ShowAll").parent().removeClass("nowShow")
                $("#li_kind li").each(function () {
                    if ($(this).css("display") == "none") {
                        $(this).show()
                        $(this).addClass("nowShow")
                    }
                })
            }
        })
    };
    //会员分类单击事件
    $("#li_kind li").live("click", function () {
        $("#Members").val("");
        $("#Days").val("");
        $("#Status").val("10");
        var attrid = $(this).attr("id");
        if (attrid == undefined || attrid == null || attrid == "li_end") return;
        if (attrid.substring(0, 3) != "li_") return;
        clearMember();
        ///开始加载商品信息
        selSpflSel(attrid.substring(3));
        queryMember(1, true);
    });
    //设定某个会员分类被选中
    var selSpflSel = function (kindid) {
        //置为选中状态
        var liid = "";
        var lilist = $("#li_kind li");
        for (var i = 0; i < lilist.length; i++) {
            liid = $(lilist[i]).attr("id");
            if (liid == undefined || liid == null || liid == "li_end") continue;
            $(lilist[i]).removeClass("select");
        }
        $("#li_" + kindid).addClass("select");
        selspfl = kindid;
    };
    //会员分类新增
    var current = undefined;
    var spflAddClick = function () {
        current = undefined;
        top.ActiveWin = window;
        openWin("/Member/vip_membertype.html?id=0", 680, 640, "");
    };
    //会员分类删除
    var spflDelClick = function (e) {
        var parent = $(this).parent();
        var attrid = $(parent).attr("id");
        if (attrid == undefined || attrid == null || attrid == "li_end") return;
        if (attrid.substring(0, 3) != "li_") return;
        if (!confirm("确认要删除码?")) { return; }
        cancelEvent(e);
        postRequest("/Services/BasicService.aspx", { id: attrid.substring(3) }, "MemberCategoryUsl", "DelCardInfoById", false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            //删除某个分类
            var selid = $("#" + attrid).next().attr("id");
            if (selid == undefined || selid == null || selid.substring(0, 3) != 'li_' || selid == 'li_end') {
                selid = $("#" + attrid).prev().attr("id");
            }
            //将某个置为选中
            selSpflSel(selid.substring(3));
            $("#" + attrid).remove();       //删除节点
            alert("删除成功!");
            window.location.reload();
        });
    };
    //会员分类编辑事件
    var spfEditClick = function () {
        var attrid = $(this).parent().attr("id");
        if (attrid == undefined || attrid == null || attrid == "li_end") return;
        if (attrid.substring(0, 3) != "li_") return;
        var id = attrid.substring(3);
        openWin("/Member/vip_membertype.html?&id=" + id, 700, 650, "pwin");
    };
    //会员停用事件
    var spfHideClick = function (e) {
        var parent = $(this).parent();
        var attrid = $(parent).attr("id");
        if (attrid == undefined || attrid == null || attrid == "li_end") return;
        if (attrid.substring(0, 3) != "li_") return;
        if (!parent.hasClass("nowShow")) {
            if (!confirm("确认要隐藏吗?")) { return; }
        } else {
            if (!confirm("确认要显示吗?")) { return; }
        }
        cancelEvent(e);
        postRequest("/Services/BasicService.aspx", { id: attrid.substring(3) }, "MemberCategoryUsl", "SetMemberCategoryStatus", false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            alert("操作成功!");
            window.location.reload();
        });
    }

    //附加事件
    var attachEvent = function () {
        $("#btnQuery").click(function () {
            clearMember();
            queryMember(1, true);        });
        $("#Status").change(function () {
            clearMember();
            queryMember(1, true);
        });
    };
    //清空网格信息
    var clearMember = function () {
        $("#tblgood tr:gt(0):not(:eq(111))").remove();
    }
    //网格单击事件
    $("#tblgood tbody tr").live("click", function () {
        if ($(this).hasClass("select")) { return; }
        $("#tblgood tr").removeClass("select");
        $(this).addClass("select");
        var status = $("#tblgood tbody tr.select").attr('data-status');
        BtnShow(status);
    });
    //积分兑换
    $("#Pointsfor").click(function () {
        var id = $("#tblgood tbody tr.select").attr('data-id');
        if (id == undefined || id == "") {
            id = "0";
        }
        openWin("/Member/vip_memberfor.html?id=" + id, 880, 580, "pwin");
    })

    //会员发卡
    $("#MemberCard").click(function () {
        top.ActiveWin = window;
        returnMethod = callBack;
        openWin("/Member/vip_membercard.html?id=0&type=" + selspfl, 620, 480, "pwin");
    });
    //会员挂失
    $("#Memberloss").click(function () {
        var id = $("#tblgood tbody tr.select").attr('data-id');
        var status = $("#tblgood tbody tr.select").attr('data-status');
        if (id == undefined || id == "") {
            id = "0";
        }
        openWin("/Member/vip_memberloss.html?id=" + id + "&type=" + status, 820, 460, "pwin");
    });
    //会员换卡
    $("#MemberIn").click(function () {
        var id = $("#tblgood tbody tr.select").attr('data-id');
        if (id == undefined || id == "") {
            id = "0";
        }
        openWin("/Member/vip_memberin.html?id=" + id, 830, 480, "pwin");
    });
    //会员退卡
    $("#MemberOut").click(function () {
        var id = $("#tblgood tbody tr.select").attr('data-id');
        if (id == undefined || id == "") {
            id = "0";
        }
        openWin("/Member/vip_memberout.html?id=" + id, 802, 540, "pwin");
    });
    //会员续卡
    $("#MemberRenew").click(function () {
        var id = $("#tblgood tbody tr.select").attr('data-id');
        if (id == undefined || id == "") {
            id = "0";
        }
        openWin("/Member/vip_memberrenew.html?id=" + id, 830, 480, "pwin");
    });
    //会员升级
    $("#Memberup").click(function () {
        var id = $("#tblgood tbody tr.select").attr('data-id');
        if (id == undefined || id == "") {
            id = "0";
        }
        openWin("/Member/vip_memberoper.html?id=" + id, 830, 480, "pwin");
    });
    //积分调整
    $("#MemberScore").click(function () {
        var id = $("#tblgood tbody tr.select").attr('data-id');
        if (id == undefined || id == "") {
            id = "0";
        }
        openWin("/Member/vip_memberscore.html?id=" + id, 840, 520, "pwin");
    });
    //会员充值
    $("#Recharge").click(function () {
        var id = $("#tblgood tbody tr.select").attr('data-id');
        if (id == undefined || id == "") {
            id = "0";
        }
        openWin("/Member/vip_recharge.html?id=" + id, 840, 540, "pwin");
    });
    //密码重置
    $("#Setpassword").click(function () {
        var id = $("#tblgood tbody tr.select").attr('data-id');
        if (id == undefined || id == "") {
            id = "0";
        }
        openWin("/Member/vip_setpassword.html?id=" + id, 830, 480, "pwin");
    });
    //充值方案
    $("#Rechargesolution").click(function () {
        var id = $("#tblgood tbody tr.select").attr('data-id');
        if (id == undefined || id == "") {
            id = "0";
        }
        openWin("/Member/vip_rechargesolution.html?id=" + id, 602, 340, "pwin");
    });
    //储值卡支付
    $("#Payment").click(function () {
        var id = $("#tblgood tbody tr.select").attr('data-id');
        if (id == undefined || id == "") {
            id = "0";
        }
        openWin("/Member/payment.html?id=" + id, 306, 310, "pwin2");
    });
    //数据导入
    $("#Dataimport").click(function () {
        var id = $("#tblgood tbody tr.select").attr('data-id');
        if (id == undefined || id == "") {
            id = "0";
        }
        openWin("/Member/data_import.html?id=" + id, 830, 480, "pwin");
    });

    //会员导出
    $("#MemberExport").click(function () {
        var key = $("#Members").val();
        var Status = $("#Status").val();
        var Days = $("#Days").val();
        window.location.href = "/Member/MemberExport.aspx?key=" + key + "&status=" + Status + "&days=" + Days + "&spfl=" + selspfl;
    })
    //页面载入
    var pageLoad = function () {
        //附加事件
        attachEvent();
        //获取页面数据
        getPageData();
    };
    pageLoad();
});

function showCardLog(cardNo, status) {
    if (status == 30)
        cardNo = cardNo.substring(1);
    $.cookie('reporttselect', 'memberLogQuery.html?cardno=' + cardNo, { path: '/Report' });

    top.openTab('/Report/Index.html', '报表', true);
}

function MemberTypeBack(id, Name) {
    html = "<li id='li_" + id + "'><span id='sp_" + id + "'>" + Name + "</span><em  id='ea_" + id + "' class='edit'></em><em  id='em_" + id + "' class='dell'></em><em  id='em_" + id + "' class='hide'></em></li>";
    $("#li_end").before(html);
}


function BtnShow(Status) {
    if (Status == "20") {
        $("#Memberloss").val("会员解挂");
    }
    else {
        $("#Memberloss").val("会员挂失");
    }
    if (Status == "30" || Status == "1" || Status == "20" || Status == "21") {
        if (Status == "20") {
            //会员解挂
            $("#Memberloss").attr("disabled", false);
            $("#Memberloss").removeClass("bus_dell");
            $("#Memberloss").addClass("bus_add");

        } else {
            //会员挂失
            $("#Memberloss").attr("disabled", "disabled");
            $("#Memberloss").removeClass("bus_add");
            $("#Memberloss").addClass("bus_dell");
        }

        //会员充值
        $("#Recharge").attr("disabled", "disabled");
        $("#Recharge").removeClass("bus_add");
        $("#Recharge").addClass("bus_dell");


        //积分兑换
        $("#Pointsfor").attr("disabled", "disabled");
        $("#Pointsfor").removeClass("bus_add");
        $("#Pointsfor").addClass("bus_dell");


        //会员发卡
        $("#MemberCard").removeAttr("disabled")
        $("#MemberCard").removeClass("bus_dell");
        $("#MemberCard").addClass("bus_add");

        //会员换卡
        $("#MemberIn").attr("disabled", "disabled");
        $("#MemberIn").removeClass("bus_add");
        $("#MemberIn").addClass("bus_dell");

        //会员退卡
        $("#MemberOut").attr("disabled", "disabled")
        $("#MemberOut").removeClass("bus_add");
        $("#MemberOut").addClass("bus_dell");

        if (Status == "21") {
            //会员续卡
            $("#MemberRenew").attr("disabled", false)
            $("#MemberRenew").addClass("bus_add");
            $("#MemberRenew").removeClass("bus_dell");
        } else {
            //会员续卡
            $("#MemberRenew").attr("disabled", "disabled")
            $("#MemberRenew").removeClass("bus_add");
            $("#MemberRenew").addClass("bus_dell");
        }

        //会员升级
        $("#Memberup").attr("disabled", "disabled")
        $("#Memberup").removeClass("bus_add");
        $("#Memberup").addClass("bus_dell");

        //会员积分调整
        $("#MemberScore").attr("disabled", "disabled")
        $("#MemberScore").removeClass("bus_add");
        $("#MemberScore").addClass("bus_dell");

        //密码重置
        $("#Setpassword").attr("disabled", "disabled")
        $("#Setpassword").removeClass("bus_add");
        $("#Setpassword").addClass("bus_dell");
    } else {
        //会员挂失
        $("#Memberloss").removeAttr("disabled");
        $("#Memberloss").removeClass("bus_dell");
        $("#Memberloss").addClass("bus_add");

        //会员充值
        $("#Recharge").removeAttr("disabled");
        $("#Recharge").removeClass("bus_dell");
        $("#Recharge").addClass("bus_add");

        //积分兑换
        $("#Pointsfor").removeAttr("disabled");
        $("#Pointsfor").removeClass("bus_dell");
        $("#Pointsfor").addClass("bus_add");


        //会员发卡
        $("#MemberCard").removeAttr("disabled")
        $("#MemberCard").removeClass("bus_dell");
        $("#MemberCard").addClass("bus_add");

        //会员换卡
        $("#MemberIn").removeAttr("disabled");
        $("#MemberIn").removeClass("bus_dell");
        $("#MemberIn").addClass("bus_add");

        //会员退卡
        $("#MemberOut").removeAttr("disabled")
        $("#MemberOut").removeClass("bus_dell");
        $("#MemberOut").addClass("bus_add");

        //会员续卡
        $("#MemberRenew").removeAttr("disabled")
        $("#MemberRenew").removeClass("bus_dell");
        $("#MemberRenew").addClass("bus_add");

        //会员升级
        $("#Memberup").removeAttr("disabled")
        $("#Memberup").removeClass("bus_dell");
        $("#Memberup").addClass("bus_add");

        //会员积分调整
        $("#MemberScore").removeAttr("disabled")
        $("#MemberScore").removeClass("bus_dell");
        $("#MemberScore").addClass("bus_add");

        //密码重置
        $("#Setpassword").removeAttr("disabled")
        $("#Setpassword").removeClass("bus_dell");
        $("#Setpassword").addClass("bus_add");
    }
    
}