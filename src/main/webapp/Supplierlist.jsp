<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>
<!DOCTYPE HTML>
<html>
<head>
    <title>供应商管理</title>
    <%@ include file="commons/meta.jsp"%>
</head>
<body>
<div style="margin: 10px 30px;">
    <a href="#" class="easyui-linkbutton" iconCls="icon-add"
       onclick="supplier_obj.showEdit('add')">添加</a>&nbsp;&nbsp;
    <a href="#" class="easyui-linkbutton" iconCls="icon-edit"
       onclick="supplier_obj.showEdit('edit')">修改</a>
    <div id="supplieredit">
    </div>
</div>

<div id="supplierForm" style="padding: 10px;">
    <div style="padding: 0 0 0 6px;">
        供应商名字:
        <input type="text" id="supplierName" class="easyui-textbox"/>
        &nbsp;&nbsp;
        <a href="#" class="easyui-linkbutton" iconCls="icon-search"
           onclick=supplier_obj.search();>查询</a>

    </div>
    <div style="margin-top: 20px;">
        <table id="supplierlist"></table>
    </div>
</div>
<script type="text/javascript">
    $(function () {
        supplier_obj = {
            search: function () {
                $("#supplierlist").datagrid(
                    "load", {
                        supplierName: $.trim($("#supplierName").val()),
                    });

            }, showEdit: function (state) {
                var url = "supplier_findByid";
                var info = "";
                var id = 0;
                if (state == 'add') {

                    info = "新增供应商";
                } else {
                    info = "修改供应商";
                    var rows = $("#supplierlist").datagrid("getSelections");
                    if (rows.length == 1) {
                        id = rows[0].supplierId;
                        url += "?supplierId=" + id;
                    } else {
                        $.messager.alert("警告", "必须选中一行", "warning");
                        return;
                    }
                }
                $("#supplieredit").window({
                    title: info,
                    width: 550,
                    height: 480,
                    modal: true,
                    minimizable: false,
                    href: url,
                    onClose: function () {
                        $("#supplieredit").datagrid("reload");
                    }
                });
            },
//            remove: function () {
//                var rows = $("#supplierlist").datagrid("getSelections");
//                if (rows.length > 0) {
//                    $.messager.confirm("消息", "确认真的要删除所选的数据吗", function (flag) {
//                        if (flag) {
//                            var ids = [];
//                            for (var i = 0; i < rows.length; i++) {
//                                ids.push(rows[i].supplierId);
//                            }
//                            $.ajax({
//                                type: "post",
//                                url: "supplier_remove",
//                                data: {
//                                    ids: ids.join(","),
//                                },
//                                beforeSend: function () {
//                                    $("#supplierlist").datagrid("loading");
//                                },
//                                success: function (data) {
//                                    if (data) {
//                                        $("#supplierlist").datagrid("loaded");
//                                        $("#supplierlist").datagrid("load");
//                                        $("#supplierlist").datagrid("unselectAll");
//                                        $.messager.show({
//                                            title: "提示",
//                                            msg: data + "供应商被删除"
//                                        });
//                                    }
//                                }
//                            });
//                        }
//                    });
//                } else {
//                    $.messager.alert("警告", "请选中要删除的数据", "warning");
//                }
//            },

        },

            $("#supplierlist").datagrid({
            url: "supplierController_find.html",
            title: "供应商列表",
            fitColumns: true,
            striped: true,
            rownumbers: true,
            columns: [[{
                field: "supplierId",
                title: "供应商ID",
                width: 100,
                sortable: true
            }, {
                field: "supplierName",
                title: "供应商公司名称",
                width: 100,
                sortable: true
            }, {
                field: "supplierContacter",
                title: "联系人",
                width: 100,
                sortable: true
            }, {
                field: "supplierPhone",
                title: "联系人电话",
                width: 100,
                sortable: true
            }, {
                field: "supplierAddress",
                title: "联系人地址",
                width: 100,
                sortable: true
            }, {
                field: "supplierFax",
                title: "传真",
                width: 100,
                sortable: true
            }, {
                field: "supplierStatus",
                title: "状态",
                width: 100,
                sortable: true
            }
            ]]
        });
    });




</script>
</body>
</html>
