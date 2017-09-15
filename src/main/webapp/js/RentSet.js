//房租加收设置脚本
//创建人：HP
//创建时间：2015-07-07

var Isday = true;

$(function () {
    PageLoad();

    if (getQueryParam("hide") == "true") {//从房价方案过来调整布局
        $(".system_set").hide();
        $(".system_set_add").css({ "width": "100%", "border": "0px" })
    }
    $('#txt_HourRoomStartDate').datetimepicker({
        datepicker: false,
        format: 'H:i'
    });

    $('#txt_HourRoomEndDate').datetimepicker({
        datepicker: false,
        format: 'H:i'
    });

    //单选框点击事件
    $("#chk_IsDayRoom").click(function () {
        var check = $("#chk_IsDayRoom").is(":checked");
        if (check) {
            $("#text_HowManyHour").removeAttr("disabled");
        }
        else {
            $("#text_HowManyHour").val("0");
            $("#text_HowManyHour").attr("disabled", "disabled");
        }
    });
    $("input[name='rad_DayRoom']").click(function () {
        var id = $(this).attr("id");
        if (id == "rad_HalfDay" && $(this).is(":checked")) {
            $("#table_DayRoom").hide();
        }
        else if (id == "rad_HourIsDay" && $(this).is(":checked")) {
            $("#table_DayRoom").hide();
        } else {
            $("#table_DayRoom").show();
        }
    });

    //保存按钮事件
    $("#btnSave").click(function () {

        $(".note_no").remove();
        $(".errorborder").removeClass('errorborder');

        var check = true;
        var DayRoomCount = $("#hidden_DayRoom").val();
        var HourRoom = $("#hidden_HourRoom").val();
        var DayRoomIds = "";
        var DayRoomPrice = "";
        var StartHourPrice = "";
        var MemberStartHourPrice = "";
        var StartHours = "";
        var AddHourPrice = "";
        var MemberAddHourPrice = "";
        var HourRoomIds = "";
        var DayRoomTimeOut = "0";
        var Hour = $("#text_Hour").val();
        var HalfHour = $("#text_HalfHour").val();
        var HowManyHour = $("#text_HowManyHour").val();
        var HoursRoomCount = "";
        var HourRoomStartDate = $("#txt_HourRoomStartDate").val();
        var HourRoomEndDate = $("#txt_HourRoomEndDate").val();
        var HourCheck=""

        //为超X小时后按半天加收，超过X小时后按全天加收的文本消息
        var HourIsHalfOrAllDay = "";
        if (HourRoomStartDate > HourRoomEndDate) {
            alert("钟点房开始时间不能大于钟点房结束时间");
            return false;
        }
        if ($("#rad_HalfDay").is(":checked")) {
            DayRoomTimeOut = "0";
        }
        if ($("#rad_Hour").is(":checked")) {
            DayRoomTimeOut = "1";
            var halfday = $("#new_HourIsHalfDay").val();
            var allday = $("#new_HourIsAllDay").val();
            if (halfday == "") halfday = "-1";
            if (allday == "") allday = "-1";

            HourIsHalfOrAllDay = halfday + "|" + allday;
        }
        if ($("#rad_HourIsDay").is(":checked")) {
            DayRoomTimeOut = "2";
            var halfday = $("#txt_HourIsHalfDay").val();
            var allday = $("#txt_HourIsAllDay").val();
            if (halfday == "") halfday = "0";
            if (allday == "") allday = "5";

            HourIsHalfOrAllDay = halfday + "|" + allday;
        }
        for (var i = 0; i < Number(DayRoomCount) ; i++) {
            var id = $.trim($("#hidden_DayRoomId_" + i + "").val());
            var price = $("#text_DayRoom_" + i + "").val();

            DayRoomIds += id + ",";
            DayRoomPrice += isNull(price) + ",";
        }

        for (var i = 0; i < Number(HourRoom) ; i++) {

            var check = $("#box_HourRoom_" + i + "").attr("checked") != undefined ? $.trim("1") : $.trim("0")
            var shp = $.trim($("#text_StartHourPrice_" + i + "").val());
            var mshp = $.trim($("#text_MemberStartHourPrice_" + i + "").val());
            var sh = $.trim($("#text_StartHours_" + i + "").val());
            var ahp = $.trim($("#text_AddHourPrice_" + i + "").val());
            var mahp = $.trim($("#text_MemberAddHourPrice_" + i + "").val());
            var id = $("#hidden_HourRoomId_" + i + "").val();
            var hsct = $("#text_HoursRoomCount_" + i + "").val();
            if (check == "1")
            {
                var RoomType=$("#box_HourRoom_" + i + "").parent().next().html();
                if (parseInt(isNull(shp)) <= 0)
                {
                    alert(RoomType+"中钟点价需要大于0");
                    return false;
                }
                if (parseInt(isNull(mshp)) <= 0) {
                    alert(RoomType + "中会员钟点价需要大于0");
                    return false;
                }
                if (parseInt(isNull(sh)) <= 0) {
                    alert(RoomType + "中小时需要大于0");
                    return false;
                }
                if (parseInt(isNull(ahp)) <= 0) {
                    alert(RoomType + "中加收价/小时需要大于0");
                    return false;
                }
                if (parseInt(isNull(mahp)) <= 0) {
                    alert(RoomType + "中会员加收价/小时需要大于0");
                    return false;
                }
            }
            StartHourPrice += isNull(shp) + ",";
            MemberStartHourPrice += isNull(mshp) + ",";
            StartHours += isNulls(sh) + ",";
            AddHourPrice += isNull(ahp) + ",";
            MemberAddHourPrice += isNull(mahp) + ",";
            HourRoomIds += id + ",";
            HoursRoomCount += isNull(hsct) + ",";
            HourCheck += check + ",";
        }

        //处理数据 区分天房和钟点房设置：
        if (Isday) {
            hour = "";
            half = "";
            howmanyhour = "";
            hourroomstartdate = "";
            hourroomenddate = "";
            starthourprice = "";
        } else {
            DayRoomIds = "";
            dayrroomtimeout = "";
        }


        var record = {
            dayroomids: DayRoomIds,
            dayroomprice: DayRoomPrice,
            starthourprice: StartHourPrice,
            memberstarthourprice: MemberStartHourPrice,
            starthours: StartHours,
            addhourprice: AddHourPrice,
            memberaddhourprice: MemberAddHourPrice,
            hourroomids: HourRoomIds,
            dayrroomtimeout: DayRoomTimeOut,
            HourIsHalfOrAllDay:HourIsHalfOrAllDay,
            hour: Hour,
            half: HalfHour,
            howmanyhour: HowManyHour,
            hoursroomcount: HoursRoomCount,
            hourroomstartdate: HourRoomStartDate,
            hourroomenddate: HourRoomEndDate,
            HourCheck: HourCheck
        };

        postRequest("/Services/BasicService.aspx", record, "TimeOutRentSetUsl", "SaveRecord", false, function (data) {
            if (!data.State.Success) {
                alert(data.State.Des);
            }
            else {
                alert("设置成功。");
            }
        });
    });

    //选择天房设置
    $("#DayRoom").click(function () {
        $(".hour").hide();
        $(".day").show();
        Isday = true;
        $(".rent_a").removeClass("rent_select");
        $(this).addClass("rent_select");
    })
    //选择钟点房设置
    $("#HourRoom").click(function () {
        $(".hour").show();
        $(".day").hide();
        Isday = false;
        $(".rent_a").removeClass("rent_select");
        $(this).addClass("rent_select");
    })
});

