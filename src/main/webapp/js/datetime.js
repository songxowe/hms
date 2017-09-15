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

function AddHours(date, hours) {
    var arrdt = date.split(" ");
    var dtDate = arrdt[0];
    var dtTime = arrdt[1];
    var arrTime = dtTime.split(":");
    var hour = parseInt(arrTime[0].replace(/^0/,'')) + parseInt(hours);
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



/***************获得某月的天数***************/
function getMonthDays(myMonth) {
    var now = new Date();//获取当前日期
    var nowYear = now.getYear();             //当前年  
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}

/***************获得本月的开始日期***************/
function getMonthStartDate() {
    var now = new Date();//获取当前日期
    var nowDay = now.getDate();              //当前日   
    var nowMonth = now.getMonth();           //当前月   
    var nowYear = now.getFullYear();             //当前年  
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return formatDate(monthStartDate);
}

/***************获得本月的结束日期***************/
function getMonthEndDate() {
    var now = new Date();//获取当前日期
    var nowDay = now.getDate();              //当前日   
    var nowMonth = now.getMonth();           //当前月   
    var nowYear = now.getFullYear();             //当前年  
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
    return formatDate(monthEndDate);
}

/***************JS获取指定日期的上个月的日期***************/
function getUpMonth(t) {
    var tarr = t.split('-');
    var year = tarr[0];                //获取当前日期的年
    var month = tarr[1];            //获取当前日期的月
    var day = tarr[2];                //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate();//获取当前日期中的月的天数

    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}

/***************JS获取指定日期的上个月的日期最后一天***************/
function getUpMonthLastDay(t) {
    var tarr = t.split('-');
    var year = tarr[0];                //获取当前日期的年
    var month = tarr[1];            //获取当前日期的月
    var day = tarr[2];                //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate();//获取当前日期中的月的天数

    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    if (day2 < 10) {
        day2 = '0' + day2;
    }
    day2=getMonthDays(month2)
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}

function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
}

