/*
    模块名称:常用功能
    模块功能:一些常用功能
    编写人:cl
    编写时间:2012-09-13
*/

/*
    功能说明:AJAX向服务器端传送数据
    参数说明:
            url 请求的Action位置
            data:发送的数据
            showwait:是否需要显示等待对话框
            success:调用成功返回的函数   注:成功调用后返回结果
            error:错误时调用的函数
*/
function postRequest(url, data1, classname, method, showwait, success, error, complete, $form) {
    if (showwait) {
        popWaitProcess("请稍侯!", "正在处理数据");
    }
    var token = "";
    if (url.toLowerCase().indexOf("/services/basicservice.aspx") >= 0) {
        token = getRequestToken(url, classname, method);
    }

    $.ajax({
        url: url + "?classname=" + classname + "&method=" + method + "&ran=" + Math.random() + "&jddreqtk=" + token,
        type: "POST",
        dataType: "text",
        data: data1,
        success: function (contenxt) {
            closeWaitProcess();
            var data = eval("(" + contenxt + ")");
            if (data.State.Success != undefined && data.State.Success != null && !data.State.Success) {
                if (data.State == null || data.State == undefined) { return; }
                if (data.State.Errkey == "isLoginOut") {
                    return;
                }
                if (data.State.Errkey == "otherLoginOut") {
                    return;
                }
                if (data.State.Errkey == "relogin") {
                    return;
                }
            }

            if (success != undefined & success != null) {
                success(data);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            closeWaitProcess();
            if (complete != null && complete != null) {
                complete(XMLHttpRequest, textStatus);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            closeWaitProcess();
            if (complete != null && complete != null) {
                error(XMLHttpRequest, textStatus, errorThrown);
            }
        }
    });
}
//同步Ajax请求
function postSynRequest(url, data, classname, method) {
    var token = "";
    if (url.toLowerCase().indexOf("/services/basicservice.aspx") >= 0) {
        if (classname != "Common" || method != "GetRequestToken") {
            token = getRequestToken(url, classname, method);
        }
    }
    var result = $.ajax({
        url: url + "?classname=" + classname + "&method=" + method + "&ran=" + Math.random() + "&jddreqtk=" + token,
        data: data,
        async: false, type: "POST"
    });
    return eval("(" + result.responseText + ")");
}

//获取请求token
function getRequestToken(url, classname, method) {
    return "123";
    //var name = classname + method;
    //var result = $.ajax({
    //    url: "/services/basicservice.aspx?classname=Common&method=GetRequestToken&ran=" + Math.random() + "&name=" + name,
    //    data: null,
    //    async: false, type: "POST"
    //});
    //return eval("(" + result.responseText + ")");
}

/*
    功能说明:AJAX向服务器端传送数据 (可以传送文件)
    参数说明:
            form 页面Form对象
            success:调用成功返回的函数   注:成功调用后返回结果
            error:错误时调用的函数
            complete:完成调用的函数
*/
function ajaxSubmit($form, success, error, complete) {
    if ($form.ajaxSubmit) {
        $form.ajaxSubmit({
            dataType: "json",
            success: function (json, statusText, xhr, $form) {
                var json = json || {};
                success(json);
            },
            complete: function (responseText, statusText, xhr, $form) {
                if (complete != null && complete != undefined && $.isFunction(complete)) {
                    complete(responseText, statusText, xhr);
                }
            }
        });
    }
    else {
        throw ("not load jquery.form.js");
    }
}

//函数说明： 同步调用通过XML文件
//参数说明： 1:接收URL； 2: 参数XML
function xmlhttpPost(url, xml) {
    try {
        var xmlhttp = null
        if (window.XMLHttpRequest) { //IE7, Mozilla ,Firefox 等浏览器内置该对象
            xmlhttp = new window.XMLHttpRequest();
        } else if (window.ActiveXObject) { //IE6、IE5
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {; }
            if (xmlhttp == null)
                try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {; }
        }
        var xmldoc = new ActiveXObject("Msxml2.DOMDocument")
        xmlhttp.open("POST", url, false)
        xmlhttp.send(xml)
        xmldoc.loadXML(xmlhttp.responseText);
        xmlhttp = null;
        window.setTimeout(CollectGarbage, 100);
        return xmldoc
    }
    catch (e) {
        alert(e.message)
        alert("您的浏览器不支持域访问数据资源!\n \n首先请退出系统,打开IE浏览器,选择Internet选项,找到安全选项,\n\n然后点击自定义级别,找到选项通过域访问数据资源,选择启用!\n\n")
        return null
    }
}

//函数说明： //客户端代码读取数据
//参数说明： 1 ： 查询SQL
function ExecuteDatasetSql(MySQL) {
    var sURL = AppPath + "/PublicService/PublicService.aspx"
    var xml = "<root FunName='ExecuteDatasetSql' MySQL='" + escape(MySQL) + "'/>"
    var objxmldoc = xmlhttpPost(sURL, xml)
    return objxmldoc
}


//弹出进度显示条 锁定界面
function popWaitProcess(title, context) {
    try {
        //var win = $.messager.progress({
        //    title: title,
        //    msg: context
        //});
        top.document.getElementById('divLoading').style.display = 'block';
        //$(top.ducument).find("#divLoading").show();
    } catch (e) { }
}

//关闭进度显示条
function closeWaitProcess() {
    try {
        //if ($.messager == null || $.messager == undefined) return;
        //$.messager.progress('close');
        top.document.getElementById('divLoading').style.display = 'none';
        //$(top.ducument).find("#divLoading").hide();
    } catch (e) { }
}

///js 格式化日期的函数
Date.prototype.format = function (format) {
    var o =
        {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(),    //day
            "h+": this.getHours(),   //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
            "S": this.getMilliseconds() //millisecond
        }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

///将字符串转化为日期格式
function ConvertToDate(datestr) {
    datestr = datestr.replace(/-/g, "/");
    var date = new Date(datestr);
}

///是否为时间格式
function isTime(str) {
    var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
    if (a == null) { return false; }
    if (a[1] > 24 || a[3] > 60 || a[4] > 60) { return false; }
    return true;
}

///是否是短日期.形如 (2008-07-22)
function isDate(str) {
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) return false;
    var d = new Date(r[1], r[3] - 1, r[4]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
}

///是否是长时间格式.形如 (2008-07-22 13:04:06)
function isDateTime(str) {
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    var r = str.match(reg);
    if (r == null) return false;
    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
}

///是否为数字
function isNumeric(oNum) {
    if (!oNum) return false;
    var strP = /^\d+(\.\d+)?$/;
    if (!strP.test(oNum)) return false;
    try {
        if (parseFloat(oNum) != oNum) return false;
    }
    catch (ex) {
        return false;
    }
    return true;
}

//取小数位
function roundFun(numberRound, roundDigit) {
    var digit;
    digit = 1;
    digit = Math.pow(10, roundDigit)
    return (Math.round(numberRound * digit) / digit);
}

///判断两个时间的差异
function getDateDiff(unit, fdate, sdate) {
    fdate = fdate.replace(/-/g, "/");
    sdate = sdate.replace(/-/g, "/");
    var date1 = new Date(fdate);
    var date2 = new Date(sdate);
    var timediff = Math.floor(Date.parse(date2) - Date.parse(date1));
    var result = 0;
    unit = unit.toLocaleLowerCase(unit);
    switch (unit) {
        case "y":                           ///年
            result = date2.getYear() - date1.getYear();
            break;
        case "m":                           ///月
            result = (date2.getYear() - date1.getYear()) * 12 + (date2.getMonth() - date1.getMonth());
            break;
        case "d":                           ///日
            result = Math.floor(timediff / 1000 / 60 / 60 / 24);
            break;
        case "h":                           ///小时
            result = Math.floor(timediff / 1000 / 60 / 60);
            break;
        case "mi":                          ///分钟
            result = Math.floor(timediff / 1000 / 60);
            break;
        case "s":                           ///秒
            result = Math.floor(timediff / 1000);
            break;
    }
    return result;
}

//是否是手机号码
function isMobil(oNum) {
    if (!isNumeric(oNum)) {
        return false;
    }
    if (oNum.length != 11) {
        return false;
    }
    if (oNum.substring(0, 1) != "1") {
        return false;
    }
    return true;
}

//是否为电话号码
function isTel(oNum) {
    var pattern = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/;
    if (!pattern.test(oNum)) {
        return false;
    } else {
        return true;
    }
}

//是否邮箱号码
function isEmail(oNum) {
    reg = new RegExp('^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-z][a-z.]{2,8}$');
    return reg.test(oNum);
}

//字符串的长度
function getStrLen(str) {
    return str.length;
};

//是否包含汉字
function isContainChina(str) {
    if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
        return true;
    }
    return false;
}

///字符串是否为空
function isEmpty(str) {
    if (str == "") { return true; }
    return false;
}

//格式化时间形如Date(1722000)
function formatDateStr(str, format) {
    if (str == undefined || str == null) {
        return str;
    }
    if (str.substring(0, 6) != "/Date(") {
        return str;
    }
    if (!isNumeric(str.toString().substring(7, str.length - 2))) {
        return str;
    }
    var Cdate = new Date(parseInt(str.toString().substring(6, str.length - 2)));
    if (Cdate.getFullYear() < 100) { return ""; }
    if (format == null || format == undefined) {
        format = "yyyy-MM-dd hh:mm:ss"
    }
    return Cdate.format(format);
}

///是否邮政编码
function isPostalCode(s) {
    var patrn = /^[a-zA-Z0-9 ]{3,12}$/;
    if (!patrn.exec(s)) return false;
    return true;
}

///将指定时间加n天
///datestr 指定日期 类型:字符串 格式:2012-11-22 10:20
///days 增加天数 类型:整形
function addFixedDay(datestr, days) {
    datestr = datestr.replace("-", "/");
    var curdate = new Date(datestr);
    var uom = new Date(curdate - 0 + days * 86400000)
    return uom.format('yyyy-MM-dd hh:mm:ss')
}

//获取时间部分 part:year,minute,
function getDatePart(str, part) {
    if (str == undefined || str == null) { return 0; }
    var Cdate = new Date(parseInt(str.toString().substring(6, str.length - 2)));
    switch (part) {
        case "year":
            return Cdate.getFullYear();
            break;
        case "month":
            return myDate.getMonth();
            break;
        case "day":
            return myDate.getDate();
            break;
        case "week":
            return Week[myDate.getDay()];
            break;
        case "hour":
            return myDate.getHours();
            break;
        case "minute":
            return Cdate.getMinutes();
            break;
        case "second":
            return myDate.getSeconds();
            break;
    }
}

///格式化当前时间
function formatCurDate(format) {
    var Cdate = new Date();
    if (format == null || format == undefined || format == "") {
        format = "yyyy-MM-dd hh:mm:ss"
    }
    return Cdate.format(format);
}

//弹出对话框
function showWindowDialog(options, e, kind, menuname) {
    var retVal = null;
    if (kind == undefined || kind == null) { kind = 1; }
    var settings = {
        url: "",
        srcWinArg: {},
        width: "300px",
        height: "350px",
        winFeature: {
            resizable: "yes",
            top: 0,
            left: 0,
            toolbar: "no",
            menubar: "no",
            scrollbars: "no",
            help: "no",
            location: "no",
            status: "yes"
        }
    };
    var winRetVal = null;
    $.extend(settings, options);

    var winfeature = "";
    for (var pro in settings.winFeature) {
        winfeature += pro + ":" + settings.winFeature[pro] + ";";
    }
    var bver = getbrowerverion();
    if (bver == "ie6.0") {
        settings.height = parseFloat(settings.height) + 60;
        if (settings.height > 500) { settings.height = settings.height + 10; }
        settings.width = parseFloat(settings.width) + 10;
        settings.height = settings.height.toString() + "px";
        settings.width = settings.width.toString() + "px";
    }
    var dlgLeft = 1024 / 2 - parseInt(settings.width) / 2;
    var dlgTop = 800 / 2 - parseInt(settings.height) / 2;
    winfeature += "dialogHeight:" + settings.height + ";dialogWidth:" + settings.width + ";dialogLeft:" + dlgLeft.toString() + "px;dialogTop:" + dlgTop.toString() + "px;"
    try {
        if (kind == 1) {
            retVal = window.showModalDialog(settings.url, settings.srcWinArg, winfeature);
            try {
                if (retVal != undefined && retVal != null && retVal.toString() == "close") {
                    window.close();
                }
            } catch (e) { }
        } else {
            window.open(settings.url, menuname, "height=" + settings.height + ",width=" + settings.width + ",top=" + dlgTop.toString() + ",left=" + dlgLeft.toString() + ",toolbar=no,menubar=no,scrollbars=yes,resizable=no, location=no,status=no");
        }
    } catch (e) {
        alert("打开窗体失败!可能是浏览器设置的问题!");
        return null;
    }
    return retVal;
}

///获取浏览器版本
function getbrowerverion() {
    var result = "";
    if ($.browser.msie) { result = "ie" + $.browser.version; }
    if (result == "ie7.0") {
        if (!!document.documentMode) { result = "ie8.0"; }
    }
    return result;
}

///从树里删除节点
function deltreedatabyids(treename, ids) {
    var datas = ids.split(",");
    for (var i = 0; i < datas.length; i++) {
        var nd = $('#' + treename).tree('find', datas[i]);
        if (nd != null && nd != undefined) {
            $('#' + treename).tree('remove', nd.target);
        }
    }
}

///加载新节点到树里
function addtreedata(treename, nodes, keyfield, textfield, parentfield, onlyroot) {
    var node = null;
    var pnd = null;
    var nd = null;
    for (var i = 0; i < nodes.length; i++) {
        node = nodes[i];
        pnd = $("#" + treename).tree("find", node[parentfield]);
        if (pnd == null && onlyroot) {
            pnd = $("#" + treename).tree("getRoot");
        }
        nd = $("#" + treename).tree("find", node[keyfield]);
        if (nd == null || nd == undefined) {
            $('#' + treename).tree('append', {
                parent: (pnd ? pnd.target : null),
                data: [{
                    id: node[keyfield],
                    text: node[textfield],
                    checked: true
                }]
            });
        } else {
            nd.text = '<span style="font-weight:bold">' + node[textfield] + '</span>';
            $('#' + treename).tree('update', nd);
        }
    }
}
/*
    功能说明:获取EXCEL第一行的资料
    参数说明:
            filePath:EXCEL文件路径
    返回结果:{ cols: cols, result: result } cols：Excel列集合;result:是否成功
*/
function GetExcelCols(filePath) {
    var cols = new Array();
    var result = false;
    var tempStr = "";
    var oXL = null;
    try {
        oXL = new ActiveXObject("Excel.application");
        var oWB = oXL.Workbooks.open(filePath);
        oWB.worksheets(1).select();
        var oSheet = oWB.ActiveSheet;
        var col = 1;
        while (true) {
            tempStr = oSheet.Cells(1, col).value;
            col = col + 1;
            if (tempStr == undefined || tempStr == null || tempStr == "") { break; }
            cols.push({ key: tempStr, value: tempStr });
        }
        result = true;
    } catch (e) {
        result = false;
        if (oXL != null) { oXL.Quit(); }
    }
    CollectGarbage();
    return { cols: cols, result: result };
}

/*
    函数功能 将一个数组转换为字符串  转换后的数据传给服务器,服务器接受到数据后转换为DataTable
    函数参数:
            arrs 需要转化的数组
            colstr:指定需要转的属性,(如果为NULL 或者为空，则是全部属性  形如 "id,name,sex" 如果为空则显示所有属性
    返回结果:
            第一行:为列名,从第二行开始为数据
*/
function formatarraytoserver(arrs, colstr) {
    var colsplit = "@@@";                                     ///列分隔符
    var rowsplit = "^^^";                                     ///行分隔符
    var coldata = "";
    var cols = new Array();
    if (arrs.length == 0) { return ""; }

    ///获取列名
    if (colstr == undefined || colstr == null || colstr == "") {
        var obj = arrs[0];
        for (pro in obj) {
            if (coldata != "") {
                coldata = coldata + colsplit;
            }
            coldata = coldata + pro.toString();
            cols.push(pro.toString());
        }
    } else {
        cols = colstr.split(",");
        for (var i = 0; i < cols.length; i++) {
            if (coldata != "") {
                coldata = coldata + colsplit;
            }
            coldata = coldata + cols[i].toString();
        }
    }

    var rowdata = "";
    var datastr = "";
    var str = "";
    for (var i = 0; i < arrs.length; i++) {
        rowdata = "";
        for (var j = 0; j < cols.length; j++) {
            if (arrs[i][cols[j]] == null || arrs[i][cols[j]] == undefined) {
                str = "";
            } else {
                str = arrs[i][cols[j]].toString();
                str = formatDateStr(str);
            }

            str = str.replace("@@", "@@ ");
            str = str.replace("^^", "^^ ");
            if (rowdata != "") { rowdata = rowdata + colsplit; }
            rowdata = rowdata + str;
        }
        if (i > 0) { datastr = datastr + rowsplit; }
        datastr = datastr + rowdata;
    }

    if (datastr != "") {
        datastr = coldata + rowsplit + datastr;
    } else {
        datastr = coldata;
    }
    return datastr;
}

/*
        功能说明:如果Session记录丢失时的处理方法
*/
var nologininfor = function () {
    var czy = $("#hid_czy").val();
    if (czy != "") {
        var result = showWindowDialog({ url: "/Login/LoginPop?czy=" + czy + "&r=" + Math.random(), width: "400px", height: "280px" });
    } else {
        alert('您还没有登陆系统！');
        window.location.href = '/Login/Login';
    }
}

/*
        功能说明:提示用户已在别处登陆
*/
var otherlogininfor = function () {
    alert('您已经在别处登陆系统,请重新登陆！');
    window.location.href = '/Login/Login';
}

/*
        功能说明:网页body单击事件 点击标签时 关联单选框和复选框
*/
var bodyclick = function (e) {
    try {
        var forid = $(e.target).attr("for");
        if (forid == undefined || forid == null || forid == "") { return; }
        if ($("#" + forid).is(':disabled')) { return; }
        var typename = $("#" + forid).attr("type");
        if (typename == "radio") {
            $("#" + forid).attr("checked", true);
            $("#" + forid).click();
        } else {
            $("#" + forid).attr("checked", !$("#" + forid).is(':checked'));
        }
    } catch (e) { }
}


//function openWin(url, width, height, div) {
//    if (div == undefined || div == "") {
//        div = "pwin";
//    }
//    var win = $(top.document).find("." + div);
//    var divtop = ($(top.document).height() - height) / 2;
//    var divleft = ($(top.document).width() - width) / 2;
//    $(win).css('width', width + "px");
//    $(win).css('height', height + "px");
//    $(win).css('top', divtop + "px");
//    $(win).css('left', divleft + "px");
//    //win.style.width = width + "px";
//    //win.style.height = height + "px";
//    //win.style.top = divtop + "px";
//    //win.style.left = divleft + "px";
//    //win.style.width = "100px";
//    //win.style.height = "100px";
//    //win.style.display = 'block';
//    $(win).show();
//    $(win).find('iframe').remove();
//    var winobj = $('<iframe src="' + url + '" width="100%" height="' + height + '" name="win"  scrolling="yes" frameborder="0" style="float:left"></iframe>');
//    $(win).prepend(winobj);
//    $(winobj).load(function () {
//        var obj = this;
//        $(obj.contentDocument).find("input[type='text']").live('click', function () {
//            $(obj.contentDocument).find('.note_no').remove();
//            $(obj.contentDocument).find(".errorborder").removeClass('errorborder');
//        });
//        $(obj.contentDocument).find("input[type='radio']").live('click', function () {
//            $(obj.contentDocument).find('.note_no').remove();
//            $(obj.contentDocument).find(".errorborder").removeClass('errorborder');
//        });
//        $(obj.contentDocument).find("input[type='checkbox']").live('click', function () {
//            $(obj.contentDocument).find('.note_no').remove();
//            $(obj.contentDocument).find(".errorborder").removeClass('errorborder');
//        });
//        $(obj.contentDocument).find("textarea").live('click', function () {
//            $(obj.contentDocument).find('.note_no').remove();
//            $(obj.contentDocument).find(".errorborder").removeClass('errorborder');
//        });
//        $(obj.contentDocument).find("select").live('click', function () {
//            $(obj.contentDocument).find('.note_no').remove();
//            $(obj.contentDocument).find(".errorborder").removeClass('errorborder');
//        });
//    });

//    //$(winobj).load(function () {
//    //    var width1 = $(this.contentDocument).width();
//    //    var height1 = $(this.contentDocument).height();
//    //    var divtop1 = ($(top.document).height() - height1) / 2;
//    //    var divleft1 = ($(top.document).width() - width1) / 2;
//    //    win.style.width = width1 + "px";
//    //    win.style.height = height1 + "px";
//    //    win.style.top = divtop1 + "px";
//    //    win.style.left = divleft1 + "px";
//    //    $(this).attr('height', height);
//    //    $(this).attr('scrolling', "yes");
//    //});
//    //top.document.getElementById('fade').style.display = 'block';
//    $(top.document).find("." + div + "_black").show();
//}


//deduleId: 1.房态图 2.住客 3.预订 4.报表 5.夜审 6.设置 7．非住客账 8.会员
//function RefreshParentWin(moduleId, div) {
//    if (moduleId == 6) {
//        top.main.set_main.window.location.reload();
//    }
//    else {
//        top.main.window.location.reload();
//    }
//    closeWin(div);
//}

//function closeWin(div) {
//    if (div == undefined || div == "") {
//        div = "pwin";
//    }
//    var black = $(top.document).find("." + div + "_black");
//    $(black).hide();
//    var win = $(top.document).find("." + div);
//    //win.style.display = 'none';
//    $(win).hide();
//}

//控件后面显示提示
function showTips(type, inputId, message) {
    if (type == 1) {//正确提示
        $("#" + inputId).parent().find(".formTips").remove();
        $("#" + inputId).after('<span class="formTips note">' + message + '</span>');
    }
    else if (type == 2) {//输入提示
        $("#" + inputId).parent().find(".formTips").remove();
        $("#" + inputId).after('<span class="formTips prompt">' + message + '</span>');
    }
    else if (type == 3) {//错误提示
        if ($.type(inputId) == 'string') {
            $("#" + inputId).parent().find(".formTips").remove();
            $("#" + inputId).after('<span class="formTips note_no">' + message + '</span>');
            $("#" + inputId).addClass('errorborder');
        }
        else {
            $(inputId).parent().find(".formTips").remove();
            $(inputId).after('<span class="formTips note_no">' + message + '</span>');
            $(inputId).addClass('errorborder');
        }
    }
}
//集中在div中显示提示
function showTipsCollect(type, divId, message, inputId) {
    if (type == 1) {//正确提示
        $("#" + divId).append('<span class="formTips note">' + message + '</span>');
    }
    else if (type == 2) {//输入提示
        $("#" + divId).append('<span class="formTips prompt">' + message + '</span>');
    }
    else if (type == 3) {//错误提示
        $("#" + divId).append('<span class="formTips note_no">' + message + '</span>');
        //alert($.type(inputId));
        if ($.type(inputId) == 'string') {
            $("#" + inputId).addClass('errorborder');
        }
        else {
            $(inputId).addClass('errorborder');
        }
    }
}

function getQueryParam(name) {
    var arrLoca = window.location.href.toString().split('?');
    if (arrLoca.length <= 1) {
        return "";
    }
    //var params = arrLoca[1].toLowerCase();
    var params = arrLoca[1];
    var arrParams = params.split("&");
    for (var i = 0; i < arrParams.length; i++) {
        var index = arrParams[i].indexOf("=");
        var pName = arrParams[i].substring(0, index);
        if (pName == name) {
            return unescape(arrParams[i].substring(index + 1, arrParams[i].length));
        }
    }
    return "";
}

function getRadioValue(name) {
    var res = "";
    $("input[name='" + name + "']").each(function () {
        if ($(this).attr("checked") == "checked") {
            res = $(this).val();
            return false;
        }
    });
    return res;
}

function setRadioValue(name, val) {
    $("input[name='" + name + "']").each(function () {
        if ($(this).val() == val) {
            $(this).attr("checked", "checked")
            return false;
        }
    });
}

function checkSelected() {
    var checked = false;
    $("input[name='ids']").each(function (e) {
        if (this.checked == true) {
            checked = true;
            return true;
        }
    });
    return checked;
}

function checkSelectedByName(name) {
    var checked = false;
    $("input[name='" + name + "']").each(function (e) {
        if (this.checked == true) {
            checked = true;
            return true;
        }
    });
    return checked;
}

function getSelected() {
    var ids = "";
    $("input[name='ids']").each(function (e) {
        if (this.checked == true) {
            ids += this.value + ",";
        }
    });
    if (ids != "") {
        ids = ids.substring(0, ids.length - 1);
    }
    return ids;
}

function getSelectedByName(name) {
    var ids = "";
    $("input[name='" + name + "']").each(function (e) {
        if (this.checked == true) {
            ids += this.value + ",";
        }
    });
    if (ids != "") {
        ids = ids.substring(0, ids.length - 1);
    }
    return ids;
}

function checkAll(o) {
    var checked = o.checked;
    $("input[name='ids']").each(function (e) {
        this.checked = checked;
    });
}

function checkAllByName(o, name) {
    var checked = o.checked;
    $("input[name='" + name + "']").each(function (e) {
        this.checked = checked;
    });
}
///获取Url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

//停止事件往上传递
//function cancelEvent(event) {
//    if (event.stopPropagation) { // this code is for Mozilla and Opera
//        event.stopPropagation();
//    } else if (window.event) { // this code is for IE
//        window.event.cancelBubble = true;
//    }
//}

//根据身份证获取出生日期
function getBirthdayByCardNo(CardNum) {
    var sub = CardNum.substring(6, 14);
    return sub.substring(0, 4) + "-" + sub.substring(4, 6) + "-" + sub.substring(6, 8);
}

function getPageWitdh(pagekind) {
    var width = 800;
    switch (pagekind) {
        case 0:
            width = width * 1;
            break;
        case 1:
            width = Math.floor(width * 1.04);
            break;
        case 2:
            width = Math.floor(width * 0.52);
            break;
        case 3:
            width = Math.floor(width * 0.37);
            break;
        case 4:
            width = Math.floor(width * 0.27);
            break;
    }
    return width;
}

function noNumbers(e) {
    var keynumvar, keycharvar, numcheck;
    if (window.event) // IE
    {
        keynum = e.keyCode
    }
    else if (e.which) // Netscape/Firefox/Opera
    {
        keynum = e.which
    }
    return keynum;
    //keychar = String.fromCharCode(keynum)
    //numcheck = /d/;
    //return !numcheck.test(keychar)
}