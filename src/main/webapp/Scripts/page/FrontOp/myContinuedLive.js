$(function () {
    $(".reduceDays").click(function () {
            var st = $("#Days").val()
            if(st==null){
                st = 0;
            }
            st = parseInt(st)-1
            if(parseInt(st)<0){
                st = 0;
            }
            $("#Days").val(st)
            changeday()
    }

    )
    $(".addDays").click(function () {
            var st = $("#Days").val()
            if(st==null){
                st = 0;
            }
            st = parseInt(st)+1
            if(parseInt(st)<0){
                st = 0;
            }
            $("#Days").val(st)
            changeday()
    }

    )
    $("#Days").change(function () {

        changeday()
    })

    $("#btnSubmit").click(function () {
        var withgroup = false;

        if($("#groupId").val()!=null&&$("#groupId").val()!=""){
            if(confirm("当前入住为团体入住，是否给所有团体房间续房？")){
                withgroup = true;
            }
        }
        $.ajax({
            url:"addCheckinfo",
            type:"post",
            data:{
                addTime:$("#Days").val(),
                checkId:$("#checkId").val(),
                payType:$("#PayMethod").val(),
                prepay:$("#Deposit").val(),
                withgroup:withgroup
            },
            dataType:"json",
            success:function (data) {
                if(data==0){
                    alert("未知错误")
                }else if(data==1){
                    //alert("成功")
                    //window.location.href = "../../findAllRoom";
                }else if(data==2){
                    alert("与预定信息冲突")
                }
            }
        })
    })
})

function addDate(date,days){
    var d=new Date(date);
    d.setDate(d.getDate()+days);
    var month=d.getMonth()+1;
    var day = d.getDate();
    var hh = d.getHours();
    var min = d.getMinutes();
    if(month<10){
        month = "0"+month;
    }
    if(day<10){
        day = "0"+day;
    }
    if(hh<10){
        hh = "0"+hh;
    }
    if(min<10){
        min = "0"+min;
    }
    //var val = month+"/"+day+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
    var val = d.getFullYear()+"-"+month+"-"+day+" "+hh+":"+min
    return val;
}
function changeday() {

    var st = $("#Days").val()
    if(st==null){
        st = 0;
    }
    if(parseInt(st)<0){
        st = 0;
    }
    $("#Days").val(st)
    var oldtime = $("#WantLeaveDate").val()
    if ($.trim(oldtime) == '') {
        return false
    }
    var nd = $.trim(oldtime)
    var dandt = nd.split(' ')
    var d = dandt[0].split('-')
    var t = dandt[1].split(':')
    var py = d[0];
    var pm = d[1]-1;
    var pd = d[2];
    var ph = t[0];
    var pmt = t[1];
    var stayday = parseInt(st);
    var olddate = new Date(py,pm,pd,ph,pmt,0);
    $("#LeaveDate").val(addDate(olddate,stayday))
}
