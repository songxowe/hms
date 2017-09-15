<%--
	author:SONG
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>

<!DOCTYPE HTML>
<html>
	<head>
		<title>菜单管理</title>
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
		<form action="" method="post" id="menuForm">
			<table width="500" height="198" id="menuTable"
				style="margin: 10px auto;">
				<tr>
					<td width="25" height="35" style="">
						&nbsp;
					</td>
					<td width="117">
						<div align="right">
							菜单序号：
						</div>
					</td>
					<td width="269">
						${menu.id }
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
							菜单标题：
						</div>
					</td>
					<td>
						${menu.name }
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
							转向地址：
						</div>
					</td>
					<td>
						${menu.linkUrl }
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
							优选顺序：
						</div>
					</td>
					<td>
						${menu.seq }
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
							父级菜单：
						</div>
					</td>
					<td>
						${empty menu.parentId?'无父级菜单': parentMenu.name}
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
							菜单描述：
						</div>
					</td>
					<td>
						${menu.descn }
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
							<a href='javascript:closeWindowOfMenuView()' class="easyui-linkbutton">返回</a>
						</div>
					</td>
					<td height="20">
						&nbsp;
					</td>
				</tr>
			</table>
		</form>
		<script type="text/javascript">
			function closeWindowOfMenuView(){
				$("#editMenu").window("close",true);
			}
		</script>
	</body>
</html>
