<%--
  Created by IntelliJ IDEA.
  User: soriqe
  Date: 2017/8/20
  Time: 22:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <%@ include file="commons/meta.jsp" %>
</head>
<body>
<a href="../futureRoomState">Gooooooooooo</a>



<a href="setRoomState">setRoomState</a>

<a href="../roomTypeChange?roomTypeId=6">GGGGGGGGGGGGGGGGGG</a>

<a href="../findFloorAndRoomTypeJson">GGGGGGGGGGGGGGGGGG</a>



<script>
    $(function () {
        $("#click").click(function () {
            alert("------")
            $.confirm({
                title: '添加游戏',
                columnClass: 'col-md-8 col-md-offset-2',
                content: '123content',
                type: 'red',
                icon: 'glyphicon glyphicon-question-sign',
                buttons: {
                    ok: {
                        text: '确认',
                        btnClass: 'btn-primary',
                        action: function () {
                            alert("-------------------")
                        }
                    },
                    cancel: {
                        text: '取消',
                        btnClass: 'btn-primary',
                        action: function () {
                            // button action.
                        }
                    },
                }
            });
        })
    })

</script>
</body>
</html>
