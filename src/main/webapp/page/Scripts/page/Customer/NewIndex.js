var pager = undefined;
var pageSize = 10;
var reSetTotal = 1;
var PrintZJD = "";

$(function () {
	$('#StartDate').datetimepicker({
		lang: 'ch',
		format: 'Y-m-d H:i',
		timepicker: true
	});
	$('#EndDate').datetimepicker({
		lang: 'ch',
		format: 'Y-m-d H:i',
		timepicker: true
	});
	var result = postSynRequest("/Services/BasicService.aspx", null, "ReportData", "GetDateTime");
	if (result.State.Success) {
		$("#StartDate").val(result.Data.StartDate);
		$("#EndDate").val(result.Data.EndDate);
	}
	var data = postSynRequest("/services/basicservice.aspx", null, "RoomTypeUsl", "GetRoomType");
	if (data.State.Success) {
		var html = "";
		for (var i = 0; i < data.Data.roomtype.length; i++) {
			html += "<option value='" + data.Data.roomtype[i].Id + "'>";
			html += data.Data.roomtype[i].Name;
			html += "</option>";
		}
		$("#RoomType").append(html);
	}
	//20161018  增加协议单位查询条件
	var contractunitOptions = {
		minChars: 1,
		width: 290,
		matchContains: true,
		mustMatch: true,
		formatItem: function (row, rowNum, rowCount, searchItem) {
			return "<span style='width:170px;display:inline-block'>单位：" + row.Name + "</span><span style='width:70px;display:inline-block'>" + row.UnitCode + "</span>";
		},
		formatMatch: function (row, rowNum, rowCount) {
			return row.Name + " " + row.PYM + " " + row.UnitCode;
		},
		formatResult: function (row, rowNum, rowCount) {
			return row.Name;
		}
	};
	var contractUnitData = postSynRequest("/services/basicservice.aspx", null, "RZXX", "GetContractUnitList");
	if (contractUnitData.State.Success) {
		$("#txtContractUnit").autocomplete(contractUnitData.Data.ContractUnitList, contractunitOptions);
		$("#txtContractUnit").result(function (event, data, formatted) {
			if (data != undefined) {
				$("#ContractUnitId").val(data.Id);                //GetContractUnitPrice();
			} else {
				$("#ContractUnitId").val("0");
			}
		});
	}

	pager = new JCPaging('pager', 1, pageSize, 0, function (page) {
		reSetTotal = 0;
		LoadData(page);
	});
	$("#btnSearch").click(function () {
		$("#tbList tbody tr").remove();
		reSetTotal = 1;
		LoadData(1);
	});

	//网格单击事件
	$("#tbList tbody tr").click(function () {
		if ($(this).hasClass("select")) { return; }
		$("#tbList tr").removeClass("select");
		$(this).addClass("select");
	});

	//撤销结账
	var backBill = function (orderno) {
		var url = "/Services/BasicService.aspx";
		var fh = $("#txtFH").val();

		var StartDate = $("#StartDate").val();
		var EndDate = $("#EndDate").val();

		if (!confirm("确定需要撤销结账吗!")) { return; }
		var data = postSynRequest(url, { orderno: orderno, StartDate: StartDate, EndDate: EndDate, votherpath: "/OtherPath/CXJZ.html" }, "BillUSL", "BackBill");
		if (!data.State.Success) {
			alert(data.State.Des);
			return "";
		} else {
			$("#tbList .select").remove();
			alert("操作成功!");

			//判断浏览器处理户籍上传
			try {
				var userAgent = window.navigator.userAgent.toLowerCase();
				if (userAgent == "jchotelclient") {
					top.hujiUploadBatch(data.Data.List);
				}
			}
			catch (e) { }

		}
	};

	//挂单结账
	var gdBill = function (fh, dh) {
		openWin("/FrontOp/Bill.html?fh=" + escape(fh) + "&opkind=3&rzdh=" + dh + "&r=" + Math.random(), 920, 550);
	};

	//结账打印
	var btnJZClick = function (dh) {
		if (dh == "") { alert("请选择打印账单的入住单!"); return; }
		var opname = $("#Options").val();
		if (opname == "3") status = "1";
		else status = "0";
		if (PrintCategory != 2) {
			PrintZJD(dh, status, "");
		} else {
			layer.confirm('请选择账单打印类型？', {
				closeBtn: 0,
				btn: ['明细', '汇总'] //按钮
			}, function () {
				//PrintCategory = 0;
				PrintZJD(dh, status, "", "", 0)
				layer.closeAll()
			}, function () {
				//PrintCategory = 1;
				PrintZJD(dh, status, "", "", 1)
			});
		}
		//openWin("/BillInfor/BillJZD.html?status=" + status + "&orderno=" + dh + "&zws=", 870, 430, "pwin");
	};

	//入住单打印
	var btnRZDClick = function (dh) {
		if (dh == "" || dh == undefined) { alert("请选择打印账单的入住单!"); return; }
		PrintOrderAdd(dh);
		//openWin("/BillInfor/BillRZD.aspx?orderno=" + dh, 800, 430, "pwin");
	};

	//补打续住单
	var btnXZClick = function (dh) {
		if (dh == "" || dh == undefined) { alert("请选择打印账单的入住单!"); return; }
		var result = postSynRequest("/Services/BasicService.aspx", { dh: dh }, "CustomerData", "CheckIsContinueLive");
		var pay = "";
		if (result.State.Success) {
			//pay = result.Data.Pay;
			//if (result.Data.List != null && result.Data.List.length == 1) {
			//    PrintConLiveDY(dh, pay);
			//} else {
			//    $(".tbchooseorder tbody tr").remove();
			//    for (var i = 0; i < result.Data.List.length; i++) {
			//        $(".tbchooseorder tbody").append('<tr><td width="70%">' + formatDateStr(result.Data.List[i].CreateDate, "yyyy-MM-dd hh:mm") + '</td><td width="30%"><span class="qtantj btnchooseorderopt" data-pay="' + result.Data.List[i].PayMethod + '" data-accid="' + result.Data.List[i].Id + '">选择</span></td></tr>');
			//    }
			//    $(".ping_open").show();
			//}
			//openWin("/BillInfor/ConLiveDY.html?orderno=" + dh + "&pay=" + pay, 800, 430, "pwin");

			if (result.Data.length == 1) {
				PrintConLiveDY(dh, result.Data[0].Pay, '', result.Data[0].Id);
			} else {
				$(".tbchooseorder tbody tr").remove();
				for (var i = 0; i < result.Data.length; i++) {
					$(".tbchooseorder tbody").append('<tr><td width="70%">' + formatDateStr(result.Data[i].CreateDate, "yyyy-MM-dd hh:mm") + '</td><td width="30%"><span class="qtantj btnchooseorderopt"  data-dh="' + dh + '"  data-pay="' + result.Data[i].Pay + '" data-accid="' + result.Data[i].Id + '">选择</span></td></tr>');
				}
				$(".ping_open").show();
			}
		} else {
			alert("该房间没有续住");
		}
	}

	$(".btnchooseorderopt").live("click", function () {
		var accId = $(this).attr("data-accid");
		var dh = $(this).attr("data-dh");
		var pay = $(this).attr("data-pay");
		PrintConLiveDY(dh, pay, "", accId);
	});

	//虚拟账单Click事件 
	var btnVirtualBill = function (dh) {
		if (dh == "" || dh == undefined) { alert("请选择打印账单的入住单!"); return; }
		//var id = $(this).parent().parent().attr('data-id');
		openWin('/Customer/VirtualBill.html?id=' + dh, 900, 470);
	}
	var btnBill = function (id, dh) {
		openWin('/Customer/OrderBillDetail.html?id=' + id + '&orderno=' + dh + '', 900, 470);
	}
	//补打发票
	var btnInvoiceRecord = function (dh, xf, fz) {
		if (dh == "" || dh == undefined) {
			alert("请选择补打发票的入住单!");
			return;
		}
		openWin("/Customer/InvoiceRecord.html?groupno=" + dh + "&xf=" + xf + "&fz=" + fz, 600, 230, "pwin");
	}
	//补开发票
	var btnInvoice = function (dh) {
		if (dh == "" || dh == undefined) {
			alert("请选择补打发票的入住单!");
			return;
		}
		openWin("/BillInfor/InvoicePrint.html?OrderNo=" + dh, 1200, 560, "pwin3");

	}
	//挂单恢复入住
	var btnResume = function (dh) {
		if (dh == "" || dh == undefined) { alert("请选择需要恢复入住的账单!"); return; }
		var result = postSynRequest("/Services/BasicService.aspx", { dh: dh }, "CustomerData", "ResumeGD");
		if (result.State.Success) {
			alert("该账单已经恢复入住")

			//判断浏览器处理户籍上传
			try {
				var userAgent = window.navigator.userAgent.toLowerCase();
				if (userAgent == "jchotelclient") {
					top.hujiUploadBatch(data.Data.List);
				}
			}
			catch (e) { }

		} else {
			if (result.State.Des == "31") {
				openWin('/Customer/SelectRoomNo.html?dh=' + dh + '&r=' + Math.random(), 462, 280, "pwin2");
			}
			else
				alert(result.State.Des);
		}
	}
	//补交押金
	var backdeposit = function (id) {
		top.ActiveWin = window;
		BackDepositMethod = LoadData;
		openWin('/FrontOp/BackDeposit.html?id=' + id + "&isst=s&r=" + Math.random(), 862, 280, "pwin2");
	}

	//部分结账
	var backPartialBill = function (id, fh, dh) {
		openWin('/FrontOp/PartBill.html?fh=' + escape(fh) + '&id=' + id + "&opkind=3" + "&rzdh=" + dh + "&r=" + Math.random(), 920, 550);
	}

	//撤销部分结账
	var PartialBillCacel = function (id, fh, dh) {
		var result = postSynRequest("/Services/BasicService.aspx", { dh: dh }, "CustomerData", "CheckIsPartCheckOut");
		if (result.State.Success) {
			openWin('/FrontOp/PartBillCacel.html?fh=' + escape(fh) + '&id=' + id + "&opkind=3" + "&rzdh=" + dh + "&r=" + Math.random(), 860, 400);
		} else
			alert(result.State.Des);
	}

	//网页按钮单击事件
	$(".bus_add").click(function () {
		var dh = $("#tbList .select").attr("tag");
		if (dh == undefined || dh == null) {
			alert("请选择单据!");
			return;
		}
		var fh = $("#tbList .select").attr("fh");
		var id = $("#tbList .select").attr("data-id");
		var kind = $(this).attr("tag");
		switch (kind) {
			case "1":       //撤销结账单
				backBill(dh);
				break;
			case "2":       //挂单结账
				gdBill(fh, dh);
				break;
			case "3":       //补打入住单
				var zdh = $("#tbList .select").attr("data-groupno");
				btnRZDClick(zdh);
				break;
			case "4":       //补打结账单
				btnJZClick(dh);
				break;
			case "5":       //补打续住单
				btnXZClick(dh);
				break;
			case "6":       //账务处理
				btnBill(id, dh);
				break;
			case "7":       //虚拟账单
				var id = $("#tbList .select").attr("data-groupno");
				btnVirtualBill(id)
				break;
			case "8":       //补打发票
				var zdh = $("#tbList .select").attr("data-groupno");
				var xf = $("#tbList .select").attr("data-xf");
				var fz = $("#tbList .select").attr("data-fz");
				if (xf == undefined || fz == undefined) return;
				btnInvoiceRecord(zdh, xf, fz);
				break;
			case "9":
				btnResume(dh);
				$("#btnSearch").click();
				break;
			case "10":
				backdeposit(id);
				break;
			case "11":
				backPartialBill(id, fh, dh);
				break;
			case "12":
				PartialBillCacel(id, fh, dh);
				break;
			case "13"://补开发票                
				btnInvoice(dh);
				break;
		}
	});

	var showButton = function () {
		var opname = $("#Options").val();
		if ($("#btn1").length > 0) $("#btn1").hide();
		$("#btn2").hide();
		$("#btn3").hide();
		$("#btn4").hide();
		$("#btn9").hide();
		$("#btn10").hide();
		$("#btn11").hide();
		$("#btn12").hide();
		$("#btn13").hide();
		$("#btn5").show();
		$("#btn7").show();
		if ($("#btn6").length > 0) $("#btn6").hide();
		$("#date").hide();
		if ($("#btn8").length > 0) $("#btn8").hide();
		switch (opname) {
			case "1"://在住客人
				$("#btn3").show();
				$("#btn12").show();
				if ($("#btn8").length > 0) $("#btn8").show();
				break;
			case "2"://今日预离
				$("#btn3").show();
				break;
			case "3"://已退房
				if ($("#btn1").length > 0) $("#btn1").show();
				$("#btn4").show();
				if ($("#btn6").length > 0) $("#btn6").show();
				if ($("#btn8").length > 0) $("#btn8").show();
				$("#date").show();
				break;
			case "4"://房租催缴
				$("#btn3").show();
				break;
			case "5"://挂单客人
				$("#btn2").show();
				$("#btn3").show();
				$("#btn4").show();
				$("#btn9").show();
				$("#btn10").show();
				$("#date").show();
				$("#btn11").show();
				if ($("#btn6").length > 0) $("#btn6").show();
				break;
			case "6":
				$("#date").show();
				$("#btn5").hide();
				$("#btn7").hide();
				break;
		}
		if (opname == "5") {
			//变更时间到3个月前
		    var Mo = new Date().getMonth() - 3;
		    var startdate = new Date().setMonth(Mo);
			var startdateStr = new Date(startdate).format("yyyy-MM-dd") + " 00:00";
			var enddateStr = formatCurDate("yyyy-MM-dd") + " 23:59";

			$("#StartDate").val(startdateStr);
			$("#EndDate").val(enddateStr);
		}
		else {
			//变更时间为一天
			var date = new Date();
			var dateStr = date.getFullYear() + "-" + ((date.getMonth() + 1).toString().length == 1 ? "0" : "") + (date.getMonth() + 1) + "-" + ((date.getDate() + 1).toString().length == 1 ? "0" : "") + date.getDate();
			$("#StartDate").val(dateStr + " 00:00");
			$("#EndDate").val(dateStr + " 23:59");
		}
		LoadData(1);
	}
	$("#Options").change(showButton);
	showButton();

	$(".orderno").live('click', function () {
		var id = $(this).parent().parent().attr('data-id');
		openWin('/Customer/OrderDetail.html?id=' + id, 900, 580);
	});


	$("#tbList").on("click", "a[data-type='bookno']", function () {
		var bookno = $(this).parent().parent().attr("data-groupno");
		var obj = $(this).parent().parent();
		if ($(this).parent().attr("rowspan") && parseInt($(this).parent().attr("rowspan")) > 1) {
			obj = $("#tbList tr.select:last");
		}
		if ($("#" + bookno).length > 0) {
			$("#" + bookno).remove();
			return;
		}
		var _table = $('<tr id=' + bookno + '><td colspan="18"><table cellpadding="0" cellspacing="0" class="book_import" id="tbdetialList"><thead> <tr> <th style="width: 136px">主账单号</th> <th>单号</th> <th>网络订单</th> <th>房号</th> <th>房型</th> <th>姓名</th> <th>电话</th> <th>会员/协议</th> <th>入住时间</th> <th id="LevaTime">预离时间</th> <th>已住天数</th> <!--<th>房价</th>-->  <!-- <th>预授权</th>--> <th>产生房租</th> <th>消费</th><th>收款</th> <!--<th id="YuE">余额</th> <th style="width: 100px;">备注</th>--> <th>在住情况</th> </tr> </thead><tbody></tbody></table></td></tr>"');
		var GroupNoArr = new Array();
		postRequest("/services/basicservice.aspx", { BookNo: bookno }, "YDXX", "GetOrderInfoByBookNo", false, function (data) {
			if (data.State.Success) {
				if (data.Data.length > 0) {
					var rowItem = "";
					var GroupNo = "";
					for (var i = 0; i < data.Data.length; i++) {
						var item = data.Data[i];
						var MemberOrContract = "";
						if (item.MemberCardNo != "") {
							MemberOrContract = item.MemberCardNo;
						} else if (item.ContractUnitName != "") {
							MemberOrContract = item.ContractUnitName;
						}
						var time = "";
						if (item.Status == 40) {
							time = formatDateStr(item.SettlementDate, "yyyy-MM-dd hh:mm");
						}
						else if (item.Status == 31) {
							time = formatDateStr(item.UpOrderOptDate, "yyyy-MM-dd hh:mm");
						}
						else if (item.Status == 20) {
							time = formatDateStr(item.CheckInOptDate, "yyyy-MM-dd hh:mm");
						}
						else {
							time = item.DepartureTime;
						}

						//rowItem +=' <td style="text-align: right">' + item.Price.toFixed(2) + '</td>';
						if (GroupNo != item.GroupNo) {
							rowItem += '<tr class="' + item.GroupNo + '" fh="' + item.RoomNo + '" data-count="' + item.Count + '"  tag="' + item.OrderNo;
							rowItem += '"  data-groupno="' + item.GroupNo + '" data-id="' + item.Id + '" data-xf="' + parseFloat(item.XF + item.FZ).toFixed(2) + '"><td>';
							rowItem += item.GroupNo + '</td> <td>' + item.OrderNo + '</td><td>' + item.WebNo + '</td><td>' + item.RoomNo + '</td> <td>';
							rowItem += item.RoomTypeName + '</td><td>' + item.CustomerName + '</td><td>' + item.Phone + '</td><td>' + MemberOrContract + '</td><td>';
							rowItem += item.CreateDate + '</td><td>' + time + '</td><td>' + item.Dayss + '</td>';

							//rowItem += '<td style="text-align: right" class="rowspan">' + item.YSC.toFixed(2);
							rowItem += '</td><td style="text-align: center" class="rowspan">' + item.FZ.toFixed(2);
							rowItem += '</td><td style="text-align: center" class="rowspan">' + item.XF.toFixed(2);
							rowItem += '<td style="text-align: center" class="rowspan">' + item.SK.toFixed(2) + '</td>';
							rowItem += '<td>' + item.StrStatusName + '</td></tr>';
						}
						else {
							rowItem += '<tr  fh="' + item.RoomNo + '" data-count="' + item.Count + '"  tag="' + item.OrderNo;
							rowItem += '"  data-groupno="' + item.GroupNo + '" data-id="' + item.Id + '" data-xf="' + parseFloat(item.XF + item.FZ).toFixed(2) + '"><td>';
							rowItem += item.GroupNo + '</td> <td>' + item.OrderNo + '</td><td>' + item.WebNo + '</td><td>' + item.RoomNo + '</td> <td>';
							rowItem += item.RoomTypeName + '</td><td>' + item.CustomerName + '</td><td>' + item.Phone + '</td><td>' + MemberOrContract + '</td><td>';
							rowItem += item.CreateDate + '</td><td>' + time + '</td><td>' + item.Dayss + '</td>';
							rowItem += '<td>' + item.StrStatusName + '</td></tr>';
						}
						GroupNo = item.GroupNo;
						GroupNoArr.push(item.GroupNo);
						//rowItem += '</td><td style="text-align: right" class="rowspan YuE">' + item.YuE.toFixed(2) + '</td>';
						//rowItem += '<td> <a href="javascript:void(0);" onclick="showremark(this)"  class="textoverflow">' + item.Remark + '</a></td>';
					}
					$($(_table).find("table")[0]).append(rowItem);

				}
				$(obj).after(_table);
				for (var n = 0; n < GroupNoArr.length; n++) {
					var groupno = GroupNoArr[n];
					var g = "";
					if (g != groupno) {
						var rowspan = 0;
						for (var k = 0; k < GroupNoArr.length; k++) {
							if (groupno == GroupNoArr[k]) rowspan++;
						}
						$("#tbList tr." + groupno).find(".rowspan").attr("rowspan", rowspan);
					}
					g = groupno;
				}
			}
			else {
				alert(data.State.Errkey);
			}
		});
	});
});

