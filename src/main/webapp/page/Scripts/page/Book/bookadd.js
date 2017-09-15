var PaymentCheckOk = undefined;
var Set_UserRoomDiscount = undefined;
var Set_BookChangePrice = undefined;
var Set_WayPrint = undefined;
var ContractUnitList = undefined;
var MemberPayMthodAuthority = false;
var contractunitOptions = undefined;
var cardOptions = undefined;

$(function () {
	//回车代替TAB
	$("input:text").keypress(function (e) {
		if (e.which == 13) {// 判断所按是否回车键  
			var inputs = $("input:text"); // 获取表单中的所有输入框  
			var idx = inputs.index(this); // 获取当前焦点输入框所处的位置  
			if (idx < inputs.length - 1) {// 判断是否是最后一个输入框  
				inputs[idx + 1].focus(); // 设置焦点  
				inputs[idx + 1].select(); // 选中文字  
			}
			return false; // 取消默认的提交行为  
		}
	});
	var dtToday = "";
	var result = postSynRequest("/services/basicservice.aspx", null, "YDXX", "getDate");
	if (result.State.Success) {
		dtToday = result.Data;
	}
	//是否团队预定
	var type = getUrlParam("type");
	if (type != "" && type == "team") {
		$("#ulTeam").css("display", "block");
		$("#txtBookType").val("1");
	}

	//初始化控件
	$("#btnClose").click(function () {
		closeWin();
	});

	$(document).on("change", "#LeaveDate", function () {
		if (new Date($("#LeaveDate").val()) < new Date($("#EnterDate").val())) {
			$("#LeaveDate").val("");
			return;
		}
	});

	//离开时间选择事件
	var ChangeDate = function (current_time, $input) {
		var EnterDate = "";
		if ($("#EnterDate").val() != "" && $("#EnterDate").val() != undefined && $("#EnterDate").val() != null) {
			EnterDate = $("#EnterDate").val();
		} else {
			EnterDate = $("#StartDate").val();
		}

		//循环更新所有的房型可订间数
		var roomTypeUls = $("ul.show_room");
		for (var i = 0; i < roomTypeUls.length; i++) {
			if ($(roomTypeUls[i]).css("display") == "none")
				continue;
			//房型Id
			var typeId = $(roomTypeUls[i]).find("select").first().val();
			//房间数量元素
			var roomCountEle = $(roomTypeUls[i]).find("span.bookable_count").find("b").first();
			GetMaxBookRoomNom($(roomTypeUls[i]).find("select:eq(0)").val(), EnterDate, $("#LeaveDate").val(), $("#OpenType").val(), roomCountEle);
		}
	}

	$('#EnterDate').datetimepicker({
		lang: 'ch',
		format: 'Y-m-d',
		timepicker: false,
		minDate: '-1970/01/01',
		onSelectDate: function (current_time, $input) {
			var expireDate = $('#ExpireDate').val();
			var dt = current_time.dateFormat('Y-m-d');
			if (expireDate != "") {
				$('#ExpireDate').val(dt + ' ' + expireDate.split(" ")[1]);
			}
			else {
				$('#ExpireDate').val(dt + ' 18:00');
			}
			//重新加载LeaveDate
			var dtobj = $('<input type="text" value="" id="LeaveDate" />');
			var days = DateDiff(dtToday, dt);
			var minDate = AddDays('1970-01-01', days).replace(/-/g, "/");
			minDate = "-" + minDate;
			$('#LeaveDate').datetimepicker({
				lang: 'ch',
				format: 'Y-m-d',
				minDate: minDate,
				timepicker: false,
				onSelectDate: ChangeDate
			});
			$('#LeaveDate').val("");
			$($("ul.show_room")[0]).find("select:eq(0)").change();
		}
	});

	$('#LeaveDate').datetimepicker({
		lang: 'ch',
		format: 'Y-m-d',
		timepicker: false,
		minDate: '-1970/01/01',
		onSelectDate: ChangeDate
	});
	$('#ExpireDate').datetimepicker({
		lang: 'ch',
		format: 'Y-m-d H:i',
		datepicker: false,
		onSelectTime: function (current_time, $input) {
			var enterDate = $('#EnterDate').val();
			var dt = current_time.dateFormat('Y-m-d H:i');
			if (enterDate != "") {
				dt = enterDate + ' ' + current_time.dateFormat('H:i');
			}
			$input.val(dt);
		}
	});



	var cardOptions = {
		minChars: 1,
		width: 420,
		matchContains: true,
		mustMatch: false,
		dataType: 'json',
		selectFirst: true,
		delay: 10,
		extraParams: { IsMustQuery: false },
		parse: function (data) {   // 处理返回的json串，以供后续的使用 
			var rows = [];         // 处理后 返回的一个 数组 
			for (var i = 0; i < data.length; i++) { // 如果你返回的是一个 类似{'my':[{'name':'value1'},{'name':'value2'}]} 
				rows[rows.length] = {
					data: data[i], //返回的参数,供后续的函数调用 
					value: cardOptions.formatItem(data[i]), //鼠标经过时 在 输入框显示的值 
					result: cardOptions.formatResult(data[i])  //选中后在 输入框显示的值 
				}
			}
			return rows;
		},
		formatItem: function (row, rowNum, rowCount, searchItem) {
			return "<span class='memberdata' style='width:150px;display:inline-block'>卡号：" + row.CardNo + "</span><span style='width:50px;margin-right:50px;dispaly:inline-block'>姓名：" + row.MemberName + "</span><br/><span style='width:150px;display:inline-block'>手机：" + row.Phone + "</span><span style='width:70px;display:inline-block'>" + row.CategoryName + "</span>";
		},
		formatMatch: function (row, rowNum, rowCount) {
			return row.CardNo + " " + row.Phone + " " + row.pym;
		},
		formatResult: function (row, rowNum, rowCount) {
			return row.CardNo;
		}
	};

	$("#MemberCardNo").autocomplete("/services/basicservice.aspx?classname=RZXX&method=MemberDataJson", cardOptions);
	$("#MemberCardNo").result(function (event, data, formatted) {
		$(".note_no").remove();
		$(".errorborder").removeClass('errorborder');
		$("#CategoryName").html(data.CategoryName);
	});

	contractunitOptions = {
		minChars: 1,
		width: 420,
		matchContains: true,
		mustMatch: false,
		formatItem: function (row, rowNum, rowCount, searchItem) {
			return "<span style='width:170px;display:inline-block'>单位：" + row.Name + "</span><span style='width:130px;display:inline-block'>编号：" + row.UnitCode + "</span><span style='width:70px;display:inline-block'>" + row.PYM + "</span>";
		},
		formatMatch: function (row, rowNum, rowCount) {
			return row.Name + " " + row.PYM + " " + row.UnitCode;
		},
		formatResult: function (row, rowNum, rowCount) {
			return row.Name;
		}
	};
	var id = getQueryParam("id");
	if (id == undefined || id == "" || id == null) {
		$(".showAmount").removeAttr("style");
		$(".showAmount").attr("style", "margin-right: 0px; display: inline");
		$(".source").hide();
	} else {
		$(".showAmount").removeAttr("style");
		$(".showAmount").attr("style", "margin-right: 0px; display: none");
		$(".source").show();
	}

	var roomid = getQueryParam("roomid");
	var roomtypeid = getQueryParam("roomtypeid");
	var roomNo = getQueryParam("fh");
	postRequest("/services/basicservice.aspx", { id: id }, "YDXX", "BookAddInit", false, function (data) {
		if (data.State.Success) {
			//console.log(data);
			Set_UserRoomDiscount = data.Data.Set_UserRoomDiscount;//操作员折扣
			Set_BookChangePrice = data.Data.Set_BookChangePrice;//预定修改房价
			Set_WayPrint = data.Data.Set_WayPrint;//预定修改房价
			MemberPayMthodAuthority = data.Data.MemberPayMthodAuthority;
			if (getQueryParam("date") != "" && getQueryParam("date") != undefined && getQueryParam("date") != null) {
				$("#EnterDate").val(getQueryParam("date"));
				$("#LeaveDate").val(AddDays(getQueryParam("date"), 1));
				$("#ExpireDate").val(getQueryParam("date") + ' 18:00');
			} else {
				if (data.Data.BookEnterDateType == "2") {//预订时来店时间1明天2今天
					$("#EnterDate").val(dtToday);
					$("#LeaveDate").val(AddDays(dtToday, 1));
					$("#ExpireDate").val(dtToday + ' 18:00');
				} else {
					$("#EnterDate").val(AddDays(dtToday, 1));
					$("#LeaveDate").val(AddDays(dtToday, 2));
					$("#ExpireDate").val(AddDays(dtToday, 1) + ' 18:00');
				}
			}

			if (Set_BookChangePrice == "1") {
				var roomTypes = $("ul.show_room");
				for (var i = 0; i < roomTypes.length; i++) {
					//房价输入框解除禁用
					$(roomTypes[i]).find("input:eq(0)").removeAttr("disabled").css("color", "");
				}
			}
			//绑定房型
			if (data.Data.RoomTypes != null && data.Data.RoomTypes.length > 0) {
				for (var i = 0; i < data.Data.RoomTypes.length; i++) {
					var item = data.Data.RoomTypes[i];
					var StartHourPrice = "0.00";
					var MemberStartHourPrice = "0.00"
					var StartHours = "0.00";
					var HoursRoomCount = "0.00";
					if (item.StartHourPrice != "" && item.StartHourPrice != undefined && item.StartHourPrice != null) {
						StartHourPrice = item.StartHourPrice.toFixed(2);
					}
					if (item.MemberStartHourPrice != "" && item.MemberStartHourPrice != undefined && item.MemberStartHourPrice != null) {
						MemberStartHourPrice = item.MemberStartHourPrice.toFixed(2);
					}
					if (item.StartHours != "" && item.StartHours != undefined && item.StartHours != null) {
						StartHours = item.StartHours.toFixed(2);
					}
					if (item.HoursRoomCount != "" && item.HoursRoomCount != undefined && item.HoursRoomCount != null) {
						HoursRoomCount = item.HoursRoomCount.toFixed(2);
					}
					var roomTypes = $("ul.show_room");
					for (var j = 0; j < roomTypes.length; j++) {
						//绑定房型
						$(roomTypes[j]).find("select:eq(0)").append('<option value="' + item.Id + '" data-allowhour="' + item.AllowHour + '" data-starthourprice="' + StartHourPrice + '" data-memberstarthourprice="' + MemberStartHourPrice + '" data-starthours="' + StartHours + '" data-hoursroomcount="' + HoursRoomCount + '">' + item.Name + '</option>');
					}
				}
			} else {
				var roomTypes = $("ul.show_room");
				for (var j = 0; j < roomTypes.length; j++) {
					//绑定房型
					$(roomTypes[j]).find("select:eq(0)").append('<option value="">请选择房型</option>');
				}
			}

			//绑定客人来源
			if (data.Data.Sources.length > 0) {
				for (var i = 0; i < data.Data.Sources.length; i++) {
					var item = data.Data.Sources[i];
					if (("," + data.Data.Schemes.Source + ",").indexOf("," + item.MXValue + ",") >= 0) {
						$("#Source").append('<option value="' + item.MXName + '">' + item.MXName + '</option>');
					}
					else {
						$("#Source").append('<option value="' + item.MXName + '">' + item.MXName + '</option>');
					}
				}
			}

			//绑定房价方案
			if (data.Data.Schemes != null && data.Data.Schemes.length > 0) {
				for (var i = 0; i < data.Data.Schemes.length; i++) {
					var item = data.Data.Schemes[i];
					var roomTypes = $("ul.show_room");
					for (var j = 0; j < roomTypes.length; j++) {
						//绑定房型
						$(roomTypes[j]).find("select:eq(1)").append('<option value="' + item.Id + '" data-roomtypeid="' + item.RoomTypeId + '" data-source="' + item.Source + '" data-schemetype="' + item.SchemeType + '">[' + item.Breakfast + "]" + item.Name + '</option>');
					}
				}
			} else {
				var roomTypes = $("ul.show_room");
				for (var j = 0; j < roomTypes.length; j++) {
					//绑定房型
					$(roomTypes[j]).find("select:eq(1)").append('<option value="">请选择房价方案</option>');
				}
			}

			//绑定支付方式
			if (data.Data.Paymenteds != null && data.Data.Paymenteds.length > 0) {
				for (var i = 0; i < data.Data.Paymenteds.length; i++) {
					var item = data.Data.Paymenteds[i];
					$("#PayMented").append('<option value="' + item.Id + '">' + item.MXName + '</option>');
				}
			}


			//绑定业务员
			if (data.Data.SalesmanList != null && data.Data.SalesmanList.length > 0) {
				var salesman = $("#Salesman");
				for (var i = 0; i < data.Data.SalesmanList.length; i++) {
					var item = data.Data.SalesmanList[i];
					salesman.append('<option value="' + item.Id + '">' + item.Name + '</option>');
				}
				if (getQueryParam("id") != undefined && getQueryParam("id") != "") {
					salesman.val(data.Data.SalesmanId);
				}
			}

			//绑定会员卡号
			//if (data.Data.MemberCards != null && data.Data.MemberCards.length > 0) {
			//	$("#MemberCardNo").autocomplete(data.Data.MemberCards, cardOptions);
			//	$("#MemberCardNo").result(function (event, data, formatted) {
			//		$(".note_no").remove();
			//		$(".errorborder").removeClass('errorborder');
			//		$("#CategoryName").html(data.CategoryName);
			//	});
			//}
			//else {
			//	$("#MemberCardNo").attr('disabled', 'disabled');
			//	$("#MemberCardNo").val('无可用会员卡');
			//}

			$("ul#room_first").find("select:eq(0)").val(roomtypeid);
			$(".Editing_EnterCount").hide();//已入住房间数（新增时隐藏）
			//修改时加载
			if (id != "" && data.Data.Book != null) {
				$(".Editing_EnterCount").show();//已入住房间数（修改时显示）
				$(".BookNo").show();
				$("#BookNo").html(data.Data.Book[0].BookNo);
				$("#Name").val(data.Data.Book[0].Name);
				$("#Phone").val(data.Data.Book[0].Phone);
				$("#OpenType").val(data.Data.Book[0].OpenType);
				var html = "";
				var rooms = data.Data.EnterRoomOrder.split(',');
				for (var i = 0; i < rooms.length; i++) {
					var room = rooms[i].split('-');
					var ahtml = ""
					if (i != 0) ahtml += ',';
					ahtml += "<a href='../Customer/OrderDetail.html?id=" + room[1] + "' style='text-Decoration: underline;'>";
					ahtml += room[0]
					ahtml += "</a>";
					html += ahtml;
				}
				$("#EnterRoomNo").html(html)
				$("#WarrantMethod").val(data.Data.Book[0].WarrantMethod);
				if (data.Data.Book[0].Status == 9 || data.Data.Book[0].Status == 10) {
					$("#ShowEnterRoomNo").show();
				} else {
					$("#ShowEnterRoomNo").hide();
				}

				$("#Source").val(data.Data.Book[0].Source);
				$("#BookSource").val(data.Data.Book[0].BookSource)
				if (data.Data.Book[0].Source != "" && $("#Source").val() == "") {
					$("#Source").append('<option value="' + data.Data.Book[0].Source + '" selected="selected">' + data.Data.Book[0].Source + '</option>');
					//简单点平台来源不允许修改来源

				}
				if (data.Data.Book[0].Source == "简单点") {
					$("#Source").attr("disabled", "disabled");
				}

				$("#MemberCardNo").val(data.Data.Book[0].MemberCardNo);
				//for (var i = 0; i < data.Data.MemberCards.length; i++) {
				//	if (data.Data.MemberCards[i].CardNo == data.Data.Book[0].MemberCardNo) {
				//		$("#CategoryName").html(data.Data.MemberCards[i].CategoryName);
				//		break;
				//	}
				//}
				//团队预定处理
				if (data.Data.Team) {
					$("#txtTeamName").val(data.Data.Team.Name);
					$("#txtLeaderName").val(data.Data.Team.LeaderName);
					$("#txtLeaderPhone").val(data.Data.Team.LeaderPhone);
				}

				$("#EnterDate").val(data.Data.Book[0].StrEnterDate);
				if (data.Data.Book[0].OpenType == 2) {
					$("#LeaveDate").val(formatDateStr(data.Data.Book[0].LeaveDate, "yyyy-MM-dd hh:mm"));
				} else {
					$("#LeaveDate").val(data.Data.Book[0].StrLeaveDate);
				}
				$("#ExpireDate").val(data.Data.Book[0].StrExpireDate);
				$("#WebNo").val(data.Data.Book[0].WebNo);
				$("#Remark").val(data.Data.Book[0].Remark);
				$("#Detail").val(data.Data.Book[0].Id);
				//展示所有已预定
				for (var i = 0; i < data.Data.Book.length; i++) {
					var ul = null;
					var sel1 = null;
					var sel2 = null;
					var inp1 = null;
					var inp2 = null;
					var b1 = null;

					if (i == 0) {
						ul = $("ul#room_first");
					}
					else if (i == 1) {
						ul = $("ul.show_room:eq(1)");
						ul.show();
					}
					else {
						//复制最后的房型
						ul = $("ul.show_room").last().clone();
						$("ul.show_room").last().after(ul);
						ul.show();
					}
					//控件
					sel1 = ul.find("select:eq(0)");
					sel2 = ul.find("select:eq(1)");
					inp1 = ul.find("input[type=text]:eq(0)");
					inp2 = ul.find("input[type=text]:eq(1)");
					b1 = ul.find("b").last();

					//设定房型
					sel1.val(data.Data.Book[i].RoomTypeId);
					sel1.attr("data-detail", data.Data.Book[i].Id);
					sel1.change();
					//设定具体房价
					inp1.val(data.Data.Book[i].Price.toFixed(2));
					//设定已入住间数
					b1.html(data.Data.Book[i].EnterCount);
					//设定房数
					inp2.val(data.Data.Book[i].RoomCount);
					inp2.attr("data-entercount", data.Data.Book[i].EnterCount);
					//设定房价方案
					sel2.val(data.Data.Book[i].SchemeId);
				}

				if ((parseInt(data.Data.Book[0].Status) == 1 || parseInt(data.Data.Book[0].Status) == 9)
                    && parseInt(data.Data.Book[0].SwitchId) == 0 && data.Data.Book[0].BookSource != "中央预订") {
					//预定按钮变为修改
					$("#btnSubmit").show();
					$("#btnSubmit").val("修改");
					var lis = $("ul.show_room").find("li:eq(4)");
					for (var i = 0; i < lis.length; i++) {
						$(lis[i]).find("input:eq(0)").show();
						$(lis[i]).find("input:eq(1)").show();
					}
				}
				else {
					//隐藏提交按钮
					$("#btnSubmit").hide();
					var lis = $("ul.show_room").find("li:eq(4)");
					for (var i = 0; i < lis.length; i++) {
						//隐藏增减
						$(lis[i]).find("input:eq(0)").hide();
						$(lis[i]).find("input:eq(1)").hide();
					}
				}
				$("#ContractUnit").val(data.Data.Book[0].ContractUnitName);
				$("#ContractUnitId").val(data.Data.Book[0].ContractUnitId);

				//修改时，如果已经入住数大于0，房型和房价方案不允许修改
				//如果有房间入住了，来店时间和离店时间也不能修改
				var IsEnetrRoom = false;//是否有房间入住了
				$(".Editing_EnterCount").each(function () {
					var EnterCount = $(this).find("b").html();
					if (parseInt(EnterCount) > 0) {
						$(this).parent().parent().find("select").attr("disabled", true);//.css("background-color", "#ccc");
						$(this).parent().parent().find("input[name='Price']").attr("disabled", true)
						$(this).parent().parent().find(".dfjydremove").remove();
						if (!IsEnetrRoom) IsEnetrRoom = true;
					}
				});
				if (IsEnetrRoom) {
					$("#EnterDate").attr("disabled", true);
					$("#LeaveDate").attr("disabled", true);
				}


				if (data.Data.Book[0].OpenType == 2) {
					//钟点房
					var uls = $("ul.show_room");
					for (var i = 0; i < uls.length; i++) {
						var scheme = $(uls[i]).find("select:eq(1)");
						scheme.append("<option value='' class='Xuanze' selected='selected'>请选择房价方案</option>");
						scheme.attr("disabled", "disabled");
						scheme.addClass("disabledcolor");

						var typeOptions = $(uls[i]).find("select:eq(0)").find("option");
						typeOptions.each(function () {
							if ($(this).attr("data-allowhour") == "false") {
								$(this).hide();
							}
						});
					}

					$("#LeaveDate").attr("disabled", "disabled");
					$("#LeaveDate").addClass("disabledcolor");

					$("#EnterDate").remove();
					$(".lbldate").after('<input type="text" value="" id="StartDate" style="width: 110px" />');
					$("#StartDate").val(formatDateStr(data.Data.Book[0].EnterDate, "yyyy-MM-dd hh:mm"));
					$("#StartDate").datetimepicker({
						lang: 'ch',
						format: 'Y-m-d H:i',
						timepicker: true,
						minDate: '-1970/01/01',
						onSelectDate: function (current_time, $input) {
							//重新加载LeaveDate
							var dt = current_time.dateFormat('Y-m-d');
							var dtobj = $('<input type="text" value="" id="LeaveDate" />');
							var days = DateDiff(formatDateStr(data.Data.Book[0].EnterDate, "yyyy-MM-dd"), dt);
							var minDate = AddDays('1970-01-01', days).replace(/-/g, "/");
							minDate = "-" + minDate;
							$('#LeaveDate').datetimepicker({
								lang: 'ch',
								format: 'Y-m-d H:i',
								minDate: minDate,
								timepicker: false,
								onSelectDate: ChangeDate
							});
							var LeaveDate = $("#LeaveDate").val();
							$('#ExpireDate').val($("#StartDate").val());
							$('#LeaveDate').val(dt + ' ' + LeaveDate.split(" ")[1]);
							ChangeDate();
						},
						onSelectTime: function (current_time, $input) {
							var startdate = $("#StartDate").val();
							$("#LeaveDate").val(AddHours(startdate, 3));
							$('#ExpireDate').val($("#StartDate").val());
						}
					});
				}

				if (data.Data.Book[0].BookSource == "中央预订") {
					//禁用编辑
					$("#Name").attr("disabled", "disabled");
					$("#Phone").attr("disabled", "disabled");
					$("#WebNo").attr("disabled", "disabled");
					$("#WarrantMethod").attr("disabled", "disabled");
					$("#MemberCardNo").attr("disabled", "disabled");
					$("#EnterDate").attr("disabled", "disabled");
					$("#LeaveDate").attr("disabled", "disabled");
					$("#ExpireDate").attr("disabled", "disabled");
					$("#OpenType").attr("disabled", "disabled");
					$("#Source").attr("disabled", "disabled");
					$("#PayMented").attr("disabled", "disabled");
					$("#Amount").attr("disabled", "disabled");
					$("#WarrantMethod").attr("style", "background:#ddd;border:1px solid #ccc;width: 118px;");
					$("#PayMented").attr("style", "background:#ddd;border:1px solid #ccc;");
					$("#OpenType").attr("style", "background:#ddd;border:1px solid #ccc;width:128px;");
					$("#Source").attr("style", "background:#ddd;border:1px solid #ccc;width: 116px;");

					//禁用编辑
					var uls = $("ul.show_room");
					for (var i = 0; i < uls.length; i++) {
						var roomType = $(uls[i]).find("select:eq(0)");
						var scheme = $(uls[i]).find("select:eq(1)");
						var price = $(uls[i]).find("input[type=text]:eq(0)");
						var count = $(uls[i]).find("input[type=text]:eq(1)");
						var add = $(uls[i]).find("li:eq(4)").find("input:eq(0)")
						var del = $(uls[i]).find("li:eq(4)").find("input:eq(1)")

						roomType.attr("disabled", "disabled");
						roomType.attr("style", "background:#ddd;border:1px solid #ccc;width: 113px;");

						scheme.attr("disabled", "disabled");
						scheme.attr("style", "background:#ddd;border:1px solid #ccc;width: 180px;");

						price.attr("disabled", "disabled");

						count.attr("disabled", "disabled");

						add.attr("disabled", "disabled");
						add.attr("style", "background:#ddd;border:1px solid #ccc;border-color:#ddd !important;width:28px;font-size:22px !important;color: #FFF;font-family: Microsoft YaHei;text-align:center;");
						add.removeClass("dfjyd");

						del.attr("disabled", "disabled");
						del.attr("style", "background:#ddd;border:1px solid #ccc;border-color:#ddd !important;width:28px;margin-left: 10px;font-size:22px !important;color: #FFF;font-family: Microsoft YaHei;text-align:center;");
						del.removeClass("dfjyd");
					}
				}
			} else {
				$("ul#room_first select:eq(0)").change();
				SourceSel(0);
			}
		}
		else {
			alert(data.State.Errkey);
		}
	});

	//操作员折扣
	$(":text[name='Price']").blur(function () {
		if (isNumeric($(this).val())) {
			if (Set_UserRoomDiscount == "1") {
				var roomTypeId = $(this).parent().parent().find("li:eq(0)").val();
				var data = postSynRequest("/services/basicservice.aspx", { RoomTypeId: roomTypeId }, "RZXX", "GetUserDiscount");
				if (data.State.Success) {
					var discountprice = parseFloat($(this).attr("data-price")) * data.Data.Discount;
					var lastprice = $(this).attr("data-lastprice");
					var remark = escape("预定价格修改");
					if (lastprice != undefined && lastprice != "") {
						if ((parseFloat($(this).val()) < parseFloat(lastprice) && parseFloat(lastprice) < discountprice) || (parseFloat($(this).val()) < discountprice && parseFloat(lastprice) >= discountprice)) {//跟熟客上次入住房价比较
							top.AuthorizationWin = window;
							UpdatePrice(index);
							if (data.Data.DiscountAuthorizationType == "1") {//微信授权 2016-01-10                              
								openWin("/FrontOp/WeChatAuthorization.html?remark=" + remark + "&authtype=1&price=" + $(this).attr("data-price") + "&discountprice=" + $(this).val() + "&roomtypeid=" + roomTypeId, 400, 200, "authorizationwin");
							} else
								openWin("/FrontOp/DiscountAuthorization.html?price=" + $(this).attr("data-price") + "&discountprice=" + $(this).val() + "&roomtypeid=" + roomTypeId, 400, 200, "authorizationwin");
						}
					} else if (parseFloat($(this).val()) < discountprice) {
						top.AuthorizationWin = window;
						UpdatePrice(index);
						if (data.Data.DiscountAuthorizationType == "1") {//微信授权 2016-01-10
							openWin("/FrontOp/WeChatAuthorization.html?remark=" + remark + "&authtype=1&price=" + $(this).attr("data-price") + "&discountprice=" + $(this).val() + "&roomtypeid=" + roomTypeId, 400, 200, "authorizationwin");
						} else
							openWin("/FrontOp/DiscountAuthorization.html?price=" + $(this).attr("data-price") + "&discountprice=" + $(this).val() + "&roomtypeid=" + roomTypeId, 400, 200, "authorizationwin");
					}
				}
				else
					alert(data.State.Errkey);
			}
			$(this).val(new Number($(this).val()).toFixed(2));
		}
	});

	//留房时间手动输入
	$("#ExpireDate").change(function () {
		//检查留房时间格式
		var str = $(this).val();

		var stamp = Date.parse(str);

		//验证
		if (($("#EnterDate").val() != null && !RegExp($("#EnterDate").val()).test($(this).val())) || ($("#StartDate").val() != null && !RegExp($("#StartDate").val().split(' ')[0]).test($(this).val())) || stamp != stamp) {
			if ($("#EnterDate").val() == null) {
				var time = str.split(' ')[1];
				if (time == null)
					time = "18:00";
				$(this).val($("#StartDate").val().split(' ')[0] + " " + time);

				var str = $(this).val();
				var stamp = Date.parse(str);
				if (stamp != stamp)
					$(this).val($("#StartDate").val());
			}
			else {
				$(this).val($("#EnterDate").val() + " 18:00");
			}
		}
	});

	//选择客人来源
	$("#Source").change(function () {
		var uls = $("ul.show_room");
		for (var i = 0; i < uls.length; i++) {
			SourceSel(i);
		}
	});

	//选择开房方式
	$("#OpenType").change(function () {
		if ($(this).val() == "2") { //钟点房

			var uls = $("ul.show_room");
			for (var i = 0; i < uls.length; i++) {
				if ($(uls[i]).find("select:eq(0)").find("option:selected").attr("data-allowhour") == "false") {
					$(uls[i]).find("select:eq(0)").find("option:selected").removeAttr("selected");
				}

				var typeOptions = $(uls[i]).find("select:eq(0)").find("option");
				typeOptions.each(function () {
					if ($(this).attr("data-allowhour") == "false") {
						$(this).hide();
					} else {
						$(this).show();
					}
				});

				$(uls[i]).find("select:eq(1)").append("<option value='' class='Xuanze' selected='selected'>请选择房价方案</option>");
				$(uls[i]).find("select:eq(1)").attr("disabled", "disabled");
				$(uls[i]).find("select:eq(1)").addClass("disabledcolor");
			}

			$("#LeaveDate").attr("disabled", "disabled");
			$("#LeaveDate").addClass("disabledcolor");
			$("#EnterDate").remove();

			var result = postSynRequest("/services/basicservice.aspx", null, "YDXX", "getDateTime");
			$(".lbldate").after('<input type="text" id="StartDate" style="width: 110px" />');
			$("#StartDate").val(result.Data);
			$("#LeaveDate").val(AddHours(result.Data, 3));
			$("#ExpireDate").val(result.Data);
			$("#StartDate").datetimepicker({
				lang: 'ch',
				format: 'Y-m-d H:i',
				timepicker: true,
				minDate: '-1970/01/01',
				onSelectDate: function (current_time, $input) {
					//重新加载LeaveDate
					var dt = current_time.dateFormat('Y-m-d');
					var dtobj = $('<input type="text" value="" id="LeaveDate" />');
					var days = DateDiff(dtToday, dt);
					var minDate = AddDays('1970-01-01', days).replace(/-/g, "/");
					minDate = "-" + minDate;
					$('#LeaveDate').datetimepicker({
						lang: 'ch',
						format: 'Y-m-d H:i',
						minDate: minDate,
						timepicker: false,
						onSelectDate: ChangeDate
					});
					var LeaveDate = $("#LeaveDate").val();
					$('#ExpireDate').val($("#StartDate").val());
					$('#LeaveDate').val(dt + ' ' + LeaveDate.split(" ")[1]);
					ChangeDate();
				},
				onSelectTime: function (current_time, $input) {
					var startdate = $("#StartDate").val();
					$("#LeaveDate").val(AddHours(startdate, 3));
					$('#ExpireDate').val($("#StartDate").val());
				}
			});

		} else {  //天房
			if ($("#LeaveDate").hasClass("disabledcolor")) {
				$("#LeaveDate").removeClass("disabledcolor");
				$("#LeaveDate").removeAttr('disabled');
			}

			var uls = $("ul.show_room");
			for (var i = 0; i < uls.length; i++) {
				var scheme = $(uls[i]).find("select:eq(1)");
				if (scheme.hasClass("disabledcolor")) {
					scheme.removeClass("disabledcolor");
				}
				scheme.find("option[class='Xuanze']").remove();
				scheme.removeAttr('disabled');

				var typeOptions = $(uls[i]).find("select:eq(0)").find("option");
				typeOptions.each(function () {
					if ($(this).attr("data-allowhour") == "false" || $(this).attr("data-allowhour") == "true") {
						$(this).show();
					}
				});
			}

			$("#StartDate").remove();
			$(".lbldate").after('<input type="text" id="EnterDate" style="width: 110px" />');
			$("#EnterDate").val(AddDays(dtToday, 1));
			$("#LeaveDate").val(AddDays(dtToday, 2));
			$("#ExpireDate").val(AddDays(dtToday, 1) + " 18:00");
			$('#EnterDate').datetimepicker({
				lang: 'ch',
				format: 'Y-m-d',
				timepicker: false,
				minDate: '-1970/01/01',
				onSelectDate: function (current_time, $input) {
					var expireDate = $('#ExpireDate').val();
					var dt = current_time.dateFormat('Y-m-d');
					if (expireDate != "") {
						$('#ExpireDate').val(dt + ' ' + expireDate.split(" ")[1]);
					}
					else {
						$('#ExpireDate').val(dt + ' 18:00');
					}
					//重新加载LeaveDate
					var dtobj = $('<input type="text" value="" id="LeaveDate" />');
					var days = DateDiff(dtToday, dt);
					var minDate = AddDays('1970-01-01', days).replace(/-/g, "/");
					minDate = "-" + minDate;
					$('#LeaveDate').datetimepicker({
						lang: 'ch',
						format: 'Y-m-d',
						minDate: minDate,
						timepicker: false,
						onSelectDate: ChangeDate
					});
					$('#LeaveDate').val("");
					$("#SchemeId").change();
				}
			});
		}
		var uls = $("ul.show_room");
		for (var i = 0; i < uls.length; i++) {
			$(uls[i]).find("select:eq(0)").change();
		}
	});

	//房型选择事件
	$(document).on("change", ".sel_roomType", function () {
		var uls = $("ul.show_room");
		var i = $(this).parent().parent().prevAll("ul.show_room").length;
		SourceSel(i);
		var EnterDate = "";
		if ($("#EnterDate").val() != "" && $("#EnterDate").val() != undefined && $("#EnterDate").val() != null) {
			EnterDate = $("#EnterDate").val();
		} else {
			EnterDate = $("#StartDate").val();
		}
		var ele = $(this).parent().parent().find(".bookable_count b");
		if ($("#LeaveDate").val() != "" && $("#LeaveDate").val() != null && EnterDate != "" && EnterDate != null)
			GetMaxBookRoomNom($(uls[i]).find("select:eq(0)").val(), EnterDate, $("#LeaveDate").val(), $("#OpenType").val(), ele);
	});

	//房价方案选择事件
	$(document).on("change", ".sel_scheme", function () {
		var uls = $("ul.show_room");
		var i = $(this).parent().parent().prevAll("ul.show_room").length;
		Scheme(i);
	});

	//房间数绑定事件
	$(document).on("click", "input.inc_room", function () {
		var RoomCount = parseInt($(this).prev("input").val());
		if (RoomCount < 99) {
			$(this).prev("input").val(RoomCount + 1);
		}
	});
	$(document).on("click", "input.dec_room", function () {
		var RoomCount = parseInt($(this).next("input").val());
		var EnterCount = parseInt($(this).next("input").attr("data-entercount"));
		if (RoomCount > 1 && RoomCount > EnterCount) {
			$(this).next("input").val(RoomCount - 1);
		}
	});

	//提交表单
	$("#btnSubmit").click(function () {
		//if (top.$(".authorizationwin").css("display") != "none")
		//	return;
		var postData = preSave();
		//console.log(postData);
		if (!postData) {
			return false;
		}
		if (postData.PayMentedId == "-2" && parseFloat(postData.Amount) > 0) {
			var url = "/member/payment.html?canedit=0&&cardno=" + postData.MemberCardNo + "&amount=" + postData.Amount;
			top.ActiveWin = window;
			openWin(url, 370, 400, 'paymentwin');
			PaymentCheckOk = function (cardNo, amount, usableAmount) {
				$("#btnSubmit").removeClass("bus_add");
				$("#btnSubmit").addClass("bus_dell");
				$("#btnSubmit").attr("disabled", "disabled");
				postRequest("/services/basicservice.aspx", postData, "YDXX", "BookAdd", false, function (data) {
					if (data.State.Success) {
						if (getQueryParam("id") == null || getQueryParam("id") == undefined || getQueryParam("id") == "") {
							if (Set_WayPrint != "2" && Set_WayPrint != undefined) {
								if (confirm("预订成功！是否需要打印凭证?")) {
									PrintBookingOrder(data.Data.BookNo, "y", Set_WayPrint);
									// openWin("/BillInfor/BillYJPZ.html?BookNo=" + data.Data.BookNo + "&type=y", 800, 400, "pwin2", Set_WayPrint);
								}
							}
							else {
								alert("预订成功！");
							}
						} else {
							alert("操作成功！");
						}
						RefreshParentWin(3);
					}
					else {
						$("#btnSubmit").removeClass("bus_dell");
						$("#btnSubmit").addClass("bus_add");
						$("#btnSubmit").removeAttr("disabled");
						alert(data.State.Errkey);
					}
				});
			}

		} else if (postData.PayMentedId == "-4" || postData.PayMentedId == "-9") {
			$("#btnSubmit").removeClass("bus_add");
			$("#btnSubmit").addClass("bus_dell");
			$("#btnSubmit").attr("disabled", "disabled");
			postRequest("/services/basicservice.aspx", postData, "YDXX", "BookAdd", false, function (data) {
				if (data.State.Success) {
					if (postData.Amount > 0) {///存在订金的时候
						//微信支付 处理
						var payType = postData.PayMethodName.indexOf("闪") >= 0 ? 2 : 1;
						if (postData.PayMentedId == "-4") {
							openWin("/wepayrequest.aspx?orderNo=" + data.Data.BookNo + "&totalFee=" + postData.Amount + "&Type=" + payType + "&productId=YJ" + data.Data.BookNo + "|" + data.Data.AccId + "&orderDetail=" + "单号=" + data.Data.BookNo, 520, 400, 'paywin', "", function (callbackdata) {
								var payResult = postSynRequest("/services/basicservice.aspx", { OrderNo: data.Data.BookNo, AccId: data.Data.AccId, PayMethod: 1 }, "RZXX", "PayHandle");
								if (!payResult.State.Success) {
									alert(payResult.State.Des);
								}
								if (getQueryParam("id") == null || getQueryParam("id") == undefined || getQueryParam("id") == "") {
									if (Set_WayPrint != "2" && Set_WayPrint != undefined) {
										if (confirm("预订成功！是否需要打印凭证?")) {
											PrintBookingOrder(data.Data.BookNo, "y", Set_WayPrint);
										}
									} else {
										alert("预订成功！");
									}
								} else {
									alert("操作成功！");
								}
								RefreshParentWin(3);
							}, data.Data);
						}
						else if (postData.PayMentedId == "-9") {
							openWin("/alipayrequest.aspx?orderNo=" + data.Data.BookNo + "&totalFee=" + postData.Amount + "&Type=" + payType + "&productId=YJ" + data.Data.BookNo + "|" + data.Data.AccId + "&orderDetail=" + "单号=" + data.Data.BookNo, 520, 400, 'paywin', "", function (callbackdata) {
								var payResult = postSynRequest("/services/basicservice.aspx", { OrderNo: data.Data.BookNo, AccId: data.Data.AccId, PayMethod: 2 }, "RZXX", "PayHandle");
								if (!payResult.State.Success) {
									alert(payResult.State.Des);
								}
								if (getQueryParam("id") == null || getQueryParam("id") == undefined || getQueryParam("id") == "") {
									if (Set_WayPrint != "2" && Set_WayPrint != undefined) {
										if (confirm("预订成功！是否需要打印凭证?")) {
											PrintBookingOrder(data.Data.BookNo, "y", Set_WayPrint);
										}
									} else {
										alert("预订成功！");
									}
								} else {
									alert("操作成功！");
								}
								RefreshParentWin(3);
							}, data.Data);
						}
					} else {
						if (getQueryParam("id") == null || getQueryParam("id") == undefined || getQueryParam("id") == "") {
							if (Set_WayPrint != "2" && Set_WayPrint != undefined) {
								if (confirm("预订成功！是否需要打印凭证?")) {
									PrintBookingOrder(data.Data.BookNo, "y", Set_WayPrint);
								}
							} else {
								alert("预订成功！");
							}
						} else {
							alert("操作成功！");
						}
						RefreshParentWin(3);
					}
				}
			});
		} else {
			$("#btnSubmit").removeClass("bus_add");
			$("#btnSubmit").addClass("bus_dell");
			$("#btnSubmit").attr("disabled", "disabled");
			postRequest("/services/basicservice.aspx", postData, "YDXX", "BookAdd", false, function (data) {
				if (data.State.Success) {
					if (getQueryParam("id") == null || getQueryParam("id") == undefined || getQueryParam("id") == "") {
						if (Set_WayPrint != "2" && Set_WayPrint != undefined) {
							if (confirm("预订成功！是否需要打印凭证?")) {
								PrintBookingOrder(data.Data.BookNo, "y", Set_WayPrint);
							}
						} else {
							alert("预订成功！");
						}
					} else {
						alert("操作成功！");
					}
					RefreshParentWin(3);
				} else {
					$("#btnSubmit").removeClass("bus_dell");
					$("#btnSubmit").addClass("bus_add");
					$("#btnSubmit").removeAttr("disabled");
					alert(data.State.Errkey);
				}
			});
		}
	});

	$("#btnClose").click(function () {
		closeWin();
	});

	//检查会员卡号
	$("#MemberCardNo").blur(function () {
		var MemberCardNo = $(this).val();
		var source = $("#Source").val();
		$("#PayMented option").each(function () {
			if ($(this).val() == "-2")
				$(this).remove();
		});
		var uls = $("ul.show_room");
		uls.first().find("select:eq(0)").find("option").show();
		if (MemberCardNo != "") {
			var checkres = GetMemberByCard(MemberCardNo, source);
			var type = Object.prototype.toString.apply(checkres);
			if (type == "[object String]") {
				showTipsCollect(3, 'divErrTips', checkres, 'MemberCardNo');
				return;
			}
			else {
				$("#Name").val(checkres.MemberName);
				$("#Phone").val(checkres.Phone);


				if (checkres.PrepaidEnable == true && MemberPayMthodAuthority) {
					$("#PayMented").append("<option value='-2'>储值卡</option>");
					$("#PayMented").val("-2");
				}
				else {
					$("#PayMented").val("");
				}


				//筛选房价方案
				uls.first().find("select:eq(0)").find("option").each(function () {
					if ($(this).val() == "" || ("," + $(this).attr("data-source") + ",").indexOf(",[M]" + checkres.CategoryName + ",") >= 0) {
						$(this).show();
					}
					else {
						$(this).hide();
					}
				});
				uls.first().find("select:eq(0)").change();

				if ("[M]" + checkres.CategoryName != $("#Source").val()) {
					$("#Source option").each(function () {
						var source = $(this).val();
						if (source = "[M]" + checkres.CategoryName) {
							$("#Source").val(source);
							$("#Source").change();
							return false;
						}
					});
				}
				if ($("#OpenType").val() == "2") {
					for (var i = 0; i < uls.length; i++) {
						var price = $(uls[i]).find("select:eq(0)").find("option:selected").attr("data-starthourprice");
						var memberprice = $(uls[i]).find("select:eq(0)").find("option:selected").attr("data-memberstarthourprice");
						if (memberprice != "" && memberprice != null && memberprice != undefined) {
							$(uls[i]).find("input[type=text]:eq(0)").val(memberprice);
						} else {
							$(uls[i]).find("input[type=text]:eq(0)").val(price);
						}
					}
				}
			}
		}
	});

	$(document).on("focus", ".txt_roomCount", function () {
		$(this).select();
	});

	$(document).on("keyup", ".txt_roomCount", function (e) {
		if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
			return;
		}
		var obj = this;
		$(obj).val($(obj).val().replace(/[^\d]/g, ""));
		if ($(obj).val() == "0") {
			$(obj).val("1");
		}
	});

	$("#Amount").focus(function () {
		$(this).select();
	});

	//添加新房型
	$(document).on("click", ".addRow", function () {
		var newRow = undefined;
		var uls = $("ul.show_room");
		var ulsCount = uls.length;
		var newRow = true;
		if ($(this).next("input").length == 0)//第一行
		{
			//判断数量
			if (ulsCount >= 2 && uls.eq(1).css("display") != "none") {//大于一行
				//复制最后一行
				var typeCount = $("#room_first").find("select:eq(0)").find("option").length;
				if (ulsCount >= typeCount) {
					alert("已达最大房型数量！");
					return;
				}
				newRow = uls.last().clone();
				uls.last().after(newRow);
			}
			else {//只有一行
				//第二行显示
				newRow = $(this).parent().parent().next("ul.show_room");
				newRow.show();
				$($("ul.show_room")[1]).find("select:eq(0)").change();
				SourceSel(1);
				newRow = false;
			}
		}
		else {//第二行以后
			//复制当前行
			var typeCount = $("#room_first").find("select:eq(0)").find("option").length;
			if (ulsCount >= typeCount) {
				alert("已达最大房型数量！");
				return;
			}
			newRow = $(this).parent().parent().clone();
			$(newRow).find(".sel_roomType").removeAttr("data-detail");
			$(newRow).find(".Editing_EnterCount b").html("0");

			$(this).parent().parent().after(newRow);
		}
		var EnterDate = "";
		if ($("#EnterDate").val() != "" && $("#EnterDate").val() != undefined && $("#EnterDate").val() != null) {
			EnterDate = $("#EnterDate").val();
		} else {
			EnterDate = $("#StartDate").val();
		}
		if (newRow) {
			var ele = newRow.find(".bookable_count b");
			GetMaxBookRoomNom(newRow.find("select:eq(0)").val(), EnterDate, $("#LeaveDate").val(), $("#OpenType").val(), ele);
		}
	});

	//删除房型
	$(document).on("click", ".delRow", function () {
		//判断现有房型数量
		var ulCount = $("ul.show_room").length;
		if (ulCount <= 2) {
			$(this).parent().parent().hide();
		}
		else {
			$(this).parent().parent().remove();
		}
	});

	//根据电话查找会员信息
	$("#Phone").blur(function () {
		var Phone = $("#Phone").val();
		if (Phone != "" && isMobil(Phone)) {
			//查找会员信息
			postRequest("/services/basicservice.aspx", { Phone: Phone }, "YDXX", "GetMemberInfoByPhone", false, function (data) {
				if (data.State.Success) {
					$("#CategoryName").html(data.Data.CategoryName);
					$("#MemberCardNo").val(data.Data.CardNo).blur();

				}
			})
		}
	});

});

