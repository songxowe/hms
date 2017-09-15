<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>

    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp"%>
    <link href="${pageContext.request.contextPath }/resources/css/main.css" type="text/css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/resources/css/tch(1).css" type="text/css" rel="stylesheet">
</head>
<body>
<div class="main">
    <h1 class="hotel_price" style="font-weight:lighter; font-size:16px">房价方案设置
    </h1>
    <ul class="price_set_01">
        <li class="title"><span>房间类型</span></li>
        <div id="roomTypeDiv">

        <c:forEach var="roomType" items="${requestScope.jo.roomTypes}" varStatus="rows">
            <c:if test="${rows.index == 0}">  <!--<//判断是否为迭代的第一个>-->
                <li id="0" class="select"><a href="#" onclick="menu_obj.roomTypeChange('${roomType.roomTypeId}')"><span>${roomType.roomTypeName}</span></a></li>
                <input type="hidden" id="roomTypeId" value="${roomType.roomTypeId}">
            </c:if>
            <c:if test="${rows.index != 0}">
                <li id="${roomType.roomTypeId}" class=""><a href="#" onclick="menu_obj.roomTypeChange('${roomType.roomTypeId}')"><span>${roomType.roomTypeName}</span></a></li>
            </c:if>
        </c:forEach>




        </div>
    </ul>

    <table cellpadding="0" cellspacing="0" class="hotel_price tb_price" style="padding: 0px">
        <thead>
        <!--<th width="100">房型</th>-->
        <tr>
            <th width="300">方案名称</th>

            <th width="100">平时价</th>
            <th width="100">周末价</th>
            <th>午夜价</th>
            <th width="140">月租房价</th>
            <th width="120">使用次数</th>
            <th width="160"></th>
        </tr>
        </thead>
        <tbody id="roomTypeTbody">

        <c:forEach var="roomCase" items="${requestScope.jo.roomCases}" varStatus="rows">
            <tr data-id="903" style="display: table-row;">
                <td style="text-align:left">
                    <a href="#" class="prices SchemeName" data-id="1324" onclick="menu_obj.roomCaseEdit('+${roomCase.roomCaseId}+')">${roomCase.roomCaseName}</a>
                </td>
                <td>￥${roomCase.ordinaryPrice}</td>
                <td>￥${roomCase.weekendPrice}</td>
                <td style="text-align:center">￥${roomCase.nightPrice}</td>
                <td style="text-align:center">￥${roomCase.monthPrice}</td>

                <td>${roomCase.sales}</td>
                <td>
                </td>
            </tr>
        </c:forEach>


        <tr data-id="903" style="display: table-row;">
            <td colspan="7" bgcolor="red">
                <input type="button" value="添加房价方案" class="add_price_type" onclick="menu_obj.roomCaseAdd('add')">
            </td>
        </tr>

        </tbody>
    </table>
    <div id="win"></div>
</div>

