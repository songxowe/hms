<%@ page language="java" pageEncoding="UTF-8" %>
<%@ include file="../commons/taglib.jsp" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>商品管理</title>
    <%@ include file="../commons/meta.jsp" %>
</head>
<body>
<style>
    .input {
        width: 200px;
        height: 20px;
        border: 1px solid #95B8E7;
    }

    .btn {
        width: 100px;
        height: 20px;
        border: 1px solid #95B8E7;
    }
</style>
<form action="" method="post" id="productForm" name="productForm">
    <table width="500" height="198" id="producTable"
           style="margin: 10px auto;">
        <tr>
            <td height="35">
                &nbsp;
            </td>
            <td>
                <div align="right">
                </div>
            </td>
            <td>
                <input name="expenseId" id="expenseId" type="hidden" value="${expense.expenseId }"/>
            </td>
            <td>
                &nbsp;
            </td>
        </tr>
        <tr>
            <td height="35">
                &nbsp;
            </td>
            <td>
                <div align="right">
                    消费名字：
                </div>
            </td>
            <td>
                <input id="expenseName1" name="expenseName" class="easyui-textbox" value="${expense.expenseName}"/>
            </td>
            <td>
                &nbsp;
            </td>
        </tr>
        <tr>
            <td height="35">
                &nbsp;
            </td>
            <td>
                <div align="right">
                    消费类型：
                </div>
            </td>
            <td>
                <input id="expenseType" name="expenseType" type="text" class="easyui-textbox"
                       value="${expense.expenseType}"/>
            </td>
            <td>
                &nbsp;
            </td>
        </tr>
        <tr>
            <td height="35">
                &nbsp;
            </td>
            <td>
                <div align="right">
                    消费单位：
                </div>
            </td>
            <td>
                <input id="expenseUnit" class="easyui-textbox" name="expenseUnit " value="${expense.expenseUnit }"/>
            </td>
            <td>
                &nbsp;
            </td>
        </tr>
        <tr>
            <td height="35">
                &nbsp;
            </td>
            <td>
                <div align="right">
                    商品单价:
                </div>
            <td>
                <input id="expensePrice" class="easyui-textbox" name="expensePrice" value="${expense.expensePrice}"/>
            </td>
            </td>
            <td>
                &nbsp;
            </td>
        </tr>

        <tr>
            <td height="35">
                &nbsp;
            </td>
            <td>
                <div align="right">
                    状态:
                </div>
            <td>
                <input id="expenseStatus" class="easyui-textbox" name="expenseStatus" value="${expense.expenseStatus}"/>
            </td>
            </td>
            <td>
                &nbsp;
            </td>
        </tr>
        <tr>

            <td>
                &nbsp;
            </td>
            <td colspan="2">
                <div align="center">
                    <input id="submit3" type="button" value="保存"/>
                    <input type="reset" value="重置"/>
                </div>
            </td>
            <td height="20">
                &nbsp;
            </td>
        </tr>
    </table>
</form>
<script type="text/javascript">
    /*      $("#productFrom").form({
              url: "product_save_1",
              type:"post",
              dataType:"json",
              success: function (data) {
                  alert(123)
                  if (data) {
                      $.messager.show({
                          title: "提示",
                          msg: "供应商" + data + "成功!"
                      });
                      $("#supplieredit").window("close",true);
                  }
              }
          })*/
    $(function () {
        $("#submit3").click(function () {
           // alert($("#expenseId").val())
           // alert($("#expenseName1").val())
            //alert($("#expenseType").val())
           // alert($("#expenseUnit").val())
           // alert($("#expensePrice").val())
            //alert($("#expenseStatus").val())
            $.ajax({
                url: "expenseController_save",
                type: 'POST',
                data: {
                    expenseId: $("#expenseId").val(),
                    expenseName: $("#expenseName1").val(),
                    expenseType: $("#expenseType").val(),
                    expenseUnit: $("#expenseUnit").val(),
                    expensePrice: $("#expensePrice").val(),
                    expenseStatus: $("#expenseStatus").val()
                },
                dataType: 'json',
                success: function (data) {

                    $.messager.show({
                        title: "提示",
                        msg: "商品" + data + "成功!"
                    });
                    $("#expenseedit").window("close", true);
                }
            })
        })
    })


    //$(function () {
    //    $("submit3").click(function () {
    //           $.ajax({
    //                url :"product_save",
    //                type:'POST',
    //                data:{
    //                    productId:$("#productId").val(),
    //                    productName:$("#productName1").val(),
    //                    productType:$("#productType").val(),
    //                    productUnit:$("#productUnit").val(),
    //                    productPrice:$("#productPrice").val(),
    //                    productStatus:$("#productStatus").val()
    //                },
    //                dataType:'json',
    //                success:function (data) {
    //                    $.messager.show( {
    //                        title : "提示",
    //                        msg : "商品" + data + "成功!"
    //                    });
    //                    $("#productEdit").window("close",true);
    //                }
    //            })
    //        })
    //
    //    })

</script>
</body>
</html>
