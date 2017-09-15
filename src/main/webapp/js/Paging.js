function JCPaging() {
    this.init.apply(this, arguments); //类构造函数，执行初始化操作
}

JCPaging.prototype = {
    pageIndex: 1,//页码
    pageSize: 15,//每页条数
    totalCount: 0,//总记录数
    totalPages: function () {
        return parseInt((this.totalCount - 1) / this.pageSize) + 1;
    },//总页数
    contentPlace: {},//放置分页的容器
    changeCallBack: function (page) {
        alert(page);
    },

    resetTotalCount: function (count) {
        this.totalCount = count;
        this.pageIndex = 1;
        $(this.contentPlace).html(this.getStrPage());
    },

    init: function (placeId, pageIndex, pageSize, totalCount, changeCallBack) {
        var _ = this;
        _.contentPlace = document.getElementById(placeId);
        _.pageIndex = pageIndex;
        _.pageSize = pageSize;
        _.totalCount = totalCount;
        _.changeCallBack = changeCallBack;

        $(_.contentPlace).html(_.getStrPage());
        $(".jcpage a").live("click", function () {
            if ($(this).html() == "go") {
                var strP = /^[1-9]\d*$/;
                if (!strP.test($(this).prev().val())) {
                    alert("页码需要输入整数");
                    return false;
                }
                else if (parseInt($(this).attr("data-total")) < parseInt($(this).prev().val())) {
                    alert("页码需要不大于" + $(this).attr("data-total"));
                    return false;
                }
                else{
                    _.pageIndex = parseInt($(this).prev().val());
                    $(this).prev().val("")
                }
            }
            else
                _.pageIndex = parseInt($(this).html());
            $(_.contentPlace).html(_.getStrPage());
            _.changeCallBack(_.pageIndex);
        });
        $(".jcpage .jcpageprev").live("click", function () {
            _.pageIndex = _.pageIndex - 1;
            $(_.contentPlace).html(_.getStrPage());
            _.changeCallBack(_.pageIndex);
        });
        $(".jcpage .jcpagenext").live("click", function () {
            _.pageIndex = _.pageIndex + 1;
            $(_.contentPlace).html(_.getStrPage());
            _.changeCallBack(_.pageIndex);
        });
    },

    getStrPage: function () {
        var strPage = '<div class="page jcpage">';
        if (this.pageIndex == 1) {
            strPage += '<span class="disabled"> <  上一页</span>';
            strPage += '<span class="current">1</span>';
        }
        else {
            strPage += '<span class="jcpageprev"> <  上一页</span>';
            strPage += '<a href="###">1</a>';
        }
        if (this.pageIndex > 4 && this.totalPages() > 5) {
            strPage += '...';
        }
        if (this.totalPages() <= 5) {
            for (var i = 2; i <= this.totalPages() - 1; i++) {
                if (this.pageIndex == i) {
                    strPage += '<span class="current">' + i + '</span>';
                }
                else {
                    strPage += '<a href="###">' + i + '</a>';
                }
            }
        }
        else if (this.pageIndex <= 3) {
            for (var i = 2; i <= 4; i++) {
                if (this.pageIndex == i) {
                    strPage += '<span class="current">' + i + '</span>';
                }
                else {
                    strPage += '<a href="###">' + i + '</a>';
                }
            }
        }
        else if (this.pageIndex >= this.totalPages() - 2) {
            for (var i = this.totalPages() - 3; i <= this.totalPages() - 1; i++) {
                if (this.pageIndex == i) {
                    strPage += '<span class="current">' + i + '</span>';
                }
                else {
                    strPage += '<a href="###">' + i + '</a>';
                }
            }
        }
        else {
            strPage += '<a href="###">' + (this.pageIndex - 1) + '</a>';
            strPage += '<span class="current">' + this.pageIndex + '</span>';
            strPage += '<a href="###">' + (this.pageIndex + 1) + '</a>';
        }

        if (this.pageIndex < this.totalPages() - 2 && this.totalPages() > 4) {
            strPage += '...';
        }
        if (this.pageIndex == this.totalPages()) {
            if (this.totalPages() > 1) {
                strPage += '<span class="current">' + this.totalPages() + '</span>';
            }
            strPage += '<span class="disabled"> 下一页  ></span>';
        }
        else {
            if (this.totalPages() > 1) {
                strPage += '<a href="###">' + this.totalPages() + '</a>';
            }
            strPage += '<span class="jcpagenext">下一页  > </span>';
        }
        if ($("#divPage").attr("data-need")=="search")//判断是否需要查询页面
            strPage+="<input type='text' id='txtPageIndex' style='width:40px' onkeyup='ChangeInput("+this.totalPages()+")' /><a href='###' data-total='"+this.totalPages()+"'>go</a>"
        strPage += '</div>';
        return strPage;
    }
}

//匹配输入数量
function ChangeInput(pagemax) {
    var txt = $("#txtPageIndex").val()
    if (txt != "") {
        if (!isNumeric(txt) || parseInt(txt) < 1) {
            txt = "";
            $("#txtPageIndex").val(txt);
        }
        if (parseInt(txt) > pagemax) {
            txt = pagemax;
            $("#txtPageIndex").val(txt);
        }
    }
}