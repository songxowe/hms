//js数组扩展contains方法
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

//根据cookiekey获取cookie值
function getCookie(name) {
    var mn = name + "=";
    var b, e;
    var co = document.cookie;
    if (mn == "=") {
        return co;
    }
    b = co.indexOf(mn);
    if (b < 0) {
        return "";
    }
    e = co.indexOf(";", b + name.length);
    if (e < 0) {
        return co.substring(b + name.length + 1);
    } else {
        return co.substring(b + name.length + 1, e);
    }
}

//开始保存
function beginSave(title) {
    var h = document.documentElement.clientHeight;
    var w = document.documentElement.clientWidth;

    var div = document.createElement("div");
    div.className = "savebg";
    div.id = "divSave";
    var msg = document.createElement("div");
    msg.className = "savetext";
    var msgContent = "<img src='/images/loading.gif'/>" + (title || "保存中...");
    msg.innerHTML = msgContent;
    msg.id = "divSaveMsg";
    msg.style.position = "absolute";
    msg.style.top = (h / 2 - 30) + 'px';
    msg.style.left = w / 2 + "px";
    document.body.appendChild(div);
    document.body.appendChild(msg);
}

//结束保存
function endSave() {
    var divSave = document.getElementById("divSave");
    var divSaveMsg = document.getElementById("divSaveMsg");
    document.body.removeChild(divSave);
    document.body.removeChild(divSaveMsg);
}

//日期加上天数后的新日期.
function AddDays(date, days) {
    var arrdt = date.split("-");
    var nd = new Date(arrdt[0], parseInt(arrdt[1]) - 1, arrdt[2]);
    nd = nd.valueOf();
    nd = nd + days * 24 * 60 * 60 * 1000;
    nd = new Date(nd);
    //alert(nd.getFullYear() + "年" + (nd.getMonth() + 1) + "月" + nd.getDate() + "日");
    var y = nd.getFullYear();
    var m = nd.getMonth() + 1;
    var d = nd.getDate();
    if (m <= 9) m = "0" + m;
    if (d <= 9) d = "0" + d;
    var cdate = y + "-" + m + "-" + d;
    return cdate;
}

//日期加上小时后的新日期.
function AddHours(date, hours) {
    var arrdt = date.split(" ");
    var dtDate = arrdt[0];
    var dtTime = arrdt[1];
    var arrTime = dtTime.split(":");
    var hour = parseInt(arrTime[0].replace(/^0/, '')) + parseInt(hours);
    if (hour >= 24) {
        dtDate = AddDays(dtDate, hour / 24);
        hour = hour % 24;
    }
    dtTime = hour + ":" + arrTime[1];
    return dtDate + " " + dtTime;
}

//两个日期的差值(d1 - d2).
function DateDiff(d1, d2) {
    var day = 24 * 60 * 60 * 1000;
    try {
        var dateArr = d1.split("-");
        var checkDate = new Date();
        checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
        var checkTime = checkDate.getTime();

        var dateArr2 = d2.split("-");
        var checkDate2 = new Date();
        checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
        var checkTime2 = checkDate2.getTime();

        var cha = (checkTime - checkTime2) / day;
        return cha;
    } catch (e) {
        return false;
    }
}

function crossDomain() {
    var isCross = false;
    try {
        var url = top.document;
        if (url == undefined) {
            isCross = true;
        }
    } catch (e) {
        isCross = true;
    }
    return isCross;
}

function getCrossFrame() {
    var f = document.createElement("iframe");
    f.style.height = "0px";
    f.style.width = "0px";
    f.style.display = "none";
    try {
        document.appendChild(f);
    }
    catch (e) {
        document.body.appendChild(f);
    }
    return f;
}

function getHost() {
    return document.location.href.substring(0, document.location.href.indexOf("/", 10));
}


function getParentHost() {
    var url = getCookie("coparenturl");
    var host = url.substring(0, url.toString().indexOf("/", 10));
    return host;
}

