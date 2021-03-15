$(function () {
    let layer = layui.layer;
    let form = layui.form;
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                form.val("formInfo", res.data);
            }
        })
    }

    $("form").on("reset", function (e) {
        // console.log('ok');
        e.preventDefault();
        initUserInfo();
    })

    $("form").on("submit", function (e) {
        e.preventDefault();
        let formInfo = $(this).serialize();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: formInfo,
            dataType: 'json',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                layer.msg(res.message, {
                    icon: 6
                });
                window.parent.getUserInfo();
            }
        })
    })

})