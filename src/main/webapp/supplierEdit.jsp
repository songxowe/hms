<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="commons/taglib.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE HTML>
<html>
	<head>
		<title>供应商管理</title>
		<%@ include file="commons/meta.jsp"%>
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
		<form action="" method="post" id="supplierForm" name="supplierForm">
			<table width="500" height="198" id="supplierTable"
				style="margin: 10px auto;">
				<tr>
					<td height="35">
						&nbsp;
					</td>
					<td>
						<div align="right">
							供应商名字：
						</div>
					</td>
					<td>
						<input id="supplierName1" name="supplierName" class="easyui-validatebox" value="${supplier.supplierName }"/>
						<input name="supplierId" id="supplierId" type="hidden" alue="${supplier.supplierId }" />
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
							联系人：
						</div>
					</td>
					<td>
					<input id="supplierContacter" name="supplierContacter" type="text" class="easyui-validatebox" value="${supplier.supplierContacter }" />
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
							电话：
						</div>
					</td>
					<td>
						<input id="supplierPhone" class="easyui-validatebox" name="supplierPhone" value="${supplier.supplierPhone }"/>
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
							地址:
						</div>
					<td>
					<input id="supplierAddress" class="easyui-validatebox" name="supplierAddress" value="${supplier.supplierAddress}"/>
				</td>
					</td>
					<td>
						&nbsp;
					</td>
				</tr>
				<tr>
				<tr>
					<td height="35">
						&nbsp;
					</td>
					<td>
						<div align="right">
							传真:
						</div>
					<td>
						<input id="supplierFax" class="easyui-validatebox" name="supplierFax" value="${supplier.supplierFax}"/>
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
						<input id="supplierStatus" class="easyui-validatebox" name="supplierStatus" value="${supplier.supplierStatus}"/>
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
							<input id="supsubmit" type="button" value="保存" />
							<input type="reset" value="重置" />
						</div>
					</td>
					<td height="20">
						&nbsp;
					</td>
				</tr>
			</table>
		</form>
<script type="text/javascript">
	$(function (){
		$("#supsubmit").click(function () {
            /*$("#supplierForm").form("submit",{
                url : "supplier_findByid",
				onSubmit:function () {
					alert(11)
                },
                success : function(data) {
                   // alert(123)
                    if (data) {
                      //  alert("22222")
                        $.messager.show( {
                            title : "提示",
                            msg : "供应商" + data + "成功!"
                        });
                        //$("#supplieredit").window("close",true);
                    }
                }

            });*/
            $.ajax({
                url : "supplier_save",
				type:'POST',
				data:{
                    supplierId:$("#supplierId").val(),
                    supplierName:$("#supplierName1").val(),
                    supplierContacter:$("#supplierContacter").val(),
                    supplierPhone:$("#supplierPhone").val(),
                    supplierAddress:$("#supplierAddress").val(),
                    supplierFax:$("#supplierFax").val(),
                    supplierStatus:$("#supplierStatus").val()
				},
				dataType:'json',
				success:function (data) {
                    $.messager.show( {
                        title : "提示",
                        msg : "供应商" + data + "成功!"
                    });
                    $("#supplieredit").window("close",true);
                }
			})
        })

	})

</script>
	</body>
</html>
