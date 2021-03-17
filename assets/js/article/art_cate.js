$(function () {
    let layer = layui.layer;
    let form = layui.form;
    initFormCates();

    function initFormCates() {
        $.ajax({
            url: '/my/article/cates',
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

                let htmlStr = template("form_cate", {
                    data: res.data
                });
                $("tbody").html(htmlStr);
            }
        })
    }

    let addIndex = null;
    $("#addCate").on("click", function () {
        addIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#addJump").html()
        });
    })

    $("#addCateForm").on("reset", function (e) {
        e.preventDefault();
        $("addCateForm")[0].reset();
    })

    $("body").on("submit", "#addCateForm", function (e) {
        e.preventDefault();
        let formInfo = $("#addCateForm").serialize();
        // console.log(formInfo);
        $.ajax({
            url: '/my/article/addcates',
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
                initFormCates();
                $("#addCateForm")[0].reset();
                layer.close(addIndex);
            }

        })
    })

    let updateIndex = null;
    $("body").on("click", ".updateCate", function () {
        // console.log('ok');
        updateIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $("#updateJump").html()
        });

        let Id = $(this).attr("data-id");
        // console.log(Id);
        $.ajax({
            url: '/my/article/cates/' + Id,
            method: 'GET',
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                form.val("form_update", res.data);
            }
        })
    })

    $("body").on("submit", "#updateCateForm", function (e) {
        e.preventDefault();
        let formInfo = $("#updateCateForm").serialize();
        console.log(formInfo);
        $.ajax({
            url: '/my/article/updatecate',
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
                $("#updateCateForm")[0].reset();
                layer.close(updateIndex);
                initFormCates();
            }
        })
    })

    $("body").on("click", ".btn-del", function () {
        // console.log('del');
        let Id = $(this).attr("data-id");
        // console.log(Id);
        $.ajax({
            url: '/my/article/deletecate/' + Id,
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
                initFormCates();
            }
        })
    })
})