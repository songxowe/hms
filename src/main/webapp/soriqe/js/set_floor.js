function AddFloor() {
    var name = $("#Name").val();
    name = $.trim(name);
    if (name != "") {
        if (!/^[A-Za-z0-9\u4e00-\u9fa5\s]+$/.test(name)) {
            showTips(3, 'Name', "楼层名称请输入中文字母数字");
            return false;
        }

        var isHas = false;
        $(".floorlist div.lines span").each(function () {
            if ($(this).html() == name) {
                isHas = true;
                return false;
            }
        });
        if (isHas) {
            showTips(3, 'Name', "楼层名称重复，请重新输入！");
            return false;
        }

        var data = postSynRequest("/services/basicservice.aspx", { name: name, id: 0 }, "BaseData", "CheckRoomAreaName");
        if (!data.State.Success) {
            showTips(3, 'Name', data.State.Errkey);
            return false;
        }
        $(".floorlist").append('<div class="lines"><span>' + name + '</span><em></em></div>');
        $("#hdNames").val($("#hdNames").val() + name + "|");
        $("#Name").val('');
        //showTips(1, 'Name', '&nbsp;');
        return true;
    }
    else {
        showTips(3, 'Name', "请输入楼层名称");
        return false;
    }
}
function SubmitFrom() {
    var result = true;
    var floors = $("#hdNames").val();
    var Name = $("#Name").val();
    if (Name == "" && floors == "") {
        showTips(3, 'Name', '请输入楼层');
        result = false;
    }
    if (Name != "") {
        result = AddFloor();
        floors = $("#hdNames").val();
    }
    if (!result) return false;
    else $(".errorborder").removeClass('errorborder');
    floors = floors.substring(0, floors.length - 1);

    postRequest("/services/basicservice.aspx", { floors: floors }, "BaseData", "FloorAdd", false, function (data) {
        if (data.State.Success) {
            //top.ActiveWin.FloorOk(data.Data, floors);
            try{
                parent[0].FloorOk(data.Data, floors);
            } catch (e) {
                if (typeof (parent[0][0].FloorOk)=="function")
                    parent[0][0].FloorOk(data.Data, floors);
                else
                    parent[0][1].FloorOk(data.Data, floors);
            }
            alert("添加楼层成功");
            closeWin();
        }
        else {
            showTips(3, 'Name', data.State.Errkey);
        }
    });
}

function EditFrom() {
    var id = getQueryParam("id");
    var floors = $("#Name").val();
    var result = true;
    if (floors == "") {
        showTips(3, 'Name', '请输入楼层');
        result = false;
    }
    if (floors!= ""&&!/^[A-Za-z0-9\u4e00-\u9fa5\s]+$/.test(floors)) {
        showTips(3, 'Name', "楼层名称请输入中文字母数字");
        result = false;
    }
    var sort = $("#Sort").val();
    if (sort == "") {
        showTips(3, 'Sort', '请输入排序');
        result = false;
    }
    if (sort!=""&&!isNumeric(sort)) {
        showTips(3, 'Sort', '排序请输入数字');
        result = false;
    }
    if (!result) return false;
    var remark = $("#Des").val();

    postRequest("/services/basicservice.aspx", { id: id, floors: floors, sort: sort, remark: remark }, "BaseData", "FloorEdit", false, function (data) {
        if (data.State.Success) {

            //top.ActiveWin.FloorOk(id, floors);
            try {
                parent[0].FloorOk(id, floors);
            } catch (e) {
                if (typeof (parent[0][0].FloorOk) == "function")
                    parent[0][0].FloorOk(id, floors);
                else
                    parent[0][1].FloorOk(id, floors);
            }
            alert("修改楼层成功!");
            closeWin();
        }
        else {
            alert(data.State.Errkey);
        }
    });
}

$(function () {
    $(".lines em").live("click", function () {
        var name = $(this).prev().html();
        $(this).parent().remove();
        $("#hdNames").val($("#hdNames").val().replace(name + "|", ""));
    });
});

function InitEditForm() {
    var id = getQueryParam("id");
    postRequest("/services/basicservice.aspx", { id: id }, "BaseData", "GetFloorById", false, function (data) {
        if (data.State.Success) {
            $("#Name").val(data.Data.Name);
            $("#Sort").val(data.Data.iSort);
            $("#Des").val(data.Data.Des);
        }
        else {
            alert(data.State.Errkey);
            closeWin();
        }
    });
}