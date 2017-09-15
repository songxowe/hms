<%--
	author:SONG
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE HTML>
<html>
	<head>
		<title>雇员管理</title>
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
		<form action="" method="post" id="empForm" name="empForm">
			<table width="500" height="198" id="empTable"
				style="margin: 10px auto;">
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
						<input class="easyui-validatebox" name="ename" value="${emp.ename }"/>
						<input type="hidden" name="empno" value="${emp.empno }" />						
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
						<input name="sal" type="text" class="easyui-numberbox" data-options="min:0,precision:2" value="${emp.sal }" />
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
					  <c:if test="${empty emp }">
					    <input type= "text" class= "easyui-datebox" name="hiredate" />
					  </c:if>
						<c:if test="${!empty emp }">
              <input type= "text" class= "easyui-datebox" name="hiredate" value="<spring:eval expression="emp.hiredate"/>" />
            </c:if>
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
							部门：
						</div>
					</td>
					<td>
						<input id="dept" class="easyui-combobox" name="dept.deptno" value="${emp.dept.deptno }"
               data-options="editable:false,valueField:'deptno',textField:'dname',url:'deptController_find.html'" />
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
							<input type="submit" value="保存" />
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
	$("#empForm").form( {
		url : "empController_save.html",
		success : function(data) {
			if (data) {
				$.messager.show( {
					title : "提示",
					msg : "楼层" + data + "成功!"
				});
				$("#editEmp").window("close",true);
			}
		}
	});
</script>
	</body>
</html>
