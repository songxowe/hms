$(function () {
    myInterval()
    var now = new Date();
    var s = addDate(new Date(), 1)
    getTotalAccount()
    $("#preoutTime").val(s)
    $(".reduceDays").click(function () {
        var day = $("#Days").val()
        day = parseInt(day) - 1
        if (day < 1)
            day = 1
        $("#Days").val(day)
        changeday()
    })
    $(".addDays").click(function () {
        var day = $("#Days").val()
        day = parseInt(day) + 1
        $("#Days").val(day)
        changeday()
    })
    $("#Days").blur(function () {
        var day = $("#Days").val()
        if (day < 1) {
            day = 1
            $("#Days").val(day)
        }

        changeday()
    })


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
        var trobj = $("#divEditRow tbody").html();

        $(".ruzhu tbody").append(trobj);


    });

    $("#btnClose").click(function () {
        //关闭代码
        window.location.href = "../../findAllRoom";
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    });

    $("#btnSubmit").click(function () {
        //alert(2222)
        /*var gname = []
        var gbt = []
        var gsex = []
        var gmz = []
        var gtype = []
        var gno = []
        var gad = []
        var gdatas = [gname,gbt,gsex,gmz,gtype,gno,gad]*/
        if ($(".ruzhu tbody tr").find("input[name='RowName']").length > 0) {
            alert("有未保存随客信息")
            if ($(".divOtherCustomer").is(":hidden")) {
                $(".divOtherCustomer").show();
                $(".btnOpenCustomer").html('隐藏>>');
            }
            return false;
        }


        var guests = [];
        $(".ruzhu tbody tr").each(function () {
            var gestdates = new Object()
            $(this).find("td").each(function (index) {
                switch (index) {
                    case 0:
                        var tmpd = $(this).text()
                        if (tmpd == 'null') {
                            tmpd = null;
                        }
                        gestdates.guestName = tmpd
                        break;
                    case 1:
                        var tmpd = $(this).text()
                        if (tmpd == 'null') {
                            tmpd = null;
                        }
                        gestdates.guestBirthdate = tmpd
                        break;
                    case 2:
                        var tmpd = $(this).text()
                        if (tmpd == 'null') {
                            tmpd = null;
                        }
                        gestdates.guestSex = tmpd
                        break;
                    case 3:
                        var tmpd = $(this).text()
                        if (tmpd == 'null') {
                            tmpd = null;
                        }
                        gestdates.guestRace = tmpd
                        break;
                    case 4:
                        var tmpd = $(this).text()
                        if (tmpd == 'null') {
                            tmpd = null;
                        }
                        gestdates.voucher = tmpd
                        break;
                    case 5:
                        var tmpd = $(this).text()
                        if (tmpd == 'null') {
                            tmpd = null;
                        }
                        gestdates.voucherNo = tmpd
                        break;
                    case 6:
                        var tmpd = $(this).text()
                        if (tmpd == 'null') {
                            tmpd = null;
                        }
                        gestdates.guestAddress = tmpd
                        break;
                }
                /*if (index < 7) {
                    var tmpd = $(this).text()
                    if (tmpd == 'null') {
                        tmpd = null;
                    }
                    gestdates.push(tmpd)
                }*/
            })
            gestdates.roomId = $("#RoomId").val()
            guests.push(gestdates)
        })

        var pays = [];
        $("#divZF ul").each(function () {
            var paysdates = new Object()
            $(this).find("li").each(function (index) {
                if (index == 0) {
                    paysdates.payType = $(this).find("select").val()

                }
                if (index == 1) {
                    paysdates.prepay = $(this).find("input").val()

                }
            })
            if (paysdates.prepay != null && paysdates.prepay != '') {
                pays.push(paysdates)
            }
        })
        var bookMoney = $("#bookMoney").val()
        if(bookMoney!=null&&bookMoney!=''&&bookMoney>0){
            var bp = new Object()
            bp.payType = "订金"
            bp.prepay = bookMoney
            pays.push(bp)
            alert("添加订金")
        }
        var mainguest = new Object()
        mainguest.guestName = $("#Customer_Name").val()
        mainguest.voucher = $("#Customer_CardType").val()
        mainguest.voucherNo = $("#Customer_CardNo").val()
        mainguest.guestPhone = $("#Customer_Phone").val()
        mainguest.guestBirthdate = $("#Customer_Birthday").val()
        mainguest.guestSex = $("#Customer_Sex").val()
        mainguest.guestRace = $("#Customer_Ethnic").val()
        mainguest.guestAddress = $("#Customer_Address").val()
        mainguest.mainguest = '是'
        mainguest.roomId = $("#RoomId").val()
        guests.push(mainguest)
        var _list = new Object();
        //alert("guests:" + guests.length)
        //alert("pays:" + pays.length)
        for (i in guests) {
            for (k in guests[i]) {

                if ("roomId" == k.toString()) {
                    _list["guests[" + i + "].room." + k.toString()] = guests[i][k]
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
        /*for(i=0;i<5;i++){
            _list["guests[" + i + "].guestId"] = 1
        }*/
        _list["room.roomId"] = $("#RoomId").val()
        _list["roomCase.roomCaseId"] = $("#SchemeId").val()
        _list["memberId"] = $("#MemberCardNo").val()
        _list["diyId"] = $("#Jzsgdh").val()
        _list["guestType"] = $("#Source").val()
        _list["checkType"] = $("#OpenType").val()
        _list["roomPrice"] = $("#Price").val()
        _list["inTime"] = $("#EnterDate").val()
        _list["stayHours"] = $("#Days").val()
        _list["preoutTime"] = $("#preoutTime").val()
        _list["mainpayRoom"] = $("#GroupRoomNo").val()
        _list["checkRemark"] = $("#Remark").val()
        _list["sumRoomprice"] = $("#spanTotalAccount").text()
        /*_list["secret"] =$("#secret").val()*/


        /**********************************************/
        ////////提交添加
        $.ajax({
            url: '../../checkinfoController_addone',
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
                    $("#btnClose").click()
                } else if (data == 2) {
                    //验证失败
                    alert("该房间目前不可入住")
                }
            }
        })
    });


//增加支付方式
    $("#divZF ul li img").click(function () {

        var tag = $(this).attr("src");
        if (tag.search("01.png") > -1) {

            addPaymode();
            return;
        }
        $(this).parent().parent().remove();

    });

//加载房价方案
    alert(3)
    //var tid = $("#RoomTypeId").find("option:selected").val()
    //if(tid !=null && tid !=''){
    alert(333)
    /*$.ajax({
        url:'../../checkinfoController_getRoomCases',
        type:"POST",
        data:{
            roomTypeId:tid
        },
        dataType:"json",
        success:function (data) {
            var cases = data

            var caseoptions = ''

            for(i in cases){
                caseoptions += '<option weekendPrice="'+cases[i].weekendPrice+'" ordinaryPrice="'+cases[i].ordinaryPrice+'" value="'+cases[i].roomCaseId+'">'+cases[i].roomCaseName+'</option>'
            }
            $("#SchemeId").empty().append(caseoptions)

            //更新房价
            var tprice = $("#SchemeId").find("option:selected").attr("ordinaryPrice")
            var nd = new Date()
            if(nd.getDay()==6||nd.getDay()==0){
                tprice = $("#SchemeId").find("option:selected").attr("weekendPrice")
            }
            $("#Price").val(tprice)
            getTotalAccount()
        }

    })*/
    // }
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

function getTotalAccount() {
    var prc = $("#Price").val()
    var st = $("#Days").val()

    if (prc < 0) {
        prc = 0;
        $("#Price").val(prc)
    }
    var price = parseFloat(prc) * parseInt(st);
    $("#spanTotalAccount").text(price)
}

function changeday() {

    var day = $("#Days").val()
    if ($.trim(day) == '') {
        return false
    }
    var nd = $("#EnterDate").val()
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

    $("#preoutTime").val(addDate(olddate, stayday))
    getTotalAccount()
}

setInterval("myInterval()", 1000);//1000为1秒钟



function first() {
    alert(333)
}

function addPay(which) {
    var tag = $(which).attr("src");
    if (tag.search("01.png") > -1) {

        addPaymode();
        return;
    }
    $(which).parent().parent().remove();

}

function addPaymode() {
    //GetJz();
    var localObj = window.location;

    var contextPath = localObj.pathname.split("/")[0];
    var basePath = localObj.protocol + "//" + localObj.host + "/" + contextPath;

    var imgurl = basePath;


    var optstr = "";
    var payMothed = [
        {'Id': 1, 'Name': '现金'},
        {'Id': 2, 'Name': '支付宝'},
        {'Id': 3, 'Name': '微信'},
        {'Id': 4, 'Name': '刷卡'}
    ]
    if ($("#divZF ul").length >= payMothed.length) {
        //if (payMothed[i].Id != "-5")
        alert("对不起，增加支付方式失败，超过支付方式的数量!");
        return;
    }
    for (var i = 0; i < payMothed.length; i++) {
        optstr = optstr + "<option>" + payMothed[i].Name + "</option>";
    }
    var str = "<ul class='first'>";
    str += "<li><label>支付方式：</label><select  style='width: 120px; margin-right: 32px; display: inline'>" + optstr + "</select></li> ";
    str += "<li><label>押金：</label><input maxlength='8' name='PayAmount'  type='text' class='input_keynote' style='width: 100px; margin-right: 25px; display: inline'/></li>";
    str += "<li style='display: none' class='prepaidpay'><label class='paytitle'>会员卡号：</label><input disabled='disabled' type='text' name='MemberCardNo' value='' /><a href='javascript:void(0)' onclick='payment(this)' style='padding-left: 10px; margin-top: 5px; line-height: 24px;'>选择</a></li>";
    str += "<li style='color: #0788BD; padding-top: 3px; padding-left: 20px'>";
    str += "<img opttag='add' onclick='addPay(this)' src='" + imgurl + "/resources/page/images/01.png' width='20' height='20' style='margin-right:10px; display:inline; cursor:pointer'/> ";
    str += "<img opttag='del' onclick='addPay(this)' src='" + imgurl + "/resources/page/images/02.png' width='20' height='20' style='cursor:pointer'/>";
    str += "</li>";
    str += "</ul>";
    $("#divZF").append(str);
};

/*****************************************/
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
    $('#EnterDate').val(strdate);    // 设置日期时间输入框的值

}


