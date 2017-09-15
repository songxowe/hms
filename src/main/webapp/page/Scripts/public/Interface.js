function checkIsJcExplorer() {
    //var IsJcExplorer = $.cookie('IsJcExplorer');
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent != "jchotelclient") {
        alert("没有操作该功能的权限,请安装客户端");
        return false;
    }
    return true;
}

//身份证接口
var IdCardCallback = undefined;
function ReadIdCard(callback) {
    if (!checkIsJcExplorer()) return false;
    IdCardCallback = callback;
    alert("JCCMD:readsfz:{}");
    //readsfzRe(0, '梁健', '430902198306101014', '湖南益阳资阳区', '男', '汉');
}
//身份证接口回调
function readsfzRe(i, sName, CardNum, Address, sSex, sNat) {
    if (i == 0 || i == "0") {
        if (IdCardCallback != undefined)
            IdCardCallback(sName, CardNum, Address, sSex, sNat);
    }
}

//门锁写卡接口
var DoorCardWriteCallback = undefined;
function DoorCardWrite(sFH, sMSH, sSJStart, sSJEnd, sTel, sName, callback) {
    if (!checkIsJcExplorer()) return false;
    DoorCardWriteCallback = callback;
    alert('JCCMD:writeiccard:{"sFH":"' + sFH + '","sMSH":"' + sMSH + '","sSJStart":"' + sSJStart + '","sSJEnd":"' + sSJEnd + '","sTel":"' + sTel + '","sName":"' + sName + '"}');
}
//门锁写卡回调（预留）
function writeiccardRe(i) {
    if (i == 0 || i == "0") {
        if (DoorCardWriteCallback != undefined)
            DoorCardWriteCallback(i);
    }
}


//门锁读卡接口
var DoorCardReadCallback = undefined;
function DoorCardRead(callback) {
    if (!checkIsJcExplorer()) return false;
    DoorCardReadCallback = callback;
    alert('JCCMD:readiccard:{}');
}
//门锁读卡回调
function readiccardRe(i, sFH, sMSH) {
    if (i == 0 || i == "0") {
        if (DoorCardReadCallback != undefined)
            DoorCardReadCallback(i, sFH, sMSH);
    }
}


//Mac地址读取接口
var MacAddressCallback = undefined;
var macAddressBackUrl = undefined;//跨域回调地址
function ReadMacAddress(callback, backUrl) {
    if (!checkIsJcExplorer()) return false;
    if (backUrl != undefined && backUrl != null && backUrl != "") {
        MacAddressCallback = undefined;
        macAddressBackUrl = backUrl;
    }
    else {
        macAddressBackUrl = undefined;
        MacAddressCallback = callback;
    }
    alert('JCCMD:readmacadd:{}');
}
//Mac地址读取回调
function readmacadd(i, Mac) {
    if (i == 0 || i == "0") {
        if (MacAddressCallback != undefined)
            MacAddressCallback(i, Mac);
        else if (macAddressBackUrl != undefined) {//跨域回调
            if (macAddressBackUrl.indexOf("?") >= 0) {
                macAddressBackUrl += "&mac=" + Mac;
            } else {
                macAddressBackUrl += "?mac=" + Mac;
            }
            document.main.set_main.location.href = macAddressBackUrl
        }
    }
}


//门锁清卡接口
var DoorCardClearCallback = undefined;
function DoorCardClear(sFH, sMsm, callback) {
    if (!checkIsJcExplorer()) return false;
    DoorCardClearCallback = callback;
    alert('JCCMD:cleariccard:{"sFH":"' + sFH + '","sMsm":"' + sMsm + '"}');
}
//门锁清卡回调（预留）
function cleariccardRe(i) {
    if (i == 0 || i == "0") {
        if (DoorCardClearCallback != undefined)
            DoorCardClearCallback(i);
    }
}

//读INI配置文件
var readINICallBack = undefined;
function readINI(callback) {
    if (!checkIsJcExplorer()) return false;
    readINICallBack = callback;
    alert('JCCMD:readini:{}');
}

//读INI回调
function readiniRe(i, msxx, sfzxx, hjxx, hyxx, spiders) {
    if (i == 0 || i == "0") {
        if (readINICallBack != undefined)
            readINICallBack(msxx, sfzxx, hjxx, hyxx, spiders);
    }
}

//门锁/身份证/户籍下载接口 type  1 门锁 2 身份证 3 户籍
function DllDownload(type, url, callback) {
    if (!checkIsJcExplorer()) return false;
    readINICallBack = callback;
    alert('JCCMD:downloadexe:{"I":' + type + ',"url":"' + url + '"}');
    //callback(",,,,,0", "精伦二代证,3", ",,,");
}

//写INI配置文件
var writeINICallBack = undefined;
function writeINI(data, callback) {
    if (!checkIsJcExplorer()) return false;
    writeINICallBack = callback;
    alert('JCCMD:writeini:' + data);
}

//写INI配置文件回调
function writeiniRe(i) {
    if (i == 0 || i == "0") {
        if (writeINICallBack != undefined)
            writeINICallBack(i);
    }
}

//新开窗口
function clientOpen(url, flag) {
    if (flag == 1) {
        url = window.location.href.toLowerCase().replace("/index.html", "") + url;
    }
    if (!checkIsJcExplorer()) return false;
    alert('JCCMD:openNewWindow:{"url":"\\"' + url + '\\""}');
}

