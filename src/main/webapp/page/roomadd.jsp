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
    <div class="line">添加房间<span style="font-size: 12px; color: #f00; padding-left: 20px">说明：一次只能同时添加同一楼层同一房型的房间信息，中文房号尽量控制在5个字以内。</span></div>
    <ul>
        <li>
            <label>房号：</label>
            <input type="text" id="RoomNo" maxlength="10" style="width: 132px" />
           <%-- <input type="button" value="+" class="butn" onclick="AddRoom();"  id="add"/></li>--%>
        <li class="roomlist">
            <input type="hidden" id="hdRoomNos" />
        </li>

        <li>
            <label>楼层：</label>
            <select id="floor">
               <option  value="-1">请选择楼层</option>
                <c:forEach var="floor" items="${requestScope.floors}">
                    <option value="${floor.floorId}">${floor.floorId}</option>
                </c:forEach>
            </select>
        </li>
        <li>
            <label>房型：</label>
            <select id="roomType">
                <option value="-1">请选择房型</option>
                <c:forEach var="roomtype" items="${requestScope.roomTypes}">
                    <option value="${roomtype.roomTypeId}">${roomtype.roomTypeName}</option>
                </c:forEach>
            </select>
        </li>
        <li id="liFeature">
            <label>备注：</label>
            <textarea  rows="8" cols="40" id="roomRemark"></textarea>
        </li>

        <li>
            <label>&nbsp;</label>
            <input type="button" value="保存" class="bus_add" id="btnSave" />
        </li>
    </ul>
</div>

<script>
    $(function () {

        $("#btnSave").click(function () {
           // alert("btnSave()......")
            clear();
            var floorId = $("#floor").val();
            var  roomTypeId =$("#roomType").val();
          //  alert(floorId +"-----"+roomTypeId+"------------"+$.trim($("#RoomNo").val()))

            //判断房间号，楼层，房型是否有值
            if($.trim($("#RoomNo").val()) == ""){
               // alert("RoomNoisnull")
                $("#RoomNo").after('<span id = "temporary2" class="formTips note_no" style="color: red">' + "请输入房号！" + '</span>');
                return;
            }else  if (floorId == -1){
                //alert("flooridisnull")
                $("#floor").after('<span id = "temporary" class="formTips note_no" style="color: red">' + "请选择楼层号！" + '</span>');
                return;
            }else if(roomTypeId == -1){
               // alert("roomTypeisnull")
                $("#roomType").after('<span id = "temporary1" class="formTips note_no" style="color: red">' + "请选择房间类型！" + '</span>');
                return;
            }


            $.ajax({
                type: 'POST',
                url: "../../addRoom",
                data: {"roomNo":$.trim($("#RoomNo").val()),
                        "floor.floorId":floorId,
                        "roomType.roomTypeId":roomTypeId,
                        "roomRemark":$.trim($("#roomRemark").val())
                },
                success: function (data) {
                    if (data.success) {
                        $.messager.show({
                            title: "提示",
                            msg: "房间" + $.trim($("#RoomNo").val()) + "添加成功!",
                            timeout: 3000
                        });
                        $("#win").window("close", true);
                    }
                },
                dataType: "JSON"
            })


        })




    })

    function clear(){
        $("#temporary").remove();
        $("#temporary1").remove();
        $("#temporary2").remove();
    }
</script>
</body>
</html>

