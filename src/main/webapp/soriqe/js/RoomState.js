/*
    模块名称:房态图
    功能说明:显示房间最新状态.
    代码编写:cl
    编写时间:2014-09-28
*/
//空房是否允许发卡
var IsCardRoom = null;
$(function () {
    var curid = "";              //上次选中节点
    var areas = null;            //所有区域信息
    var fid = 0;
    var qroomtype = "0";
    var qroomstate = "-2";
    var fhkey = "";
    var updating = false;        //是否处于更新中
    var stop = false;
    var lastupdate = "";         //最后一次更新时间
    //var allowDirtyRoom = postSynRequest("/services/basicservice.aspx", { name: "DirtyRoom" }, "Common", "GetXTCSByItem");
    var allowDirtyRoomValue = "0";
    //if (allowDirtyRoom.State.Success) {
    //    allowDirtyRoomValue = allowDirtyRoom.Data.Value;
    //}
    var PmsVersion = "0"; //postSynRequest("/services/basicservice.aspx", null, "Common", "GetPMSVersion").Data;

    //var appendRoom = postSynRequest("/services/basicservice.aspx", { name: "AppendRoomIsEnable" }, "Common", "GetXTCSByItem");
    var appendRoomIsEnable = "0";
    //if (appendRoom.State.Success) {
    //    appendRoomIsEnable = appendRoom.Data.Value;
    //}

    //拖动DIV时文字会被选中，加上此方法可以避免，但是火狐下要配合CSS控制
    $(document).bind("selectstart", function () { return false; });
    $(document).bind("dragstart", function () { return false; });
    ///调整窗体大小
    var adjustsize = function () {
        var lwidth = 0;
        var lheight = 0;
        var bodyheight = $(window).height();
        var bodywidth = $(window).width();
        lheight = bodyheight - $("#divFoot").height() - $("#divQuery").height();     //设置标题的宽度
        $("#div_rooms").height(lheight - 20);     //设置可变区域

        var x = $("#FeaturesSelect").offset().top + $("#FeaturesSelect").height();
        var y = $("#FeaturesSelect").offset().left;
        $("#FeaturesBox").css("top", x);
        $("#FeaturesBox").css("left", y);

    };
   

    ////根据DIVID获取FH
    var getfhbydivid = function (divid) {
        var fh = "";
        try {
            fh = $("#" + divid).attr("name");
            fh = fh.substring(4, fh.length);
        } catch (e) { }
        return fh;
    };

    ///显示联房信息
    var controlnfxx = function (divroomid, tag) {
        ///获取主房号
        var node = $("#" + divroomid);
        try {
            var zdh = $("#" + divroomid + " div").attr("zdh");
            if (zdh == "") { return; }
            var arrzdh = zdh.split(",");
            for (var j = 0; j < arrzdh.length; j++) {
                var zfh = arrzdh[j];
                var nodes = $(".C" + zfh);
                if (nodes.length <= 1) {
                    tag = false;
                }
                if (!tag) {
                    $(".C" + zfh).hide();

                    var roomdiv = $(".C" + zfh).parent().parent('.divs');
                    for (var i = 0; i < roomdiv.length; i++) {
                        $(roomdiv[i]).removeClass("select");
                    }

                } else {
                    $(".C" + zfh).show();

                    var roomdiv = $(".C" + zfh).parent().parent('.divs');
                    for (var i = 0; i < roomdiv.length; i++) {
                        $(roomdiv[i]).addClass("select");
                        if ($(roomdiv[i]).attr("zdh") == $(roomdiv[i]).attr("orderno") && roomdiv.length != 1) {
                            $(roomdiv[i]).find(".contact").attr("style", "background-color: #D9F433;");
                        }
                    }


                }
            }
        } catch (e) { }
    };

    ///判断是否是联房
    var islf = function (divroomid) {
        var tag = false;
        var node = $("#" + divroomid);
        try {
            var zfh = $("#" + divroomid + " div").attr("zdh"); /// node[0].children[0].rzid;
            if (zfh == "") { return; }
            var nodes = $(".C" + zfh);
            if (nodes.length > 1) {
                tag = true;
            }
        } catch (e) { }
        return tag;
    };

    var loadHTML = function (htmltext) {
        $(".divroom").die();
        $("#div_rooms").html(htmltext);
        var obj = undefined;
        var move = false; //移动标记
        var click = false;
        var carddata = undefined;
        var downX = undefined;
        var downY = undefined;
        $(".divroom").live("mousedown", function (e) {
            cancelEvent(e);
            if (3 == e.which) {
                $("#pp").hide();
                $("#room").hide();
                e.preventDefault();
                curid = $(this).attr("id");
                alwaysshowmm = true;
                showmenu(e, $(this).attr("id"));

            }
            else if (1 == e.which && $(this).find(".divs").attr("zt") == "1") {
                click = true;
                obj = this;//将当前对象赋值
                var adivid = $(this).attr("id");
                var id = adivid.substring(4);
                var zdh = $(this).children("div").attr("zdh");
                carddata = postSynRequest("/Services/BasicService.aspx", { id: id, zdh: zdh }, "RoomStateUsl", "RoomStateDataByMove");
                downX = e.pageX;
                downY = e.pageY;
                //当鼠标指针在指定的元素中移动时
                $(document).bind("mousemove", function (ev) {
                    var distanst = Math.sqrt(Math.pow(Math.abs(ev.pageX - downX), 2) + Math.pow(Math.abs(ev.pageY - downY), 2));

                    if (obj != undefined && distanst > 1) {
                        click = false;
                        move = true;
                        var n_x = ev.pageX - 30;//获得X轴方向移动的值  
                        var n_y = ev.pageY - 18;//获得Y轴方向移动的值 
                        //移动是显示拖动框，并将该框的坐标跟随鼠标坐标
                        $("#MoveRoom").show();
                        $("#MoveRoom").css({ left: n_x + "px", top: n_y + "px" });
                        $("#MoveRoom").find(".name").html($(obj).find(".name").html());
                        $("#MoveRoom").find(".room_type").html('<font color="#f00">' + $(obj).find(".room").html() + '</font>&nbsp;/&nbsp;' + $(obj).find(".type").html());
                        if (carddata != undefined) {
                            if (carddata.Data.CardNo != "") {
                                $("#MoveRoom").find(".times:eq(0)").html('<label>' + carddata.Data.CardType + '：</label><p>' + carddata.Data.CardNo + '</p>');
                            } else {
                                $("#MoveRoom").find(".times:eq(0)").html('');
                            }
                            if (carddata.Data.CohabitName != "") {
                                $("#MoveRoom").find(".times:eq(1)").html('<label>同住房：</label><p>' + carddata.Data.CohabitName + '</p>');
                            } else {
                                $("#MoveRoom").find(".times:eq(1)").html('');
                            }
                        }
                        //移动到空房时
                        $(".divroom").each(function () {
                            if ($(this).find(".divs").attr("zt") == "0") {
                                var offset = $(this).offset();
                                var minX = offset.left;
                                var maxX = minX + $(this).width();
                                var minY = offset.top;
                                var maxY = minY + $(this).height();
                                var _x = ev.pageX;
                                var _y = ev.pageY;

                                if (_x > minX && _y > minY && _x < maxX && _y < maxY) {
                                    if (!$(this).find(".divs").hasClass("select")) {
                                        $(this).find(".divs").addClass("select");
                                    }
                                } else if ($(this).find(".divs").hasClass("select")) {
                                    $(this).find(".divs").removeClass("select");
                                }
                            }
                        });
                    }
                });
            }
        });

        //DOM绑定放松鼠标按钮时
        $(document).live("mouseup", function (ev) {
            if (move == true) {
                //如果是拖动，就取消单击事件
                cancelEvent(ev);
            }
            else {
                //如果是单击到空房上时，后面的不需执行
                obj = undefined;
                move = false;
                downX = undefined;
                downY = undefined;
                return;
            }
            if (click == true) {
                //如果是拖动，就取消单击事件
                cancelEvent(ev);
            }
            else {
                click = false;
                carddata = undefined;
            }
            downX = undefined;
            downY = undefined;
            $("#MoveRoom").hide();
            //移动到空房时
            $(".divroom").each(function () {
                if ($(this).find(".divs").attr("zt") == "0") {
                    var offset = $(this).offset();
                    var minX = offset.left;
                    var maxX = minX + $(this).width();
                    var minY = offset.top;
                    var maxY = minY + $(this).height();
                    var _x = ev.pageX;
                    var _y = ev.pageY;
                    if (_x > minX && _y > minY && _x < maxX && _y < maxY) {
                        if ($(this).find(".divs").hasClass("select")) {
                            $(this).find(".divs").removeClass("select");
                        }
                        curid = $(obj).attr("id");
                        //当前房号id
                        var roomid = curid.substring(4, curid.length);
                        //当前房号
                        var fh = getfhbydivid(curid);
                        //空房信息
                        var newcurid = $(this).attr("id");
                        var newroomid = newcurid.substring(4, newcurid.length);
                        var newroomtype = $.trim($(this).find(".type").html());
                        var newfh = getfhbydivid(newcurid);

                        var orderid = $("#" + curid + " div").attr("rzid");
                        if (orderid.indexOf(",") < 0) {
                            openWin('/FrontOp/ChangeRoom.html?id=' + orderid + "&no=" + escape(fh) + "&newroomid=" + newroomid + "&newfh=" + escape(newfh)+ "&newroomtype=" + escape(newroomtype) + "&r=" + Math.random(), 905, 400);
                        }
                        else {//拼房先选择入住单
                            var orderno = $("#" + curid + " div").attr("orderno");
                            var customers = $("#" + curid + " div .name").html()
                            chooseOrder(orderid, orderno, customers, '换房', function (id) {
                                openWin('/FrontOp/ChangeRoom.html?id=' + id + "&no=" + escape(fh) + "&newroomid=" + newroomid + "&newfh=" + escape(newfh) + "&newroomtype=" + escape(newroomtype) + "&r=" + Math.random(), 905, 400);
                            });
                        }

                        $("#MoveRoom").hide();
                    }
                }
            });
            obj = undefined;
            carddata = undefined;
            move = false;
        });

        $(".divroom").live("click", function (e) {
            if (curid != "") {
                controlnfxx(curid, false);
            }
            e.preventDefault();
            curid = $(this).attr("id");
            controlnfxx(curid, true);

            //判断是否显示宾客账务信息
            var isPower = false;
            var resultSynRequest = postSynRequest("/Services/BasicService.aspx", null, "RoomStateUsl", "GetDisplayBillInfo");
            if (resultSynRequest.State.Success) {
                isPower = resultSynRequest.Data == "1" ? true : false;
            }
            if (!isPower) {
                return;
            }
            cancelEvent(e);
            var divid = $(this).attr("id");
            alwaysshowmm = false;
            $("#mm").menu('hide');
            $("#room").hide();
            $("#pp").hide();

            var state = $("#" + divid + " div").attr("zt");
            if (state == "1") {
                $("#pp").show();
                var x = e.pageX + 2;
                var y = e.pageY;
                if (e.pageX > $(window).width() / 2) {
                    x = x - $("#pp").width() - 42;
                }
                if (e.pageY > $(window).height() / 2) {
                    y = y - $("#pp").height() - 30;
                }
                $('#pp').css({ left: x, top: y });
                var id = divid.substring(4);
                var zdh = $(this).children("div").attr("zdh");
                postRequest("/Services/BasicService.aspx", { id: id, zdh: zdh }, "RoomStateUsl", "RoomStateData", false, function (data) {
                	if (data.State.Success) {
                		console.log(data);
                        if (data.Data.RoomNo.indexOf(',') >= 0) {
                            $("#show").show();
                        } else {
                            $("#show").hide();
                        }
                        $("#Name").html(data.Data.CustomerName);
                        $("#RoomNo").html(data.Data.RoomNo);
                        var arrZdh = zdh.split(",");
                        if (arrZdh.length > 1) {//拼房
                            $(".nextorder").show();
                            $(".nextorder").attr('data-zdh', zdh);
                            $(".nextorder").attr('data-roomid', id);
                            $(".nextorder").attr('data-index', 0);
                        }
                        else {
                            $(".nextorder").hide();
                        }
                        $("#RoomType").html(data.Data.RoomTypeName);
                        $("#StartDate").html(data.Data.StrEnterDate);
                        $("#EndDate").html(data.Data.StrWantLeaveDate);
                        $("#OpenType").html(data.Data.OpenTypeName);
                        $("#Status").html(data.Data.StrStatusName);
                        if (data.Data.Consumption != null && data.Data.Consumption != "" && data.Data.Consumption != undefined) {
                            $("#Consumption").html(data.Data.Consumption.toFixed(2));
                        } else {
                            $("#Consumption").html("0.00");
                        }
                        if (data.Data.DepositPrice != null && data.Data.DepositPrice != "" && data.Data.DepositPrice != undefined) {
                            $("#Deposit").html(data.Data.DepositPrice.toFixed(2));
                        } else {
                            $("#Deposit").html("0.00");
                        }
                        if (data.Data.YSC != null && data.Data.YSC != "" && data.Data.YSC != undefined) {
                            $("#YSC").html(data.Data.YSC.toFixed(2));
                        } else {
                            $("#YSC").html("0.00");
                        }
                        if (data.Data.Balance != null && data.Data.Balance != "" && data.Data.Balance != undefined) {
                            $("#Balance").html(data.Data.Balance.toFixed(2));
                            if (data.Data.Balance < 0) {
                                $("#Yue").removeClass("four");
                                $("#Yue").addClass("five");
                                $("#Balance").removeClass("four");
                                $("#Balance").addClass("five");
                            }
                            else {
                                $("#Yue").removeClass("five");
                                $("#Yue").addClass("four");
                                $("#Balance").removeClass("five");
                                $("#Balance").addClass("four");
                            }
                        } else {
                            $("#Balance").html("0.00");
                        }
                        if (data.Data.Remark != null && data.Data.Remark != "" && data.Data.Remark != undefined) {
                            $("#Remark").html(data.Data.Remark.replace(/\n/g, "<br/>"));
                        } else {
                            $("#Remark").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                        }
                        if (data.Data.CohabitName != "") {
                            $("#TogetherLive").css("display", "block");
                            $("#Cohabit").html(data.Data.CohabitName);
                        }
                        else {
                            $("#TogetherLive").css("display", "none");
                        }
                        if (data.Data.Phone != "") {
                            $("#div_Phone").css("display", "block");
                            $("#CusPhone").html(data.Data.Phone);
                        }
                        else {
                            $("#div_Phone").css("display", "none");
                        }
                        if (data.Data.ContractUnitName != "" && data.Data.ContractUnitName != null) {
                        	$("#div_Contract").css("display", "block");
                        	$("#spanContract").html(data.Data.ContractUnitName);
                        }
                        else {
                        	$("#div_Contract").css("display", "none");
                        }
                        if (appendRoomIsEnable == "1" && data.Data.BedNo != "") {
                            $("#div_BedNo").css("display", "block");
                            $("#spanBedNo").html(data.Data.BedNo);
                            $("#div_Phone").css("width", "50%");
                            $("#CusPhone").css("width", "60%");
                            $("#CusPhone").prev().css("width", "40%")
                        }
                        else {
                            $("#div_BedNo").css("display", "none");
                        }
                    }
                });
            } else if (state == "3" || state == "4") {
                if ($(this).find(".name").html() == undefined && $(this).find(".price").html() == undefined) {
                    $("#room").show();
                    var x = e.pageX;
                    var y = e.pageY;
                    if (e.pageX > $(window).width() / 2) {
                        x = x - $("#room").width() - 40;
                    }
                    if (e.pageY > $(window).height() / 2) {
                        y = y - $("#room").height() - 30;
                    }
                    $('#room').css({ left: x, top: y });
                    var id = divid.substring(4);
                    postRequest("/Services/BasicService.aspx", { id: id }, "RoomStatusLogUsl", "RoomStatusLogData", false, function (data) {
                        if (data.State.Success) {
                            if (state == "3")
                                var roomdis = "维修房间：  " + data.Data.RoomNo
                            else
                                var roomdis = "预留房间：  " + data.Data.RoomNo
                            $("#LogRoomNo").html(roomdis);
                            $("#LogRemark").html(data.Data.Remark);
                            $("#CreateDate").html(formatDateStr(data.Data.CreateDate, "yyyy-MM-dd"));
                        }
                        else
                            $("#room").hide();
                    });
                }
            }
        });
        var alwaysshowmm = true;

        //拼房查看下一个单
        $(".nextorder").click(function (e) {
            cancelEvent(e);
            var zdhs = $(this).attr("data-zdh");
            var roomId = $(this).attr("data-roomid");
            var index = $(this).attr("data-index");
            var arrZdh = zdhs.split(",");
            var i = parseInt(index) + 1;
            if (i >= arrZdh.length) i = 0;
            $(this).attr("data-index", i);

            postRequest("/Services/BasicService.aspx", { id: roomId, zdh: arrZdh[i] }, "RoomStateUsl", "RoomStateData", false, function (data) {
                if (data.State.Success) {
                    if (data.Data.RoomNo.indexOf(',') >= 0) {
                        $("#show").show();
                    } else {
                        $("#show").hide();
                    }
                    $("#Name").html(data.Data.CustomerName);
                    $("#RoomNo").html(data.Data.RoomNo);
                    $("#RoomType").html(data.Data.RoomTypeName);
                    $("#StartDate").html(data.Data.StrEnterDate);
                    $("#EndDate").html(data.Data.StrWantLeaveDate);
                    $("#OpenType").html(data.Data.OpenTypeName);
                    $("#Status").html(data.Data.StrStatusName);
                    if (data.Data.Consumption != null && data.Data.Consumption != "" && data.Data.Consumption != undefined) {
                        $("#Consumption").html(data.Data.Consumption.toFixed(2));
                    } else {
                        $("#Consumption").html("0.00");
                    }
                    if (data.Data.DepositPrice != null && data.Data.DepositPrice != "" && data.Data.DepositPrice != undefined) {
                        $("#Deposit").html(data.Data.DepositPrice.toFixed(2));
                    } else {
                        $("#Deposit").html("0.00");
                    }
                    if (data.Data.YSC != null && data.Data.YSC != "" && data.Data.YSC != undefined) {
                        $("#YSC").html(data.Data.YSC.toFixed(2));
                    } else {
                        $("#YSC").html("0.00");
                    }
                    if (data.Data.Balance != null && data.Data.Balance != "" && data.Data.Balance != undefined) {
                        $("#Balance").html(data.Data.Balance.toFixed(2));
                        if (data.Data.Balance < 0) {
                            $("#Yue").removeClass("four");
                            $("#Yue").addClass("five");
                            $("#Balance").removeClass("four");
                            $("#Balance").addClass("five");
                        }
                        else {
                            $("#Yue").removeClass("five");
                            $("#Yue").addClass("four");
                            $("#Balance").removeClass("five");
                            $("#Balance").addClass("four");
                        }
                    } else {
                        $("#Balance").html("0.00");
                    }
                    if (data.Data.Phone != "") {
                        $("#div_Phone").css("display", "block");
                        $("#CusPhone").html(data.Data.Phone);
                    }
                    else {
                        $("#div_Phone").css("display", "none");
                    }                  
                    if (appendRoomIsEnable == "1" && data.Data.BedNo != "") {
                        $("#div_BedNo").css("display", "block");
                        $("#spanBedNo").html(data.Data.BedNo);
                        $("#div_Phone").css("width", "50%");
                        $("#CusPhone").css("width", "60%");
                        $("#CusPhone").prev().css("width", "40%")
                    }
                    else {
                        $("#div_BedNo").css("display", "none");
                    }                   
                    if (data.Data.Remark != null && data.Data.Remark != "" && data.Data.Remark != undefined) {
                        $("#Remark").html(data.Data.Remark.replace(/\n/g, "<br/>"));
                    } else {
                        $("#Remark").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                    }
                    if (data.Data.CohabitName != "") {
                        $("#TogetherLive").css("display", "block");
                        $("#Cohabit").html(data.Data.CohabitName);
                    }
                    else {
                        $("#TogetherLive").css("display", "none");
                    }
                }
            });
        });

        $(document).click(function (e) {
            if (1 == e.which) {
                $("#pp").hide();
                $("#room").hide();
                alwaysshowmm = false;
                $("#mm").menu('hide');
            }
        });
        $(".close").click(function () {
            $("#pp").hide();
        });
        $(".close1").click(function () {
            $("#room").hide();
        });
        $("#mm").menu({
            onHide: function () {
                if (alwaysshowmm == true) {
                    $("#mm").menu('show');
                }
            }
        });

        $(".divroom").live("dblclick", function (e) {
            var selid = $(this).attr("id").toString();
            $(this).removeClass("DivRoomOver")
            if (curid != "" && curid != selid) { $("#" + curid).removeClass("DivRoomSel") }
            if (curid != selid) { $(this).addClass("DivRoomSel") };
            curid = selid;
            roomdblclick(curid, e);
        });

        $(".divroom").hover(function () {
            var selid = this.id.toString();
            if (curid != selid) {
                $(this).addClass("DivRoomOver");
            }
        }, function () {
            var selid = this.id.toString();
            if (curid != selid) {
                $(this).removeClass("DivRoomOver");
            }
        });

        var color0 = $.cookie('color_cookie_0');
        var color1 = $.cookie('color_cookie_1');
        var color2 = $.cookie('color_cookie_2');
        var color3 = $.cookie('color_cookie_3');
        var color4 = $.cookie('color_cookie_4');
        if (color0 != null) {
            $("#kf").removeClass("blue");
            $("#kf").css("background-color", color0);
        }
        if (color1 != null) {
            $("#rz").removeClass("red");
            $("#rz").css("background-color", color1);
        }
        if (color2 != null) {
            $("#ds").removeClass("gray");
            $("#ds").css("background-color", color2);
        }
        if (color3 != null) {
            $("#xl").removeClass("black");
            $("#xl").css("background-color", color3);
        }
        if (color4 != null) {
            $("#yl").removeClass("purple");
            $("#yl").css("background-color", color4);
        }
        $("#div_rooms .divroom").each(function () {
            var zt = $(this).find(".divs").attr("zt");
            switch (zt) {
                case "0":
                    if (color0 != null) {
                        $(this).find(".divs").removeClass("blue");
                        $(this).find(".divs").css("background-color", color0);
                    }
                    break;
                case "1":
                    if (color1 != null) {
                        $(this).find(".divs").removeClass("red");
                        $(this).find(".divs").css("background-color", color1);
                    }
                    break;
                case "2":
                    if (color2 != null) {
                        $(this).find(".divs").removeClass("gray");
                        $(this).find(".divs").css("background-color", color2);
                    }
                    break;
                case "3":
                    if (color3 != null) {
                        $(this).find(".divs").removeClass("black");
                        $(this).find(".divs").css("background-color", color3);
                    }
                    break;
                case "4":
                    if (color4 != null) {
                        $(this).find(".divs").removeClass("purple");
                        $(this).find(".divs").css("background-color", color4);
                    }
                    break;
            }
        });

        var roomsize = $.cookie('size_cookie');
        if (roomsize != null) {
            var clas = $("#ftt_type").attr("class");
            $("#ftt_type").removeClass(clas);
            $("#ftt_type").addClass(roomsize);
            switch (roomsize) {
                case "ftt_big":
                    $("#small").css("display", "");
                    $("#middle").css("display", "");
                    $("#big").css("display", "block");
                    break;
                case "ftt_small":
                    $("#small").css("display", "block");
                    $("#middle").css("display", "");
                    $("#big").css("display", "");
                    break;
                case "ftt_middle":
                    $("#small").css("display", "");
                    $("#middle").css("display", "block");
                    $("#big").css("display", "");
                    break;
            }
        }
    }

    ///双击房间
    var roomdblclick = function (divid, e) {
        if (e == undefined || e.which == 1) {
            var state = $("#" + divid + " div").attr("zt");
            switch (state) {
                case "0":
                    openroom();
                    break;
                case "1":
                    backroom();
                    break;
                case "2":
                    break;
                case "3":
                    break;
            }
        }
    }
    ///点击打开菜单
    var showmenu = function (e, divid) {
        $('#mm').menu('show', { left: e.pageX, top: e.pageY });
        var state = $("#" + divid + " div").attr("zt");
        var vip = $("#" + divid + " em").hasClass("vip");
        var cleans = $("#" + divid + " em").hasClass("cleans");
        var roomno = $("#" + divid + " div").attr("data-roomno");
        var rzid = $("#" + divid + " div").attr("rzid");
        var orderno = $("#" + curid + " div").attr("orderno");
        var prounit = $("#" + divid + " em").hasClass("co");//协议单位处理
        var deposit = $("#" + divid + " em").hasClass("deposit");//是否有押金(包括预授权)
        var clecanstatus = $("#" + divid + " div").attr("clecanstatus"); //打扫状态
        var bookid = $("#" + divid + " div").attr("data-bookid"); //预订单id
        var colck = $("#" + divid + " em").hasClass("clock");//是否是钟点房
        var lftag = islf(divid);
        switch (state) {
            case "0": //空房
                lockmenu1(true, lftag);
                $("#mm").menu("enableItem", $('#div_open')[0]);
                $('#div_open div').html('开房');
                $("#mm").menu("enableItem", $('#div_team_open')[0]);
                $('#div_team_open div').html('团队开房');
                $("#mm").menu("enableItem", $('#div_multi')[0]);
                $("#mm").menu("disableItem", $('#div_blank')[0]);
                $("#mm").menu("enableItem", $('#div_making')[0]);
                $("#mm").menu("enableItem", $('#div_waitclear')[0]);
                $("#mm").menu("enableItem", $('#div_batch')[0]);
                $("#mm").menu("disableItem", $('#div_torz')[0]);
                $("#mm").menu("disableItem", $('#div_cancelyt')[0]);
                $("#mm").menu("enableItem", $('#div_book')[0]);
                $("#mm").menu("enableItem", $('#div_reserve')[0]);
                $("#mm").menu("disableItem", $('#div_cleans')[0]);
                $("#mm").menu("disableItem", $('#div_cleansout')[0]);
                $("#mm").menu("disableItem", $('#div_deposit')[0]);
                //$("#mm").menu("disableItem", $('#div_black')[0]);20161012  右键优化
                $("#mm").menu("disableItem", $('#div_wakeup')[0]);
                $("#mm").menu("disableItem", $('#div_leaseitem')[0]);
                $("#mm").menu("disableItem", $('#div_turndeposit')[0]);
                $("#mm").menu("disableItem", $('#div_turnbook')[0]);
                $("#mm").menu("disableItem", $('#div_partbill')[0]);
                $("#mm").menu("disableItem", $('#div_linenchange')[0]);
                $("#mm").menu("disableItem", $('#div_book_enter')[0]);
                $("#mm").menu("disableItem", $('#div_revoke_occupancy')[0]);
                $("#mm").menu("disableItem", $('#div_print_checkin')[0]);
                $("#mm").menu("disableItem", $('#div_print_continue')[0]);

                //检查该房间是否已经发卡
                if (IsCardRoom == "1") {
                    $("#mm").menu("enableItem", $('#div_doorcard')[0]);
                    var rest = postSynRequest("/services/basicservice.aspx", { roomNo: roomno }, "LockRecordUsl", "QueryWhere");
                    if (!rest.State.Success) {
                        //$("#mm").menu("disableItem", $('#div_doorcard')[0]); //门锁发卡
                        $("#mm").menu("enableItem", $('#div_doorclear')[0]); //门锁清卡
                    } else {
                        //$("#mm").menu("enableItem", $('#div_doorcard')[0]);
                        $("#mm").menu("disableItem", $('#div_doorclear')[0]);
                    }
                } else {
                    $("#mm").menu("disableItem", $('#div_doorcard')[0]);
                    $("#mm").menu("disableItem", $('#div_doorclear')[0]);
                }
                break;
            case "1": //在住
                lockmenu1(false, lftag);
                //拼房判断
                if (appendRoomIsEnable == "0") {
                    $("#mm").menu("disableItem", $('#div_open')[0]);
                    $('#div_open div').html('开房');
                }
                else {
                    //检查已住入住单数，判断是否可以继续入住
                    var res = postSynRequest("/services/basicservice.aspx", { roomno: roomno }, "RZXX", "CheckAppendRoom");
                    if (res.State.Success) {
                        $("#mm").menu("enableItem", $('#div_open')[0]);
                    }
                    else {
                        $("#mm").menu("disableItem", $('#div_open')[0]);
                    }
                    $('#div_open div').html('拼房开房');
                }
                $("#mm").menu("disableItem", $('#div_multi')[0]);
                $("#mm").menu("disableItem", $('#div_blank')[0]);
                $("#mm").menu("disableItem", $('#div_reserve')[0]);
                $("#mm").menu("disableItem", $('#div_making')[0]);
                $("#mm").menu("disableItem", $('#div_waitclear')[0]);
                $("#mm").menu("enableItem", $('#div_batch')[0]);
                $("#mm").menu("disableItem", $('#div_book')[0]);
                $("#mm").menu("disableItem", $('#div_torz')[0]);
                $("#mm").menu("disableItem", $('#div_cancelyt')[0]);
                $("#mm").menu("enableItem", $('#div_partbill')[0]);
                //$("#mm").menu("enableItem", $('#div_black')[0]);20161012  右键优化
                $("#mm").menu("enableItem", $('#div_wakeup')[0]);
                $("#mm").menu("enableItem", $('#div_leaseitem')[0]);
                $("#mm").menu("disableItem", $('#div_book_enter')[0]);
                $("#mm").menu("enableItem", $('#div_revoke_occupancy')[0]);
                $("#mm").menu("enableItem", $('#div_doorcard')[0]);
                $("#mm").menu("enableItem", $('#div_print_checkin')[0]);
                $("#mm").menu("enableItem", $('#div_print_continue')[0]);
                var rest = postSynRequest("/services/basicservice.aspx", { roomNo: roomno, orderno: orderno }, "LockRecordUsl", "QueryWhere");
                //等于true显示发卡
                if (!rest.State.Success) {
                    //$("#mm").menu("disableItem", $('#div_doorcard')[0]); //门锁发卡
                    $("#mm").menu("enableItem", $('#div_doorclear')[0]); //门锁清卡
                } else {
                    //$("#mm").menu("enableItem", $('#div_doorcard')[0]);
                    $("#mm").menu("disableItem", $('#div_doorclear')[0]);
                }

                //检查该房间是否已经发卡
                //if (IsCardRoom == "1") {
                //    var rest = postSynRequest("/services/basicservice.aspx", { roomNo: roomno }, "LockRecordUsl", "QueryWhere");
                //    if (!rest.State.Success) {
                //        $("#mm").menu("disableItem", $('#div_doorcard')[0]); //门锁发卡
                //        $("#mm").menu("enableItem", $('#div_doorclear')[0]); //门锁清卡
                //    } else {
                //        $("#mm").menu("enableItem", $('#div_doorcard')[0]);
                //        $("#mm").menu("disableItem", $('#div_doorclear')[0]);
                //    }
                //} else {
                //    $("#mm").menu("enableItem", $('#div_doorcard')[0]);
                //    $("#mm").menu("disableItem", $('#div_doorclear')[0]);
                //}
                //if (vip) {
                    //$("#mm").menu("disableItem", $('#div_member')[0]); 20161012  右键功能优化
                //}
                //if (prounit && rzid.indexOf(",") < 0) {
                //    var reProunit = postSynRequest("/services/basicservice.aspx", { rzid: rzid }, "RZXX", "CheckYS");
                //    if (reProunit.State.Success) {
                //        $("#mm").menu("disableItem", $('#div_adjust')[0]);
                //    }
                //}
                if (clecanstatus == "1") {
                    $("#mm").menu("disableItem", $('#div_cleans')[0]);
                    $("#mm").menu("enableItem", $('#div_cleansout')[0]);
                } else {
                    $("#mm").menu("enableItem", $('#div_cleans')[0]);
                    $("#mm").menu("disableItem", $('#div_cleansout')[0]);
                }
                if (deposit) {
                    $("#mm").menu("enableItem", $('#div_deposit')[0]);
                    $("#mm").menu("enableItem", $('#div_turndeposit')[0]);
                } else {
                    $("#mm").menu("disableItem", $('#div_deposit')[0]);
                    $("#mm").menu("disableItem", $('#div_turndeposit')[0]);
                }
                if (colck) {
                    $("#mm").menu("enableItem", $('#div_transfer')[0]);
                }
                $("#mm").menu("enableItem", $('#div_turnbook')[0]);
                if (cleans) {
                    $("#mm").menu("enableItem", $('#div_linenchange')[0]);
                } else {
                    $("#mm").menu("disableItem", $('#div_linenchange')[0]);
                }
                break;
            case "2": //打扫
                lockmenu1(true, lftag);
                if (allowDirtyRoomValue != "1") {
                    $("#mm").menu("disableItem", $('#div_open')[0]);
                }
                else {
                    $("#mm").menu("enableItem", $('#div_open')[0]);
                }
                $('#div_open div').html('开房');
                $("#mm").menu("disableItem", $('#div_multi')[0]);
                $("#mm").menu("enableItem", $('#div_blank')[0]);
                $("#mm").menu("enableItem", $('#div_making')[0]);
                $("#mm").menu("enableItem", $('#div_batch')[0]);
                $("#mm").menu("disableItem", $('#div_waitclear')[0]);
                $("#mm").menu("disableItem", $('#div_torz')[0]);
                $("#mm").menu("disableItem", $('#div_cancelyt')[0]);
                $("#mm").menu("disableItem", $('#div_reserve')[0]);
                $("#mm").menu("disableItem", $('#div_cleans')[0]);
                $("#mm").menu("disableItem", $('#div_cleansout')[0]);
                $("#mm").menu("disableItem", $('#div_deposit')[0]);
                $("#mm").menu("disableItem", $('#div_partbill')[0]);
                $("#mm").menu("enableItem", $('#div_book')[0]);
                $("#mm").menu("disableItem", $('#div_turndeposit')[0]);
                $("#mm").menu("disableItem", $('#div_turnbook')[0]);
                //$("#mm").menu("disableItem", $('#div_black')[0]);20161012  右键优化
                $("#mm").menu("disableItem", $('#div_wakeup')[0]);
                $("#mm").menu("disableItem", $('#div_leaseitem')[0]);
                $("#mm").menu("enableItem", $('#div_linenchange')[0]);
                $("#mm").menu("disableItem", $('#div_book_enter')[0]);
                $("#mm").menu("disableItem", $('#div_revoke_occupancy')[0]);
                $("#mm").menu("disableItem", $('#div_print_checkin')[0]);
                $("#mm").menu("disableItem", $('#div_print_continue')[0]);
                //脏房不能发卡
                //$("#mm").menu("disableItem", $('#div_doorcard')[0]);
                //$("#mm").menu("disableItem", $('#div_doorclear')[0]);
                break;
            case "3": //维修
                lockmenu1(true, lftag);
                $("#mm").menu("disableItem", $('#div_open')[0]);
                $('#div_open div').html('开房');
                $("#mm").menu("disableItem", $('#div_multi')[0]);
                $("#mm").menu("enableItem", $('#div_blank')[0]);
                $("#mm").menu("enableItem", $('#div_batch')[0]);
                $("#mm").menu("disableItem", $('#div_making')[0]);
                $("#mm").menu("enableItem", $('#div_waitclear')[0]);
                $("#mm").menu("disableItem", $('#div_torz')[0]);
                $("#mm").menu("enableItem", $('#div_cancelyt')[0]);
                $("#mm").menu("disableItem", $('#div_reserve')[0]);
                $("#mm").menu("disableItem", $('#div_cleans')[0]);
                $("#mm").menu("disableItem", $('#div_cleansout')[0]);
                $("#mm").menu("disableItem", $('#div_deposit')[0]);
                $("#mm").menu("disableItem", $('#div_turndeposit')[0]);
                $("#mm").menu("disableItem", $('#div_turnbook')[0]);
                $("#mm").menu("disableItem", $('#div_partbill')[0]);
                $("#mm").menu("disableItem", $('#div_book')[0]);
                //$("#mm").menu("disableItem", $('#div_black')[0]);20161012  右键优化
                $("#mm").menu("disableItem", $('#div_wakeup')[0]);
                $("#mm").menu("disableItem", $('#div_leaseitem')[0]);
                $("#mm").menu("disableItem", $('#div_linenchange')[0]);
                $("#mm").menu("disableItem", $('#div_book_enter')[0]);
                $("#mm").menu("disableItem", $('#div_revoke_occupancy')[0]);
                $("#mm").menu("disableItem", $('#div_print_checkin')[0]);
                $("#mm").menu("disableItem", $('#div_print_continue')[0]);
                //维修房不能发卡
                //$("#mm").menu("disableItem", $('#div_doorcard')[0]);
                //$("#mm").menu("disableItem", $('#div_doorclear')[0]);
                break;
            case "4": //预订
                lockmenu1(true, lftag);
                $("#mm").menu("disableItem", $('#div_open')[0]);
                $('#div_open div').html('开房');
                $("#mm").menu("disableItem", $('#div_multi')[0]);
                if (bookid != undefined && bookid != "" && bookid != null) {
                    $("#mm").menu("disableItem", $('#div_blank')[0]);  //空房             
                    $("#mm").menu("disableItem", $('#div_waitclear')[0]); //打扫
                    $("#mm").menu("disableItem", $('#div_making')[0]); //维修
                } else {
                    $("#mm").menu("enableItem", $('#div_blank')[0]);  //空房             
                    $("#mm").menu("enableItem", $('#div_waitclear')[0]); //打扫
                    $("#mm").menu("enableItem", $('#div_making')[0]); //维修
                }
                $("#mm").menu("disableItem", $('#div_batch')[0]);
                $("#mm").menu("disableItem", $('#div_reserve')[0]);
                $("#mm").menu("disableItem", $('#div_torz')[0]);
                $("#mm").menu("disableItem", $('#div_cancelyt')[0]);
                if (clecanstatus == "1") {
                    $("#mm").menu("disableItem", $('#div_blank')[0]);  //空房     
                    $("#mm").menu("disableItem", $('#div_cleans')[0]);
                    $("#mm").menu("enableItem", $('#div_cleansout')[0]);
                } else {
                    $("#mm").menu("enableItem", $('#div_cleans')[0]);
                    $("#mm").menu("disableItem", $('#div_cleansout')[0]);
                }
                $("#mm").menu("disableItem", $('#div_deposit')[0]);
                $("#mm").menu("disableItem", $('#div_turndeposit')[0]);
                $("#mm").menu("disableItem", $('#div_turnbook')[0]);
                $("#mm").menu("disableItem", $('#div_partbill')[0]);
                $("#mm").menu("disableItem", $('#div_book')[0]);
                //$("#mm").menu("disableItem", $('#div_black')[0]);20161012  右键优化
                $("#mm").menu("disableItem", $('#div_wakeup')[0]);
                $("#mm").menu("disableItem", $('#div_leaseitem')[0]);
                $("#mm").menu("disableItem", $('#div_linenchange')[0]);
                $("#mm").menu("enableItem", $('#div_book_enter')[0]);
                $("#mm").menu("disableItem", $('#div_revoke_occupancy')[0]);
                $("#mm").menu("disableItem", $('#div_print_checkin')[0]);
                $("#mm").menu("disableItem", $('#div_print_continue')[0]);
                if ($("#" + divid + " div.name").html() == "" || $("#" + divid + " div.name").html() == undefined)
                    $("#mm").menu("disableItem", $('#div_book_enter')[0]);
                break;
        }
    };

    ///lftag:联房标志 false:为单房 true:联房
    var lockmenu1 = function (tag, lftag) {
        var method = "disableItem";
        if (!tag) { method = "enableItem"; }
        $("#mm").menu(method, $('#div_consume')[0]);
        //$("#mm").menu(method, $('#div_member')[0]);20161012 右键功能优化
        $("#mm").menu(method, $('#div_change')[0]);
        $("#mm").menu(method, $('#div_book')[0]);
        $("#mm").menu(method, $('#div_adjust')[0]);
        $("#mm").menu(method, $('#div_out')[0]);
        $("#mm").menu(method, $('#div_editcustomer')[0]);
        $("#mm").menu(method, $('#div_feeadd')[0]);
        $("#mm").menu(method, $('#div_groupnoedit')[0]);
        $("#mm").menu(method, $('#div_addroom')[0]);
        $("#mm").menu(method, $('#div_transfer')[0]);
    }

    ///定位房号
    var findroom = function (e) {
        var fh = $("#txtFH").val();
        var rooms = $("#div_rooms").children().children();
        var isfind = false;
        for (var i = 0; i < rooms.length; i++) {
            if ($(rooms[i]).attr("name") == "div_" + fh) {
                var node = rooms[i].children[0];
                isfind = true;
                if ($(rooms[i]).attr("id") != curid) {
                    if (curid != "") { $("#" + curid).removeClass("select"); }
                    $("#" + $(rooms[i]).attr("id")).addClass("select")
                    curid = $(rooms[i]).attr("id");
                    setselvisible(curid);
                }
                $("#txtFH").val("");
                roomdblclick(curid);
                return;
            }
        }
        $("#txtFH").val("");
        if (!isfind) { alert("没有找到指定的房间!"); }
    };

    //滚动条控制
    var setselvisible = function (divid) {
        var showheight = $('#div_rooms').height();           //显示区域高度
        var scrolltop = $("#div_rooms").scrollTop();          //滚动条高度
        var divtop = $("#" + divid).offset().top;       //当前结点高度
        if (divtop < 0)        //向上滚动
        {
            $("#div_rooms").scrollTop(divtop + scrolltop - $('#' + divid).height());
        }
        var divbut = divtop + $('#' + divid).height();
        if (divbut > showheight)     //向下滚动
        {
            $("#div_rooms").scrollTop(scrolltop + (divbut - showheight));
        }
    };

    //局部刷新
    var autoupdate = function () {
        if (stop) { return; }
        if (updating) { return; }
        updating = true;
        updateroomstate("");
    };

    $("#btnStateUpdate").click(function () {
        autoupdate();
    });

    //开始自动更新
    var startupdate = function () {
        //$("#div_rooms").everyTime("4s", "a", autoupdate, 0, true);
    };
    ///获取所有房间状态
    var updateroomstate = function (roomid) {
        var rooms = new Array();
        var pars = new Array();
        var id = "";
        try {
            if (roomid == "") {
                rooms = $("#div_rooms div.divroom");
            } else {
                rooms.push($("#div_" + roomid));
            }
            for (var i = 0; i < rooms.length; i++) {
                id = $(rooms[i]).attr("id")
                id = id.substring(4, id.length);
                pars.push({ name: id, value: $("#div_" + id.toString() + " div").attr("keystr") });
            }
            pars.push({ name: "floorid", value: fid });
            pars.push({ name: "fhkey", value: fhkey });
            pars.push({ name: "roomtype", value: qroomtype });
            pars.push({ name: "roomstate", value: qroomstate });
            pars.push({ name: "lastupdate", value: lastupdate });
        } catch (e) {
            return;
        }

        var url = "/Services/BasicService.aspx";
        var method = "GetUpdateHtml";
        postRequest(url, pars, "RoomStateUsl", method, false, function (data) {
            if (!stop) {
                if (data.State.Success) {
                    if (data.Data.tag == "1") {
                        updateroom(data.Data.rooms);
                        setstate(data.Data.datacol);
                        lastupdate = data.Data.datestr;
                    }
                }
            }
            updating = false;
        }, function () { updating = false; }, function () { updating = false; });
    };

    //更新房间
    var updateroom = function (datas) {
        var node = null;
        for (var i = 0; i < datas.length; i++) {
            node = $("#div_" + datas[i].key);
            if (node.length <= 0) {
                $("#div_rooms").append(datas[i].value);
            } else {
                if (datas[i].value == 'remove') {
                    node.remove();
                } else {
                    $("#div_" + datas[i].key).html(datas[i].value);
                    var zt = $("#div_" + datas[i].key).find(".divs").attr("zt");
                    var color = $.cookie('color_cookie_' + zt);
                    if (color != null) {
                        switch (zt) {
                            case "0":
                                $("#div_" + datas[i].key).find(".divs").removeClass("blue");
                                break;
                            case "1":
                                $("#div_" + datas[i].key).find(".divs").removeClass("red");
                                break;
                            case "2":
                                $("#div_" + datas[i].key).find(".divs").removeClass("gray");
                                break;
                            case "3":
                                $("#div_" + datas[i].key).find(".divs").removeClass("black");
                                break;
                            case "4":
                                $("#div_" + datas[i].key).find(".divs").removeClass("purple");
                                break;
                        }
                        $("#div_" + datas[i].key).find(".divs").css("background-color", color);
                    }
                }
            }
        }
    };

    //窗体关闭时触发
    var closeform = function () {
        $("#div_rooms").stopTime("a");
    };

    ///菜单点击
    var menuclick = function (item) {
    	var orderno = $("#" + curid + " div").attr("orderno");
        var roomid = curid.substring(4, curid.length);
        var id = item.id;
        switch (id) {
            case "div_open":                   //开房
                openroom();
                break;
            case "div_team_open":              //团队开房
                openteamroom();
                break;
            case "div_out":                    //退房
                backroom(1);
                break;
            case "div_blank":                  //置空房
                setroomstate(roomid, 0);
                break;
            case "div_waitclear":              //待打扫
                setroomstate(roomid, 2);
                break;
            case "div_reserve":                //预留
                setroomstate(roomid, 4);
                break;
            case "div_making":                 //维修    
                setroomstate(roomid, 3);
                break;
            case "div_batch":                  //批量修改    
                setroomstate(roomid, 5);
                break;
            case "div_transfer":               //续住
                opentransferpage();
                break;
            case "div_editcustomer":           //修改客人信息
                editcustomer();
                break;
            case "div_feeadd":                 //费用入账
                feeadd();
                break;
            case "div_doorcard":               //门锁发卡
                doorcard();
                break;
            case "div_doorclear":              //门锁清卡
                doorclear();
                break;
            case "div_groupnoedit":            //修改主账房号
                groupnoedit();
                break;
            case "div_consume":                //商品入帐
                openconsumepage();
                break;
            case "div_change":                 //换房
                openchangepage();
                break;
            case "div_adjust":                 //房价调整
                openadjustpage();
                break;
            case "div_deposit":                //退押金
                backdeposit();
                break;
            case "div_turndeposit":            //转押金
                backturndeposit();
                break;
            case "div_turnbook":               //转账
                backturnbook();
                break;
            case "div_member":                 //转为会员
                changebeconmemember();
                break;
            case "div_cleans":                 //请即打扫
                changecleanspage();
                break;
            case "div_cleansout":              //打扫完毕
                changecleansoutpage();
                break;
            case "div_partbill":               //部分结账
                openpartbillpage();
                break;
            case "div_book":                   //预订
                backbook();
                break;
            case "div_black":                  //一键转黑名单
                backblack();
                break;
            case "div_wakeup":                 //添加叫醒
                wakeupadd();
                break;
            case "div_leaseitem":              //租借物品
                leaseitemadd();
                break;
            case "div_linenchange":            //布草换洗
                backlinenchange();
                break;
            case "div_book_enter":             //预定转入住
                bookenter();
                break;
            case "div_revoke_occupancy":            //撤销入住
                revokeOccupancy();
                break;
        	case "div_print_checkin":            //补打入住单
        		printCheckin(orderno);
        		break;
        	case "div_print_continue":            //补打续住单
        		printContinue(orderno);
        		break;
        }
    };

    //联房开房
    var multiroom = function () {
        var roomid = curid.substring(4, curid.length);
        var fh = getfhbydivid(curid);
        showWindowDialog({ url: "/RZXX/MultiRZXXPage" + "?&id=" + rzid + "&r=" + Math.random(), width: "700px", height: "600px" });

    };

    //团队开房
    var openteamroom = function () {
        top.openTab('/team/TeamRoom.html', '团队开房', true);
    };

    //单间开房
    var openroom = function () {
        var roomid = curid.substring(4, curid.length);
        var fh = getfhbydivid(curid);
        var hasBusinessReport = $("#BusinessReport").val();
        openWin('OrderAdd.html?id=' + roomid + "&no=" + escape(fh) + "&hasBusinessReport=" + hasBusinessReport + "&r=" + Math.random(), 900, 550);
    };
    //预订转入住
    var bookenter = function () {
        var bookid = $("#" + curid + " div.name").attr("data-bookid");
        var roomid = curid.substring(4, curid.length);
        var fh = getfhbydivid(curid);
        var hasBusinessReport = $("#BusinessReport").val();
        openWin('/FrontOp/OrderAdd.html?bookid=' + bookid + "&id=" + roomid + "&no=" + escape(fh) + "&hasBusinessReport=" + hasBusinessReport+ "&r=" + Math.random(), 900, 550);
    };

    //撤销入住
    var revokeOccupancy = function () {
        $("#mm").hide();
        $(".menu-shadow").hide();
        var haveshop = 0;
        var rzid = $("#" + curid + " div").attr("rzid");
        var res = postSynRequest("/services/basicservice.aspx", { rzid: rzid }, "RZXX", "IsHaveShopRecord");
        if (!res.State.Success)
        {
            alert(res.State.Des)
            return false;
        }
        if (res.Data == 1) {
            haveshop = 1;
            if (!confirm("当前入住单中存在商品信息，是否需要继续撤销入住？")) {
                return false;
            }
        }
        else {
            if (!confirm("是否需要撤销入住？")) {
                return false;
            }
        }
       // else {
            var data = postSynRequest("/services/basicservice.aspx", {
                rzid: rzid, CardNo: $("#" + curid + " div").attr("data-membercardno"),
                votherpath: "/OtherPath/CXRZ.html", haveshop: haveshop
            }, "RZXX", "RevokeOccupancy");
            if (data.State.Success) {
                //判断浏览器处理户籍上传
                try {
                    var userAgent = window.navigator.userAgent.toLowerCase();
                    if (userAgent == "jchotelclient") {
                        top.hujiUploadBatch(data.Data.List);
                    }
                }
                catch (e) { }
                //stop = false;
                updating = false;
                autoupdate();
                alert("撤销入住成功！");                
            } else {
                alert(data.State.Des)
            }
           
        //}
    }

    //退房
    var backroom = function (kind) {
        var orderid = $("#" + curid + " div").attr("rzid");
        var roomid = curid.substring(4, curid.length);
        var fh = getfhbydivid(curid);
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/Bill.html?fh=' + escape(fh) + '&id=' + orderid + "&r=" + Math.random(), 920, 610);
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html();
            chooseOrder(orderid, orderno, customers, '结账', function (id) {
                openWin('/FrontOp/Bill.html?fh=' + escape(fh) + '&id=' + id + "&r=" + Math.random(), 920, 610);
            });
        }
    };

    ///查换房间
    var queryroom = function (e) {
        //stop = true;
        var floorid = $("#selFloor").val();
        var roomtype = $("#selRoomType").val();
        var roomstate = $("#selZT").val();
        var key = $("#txtKey").val();

        var rooms = $("#div_rooms").children().children();
        var isfind = false;
        for (var i = 0; i < rooms.length; i++) {
            if ($(rooms[i]).attr("name") == "div_" + key) {
                var node = rooms[i].children[0];
                isfind = true;
                if ($(rooms[i]).attr("id") != curid) {
                    if (curid != "") {
                        $("#" + curid).removeClass("select");
                    }
                    $("#" + $(rooms[i]).attr("id")).addClass("select")
                    curid = $(rooms[i]).attr("id");
                    setselvisible(curid);
                }
                var state = $("#" + curid + " div").attr("zt");
                switch (e.keyCode) {
                    case 111:                   //商品入账：快捷键 /
                        if (state == "1") {
                            openconsumepage()
                        } else
                            alert("该房尚未入住,无法操作商品入账!");
                        break;
                    case 106:                   //续    住：快捷键 *
                        if (state == "1") {
                            opentransferpage()
                        } else
                            alert("该房尚未入住,无法操作续住!");
                        break;
                    case 109:                   //房价调整：快捷键 -
                        if (state == "1") {
                            if ($("#" + curid + " em").hasClass("co")) {
                                var reProunit = postSynRequest("/services/basicservice.aspx", { rzid: curid.substr(curid.indexOf("_") + 1) }, "RZXX", "CheckYS");
                                if (reProunit.State.Success) {
                                    alert("已经过夜审，不能进行房价调整");
                                } else
                                    openadjustpage();
                            } else
                                openadjustpage()
                        } else
                            alert("该房尚未入住,无法操作房价调整!");
                        break;
                    case 107:                    //门锁发卡：快捷键 +
                        if (state != "1" && IsCardRoom != "1")
                            alert("该房尚未入住,无法操作门锁发卡!");
                        else
                            doorcard();
                        break;
                    default: roomdblclick(curid); break;
                }
            }
        }
        if (!isfind) {
            $("#div_rooms .divroom").hide();
            $("#div_rooms .divroom").each(function () {
                var zt = $(this).find(".divs").attr("zt");
                var roomno = $(this).find(".divs").attr("data-roomno");
                var roomtypeid = $(this).find(".divs").attr("data-roomtypeid");
                var membercardno = $(this).find(".divs").attr("data-membercardno");
                var name = $(this).find(".divs").attr("data-name");
                var floor = $(this).find(".divs").attr("data-floorid");
                var cardno = $(this).find(".divs").attr("data-cardno");
                var lockcode = $(this).find(".divs").attr("data-lockcode");
                var isShow = true;
                if (roomstate != "" && zt != roomstate) {  //房态
                    isShow = false;
                }
                if (roomtype != "" && roomtypeid != roomtype) { //房型
                    isShow = false;
                }
                if (floorid != "" && floor != floorid) {  //楼层
                    isShow = false;
                }
                if (key != "" && (name.indexOf(key) < 0 && membercardno.indexOf(key) < 0 && cardno.indexOf(key) < 0 && lockcode.indexOf(key) < 0)) {  //入住姓名或卡号
                    isShow = false;
                }
                if (isShow) $(this).show();
            });
        } else {
            $("#div_rooms .divroom").show();
        }
        $("#txtKey").val("");

        //刷新底部菜单统计        

        postRequest("/Services/BasicService.aspx", { floorid: floorid, roomtype: roomtype, roomstate: roomstate, key: key }, "RoomStateUsl", "GetRoomStateCol", false, function (data) {
            if (data.State.Success) {
                setstate(data.Data.datacol);
            }
        });
    }


    ///增加事件
    var attachEvent = function () {
        $("#btnQuery").click(function (e) {
            queryroom(e);
        });
        $("#txtKey").keydown(function (e) {
            cancelEvent(e);
            if (e.keyCode == 13 || e.keyCode == 111 || e.keyCode == 106 || e.keyCode == 109 || e.keyCode == 107) { queryroom(e); }
        });
        $("#txtKey").keyup(function (e) {
            cancelEvent(e);
            if (e.keyCode == 13 || e.keyCode == 111 || e.keyCode == 106 || e.keyCode == 109 || e.keyCode == 107) { $("#txtKey").val(""); }
        });
        $("#btnQueryKey").click(function (e) { queryroom(e); });
        $("#selFloor").change(queryroom);
        $("#selRoomType").change(queryroom);
        $("#selZT").change(queryroom);
        window.onunload = closeform;
        $('#mm').menu({ onClick: menuclick });
        window.onresize = adjustsize;
    };

    //查询宾客信息
    $("#btnCustomer").click(function () {
        $.cookie('reporttselect', 'customerQuery.aspx', { path: '/Report' });
        top.openTab('/Report/Index.html', '报表', true);
    });
    //打印房态图
    $("#btnPrint").click(function () {
        openWin("/FrontOp/RoomStatePrint.html?r=" + Math.random(), 950, 500);
    });
    ///修改主账房号
    var groupnoedit = function () {
        var orderid = $("#" + curid + " div").attr("rzid");
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/GroupNoEdit.html?id=' + orderid + "&r=" + Math.random(), 412, 300);
        }
        else {//拼房先选择入住单
            alert("该房间有拼房，不能再和其他房间联房");
        }
    };
    ///打开门锁发卡页面
    var doorcard = function () {
        var orderid = $("#" + curid + " div").attr("rzid");
        var roomId = curid.substring(4);
        if (orderid == "") {
            openWin('/FrontOp/DoorCard.html?roomId=' + roomId + "&r=" + Math.random(), 420, 200, "paymentwin");
        } else {
            if (orderid.indexOf(",") < 0) {
                openWin('/FrontOp/DoorCard.html?id=' + orderid + "&r=" + Math.random(), 412, 250, "paymentwin");
            }
            else {//拼房先选择入住单
                var orderno = $("#" + curid + " div").attr("orderno");
                var customers = $("#" + curid + " div .name").html()
                chooseOrder(orderid, orderno, customers, '门锁发卡', function (id) {
                    openWin('/FrontOp/DoorCard.html?id=' + id + "&r=" + Math.random(), 412, 250, "paymentwin");
                });
            }
        }
    };
    ///打开门锁清卡页面
    var doorclear = function () {
        var roomId = curid.substring(4);
        var orderid = $("#" + curid + " div").attr("rzid");
        openWin('/FrontOp/DoorClear.html?roomId=' + roomId + "&id=" + orderid + "&r=" + Math.random(), 412, 200, "paymentwin");

    }

    ///打开修改客人信息页面
    var editcustomer = function () {
        var orderid = $("#" + curid + " div").attr("rzid");
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/OrderEdit.html?id=' + orderid + "&r=" + Math.random(), 920, 500);
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '修改客人信息', function (id) {
                openWin('/FrontOp/OrderEdit.html?id=' + id + "&r=" + Math.random(), 920, 500);
            });
        }
    };
    ///打开费用入账页面
    var feeadd = function () {
        var orderid = $("#" + curid + " div").attr("rzid");
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/FeeAdd.html?id=' + orderid + "&r=" + Math.random(), 862, 250, 'pwin2');
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '费用入账', function (id) {
                openWin('/FrontOp/FeeAdd.html?id=' + id + "&r=" + Math.random(), 862, 250, 'pwin2');
            });
        }
    };
    ///打开商品入帐页面
    var openconsumepage = function () {
        var orderid = $("#" + curid + " div").attr("rzid");
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/ProductFeeAdd.html?id=' + orderid + "&r=" + Math.random(), 890, 550, 'pwin2');
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '商品入帐', function (id) {
                openWin('/FrontOp/ProductFeeAdd.html?id=' + id + "&r=" + Math.random(), 890, 550, 'pwin2');
            });
        }
    };
    ///打开换房页面
    var openchangepage = function () {
        var orderid = $("#" + curid + " div").attr("rzid");
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/ChangeRoom.html?id=' + orderid + "&r=" + Math.random(), 905, 400);
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '换房', function (id) {
                openWin('/FrontOp/ChangeRoom.html?id=' + id + "&r=" + Math.random(), 905, 400);
            });
        }
    };
    ///打开房价调整页面
    var openadjustpage = function () {
        var orderid = $("#" + curid + " div").attr("rzid");
        var prounit = $("#" + curid + " em").hasClass("co");//协议单位处理
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/AdjustPrice.html?id=' + orderid + "&r=" + Math.random(), 880, 350);
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '房价调整', function (id) {
                if (prounit) {
                    var reProunit = postSynRequest("/services/basicservice.aspx", { rzid: id }, "RZXX", "CheckYS");
                    if (!reProunit.State.Success) {
                        openWin('/FrontOp/AdjustPrice.html?id=' + id + "&r=" + Math.random(), 862, 310);
                    } else {
                        alert("过完夜审后不允许修改协议单位!");
                    }
                } else {
                    openWin('/FrontOp/AdjustPrice.html?id=' + id + "&r=" + Math.random(), 862, 310);
                }
            });
        }
    };
    ///续住页面
    var opentransferpage = function () {
        var orderid = $("#" + curid + " div").attr("rzid");
        if (orderid.indexOf(",") < 0) {
            if (!checkIsAliBook(orderid)) {
                openWin('/FrontOp/ContinuedLive.html?id=' + orderid + "&r=" + Math.random(), 862, 320);
            } else {
                alert("阿里旅行的订单，不允许续住！");
            }
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '续住', function (id) {
                if (!checkIsAliBook(id)) {
                    openWin('/FrontOp/ContinuedLive.html?id=' + id + "&r=" + Math.random(), 862, 320);
                } else {
                    alert("阿里旅行的订单，不允许续住！");
                }
            });
        }
    };
    ///退押金页面
    var backdeposit = function () {
        var orderid = $("#" + curid + " div").attr("rzid");
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/BackDeposit.html?id=' + orderid + "&isst=t&r=" + Math.random(), 862, 280, "pwin2");
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '退押金', function (id) {
                openWin('/FrontOp/BackDeposit.html?id=' + id + "&isst=t&r=" + Math.random(), 862, 280, "pwin2");
            });
        }
    };

    ////转押金
    var backturndeposit = function () {
        var orderid = $("#" + curid + " div").attr("rzid");
        var fh = getfhbydivid(curid);
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/BackTurnDeposit.html?id=' + orderid + "&r=" + Math.random(), 870, 570);
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '转押金', function (id) {
                openWin('/FrontOp/BackTurnDeposit.html?id=' + id + "&r=" + Math.random(), 870, 570);
            });
        }

    };

    ////转账
    var backturnbook = function () {
        var orderid = $("#" + curid + " div").attr("rzid");
        var fh = getfhbydivid(curid);
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/BackTurnBook.html?id=' + orderid + "&r=" + Math.random(), 870, 550);
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '转账', function (id) {
                openWin('/FrontOp/BackTurnBook.html?id=' + id + "&r=" + Math.random(), 870, 550);
            });
        }
    };
    ////部分结账
    var openpartbillpage = function () {
        var fh = getfhbydivid(curid);
        var orderid = $("#" + curid + " div").attr("rzid");
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/PartBill.html?fh=' + escape(fh) + '&id=' + orderid + "&r=" + Math.random(), 920, 550, 'pwin2');
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '部分结账', function (id) {
                openWin('/FrontOp/PartBill.html?fh=' + escape(fh) + '&id=' + id + "&r=" + Math.random(), 920, 550, 'pwin2');
            });
        }
    }
    ///一键转黑名单
    var backblack = function () {
        var fh = getfhbydivid(curid);
        var orderid = $("#" + curid + " div").attr("rzid");
        if (orderid.indexOf(",") < 0) {
            openWin('/Set/BlacklistAdd.html?fh=' + escape(fh) + '&orderid=' + orderid + "&r=" + Math.random(), 730, 310);
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '一键转黑名单', function (id) {
                openWin('/Set/BlacklistAdd.html?fh=' + escape(fh) + '&orderid=' + id + "&r=" + Math.random(), 730, 310);
            });
        }
    }

    //添加叫醒
    var wakeupadd = function () {
        var fh = getfhbydivid(curid);
        var orderid = $("#" + curid + " div").attr("rzid");
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/WakeUpAdd.html?fh=' + fh + '&orderid=' + orderid + "&r=" + Math.random(), 530, 310);
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '添加叫醒', function (id) {
                openWin('/FrontOp/WakeUpAdd.html?fh=' + escape(fh) + '&orderid=' + id + "&r=" + Math.random(), 530, 310);
            });
        }
    }
    //租借物品
    var leaseitemadd = function () {
        var fh = getfhbydivid(curid);
        var orderid = $("#" + curid + " div").attr("rzid");
        if (orderid.indexOf(",") < 0) {
            openWin('/FrontOp/LeaseItem.html?fh=' + fh + '&orderid=' + orderid + "&r=" + Math.random(), 720, 310, "pwin2");
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '租借物品', function (id) {
                openWin('/FrontOp/LeaseItem.html?fh=' + escape(fh) + '&orderid=' + id + "&r=" + Math.random(), 720, 310, "pwin2");
            });
        }
    }

    ///预订
    var backbook = function () {
        var roomid = curid.substring(4, curid.length);
        var roomtypeid = $("#" + curid + " div").attr("data-roomtypeid");
        var fh = getfhbydivid(curid);
        openWin('/Book/BookAdd.html?roomid=' + roomid + "&roomtypeid=" + roomtypeid + "&fh=" + escape(fh) + "&r=" + Math.random(), 900, 450);
    }

    //转为会员
    var changebeconmemember = function () {
        var orderid = $("#" + curid + " div").attr("rzid");
        var clock = $("#" + curid + " em").hasClass("clock");
        var isclock = "1";
        if (clock) {
            isclock = "0";
        }
        if (orderid.indexOf(",") < 0) {
            if (PmsVersion == "1") {
                var s = encodeURIComponent('/Member/MemberOpenCard.html?id=0&type=0&orderid=' + orderid + '&isclock=' + isclock + '&r=' + Math.random());
                openWin('../../memberrequest.aspx?ParamData=' + s, 730, 470);
            } else {
                openWin('/Member/vip_membercard.html?id=0&type=0&orderid=' + orderid + '&isclock=' + isclock + '&r=' + Math.random(), 620, 470);
            }
        }
        else {//拼房先选择入住单
            var orderno = $("#" + curid + " div").attr("orderno");
            var customers = $("#" + curid + " div .name").html()
            chooseOrder(orderid, orderno, customers, '转为会员', function (id) {
                if (PmsVersion == "1") {
                    var s = encodeURIComponent('/Member/MemberOpenCard.html?id=0&type=0&orderid=' + id + '&isclock=' + isclock + '&r=' + Math.random());
                    openWin('../../memberrequest.aspx?ParamData=' + s, 730, 470);
                } else {
                    openWin('/Member/vip_membercard.html?id=0&type=0&orderid=' + id + '&isclock=' + isclock + '&r=' + Math.random(), 620, 470);
                }
            });
        }
    }

    //请即打扫
    var changecleanspage = function () {
        var roomid = curid.substring(4, curid.length);
        var fh = getfhbydivid(curid);
        postRequest("/services/basicservice.aspx", { roomid: roomid, fh: fh, status: 1, votherpath: "/OtherPath/XGFT.html" }, "RZXX", "UpdateRoomClecanStatus", false, function (data) {
            if (data.State.Success) {
                alert("更新成功!");
            } else {
                alert(data.State.Errkey);
            }
        });
    }

    //打扫完毕
    var changecleansoutpage = function () {
        debugger;
        var roomid = curid.substring(4, curid.length);
        var fh = getfhbydivid(curid);
        var IsClean = $("#IsClean").val();
        var CleaningModule = $("#CleaningModule").val();
        if (IsClean == "1" && CleaningModule=="false") {
            openWin('/FrontOp/CleanRecord.html?id=' + roomid + "&type=zzf&r=" + Math.random(), 450, 260);
        } else {
            postRequest("/services/basicservice.aspx", { roomid: roomid, fh: fh, status: 0, votherpath: "/OtherPath/XGFT.html" }, "RZXX", "UpdateRoomClecanStatus", false, function (data) {
                if (data.State.Success) {
                    alert("更新成功!");
                } else {
                    alert(data.State.Errkey);
                }
            });
        }
    }

    ///布草换洗
    var backlinenchange = function () {
        var roomid = curid.substring(4, curid.length);
        var fh = getfhbydivid(curid);
        openWin('/FrontOp/LinenChange.html?id=' + roomid + "&r=" + Math.random(), 450, 260);
    }

    ///设置状态  批量修改
    var setroomstate = function (id, zt) {
        if (zt == "5") {
            openWin('/FrontOp/BatchEdit.html?id=' + id + "&zt=" + zt + "&r=" + Math.random(), 302, 300);
        } else if (zt == "3") {
            openWin('/FrontOp/RoomService.html?id=' + id + "&r=" + Math.random(), 450, 200);
        } else if (zt == "4") {
            openWin('/FrontOp/RoomReserve.html?id=' + id + "&r=" + Math.random(), 450, 200);
        } else {
            var state = $("#div_" + id + " div").attr("zt");
            var IsClean = $("#IsClean").val();
            if (zt == "0" && state == "3") {
                openWin('/FrontOp/VacantRoom.html?id=' + id + "&r=" + Math.random(), 450, 200);
            } else if (zt == "0" && state == "2") {
                if (IsClean == "1" && $("#CleaningModule").val()=="false") {
                    openWin('/FrontOp/CleanRecord.html?id=' + id + "&type=zf&r=" + Math.random(), 450, 260);
                } else {
                    postRequest("/services/basicservice.aspx", { id: id, zt: zt, votherpath: "/OtherPath/XGFT.html" }, "RZXX", "UpdateRoomStatus", false, function (data) {
                        if (data.State.Success) {
                            alert("更新成功!");
                        } else {
                            alert(data.State.Errkey);
                        }
                    });
                }
            } else {
                postRequest("/services/basicservice.aspx", { id: id, zt: zt, votherpath: "/OtherPath/XGFT.html" }, "RZXX", "UpdateRoomStatus", false, function (data) {
                    if (data.State.Success) {
                        alert("更新成功!");
                    } else {
                        alert(data.State.Errkey);
                    }
                });
            }
        }
    };

    ///初始化数据
    var initialdata = function () {
        var url = "/Services/BasicService.aspx";
        var method = "GetPageData";
        postRequest(url, {}, "RoomStateUsl", method, false, function (data) {
            if (!data.State.Success) {
                alert(data.State.Des);                       //不正确的
                return;
            }
            loadHTML(data.Data.htmltext);
            $("#IsClean").val(data.Data.IsClean);
            $("#CleaningModule").val(data.Data.CleaningModule);
            $("#BusinessReport").val(data.Data.BusinessReport);
            IsCardRoom = data.Data.IsCardRoom;
            lastupdate = data.Data.datestr;            

            allowDirtyRoomValue = data.Data.allowDirtyRoom;
            PmsVersion = data.Data.PmsVersion;
            appendRoomIsEnable = data.Data.appendRoom;
            ControllerRoomStatePageDom(data.Data.CUser);

            loadCombo(data.Data.floors, data.Data.roomtypes);
            setstate(data.Data.datacol);
            startupdate();
            Features(data.Data.Features);
            stop = false;
            if ($.cookie('size_cookie') == "ftt_big") {
                $('.name').attr("style", "width:80px");
            } else {
                $('.name').attr("style", "");
            }
            if (data.Data.moreDay != 0)
            {
                alert("您的使用期限还剩下" + ( data.Data.moreDay) + "天，请联系客服进行开通！"); //试用过期时间 2016-07-21
            }
        });
    };

    //初始化下拉框
    var loadCombo = function (floors, roomtypes) {
        for (var i = 0; i < floors.length; i++) {
            $("#selFloor").append("<option value='" + floors[i].Id + "'>" + floors[i].Name + "</option>");
        }
        for (var i = 0; i < roomtypes.length; i++) {
            $("#selRoomType").append("<option value='" + roomtypes[i].Id + "'>" + roomtypes[i].Name + "</option>");
        }
        $("#selZT").append("<option value=''>全部</option>");
        $("#selZT").append("<option value='0'>空房</option>");
        $("#selZT").append("<option value='1'>在住</option>");
        $("#selZT").append("<option value='2'>打扫</option>");
        $("#selZT").append("<option value='3'>维修</option>");
        $("#selZT").append("<option value='4'>预订</option>");
    };

    $("#restore").click(function () {
        $.cookie('color_cookie_0', null);
        $.cookie('color_cookie_1', null);
        $.cookie('color_cookie_2', null);
        $.cookie('color_cookie_3', null);
        $.cookie('color_cookie_4', null);
        location.reload();
    });

    $("#FeaturesSelect").click(function () {
        var display = $('#FeaturesBox').css('display')
        if (display == "block") {
            $("#FeaturesSelect").removeClass("features_s");
        }
        else if (display == "none") {
            $("#FeaturesSelect").addClass("features_s");
        }
        $("#FeaturesBox").slideToggle();
    });

    //房间特征
    var Features = function (content) {
        if (content.length > 0) {
            var html = "";
            for (var i = 0; i < content.length; i++) {
                html += "<li><input type=\"checkbox\" id=\"ckbFeatures_" + content[i].Id + "\" name=\"ckbFeatures\" value=\"" + content[i].MXName + "\" /><label for=\"ckbFeatures_" + content[i].Id + "\">" + content[i].MXName + "</label></li>";
            }
            html += "<li style=\"width:100%\"><input type=\"button\"  value=\"查找\" id=\"FeaturesSearch\" onclick=\"FeaturesFilter()\" class=\"qtantj\" /></li>";
            $("#FeaturesBox").html(html);
        }
    };

    //拼房选择入住单 orderids:入住单ID ordernos:入住单号 customers:住客姓名 opttitle:操作标题 callback:回调函数
    var shooseOrderCallBack = undefined;   
    var chooseOrder = function (orderids, ordernos, customers, opttitle, callback) {
        var bednos = $("#" + curid + " div").attr("bedno");
        if (appendRoomIsEnable == "1" && bednos.split(',').length<bednos.length && bednos != undefined && bednos != "") {//判断是否显示床号
            var arrOrderIds = orderids.split(",");
            var arrOrderNos = ordernos.split(",");
            var arrCustomers = customers.split(",");
            var arrBedNos = bednos.split(",");
            if (arrOrderIds.length > 1) {
                shooseOrderCallBack = callback;
                $(".chooseopttitle").html(opttitle);
                $(".tbchooseorder tbody tr").remove();
                $(".tbchooseorder thead").html("<tr><th>姓名</th><th>单号</th><th>床号</th><th width='78'>操作</th></tr>");
                for (var i = 0; i < arrOrderIds.length; i++) {                    
                    $(".tbchooseorder tbody").append('<tr><td>' + arrCustomers[i] + '</td><td>' + arrOrderNos[i] + '</td><td>' + arrBedNos[i] + '</td><td><span class="qtantj btnchooseorderopt" data-orderid="' + arrOrderIds[i] + '">选择</span></td></tr>');
                }
                $(".ping_open").show();
            }

        } else {
            var arrOrderIds = orderids.split(",");
            var arrOrderNos = ordernos.split(",");
            var arrCustomers = customers.split(",");
            if (arrOrderIds.length > 1) {
                shooseOrderCallBack = callback;
                $(".chooseopttitle").html(opttitle);
                $(".tbchooseorder tbody tr").remove();
                $(".tbchooseorder thead").html("<tr><th>姓名</th><th>单号</th><th width='78'>操作</th></tr>");
                for (var i = 0; i < arrOrderIds.length; i++) {                    
                    $(".tbchooseorder tbody").append('<tr><td>' + arrCustomers[i] + '</td><td>' + arrOrderNos[i] + '</td><td><span class="qtantj btnchooseorderopt" data-orderid="' + arrOrderIds[i] + '">选择</span></td></tr>');
                }
                $(".ping_open").show();
            }
        }
    }
    $(".btnchooseorderopt").live("click", function () {
        var orderid = $(this).attr("data-orderid");
        if (shooseOrderCallBack != undefined) {
            shooseOrderCallBack(orderid);
        }
    });

    var pageLoad = function () {
        attachEvent();               //增加事件    
        adjustsize();                //调整窗体大小
        initialdata();               //初始化数据        
    };
    pageLoad();
    //读取门锁码   2016-08-05
    $("#btnLockCode").click(function () {
        top.DoorCardRead(function (i, sFH, sMSH) {
            var RoomNo = $.trim(sFH);
            if (RoomNo == undefined) RoomNo = "";
            postRequest("/Services/BasicService.aspx", { RoomNo: RoomNo, LockCode: sMSH }, "BillUSL", "GetRoomInfoByLockCode", false, function (data) {
                if (data.State.Success) {
                    $("#read_door_fh").html(data.Data.RoomNo);
                    if (data.Data.OrderId != null && data.Data.OrderId > 0) {//在住
                        $("#btn_Continue").show();
                        $("#btn_Bill").show();
                        $("#btn_Continue").attr("data_orderid", data.Data.OrderId);
                        $("#btn_Bill").attr("data_orderid", data.Data.OrderId)
                    } else {
                        $("#btn_Continue").hide()
                        $("#btn_Bill").hide()
                    }
                    $(".read_door").show();
                } else {
                    alert(data.State.Errkey);
                }
            });
        });
    });
    $("#btn_Continue").click(function () {
        var orderid = $(this).attr("data_orderid");
        if (orderid == "") return;
        if (!checkIsAliBook(orderid)) {
            openWin('/FrontOp/ContinuedLive.html?id=' + orderid + "&r=" + Math.random(), 862, 280);
        } else {
            alert("阿里旅行的订单，不允许续住！");
        }
    });
    $("#btn_Bill").click(function () {
        var fh = $("#read_door_fh").html()
        var orderid = $(this).attr("data_orderid");
        if (orderid == "") return;
        openWin('/FrontOp/Bill.html?fh=' + escape(fh) + '&id=' + orderid + "&r=" + Math.random(), 920, 610);
    });
});

