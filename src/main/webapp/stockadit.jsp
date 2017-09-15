<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE HTML>
<html>
<head>
	<title>进货单</title>
	<%@ include file="commons/meta.jsp"%>
</head>
<body>
<style>
	.input {
		width: 200px;
		height: 20px;
		border: 1px solid #95B8E7;
	}
	.btn {
		width: 100px;
		height: 20px;
		border: 1px solid #95B8E7;
	}
</style>
<form action="" method="post" id="stockForm1" name="stockForm">
	<table width="500" height="198" id="stockTable"
		   style="margin: 10px auto;">
		<tr>
			<td height="35">
				&nbsp;
			</td>
			<td>
				<div align="right">

				</div>
			</td>
			<td>
				<input name="stockId" id="stockId" type="hidden" value="${stock.stockId }" />
			</td>
			<td>
				&nbsp;
			</td>
		</tr>
		<tr>
			<td height="35">
				&nbsp;
			</td>
			<td>
				<div align="right">
					商品信息:
				</div>
			</td>
			<td>
				<div style="text-align: left">
					<input id="product" class="easyui-combobox" name="product.productId" value="${product.productId}"
						   data-options="editable:false,valueField:'productId',textField:'productName',url:'product_find2'">
				</div>
			</td>
		</tr>
		<tr>
			<td height="35">
				&nbsp;
			</td>
			<td>
				<div align="right">
					供应商信息:
				</div>
			</td>
			<td>
				<div style="text-align: left">
					<input id="supplier" class="easyui-combobox" name="supplier.supplierId" value="${supplier.supplierId}"
						   data-options="editable:false,valueField:'supplierId',textField:'supplierName',url:'supplier_find2'">
				</div>
			</td>
		</tr>
		<tr>
			<td height="35">
				&nbsp;
			</td>
			<td>
				<div align="right">
					仓库信息:
				</div>
			</td>
			<td>
				<div style="text-align: left">
					<input id="warehouse" class="easyui-combobox" name="warehouse.warehouseId" value="${warehouse.warehouseId}"
						   data-options="editable:false,valueField:'warehouseId',textField:'warehouseName',url:'warehouser_find2'">
				</div>
			</td>
		</tr>

		<tr>
			<td height="35">
				&nbsp;
			</td>
			<td>
				<div align="right">
					备注：
				</div>
			</td>
			<td>
				<input id="stockRemark" name="stockRemark" type="text" class="easyui-textbox" value="${stock.stockRemark }" />
			</td>
			<td>
				&nbsp;
			</td>
		</tr>
		<tr>
			<td height="35">
				&nbsp;
			</td>
			<td>
				<div align="right">
					状态：
				</div>
			</td>
			<td>
				<input name="stockAbstract" id="stockAbstract" type="text" class="easyui-textbox" value="${stock.stockAbstract }" />
			</td>
			<td>
				&nbsp;
			</td>
		</tr>
		<tr>
			<td height="35">
				&nbsp;
			</td>
			<td>
				<div align="right">
					数量：
				</div>
			</td>
			<td>
				<input name="stockQuantity"id="quantity" type="text" class="easyui-textbox" value="${stock.stockQuantity }" />
			</td>
			<td>
				&nbsp;
			</td>
		</tr>
		<tr>
			<td height="35">
				&nbsp;
			</td>
			<td>
				<div align="right">
					进货价格：
				</div>
			</td>
			<td>
				<input name="stockPrice" id="stock" type="text" class="easyui-textbox" value="${stock.stockPrice }" />
			</td>
			<td>
				&nbsp;
			</td>
		</tr>

		<tr>
			<td height="35">
				&nbsp;
			</td>
			<td colspan="2">
				<div align="center">
					<input  type="button" id="submit4" value="保存" />
					<input type="reset"  value="重置" />
				</div>
			</td>
			<td height="20">
				&nbsp;
			</td>
		</tr>
	</table>
</form>
<script type="text/javascript">

    // $("#stockForm1").form( {
    //      url : "stock_add_1",
    //
    //      success : function(data) {
    //          alert(data)
    //          if (data) {
    //              $.messager.show( {
    //                  title : "提示",
    //                  msg : "雇员" + data + "成功!"
    //              });
    //              $("#stockEdit").window("close",true);
    //          }
    //      }
    //  });
    $(function () {
        $("#submit4").click(function () {


            //alert($("#warehouse").combobox('getValue')+"---"),
            //alert($("#product").combobox('getValue')),
            //alert($("#supplier").combobox('getValue')),
            //($("#stockAbstract").val()),
				//alert($("#stockRemark").val()),
				alert($("#quantity").val())
           // alert($("#stockDate").datebox('getValue')),
				alert($("#stock").val()+"---")

            $.ajax({
                url :"stock_add_1",
                type:'POST',
                dataType:"json",
                data:{
                   "supplier.supplierId":$("#supplier").combobox('getValue'),
                   "product.productId":$("#product").combobox('getValue'),
                   "warehouse.warehouseId":$("#warehouse").combobox('getValue'),
					stockRemark:$("#stockRemark").val(),
                    stockAbstract:$("#stockAbstract").val(),
                   // stockIntroduction:$("#stockIntroduction").val(),
                 	 stockQuantity:$("#quantity").val(),

                     stockPrice:$("#stock").val()
                },
                dataType:'json',
                success:function (data) {
                    $.messager.show( {
                        title : "提示",
                        msg : "进货" + data + "成功!"
                    });
                    $("#stockadit").window("close",true);
                }
            })
        })
    })

</script>
</body>
</html>
