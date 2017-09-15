//控制首页显示
function ControllerIndexPageDom(alldata) {
    if (alldata.PmsVersion == 1) return;
    var data = alldata.Permission;
    if (data == null) return;
    //失物招领
    if (data.indexOf("FT001") < 0) {
        $("#a_LostAndFound").hide();
        $("#a_LostAndFound").next().hide();
    }
    //交接班
    if (data.indexOf("FT005") < 0) {
        $("#shift").hide();
        $("#shift").next().hide();
    }
    //记事本
    if (data.indexOf("FT007") < 0) {
        $("#a_NoteBool").hide();
        $("#a_NoteBool").next().hide();
    }
    //客人
    if (data.indexOf("KR") < 0) {
        $(".zhk").hide();
    }
    //库存
    if (data.indexOf("KC") < 0) {
        $(".kuceng").hide();
    }
    //短信
    if (data.indexOf("DX") < 0) {
        //   $(".duanxin").hide();
    }
    //网客通
    if (data.indexOf("WK") < 0) {
        $(".wkt").hide();
    }
    //会员
    if (data.indexOf("HY") < 0) {
        $(".vip").hide();
    }
    //预订
    if (data.indexOf("YD") < 0) {
        $(".yud").hide();
    }
    //协议单位
    if (data.indexOf("XY") < 0) {
        $(".xieyi").hide();
    }
    //非住客
    if (data.indexOf("FZ") < 0) {
        $(".fzhk").hide();
    }
    //报表
    if (data.indexOf("BB") < 0 && data.indexOf("CX")<0 && data.indexOf("XY0") < 0 && data.indexOf("HY0") < 0) {
        $(".baob").hide();
    }
}

//控制房态图菜单显示
function ControllerRoomStatePageDom(alldata) {
    if (alldata.PmsVersion == 1) return;
    var data = alldata.Permission;
    if (data == null) return;
    //修改客人信息
    if (data.indexOf("FT003") < 0) {
        $("#div_editcustomer").hide();
        $("#div_editcustomer").parent().height($("#div_editcustomer").parent().height() - 20);
    }
    //转押金
    if (data.indexOf("FT009") < 0) {
        $("#div_turndeposit").hide();
        $("#div_turndeposit").parent().height($("#div_turndeposit").parent().height() - 20);
    }
    //退押金
    if (data.indexOf("FT010") < 0) {
        $("#div_deposit").hide();
        $("#div_deposit").parent().height($("#div_deposit").parent().height() - 20);
    }
    //转账
    if (data.indexOf("FT011") < 0) {
        $("#div_turnbook").hide();
        $("#div_turnbook").parent().height($("#div_turnbook").parent().height() - 20);
    }
    //部分结账
    if (data.indexOf("FT012") < 0) {
        $("#div_partbill").hide();
        $("#div_partbill").parent().height($("#div_partbill").parent().height() - 20);
    }

    //预订
    if (data.indexOf("YD") < 0) {
        $("#div_book").hide();
        $("#div_book").parent().height($("#div_book").parent().height() - 20);
        $("#div_book_enter").hide();
        $("#div_book_enter").parent().height($("#div_book_enter").parent().height() - 20);
    }
    //黑名单	XT011
    if (data.indexOf("XT011") < 0) {
        $("#div_black").hide();
        $("#div_black").parent().height($("#div_black").parent().height() - 20);
    }
    //没有会员 屏蔽转会员
    if (data.indexOf("HY") < 0) {
        $("#div_member").hide();
        $("#div_member").parent().height($("#div_member").parent().height() - 20);
    }

    //布草换洗
    if (data.indexOf("FT013") < 0) {
        $("#div_linenchange").hide();
        $("#div_linenchange").parent().height($("#div_linenchange").parent().height() - 20);
    }

    //拼房开房 系统设置本身有这个功能的开关了
    //if (data.indexOf("FT004") < 0) {
    //    $("#div_linenchange").hide();
    //    $("#div_linenchange").parent().height($("#div_linenchange").parent().height() - 20);
    //}

    //团队开房
    if (data.indexOf("FT008") < 0) {
        $("#div_team_open").hide();
        $("#div_team_open").parent().height($("#div_team_open").parent().height() - 20);
    }

    //门锁发卡
    if (data.indexOf("FT015") < 0) {
        $("#div_doorcard").hide();
        $("#div_doorcard").parent().height($("#div_doorcard").parent().height() - 20);
    }

    //添加叫醒
    if (data.indexOf("FT006") < 0) {
        $("#div_wakeup").hide();
        $("#div_wakeup").parent().height($("#div_wakeup").parent().height() - 20);
    }
    //租借物品
    if (data.indexOf("FT002") < 0) {
        $("#div_leaseitem").hide();
        $("#div_leaseitem").parent().height($("#div_leaseitem").parent().height() - 20);
    }

    //商品入账
    if (data.indexOf("XT005") < 0) {
        $("#div_consume").hide();
        $("#div_consume").parent().height($("#div_consume").parent().height() - 20);
    }
    //费用入账
    if (data.indexOf("XT006") < 0) {
        $("#div_feeadd").hide();
        $("#div_feeadd").parent().height($("#div_feeadd").parent().height() - 20);
    }

    //会员
    if (data.indexOf("HY") < 0) {
        //$(".vip").parent().parent().hide();
        $(".vip").hide();
        $("#txtKey").attr("placeholder", "请输入姓名/证件号码/房号")
    }
    //协议单位
    if (data.indexOf("XY") < 0) {
        $(".divroom .icon .co").hide();//隐藏房态图上的协议单位图标
        $("#span_content .co").parent().parent().hide();//隐藏左下角的更多中的“协议单位”
        $("#span_content").width($("#span_content").width() - 66);////隐藏左下角的更多中的“协议单位”后，将长度减掉
        //$(".co").parent().parent().hide();
        //$(".co").parent().parent().parent().width($(".co").parent().parent().parent().width() - 70);
    }
    //宾客查询
    if (data.indexOf("CX007") < 0) {
        $("#btnCustomer").hide();
    }
}

