/*会员开卡、编辑*/
var WayPrint = undefined;//打印方式
var AuthFreeMemberCard = undefined;
$(function () {
    //回车代替TAB
    $("input:text").keypress(function (e) {
        if (e.which == 13) {// 判断所按是否回车键  
            var inputs = $("input:text"); // 获取表单中的所有输入框  
            var idx = inputs.index(this); // 获取当前焦点输入框所处的位置  
            if (idx < inputs.length - 1) {// 判断是否是最后一个输入框  
                inputs[idx + 1].focus(); // 设置焦点  
                inputs[idx + 1].select(); // 选中文字  
            }
            return false; // 取消默认的提交行为  
        }
    });

    var roomOptions = {
        minChars: 0,
        width:450,
        matchContains: true,
        mustMatch: true,
        max: 400,
        formatItem: function (row, rowNum, rowCount, searchItem) {
            return "<span class='memberdata' style='width:140px;display:block;float:left'>单号：" + row.OrderNo + "</span><span style='width:100px;dispaly:block;float:left'>" + row.CustomerName + "</span><span style='width:100px;display:block;float:left'>房号：" + row.RoomNo + "</span><span style='width:60px;display:block;float:left'>状态：" + row.StrStatusName + "</span>";
        },
        formatMatch: function (row, rowNum, rowCount) {
            return row.OrderNo + " " + row.CustomerName + " " + row.RoomNo;
        },
        formatResult: function (row, rowNum, rowCount) {
            return row.RoomNo;
        }
    };

    var id = getUrlParam("id");
    var type = getUrlParam("type");
    var orderid = getUrlParam("orderid");
    var isclock = getUrlParam("isclock");

    var resdata = postSynRequest("/services/basicservice.aspx", { orderid: orderid }, "CardInfoUsl", "GetOther");
    function SetOther(data) {
        if (data.State.Success) {
            if (data.Data.Interfaces != "" && data.Data.Interfaces != null && data.Data.Interfaces != undefined) {
                $("#btnReadCard").show();
                $("#btnWriteCard").show();
                $("#btnClearCard").show();
            } else {
                $("#btnReadCard").hide();
                $("#btnWriteCard").hide();
                $("#btnClearCard").hide();
            }
            //加载证件类型
            if (data.Data.Dicts != null && data.Data.Dicts.length > 0) {
                for (var i = 0; i < data.Data.Dicts.length; i++) {
                    var item = data.Data.Dicts[i];
                    $("#CardType").append('<option value="' + item.MXName + '">' + item.MXName + '</option>');
                }
            }
            //加载支付方式
            if (data.Data.Pays != null && data.Data.Pays.length > 0) {
                for (var i = 0; i < data.Data.Pays.length; i++) {
                    var item = data.Data.Pays[i];
                    $("#PayMethod").append('<option value="' + item.Id + '">' + item.MXName + '</option>');
                }
            }

            $("#PayMethod").append('<option value="-999">转房账</option>');

            //加载会员类型
            if (id == "0" || type == null || type == "" || type == undefined) {
                $("#CategoryId").append('<option value="0">请选择</option>');
            }
            if (data.Data.Members != null && data.Data.Members.length > 0) {

                for (var i = 0; i < data.Data.Members.length; i++) {
                    var item = data.Data.Members[i];
                    $("#CategoryId").append('<option value="' + item.Id + '">' + item.Name + '</option>');
                }
            }
            if (type != null && type != "" && type != undefined) {
                $("#CategoryId").val(type);
                $("#CategoryId").change();
            }
            //加载销售员     
            $("#SalerId").append('<option value="0">请选择</option>');
            if (data.Data.SalesMans != null && data.Data.SalesMans.length > 0) {
                for (var i = 0; i < data.Data.SalesMans.length; i++) {
                    var item = data.Data.SalesMans[i];
                    if (item.IsSalesman == true) {
                        $("#SalerId").append('<option value="' + item.Id + '">' + item.Name + '</option>');
                    }
                }
            }

            //转房账数据
            if (data.Data.RoomList.length > 0) {
                roomOptions.max = data.Data.RoomList.length;
                $("#ZfzRoomNo").autocomplete(data.Data.RoomList, roomOptions);
                $("#ZfzRoomNo").result(function (event, data, formatted) {
                    if (data != null) {
                        $("#zfzOrderId").val(data.OrderId);
                        $("#zfzOrderNo").val(data.OrderNo);
                    }
                });
                $("#ZfzRoomNo").change(function () {
                    if (this.value == "") {
                        $("#zfzOrderId").val("");
                        $("#zfzOrderNo").val("");
                    }
                });
                $("#ZfzRoomNo").keyup(function () {
                    if ($(this).val() == "") {
                        $("#zfzOrderId").val("");
                        $("#zfzOrderNo").val("");
                    }
                });
            }

            //客户转会员时加载基本信息
            if (data.Data.customerinfo.length > 0) {
                $("#Name").val(data.Data.customerinfo[0]);
                $("#Sex").find("option[value='" + data.Data.customerinfo[1] + "']").attr("selected", true);
                $("#CardType").find("option[value='" + data.Data.customerinfo[2] + "']").attr("selected", true);
                $("#CardNo").val(data.Data.customerinfo[3]);
                $("#Phone").val(data.Data.customerinfo[4]);
                $("#BirthDay").val(data.Data.customerinfo[5]);
            }
            WayPrint = data.Data.WayPrint;
            AuthFreeMemberCard = data.Data.AuthFreeMemberCard
            $("body").data("DiscountAuthorizationType", data.Data.DiscountAuthorizationType);
        }
    }
    SetOther(resdata);
    if (id == 0) {
        $("#divfa").html("会员发卡");
        $("#BtnSave").val("会员发卡")
        $("#showDiv").attr("style", "background: #EFEFEF; border: 1px solid #ddd; display: none");
        $("#ShowMd").attr("style", "background: #EFEFEF; border: 1px solid #ddd;");
        $("#CAdd").attr("style", "display: block;margin-top:0px");
        $("#CEdit").attr("style", "display: none;margin-top:0px");
        $("#CategoryId").removeAttr("disabled");
        $("#CategoryId").removeAttr("style");
        $("#CategoryId").attr("style", "width: 86px;");
        $("#CardInfoId").val(id);
        $("#pwdhide").removeAttr("style");
        $("#ShowFee").removeAttr("style");
        $("#ShowFee").attr("style", "padding-right:20px;line-height:30px;color:#333");

        $("#ShowName").removeAttr("style");
        $("#ShowName").attr("style", "padding-right:20px;line-height:30px;color:#333");
    } else {
        $("#divfa").html("会员编辑");
        $("#ShowMd").attr("style", "background: #EFEFEF; border: 1px solid #ddd;display: none");
        $("#showDiv").attr("style", "background: #EFEFEF; border: 1px solid #ddd;");
        $("#CEdit").attr("style", "display: block;margin-top:0px");
        $("#CAdd").attr("style", "display: none;margin-top:0px");
        $("#BtnSave").val("会员编辑");
        $("#ShowFee").attr("style", "display: none;");
        $("#ShowName").attr("style", "display: none;");
        //加载数据
        postRequest("/services/basicservice.aspx", { id: id }, "CardInfoUsl", "GetCardInfoInit", false, function (data) {
            if (data.State.Success) {
                $("#CCardNo").html(data.Data.CardNo);
                $("#CardInfoId").val(data.Data.Id);
                $("#Name").val(data.Data.MemberName);
                $("#Sex").val(data.Data.Sex);
                if (data.Data.MemberCardNo != "") {
                    $("#CardType").val(data.Data.MemberCardType);
                    $("#CardNo").val(data.Data.MemberCardNo);
                } else {
                    $("#MemberType").val("0");
                }
                $("#CategoryId").val(data.Data.CategoryId.toString());
                $("#Password").val(data.Data.Password);
                $("#Phone").val(data.Data.Phone);
                $("#BirthDay").val(formatDateStr(data.Data.BirthDay, "yyyy-MM-dd"));
                $("#SalerId").val(data.Data.SalerId);
                $("#Love").val(data.Data.Love);
                $("#Address").val(data.Data.Address);
                $("#Remark").val(data.Data.Remark);
                $("#TotalScore").html(data.Data.TotalScore.toFixed(2));
                $("#UsedScore").html(data.Data.UsedScore.toFixed(2));
                $("#UsableScore").html(data.Data.UsableScore.toFixed(2));
                $("#ConsumeTimes").html(data.Data.ConsumeTimes);
                $("#ConsumeAmount").html(data.Data.ConsumeAmount.toFixed(2));
                $("#StatusName").html(data.Data.StatusName);
                $("#FrozenScore").html(data.Data.FrozenScore.toFixed(2));
                $("#TotalAmount").html(data.Data.TotalAmount.toFixed(2));
                $("#UsedAmount").html(data.Data.UsedAmount.toFixed(2));
                $("#UsableAmount").html(data.Data.UsableAmount.toFixed(2));
                if (data.Data.YsAlready == true) {
                    $("#SalerId").attr("disabled", "disabled");
                    $("#SalerId").removeAttr("style");
                    $("#SalerId").attr("style", "background: #EFEFEF;width: 100px;");
                } else {
                    $("#SalerId").removeAttr("disabled");
                    $("#SalerId").removeAttr("style");
                    $("#SalerId").attr("style", "width: 100px;");
                }
                if (data.Data.OpenDate != "") {
                    $("#OpenDate").html(formatDateStr(data.Data.OpenDate, "yyyy-MM-dd"));
                } else {
                    $("#OpenDate").html("&nbsp;");
                }
                if (data.Data.ExprieDate != null && data.Data.ExprieDate != undefined & data.Data.ExprieDate != "/Date(-62135596800000)/" && data.Data.ExprieDate != "") {
                    $("#ExprieDate").html(formatDateStr(data.Data.ExprieDate, "yyyy-MM-dd"));
                } else {
                    $("#ExprieDate").html("长期有效");
                }
                if (data.Data.Status == 21 || data.Data.Status == 30) {
                    $("#BtnSave").attr("disabled", true);
                    $("#BtnSave").removeClass("bus_add");
                    $("#BtnSave").addClass("bus_dell");
                }
                if (data.Data.CurMemberCardCount > 1) {
                    $(".LiIsAddNewMemberInfo").show();
                    $("#AddNewMemberInfoNote").click(function () {
                        layer.tips("说明：该会员信息绑定多张会员卡，勾选新建资料后，编辑本卡会员信息将不会更改其他卡的会员信息。", $(this), {
                            tips: [1, '#3595CC'],
                            time: 6000
                        });
                    })
                }

            } else {
                alert(data.State.Des);
            }
        });
        $("#CategoryId").attr("disabled", "disabled");
        $("#CategoryId").removeAttr("style");
        $("#CategoryId").attr("style", "width: 86px;background:#CCC;");
        $("#pwdhide").attr("style", "display:none;");

    }
    $('#BirthDay').datetimepicker({
        lang: 'ch',
        format: 'Y-m-d',
        timepicker: false
    });

    //关闭
    $("#BtnDel").click(function () {
        closeWin();
    });

    $("#Amount").focus(function () {
        $(this).select();
    })
    //身份证
    $("#CardNo").blur(function () {
        var cardNo = $(this).val();
        var cardType = $("#CardType").val();
        if (cardType == "身份证" && cardNo != "") {
            var res = postSynRequest("/services/basicservice.aspx", { cardNo: cardNo }, "Common", "CheckIsIdCard");
            if (!res.State.Success) {
                alert(res.State.Errkey);
                return false;
            }
        }
        if (cardNo.length != 18) {
            return false;
        }
        $("#BirthDay").val(getBirthdayByCardNo(cardNo));
        postRequest("/services/basicservice.aspx", { cardNo: cardNo }, "Common", "GetZoneByIdCard", false, function (data) {
            if (data.State.Success) {
                $("#Address").val(data.Data.Address);
                if (data.Data.Customers != null) {
                    $("#Name").val(data.Data.Customers.Name);
                    $("#BirthDay").val(data.Data.Customers.Birthday);
                    $("#Phone").val(data.Data.Customers.Phone);
                }
            }
            else {
                alert(data.State.Errkey);
            }
        });
    })

    //查询 检测卡号是否存在
    $("#btnSearch").click(function () {
        CheckData();
    });

    $("#IsZrFz").click(function () {
        if ($(this).attr("checked")) {
            $("#zfzroom").show();
            $("#ShowFee").hide();
        }
        else {
            $("#zfzroom").hide();
            $("#ShowFee").show();
        }
        var Amount = $("#Amount").val();
        if (Amount != "") {
            var CardFees = $("#CardFees").val();
            var NoCardFee = $(this).attr("checked");
            if (NoCardFee) {
                var cards = parseFloat(Amount) - parseFloat(CardFees);
                $("#Amount").val(cards.toFixed(2));
            } else {
                var cardss = parseFloat(Amount) + parseFloat(CardFees);
                $("#Amount").val(cardss.toFixed(2));
            }
        }
    });
    $("#MemberCardNo").keypress(function (e) {
        if (e.which == 13) {// 判断所按是否回车键  
            CheckData();
        }
    });
    //保存
    $("#BtnSave").click(function () {
        var postData = preSave(orderid, isclock);
        if (!postData) {
            return false;
        }
        var id = $("#CardInfoId").val();
        $("#BtnSave").removeClass("bus_add");
        $("#BtnSave").addClass("bus_dell");
        $("#BtnSave").attr("disabled", "disabled");
        postRequest("/Services/BasicService.aspx", postData, "MemberUsl", "MemberAdd", false, function (data) {
            if (!data.State.Success) {
                $("#BtnSave").removeClass("bus_dell");
                $("#BtnSave").addClass("bus_add");
                $("#BtnSave").removeAttr("disabled");
                alert(data.State.Des);
            } else {
                if (id == 0) {
                    alert("添加成功");
                    if (WayPrint != "2" && WayPrint != undefined) {
                        if (confirm("会员发卡是否需要打印相关凭证")) {
                            PrintNewMember(data.Data.CardId, data.Data.CardNo, data.Data.GiveScore, WayPrint);
                            //openWin("/BillInfor/MemberDY.html?CardId=" + data.Data.CardId + "&CardNo=" + data.Data.CardNo + "&GiveScore=" + data.Data.GiveScore, 800, 400, "pwin2", WayPrint);
                        }
                    }
                } else {
                    alert("修改成功");
                }
                if (orderid == null || orderid == "" || orderid == undefined) {
                    $(top.main.document).find("#btnQuery").click();
                }
                closeWin();
            }
        });
    });

    $("#Amount").blur(function () {
        AmountBlur();
    });

    //读卡器操作
    //读卡
    $("#btnReadCard").click(function () {
        top.MemberCardRead(function (skh) {
            $("#MemberCardNo").val(skh);
            CheckData();
        });
    });
    //写卡
    $("#btnWriteCard").click(function () {
        var skh = $("#MemberCardNo").val();
        if (skh != "") {
            top.MemberCardWrite(skh, function (i) {
            });
        }
    });
    //清卡
    $("#btnClearCard").click(function () {
        top.MemberCardWrite("", function (i) {
        });
    });

    //读取主客身份证
    $("#ReadCard").click(function () {
        top.ReadIdCard(function (sName, CardNum, Address, sSex, sNat) {
            $("#Name").val(sName);
            $("#BirthDay").val(getBirthdayByCardNo(CardNum));
            $("#CardType").val('身份证');
            $("#CardNo").val(CardNum);
            $("#Sex").val(sSex);
            $("#Address").val(Address);
        });
    });
})