function BtnIcon(obj, name) {
    if ($(obj).hasClass("select")) {
        $(obj).removeClass("select");
        $("#div_rooms .divroom").show();
    } else {
        $(".ftt_type span a").removeClass("select");
        $(obj).addClass("select");
        $("#div_rooms .divroom").each(function () {
            var index = $(this).find("." + name).length;
            if (index > 0) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
}

function LoadRoomByState(status) {
    $("#div_rooms .divroom").each(function () {
        var zt = $(this).find(".divs").attr("zt");
        if (zt == status) {
            $(this).hide();
        }
    });
}
function BtnStatus(obj, status) {
    var color = $.cookie('color_cookie_' + status);
    if ($(obj).hasClass("select_" + status)) {
        $(obj).removeClass("select_" + status);
        $("#div_rooms .divroom").show();
        if (color != null) {
            $(obj).css("background-color", "#fff");
        }
        var check = 0;
        if (!$("#state1").hasClass("select_0")) {
            LoadRoomByState("0");
            check++;
        }
        if (!$("#state2").hasClass("select_1")) {
            LoadRoomByState("1");
            check++;
        }
        if (!$("#state3").hasClass("select_2")) {
            LoadRoomByState("2");
            check++;
        }
        if (!$("#state4").hasClass("select_3")) {
            LoadRoomByState("3");
            check++;
        }
        if (!$("#state5").hasClass("select_4")) {
            LoadRoomByState("4");
            check++;
        }
        if (check == 5) {
            $("#div_rooms .divroom").show();
        }
    } else {
        $("#divFoot a").removeClass("select_" + status);
        $(obj).addClass("select_" + status);
        if (color != null) {
            $(obj).css("background-color", color);
        }
        $("#div_rooms .divroom").show();
        if (!$("#state1").hasClass("select_0")) {
            LoadRoomByState("0");
        }
        if (!$("#state2").hasClass("select_1")) {
            LoadRoomByState("1");
        }
        if (!$("#state3").hasClass("select_2")) {
            LoadRoomByState("2");
        }
        if (!$("#state4").hasClass("select_3")) {
            LoadRoomByState("3");
        }
        if (!$("#state5").hasClass("select_4")) {
            LoadRoomByState("4");
        }
    }

}

function keyUp() {
    if (navigator.appName == "Microsoft Internet Explorer") {
        var keycode = event.keyCode;
    } else {
        var keycode = keyUp.caller.arguments[0].which;
    }
    
    var code = parseInt(keycode);
    if ((code >= 96 && code <= 105) || (code >= 48 && code <= 57)) {
        var codes = GetCode(code);
        var fh = $("#txtKey").val();
        if (fh == "") {
            $("#txtKey").val(codes);
            $("#txtKey").focus();
        }
    }
}
function GetCode(code) {
    if (code == 96 || code == 48) {
        return "0";
    }
    if (code == 97 || code == 49) {
        return "1";
    }
    if (code == 98 || code == 50) {
        return "2";
    }
    if (code == 99 || code == 51) {
        return "3";
    }
    if (code == 100 || code == 52) {
        return "4";
    }
    if (code == 101 || code == 53) {
        return "5";
    }
    if (code == 102 || code == 54) {
        return "6";
    }
    if (code == 103 || code == 55) {
        return "7";
    }
    if (code == 104 || code == 56) {
        return "8";
    }
    if (code == 105 || code == 57) {
        return "9";
    }
}

function FeaturesFilter() {
    var array = new Array();
    var Features = "";
    var input = $("#FeaturesBox").find("input[type='checkbox']");
    for (var i = 0; i < input.length; i++) {
        if (input[i].checked) {
            array.push(input[i].defaultValue);
            Features += "," + input[i].defaultValue;
        }
    }
    $("#div_rooms .divroom").each(function () {
        if (array.length > 0) {
            $(this).hide();
            var features = $(this).find(".divs").attr("featuresval");
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

    var display = $('#FeaturesBox').css('display')
    if (display == "block") {
        $("#FeaturesSelect").removeClass("features_s");
    }
    else if (display == "none") {
        $("#FeaturesSelect").addClass("features_s");
    }
    $("#FeaturesBox").slideToggle();
       
    

    postRequest("/Services/BasicService.aspx", { Features: Features }, "RoomStateUsl", "GetRoomStateCol", false, function (data) {
        if (data.State.Success) {
            setstate(data.Data.datacol);
        }
    });
}

///设置统计信息
function setstate(data) {
    if (data != undefined) {
        var str = "<b>" + data.State1Num + "</b> 间&nbsp;&nbsp;" + data.State1Rate + "%";
        $("#state1").html(str);
        str = "<b>" + data.State2Num + "</b> 间&nbsp;&nbsp;" + data.State2Rate + "%";
        $("#state2").html(str);
        str = "<b>" + data.State3Num + "</b> 间&nbsp;&nbsp;" + data.State3Rate + "%";
        $("#state3").html(str);
        str = "<b>" + data.State4Num + "</b> 间&nbsp;&nbsp;" + data.State4Rate + "%";
        $("#state4").html(str);
        str = "<b>" + data.State5Num + "</b> 间&nbsp;&nbsp;" + data.State5Rate + "%";
        $("#state5").html(str);
    }
};

//补打续住单
function printContinue(dh)
{
	if (dh == "" || dh == undefined) { alert("请选择打印账单的入住单!"); return; }
	var result = postSynRequest("/Services/BasicService.aspx", { dh: dh }, "CustomerData", "CheckIsContinueLive");
	var pay = "";
	if (result.State.Success) {
		//pay = result.Data.Pay;
		//if (result.Data.List != null && result.Data.List.length == 1) {
		//    PrintConLiveDY(dh, pay);
		//} else {
		//    $(".tbchooseorder tbody tr").remove();
		//    for (var i = 0; i < result.Data.List.length; i++) {
		//        $(".tbchooseorder tbody").append('<tr><td width="70%">' + formatDateStr(result.Data.List[i].CreateDate, "yyyy-MM-dd hh:mm") + '</td><td width="30%"><span class="qtantj btnchooseorderopt" data-pay="' + result.Data.List[i].PayMethod + '" data-accid="' + result.Data.List[i].Id + '">选择</span></td></tr>');
		//    }
		//    $(".ping_open").show();
		//}
		//openWin("/BillInfor/ConLiveDY.html?orderno=" + dh + "&pay=" + pay, 800, 430, "pwin");

		if (result.Data.length == 1) {
			PrintConLiveDY(dh, result.Data[0].Pay, '', result.Data[0].Id);
		} else {
			$(".tbchooseorder tbody tr").remove();
			for (var i = 0; i < result.Data.length; i++) {
				$(".tbchooseorder tbody").append('<tr><td width="70%">' + formatDateStr(result.Data[i].CreateDate, "yyyy-MM-dd hh:mm") + '</td><td width="30%"><span class="qtantj btnchooseorderopt"  data-dh="' + dh + '"  data-pay="' + result.Data[i].Pay + '" data-accid="' + result.Data[i].Id + '">选择</span></td></tr>');
			}
			$(".ping_open").show();
		}
	} else {
		alert("该房间没有续住");
	}
}

//补打入住单
function printCheckin(dh)
{
	if (dh == "" || dh == undefined) { alert("请选择打印账单的入住单!"); return; }
	PrintOrderAdd(dh);
}