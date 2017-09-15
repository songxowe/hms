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
       onclick="product_obj.showEdit('add')">添加</a>&nbsp;&nbsp;
    <a href="#" class="easyui-linkbutton" iconCls="icon-edit"
       onclick="product_obj.showEdit('edit')">修改</a>
    <div id="productEdit">
    </div>
</div>
<div id="productForm" style="padding: 10px;">

    <div style="padding: 0 0 0 6px;">
        <label>商品类型</label>
        <select id="supplierType2">

        </select>
        商品名称:
        <input type="text" id="productName" class="easyui-textbox"/>
        &nbsp;&nbsp;
        <a href="#" class="easyui-linkbutton" iconCls="icon-search"
           onclick=product_obj.search();>查询</a>
    </div>
    <div style="margin-top: 20px;">
        <table id="productlist"></table>
    </div>
</div>
<script type="text/javascript">
    $(function () {
        $.ajax({
            type:"POST",
            url:"product_find",
            success:function (data) {
                $("#supplierType2").empty()
                var text=""
                $.each(data,function (i) {
                  text+=" <option id='"+data[i].productType+"'>"+data[i].productType+"</option>"
               // alert()
                })
                $("#supplierType2").append(text)
            },
            dataType:"JSON"
        })




        product_obj = {
            search: function () {
                $("#productlist").datagrid(
                    "load",
                    {
                        productName: $.trim($("#productName").val()),
                    });

            }, showEdit: function (state) {
                var url = "product_finById";
                var info = "";
                var id = 0;
                if (state == 'add') {
                    info = "新增商品";
                } else {
                    info = "修改商品";
                    var rows = $("#productlist").datagrid("getSelections");
                    if (rows.length == 1) {
                        id = rows[0].productId;
                        url += "?productId=" + id;
                    } else {
                        $.messager.alert("警告", "必须选中一行", "warning");
                        return;
                    }
                }
                $("#productEdit").window({
                    title: info,
                    width: 550,
                    height: 480,
                    modal: true,
                    minimizable: false,
                    href: url,
                    onClose: function () {
                        $("#productEdit").datagrid("reload");
                    }
                });
            }

        },

            $("#productlist").datagrid({
                url: "product_find?supplierType2"+$("#supplierType2").val(),
                title: "",
                fitColumns: true,
                striped: true,
                rownumbers: true,
                columns: [[{
                    field: "productId",
                    title: "商品Id",
                    width: 100,
                    sortable: true
                }, {
                    field: "productName",
                    title: "商品名称",
                    width: 100,
                    sortable: true
                }, {
                    field: "productType",
                    title: "商品类型",
                    width: 100,
                    sortable: true
                }, {
                    field: "productUnit",
                    title: "商品单位",
                    width: 100,
                    sortable: true
                }, {
                    field: "productPrice",
                    title: "商品单价",
                    width: 100,
                    sortable: true
                }, {
                    field: "productStatus",
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