function preSave() {
	//检查用户资料
	var b_result = true;
	$(".note_no").remove();
	$(".errorborder").removeClass('errorborder');
	//团队预定处理
	var openType = $("#OpenType").val();
	if (openType == "2") {
		var data = postSynRequest("/services/basicservice.aspx", { hourStartDate: $("#StartDate").val(), hourEndDate: $("#LeaveDate").val() }, "YDXX", "checkIsHourRoom");
		if (!data.State.Success) {
			alert("当前时间不能预订钟点房，可预订时间(" + data.Data.StartDate + ")至(" + data.Data.EndDate + ")");
			return false;
		}
	}
	var bookType = $("#txtBookType").val();
	var teamName = "";
	var leaderName = "";
	var leaderPhone = "";
	var pattern = /^400[0-9]{7}|^800[0-9]{7}|^1[3|4|5|7|8][0-9]\d{8}$|^((0\d{2,3}-)|(0\d{2,3}))[1-9](\d{6,7}|\d{6,7}(-\d{1,4}))$/
	if (bookType == "1") {
		teamName = $("#txtTeamName").val();
		if (teamName == "") {
			showTipsCollect(3, 'divErrTips', '请输入团名', 'txtTeamName');
			b_result = false;
		} else if (teamName != "" && !/^[A-Za-z\u4e00-\u9fa5\s]+$/.test(teamName)) {
			showTipsCollect(3, 'divErrTips', '团名请输入中文英文', 'txtTeamName');
			b_result = false;
		}
		leaderName = $("#txtLeaderName").val();
		/*领队人不用必填
		if (leaderName == "") {
			showTipsCollect(3, 'divErrTips', '请输入领队人', 'txtLeaderName');
			b_result = false;
			
		} 
		*/
		if (leaderName != "" && !/^[A-Za-z\u4e00-\u9fa5\s·]+$/.test(leaderName)) {
			showTipsCollect(3, 'divErrTips', '领队人请输入中文英文', 'txtLeaderName');
			b_result = false;
		}
		leaderPhone = $("#txtLeaderPhone").val();
		/*领队人电话不用必填
			if (leaderPhone == "") {
				showTipsCollect(3, 'divErrTips', '请输入领队电话号码', 'txtLeaderPhone');
				b_result = false;
				
			}*/
		if (leaderPhone != "" && !pattern.test(leaderPhone)) {
			showTipsCollect(3, 'divErrTips', '请输入正确的电话号码', 'txtLeaderPhone');
			b_result = false;
		}
	}
	var Name = $("#Name").val();

	if (Name == "") {
		showTipsCollect(3, 'divErrTips', '请输入姓名', 'Name');
		b_result = false;
	} else if (Name != "" && !/^[A-Za-z\u4e00-\u9fa5\s·]+$/.test(Name)) {
		showTipsCollect(3, 'divErrTips', '姓名请输入中文英文', 'Name');
		b_result = false;
	}
	var source = $("#Source").val();
	if (source == "") {
		showTipsCollect(3, 'divErrTips', '请选择来源', 'Source');
		b_result = false;
	}

	var Phone = $("#Phone").val();
	if (Phone != "" && !pattern.test(Phone)) {
		showTipsCollect(3, 'divErrTips', '请输入正确的电话号码', 'Phone');
		b_result = false;
	}
	var ContractUnit = $("#ContractUnit").val();
	var ContractUnitId = $("#ContractUnitId").val();
	if (source == "协议单位") {
		if (ContractUnit == "") {
			showTipsCollect(3, 'divErrTips', '请填写协议单位', 'ContractUnit');
			b_result = false;
		} else {
			var temp = 0;
			for (temp ; temp < ContractUnitList.length; temp++) {
				if (ContractUnit == ContractUnitList[temp].Name || ContractUnit == ContractUnitList[temp].PYM || ContractUnit == ContractUnitList[temp].UnitCode)
					break;
			}
			if (temp == ContractUnitList.length) {
				showTipsCollect(3, 'divErrTips', '协议单位输入错误', 'ContractUnit');
				b_result = false;
			}
		}
	}
	var EnterDate = "";
	if (openType == "1") {
		EnterDate = $("#EnterDate").val();
		if (EnterDate == "") {
			showTipsCollect(3, 'divErrTips', '请选择来店时间', 'EnterDate');
			b_result = false;
		}
	} else {
		EnterDate = $("#StartDate").val();
		if (EnterDate == "") {
			showTipsCollect(3, 'divErrTips', '请选择来店时间', 'StartDate');
			b_result = false;
		}
	}
	var LeaveDate = $("#LeaveDate").val();
	if (openType == "1") {
		if (LeaveDate == "") {
			showTipsCollect(3, 'divErrTips', '请选择离店时间', 'LeaveDate');
			b_result = false;
		}
	}
	if (EnterDate != "" && LeaveDate != "" && DateDiff(LeaveDate, EnterDate) < 0) {
		showTipsCollect(3, 'divErrTips', '离店时间不能大于来店时间', 'LeaveDate');
		b_result = false;
	}

	var ExpireDate = $("#ExpireDate").val();
	if (ExpireDate == "") {
		showTipsCollect(3, 'divErrTips', '请选择留房时间', 'ExpireDate');
		b_result = false;
	}
	else {
		//留房时间不小于当前时间
		if (openType == "1") {
			var result = postSynRequest("/services/basicservice.aspx", null, "YDXX", "getDateTime");
			if (ExpireDate < result.Data) {
				showTipsCollect(3, 'divErrTips', '留房时间不小于当前时间', 'ExpireDate');
				b_result = false;
			}
		}
		if (ExpireDate < EnterDate) {
			showTipsCollect(3, 'divErrTips', '留房时间不小于来店时间', 'ExpireDate');
			b_result = false;
		}
	}

	//检查预定信息
	//多房型预定
	var roomTypeUls = $(".show_room");
	var errId = 0;
	var BookData = "";
	var SchemeId = $("#room_first").find("select:eq(1)").val();
	var roomTypeArray = new Array();

	for (var i = 0; i < roomTypeUls.length; i++) {
		var ul = $(roomTypeUls[i]);
		if (ul.css("display") != "none") {
			var RoomTypeId = ul.find("select:eq(0)").val();
			var RoomTypeIdDetail = ul.find("select:eq(0)").attr("data-detail");
			var starthours = ul.find("select:eq(0)").find("option:selected").attr("data-starthours");
			if (RoomTypeId == "") {
				//赋值ErrId
				var ErrId = "err_" + errId;
				errId++;
				ul.find("select:eq(0)").attr("id", ErrId);
				showTipsCollect(3, 'divErrTips', '请选择房型', ErrId);
				b_result = false;
			}
			if (roomTypeArray.indexOf(RoomTypeId) >= 0) {
				//赋值ErrId
				var ErrId = "err_" + errId;
				errId++;
				ul.find("select:eq(0)").attr("id", ErrId);
				showTipsCollect(3, 'divErrTips', '房型不能相同', ErrId);
				b_result = false;
			}
			roomTypeArray.push(RoomTypeId);

			var RoomTypeName = ul.find("select:eq(0)").find("option:selected").text();

			var SchemeId = ul.find("select:eq(1)").val();
			if (SchemeId == "" && source != "协议单位" && openType == "1") {
				//赋值ErrId
				var ErrId = "err_" + errId;
				errId++;
				ul.find("select:eq(1)").attr("id", ErrId);
				showTipsCollect(3, 'divErrTips', '请选择房价方案', ErrId);
				b_result = false;
			}

			var Price = ul.find("input[type=text]:eq(0)").val();
			if (Price == "") {
				//赋值ErrId
				var ErrId = "err_" + errId;
				errId++;
				ul.find("input[type=text]:eq(0)").attr("id", ErrId);
				showTipsCollect(3, 'divErrTips', '请输入房价', ErrId);
				b_result = false;
			}
			if (Price != "" && !isNumeric(Price)) {
				//赋值ErrId
				var ErrId = "err_" + errId;
				errId++;
				ul.find("input[type=text]:eq(0)").attr("id", ErrId);
				showTipsCollect(3, 'divErrTips', '房价请输入数字', ErrId);
				b_result = false;
			}
			var RoomCount = ul.find("input[type=text]:eq(1)").val();
			if (RoomCount == "") {
				//赋值ErrId
				var ErrId = "err_" + errId;
				errId++;
				ul.find("input[type=text]:eq(1)").attr("id", ErrId);
				showTipsCollect(3, 'divErrTips', '请输入房间数', ErrId);
				b_result = false; Phone
			}

			if (RoomCount != "" && !isNumeric(RoomCount)) {
				//赋值ErrId
				var ErrId = "err_" + errId;
				errId++;
				ul.find("input[type=text]:eq(1)").attr("id", ErrId);
				showTipsCollect(3, 'divErrTips', '房间数请输入数字', ErrId);
				b_result = false;
			}
			if (RoomCount > parseInt($("#txtMaxBookNum").html())) {
				//赋值ErrId
				var ErrId = "err_" + errId;
				errId++;
				ul.find("input[type=text]:eq(1)").attr("id", ErrId);
				showTipsCollect(3, 'divErrTips', '房间数不能大于可预订数', ErrId);
				b_result = false;
			}
			var mark = i == 0 ? "" : "@";
			BookData = BookData + mark + Price + "|" + RoomTypeId + "|" + RoomTypeName + "|" + RoomCount + "|" + SchemeId + "|" + RoomTypeIdDetail + "|" + starthours + "|" + getQueryParam("fh");
		}
	}

	//检查会员卡号
	var MemberCardNo = $("#MemberCardNo").val();
	if (MemberCardNo == "无可用会员卡") {
		MemberCardNo = "";
	}
	if (source.indexOf("[M]") == 0) {
		if (MemberCardNo == "") {
			showTipsCollect(3, 'divErrTips', '请输入会员卡号', 'MemberCardNo');
			b_result = false;
		}
		else {
			var checkres = CheckMemberCard(MemberCardNo, source);
			if (checkres != true) {
				showTipsCollect(3, 'divErrTips', checkres, 'MemberCardNo');
				b_result = false;
			}
		}
	}
	else if (MemberCardNo != "") {
		var checkres = GetMemberByCard(MemberCardNo, source);
		var type = Object.prototype.toString.apply(checkres);
		if (type == "[object String]") {
			showTipsCollect(3, 'divErrTips', checkres, 'MemberCardNo');
			b_result = false;
		}
	}
	var WarrantMethod = $("#WarrantMethod").val();
	var PayMentedId = $("#PayMented").val();
	var PayMethodName = $("#PayMented option:selected").text();
	var Amount = "";
	var id = getQueryParam("id");
	if (id == null || id == "" || id == undefined) {
		Amount = $("#Amount").val();
		if (Amount != "" && !/^\d+(\.\d+)?$/.test(Amount)) {
			showTipsCollect(3, 'divErrTips', '订金请输入数字', 'Amount');
			b_result = false;
		}
	}
	var WebNo = $("#WebNo").val();
	var Remark = $("#Remark").val();
	var Days = $("#Days").val();
	if (isContainChina($("#ManualNumber").val())) {
		showTipsCollect(3, 'divErrTips', '手工单号不能输入汉字', 'ManualNumber');
		b_result = false;
	}
	var ManualNumber = $("#ManualNumber").val();
	if (!b_result) return false;
	//showTips(1, 'btnSubmit', ' &nbsp;');

	var SalesmanId = $("#Salesman").val();

	var tempPayName = "";//支付方式名称，微信支付判断处理
	var payname = "";
	var payid = 0;
	payid = $("#PayMented").val();
	payname = $("#PayMented").find("option:selected").text();
	//2017-05-27  支付方式 微信支付处理
	if (payid == -4 || payid == -9) {
		if (tempPayName != "" && tempPayName != payname) {
			showTipsCollect(3, 'btnRead', '在线支付只能选一种', $(zflist[i]).find("input[name='PayAmount']"));
			b_result = false;
			return false;
		} else {
			tempPayName = payname;
			$("body").data("PayName", tempPayName);
		}
	}

	return {
		Id: $("#Detail").val(),
		BookId: getQueryParam("id"),
		schemeId: SchemeId,
		Name: Name,
		Phone: Phone,
		Source: source,
		MemberCardNo: MemberCardNo,
		BookData: BookData,
		EnterDate: EnterDate,
		LeaveDate: LeaveDate,
		ExpireDate: ExpireDate,
		WarrantMethod: WarrantMethod,
		WebNo: WebNo,
		Remark: Remark,
		PayMentedId: PayMentedId,
		PayMethodName: PayMethodName,
		Amount: Amount,
		ContractUnit: ContractUnit,
		ContractUnitId: ContractUnitId,
		BookType: bookType,
		TeamName: teamName,
		LeaderName: leaderName,
		LeaderPhone: leaderPhone,
		openType: openType,
		ManualNumber: ManualNumber,
		SalesmanId: SalesmanId
	};
}

