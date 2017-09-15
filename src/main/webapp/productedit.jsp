<%@ page language="java" pageEncoding="UTF-8" %>
<%@ include file="/commons/taglib.jsp" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>商品管理</title>
    <%@ include file="/commons/meta.jsp" %>
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
                <input name="productId" id="productId" type="hidden" value="${product.productId }"/>
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
                    商品名字：
                </div>
            </td>
            <td>
                <input id="productName1" name="productName" class="easyui-textbox" value="${product.productName}"/>
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
                    商品类型：
                </div>
            </td>
            <td>
                <input id="productType" name="productType" type="text" class="easyui-textbox"
                       value="${product.productType}"/>
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
                    商品单位：
                </div>
            </td>
            <td>
                <input id="productUnit" class="easyui-textbox" name="productUnit " value="${product.productUnit }"/>
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
                <input id="productPrice" class="easyui-textbox" name="productPrice" value="${product.productPrice}"/>
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
                <input id="productStatus" class="easyui-textbox" name="productStatus" value="${product.productStatus}"/>
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
           /* alert($("#productId").val())
            alert($("#productName1").val())
            alert($("#productType").val())
            alert($("#productUnit").val())
            alert($("#productPrice").val())
            alert($("#productStatus").val())*/
            $.ajax({
                url: "product_save_1",
                type: 'POST',
                data: {
                    productId: $("#productId").val(),
                    productName: $("#productName1").val(),
                    productType: $("#productType").val(),
                    productUnit: $("#productUnit").val(),
                    productPrice: $("#productPrice").val(),
                    productStatus: $("#productStatus").val()
                },
                dataType: 'json',
                success: function (data) {

                    $.messager.show({
                        title: "提示",
                        msg: "商品" + data + "成功!"
                    });
                    $("#productEdit").window("close", true);
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
