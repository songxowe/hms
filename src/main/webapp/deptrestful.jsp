<%--
  author:SONG
--%>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE HTML>
<html>
<head>
  <meta charset="UTF-8">
  <title>部门管理</title>
  <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/bootstrap.min.css"/>
</head>

<body>
<div class="container">
  <table class="table table-striped table-hover">
    <caption>雇员管理</caption>
    <thead>
    <tr>
      <th>部门名</th>
      <th>部门地址</th>
      <th>操作</th>
    </tr>
    </thead>
    <tbody id="tbody">
    <!--
    <tr id="10">
      <td>财务部</td>
      <td>长沙</td>
      <td>
        <button type="button" class="btn btn-primary" onclick="editDept(10)">修改</button> &nbsp;&nbsp;
        <button type="button" class="btn btn-danger" onclick="removeDept(10,'Tom')">删除</button>
      </td>
    </tr>
    -->
    </tbody>
  </table>

  <form role="formRole" name="f">
    <div class="form-group">
      <label for="dname">Dname:</label>
      <input id="deptno" type="hidden">
      <input id="dname" placeholder="部门名" class="form-control" type="text">
      <small>*</small>
    </div>
    <div class="form-group">
      <label for="loc">Loc:</label>
      <input id="loc" placeholder="部门地址" class="form-control" type="text">
    </div>
    <button type="button" id="btnAdd" class="btn btn-success btn-block">新增</button>
    <button type="button" id="btnEdit" class="btn btn-primary btn-block">修改</button>
  </form>
</div>

<script src="${pageContext.request.contextPath }/resources/easyui/jquery.min.js"></script>
<script>
  $(function () {
    $("#btnEdit").attr("disabled", "")

    $.ajax({
      type: 'GET',
      url: 'Dept',
      data: {
        page: 1,
        rows: 10,
        sort: 'dname',
        order: 'asc'
      },
      dataType: 'json',
      success: function (data) {
        // alert(data.rows.length);
        $.each(data.rows, function (i) {
          var btnModify = '<button type="button" class="btn btn-primary" onclick="editDept(' + data.rows[i].deptno + ')">修改</button>'

          var btnRemove = '<button type="button" class="btn btn-danger" onclick="removeDept(' + data.rows[i].deptno + ',\'' + data.rows[i].dname + '\')">删除</button>'

          var text = "<tr id=\"" + data.rows[i].deptno + "\"><td>" + data.rows[i].dname + "</td><td>" + data.rows[i].loc + "</td><td>" + btnModify + "&nbsp;&nbsp;" + btnRemove + "</td></tr>"

          $("#tbody").append(text)
        })
      },
      error: function (msg) {
        alert("与服务器连接断开..." + JSON.stringify(msg))
      }
    })

    // 注册新增保存事件
    $("#btnAdd").click(function () {
      $.ajax({
        type: 'post',
        url: 'Dept',
        data: {
          dname: $("#dname").val(),
          loc: $("#loc").val()
        },
        dataType: 'json',
        success: function (data) {
          if (data) {
            location.href = 'deptrestful.jsp'
          }
        },
        error: function (msg) {
          alert("与服务器连接断开..." + JSON.stringify(msg))
        }
      })
    })

    // 注册修改保存事件
    $("#btnEdit").click(function (e) {
      $.ajax({
        type: 'post',
        url: 'Dept',
        data: {
          _method: 'PUT',
          deptno: $("#deptno").val(),
          dname: $("#dname").val(),
          loc: $("#loc").val()
        },
        dataType: 'json',
        success: function (data) {
          if (data) {
            location.href = 'deptrestful.jsp'
          }
        },
        error: function (msg) {
          alert("与服务器连接断开..." + JSON.stringify(msg))
        }
      })
    })
  })

  function removeDept(deptno, dname) {
    if (confirm("是否确认删除 " + dname + " ?")) {
      $.ajax({
        type: 'post',
        url: 'Dept',
        data: {
          _method: 'DELETE',
          ids: deptno
        },
        dataType: 'json',
        success: function (data) {
          if (data) {
            $("#" + deptno).remove();
          }
        },
        error: function (msg) {
          alert("与服务器连接断开..." + JSON.stringify(msg))
        }
      })
    }
  }

  function editDept(deptno) {
    $("#btnAdd").attr("disabled", "")
    $("#btnEdit").removeAttr("disabled")

    $.ajax({
      type: 'get',
      url: 'Dept/' + deptno,
      dataType: 'json',
      success: function (data) {
        if (data) {
          $("#deptno").val(data.deptno)
          $("#dname").val(data.dname)
          $("#loc").val(data.loc)
        }
      },
      error: function (msg) {
        alert("与服务器连接断开..." + JSON.stringify(msg))
      }
    })
  }
</script>
</body>
</html>