//加载页面数据
var PageLoad = function () {
    postRequest("/Services/BasicService.aspx", null, "TimeOutRentSetUsl", "IndexData", false, function (data) {
        if (!data.State.Success) {
            alert(data.State.Des);
            return;
        }
        else {
            if (data.Data.PmsVersion == "0") {
                $("#Model").show();
            }
            if (data.Data.RoomType.length > 0) {
                var html = "<tr><th>房型</th><th>标价</th><th width=\"100\">加收价/小时</th></tr>";
                for (var i = 0; i < data.Data.RoomType.length; i++) {
                    var price = "0.00";
                    if (data.Data.RoomType[i].DayTimeoutPrices != "") {
                        price = data.Data.RoomType[i].DayTimeoutPrices;
                    }
                    html += "<tr><td>" + data.Data.RoomType[i].Name + "</td><td>&yen;" + data.Data.RoomType[i].Price + "</td>" +
                        "<td><input type=\"text\" value=\"" + price + "\" maxlength=\"6\" id=\"text_DayRoom_" + i + "\" onblur=\"checkNumber(this)\" />" +
                        "<input type=\"hidden\" id=\"hidden_DayRoomId_" + i + "\" value=\"" + data.Data.RoomType[i].Id + "\" /></td></tr>";
                }
                $("#table_DayRoom").html(html);
            }

            if (data.Data.AllowHour.length > 0) {
                //var html = "<tr><th>房型</th><th width=\"100\">钟点价</th><th width=\"100\">小时</th><th width=\"100\">加收价/小时</th></tr>";
                var html = "<tr><th width=\"40\"><input type='checkbox' id='choiceAll' onclick='ChoiceAll()' style='width: 100%'/></th><th  width=\"200\">房型</th><th width=\"60\">钟点价</th><th width=\"100\">会员钟点价</th><th width=\"50\">小时</th><th width=\"100\">加收价/小时</th><th width=\"120\">会员加收价/小时</th><th width=\"100\">每天可开房数</th></tr>";
                for (var i = 0; i < data.Data.AllowHour.length; i++) {
                    var sh = "0";
                    var shp = "0.00";
                    var ahp = "0.00";
                    var mshp = "0.00";
                    var mahp = "0.00";
                    var hsct = "0";
                    if (data.Data.AllowHour[i].StartHourPrice != "") {
                        shp = isNull(data.Data.AllowHour[i].StartHourPrices);
                    }
                    if (data.Data.AllowHour[i].MemberStartHourPrice != "" && data.Data.AllowHour[i].MemberStartHourPrice != null) {
                        mshp = parseFloat(isNull(data.Data.AllowHour[i].MemberStartHourPrice)).toFixed(2);
                    }
                    if (data.Data.AllowHour[i].StartHours != "") {
                        sh = parseFloat(isNull(data.Data.AllowHour[i].StartHourss)).toFixed(0);
                    }
                    if (data.Data.AllowHour[i].AddHourPrice != "") {
                        ahp = parseFloat(isNull(data.Data.AllowHour[i].AddHourPrices)).toFixed(2);
                    }
                    if (data.Data.AllowHour[i].MemberAddHourPrice != "" && data.Data.AllowHour[i].MemberAddHourPrice != null) {
                        mahp = parseFloat(isNull(data.Data.AllowHour[i].MemberAddHourPrice)).toFixed(2);
                    }
                    if (data.Data.AllowHour[i].HoursRoomCount != "" && data.Data.AllowHour[i].HoursRoomCount != null) {
                        hsct = parseFloat(isNull(data.Data.AllowHour[i].HoursRoomCount)).toFixed(0);
                    }


                    html += "<tr>";
                    if (data.Data.AllowHour[i].AllowHour) {
                        html += "<td><input type='checkbox' class='box_HourRoom' id=\"box_HourRoom_" + i + "\" style='width: 100%;height: 14px;' checked='checked'/></td>";
                    }
                    else {
                        html += "<td><input type='checkbox' class='box_HourRoom' id=\"box_HourRoom_" + i + "\" style='width: 100%;height: 14px;'/></td>";
                    }
                    html += "<td>" + data.Data.AllowHour[i].Name + "</td>" +
                        "<td><input type=\"text\" onblur=\"checkNumber(this)\" value=\"" + shp + "\" maxlength=\"5\" id=\"text_StartHourPrice_" + i + "\" style='width:70px;'/></td>" +
                        "<td><input type=\"text\" onblur=\"checkNumber(this)\" value=\"" + mshp + "\" maxlength=\"5\" id=\"text_MemberStartHourPrice_" + i + "\" /></td>" +
                        "<td><input type=\"text\" onblur=\"checkNumbers(this)\" value=\"" + sh + "\" id=\"text_StartHours_" + i + "\" maxlength=\"5\" style='width:50px;'/></td>" +
                        "<td><input type=\"text\" onblur=\"checkNumber(this)\" value=\"" + ahp + "\" id=\"text_AddHourPrice_" + i + "\" maxlength=\"5\" />" +
                        "<td><input type=\"text\" onblur=\"checkNumber(this)\" value=\"" + mahp + "\" id=\"text_MemberAddHourPrice_" + i + "\" maxlength=\"5\" />" +
                        "<input type=\"hidden\" id=\"hidden_HourRoomId_" + i + "\" value=\"" + data.Data.AllowHour[i].Id + "\" /></td>" +
                        "<td><input type=\"text\" onblur=\"checkNumber(this)\" value=\"" + hsct + "\" id=\"text_HoursRoomCount_" + i + "\" maxlength=\"5\" /></td>" + "</tr>";
                }
                $("#table_HourRoom").html(html);
            }

            if (data.Data.DayRoomTimeOut == "0") {
                $("#rad_HalfDay").attr("checked", "checked");
                $("#table_DayRoom").hide();
                // $(".newradHour").hide();
            }
            else if (data.Data.DayRoomTimeOut == "1")  {
                $("#rad_Hour").attr("checked", "checked");
                var hourtodaydata = data.Data.DayRoomTimeOutData.DefaultValue;
                if (hourtodaydata != null && hourtodaydata != ""&&hourtodaydata.indexOf("|")>0) {
                    var arr = hourtodaydata.split('|');
                    if (arr.length > 0) {
                        var tempstr = arr[0] >= 0 ? arr[0] : "";
                        $("#new_HourIsHalfDay").val(tempstr);
                    }
                    if (arr.length > 1) {
                        var tempstr = arr[1] >= 0 ? arr[1] : "";
                        $("#new_HourIsAllDay").val(tempstr);
                    }
                }
            }
            else if (data.Data.DayRoomTimeOut == "2") {
                $("#rad_HourIsDay").attr("checked", "checked");
                $("#table_DayRoom").hide();
                //$(".newradHour").hide();
                var hourtodaydata = data.Data.DayRoomTimeOutData.DefaultValue;
                if (hourtodaydata != null && hourtodaydata != "") {
                    var arr = hourtodaydata.split('|');
                    if (arr.length > 0) {
                        $("#txt_HourIsHalfDay").val(arr[0]);
                    }
                    if (arr.length >1) {
                        $("#txt_HourIsAllDay").val(arr[1]);
                    }
                }
            }

            if (data.Data.HoursToDayRoom != "0") {
                $("#text_HowManyHour").val(data.Data.HoursToDayRoom);
                $("#text_HowManyHour").removeAttr("disabled");
                $("#chk_IsDayRoom").attr("checked", true);
            }
            else {
                $("#text_HowManyHour").val("0");
                $("#text_HowManyHour").attr("disabled", "disabled");
                $("#chk_IsDayRoom").attr("checked", false);
            }

            $("#text_Hour").val(data.Data.TimeOutOneHours);
            $("#text_HalfHour").val(data.Data.TimeOutHalfAnHours);
            $("#hidden_DayRoom").val(data.Data.RoomType.length);
            $("#hidden_HourRoom").val(data.Data.AllowHour.length);
            if (data.Data.HourRoomStartDate != "" && data.Data.HourRoomStartDate != null && data.Data.HourRoomStartDate != undefined) {
                $("#txt_HourRoomStartDate").val(data.Data.HourRoomStartDate);
            }
            if (data.Data.HourRoomEndDate != "" && data.Data.HourRoomEndDate != null && data.Data.HourRoomEndDate != undefined) {
                $("#txt_HourRoomEndDate").val(data.Data.HourRoomEndDate);
            }
        }
        if (getQueryParam("hide") == "true") {//从房价方案过来调整布局
            $("#HourRoom")[0].click();
        }
        else {
            $("#DayRoom")[0].click();
        }

    });
};

function goOtherSet(i) {
    if (i == 3 || i == 2) {
        window.location = "InterfaceSet.html?i=" + i;
    }
    else if (i == 0 || i == 1) {
        window.location = "system_set.html?i=" + i;
    } else if (i == 5) {
        window.location = "model_set.html?i=" + i;
    }
}

function isNull(value) {
    if (value == "" || value == null || value == undefined) {
        return "0.00";
    }
    return value;
}

function isNulls(value) {
    if (value == "" || value == null || value == undefined) {
        return "0";
    }
    return value;
}

//检测内容是否为数字
function checkNumber(obj) {
    var value = $(obj).val();
    if (!/^\d+(\.\d+)?$/.test(value)) {
        $(obj).val("0.00");
    }
}

//检测内容是否为数字
function checkNumbers(obj, check) {
    var value = $(obj).val();

    if (!/^\d+(\.\d+)?$/.test(value)) {
        $(obj).val("0");
    }
}
//全选框
function ChoiceAll() {
    $(".box_HourRoom").each(function () {
        this.checked = $("#choiceAll")[0].checked;
    });
}