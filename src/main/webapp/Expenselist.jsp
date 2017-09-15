<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>
<!DOCTYPE HTML>
<html>
<head>
    <title>进货单</title>
    <%@ include file="commons/meta.jsp"%>
</head>
<body>
<div style="margin: 10px 30px;">
    <a href="#" class="easyui-linkbutton" iconCls="icon-add"
       onclick="expense_obj.showEdit('add')">添加</a>&nbsp;&nbsp;
    <a href="#" class="easyui-linkbutton" iconCls="icon-edit"
       onclick="expense_obj.showEdit('edit')">修改</a>
    <div id="expenseedit">
    </div>
</div>
<div id="supplierForm" style="padding: 10px;">
    <div style="padding: 0 0 0 6px;">
        消费名称:
        <input type="text" id="expenseName" class="easyui-textbox"/>
        &nbsp;&nbsp;

        <a href="#" class="easyui-linkbutton" iconCls="icon-search"
           onclick=expense_obj.search();>查询</a>
    </div>
    <div style="margin-top: 20px;">
        <table id="expenselist"></table>
    </div>
</div>
<script type="text/javascript">
    $(function () {
        expense_obj = {
            search: function () {
                $("#expenselist").datagrid(
                    "load", {
                        expenseName: $.trim($("#expenseName").val()),
                    });

            }, showEdit: function (state) {
                var url = "expense_findById";
                var info = "";
                var id = 0;
                if (state == 'add') {

                    info = "新增消费信息";
                } else {
                    info = "修改消费信息";
                    var rows = $("#expenselist").datagrid("getSelections");
                    if (rows.length == 1) {
                        id = rows[0].expenseId;
                        url += "?expenseId=" + id;
                    } else {
                        $.messager.alert("警告", "必须选中一行", "warning");
                        return;
                    }
                }
                $("#expenseedit").window({
                    title: info,
                    width: 550,
                    height: 480,
                    modal: true,
                    minimizable: false,
                    href: url,
                    onClose: function () {
                        $("#expenselist").datagrid("reload");
                    }
                });
            },
        }

            $("#expenselist").datagrid({
                url: "expenseController_find",
                title: "消费信息列表",
                fitColumns: true,
                striped: true,
                rownumbers: true,
                columns: [[{
                    field: "expenseId",
                    title: "消费ID",
                    width: 100,
                    sortable: true
                }, {
                    field: "expenseName",
                    title: "消费名称",
                    width: 100,
                    sortable: true
                },
                    {
                        field: "expenseType",
                        title: "消费类型",
                        width: 100,
                        sortable: true
                    }, {
                        field: "expenseUnit",
                        title: "消费单位",
                        width: 100,
                        sortable: true
                    }, {
                        field: "expensePrice",
                        title: "消费价格",
                        width: 100,
                        sortable: true
                    }, {
                        field: "expenseStatus",
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
