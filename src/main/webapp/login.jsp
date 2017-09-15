<%--
	author:SONG
--%>

<%@ page language="java" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<TITLE>用户登录</TITLE>
		<%@ include file="commons/meta.jsp" %>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/images/login.css" />
		<script type="text/javascript">
		$(function(){
			$(".easyui-textbox").each(function(i){
				var span = $(this).siblings("span")[0];
				var targetInput = $(span).find("input:first");
				if(targetInput){
				  $(targetInput).attr("placeholder", $(this).attr("placeholder"));
				}
			});
		});
		
		function change(){
			var time = new Date();
			var timestamp = time.getSeconds();
			$("#Verify").attr("src","${pageContext.request.contextPath}/imagecode.html?timestamp="+timestamp);			
		}

	</script>
	</head>
	<body>
		<DIV id=div1 style="padding-top:37px;">

			<TABLE id=login height="100%" cellSpacing=0 cellPadding=0 width=800
				align=center>
				<TBODY>
					<TR id=main>
						<TD>
							<form action="userController_login.html" method="post">
								<TABLE height="100%" cellSpacing=0 cellPadding=0 width="100%">
									<TBODY>
										<TR>
											<TD height="190" colSpan=4>
												&nbsp;
											</TD>
										</TR>
										<TR height=30>
											<TD width=380>
												&nbsp;
											</TD>
											<TD>
												&nbsp;
											</TD>
											<TD>
												&nbsp;
											</TD>
											<TD>
												&nbsp;
											</TD>
										</TR>
										<TR height=40>
											<TD rowSpan=4>
												&nbsp;
											</TD>
											<TD>
												&nbsp;
											</TD>
											<TD>
												<input id="loginname" name="username"
												  placeholder="用户名"
													class="easyui-textbox" data-options="iconCls:'icon-man'"
													style="width: 200px" />
											</TD>
											<TD width=120>
												&nbsp;
											</TD>
										</TR>
										<TR height=40>
											<TD>
												&nbsp;
											</TD>
											<TD>
												<input id="loginpwd" name="password" type="password"
												  placeholder="密码"
													class="easyui-textbox" data-options="iconCls:'icon-lock'"
													style="width: 200px" />

											</TD>
											<TD width=120>
												&nbsp;
											</TD>
										</TR>
										<TR height=40>
											<TD>
												&nbsp;
											</TD>
											<TD colspan="2" valign="middle">
												<input id="code" name="verifyCode" type="text"
												  placeholder="验证码"
													style="width: 100px;" class="easyui-textbox"/>
												
												<img align="top" onclick="change()" src="${pageContext.request.contextPath}/imagecode.html" id="Verify"  style="cursor:pointer; height:20px; width: 80px;" alt="看不清，换一张" title="看不清，换一张"/> 
											</TD>
										</TR>
										<TR height=40>
											<TD>&nbsp;</TD>
											<TD>
												<INPUT id="btnLogin" type="submit" value=" 登 录 ">
												<span style="font-size: 20px;color: red">${param.message==0?'验证码错误!':param.message==1?'用户名或密码错误!':'' }</span>
											</TD>
											<TD width="120">
												&nbsp;
											</TD>
										</TR>
										<TR height="110">
											<TD colSpan=4>
												&nbsp;
											</TD>
										</TR>
									</TBODY>
								</TABLE>
							</form>
						</TD>
					</TR>
					<TR id=root height=104>
						<TD>
							&nbsp;
						</TD>
					</TR>
				</TBODY>
			</TABLE>
		</DIV>


	</body>
</html>