function LoadData(page) {
	if (page == undefined)
		page = 1;
	var startDate = $("#StartDate").val();
	var endDate = $("#EndDate").val();
	var options = $("#Options").val();
	if (options == 3) {
		$("#LevaTime").html("退房时间");
	}
	else if (options == 5) {
		$("#LevaTime").html("挂单时间");
	}
	else if (options == 6) {
		$("#LevaTime").html("撤单时间");
	}
	else {
		$("#LevaTime").html("预离时间");
	}

	var orderNo = $("#OrderNo").val();
	var roomNo = $("#RoomNo").val();
	var MemberCardNo = $("#MemberCardNo").val();
	var name = $("#Name").val();
	var remark = $("#txtRemark").val();
	var KeyStr = $("#KeyStr").val();
	var RoomType = $("#RoomType").val();
	var ContractUnitId = $("#ContractUnitId").val();
	postRequest("/services/basicservice.aspx", {
		page: page,
		pageSize: pageSize,
		startDate: startDate,
		endDate: endDate,
		orderNo: orderNo,
		roomNo: roomNo,
		MemberCardNo: MemberCardNo,
		options: options,
		name: name,
		Remark: remark,
		KeyStr: KeyStr,
		RoomType: RoomType,
		ContractUnitId: ContractUnitId,
		reSetTotal: reSetTotal
	}, "CustomerData", "IndexInitNew", false, function (data) {
		if (data.State.Success) {
			var userAgent = window.navigator.userAgent.toLowerCase();
			//alert(userAgent);
			if (userAgent == "jchotelclient") {
				if ($("#Options").val() == "3" && data.Data.OpenInvoice) {
					$("#btn8").hide();
					$("#btn13").show();
				}
			} else if (data.Data.OpenInvoice) {
				$("#btn8").hide();
			}
			$("body").data("OpenInvoice", data.Data.OpenInvoice);
			$("#tbList tbody tr").remove();
			if (data.Data.List != null && data.Data.List.length > 0) {
				var GroupNo = undefined;
				var firstRow = undefined;
				var rowspan = 0;
				var table = undefined;

				for (var i = 0; i < data.Data.List.length; i++) {
					var strText = '';
					var time = "";
					var a = "";

					var item = data.Data.List[i].MainOrder;
					var itemsonlist = data.Data.List[i].ListOrder;
					if (item.Count > 1) {
						strText = '▲';
						a = '<a href="javascript:void(0)" class="orderhide" onclick="showhide(this);">&nbsp;' + strText + '</a>';
					}
					if (item.Status == 40) {
						time = formatDateStr(item.SettlementDate, "yyyy-MM-dd hh:mm");
						$("#YuE").html("退款");
					}
					else if (item.Status == 31) {
						time = formatDateStr(item.UpOrderOptDate, "yyyy-MM-dd hh:mm");
						$("#YuE").html("余额");
					}
					else if (item.Status == 20) {
						time = formatDateStr(item.CheckInOptDate, "yyyy-MM-dd hh:mm");
						$("#YuE").html("余额");
					}
					else {
						time = item.DepartureTime;
						$("#YuE").html("余额");
					}
					var CustomerName = item.CustomerName;
					if (item.Status == 10) {
						if (item.Secret) {
							CustomerName = "**";
						}
					}
					var MemberOrContract = "";
					if (item.MemberCardNo != "") {
						MemberOrContract = item.MemberCardNo;
					} else if (item.ContractUnitName != "") {
						MemberOrContract = item.ContractUnitName;
					}

					//合并表头
					if (itemsonlist != null && itemsonlist.length > 1) {
						//rowItem = $('<tr  fh="' + item.RoomNo + '" data-count="' + item.Count + '"  tag="' + item.OrderNo + '"  data-groupno="' + item.GroupNo + '" data-id="' + item.Id + '" data-xf="' + parseFloat(item.XF).toFixed(2) + '" data-fz="' + parseFloat(item.FZ).toFixed(2) + '"><td class="rowspan"><a href="javascript:void(0)" class="orderno">' + item.GroupNo + a + '</a></td><td colspan="8"></td><td data-type="dayss">' + item.Dayss + '</td><td style="text-align: right">' + item.Price.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.SK.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.YSC.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.FZ.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.XF.toFixed(2) + '</td><td style="text-align: right" class="rowspan YuE">' + item.YuE.toFixed(2) + '</td><td> <a href="javascript:void(0);" onclick="showremark(this)"  class="textoverflow">' + item.Remark + '</a></td></tr>');
						rowItem = $('<tr  fh="' + item.RoomNo + '" data-count="' + item.Count + '"  tag="' + item.OrderNo + '"  data-groupno="' + item.GroupNo + '" data-id="' + item.Id + '" data-xf="' + parseFloat(item.XF).toFixed(2) + '" data-fz="' + parseFloat(item.FZ).toFixed(2) + '"><td class="rowspan">' + item.OrderNo + a + '</td><td>' + item.WebNo + '</td><td>' + item.RoomNo + '</td> <td>' + item.RoomTypeName + '</td><td>' + CustomerName + '</td><td>' + item.Phone + '</td><td>' + MemberOrContract + '</td><td>' + item.CreateDate + '</td><td>' + time + '</td><td data-type="dayss">' + item.Dayss + '</td><td style="text-align: right">' + item.Price.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.SK.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.YSC.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.FZ.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.XF.toFixed(2) + '</td><td style="text-align: right" class="rowspan YuE">' + item.YuE.toFixed(2) + '</td><td> <a href="javascript:void(0);" onclick="showremark(this)"  class="textoverflow">' + item.Remark + '</a></td></tr>');
						if (item.YuE <= 0) {
							$(rowItem).find(".YuE").css("color", "#F00");
						}
					} else {
						rowItem = $('<tr  fh="' + item.RoomNo + '" data-count="' + item.Count + '"  tag="' + item.OrderNo + '"  data-groupno="' + item.GroupNo + '" data-id="' + item.Id + '" data-xf="' + parseFloat(item.XF).toFixed(2) + '" data-fz="' + parseFloat(item.FZ).toFixed(2) + '"><td class="rowspan"><a href="javascript:void(0)" class="orderno">' + item.OrderNo + a + '</a></td><td>' + item.WebNo + '</td><td>' + item.RoomNo + '</td> <td>' + item.RoomTypeName + '</td><td>' + CustomerName + '</td><td>' + item.Phone + '</td><td>' + MemberOrContract + '</td><td>' + item.CreateDate + '</td><td>' + time + '</td><td data-type="dayss">' + item.Dayss + '</td><td style="text-align: right">' + item.Price.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.SK.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.YSC.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.FZ.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.XF.toFixed(2) + '</td><td style="text-align: right" class="rowspan YuE">' + item.YuE.toFixed(2) + '</td><td> <a href="javascript:void(0);" onclick="showremark(this)"  class="textoverflow">' + item.Remark + '</a></td></tr>');
						if (item.YuE <= 0) {
							$(rowItem).find(".YuE").css("color", "#F00");
						}
					}

					//rowItem = $('<tr  fh="' + item.RoomNo + '" data-count="' + item.Count + '"  tag="' + item.OrderNo + '"  data-groupno="' + item.GroupNo + '" data-id="' + item.Id + '" data-xf="' + parseFloat(item.XF).toFixed(2) + '" data-fz="' + parseFloat(item.FZ).toFixed(2) + '"><td class="rowspan">' + item.GroupNo + a + '</td><td>' + item.WebNo + '</td><td>' + item.RoomNo + '</td> <td>' + item.RoomTypeName + '</td><td>' + CustomerName + '</td><td>' + item.Phone + '</td><td>' + MemberOrContract + '</td><td>' + item.CreateDate + '</td><td>' + time + '</td><td data-type="dayss">' + item.Dayss + '</td><td style="text-align: right">' + item.Price.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.SK.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.YSC.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.FZ.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + item.XF.toFixed(2) + '</td><td style="text-align: right" class="rowspan YuE">' + item.YuE.toFixed(2) + '</td><td> <a href="javascript:void(0);" onclick="showremark(this)"  class="textoverflow">' + item.Remark + '</a></td></tr>');
					//if (item.YuE <= 0) {
					//    $(rowItem).find(".YuE").css("color", "#F00");
					//}

					GroupNo = item.GroupNo;
					$("#mainTable").append(rowItem);

					if (itemsonlist != null && itemsonlist.length > 1) {
						var zdhdayss = 0;
						for (var m = 0; m < itemsonlist.length; m++) {
							var sonitem = itemsonlist[m];
							var sonCustomerName = sonitem.CustomerName;

							zdhdayss += sonitem.Dayss;
							if (sonitem.Status == 10) {
								if (sonitem.Secret) {
									sonCustomerName = "**";
								}
							}
							var sontime = "";
							if (sonitem.Status == 40) {
								sontime = formatDateStr(sonitem.SettlementDate, "yyyy-MM-dd hh:mm");
							}
							else if (sonitem.Status == 31) {
								sontime = formatDateStr(sonitem.UpOrderOptDate, "yyyy-MM-dd hh:mm");
							}
							else if (sonitem.Status == 20) {
								sontime = formatDateStr(sonitem.CheckInOptDate, "yyyy-MM-dd hh:mm");
							}
							else {
								sontime = sonitem.DepartureTime;
							}
							var newMemberOrContract = "";
							if (sonitem.MemberCardNo != "") {
								newMemberOrContract = sonitem.MemberCardNo;
							} else if (sonitem.ContractUnitName != "") {
								newMemberOrContract = sonitem.ContractUnitName;
							}
							var exTable = $("tr[data-gn=" + GroupNo + "]:last");
							if (exTable.length == 0) {
								exTable = $("tr[data-groupno=" + GroupNo + "]");
							}
							exTable.after($('<tr class="sontr" data-gn=' + sonitem.GroupNo + ' tag="' + sonitem.OrderNo + '" data-groupno="' + item.GroupNo + '" data-on=' + sonitem.OrderNo + ' data-id=' + sonitem.Id + ' data-xf="' + parseFloat(sonitem.XF).toFixed(2) + '" data-fz="' + parseFloat(sonitem.FZ).toFixed(2) + '"><td><a href="javascript:void(0)" class="orderno">' + sonitem.OrderNo + '</a></td><td>' + sonitem.WebNo + '</td><td>' + sonitem.RoomNo + '</td> <td>' + sonitem.RoomTypeName + '</td><td>' + sonCustomerName + '</td><td>' + sonitem.Phone + '</td><td>' + newMemberOrContract + '</td><td>' + sonitem.CreateDate + '</td><td>' + sontime + '</td><td>' + sonitem.Dayss + '</td><td style="text-align: right">' + sonitem.Price.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + sonitem.SK.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + sonitem.YSC.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + sonitem.FZ.toFixed(2) + '</td><td style="text-align: right" class="rowspan">' + sonitem.XF.toFixed(2) + '</td><td style="text-align: right" class="rowspan YuE">' + sonitem.YuE.toFixed(2) + '</td><td> <a href="javascript:void(0);" onclick="showremark(this)"  class="textoverflow">' + sonitem.Remark + '</a></td></tr>'));
						}
						//if (zdhdayss>0)
						//    $("tr[data-groupno=" + GroupNo + "]").find("td[data-type='dayss']").html(zdhdayss);
					}

				}
				//网格单击事件
				$("#tbList tbody tr").die().live("click", function () {
					if ($(this).hasClass("select")) { return; }
					$("#tbList tr").removeClass("select");
					$(this).addClass("select");
				});
			} else {
				$("#tbList tbody").append('<tr><td colspan="' + 18 + '" style="color:red">没找到相应的数据</td></tr>');
			}
			$(".orderhide").each(function () {
				if ($(this).html().indexOf('▼') >= 0) {
					$(this).html("▲");
				}
				else {
					$(this).html("▼");
				}
			});
			$("#tbList tr").removeClass("select");
			$(".pageYJ").html(data.Data.ShouKuan.toFixed(2));
			$(".pageFZ").html(data.Data.FangZu.toFixed(2));
			$(".pageXF").html(data.Data.XiaoFei.toFixed(2));
			$(".pageYuE").html(data.Data.YuE.toFixed(2));
			$(".pageYSC").html(data.Data.YSC.toFixed(2));
			$(".pageDays").html(data.Data.Days);

			$(".AllpageYJ").html(data.Data.AllShouKuan.toFixed(2));
			$(".AllpageFZ").html(data.Data.AllFangZu.toFixed(2));
			$(".AllpageXF").html(data.Data.AllXiaoFei.toFixed(2));
			$(".AllpageYuE").html(data.Data.AllYuE.toFixed(2));
			$(".AllpageYSC").html(data.Data.AllYSC.toFixed(2));
			$(".AllpageDays").html(data.Data.AllDays);

			if (reSetTotal == 1) {
				pager.resetTotalCount(data.Data.Total);
			}
			PrintCategory = data.Data.PrintCategory;
		}
	});
}

function showremark(obj) {
	var remark = $(obj).html();
	if (remark != "" && $.trim(remark) != "") {
		layer.tips(remark, $(obj), {
			tips: [1, '#3595CC'],
			time: 3000
		});
	}
}

//2017-4-24 修改:联房展开显示
function showhide(obj) {
	var count = $(obj).parent().parent().attr("data-count");
	if (count > 1) {
		var groupNo = $(obj).parent().parent().attr("data-groupno");
		var table = $("tr[data-gn=" + groupNo + "]");

		if ($(obj).html().indexOf('▼') >= 0) {
			$(obj).html("▲");
			table.show();
		}
		else {
			$(obj).html("▼");
			table.hide();
		}
	}
}