//控制客人显示
function ControllerCustomerPageDom(alldata) {
    if (alldata.PmsVersion == 1) return;
    var data = alldata.Permission;
    if (data == null) return;
    //虚拟账单
    if (data.indexOf("KR001") < 0) {
        $("#btn7").parent().remove();
    }
    //账务处理
    if (data.indexOf("KR002") < 0) {
        $("#btn6").parent().remove();
    }
    //补打发票
    if (data.indexOf("FT016") < 0) {
        $("#btn8").parent().remove();
    }
    //撤销结账
    if (data.indexOf("KR004") < 0) {
        $("#btn1").parent().remove();
    }
    //部分结账
    if (data.indexOf("FT012") < 0) {
        $("#btn11").parent().remove();
    }

}

//控制账务处理页面支付方式调整,商品入账,费用入账
function ControllerPayChangePageDom(alldata) {
    if (alldata.PmsVersion == 1) return;
    var data = alldata.Permission;
    if (data == null) return;
    //支付方式调整
    if (data.indexOf("KR005") < 0) {
        $("#zffstz").parent().hide();
    }
    //商品入账
    if (data.indexOf("XT005") < 0) {
        $("#lblXF").parent().hide();
    }
    //费用入账
    if (data.indexOf("XT006") < 0) {
        $("#lblFY").parent().hide();
    }
}

//控制查询中心,报表中心显示
function ControllerReportPageDom(alldata) {
    if (alldata.PmsVersion == 1) return;
    var data = alldata.Permission;
    if (data == null) return;
    //交接班
    if (data.indexOf("FT005") < 0) {
        $("#CX010").hide();
    }
    //开发票
    if (data.indexOf("FT016") < 0) {
        $("#FT016").hide();
    }
    //租借物品
    if (data.indexOf("FT002") < 0) {
        $("#FT002").hide();
    }

    //查询中心循环处理
    if (data.indexOf("CX") < 0) {
        $("#cxcenter").parent().prev().hide()
    } else {
        $("#cxcenter li").each(function () {
            var name = $(this).attr("id");
            if (data.indexOf(name) < 0) {
                $("#" + name).hide();
            }
        });
    }
    //报表循环处理中心
    if (data.indexOf("BB") < 0) {
        $("#bbcenter").parent().prev().hide()
    }else{
        $("#bbcenter li").each(function () {
            var name = $(this).attr("id");
            if (data.indexOf(name) < 0) {
                $("#" + name).hide();
            }
        });
    }

    //会员管理报表循环处理
    if (data.indexOf("HY0") < 0) {
        $("#hycenter").parent().prev().hide()
    }else{
        $("#hycenter li").each(function () {
            var name = $(this).attr("id");
            if (data.indexOf(name) < 0) {
                $("#" + name).hide();
            }
        });
    }
    //协议单位报表
    if (data.indexOf("XY0") < 0) {
        $("#xycenter").parent().prev().hide()
    }else{
        $("#xycenter li").each(function () {
            var name = $(this).attr("id");
            if (data.indexOf(name) < 0) {
                $("#" + name).hide();
            }
        });
    }
}

