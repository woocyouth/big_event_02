let baseURL = 'http://api-breakingnews-web.itheima.net';

$.ajaxPrefilter(function (options) {

    options.url = baseURL + options.url;
    // console.log(options);
    if (options.url.indexOf("/my/") != -1) {
        options.headers = {
            Authorization: localStorage.getItem("my2Token") || ""
        };

        options.complete = function (res) {
            // console.log(res);
            let resRps = res.responseJSON;
            if (resRps.status === 1 && resRps.message === "身份认证失败！") {
                localStorage.removeItem("my2Token");
                location.href = "/login.html";
            }
        }
    }

})