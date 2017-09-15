$(function () {
    postRequest("/services/basicservice.aspx", null, "BaseData", "RoomInit", false, function (data) {
        if (data.State.Success) {
            //楼层
            if (data.Data.Floors.length > 0) {
                for (var i = 0; i < data.Data.Floors.length; i++) {
                    var item = data.Data.Floors[i];
                    AppendFloor(item.Id, item.Name);
                }
            }
            //房型
            if (data.Data.RoomTypes.length > 0) {
                for (var i = 0; i < data.Data.RoomTypes.length; i++) {
                    var item = data.Data.RoomTypes[i];
                    AppendRoomType(item.Id, item.Name);
                }
            }
            //房间
            if (data.Data.Rooms.length > 0) {
                for (var i = 0; i < data.Data.Rooms.length; i++) {
                    var item = data.Data.Rooms[i];
                    AppendRoom(item.Id, item.RoomNo, item.RoomTypeName);
                }
            }
        }
    });

    //绑定楼层事件
    $(".floorlist .floorAll").live("click", function () {
        $(".floorlist .flooritem").removeClass('select');
        $(this).addClass('select');
        QueryRoom();
    });
    $(".floorlist .flooritem span").live("click", function () {
        $(".floorlist .floorAll").removeClass('select');
        $(".floorlist .flooritem").removeClass('select');
        $(this).parent().addClass('select');
        QueryRoom();
    });
    $(".floorlist .lines em.edit").live("click", function () {
        FloorEdit(this);
    });
    $(".floorlist .lines em.dell").live("click", function () {
        var obj = this;
        var name = $(obj).prev().prev().html();
        if (!confirm("确定要删除楼层（" + name + "）吗，删除后将不能恢复？")) {
            return false;
        }
        var id = $(obj).parent().attr("data-id");
        postRequest("/services/basicservice.aspx", { id: id, votherpath: "/OtherPath/SCLC.html" }, "BaseData", "DeleteFloor", false, function (data) {
            if (data.State.Success) {
                var floorId = $(".floorlist .select").attr("data-id");
                if (floorId == id) {
                    $(".floorlist .floorAll").addClass('select');
                    QueryRoom();
                }
                $(obj).parent().remove();
            }
            else {
                alert(data.State.Errkey);
            }
        });

    });


    //绑定房型事件
    $(".roomtypelist .roomtypeAll").live("click", function () {
        $(".roomtypelist .roomtypeitem").removeClass('select');
        $(this).addClass('select');
        QueryRoom();
    });
    $(".roomtypelist .roomtypeitem span").live("click", function () {
        $(".roomtypelist .roomtypeAll").removeClass('select');
        $(".roomtypelist .roomtypeitem").removeClass('select');
        $(this).parent().addClass('select');
        QueryRoom();
    });
    $(".roomtypelist .lines em.edit").live("click", function () {
        RoomTypeEdit(this);
    });
    $(".roomtypelist .lines em.dell").live("click", function () {
        var obj = this;
        var name = $(obj).prev().prev().html();
        if (!confirm("确定要删除房型（" + name + "）吗，删除后将不能恢复？")) {
            return false;
        }
        var id = $(obj).parent().attr("data-id");
        postRequest("/services/basicservice.aspx", { id: id, votherpath: "/OtherPath/SCFX.html" }, "BaseData", "DeleteRoomType", false, function (data) {
            if (data.State.Success) {
                var roomtypeId = $(".roomtypelist .select").attr("data-id");
                if (roomtypeId == id) {
                    $(".roomtypelist .roomtypeAll").addClass('select');
                    QueryRoom();
                }
                $(obj).parent().remove();
            }
            else {
                alert(data.State.Errkey);
            }
        });

    });

    //绑定房间事件
    $(".roomlist .roomitem em.edit").live("click", function () {
        RoomEdit(this);
    });
    $(".roomlist .roomitem em.dell").live("click", function () {
        var obj = this;
        var name = $(obj).prev().prev().prev().html();
        if (!confirm("确定要删除房间（" + name + "）吗，删除后将不能恢复？")) {
            return false;
        }
        var id = $(obj).parent().attr("data-id");
        postRequest("/services/basicservice.aspx", { id: id, votherpath: "/OtherPath/SCFJ.html" }, "BaseData", "DeleteRoom", false, function (data) {
            if (data.State.Success) {
                $(obj).parent().remove();
            }
            else {
                alert(data.State.Errkey);
            }
        });

    });
});

