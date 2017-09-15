<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE HTML>
<html>
	<head>
		<title>仓库管理</title>
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
		<form action="" method="post" id="supplierForm" name="supplierForm">
			<table width="500" height="198" id="supplierTable"
				style="margin: 10px auto;">
				<tr>
					<td height="35">
						&nbsp;
					</td>
					<td>
						<div align="right">
							仓库名字：
						</div>
					</td>
					<td>
						<input  id="warehouseName" class="easyui-validatebox" name="warehouseName" value="${warehouse.warehouseName }"/>
						<input type="hidden" name="warehouseId" value="${warehouse.warehouseId }" />
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
							仓库状态：
						</div>
					</td>
					<td>
					<input id="warehouseStatus" name="warehouseStatus" type="text" class="easyui-validatebox" value="${warehouse.warehouseStatus }" />
				</td>
					<td>
						&nbsp;
					</td>
				</tr>
				<tr>

					<td>
						&nbsp;
					</td>
					<td colspan="2">
						<div align="center">
							<input id="submit2" type="submit"   value="保存" />
							<input type="reset" value="重置" />
						</div>
					</td>
					<td height="20">
						&nbsp;
					</td>
				</tr>
			</table>
		</form>
		<script type="text/javascript">

	$("#supplierForm").form( {
		url : "warehouse_save",
		success : function(data) {
			if (data) {
				$.messager.show( {
					title : "提示",
					msg : "仓库"  + "成功!"
				});
				$("#warehouseEdit").window("close",true);
			}
		}
	});

//$(function () {
//    $("#submit2").click(function () {
//        $.ajax({
//            url: "warehouse_save",
//            type: 'POST',
//            data: {
//                warehouseId: $("#warehouseId").val(),
//                warehouseName: $("#warehouseName").val(),
//                warehouseStatus: $("#warehouseStatus").val(),
//            },
//            dataType: 'json',
//            success: function (data) {
//                $.messager.show({
//                    title: "提示",
//                    msg: "供应商" + data + "成功!"
//                });
//                $("#warehouseEdit").window("close", true);
//            }
//        });
//    });
//});
</script>
	</body>
</html>
