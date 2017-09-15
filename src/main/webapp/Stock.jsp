<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>
<!DOCTYPE HTML>
<html>
<head>
    <title>进货管理</title>
    <%@ include file="commons/meta.jsp"%>
</head>
<body>
<div style="margin: 10px 30px;">
    <a href="#" class="easyui-linkbutton" iconCls="icon-add"
       onclick="stock_obj.showEdit('add')">添加</a>&nbsp;&nbsp;

</div>
<div id="stockadit">
</div>
<div id="stockForm" style="padding: 10px;">

    <div style="margin-top: 20px;">
        <table id="stocklist"></table>
    </div>
</div>
<script type="text/javascript">
    $(function () {
        stock_obj = {
            search: function () {
            }, showEdit: function (state) {
                var url = "stockadit.jsp";
                var info = "";
                var id = 0;
                if (state == 'add') {
                    info = "新增进货";
                }
                $("#stockadit").window({
                    title: info,
                    width: 550,
                    height: 480,
                    modal: true,
                    minimizable: false,
                    href: url,
                    onClose: function () {
                        $("#stockadit").datagrid("reload");
                    }
                });
            }

        },
            $("#stocklist").datagrid({
                url: "stock_find",
                title: "",
                fitColumns: true,
                striped: true,
                rownumbers: true,
                columns: [[{
                    field: "stockId",
                    title: "进货单号",
                    width: 100,
                    sortable: true
                }, {
                    field: "productName",
                    title: "商品名称",
                    width: 100,
                    sortable: true,
                    formatter:function (value,row,index) {
                        if(row.product){
                            return row.product.productName
                        }else {
                            return ''
                        }
                    }
                }, {
                    field: "stockRemark",
                    title: "备注",
                    width: 100,
                    sortable: true
                }, {
                    field: "stockAbstract",
                    title: "状态",
                    width: 100,
                    sortable: true
                }, {
                    field: "stockQuantity",
                    title: "数量",
                    width: 100,
                    sortable: true
                }, {
                        field: "stockPrice",
                        title: "进货价格",
                        width: 100,
                        sortable: true
                    }, {
                    field: "stockSumprice",
                    title: "总金额",
                    width: 100,
                    sortable: true,
                    formatter:function (value,row,index) {
                        return row.stockPrice*row.stockQuantity;
                    }
                }, {
                        field: "strDate",
                        title: "进货日期",
                        width: 100,
                        sortable: true
                    }
                ]]
            });
    });

</script>
</body>
</html>
