<%--
	author:SONG
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE HTML>
<html>
	<head>
		<title>供应商管理</title>
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
		<form action="" method="post" id="empForm">
			<table width="500" height="198" id="empTable"
				style="margin: 10px auto;">
				<tr>
					<td width="25" height="35" style="">
						&nbsp;
					</td>
					<td width="117">
						<div align="right">
							供应商Id：
						</div>
					</td>
					<td width="269">
						${supplier.supplierId }
					</td>
					<td width="69">
						&nbsp;
					</td>
				</tr>
				<tr>
					<td height="35">
						&nbsp;
					</td>
					<td>
						<div align="right">
							供应商名字：
						</div>
					</td>
					<td>
						${supplier.supplierName }
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
							联系人：
						</div>
					</td>
					<td>
						${supplier.supplierContacter }
					</td>
					<td>
						&nbsp;
					</td>
				<tr>
					<td height="35">
						&nbsp;
					</td>
					<td>
						<div align="right">
							联系电话：
						</div>
					</td>
					<td>
						${supplier.supplierPhone }
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
							联系地址：
						</div>
					</td>
					<td>
						${supplier.supplierAddress }
					</td>
					<td>
						&nbsp;
					</td>
				<tr>
					<td height="35">
						&nbsp;
					</td>
					<td>
						<div align="right">
							传真：
						</div>
					</td>
					<td>
						${supplier.supplierFax }
					</td>
					<td>
						&nbsp;
					</td>
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
						${supplier.supplierStatus }
					</td>
					<td>
						&nbsp;
					</td>
				
				<tr>
					<td>
						&nbsp;
					</td>
					<td colspan="2">
						<div align="center">
							<a href='javascript:closeWindowOfEmpView()' class="easyui-linkbutton">返回</a>
						</div>
					</td>
					<td height="20">
						&nbsp;
					</td>
				</tr>
			</table>
		</form>
		<script type="text/javascript">
			function closeWindowOfEmpView(){
				$("#supplieredit").window("close",true);
			}
		</script>
	</body>
</html>
