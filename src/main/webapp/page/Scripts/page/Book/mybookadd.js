function datetostr(date) {
    var y = date.getFullYear()
    var m = date.getMonth()+1
    var d = date.getDate()
    if(m<10)
        m = "0"+m
    if(d < 10)
        d = "0"+d
    var strdate = y+"-"+m+"-"+d
	return strdate
}
$(function () {
	//初始时间
	var now = new Date()

	$("#EnterDate").val(datetostr(now))
    $("#EnterDate").attr("min",datetostr(now))
	now.setDate(now.getDate()+1)

    $("#LeaveDate").attr("min",datetostr(now))
    $("#LeaveDate").val(datetostr(now))
	//改变时间
    $("#EnterDate").change(function () {
		if($("#EnterDate").val()>= $("#LeaveDate").val()){
			var d = new Date($("#EnterDate").val())
			d.setDate(d.getDate()+1)
            $("#LeaveDate").val(datetostr(d))
		}
        $("#LeaveDate").attr("min",$("#EnterDate").val())
        $("#roomTypes ul").each(function () {
            var tid = $(this).find("li:eq(0) select").val()
            //alert(tid)
            getcount($(this).find("li:eq(0) select"),tid)
        })
        changekeeptime()

        /*$("#roomTypes ul").each(function () {
            var tid = $(this).find("li:eq(0) select").val()
            alert(tid)
            //getcount($(this).find("li:eq(0) select"),tid)
        })*/
    })
    //改变流放时间
    $("#ExpireDate").blur(function () {
        var t = $("#ExpireDate").val()
        if(t<"12:00"){
            $("#ExpireDate").val("12:00")
        }
    })

    jiazailast()

	//删去房间
    $("#roomTypes").on("click","ul .delRow",function () {
		$(this).parent().parent().remove()
    })
	//添加房间
    $("#roomTypes").on("click","ul .addRow",function () {

		//添加房间按钮
		var text = '';
		text = '<ul class="show_room" style="">\n' +
            '                <li style="margin-left: 10px; display: inline">\n' +
            '                    <select class="sel_roomType" style="width: 113px">\n' +
            '                    <option value="903" data-allowhour="true" data-starthourprice="100.00" data-memberstarthourprice="80.00" data-starthours="1.00" data-hoursroomcount="0.00">标准单间</option><option value="904" data-allowhour="false" data-starthourprice="0.00" data-memberstarthourprice="0.00" data-starthours="0.00" data-hoursroomcount="0.00">双人间</option><option value="905" data-allowhour="false" data-starthourprice="0.00" data-memberstarthourprice="0.00" data-starthours="0.00" data-hoursroomcount="0.00">豪华单间</option></select>\n' +
            '                </li>\n' +
            '                <li style="margin-left: 10px; display: inline">\n' +
            '                    <select class="sel_scheme" style="width: 180px;">\n' +
            '                    <option value="1319" data-roomtypeid="903" data-source="客人自入" data-schemetype="1">[无早]1默认方案</option><option value="1324" data-roomtypeid="903" data-source="客人自入" data-schemetype="1">[价格类型1]默认1</option></select>\n' +
            '                </li>\n' +
            '                <li>\n' +
            '                    <label style="width: 50px;">房价：</label><input value="0" type="text" style="width: 105px; color: #999;" disabled="disabled" name="Price" data-price="1.00"></li>\n' +
            '                <li>\n' +
            '                    <label style="width: 50px">房数：</label>\n' +
            '                    <input type="button" value="-" class="jia dec_room" style="margin-right: -1px;">\n' +
            '                    <input class="txt_roomCount" type="text" readonly style="width: 36px; text-align: center" value="0" data-entercount="0">\n' +
            '                    <input type="button" value="+" class="jia inc_room" style="margin-left: -1px;">\n' +
            '                </li>\n' +
            '                <li style="margin-left: 10px;">\n' +
            '                    <input class="dfjyd addRow" type="button" value="+">\n' +
            '                    <input class="dfjyd dfjydremove delRow" type="button" value="-" style="margin-left: 10px;">\n' +
            '                </li>\n' +
            '                <li style="margin-left: 10px;"><span class="bookable_count">可订<b>5</b>间</span>\n' +
            '                </li>\n' +
            '            </ul>';
		$("#roomTypes").append(text)
        jiazailast()

    })
	
	//增加房间数
    $("#roomTypes").on("click","ul .inc_room",function () {
		var num = $(this).parent().find("input:eq(1)").val()
		var max = $(this).parent().parent().find("li .bookable_count b").text()
		num ++
        if(num>parseInt(max))
            num =max
        $(this).parent().find("input:eq(1)").val(num)
    })
	//减少房间数
    $("#roomTypes").on("click","ul .dec_room",function () {
        var num = $(this).parent().find("input:eq(1)").val()
        //var max = $(this).parent().parent().find("li .bookable_count b").text()
        num --
        if(num<0)
            num =0
        $(this).parent().find("input:eq(1)").val(num)
    })
    //下拉框房型选择事件
    $("#roomTypes").on("change",".sel_roomType",function () {
        changetype(this)
        $(this).parent().parent().find("li:eq(1) select").change()
    })
    //下拉框房价方案选择事件
    $("#roomTypes").on("change",".sel_scheme",function () {
        changecase(this)
    })

    ///////////////////////////////////////
    /*************提交按钮******************/
    $("#btnSubmit").click(function () {
        //检测输入值合法性
        var flag = true
        $("#roomTypes ul").each(function () {
            var tid = $(this).find("li:eq(0) select").val()
            var count=0
            $("#roomTypes ul").each(function () {
                var t = $(this).find("li:eq(0) select").val()
                if(t==tid){
                    count++
                }
            })

            if(count>1){
                flag=false
            }
            /*if($(this).find("li:eq(3) input:eq(1)").val()==0){
                alert(33)
            }*/
        })
        if(flag==false){
            alert("有相同房型项")
            return
        }


        var book = {}
        var bookRooms = []
        var _list = {}
        $("#roomTypes ul").each(function () {
            var br = {}
            br.roomCaseId = $(this).find("li:eq(1) select").val()
            br.roomTypeId = $(this).find("li:eq(0) select").val()
            br.roomAmount = $(this).find("li:eq(3) input:eq(1)").val()
            if(br.roomAmount!=null&&br.roomAmount>0){
                bookRooms.push(br)
            }
        })
        for(i in bookRooms){
            for(k in bookRooms[i]){
                if("roomCaseId"==k.toString()){
                    _list["bookrooms[" + i + "].roomCase."+k.toString()] = bookRooms[i][k]
                }else if("roomTypeId"==k.toString()){
                    _list["bookrooms[" + i + "].roomType."+k.toString()] = bookRooms[i][k]
                }else {
                    _list["bookrooms[" + i + "]."+k.toString()] = bookRooms[i][k]
                }
            }
        }
        _list["booker"] =$("#Name").val()
        _list["bookPhone"] =$("#Phone").val()
        _list["webbookId"] =$("#WebNo").val()
        _list["assureType"] =$("#WarrantMethod").val()
        _list["memberId"] =$("#CategoryName").val()
        _list["comeTime"] =$("#EnterDate").val()+" 12:00:00"
        _list["leaveTime"] =$("#LeaveDate").val()+" 13:00:00"
        _list["keepTime"] =$("#EnterDate").val()+" "+$("#ExpireDate").val()+":00"
        _list["checkType"] =$("#OpenType").val()
        _list["guestType"] =$("#Source").val()
        _list["payType"] =$("#PayMented").val()
       // _list["operater"] =$("#Name").val()
        _list["subscription"] =$("#Amount").val()
        _list["diyId"] =$("#ManualNumber").val()
        _list["bookRemark"] =$("#Remark").text()
        _list["bookStatus"] ="已预定"
        $.ajax({
            url:'../../checkinfoController_book',
            type:"POST",
            data:_list,
            dataType:"json",

            success:function (data) {
                if(data==0){
                    //失败
                    alert("未知错误")
                }else if(data==1){
                    //成功  关闭此窗口

                    //alert("成功")
                    $("#btnClose").click()
                }else if(data==2){
                    //验证失败
                    alert("与已有预定信息冲突")
                }
            }

        })

    })

    $("#btnClose").click(function () {
//关闭代码
        var index = parent.layer.getFrameIndex(window.name);
        window.location.href = "../../findAllRoom";
        parent.layer.close(index);
    })

})
//获取可定房间数
function getcount(which,typeid) {


    $.ajax({
        url:'../../checkinfoController_getRoomCount',
        type:"POST",
        data:{
            roomTypeId:typeid,
            comeTime:$("#EnterDate").val()+" 12:00:00",
            leaveTime:$("#LeaveDate").val()+" 13:00:00"
        },
        dataType:"json",

        success:function (data) {
            $(which).parent().parent().find(".bookable_count b").text(data)
            var num = $(this).parent().parent().find("li:eq(3) input:eq(1)").val()
            if(num>data)
                $(which).parent().parent().find("li:eq(3) input:eq(1)").val(data)


        }

    })


}
/*//修改流放时间
function changekeeptime() {
    var intime = $("#EnterDate").val()
    var indate = new Date(intime)
    alert(33)
    alert($("#ExpireDate").val())

}*/

