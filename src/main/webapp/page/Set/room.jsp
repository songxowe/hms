<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>简单点酒店管理平台</title>
    <%@ include file="../../commons/meta.jsp" %>
    <link href="${pageContext.request.contextPath }/resources/page/styles/main.css" type="text/css" rel="stylesheet"/>


</head>
<body>
<div class="main">
    <h1 class="room">房间信息<span>第一步添加楼层，第二步添加房型，第三步添加房间。</span></h1>
    <ul class="room">
        <li>
            <div class="l">楼层：</div>
            <div class="r floorlist">
                <div class="lines floorAll select" data-id="0"><span>全 部</span></div>

                <c:forEach var="floor" items="${requestScope.floors}">
                    <div class="lines flooritem"  data-id="13" onclick="menu_obj.findByFloor('${floor.floorId}')">
                        <span >${floor.floorId}</span>
                        <em class="edit" title="编辑" onclick="menu_obj.floorEdit('${floor.floorId}')"></em>
                        <em class="dell" title="删除" onclick="menu_obj.floorRemove('${floor.floorId}')"></em>
                    </div>
                </c:forEach>

                <div class="lines add">
                    <input type="button" value="+" class="butns" onclick="menu_obj.floorAdd('add')"/></div>
            </div>
        </li>

        <li>
            <div class="l">房型：</div>
            <div class="r roomtypelist">
                <div class="lines roomtypeAll select" data-id="0"><span>全 部</span></div>
                <c:forEach var="roomType" items="${requestScope.roomTypes}">
                    <div class="lines flooritem" data-id="13">
                        <span >${roomType.roomTypeName}</span>
                        <em class="edit" title="编辑" onclick="menu_obj.roomTypeEdit('${roomType.roomTypeId}')"></em>
                        <em class="dell" title="删除" onclick="menu_obj.roomTypeRemove('${roomType.roomTypeId}')"></em>
                    </div>
                </c:forEach>

                <div class="lines add">
                    <input type="button" value="+" class="butns"onclick="menu_obj.roomTypeAdd('add')"/></div>
            </div>
        </li>


        <li>
            <div class="l">房间：</div>
            <div class="r roomlist">

                <c:forEach var="room" items="${requestScope.rooms}">
                    <div class="rfj blue roomitem" data-id="5400">
                        <div class="rom">${room.roomNo}</div><div class="type">${room.roomType.roomTypeName}</div>
                        <em class="edit" title="编辑" onclick="menu_obj.roomEdit('${room.roomId}')"></em>
                        <em class="dell" title="删除" onclick="menu_obj.roomRemove('${room.roomId}')"></em>
                    </div>
                </c:forEach>

                <div class="rfj gray add">
                    <div class="adds" onclick="menu_obj.roomAdd('add')">+</div>
                </div>
            </div>
        </li>
    </ul>
    <div id="win"></div>
</div>

