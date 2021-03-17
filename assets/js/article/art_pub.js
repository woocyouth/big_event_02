$(function () {
    let layer = layui.layer;
    let form = layui.form;
    initForm();

    function initForm() {
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
                let htmlStr = template("selectList", {
                    data: res.data
                });
                $("[name=cate_id]").html(htmlStr);
                form.render();
            }
        })
    }

    // 初始化富文本编辑器
    initEditor();

    // 1. 初始化图片裁剪器
    let $image = $('#image')

    // 2. 裁剪选项
    let options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);


    $("#btnChooseImage").on("click", function (e) {
        e.preventDefault();
        $("[name=fileImg]").click();
    })

    $("[name=fileImg]").on('change', function (e) {
        let file = e.target.files[0];
        // console.log(file);
        if (file === undefined) {
            return layer.msg("请选择上传图片", {
                icon: 5
            });
        }

        var newImgURL = URL.createObjectURL(file)
        console.log(newImgURL);
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    let saveState = "已发布";

    $("#btnSave2").on("click", function (e) {
        e.preventDefault();
        saveState = "草稿";
    })

    function publishArticle(fd) {
        // console.log(...fd);
        $.ajax({
            url: '/my/article/add',
            method: 'POST',
            data: fd,
            dataType: 'json',
            contentType: false,
            processData: false,
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
                $("form")[0].reset();
                window.parent.document.querySelector("#art_list").click();
            }
        })
    }

    $("form").on("submit", function (e) {
        e.preventDefault();
        // console.log('ok');
        let fd = new FormData(this);
        // console.log(...fd);
        fd.append("state", saveState);
        console.log('okk');
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                // console.log(blob);
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                // console.log(...fd);
                publishArticle(fd)
            })

    })

})