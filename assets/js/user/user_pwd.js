$(function () {
    let form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newpass: function (value) {
            if (value === $("input[name=oldPwd]").val().trim()) {
                return "新旧密码不能一样"
            }
        },
        repass: function (value) {
            if (value !== $("input[name=newPwd]").val().trim()) {
                return "确认密码与新密码不一样"
            }
        }

    });

    $("form").on("submit", function (e) {
        e.preventDefault();

        let formInfo = $("form").serialize();
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: formInfo,
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                layer.msg(res.message, {
                    icon: 6
                });
                $("button[type=reset]").click();
            }
        })
    })

    $("button[type=reset]").on("click", function (e) {
        e.preventDefault();
        // console.log('ok');
        // document.querySelector("form").reset();
        $("form")[0].reset();
    })
})