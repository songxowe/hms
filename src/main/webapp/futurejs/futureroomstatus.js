$(function () {
	//初始化控件
	$('#StartDate').datetimepicker({
		lang: 'ch',
		format: 'Y-m-d',
		minDate: '0',
		timepicker: false,
		onSelectDate: function (current_time, $input) {
			var dt = current_time.dateFormat('Y-m-d');
			//重新加载EndDate
			var dtobj = $('<input type="text" style="width: 120px" value="" id="EndDate" />');
			var today = new Date();
			var y = today.getFullYear();
			var m = today.getMonth() + 1;
			var d = today.getDate();
			if (m < 10) {
				m = "0" + m;
			}
			var days = DateDiff(y + "-" + m + "-" + d, dt);
			var minDate = AddDays('1970-01-01', days).replace(/-/g, "/");
			minDate = "-" + minDate;
			$(dtobj).datetimepicker({
				lang: 'ch',
				format: 'Y-m-d',
				minDate: minDate,
				timepicker: false
			});
			var oldobj = $('#EndDate');
			$(oldobj).before(dtobj);
			$(oldobj).remove();
		}
	});
	$('#EndDate').datetimepicker({
		lang: 'ch',
		format: 'Y-m-d',
		minDate: '0',
		timepicker: false
	});

	var today = new Date();
	var y = today.getFullYear();
	var m = today.getMonth() + 1;
	var d = today.getDate();
	if (d < 10) {
		d = "0" + d;
	}
	if (m < 10) {
		m = "0" + m;
	}
	var startDt = y + "-" + m + "-" + d;
	var endDt = AddDays(startDt, 30);
	$("#StartDate").val(startDt);
	$("#EndDate").val(endDt);

	//搜索
	$("#btnSearch").click(function () {
		LoadData();
	});
	$("#btnSearch").click();
});