function UpdatePrice(index) {
	var uls = $("ul.show_room");
	var priceInput = $(uls[indexs]).find("input[type=text]:eq(0)");
	priceInput.val(priceInput.attr("data-price"));
}

//选择房价方案
function Scheme(index) {
	var ul = $("ul.show_room:eq(" + index + ")");
	var schemeId = ul.find("select:eq(1)").val();
	var enterDate = $("#EnterDate").val();
	var roomTypeId = ul.find("select:eq(1)").val();
	var source = $("#Source").val();
	if (schemeId != "" && enterDate != "") {
		var data = postSynRequest("/services/basicservice.aspx", { schemeId: schemeId, enterDate: enterDate, openType: "1" }, "RZXX", "GetRoomPrice");
		if (data.State.Success) {
			//加载房价
			ul.find("input:eq(0)").val(data.Data.price).attr("data-price", data.Data.price);;
		}
		else {
			alert(data.State.Errkey);
		}
	}
}

//选择来源
function SourceSel(index) {

	var source = $("#Source").val();
	if (source == null)
		return;
	var scheme = $("ul.show_room:eq(" + index + ")").find("select:eq(1)");
	var roomType = $("ul.show_room:eq(" + index + ")").find("select:eq(0)");
	var priceInput = $("ul.show_room:eq(" + index + ")").find("input[type=text]:eq(0)");
	if ($("#OpenType").val() == "2") {
		scheme.append("<option value='' class='Xuanze' selected='selected'>请选择房价方案</option>");
		scheme.attr("disabled", "disabled");
		scheme.addClass("disabledcolor");

		roomType.find("option").each(function () {
			if ($(this).attr("data-allowhour") == "false") {
				$(this).hide();
			}
		});

		if ($("#MemberCardNo").val() != "" && $("#MemberCardNo").val() != undefined && $("#MemberCardNo").val() != null) {
			var price = roomType.find("option:selected").attr("data-starthourprice");
			var memberprice = roomType.find("option:selected").attr("data-memberstarthourprice");
			if (memberprice != "" && memberprice != null && memberprice != undefined) {
				priceInput.val(memberprice);
			} else {
				priceInput.val(price);
			}
		} else {
			var price = roomType.find("option:selected").attr("data-starthourprice");
			priceInput.val(price);
		}

	} else {
		roomType.find("option").each(function () {
			if ($(this).attr("data-allowhour") == "false" || $(this).attr("data-allowhour") == "true") {
				$(this).show();
			}
		});

		if (source == "协议单位") {
			$("#MemberCardli").hide();

			scheme.append("<option value='' class='Xuanze' selected='selected'>请选择房价方案</option>");
			scheme.attr("disabled", "disabled");
			scheme.addClass("disabledcolor");
			if (index == 0) {
				$("#MemberCardNo").val("");
				$("#CategoryName").html("");
				//将支付方式重新赋值
				$("#PayMented").val("");
			}

			if ($("#MContractUnitli").length > 0) {
				$("#MContractUnitli").show();
				GetContractUnitPrice(index);
				return;
			}

			//添加协议单位选择框
			if (index == 0) {
				var html = '<li style="margin-right: 38px; display: inline; position: relative" id="MContractUnitli">';
				html += '     <label style="">协议单位：</label>';
				html += '   <input id="ContractUnit" type="text" value="" />';
				html += '   <input id="ContractUnitId" type="hidden" value=""  />';
				html += '     </li>';
				$("#MemberCardli").before(html);
				var data = postSynRequest("/services/basicservice.aspx", null, "RZXX", "GetContractUnitList");
				if (!data.State.Success)
					alert("获取协议单位失败");

				$("#ContractUnit").autocomplete(data.Data.ContractUnitList, contractunitOptions);
				ContractUnitList = data.Data.ContractUnitList;
				$("#ContractUnit").result(function (event, data, formatted) {
					$("#ContractUnitId").val(data.Id);
					GetContractUnitPrice(index);
				});
			}
		} else {
			$("#MContractUnitli").hide();
			$("#MemberCardli").show();
			if (scheme.hasClass("disabledcolor")) {
				scheme.removeClass("disabledcolor");
			}
			scheme.find("option[class='Xuanze']").remove();
			scheme.removeAttr('disabled');

			$("#ContractUnit").val("");
			$("#ContractUnitId").val("");
			var source = $("#Source").val();
			var RoomTypeId = $(".show_room:eq(" + index + ")").find("select").first().val();
			var data = postSynRequest("/services/basicservice.aspx", { Source: source, RoomTypeId: RoomTypeId }, "RZXX", "GetScheme");
			if (data.State.Success) {
				scheme.find("option").remove();
				if (data.Data.Schemes != null && data.Data.Schemes.length > 0) {
					for (var i = 0; i < data.Data.Schemes.length; i++) {
						var item = data.Data.Schemes[i];
						if (item.Breakfast != "" && item.Breakfast != null && item.Breakfast != undefined) {
							scheme.append('<option value="' + item.Id + '" data-roomtypeid="' + item.RoomTypeId + '" data-source="' + item.Source + '" data-schemetype="' + item.SchemeType + '" >[' + item.Breakfast + ']' + item.Name + '</option>');
						} else {
							scheme.append('<option value="' + item.Id + '" data-roomtypeid="' + item.RoomTypeId + '" data-source="' + item.Source + '" data-schemetype="' + item.SchemeType + '">' + item.Name + '</option>');
						}
					}
					Scheme(index);
				} else {
					scheme.append('<option value="">请选择房价方案</option>');
				}
			}
			else {
				alert(data.State.Errkey);
			}
		}
	}
}

