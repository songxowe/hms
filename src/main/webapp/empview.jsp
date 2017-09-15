<%--
	author:SONG
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

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
		<form action="" method="post" id="empForm">
			<table width="500" height="198" id="empTable"
				style="margin: 10px auto;">
				<tr>
					<td width="25" height="35" style="">
						&nbsp;
					</td>
					<td width="117">
						<div align="right">
							雇员号：
						</div>
					</td>
					<td width="269">
						${emp.empno }
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
							雇员名：
						</div>
					</td>
					<td>
						${emp.ename }
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
							薪资：
						</div>
					</td>
					<td>
						${emp.sal }
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
							入职日期：
						</div>
					</td>
					<td>
						<spring:eval expression="emp.hiredate"/>
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
							部门名：
						</div>
					</td>
					<td>
						${emp.dept.dname }
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
				$("#editEmp").window("close",true);
			}
		</script>
	</body>
</html>
