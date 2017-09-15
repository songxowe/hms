<%--
	author:SONG
--%>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ include file="commons/taglib.jsp" %>

<!DOCTYPE html>

<html>
<head>
    <TITLE>工厂实训框架 by SONG</TITLE>
    <%@ include file="commons/meta.jsp" %>
    <script src="${pageContext.request.contextPath }/resources/js/Clock.js"></script>
    <script src="${pageContext.request.contextPath }/resources/js/index.js"></script>
    <script src="${pageContext.request.contextPath }/resources/layer/layer.js"></script>


    <style>
        #logorighttop {
            PADDING-RIGHT: 50px;
            BACKGROUND-POSITION: right 50%;
            DISPLAY: block;
            PADDING-LEFT: 0px;
            BACKGROUND-IMAGE: url(${pageContext.request.contextPath }/resources/images/bg_banner_menu.gif);
            PADDING-BOTTOM: 0px;
            PADDING-TOP: 3px;
            BACKGROUND-REPEAT: no-repeat;
            HEIGHT: 30px;
            TEXT-ALIGN: right;
            position: absolute;
            top: 0px;
            right: 0px;
            width: 345px;
        }

        #logorighttop A {
            color: white;
            text-decoration: none;
        }

        #logomenu {
            BACKGROUND-IMAGE: url(${pageContext.request.contextPath }/resources/images/bg_nav.gif);
            BACKGROUND-REPEAT: repeat-x;
            HEIGHT: 30px;
            color: white;
        }

        #logomenu A {
            color: white;
        }

        /**消息提醒**/
        .message {
            position: fixed;
            right: 0px;
            bottom: 0px;
            width: 300px;
            height: 160px;
        }

        .message .black_bg {
            background: #000;
            width: 300px;
            height: 160px;
            position: absolute;
            right: 0px;
            bottom: 0px;
            z-index: 1;
            filter: alpha(opacity=80);
            -moz-opacity: 0.8;
            opacity: 0.8;
        }

        .message .style {
            width: 280px;
            position: absolute;
            left: 10px;
            top: 10px;
            color: #FFF;
            z-index: 2;
            height: 140px;
            overflow-y: scroll;
            scrollbar-arrow-color: #f4ae21;
            scrollbar-face-color: #333;
            scrollbar-3dlight-color: #666;
            scrollbar-highlight-color: #666;
            scrollbar-shadow-color: #999;
            scrollbar-darkshadow-color: #666;
            scrollbar-track-color: #666;
            scrollbar-base-color: #f8f8f8;
            overflow-x: hidden;
        }

        .message .style ul {
            width: 100%;
            padding: 0px 0px
        }

        .message .style ul li {
            width: 100%;
            float: left;
            line-height: 20px;
            padding: 5px 0px;
            border-bottom: 1px dotted #666
        }

        .message .style ul li a {
            color: #FFF
        }

        .message .close {
            width: 22px;
            height: 20px;
            position: absolute;
            top: 0px;
            left: -24px;
        }

        .message .close a {
            filter: alpha(opacity=80);
            -moz-opacity: 0.8;
            opacity: 0.8;
        }

        .message .close a:hover {
            filter: alpha(opacity=100);
            -moz-opacity: 1;
            opacity: 1;
        }

        .message_img {
            position: fixed;
            right: 10px;
            bottom: 0px;
            width: 42px;
            height: 32px;
            text-align: center
        }

        .message_img a {
            filter: alpha(opacity=100);
            -moz-opacity: 1;
            opacity: 1;
        }

        .message_img a:hover {
            filter: alpha(opacity=80);
            -moz-opacity: 0.8;
            opacity: 0.8;
        }

        .message_img .number {
            position: absolute;
            top: -10px;
            right: 2px;
            background: #F00;
            border-radius: 50px;
            color: #FFf;
            text-align: center;
            padding: 2px 7px;
            font-weight: bold
        }

    </style>
    <script type="text/javascript">
        //询问是否退出系统
        function exitSystem() {
            var flag = confirm("真的要退出系统吗？");
            if (flag)
                window.location = "userController_logout.html";
        }

        function showDivChangePassword() {
            $("#passDiv").window({
                title: "修改密码",
                width: 550,
                height: 250,
                modal: true,
                minimizable: false,
                href: "changePassUI.jsp"
            });
        }
    </script>
