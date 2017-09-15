<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <title>简单点酒店管理平台</title>
    <%@ include file="../commons/meta.jsp"%>
    <link href="${pageContext.request.contextPath }/resources/css/main.css" type="text/css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/resources/css/tch.css" type="text/css" rel="stylesheet">
    <%--<script type="text/javascript" src="../Scripts/easyui/jquery-1.8.0.min.js"></script>
    <!--<script type="text/javascript" src="../Scripts/public/Base.js"></script>-->
    <script type="text/javascript" src="../Scripts/ChainVersionBase.js"></script>
    <script type="text/javascript" src="../Scripts/common.js"></script>
    <script type="text/javascript" src="../Scripts/page/FrontOp/set_priceschemeedit.js"></script>--%>
</head>
<body>
<div class="hotel_price ">
    <div class="line">添加/编辑 房价方案</div>
    <ul style="margin-top: 10px; float: left">
        <c:if test="${requestScope.roomCase == null}">
            <li>
                <label class="ls">房型：</label>
                <select id="roomCaseSelect">
                    <option value="">请选择</option>
                    <c:forEach var="roomType" items="${requestScope.roomTypes}">
                        <option value="${roomType.roomTypeId}">${roomType.roomTypeName} </option>
                    </c:forEach>
                </select>
            </li>


            <li ><label class="ls">方案名称：</label>
                <input type="text" id="Name" class="text" maxlength="25" style="margin-top: 0px !important" />
            </li>
            <li ><label class="ls">平时价：</label>
                <input type="text" id="Price" class="text" maxlength="8" style="margin-top: 0px" />
            </li>
            <li ><label class="ls">周末价：</label>
                <input type="text" id="WeekendPrice" class="text" maxlength="8" style="margin-top: 0px" />
            </li>
            <li ><label class="ls">午夜房价：</label>
                <input type="text" id="NightPrice" class="text" maxlength="8" style="margin-top: 0px" />
            </li>
            <li  id="MonthRoom"><label class="ls">月租房价：</label>
                <input type="text" id="MonthPrice" class="text" maxlength="8" style="margin-top: 0px" />
            </li>

        </c:if>


        <c:if test="${requestScope.roomCase != null}">
            <li>
                <label class="ls">房型：</label>
                <select id="roomCaseSelect">

                </select>
                <input type="hidden" id="roomTypeIdSelected" value="${requestScope.roomCase.roomType.roomTypeId}">
            </li>

            <li ><label class="ls">方案名称：</label>

                <input type="text" id="Name" class="text" maxlength="25" style="margin-top: 0px !important"  value="${requestScope.roomCase.roomCaseName}"/>
            </li>
            <li ><label class="ls">平时价：</label>
                <input type="text" id="Price" class="text" maxlength="8" style="margin-top: 0px" value="${requestScope.roomCase.ordinaryPrice}"/>
        </li>
        <li ><label class="ls">周末价：</label>
                <input type="text" id="WeekendPrice" class="text" maxlength="8" style="margin-top: 0px" value="${requestScope.roomCase.weekendPrice}"/>
        </li>
        <li ><label class="ls">午夜房价：</label>
                <input type="text" id="NightPrice" class="text" maxlength="8" style="margin-top: 0px" value="${requestScope.roomCase.nightPrice}"/>
        </li>
        <li  id="MonthRoom"><label class="ls">月租房价：</label>
                <input type="text" id="MonthPrice" class="text" maxlength="8" style="margin-top: 0px" value="${requestScope.roomCase.monthPrice}"/>
        </li>


        </c:if>


        <li><label class="ls">&nbsp;</label>
            <input type="button" value="保存" class="bus_add" id="btnSave" />
        </li>
    </ul>

</div>

