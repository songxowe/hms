<%--
	author:SONG
--%>

<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>

<!DOCTYPE HTML>
<html>
	<head>
		<title>用户角色授权管理</title>
		<%@ include file="commons/meta.jsp"%>
		<script type="text/javascript">
	
</script>
	</head>

	<body>
		<div id="divBody" style="margin: 10px 30px;">
			<a href="#" class="easyui-linkbutton" iconCls="icon-remove"
				onclick=userrole_obj.grant();>授权</a>
			<a href="#" class="easyui-linkbutton" iconCls="icon-edit"
				onclick=userrole_obj.revoke();>取消授权</a>
				
			<div id="searchUserRoleForm" style="padding: 10px;">
				<div style="padding: 0 0 0 6px;">
					<input type="hidden" id="userId" value='${param.id }'/>
					<input type="text" id="name" placeholder="角色名称"/>
					<input type="text" id="code" placeholder="角色编号"/>
					<input type="text" id="descn" placeholder="角色说明"/>
					授权情况：
					<select id="authorize">
						<option value="">
							所有
						</option>
						<option value="1">
							已授权
						</option>
						<option value="0">
							未授权
						</option>
					</select>
					<a href="#" class="easyui-linkbutton" iconCls="icon-search"
						onclick=userrole_obj.search();>查询</a>
				</div>
			</div>

			<!-- 角色列表显示 -->
			<div style="margin-top: 20px;">
				<table id="userRoleDataGrid">

				</table>

			</div>
		</div>
		<script type="text/javascript">
	$(function() {
		userrole_obj = {
			search : function() {
				$("#userRoleDataGrid").datagrid(
						"load",
						{
							name : $.trim($("#name").val()),
							code : $.trim($("#code").val()),
							descn : $.trim($("#descn").val()),
							authorize : $("#authorize").val(),
							userId : $.trim($("#userId").val())
						});
			},
			revoke : function() {//取消授权
				var rows = $("#userRoleDataGrid").datagrid("getSelections");
				if (rows.length == 1) {
					var role_ids = [];
					for(var i=0;i<rows.length;i++){
						role_ids.push(rows[i].id);
					}
					$.ajax({
						type : "post",
						url : "userRoleController_grantOrRevoke.html",
						data : {
							itemlist : role_ids.join(","),
							auth : false,
							userId : $.trim($("#userId").val())
						},
						beforeSend : function(){
							$("#userRoleDataGrid").datagrid("loading");
						},
						success : function(data){
							if(data) {
								$("#userRoleDataGrid").datagrid("loaded");
								$("#userRoleDataGrid").datagrid("load");
								$("#userRoleDataGrid").datagrid("unselectAll");
								$.messager.show({
									title : "提示",
									msg : "取消授权成功"
								});
								//$("#userRole").window("close",true);
							}
						}
					});
				} else {
					$.messager.alert("警告", "选中要取消授权的角色", "warning");
				}
			},
			grant : function() {//授权
				var rows = $("#userRoleDataGrid").datagrid("getSelections");
				if(rows.length > 0) {
					var role_ids = [];
					for(var i=0;i<rows.length;i++){
						role_ids.push(rows[i].id);
					}
					$.ajax({
						type : "post",
						url : "userRoleController_grantOrRevoke.html",
						data : {
							itemlist : role_ids.join(","),
							auth : true,
							userId : $.trim($("#userId").val())
						},
						beforeSend : function(){
							$("#userRoleDataGrid").datagrid("loading");
						},
						success : function(data){
							if(data) {
								$("#userRoleDataGrid").datagrid("loaded");
								$("#userRoleDataGrid").datagrid("load");
								$("#userRoleDataGrid").datagrid("unselectAll");
								$.messager.show({
									title : "提示",
									msg : "授权成功"
								});
								//$("#userRole").window("close",true);
							}
						}
					});	
				}else {
					$.messager.alert("警告", "选中要授权的角色", "warning");
				}
			}
		}

		$("#userRoleDataGrid").datagrid( {
			url : "userRoleController.html?userId="+$.trim($("#userId").val()),
			title : "授权用户：${param.username }",
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
				field : "name",
				title : "名称",
				width : 100,
				sortable : true
			}, {
				field : "code",
				title : "编号",
				width : 100,
				sortable : true
			}, {
				field : "descn",
				title : "说明",
				width : 100,
				sortable : true
			},{
				field : "authorize",
				title : "是否授权",
				width : 100,
				formatter : function(value, rowData, rowIndex){
					var temp = rowData["authorize"];
					if(temp==1)
						return "是";
					return "否";
				}
			} ] ],
			toolbar : "#searchUserRoleForm",
			pagination : true,
			pageSize : 2,
			pageList : [ 2, 5, 10, 15, 20 ],
			sortName : "id",
			sortOrder : "asc",
		});
		
		$.parser.parse($('#divBody').parent());
	});
</script>
	</body>
</html>