</head>

<c:if test="${empty sessionScope['NEWER_USER_LOGIN_INFO']}">
    <c:redirect url="login.jsp"/>
</c:if>


<body class="easyui-layout">
<div data-options="region:'north',split:true"
     style="height: 133px; BACKGROUND-IMAGE: url(${pageContext.request.contextPath }/resources/images/bg.gif);">
    <img src="${pageContext.request.contextPath }/resources/images/logo.png" border="0"/>
    <DIV id="logorighttop">
        <IMG src="${pageContext.request.contextPath }/resources/images/menu_seprator.gif" align=absMiddle>
        <A id=HyperLink2 href="javascript:showDivChangePassword()">修改密码</A>
        <IMG src="${pageContext.request.contextPath }/resources/images/menu_seprator.gif" align=absMiddle>
        <A id=HyperLink3 href="javascript:exitSystem()">退出系统</A>
    </DIV>
    <!-- 显示修改密码div -->
    <div id="passDiv"></div>
    <DIV id="logomenu">
        <TABLE cellSpacing="0" cellPadding="0" width="100%">
            <TBODY>
            <TR>
                <TD>
                    <DIV>
                        <IMG src="${pageContext.request.contextPath }/resources/images/nav_pre.gif" align=absMiddle>
                        欢迎
                        <SPAN id=lblBra>牛耳软件工厂</SPAN>
                        [${sessionScope["NEWER_USER_LOGIN_INFO"].username} ] 光临
                    </DIV>
                </TD>
                <TD align=right width="70%">
								<SPAN style="PADDING-RIGHT: 50px"><%--<A href="" target=_top>
										
										<IMG src="images/nav_changePassword.gif" align=absMiddle
											border=0>重新登录 </A> 
										 --%>
										<IMG src="${pageContext.request.contextPath }/resources/images/menu_seprator.gif"
                                             align=absMiddle><SPAN
                                            id="clock"></SPAN>
								</SPAN>

                </TD>
            </TR>
            </TBODY>
        </TABLE>
    </DIV>
    <SCRIPT type=text/javascript>
        var clock = new Clock();
        clock.display(document.getElementById("clock"));
    </SCRIPT>
</div>
<!-- 左边导航菜单 -->
<div data-options="region:'west',title:'导航菜单',split:true"
     style="width: 240px;">
    <ul id="tree" class="easyui-tree">

    </ul>

</div>
<!-- 右边内容部分 -->
<div data-options="region:'center'"
     style="padding: 5px; background: #eee;">
    <div id="divtabs" class="easyui-tabs"  data-options="fit:true,border:false">

    </div>
</div>

<div id="win"></div>


<!--消息提醒-->
<div class="message_img " id="remindicon" style="display: block;">
    <a href="#" id="messageShow">
        <img id="showimg" src="${pageContext.request.contextPath }/resources/page/images/message.png"></a>
    <div class="number" id="messageNum">0</div>
</div>


<script>
    $(function () {

        checkMessage();

        $("#sdsd").trigger("click");//触发button的click事件

        //实时监听未读消息
        $(document).ready(function () {
            window.setInterval(checkMessage, 59000);
        });


    //显示未读消息
        $("#messageShow").click(function showwind() {
                var index = layer.open({
                    type: 2,
                    title:"消息---通知",
                    content: '../../findAllMessage',
                    area: ['70%', '60%'],
                    maxmin: true,
                    cancel:function () {
                        $.ajax({
                            type: 'POST',
                            url: "../../readMessage",
                            data: {},
                            success: function (data) {


                            },
                            dataType: "JSON"
                        })
                    }

                })
            $("#messageNum").text(0);

            })



        function checkMessage() {
            $.ajax({
                type: 'POST',
                url: "../../checkMessage",
                data: {},
                success: function (data) {
                    $("#messageNum").empty()
                    var text = $("#messageNum").text()
                    text += data.count;
                    $("#messageNum").append(text);
                },
                dataType: "JSON"
            })
        }

//        $("#_easyui_tree_3")
    })

</script>
</body>

</html>
