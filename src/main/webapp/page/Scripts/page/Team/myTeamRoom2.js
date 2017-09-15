/****************右侧栏事件*****************/
$(function () {

    setInterval("myInterval()", 1000);//1000为1秒钟
    myInterval()
    changetime()
//GetJz();
    var localObj = window.location;

    var contextPath = localObj.pathname.split("/")[0];
    var basePath = localObj.protocol + "//" + localObj.host + "/" + contextPath;

    var imgurl = basePath;

    $.ajax({
        url:'../../checkinfoController_getRoomTypes',
        type:"POST",
        dataType:"json",
        success:function (data) {
            var roomTypes = data
            $("#selRoomTypes").empty()
            for (i in roomTypes) {
                $("#selRoomTypes").append('<option value="' + roomTypes[i].roomTypeId + '" data-allowhour="false">' + roomTypes[i].roomTypeName + '</option>')
            }

            addroomCase()

            getRooms()
        }

    })



    //房型下拉框改变加载房价方案 和 房间 事件
    $("#selRoomTypes").change(function () {
        addroomCase()
        getRooms()
    })
    //房价方案点击改变 价格
    $("#selRoomPriceSchemes").change(function () {
        changePrice()
    })


    //添加按钮   添加房间到左侧
    $("#aAddRooms").click(function () {
        addRoom()
        reflushRoom()
        allprice()
    })

    //点击住客添加
    $("#btnAddCustomer").click(function () {
        var trs = $("#tbSelectedRooms tbody tr")
        if (trs.length == 0) {
            alert("请先添加房间")
            return
        }
        var option = ""
        $("#tbSelectedRooms tbody tr").each(function () {
            option += '<option value="' + $(this).attr("data-roomid") + '">' + $(this).find("td :first").text() + '</option>'
        })

        var text = "";
        text += '<tr style="display: table-row;">\n' +
            '<td width="60">\n' +
            '<select data-field="Rooms">\n' +
            option +
            '</select></td>\n' +
            '<td width="80">\n' +
            '<input type="text" data-field="CustomerName" maxlength="20" style="width: 70px"></td>\n' +
            '<td width="80">\n' +
            '<select data-field="CardTypes">\n' +
            '<option value="身份证">身份证</option>\n' +
            '<option value="驾驶证">驾驶证</option>\n' +
            '<option value="军官证">军官证</option>\n' +
            '</select></td>\n' +
            '<td width="130">\n' +
            '<input type="text" data-field="CardNo" maxlength="30" style="width: 120px"></td>\n' +
            '<td width="50">\n' +
            '<select>\n' +
            '<option value="男">男</option>\n' +
            '<option value="女">女</option>\n' +
            '</select></td>\n' +
            '<td width="90">\n' +
            '<select data-field="Ethnics" style="width: 90px">\n' +
            '<option value="汉族">汉族</option>\n' +
            '<option value="苗族">苗族</option>\n' +
            '<option value="壮族">壮族</option>\n' +
            '<option value="傣族">傣族</option>\n' +
            '</select></td>\n' +
            '<td width="90">\n' +
            '<input type="data" data-field="BirthDate" maxlength="10"></td>\n' +
            '<td>\n' +
            '<input type="text" data-field="Address" maxlength="200" style="width: 180px;"></td>\n' +
            '<td width="66">\n' +
            '<img width="9" height="9" src="' + imgurl + '/resources/page/images/010.gif" alt=""><span\n' +
            ' class="STYLE1"> [</span><a class="btnGuestDelete"\n' +
            ' href="javascript:void(0)">删除</a><span\n' +
            ' class="STYLE1">]</span></td>\n' +
            '</tr>'
        $("#tbCustomers tbody").append(text)
        var num = $("#lblCustomerCount").text()
        $("#lblCustomerCount").text(parseInt(num) + 1)


    })
    $("#tbCustomers tbody").on("click", ".btnGuestDelete", function () {
        $(this).parent().parent().remove();
        var num = $("#lblCustomerCount").text()
        $("#lblCustomerCount").text(parseInt(num) - 1)
    })

    //支付方式添加
    $("#divZF").on("click", "ul li img", function () {


        if ($(this).attr("optag") == "add") {
            //添加
            if ($("#divZF ul").length > 5) {
                alert("支付方式不能超过5条")
                return
            }
            var text = "";
            text += '<ul class="first">\n' +
                '<li><label>支付方式：</label><select style="width: 120px; margin-right: 32px; display: inline">\n' +
                '<option value="现金">现金</option>\n' +
                ' <option value="支付宝">支付宝</option>\n' +
                '<option value="微信">微信</option>\n' +
                '<option value="刷卡">刷卡</option>\n' +
                '                    </select></li>\n' +
                '                    <li><label>押金：</label><input maxlength="8" name="PayAmount" type="text" class="input_keynote"\n' +
                '                                                 style="width: 100px; margin-right: 25px; display: inline" value="">\n' +
                '                    </li>\n' +
                '<li style="color: #0788BD; padding-top: 3px; padding-left: 20px"><img optag="add"\n' +
                ' src="' + imgurl + '/resources/page/images/01.png"\n' +
                ' width="20" height="20"\n' +
                ' style="margin-right:10px; display:inline; cursor:pointer">\n' +
                '<img optag="del" src="' + imgurl + '/resources/page/images/02.png"\n' +
                '                             width="20" height="20" style="cursor:pointer"></li>\n' +
                '                </ul>';

            $("#divZF").append(text)
        } else if ($(this).attr("optag") == "del") {
            //删除
            $(this).parent().parent().remove()
        }
    })

    //天数加减
    $("#btnReduceStayDays").click(function () {
        var td = $("#txtStayDays").val()
        td = parseInt(td) - 1
        if (td < 1)
            td = 1
        $("#txtStayDays").val(td)
        changetime()
    })
    //天数加减
    $("#btnAddStayDays").click(function () {
        var td = $("#txtStayDays").val()
        td = parseInt(td) + 1
        $("#txtStayDays").val(td)
        changetime()
    })
    //提交按钮
    $("#btnSubmit").click(function () {
        /**********判断非空**************/
        /*****取值***/
        var _list = {}
        var checkinfos = []
        var guests = []
        var pays = []
        $("#tbSelectedRooms tbody tr").each(function () {
            var checkinfo = {}
            checkinfo.roomCaseId = $(this).attr("roomcaseid")
            checkinfo.roomId = $(this).attr("data-roomid")
            checkinfo.guestType = $(this).attr("guesttype")
            checkinfo.checkType = $(this).attr("checktype")
            checkinfo.roomPrice = $(this).attr("roomprice")
            checkinfo.inTime = $("#txtEnterDate").val()
            checkinfo.stayHours = $("#txtStayDays").val()
            checkinfo.preoutTime = $("#txtLeaveDate").val()
            checkinfo.sumRoomprice = parseFloat(checkinfo.roomPrice) * parseInt(checkinfo.stayHours)
            checkinfos.push(checkinfo)
        })
        $("#tbCustomers tbody tr").each(function () {
            var guest = {}
            guest.roomId = $(this).find("td:eq(0)").find("select").val()
            guest.guestName = $(this).find("td:eq(1)").find("input").val()
            guest.voucher = $(this).find("td:eq(2)").find("select").val()
            guest.voucherNo = $(this).find("td:eq(3)").find("input").val()
            guest.guestSex = $(this).find("td:eq(4)").find("select").val()
            guest.guestRace = $(this).find("td:eq(5)").find("select").val()
            guest.guestBirthdate = $(this).find("td:eq(6)").find("input").val()
            guest.guestAddress = $(this).find("td:eq(7)").find("input").val()
            guests.push(guest)
        })
        $("#divZF ul").each(function () {
            var pay = {}
            pay.payType = $(this).find("li:eq(0)").find("select").val()
            pay.prepay = $(this).find("li:eq(1)").find("input").val()
            pays.push(pay)
        })
        var bookMoney = $("#bookMoney").val()
        if(bookMoney!=null&&bookMoney!=''&&bookMoney>0){
            var bp = new Object()
            bp.payType = "订金"
            bp.prepay = bookMoney
            pays.push(bp)
            alert("添加订金")
        }

        for (i in checkinfos) {
            for (k in checkinfos[i]) {
                if ("roomId" == k.toString()) {
                    _list["checkinfos[" + i + "].room.roomId"] = checkinfos[i][k]
                } else if ("roomCaseId" == k.toString()) {
                    _list["checkinfos[" + i + "].room.roomCaseId"] = checkinfos[i][k]
                } else {
                    _list["checkinfos[" + i + "]." + k.toString()] = checkinfos[i][k]
                }
            }
        }
        for (i in guests) {
            for (k in guests[i]) {
                if ("roomId" == k.toString()) {
                    _list["guests[" + i + "].room.roomId"] = guests[i][k]
                } else {
                    _list["guests[" + i + "]." + k.toString()] = guests[i][k]
                }
            }
        }
        for (i in pays) {
            for (k in pays[i]) {
                _list["pays[" + i + "]." + k.toString()] = pays[i][k]
            }
        }
        _list["diyId"] = $("#ManualNumber").val()
        _list["groupName"] = $("#txtTeamName").val()
        _list["groupLeader"] = $("#txtLeaderName").val()
        _list["leaderPhone"] = $("#txtLeaderPhone").val()
        _list["menderId"] = $("#txtMemberCardNo").val()
        _list["guestType"] = $("#selCustomerSources").val()
        _list["inTime"] = $("#txtEnterDate").val()
        _list["stayHours"] = $("#txtStayDays").val()
        _list["sumMoney"] = $("#lblSelectedRoomsTotal").text()
        //提交
        $.ajax({
            url: '../../checkinfoController_addGroup',
            type: "POST",
            data: _list,
            dataType: "json",

            success: function (data) {
                if (data == 0) {
                    //失败
                    alert("未知错误")
                } else if (data == 1) {
                    //成功  关闭此窗口
                    alert("成功")
                    //关闭代码
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                } else if (data == 2) {
                    //验证失败
                    alert("入住房间与预定信息冲突")
                }
            }

        })

        //关闭
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    })
    /*******************初次加载结束******************************/
})