function LoadData() {
	var startDate = $("#StartDate").val();
	var endDate = $("#EndDate").val();
	var lx = $("#lx").val();
	var roomType = $("#roomType select").val();
	var obj = new Object({ startDate: startDate, endDate: endDate, lx: lx });

	//添加房型参数
	if (lx == 2)
		obj.roomType = roomType;

	if (startDate != "" && endDate != "") {
		postRequest("/services/basicservice.aspx", obj, "YDXX", "QueryFutureRoomStatus", false, function (data) {
			if (data.State.Success) {
				//加载房型选择框
				$("#roomType select").empty();
				$("#roomType select").append($('<option value="">不限</option>'));
				for (var i = 0; i < data.Data.RoomTypes.length; i++) {
					var item = data.Data.RoomTypes[i];
					$("#roomType select").append($('<option value="' + item.Id + '">' + item.Name + '</option>'))
				}
				$("#roomType select").val(roomType);

				$("#tbRoomStatus tr").remove();
				$("#tbRoomStatusLeft tr").remove();
				$("#tbRoomTitle thead tr").remove();
				if (lx == "1") {
					//表头行
					var headTr = $('<tr></tr>');
					$("#tbRoomTitle thead").append(headTr);
					//中间行
					var arrTr = new Array();
					var arrTrRigh = new Array();
					if (data.Data.RoomTypes != null && data.Data.RoomTypes.length > 0) {
						for (var i = 0; i < data.Data.RoomTypes.length; i++) {
							var item = data.Data.RoomTypes[i];
							arrTr[item.Id] = $('<tr  data-roomcount="' + item.RoomCount + '"><td class="tis">' + item.Name + '</td></tr>');
							$("#tbRoomStatusLeft tbody").append(arrTr[item.Id]);
							arrTrRigh[item.Id] = $('<tr  data-roomcount="' + item.RoomCount + '"></tr>');
							$("#tbRoomStatus tbody").append(arrTrRigh[item.Id]);
						}
					}
					//合计行
					var footTr = $('<tr class="heji"><td>合计:</td></tr>');
					$("#tbRoomStatusLeft tfoot").append(footTr);
					var footTrRight = $('<tr class="heji"></tr>');
					$("#tbRoomStatus tfoot").append(footTrRight);

					//预定+在住
					var arrRoomStatus = new Array();
					if (data.Data.RoomStatus != null && data.Data.RoomStatus.length > 0) {
						for (var i = 0; i < data.Data.RoomStatus.length; i++) {
							var item = data.Data.RoomStatus[i];
							arrRoomStatus[item.Key] = item.Value;
						}
					}
					//预离房数
					var arrRoomStatusLeaving = new Array();
					if (data.Data.RoomStatusLeaving != null && data.Data.RoomStatusLeaving.length > 0) {
						for (var i = 0; i < data.Data.RoomStatusLeaving.length; i++) {
							var item = data.Data.RoomStatusLeaving[i];
							arrRoomStatusLeaving[item.Key] = item.Value;
						}
					}

					//处理房态
					for (var dt = startDate; DateDiff(dt, endDate) <= 0; dt = AddDays(dt, 1)) {
						var th = $('<th>' + dt.substring(5) + '</th>');
						$(headTr).append(th);
						//$("#tbRoomTitle thead").append(th);
						var opendTotal = 0;
						var totalRoomCount = 0;
						var leavingTotal = 0;
						var leavingCountAttach = "";
						var stayCountAttach = "";
						if (data.Data.RoomTypes != null && data.Data.RoomTypes.length > 0) {
							for (var i = 0; i < data.Data.RoomTypes.length; i++) {
								var item = data.Data.RoomTypes[i];
								totalRoomCount += parseInt(item.RoomCount);
								var key = dt + "_" + item.Id;
								var leavingCount = arrRoomStatusLeaving[key] == null ? 0 : arrRoomStatusLeaving[key];
								leavingTotal += leavingCount;
								leavingCountAttach = leavingCount.toString();
								if (leavingCount > 0) {
									leavingCountAttach = '<a data-key="' + key + "_Leaving" + '" onclick=showDetail(this); href=javascript:void(0);>' + leavingCountAttach + '</a>';
								}
								if (arrRoomStatus[key] != null && arrRoomStatus[key] != undefined && arrRoomStatus[key] != "") {
									stayCountAttach = arrRoomStatus[key];
									if (stayCountAttach > 0) {
										stayCountAttach = '<a data-key="' + key + "_Stay" + '" onclick=showDetail(this); href=javascript:void(0);>' + stayCountAttach + '</a>';
									}
									var td = $('<td >' + leavingCountAttach + '/' + stayCountAttach + '/' + (item.RoomCount - arrRoomStatus[key]) + '</td>');
									if (arrRoomStatus[key] >= item.RoomCount) {
										$(td).addClass('over');
									}
									if (!$(td).hasClass('over')) {
										$(td).attr("data-date", dt);
										$(td).attr("ondblclick", "btnDBclick(this," + item.Id + ")");
									}
									$(arrTrRigh[item.Id]).append(td);
									opendTotal += parseInt(arrRoomStatus[key]);
								}
								else {
									$(arrTrRigh[item.Id]).append('<td ondblclick="btnDBclick(this,' + item.Id + ')" data-date="' + dt + '">' + leavingCountAttach + '/0/' + item.RoomCount + '</td>');
								}
							}
						}
						$(footTrRight).append('<td>' + leavingTotal + '/' + opendTotal + '/' + (totalRoomCount - opendTotal) + '</td>');
					}
				} else {
					//表头行
					var headTr = $('<tr></tr>');
					$("#tbRoomTitle thead").append(headTr);
					//中间行
					var arrTr = new Array();
					var arrTrRigh = new Array();
					if (data.Data.Rooms != null && data.Data.Rooms.length > 0) {
						for (var i = 0; i < data.Data.Rooms.length; i++) {
							var item = data.Data.Rooms[i];
							arrTr[item.Id] = $('<tr><td style="width: 100px;display: table-cell;background: #EEA12B;color: #FFF;font-weight: lighter;font-size: 12px;line-height: 20px;">' + item.RoomTypeName + '</td><td class="tis">' + item.RoomNo + '</td></tr>');
							$("#tbRoomStatusLeft tbody").append(arrTr[item.Id]);
							arrTrRigh[item.Id] = $('<tr></tr>');
							$("#tbRoomStatus tbody").append(arrTrRigh[item.Id]);
						}
					}

					//构建房态数组
					var arrRoomStatus = new Array();
					if (data.Data.RoomStatus != null && data.Data.RoomStatus.length > 0) {
						for (var i = 0; i < data.Data.RoomStatus.length; i++) {
							var item = data.Data.RoomStatus[i];
							arrRoomStatus[item.Key] = item.Value;
						}
					}

					//订单Id数组
					var arrOrderId = new Array();
					if (data.Data.BookOrderIdDic != null && data.Data.BookOrderIdDic.length > 0) {
						for (var i = 0; i < data.Data.BookOrderIdDic.length; i++) {
							var item = data.Data.BookOrderIdDic[i];
							arrOrderId[item.Key] = item.Value;
						}
					}
					var arrOrderTeamId = new Array();
					if (data.Data.BookOrderTeamIdDic != null && data.Data.BookOrderTeamIdDic.length > 0) {
						for (var i = 0; i < data.Data.BookOrderTeamIdDic.length; i++) {
							var item = data.Data.BookOrderTeamIdDic[i];
							arrOrderTeamId[item.Key] = item.Value;
						}
					}

					//处理房态
					for (var dt = startDate; DateDiff(dt, endDate) <= 0; dt = AddDays(dt, 1)) {
						var th = $('<th>' + dt.substring(5) + '</th>');
						$(headTr).append(th);
						//$("#tbRoomTitle thead").append(th);
						if (data.Data.Rooms != null && data.Data.Rooms.length > 0) {
							for (var i = 0; i < data.Data.Rooms.length; i++) {
								var item = data.Data.Rooms[i];
								var key = dt + "_" + item.RoomNo;
								if (arrRoomStatus[key] != null && arrRoomStatus[key] != undefined && arrRoomStatus[key] != "") {
									var td = "";
									var id = arrOrderId[key];
									var teamId = arrOrderTeamId[key];
									if (arrRoomStatus[key] == "1") {
										if (id == null)
											td = $('<td style="color:#83b224">预留</td>');
										else
										td = $('<td style="color:#db4084" onclick="showOrderDetail(' + id + ')">在住</td>');
									}
									else {
										td = $('<td style="color:#83b224" onclick="showBookDetail(' + id + ',' + teamId + ')">预订</td>');
									}
									$(arrTrRigh[item.Id]).append(td);
								}
								else {

									$(arrTrRigh[item.Id]).append('<td style="color:#0788BE" ondblclick="btnDBclick(this,' + item.RoomTypeId + ')" data-date="' + dt + '" data-roomno="' + item.RoomNo + '">空房</td>');
								}
							}
						}
					}
				}
				//top.dyniframesize('main');
			}
			else {
				alert(data.State.Errkey);
			}
		});
	}
}