function crossAction(fname, args) {
    var cf = getCrossFrame();

    var src = getParentHost() + "/crossjs.htm";
    src += "#" + fname + ":" + args;
    cf.src = src;
}

function openWin(url, width, height, div) {
    if (div == undefined || div == "") {
        div = "pwin";
    }
    if (crossDomain()) {
        url = getHost() + url;
        crossAction("openWin", "'" + escape(url) + "'," + width + "," + height + ",'" + escape(div) + "'");
    }
    else {
        openWinLoca(url, width, height, div);
    }
}

function openWinLoca(url, width, height, div) {
    if (div == undefined || div == "") {
        div = "pwin";
    }
    var win = $(top.document).find("." + div);
    var divtop = ($(top.document).height() - height) / 2;
    var divleft = ($(top.document).width() - width) / 2;
    $(win).css('width', width + "px");
    $(win).css('height', height + "px");
    $(win).css('top', divtop + "px");
    $(win).css('left', divleft + "px");
    $(win).show();
    $(win).find('iframe').remove();
    var winobj = $('<iframe src="' + url + '" width="100%" height="' + height + '" name="win"  scrolling="yes" frameborder="0" style="float:left"></iframe>');
    $(win).prepend(winobj);
    $(winobj).load(function () {
        var obj = this;
        $(obj.contentDocument).find("input[type='text']").live('click', function () {
            $(obj.contentDocument).find('.note_no').remove();
            $(obj.contentDocument).find(".errorborder").removeClass('errorborder');
        });
        $(obj.contentDocument).find("input[type='radio']").live('click', function () {
            $(obj.contentDocument).find('.note_no').remove();
            $(obj.contentDocument).find(".errorborder").removeClass('errorborder');
        });
        $(obj.contentDocument).find("input[type='checkbox']").live('click', function () {
            $(obj.contentDocument).find('.note_no').remove();
            $(obj.contentDocument).find(".errorborder").removeClass('errorborder');
        });
        $(obj.contentDocument).find("textarea").live('click', function () {
            $(obj.contentDocument).find('.note_no').remove();
            $(obj.contentDocument).find(".errorborder").removeClass('errorborder');
        });
        $(obj.contentDocument).find("select").live('click', function () {
            $(obj.contentDocument).find('.note_no').remove();
            $(obj.contentDocument).find(".errorborder").removeClass('errorborder');
        });
    });
    $(top.document).find("." + div + "_black").show();
}

//刷新父窗口
function RefreshParentWin(div) {
    parent.set_main.window.location.reload();
    closeWin(div);
}

function closeWin(div) {
    if (crossDomain()) {
        crossAction("closeWin", div);
    }
    else {
        closeWinLoca(div);
    }
}

function closeWinLoca(div) {
    if (div == undefined || div == "") {
        div = "pwin";
    }
    var black = $(top.document).find("." + div + "_black");
    $(black).hide();
    var win = $(top.document).find("." + div);
    $(win).hide();
}

//停止事件往上传递
function cancelEvent(event) {
    if (event.stopPropagation) { // this code is for Mozilla and Opera 
        event.stopPropagation();
    } else if (window.event) { // this code is for IE 
        window.event.cancelBubble = true;
    }
}

//弹出进度显示条 锁定界面
function popWaitProcess() {
    if (crossDomain()) {
        crossAction("popWaitProcess");
    }
    else {
        popWaitProcessLoca();
    }
}

//关闭进度显示条 
function closeWaitProcess() {
    if (crossDomain()) {
        crossAction("closeWaitProcess");
    }
    else {
        closeWaitProcessLoca();
    }
}
function popWaitProcessLoca() {
    top.document.getElementById('divLoading').style.display = 'block';
}
function closeWaitProcessLoca() {
    top.document.getElementById('divLoading').style.display = 'none';
}