function AmountBlur() {
    $(".note_no").remove();
    $(".note").remove();
    $(".errorborder").removeClass('errorborder');
    var b_result = true;
    var Amount = $("#Amount").val();
    var CardFees = $("#CardFees").val();
    if (Amount != "" && !/^\d+(\.\d+)?$/.test(Amount)) {
        showTipsCollect(3, 'btnRead', '收款金额请输入数字', 'Amount');
        b_result = false;
    }
    var CategoryId = $("#CategoryId").val();
    if (CategoryId == "0") {
        showTipsCollect(3, 'btnRead', "请选择会员类型", 'CategoryId');
        b_result = false;
    }
    if (!b_result) return false;
    if (Amount == "" || Amount == null || Amount == undefined) {
        $("#TopAmount").val("0");
        $("#GiveScore").val("0");
    } else {
        var TopAmount = 0;
        if ($("#IsZrFz").attr("checked")) {
            TopAmount = parseFloat(Amount);
        } else {
            TopAmount = parseFloat(Amount) - parseFloat(CardFees);
        }
        //var NoCardFee = getSelectedByName("NoCardFee");
        //if (NoCardFee == "1") {
        //    $("#Amount").val((parseFloat(Amount) - parseFloat(CardFees)).toFixed(2));
        //}
        $("#Price").val(TopAmount);
        var result = postSynRequest("/services/basicservice.aspx", { Amount: TopAmount }, "CardInfoUsl", "GetTopAmount");
        if (result.State.Success) {
            $("#TopAmount").val(result.Data.TopAmount.toFixed(2));
            $("#GiveScore").val(result.Data.GiveScore);
        }
    }
}