//户籍上传接口(单个)
var hujiUploadCallBack = undefined;
var succhuji = "";
var failshuji = "";
function hujiUpload(data, callback) {
    if (!checkIsJcExplorer()) return false;
    hujiUploadCallBack = callback;
    alert('JCCMD:hjjk:' + data);
}

//户籍上传接口回调
function hjjkRe(i) {
    if (hujiUploadCallBack != undefined)
        hujiUploadCallBack(i);
}

//户籍上传接口(批量)
function hujiUploadBatch(list) {
    try {
        if (list != null && list.length > 0) {
            var ret = 0;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                top.hujiUpload(item.HujiJson, function (i) {
                    //返回标示，2016-07-20以前用0表示成功，之后用1表示成功
                    if (i == 1 || i == "1") {
                        if (succhuji != "") succhuji += ",";
                        succhuji += item.Id;
                    }
                    else {
                        if (failshuji != "") failshuji += ",";
                        failshuji += item.Id;
                    }
                    ret++;
                    if (ret == list.length) {
                        postSynRequest("/services/basicservice.aspx", { succids: succhuji, failids: failshuji }, "RZXX", "UploadProcess");
                    }
                });
            }
        }
    }
    catch (e) { }
}

//会员写卡
var MemberCardWriteCallback = undefined;
function MemberCardWrite(sKH, callback) {
    if (!checkIsJcExplorer()) return false;
    MemberCardWriteCallback = callback;
    alert('JCCMD:writehycard:{"skh":"' + sKH + '"}');
}
//会员写卡回调（预留）
function writehycardRe(i) {
    if (i == 0 || i == "0") {
        if (MemberCardWriteCallback != undefined) 
            MemberCardWriteCallback(i);
    }
}

//会员读卡
var MemberCardReadCallback = undefined;
function MemberCardRead(callback) {
    if (!checkIsJcExplorer()) return false;
    MemberCardReadCallback = callback;
    alert('JCCMD:readhycard:{}');
}
//会员读卡回调
function readhycardRe(i, skh) {
    if (i == 0 || i == "0") {
        if (MemberCardReadCallback != undefined)
            MemberCardReadCallback(skh);
    }
}

//OTA是否登录接口 0 未登录 1 已登录
var otaLoginStatusHanlder = undefined;
function otaLoginStatus(i) {
    if (i == 0 && otaLoginStatusHanlder == undefined) {
        $("#btnOTALogin").html("OTA未登录");
        otaLoginStatusHanlder = setInterval(function () {
            if ($("#btnOTALogin").css('color') == "rgb(255, 0, 0)") {
                $("#btnOTALogin").css('color', 'white')
            }
            else {
                $("#btnOTALogin").css('color', 'red')
            }
        }, 500);
    }
    else if (i == 1 && otaLoginStatusHanlder != undefined) {
        $("#btnOTALogin").html("OTA已登录");
        clearInterval(otaLoginStatusHanlder);
        $("#btnOTALogin").css('color', 'white');
        otaLoginStatusHanlder = undefined;
    }
}

//打印接口
function clientPrint(html) {
    if (!checkIsJcExplorer()) return false;
    alert('JCCMD:print:' + html);
}

//打印页面设置
function clientPrintSet() {
    if (!checkIsJcExplorer()) return false;
    alert('JCCMD:printset:{}');
}

//打印页面设置
function printwriteini(i) {
    if (!checkIsJcExplorer()) return false;
    alert('JCCMD:printwriteini:' + i);
}

//自定义账单上传
function zdyzdupload(data) {
    if (!checkIsJcExplorer()) return false;
    alert('JCCMD:zdyzdupload:' + data);
}

//自定义账单下载
function zdyzddownload(data) {
    if (!checkIsJcExplorer()) return false;
    alert('JCCMD:zdyzddownload:' + data);
}
//自定义账单预览
function zdyzdpreview(data) {
    if (!checkIsJcExplorer()) return false;
    alert('JCCMD:zdyzdpreview:' + data);
}
//自定义账单打印
function zdyzdprint(data) {
    if (!checkIsJcExplorer()) return false;
    alert('JCCMD:zdyzdprint:' + data);
}

//自定义账单设置
function zdyzdsetting(data) {
    if (!checkIsJcExplorer()) return false;
    alert('JCCMD:zdyzddes:' + data);
}


//确认信息接口
function BlackInfoRead(str) {
    if (!checkIsJcExplorer()) return false;
    alert('JCCMD:confirm:' + str);
}

//电子签名 
var ElectronicSignatureCallback = undefined;
function ElectronicSignature(data, callback) {
    if (!checkIsJcExplorer()) return false;
    ElectronicSignatureCallback = callback;
    alert('JCCMD:sxb_start:' + data);
}
///电子签名回调，0:成功
function sxbuploadRe(i) {
    if (i == 0 || i == "0") {
        if (ElectronicSignatureCallback != undefined)
            ElectronicSignatureCallback(i);
    }
}


//税务打印
var InviocePrintCallback = undefined;
function InviocePrint(data, callback) {
    if (!checkIsJcExplorer()) return false;
    InviocePrintCallback = callback;
    setTimeout(function () {
        alert('JCCMD:swprint_start:' + data);
    }, 2000);
}

///税务打印回调，i=0:成功 ,data：返回数据
function swprint_startRe(i, data) {
    if (i == 0 || i == "0") {
        if (InviocePrintCallback != undefined)
            InviocePrintCallback(i, data);
    }
}

