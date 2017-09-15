/*
    模块名称:客人结账
    功能说明:显示账单金额，可以增加费用和消费，并且可以提示用户需要手动加收房租.
    代码编写:cl
    编写时间:2014-10-09 15:00
    完成时间:
*/
var needAddOrder = null;        //需要加收的入住单
var BackDepositMethod = null;
var feeReturnMethod = null;
var spReturnMethod = null;
var isMember = false;
var orderDetail = "";
var jzfhs = "";                 //本次结账的所有房号
var IsAutoWrite = undefined;    //结账时是否自动填写收款/退款金额
var ContractUnitMan = "", ContractUnitManId = 0;
var AllPayMethodList = null, LeaseItemList = null;
var IsAutoAddFzByBill = undefined;//是否自动加收房租

var Set_WayPrint = null;// 打印方式
var Set_NoPromptInvoiceAfterBill = null;// 结账后不提示是否开发票

var addFZ = new Array();        //需要加收的房租
var orders = new Array();  //需要补差价的入住单

var PrintCategory = "";
var CurUserName = "";
var PrintCheck = "";

$(function () {
    var ContractUnitManOptions = {
        minChars: 0,
        width: 460,
        matchContains: false,
        scrollHeight: 130,
        mustMatch: false,
        formatItem: function (row, rowNum, rowCount, searchItem) {
            return "<span style='width:150px;display:inline-block'>签单人：" + row.Name + "</span><span style='width:150px;display:inline-block'>手机：" + row.Phone + "</span>";
        },
        formatMatch: function (row, rowNum, rowCount) {
            return row.Name + " " + row.Phone;
        },
        formatResult: function (row, rowNum, rowCount) {
            return row.Name;
        }
    };

    var roomOptions = {
        minChars: 1,
        width: 120,
        matchContains: true,
        mustMatch: true,
        formatItem: function (row, rowNum, rowCount, searchItem) {
            return "<span style='width:110px;display:inline-block'>" + row.RoomNo + "</span>";
        },
        formatMatch: function (row, rowNum, rowCount) {
            return row.RoomNo;
        },
        formatResult: function (row, rowNum, rowCount) {
            return row.RoomNo;
        }
    };


    var payMothed = null;          //支付方式列表
    var prefh = "";                //上次查询房间
    var autoprint = false;


    var jsorders = new Array();     //需要加收房租的入住单
    var billInfor = null;           //服务器端统计好的账单信息
    var zrdorder = null;            //主入住单
    var jzorders = "";              //本次结账的所有入住单
    var opkind = 1;                 //１结账 3:挂单结账
    var gddh = "";                  //挂单单号



    //获取结账的房号
    var getJZFH = function () {
        var url = "/Services/BasicService.aspx";
        var fh = $("#txtFH").val();
        if (prefh == fh) { return jzfhs; }
        var orderId = $("#hddOrderId").val();

        var data = postSynRequest(url, { fh: fh, gddh: gddh, opkind: opkind, orderId: orderId }, "BillUSL", "GetAllGroupOrder");
        if (!data.State.Success) {
            alert(data.State.Des);
            return "";
        }
        if (data.Data.orders.length == 1) {
            return fh;
        }
        //挂单，必须选所有房间
        if (opkind != 3) {
            if (!confirm("有" + data.Data.orders.length.toString() + "间房联房,需要全部结账吗?")) {
                jzorders = gddh;
                return fh;
            }
        }
        fh = "";
        jzorders = "";
        for (var i = 0; i < data.Data.orders.length; i++) {
            fh = fh + ',' + data.Data.orders[i].RoomNo;
            jzorders = jzorders + ',' + data.Data.orders[i].OrderNo;
        }
        jzorders = jzorders.substring(1);
        fh = fh.substring(1);
        return fh;
    };
    //初始化数据
    var initialData = function () {
        addFZ = new Array();
        jsorders = new Array();
        billInfor = null;
        jzorders = "";             //结账的入住单
        jzfhs = "";                //所有的结账房号
        prefh = "";
    };

    //清空支付方式
    var clearZFFS = function () {
        var childs = $("#divZF ul:gt(0)").remove();
        //for (var i = 1; i < childs.lenth; i++) {
        //    $(childs[i]).remove();
        //}
        $("#txtPay1").val("0.00");
    };

    //重新加载数据 tag: true=需要刷新加收房租 false:不需要刷新加收房租
    var current = undefined;
    var reloadData = function (tag) {
        var fh = $("#txtFH").val();
        var orderId = $("#hddOrderId").val();
        var jzfh = getJZFH();
        if (jzfh == "") {
            return;
        }
        clearInfor();
        var url = "/Services/BasicService.aspx";
        var method = "GetBillData";
        var data = postSynRequest(url, { fh: fh, jzfhs: jzfh, opkind: opkind, gddh: gddh, orderId: orderId }, "BillUSL", method);
        if (!data.State.Success) {
            alert(data.State.Des);                       //不正确的
            return false;
        }
        if (data.Data.CheckYs && data.Data.OpenPriceDisparity) {
            orders = data.Data.orders;//补差价要用
        } else {
            $("#btnAddPrice").remove();
        }
        PrintCategory = data.Data.PrintCategory;
        //获取发票信息
        getInvoiceInfo(data.Data.orders[0].GroupNo);

        /*GetPageData部分开始*/
        $("#txtFH").autocomplete(data.Data.roomlistresult, roomOptions);
        $("#txtFH").result(function (event, data, formatted) {
            if (data != null) {
                initialData();
                clearZFFS();
                reloadData(true);
            }
        });
        ControllerBillPageDom(data.Data.UserData);

        CurUserName = data.Data.UserData.Name;

        if (data.Data.WebNo != "" && data.Data.WebNo != null && data.Data.WebNo != undefined) {
            $(".webno").show();
            $("#lblWebNo").html(data.Data.WebNo);
        }
        //电子签名
        if (data.Data.ElectronicSignature != "" && data.Data.ElectronicSignature == "1") {
            $("#ShowSign").show();
            $("#ShowSign").data("ComId", data.Data.ComId);
            $("#ShowSign").data("ShopId", data.Data.ShopId);
            $("#ShowSign").data("PmsImageHost", data.Data.PmsImageHost);
        }
        //2016-05-13 营改增处理  开通发票组件隐藏divInvoice
        if (data.Data.OpenInvoice) {
            $("#divInvoice").hide();
        }
        $("body").data("OpenInvoice", data.Data.OpenInvoice);
        Set_NoPromptInvoiceAfterBill = data.Data.Set_NoPromptInvoiceAfterBill; //结账后不提示是否开发票
        autoprint = data.Data.autoprint;
        payMothed = data.Data.pays;
        IsAutoWrite = data.Data.IsAutoWrite;
        $("#IsshowDoorCard").val(data.Data.IsshowDoorCard);
        loadZFFS("selpay1");
        if (data.Data.Status == 1) {
            alert("门卡还在使用，请先清卡");
        }

        /*GetPageData部分结束*/

        /*联房房间状态*/
        if (data.Data.AllOrderState != null && data.Data.AllOrderState.length > 1) {
            $("#lianfangstate").show();
            var html = "";
            for (var t = 0; t < data.Data.AllOrderState.length; t++) {
                var item = data.Data.AllOrderState[t];
                html += item.RoomNo + "<span style='color:#FF0000;margin-right:10px;'>[" + item.StatusName + "]</span>";
            }
            $("#lianfangstate").find(".lianfang").html("当前联房状态：" + html);
        }

        IsAutoAddFzByBill = data.Data.IsAutoAddFzByBill;
        AllPayMethodList = data.Data.AllPayMethodList;
        LeaseItemList = data.Data.LeaseItemList;
        jzfhs = jzfh;
        prefh = fh;
        //PMS版本号
        $("#txtPmsVersion").val(data.Data.PmsVersion);
        Set_WayPrint = data.Data.Set_WayPrint;//打印设置
        if (data.Data.rzd.ContractUnitName != "" && data.Data.rzd.Source == "协议单位") {
            $("#divContractUnits").show();
            $("#ContractUnitsId").html(data.Data.rzd.ContractUnitId)
            $("#ContractUnitsName").html(data.Data.rzd.ContractUnitName);
            //$("#ContractUnitsMeno li").html("使用协议挂账时如需挂账消费金额，请先退还押金。");
        }
        //填充数据
        fillData(data.Data.zws, data.Data.rzd, data.Data.billInfor, data.Data.cust, data.Data.orders, data.Data.usableScore, data.Data.frozenScore, data.Data.usableAmount, data.Data.PrepaidEnable, data.Data.YSC, data.Data.orderRemark, data.Data.LeaderName, data.Data.LeaderPhone);
        jsorders = data.Data.jsRZDS;
        jzorders = "";
        billInfor = data.Data.billInfor;
        zrdorder = data.Data.rzd;
        for (var i = 0; i < data.Data.orders.length; i++) {
            jzorders = jzorders + "," + data.Data.orders[i].OrderNo;
        }
        jzorders = jzorders.substring(1);
        if (jsorders.length > 0 && tag) {
            openAddFzPage();            //开始加收
        }
        if (!tag) {
            showAddFZ(addFZ);
        }
        showColinfor();
    };

    var isOne = true;   //执行一次
    $(".btnOpenInvoice").click(function () {
        if ($(".divOpenInvoice").is(":hidden")) {
            $(".divOpenInvoice").show();
            $(".btnOpenInvoice").html('隐藏>>');
            if (isOne) {
                $(".btnOpenInvoice").click();
                isOne = false;
            }
        }
        else {
            $(".divOpenInvoice").hide();
            $(".btnOpenInvoice").html('展开>>');
        }
    });

    //增加支付方式
    var addPaymode = function () {
        //GetJz();
        var optstr = "";
        if ($("#divZF ul").length >= payMothed.length) {
            return;
        }
        var paytitle = "收款金额：";
        var style = "";

        if ($("#lblBYS").attr("tag") == "-") {
            paytitle = "退款金额："; style = "style='color:#F00;'"
        }
        for (var i = 0; i < payMothed.length; i++) {
            //有退款就不能使用协议挂账
            if ($("#lblBYS").attr("tag") == "-") {
                //if(payMothed[i].Id != "-5")
                optstr = optstr + "<option value='" + payMothed[i].Id + "'>" + payMothed[i].MXName + "</option>";

            } else {
                optstr = optstr + "<option value='" + payMothed[i].Id + "'>" + payMothed[i].MXName + "</option>";
            }
        }
        var str = "<ul> " +
            "<li style='margin-right:30px; display:inline'><label>支付方式：</label><select class='zffs' style='width:130px'>" + optstr + "</select></li> " +
            "<li style='margin-right:30px; display:inline'><label class='paytitle' " + style + ">" + paytitle + "</label><input type='text' maxlength='8' name='PayAmount' value='" + colLeftAmount().toFixed(2).toString() + "'/></li> " +
            '<li style="display:none;" class="prepaidpay"><label class="paytitle">会员卡号：</label><input disabled="disabled" type="text" name="MemberCardNo" value="" /><a href="javascript:void(0)" onclick="payment(this)" style="padding-left:10px;margin-top:5px;line-height:24px;">选择</a></li> ' +
            '<li style="display: none;margin-left: -30px;" class="contractunitsmanli"> ' +
            '     <label id="ContractUnitsManLable" >签单人：</label><input type="text" name="ContractUnitsMan" ' +
            '     value=""  /></li>' +
            "<li style='color:#0788BD; padding-top:3px; padding-left:20px'> " +
            "<img opttag='add' src='/images/01.png' width='20' height='20' style='margin-right:10px; display:inline; cursor:pointer'/> " +
            "<img opttag='del' src='/images/02.png' width='20' height='20' style='cursor:pointer'/></li></ul> ";
        $("#divZF").append(str);
        $("#divZF ul li img").die().live("click", zfaddordelclick);
        $(".zffs").die().live("change", zffsChange);
    };


    //支付方式修改
    var zffsChange = function () {
        var zfname = $(this).find("option:selected").text();
        var jetext = $(this).parent().parent().find("input[name='PayAmount']");
        var paytitle = "收款金额：";
        if ($("#lblBYS").attr("tag") == "-") { paytitle = "退款金额："; }
        $("input[name='ContractUnitsMan']").val("");
        if (zfname == "挂单") {
            $(jetext).val("0");
            $(jetext).hide();
            $(this).parent().parent().find(".paytitle").html(paytitle);
            $(this).parent().parent().find(".paytitle").hide();
            $(this).parent().parent().find(".prepaidpay").hide();
            $(this).parent().parent().find(".contractunitsmanli").hide();
        }
        else if (zfname == "协议挂账") {
            $(jetext).show();
            $(jetext).val("");
            $(this).parent().parent().find(".paytitle").html("挂账金额：");
            $(this).parent().parent().find(".prepaidpay").hide();
            $(this).parent().parent().find(".contractunitsmanli").show();
            var ContractUnitsId = $("#ContractUnitsId").html();
            postRequest("/services/basicservice.aspx", { ContractUnitsId: ContractUnitsId }, "BillUSL", "GetContractUnitMan", false, function (data) {
                if (!data.State.Success) {
                    alert(data.State.Errkey);
                    return;
                }
                else {
                    $("input[name='ContractUnitsMan']").autocomplete(data.Data.SignerDto, ContractUnitManOptions);
                    $("input[name='ContractUnitsMan']").result(function (event, data, formatted) {
                        $("input[name='ContractUnitsMan']").val(data.Name);
                        ContractUnitMan = data.Name;
                    });
                }
            });
        }
        else {
            $(jetext).show();
            $(this).parent().parent().find(".paytitle").html(paytitle);
            $(this).parent().parent().find(".paytitle").show();
            $(this).parent().parent().find(".erwei").hide();
            $(this).parent().parent().find(".contractunitsmanli").hide();
            if ($(this).val() == "-2") {
                $(this).parent().parent().find(".prepaidpay").show();
                $(this).parent().parent().find(".prepaidpay .paytitle").html("会员卡号：");
            }
            else {
                $(this).parent().parent().find(".prepaidpay").hide()
            }
        }
    };

    //加收房租
    var openAddFzPage = function () {
        needAddOrder = jsorders;
        top.ActiveWin = window;
        returnMethod = showAddFZ;
        //自动接收房租
        if (IsAutoAddFzByBill == 1) {
            var addFZ = new Array();
            for (var i = 0; i < jsorders.length; i++) {
                var item = jsorders[i];
                if (item.Remark == "") item.Remark = "自动加收房租"
                addFZ.push({ rzdh: item.OrderNo, fh: item.RoomNo, amount: item.Amount.toFixed(2), remark: item.Remark,fztype:0 });
            }
            showAddFZ(addFZ);
        } else {
            openWin("/FrontOp/BillAddFZ.html", 700, 300, "pwin2");
        }
    };

    //显示加收房租
    var showAddFZ = function (datas,isadd) {
        if (isadd == true) {//补差价
            addFZ= addFZ.concat(datas)
            $("#btnAddPrice").attr("disabled", "disabled");
            $("#btnAddPrice").removeClass("bus_add")
            $("#btnAddPrice").addClass("bus_dell")
            $("#btnAddPrice").val("补差价")
            alert("如果补差价有误，请刷新结账页面重新输入！")
        } else {//加收房租
            addFZ = datas;
            $("#tblzw .addfz").remove();
        }
        for (var i = 0; i < datas.length; i++) {
            $("#tblzw tr:first").before(rowAddFZHTML(datas[i]));
        }
        showColinfor();
    }

    //加载发票信息
    var getInvoiceInfo = function (orderNo)
    {
        postRequest("/services/basicservice.aspx", { orderNo: orderNo }, "BillUSL", "GetTitleInfo", false, function (data) {
            if (data.State.Success) {
                console.log(data);
                if (data.Data.length > 0) {
                    $("#txtTitle").val(data.Data[0].Title);
                    $("#txtAmount").val(data.Data[0].Amount);
                    $("#txtRemark").val(data.Data[0].Remark);
                }
            }
            else {
                alert(data.State.Errkey);
            }
        });
    }

    $("#txtPay1").focus(function () {
        $(this).select();
    }).blur(function () {
        if (isNumeric($(this).val())) {
            $(this).val(new Number($(this).val()).toFixed(2));
        }
    })

    var GetGdAmount = function () {
        var xygz = 0;
        $("#divZF input[name='PayAmount']").each(function () {
            if ($(this).parent().find(".paytitle").html() == "挂账金额：") {
                xygz = $(this).val();
            }
        });
        return xygz;
    }
    var GetJz = function () {
        xygz = GetGdAmount();
        var addFZJE = 0; //加收房租的金额
        var xfje = 0;
        for (var i = 0; i < addFZ.length; i++) {
            addFZJE = addFZJE + (addFZ[i].amount * 1);
        }
        xfje = (billInfor.XFJE * 1) + addFZJE;

        //积分兑换
        var dhamount = 0;
        $(".RowScoreRoomFee").each(function (i) {
            if (this.checked) {
                dhamount += parseFloat($(this).attr("data-amount"));
            }
        });
        var jd = xfje - billInfor.YSJE - dhamount - xygz;

        if (jd > 0) {
            $("#lblBYS").html("本次应收：");
            $("#lblBYS").attr("tag", "+");
            $("#lblBYS").css("color", "#333");
        } else {
            $("#lblBYS").html("本次应退：");
            $("#lblBYS").attr("tag", "-");
            $("#lblBYS").css("color", "#F00");
        }
    }
    //重新计算统计信息
    var showColinfor = function () {
        //协议挂单
        xygz = GetGdAmount();

        var addFZJE = 0; //加收房租的金额
        var xfje = 0;
        for (var i = 0; i < addFZ.length; i++) {
            addFZJE = addFZJE + (addFZ[i].amount * 1);

        }
        xfje = (billInfor.XFJE * 1) + addFZJE;

        $("#txtXF").val(xfje.toFixed(2));
        $("#txtYS").val(billInfor.YSJE.toFixed(2));



        //积分兑换
        var dhamount = 0;
        var dhscore = 0;
        $("#listday").val("");
        $("#roomnumber").val("");
        var listday = "";
        var roomnos = "";
        $(".RowScoreRoomFee").each(function (i) {
            if (this.checked) {
                listday += $(this).attr("data-day") + ",";
                roomnos += $(this).attr("data-roomno") + ",";
                dhamount += parseFloat($(this).attr("data-amount"));
                dhscore += parseFloat($(this).val());
            }
        });
        $("#listday").val(listday);
        $("#roomnumber").val(roomnos);

        if (xfje - billInfor.YSJE - dhamount - xygz >= 0) {
            $("#lblBYS").html("本次应收：");
            $("#lblBYS").attr("tag", "+");
            $("#lblPay1").html("收款金额：");
            $("#lblBYS").css("color", "#333");
            $("#lblPay1").css("color", "#333");
            if ($("#ShowWei").length > 0) $("#ShowWei").show();
            if ($("#ShowAli").length > 0) $("#ShowAli").show();
            if ($("#ScanShowAli").length > 0) $("#ScanShowAli").show();
            if ($("#ScanShowWei").length > 0) $("#ScanShowWei").show();
        } else {
            $("#lblBYS").html("本次应退：");
            $("#lblBYS").attr("tag", "-");
            $("#lblPay1").html("退款金额：");
            $("#lblBYS").css("color", "#F00");
            $("#lblPay1").css("color", "#F00");
            if ($("#ShowWei").length > 0) $("#ShowWei").hide();
            if ($("#ShowAli").length > 0) $("#ShowAli").hide();
            if ($("#ScanShowAli").length > 0) $("#ScanShowAli").hide();
            if ($("#ScanShowWei").length > 0) $("#ScanShowWei").hide();
        }
        $("#txtBYS").val(Math.abs(xfje - billInfor.YSJE - dhamount - xygz).toFixed(2));
        $("#txtScore").val(dhscore.toFixed(2));
        $("#txtDhAmount").val(dhamount.toFixed(2));
        if (IsAutoWrite == "1") {
            $("#txtPay1").val(Math.abs(xfje - billInfor.YSJE - dhamount - xygz).toFixed(2));
        }
        if ($("#selpay1").val() != "-2") {
            $("#selpay1").empty(); loadZFFS("selpay1");
        } else {
            $("#selpay1").empty(); loadZFFS("selpay1"); $("#selpay1").val("-2");
        }
        if (parseInt($("#txtYSC").val()) > 0) {
            $(".zffs option").each(function () {
                if ($(this).html() == "银行卡")
                    $(this).attr("selected", "selected")
            });
        }
    }


    //抹零金额改变后重新计算应收金额
    var colLeftAmount = function () {
        var zfamount = 0; //计算当前输入的支付金额
        var incr = 1;
        if ($("#lblBYS").attr("tag") == "-") {
            incr = -1;
        }
        $("#divZF input[name='PayAmount']").each(function () {
            if ($(this).parent().find(".paytitle").html() == "挂账金额：") {
                zfamount = zfamount + ($(this).val() * 1);
            } else {
                zfamount = zfamount + ($(this).val() * incr);
            }
            //zfamount = zfamount + ($(this).val() * 1);
        });
        var amount = $("#txtBYS").val() * incr;
        if (IsAutoWrite == "1") {
            return Math.abs(amount - zfamount);
        } else {
            return 0;
        }
    };

    //增加或删除支付方式
    var zfaddordelclick = function () {
        var tag = $(this).attr("src");
        if (tag == "/images/01.png") { addPaymode(); return; }
        $(this).parent().parent().remove();
    };

    //结账打印
    var btnPrintClick = function (printPreview, gdstatus) {
        if (prefh == "") { alert("请选择需要结账的房间!"); return; }
        var addFZstr = formatarraytoserver(addFZ);        //加收房租的字符串 jzorders  jzfhs
        var tag = $("#btnOK").attr("disabled");
        var status = 0;
        if (tag != undefined && tag != null) { status = 1; }
        if (gdstatus != undefined && gdstatus != null) {
            status = gdstatus
            if (gdstatus == 0) {
                addFZstr = "";
            }
        }
        if (PrintCategory != 2) {
            PrintZJD(jzorders, status, addFZstr, printPreview)
        } else {
            PrintCheck = 1;
            layer.confirm('请选择账单打印类型？', {closeBtn: 0,
                btn: ['明细', '汇总'] //按钮
            }, function () {
                //PrintCategory = 0;
                PrintZJD(jzorders, status, addFZstr, printPreview,0)
                layer.closeAll()
                if (printPreview != "" && printPreview != null && printPreview != undefined)
                    closeWin()
            }, function () {
                //PrintCategory = 1;
                PrintZJD(jzorders, status, addFZstr, printPreview, 1)
                if (printPreview != "" && printPreview != null && printPreview != undefined)
                    closeWin()
            });
        }
        //openWin("/BillInfor/BillJZD.html?status=" + status + "&orderno=" + jzorders + "&zws=" + addFZstr, 840, 560, "pwin2", printPreview);
    };

    //补差价 2016-10-12
    var btnAddPriceClick = function () {
        top.ActiveWin = window;
        returnMethod = showAddFZ;
        IsAddPrice = "true";
        orders = orders;
        openWin("/FrontOp/BillAddFZ.html?IsAdd=1", 700, 300, "pwin2");
    }

    //附加事件
    var attachEvent = function () {
        $("#btnOK").click(btnOKClick);
        $("#txtFH").keydown(function (e) {
            if (e.keyCode == 13) {
                initialData();
                clearZFFS();
                reloadData(true);
            }
        });
        $("#divZF ul li img").die().live("click", zfaddordelclick);
        $("#btnPrint").click(function () { btnPrintClick() });
        $("#btnExit").click(function () { closeWin() });
        $("#lblFY").click(openfypage);
        $("#lblXF").click(openconsumepage);
        $("#PartBill").click(PartBill);

        $(".zffs").die().live("change", zffsChange);
        $("#btnAddPrice").click(function () { btnAddPriceClick() })
    };

    //重新获取账务
    var refreshData = function () {
        reloadData(false);
    };

    var checkChange = function () {
        var fh = $("#txtFH").val();
        if (fh != prefh) {
            alert("当前结账房间和输入房间不一致，请输入正确的房号后按回车键!");
            return false;
        }
        return true;

    }
    //退押金
    $("#lblBackDeposit").click(function () {
        var orderid = zrdorder.Id;
        top.ActiveWin = window;
        BackDepositMethod = refreshData;
        openWin('/FrontOp/BackDeposit.html?id=' + orderid + "&isst=t&r=" + Math.random(), 862, 280, 'pwin2');
    });
    $("#lblDoorClear").click(function () {
        var orderid = zrdorder.Id;
        openWin('/FrontOp/DoorClear.html?id=' + orderid + "&r=" + Math.random(), 412, 250, 'pwin2');
    });
    //打开费用入账页面
    var openfypage = function () {
        if (zrdorder == null) { alert("请先选择结账房间!"); return; }
        if (!checkChange()) { return; }
        top.ActiveWin = window;
        feeReturnMethod = refreshData;
        var orderid = zrdorder.Id;
        openWin('/FrontOp/FeeAdd.html?id=' + orderid + "&r=" + Math.random(), 862, 250, 'pwin2');
    };

    ///打开商品入帐页面
    var openconsumepage = function () {
        if (zrdorder == null) { alert("请先选择结账房间!"); return; }
        var orderid = zrdorder.Id;
        if (!checkChange()) { return; }
        top.ActiveWin = window;
        spReturnMethod = refreshData;
        openWin('/FrontOp/ProductFeeAdd.html?id=' + orderid + "&r=" + Math.random(), 862, 490, 'pwin2');
    };

    //部分结账
    var PartBill = function () {
        if (zrdorder == null) { alert("请先选择结账房间!"); return; }
        var orderid = zrdorder.Id;
        var fh = $("#txtFH").val();
        if (!checkChange()) { return; }
        top.ActiveWin = window;
        spReturnMethod = refreshData;
        openWin('/FrontOp/PartBill.html?fh=' + escape(fh) + '&id=' + orderid + "&r=" + Math.random(), 862, 490, 'pwin2');
    };



    //清空信息
    var clearInfor = function () {
        var str = "";
        $("#tblzw tr").each(function () {
            str = $(this).find("td:eq(0)").text();
            if (str == null || str == undefined || str == "") { return; }
            $(this).remove();
        });
        $("#lblRZDH").html("");
        $("#lblName").html("姓名：");
        $("#lblSource").html("来源：");
        $("#lblRZSJ").html("入注时间：");
        $("#txtfh").val("");
        $("#txtXF").val("");

        $("#txtYS").val("");
        $("#txtBYS").val("");
        $("#txtDes").val("");
        $("#lbljzfh").val("");                             //结账房号
        $("#lblFHS").html("结账房号：");
        $("#btnOK").removeAttr("disabled");             //锁定结账单按钮
    };

    //填充信息
    var fillData = function (zws, rzd, billinfor, kfr, orders, usableScore, frozenScore, usableAmount, PrepaidEnable, YSC, orderRemark, LeaderName, LeaderPhone) {
        for (var i = 0; i < zws.length; i++) {
            $("#tblzw tr:first").before(rowHTML(zws[i]));
        }
        $("#lblRZDH").html(rzd.OrderNo);
        $("#lblName").html('姓名：' + kfr.Name);
        $("#lblSource").html("来源：" + orders[0].Source);
        $("#UserName").val(kfr.Name);
        $("#lblRZSJ").html("入住时间：" + formatDateStr(rzd.EnterDate, 'yyyy-MM-dd hh:mm'));
        $("#txtYSC").val(YSC.toFixed(2));
        $("#txtXF").val(billinfor.XFJE);
        $("#txtYS").val(billinfor.YSJE);
        $("#txtDes").val(orderRemark);
        if (rzd.TeamName != "")
        {
            $("#lblTeamName").html(rzd.TeamName);
            $("#divTeamName").removeClass("none")
        }
        if (LeaderName != "") {
            $("#lblLeaderName").html(LeaderName);
            $("#divLeaderName").removeClass("none")
        }
        if (LeaderPhone != "") {
            $("#lblLeaderPhone").html(LeaderPhone);
            $("#divLeaderPhone").removeClass("none")
        }
        if (parseFloat(billinfor.YSJE) > 0) {
            if ($("#lblBackDeposit").length > 0) $("#lblBackDeposit").parent().show();
        } else {
            if ($("#lblBackDeposit").length > 0) $("#lblBackDeposit").parent().hide();
        }
        if (rzd.Jzsgdh != "") {
            $("#lblJzsgdh").html(rzd.Jzsgdh);
            $("#divJzsgdh").removeClass("none");
        }


        if (billinfor.XFJE - billinfor.YSJE >= 0) {
            $("#lblBYS").html("本次应收：");
            if ($("#ShowWei").length > 0) $("#ShowWei").show();
            if ($("#ShowAli").length > 0) $("#ShowAli").show();
            if ($("#ScanShowWei").length > 0) $("#ScanShowWei").show();
            if ($("#ScanShowAli").length > 0) $("#ScanShowAli").show();
        } else {
            $("#lblBYS").html("本次应退：");
            if ($("#ShowWei").length > 0) $("#ShowWei").hide();
            if ($("#ShowAli").length > 0) $("#ShowAli").hide();
            if ($("#ScanShowWei").length > 0) $("#ScanShowWei").hide();
            if ($("#ScanShowAli").length > 0) $("#ScanShowAli").hide();
        }
        $("#txtBYS").val(Math.abs(billinfor.XFJE - billinfor.YSJE));
        //结账房间
        var str = "结账房间数：" + orders.length.toString() + "间&nbsp;&nbsp;&nbsp;&nbsp;房号：";
        orderDetail = "主单号=" + rzd.OrderNo + "|姓名=" + kfr.Name;
        var fh = "";
        var ty = "";
        var price = "";
        var strBedNo = "";
        for (var i = 0; i < orders.length; i++) {
            str = str + ' ' + orders[i].RoomNo;
            fh = fh + "," + orders[i].RoomNo;
            ty = ty + "," + orders[i].RoomTypeName;
            price = price + "," + orders[i].Price.toFixed(2);
            //2016-09-08  床号处理
            if (orders[i].BedNo != "") {
                if (i > 0 && strBedNo != "") {
                    strBedNo += ",";
                }
                strBedNo += orders[i].BedNo;
            }
        }
        if (strBedNo != "") {
            str += " &nbsp;床号：" + strBedNo;
        }

        orderDetail = orderDetail + "|房号=" + fh.substring(1) + "|房型=" + ty.substring(1) + "|房价=" + price.substring(1);
        orderDetail = orderDetail + "|到店时间=" + formatDateStr(orders[0].EnterDate, 'yyyy-MM-dd hh:mm') + "|预离时间=" + formatDateStr(orders[0].WantLeaveDate, 'yyyy-MM-dd hh:mm');
        $("#lblFHS").html(str);
        if (rzd.MemberCardNo != "") {
            $("#divMemberCardNo").show();
            $("#MemberCardNo").html(rzd.MemberCardNo);
            $("#UsableScore").html(usableScore);
            $("#FrozenScore").html(frozenScore);
            $("#UsableAmount").html(usableAmount);
            $(".RowScore").show();
            isMember = true;
            if (PrepaidEnable == true) {
                $("#selpay1").val("-2");
                $("#selpay1").change();
            }
        }
        else {
            isMember = false;
            $("#divMemberCardNo").hide();
            $(".RowScore").hide();
            $(".prepaidpay").hide();
        }

    };

    //加载支付方式
    var loadZFFS = function (objid) {
        $("#" + objid).empty();
        var html = "";
        for (var i = 0; i < payMothed.length; i++) {
            //有退款就不能使用协议挂账
            if ($("#lblBYS").attr("tag") == "-") {
                //if (payMothed[i].Id != "-5")
                html += "<option value='" + payMothed[i].Id + "'>" + payMothed[i].MXName + "</option>";
            } else {
                html += "<option value='" + payMothed[i].Id + "'>" + payMothed[i].MXName + "</option>";
            }
        }
        $("#" + objid).append(html);
    };

    //每行的内容
    var rowHTML = function (data) {
        var html = "";
        html += "<tr id='tr_" + data.Id.toString() + "'>";
        html += "<td width='10%' data-newFH='" + data.newFH + "'>" + data.FH + "</td>";
        html += "<td width='10%'>" + data.ItemName + "</td>";
        if (data.Flag == 1) {       //借
            html += "<td width='10%' style='text-align:right'>" + data.Amount.toFixed(2) + "</td>";
            html += "<td width='10%' style='text-align:right'>" + (data.PayMethodName == null ? "" : data.PayMethodName) + "</td>";
            html += "<td width='10%' style='text-align:right'>0.00</td>";
        } else {
            html += "<td width='10%'  style='text-align:right'>0.00</td>";
            html += "<td width='10%' style='text-align:right'>" + (data.PayMethodName == null ? "" : data.PayMethodName) + "</td>";
            html += "<td width='10%'  style='text-align:right'>" + data.Amount.toFixed(2) + "</td>";
        }
        if (data.Category == 3) {
            if (data.Score != undefined && data.Score != "") {
                html += "<td width='10%' class='RowScore none'  style='text-align:left'><input type='checkbox' name='RowScoreRoomFee' class='RowScoreRoomFee' style='width:15px;height:15px;vertical-align:-3px' value='" + data.Score + "' data-amount='" + data.Amount + "' data-day='" + formatDateStr(data.CreateDate, 'yyyy-MM-dd hh:mm') + "' data-roomno='" + data.newFH + "' />" + data.Score.toFixed(2) + "</td>";
            }
            else {
                html += "<td width='10%'  style='text-align:right' class='RowScore none'>&nbsp;</td>";
            }
        }
        else {
            html += "<td width='10%'  style='text-align:right' class='RowScore none'>&nbsp;</td>";
        }
        html += "<td width='15%'>" + formatDateStr(data.CreateDate, 'yyyy-MM-dd hh:mm') + "</td>";
        html += "<td width='10%'>" + data.OpterName + "</td>";
        html += "<td width='15%' style='word-break: break-all;'>" + data.Remark + "</td>";
        html += "</tr>";
        return html;
    };

    //加收房租的信息
    var rowAddFZHTML = function (data) {
        var html = "";
        html = html + "<tr class='addfz'>";
        html = html + "<td width='10%'>" + data.fh + "</td>";
        html = html + "<td width='10%'>房租</td>";
        html = html + "<td width='10%' style='text-align:right'>" + (data.amount * 1.0).toFixed(2) + "</td>";
        html = html + "<td width='10%' style='text-align:right'></td>";
        html = html + "<td width='10%' style='text-align:right'>0.00</td>";
        if (isMember) {
            html = html + "<td width='10%' style='text-align:right' class='RowScore'>&nbsp;</td>";
        }
        else {
            html = html + "<td width='10%' style='text-align:right' class='RowScore none'>&nbsp;</td>";
        }
        var currentdatetime = formatCurDate('yyyy-MM-dd hh:mm');
        var result = postSynRequest("/services/basicservice.aspx", null, "ReportData", "GetCurrentDateTime");
        if (result.State.Success) {
            currentdatetime = result.Data.CurrentDateTime
        }
        html = html + "<td width='15%'>" + currentdatetime + "</td>";
        html = html + "<td width='10%'>" + CurUserName + "</td>";
        html = html + "<td>" + data.remark + "</td>";
        html = html + "</tr>";
        return html;
    };

    $("#txtAmount").blur(function () {
        var txtXF = $("#txtXF").val();
        var amount = $(this).val();
        if (parseFloat(amount) > parseFloat(txtXF)) {
            if (!confirm("发票金额大于消费金额，是否确定开发票?")) {
                $("#txtAmount").val("");
            }
        }
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////结账开始//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //结账处理
    var btnOKClick = function () {
        if (!checkOk()) { return; }
        var zffsstr = formatarraytoserver(getZFFSStr());//支付方式的字符串
        var addFZstr = formatarraytoserver(addFZ);        //加收房租的字符串
        var des = $("#txtDes").val();//order备注
        var dhscore = $("#txtScore").val();
        var dhamount = $("#txtDhAmount").val();
        var txtXF = $("#txtXF").val();
        var UserName = $("#UserName").val();
        var YSC = $("#txtYSC").val();
        var listday = $("#listday").val();
        var roomnos = $("#roomnumber").val();
        var title = $("#txtTitle").val();
        var amount = $("#txtAmount").val();
        var remark = $("#txtRemark").val();
        var ManualNumber = $("#ManualNumber").val();
        var url = "/Services/BasicService.aspx";
        var method = "Bill";
        var path = "";
        if (zffsstr.indexOf("挂单") >= 0) {
            path = "/OtherPath/GD.html";
        }
        if (opkind == 3)
        {
            path = "/OtherPath/GDJZ.html";
        }
        $("#btnOK").attr("disabled", true);             //锁定结账单按钮
        $("#btnOK").removeClass("bus_add");
        $("#btnOK").addClass("bus_dell");
        postRequest(url, { rzdhs: jzorders, fh: jzfhs, addFZ: addFZstr, zffs: zffsstr, des: des, opkind: opkind, votherpath: path, dhscore: dhscore, dhamount: dhamount, txtXF: txtXF, YSC: YSC, listday: listday, roomnos: roomnos, ContractUnitMan: ContractUnitMan, ContractUnitManId: ContractUnitManId, title: title, amount: amount, remark: remark, ManualNumber: ManualNumber }, "BillUSL", method, false, function (data) {
            if (!data.State.Success) {
                alert(data.State.Des);                       //不正确的
                $("#btnOK").attr("disabled", false);             //解除锁定结账单按钮
                $("#btnOK").removeClass("bus_dell");
                $("#btnOK").addClass("bus_add");
                return false;
            }
            //刷新房态图
            top.main.window.$("#btnStateUpdate").click();

            var notice = "结账成功!";
            if (zffsstr.indexOf("挂单") >= 0) {
                notice = "挂单操作成功!";
            }

            //判断浏览器处理户籍上传
            try {
                var userAgent = window.navigator.userAgent.toLowerCase();
                if (userAgent == "jchotelclient") {
                    top.hujiUploadBatch(data.Data.List);
                }
            }
            catch (e) { }

            if (data.State.Errkey != null && data.State.Errkey != "") {
                notice += data.State.Errkey;
            }

            alert(notice);
            if (Set_WayPrint != 2 && Set_WayPrint != undefined) {
                if (zffsstr.indexOf("挂单") < 0 || opkind == 3) {
                    if (autoprint == "1" || confirm("是否打印结账单!")) {
                        btnPrintClick(Set_WayPrint);
                    }
                }
                else {//挂单
                    if (autoprint == "1" || confirm("是否打印结账单!")) {
                        btnPrintClick(Set_WayPrint, 0);
                    }
                }
            }
            //开通了发票组件，结账后自动提示是否开发票 2016-05-13
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent == "jchotelclient") {
                if ($("body").data("OpenInvoice") && Set_NoPromptInvoiceAfterBill != "1" && Set_NoPromptInvoiceAfterBill != undefined) {
                    if (confirm("是否开据发票!")) {
                        openWin("/BillInfor/InvoicePrint.html?OrderNo=" + jzorders, 1200, 560, "pwin3");
                    }
                }
            }
            if (opkind == 3) {
                //RefreshParentWin(1);
                //模拟点击查询
                $('#btnSearch', top.main.window.document).click();
                //关闭当前窗口
                closeWin("pwin");
            }
            else {
                if (PrintCheck == "")
                    closeWin();
            }
        });
    };

    ///获取支付方式的字符串
    var getZFFSStr = function () {
        var paylist = new Array();
        var zflist = $("#divZF").children();
        var payid = 0;
        var payname = "";
        var membercardno = "";
        var incr = 1;
        if ($("#lblBYS").attr("tag") == "-") {
            incr = -1;
        }
        for (var i = 0; i < zflist.length; i++) {
            payid = $(zflist[i]).find("select").val();
            payname = $(zflist[i]).find("select").find("option:selected").text();
            amount = ($(zflist[i]).find("input[name='PayAmount']").val() * 1) * incr;

            //协议挂账必须是正数
            //if (payid == "-5") {
            //    amount = Math.abs(amount);
            //}
            if (payid == "-2") {
                membercardno = $(zflist[i]).find("input[name='MemberCardNo']").val();
            }
            else {
                membercardno = "";
            }
            paylist.push({ id: payid, name: payname, amount: amount, membercardno: membercardno });
        }
        return paylist;
    };

    //结账前检测数据的合法性
    var checkOk = function () {
        var tag = false;
        var payname = "";
        var fh = $("#txtFH").val();
        if (prefh != fh) {
            alert("当前结账房间和输入房间不一致，请输入正确的房号后按回车键!");
            return false;
        }
        if ($("#IsshowDoorCard").val() == "true") {
            var OrderNo = $("#lblRZDH").html();
            var result = postSynRequest("/services/basicservice.aspx", { orderno: OrderNo, roomNo: fh }, "LockRecordUsl", "QueryWhere");
            if (!result.State.Success) {
                alert("门卡还在使用，请先清卡");
                return false;
            }
        }
        ///判断 开发票是否展开
        if ($(".btnOpenInvoice").html().indexOf("隐藏") >= 0) {
            if ($("#txtTitle").val() != "") {
                if ($("#txtAmount").val() == "") {
                    alert("请输入发票金额");
                    return false;
                }
            }
            if ($("#txtAmount").val() != "") {
                if ($("#txtTitle").val() == "") {
                    alert("请输入发票抬头");
                    return false;
                }
            }
            if (!isNumeric($("#txtAmount").val())) {
                alert("发票金额只能是输入数字!");
                $("#txtAmount").blur();
                return false;
            }
        }
        if (isContainChina($("#ManualNumber").val())) {
            alert("手工单号不能输入汉字");
            return false;
        }
        var zflist = $("#divZF").children();
        var tag = false;
        for (var i = 0; i < zflist.length; i++) {
            payname = $(zflist[i]).find("select").find("option:selected").text();
            if (payname == "挂单") {
                if (zflist.length > 1) {
                    alert("选择挂单时,不能选择其他支付方式，请删除其他支付方式!");
                    return false;
                }
                tag = true;
            }
            if (payname == "阿里信用住") {
                if (zflist.length > 1) {
                    alert("选择阿里信用住时,不能选择其他支付方式，请删除其他支付方式!");
                    return false;
                }
            }
        }
        if (tag) return true;

        tag = true; var count = 0;
        var ContractUnitsMan = "", ContractUnitsPayAmount = 0;
        for (var i = 0; i < zflist.length; i++) {
            payid = $(zflist[i]).find("select").val();
            if (payid == "-2") {
                membercardno = $(zflist[i]).find("input[name='MemberCardNo']").val();
                if (membercardno == "") {
                    alert("储值卡支付,请先选择储值卡");
                    return false;
                }
            }
            if (payid == "-5") {

                ContractUnitsPayAmount = $(zflist[i]).find("input[name='PayAmount']").val();
                //签单人

                ContractUnitMan = $(zflist[i]).find("input[name='ContractUnitsMan']").val();
                count += 1;
            }

        }


        tag = true;
        var zfamount = 0;//已收款
        var incr = 1;

        $("#divZF input[name='PayAmount']").each(function () {
            if (!tag) { return; }
            if (!isNumeric($(this).val())) {
                alert("收款金额只能是输入数字!");
                $(this).blur();
                tag = false;
            }
            if ($(this).parent().find(".paytitle").html() == "挂账金额：") {
                zfamount = zfamount + ($(this).val() * 1);
            } else {
                zfamount = zfamount + ($(this).val() * incr);

            }
        });
        if (!tag) return false;
        if (count > 1) {
            alert("支付方式不能存在两次协议挂账");
            return false;
        }
        //应退时，不能使用协议挂账      2016-06-12 协议单位挂负数
        //if ($("#lblBYS").attr("tag") == "-") {
        //    var ys = $("#txtBYS").val();
        //    if (parseFloat(ContractUnitsPayAmount) > 0) {
        //        alert("应退金额不能使用协议挂账，退押金后可使用协议挂账");
        //        return false;
        //    }
        //}
        //应收时，挂账金额必须小于等于应收金额
        if ($("#lblBYS").attr("tag") == "+") {
            var ys = $("#txtBYS").val();
            if (parseFloat(ContractUnitsPayAmount) > parseFloat(ys)) {
                alert("协议挂账不能大于本次应收");
                return false;
            }
        }
        var allxf = $("#txtXF").val();//消费
        var r = allxf - allys - zfamount - 0;

        var bys = $("#txtBYS").val() * incr;
        if ((bys - zfamount) != 0) {
            var allys = $("#txtYS").val();//已收
            alert("收款金额有误!");
            return false;
        }

        //选择了协议单位 并且 挂账金额不能为空时需要验证签单人
        if (count > 0) {

            if (ContractUnitsPayAmount <= 0) {
                alert("使用协议挂账时，挂账金额应大于0");
                return false;
            }
            var ContractUnitsId = $("#ContractUnitsId").html();
            var ContractUnitsName = $("#ContractUnitsName").html();
            //协议单位最大限额
            var result = postSynRequest("/services/basicservice.aspx", { ContractUnitsId: ContractUnitsId }, "BillUSL", "MaxContractUnitJe");
            if (!result.State.Success) {
                alert(result.State.Errkey);
                return false;
            } else {
                //如果获取的最大金额为0，那么挂账金额不做限制
                if (result.Data.MaxContractUnitJe > 0 && ContractUnitsPayAmount > result.Data.MaxContractUnitJe) {
                    alert("已超出协议单位挂账限额!");
                    return false;
                }
            }
        }


        var paylist = getZFFSStr();            //支付方式对象
        //非现金交的押金，结帐时可以选择退现金的提示
        if ($("#lblBYS").attr("tag") == "-") {
            var b = false.payname = "";
            for (var m = 0; m < paylist.length; m++) {
                if (paylist[m].name == "现金") {
                    payname = "现金";
                    var id = paylist[m].id;
                    var amount = paylist[m].amount;
                    for (n = 0; n < AllPayMethodList.length; n++) {
                        if (AllPayMethodList[n].PayMethod == id) {
                            b = true;
                            var allamount = AllPayMethodList[n].Amount;
                            if (Math.abs(amount) > allamount)
                                if (!confirm("客户所交现金押金小于当前退款现金，是否继续操作")) {
                                    return false;
                                }
                        }
                    }
                }
            }
            if (!b && payname == "现金") {
                if (!confirm("客户未使用现金交押金，是否继续退现金")) {
                    return false;
                }
            }
        }
        if (LeaseItemList != null && LeaseItemList.length > 0) {
            //询问框 弹出询问后，代码会继续往下走，所以在layer.confirm后，应该加return false防止继续往下走
            var b = false;
            layer.confirm('客户中存在未归还的租借物品，单击 [确定] 按钮系统将自动修改为已归还', {
                btn: ['确定', '查看详情'], //按钮
                closeBtn: false
            }, function () {
                var result = postSynRequest("/services/basicservice.aspx", { OrderNos: jzorders }, "LeaseItemUsl", "SetLeaseItemIsReturnByOrderNo");
                if (!result.State.Success) {
                    alert(result.State.Errkey);
                    return false;
                }
                layer.msg("物品已自动归还，请重新结账", { icon: 1, time: 2000 });
                refreshData();
                return true;
            }, function () {
                b = false;
                layer.closeAll('dialog');
                top.ActiveWin = window;
                LeaseItemMethod = refreshData;
                openWin('/FrontOp/LeaseItem.html?OrderNos=' + jzorders + "&isbill=1&r=" + Math.random(), 720, 310, "pwin2");
            });
            return b;
        }
        return true;
    };

    //获取页面数据
    var getPageData = function () {
        var fh = getUrlParam("fh");
        var orderid = getUrlParam("id");
        opkind = getUrlParam("opkind");
        gddh = getUrlParam("rzdh");
        if (opkind == null) { opkind = 1; }
        if (opkind == 3) { $("#divTitle").html("挂单结账"); $("#txtFH").attr("disabled", true); }
        $("#txtFH").val(fh);
        $("#hddOrderId").val(orderid);
        var url = "/Services/BasicService.aspx";
        var method = "GetPageData";
        postRequest(url, { orderid: orderid, opkind: opkind, gddh: gddh }, "BillUSL", method, false, function (data) {
            if (!data.State.Success) {
                alert(data.State.Des);                       //不正确的
                return false;
            }
            $("#txtFH").autocomplete(data.Data.roomlistresult, roomOptions);
            $("#txtFH").result(function (event, data, formatted) {
                if (data != null) {
                    initialData();
                    clearZFFS();
                    reloadData(true);
                }
            });
            ControllerBillPageDom(data.Data.UserData);

            if (data.Data.WebNo != "" && data.Data.WebNo != null && data.Data.WebNo != undefined) {
                $(".webno").show();
                $("#lblWebNo").html(data.Data.WebNo);
            }
            //电子签名
            if (data.Data.ElectronicSignature != "" && data.Data.ElectronicSignature == "1") {
                $("#ShowSign").show();
                $("#ShowSign").data("ComId", data.Data.ComId);
                $("#ShowSign").data("ShopId", data.Data.ShopId);
                $("#ShowSign").data("PmsImageHost", data.Data.PmsImageHost);
            }
            //2016-05-13 营改增处理  开通发票组件隐藏divInvoice
            if (data.Data.OpenInvoice) {
                $("#divInvoice").hide();
            }
            $("body").data("OpenInvoice", data.Data.OpenInvoice);
            Set_NoPromptInvoiceAfterBill = data.Data.Set_NoPromptInvoiceAfterBill; //结账后不提示是否开发票
            autoprint = data.Data.autoprint;
            payMothed = data.Data.pays;
            IsAutoWrite = data.Data.IsAutoWrite;
            $("#IsshowDoorCard").val(data.Data.IsshowDoorCard);
            reloadData(true);
            loadZFFS("selpay1");
            if (data.Data.Status == 1) {
                alert("门卡还在使用，请先清卡");
            }
        });
    };

    //页面加载
    var pageLoad = function () {
        attachEvent();

        var fh = getUrlParam("fh");
        var orderid = getUrlParam("id");
        opkind = getUrlParam("opkind");
        gddh = getUrlParam("rzdh");
        if (opkind == null) {
            opkind = 1;
        }
        if (opkind == 3) {
            $("#divTitle").html("挂单结账");
            $("#txtFH").attr("disabled", true);
        }
        $("#txtFH").val(fh);
        $("#hddOrderId").val(orderid);


        reloadData(true);
        //getPageData();
    };
    pageLoad();

    //积分兑换全天房租
    $(".RowScoreRoomFee").live("click", function (e) {
        showColinfor();
    });


    ////加载已入住的房间列表
    //postRequest("/Services/BasicService.aspx", null, "BillUSL", "GetCheckInRoomList", false, function (data) {
    //    if (data.State.Success) {
    //        $("#txtFH").autocomplete(data.Data, roomOptions);
    //        $("#txtFH").result(function (event, data, formatted) {
    //            if (data != null) {
    //                initialData();
    //                clearZFFS();
    //                reloadData(true);
    //            }
    //        });
    //    }
    //});
    //读门锁卡事件
    $("#lblMSK").click(function () {
        top.DoorCardRead(function (i, sFH, sMSH) {
            if (sFH != undefined && sFH != "") {
                $("#txtFH").val(sFH);
                initialData();
                clearZFFS();
                reloadData(true);
            } else {
                postRequest("/Services/BasicService.aspx", { LockCode: sMSH }, "BillUSL", "GetRoomInfoByLockCode", false, function (data) {
                    if (data.State.Success) {
                        $("#txtFH").val(data.Data.RoomNo);
                        initialData();
                        clearZFFS();
                        reloadData(true);
                    } else {
                        alert(data.State.Errkey);
                    }
                });
            }
        });
    })

    $(".input_keynote").live("keyup", function (e) {
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            return;
        }
        var obj = this;
        $(obj).val($(obj).val().replace(/[^\.\d]/g, ""));

        //if ($(obj).val() == "0") {
        //    $(obj).val("1");
        //}
    });

    $(".input_keynote").live("blur", function (e) {
        $("#divZF input[name='PayAmount']").each(function () {

            if ($(this).parent().find(".paytitle").html() == "挂账金额：") {
                var xygz = $(this).val();
                var ys = $("#txtBYS").val();
                // 2016-06-12 协议单位挂负数
                //if ($("#lblBYS").attr("tag") == "-") {
                //    if (parseFloat(GetGdAmount()) > 0) {
                //        alert("应退金额不能使用协议挂账，退押金后可使用协议挂账");
                //        return false;
                //    }
                //}
                if (parseFloat(xygz) > parseFloat(ys)) {
                    alert("协议挂账不能大于本次应收");
                    return false;
                }

            }

        });
    });
    //电子签名 点击事件
    $("#btnSign").click(function () {
        var data = '{ "billtype": "2", ';
        data += '"shopid":"' + $("#ShowSign").data("ShopId");
        data += '","comid":"' + $("#ShowSign").data("ComId");
        data += '","sdh":"' + $("#lblRZDH").html();
        data += '","filename":"' + $("#lblRZDH").html() + '_2.jpg"}';
        top.ElectronicSignature(data, ElecSignCallBack);
    })
    //重新电子签名 点击事件
    $("#btnReSign").click(function () {
        var data = '{ "billtype": "2", ';
        data += '"shopid":"' + $("#ShowSign").data("ShopId");
        data += '","comid":"' + $("#ShowSign").data("ComId");
        data += '","sdh":"' + $("#lblRZDH").html();
        data += '","filename":"' + $("#lblRZDH").html() + '_2.jpg"}';
        top.ElectronicSignature(data, ElecSignCallBack);
    })
    //发票抬头保存按钮 点击事件
    $("#btn_SaveTitle").click(function () {

        var title = $("#txtTitle").val();
        var amount = $("#txtAmount").val();
        var remark = $("#txtRemark").val();
        var txtXF = $("#txtXF").val();

        postRequest("/Services/BasicService.aspx", { title: title, amount: amount, remark:remark, txtXF: txtXF, rzdhs: jzorders }, "BillUSL", "SaveTitleInfo", false, function (data) {
            if (data.State.Success) {
                alert("保存成功！");
            } else {
                alert(data.State.Errkey);
            }
        });
    });
});
//微信支付
function Wappay(obj) {
    var totalFee = $("#txtBYS").val();
    if (parseFloat(totalFee) <= 0) {
        alert("收款金额必须大于0");
        return;
    }
    top.activeWin = window;
    openWin("/wepayrequest.aspx?orderNo=" + $("#lblRZDH").html() + "&totalFee=" + totalFee + "&productId=" + jzfhs + "&orderDetail=" + orderDetail + "&Type=1", 520, 500, 'wepaywin');
}
//微信扫码枪支付
function ScanWappay(obj) {
    var totalFee = $("#txtBYS").val();
    if (parseFloat(totalFee) <= 0) {
        alert("收款金额必须大于0");
        return;
    }
    top.activeWin = window;
    openWin("/wepayrequest.aspx?orderNo=" + $("#lblRZDH").html() + "&totalFee=" + totalFee + "&productId=" + jzfhs + "&orderDetail=" + orderDetail + "&Type=2", 520, 500, 'wepaywin');
}
//支付宝支付
function Alipay(obj) {
    var totalFee = $("#txtBYS").val();
    if (parseFloat(totalFee) <= 0) {
        alert("收款金额必须大于0");
        return;
    }
    top.activeWin = window;
    openWin("/alipayrequest.aspx?orderNo=" + $("#lblRZDH").html() + "&totalFee=" + totalFee + "&Type=1&productId=" + jzfhs + "&orderDetail=" + orderDetail, 520, 500, 'wepaywin');
}
//支付宝扫描枪支付
function ScanAlpay(obj) {
    var totalFee = $("#txtBYS").val();
    if (parseFloat(totalFee) <= 0) {
        alert("收款金额必须大于0");
        return;
    }
    top.activeWin = window;
    openWin("/alipayrequest.aspx?orderNo=" + $("#lblRZDH").html() + "&totalFee=" + totalFee + "&Type=2&productId=" + jzfhs + "&orderDetail=" + orderDetail, 520, 500, 'wepaywin');
}

var PaymentCheckOk = undefined;
var payRow = undefined;
function payment(obj) {
    payRow = $(obj).parent().parent();
    var incr = 1;
    if ($("#lblBYS").attr("tag") == "-") {
        incr = -1;
    }
    var memberCardNo = $("#MemberCardNo").html();
    var amount = ($(obj).parent().parent().find("input[name='PayAmount']").val() * 1) * incr;
    var url = "/member/payment.html?canedit=1&&cardno=" + memberCardNo + "&amount=" + amount;
    top.ActiveWin = window;
    openWin(url, 308, 290, 'paymentwin');
    PaymentCheckOk = function (cardNo, amount, usableAmount) {
        $(payRow).find("input[name='MemberCardNo']").val(cardNo);
    }
}
//电子签名回调
function ElecSignCallBack(i) {
    if (i == 0) {
        $("#imgSign").show().attr("src", $("#ShowSign").data("PmsImageHost") + "/billtemplate/" + $("#ShowSign").data("ShopId") + "/" + $("#lblRZDH").html() + '_2.jpg');
        $("#btnReSign").show();
        $("#btnSign").hide();
    }
}