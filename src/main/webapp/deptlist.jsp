<%--
  author:SONG
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>

<!DOCTYPE HTML>
<html>
  <head>
    <title>部门管理</title>
    <%@ include file="commons/meta.jsp"%>
  </head>

  <c:if test="${empty sessionScope['NEWER_USER_LOGIN_INFO']}">
    <c:redirect url="login.jsp"/>
  </c:if>
  
  <body>
  <!-- 0.easyui显示数据 -->
  <div style="margin: 10px 30px">
    <!-- 3.设置 toolbar -->
    <div id="searchDeptForm" style="padding: 10px">
      <!-- 6.操作按钮 (plain:为true时显示简洁效果)-->
      <div style="margin-bottom: 10px">
        <a href="#" class="easyui-linkbutton"
           iconCls="icon-add" plain="true"
           onclick="dept_obj.add();">新增</a>
        <a href="#" class="easyui-linkbutton"
           iconCls="icon-edit" plain="true"
           onclick="dept_obj.edit();">修改</a>
        <a href="#" class="easyui-linkbutton"
           iconCls="icon-save" plain="true"
           style="display: none" id="save"
           onclick="dept_obj.save();">保存</a>
        <a href="#" class="easyui-linkbutton"
           iconCls="icon-redo" plain="true"
           style="display: none" id="redo"
           onclick="dept_obj.redo();">取消编辑</a>
        <a href="#" class="easyui-linkbutton"
           iconCls="icon-remove" plain="true"
           onclick="dept_obj.remove();">删除</a>
      </div>
    
      <!-- 4.条件查询 -->
      <div style="padding: 0 0 0 6px">
        &nbsp;
        部门名:<input class="easyui-textbox" placeholder="部门名" type="text" id="dname" size="6"/>
        部门地址:<input class="easyui-textbox" placeholder="部门地址" type="text" id="loc" size="6"/>
        <a href="#" class="easyui-linkbutton"
           iconCls="icon-search"
           onclick="dept_obj.search();">查询</a>
      </div>
    </div>
    
    <!-- 1.显示表格数据 -->
    <div style="margin-top: 10px">
      <table id="deptDataGrid">
      
      </table>
    </div>
  </div>
	
	<script type="text/javascript">
	  $(function(){
		  dept_obj = { 
       editRow : undefined,
       search : function(){ // 5.条件查询
         $("#deptDataGrid").datagrid('load',{
           dname : $.trim($("#dname").val()),
           loc : $.trim($("#loc").val()),
         });
       },
       add : function(){ // 7.新增操作
         $("#save,#redo").show();
         if(this.editRow == undefined){
           // 在第一行的位置插入一个新行
           $("#deptDataGrid").datagrid("insertRow",{
             index : 0, // 数据行索引
             row : {}
           });
           
           //将第一行设为可编辑状态
           $("#deptDataGrid").datagrid("beginEdit",0);
           this.editRow = 0;
         }
       },
       save : function(){ // 8.保存操作
         //将指定行设为结束编辑状态
         $("#deptDataGrid").datagrid("endEdit",this.editRow);
       },
       redo : function(){  // 9.取消编辑操作
         this.editRow = undefined;
         $("#save,#redo").hide();
         // 回滚所有从创建或者上一次调用acceptChanges函数后更改的数据
         $("#deptDataGrid").datagrid("rejectChanges");
       },
       edit : function(){ // 10.修改操作
         // 返回所有被选中的行，当没有记录被选中的时候将返回一个空数组
         var rows = $("#deptDataGrid").datagrid("getSelections");
         if(rows.length == 1){
          if(this.editRow != undefined){ // add-edit
            $("#deptDataGrid").datagrid("endEdit",this.editRow);
          }
          
           if(this.editRow == undefined){ // edit
            var rowIndex = $("#deptDataGrid").datagrid(
                   "getRowIndex", rows[0]);
             $("#deptDataGrid").datagrid("beginEdit", rowIndex);
             $("#save,#redo").show();
             this.editRow = rowIndex; // 设置当前选中行为编辑行
             // 取消选中 (原因:已知此行是编辑行)
             $("#deptDataGrid").datagrid("unselectRow", rowIndex);
           }
         }else if(rows.length > 1){
            $.messager.alert("警告", "只能选中一行","warning");
         }else{
           $.messager.alert("警告", "必须选中一行","warning");
         }
       },
       remove : function() { // 删除
         // 返回所有被选中的行，当没有记录被选中的时候将返回一个空数组
         var rows = $("#deptDataGrid").datagrid("getSelections");
         if(rows.length > 0) {
           $.messager.confirm("消息","确认真的要删除所选的数据吗",function(flag){
           if(flag){
         var ids = [];
         for(var i=0;i<rows.length;i++){
           ids.push(rows[i].deptno);
         }
         $.ajax({
           type : "post",
           url : "deptController_remove.html",
           data : {
             ids : ids.join(","),
           },
           beforeSend : function(){
           // 显示载入状态
             $("#deptDataGrid").datagrid("loading");
           },
           success : function(data){
             if(data) {
             // 隐藏载入状态
             $("#deptDataGrid").datagrid("loaded");
             // 加载和显示第一页的所有行
             $("#deptDataGrid").datagrid("load");
             // 取消选择所有当前页中所有的行
             $("#deptDataGrid").datagrid("unselectAll");
             $.messager.show({
             title : "提示",
             msg : data + "个部门被删除"
             });
           }
           }
         });
          }
         });
         }else {
           $.messager.alert("警告", "请选中要删除的数据","warning");
         }
       }
		  }
		  
		  
		  
		  // 2.自动加载表格数据
		  $("#deptDataGrid").datagrid({
			  url : "deptController.html",
			  title : '部门列表',
		    fitColumns : true, // 自动展开/收缩列
		    striped : true,    // 显示斑马线效果
		    rownumbers : true, // 行号
		    columns:[[{ // -- 列开始 ---------
          field : 'deptno',  // field 名必需与json中的名一致
          title : '部门号',
          width : 50,
          checkbox : true,
          sortable : true
        },{
          field : 'dname',
          title : '部门名',
          width : 100,
          sortable : true,
          editor : {
            type : "validatebox",
            options : {
              required : true
            }
          }
        },{
          field : 'loc',
          title : '部门地址',
          width : 100,
          sortable : true,
          editor : {  // 编辑器 (新增/修改时编辑字段)
            type : "validatebox",
            options : {
              required : true
            }
          }
        }]], // -- 列结束 ---------
        toolbar : "#searchDeptForm",
        pagination : true, // -- 分页设置 ----
        pageSize : 5,// rows:每页显示的记录条数 (page 控件自动计算)
        pageList : [ 5, 10, 15, 20, 50 ],// 设置每页条数的列表
        sortName : "deptno", // sort:排序列 (默认)
        sortOrder : "asc",  // order:升序/降序 (默认)
        
        // 11.在用户完成编辑一行的时候触发(点击 保存 按钮)，参数包括：
        // rowIndex：编辑行的索引，索引从0开始。
        // rowData：对应于完成编辑的行的记录。
        // changes：更改后的字段(键)/值对。
        onAfterEdit : function(rowIndex, rowData, changes){
          $("#save,#redo").hide();
          
          // 从上一次的提交获取改变的所有行
          var inserted = $("#deptDataGrid").datagrid("getChanges","inserted");
          var updated = $("#deptDataGrid").datagrid("getChanges","updated");
          var url = "deptController_save.html";
          var state = "";
          if(inserted.length > 0){ // 新增
            state = "新增";
          }
          if(updated.length > 0){ // 修改
            state = "修改";
          }
          
          $.ajax({
            url : url,
            type : "post",
            data : {"deptno":rowData.deptno,"dname":rowData.dname,
                    "loc":rowData.loc
                   },
            beforeSend : function(){
              // 显示载入状态
              $("#deptDataGrid").datagrid("loading");
            },
            success : function(data){
              if(data){
                // 隐藏载入状态
                $("#deptDataGrid").datagrid("loaded");
                // 加载和显示第一页的所有行
                $("#deptDataGrid").datagrid("load");
                // 取消选择所有当前页中所有的行
                $("#deptDataGrid").datagrid("unselectAll");
                $.messager.show({
                  title : "提示",
                  msg : data + "个部门被" + state
                });
              }
              dept_obj.editRow = undefined;
            }
          });
        }, // -- end onAfterEdit() -----
        
        // 在用户双击一行的时候触发，参数包括：
        // rowIndex：点击的行的索引值，该索引值从0开始
        // rowData：对应于点击行的记录
        onDblClickRow : function(rowIndex, rowData){
          if (dept_obj.editRow != undefined) {
            $("#deptDataGrid").datagrid("endEdit", dept_obj.editRow);
          }
          if (dept_obj.editRow == undefined) {
            $("#deptDataGrid").datagrid("beginEdit", rowIndex);
            $("#save,#redo").show();
            dept_obj.editRow = rowIndex;
          }
        } // -- end onDblClickRow() ---
        
		  });
	  });
	</script>
</body>
</html>