function addDate(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var month = d.getMonth() + 1;
    var day = d.getDate();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    //var val = month+"/"+day+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
    var val = d.getFullYear() + "-" + month + "-" + day + " " + "13:00:00"
    return val;
}

//改变时间
function changetime() {
    var day = $("#txtStayDays").val()
    if ($.trim(day) == '') {
        return false
    }
    var nd = $("#txtEnterDate").val()
    var dandt = nd.split(' ')
    var d = dandt[0].split('-')
    var t = dandt[1].split(':')
    var py = d[0];
    var pm = d[1] - 1;
    var pd = d[2];
    var ph = t[0];
    var pmt = t[1];
    var ps = t[2];
    var stayday = parseInt(day);
    var olddate = new Date(py, pm, pd, ph, pmt, ps);

    $("#txtLeaveDate").val(addDate(olddate, stayday))
    allprice()
}

//时间
function myInterval() {
    var now = new Date()
    var m = 1 + now.getMonth();
    if (m < 10) {
        m = "0" + m;
    }
    var d = now.getDate()
    if (d < 10) {
        d = "0" + d;
    }
    var h = now.getHours()
    if (h < 10) {
        h = "0" + h;
    }
    var mt = now.getMinutes()
    if (mt < 10) {
        mt = "0" + mt;
    }
    var s = now.getSeconds()
    if (s < 10) {
        s = "0" + s;
    }
    var strdate = now.getFullYear() + "-" + m + "-" + d;
    strdate += " " + h + ":" + mt + ":" + s
    $('#txtEnterDate').val(strdate);    // 设置日期时间输入框的值

}