<script>
    $(function () {

        menu_obj = {
            //添加楼层信息
            floorAdd: function (state) {
               // alert("-------")
                var url = "../../page/flooradd.jsp";
                var info = "";
                var id = 0;
                if (state == 'add') {//新增
                    info = "新增楼层信息";
                } else {//修改
                    info = "修改楼层信息";
                    var rows = $("#menuDataGrid").datagrid("getSelections");
                    if (rows.length == 1) {
                        id = rows[0].id;
                        url += "?id=" + id;
                    } else {
                        $.messager.alert("警告", "必须选中一行", "warning");
                        return;
                    }
                }
                //显示新窗体
                $("#win").window({
                    title: info,
                    width: 650,
                    height: 200,
                    modal: true,
                    closable: true,
                    minimizable: false,
                    href: url,
                    onClose: function () {
                        window.location.href="../../roomIndex";
                    }
                });
            },

            //修改楼层信息
            floorEdit: function (state) {
               // alert(state + "floorId+++++-------")
                var url = "../../findFloor?floorId=" + state;
                var info = "修改楼层信息";
                var id = 0;


                //显示新窗体
                $("#win").window({
                    title: info,
                    width: 650,
                    height: 350,
                    modal: true,
                    closable: true,
                    minimizable: false,
                    href: url,
                    onClose: function () {
                        window.location.href="../../roomIndex";
                    }
                });
            },


            //删除楼层信息
            floorRemove: function (state) {
                //alert(state + "floorId+++++-------")
                if (confirm("是否删除楼层"+state+"?")){
                    $.ajax({
                        type: 'POST',
                        url: "../../removeFloor?floorId=" + state,
                        data: {},
                        success: function (data) {

                            if (data.success) {
                                $.messager.show({
                                    title: "提示",
                                    msg: "楼层" + state + "删除成功!请等待页面刷新！",
                                    timeout: 3000
                                });
                                window.location.href="../../roomIndex";
                            }
                        },
                        dataType: "JSON"
                    });


                }

            },


            //添加楼层信息
            roomTypeAdd: function (state) {
               // alert(state + "rooTypeAdd()...+++++-------")
                var url = "../../page/roomtypeadd.jsp";
                var info = "添加房型信息";
                var id = 0;

                //显示新窗体
                $("#win").window({
                    title: info,
                    width: 650,
                    height: 400,
                    modal: true,
                    closable: true,
                    minimizable: false,
                    href: url,
                    onClose: function () {
                        window.location.href="../../roomIndex";
                    }
                });
            },

        //修改房型信息
            roomTypeEdit: function (state) {
             //alert(state+"roomTypeEdit()...+++++-------")
                var url = "../../findRoomTypeById?roomTypeId="+state;
                var info = "修改房型信息";
                var id = 0;

                //显示新窗体
                $("#win").window({
                    title: info,
                    width: 650,
                    height: 400,
                    modal: true,
                    closable:true,
                    minimizable: false,
                    href: url,
                    onClose: function () {
                        window.location.href="../../roomIndex";
                    }
                });
            },


            //删除房型信息
            roomTypeRemove: function (state) {
               // alert(state + "floorId+++++-------")
                if (confirm("是否删除该房型?")){
                    $.ajax({
                        type: 'POST',
                        url: "../../removeRoomType?roomTypeId=" + state,
                        data: {},
                        success: function (data) {

                            if (data.success) {
                                $.messager.show({
                                    title: "提示",
                                    msg: "房型" + data.roomTypeName + "删除成功!请等待页面刷新！",
                                    timeout: 3000
                                });
                                window.location.href="../../roomIndex";
                            }
                        },
                        dataType: "JSON"
                    });
                }

            },

        //添加房间信息
            roomAdd: function (state) {
           // alert("-------")
            var url = "../../findFloorAndRoomType";
            var info = "";
            var id = 0;
            if (state == 'add') {//新增
                info = "新增房间信息";
            }
            //显示新窗体
            $("#win").window({
                title: info,
                width: 650,
                height: 400,
                modal: true,
                closable: true,
                minimizable: false,
                href: url,
                onClose: function () {
                    window.location.href="../../roomIndex";
                }
            });
        },

            //修改房间信息
            roomEdit: function (state) {
              //  alert(state + "floorId+++++-------")
                var url = "../../findRoomById?roomId=" + state;
                var info = "修改房间信息";
                var id = 0;


                //显示新窗体
                $("#win").window({
                    title: info,
                    width: 650,
                    height: 420,
                    modal: true,
                    closable: true,
                    minimizable: false,
                    href: url,
                    onClose: function () {
                        window.location.href="../../roomIndex";
                    }
                });
            },


            //删除房间信息
            roomRemove: function (state) {
               // alert(state + "floorId+++++-------")
                if (confirm("是否删除该房间?")){
                    $.ajax({
                        type: 'POST',
                        url: "../../removeRoom?roomId=" + state,
                        data: {},
                        success: function (data) {

                            if (data.success) {
                                $.messager.show({
                                    title: "提示",
                                    msg: "房间" + data.roomName + "删除成功!请等待页面刷新！",
                                    timeout: 3000
                                });
                                window.location.href="../../roomIndex";
                            }
                        },
                        dataType: "JSON"
                    });
                }

            },





        }




    })
</script>
</body>
</html>

