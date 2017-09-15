<%--
	author:SONG
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>

<!DOCTYPE HTML>
<html>
	<head>
		<title>菜单角色管理</title>
		<%@ include file="commons/meta.jsp"%>
	</head>

	<body>
		<style>
.input {
	width: 200px;
	height: 20px;
	border: 1px solid #95B8E7;
}

#menuRoleTable {
	margin: 10px auto;
	border: 1px solid #95B8E7;
	border-collapse: collapse;
}

#menuRoleTable td {
	border: 1px solid #95B8E7;
}
</style>
		<form action="" method="post" id="menuroleForm">
			<table width="300" height="100" id="menuRoleTable">
				<tr height="30">
					<td width="132">
						<div align="right">
							选择角色：
						</div>
					</td>
					<td>
					<input type="text" id="roleSelect" name="roleId"/>
					</td>
				</tr>
				<tr>
					<td>
						<div align="right">
							选择菜单：
						</div>
					</td>
					<td>
						<ul id="menuTree">

						</ul>
					</td>
				</tr>
				<tr height="30">
					<td colspan="2">
						<div align="center">
							<input type="submit" value="保存" />
							<input type="reset" value="重置" />
						</div>
					</td>
				</tr>
			</table>
		</form>
		<script type="text/javascript">
	$(function() {
		$("#menuTree").tree( {
			url : "menuController_indexAll.html",
			lines : true,
			animate : true,
			checkbox : true,
			cascadeCheck : false,
			onLoadSuccess : function(node, data) {
				if (data) {
					$(data).each(function(index, value) {
						if (this.state == "closed") {
							$("#menuTree").tree("expandAll");
						}
					});
					
					// 选中角色对应的菜单
					$("#roleSelect").combobox({
					      url : "menuRoleController.html",
					      valueField : "id",
					      textField : "name",
					      onSelect : function(record){//根据选中的角色id查询显示对应的menu
					        $.ajax({
					           type : "POST",
					           url : "menuRoleController_findMenu.html",
					           data : "roleId="+record["id"],
					           success : function(msg){
					            //alert(msg);
					            var ary = JSON.parse(msg);
					            for(var i=0;i<ary.length;i++){
					              
					              var node = $("#menuTree").tree("find", ary[i]);
					              if (node){
					                // console.log(node.target);
					                $("#menuTree").tree("check",node.target);
					              }                 
					             }
					           }        
					        });
					      },
					      onLoadSuccess : function(){//设置默认选中项
					        $("#roleSelect").combobox("setValue","${role.name }");
					        $("#roleSelect").combobox("select","${role.id }");					        
					      }
					    });					
				}
			}
		});			
	});


	$("#menuroleForm").form( {
	url : "menuRoleController_save.html",
	onSubmit : function(param){
		var nodes = $("#menuTree").tree('getChecked');
		var ids = [];
		for(var i=0;i<nodes.length;i++){
			ids.push(nodes[i].id);
			if(nodes[i].parentId>0){
				ids.push(nodes[i].parentId);
			}
		}
		param.menuIds = ids.join(",");
	},
	success : function(data) {
		if (data) {
			//alert(data);
			$.messager.show( {
				title : "提示",
				msg : "设定角色成功!"
			});
			$("#menuRole").window("close",true);
		}
	}
	});
	</script>
	</body>
</html>
