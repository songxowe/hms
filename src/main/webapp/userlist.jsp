<%--
	author:SONG
--%>

<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>

<!DOCTYPE HTML>
<html>
	<head>
		<title>用户管理</title>
		<%@ include file="commons/meta.jsp"%>
		<script type="text/javascript">
</script>
	</head>

	<body>
		<div style="margin: 10px 30px;">
			<a href="#" class="easyui-linkbutton" iconCls="icon-add"
				onclick="user_obj.showEdit('add')">添加</a>&nbsp;&nbsp;
			<a href="#" class="easyui-linkbutton"
				iconCls="icon-remove" onclick="user_obj.remove()">删除</a>&nbsp;&nbsp;
			<a href="#" class="easyui-linkbutton" iconCls="icon-edit"
				onclick="user_obj.showEdit('edit')">修改</a>&nbsp;&nbsp;

			<a href="#" class="easyui-linkbutton" iconCls="icon-man" onclick="user_obj.setUserRole();">设定用户角色</a>
			<!-- 用户信息窗口 -->
			<div id="editUser">

			</div>
			<!-- 设定用户角色信息窗口 -->
					<div id="userRole">

					</div>

			<!-- 用户列表的工具栏设置 -->
			<div id="searchUserForm" style="padding: 10px;">
				<div style="padding: 0 0 0 6px;">
					用户名：
					<input type="text" id="username" class="easyui-textbox"/>
					状态：
					<select id="status" class="input">
						<option value="">
							--请选择--
						</option>
						<option value="0">无效</option>
						<option value="1">有效</option>
					</select>
					<a href="#" class="easyui-linkbutton" iconCls="icon-search"
						onclick="user_obj.search();">查询</a>
				</div>
			</div>

			<!-- 用户列表显示 -->
			<div style="margin-top: 20px;">
				<table id="userDataGrid">

				</table>

			</div>
		</div>
		<script type="text/javascript">
	$(function() {
		user_obj = {
			search : function() {//查询
				$("#userDataGrid").datagrid(
						"load",
						{
							username : $.trim($("#username").val()),
							status : $("#status").val()
						});
			},
			remove : function(){
				var rows = $("#userDataGrid").datagrid("getSelections");
				if(rows.length > 0) {
					$.messager.confirm("消息","确认真的要删除所选的数据吗",function(flag){
						if(flag){
							var ids = [];
							for(var i=0;i<rows.length;i++){
								ids.push(rows[i].id);
							}
							$.ajax({
								type : "post",
								url : "userController_remove.html",
								data : {
									ids : ids.join(","),
								},
								beforeSend : function(){
									$("#userDataGrid").datagrid("loading");
								},
								success : function(data){
									if(data) {
										$("#userDataGrid").datagrid("loaded");
										$("#userDataGrid").datagrid("load");
										$("#userDataGrid").datagrid("unselectAll");
										$.messager.show({
											title : "提示",
											msg : data + "个用户被删除"
										});
									}
								}
							});
						}
					});
				}else {
					$.messager.alert("警告", "请选中要删除的数据","warning");
				}
			},
			setUserRole(){
				var url = "userrole.jsp";
				var id = 0;
				var user = "";
				var rows = $("#userDataGrid").datagrid("getSelections");
				if(rows.length == 1){
					id = rows[0].id;
					username = rows[0].username;
					url += "?id="+id+"&username="+username;
				}
				else if(rows.length>1){
					$.messager.alert("警告", "不能选中多行","warning");
					return;
				}else if(rows.length==0){
					$.messager.alert("警告","必须选中一个用户","warning");
					return;
				}
				$("#userRole").window({
					title : '用户角色授权管理',
					width : 950,
					height : 450,
					modal : true,
					minimizable : false,
					href : url
				});
			},
			showEdit : function(state){
				var url = "userController_findById.html";
				var info = "";
				var id = 0;
				if(state == 'add') {//新增
					info = "新增用户信息";
				}else {//修改
					info = "修改用户信息";
					var rows = $("#userDataGrid").datagrid("getSelections");
					if(rows.length == 1){
						id = rows[0].id;
						url += "?id="+id;
					}else{
						$.messager.alert("警告", "必须选中一行", "warning");
						return;
					}
				}
				$("#editUser").window({
					title : info,
					width : 550,
					height : 250,
					modal : true,
					minimizable : false,
					href : url,
					onClose : function(){
					user_obj.search();
					}
				});
			}		
		}

		$("#userDataGrid").datagrid( {
			url : "userController.html",
			title : "用户列表",
			fitColumns : true,
			striped : true,
			rownumbers : true,
			columns : [ [ {
				field : "id",
				title : "序号",
				width : 100,
				checkbox : true,
				sortable : true
			}, {
				field : "username",
				title : "用户名",
				width : 100,
				sortable : true
			}, {
				field : "status",
				title : "状态",
				width : 100,
				sortable : true
			} ] ],
			toolbar : "#searchUserForm",
			pagination : true,
			pageSize : 2,
			pageList : [ 2, 5, 10, 15, 20 ],
			sortName : "id",
			sortOrder : "asc",
		});
	});
</script>
	</body>
</html>