//总房价//总房数
function allprice() {
    var allprice = 0;
    var allrooms = 0;
    var txtStayDays = parseInt($("#txtStayDays").val())
    if ($("#tbSelectedRooms tbody tr").length == 0) {
        allprice = 0;
        allrooms = 0;
    } else {
        allrooms = $("#tbSelectedRooms tbody tr").length
        $("#tbSelectedRooms tbody tr").each(function () {
            var tp = $(this).find("td:eq(3)").text();
            allprice += parseInt(tp)
        })
    }
    $("#lblSelectedRoomsCount").text(allrooms)
    $("#lblSelectedRoomsTotal").text(allprice * txtStayDays)
}

//点击房间选中、取消选中事件
function clickRoom(which) {
    var selects = $("#lblSelectedRoomCount").text()
    if ($(which).attr("data-selected") == "true") {

        $(which).attr("data-selected", 'false')
        $(which).attr("class", "")
        //选中数-1
        $("#lblSelectedRoomCount").text(parseInt(selects) - 1)

    } else {

        $(which).attr("data-selected", 'true')
        $(which).attr("class", "select")
        //选中数+1
        $("#lblSelectedRoomCount").text(parseInt(selects) + 1)
    }

}

//删除已添加房间
function removeSelectedRoom(id) {

    $("#tbSelectedRooms tbody tr").each(function () {
        if ($(this).attr("data-roomId") == id) {
            $(this).remove()
        }
    })
    reflushRoom()
    //删除该房住客信息
    $("#tbCustomers tbody tr").each(
        function () {
            var rid = $(this).find("td select").val()
            if (rid == id) {
                $(this).find("td .btnGuestDelete").click()
            }
        }
    )

}

