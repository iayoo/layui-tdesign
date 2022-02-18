layui.config({
    base: '/static/plugin/layui-extend/', //静态资源所在路径
    dir:'/static/plugin/layui-extend/'
})

layui.use(['jquery'],function () {
    let $ = layui.jquery;
    //弹出窗设置 自己设置弹出百分比
    function screen() {
        if (typeof width !== 'number' || width === 0) {
            width = $(window).width() * 0.8;
        }
        if (typeof height !== 'number' || height === 0) {
            height = $(window).height() * 0.8;
        }
        return [width + 'px', height + 'px'];
    }

    function miniScreen(){
        if (typeof width !== 'number' || width === 0) {
            width = $(window).width() * 0.5;
        }
        if (typeof height !== 'number' || height === 0) {
            height = $(window).height() * 0.5;
        }
        return [width + 'px', height + 'px'];
    }
})
