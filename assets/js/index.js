$(function () {
    getUserInfo();
    $("#logout").on("click", function () {
        localStorage.removeItem("my2Token");
        location.href = "/login.html";
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("my2Token") || ""
        // },
        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                layer.msg(res.message, {
                    icon: 5
                });
                // localStorage.removeItem("my2Token");
                // location.href = "/login.html";
                return;
            }

            render(res.data);
        }
    })
}

function render(data) {
    // console.log(data); 
    let name = data.nickname || data.username;
    $(".welcome").text("欢迎  " + name);
    if (data.user_pic) {
        $(".layui-nav-img").attr("src", data.user_pic);
        $(".text-avatar").hide();
        $(".username-top").text(name);
    } else {
        $(".layui-nav-img").hide();
        $(".text-avatar").text(name[0].toUpperCase());
        $(".username-top").text(name);
    }
}