<script>
    $(function () {
      /*  $("#roomTypeTbody").on("click","input",function () {
            //$(this).find("td:eq(5)").find("input").click(function () {
                alert(this.value)

            $.ajax({
                url:"",
                type:"POST",
                data:{"roomCaseId":this.value,
                    "roomDefault":this.text
                },
                dataType:"JSON",
                success:function (data) {


                }
            })
            alert(this.get())
            //s})
        })*/
        menu_obj = {
        //添加房价方案
            roomCaseAdd: function (state) {

                //alert("-------"+$("span#select").text())
                var url = "../findRoomTypeToAdd";
                var info = "";
                var id = 0;
                if (state == 'add') {//新增
                    info = "新增房价方案";
                } else {//修改
                    info = "修改房价方案";
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
                    height: 380,
                    modal: true,
                    closable: true,
                    minimizable: false,
                    href: url,
                    onClose: function () {
                        $("#menuDataGrid").datagrid(
                            "reload");
                        $("#parentMenuSelect").combotree("reload");
                    }
                });
            },

            //修改放假方案
            roomCaseEdit: function (state) {
               // alert(state+"roomcaseEdit()..id")
                var url = "../findRoomCaseById?roomCaseId="+state;
                var info = "";
                var id = 0;
                if (state == 'add') {//新增
                    info = "新增房价方案";
                } else {//修改
                    info = "修改房价方案";
                }
                //显示新窗体
                $("#win").window({
                    title: info,
                    width: 650,
                    height: 380,
                    modal: true,
                    closable: true,
                    minimizable: false,
                    href: url,
                    onClose: function () {
                        $("#menuDataGrid").datagrid(
                            "reload");
                        $("#parentMenuSelect").combotree("reload");
                    }
                });
            },



            //房型改变
            roomTypeChange: function (state) {
                $("#roomTypeDiv").empty()
               // alert(state+"roomTypeChange()..id")
                $.ajax({
                    url:"../../RoomCaseController_findRoomType",
                    type:"POST",
                    dataType:"JSON",
                    success:function (data) {

                        //alert("--------------")
                        var text = "";
                        $.each(data,function (i) {
                            if(i==0){
                                text += "<li id='0' class=\"select\"><a href=\"#\" onclick=\"menu_obj.roomTypeChange('"+data[i].roomTypeId+"')\"><span>"+data[i].roomTypeName+"</span></a></li>"
                                text += "<input type=\"hidden\" id=\"roomTypeId\" value=\""+data[i].roomTypeId+"\">"
                            }else{
                            text += "<li id="+data[i].roomTypeId+" class=\"\"><a href=\"#\" onclick=\"menu_obj.roomTypeChange('"+data[i].roomTypeId+"')\"><span>"+data[i].roomTypeName+"</span></a></li>"
                            }
                        })
                        $("#roomTypeDiv").append(text)


                        $.ajax({
                            url:"../../roomTypeChange",
                            type:"POST",
                            data:{"roomTypeId":state
                            },
                            dataType:"JSON",
                            success:function (data) {
                               // alert(data)

                                $("#roomTypeTbody").empty();//移除所有当前房价方案
                                $("#0").attr("class","");
                                $("#"+state+"").attr("class","select");

                                var test = "";
                                $.each(data,function (i) {
                                    test += " <tr data-id=\"903\" style=\"display: table-row;\">";
                                    test += " <td style=\"text-align:left\">";
                                    test += "<a href=\"#\" class=\"prices SchemeName\" data-id=\"1324\" onclick=\"menu_obj.roomCaseEdit('"+data[i].roomCaseId+"')\">"+data[i].roomCaseName+"</a>"
                                    test += "</td>"
                                    test+= "<td>￥"+data[i].ordinaryPrice+"</td>"
                                    test+= " <td>￥"+data[i].weekendPrice+"</td>"
                                    test+= "<td style=\"text-align:center\">￥"+data[i].nightPrice+"</td>"
                                    test+= "<td style=\"text-align:center\">￥"+data[i].monthPrice+"</td>"
                                    test+= "<td>"+data[i].sales+"</td>"
                                    test+= " <td>"
                                   // test+= "<input type=\"radio\" class=\"radio\" name=\""+data[i].roomCaseName+"\" checked=\"checked\" value=\"true\" data-id=\"1324\">开启"
                                   // test+= "<input type=\"radio\" class=\"radio\" name=\""+data[i].roomCaseName+"\" value=\"false\" data-id=\"1324\">关闭"
                                    test+= "</td>"

                                    test+= " </tr>"

                                })
                                if(data.length == 0){
                                    test = " <tr data-id=\"903\" style=\"display: table-row;\">";
                                    test += " <td style=\"text-align:left\">";
                                    test += "<span id = \"temporary\" class=\"formTips note_no\" style=\"color: red\">没有找到对应内容！</span></br>";
                                    test+= "</td>"
                                    test+= " </tr>"
                                }

                                test += "<tr data-id=\"903\" style=\"display: table-row;\">" +
                                    "<td colspan=\"7\" bgcolor=\"red\">" +
                                    " <input type=\"button\" value=\"添加房价方案\" class=\"add_price_type\" onclick=\"menu_obj.roomCaseAdd('add')\">" +
                                    " </td>" +
                                    " </tr>"

                                $("#roomTypeTbody").append(test)

                            },
                            error:function (msg) {
                                console.log("系统错误请与管理员联系", msg)
                            }
                        })



                    }

                })


            },
        }

    })


    function clean() {

    }
</script>

</body>
</html>


