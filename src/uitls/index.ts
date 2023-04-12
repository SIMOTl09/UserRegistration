import { deepClone } from "./deepClone"

// 手机号脱敏展示
const phoneNuberConvert = (number: string) => {
    if (!number) return "";
    let pat = /(\d{3})\d*(\d{4})/;
    let result = number.replace(pat, "$1****$2");
    return result;
}

function debounce(fn, wait) {
    let timer = null;

    return function() {
        let context = this,
        args = [...arguments];

        // 如果此时存在定时器的话，则取消之前的定时器重新记时
        if (timer) {
        clearTimeout(timer);
        timer = null;
        }

        // 设置定时器，使事件间隔指定事件后执行
        timer = setTimeout(() => {
        fn.apply(context, args);
        }, wait);
    };
}

//时间戳转日期
const dateFormat = ( time )=> {
    let date = new Date(time);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}
export {
    deepClone,
    phoneNuberConvert,
    debounce,
    dateFormat
}


