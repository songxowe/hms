<%--
  author:SONG
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>

<!DOCTYPE HTML>
<html>
  <head>
    <title>雇员管理</title>
    <%@ include file="commons/meta.jsp"%>
  </head>

  <body>
    <div style="margin: 10px 30px;">
      <a href="#" class="easyui-linkbutton" iconCls="icon-add"
        onclick="emp_obj.showEdit('add')">添加</a>&nbsp;&nbsp;
      <a href="#" class="easyui-linkbutton" iconCls="icon-remove"
        onclick="emp_obj.remove()">删除</a>&nbsp;&nbsp;
      <a href="#" class="easyui-linkbutton" iconCls="icon-edit"
        onclick="emp_obj.showEdit('edit')">修改</a>
      <!-- 新增雇员信息窗口 -->
      <div id="editEmp">

      </div>
      <!-- 雇员列表的工具栏设置 -->
      <div id="searchEmpForm" style="padding: 10px;">
        <div style="padding: 0 0 0 6px;">
          雇员名:
          <input type="text" id="ename" class="easyui-textbox"/>
         &nbsp;&nbsp;部门:
          <input id="dept" class="easyui-combobox" name="dept"   
               data-options="editable:false,valueField:'deptno',textField:'dname',url:'deptController_find.html'" />
         
          <a href="#" class="easyui-linkbutton" iconCls="icon-search"
            onclick=emp_obj.search();>查询</a>
        </div>
      </div>

      <!-- 雇员列表显示 -->
      <div style="margin-top: 20px;">
        <table id="empDataGrid">

        </table>

      </div>
    </div>
    <script type="text/javascript">
  $(function() {
    emp_obj = {
      search : function() {//查询
        //获得部门号
        var deptno = $('#dept').combobox('getValue');  
        // alert(deptno);
        $("#empDataGrid").datagrid(
            "load",
            {
              ename : $.trim($("#ename").val()),
              deptno : deptno
            });
      },remove : function(){
        var rows = $("#empDataGrid").datagrid("getSelections");
        if(rows.length > 0) {
          $.messager.confirm("消息","确认真的要删除所选的数据吗",function(flag){
            if(flag){
              var ids = [];
              for(var i=0;i<rows.length;i++){
                ids.push(rows[i].empno);
              }
              $.ajax({
                type : "post",
                url : "empController_remove.html",
                data : {
                  ids : ids.join(","),
                },
                beforeSend : function(){
                  $("#empDataGrid").datagrid("loading");
                },
                success : function(data){
                  if(data) {
                    $("#empDataGrid").datagrid("loaded");
                    $("#empDataGrid").datagrid("load");
                    $("#empDataGrid").datagrid("unselectAll");
                    $.messager.show({
                      title : "提示",
                      msg : data + "个雇员被删除"
                    });
                    $('#dept').combobox('reload');      
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
        var url = "empController_findById.html";
        var info = "";
        var id = 0;
        if(state == 'add') {//新增
          info = "新增雇员信息";
        }else {//修改
          info = "修改雇员信息";
          var rows = $("#empDataGrid").datagrid("getSelections");
          if(rows.length == 1){
            id = rows[0].empno;
            url += "?empno="+id;
          }else{
            $.messager.alert("警告", "必须选中一行", "warning");
            return;
          }
        }
        $("#editEmp").window({
          title : info,
          width : 550,
          height : 480,
          modal : true,
          minimizable : false,
          href : url,
          onClose : function(){
            $("#empDataGrid").datagrid(
            "reload");
            $('#dept').combobox('reload');    
          }
        });
      }
    }

    $("#empDataGrid").datagrid( {
      url : "empController.html",
      title : "雇员列表",
      fitColumns : true,
      striped : true,
      rownumbers : true,
      columns : [ [ {
        field : "empno",
        title : "序号",
        width : 100,
        sortable : true
      }, {
        field : "ename",
        title : "雇员名",
        width : 100,
        sortable : true
      } , {
        field : "sal",
        title : "薪资",
        width : 100,
        sortable : true
      } , {
        field : "hiredate",
        title : "入职日期",
        width : 100,
        sortable : true
      } , {
          field : "dept",
          title : "部门",
          width : 100,
          sortable : true
        } ,{
        field : "op1",
        title : "操作",
        width : 100,
        formatter : function(value, rowData, rowIndex){
          var empno = rowData["empno"];
          return "<a href='#' onclick=getEmp("+empno+")>查看</a>"
        }
      } ] ],
      toolbar : "#searchEmpForm",
      pagination : true,
      pageSize : 5,
      pageList : [ 5, 10, 15, 20, 50 ],
      sortName : "empno",
      sortOrder : "asc",
    });
  });

  //查看指定菜单
  function getEmp(empno){
    $("#editEmp").window({
      title : "查看雇员详情",
      width : 550,
      height : 480,
      modal : true,
      minimizable : false,
      href : "empController_view.html?empno="+empno
    });
  }
</script>
  </body>
</html>
