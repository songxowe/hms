/* 
 * 2015-12-14 
 * 自定义账单打印处理
 */

//打印入住单
function PrintOrderAdd(groupno, set_wayprint) {
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=BillRZD",
            type: "post",
            async: false,
            datatype: "json",
            data: { orderno: groupno },
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/BillRZD.aspx?orderno=" + groupno, 800, 430, "pwin2", set_wayprint);
    }
}
///打印续住单
function PrintConLiveDY(orderno, pay, set_wayprint, accId) {
    if (accId == undefined) {
        accId = "";
    }
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=ConLiveDY",
            type: "post",
            async: false,
            datatype: "json",
            data: { orderno: orderno, pay: pay, accId: accId },
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/ConLiveDY.html?orderno=" + orderno + "&pay=" + pay + "&id=" + accId, 800, 430, "pwin2", set_wayprint);
    }
}
//打印预订单
function PrintBookingOrder(BookNo, type, set_wayprint) {
    console.log(BookNo);
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=BillYJPZ",
            type: "post",
            async: false,
            datatype: "json",
            data: { BookNo: BookNo, type: type },
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/BillYJPZ.html?BookNo=" + BookNo + "&type=" + type, 820, 430, "pwin2", set_wayprint);
    }
}

//打印非住客账单
function PrintOtherFee(id, set_wayprint) {
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=BillOtherFree",
            type: "post",
            async: false,
            datatype: "json",
            data: { Id: id },
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/BillOtherFree.aspx?Id=" + id, 800, 430, "pwin2", set_wayprint);
    }
}

//打印结账单
function PrintZJD(orderno, prejz, zws, set_wayprint,printCategory) {
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=JZD",
            type: "post",
            async: false,
            datatype: "json",
            data: { rzdhs: orderno, prejz: prejz, addFZ: zws ,printCategory:printCategory},
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        if (zws != "") {
            top.ActiveWin = window;
            zws = "true";
        }
        var url = "/BillInfor/BillJZD.html?status=" + prejz + "&orderno=" + orderno 
        if (printCategory != "" && printCategory != null && printCategory != undefined)
            url += "&PrintCategory=" + printCategory
        url += "&zws=" + zws
        openWin(url, 840, 560, "pwin2", set_wayprint);
    }
}

///打印会员充值
function PrintMemberRecharge(cardid, givescore, set_wayprint,id) {
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=MemberDY",
            type: "post",
            async: false,
            datatype: "json",
            data: { CardId: cardid, CardNo: "", GiveScore: givescore ,prid:id},
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/MemberDY.html?CardId=" + cardid + "&GiveScore=" + givescore + "&prid=" + id, 800, 400, "pwin2", set_wayprint);
    }
}


//打印新开会员
function PrintNewMember(cardid, cardno, givescore, set_wayprint) {
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=MemberXKDY",
            type: "post",
            async: false,
            datatype: "json",
            data: { CardId: cardid, CardNo: cardno, GiveScore: givescore },
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/MemberDY.html?CardId=" + cardid + "&CardNo=" + cardno + "&GiveScore=" + givescore, 800, 400, "pwin2", set_wayprint);
    }
}

//打印换卡账单
function PrintChangeCard(cardid, oldCardNo, newCardNo, set_wayprint) {
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=MemberHKDY",
            type: "post",
            async: false,
            datatype: "json",
            data: { CardId: cardid, oldCardNo: oldCardNo, newCardNo: newCardNo },
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/BillHKPZ.html?CardId=" + cardid + "&oldCardNo=" + oldCardNo + "&newCardNo=" + newCardNo, 800, 400, "pwin2");
    }
}

//打印商品入账
function PrintGoodsBill(id, set_wayprint) {
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=GoodsBill",
            type: "post",
            async: false,
            datatype: "json",
            data: { Id: id },
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    console.log(JSON.stringify(data.Data));
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/BillOtherFree.aspx?Id=" + id, 800, 430, "pwin3", set_wayprint);
    }
}

//打印换房账单
function PrintChangeRoom(orderno, set_wayprint) {
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=ChangeRoomDY",
            type: "post",
            async: false,
            datatype: "json",
            data: { orderno: orderno },
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/ChangeRoomDY.html?orderno=" + orderno, 800, 280, "pwin2", set_wayprint);
    }
}
//打印退押金账单
function PrintBackDeposit(orderno, pay, set_wayprint) {
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=BackDeposit",
            type: "post",
            async: false,
            datatype: "json",
            data: { orderno: orderno, pay: pay },
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/ConLiveDY.html?orderno=" + orderno + "&pay=" + pay, 800, 430, "pwin3", set_wayprint);
    }
}

///打印自定义部分账单
function PrintPartJZD(jzorders, billids, set_wayprint) {
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=PartJZD",
            type: "post",
            async: false,
            datatype: "json",
            data: { rzdhs: jzorders, billids: billids },
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/PartBillJZD.html?billids=" + billids + "&orderno=" + jzorders, 840, 560, "pwin2", set_wayprint);
    }
}

//会员升级收费 打印
function PrintMemberUpgrade(cardid, cardno, oldcategorgid, set_wayprint) {
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=MemberUpgrade",
            type: "post",
            async: false,
            datatype: "json",
            data: { CardId: cardid, CategorgId: oldcategorgid, CardNo: cardno },
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/MemberUpgrade.html?CardId=" + cardid + "&CategorgId=" + oldcategorgid + "&CardNo=" + cardno, 840, 560, "pwin2", set_wayprint);
    }
}



//打印会员积分调整凭证
function PrintMemberScoreChange(scoreid, set_wayprint) {
    if (IsDefineBill()) {
        $.ajax({
            url: "/services/basicservice.aspx?classname=DefineBillUsl&method=MemberSoreChange",
            type: "post",
            async: false,
            datatype: "json",
            data: { scoreid: scoreid },
            success: function (json) {
                var data = eval("(" + json + ")");
                if (data.State.Success) {
                    top.zdyzdprint(JSON.stringify(data.Data));
                }
                else {
                    alert(data.State.Des);
                }
            }
        });
    } else {
        openWin("/BillInfor/MemberPoint.html?scoreid=" + scoreid, 800, 400, "pwin2", set_wayprint);
    }
}