//协议单位房价
function GetContractUnitPrice(index) {
	var ul = $("ul.show_room:eq(" + index + ")");
	var RoomTypeId = ul.find("select:eq(0)").val();
	var ContractUnitId = $("#ContractUnitId").val();
	if (ContractUnitId == "") return;
	var data = postSynRequest("/services/basicservice.aspx", { RoomTypeId: RoomTypeId, openType: 1, ContractUnitId: ContractUnitId }, "RZXX", "GetContractUnitPrice");
	if (data.State.Success = true) {
		ul.find("input:eq(0)").val(data.Data.ContractUnitPrice).attr("data-price", data.Data.ContractUnitPrice);
	}
}

function GetMemberByCard(memberCardNo, source) {
	var postData = { CardNo: memberCardNo, MemberCategory: source };
	var res = postSynRequest("/services/basicservice.aspx", postData, "CardInfoUsl", "GetMemberByCard");
	if (res.State.Success)
		return res.Data;
	else
		return res.State.Errkey;
}

function CheckMemberCard(memberCardNo, source) {
	var postData = { CardNo: memberCardNo, MemberCategory: source };
	var res = postSynRequest("/services/basicservice.aspx", postData, "CardInfoUsl", "CheckCardType");
	if (res.State.Success)
		return true;
	else
		return res.State.Errkey;
}
//获取某时间段内某房型预定的最大数
function GetMaxBookRoomNom(roomTypeId, enterDate, leaveDate, openType, bEle) {
	if (roomTypeId == "")
		return false;
	var id = getQueryParam("id");
	if (id == null || id == "" || id == undefined) {
		id = "0";
	}
	//console.log(roomTypeId + "|" + enterDate + "|" + leaveDate + "|" + openType + "|" + id);
	var postData = { RoomTypeId: roomTypeId, EnterDate: enterDate, LeaveDate: leaveDate, openType: openType, bookId: id };
	postRequest("/services/basicservice.aspx", postData, "YDXX", "GetMaxBookRoomNum", false, function (data) {
		if (data.State.Success) {
			$(bEle).html(data.Data);
		}
		//else {
		//    alert(data.State.Errkey)
		//}
	});
}