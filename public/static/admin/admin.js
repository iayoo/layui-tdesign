layui.extend({

}).define(['element','dropdown','jquery'], function(exports) {
    let element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    // let dropdown = layui.dropdown;
    let $ = layui.jquery;

    let tabs = [];

    let admin = {
        open:openPage
    };

    function openPage(url,title,id){
        handleTagChange(id,url,title)
    }

    // //菜单点击事件，其中 docDemoMenu1 对应的是菜单结构上的 id 指
    // dropdown.on('click(docSideMenu)', function(options){
    //     // let othis = $(this); //当前菜单列表的 DOM 对象
    //     console.log(111)
    //     // console.log(options); //菜单列表的 lay-options 中的参数
    // });

    function iframeLoading(){
        let loafingHtml = "<div class='ia-loading'><div><i class='layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop' style='font-size: 50px'></i></div></div>";
        let loading = $(loafingHtml);
        $(".layui-layout-admin .layui-body .layui-tab-content").append(loading)
        $(".layui-layout-admin .layui-body .layui-tab-content").attr('height',0)
        setTimeout(function () {
            $(".layui-layout-admin .layui-body .layui-tab-content").removeAttr('height')

            $(".layui-layout-admin .layui-body .layui-tab-content .ia-loading").remove()
        },1000)
    }

    function handleTagChange(id,href,title){
        let isHasTab = false;
        tabs.map(function (item){
            if (id === item.id){
                element.tabChange('window-tab', id); //切换到：用户管理
                isHasTab = true;
            }
        })
        if (href !== undefined && !isHasTab){
            iframeLoading()
            //新增一个Tab项
            let res = element.tabAdd('window-tab', {
                title: title//用于演示
                ,content:  '<iframe id="' + id + '" data-frameid="' + id + '" scrolling="auto" frameborder="0" src="' +
                    href + '" style="width:100%;height:100%;"></iframe>'
                ,id: id //实际使用一般是规定好的id，这里以时间戳模拟下
            })
            tabs.push({id:id,href:href,title:title})
            element.tabChange('window-tab', id); //切换到：用户管理

        }
    }

    element.on('tabDelete(window-tab)', function(data){
        tabs.splice(data.index,1)
    });

    //监听导航点击
    element.on('nav(side_menu)', function(elem){
        let href = $(elem).data('href');
        let hrefId = $(elem).attr('lay-id');
        handleTagChange(hrefId,href,elem.text())
    });
    // <i class="layui-icon layui-icon-home"></i>
    exports('admin',admin);
});