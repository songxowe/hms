<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp"%>
    <link href="${pageContext.request.contextPath }/resources/css/main.css" type="text/css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/resources/css/tch.css" type="text/css" rel="stylesheet">
</head>
<body>
<div class="fangjian">
    <div class="line">编辑房间</div>
    <ul>

        <li>
            <label>房号：</label>
            <input type="text" value="${room.roomNo}" id="RoomNo" maxlength="10" disabled="disabled" class="disabledcolor" />
            <input type="hidden" value="${room.roomId}" id="roomId">
            <input type="hidden" value="${room.roomStatus}" id="roomStatus">
        </li>
        <li>
            <label>楼层：</label>
            <select id="FloorId" style="width: 194px">

            </select>
        </li>
        <li>
            <label>房型：</label>
            <select id="RoomTypeId" style="width: 194px">
            </select>
        </li>

        <c:if test="${room.otherOne eq '停用'}">
            <li id="listatus">
                <label>状态</label>
                <input type="radio" id="otherOne"  name ="otherOne" value="0" class="radio" /><em>使用</em>
                <input type="radio" id="otherOne" name ="otherOne" value="1" class="radio"  checked="checked"/><em>停用</em>
            </li>
        </c:if>
        <c:if test="${room.otherOne eq '使用'}">
            <label>状态</label>
            <input type="radio" id="otherOne" name ="otherOne" value="0" class="radio" checked="checked" /><em>使用</em>
            <input type="radio" id="otherOne" name ="otherOne" value="1" class="radio" /><em>停用</em>
        </c:if>

        <li>
            <label>备注：</label><textarea id ="roomRemark" rows="8" cols="40" id="Description">${room.roomStatus}</textarea
        ></li>
        <li>
            <label>&nbsp;</label>
            <input type="button" id="roomSave" value="保存" onclick="roomSave()" class="bus_add" />
        </li>
    </ul>
</div>


<script>
    $(function(){
        //页面加载是 加载下拉列表
        $.ajax({
        type: "POST",
        url: "../../findFloorAndRoomTypeJson",
        success: function (data) {
            if (data) {
               // alert("findFloorAndRoomTypeJson()...返回data");
               // alert(data.floor);
                var secsed = "";
                var floorTest = "<option value=\"-1\">请选择楼层</option>";
                var roomTypeTest = "<option value=\"-1\" >请选择房型</option>";

                //下拉列表 楼层
               $.each(data.floor,function (i) {
                    if(${room.floor.floorId} == data.floor[i].floorId ){
                       secsed += "selected";
                   }
                   floorTest += "<option "+secsed+" value="+data.floor[i].floorId+ " >"+data.floor[i].floorId+"</option>";
                   secsed = "";
               }),
                   //下拉列表 房型
               $.each(data.roomType,function (i) {
                  // alert("房型"+data.roomType[i].roomTypeName)
                   if (${room.roomType.roomTypeId} ==data.roomType[i].roomTypeId ){
                       secsed += "selected";
                   }
                   roomTypeTest+="<option "+secsed+" value="+data.roomType[i].roomTypeId+">"+data.roomType[i].roomTypeName+"</option>";
                   secsed = "";
               })
                $("#FloorId").append(floorTest);
                $("#RoomTypeId").append(roomTypeTest);

                //alert("tingyong.............")

            }
        },
        dataType: "JSON"
    })

    })



    //按钮保存时间
    function roomSave() {

       // alert("roomSave().click()......")
       $.ajax({
            type: "POST",
            url: "../../editRoom",
            data: {
                "roomId":$.trim($("#roomId").val()),
                "roomNo":$("#RoomNo").val(),
                "floor.floorId":$.trim($("#FloorId").val()),
                "roomType.roomTypeId":$.trim($("#RoomTypeId").val()),
                "roomRemark":$("#roomRemark").val(),
                "roomStatus":$("#roomStatus").val(),
                "otherOne":$("otherOne").val()
            },
            dataType: "JSON",
            success:function (data) {
                if (data.success) {
                   // alert("--------------")
                    $(function () {
                        $.messager.alert("操作提示", "操作成功！");
                    });
                    $("#win").window("close", true);
                }
            },
            error :function (msg) {
                console.log("系统错误请与管理员联系", msg)
            }
        })
    }


</script>
</body>
</html>

