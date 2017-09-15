<%--
	author:SONG
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>

<!DOCTYPE HTML>
<html>
	<head>
		<title>修改密码</title>
		<%@ include file="commons/meta.jsp"%>
	</head>

	<body>
		<style>
.input {
	width: 200px;
	height: 20px;
	border: 1px solid #95B8E7;
}

</style>
		<form action="" method="post" id="userPassForm">
			<table width="500" height="192" id="userTable"
				style="margin: 10px auto;">
				<tr>
					<td width="25" height="35" style="">
						&nbsp;
					</td>
					<td width="117">
						<div align="right">
							用户名称：
						</div>
					</td>
					<td width="269">
						${sessionScope["NEWER_USER_LOGIN_INFO"].username}
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
							旧密码：
						</div>
					</td>
					<td>
						<input type="password" name="password" class="easyui-textbox"/>
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
							新密码：
						</div>
					</td>
					<td>
						<input type="password" name="newpassword" class="easyui-textbox"/>
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
							确认新密码：
						</div>
					</td>
					<td>
						<input type="password" name="confirmnewpassword" class="easyui-textbox"/>
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
							<input type="submit" value="保存"/>
							<input type="reset" value="重置"/>
						</div>
					</td>
					<td height="20">
						&nbsp;
					</td>
				</tr>
			</table>
		</form>
		<script type="text/javascript">
		$("#userPassForm").form({
			url : "userController_changePassword.html",
			success : function(data){
				if(data) {
					$.messager.show({
						title : "提示",
						msg : data
					});
					//$("#passDiv").window("close",true);
				}
			}
		});
</script>
	</body>
</html>
