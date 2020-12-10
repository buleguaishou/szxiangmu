
const validate =  {
    error: '',
    // 金额
    isMoney(value, errorMsg = '金额信息错误') {
        const regMoney = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/;
        const result = regMoney.test(value);
        if(!result) {this.error = errorMsg;return false;} else {return true;}
    },

    // 密码
    isPassword(value, errorMsg = '密码需要包含数字和字母2种类型字符，字母区分大小写') {
        const passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
        const result = passwordReg.test(value);
        if(!result) {this.error = errorMsg;return false;} else {return true;}
    },

    // 是否为空
    isNull(str, errorMsg = '必填信息不能为空') {
        if (!str) {this.error = errorMsg;return false; } else { return true; }
    },

    // 手机号或者固话
    isLinkPhone(val, errorMsg = '手机号或者固话格式错误') {
        const telReg =  /^0\d{2,3}-?\d{7,8}$/;
        const phoneReg = /^1[3456789]\d{9}$/;
        if(!telReg.test(val) && !phoneReg.test(val)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 手机号
    isPhone(val, errorMsg = '手机号格式错误') {
        const phoneReg = /^1\d{10}$/;
        if(!phoneReg.test(val)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 判断是否为url地址
    isUrl(str, errorMsg = 'url地址格式错误') {
        const rex = /^(http|https){1}:\/\/[^\s]+$/;
        if (!rex.test(str)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 是否汉字
    isCN(str, errorMsg = '请输入汉字') {
        const reg = /^[\u4e00-\u9fa5]+$/;
        if (!reg.test(str)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 是否为邮箱
    isEmail(str, errorMsg = '邮箱格式错误') {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (!reg.test(str)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 是否为身份证
    isCard(str, errorMsg = '身份证格式错误') {
        const reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
        if (!reg.test(str)) {this.error = errorMsg;return false; } else { return true; }
    },

    isNum(num, errorMsg = '请输入数字') {
        const rex = /^[0-9]+$/;
        if (!rex.test(num)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 是否全为热线电话
    isHotline(num, errorMsg = '热线电话格式错误') {
        const rex = /^[0-9]([0-9]|-)*[0-9]$/;
        if (rex.test(num)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 判断数组长度
    isArrayLen(arr, errorMsg = '长度不能为空') {
        if (arr instanceof Array) {
            if(!arr.length) {
                this.error = errorMsg;
                return false;
            } else {
                return true;
            }
        }
    },
    // 经度判断
    isLongitude(longitude, errorMsg = '经度格式错误') {
        const reg = /^(((\d|[1-9]\d|1[1-7]\d|0)\.\d{0,6})|(\d|[1-9]\d|1[1-7]\d|0{1,3})|180\.0{0,6}|180)$/;
        if (!reg.test(longitude)) {this.error = errorMsg; return false; } else { return true; }
    },
    // 纬度判断
    isLatitude(latitude, errorMsg = '纬度格式错误') {
        const reg = /^([0-8]?\d\.\d{0,6}|90\.0{0,6}|[0-8]?\d|90)$/;
        if (!reg.test(latitude)) {this.error = errorMsg; return false; } else { return true; }
    },
    // 判断ip地址
    isIpAddress(ip, errorMsg = 'ip地址不正确') {
        const strRegex  = "^((https|http|ftp|rtsp|mms)?://)"
            + "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@
            + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
            + "|" // 允许IP和DOMAIN（域名）
            + "([0-9a-zA-Z_!~*'()-]+\.)*" // 域名- www.
            + "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\." // 二级域名
            + "[a-zA-Z]{2,6})" // first level domain- .com or .museum
            + "(:[0-9]{1,4})?" // 端口- :80
            + "((/?)|"
            + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        const reg = new RegExp(strRegex);
        if(!reg.test(ip)) {this.error = errorMsg; return false; } else { return true; }
    },
    // 判断端口号
    isPort(port, errorMsg = '端口号不正确') {
        const reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
        if(!reg.test(port)) {this.error = errorMsg; return false; } else { return true; }
    }
}

export default  validate;
