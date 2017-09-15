//检测内容是否为数字
function checkNumber(obj) {
    var value = $(obj).val();
    if (!/^\d+(\.\d+)?$/.test(value)) {
        $(obj).val("0.00");
    }
}

//检测内容是否为数字
function checkNumbers(obj, check) {
    var value = $(obj).val();

    if (!/^\d+(\.\d+)?$/.test(value)) {
        $(obj).val("0");
    }
}

//全选框
function ChoiceAll() {
    $(".box_HourRoom").each(function () {
        this.checked = $("#choiceAll")[0].checked;
    });
}