function preSave(orderid, isclock) {
    //检查会员信息合法性
    $(".note_no").remove();
    $(".note").remove();
    $(".errorborder").removeClass('errorborder');
    var b_result = true;
    var id = $("#CardInfoId").val();
    var MemberCardNo = "";
    var PayMethodId = "";
    var PayMethodName = "";
    if (id == 0) {
        MemberCardNo = $("#MemberCardNo").val();
        if (MemberCardNo == "") {
            showTipsCollect(3, 'btnRead', '请输入卡号', 'MemberCardNo');
            b_result = false;
        }
        if (isContainChina(MemberCardNo)) {
            showTipsCollect(3, 'btnRead', '会员卡号包含中文字符', 'MemberCardNo');
            b_result = false;
        }
        var result = postSynRequest("/Services/BasicService.aspx", { id: id, CardNo: MemberCardNo }, "CardInfoUsl", "CheckIsCardNoById");
        if (result.State.Success) {
            showTipsCollect(3, 'btnRead', '该卡号已存在', 'MemberCardNo');
            b_result = false;
        }
        PayMethodId = $("#PayMethod").val();
        PayMethodName = $("#PayMethod option:selected").text();
        if (PayMethodId == null || PayMethodId == "" || PayMethodId == undefined) {
            showTipsCollect(3, 'btnRead', '请选择支付方式', 'PayMethod');
            b_result = false;
        }
    } else {
        MemberCardNo = $("#CCardNo").val();
    }
    var Name = $("#Name").val();
    if (Name == "") {
        showTipsCollect(3, 'btnRead', '请输入姓名', 'Name');
        b_result = false;
    }
    if (Name != "" && !/^[A-Za-z\u4e00-\u9fa5\s·]+$/.test(Name)) {
        showTipsCollect(3, 'btnRead', '姓名请输入中文英文', 'Name');
        b_result = false;
    }
    var CategoryId = $("#CategoryId").val();
    var CategoryName = $("#CategoryId option:selected").text();
    if (CategoryId == "0") {
        showTipsCollect(3, 'btnRead', "请选择会员类型", 'CategoryId');
        b_result = false;
    }
    var Sex = $("#Sex").val();
    var CardType = $("#CardType").val(); //证件类型
    var CardNo = $("#CardNo").val(); //证件号码
    var Phone = $("#Phone").val(); //手机号码
    var NoName = getSelectedByName("NoName");
    if (NoName != "1") {
        if (Phone == "" && CardNo == "") {
            showTipsCollect(3, 'btnRead', '身份证跟手机必须填一个', 'CardNo');
            showTipsCollect(3, 'btnRead', '', 'CardNo');
            b_result = false;
        }
        if (CardNo != "") {
            if (CardType == "身份证" && CardNo != "") {
                var res = postSynRequest("/services/basicservice.aspx", { cardNo: CardNo }, "Common", "CheckIsIdCard");
                if (!res.State.Success) {
                    showTipsCollect(3, 'btnRead', res.State.Errkey, 'CardNo');
                    b_result = false;
                }
                if (CardNo.length > 18) {
                    showTipsCollect(3, 'btnRead', '证件号码不能超过18位', 'CardNo');
                    b_result = false;
                }
                postRequest("/services/basicservice.aspx", { cardNo: CardNo }, "Common", "GetZoneByIdCard", false, function (data) {
                    if (data.State.Success) {
                        $("#Address").val(data.Data.Address);
                        if (data.Data.Customers != null) {
                            $("#BirthDay").val(data.Data.Customers.Birthday);
                        }
                    }
                    else {
                        showTipsCollect(3, 'btnRead', data.State.Errkey, 'CardNo');
                        b_result = false;
                    }
                });
            } else {
                if (!/^[a-z\d\u4E00-\u9FA5]+$/i.test(CardNo)) {
                    showTipsCollect(3, 'btnRead', "证件号码包含中文字符", 'CardNo');
                    b_result = false;
                }
            }
        }
        if (Phone != "" && !/^1[3456789][0-9]{9}$/.test(Phone)) {
            showTipsCollect(3, 'btnRead', "请输入正确的手机号", 'Phone');
            b_result = false;
        }
    }
    var Password = $("#Password").val();
    if (Password != "" && Password.length < 6) {
        showTipsCollect(3, 'btnRead', "密码至少要6位", 'Password');
        b_result = false;
    }
    var BirthDay = $("#BirthDay").val();
    var SalerId = $("#SalerId").val();
    var SalerMan = $("#SalerId option:selected").text();
    if (SalerId == "" || SalerId == undefined || SalerId == null) {
        showTipsCollect(3, 'btnRead', "请选择销售员", 'SalerId');
        b_result = false;
    }
    if (!b_result) return false;
    var Love = $("#Love").val();
    var Address = $("#Address").val();
    var Remark = $("#Remark").val();
    var Amount = "";
    var r_result = true;
    var PrepaidEnable = $("#PrepaidEnable").val();
    if (id == 0) {
        Amount = $("#Amount").val();
        if (Amount == "") {
            if (PrepaidEnable == "true") {
                if (!confirm("没有收取卡费是否继续")) {
                    r_result = false;
                }
            }
        }
        if (Amount != "" && !/^\d+(\.\d+)?$/.test(Amount)) {
            showTipsCollect(3, 'btnRead', '收款金额请输入数字', 'Amount');
            r_result = false;
        }
        if (parseFloat(Amount) < 0) {
            showTipsCollect(3, 'btnRead', '收款金额不能小于0', 'Amount');
            r_result = false;
        }
        var OpenAmount = $("#OpenAmount").val();
        var CardFees = $("#CardFees").val();
        var NoCardFee = getSelectedByName("NoCardFee");
        if (PrepaidEnable == "true") {
            if (NoCardFee == "1" || $("#IsZrFz").attr("checked")) {
                if ((parseFloat(Amount) - parseFloat(OpenAmount)) < 0) {
                    showTipsCollect(3, 'btnRead', '收款金额不能小于开卡时默认金额', 'Amount');
                    r_result = false;
                }
            } else {
                if (((parseFloat(Amount) - parseFloat(CardFees)) - parseFloat(OpenAmount)) < 0) {
                    showTipsCollect(3, 'btnRead', '收款金额不能小于开卡时默认金额', 'Amount');
                    r_result = false;
                }
            }
        }
    }
    var isadjust = "false";
    if (orderid != "" && orderid != null && orderid != undefined && isclock == "1") {
        if (confirm("是否自动进行房价调整?")) {
            isadjust = "true";
        }
    }
    if (isContainChina($("#ManualNumber").val())) {
        showTipsCollect(3, 'btnRead', '手工单号不能输入汉字', 'ManualNumber');
        r_result = false;
    }
    var ManualNumber = $("#ManualNumber").val();

    var ZrKfOrderId = $("#zfzOrderId").val();
    var ZrKfOrderNo = $("#zfzOrderNo").val();

    if ($("#IsZrFz").attr("checked")) {
        if (ZrKfOrderId == "") {
            showTipsCollect(3, 'btnRead', '勾选卡费转入房账时，必须选择转入的房间', 'ZfzRoomNo');
            r_result = false;
        }
    } else {
        ZrKfOrderId = "";
        ZrKfOrderNo = "";
    }

    var IsAddNewMemberInfo = false;
    if ($("#IsAddNewMemberInfo").attr("checked")) {
        IsAddNewMemberInfo = true;
    }
    

    if (!r_result) return false;
    return {
        id: id,
        MemberCardNo: MemberCardNo,
        PayMethodId: PayMethodId,
        PayMethodName: PayMethodName,
        Amount: $("#CardFees").val(),
        Name: Name,
        Sex: Sex,
        CategoryName: CategoryName,
        CardType: CardType,
        CardNo: CardNo,
        CategoryId: CategoryId,
        Password: Password,
        Phone: Phone,
        BirthDay: BirthDay,
        SalerId: SalerId,
        SalerMan: SalerMan,
        Love: Love,
        Address: Address,
        Remark: Remark,
        TopAmount: $("#TopAmount").val(),
        GiveScore: $("#GiveScore").val(),
        Price: $("#Price").val(),
        NoCardFee: getSelectedByName("NoCardFee"),
        orderid: orderid,
        isadjust: isadjust,
        ManualNumber: ManualNumber,
        ZrKfOrderId: ZrKfOrderId,
        ZrKfOrderNo: ZrKfOrderNo,
        IsAddNewMemberInfo: IsAddNewMemberInfo
    }
}
function CategoryType() {
    $("#IsZrFz").attr("checked", false);
    $("#zfzroom").hide();
    var CategoryId = $("#CategoryId").val()
    postRequest("/services/basicservice.aspx", { id: CategoryId }, "MemberCategoryUsl", "GetMemberCategoryById", false, function (data) {
        if (data.State.Success) {
            $("#PrepaidEnable").val(data.Data.mcategory.PrepaidEnable.toString());
            if (data.Data.mcategory.PrepaidEnable == true) {
                $("#Amount").val((data.Data.mcategory.CardFee + data.Data.mcategory.OpenAmount).toFixed(2));
                $("#Amount").removeAttr("disabled");
                $("#Amount").removeAttr("style");
                $("#Amount").attr("style", "width: 70px");
            } else {
                $("#Amount").val(data.Data.mcategory.CardFee.toFixed(2));
                $("#Amount").attr("disabled", "disabled");
                $("#Amount").removeAttr("style");
                $("#Amount").attr("style", "background: #EFEFEF;width: 70px");
            }
            $("#CardFees").val(data.Data.mcategory.CardFee.toFixed(2));
            if (data.Data.mcategory.OpenAmount != null && data.Data.mcategory.OpenAmount != "" && data.Data.mcategory.OpenAmount != undefined) {
                $("#OpenAmount").val(data.Data.mcategory.OpenAmount.toFixed(2));
            } else {
                $("#OpenAmount").val("0");
            }
            AmountBlur();
        }
    });
}
function CheckData() {
    $(".note_no").remove();
    $(".note").remove();
    $(".errorborder").removeClass('errorborder');
    var MemberCardNo = $("#MemberCardNo").val();
    var id = $("#CardInfoId").val();
    if (MemberCardNo == "") {
        showTipsCollect(3, 'btnRead', '请输入卡号', 'MemberCardNo');
        return false;
    }
    if (isContainChina(MemberCardNo)) {
        showTipsCollect(3, 'btnRead', '会员卡号包含中文字符', 'MemberCardNo');
        return false;
    }
    var result = postSynRequest("/Services/BasicService.aspx", { id: id, CardNo: MemberCardNo }, "CardInfoUsl", "CheckIsCardNoById");
    if (result.State.Success) {
        showTipsCollect(3, 'btnRead', '该卡号已存在', 'MemberCardNo');
        return false;
    } else {
        showTipsCollect(1, 'btnRead', '该卡号可用', 'MemberCardNo');
        return true;
    }
}