//下拉框房型选择事件
function changetype(which) {
    var typeid = $(which).val()

    var cases = []
    $.ajax({
        url:'../../checkinfoController_getRoomCases',
        type:"POST",
        data:{
            roomTypeId:typeid
        },
        dataType:"json",
        success:function (data) {
            var cases = data

            var caseoptions = ''

            for(i in cases){
                caseoptions += '<option weekendPrice="'+cases[i].weekendPrice+'" ordinaryPrice="'+cases[i].ordinaryPrice+'" value="'+cases[i].roomCaseId+'">'+cases[i].roomCaseName+'</option>'
            }
            $(which).parent().parent().find("li:eq(1)").find("select").empty().append(caseoptions)

            //加载房型数量
            var roomnum = getcount(which,typeid);

            $(which).parent().parent().find(".bookable_count b").text(roomnum)
            var num = $(this).parent().parent().find("li:eq(3) input:eq(1)").val()
            if(num>roomnum)
                $(which).parent().parent().find("li:eq(3) input:eq(1)").val(roomnum)

        }

    })


    //更新价格
    var  price
    //$(which).parent().parent().find("li:eq(1)").find("select").find("option:eq(0)").attr("selected",true)
    //changecase($(which).parent().parent().find("li:eq(1) select"))
}
//下拉框房价方案选择事件
function changecase(which) {
    var select = $(which).find("option:selected")

    //alert($(select).attr("weekendPrice"))
    var now = new Date()
    var price = $(select).attr("ordinaryPrice");

    if(now.getDay()==6||now.getDay()==0){
        if($(select).attr("weekendPrice")!='')
            price = $(select).attr("weekendPrice")
        }
        //alert("price:"+price)
    $(which).parent().parent().find("li:eq(2) input").val(price)
}


function jiazailast() {
        var last = $("#roomTypes ul:last")
    $.ajax({
        url:'../../checkinfoController_getRoomTypes',
        type:"POST",
        dataType:"json",
        success:function (data) {
            var types = data
            var options =''
            for( i in types){
                options += '<option value="'+types[i].roomTypeId+'">'+types[i].roomTypeName+'</option>'
            }
            $(last).find("li:eq(0)").find("select").empty().append(options)
            changetype($(last).find("li:eq(0)").find("select"))

            var s = $(last).find("li:eq(1)")

            changecase($(last).find("li:eq(1)").find("select"))

        }

    })


}