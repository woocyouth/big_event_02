$(function () {
    let layer = layui.layer;
    let form = layui.form;
    initCates();

    function initCates() {
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
                // layer.msg(res.message, {
                //     icon: 6
                // });

                let htmlCate = template("selectList", {
                    data: res.data
                });
                // console.log(htmlCate);
                $("[name=cate_id]").html(htmlCate);
                form.render();
            }
        })
    }

    let p = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: ""
    }

    initForm();

    function initForm() {
        $.ajax({
            url: '/my/article/list',
            data: p,
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
                let htmlList = template("formList", {
                    data: res.data
                });
                $("tbody").html(htmlList);
                renderPage(res.total)
            }
        })
    }

    $("#filterForm").on("submit", function (e) {
        e.preventDefault();
        let cate_id = $("[name=cate_id]").val();
        let state = $("[name=state]").val();
        p.cate_id = cate_id;
        p.state = state;
        initForm();
    })

    let laypage = layui.laypage;

    function renderPage(total) {
        // console.log(total);
        //执行一个laypage实例
        laypage.render({
            elem: 'pageList', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            curr: p.pagenum,
            limit: p.pagesize,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                // console.log(obj);
                //首次不执行
                if (!first) {
                    //do something
                    p.pagenum = obj.curr;
                    p.pagesize = obj.limit;
                    initForm();
                }
            }
        });
    }

    $("tbody").on("click", ".btn-del", function () {
        // console.log(this);
        let Id = $(this).attr("data-id");
        layer.confirm('确认删除？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            console.log(Id);
            $.ajax({
                url: '/my/article/delete/' + Id,
                method: 'GET',
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
                    if ($(".btn-del").length === 1 && p.pagenum > 1) p.pagenum--;
                    initForm();
                }
            })
            layer.close(index);
        })
    });

})