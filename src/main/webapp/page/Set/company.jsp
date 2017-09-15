<%--
  Created by IntelliJ IDEA.
  User: the one
  Date: 2017/8/14 0014
  Time: 17:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>简单点酒店管理平台</title>
    <link href="${pageContext.request.contextPath }/resources/page/styles/main.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/zone.js"></script>
    <script src="${pageContext.request.contextPath }/resources/page/Scripts/easyui/jquery-1.8.0.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/resources/page/Scripts/zonearrdata.js"></script>
    <script src="${pageContext.request.contextPath }/resources/page/Scripts/public/Base.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            //初始化省、市、区、商圈下拉框
            new Zone("ProvinceId", "CityId", "AreaId", "", "Province", "City", "Area", "");

            //初始化分店信息
            var url = "/Services/BasicService.aspx";
            var method = "GetCompany";
            postRequest(url, null, "ShopUsl", method, false, function (data) {
                //不正确的
                if (!data.State.Success) {
                    $(".tish").html(data.State.Errkey);
                    $(".tish").show();
                    return false;
                }

                $("#txtName").val(data.Data.Name);
                $("#txtContactName").val(data.Data.ContactName);
                $("#txtPhone").val(data.Data.Phone);
                $("#txtFax").val(data.Data.Fax);

                $("#ProvinceId").val(GetProvinceId(data.Data.Province));
                $("#Province").val(data.Data.Province);
                $("#ProvinceId").change();

                $("#CityId").val(GetCityId(data.Data.City));
                $("#City").val(data.Data.City);
                $("#CityId").change();

                $("#AreaId").val(GetAreaId(data.Data.Area));
                $("#Area").val(data.Data.Area);

                $("#txtAddress").val(data.Data.Address);
                $("#txtMapX").val(data.Data.MapX);
                $("#txtMapY").val(data.Data.MapY);
                $("#Discription").val(data.Data.Discription);
            });

            var SureOn = function () {
                var name = $("#txtName").val();
                var contactname = $("#txtContactName").val();
                var phone = $("#txtPhone").val();
                var fax = $("#txtFax").val();
                var province = $("#Province").val();
                var city = $("#City").val();
                var area = $("#Area").val();
                var address = $("#txtAddress").val();
                var mapx = $("#txtMapX").val();
                var mapy = $("#txtMapY").val();
                var discription = $("#Discription").val();

                //检查合法性
                var result = checkdata(contactname, phone, fax, name);
                if (!result) { return false; }
                postRequest("/Services/BasicService.aspx", { name: name, contactname: contactname, phone: phone, fax: fax, province: province, city: city, area: area, address: address, mapx: mapx, mapy: mapy, discription: discription }, "ShopUsl", "ShopEdit", false, function (data) {
                    //不正确的
                    if (!data.State.Success) {
                        alert(data.State.Des);
                        return false;
                    } else {
                        alert("修改成功");
                    }
                });
            }

            ///检测数据的合法性
            var checkdata = function (contactname, phone, fax) {
                if (isEmpty(contactname)) {
                    showTips(2, "txtContactName", "请输入联系人名称");
                    return false;
                }
                var c = /^[a-z\d\u4E00-\u9FA5]+$/i;
                if (!c.test(contactname)) {
                    showTips(3, "txtContactName", "联系人包含特殊符号");
                    return false;
                }
                if (contactname.length > 30) {
                    showTips(3, "txtContactName", "联系人最多输入30个字符");
                    return false;
                }
                if (isEmpty(phone)) {
                    showTips(2, "txtPhone", "请输入酒店电话或手机号码");
                    return false;
                }

                var p = /(^(\d{3,4}-)?\d{7,8})/;
                if (!p.test(phone)) {
                    if (phone.indexOf("-") <= 0) {
                        if (!isMobil(phone)) {
                            showTips(3, "txtPhone", "请输入正确的电话号码或手机号码");
                            return false;
                        }
                    }
                    else
                        showTips(3, "txtPhone", "请输入正确的电话号码或手机号码")
                    return false;
                }

                if (!isEmpty(fax)) {
                    var f = /(\d{3,4})?(\-)?\d{7,8}/;
                    if (!f.test(fax)) {
                        showTips(3, "txtFax", "请输入正确的传真号码");
                        return false;
                    }
                }
                $(".prompt").hide();
                $(".note_no").hide();
                return true;
            }
            $("#btnSure").click(SureOn)
        });
        var current = undefined;
        function chooseMap() {
            var cityname = $("#City").val();
            if (cityname == "") {
                alert("请先选择省市区");
                return false;
            }
            //var address = $("#txtAddress").val();
            //if (address == "") {
            //    alert("请先输入地址");
            //    return false;
            //}
            var mapx = $("#txtMapX").val();
            var mapy = $("#txtMapY").val();
            current = undefined;
            top.ActiveWin = window;
            openWin("/Set/ChooseMap.html?cityName=" + escape($("#CityId option:selected").text()) + "&mapx=" + mapx + "&mapy=" + mapy, 650, 470, "pwin");
        }
        function mapChooseOk(lng, lat) {
            $("#txtMapX").val(lng);
            $("#txtMapY").val(lat);
        }
    </script>
</head>
<body>
<!--酒店信息-->
<div class="main">
    <h1 class="hotel_infor">酒店信息</h1>
    <ul class="hotel_infor">
        <li>
            <label><b>*</b>酒店名称：</label>
            <input type="text" id="txtName" disabled="true" style="background: #EEE" />
        </li>
        <li>
            <label><b>*</b>联系人：</label>
            <input type="text" id="txtContactName" />
        </li>
        <li>
            <label><b>*</b>电话：</label>
            <input type="text" id="txtPhone" />
        </li>
        <li>
            <label><b></b>传真：</label>
            <input type="text" id="txtFax" />
        </li>
        <li>
            <label>城市：</label>
            <select name="ProvinceId" id="ProvinceId"></select>
            <select name="CityId" id="CityId"></select>
            <select name="AreaId" id="AreaId"></select>
            <input type="hidden" id="Province" name="Province" />
            <input type="hidden" id="City" name="City" />
            <input type="hidden" id="Area" name="Area" />
        </li>
        <li>
            <label>地址：</label>
            <input type="text" id="txtAddress"  maxlength="100"/>
            <a href="###" onclick="chooseMap()">获取坐标</a>
        </li>
        <li>
            <label>X坐标：</label>
            <input type="text" id="txtMapX" style="width: 80px; background: #EEE" disabled="true" />
            <label style="width: 158px">Y坐标：</label>
            <input type="text" id="txtMapY" style="width: 80px; background: #EEE" disabled="true" />

        </li>
        <li>
            <label>简介：</label>
            <textarea id="Discription"></textarea>
        </li>
        <li>
            <label>&nbsp;</label>
            <input type="button" value="保 存" class="bus_add" id="btnSure" />
        </li>
    </ul>
</div>
<!--end-->
</body>
</html>