function btnDBclick(obj, id) {
	var date = $(obj).attr("data-date");
	var roomno = $(obj).attr("data-roomno");
	if (roomno != undefined) {
		openWin('/Book/BookAdd.html?roomtypeid=' + id + "&date=" + date + "&fh=" + roomno, 900, 400, "pwin");
	} else {
		openWin('/Book/BookAdd.html?roomtypeid=' + id + "&date=" + date, 900, 400, "pwin");
	}
}

//点击数字查看明细展开
function showDetail(obj) {
	if ($("tr.placeHolderTr").length > 0) {
		//清除占位行
		$("tr.placeHolderTr").remove();
		return;
	}

	var ele = $(obj);
	var key = ele.attr("data-key");
	var rowIndex = ele.parent().parent().prevAll("tr").length;
	var colCount = $("#tbRoomTitle th").length;
	var windowWidth = window.innerWidth - 120;
	//console.log(ele.attr("data-key") + "|" + rowIndex);

	//请求数据
	postRequest("/services/basicservice.aspx", { key: key, startDate: $("#StartDate").val(), endDate: $("#EndDate").val() }, "YDXX", "QueryRoomStatusDetail", false, function (data) {
		if (data.State.Success) {
			//console.log(data);
			if (data.Data.length > 0) {
				//创建新表头行
				var newRow = $('<tr class="placeHolderTr"></tr>');
				$(".booking_bottom_left tr:eq(" + rowIndex + ")").after(newRow.clone());

				//创建新表格行
				newRow = newRow.clone().addClass("dataPlaceHolderTr");
				var td = $('<td colspan="' + colCount + '"></td>');
				var innerTable = $('<table style="width:' + windowWidth + 'px;"><thead><th>房间号</th><th>状态</th><th>房间价格</th><th>客人姓名</th><th>到店日期</th><th>预离日期</th><th>客人来源</th><th>备注</th><th>单号</th></thead><tbody></tbody></table>');
				//添加数据
				for (var i = 0; i < data.Data.length; i++) {
					var item = data.Data[i];
					var orderNo = (item.OrderNo == null ? "" : item.OrderNo);
					var orderId = item.Id;
					var teamId = item.TeamId;
					var orderNoAttach = orderNo;
					if (orderNoAttach != "" && orderNoAttach.indexOf('Y') == -1)
						orderNoAttach = '<a href="javascript:void(0);" onclick="showOrderDetail(' + orderId + ');">' + orderNoAttach + '</a>';
					else if (orderNoAttach.indexOf('Y') != -1)
						orderNoAttach = '<a href="javascript:void(0);" onclick="showBookDetail(' + orderId + ',' + teamId + ');">' + orderNoAttach + '</a>';
					var statusName = item.StrStatusName;
					if (statusName == "-") {
						if (item.Status == 4)
							statusName = "预留";
						else
							statusName = "预订";
					}
					var remark = item.Remark;
					var innerTr = $('<tr><td>' + item.RoomNo + '</td><td>' + statusName + '</td><td>' + item.Price + '</td><td>' + item.CustomerName + '</td><td>' + formatDateStr(item.EnterDate) + '</td><td>' + formatDateStr(item.WantLeaveDate) + '</td><td>' + (item.Source == null ? "" : item.Source) + '</td><td><a class="remark" onclick="javascript:showremark(this);">' + remark + '</a></td><td>' + orderNoAttach + '</td></tr>')
					innerTable.find("tbody").append(innerTr);
				}
				td.append(innerTable);
				newRow.append(td);
				$(".booking_bottom_right tr:eq(" + rowIndex + ")").after(newRow);
				//同步占位tr高度
				$(".placeHolderTr").css("height", $(".dataPlaceHolderTr").css("height"));
			}
		}
	});
}

//类型选择
$(document).on("change", "#lx", function () {
	if ($("#lx").val() == 2) {
		$("#roomType").show();
	}
	else {
		$("#roomType").hide();
	}
});

//单号详情
function showOrderDetail(orderId) {
	//console.log("show");
	openWin('/Customer/OrderDetail.html?id=' + orderId, 900, 530);
}

//预定单号详情
function showBookDetail(id, teamId) {
	if (teamId != "0" && teamId != null && teamId != "")
		openWin('/Book/BookAdd.html?id=' + id + '&type=team', 940, 470, "pwin");
	else
		openWin('/Book/BookAdd.html?id=' + id, 940, 470, "pwin");
}

//显示备注
function showremark(obj) {
	var remark = $(obj).html();
	if (remark != "" && $.trim(remark) != "") {
		layer.tips(remark, $(obj), {
			tips: [1, '#3595CC'],
			time: 3000
		});
	}
}