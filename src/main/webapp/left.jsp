<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>进销存系统左侧栏菜单</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/sidebar-menu.css">
    <style type="text/css">

    </style>
</head>
<body>
<aside class="main-sidebar">
    <section  class="sidebar">
        <ul class="sidebar-menu">
            <li class="header">简化进销存系统</li>
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-files-o"></i>
                    <span>档案管理</span>
                    <span class="label label-primary pull-right">3</span>
                </a>
                <ul class="treeview-menu" style="display: none;">
                    <li><a href="employee-files.do"><i class="fa fa-circle-o"></i> 员工档案</a></li>
                    <li><a href="goods-files.do"><i class="fa fa-circle-o"></i> 商品档案</a></li>
                    <li><a href="client-files.do"><i class="fa fa-circle-o"></i> 客户档案</a></li>
                </ul>
            </li>
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-pie-chart"></i>
                    <span>销售管理</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="stockOrder.do"><i class="fa fa-circle-o"></i> 订货单</a></li>
                </ul>
            </li>
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-laptop"></i>
                    <span>进货管理</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="stockIn.do"><i class="fa fa-circle-o"></i> 进货单</a></li>
                </ul>
            </li>
        </ul>
    </section>
</aside>

<script src="${pageContext.request.contextPath}/js/jquery-2.1.1.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/sidebar-menu.js"></script>
<script>
    $.sidebarMenu($('.sidebar-menu'))
</script>

</body>
</html>