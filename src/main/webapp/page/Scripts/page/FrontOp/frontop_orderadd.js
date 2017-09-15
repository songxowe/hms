var Set_InDeposit = undefined;
var Set_IdCardNumber = undefined;
var Set_CardOneRoom = undefined;
var Set_CheckChangePrice = undefined;
var Set_MinDeposit = undefined;
var Set_LeaveTime = "12:00";
var Set_HourRoomPrice = undefined;
var Set_BookingLive = undefined;
var Set_CompleteCheck = undefined;
var set_AgainGuest = undefined;
var CategoryName = undefined;
var PaymentCheckOk = undefined;
var Set_UserRoomDiscount = undefined;// 操作员折扣设置
var Set_WayPrint = undefined;// 打印方式
var MemberPayMthodAuthority = false;
var payMothed = null;          //支付方式列表
var isAliBook = false; //是否为阿里预订单
//预定转入住DetailId
var bookDetailId = "";
var IsOTABook = false;
var RoomNumber = 10;
var hasBusinessReport = "";
$(function () {
    //回车代替TAB
    $("input:text").keypress(function (e) {
        if (e.which == 13) {// 判断所按是否回车键
            if ($(this).attr("id") == "MemberCardNo") {
                $("#Customer_Name").focus();
                $("#Customer_Name").select();
                return;
            }
            var inputs = $("input:text"); // 获取表单中的所有输入框
            var idx = inputs.index(this); // 获取当前焦点输入框所处的位置
            if (idx < inputs.length - 1) {// 判断是否是最后一个输入框
                inputs[idx + 1].focus(); // 设置焦点
                inputs[idx + 1].select(); // 选中文字
            }
            return; // 取消默认的提交行为
        }
    });

    //初始化控件
    //var Set_LeaveTimeItem = postSynRequest("/services/basicservice.aspx", { name: "DayCheckTime" }, "Common", "GetXTCSByItem");
    //if (Set_LeaveTimeItem.State.Success) {
    //    Set_LeaveTime = Set_LeaveTimeItem.Data.Value;
    //}
    $('#Customer_Birthday').datetimepicker({
        lang: 'ch',
        format: 'Y-m-d',
        timepicker: false
    });
    var roomOptions = {
        minChars: 0,
        width: 120,
        matchContains: true,
        mustMatch: true,
        max:RoomNumber,
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
    var cardOptions = {
        minChars: 1,
        width: 420,
        matchContains: true,
        mustMatch: false,
        dataType: 'json',
        selectFirst: true,
        delay: 800,
        extraParams: { IsMustQuery: function () { return IsMustQuery(); } },
        parse: function (data) {   // 处理返回的json串，以供后续的使用
            var rows = [];         // 处理后 返回的一个 数组
            for (var i = 0; i < data.length; i++) { // 如果你返回的是一个 类似{'my':[{'name':'value1'},{'name':'value2'}]}
                rows[rows.length] = {
                    data: data[i], //返回的参数,供后续的函数调用
                    value: cardOptions.formatItem(data[i]), //鼠标经过时 在 输入框显示的值
                    result: cardOptions.formatResult(data[i])  //选中后在 输入框显示的值
                }
            }
            return rows;
        },
        formatItem: function (row, rowNum, rowCount, searchItem) {
            return "<span class='memberdata' style='width:150px;display:inline-block'>卡号：" + row.CardNo + "</span><span style='width:50px;margin-right:50px;dispaly:inline-block'>姓名：" + row.MemberName + "</span><br/><span style='width:150px;display:inline-block'>手机：" + row.Phone + "</span><span style='width:70px;display:inline-block'>" + row.CategoryName + "</span>";
        },
        formatMatch: function (row, rowNum, rowCount) {
            return row.CardNo + " " + row.Phone + " " + row.pym;
        },
        formatResult: function (row, rowNum, rowCount) {
            return row.CardNo;
        }
    };

    var contractunitOptions = {
        minChars: 1,
        width: 290,
        matchContains: true,
        mustMatch: true,
        formatItem: function (row, rowNum, rowCount, searchItem) {
            return "<span style='width:170px;display:inline-block'>单位：" + row.Name + "</span><span style='width:70px;display:inline-block'>" + row.UnitCode + "</span>";
        },
        formatMatch: function (row, rowNum, rowCount) {
            return row.Name + " " + row.PYM + " " + row.UnitCode +" "+row.Phone;
        },
        formatResult: function (row, rowNum, rowCount) {
            return row.Name;
        }
    };

    var CustomerOptions = {
        minChars: 1,
        width: 450,
        matchContains: true,
        mustMatch: false,
        dataType: 'json',
        selectFirst: true,
        delay: 400,
        parse: function (data) {   // 处理返回的json串，以供后续的使用
            var rows = [];         // 处理后 返回的一个 数组
            for (var i = 0; i < data.length; i++) { // 如果你返回的是一个 类似{'my':[{'name':'value1'},{'name':'value2'}]}
                rows[rows.length] = {
                    data: data[i], //返回的参数,供后续的函数调用
                    value: CustomerOptions.formatItem(data[i]), //鼠标经过时 在 输入框显示的值
                    result: CustomerOptions.formatResult(data[i])  //选中后在 输入框显示的值
                }
            }
            $("#Customer_Id").val("");//清空结果,必须选中一个值
            return rows;
        },
        formatItem: function (row, rowNum, rowCount, searchItem) {
            var html = "";
            html = "<span style='width:100px;display:inline-block'>姓名：" + row.Name + "</span><span style='width:200px;display:inline-block'>" + row.CardType + "：" + row.CardNo + "</span>";
            return html;
        },
        formatMatch: function (row, rowNum, rowCount) {
            return row.Name + " " + row.CardNo + " " + row.PYName;
        },
        formatResult: function (row, rowNum, rowCount) {
            return row.Name;
        }
    };

    $("#Customer_Name").autocomplete("/services/basicservice.aspx?classname=RZXX&method=CustomerJson", CustomerOptions);
    $("#Customer_Name").result(function (event, data, formatted) {
        $("#Customer_Id").val(data.Id);
        if (data != null && data != undefined) {
            CustomerNameBlur();
        }
    });

    $("#Customer_Name").change(function () {
        if (this.value == "") {
            $("#Customer_Id").val("");
        }
    });
    $("#Customer_Name").keyup(function () {
        if ($(this).val() == "") {
            $("#Customer_Id").val("");
        }
    });

    $("#IsMustQuery").change(function () {
        $("#MemberCardNo").flushCache();
    });



    //绑定会员卡号
    $("#MemberCardNo").autocomplete("/services/basicservice.aspx?classname=RZXX&method=MemberDataJson", cardOptions);
    $("#MemberCardNo").result(function (event, data, formatted) {
        $(".note_no").remove();
        $(".errorborder").removeClass('errorborder');
        if (data != null && data != undefined) {
            MemberCardNoBlur();
        }
    });

    //$("#MemberCardNo").attr('disabled', 'disabled');
    //$("#MemberCardNo").val('无可用会员卡');

    //押金输入框 事件
    $("input[name='PayAmount']").live("focus", function () {
        $(this).select();
    })

    $("input[name='PayAmount']").live("blur", function () {
        if (isNumeric($(this).val())) {
            $(this).val(new Number($(this).val()).toFixed(2));
        }
    });

    //房价输入框 事件
    $("#Price").focus(function () {
        $(this).select();
    }).blur(function () {
        if (isNumeric($(this).val())) {
            if (Set_UserRoomDiscount == "1" && $(this).attr("data-price") != undefined && $(this).attr("data-price") != "0") {
                var data = postSynRequest("/services/basicservice.aspx", { RoomTypeId: $("#RoomTypeId").val() }, "RZXX", "GetUserDiscount");

                if (data.State.Success) {
                    var discountprice = parseFloat($("#Price").attr("data-price")) * data.Data.Discount;
                    var lastprice = $("#Price").attr("data-lastprice");
                    var remark = escape("入住时修改房价");
                    if (lastprice != undefined && lastprice != "") {
                        if ((parseFloat($("#Price").val()) < parseFloat(lastprice) && parseFloat(lastprice) < discountprice) || (parseFloat($("#Price").val()) < discountprice && parseFloat(lastprice) >= discountprice)) {//跟熟客上次入住房价比较
                            top.AuthorizationWin = window;
                            returnUpdatePrice = UpdatePrice;
                            getChangePrice = getTotalAccount;
                            if (data.Data.DiscountAuthorizationType == "1") {//微信授权 2016-01-10
                                openWin("/FrontOp/WeChatAuthorization.html?remark=" + remark + "&authtype=1&price=" + $("#Price").attr("data-price") + "&discountprice=" + $("#Price").val() + "&roomtypeid=" + $("#RoomTypeId").val(), 400, 200, "authorizationwin");
                            } else {
                                openWin("/FrontOp/DiscountAuthorization.html?price=" + $("#Price").attr("data-price") + "&discountprice=" + $("#Price").val() + "&roomtypeid=" + $("#RoomTypeId").val(), 400, 200, "authorizationwin");
                            }
                        }
                    } else if (parseFloat($("#Price").val()) < discountprice) {
                        top.AuthorizationWin = window;
                        returnUpdatePrice = UpdatePrice;
                        getChangePrice = getTotalAccount;
                        if (data.Data.DiscountAuthorizationType == "1") {//微信授权 2016-01-10
                            openWin("/FrontOp/WeChatAuthorization.html?remark=" + remark + "&authtype=1&price=" + $("#Price").attr("data-price") + "&discountprice=" + $("#Price").val() + "&roomtypeid=" + $("#RoomTypeId").val(), 400, 200, "authorizationwin");
                        } else {
                            openWin("/FrontOp/DiscountAuthorization.html?price=" + $("#Price").attr("data-price") + "&discountprice=" + $("#Price").val() + "&roomtypeid=" + $("#RoomTypeId").val(), 400, 200, "authorizationwin");
                        }
                    }
                }
                else
                    alert(data.State.Errkey);
            }
            $(this).val(new Number($(this).val()).toFixed(2));
        }
    });

    var roomId = getQueryParam("id");
    var roomNo = getQueryParam("no");
    var postDate = { roomId: roomId, roomNo: roomNo };
    var bookid = getQueryParam("bookid");
    if (bookid != "") {
        postDate = { bookid: bookid, roomId: roomId, roomNo: roomNo };
    }

    var continues = getQueryParam("continues");
    if (continues == "1") {
        $("#RoomTypeId").removeClass("disabledcolor");
    } else {
        $("#RoomTypeId").addClass("disabledcolor");
    }
     //定制版营业报表
    hasBusinessReport = getQueryParam("hasBusinessReport");
    if (hasBusinessReport != "true") {
        $("#divBusinessReport").hide();
    } else {
        $("#divBusinessReport").show()
    }
    postRequest("/services/basicservice.aspx", postDate, "RZXX", "OrderAddInit", false, function (data) {
        if (data.State.Success) {
            //初始化系统参数
            Set_InDeposit = data.Data.Set_InDeposit;
            Set_MinDeposit = data.Data.Set_MinDeposit;
            Set_IdCardNumber = data.Data.Set_IdCardNumber;
            Set_CardOneRoom = data.Data.Set_CardOneRoom;
            Set_CheckChangePrice = data.Data.Set_CheckChangePrice;
            Set_HourRoomPrice = data.Data.Set_HourRoomPrice;
            Set_BookingLive = data.Data.Set_BookingLive;
            Set_CompleteCheck = data.Data.Set_CompleteCheck;
            set_AgainGuest = data.Data.set_AgainGuest;
            Set_UserRoomDiscount = data.Data.Set_UserRoomDiscount;//操作员折扣设置
            Set_WayPrint = data.Data.Set_WayPrint;//打印方式
            if (data.Data.Set_LeaveTime != "" && data.Data.Set_LeaveTime != null) {
                Set_LeaveTime = data.Data.Set_LeaveTime
            } else {
                Set_LeaveTime = "12:00"
                if (data.Data.WantLeaveDate.indexOf(':') < 0) {
                    data.Data.WantLeaveDate +=  Set_LeaveTime
                }
            }
            isAliBook = data.Data.isAliBook;
            RoomIsEnable = data.Data.RoomIsEnable;
            if (data.Data.MemberCardNoIsPerfectMatch && data.Data.MemberCardNoIsPerfectMatch==1) {
                $("#IsMustQuery").attr("checked", "checked");
            }
            if (!RoomIsEnable) {//判断是否开启拼房 用于显示床号  2019-09-08
                $("#BedNo").hide();
                $("#BedNo").prev().hide()
            }
            MemberPayMthodAuthority = data.Data.MemberPayMthodAuthority;//储值支付现在
            if (data.Data.set_MonthRoom == "0") {
                $($("#OpenType option")[4]).remove();
            }
            //是否启用电子签名
            if (data.Data.ElectronicSignature != "" && data.Data.ElectronicSignature == "1") {
                $("#ShowSign").show();
                $("#ShowSign").data("ComId", data.Data.ComId);
                $("#ShowSign").data("ShopId", data.Data.ShopId);
                $("#ShowSign").data("PmsImageHost", data.Data.PmsImageHost);
            }
            //绑定销售员
            if (data.Data.SalesmanList != null && data.Data.SalesmanList.length > 0) {
                var salesman = $("#Salesman");
                for (var i = 0; i < data.Data.SalesmanList.length; i++) {
                    var item = data.Data.SalesmanList[i];
                    salesman.append('<option value="' + item.Id + '">' + item.Name + '</option>');
                }
                if (data.Data.SalesmanId != "" && data.Data.SalesmanId != null)
                {
                	salesman.val(data.Data.SalesmanId);
                }
            }

            //绑定房型
            if (data.Data.RoomTypes != null && data.Data.RoomTypes.length > 0) {
                for (var i = 0; i < data.Data.RoomTypes.length; i++) {
                    var item = data.Data.RoomTypes[i];
                    $("#RoomTypeId").append('<option value="' + item.Id + '" data-allowhour="' + item.AllowHour + '">' + item.Name + '</option>');
                }
            }
            $("#RoomTypeId").val(data.Data.RoomTypeId);
            var allowHour = $("#RoomTypeId option:selected").attr('data-allowhour');
            if (allowHour == "false") {
                $($("#OpenType option")[2]).remove();
            }
            //绑定房间
            //$("#RoomNo").addClass('disabledcolor');
            if (data.Data.Rooms != null && data.Data.Rooms.length > 0) {
                roomOptions.max = data.Data.Rooms.length;
                $("#RoomNo").autocomplete(data.Data.Rooms, roomOptions);
                $("#RoomNo").result(function (event, data, formatted) {
                    if (data != null)
                        $("#RoomId").val(data.Id);
                });
                $("#RoomNo").change(function () {
                    if (this.value == "") {
                        $("#RoomId").val("");
                    }
                });
                $("#RoomNo").keyup(function () {
                    if ($(this).val() == "") {
                        $("#RoomId").val("");
                    }
                });
            }
            else {
                $("#RoomNo").attr('disabled', 'disabled');
                $("#RoomNo").val('无可开房号');
            }
            //绑定联房房号
            if (data.Data.AppendRooms != null && data.Data.AppendRooms.length > 0) {
                roomOptions.max = data.Data.AppendRooms.length;
                $("#GroupRoomNo").autocomplete(data.Data.AppendRooms, roomOptions);
                $("#GroupRoomNo").result(function (event, data, formatted) {
                    if (data != null)
                        $("#GroupRoomId").val(data.Id);
                });
                $("#GroupRoomNo").change(function () {
                    if (this.value == "") {
                        $("#GroupRoomId").val("");
                    }
                });
                $("#GroupRoomNo").keyup(function () {
                    if ($(this).val() == "") {
                        $("#GroupRoomId").val("");
                    }
                });
            }
            else {
                $("#GroupRoomNo").attr('disabled', 'disabled');
                $("#GroupRoomNo").addClass('disabledcolor');
                $("#GroupRoomNo").val('无可联房号');
            }
            if (!data.Data.IsHavMember) {
                $("#MemberCardNo").attr('disabled', 'disabled');
                $("#MemberCardNo").val('无可用会员卡');
            }
            ////绑定会员卡号
            //if (data.Data.MemberCards != null && data.Data.MemberCards.length > 0) {
            //    $("#MemberCardNo").autocomplete(data.Data.MemberCards, cardOptions);
            //    $("#MemberCardNo").result(function (event, data, formatted) {
            //        $(".note_no").remove();
            //        $(".errorborder").removeClass('errorborder');
            //        if (data != null && data != undefined) {
            //            MemberCardNoBlur();
            //        }
            //    });
            //}
            //else {
            //    $("#MemberCardNo").attr('disabled', 'disabled');
            //    $("#MemberCardNo").val('无可用会员卡');
            //}

            //绑定客人来源
            if (data.Data.Sources.length > 0) {
                for (var i = 0; i < data.Data.Sources.length; i++) {
                    var item = data.Data.Sources[i];
                    //if (("," + data.Data.Schemes.Source + ",").indexOf("," + item.MXValue + ",") >= 0) {
                    //    $("#Source").append('<option value="' + item.MXName + '">' + item.MXName + '</option>');
                    //}
                    //else {
                    //    $("#Source").append('<option value="' + item.MXName + '">' + item.MXName + '</option>');
                    //}
                    $("#Source").append('<option value="' + item.MXName + '">' + item.MXName + '</option>');
                }
            }


            ////绑定房价方案
            var SchemeId = "";
            var DefaultSource = "";
            var Price = "";
            if (data.Data.Schemes != null && data.Data.Schemes.length > 0) {
                for (var i = 0; i < data.Data.Schemes.length; i++) {
                    var item = data.Data.Schemes[i];
                    if (item.IsDefault == 1) {
                        var Sources = item.Source.split(",");
                        for (var j = 0; j < Sources.length; j++) {
                            DefaultSource = Sources[0];
                        }
                        SchemeId = item.Id;
                        Price = item.Price;
                        break;
                    }
                }
            }
            if (DefaultSource != "") {
                $("#Source").val(DefaultSource);
            }
            if (SchemeId != "") {
                $("#SchemeId").val(SchemeId);
            }
            if (Price != "") {
                $("#Price").val(Price.toFixed(2));
                $("#Price").attr("data-price", Price.toFixed(2));
            }

            //绑定证件类型
            if (data.Data.CardTypes != null && data.Data.CardTypes.length > 0) {
                var obj = $("#divEditRow tbody tr td").find("select[name='RowCardType']")[0];
                for (var i = 0; i < data.Data.CardTypes.length; i++) {
                    var item = data.Data.CardTypes[i];
                    $("#Customer_CardType").append('<option value="' + item.Name + '">' + item.Name + '</option>');
                    $(obj).append('<option value="' + item.Name + '">' + item.Name + '</option>');
                }
                $("#Customer_CardType").val('身份证');
                $(obj).val('身份证');
            }
            //绑定民族
            if (data.Data.Ethnics != null && data.Data.Ethnics.length > 0) {
                var obj = $("#divEditRow tbody tr td").find("select[name='RowEthnic']")[0];
                for (var i = 0; i < data.Data.Ethnics.length; i++) {
                    var item = data.Data.Ethnics[i];
                    $("#Customer_Ethnic").append('<option value="' + item.Name + '">' + item.Name + '</option>');
                    $(obj).append('<option value="' + item.Name + '">' + item.Name + '</option>');
                }
                $("#Customer_Ethnic").val('汉族');
                $(obj).val('汉族');
            }
            //绑定支付方式
            if (data.Data.PayMethods != null && data.Data.PayMethods.length > 0) {
                for (var i = 0; i < data.Data.PayMethods.length; i++) {
                    var item = data.Data.PayMethods[i];
                    $("#PayMethod").append('<option value="' + item.Id + '">' + item.Name + '</option>');
                }
                payMothed = data.Data.PayMethods;
            }
            $("#PayMethod").append('<option value="-3">信用预授权</option>');

            if (getQueryParam("Source") == "协议单位") {
                $("#Source").val("协议单位");
            }
            if (data.Data.Book == null) {
                $("#RoomId").val(data.Data.RoomId);
                $("#RoomNo").val(data.Data.RoomNo);
                $("#EnterDate").val(data.Data.Date);
                $("#WantLeaveDate").val(data.Data.WantLeaveDate);
                Source();
                if (getQueryParam("Source") == "协议单位") {
                    $("#ContractUnit").val(getQueryParam("ContractUnit"));
                    $("#ContractUnitId").val(getQueryParam("ContractUnitId"));
                    GetContractUnitPrice();
                }
            }
            else {//预定转入住
                $(".ordertitle").html('预定转入住');
                $(".bookno").show();
                $("#BookNo").html(data.Data.Book.BookNo);
                if (data.Data.RoomNo != "" && data.Data.RoomNo != null && data.Data.RoomNo != undefined) {
                    $("#RoomNo").val(data.Data.RoomNo);
                } else {
                    if (data.Data.Book.RoomNos != "") {
                        $("#btnRead").html("<span class='formTips prompt'>" + data.Data.Book.Rooms + "已经开出，请选择其他房间办理入住</span>");
                    }
                }
                IsOTABook = data.Data.Book.SwitchId > 0;
                $("#MemberCardNo").val(data.Data.Book.MemberCardNo);
                if (data.Data.Book.OpenType == 2) {
                    $("#OpenType").val(data.Data.Book.OpenType);
                }
                MemberCardNoBlur();
                $("#PayMethod").val("-2");
                $("#PayMethod").change();
                $("#Source").val(data.Data.Book.Source);
                Source();
                $("#SchemeId").val(data.Data.Book.SchemeId);
                if (data.Data.Book.OpenType == 1) {
                    Scheme(data.Data.Book.OpenType);
                }
                if (data.Data.Book.Source == "协议单位") {
                    $("#ContractUnit").val(data.Data.Book.ContractUnitName);
                    $("#ContractUnitId").val(data.Data.Book.ContractUnitId);
                    GetContractUnitPrice();
                }
                //提前入住的更新房价
                if (getQueryParam("newprice") == "1") {
                    $("#Price").val(data.Data.Book.Price.toFixed(2));
                    $("#Price").attr("data-price", data.Data.Book.Price.toFixed(2));
                }//不是提前入住，比如当天预订，当天入住的应该按预订的房价
                else if (data.Data.Book.StrEnterDate == data.Data.Date.substr(0, 10)) {
                    $("#Price").val(data.Data.Book.Price.toFixed(2));
                    $("#Price").attr("data-price", data.Data.Book.Price.toFixed(2));
                }else if (data.Data.Book.StrEnterDate < data.Data.Date.substr(0, 10)) {//如果客人凌晨来，价格应该按照预定的价格
                    $("#Price").val(data.Data.Book.Price.toFixed(2));
                    $("#Price").attr("data-price", data.Data.Book.Price.toFixed(2));
                }
                //$("#Price").attr('disabled', 'disabled');
                $("#EnterDate").val(data.Data.Date);
                //$("#WantLeaveDate").val(data.Data.Book.StrLeaveDate + " " + Set_LeaveTime);

                if (data.Data.Book.OpenType == 2) {
                    var enterdate = data.Data.Book.EnterDate.substr(6).replace("/", "").replace(")", "")
                    var leavedate = data.Data.Book.LeaveDate.substr(6).replace("/", "").replace(")", "")
                    $("#Days").val((parseInt(leavedate) - parseInt(enterdate)) / 3600000);
                } else {
                    $("#Days").val(data.Data.Book.Days);
                }
                $("#OpenType").val(data.Data.Book.OpenType);
                if (data.Data.Book.OpenType == 2) {
                    $("#SchemeId option[class='Xuanze']").remove();
                    $("#SchemeId").append("<option value='' class='Xuanze' selected='selected'>请选择房价方案</option>");
                    $("#SchemeId").attr('disabled', 'disabled');
                    $("#SchemeId").removeAttr("style");
                    $("#SchemeId").attr("style", "width: 120px; margin-right: 40px; display: inline;background:#EFEFEF");
                    //钟点房处理  2016-09-09
                    $("label[data-type='day']").html("入住小时：");
                }
                $("#Customer_Name").val(data.Data.Book.Name);
                $("#Customer_Phone").val(data.Data.Book.Phone);
                $(".bookdeposit").show();
                $("#BookDeposit").val(data.Data.Book.Deposit.toFixed(2));
                //$("#ReduceDeposit").val(data.Data.Book.ReduceDeposit.toFixed(2));
                bookDetailId = data.Data.Book.Id;
                $("#Days").blur();
                if (data.Data.GroupRoomNo != "" && $("#GroupRoomNo").val() != "无可联房号") {
                    $("#GroupRoomNo").val(data.Data.GroupRoomNo);
                    $("#GroupRoomId").val(data.Data.GroupRoomId);
                }

                if (data.Data.bookremark != "") {
                    $("#Remark").val(data.Data.BookRemark);
                }

                if (Set_BookingLive != "1") {
                    $("#SchemeId").attr('disabled', 'disabled');
                    $("#SchemeId").addClass('disabledcolor');
                    $("#Source").attr('disabled', 'disabled');
                    $("#Source").addClass('disabledcolor');
                    $("#OpenType").attr('disabled', 'disabled');
                    $("#OpenType").addClass('disabledcolor');
                    $("#MemberCardNo").attr('disabled', 'disabled');
                    $("#MemberCardNo").addClass('disabledcolor');
                }
                else {
                    $("#SchemeId").removeAttr('disabled');
                    $("#Source").removeAttr('disabled');
                    $("#OpenType").removeAttr('disabled');
                    $("#MemberCardNo").removeAttr('disabled');
                }
                //简单点平台来源不允许修改来源
                if (data.Data.Book.Source == "简单点") {
                    $("#Source").attr("disabled", "disabled");
                }
                var preorderid = getQueryParam("preorderid");
                if (preorderid == "" && roomNo != "" && roomId != "") {
                    $("#RoomId").val(roomId);
                    $("#RoomNo").val(roomNo);
                }
            }
            if (Set_CheckChangePrice == "1") {
                $("#Price").removeAttr('disabled');
            }
            else {
                $("#Price").attr('disabled', 'disabled');
                $("#Price").addClass('disabledcolor');
            }

            if (roomNo != "" && roomNo != null && roomNo != undefined) {
                var res = postSynRequest("/services/basicservice.aspx", { RoomNo: roomNo }, "RZXX", "GetRoomNo");
                if (res.State.Success) {
                    var preorderid = getQueryParam("preorderid");
                    getTotalAccount();//显示总房价
                    if (preorderid == "") return;
                    if (bookid == "" && res.Data.Order != null) {//继续开房
                        if ($("#GroupRoomNo").val() != "无可联房号") {
                            $("#GroupRoomNo").val(res.Data.Order.RoomNo);
                            $("#GroupRoomId").val(res.Data.Order.RoomId);
                        }
                        $("#RoomTypeId").removeAttr("disabled");
                        $("#RoomTypeId").val(res.Data.Order.RoomTypeId);
                        $("#SchemeId").val(res.Data.Order.SchemeId);
                        $("#Source").val(res.Data.Order.Source);
                        $("#MemberCardNo").val(res.Data.Order.MemberCardNo);
                        $("#OpenType").val(res.Data.Order.OpenType);
                        $("#Price").val(res.Data.Order.Price.toFixed(2));
                        $("#Price").attr("data-price", res.Data.Order.Price.toFixed(2));
                        $("#EnterDate").val(formatDateStr(res.Data.Order.EnterDate, "yyyy-MM-dd hh:mm"));
                        $("#Days").val(res.Data.Order.Days);
                        $("#WantLeaveDate").val(formatDateStr(res.Data.Order.WantLeaveDate, "yyyy-MM-dd hh:mm"));
                    }
                    if (bookid == "" && res.Data.Rooms != null) {
                        $("#RoomNo").val(res.Data.Rooms.RoomNo);
                        $("#RoomId").val(res.Data.Rooms.Id);
                    }
                    if (preorderid != "" && res.Data.IsShowDoorCard) {//继续开房
                        openWin('/FrontOp/DoorCard.html?id=' + preorderid + "&r=" + Math.random(), 412, 250, "paymentwin");
                    }
                }
            }
            if (getQueryParam("Source") == "协议单位") {
                $("#Source").val("协议单位");
            }
        }
        else {
            alert(data.State.Errkey);
        }
        getTotalAccount();//显示总房价
    });
    //房型改变事件
    $("#RoomTypeId").change(function () {
        Source();
    })
    //定制版营业报表  选择支付方式
    $("#PayMent").change(function () {
        if ($("#PayMent").val() == "现付") {
            $("#EnterPayMethodName").html("<option>现金</option><option>支付宝</option><option>微信</option><option>刷卡</option>")
        } else {
            $("#EnterPayMethodName").html("<option>预收</option>")
        }
    })
    //定制版营业报表  选择佣金类别
    $("#CommissionType").change(function () {
        if ($("#CommissionType").val() == "无") {
            $("#Commission").css("background", "#eee");
            $("#Commission").attr("disabled", "disabled");
            $("#Commission").val("");

        } else {
            $("#Commission").css("background", "white")
            $("#Commission").removeAttr("disabled")
        }
    })


    //预住天数事件绑定
    $(".addDays").click(function () {
        var days = parseInt($("#Days").val());
        if ($("#OpenType").val() == "2") {//钟点房处理  2016-09-09
            if (days < 12) {
                $("#Days").val(days + 1);
                $("#Days").blur();
                getTotalAccount();//显示总房价
            }
        } else {
            if (days < 30) {
                $("#Days").val(days + 1);
                $("#Days").blur();
                getTotalAccount();//显示总房价
            }
        }
    });
    $(".reduceDays").click(function () {
        var days = parseInt($("#Days").val());
        if (days > 1) {
            $("#Days").val(days - 1);
            $("#Days").blur();
            getTotalAccount();//显示总房价
        }
    });
    $("#Days").keyup(function (e) {
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            return;
        }
        var obj = this;
        $(obj).val($(obj).val().replace(/[^\d]/g, ""));
        getTotalAccount();//显示总房价
    });
    $("#Days").blur(function () {
        var days = parseInt($("#Days").val());
        if (days <= 0 && $("#OpenType").val() != "2") {
            days = 1;
            $("#Days").val("1");
        }
        postRequest("/services/basicservice.aspx", { days: days }, "RZXX", "GetWantLeaveDate", false, function (data) {
            if (data.State.Success) {
                if ($("#OpenType").val() != "2"){
                    if (data.Data.indexOf(':') < 0)
                        $("#WantLeaveDate").val(data.Data+Set_LeaveTime);
                    else
                        $("#WantLeaveDate").val(data.Data);
                }

                var bookId = getQueryParam("bookid");
                var type = 1;
                if (bookId == "") {
                    bookId = "0";
                    type = 2;
                }
                var RoomTypeId = $("#RoomTypeId").val();
                var EnterDate = $("#EnterDate").val();
                var WantLeaveDate = $("#WantLeaveDate").val();
                var RoomTypeName = $("#RoomTypeId option:selected").text();

                CalcEmptyRoomCount(bookId, type, RoomTypeId, RoomTypeName, EnterDate, WantLeaveDate, $("#RoomNo").val());
            }
            else {
                alert(data.State.Errkey);
            }
        });
    });

    $("#WantLeaveDate").blur(function () {
        var RoomTypeId = $("#RoomTypeId").val();
        var EnterDate = $("#EnterDate").val();
        var WantLeaveDate = $("#WantLeaveDate").val();
        var RoomTypeName = $("#RoomTypeId option:selected").text();
        var bookId = getQueryParam("bookid");
        var type = 1;
        if (bookId == "") {
            bookId = "0";
            type = 2;
        }
        CalcEmptyRoomCount(bookId, type, RoomTypeId, RoomTypeName, EnterDate, WantLeaveDate, $("#RoomNo").val());
    });

    //预离时间
    $("#WantLeaveDate").datetimepicker({
        lang: 'ch',
        format: 'Y-m-d H:i',
        timepicker: false,
        minDate: $("#EnterDate").val(),
        onSelectDate: function (current_time, $input) {
            var dt = current_time.dateFormat('Y-m-d');
            dt = dt + ' ' + Set_LeaveTime;
            $input.val(dt);
            postRequest("/services/basicservice.aspx", { WantLeaveDate: dt }, "RZXX", "GetDays", false, function (data) {
                if (data.State.Success) {
                    $("#Days").val(data.Data);
                }
                else {
                    alert(data.State.Errkey);
                }
            });
        }
    });

    //钟点房处理
    var oldwantLeaveDate = "";
    $("#OpenType").change(function () {
        var openType = $("#OpenType").val();
        var Source = $("#Source").val();
        if (Source == "协议单位") {
            //$("#SchemeId option[class='Xuanze']").remove();
            $("#SchemeId option").remove();
            $("#SchemeId").append("<option value='' class='Xuanze' selected='selected'>请选择房价方案</option>");
            $("#SchemeId").attr('disabled', 'disabled');
            $("#SchemeId").removeAttr("style");
            $("#SchemeId").attr("style", "width: 120px; margin-right: 40px; display: inline;background:#EFEFEF");

            //天房，月租房，午夜房
            if (openType == "1" || openType == "4" || openType == "5") {
                $("#Days").val('1');
                $("#Days").blur();
                if ($("#ContractUnit").val() == "") {
                    //showTipsCollect(3, 'btnRead', '请填写协议单位', 'ContractUnit');
                    return;
                }
                $("label[data-type='day']").html("预住天数：");
                GetContractUnitPrice();
            }
            else if (openType == "2") {//钟点房处理 2016-01-06
                var arrHourPirce = Set_HourRoomPrice.split("|");
                var MemberCardNo = $("#MemberCardNo").val();
                if (MemberCardNo != "" && MemberCardNo != "无可用会员卡" && !$("#MemberCardNo").hasClass("errorborder")) {
                    $("#Price").val(arrHourPirce[3]);
                    $("#Price").attr("data-price", arrHourPirce[3]);
                } else {
                    $("#Price").val(arrHourPirce[0]);
                    $("#Price").attr("data-price", arrHourPirce[0]);
                }
                //$("#Days").val('0');
                oldwantLeaveDate = $("#WantLeaveDate").val();
                $("#WantLeaveDate").val(AddHours($("#EnterDate").val(), arrHourPirce[1]));
                //钟点房处理  2016-09-09
                $("label[data-type='day']").html("入住小时：");
                $("#Days").val(arrHourPirce[1]);
                GetHoursRoomCount();
            } else if (openType == "3") {//自用房 2016-01-06
                $("#Price").val('0');
                $("#Price").attr("data-price", '0');
                $("#Days").val('1');
                $("#Days").blur();
                $("label[data-type='day']").html("预住天数：");
            }
        } else {
            if (openType == "2") {
                $("#SchemeId option[class='Xuanze']").remove();
                $("#SchemeId").append("<option value='' class='Xuanze' selected='selected'>请选择房价方案</option>");
                $("#SchemeId").attr('disabled', 'disabled');
                $("#SchemeId").removeAttr("style");
                $("#SchemeId").attr("style", "width: 120px; margin-right: 40px; display: inline;background:#EFEFEF");
                var arrHourPirce = Set_HourRoomPrice.split("|");
                var MemberCardNo = $("#MemberCardNo").val();
                if (MemberCardNo != "" && MemberCardNo != "无可用会员卡" && !$("#MemberCardNo").hasClass("errorborder")) {
                    $("#Price").val(arrHourPirce[3]);
                    $("#Price").attr("data-price", arrHourPirce[3]);
                } else {
                    $("#Price").val(arrHourPirce[0]);
                    $("#Price").attr("data-price", arrHourPirce[0]);
                }
                $("#Days").val('0');
                oldwantLeaveDate = $("#WantLeaveDate").val();
                $("#WantLeaveDate").val(AddHours($("#EnterDate").val(), arrHourPirce[1]));
                //钟点房处理  2016-09-09
                $("label[data-type='day']").html("入住小时：");
                $("#Days").val(arrHourPirce[1]);
                GetHoursRoomCount();
            }
            else if (openType == "1" || openType == "4" || openType == "5") {
                $("#SchemeId option[class='Xuanze']").remove();
                $("#SchemeId").removeAttr('disabled');
                $("#SchemeId").removeAttr("style");
                $("#SchemeId").attr("style", "width: 120px; margin-right: 40px; display: inline;");
                $(".Xuanze").removeAttr("selected");
                $("#Days").val('1');
                $("#Days").blur();
                $("label[data-type='day']").html("预住天数：");
                Scheme(openType);
            }
            else if (openType == "3") {
                $("label[data-type='day']").html("预住天数：");
                $("#SchemeId option[class='Xuanze']").remove();
                $("#SchemeId").append("<option value='' class='Xuanze' selected='selected'>请选择房价方案</option>");
                $("#SchemeId").attr('disabled', 'disabled');
                $("#SchemeId").removeAttr("style");
                $("#SchemeId").attr("style", "width: 120px; margin-right: 40px; display: inline;background:#EFEFEF");
                $("#Price").val('0');
                $("#Price").attr("data-price", '0');
                $("#Days").val('1');
                $("#Days").blur();
            }
        }
        getTotalAccount();//显示总房价
    });

    //支付方式
    $("#PayMethod").change(function () {
        var memberCardNo = $("#MemberCardNo").val();
        var payId = $("#PayMethod").val();
        if (payId == "-2" && memberCardNo != "") {
            $(".prepaidpay1").show();
        } else {
            $(".prepaidpay1").hide();
        }
    });

    //协议单位房价
    var GetContractUnitPrice = function () {
        var RoomTypeId = $("#RoomTypeId").val();
        var openType = $("#OpenType").val();
        var ContractUnitId = $("#ContractUnitId").val();
        if (openType == 2)
            return;
        var data = postSynRequest("/services/basicservice.aspx", { RoomTypeId: RoomTypeId, openType: openType, ContractUnitId: ContractUnitId }, "RZXX", "GetContractUnitPrice");
        if (data.State.Success = true) {
            $("#Price").val(data.Data.ContractUnitPrice);
            $("#Price").attr("data-price", data.Data.ContractUnitPrice);
            getTotalAccount();
        }
    }

    //选择房型
    $("#RoomTypeId").change(function () {
        var roomTypeId = $("#RoomTypeId").val();
        if (roomTypeId != "") {
            postRequest("/services/basicservice.aspx", { roomTypeId: roomTypeId }, "RZXX", "GetEmptyRoom", false, function (data) {
                if (data.State.Success) {
                    //加载房间
                    var newObj = $('<input id="RoomNo" type="text" value="" style="width: 112px; margin-right: 40px; display: inline;" />');
                    var oldObj = $("#RoomNo");
                    $(oldObj).before(newObj);
                    $(newObj).autocomplete(data.Data, roomOptions);
                    $(oldObj).remove();
                    $(newObj).result(function (event, data, formatted) {
                        $("#RoomId").val(data.Id);
                    });
                    $(newObj).change(function () {
                        if (this.value == "") {
                            $("#RoomId").val("");
                        }
                    });
                    $(newObj).keyup(function () {
                        if ($(this).val() == "") {
                            $("#RoomId").val("");
                        }
                    });
                }
                else {
                    alert(data.State.Errkey);
                }
            });
        }
        $("#OpenType").change();
    });

    //选择房价方案
    $("#SchemeId").change(function () {
        $(".note_no1").remove();
        $("#SchemeId").removeClass('errorborder1');
        Scheme();
        getTotalAccount();//显示总房价
    });

    var Scheme = function (openType) {
        var schemeId = $("#SchemeId").val();
        //var roomTypeId = $("#SchemeId option:selected").attr("data-roomtypeid");
        var source = $("#Source").val();
        //$("#RoomTypeId").val(roomTypeId);
        if (openType != null && openType != undefined && openType != "") {
            $("#OpenType").val(openType);
        }
        else {
            $("#OpenType").val('1');
        }
        var Type = $("#OpenType").val();
        if (oldwantLeaveDate != "")
            $("#WantLeaveDate").val(oldwantLeaveDate);

        if (schemeId != "") {
            var data = postSynRequest("/services/basicservice.aspx", { schemeId: schemeId, openType: Type }, "RZXX", "GetRoomPrice");
            if (data.State.Success) {
                //加载房价
                $("#Price").val(data.Data.price);
                $("#Price").attr("data-price", data.Data.price);
                if (Type == 4) {
                    if (data.Data.days != 0) {
                        $("#Days").val(data.Data.days);
                        $("#Days").blur();
                    }
                    if ($("#Price").val() != "") {
                        $("#spanTotalAccount").html(parseInt($("#Price").val()).toFixed(2));
                    } else {
                        $("#spanTotalAccount").html("0.00");
                    }
                }
            }
            else {
                alert(data.State.Errkey);
            }
        }
    }

    //选择客人来源
    $("#Source").change(function () {
        $(".note_no1").remove();
        $("#SchemeId").removeClass('errorborder1');
        Source();
        getTotalAccount();//显示总房价
    });

    var Source = function () {
        var RoomTypeId = $("#RoomTypeId").val();
        var Source = $("#Source").val();
        //协议单位开房需要隐藏会员卡号，加载协议单位
        if (Source == "协议单位") {
            $("#MemberCardli").hide();
            $("#SchemeId").append("<option value='' class='Xuanze' selected='selected'>请选择房价方案</option>");
            $("#SchemeId").attr("disabled", "disabled");
            $("#SchemeId").addClass("disabledcolor");
            $("#MemberCardNo").val("");
            $("#CategoryName").html("");

            if ($("#MContractUnitli").length > 0) {
                $("#MContractUnitli").show();
                return;
            }
            var html = '<li style="position: relative" id="MContractUnitli">';
            html += '     <label style="">协议单位：</label>';
            html += '   <input id="ContractUnit" type="text" value="" style="width: 290px; margin-right: 0px; display: inline" />';
            html += '   <input id="ContractUnitId" type="hidden" value=""  />';
            html += '     </li>';
            $("#MemberCardli").before(html);
            var data = postSynRequest("/services/basicservice.aspx", null, "RZXX", "GetContractUnitList");
            if (!data.State.Success)
                alert("获取协议单位失败");
            if (data.Data.ProtocolPrice != "1") $("#Price").attr("disabled", "disabled");
            $("#ContractUnit").autocomplete(data.Data.ContractUnitList, contractunitOptions);
            $("#ContractUnit").result(function (event, data, formatted) {
                if (data != undefined) {
                    $("#ContractUnitId").val(data.Id);
                    GetContractUnitPrice();
                }
            });
        } else {
            $("#MContractUnitli").hide();
            $("#MemberCardli").show();
            if ($("#SchemeId").hasClass("disabledcolor")) {
                $("#SchemeId").removeClass("disabledcolor");
            }
            $("#SchemeId option[class='Xuanze']").remove();
            $("#SchemeId").removeAttr('disabled');
            $("#SchemeId").removeAttr("style");
            $("#SchemeId").attr("style", "width: 120px; margin-right: 40px; display: inline;");
            $("#ContractUnit").val("");
            $("#ContractUnitId").val("");
            var data = postSynRequest("/services/basicservice.aspx", { Source: Source, RoomTypeId: RoomTypeId }, "RZXX", "GetScheme");
            if (data.State.Success) {
                $("#SchemeId option").remove();
                if (data.Data.Schemes != null && data.Data.Schemes.length > 0) {
                    for (var i = 0; i < data.Data.Schemes.length; i++) {
                        var item = data.Data.Schemes[i];
                        if (item.Breakfast != "" && item.Breakfast != null && item.Breakfast != undefined) {
                            $("#SchemeId").append('<option value="' + item.Id + '" data-roomtypeid="' + item.RoomTypeId + '" data-source="' + item.Source + '">[' + item.Breakfast + ']' + item.Name + '</option>');
                        } else {
                            $("#SchemeId").append('<option value="' + item.Id + '" data-roomtypeid="' + item.RoomTypeId + '" data-source="' + item.Source + '">' + item.Name + '</option>');
                        }
                    }
                    Scheme();
                } else {
                    $("#SchemeId").find("option").remove();
                    $("#SchemeId").append('<option value="">请选择房价方案</option>');
                    //会员开房时如果没有相关房价方案（系统应给出添加房价方案的提示信息或具体操作步骤）
                }
            }
            else {
                alert(data.State.Errkey);
            }
        }

    }

    //人数绑定事件
    $(".addPersonCount").click(function () {
        var PersonCount = parseInt($("#PersonCount").val());
        if (PersonCount < 99) {
            $("#PersonCount").val(PersonCount + 1);
        }
    });
    $(".reducePersonCount").click(function () {
        var PersonCount = parseInt($("#PersonCount").val());
        if (PersonCount > 1) {
            $("#PersonCount").val(PersonCount - 1);
        }
    });

    //随客绑定事件
    var isOne = true;   //执行一次
    $(".btnOpenCustomer").click(function () {
        if ($(".divOtherCustomer").is(":hidden")) {
            $(".divOtherCustomer").show();
            $(".btnOpenCustomer").html('隐藏>>');
            if (isOne) {
                $(".btnAddOtherCustomer").click();
                isOne = false;
            }
        }
        else {
            $(".divOtherCustomer").hide();
            $(".btnOpenCustomer").html('展开>>');
        }
    });

    //添加随客
    $(".btnAddOtherCustomer").click(function () {
        if ($(".ruzhu tbody tr").length >= 4) {
            alert("同一个房间最多只能新增4个随客");
            return;
        }
        var trobj = $($("#divEditRow tbody").html());
        $(".ruzhu tbody").append(trobj);
        $(trobj).find("input[name='RowBirthday']").datetimepicker({
            lang: 'ch',
            format: 'Y-m-d',
            timepicker: false
        });
        $(trobj).find("input[name='RowCardNo']").blur(function () {
            var cardNo = $(this).val();
            if (checkCus) {
                checkcustomer(cardNo);
            }
            var rowCardType = $(trobj).find("select[name='RowCardType']").val();
            if (Set_IdCardNumber == "1") {
                if (rowCardType == "身份证" && cardNo != "") {
                    var res = postSynRequest("/services/basicservice.aspx", { cardNo: cardNo }, "Common", "CheckIsIdCard");
                    if (!res.State.Success) {
                        alert(res.State.Errkey);
                        //$(this).focus();
                        return false;
                    }
                }
            }
            if (cardNo.length != 18) {
                return false;
            }
            $(trobj).find("input[name='RowBirthday']").val(getBirthdayByCardNo(cardNo));
            //性别处理 第17位代表性别，奇数为男，偶数为女。
            if (cardNo.substr(16, 1) % 2 == 0) {
                $(trobj).find("select[name='RowSex']").val("女");
            } else { $(trobj).find("select[name='RowSex']").val("男"); }
            //
            postRequest("/services/basicservice.aspx", { cardNo: cardNo }, "Common", "GetZoneByIdCard", false, function (data) {
                if (data.State.Success) {
                    $(trobj).find("input[name='RowAddress']").val(data.Data.Address);
                }
                else {
                    alert(data.State.Errkey);
                }
            });
        });
    });

    $("#btnClose").click(function () {
        closeWin();
    });

    //提交表单
    $("#btnSubmit").click(function () {
        /*if (top.$(".authorizationwin").css("display") != "none")
            return;*/
        var cardno = $("#Customer_CardNo").val();
        var CardType = $("#Customer_CardType").val();
        var name = $("#Customer_Name").val();
        var res = postSynRequest("/services/basicservice.aspx", { cardno: cardno, cardtype: CardType, name: name }, "RZXX", "IsBlackList");
        if (!res.State.Success) {
            alert(res.State.Des);
            return;
        }
        else {
            if (res.Data == "1") {
                var userAgent = window.navigator.userAgent.toLowerCase();
                var isclient = userAgent == "jchotelclient";
                if (isclient) {
                    top.BlackInfoRead(res.State.Des)
                }
                else {
                    alert(res.State.Des);
                }
                closeWin();
                return;
            }
            else if (res.Data == "0") {
                if (!confirm(res.State.Des)) {
                    closeWin();
                    return;
                }
            }
        }

        if (checkCus) {
            checkcustomer(cardno);
        }
        var postData = preSave();
        if (!postData) {
            return false;
        }
        $("#btnSubmit").removeClass("bus_add");
        $("#btnSubmit").addClass("bus_dell");
        $("#btnSubmit").attr("disabled", "disabled");
        postRequest("/services/basicservice.aspx", postData, "RZXX", "OrderAdd", false, function (data) {
            if (data.State.Success) {
                //判断浏览器处理户籍上传
                var userAgent = window.navigator.userAgent.toLowerCase();
                if (userAgent == "jchotelclient") {
                    top.hujiUploadBatch(data.Data.List);
                }
                //刷新房态图
                top.main.window.$("#btnStateUpdate").click();

                //微信支付 处理
                if ($("body").data("PayName") != undefined && $("body").data("PayName") != "") {
                    if ($("body").data("PayName") == "微信支付" || $("body").data("PayName") == "微信闪付") {
                        var payType = $("body").data("PayName") == "微信支付" ? 1 : 2;//微信支付方式
                        openWin("/wepayrequest.aspx?orderNo=" + data.Data.OrderNo + "&totalFee=" + data.Data.WxPayMoney + "&Type=" + payType + "&productId=YJ" + data.Data.OrderNo + "|" + data.Data.AccId + "&orderDetail=" + "单号=" + data.Data.OrderNo, 520, 400, 'paywin', "", function (callbackdata) {
                            var payResult = postSynRequest("/services/basicservice.aspx", { OrderNo: data.Data.OrderNo, AccId: data.Data.AccId, PayMethod: 1}, "RZXX", "PayHandle");

                            if (!payResult.State.Success) {
                                alert(payResult.State.Des);
                            }
                            if ($("#chkContinue").attr("checked") == undefined) {
                                //处理订单
                                var bookId = getQueryParam("bookid");
                                if (bookId != "" && parseInt(data.Data.ReserveCount) > 0) {
                                    if (confirm("入住操作成功，是否继续办理该订单其它房间的入住？")) {
                                        var RoomNo = getUrlParam("no");
                                        var RoomId = getUrlParam("id");
                                        if (RoomNo == "" || RoomNo == null || RoomNo == undefined) {
                                            RoomNo = data.Data.RoomNo;
                                            RoomId = data.Data.RoomId;
                                        }
                                        window.location.href = "/FrontOp/OrderAdd.html?no=" + RoomNo + "&id=" + RoomId + "&preorderid=" + data.Data.OrderId + "&bookid=" + bookId + "&continues=0";
                                    }
                                    else if (Set_WayPrint != undefined && Set_WayPrint != 2) {//打印处理
                                        if (confirm("入住操作成功，是否打印入住单?")) {
                                            PrintOrderAdd(data.Data.GroupNo, Set_WayPrint);//2015-12-14 自定义账单处理
                                            //openWin("/BillInfor/BillRZD.aspx?orderno=" + data.Data.GroupNo, 800, 430, "pwin2", Set_WayPrint);
                                        }
                                        closeWin(); //RefreshParentWin(1);
                                    } else {
                                        alert("入住操作成功");
                                        closeWin(); //RefreshParentWin(1);
                                    }
                                    if (data.Data.IsShowDoorCard) {
                                        openWin('/FrontOp/DoorCard.html?id=' + data.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                                    }
                                }
                                else {
                                    if (Set_WayPrint != undefined && Set_WayPrint != 2) {//打印处理
                                        if (confirm("入住操作成功，是否打印入住单?")) {
                                            PrintOrderAdd(data.Data.GroupNo, Set_WayPrint);//2015-12-14 自定义账单处理
                                            //openWin("/BillInfor/BillRZD.aspx?orderno=" + data.Data.GroupNo, 800, 430, "pwin2", Set_WayPrint);
                                        }
                                    } else {
                                        alert("入住操作成功");
                                    }
                                    if (data.Data.IsShowDoorCard) {
                                        openWin('/FrontOp/DoorCard.html?id=' + data.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                                    }
                                    closeWin(); //RefreshParentWin(1);
                                }
                            } else {//继续开房
                                var RoomNo = getUrlParam("no");
                                var RoomId = getUrlParam("id");
                                if (RoomNo == "" || RoomNo == null || RoomNo == undefined) {
                                    RoomNo = data.Data.RoomNo;
                                    RoomId = data.Data.RoomId;
                                }
                                if (data.Data.IsShowDoorCard) {
                                    openWin('/FrontOp/DoorCard.html?id=' + data.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                                }
                                window.location.href = "/FrontOp/OrderAdd.html?no=" + RoomNo + "&id=" + RoomId + "&preorderid=" + data.Data.OrderId + "&continues=1&Source=" + escape(postData.Source)
                                        + "&ContractUnit=" + escape(postData.ContractUnit) + "&ContractUnitId=" + postData.ContractUnitId + "";
                            }
                        }, data.Data);
                    }
                    else if ($("body").data("PayName") == "支付宝闪付" || $("body").data("PayName") == "支付宝支付") {
                        var payType = $("body").data("PayName") == "支付宝支付" ? 1 : 2;//支付宝方式
                        openWin("/alipayrequest.aspx?orderNo=" + data.Data.OrderNo + "&totalFee=" + data.Data.AliPayMoney + "&Type=" + payType + "&productId=YJ" + data.Data.OrderNo + "|" + data.Data.AccId + "&orderDetail=" + "单号=" + data.Data.OrderNo, 520, 400, 'paywin', "", function (callbackdata) {
                            var payResult = postSynRequest("/services/basicservice.aspx", { OrderNo: data.Data.OrderNo, AccId: data.Data.AccId,PayMethod:2 }, "RZXX", "PayHandle");

                            if (!payResult.State.Success) {
                                alert(payResult.State.Des);
                            }
                            if ($("#chkContinue").attr("checked") == undefined) {
                                //处理订单
                                var bookId = getQueryParam("bookid");
                                if (bookId != "" && parseInt(data.Data.ReserveCount) > 0) {
                                    if (confirm("入住操作成功，是否继续办理该订单其它房间的入住？")) {
                                        var RoomNo = getUrlParam("no");
                                        var RoomId = getUrlParam("id");
                                        if (RoomNo == "" || RoomNo == null || RoomNo == undefined) {
                                            RoomNo = data.Data.RoomNo;
                                            RoomId = data.Data.RoomId;
                                        }
                                        window.location.href = "/FrontOp/OrderAdd.html?no=" + RoomNo + "&id=" + RoomId + "&preorderid=" + data.Data.OrderId + "&bookid=" + bookId + "&continues=0";
                                    }
                                    else if (Set_WayPrint != undefined && Set_WayPrint != 2) {//打印处理
                                        if (confirm("入住操作成功，是否打印入住单?")) {
                                            PrintOrderAdd(data.Data.GroupNo, Set_WayPrint);//2015-12-14 自定义账单处理
                                            //openWin("/BillInfor/BillRZD.aspx?orderno=" + data.Data.GroupNo, 800, 430, "pwin2", Set_WayPrint);
                                        }
                                        closeWin(); //RefreshParentWin(1);
                                    } else {
                                        alert("入住操作成功");
                                        closeWin(); //RefreshParentWin(1);
                                    }
                                    if (data.Data.IsShowDoorCard) {
                                        openWin('/FrontOp/DoorCard.html?id=' + data.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                                    }
                                }
                                else {
                                    if (Set_WayPrint != undefined && Set_WayPrint != 2) {//打印处理
                                        if (confirm("入住操作成功，是否打印入住单?")) {
                                            PrintOrderAdd(data.Data.GroupNo, Set_WayPrint);//2015-12-14 自定义账单处理
                                            //openWin("/BillInfor/BillRZD.aspx?orderno=" + data.Data.GroupNo, 800, 430, "pwin2", Set_WayPrint);
                                        }
                                    } else {
                                        alert("入住操作成功");
                                    }
                                    if (data.Data.IsShowDoorCard) {
                                        openWin('/FrontOp/DoorCard.html?id=' + data.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                                    }
                                    closeWin(); //RefreshParentWin(1);
                                }
                            } else {//继续开房
                                var RoomNo = getUrlParam("no");
                                var RoomId = getUrlParam("id");
                                if (RoomNo == "" || RoomNo == null || RoomNo == undefined) {
                                    RoomNo = data.Data.RoomNo;
                                    RoomId = data.Data.RoomId;
                                }
                                if (data.Data.IsShowDoorCard) {
                                    openWin('/FrontOp/DoorCard.html?id=' + data.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                                }
                                window.location.href = "/FrontOp/OrderAdd.html?no=" + RoomNo + "&id=" + RoomId + "&preorderid=" + data.Data.OrderId + "&continues=1&Source=" + escape(postData.Source)
                                        + "&ContractUnit=" + escape(postData.ContractUnit) + "&ContractUnitId=" + postData.ContractUnitId + "";
                            }
                        }, data.Data);

                    }
                }
                else {
                    if ($("#chkContinue").attr("checked") == undefined) {
                        //处理订单
                        var bookId = getQueryParam("bookid");
                        if (bookId != "" && parseInt(data.Data.ReserveCount) > 0) {
                            if (confirm("入住操作成功，是否继续办理该订单其它房间的入住？")) {
                                var RoomNo = getUrlParam("no");
                                var RoomId = getUrlParam("id");
                                if (RoomNo == "" || RoomNo == null || RoomNo == undefined) {
                                    RoomNo = data.Data.RoomNo;
                                    RoomId = data.Data.RoomId;
                                }
                                window.location.href = "/FrontOp/OrderAdd.html?no=" + RoomNo + "&id=" + RoomId + "&preorderid=" + data.Data.OrderId + "&bookid=" + bookId + "&continues=0";
                            }
                            else if (Set_WayPrint != undefined && Set_WayPrint != 2) {//打印处理
                                if (confirm("入住操作成功，是否打印入住单?")) {
                                    PrintOrderAdd(data.Data.GroupNo, Set_WayPrint);//2015-12-14 自定义账单处理
                                    //openWin("/BillInfor/BillRZD.aspx?orderno=" + data.Data.GroupNo, 800, 430, "pwin2", Set_WayPrint);
                                }
                                closeWin(); //RefreshParentWin(1);
                            } else {
                                alert("入住操作成功");
                                closeWin(); //RefreshParentWin(1);
                            }
                            if (data.Data.IsShowDoorCard) {
                                openWin('/FrontOp/DoorCard.html?id=' + data.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                            }
                        }
                        else {
                            if (Set_WayPrint != undefined && Set_WayPrint != 2) {//打印处理
                                if (confirm("入住操作成功，是否打印入住单?")) {
                                    PrintOrderAdd(data.Data.GroupNo, Set_WayPrint);//2015-12-14 自定义账单处理
                                    //openWin("/BillInfor/BillRZD.aspx?orderno=" + data.Data.GroupNo, 800, 430, "pwin2", Set_WayPrint);
                                }
                            } else {
                                alert("入住操作成功");
                            }
                            if (data.Data.IsShowDoorCard) {
                                openWin('/FrontOp/DoorCard.html?id=' + data.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                            }
                            closeWin(); //RefreshParentWin(1);
                        }
                    } else {//继续开房
                        var RoomNo = getUrlParam("no");
                        var RoomId = getUrlParam("id");
                        if (RoomNo == "" || RoomNo == null || RoomNo == undefined) {
                            RoomNo = data.Data.RoomNo;
                            RoomId = data.Data.RoomId;
                        }
                        if (data.Data.IsShowDoorCard) {
                            openWin('/FrontOp/DoorCard.html?id=' + data.Data.OrderId + "&r=" + Math.random(), 412, 250, "paymentwin");
                        }
                        window.location.href = "/FrontOp/OrderAdd.html?no=" + RoomNo + "&id=" + RoomId + "&preorderid=" + data.Data.OrderId + "&continues=1&Source=" + escape(postData.Source)
                                + "&ContractUnit=" + escape(postData.ContractUnit) + "&ContractUnitId=" + postData.ContractUnitId + "";
                    }
                }
            }
            else {
                $("#btnSubmit").removeClass("bus_dell");
                $("#btnSubmit").addClass("bus_add");
                $("#btnSubmit").removeAttr("disabled");
                alert(data.State.Errkey);
            }
        });
        //}
    });

    //读取主客身份证
    $(".btnReadMainCustomer").click(function () {
        top.ReadIdCard(function (sName, CardNum, Address, sSex, sNat) {
            if ($("#Customer_CardNo").val() == "" || $("#Customer_CardNo").val() == CardNum) {
                $("#Customer_Name").val(sName);
                $("#Customer_Birthday").val(getBirthdayByCardNo(CardNum));
                $("#Customer_CardType").val('身份证');
                $("#Customer_CardNo").val(CardNum);
                if (CardNum != "" && CardNum != null && CardNum != undefined) {
                    $("#Customer_CardNo").blur();
                }
                $("#Customer_Sex").val(sSex);
                if (sNat.indexOf("族") < 0) sNat += "族";
                $("#Customer_Ethnic").val(sNat);
                $("#Customer_Address").val(Address);
                //checkcustomer(CardNum); //加载上次房价
            }
            else {
                if ($(".divOtherCustomer").is(":hidden")) {
                    $(".btnReadOtherCustomer").show();
                    $(".divOtherCustomer").show();
                    $(".btnOpenCustomer").html('隐藏>>');
                }
                ReadOtherCustomer(sName, CardNum, Address, sSex, sNat);
            }

        });
    });

    //读取随客身份证
    //$(".btnReadOtherCustomer").click(function () {
    //    top.ReadIdCard(ReadOtherCustomer);
    //});

    //手填主客身份证
    $("#Customer_CardNo").blur(function () {
        var cardNo = $(this).val();
        var cardType = $("#Customer_CardType").val();
        if (checkCus) {
            checkcustomer(cardNo);
        }
        if (Set_IdCardNumber == "1") {
            if (cardType == "身份证" && cardNo != "") {
                var res = postSynRequest("/services/basicservice.aspx", { cardNo: cardNo }, "Common", "CheckIsIdCard");
                if (!res.State.Success) {
                    alert(res.State.Errkey);
                    //$(this).focus();
                    return false;
                }
                else {
                }
            }
        }
        if (cardNo.length != 18) {
            return false;
        }
        $("#Customer_Birthday").val(getBirthdayByCardNo(cardNo));
        //处理性别问题
        if (cardNo.substr(16, 1) % 2 == 0) {//第17位为奇数：男，偶数：女
            $("#Customer_Sex").val("女");
        } else { $("#Customer_Sex").val("男"); }

        if (IsOTABook) return;//如果是OTA订单，不做下面的证件号检测
        postRequest("/services/basicservice.aspx", { cardNo: cardNo, cardType: cardType }, "Common", "GetZoneByIdCard", false, function (data) {
            if (data.State.Success) {
                if (data.Data.Customers != null && $("#MemberCardNo").val() == "") {
                    $("#Customer_Name").val(data.Data.Customers.Name);
                    $("#Customer_Sex").val(data.Data.Customers.Sex);
                    $("#Customer_Birthday").val(data.Data.Customers.Birthday);
                    $("#Customer_Ethnic").val(data.Data.Customers.Ethnic);
                    $("#Customer_Phone").val(data.Data.Customers.Phone);
                }
                if (data.Data.Order != null) {
                    $("#btnCustomer").show();
                    $("#btnCustomer").attr("data-id", data.Data.Customers.Id);
                } else {
                    $("#btnCustomer").hide();
                }
                if (data.Data.CardInfoNo != "" && data.Data.CardInfoNo != null && data.Data.CardInfoNo != undefined && $("#MemberCardNo").val() == "") {
                    $("#MemberCardNo").val(data.Data.CardInfoNo);
                    MemerCardNo();
                }
                if ($("#Customer_Address").val() == "") {
                    $("#Customer_Address").val(data.Data.Address);
                }
            }
            else {
                alert(data.State.Errkey);
            }
        });
    });

    //查看客史
    $("#btnCustomer").click(function () {
        var id = $(this).attr("data-id");
        var MemberCardNo = $("#MemberCardNo").val();
        openWin("/FrontOp/QueryGuestHistory.html?id=" + id + "&cardNo=" + MemberCardNo + "&r=" + Math.random(), 600, 350, "pwin2");
    });


    var checkCus = true;//判断是否已经检查此客户是否来过
    //检查客户是否曾经住过
    var checkcustomer = function (cardNo) {
        var Source = $("#Source").val();
        var openType = $("#OpenType").val();
        if (Source == "协议单位")
            return;
        if (set_AgainGuest == "1") {
            postRequest("/services/basicservice.aspx", { cardno: cardNo, roomtype: $("#RoomTypeId").val(), openType: openType }, "RZXX", "CheckCustomer", false, function (data) {
                if (data.State.Success) {
                    if (confirm("此客人曾经入住本酒店的相同房型的房价是" + data.Data.price + "，是否选择上次的房价？")) {
                        $("#SchemeId").find("option[value=" + data.Data.id + "]").attr("selected", true);
                        if ($("#SchemeId").val() != data.Data.id) {
                            var breakfast = "";
                            if (data.Data.Breakfast != null) {
                                breakfast = "[" + data.Data.Breakfast + "]"
                            }
                            $("#SchemeId").append("<option value='" + data.Data.id + "' data-roomtypeid='" + data.Data.RoomTypeId + "' data-source='" + data.Data.Source + "'>" + breakfast + "" + data.Data.name + "</option>");
                            $("#SchemeId").find("option[value=" + data.Data.id + "]").attr("selected", true);
                            Scheme();
                            $("#Source").find("option[value='" + data.Data.Source + "']").attr("selected", true);
                        }
                        $("#Price").val(data.Data.price);
                        $("#Price").attr("data-price", data.Data.SchemePrice).attr("data-lastprice", data.Data.price);
                        getTotalAccount();
                    }
                }
                else {
                }
                checkCus = false;
            });
        }
    }

    //检查会员卡号
    function MemberCardNoBlur() {
        MemerCardNo();
        var value = $("#MemberCardNo").val();
        if (value != "") {
            checkCus = true;
        }
        if (checkCus) {
            var cardNo = $("#Customer_CardNo").val();
            if (cardNo != "" && cardNo != null && cardNo != undefined) {
                $("#Customer_CardNo").blur();
            } else {
                checkcustomer(cardNo);
            }
        }

    }

    $("#CategoryName").click(function () {
        $("#MemberCardNo").click();
    })

    //检查客人
    function CustomerNameBlur() {
        var Customer_Id = $("#Customer_Id").val();
        if (Customer_Id == "" || Customer_Id == undefined)
            return;
        var checkres = GetCustomerById(Customer_Id);
        $("#Customer_Name").val(checkres.Name);
        $("#Customer_CardType").val(checkres.CardType);
        $("#Customer_CardNo").val(checkres.CardNo);

        $("#Customer_Sex").val(checkres.Sex);
        if (checkres.Birthday != "0001-01-01") {
            $("#Customer_Birthday").val(checkres.Birthday);
        }
        $("#Customer_Phone").val(checkres.Phone);
        $("#Customer_Ethnic").val(checkres.Ethnic);
        $("#Customer_Address").val(checkres.Address);

        var value = $("#Customer_Name").val();
        if (value != "") {
            checkCus = true;
        }

        if (checkres.CardNo != "" && checkres.CardNo != null && checkres.CardNo != undefined) {
            $("#Customer_CardNo").blur();
            checkCus = false;
        }

        if (checkCus) {
            checkcustomer(checkres.CardNo);
        }
    }
    //增加支付方式
    $("#divZF ul li img").live("click", function () {
        var tag = $(this).attr("src");
        if (tag == "/images/01.png") { addPaymode(); return; }
        $(this).parent().parent().remove();
    });
    var addPaymode = function () {
        //GetJz();
        var optstr = "";
        if ($("#divZF ul").length >= payMothed.length) {
            if (payMothed[i].Id != "-5")
                alert("对不起，增加支付方式失败，超过支付方式的数量!");
            return;
        }
        for (var i = 0; i < payMothed.length; i++) {
            optstr = optstr + "<option value='" + payMothed[i].Id + "'>" + payMothed[i].Name + "</option>";
        }
        var str = "<ul class='first'>";
        str += "<li><label>支付方式：</label><select  style='width: 120px; margin-right: 32px; display: inline'>" + optstr + "</select></li> ";
        str += "<li><label>押金：</label><input maxlength='8' name='PayAmount'  type='text' class='input_keynote' style='width: 100px; margin-right: 25px; display: inline'/></li>";
        str += "<li style='display: none' class='prepaidpay'><label class='paytitle'>会员卡号：</label><input disabled='disabled' type='text' name='MemberCardNo' value='' /><a href='javascript:void(0)' onclick='payment(this)' style='padding-left: 10px; margin-top: 5px; line-height: 24px;'>选择</a></li>";
        str += "<li style='color: #0788BD; padding-top: 3px; padding-left: 20px'>";
        str += "<img opttag='add' src='/images/01.png' width='20' height='20' style='margin-right:10px; display:inline; cursor:pointer'/> ";
        str += "<img opttag='del' src='/images/02.png' width='20' height='20' style='cursor:pointer'/>";
        str += "</li>";
        str += "</ul>";
        $("#divZF").append(str);
    };
    document.onkeydown = keyevent;
});

function keyevent() {
    if (event.keyCode == 13)
        $("#btnSubmit").click();
    if (event.keyCode == 192)
        $(".btnReadMainCustomer")[0].click();
}
function MemerCardNo() {
    var MemberCardNo = $("#MemberCardNo").val();
    var Source = $("#Source").val();
    var OpenType = $("#OpenType").val();
    $("#PayMethod option").each(function () {
        if ($(this).val() == "-2")
            $(this).remove();
    });
    if (MemberCardNo != "" && MemberCardNo != "无可用会员卡") {
        var checkres = GetMemberByCard(MemberCardNo, Source);
        var type = Object.prototype.toString.apply(checkres);
        if (type == "[object String]") {
            //if (checkres != "会员卡号不存在") {
            showTipsCollect(3, 'btnRead', checkres, 'MemberCardNo');
            //}
            CategoryName = undefined;
            return;
        }
        else {
            $("#Customer_Name").val(checkres.MemberName);
            $("#Customer_CardType").val(checkres.MemberCardType);
            $("#Customer_CardNo").val(checkres.MemberCardNo);
            $("#Customer_Sex").val(checkres.Sex);
            if (checkres.Birthday != "0001-01-01") {
                $("#Customer_Birthday").val(checkres.Birthday);
            }
            $("#Customer_Phone").val(checkres.Phone);
            $("#Customer_Address").val(checkres.Address);
            $("#CategoryName").html(checkres.CategoryName);
            $("#CategoryName").css("display", "inline");
            if (checkres.PrepaidEnable == true && MemberPayMthodAuthority) {
                $("#PayMethod").append("<option value='-2'>储值卡</option>");
                $("#PayMethod").val("-2");
                $(".prepaidpay1").show();
            }
            else {
                $("#PayMethod").val("");
                $(".prepaidpay1").hide();
            }

            CategoryName = checkres.CategoryName;
            var isSet = false;

            if ($("#OpenType").val() != '2') {
                var sName = "[M]" + CategoryName;
                var lai = $("#Source").val();
                if (sName != lai) {
                    //var schemeId = 0;
                    //$("#SchemeId option").each(function () {
                    //    var source = "," + $(this).attr("data-source") + ",";
                    //    if (source.indexOf(sName) >= 0) {
                    //        schemeId = $(this).val();
                    //        return false;
                    //    }
                    //});
                    //if (schemeId >= 0) {
                    //$("#SchemeId").val(schemeId);
                    $("#Source").val(sName);
                    $("#Source").change();

                    // }
                }
            }
            if ($("#SchemeId").val() == "" && !$("#SchemeId").hasClass("errorborder1") && OpenType != '2') {
                $("#btnRead").append('<span class="formTips note_no1">该房型无此会员卡类型的房价方案，请到房价方案设置中添加相应的数据</span>');
                $("#SchemeId").addClass('errorborder1');
                //showTipsCollect(3, 'btnRead', "该房型无此会员卡类型的房价方案，请到房价方案设置中添加相应的数据", 'SchemeId');
            } else if ($("#SchemeId").val() != "") {
                $(".note_no1").remove();
                $("#SchemeId").removeClass('errorborder1');
            }
            if ("[M]" + CategoryName != $("#Source").val() && $("#Source").val().indexOf("[M]") == 0) {
                showTipsCollect(3, 'btnRead', "该会员卡类型为" + CategoryName + ",与会员来源不匹配", 'MemberCardNo');
                CategoryName = undefined;
                return;
            }
            if (checkres.FirstPrice != "" && checkres.FirstPrice != "0.00") {
                var prompt = $("#prompt").html();
                if (prompt == "") {
                    $("#prompt").append("<span class=\"formTips note_no1\">此会员卡是首次入住，首次入住价格为：" + checkres.FirstPrice + "</span>");
                }
            }
            if (OpenType == "2") {
                var arrHourPirce = Set_HourRoomPrice.split("|");
                var MemberCardNo = $("#MemberCardNo").val();
                if (MemberCardNo != "" && MemberCardNo != "无可用会员卡" && !$("#MemberCardNo").hasClass("errorborder")) {
                    $("#Price").val(arrHourPirce[3]);
                    $("#Price").attr("data-price", arrHourPirce[3]);
                } else {
                    $("#Price").val(arrHourPirce[0]);
                    $("#Price").attr("data-price", arrHourPirce[0]);
                }
            }
        }
    }
}

function ReadOtherCustomer(sName, CardNum, Address, sSex, sNat) {
    if ($(".ruzhu tbody tr").length >= 4) {
        alert("同一个房间最多只能新增4个随客");
        return;
    }
    var trobj = $($("#divEditRow tbody").html());
    $(".ruzhu tbody").append(trobj);
    $(trobj).find("input[name='RowBirthday']").datetimepicker({
        lang: 'ch',
        format: 'Y-m-d',
        timepicker: false
    });
    $(trobj).find("input[name='RowCardNo']").blur(function () {
        var cardNo = $(this).val();
        if (cardNo.length != 18) {
            return false;
        }
        $(trobj).find("input[name='RowBirthday']").val(getBirthdayByCardNo(cardNo));
        postRequest("/services/basicservice.aspx", { cardNo: cardNo }, "Common", "GetZoneByIdCard", false, function (data) {
            if (data.State.Success) {
                $(trobj).find("input[name='RowAddress']").val(data.Data);
            }
            else {
                alert(data.State.Errkey);
            }
        });
    });
    $(trobj).find("input[name='RowName']").val(sName);
    $(trobj).find("input[name='RowBirthday']").val(getBirthdayByCardNo(CardNum));
    $(trobj).find("select[name='RowSex']").val(sSex);
    if (sNat.indexOf("族") < 0) sNat += "族";
    $(trobj).find("select[name='RowEthnic']").val(sNat);
    $(trobj).find("select[name='RowCardType']").val('身份证');
    $(trobj).find("input[name='RowCardNo']").val(CardNum);
    $(trobj).find("input[name='RowAddress']").val(Address);
}

function preSave() {
    //检查入住信息
    $(".note_no").remove();
    $(".errorborder").removeClass('errorborder');
    var b_result = true;
    var cardNoCheckStr = "";
    var RoomTypeId = $("#RoomTypeId").val();
    if (RoomTypeId == "") {
        showTipsCollect(3, 'btnRead', '请选择房型', 'RoomTypeId');
        b_result = false;
    }
    var RoomTypeName = $("#RoomTypeId option:selected").text();

    var RoomNo = $("#RoomNo").val();
    if (RoomNo == "") {
        showTipsCollect(3, 'btnRead', '请输入房号', 'RoomNo');
        b_result = false;
    }

    var RoomId = $("#RoomId").val();

    var GroupRoomId = $("#GroupRoomId").val();
    var GroupRoomNo = $("#GroupRoomNo").val();

    var Price = $("#Price").val();
    if (Price == "") {
        showTipsCollect(3, 'btnRead', '请输入房价', 'Price');
        b_result = false;
    }
    if (Price != "" && !isNumeric(Price)) {
        showTipsCollect(3, 'btnRead', '房价请输入数字', 'Price');
        b_result = false;
    }

    var Source = $("#Source").val();
    if (Source == "") {
        showTipsCollect(3, 'btnRead', '请选择来源', 'Source');
        b_result = false;
    }
    var ContractUnit = $("#ContractUnit").val();
    var ContractUnitId = $("#ContractUnitId").val();
    if (Source == "协议单位" && ContractUnit == "") {
        $("#MemberCardNo").val("");
        showTipsCollect(3, 'btnRead', '请填写协议单位', 'ContractUnit');
        b_result = false;
    }
    if (Source == "协议单位" && ContractUnit != "" && (ContractUnitId == "" || parseInt(ContractUnitId) <= 0)) {
        showTipsCollect(3, 'btnRead', '协议单位必须从列表中选择', 'ContractUnit');
        b_result = false;
    }

    var OpenType = $("#OpenType").val();
    if (OpenType == "") {
        showTipsCollect(3, 'btnRead', '请选择开房方式', 'OpenType');
        b_result = false;
    }
    var SchemeId = $("#SchemeId").val();
    if (OpenType != "2" && OpenType != "3" && SchemeId == "" && Source != "协议单位") {
        showTipsCollect(3, 'btnRead', '请选择房价方案', 'SchemeId');
        b_result = false;
    }

    //检查会员卡号
    var MemberCardNo = $("#MemberCardNo").val();
    if (MemberCardNo == "无可用会员卡") {
        MemberCardNo = "";
    }
    if (Source.indexOf("[M]") == 0) {
        if (MemberCardNo == "") {
            showTipsCollect(3, 'btnRead', '请输入会员卡号', 'MemberCardNo');
            b_result = false;
        }
        else {
            var checkres = CheckMemberCard(MemberCardNo, Source);
            if (checkres != true) {
                showTipsCollect(3, 'btnRead', checkres, 'MemberCardNo');
                b_result = false;
            }
        }
    }
    else if (MemberCardNo != "") {
        var checkres = GetMemberByCard(MemberCardNo, Source);
        var type = Object.prototype.toString.apply(checkres);
        if (type == "[object String]") {
            showTipsCollect(3, 'btnRead', checkres, 'MemberCardNo');
            b_result = false;
        }
    }

    var EnterDate = $("#EnterDate").val();
    var Days = $("#Days").val();
    var WantLeaveDate = $("#WantLeaveDate").val();
    var isClock = $("#OpenType").val();
    if (Days == 0 && isClock != "2") {
        showTipsCollect(3, 'btnRead', '预离时间不能为当天', 'Days');
        b_result = false;
    }
    if (WantLeaveDate == "") {
        showTipsCollect(3, 'btnRead', '请输入预离时间', 'WantLeaveDate');
        b_result = false;
    }
    if (WantLeaveDate < EnterDate) {
        showTipsCollect(3, 'btnRead', '预离时间小于到店时间', 'WantLeaveDate');
        b_result = false;
    }
    var BookNo = $("#BookNo").html();
    var result = postSynRequest("/services/basicservice.aspx", { RoomNo: RoomNo, EnterDate: EnterDate, WantLeaveDate: WantLeaveDate, BookNo: BookNo }, "RZXX", "CheckIsRoomNo");
    if (result.State.Success) {
        if (!confirm("该房间已分房,是否继续开房?")) {
            showTipsCollect(3, 'btnRead', '请重新输入房号', 'RoomNo');
            b_result = false;
        }
    }


    //检查用户资料
    var Customer_Name = $("#Customer_Name").val();
    if ($.trim(Customer_Name) == "") {
        showTipsCollect(3, 'btnRead', '请输入姓名', 'Customer_Name');
        b_result = false;
    }
    if (Customer_Name != "" && !/^[A-Za-z\u4e00-\u9fa5\s·]+$/.test(Customer_Name)) {
        showTipsCollect(3, 'btnRead', '姓名请输入中文英文', 'Customer_Name');
        b_result = false;
    }
    var Customer_Birthday = $("#Customer_Birthday").val();
    if (Set_CompleteCheck == "1" && Customer_Birthday == "") {
        showTipsCollect(3, 'btnRead', "请输入主客生日", 'Customer_Birthday');
        b_result = false;
    }
    var Customer_Sex = $("#Customer_Sex").val();
    var Customer_Phone = $("#Customer_Phone").val();
    if (Customer_Phone != "" && !isMobil(Customer_Phone)) {
        showTipsCollect(3, 'btnRead', '请输入正确的电话号码', 'Customer_Phone');
        b_result = false;
    }
    var Customer_CardType = $("#Customer_CardType").val();
    var Customer_CardNo = $("#Customer_CardNo").val();
    if (Set_CompleteCheck == "1" && Customer_CardNo == "") {
        showTipsCollect(3, 'btnRead', "请输入主客身份证", 'Customer_CardNo');
        b_result = false;
    }
    else {
        if (Set_IdCardNumber == "1") {
            if (Customer_CardType == "身份证" && Customer_CardNo != "") {
                var res = postSynRequest("/services/basicservice.aspx", { cardNo: Customer_CardNo }, "Common", "CheckIsIdCard");
                if (!res.State.Success) {
                    showTipsCollect(3, 'btnRead', res.State.Errkey, 'Customer_CardNo');
                    b_result = false;
                }
            }
        }
        if (Set_CardOneRoom == "1") {
            if (Customer_CardNo != "") {
                var res = postSynRequest("/services/basicservice.aspx", { id: 0, cardNo: Customer_CardNo, cardType: Customer_CardType }, "RZXX", "CheckOpenIdCardIsRepeat");
                if (!res.State.Success) {
                    showTipsCollect(3, 'btnRead', res.State.Errkey, 'Customer_CardNo');
                    b_result = false;
                }
            }
        }
        if (Customer_CardNo != "") {
            cardNoCheckStr += Customer_CardNo + "|";
        }
    }
    var Customer_Ethnic = $("#Customer_Ethnic").val();
    var Customer_Address = $("#Customer_Address").val();
    if (Set_CompleteCheck == "1" && Customer_Address == "") {
        showTipsCollect(3, 'btnRead', "请输入主客地址", 'Customer_Address');
        b_result = false;
    }

    //检查随客信息
    var isOk = true;
    $(".ruzhu tbody tr").each(function () {
        var isEdit = $(this).find("input[name='RowState']").val();
        if (isEdit == "0") return true;
        if (!RowSave($(this).find(".btnSave"))) {
            isOk = false;
        }
    });
    if (!isOk) return false;
    var OtherCustomers = "";
    $(".ruzhu tbody tr").each(function () {
        if (OtherCustomers != "") OtherCustomers += "&";
        var rowData = $(this).find("input[name='RowData']").val();
        var rowCardType = rowData.split("|")[4];
        var rowCardNo = rowData.split("|")[5];
        if (rowCardNo != "") {
            if (cardNoCheckStr.indexOf(rowCardNo + "|") >= 0) {
                //var rowCardNo = $(this).find("input[name='RowCardNo']").val();
                //showTipsCollect(3, 'btnRead', '随客身份证重复', rowCardNo);
                isOk = false;
                return false;
            }
            else {
                cardNoCheckStr += rowCardNo + "|";
            }
        }
        OtherCustomers += rowData;
    });
    if (!isOk) return false;

    //检查押金信息
    var paylist = new Array();
    var zflist = $("#divZF").children();
    var payid = 0;
    var payname = "";
    var sumamount = 0; //总押金
    var tempPayName = "";//支付方式名称，微信支付判断处理
    for (var i = 0; i < zflist.length; i++) {
        payid = $(zflist[i]).find("select").val();
        payname = $(zflist[i]).find("select").find("option:selected").text();
        var price = $(zflist[i]).find("input[name='PayAmount']").val();
        if (price == "") {
            showTipsCollect(3, 'btnRead', '请输入押金', $(zflist[i]).find("input[name='PayAmount']"));
            b_result = false;
            return false;
        } else if (!isNumeric(price)) {
            showTipsCollect(3, 'btnRead', '押金请输入数字', $(zflist[i]).find("input[name='PayAmount']"));
            b_result = false;
            return false;
        }
        //2016-09-05  支付方式 微信支付处理
        if (payid == -4||payid==-9) {
            if (tempPayName != "" && tempPayName != payname) {
                showTipsCollect(3, 'btnRead', '在线支付只能选一种', $(zflist[i]).find("input[name='PayAmount']"));
                b_result = false;
                return false;
            } else {
                tempPayName = payname;
                $("body").data("PayName", tempPayName);
            }
        }

        amount = ($(zflist[i]).find("input[name='PayAmount']").val() * 1);
        sumamount = sumamount + parseFloat($(zflist[i]).find("input[name='PayAmount']").val());
        if (payid == "-2") {
            if ($(zflist[i]).find("input[name='MemberCardNo']").val() == "") {
                showTipsCollect(3, 'btnRead', '会员储值支付，请先选择验证会员卡', $(zflist[i]).find("input[name='MemberCardNo']"));
                return false;
            }
            membercardno = $(zflist[i]).find("input[name='MemberCardNo']").val();
        }
        else {
            membercardno = "";
        }
        paylist.push({ id: payid, name: payname, amount: amount, membercardno: membercardno });
    }
    var testr = formatarraytoserver(paylist);
    if (OpenType != "3" && Set_InDeposit == "1" && !isAliBook) {
        if (getQueryParam("bookid") != "") {
            var BookDeposit = parseFloat($("#BookDeposit").val());
            if (GroupRoomNo == "" && Set_MinDeposit != "" && BookDeposit + parseInt(sumamount) < parseInt(Set_MinDeposit)) {
                showTipsCollect(3, 'btnRead', '押金加定金必须不低于' + Set_MinDeposit, 'Deposit');
                b_result = false;
            }
        }
        else {
            if ((GroupRoomNo == "" || GroupRoomNo == "无可联房号") && (sumamount == 0 || (Set_MinDeposit != "" && parseInt(sumamount) < parseInt(Set_MinDeposit)))) {
                showTipsCollect(3, 'btnRead', '押金必须不低于' + Set_MinDeposit, 'Deposit');
                b_result = false;
            }
        }
    }
    var Remark = $("#Remark").val();
    if (isContainChina($("#Jzsgdh").val())) {
        showTipsCollect(3, 'btnRead', '手工单号不能输入汉字', 'Jzsgdh');
        b_result = false;
    }
    var Jzsgdh = $("#Jzsgdh").val();

    //if (isContainChina($("#BedNo").val())) {
    //    showTipsCollect(3, 'btnRead', '床号不能输入汉字', 'BedNo');
    //    b_result = false;
    //}
    var BedNo = $("#BedNo").val();

    //检查空房间数
    var bookId = getQueryParam("bookid");
    var type = 1;
    if (bookId == "") {
        bookId = "0";
        type = 2;
    }
    if (!b_result) return false;


    //检查房间是否已经预定
    if (!CalcEmptyRoomCount(bookId, type, RoomTypeId, RoomTypeName, EnterDate, WantLeaveDate, RoomNo)) {
        return false;
    }

    if (getQueryParam("bookid") == "" && (PayMethod == "" || sumamount == 0)) {
        if (OpenType != "3" && Set_InDeposit == "1" && !isAliBook && GroupRoomNo == "") {
            showTipsCollect(3, 'btnRead', '押金必须不低于' + Set_MinDeposit, 'Deposit');
            return false;
        }
        else {
            if (!confirm("没有输入押金，是否仍然继续办理入住？")) {
                return false;
            }
        }
    }

    if (MemberCardNo != "") {
        //检查会员卡是否可以升级
        var chkres = postSynRequest("/services/basicservice.aspx", {
            CardNo: MemberCardNo
        }, "CardInfoUsl", "CheckCardUpEnable");
        if (!chkres.State.Success) {
            showTipsCollect(3, 'btnRead', chkres.Data.Errkey, 'MemberCardNo');
            return false;
        }
        if (chkres.State.Des != null && chkres.State.Des != "") {
            if (confirm(chkres.State.Des)) {
                top.ActiveWin = window;
                if (chkres.Data.PmsVersion == "1") {
                    openWin("../../memberrequest.aspx?MethodName=MemberUpgrade&ParamData=/Member/MemberUpgrade.html?id=" + chkres.Data.id + "", 850, 530, "pwin2");
                }
                else {
                    openWin("/Member/vip_memberoper.html?id=" + chkres.Data.id + "&iframename=pwin2", 850, 530, "pwin2");
                }
                return false;
            }
        }
    }

    var salesmanId = $("#Salesman").val();
    var salesmanName = "";
    if (salesmanId != "")
        salesmanName = $("#Salesman option:selected").text();

    var Secret = "False";
    if ($("#chkSecret").attr("checked") != undefined) {
        Secret = "True";
    }
    //定制版营业报表
    var PayMent = "";
    var CommissionType = "";
    var Commission = "";
    var OrderTracker = "";
    var EnterPayMethodName
    if (hasBusinessReport == "true") {
        PayMent = $("#PayMent").val()
        CommissionType = $("#CommissionType").val()
        Commission = $("#Commission").val()
        EnterPayMethodName = $("#EnterPayMethodName").val()
        OrderTracker = $("#OrderTrackerone").val() + "@" + $("#OrderTrackertwo").val() + "@" + $("#OrderTrackerthree").val();
        //Price = Price - parseFloat(Commission) / parseInt(Days)
    }

    //showTipsCollect(1, 'btnRead', ' &nbsp;');
    return {
        RoomTypeId: RoomTypeId,
        RoomTypeName: RoomTypeName,
        RoomNo: RoomNo,
        RoomId: RoomId,
        GroupRoomId: GroupRoomId,
        GroupRoomNo: GroupRoomNo,
        Price: Price,
        Source: Source,
        MemberCardNo: MemberCardNo,
        OpenType: OpenType,
        SchemeId: SchemeId,
        EnterDate: EnterDate,
        Days: Days,
        WantLeaveDate: WantLeaveDate,
        Customer_Name: Customer_Name,
        Customer_Birthday: Customer_Birthday,
        Customer_Sex: Customer_Sex,
        Customer_Phone: Customer_Phone,
        Customer_CardType: Customer_CardType,
        Customer_CardNo: Customer_CardNo,
        Customer_Ethnic: Customer_Ethnic,
        Customer_Address: Customer_Address,
        OtherCustomers: OtherCustomers,
        paylist: testr,
        Jzsgdh: Jzsgdh,
        Remark: Remark,
        BookId: getQueryParam("bookid"),
        BookDetailId: bookDetailId,
        ContractUnit: ContractUnit,
        ContractUnitId: ContractUnitId,
        SalesmanCode: salesmanId,
        SalesmanName: salesmanName,
        Secret: Secret,
        SignUrl: $("#imgSign").attr("data-src"),
        BedNo: BedNo,
        PayMent: PayMent,
        CommissionType: CommissionType,
        Commission: Commission,
        EnterPayMethodName: EnterPayMethodName,
        OrderTracker: OrderTracker,
        hasBusinessReport: hasBusinessReport
    };
}

//检查房间是否已经预定
var CalcEmptyRoomCountCheck = false;
function CalcEmptyRoomCount(bookId, type, RoomTypeId, RoomTypeName, EnterDate, WantLeaveDate, RoomNo) {
    if (CalcEmptyRoomCountCheck) {
        return true;
    }

    var result = postSynRequest("/services/basicservice.aspx", {
        Id: bookId,
        Type: type,
        RoomTypeId: RoomTypeId,
        RoomTypeName: RoomTypeName,
        EnterDate: EnterDate,
        WantLeaveDate: WantLeaveDate,
        RoomNo: RoomNo
    }, "RZXX", "CalcEmptyRoomCount");
    if (!result.State.Success) {
        if (!confirm(result.State.Errkey)) {
            $("#RoomTypeId").removeAttr("disabled");
            $("#RoomTypeId").removeClass("disabledcolor");
            $("#RoomTypeId option[index='0']").remove();
            return false;
        }
        return true;
    }
    else {
        return true;
    }
    CalcEmptyRoomCountCheck = true;
}

function RowSave(obj) {
    var trobj = $(obj).parent().parent();
    var rowNameObj = $(trobj).find("input[name='RowName']");
    var rowName = $(rowNameObj).val();
    if ($.trim(rowName) == "") {
        //alert("请输入随客姓名");
        showTipsCollect(3, 'btnRead', '请输入随客姓名', rowNameObj);
        $(rowNameObj).focus();
        return false;
    }
    if (!/^[A-Za-z\u4e00-\u9fa5\s·]+$/.test(rowName)) {
        //alert('随客姓名请输入中文英文');
        showTipsCollect(3, 'btnRead', '随客姓名请输入中文英文', rowNameObj);
        $(rowNameObj).focus();
        return false;
    }
    var rowBirthday = $(trobj).find("input[name='RowBirthday']").val();
    if (Set_CompleteCheck == "1" && rowBirthday == "") {
        showTipsCollect(3, 'btnRead', "请输入随客生日", $(trobj).find("input[name='RowBirthday']"));
        return false;
    }
    var rowSex = $(trobj).find("select[name='RowSex']").val();
    var rowEthnic = $(trobj).find("select[name='RowEthnic']").val();
    var rowCardType = $(trobj).find("select[name='RowCardType']").val();
    var rowCardNo = $(trobj).find("input[name='RowCardNo']").val();
    if (Set_CompleteCheck == "1" && rowCardNo == "") {
        showTipsCollect(3, 'btnRead', "请输入随客证件号码", $(trobj).find("input[name='RowCardNo']"));
        return false;
    }
    else {
        var cardNoCheckStr = "";
        if ($("#Customer_CardNo").val() != "") {
            cardNoCheckStr += $("#Customer_CardNo").val() + "|";
        }
        $(".ruzhu tbody tr").each(function () {
            var rowData = $(this).find("input[name='RowData']").val();
            if (rowData != "") {
                var rowCardNo = rowData.split("|")[5] + "|";
                if (rowCardNo != "") {
                    cardNoCheckStr += rowCardNo + "|";
                }
            }
        });
        if (rowCardNo != "" && cardNoCheckStr.indexOf(rowCardNo) >= 0) {
            showTipsCollect(3, 'btnRead', '随客身份证重复', $(trobj).find("input[name='RowCardNo']"));
            $(trobj).find("input[name='RowCardNo']").focus();
            return false;
        }

        if (Set_IdCardNumber == "1") {
            if (rowCardType == "身份证" && rowCardNo != "") {
                var res = postSynRequest("/services/basicservice.aspx", { cardNo: rowCardNo }, "Common", "CheckIsIdCard");
                if (!res.State.Success) {
                    showTipsCollect(3, 'btnRead', res.State.Errkey, $(trobj).find("input[name='RowCardNo']"));
                    //$(trobj).find("input[name='RowCardNo']").focus();
                    return false;
                }
            }
        }
    }
    var rowAddress = $(trobj).find("input[name='RowAddress']").val();
    if (Set_CompleteCheck == "1" && rowAddress == "") {
        showTipsCollect(3, 'btnRead', "请输入随客地址", $(trobj).find("input[name='RowAddress']"));
        return false;
    }

    var rowData = rowName + "|" + rowBirthday + "|" + rowSex + "|" + rowEthnic + "|" + rowCardType + "|" + rowCardNo + "|" + rowAddress;
    var arrData = rowData.split('|');
    var detailRow = $($("#divDetailRow tbody").html());
    $(detailRow).find("td").each(function (i) {
        if (i <= arrData.length) {
            $(this).html(arrData[i]);
        }
    });
    $(detailRow).find("input[name='RowData']").val(rowData);
    $(trobj).before(detailRow);
    $(trobj).remove();
    return true;
}

function RowEdit(obj) {
    var trobj = $(obj).parent().parent();
    var rowData = $(trobj).find("input[name='RowData']").val();
    var arrData = rowData.split('|');

    var editRow = $($("#divEditRow tbody").html());
    $(editRow).find("input[name='RowData']").val('');
    $(editRow).find("input[name='RowName']").val(arrData[0]);
    $(editRow).find("input[name='RowBirthday']").val(arrData[1]);
    $(editRow).find("select[name='RowSex']").val(arrData[2]);
    $(editRow).find("select[name='RowEthnic']").val(arrData[3]);
    $(editRow).find("select[name='RowCardType']").val(arrData[4]);
    $(editRow).find("input[name='RowCardNo']").val(arrData[5]);
    $(editRow).find("input[name='RowAddress']").val(arrData[6]);

    $(editRow).find("input[name='RowBirthday']").datetimepicker({
        lang: 'ch',
        format: 'Y-m-d',
        timepicker: false
    });
    $(editRow).find("input[name='RowCardNo']").blur(function () {
        var cardNo = $(this).val();
        if (cardNo.length != 18) {
            return false;
        }
        $(editRow).find("input[name='RowBirthday']").val(getBirthdayByCardNo(cardNo));
        postRequest("/services/basicservice.aspx", { cardNo: cardNo }, "Common", "GetZoneByIdCard", false, function (data) {
            if (data.State.Success) {
                $(editRow).find("input[name='RowAddress']").val(data.Data);
            }
            else {
                alert(data.State.Errkey);
            }
        });
    });

    $(trobj).before(editRow);
    $(trobj).remove();
}

function RowDelete(obj) {
    var trobj = $(obj).parent().parent();
    $(trobj).remove();
}

function GetMemberByCard(memberCardNo, Source) {
    var postData = { CardNo: memberCardNo, MemberCategory: Source, roomtypeId: $("#RoomTypeId").val() };
    var res = postSynRequest("/services/basicservice.aspx", postData, "CardInfoUsl", "GetMemberByCard");
    if (res.State.Success)
        return res.Data;
    else
        return res.State.Errkey;
}

function GetCustomerById(Customer_Id) {
    var res = postSynRequest("/services/basicservice.aspx", { id: Customer_Id }, "RZXX", "GetCustomerById");
    if (res.State.Success)
        return res.Data;
    else
        return res.State.Errkey;
}

function CheckMemberCard(memberCardNo, Source) {
    var postData = { CardNo: memberCardNo, MemberCategory: Source };
    var res = postSynRequest("/services/basicservice.aspx", postData, "CardInfoUsl", "CheckCardType");
    if (res.State.Success)
        return true;
    else
        return res.State.Errkey;
}

//会员升级以后子页面调用
function MemberUp() {
    $("#MemberCardNo").click();
    $("#MemberCardNo").blur();
}

function UpdatePrice() {
    $("#Price").val($("#Price").attr("data-price"));
}

function payment(obj) {
    payRow = $(obj).parent().parent();
    var incr = 1;
    if ($("#lblBYS").attr("tag") == "-") {
        incr = -1;
    }
    var memberCardNo = $("#MemberCardNo").val();
    var amount = ($(obj).parent().parent().find("input[name='PayAmount']").val() * 1) * incr;
    var url = "/member/payment.html?canedit=1&&cardno=" + memberCardNo + "&amount=" + amount;
    top.ActiveWin = window;
    openWin(url, 310, 320, 'paymentwin');
    PaymentCheckOk = function (cardNo, amount, usableAmount) {
        $(payRow).find("input[name='MemberCardNo']").val(cardNo);
    }
}

//显示总房价
function getTotalAccount() {
    var price = $("#Price").val();
    var days = $("#Days").val();
    if ($("#OpenType").val() == "4") {//月租房
        $("#spanTotalAccount").html((price * 1).toFixed(2));
    } else if ($("#OpenType").val() == "2") {//钟点房 2016-09-09
        var arrHourPirce = Set_HourRoomPrice.split("|");
        $("#WantLeaveDate").val(AddHours($("#EnterDate").val(), days));
        $("#spanTotalAccount").html((price * 1).toFixed(2));
    } else {
        $("#spanTotalAccount").html((price * days).toFixed(2));
    }
}

// 判断钟点房是否可开
function GetHoursRoomCount() {
    var data = postSynRequest("/services/basicservice.aspx", { RoomTypeId: $("#RoomTypeId").val() }, "RZXX", "GetHoursRoomCount");
    if (!data.State.Success) {
        alert("当日钟点房可开房间数大于可开数，不能再开钟点房");
        $("#OpenType").val("1");
        $("#OpenType").change()
    }
}

function IsMustQuery(){
    if ($("#IsMustQuery").attr("checked") != undefined)
        return  true ;
    else return false;
}