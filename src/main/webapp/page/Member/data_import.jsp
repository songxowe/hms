
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>简单点酒店管理平台</title>
    <link href="../styles/main.css" type="text/css" rel="stylesheet"/>
    <link href="../styles/tch.css" type="text/css" rel="stylesheet"/>
    <script type="text/javascript" src="../Scripts/easyui/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="../Scripts/public/Base.js"></script>
    <script type="text/javascript" src="../Scripts/ajaxUpload.js"></script>
    <script type="text/javascript" src="../Scripts/page/Member/data_import.js"></script>
</head>
<body>
<style type="text/css">
    .file-box {
        position: relative;
        width: 340px
    }

    .txt {
        height: 20px;
        border: 1px solid #cdcdcd;
        width: 180px;
        margin-right: 5px !important;
        margin-left: 15px;
    }

    .btn {
        background-color: #FFF;
        border: 1px solid #CDCDCD;
        height: 24px;
        width: 70px;
        margin-right: 15px !important;
    }

    .file {
        position: absolute;
        top: 5;
        right: 460px;
        height: 24px;
        filter: alpha(opacity:0);
        opacity: 0;
        width: 80px
    }
</style>
<div class="vip_infor" style="width: 800px">
    <div class="line">
        <div class="fl">会员导入</div>
        <div style="margin-top:5px;margin-left:100px"><b style="color: #0788BD">提示：导入的表格的表头前不能有空行</b></div>
        <input type="hidden" id="path"/>
        <div class="errortips" id="btnRead"></div>
    </div>
    <div class="types" style="background: #EFEFEF; border: 1px solid #ddd; ">
        <ul>
            <li style="position:relative">
                <form action="" method="post" enctype="multipart/form-data">
                    <input type='text' name='textfield' id='textfield' class='txt' placeholder="请选择上传文件..."/>
                    <input type='button' class='btn' value='浏览...'/>
                    <input type="file" name="fileField" class="file" id="fileField" size="28"
                           onchange="document.getElementById('textfield').value=this.value"/>
                    <label>首行：</label>
                    <select id="Frist" name="Frist">
                        <option value="1" selected="selected">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;工作表：</label>
                    <select style="margin:0px 2px;display:inline" id="sheetCount">
                        <option>数据一</option>
                    </select>
                    <input type="button" class="add_price_type" style="margin-left:15px" value="上传数据" id="btnUpload"/>
                    <input type="button" class="add_price_type" style="margin-left:15px" value="数据导入" id="BtnSave"/>
                </form>
            </li>
        </ul>
    </div>
    <div class="types">
        <ul>
            <!--  <li style="width:100%">
                  <label style="width:80px"><b style="color:#F00">分店选择：</b></label>
                  <select style="width:150px; margin-right:15px; display:inline"><option>请选择经销商</option></select>
                  <select style="width:150px"><option>请选择分店</option></select>
              </li>-->
            <li style="width:50%">
                <label style="width:100px"><b style="color:#F00">会员卡号：</b></label>
                <select style="width:250px" class="datacol" id="CardNo">
                    <option value="">请选择对应的数据列</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px"><b style="color:#F00">会员姓名：</b></label>
                <select style="width:250px" class="datacol" id="MemberName">
                    <option value="">请选择对应的数据列</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px"><b style="color:#F00">会员类型：</b></label>
                <select style="width:250px" class="datacol" id="MemberType">
                    <option value="">请选择对应的数据列</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px"><b style="color:#F00">缺省会员类型：</b></label>
                <select style="width:250px" id="MType">
                    <option value="">请选择缺省会员类型</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px">证件类型：</label>
                <select style="width:250px" class="datacol" id="CardType">
                    <option value="">请选择对应的数据列</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px">证件号码：</label>
                <select style="width:250px" class="datacol" id="CardCode">
                    <option value="">请选择对应的数据列</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px">会员性别：</label>
                <select style="width:250px" class="datacol" id="Sex">
                    <option value="">请选择对应的数据列</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px">出生日期：</label>
                <select style="width:250px" class="datacol" id="Birth">
                    <option value="">请选择对应的数据列</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px">联系电话：</label>
                <select style="width:250px" class="datacol" id="Phone">
                    <option value="">请选择对应的数据列</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px">通讯地址：</label>
                <select style="width:250px" class="datacol" id="Address">
                    <option value="">请选择对应的数据列</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px">发卡日期：</label>
                <select style="width:250px" class="datacol" id="CardDate">
                    <option value="">请选择对应的数据列</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px">有效日期：</label>
                <select style="width:250px" class="datacol" id="EffeDate">
                    <option value="">请选择对应的数据列</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px">账号余额：</label>
                <select style="width:250px" class="datacol" id="Amount">
                    <option value="">请选择对应的数据列</option>
                </select></li>
            <li style="width:50%">
                <label style="width:100px">积分余额：</label>
                <select style="width:250px" class="datacol" id="Score">
                    <option value="">请选择对应的数据列</option>
                </select></li>
        </ul>
    </div>
    <div class="types">
        <b style="float:left;font-weight:lighter;color:#0788BD">操作说明：</b>
        <p style="width:700px;float:left;border-bottom:0px;color:#0788BD">
            ①点击【浏览】按钮，选择对应的Excel表格文档位置，选择Exce表格数据中对应的首行和工作表然后点击【上传数据】。<br/>
            ②Excel表格数据上传成功后，系统会对列名进行智能匹配，如果匹配不正确可以手动调整（缺损会员类型需要手动选择）。<br/>
            ③列名信息选择好后，点击【数据导入】按钮，导入完成后系统会给出相应的提示信息（导入成功多少，失败多少）。</p>
    </div>
</div>
</body>
</html>