function QueryRoom() {
    var floorId = $(".floorlist .select").attr("data-id");
    var roomtypeId = $(".roomtypelist .select").attr("data-id");

    postRequest("/services/basicservice.aspx", { floorId: floorId, roomtypeId: roomtypeId }, "BaseData", "QueryRoom", false, function (data) {
        if (data.State.Success) {
            $(".roomlist .roomitem").remove();
            //房间
            if (data.Data.length > 0) {
                for (var i = 0; i < data.Data.length; i++) {
                    var item = data.Data[i];
                    AppendRoom(item.Id, item.RoomNo, item.RoomTypeName);
                }
            }
        }
    });
}

var currentFloor = undefined;
function FloorAdd() {
    currentFloor = undefined;
    //top.ActiveWin = window;
    ActiveWin = window
    openWin("/Set/FloorAdd.html", 650, 200, "pwin");
}

function FloorEdit(floor) {
    currentFloor = floor;
    //top.ActiveWin = window;
    ActiveWin = window
    var id = $(floor).parent().attr("data-id");
    openWin("/Set/FloorEdit.html?id=" + id, 650, 350, "pwin");
}

function FloorOk(id, name) {
    if (currentFloor == undefined) {
        AppendFloor(id, name);
    }
    else {
        $(currentFloor).prev().html(name);
    }
}

function AppendFloor(id, name) {
    var arrid = id.toString().split("|");
    var arrname = name.split("|");
    for (var i = 0; i < arrid.length; i++) {
        $(".floorlist .add").before('<div class="lines flooritem" data-id="' + arrid[i] + '"><span>' + arrname[i] + '</span><em class="edit" title="编辑"></em><em class="dell" title="删除"></em></div>');
    }
}

var currentRoomType = undefined;
function RoomTypeAdd() {
    currentRoomType = undefined;
    //top.ActiveWin = window;
    ActiveWin = window
    openWin("/Set/RoomTypeAdd.html", 650, 400, "pwin");
}

function RoomTypeEdit(roomType) {
    currentRoomType = roomType;
    //top.ActiveWin = window;
    ActiveWin = window
    var id = $(roomType).parent().attr("data-id");
    openWin("/Set/RoomTypeEdit.html?id=" + id, 650, 470, "pwin");
}

function RoomTypeOk(id, name) {
    if (currentRoomType == undefined) {
        AppendRoomType(id, name);
    }
    else {
        $(currentRoomType).prev().html(name);
        QueryRoom();
    }
}

function AppendRoomType(id, name) {
    $(".roomtypelist .add").before('<div class="lines roomtypeitem" data-id="' + id + '"><span>' + name + '</span><em class="edit"  title="编辑"></em><em class="dell" title="删除"></em></div>');
}

var currentRoom = undefined;
function RoomAdd() {
    currentRoom = undefined;
    //top.ActiveWin = window;
    ActiveWin = window
    var floorId = $(".floorlist .select").attr("data-id");
    var roomtypeId = $(".roomtypelist .select").attr("data-id");
    openWin("/Set/RoomAdd.html?floorId=" + floorId + "&roomtypeId=" + roomtypeId, 600, 300, "pwin");
}

function RoomEdit(room) {
    currentRoom = room;
    //top.ActiveWin = window;
    ActiveWin = window
    var id = $(room).parent().attr("data-id");
    openWin("/Set/RoomEdit.html?id=" + id, 600, 500, "pwin");
}

function RoomOk(id, roomno, roomtypename) {
    if (currentRoom == undefined) {
        AppendRoom(id, roomno, roomtypename);
    }
    else {
        $(currentRoom).parent().find(".rom").html(roomno);
        $(currentRoom).parent().find(".type").html(roomtypename);
    }
}

function AppendRoom(id, roomno, roomtypename) {
    var arrid = id.toString().split("|");
    var arrroomno = roomno.split("|");
    for (var i = 0; i < arrid.length; i++) {
        $(".roomlist .add").before('<div class="rfj blue roomitem" data-id="' + arrid[i] + '"><div class="rom">' + arrroomno[i] + '</div><div class="type">' + roomtypename + '</div><em class="edit" title="编辑"></em><em class="dell" title="删除"></em></div>');
    }
}