function RefreshParentAction() {
    var Amount = $("#Amount").val();
    if (Amount != "") {
        var CardFees = $("#CardFees").val();
        var NoCardFee = getSelectedByName("NoCardFee");
        if (NoCardFee == "1") {
            $("#cardfeezr").hide();
            $("#IsZrFz").attr("checked", false);
            $("#zfzroom").hide();

            var cards = parseFloat(Amount) - parseFloat(CardFees);
            $("#Amount").val(cards.toFixed(2));
        } else {
            $("#cardfeezr").show();

            var cardss = parseFloat(Amount) + parseFloat(CardFees);
            $("#Amount").val(cardss.toFixed(2));
        }
    }
}
function CacelAction() {
    $("#NoCardFee").removeAttr("checked");
}

function BtnCardFee() {
    if ($("#CategoryId").val() != "0") {
        //免卡费
        if ($("#NoCardFee:checked").val() == "1" && AuthFreeMemberCard == "1") {
            top.AuthorizationWin = window;
            RefreshParentAction = RefreshParentAction;//确认后需要刷新的数据
            CacelAction = CacelAction;////取消后需要刷新的数据
            if ($("body").data("DiscountAuthorizationType") == "1") {
                openWin("/FrontOp/WeChatAuthorization.html?authtype=2&remark=" + escape("会员发卡免卡费"), 400, 200, "authorizationwin");
            } else
            openWin("/Set/FunctionAuthorization.html?FunctionName=AuthFreeMemberCard", 400, 200, "authorizationwin");
        } else {
            RefreshParentAction();
        }
    } else {
        $("#NoCardFee").removeAttr("checked");
        alert("请选择会员类型");
    }
}