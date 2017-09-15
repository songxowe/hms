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
var Set_MonthRoom = true;               //是否允许开月租房
var Set_UserRoomDiscount = undefined;
var CategoryName = undefined;
var PaymentCheckOk = undefined;
var DoorCardCallback = undefined;       //发送门锁卡回调事件
var MemberPayMthodAuthority = false;
var MemberInfo = null;                  //会员信息
var BookerInfo = null;                  //预订人信息
var ResetRoomDiscountPrice = function () {         //验证操作员折扣回调事件，验证失败后还原价格
    $("#txtRoomDiscountPrice").val($("#txtRoomDiscountPrice").attr("data-price"));
}

var _OldCustomerSource = "";
var _OldMemberCardNo = "";
var _OldContractUnitName = "";
var _OldContractUnitId = "";
var _OpenTypes = [{ Name: "天房", Value: "1" }, { Name: "钟点房", Value: "2" }, { Name: "自用房", Value: "3" }, { Name: "月租房", Value: "4" }, { Name: "午夜房", Value: "5" }];

var cardOptions = {
        minChars: 1,
        width: 420,
        matchContains: true,
        mustMatch: false,
        dataType: 'json',
        selectFirst: true,
        delay: 800,
        extraParams: { IsMustQuery: false },
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

var ContractunitOptions = {
    minChars: 1,
    width: 420,
    width: 290,
    matchContains: true,
    mustMatch: true,
    formatItem: function (row, rowNum, rowCount, searchItem) {
        return "<span style='width:200px;display:inline-block'>单位：" + row.Name + "</span><span style='width:75px;display:inline-block'>" + row.UnitCode + "</span>";
    },
    formatMatch: function (row, rowNum, rowCount) {
        return row.Name + " " + row.PYM + " " + row.UnitCode;
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
    delay: 10,
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

var TeamRoom = {};

//检查房间是否已经预定
var CalcEmptyRoomCountCheck = false;
TeamRoom.calcEmptyRoomCount = function (bookId, type, RoomTypeId, RoomTypeName, EnterDate, WantLeaveDate) {
    if (CalcEmptyRoomCountCheck) {
        return true;
    }
    CalcEmptyRoomCountCheck = true;

    var result = postSynRequest("/services/basicservice.aspx", {
        Id: bookId,
        Type: type,
        RoomTypeId: RoomTypeId,
        RoomTypeName: RoomTypeName,
        EnterDate: EnterDate,
        WantLeaveDate: WantLeaveDate
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
}

//获取会员卡信息
TeamRoom.getMemberByCard = function (memberCardNo, source, roomTypeId) {
    var postData = { CardNo: memberCardNo, MemberCategory: source, roomtypeId: roomTypeId };
    var res = postSynRequest("/services/basicservice.aspx", postData, "CardInfoUsl", "GetMemberByCard");
    if (res.State.Success) {
        MemberInfo = res.Data;
        return res.Data;
    }
    else
        return res.State.Errkey;
}

//改变用户来源
TeamRoom.changeCustomerSource = function (showChangeWarning) {
    var roomTypeId = $("#selRoomTypes").val();
    var source = $("#selCustomerSources").val();

    if (showChangeWarning == null || showChangeWarning == undefined)
        showChangeWarning = true;

    if (showChangeWarning && TeamRoom.selectedRooms.length > 0 && source != _OldCustomerSource) {
        if (confirm("注意：更换客户来源会影响房价，将会清空已经录入的入住信息和住客信息，是否继续？")) {
            TeamRoom.clearSelectedRoomsAndCustomers();
        }
        else {
            $("#selCustomerSources").val(_OldCustomerSource);
            return;
        }
    }

    //协议单位开房需要隐藏会员卡号，加载协议单位
    if (source == "协议单位") {
        $("#liMemberCardNo").hide();
        $("#liContractUnitName").show();
        $("#selRoomPriceSchemes").append("<option value='' class='Xuanze' selected='selected'>请选择房价方案</option>");
        $("#selRoomPriceSchemes").attr("disabled", "disabled");
        $("#selRoomPriceSchemes").addClass("disabledcolor");
        $("#txtMemberCardNo").val("");
        $("#lblMemberCategoryName").html("");
        _OldMemberCardNo = "";

        //设置折扣价显示标价
        $("#txtRoomDiscountPrice").val($("#txtRoomPrice").val());
        $("#txtRoomDiscountPrice").attr("data-price", $("#txtRoomPrice").val());

        var data = postSynRequest("/services/basicservice.aspx", null, "RZXX", "GetContractUnitList");
        if (!data.State.Success)
            alert("获取协议单位失败");
        $("#txtContractUnitName").autocomplete(data.Data.ContractUnitList, ContractunitOptions);
        $("#txtContractUnitName").result(function (event, data, formatted) {
            if (data != undefined) {
                if (TeamRoom.selectedRooms.length > 0 && $("#txtContractUnitName").val() != _OldContractUnitName) {
                    if (confirm("注意：更换协议单位会影响房价，将会清空已经录入的入住信息和住客信息，是否继续？")) {
                        TeamRoom.clearSelectedRoomsAndCustomers();
                    }
                    else {
                        $("#txtContractUnitName").val(_OldContractUnitName);
                        $("#hidContractUnitId").val(_OldContractUnitId);
                    }
                }
                $("#hidContractUnitId").val(data.Id);
                _OldContractUnitId = $("#hidContractUnitId").val();
                _OldContractUnitName = $("#txtContractUnitName").val();
                TeamRoom.getContractUnitPrice();
            }
        });
    } else {
        $("#liContractUnitName").hide();
        $("#liMemberCardNo").show();
        if ($("#selRoomPriceSchemes").hasClass("disabledcolor")) {
            $("#selRoomPriceSchemes").removeClass("disabledcolor");
        }
        $("#selRoomPriceSchemes option[class='Xuanze']").remove();
        $("#selRoomPriceSchemes").removeAttr('disabled');
        $("#selRoomPriceSchemes").removeAttr("style");
        $("#txtContractUnitName").val("");
        $("#hidContractUnitId").val("");
        _OldContractUnitId = "";
        _OldContractUnitName = "";

        var data = postSynRequest("/services/basicservice.aspx", { Source: source, RoomTypeId: roomTypeId }, "RZXX", "GetScheme");
        if (data.State.Success) {
            $("#selRoomPriceSchemes option").remove();
            if (data.Data.Schemes != null && data.Data.Schemes.length > 0) {
                for (var i = 0; i < data.Data.Schemes.length; i++) {
                    var item = data.Data.Schemes[i];
                    if (item.Breakfast != "" && item.Breakfast != null && item.Breakfast != undefined) {
                        $("#selRoomPriceSchemes").append('<option value="' + item.Id + '" data-roomtypeid="' + item.RoomTypeId + '" data-source="' + item.Source + '">[' + item.Breakfast + ']' + item.Name + '</option>');
                    } else {
                        $("#selRoomPriceSchemes").append('<option value="' + item.Id + '" data-roomtypeid="' + item.RoomTypeId + '" data-source="' + item.Source + '">' + item.Name + '</option>');
                    }
                }
                TeamRoom.getRoomPrice();
            } else {
                $("#selRoomPriceSchemes").append('<option value="">请选择房价方案</option>');
                //会员开房时如果没有相关房价方案（系统应给出添加房价方案的提示信息或具体操作步骤）
            }
        }
        else {
            alert(data.State.Errkey);
        }
    }
    _OldCustomerSource = $("#selCustomerSources").val();
}

//改变房型
TeamRoom.changeRoomType = function () {
    var roomType = $("#selRoomTypes").val();
    var openType = $("#selOpenTypes").val();
    var customerSource = $("#selCustomerSources").val();
    var memberCardNo = $("#txtMemberCardNo").val();
    var contractUnitId = $("#hidContractUnitId").val();
    var bookId = $("#hidBookId").val();
    //重新绑定开房方式
    TeamRoom.bindOpenTypes();
    if (roomType != "") {
        postRequest("/services/basicservice.aspx",
            {
                roomType: roomType, openType: openType, customerSource: customerSource, memberCardNo: memberCardNo,
                contractUnitId: contractUnitId, bookId: bookId
            },
            "RZXX", "GetDataAboutToRoomType", false, function (data) {
                if (data.State.Success) {
                    TeamRoom.bindRoomPriceSchemes(data.Data.RoomPriceSchemes);//绑定房价方案                              
                    TeamRoom.bindRooms(data.Data.Rooms); //绑定房间                       
                    $("#txtRoomPrice").val(parseFloat(data.Data.Price).toFixed(2));//标价                    
                    $("#txtRoomDiscountPrice").val(parseFloat(data.Data.DiscountPrice).toFixed(2));//折扣价
                    $("#txtRoomDiscountPrice").attr("data-price", parseFloat(data.Data.DiscountPrice).toFixed(2));
                    TeamRoom.bindRoomsCount();
                }
                else {
                    alert(data.State.Errkey);
                }
            });
    }
}

//改变房型
TeamRoom.changeOpenTypes = function () {
    var roomType = $("#selRoomTypes").val();
    var openType = $("#selOpenTypes").val();
    var customerSource = $("#selCustomerSources").val();
    var memberCardNo = $("#txtMemberCardNo").val();
    var contractUnitId = $("#hidContractUnitId").val();
    var bookId = $("#hidBookId").val();
    if (customerSource == "协议单位" && roomType != "") {
        TeamRoom.getContractUnitPrice();
    }
    if (roomType != "") {
        postRequest("/services/basicservice.aspx",
            {
                roomType: roomType, openType: openType, customerSource: customerSource, memberCardNo: memberCardNo,
                contractUnitId: contractUnitId, bookId: bookId
            },
            "RZXX", "GetDataAboutToRoomType", false, function (data) {
                if (data.State.Success) {
                    $("#txtRoomPrice").val(parseFloat(data.Data.Price).toFixed(2));//标价                    
                    $("#txtRoomDiscountPrice").val(parseFloat(data.Data.DiscountPrice).toFixed(2));//折扣价
                    $("#txtRoomDiscountPrice").attr("data-price", parseFloat(data.Data.DiscountPrice).toFixed(2));
                }
                else {
                    alert(data.State.Errkey);
                }
            });
    }
}

//改变会员卡号
TeamRoom.changeMemberNo = function () {
    var memberCardNo = $.trim($("#txtMemberCardNo").val());
    var customerSource = $("#selCustomerSources").val();
    $("#selPayMethods option").each(function () {
        if ($(this).val() == "-2")
            $(this).remove();
    });

    if (memberCardNo != "" && memberCardNo != "无可用会员卡") {
        var checkres = TeamRoom.getMemberByCard(memberCardNo, customerSource);
        var type = Object.prototype.toString.apply(checkres);
        if (type == "[object String]") {
            TeamRoom.showError(checkres);
            CategoryName = undefined;
            return;
        }
        else {
            $("#lblMemberCategoryName").html(checkres.CategoryName);
            $("#lblMemberCategoryName").css("display", "inline");

            if (checkres.PrepaidEnable == true && MemberPayMthodAuthority) {
                $("#selPayMethods").append("<option value='-2'>储值卡</option>");
                $("#selPayMethods").val("-2");

                $("#selPayMethods").parent().parent().find(".AverageDeposit").removeAttr("checked");
                $("#selPayMethods").parent().parent().find(".liAverageDeposit").hide();
                $("#selPayMethods").parent().parent().find(".pAverageDeposit").hide();
                $(".prepaidpay1").show();
            }
            else {
                $("#selPayMethods").val("");
            }

            CategoryName = checkres.CategoryName;
            var isSet = false;

            if ($("#selOpenTypes").val() != '2') {
                var sName = "[M]" + CategoryName;
                var lai = $("#selCustomerSources").val();
                if (sName != lai) {
                    $("#selCustomerSources").val(sName);
                    $("#selCustomerSources").change();
                }
            }
            if ($("#selRoomPriceSchemes").val() == "" && !$("#selRoomPriceSchemes").hasClass("errorborder1")) {
                TeamRoom.showError("该房型无此会员卡类型的房价方案，请到房价方案设置中添加相应的数据", "MemberCardNo");
                $("#selRoomPriceSchemes").addClass('errorborder1');
            } else if ($("#selRoomPriceSchemes").val() != "") {
                $("#selRoomPriceSchemes").removeClass('errorborder1');
            }
            if ("[M]" + CategoryName != $("#selCustomerSources").val() && $("#selCustomerSources").val().indexOf("[M]") == 0) {
                TeamRoom.showError("该会员卡类型为" + CategoryName + ",与会员来源不匹配", "MemberCardNo");
                CategoryName = undefined;
                return;
            }
        }
    }
}

//获取协议单位价格
TeamRoom.getContractUnitPrice = function () {
    var roomType = $("#selRoomTypes").val();
    var openType = $("#selOpenTypes").val();
    var contractUnitId = $("#hidContractUnitId").val();
    var data = postSynRequest("/services/basicservice.aspx",
        { RoomTypeId: roomType, openType: openType, ContractUnitId: contractUnitId }, "RZXX", "GetContractUnitPrice");
    if (data.State.Success = true) {
        $("#txtRoomDiscountPrice").val(parseFloat(data.Data.ContractUnitPrice).toFixed(2));
        $("#txtRoomDiscountPrice").attr("data-price", parseFloat(data.Data.ContractUnitPrice).toFixed(2));
    }
}

//获取房价
TeamRoom.getRoomPrice = function () {
    var schemeId = $("#selRoomPriceSchemes").val();
    var source = $("#selCustomerSources").val();
    var openType = $("#selOpenTypes").val();

    if (schemeId != "") {
        var data = postSynRequest("/services/basicservice.aspx", { schemeId: schemeId, openType: openType }, "RZXX", "GetRoomPrice");
        if (data.State.Success) {
            $("#txtRoomDiscountPrice").val(parseFloat(data.Data.price).toFixed(2));
            $("#txtRoomDiscountPrice").attr("data-price", parseFloat(data.Data.price).toFixed(2));
            if (openType == 4) {
                if (data.Data.days != 0) {
                    $("#txtStayDays").val(data.Data.days);
                    $("#txtStayDays").blur();
                }
            }
        }
        else {
            alert(data.State.Errkey);
        }
    }
}

//绑定开房方式
TeamRoom.bindOpenTypes = function () {
    $("#selOpenTypes option").remove();
    for (i = 0; i < _OpenTypes.length; i++) {
        var item = _OpenTypes[i];
        if (parseInt(item.Value) != 2) {
            $("#selOpenTypes").append('<option value="' + item.Value + '">' + item.Name + '</option>');
        }
    }

    //不允许开月租房
    if (!Set_MonthRoom)
        $("#selOpenTypes option[value='4']").remove();

    //不允许开钟点房
    var allowHour = $("#selRoomTypes option:selected").attr('data-allowhour');
    if (allowHour == "false") {
        $("#selOpenTypes option[value='2']").remove();
    }
}

//绑定房间
TeamRoom.bindRooms = function (rooms) {
    $("#ulRooms li[data-id]").remove();
    if (rooms != null && rooms.length > 0) {
        for (var i = 0; i < rooms.length; i++) {
            var item = rooms[i];
            var isExist = false;//房号是否在入住信息里存在
            isExist = $("#tbSelectedRooms tbody tr[data-no='" + item.RoomNo + "']").length > 0;
            if (!isExist) //只显示在入住信息里不存在的房号
                $("#ulRooms").prepend('<li data-id="' + item.Id + '" data-roomno="' + item.RoomNo + '" featuresval="'+item.Feature+'" data-selected="false">' + item.RoomNo + '</li>');
            else
                $("#ulRooms").prepend('<li data-id="' + item.Id + '" data-roomno="' + item.RoomNo + '" featuresval="' + item.Feature + '" data-selected="false" style="display: none;">' + item.RoomNo + '</li>');
        }
        //刷新房间统计数据
        TeamRoom.bindRoomsCount();
        //刷新房间特征过滤
        TeamRoom.FeaturesFilter();
    }
}

//统计房间总数和已选总数
TeamRoom.bindRoomsCount = function () {
    var roomCount = $("#ulRooms li[data-id][style!='display: none;']").length;
    var selectedRoomCount = $("#ulRooms li[data-id][data-selected='true'][style!='display: none;']").length;
    $("#lblRoomCount").html(roomCount);
    $("#lblSelectedRoomCount").html(selectedRoomCount);
}

//绑定房价方案
TeamRoom.bindRoomPriceSchemes = function (priceSchemes) {
    var roomPriceSchemeId = "";
    var defaultSource = "";
    var roomPrice = "";
    $("#selRoomPriceSchemes option").remove();
    //$("#selRoomPriceSchemes").append("<option value='' class='Xuanze'>请选择房价方案</option>");
    if (priceSchemes != null && priceSchemes.length > 0) {
        for (var i = 0; i < priceSchemes.length; i++) {
            var item = priceSchemes[i];
            var selectedAttr = "";
            if (item.IsDefault == 1) {
                var sources = item.Source.split(",");
                for (var j = 0; j < sources.length; j++) {
                    defaultSource = sources[0];
                }
                roomPriceSchemeId = item.Id;
                roomPrice = item.Price;
                selectedAttr = " selected = 'selected'";
            }

            if (item.Breakfast != "" && item.Breakfast != null && item.Breakfast != undefined) {
                $("#selRoomPriceSchemes").append('<option value="' + item.Id + '" data-roomtypeid="' + item.RoomTypeId + '" data-source="' + item.Source + '"' + selectedAttr + '>[' + item.Breakfast + ']' + item.Name + '</option>');
            } else {
                $("#selRoomPriceSchemes").append('<option value="' + item.Id + '" data-roomtypeid="' + item.RoomTypeId + '" data-source="' + item.Source + '"' + selectedAttr + '>' + item.Name + '</option>');
            }

            if ($("#selRoomPriceSchemes").val() == item.Id)
                roomPrice = item.Price;
        }
    }
    if (roomPrice != "") {
        $("#txtRoomDiscountPrice").val(parseFloat(roomPrice).toFixed(2));
        $("#txtRoomDiscountPrice").attr("data-price", parseFloat(roomPrice).toFixed(2));
    }
}

//改变房价方案事件
TeamRoom.changeRoomPriceSchemes = function () {
    TeamRoom.getRoomPrice();
}

//添加房间
TeamRoom.addRooms = function () {
    if (top.$(".authorizationwin").css("display") != "none")
        return false;

    var schemeId = $("#selRoomPriceSchemes").val();
    var source = $("#selCustomerSources").val();
    var openType = $("#selOpenTypes").val();
    if (openType != "2" && openType != "3" && (schemeId == "" || schemeId == null) && source != "协议单位") {
        alert("请先选择房价方案!");
        return;
    }

    var enterDate = $.trim($("#txtEnterDate").val());
    var stayDays = $.trim($("#txtStayDays").val());
    var leaveDate = $.trim($("#txtLeaveDate").val());
    var bookNo = $("#hidBookNo").val();

    var selectedRooms = $("#ulRooms li[data-selected='true']");
    if (selectedRooms.length > 0) {
        selectedRooms.each(function () {
            var roomNo = $(this).attr("data-roomno");

            //检查是否重复
            var isExist = false;
            for (i = 0; i < TeamRoom.selectedRooms.length; i++) {
                var selectedRoom = TeamRoom.selectedRooms[i];
                if (selectedRoom.RoomNo == roomNo) {
                    isExist = true;
                    break;
                }
            }

            //检查房间是否已经分房，并确认是否继续
            var isAssignAndContinue = true;
            var result = postSynRequest("/services/basicservice.aspx",
                { RoomNo: roomNo, EnterDate: enterDate, WantLeaveDate: leaveDate, BookNo: bookNo }
                , "RZXX", "CheckIsRoomNo");
            if (result.State.Success) {
                isAssignAndContinue = confirm("房间(" + roomNo + ")已分房,是否继续开房?");
            }

            if (!isExist && isAssignAndContinue) {
                //添加到已经选中的房间数组
                var room = {
                    RoomNo: roomNo,
                    RoomTypeId: $("#selRoomTypes").val(),
                    RoomTypeName: $("#selRoomTypes").find("option:selected").text(),
                    Price: $("#txtRoomPrice").val(),
                    DiscountPrice: $("#txtRoomDiscountPrice").val(),
                    PriceSchemeId: $("#selRoomPriceSchemes").val(),
                    OpenTypeId: $("#selOpenTypes").val(),
                    OpenTypeName: $("#selOpenTypes").find("option:selected").text()
                };
                if (room.PriceSchemeId == "")
                    room.PriceSchemeName = "";
                else
                    room.PriceSchemeName = $("#selRoomPriceSchemes").find("option:selected").text();
                TeamRoom.selectedRooms.push(room);
                //隐藏已经添加了的房间
                $(this).hide();                
                TeamRoom.SetTeamName();
            }
        });
        //重新绑定已经选中的房间列表
        TeamRoom.bindSelectedRooms();
        //刷新房间统计数据
        TeamRoom.bindRoomsCount();
    }   
}


//同步领队名称名称
TeamRoom.SetTeamName = function () {
    if ($("#txtLeaderName").val() != "" && TeamRoom.selectedRooms.length != 0 && TeamRoom.getAddedCustomers().length == 0) {
        var customerRow = TeamRoom.addCustomer();
        if (customerRow) {
            var tds = customerRow.find("td");
            $(tds[1]).find("input").val($("#txtLeaderName").val());
        }
    }
}


//已经选好的房间 
//json格式数组 eg:{ RoomNo: "1010", RoomTypeId: "1", RoomTypeName: "单人房", Price: "128.00", DiscountPrice: "100.00", PriceSchemeId: "4", PriceSchemeName: "单人房标准方案", OpenTypeId: "1", OpenTypeName: "天房" }
TeamRoom.selectedRooms = [];

//绑定选好的房间
TeamRoom.bindSelectedRooms = function () {
    $("#tbSelectedRooms tbody tr[data-no]").remove();

    var roomPriceTotal = 0; //总房价
    var roomOptions = "";
    for (i = 0; i < TeamRoom.selectedRooms.length; i++) {
        var room = TeamRoom.selectedRooms[i];
        roomPriceTotal = roomPriceTotal + parseFloat(room.DiscountPrice);
        var roomRowHtml =
        '<tr data-no="' + room.RoomNo + '">' +
            '<td width="60">' + room.RoomNo + '</td>' +
            '<td width="140">' + room.RoomTypeName + '</td>' +
            '<td class="fr" width="80">' + room.Price + '</td>' +
            '<td class="fr" width="80">' + room.DiscountPrice + '</td>' +
            '<td>' + room.PriceSchemeName + '</td>' +
            '<td width="70">' + room.OpenTypeName + '</td>' +
            '<td width="66">' +
                '<img width="9" height="9" src="../images/010.gif" alt=""><span class="STYLE1"> [</span><a class="btnRowDelete" href="javascript:TeamRoom.removeSelectedRoom(\'' + room.RoomNo + '\')">删除</a><span class="STYLE1">]</span>' +
            '</td>' +
        '</tr>';
        $("#tbSelectedRooms tbody").append(roomRowHtml);

        roomOptions = roomOptions + '<option value="' + room.RoomNo + '">' + room.RoomNo + '</option>';
    }

    //总金额和数量统计
    $("#lblSelectedRoomsCount").html(TeamRoom.selectedRooms.length);
    $("#lblSelectedRoomsTotal").html((parseFloat(roomPriceTotal) * $("#txtStayDays").val()).toFixed(2));

    //刷新住客信息的房号下拉选择控件
    $("#tbCustomers tbody tr[data-row-template!='true'] td select[data-field='Rooms']").each(function () {
        var select = $(this);
        var roomNo = select.val();
        select.find("option").remove();
        select.append(roomOptions);
        select.val(roomNo);
    });
}

//绑定加好的住客信息
TeamRoom.bindAddedCustomers = function () {

}

//移除选中的房间
TeamRoom.removeSelectedRoom = function (roomNo) {
    //先判断该房号是否已经分配给了住客信息
    var isUsed = $("#tbCustomers tbody tr[data-row-template!='true'] td select[data-field='Rooms'][value='" + roomNo + "']").length > 0;
    if (isUsed) {
        alert("该房号已经分配给了住客，不能删除");
        return;
    }

    //从选中的房间数组中移除
    for (i = 0; i < TeamRoom.selectedRooms.length; i++) {
        var room = TeamRoom.selectedRooms[i];
        if (room.RoomNo == roomNo)
            TeamRoom.selectedRooms.splice(i, 1);
    }
    //显示该房间，状态为未选中状态
    $("#ulRooms li[data-roomno='" + roomNo + "']").attr("data-selected", "false");
    $("#ulRooms li[data-roomno='" + roomNo + "']").removeClass("select");
    $("#ulRooms li[data-roomno='" + roomNo + "']").show();
    //重新绑定选择的房间
    TeamRoom.bindSelectedRooms();
    //刷新房间统计数据
    TeamRoom.bindRoomsCount();
}

//增加一行住客信息
TeamRoom.addCustomer = function () {
    if (TeamRoom.selectedRooms.length == 0) {
        alert("请先添加入住信息，再来添加住客信息");
        return false;
    }

    var newRow = $("#tbCustomers tbody tr[data-row-template]").clone();
    newRow.show();
    newRow.removeAttr("data-row-template");

    //绑定已选房间
    var tds = newRow.find("td")[0];
    var roomNo = "";
    var selRooms = $(tds).find("select")[0];
    for (i = 0; i < TeamRoom.selectedRooms.length; i++) {
        var room = TeamRoom.selectedRooms[i];
        $(selRooms).append('<option value="' + room.RoomNo + '">' + room.RoomNo + '</option>');

        //未分配给住客的房号
        if (roomNo == "" && $("#tbCustomers tbody tr[data-row-template!='true'] td select[data-field='Rooms'][value='" + room.RoomNo + "']").length == 0)
            roomNo = room.RoomNo;
    }

    if (roomNo == "") { //如果房号都已经分配，选择最后一个房号
        roomNo = TeamRoom.selectedRooms[TeamRoom.selectedRooms.length - 1].RoomNo;
    }
    $(selRooms).val(roomNo);

    //客户出生日期日期控件
    var txtBirthDate = newRow.find("td")[6];
    $(txtBirthDate).find("input").datetimepicker({
        lang: 'ch',
        format: 'Y-m-d',
        timepicker: false
    });

    if (MemberInfo != null && $("#txtMemberCardNo").val()!="" && $("#tbCustomers tbody tr").length == 1) {
        $(newRow.find("td")[1]).find("input").val(MemberInfo.MemberName);//姓名
        $(newRow.find("td")[2]).find("select").val(MemberInfo.MemberCardType);//证件类型
        $(newRow.find("td")[3]).find("input").val(MemberInfo.MemberCardNo);//证件号码
        $(newRow.find("td")[4]).find("select").val(MemberInfo.Sex);//性别
        if (MemberInfo.Birthday!="1900-01-01")
            $(newRow.find("td")[6]).find("input").val(MemberInfo.Birthday);//出生日期
        $(newRow.find("td")[7]).find("input").val(MemberInfo.Address);//地址
    }
    if (BookerInfo != null && $("#tbCustomers tbody tr").length == 1) {
        $(newRow.find("td")[1]).find("input").val(BookerInfo.Name);//姓名
    }

    $("#tbCustomers tbody tr[data-row-template]").before(newRow);
    $("#lblCustomerCount").html($("#tbCustomers tbody tr[data-row-template!='true']").length);

    return newRow;
}

//移除一行住客信息
TeamRoom.removeCustomer = function (btn) {
    $(btn).parent().parent().remove();
    $("#lblCustomerCount").html($("#tbCustomers tbody tr[data-row-template!='true']").length);
}

//读取身份证
TeamRoom.readIdentityCard = function () {
    top.ReadIdCard(function (sName, CardNum, Address, sSex, sNat) {
        var isExist = false;
        $("#tbCustomers tbody tr[data-row-template!='true']").each(function () {
            var tds = $(this).find("td");
            var cardType = $(tds[2]).find("select").val();
            var cardNo = $.trim($(tds[3]).find("input").val());
            if (cardType == "身份证" && cardNo == CardNum)
                isExist = true;
        });
        if (isExist) {
            alert("该身份证已经存在，不能重复使用");
            return;
        }

        var customerRow = TeamRoom.addCustomer();
        if (customerRow) {
            var tds = customerRow.find("td");
            $(tds[1]).find("input").val(sName);
            $(tds[2]).find("select").val('身份证');
            $(tds[3]).find("input").val(CardNum);
            $(tds[4]).find("select").val(sSex);
            if (sNat.indexOf("族") < 0) sNat += "族";
            $(tds[5]).find("select").val(sNat);
            $(tds[6]).find("input").val(getBirthdayByCardNo(CardNum))
            $(tds[7]).find("input").val(Address);
        }
    });
}

//获取已经添加的住客信息
TeamRoom.getAddedCustomers = function () {
    var customers = [];
    $("#tbCustomers tbody tr[data-row-template!='true']").each(function () {
        var tds = $(this).find("td");
        var customer = {
            RoomNo: $(tds[0]).find("select").val(),
            Name: $.trim($(tds[1]).find("input").val()),
            CardType: $(tds[2]).find("select").val(),
            CardNo: $.trim($(tds[3]).find("input").val()),
            Sex: $(tds[4]).find("select").val(),
            Ethnic: $(tds[5]).find("select").val(),
            BirthDate: $.trim($(tds[6]).find("input").val()),
            Address: $.trim($(tds[7]).find("input").val())
        };
        customers.push(customer);
    });
    return customers;
}

//清空入住信息和住客信息
TeamRoom.clearSelectedRoomsAndCustomers = function () {
    TeamRoom.selectedRooms = [];
    TeamRoom.bindSelectedRooms();
    $("#tbCustomers tbody tr[data-row-template!='true']").remove();
    //显示所有房间
    $("#ulRooms li[data-id]").attr("data-selected", "false");
    $("#ulRooms li[data-id]").removeClass("select");
    $("#ulRooms li[data-id]").show();
}

//显示错误  error：错误内容 groupName：错误分组
TeamRoom.showError = function (error, groupName) {
    if (groupName)
        $("#divErrors").append('<span class="formTips note_no">' + error + '</span>');
    else
        $("#divErrors").append('<span class="formTips note_no" data-group="' + groupName + '">' + error + '</span>');
}

//清理错误信息
TeamRoom.clearError = function () {
    $("#divErrors .formTips").remove();
    $(".errorborder").removeClass('errorborder');
}

///调整窗体大小
TeamRoom.adjustsize = function () {
    var x = $("#TeamroomSelect").offset().top + $("#TeamroomSelect").height();
    var y = $("#TeamroomSelect").offset().left;
    $("#TeamroomBox").css("top", x);
    $("#TeamroomBox").css("left", y);
}

//房间特征
TeamRoom.Features = function (content) {
    if (content.length > 0) {
        var html = "";
        for (var i = 0; i < content.length; i++) {
            html += "<li><input type=\"checkbox\" id=\"ckbFeatures_" + content[i].Id + "\" name=\"ckbFeatures\" value=\"" + content[i].MXName + "\" /><label for=\"ckbFeatures_" + content[i].Id + "\">" + content[i].MXName + "</label></li>";
        }
        html += "<li style=\"width:100%\"><input type=\"button\"  value=\"查找\" id=\"FeaturesSearch\" onclick=\"TeamRoom.FeaturesFilter()\" class=\"qtantj\" /></li>";
        $("#TeamroomBox").html(html);
    }
}

//过滤房间特征
TeamRoom.FeaturesFilter = function () {
    var array = new Array();
    var input = $("#TeamroomBox").find("input[type='checkbox']");
    for (var i = 0; i < input.length; i++) {
        if (input[i].checked) {
            array.push(input[i].defaultValue);
        }
    }
    $("#ulRooms li").each(function () {
        if (array.length > 0) {
            $(this).hide();
            var features = $(this).attr("featuresval");
            var ay = features.split(",");
            var isshow = 0;
            for (var i = 0; i < array.length; i++) {
                for (var j = 0; j < ay.length; j++) {
                    if (array[i] == ay[j]) {
                        isshow++;
                        break;
                    }
                }
            }
            if (isshow == array.length) {
                $(this).show();
            }
        }
        else {
            $(this).show();
        }
    });

    var display = $('#TeamroomBox').css('display')
    if (display == "block") {
        $("#TeamroomSelect").removeClass("features_s");
        $("#TeamroomBox").slideToggle();
    }
    //else if (display == "none") {
    //    $("#TeamroomSelect").addClass("features_s");
    //}
}


//初始化页面
TeamRoom.init = function () {
    //回车代替TAB
    $("input:text").keypress(function (e) {
        if (e.which == 13) {// 判断所按是否回车键  
            if ($(this).attr("id") == "txtMemberCardNo"
                || $(this).attr("id") == "txtContractUnitName") {
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

    $(window).resize(TeamRoom.adjustsize);
    TeamRoom.adjustsize();
    $("#TeamroomSelect").click(function () {
        var display = $('#TeamroomBox').css('display')
        if (display == "block") {
            $("#TeamroomSelect").removeClass("features_s");
        }
        else if (display == "none") {
            $("#TeamroomSelect").addClass("features_s");
        }
        $("#TeamroomBox").slideToggle();
    });

    //任何控件被点击，都清理掉错误信息
    $("body").on("click", "input", function () {
        TeamRoom.clearError();
    });

    //房价选择效果
    $("#ulRooms").on("click", "li[data-id]", function () {
        var $li = $(this);
        var isSelected = $li.attr("data-selected");
        if (isSelected == "true") {
            $li.attr("data-selected", "false");
            $li.removeClass("select");
        }
        else {
            $li.attr("data-selected", "true");
            $li.addClass("select");
        }
        //刷新房间统计数据
        TeamRoom.bindRoomsCount();
    });

    $("#selRoomTypes").change(TeamRoom.changeRoomType);   
    
    $("#selRoomPriceSchemes").change(TeamRoom.changeRoomPriceSchemes);

    $("#aAddRooms").click(TeamRoom.addRooms);

    $("#txtMemberCardNo").blur(TeamRoom.changeMemberNo);

    $("#txtLeaderName").blur(TeamRoom.SetTeamName);

    //房价输入框事件
    $("#txtRoomDiscountPrice").focus(function () {
        $(this).select();
    }).blur(function () {
        if (isNumeric($(this).val())) {
            if (Set_UserRoomDiscount == "1" && $(this).attr("data-price") != undefined && $(this).attr("data-price") != "0") {
                var data = postSynRequest("/services/basicservice.aspx", { RoomTypeId: $("#selRoomTypes").val() }, "RZXX", "GetUserDiscount")//
                //postRequest("/services/basicservice.aspx", { RoomTypeId: $("#selRoomTypes").val() }, "RZXX", "GetUserDiscount", false, function (data) {
                if (data.State.Success) {
                    var discountprice = parseFloat($("#txtRoomDiscountPrice").attr("data-price")) * data.Data.Discount;
                    var lastprice = $("#txtRoomDiscountPrice").attr("data-lastprice");
                    var remark = escape("团队开房时修改房价");
                    if (lastprice != undefined && lastprice != "") {
                        if (parseFloat($("#txtRoomDiscountPrice").val()) < parseFloat(lastprice) && parseFloat(lastprice) < discountprice) {//跟熟客上次入住房价比较
                            top.AuthorizationWin = window;
                            returnUpdatePrice = ResetRoomDiscountPrice;                            
                                if (data.Data.DiscountAuthorizationType == "1") {//微信授权 2016-01-10                              
                                    openWin("/FrontOp/WeChatAuthorization.html?remark=" + remark + "&authtype=1&price=" + $("#txtRoomDiscountPrice").attr("data-price") + "&discountprice=" + $("#txtRoomDiscountPrice").val() + "&roomtypeid=" + $("#selRoomTypes").val(), 400, 200, "authorizationwin");
                                } else
                            openWin("/FrontOp/DiscountAuthorization.html?price=" + $("#txtRoomDiscountPrice").attr("data-price") + "&discountprice=" + $("#txtRoomDiscountPrice").val() + "&roomtypeid=" + $("#selRoomTypes").val(), 400, 200, "authorizationwin");
                        }
                    } else if (parseFloat($("#txtRoomDiscountPrice").val()) < discountprice) {
                        top.AuthorizationWin = window;
                        returnUpdatePrice = ResetRoomDiscountPrice;
                        if (data.Data.DiscountAuthorizationType == "1") {//微信授权 2016-01-10                              
                            openWin("/FrontOp/WeChatAuthorization.html?remark=" + remark + "&authtype=1&price=" + $("#txtRoomDiscountPrice").attr("data-price") + "&discountprice=" + $("#txtRoomDiscountPrice").val() + "&roomtypeid=" + $("#selRoomTypes").val(), 400, 200, "authorizationwin");
                        } else
                        openWin("/FrontOp/DiscountAuthorization.html?price=" + $("#txtRoomDiscountPrice").attr("data-price") + "&discountprice=" + $("#txtRoomDiscountPrice").val() + "&roomtypeid=" + $("#selRoomTypes").val(), 400, 200, "authorizationwin");
                    }
                }
                else
                    alert(data.State.Errkey);
                //},false);
            }
            $(this).val(new Number($(this).val()).toFixed(2));
        }
    });

    //预留时间设置
    var Set_LeaveTimeItem = postSynRequest("/services/basicservice.aspx", { name: "DayCheckTime" }, "Common", "GetXTCSByItem");
    if (Set_LeaveTimeItem.State.Success) {
        Set_LeaveTime = Set_LeaveTimeItem.Data.Value;
    }

    //预离时间
    $("#txtLeaveDate").blur(function () {
        var RoomTypeId = $("#selRoomTypes").val();
        var EnterDate = $("#txtEnterDate").val();
        var WantLeaveDate = $("#txtLeaveDate").val();
        var RoomTypeName = $("#selRoomTypes option:selected").text();
        var bookId = getQueryParam("bookId");
        var type = 1;
        if (bookId == "") {
            bookId = "0";
            type = 2;
        }
        TeamRoom.calcEmptyRoomCount(bookId, type, RoomTypeId, RoomTypeName, EnterDate, WantLeaveDate);
    });
    $("#txtLeaveDate").datetimepicker({
        lang: 'ch',
        format: 'Y-m-d H:i',
        timepicker: false,
        minDate: $("#txtEnterDate").val(),
        onSelectDate: function (current_time, $input) {
            var dt = current_time.dateFormat('Y-m-d');
            dt = dt + ' ' + Set_LeaveTime;
            $input.val(dt);
            postRequest("/services/basicservice.aspx", { WantLeaveDate: dt }, "RZXX", "GetDays", false, function (data) {
                if (data.State.Success) {
                    $("#txtStayDays").val(data.Data);
                }
                else {
                    alert(data.State.Errkey);
                }
            });
        }
    });

    //押金输入框事件
    $("#txtDeposit").focus(function () {
        $(this).select();
    }).blur(function () {
        if (isNumeric($(this).val())) {
            $(this).val(parseFloat($(this).val()).toFixed(2));
        }
    });

    //入住时间时间
    $("#txtStayDays").keyup(function (e) {
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            return;
        }
        var obj = this;
        $(obj).val($(obj).val().replace(/[^\d]/g, ""));
        var dayVal = $("#txtStayDays").val();
        if (dayVal == "")
            $("#txtStayDays").val("1");
    });
    $("#txtStayDays").blur(function () {
        var dayVal = $.trim($("#txtStayDays").val());
        if (dayVal == "")
            return;

        var days = parseInt(dayVal);
        if (days <= 0 && $("#selOpenTypes").val() != "2") {
            days = 1;
            $("#txtStayDays").val("1");
        }
        postRequest("/services/basicservice.aspx", { days: days }, "RZXX", "GetWantLeaveDate", false, function (data) {
            if (data.State.Success) {
                $("#txtLeaveDate").val(data.Data);

                var bookId = getQueryParam("bookId");
                var type = 1;
                if (bookId == "") {
                    bookId = "0";
                    type = 2;
                }
                var RoomTypeId = $("#selRoomTypes").val();
                var EnterDate = $("#txtEnterDate").val();
                //var WantLeaveDate = $("#WantLeaveDate").val();
                var RoomTypeName = $("#selRoomTypes option:selected").text();

                TeamRoom.calcEmptyRoomCount(bookId, type, RoomTypeId, RoomTypeName, EnterDate, data.Data);
            }
            else {
                alert(data.State.Errkey);
            }
        });
    });
    $("#btnAddStayDays").click(function () {
        var days = parseInt($("#txtStayDays").val());
        if (days < 30) {
            $("#txtStayDays").val(days + 1);
            $("#txtStayDays").blur();
            $("#lblSelectedRoomsTotal").html((parseFloat($("#lblSelectedRoomsTotal").html()) / days * (days + 1)).toFixed(2));
        }
    });
    $("#btnReduceStayDays").click(function () {
        var days = parseInt($("#txtStayDays").val());
        if (days > 1) {
            $("#txtStayDays").val(days - 1);
            $("#txtStayDays").blur();
            $("#lblSelectedRoomsTotal").html((parseFloat($("#lblSelectedRoomsTotal").html()) / days * (days - 1)).toFixed(2));
        }
    });

    //客户来源改变
    $("#selCustomerSources").change(TeamRoom.changeCustomerSource);

    //房型改变
    $("#selRoomTypes").change(function () {
        TeamRoom.changeCustomerSource();
    });

    //开房方式改变
    $("#selOpenTypes").change(function () {
        TeamRoom.changeOpenTypes();
    });

    //增加住客信息按钮事件
    $("#btnAddCustomer").click(TeamRoom.addCustomer);

    //删除住客信息按钮事件
    $("#tbCustomers").on("click", "tbody tr .btnRowDelete", function () {
        TeamRoom.removeCustomer(this);
    });

    //住客信息身份证输入框事件 
    $("#tbCustomers").on("blur", "tbody tr td input[data-field='CardNo']", function () {
        var cardNo = $(this).val();
        var rowTds = $(this).parent().parent().find("td");
        var cardType = $(rowTds[2]).find("select").val();
        if (Set_IdCardNumber == "1") {
            if (cardType == "身份证" && cardNo != "") {
                var res = postSynRequest("/services/basicservice.aspx", { cardNo: cardNo }, "Common", "CheckIsIdCard");
                if (!res.State.Success) {
                    $(this).addClass('errorborder');
                    alert(res.State.Errkey);
                    return false;
                }
            }
        }
        if (cardNo.length != 18) {
            return false;
        }
        if (cardType == "身份证") {
            //自动填上生日
            $(rowTds[6]).find("input").val(getBirthdayByCardNo(cardNo));
            //自动填上性别
            if (cardNo.substr(16, 1) % 2 == 0) { //第17位为奇数：男，偶数：女
                $(rowTds[4]).find("select").val("女");
            }
            else {
                $(rowTds[4]).find("select").val("男");
            }
            postRequest("/services/basicservice.aspx", { cardNo: cardNo }, "Common", "GetZoneByIdCard", false, function (data) {
                if (data.State.Success) {
                    $(rowTds[7]).find("input").val(data.Data.Address);
                    $(rowTds[4]).find("select").val(data.Data.Customers.Sex);
                    $(rowTds[6]).find("input").val(data.Data.Customers.Birthday);
                    $(rowTds[5]).find("select").val(data.Data.Customers.Ethnic);
                    if (data.Data.Customers.Name != null)
                        $(rowTds[1]).find("input").val(data.Data.Customers.Name);
                }
                else {
                    alert(data.State.Errkey);
                }
            });
        }
    });

    //读取身份证按钮事件
    $("#btnReadIdentityCard").click(TeamRoom.readIdentityCard);

    //提交开房
    $("#btnSubmit").click(TeamRoom.submit);


    $("#txtMemberCardNo").autocomplete("/services/basicservice.aspx?classname=RZXX&method=MemberDataJson", cardOptions);
    $("#txtMemberCardNo").result(function (event, data, formatted) {
        $(".errorborder").removeClass('errorborder');
        TeamRoom.clearError();
        _OldMemberCardNo = $("#txtMemberCardNo").val();
    });

    var postDate = { bookId: getQueryParam("bookId") };
    var pathoddata = null;
    postRequest("/services/basicservice.aspx", postDate, "RZXX", "TeamOrderAddInit", false, function (data) {
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
            Set_UserRoomDiscount = data.Data.Set_UserRoomDiscount;
            MemberPayMthodAuthority = data.Data.MemberPayMthodAuthority;
            $("#txtWayPrint").val( data.Data.Set_WayPrint);
            if (data.Data.set_MonthRoom == "0") { //不允许月租房                
                Set_MonthRoom = false;
            }

            //入住时间
            $("#txtEnterDate").val(data.Data.Date);
            //预离时间
            $("#txtLeaveDate").val(data.Data.WantLeaveDate);

            //绑定房型
            if (data.Data.RoomTypes != null && data.Data.RoomTypes.length > 0) {
                for (var i = 0; i < data.Data.RoomTypes.length; i++) {
                    var item = data.Data.RoomTypes[i];
                    $("#selRoomTypes").append('<option value="' + item.Id + '" data-allowhour="' + item.AllowHour + '">' + item.Name + '</option>');
                }
            }
            $("#selRoomTypes").val(data.Data.RoomTypeId);
            $("#txtRoomPrice").val(parseFloat(data.Data.RoomTypePrice).toFixed(2));

            //绑定开房方式
            TeamRoom.bindOpenTypes();

            //绑定预定的房间（预定转入住）
            if (data.Data.BookRooms != null && data.Data.BookRooms.length > 0) {
                for (var i = 0; i < data.Data.BookRooms.length; i++) {
                    var item = data.Data.BookRooms[i];
                    var room = {
                        RoomNo: item.RoomNo,
                        RoomTypeId: item.RoomTypeId,
                        RoomTypeName: item.RoomTypeName,
                        Price: parseFloat(item.Price).toFixed(2),
                        DiscountPrice: parseFloat(item.DiscountPrice).toFixed(2),
                        PriceSchemeId: item.PriceSchemeId,
                        PriceSchemeName: item.PriceSchemeName,
                        OpenTypeId: item.OpenTypeId,
                        OpenTypeName: item.OpenTypeName
                    };
                    TeamRoom.selectedRooms.push(room);
                }
                TeamRoom.bindSelectedRooms();
            }
            //绑定团队信息（预定转入住）
            $("#hidTeamId").val(data.Data.TeamId);
            $("#txtTeamName").val(data.Data.TeamName);
            $("#txtLeaderName").val(data.Data.TeamLeaderName);
            $("#txtLeaderPhone").val(data.Data.TeamLeaderPhone);

            //绑定房间
            TeamRoom.bindRooms(data.Data.Rooms);

            //绑定会员卡号
            //if (data.Data.MemberCards != null && data.Data.MemberCards.length > 0) {
            //    $("#txtMemberCardNo").autocomplete(data.Data.MemberCards, CardOptions);
            //    $("#txtMemberCardNo").result(function (event, data, formatted) {
            //        $(".errorborder").removeClass('errorborder');
            //        TeamRoom.clearError();
            //        _OldMemberCardNo = $("#txtMemberCardNo").val();
            //    });
            //}
            //else {
            //    $("#txtMemberCardNo").attr('disabled', 'disabled');
            //    $("#txtMemberCardNo").val('无可用会员卡');
            //}

            //绑定协议单位

            //绑定客人来源
            if (data.Data.CustomerSources.length > 0) {
                for (var i = 0; i < data.Data.CustomerSources.length; i++) {
                    var item = data.Data.CustomerSources[i];
                    if (("," + data.Data.RoomPriceSchemes.Source + ",").indexOf("," + item.MXValue + ",") >= 0) {
                        $("#selCustomerSources").append('<option value="' + item.MXName + '">' + item.MXName + '</option>');
                    }
                    else {
                        $("#selCustomerSources").append('<option value="' + item.MXName + '">' + item.MXName + '</option>');
                    }
                }
            }

            //绑定房间特征
            TeamRoom.Features(data.Data.Features);

            //绑定房价方案  
            TeamRoom.bindRoomPriceSchemes(data.Data.RoomPriceSchemes);

            //绑定证件类型
            if (data.Data.CardTypes != null && data.Data.CardTypes.length > 0) {
                var obj = $("#tbCustomers tbody tr td").find("select[data-field='CardTypes']")[0];
                for (var i = 0; i < data.Data.CardTypes.length; i++) {
                    var item = data.Data.CardTypes[i];
                    $("#selCardTypes").append('<option value="' + item.Name + '">' + item.Name + '</option>');
                    $(obj).append('<option value="' + item.Name + '">' + item.Name + '</option>');
                }
                $("#selCardTypes").val('身份证');
                $(obj).val('身份证');
            }

            //绑定民族
            if (data.Data.Ethnics != null && data.Data.Ethnics.length > 0) {
                var obj = $("#tbCustomers tbody tr td").find("select[data-field='Ethnics']")[0];
                for (var i = 0; i < data.Data.Ethnics.length; i++) {
                    var item = data.Data.Ethnics[i];
                    $("#selEthnics").append('<option value="' + item.Name + '">' + item.Name + '</option>');
                    $(obj).append('<option value="' + item.Name + '">' + item.Name + '</option>');
                }
                $("#selEthnics").val('汉族');
                $(obj).val('汉族');
            }

            //绑定支付方式
            if (data.Data.PayMethods != null && data.Data.PayMethods.length > 0) {
                for (var i = 0; i < data.Data.PayMethods.length; i++) {
                    var item = data.Data.PayMethods[i];
                    $("#selPayMethods").append('<option value="' + item.Id + '">' + item.Name + '</option>');
                }
                pathoddata = data.Data.PayMethods;
            }
            $("#selPayMethods").append('<option value="-3">信用预授权</option>');

            if (data.Data.Book == null) {
                $("#txtEnterDate").val(data.Data.Date);
                $("#txtLeaveDate").val(data.Data.WantLeaveDate);
            }
            else {
                //预定转入住                
                $("#hidBookId").val(data.Data.Book.Id);
                $("#hidBookNo").val(data.Data.Book.BookNo);
                $("#lblBookNo").html(data.Data.Book.BookNo);
                $("#pBookNo").show();
                if (data.Data.Book.MemberCardNo != "") {
                    $("#txtMemberCardNo").val(data.Data.Book.MemberCardNo);
                    $("#selCustomerSources").val(data.Data.Book.Source);
                    TeamRoom.changeCustomerSource(false);
                }
                else if (data.Data.Book.ContractUnitName != "") {
                    $("#selCustomerSources").val(data.Data.Book.Source);
                    $("#txtContractUnitName").val(data.Data.Book.ContractUnitName);
                    $("#hidContractUnitId").val(data.Data.Book.ContractUnitId);
                    $("#liMemberCardNo").hide();
                    $("#liContractUnitName").show();
                    TeamRoom.changeCustomerSource(false);
                    TeamRoom.getContractUnitPrice();
                }

                $("#txtEnterDate").val(data.Data.Date);
                $("#txtStayDays").val(data.Data.Book.Days);
                $("#txtStayDays").blur();
                $("#liBookDeposit").show();
                if (data.Data.Book.BookAmount != null)
                    $("#txtBookDeposit").val(parseFloat(data.Data.Book.BookAmount).toFixed(2));

                //加载预订人 
                BookerInfo = data.Data.Book;
                TeamRoom.addCustomer();
            }

            //是否允许修改价格
            if (Set_CheckChangePrice == "1") {
                $("#txtRoomDiscountPrice").removeAttr('disabled');
            }
            else {
                $("#txtRoomDiscountPrice").attr('disabled', 'disabled');
                $("#txtRoomDiscountPrice").addClass('disabledcolor');
            }

            _OldCustomerSource = $("#selCustomerSources").val();
            //预定转入住是否允许修改房价方案
            if (Set_BookingLive != "1") {
            }
        }
        else {
            alert(data.State.Errkey);
        }
    });
    
    //增加支付方式
    $("#divZF ul li img").live("click", function () {
        var tag = $(this).attr("src");
        if (tag == "/images/01.png") { addPaymode(); return; }
        $(this).parent().parent().remove();
    });
    var addPaymode = function () {
        //GetJz();
        var optstr = ""; 
        if ($("#divZF ul").length >= $("#selPayMethods option").length) {
            alert("对不起，增加支付方式失败，超过支付方式的数量!");
            return;
        }
        //绑定支付方式
        if (pathoddata != null && pathoddata.length > 0) {
            for (var i = 0; i < pathoddata.length; i++) {
                var item = pathoddata[i];
                optstr = optstr + "<option value='" + item.Id + "'>" + item.Name + "</option>";
            }
        }
        optstr = optstr + "<option value='-3'>信用预授权</option>";
        
        var str = "<ul class='first'>";
        str += "<li><label>支付方式：</label><select  style='width: 120px; margin-right: 32px; display: inline'>" + optstr + "</select></li> ";
        str += "<li><label>押金：</label><input maxlength='8' name='PayAmount'  type='text' class='input_keynote' style='width: 100px; margin-right: 25px; display: inline' value='' /></li>";
        str += "<li style='width: 120px;'><div class='liAverageDeposit'><label>平摊押金：</label><input class='AverageDeposit' style='width:20px; height:20px;' type='checkbox' /></div></li>";
        str += "<li style='display: none' class='prepaidpay'><label class='paytitle'>会员卡号：</label><input disabled='disabled' type='text' name='MemberCardNo' value='' /><a href='javascript:void(0)' onclick='payment(this)' style='padding-left: 10px; margin-top: 5px; line-height: 24px;'>选择</a></li>";
        str += "<li style='color: #0788BD; padding-top: 3px; padding-left: 20px'>";
        str += "<img opttag='add' src='/images/01.png' width='20' height='20' style='margin-right:10px; display:inline; cursor:pointer'/> ";
        str += "<img opttag='del' src='/images/02.png' width='20' height='20' style='cursor:pointer'/>";
        str += "</li>";
        str += "</ul>";
        $("#divZF").append(str);
    };
    $("#divZF ul li select").live("change",function () {
        if ($(this).val() == "-2" || $(this).val() == "-3") {
            $(this).parent().parent().find(".AverageDeposit").removeAttr("checked");
            $(this).parent().parent().find(".liAverageDeposit").hide();
        } else {
            $(this).parent().parent().find(".liAverageDeposit").show();
        }
    })
}

//验证提交数据
TeamRoom.validData = function () {
    var bookId = getQueryParam("bookId");
    var teamId = $("#hidTeamId").val();
    var teamName = $.trim($("#txtTeamName").val());
    var leaderName = $.trim($("#txtLeaderName").val());
    var leaderPhone = $.trim($("#txtLeaderPhone").val());
    var customerSource = $("#selCustomerSources").val();
    var memberCardNo = $.trim($("#txtMemberCardNo").val());
    var contractUnitName = $.trim($("#txtContractUnitName").val());
    var contractUnitId = $("#hidContractUnitId").val();
    var enterDate = $.trim($("#txtEnterDate").val());
    var stayDays = $.trim($("#txtStayDays").val());
    var leaveDate = $.trim($("#txtLeaveDate").val());
    var payMethod = $("#selPayMethods").val();
    var payMethodName = $("#selPayMethods").find("option:selected").text();
    var deposit = $.trim($("#txtDeposit").val());
    var remark = $.trim($("#txtRemark").val());
    var orders = TeamRoom.selectedRooms;
    var customers = TeamRoom.getAddedCustomers();
    var AverageDeposit = $("#AverageDeposit").attr('checked') ? "1" : ""
    var valid = true;
    var ManualNumber = $("#ManualNumber").val();
    TeamRoom.clearError();

    //if (teamName == "") {
    //    TeamRoom.showError("团名不能为空");
    //    $("#txtTeamName").addClass("errorborder");
    //    valid = false;
    //}
    //else {
    //    if (!/^[A-Za-z\u4e00-\u9fa5]+$/.test(teamName)) {
    //        TeamRoom.showError("团名请输入中文英文");
    //        $("#txtTeamName").addClass("errorborder");
    //        valid = false;
    //    }
    //}

    //if (leaderName == "") {
    //    TeamRoom.showError("领队姓名不能为空");
    //    $("#txtLeaderName").addClass("errorborder");
    //    valid = false;
    //}
    //else {
    //    if (!/^[A-Za-z\u4e00-\u9fa5]+$/.test(leaderName)) {
    //        TeamRoom.showError("领队姓名请输入中文英文");
    //        $("#txtLeaderName").addClass("errorborder");
    //        valid = false;
    //    }
    //}
    var pattern = /^400[0-9]{7}|^800[0-9]{7}|^1[3|4|5|7|8][0-9]\d{8}$|^((0\d{2,3}-)|(0\d{2,3}))[1-9](\d{6,7}|\d{6,7}(-\d{1,4}))$/
    /*限定领队电话
    if (leaderPhone == "") {
        TeamRoom.showError("领队电话不能为空");
        $("#txtLeaderPhone").addClass("errorborder");
        valid = false;
    } else {
        if (!pattern.test(leaderPhone)) {
            TeamRoom.showError("领队电话格式不正确");
            $("#txtLeaderPhone").addClass("errorborder");
            valid = false;
        }
    }
	*/

    //检查会员卡号
    if (memberCardNo == "无可用会员卡") {
        memberCardNo = "";
    }
    if (customerSource.indexOf("[M]") == 0) {
        if (memberCardNo == "") {
            TeamRoom.showError("请输入会员卡号");
            $("#txtLeaderPhone").addClass("errorborder");
            valid = false;
        }
        else {
            var checkres = TeamRoom.getMemberByCard(memberCardNo, customerSource);
            var type = Object.prototype.toString.apply(checkres);
            if (type == "[object String]") {
                TeamRoom.showError(checkres);
                $("#txtMemberCardNo").addClass("errorborder");
                valid = false;
            }
        }
    }
    else if (memberCardNo != "") {
        var checkres = TeamRoom.getMemberByCard(memberCardNo, customerSource);
        var type = Object.prototype.toString.apply(checkres);
        if (type == "[object String]") {
            TeamRoom.showError(checkres);
            $("#txtMemberCardNo").addClass("errorborder");
            valid = false;
        }
    }

    //协议单位
    if (customerSource == "协议单位" && contractUnitName == "") {
        TeamRoom.showError("请填写协议单位");
        $("#txtContractUnitName").addClass("errorborder");
        valid = false;
    }
    if (customerSource == "协议单位" && contractUnitName != "" && (contractUnitId == "" || parseInt(contractUnitId) <= 0)) {
        TeamRoom.showError("协议单位必须从列表中选择");
        $("#txtContractUnitName").addClass("errorborder");
        valid = false;
    }

    if (stayDays == "") {
        TeamRoom.showError("请输入预住天数");
        $("#txtStayDays").addClass("errorborder");
        valid = false;
    }

    if (leaveDate == "") {
        TeamRoom.showError("请输入预离时间");
        $("#txtLeaveDate").addClass("errorborder");
        valid = false;
    }

    //订单数量检查
    if (orders.length == 0) {
        TeamRoom.showError("入住信息不能为空");
        valid = false;
    }

    //住客数量检查
    if (customers.length == 0) {
        TeamRoom.showError("住客信息不能为空");
        valid = false;
    }
    if (isContainChina(ManualNumber)) {
        TeamRoom.showError("手工单号中不能有汉字");
        valid = false;
    }
    //循环遍历检查住客信息
    var validCustomers = true;
    var validCardNo = true; //卡号是否重复
    var cardNos = "";
    $("#tbCustomers tbody tr[data-row-template!='true']").each(function () {
        var tds = $(this).find("td");
        var roomNo = $(tds[0]).find("select").val();
        var name = $.trim($(tds[1]).find("input").val());
        var cardType = $(tds[2]).find("select").val();
        var cardNo = $.trim($(tds[3]).find("input").val());
        var sex = $(tds[4]).find("select").val();
        var ethnic = $(tds[5]).find("select").val();
        var birthDate = $.trim($(tds[6]).find("input").val());
        var address = $.trim($(tds[7]).find("input").val());

        if (name == "") {
            validCustomers = false;
            $(tds[1]).find("input").addClass("errorborder");
        }
        if (!/^[A-Za-z\u4e00-\u9fa5\s·]+$/.test(name)) {
            validCustomers = false;
            $(tds[1]).find("input").addClass("errorborder");
        }

        if (Set_CompleteCheck == "1" && birthDate == "") {
            validCustomers = false;
            $(tds[6]).find("input").addClass("errorborder");
        }

        //验证卡号是否重复
        if (cardNo != "") {
            if (cardNos.indexOf("[" + cardType + ":" + cardNo + "]") >= 0) {
                validCardNo = false;
                $("#tbCustomers tbody tr[data-row-template!='true'] td input[data-field='CardNo'][value='" + cardNo + "']").addClass("errorborder");
            }
            cardNos = cardNos + "[" + cardType + ":" + cardNo + "]";
        }

        if (Set_CompleteCheck == "1" && cardNo == "") {
            validCustomers = false;
            $(tds[3]).find("input").addClass("errorborder");
        }
        else {
            if (Set_IdCardNumber == "1") {
                if (cardType == "身份证" && cardNo != "") {
                    var res = postSynRequest("/services/basicservice.aspx", { cardNo: cardNo }, "Common", "CheckIsIdCard");
                    if (!res.State.Success) {
                        validCustomers = false;
                        $(tds[3]).find("input").addClass("errorborder");
                    }
                }
            }
            if (Set_CardOneRoom == "1") {
                if (cardNo != "") {
                    var res = postSynRequest("/services/basicservice.aspx", { id: 0, cardNo: cardNo, cardType: cardType }, "RZXX", "CheckOpenIdCardIsRepeat");
                    if (!res.State.Success) {
                        TeamRoom.showError(res.State.Errkey);
                        validCustomers = false;
                        $(tds[3]).find("input").addClass("errorborder");
                    }
                }
            }
        }

        if (Set_CompleteCheck == "1" && address == "") {
            validCustomers = false;
            $(tds[7]).find("input").addClass("errorborder");
        }
    });
    if (!validCustomers) {
        TeamRoom.showError("住客信息填写不完整，或者信息内容有误");
        valid = false;
    }
    if (!validCardNo) {
        TeamRoom.showError("住客信息证件号码不能重复使用");
        valid = false;
    }

    //押金
    //if (deposit == "") {
    //    if (Set_InDeposit == "1") {
    //        TeamRoom.showError("押金不能为空");
    //        $("#txtDeposit").addClass("errorborder");
    //        valid = false;
    //    }
    //    if (!confirm("没有输入押金，是否仍然继续办理入住？")) {
    //        return false;
    //    }
    //} else {
    //    if (!isNumeric(deposit)) {
    //        TeamRoom.showError("押金格式错误");
    //        $("#txtDeposit").addClass("errorborder");
    //        valid = false;
    //    }
    //    else {
    //        var openType = $("#selOpenTypes").val();
    //        if (openType != "3" && Set_InDeposit == "1") {
    //            if (getQueryParam("bookId") != "") {
    //                var bookDeposit = parseFloat($("#txtBookDeposit").val());
    //                if (Set_MinDeposit != "" && bookDeposit + deposit < parseInt(Set_MinDeposit)) {
    //                    TeamRoom.showError('押金加定金必须不低于' + Set_MinDeposit);
    //                    $("#txtDeposit").addClass("errorborder");
    //                    valid = false;
    //                }
    //            }
    //            else {
    //                if (Set_MinDeposit != "" && parseFloat(deposit) < parseFloat(Set_MinDeposit)) {
    //                    TeamRoom.showError('押金必须不低于' + Set_MinDeposit);
    //                    $("#txtDeposit").addClass("errorborder");
    //                    valid = false;
    //                }
    //            }
    //        }
    //    }
    //}
    //检查押金信息
    var paylist = new Array();
    var zflist = $("#divZF").children();
    var payid = 0;
    var payname = "";
    var sumamount = 0; //总押金
    var averagedeposit = 0;//0不平分，1平分
    for (var i = 0; i < zflist.length; i++) {
        payid = $(zflist[i]).find("select").val();
        payname = $(zflist[i]).find("select").find("option:selected").text();
        var price = $(zflist[i]).find("input[name='PayAmount']").val();
        if (price == "") {
            TeamRoom.showError("请输入押金");
            $(zflist[i]).find("input[name='PayAmount']").addClass("errorborder");
            valid = false;
        } else if (!isNumeric(price)) {
            TeamRoom.showError("押金请输入数字");
            $(zflist[i]).find("input[name='PayAmount']").addClass("errorborder");
            valid = false;
        }
        amount = ($(zflist[i]).find("input[name='PayAmount']").val() * 1);
        sumamount = sumamount + parseFloat($(zflist[i]).find("input[name='PayAmount']").val());
        if (payid == "-2") {
            if ($(zflist[i]).find("input[name='MemberCardNo']").val() == "") {
                TeamRoom.showError("会员储值支付，请先选择验证会员卡");
                $(zflist[i]).find("input[name='MemberCardNo']").addClass("errorborder");
                valid = false;
            }
            membercardno = $(zflist[i]).find("input[name='MemberCardNo']").val();
        }
        else {
            membercardno = "";
        }
        averagedeposit = $(zflist[i]).find(".AverageDeposit").attr("checked") ? 1 : 0;
        paylist.push({ id: payid, name: payname, amount: amount, membercardno: membercardno, averagedeposit: averagedeposit });
    }
    var testr = formatarraytoserver(paylist);
    var OpenType = $("#selOpenTypes").val();
    if (OpenType != "3" && Set_InDeposit == "1") {
        if (getQueryParam("bookId") != "") {
            var BookDeposit = parseFloat($("#txtBookDeposit").val());
            if (Set_MinDeposit != "" && BookDeposit + parseInt(sumamount) < parseInt(Set_MinDeposit)) {
                TeamRoom.showError("押金加定金必须不低于");
                $("#txtDeposit").addClass("errorborder");
                valid = false;
            }
        }
        else {
            if ((sumamount == 0 || (Set_MinDeposit != "" && parseInt(sumamount) < parseInt(Set_MinDeposit)))) {
                TeamRoom.showError("押金必须不低于");
                $("#txtDeposit").addClass("errorborder");
                valid = false;
            }
        }
    }
    
    if (!valid)
        return false;

    var data = {
        BookId: bookId,
        TeamId: teamId,
        TeamName: teamName,
        TeamLeaderName: leaderName,
        TeamLeaderPhone: leaderPhone,
        CustomerSource: customerSource,
        MemberCardNo: memberCardNo,
        ContractUnitId: contractUnitId,
        ContractUnitName: contractUnitName,
        EnterDate: enterDate,
        StayDays: stayDays,
        LeaveDate: leaveDate,
        Deposit: deposit,
        PayMethod: payMethod,
        PayMethodName: payMethodName,
        PayList: testr,
        Remark: remark,
        Orders: orders,
        Customers: customers,
        ManualNumber: ManualNumber
    };
    return data;
}

//提交团队开房
TeamRoom.submit = function () {
    if (top.$(".authorizationwin").css("display") != "none")
        return false;

    //获取要提交开房的数据
    var postData = TeamRoom.validData();
    if (!postData)
        return false;

    //禁用提交按钮
    $("#btnSubmit").removeClass("a_butn");
    $("#btnSubmit").addClass("team_butn_gray");
    $("#btnSubmit").attr("disabled", "disabled");

    //提交开房
    //if (postData.PayMethod == "-2" && parseFloat(postData.Deposit) > 0) {
    //    //使用储蓄卡交押金，需要验证身份
    //    var url = "/member/payment.html?canedit=0&&cardno=" + postData.MemberCardNo + "&amount=" + postData.Deposit;
    //    top.ActiveWin = window;
    //    openWin(url, 370, 400, 'paymentwin');
    //    PaymentCheckOk = function (cardNo, amount, usableAmount) {
    //        postRequest("/services/basicservice.aspx", { TeamOrderRequest: JSON.stringify(postData) },
    //            "RZXX", "TeamOrderAdd", false, function (data) {
    //                TeamRoom.requestComplete(data);
    //            });
    //    }
    //}
    //else {
    //    postRequest("/services/basicservice.aspx", { TeamOrderRequest: JSON.stringify(postData) },
    //        "RZXX", "TeamOrderAdd", false, function (data) {
    //            TeamRoom.requestComplete(data);
    //        });
    //}
    postRequest("/services/basicservice.aspx", { TeamOrderRequest: JSON.stringify(postData) },
            "RZXX", "TeamOrderAdd", false, function (data) {
                TeamRoom.requestComplete(data);
            });
}

//团队开房请求完成
TeamRoom.requestComplete = function (data) {
    if (data.State.Success) {
        try {
            //判断浏览器处理户籍上传
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent == "jchotelclient") {
                top.hujiUploadBatch(data.Data.HuJiList);
            }
        } catch (e) { }
        var wayPrint = $("#txtWayPrint").val();//打印方式
        if (wayPrint != "" && wayPrint != "2") {
            if (confirm("团队开房成功，是否打印入住单?")) {
                PrintOrderAdd(data.Data.GroupOrderNo, wayPrint);//2015-12-14 自定义账单处理               
                //openWin("/BillInfor/BillRZD.aspx?orderno=" + data.Data.GroupOrderNo, 800, 430, "pwin2", wayPrint);
            }
        }
        else {
            alert("团队开房成功");
        }

        //发送门锁卡
        if (data.Data.IsShowDoorCard) {
            var sendDoorCardCount = 0;
            top.ActiveWin = window;
            DoorCardCallback = function () {
                if (sendDoorCardCount < data.Data.Orders.length) {
                    var order = data.Data.Orders[sendDoorCardCount];
                    top.ActiveWin = window;
                    openWin('/FrontOp/DoorCard.html?id=' + order.OrderId + '&r=' + Math.random(), 412, 250, "paymentwin");
                    sendDoorCardCount++;
                }
                else {
                    //门锁卡全部发送完成，刷新团队开房页面
                    window.location.href = "/team/TeamRoom.html";
                }
            }
            var order = data.Data.Orders[sendDoorCardCount];
            openWin('/FrontOp/DoorCard.html?id=' + order.OrderId + '&r=' + Math.random(), 412, 250, "paymentwin");
            sendDoorCardCount++;
        }else if (!data.Data.IsShowDoorCard) //如果不需要发送门锁卡，直接刷新团队开房页面
            window.location.href = "/team/TeamRoom.html";
    }
    else {
        alert(data.State.Errkey);
    }

    //启用提交按钮
    $("#btnSubmit").removeClass("team_butn_gray");
    $("#btnSubmit").addClass("a_butn");
    $("#btnSubmit").removeAttr("disabled");
}


function payment(obj) {
    payRow = $(obj).parent().parent();
    var incr = 1;
    if ($("#lblBYS").attr("tag") == "-") {
        incr = -1;
    }
    var memberCardNo = $("#txtMemberCardNo").val();
    var amount = ($(obj).parent().parent().find("input[name='PayAmount']").val() * 1) * incr;
    var url = "/member/payment.html?canedit=1&&cardno=" + memberCardNo + "&amount=" + amount;
    top.ActiveWin = window;
    openWin(url, 310, 320, 'paymentwin');
    PaymentCheckOk = function (cardNo, amount, usableAmount) {
        $(payRow).find("input[name='MemberCardNo']").val(cardNo);
    }
}