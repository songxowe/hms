/**
* 省市区三级联动下拉菜单
*
* Author：yi
* Create At：2011-12-19
* 
* 
*/
function Zone() {
    this.ini.apply(this, arguments); //类构造函数，执行初始化操作
}
Zone.prototype = {
    selProvs: {}, //省下拉框
    txtProvName: {},
    selCitys: {}, //市下拉框
    txtCityName: {},
    selZones: {}, //区下拉框
    txtZoneName: {},
    selBizZones: {}, //商业区下拉框
    txtBizZoneName: {},

    provs: [],//省数组
    citys: [],//市数组
    zones: [],//地区数组
    bizzones: [],//商业区数组

    //获取所有地区数组
    getZones: function () {
        var _ = this;
        _.provs = jcProvinceArr;
        _.citys = jcCityArr;
        _.zones = jcZoneArr;
        _.bizzones = jcBizZoneArr;
    },

    //填充下拉框
    fillSel: function (sel, parentId, lv) {
        if (sel == null)
            return;

        sel.length = 0;
        var data = [];

        var op0Text;
        if (lv == 1) {
            op0Text = "请选择省份";
            data = this.provs;
        }
        if (lv == 2) {
            op0Text = "请选择城市";
            data = this.citys;
        }
        if (lv == 3) {
            op0Text = "请选择城区";
            data = this.zones;
        }
        if (lv == 4) {
            op0Text = "请选择商业区";
            data = this.bizzones;
        }
        sel.options[0] = new Option(op0Text, "");

        if (lv != 1 && parentId == 0)
            return;

        var count = 0;
        for (var i = 0; i < data.length; i++) {
            var o = data[i];
            if (o.parentId == parentId) {
                sel.options[count + 1] = new Option(o.name, o.id);
                count = count + 1;
            }
        }
    },

    //初始化
    ini: function (provId, cityId, zoneId, bizzoneId, provName, cityName, zoneName, bizzoneName) {
        //获取省市下拉框
        this.selProvs = document.getElementById(provId);
        this.selCitys = document.getElementById(cityId);
        this.selZones = document.getElementById(zoneId);
        this.selBizZones = document.getElementById(bizzoneId);
        this.txtProvName = document.getElementById(provName);
        this.txtCityName = document.getElementById(cityName);
        this.txtZoneName = document.getElementById(zoneName);
        this.txtBizZoneName = document.getElementById(bizzoneName);

        this.getZones(); //构建地区数组

        //省下拉框有变化时
        var _ = this;
        this.selProvs.onchange = function () {
            _.fillSel(_.selCitys, _.selProvs.value, 2);
            if (_.txtProvName != null) {
                _.txtProvName.value = this.options[this.selectedIndex].text;
            }
            if (_.selZones != null) {
                _.fillSel(_.selZones, _.selCitys.value, 3);
            }
        }

        //市下拉框有变化时

        this.selCitys.onchange = function () {
            if (_.selZones != null) {
                _.fillSel(_.selZones, _.selCitys.value, 3);
            }
            if (_.selBizZones != null) {
                _.fillSel(_.selBizZones, _.selCitys.value, 4);
            }
            if (_.txtCityName != null) {
                _.txtCityName.value = this.options[this.selectedIndex].text;
            }
        }
        if (this.selZones != null) {
            this.selZones.onchange = function () {
                if (_.txtZoneName != null) {
                    _.txtZoneName.value = this.options[this.selectedIndex].text;
                }
            }
        }
        if (this.selBizZones != null) {
            this.selBizZones.onchange = function () {
                if (_.txtBizZoneName != null) {
                    _.txtBizZoneName.value = this.options[this.selectedIndex].text;
                }
            }
        }

        //填充省市区
        this.fillSel(this.selProvs, 0, 1);
        this.fillSel(this.selCitys, 0, 2);
        this.fillSel(this.selZones, 0, 3);
        this.fillSel(this.selBizZones, 0, 4);
    }
}

function GetZoneName(id) {
    if (id.length > 0) {
        zones = jcZoneArr;
        for (var i = 0; i < zones.length; i++) {
            var o = zones[i];
            if (o.id == id) {
                return o.name;
            }
        }
    }
    return "";
}

function GetProvinceId(name) {
    if (name.length > 0) {
        zones = jcProvinceArr;
        for (var i = 0; i < zones.length; i++) {
            var o = zones[i];
            if (o.name == name) {
                return o.id.toString();
            }
        }
    }
    return "";
}

function GetCityId(name) {
    if (name.length > 0) {
        zones = jcCityArr;
        for (var i = 0; i < zones.length; i++) {
            var o = zones[i];
            if (o.name == name) {
                return o.id.toString();
            }
        }
    }
    return "";
}

function GetAreaId(name) {
    if (name.length > 0) {
        zones = jcZoneArr;
        for (var i = 0; i < zones.length; i++) {
            var o = zones[i];
            if (o.name == name) {
                return o.id.toString();
            }
        }
    }
    return "";
}