<script>
    $(function () {
        var roomCaseId = "";
        <c:if test="${requestScope.roomCase == null}">
        roomCaseId = "";
        </c:if>
        <c:if test="${requestScope.roomCase != null}">
        roomCaseId = ${requestScope.roomCase.roomCaseId};
        </c:if>
       $.ajax({
           type:"POST",
           url:"../../RoomCaseController_findRoomType",
           data:{
           },
           dataType:"JSON",
           success:function (data) {
               if(roomCaseId == "" ){
               }else {
              // alert("findFloorAndRoomTypeJson()...返回data");


               $("#roomCaseSelect").empty()
               var secsed = "";
               var roomTypeTest = "<option value=\"-1\" >请选择房型</option>";
             //下拉列表 房型
                   $.each(data,function (i) {
                       // alert("房型"+data.roomType[i].roomTypeName)
                       if(roomCaseId != "" ){
                            if ($("#roomTypeIdSelected").val() == data[i].roomTypeId ){
                                 secsed += "selected";
                             }
                       }
                       roomTypeTest+="<option "+secsed+" value="+data[i].roomTypeId+">"+data[i].roomTypeName+"</option>";
                       secsed = "";
                   })
               $("#roomCaseSelect").append(roomTypeTest);

              // alert("tingyong.............")
           }
           }
       }),
           $("#btnSave").click(function () {
               $.ajax({
                   type:"POST",
                   url:"../../roomCaseAdd",
                   data:{"roomCaseId":roomCaseId,
                       "roomType.roomTypeId":$("#roomCaseSelect").val(),
                       "roomCaseName":$("#Name").val(),

                       "ordinaryPrice":$.trim($("#Price").val()),
                       "weekendPrice":$.trim($("#WeekendPrice").val()),
                       "nightPrice":$.trim($("#NightPrice").val()),
                       "monthPrice":$.trim($("#MonthPrice").val()),

                   },
                   dataType:"JSON",
                   success:function (data) {
                      // alert(data.success)
                       if (data.success){


                           $(function () {
                               $.messager.alert("操作提示", "操作成功！");
                           });

                           $("#roomTypeTbody").empty();//移除所有当前房价方案
                           var test = "";
                           $.each(data.roomCases,function (i) {
                               test += " <tr data-id=\"903\" style=\"display: table-row;\">";
                               test += " <td style=\"text-align:left\">";
                               test += "<a href=\"#\" class=\"prices SchemeName\" data-id=\"1324\" onclick=\"menu_obj.roomCaseEdit('"+data.roomCases[i].roomCaseId+"')\">"+data.roomCases[i].roomCaseName+"</a>"
                               test += "</td>"
                               test+= "<td>￥"+data.roomCases[i].ordinaryPrice+"</td>"
                               test+= " <td>￥"+data.roomCases[i].weekendPrice+"</td>"
                               test+= "<td style=\"text-align:center\">￥"+data.roomCases[i].nightPrice+"</td>"
                               test+= "<td style=\"text-align:center\">￥"+data.roomCases[i].monthPrice+"</td>"
                               test+= "<td>"+data.roomCases[i].sales+"</td>"
                               test+= " <td>"
                               // test+= "<input type=\"radio\" class=\"radio\" name=\""+data[i].roomCaseName+"\" checked=\"checked\" value=\"true\" data-id=\"1324\">开启"
                               // test+= "<input type=\"radio\" class=\"radio\" name=\""+data[i].roomCaseName+"\" value=\"false\" data-id=\"1324\">关闭"
                               test+= "</td>"

                               test+= " </tr>"

                           })
                           test += "<tr data-id=\"903\" style=\"display: table-row;\">" +
                               "<td colspan=\"7\" bgcolor=\"red\">" +
                               " <input type=\"button\" value=\"添加房价方案\" class=\"add_price_type\" onclick=\"menu_obj.roomCaseAdd('add')\">" +
                               " </td>" +
                               " </tr>"
                           $("#roomTypeTbody").append(test);


                           $("#win").window("close",true);

                       }
                   },
                   error :function (msg) {
                       console.log("系统错误请与管理员联系", msg)
                   }
               })

           })

    })




</script>
</body>
</html>

