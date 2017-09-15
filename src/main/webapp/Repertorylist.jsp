<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>
<!DOCTYPE HTML>
<html>
<head>
    <title>库存</title>
    <%@ include file="commons/meta.jsp"%>
</head>
<body>
<div style="margin: 10px 30px;">
</div>

        <table id="repertorylist"></table>
    </div>
</div>
<script type="text/javascript">
            $("#repertorylist").datagrid({
                url: "repertory_find",
                title: "",
                fitColumns: true,
                striped: true,
                rownumbers: true,
                columns: [[{
                    field: "repertoryId",
                    title: "Id",
                    width: 100,
                    sortable: true
              }, {
                    field: "productName",
                    title: "商品名称",
                    width: 100,
                    sortable: true,
                    formatter: function (value, row, index) {
                        if (row.product) {
                            return row.product.productName
                        } else {
                            return ''
                        }
                    }
                } , {
                    field: "warehouseName",
                    title: "仓库名称",
                    width: 100,
                    sortable: true,
                    formatter: function (value, row, index) {
                        if (row.warehouse) {
                            return row.warehouse.warehouseName
                        } else {
                            return ''
                        }
                    },
                },{
                    field: "productTotal",
                    title: "库存数量",
                    width: 100,
                    sortable: true
                }
                ]]
    });

</script>
</body>
</html>