function RowDelete(obj) {

    var trobj = $(obj).parent().parent();
    $(trobj).remove();
}

function RowSave(obj) {

    var trobj = $(obj).parent().parent();
    var rowNameObj = $(trobj).find("input[name='RowName']");
    var rowName = $(rowNameObj).val();
    if ($.trim(rowName) == "") {
        layer.msg("请输入随客姓名");
        //showTipsCollect(3, 'btnRead', '请输入随客姓名', rowNameObj);
        $(rowNameObj).focus();
        return false;
    }
    if (!/^[A-Za-z\u4e00-\u9fa5\s·]+$/.test(rowName)) {
        layer.msg('随客姓名请输入中文英文');
        //showTipsCollect(3, 'btnRead', '随客姓名请输入中文英文', rowNameObj);
        $(rowNameObj).focus();
        return false;
    }
    var rowBirthday = $(trobj).find("input[name='RowBirthday']").val();
    if (rowBirthday == "") {
        layer.msg("请输入随客生日")
        //showTipsCollect(3, 'btnRead', "请输入随客生日", $(trobj).find("input[name='RowBirthday']"));
        return false;
    }
    var rowSex = $(trobj).find("select[name='RowSex']").val();
    var rowEthnic = $(trobj).find("select[name='RowEthnic']").val();
    var rowCardType = $(trobj).find("select[name='RowCardType']").val();
    var rowCardNo = $(trobj).find("input[name='RowCardNo']").val();
    if (rowCardNo == "") {
        layer.msg("请输入随客证件号码")
        //showTipsCollect(3, 'btnRead', "请输入随客证件号码", $(trobj).find("input[name='RowCardNo']"));
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
            layer.msg('随客身份证重复')
            //showTipsCollect(3, 'btnRead', '随客身份证重复', $(trobj).find("input[name='RowCardNo']"));
            $(trobj).find("input[name='RowCardNo']").focus();
            return false;
        }

        /*if (Set_IdCardNumber == "1") {
            if (rowCardType == "身份证" && rowCardNo != "") {
                var res = postSynRequest("/services/basicservice.aspx", { cardNo: rowCardNo }, "Common", "CheckIsIdCard");
                if (!res.State.Success) {
                    showTipsCollect(3, 'btnRead', res.State.Errkey, $(trobj).find("input[name='RowCardNo']"));
                    //$(trobj).find("input[name='RowCardNo']").focus();
                    return false;
                }
            }
        }*/
    }
    var rowAddress = $(trobj).find("input[name='RowAddress']").val();
    if (rowAddress == "") {
        layer.msg("请输入随客地址")
        //showTipsCollect(3, 'btnRead', "请输入随客地址", $(trobj).find("input[name='RowAddress']"));
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
        postRequest("/services/basicservice.aspx", {cardNo: cardNo}, "Common", "GetZoneByIdCard", false, function (data) {
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
