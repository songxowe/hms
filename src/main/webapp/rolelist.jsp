<%--
	author:SONG
--%>

<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>

<!DOCTYPE HTML>
<html>
	<head>
		<title>角色管理</title>
		<%@ include file="commons/meta.jsp"%>
		<script type="text/javascript">
	
</script>
	</head>

	<body>
		<div style="margin: 10px 30px;">
			<!-- 角色列表的工具栏设置 -->
			<div id="searchRoleForm" style="padding: 10px;">
				<div style="margin-bottom: 10px;">
					<a href="#" class="easyui-linkbutton" iconCls="icon-add"
						plain="true" onclick=role_obj.add();>添加</a>
					<a href="#" class="easyui-linkbutton" iconCls="icon-remove"
						plain="true" onclick=role_obj.remove();>删除</a>
					<a href="#" class="easyui-linkbutton" iconCls="icon-edit"
						plain="true" onclick=role_obj.edit();>修改</a>
					<a href="#" class="easyui-linkbutton" iconCls="icon-save"
						plain="true" style="display: none" id="save" onclick=role_obj.save();>保存</a>
					<a href="#" class="easyui-linkbutton" iconCls="icon-redo"
						plain="true" style="display: none" id="redo" onclick=role_obj.redo();>取消编辑</a>
					<a href="#" class="easyui-linkbutton" iconCls="icon-man"
						plain="true" onclick=role_obj.setMenuRole();>设定角色菜单</a>
					<!-- 设定角色菜单信息窗口 -->
					<div id="menuRole">

					</div>
				</div>
				<div style="padding: 0 0 0 6px;">
					名称：
					<input type="text" id="name" class="easyui-textbox"/>
					编号：
					<input type="text" id="code" class="easyui-textbox"/>
					说明：
					<input type="text" id="descn" class="easyui-textbox"/>
					<a href="#" class="easyui-linkbutton" iconCls="icon-search"
						onclick=role_obj.search();>查询</a>
				</div>
			</div>

			<!-- 角色列表显示 -->
			<div style="margin-top: 20px;">
				<table id="roleDataGrid">

				</table>

			</div>
		</div>
		<script type="text/javascript">
	$(function() {
		role_obj = {
			editRow : undefined,
			search : function() {
				$("#roleDataGrid").datagrid(
						"load",
						{
							name : $.trim($("#name").val()),
							code : $.trim($("#code").val()),
							descn : $.trim($("#descn").val())
						});
			},
			add : function() {//添加
				$("#save,#redo").show();
				if (this.editRow == undefined) {
					//插入第一行
					$("#roleDataGrid").datagrid("insertRow", {
						index : 0,
						row : {

						}
					});
					//将第一行设为可编辑状态
					$("#roleDataGrid").datagrid("beginEdit", 0);
					this.editRow = 0;
				}
			},
			save : function() {//保存
				//将第一行设为结束编辑状态
				$("#roleDataGrid").datagrid("endEdit", this.editRow);
			},
			redo : function() {//取消编辑
				this.editRow = undefined;
				$("#save,#redo").hide();
				$("#roleDataGrid").datagrid("rejectChanges");
			},
			edit : function() {//修改
				var rows = $("#roleDataGrid").datagrid("getSelections");
				if (rows.length == 1) {
					if (this.editRow != undefined) {
						$("#roleDataGrid").datagrid("endEdit", this.editRow);
					}
					if (this.editRow == undefined) {
						var rowIndex = $("#roleDataGrid").datagrid(
								"getRowIndex", rows[0]);
						$("#roleDataGrid").datagrid("beginEdit", rowIndex);
						$("#save,#redo").show();
						this.editRow = rowIndex;
						$("#roleDataGrid").datagrid("unselectRow", rowIndex);
					}
				} else {
					$.messager.alert("警告", "必须选中一行", "warning");
				}
			},
			remove : function() {//删除
				var rows = $("#roleDataGrid").datagrid("getSelections");
				if(rows.length > 0) {
					$.messager.confirm("消息","确认真的要删除所选的数据吗",function(flag){
						if(flag){
							var ids = [];
							for(var i=0;i<rows.length;i++){
								ids.push(rows[i].id);
							}
							$.ajax({
								type : "post",
								url : "roleController_remove.html",
								data : {
									ids : ids.join(","),
								},
								beforeSend : function(){
									$("#roleDataGrid").datagrid("loading");
								},
								success : function(data){
									if(data) {
										$("#roleDataGrid").datagrid("loaded");
										$("#roleDataGrid").datagrid("load");
										$("#roleDataGrid").datagrid("unselectAll");
										$.messager.show({
											title : "提示",
											msg : data + "个角色被删除"
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
			setMenuRole(){
				var url = "menuRoleController_findRole.html";
				var info = "菜单角色管理";
				var id = 0;
				var rows = $("#roleDataGrid").datagrid("getSelections");
				if(rows.length == 1){
					id = rows[0].id;
					url += "?id="+id;
				}else if(rows.length>1){
					$.messager.alert("警告", "不能选中多行","warning");
					return;
				}else{
					$.messager.alert("警告", "必须选中一行","warning");
			    return;
				}
				$("#menuRole").window({
					title : info,
					width : 550,
					height : 450,
					modal : true,
					minimizable : false,
					href : url,
					onClose : function(){
						role_obj.search();
					}
				});
			}
		}

		$("#roleDataGrid").datagrid( {
			url : "roleController.html",
			title : "角色列表",
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
				editor : {
					type : "validatebox",
					options : {
						required : true
					}
				},
				sortable : true
			}, {
				field : "code",
				title : "编号",
				width : 100,
				editor : {
					type : "validatebox",
					options : {
						required : true
					}
				},
				sortable : true
			}, {
				field : "descn",
				title : "说明",
				width : 100,
				editor : {
					type : "validatebox",
					options : {
						required : true
					}
				},
				sortable : true
			} ] ],
			toolbar : "#searchRoleForm",
			pagination : true,
			pageSize : 2,
			pageList : [ 2, 5, 10, 15, 20 ],
			sortName : "id",
			sortOrder : "asc",
			onAfterEdit : function(rowIndex, rowData, changes) {
			$("#save,#redo").hide();

			var inserted = $("#roleDataGrid").datagrid("getChanges","inserted");
			var updated = $("#roleDataGrid").datagrid("getChanges","updated");
			var url = "roleController_save.html";
			var state = "";
			if(inserted.length>0) {//新增
				state = "新增";
			}
			if(updated.length>0) {//修改
				state = "修改";
			}
			$.ajax({
				type : "post",
				url : url,
				data : {
					"id":rowData.id,"name":rowData.name,
          "code":rowData.code,"descn":rowData.descn
				},
				beforeSend : function(){
					$("#roleDataGrid").datagrid("loading");
				},
				success : function(data){
					if(data) {
						$("#roleDataGrid").datagrid("loaded");
						$("#roleDataGrid").datagrid("load");
						$("#roleDataGrid").datagrid("unselectAll");
						$.messager.show({
							title : "提示",
							msg : data + "个角色被" + state
						});
					}
					role_obj.editRow = undefined;
				}
			});
			
		},
		onDblClickRow : function(rowIndex, rowData) {
			if (role_obj.editRow != undefined) {
				$("#roleDataGrid").datagrid("endEdit", role_obj.editRow);
			}
			if (role_obj.editRow == undefined) {
				$("#roleDataGrid").datagrid("beginEdit", rowIndex);
				$("#save,#redo").show();
				role_obj.editRow = rowIndex;
			}
		}
		});
	});
</script>
	</body>
</html>