//添加房间到左侧  入住信息
function addRoom() {
    $("#ulRooms li").each(function () {
        if ($(this).attr("data-selected") == "true") {
            var roomId = $(this).attr("data-id")
            //alert(roomId)
            var roomNo = $(this).attr("data-roomno")
            var roomCaseId = $("#selRoomPriceSchemes").val()
            var roomCaseName = $("#selRoomPriceSchemes").find("option:selected").text()
            var roomTypeName = $("#selRoomTypes").find("option:selected").text()
            var guestType = $("#selCustomerSources").val()
            var checkType = $("#selOpenTypes").val()
            var roomPrice = $("#txtRoomPrice").val()
            var roomPrice2 = $("#txtRoomDiscountPrice").val()
            var text = '<tr data-roomId="' + roomId + '" roomCaseId="' + roomCaseId + '" guestType="' + guestType + '" checkType="' + checkType + '" roomPrice="' + roomPrice2 + '">';
            text += '<td width="60">' + roomNo + '</td>' +
                '<td width="140">' + roomTypeName + '</td>' +
                '<td class="fr" width="80">' + roomPrice + '</td>' +
                '<td class="fr" width="80">' + roomPrice2 + '</td>' +
                '<td>' + roomCaseName + '</td>' +
                '<td width="70">' + checkType + '</td>' +
                '<td width="66"><img width="9" height="9"' +
                ' src="${pageContext.request.contextPath }/resources/page/images/010.gif"' +
                ' alt=""><span class="STYLE1"> [</span><a class="btnRowDelete"' +
                ' href="javascript:removeSelectedRoom(' + roomId + ')">删除</a><span' +
                ' class="STYLE1">]</span></td>' +
                '</tr>'
            $("#tbSelectedRooms tbody").append(text)
        }

    })
    $("#lblSelectedRoomCount").text(0)

}

//刷新房间列表   添加和删除房间时调用
function reflushRoom() {

    getRooms()
}

//加载房间号事件
function getRooms() {

    var rooms ;/*= [{"roomId": 1, "floorId": 1, "roomTypeId": 1, "roomNo": "101"},
        {"roomId": 2, "floorId": 1, "roomTypeId": 2, "roomNo": "102"},
        {"roomId": 3, "floorId": 1, "roomTypeId": 3, "roomNo": "103"},
        {"roomId": 4, "floorId": 1, "roomTypeId": 1, "roomNo": "104"}]*/
    $.ajax({
        url:'../../checkinfoController_getRooms',
        type:"POST",
        data:{
            roomTypeId:$("#selRoomTypes").val(),
            comeTime:$("#txtEnterDate").val(),
            leaveTime:$("#txtLeaveDate").val()
        },
        dataType:"json",
        success:function (data) {
            rooms = data.list
            $("#ulRooms").empty()
            $("#tbSelectedRooms tbody tr").each(function () {
                //alert($(this).attr("data-roomId")+"-"+rooms[i].roomId)
                var id = $(this).attr("data-roomId")
                var mastremove = false;
                var count = 0;
                for (n in rooms) {
                    if (id != rooms[n].roomId) {
                        count++
                    }
                }
                if (count == rooms.length) {
                    //alert($(this).find("td :first").text() + "号房不能入住到此日期，已删除")
                    $(this).find("td .btnRowDelete").click()
                }
            })
            for (i in rooms) {
                var flag = true
                $("#tbSelectedRooms tbody tr").each(function () {
                    //alert($(this).attr("data-roomId")+"-"+rooms[i].roomId)
                    if ($(this).attr("data-roomId") == rooms[i].roomId) {
                        flag = false

                    }
                })
                if (flag) {
                    $("#ulRooms").append('<li onclick="clickRoom(this)" data-id="' + rooms[i].roomId + '" data-roomno="' + rooms[i].roomNo + '" data-selected="false" class="">' + rooms[i].roomNo + '</li>')
                }
            }
            var sum = 0;
            $("#ulRooms li").each(function () {
                sum++
            })
            $("#lblRoomCount").text(sum)

            $("#maxRoomCount").text(data.count)

        }

    })

}

//加载房价方案
function addroomCase() {

    var roomtype = $("#selRoomTypes").val()
    $.ajax({
        url:'../../checkinfoController_getRoomCases',
        type:"POST",
        data:{
            roomTypeId:roomtype
        },
        dataType:"json",
        success:function (data) {
            var roomCase = data

            $("#selRoomPriceSchemes").empty()
            for(i in roomCase){
                $("#selRoomPriceSchemes").append('<option weekendPrice="'+roomCase[i].weekendPrice+'" ordinaryPrice="'+roomCase[i].ordinaryPrice+'" value="'+roomCase[i].roomCaseId+'">'+roomCase[i].roomCaseName+'</option>')

            }
            changePrice()

        }

    })

}

//房间价格标价 改变事件
function changePrice() {
    var roomCase = $("#selRoomPriceSchemes").val()
    var tp = $("#selRoomPriceSchemes").find("option:selected").attr("ordinaryPrice")
    //alert(tp)
    var nd = new Date()
    if(nd.getDay()==6||nd.getDay()==0){
        if($("#selRoomPriceSchemes").find("option:selected").attr("weekendPrice")!='')
            tp = $("#selRoomPriceSchemes").find("option:selected").attr("weekendPrice")
    }
    $("#txtRoomPrice").val(tp)
    $("#txtRoomDiscountPrice").val(tp)
}