<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>仓库管理</title>
    <%@ include file="commons/meta.jsp"%>
  </head>
  <body>
    <div style="margin: 10px 30px;">
      <a href="#" class="easyui-linkbutton" iconCls="icon-add"
         onclick="supplier_obj.showEdit('add')">添加</a>&nbsp;&nbsp;

      <a href="#" class="easyui-linkbutton" iconCls="icon-edit"
        onclick="supplier_obj.showEdit('edit')">修改</a>
       <div id="warehouseEdit">
       </div>
      <div style="margin-top: 20px;">
        <table id="warehouselist">
        </table>

      </div>
    </div>
    <script type="text/javascript">
        $(function() {
　　　　　　      supplier_obj= {
                showEdit: function (state) {
                    var info = "";
                    var url = "warehouse_findbyid";
                    var id = 0;
                    if (state == 'add') {
                        info = "新增仓库"
                    } else {
                        info = "修改仓库"
                        var row = $("#warehouselist").datagrid("getSelections");
                        if (row.length == 1) {
                            id = row[0].warehouseId;
                            url += "?warehouseId=" + id;
                        } else {
                            $.messager.alert("警告", "必须选中一行", "warning");
                            return;
                        }
                    }
                    $("#warehouseEdit").window({
                        title: info,
                        width: 550,
                        height: 480,
                        modal: true,
                        minimizable: false,
                        href: url,
                        onClose: function () {
                            $("#warehouseEdit").datagrid("reload");
                        }
                    });
                }
            }
            $("#warehouselist").datagrid({
                    url: "warehouser_find",
                    title: "仓库列表",
                    fitColumns: true,
                    striped: true,
                    rownumbers: true,
                    columns: [[{
                        field: "warehouseId",
                        title: "仓库Id",
                        width: 100,
                        sortable: true
                    }, {
                        field: "warehouseName",
                        title: "仓库名称",
                        width: 100,
                        sortable: true
                    }, {
                        field: "warehouseStatus",
                        title: "仓库状态",
                        width: 100,
                        sortable: true
                    },
                        ]]})

        });

    </script>
  </body>
</html>