//控制系统设置左边菜单显示
function ControllerSystemSetLeftPageDom(alldata) {
    if (alldata.PmsVersion == 1) return;
    var data = alldata.Permission;
    if (data == null) return;
    //酒店信息	XT001
    if (data.indexOf("XT001") < 0) {
        $("#a_company").hide();
    }
    //房间信息	XT002
    if (data.indexOf("XT002") < 0) {
        $("#a_room").hide();
    }
    //房价方案设置	XT003
    if (data.indexOf("XT003") < 0) {
        $("#a_pricescheme").hide();
    }
    //门锁码设置	XT004
    if (data.indexOf("XT004") < 0) {
        $("#a_lock").hide();
    }
    //商品设置	XT005
    if (data.indexOf("XT005") < 0) {
        $("#a_goods").hide();
    }
    //费用设置	XT006
    if (data.indexOf("XT006") < 0) {
        $("#a_price").hide();
    }
    //积分设置	XT007   应该使用HY来判断
    if (data.indexOf("HY") < 0) {
        $("#a1").hide();
    }
    //其他资料	XT008
    if (data.indexOf("XT008") < 0) {
        $("#a_otherdata").hide();
    }
    //员工信息	XT009
    if (data.indexOf("XT009") < 0) {
        $("#a_salesman").hide();
    }
    //账号管理	XT010
    if (data.indexOf("XT010") < 0) {
        $("#a_account").hide();
    }
    //黑名单	XT011
    if (data.indexOf("XT011") < 0) {
        $("#a_blacklist").hide();
    }
    //班次管理	XT012
    if (data.indexOf("XT012") < 0) {
        $("#a_classes").hide();
    }
    //权限管理	XT013
    if (data.indexOf("XT013") < 0) {
        $("#a_role").hide();
    }
    //修改密码	XT014
    if (data.indexOf("XT014") < 0) {
        $("#a_password").hide();
    }

}

//控制系统设置页面里面显示
function ControllerSystemSetPageDom(alldata) {
    if (alldata.PmsVersion == 1) return;
    var data = alldata.Permission;
    if (data == null) return;
    //系统设置	XT015
    if (data.indexOf("XT015") < 0) {
        $(".leftmenu li:not(#Model)").hide();
        $("#jb").hide();
        $("#Model").click();
    }
}

//客人结账页面里面显示
function ControllerBillPageDom(alldata) {
    if (alldata.PmsVersion == 1) return;
    var data = alldata.Permission;
    if (data == null) return;
    //微信支付	FT014
    if (data.indexOf("FT014") < 0) {
        $("#ShowWei").remove();
        $("#ShowAli").remove();
    }

    //开发票FT016
    if (data.indexOf("FT016") < 0) {
        $(".divOpenInvoice").parent().hide();
    }
    //商品入账
    if (data.indexOf("XT005") < 0) {
        $("#lblXF").parent().hide();
    }
    //费用入账
    if (data.indexOf("XT006") < 0) {
        $("#lblFY").parent().hide();
    }
    //读门锁卡、门锁清卡
    if (data.indexOf("FT015") < 0) {
        $("#lblDoorClear").parent().hide();
        $("#lblMSK").hide();
    }
    //退押金
    if (data.indexOf("FT010") < 0) {
        $("#lblBackDeposit").parent().remove();
    }
    //部分结账
    if (data.indexOf("FT012") < 0) {
        $("#PartBill").parent().remove();
    }
}

//非住客账首页控制显示
function ControllerotherFee(alldata) {
    if (alldata.PmsVersion == 1) return;
    var data = alldata.Permission;
    if (data == null) return;
    //微信支付	FT014
    if (data.indexOf("FT014") < 0) {
        $("#btnWep").hide();
        $("#btnAlipay").hide();
    }
}

//控制开房，团队开房页面显示
function ControllerOrderAdd(alldata) {
    if (alldata.PmsVersion == 1) return;
    var data = alldata.Permission;
    if (data == null) return;
    //微信支付	FT014
    if (data.indexOf("HY") < 0) {
        $(".dis_yes").hide();
        $(".dis_no").show();
    }

    $("#OpenModelSet").click(function () {
        closeWin();
        $.cookie('setselect', 'system_set.html?ismodel=1', { path: '/Set' });
        top.openTab('/Set/Set.html', '设置', true);
        //Set/model_set.html
        //top.openTab('/Set/model_set.html', '设置', true);
    });
}

//控制系统设置-->其他设置页面显示
function ControllerSystemSetOtherData(alldata) {
    if (alldata.PmsVersion == 1) return;
    var data = alldata.Permission;
    if (data == null) return;
    //租借物品
    if (data.indexOf("FT002") < 0) {
        $("#LI001").hide();
    }
    //不启用商品入账，商品单位设置关闭
    if (data.indexOf("XT005") < 0) {
        $("#DW001").hide();
    }
}
