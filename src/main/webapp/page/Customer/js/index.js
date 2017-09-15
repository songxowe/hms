
$(function () {
	$("#dgEmp").datagrid({
		url: "emp",
		title: '员工信息表',
		nowrap: true,//不自动换行	
		striped: true,//设置斑马线
		rownumbers: true,//显示行号
		columns: [[
			{ field: 'id', title: '编号', checkbox: true },
			{
				field: 'empno', title: '主账单号', width: 80,
				formatter: function (value, rowData, rowIndex) {
					var empno = rowData.empno;
					return "<a href='javascript:findEmp(" + empno + ")'>查看详情</a>"
				}
			},
			{ field: 'ename', title: '网络订单', width: 80, sortable: true },
			{ field: 'job', title: '房号', width: 80, sortable: true },
			{ field: 'sal', title: '房型', width: 80, sortable: true },
			{ field: 'hiredate', title: '姓名', width: 60, sortable: true },
			{ field: 'hiredate', title: '电话', width: 60, sortable: true },
			{ field: 'hiredate', title: '会员/协议', width: 60, sortable: true },
			{ field: 'hiredate', title: '入住时间', width: 60, sortable: true },
			{ field: 'hiredate', title: '预离时间', width: 60, sortable: true },
			{ field: 'hiredate', title: '天数', width: 60, sortable: true },
			{ field: 'hiredate', title: '房价', width: 60, sortable: true },
			{ field: 'hiredate', title: '收款', width: 60, sortable: true },
			{ field: 'hiredate', title: '预授权', width: 60, sortable: true },
			{ field: 'hiredate', title: '房租', width: 60, sortable: true },
			{ field: 'hiredate', title: '消费', width: 60, sortable: true },
			{ field: 'hiredate', title: '余额', width: 60, sortable: true },
			{ field: 'hiredate', title: '备注', width: 60, sortable: true }
		]],
		pagination: true,//显示分页工具栏
		pageSize: 10,//初始页大小
		pageList: [2, 5, 10, 20],//定义页大小选择下拉列表值
		sortName: 'empno',//初始排序列名
		sortOrder: 'DESC',//初始排序规则
		toolbar: "#editTool",//绑定工具栏

	});
});


//高级查询按钮点击事件
function advEmp() {
	//向后台传ename参数值，重新加载第一页数据
	$("#dgEmp").datagrid('load', { 'ename': $.trim($("#ename").val()) });
}






