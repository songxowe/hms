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
		<div style="margin: 10px 30px;">
			<a href="#" class="easyui-linkbutton" iconCls="icon-add"
				onclick="menu_obj.showEdit('add')">添加</a>&nbsp;&nbsp;
			<a href="#" class="easyui-linkbutton" iconCls="icon-remove"
				onclick="menu_obj.remove()">删除</a>&nbsp;&nbsp;
			<a href="#" class="easyui-linkbutton" iconCls="icon-edit"
				onclick="menu_obj.showEdit('edit')">修改</a>
			<!-- 新增菜单信息窗口 -->
			<div id="editMenu">

			</div>
			<!-- 菜单列表的工具栏设置 -->
			<div id="searchMenuForm" style="padding: 10px;">
				<div style="padding: 0 0 0 6px;">
					标题：
					<input type="text" id="name" class="easyui-textbox"/>
					说明：
					<input type="text" id="descn" class="easyui-textbox"/>
					父级菜单：
					<select id="parentMenuSelect">
						
					</select>
					<a href="#" class="easyui-linkbutton" iconCls="icon-search"
						onclick=menu_obj.search();>查询</a>
				</div>
			</div>

			<!-- 菜单列表显示 -->
			<div style="margin-top: 20px;">
				<table id="menuDataGrid">

				</table>

			</div>
		</div>
		<script type="text/javascript">
	$(function() {
		menu_obj = {
			search : function() {//查询
				//获得选中的树节点
				var menutree = $("#parentMenuSelect").combotree("tree");
				var node = menutree.tree("getSelected");
				var nodeId = 0;
				if(node!=null)
					nodeId = node.id;
				// alert(nodeId);
				$("#menuDataGrid").datagrid(
						"load",
						{
							name : $.trim($("#name").val()),
							descn : $("#descn").val(),
							parentId : nodeId
						});
			},remove : function(){
				var rows = $("#menuDataGrid").datagrid("getSelections");
				if(rows.length > 0) {
					$.messager.confirm("消息","确认真的要删除所选的数据吗",function(flag){
						if(flag){
							var ids = [];
							for(var i=0;i<rows.length;i++){
								ids.push(rows[i].id);
							}
							$.ajax({
								type : "post",
								url : "menuController_remove.html",
								data : {
									ids : ids.join(","),
								},
								beforeSend : function(){
									$("#menuDataGrid").datagrid("loading");
								},
								success : function(data){
									if(data) {
										$("#menuDataGrid").datagrid("loaded");
										$("#menuDataGrid").datagrid("load");
										$("#menuDataGrid").datagrid("unselectAll");
										$.messager.show({
											title : "提示",
											msg : data + "个菜单被删除"
										});
										$("#parentMenuSelect").combotree("reload");
									}
								}
							});
						}
					});
				}else {
					$.messager.alert("警告", "请选中要删除的数据","warning");
				}
			},
			showEdit : function(state){
				var url = "menuController_findById.html";
				var info = "";
				var id = 0;
				if(state == 'add') {//新增
					info = "新增菜单信息";
				}else {//修改
					info = "修改菜单信息";
					var rows = $("#menuDataGrid").datagrid("getSelections");
					if(rows.length == 1){
						id = rows[0].id;
						url += "?id="+id;
					}else{
						$.messager.alert("警告", "必须选中一行", "warning");
						return;
					}
				}
				$("#editMenu").window({
					title : info,
					width : 550,
					height : 480,
					modal : true,
					minimizable : false,
					href : url,
					onClose : function(){
						$("#menuDataGrid").datagrid(
						"reload");
						$("#parentMenuSelect").combotree("reload");
					}
				});
			}
		}

		//初始化父级菜单下拉框
		$("#parentMenuSelect").combotree({
			url : "menuController_indexAllSearch.html",
			width : 200,
			onLoadSuccess : function(node, data){
				if(data){
					$(data).each(function(index, value){
						if(this.state == "closed"){
							var menutree = $("#parentMenuSelect").combotree("tree");
							menutree.tree("expandAll");
						}
					});
				}
				
			}
		});

		$("#menuDataGrid").datagrid( {
			url : "menuController.html",
			title : "菜单列表",
			fitColumns : true,
			striped : true,
			rownumbers : true,
			columns : [ [ {
				field : "id",
				title : "序号",
				width : 100,
				sortable : true
			}, {
				field : "name",
				title : "标题",
				width : 100,
				sortable : true
			} , {
				field : "seq",
				title : "顺序",
				width : 100,
				sortable : true
			} , {
				field : "descn",
				title : "说明",
				width : 100,
				sortable : true
			} , {
				field : "op1",
				title : "操作",
				width : 100,
				formatter : function(value, rowData, rowIndex){
					var menuId = rowData["id"];
					return "<a href='#' onclick=getMenu("+menuId+")>查看</a>"
				}
			} ] ],
			toolbar : "#searchMenuForm",
			pagination : true,
			pageSize : 2,
			pageList : [ 2, 5, 10, 15, 20 ],
			sortName : "id",
			sortOrder : "asc",
		});
	});

	//查看指定菜单
	function getMenu(menuId){
		$("#editMenu").window({
			title : "查看菜单详情",
			width : 550,
			height : 480,
			modal : true,
			minimizable : false,
			href : "menuController_view.html?id="+menuId
		});
	}
</script>
	</body>
</html>
