$(function() {
	// 见 easy-ui API
	// 树控件读取URL。子节点的加载依赖于父节点的状态。
	// 当展开一个封闭的节点，如果节点没有加载子节点，
	// 它将会把节点id的值作为http请求参数并命名为'id'，
	// 通过URL发送到服务器上面检索子节点
	// menuAction_index.action?id=1
	$("#tree").tree( {
		url : "menuController_index.do",
		lines : true,
		animate : true,
		onClick : function(node) {
            var tab = $("#divtabs");
            var title = node.text;
            //判断选项页是否存在
            if (tab.tabs('exists', node.text)) {
                tab.tabs('select', node.text);
                return;
            }
            var content;
            if (node.url) {
                content = "<iframe src='" + node.url + "' style='width:100%;height:100%'></iframe>";
            } else {
                content = "该功能尚在开发中....";
            }
            //添加新选项页
            tab.tabs('add', {
                title: node.text,
                content: content,
                closable: true
            });
		}

		
	});
	
});