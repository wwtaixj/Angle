class Tool{
    initParams(url) {
        let params = {};

        if (url !== "") {
            let arr;
            if (url.indexOf('?') !==-1) {
                url = url.split('?')[1]
                arr = url.split("&");
            }else {
                arr = url.substring(1).split("&");
            }
            for (let i = 0, iLen = arr.length; i < iLen; i++) {
                let aTmp = arr[i].split("="),
                    value = decodeURIComponent(aTmp[1]),
                    numberVal = Number(value);
                //处理数字
                if (typeof numberVal === "number" && numberVal === numberVal) {
                    value = numberVal;
                }
                //处理布尔值
                if (value === "true" || value === "false") {
                    value = value === "true";
                }
                params[aTmp[0]] = value;
            }
        }
        return params;
    }
}

export default new Tool();