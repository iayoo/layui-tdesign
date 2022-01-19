layui.extend({

}).define(['element','jquery','layer','form','laypage'], function(exports) {
    let layer = layui.layer;
    let $ = layui.jquery;
    let element = layui.element;
    let form = layui.form;
    let laypage = layui.laypage;
    let explorer = {
        open:open
    }
    let searchContain = '<div class="search">' +
        '<form class="layui-form" action="">' +
        '  <div class="layui-form-item">' +
        '    <label class="layui-form-label">文件搜索</label>' +
        '    <div class="layui-input-block">' +
        '      <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">' +
        '    </div>' +
        '  </div>' +
        ' <div class="layui-form-item" pane="">' +
        '    <label class="layui-form-label">文件类型</label>' +
        '    <div class="layui-input-block">' +
        '      <input type="checkbox" name="type[all]" lay-skin="primary" title="所有">' +
        '      <input type="checkbox" name="type[mp3]" lay-skin="primary" title="mp3">' +
        '      <input type="checkbox" name="type[mp4]" lay-skin="primary" title="mp4">' +
        '      <input type="checkbox" name="type[jpeg]" lay-skin="primary" title="jpeg">' +
        '      <input type="checkbox" name="type[jpg]" lay-skin="primary" title="jpg">' +
        '      <input type="checkbox" name="type[png]" lay-skin="primary" title="png">' +
        '      <input type="checkbox" name="type[xls]" lay-skin="primary" title="xls">' +
        '      <input type="checkbox" name="type[xlsx]" lay-skin="primary" title="xlsx">' +
        '      <input type="checkbox" name="type[csv]" lay-skin="primary" title="csv">' +
        '    </div>' +
        '  </div>'+
        '  <div class="layui-form-item">' +
        '    <div class="layui-input-block">' +
        '      <a class="layui-btn" style="margin-right: 8px">搜索<a><a class="layui-btn" style="margin-right: 8px">上传文件<a><a explorer-event="del" class="layui-btn layui-btn-danger">删除文件<a>' +
        '    </div>' +
        '  </div>' +
        '</form>' +
        '</div>';
    let contentHtml = "<div class='explorer_contain'>" + searchContain + "</div><div class='explorer_file_list'></div><div id='explorer_page'></div>";

    function getList(){
        return [
            {'id':1,'title':'测试1.png','path':'/static/admin/images/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpeg','ext':'png'},
            {'id':1,'title':'测试1.png','path':'/static/admin/images/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpeg','ext':'png'},
            {'id':1,'title':'测试1.png','path':'/static/admin/images/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpeg','ext':'png'},
            {'id':1,'title':'测试1.png','path':'/static/admin/images/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpeg','ext':'png'},
            {'id':1,'title':'测试1.png','path':'/static/admin/images/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpeg','ext':'png'},
            {'id':1,'title':'测试1.png','path':'/static/admin/images/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpeg','ext':'png'},
            {'id':1,'title':'测试1.png','path':'/static/admin/images/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpeg','ext':'png'},
            {'id':1,'title':'测试1.png','path':'/static/admin/images/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpeg','ext':'png'},
            {'id':1,'title':'测试1.png','path':'/static/admin/images/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpeg','ext':'png'},
            {'id':1,'title':'测试1.png','path':'/static/admin/images/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpeg','ext':'png'},
            {'id':1,'title':'测试1.png','path':'/static/admin/images/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpeg','ext':'png'},
        ];
    }

    function renderData(data){
        let explorerListDom = $('.explorer_file_list');
        data.map(function (item){
            explorerListDom.append(
                '<div class="file_item" explorer-event="select" data-file-id="'+
                item.id +'"><div class="file_del_btn" data-file-id="'+
                item.id +'"></div><div class="file_selected_icon" ><i class="layui-icon layui-icon-ok"></i></div><div class="image-show"><img src="'+ item.path +
                '" alt="' + item.title + '"></div><div class="title"><p>' +
                item.title + '</p></div></div></div>'
            );
        })
        // 监听事件
        explorerListDom.on('click', '*[explorer-event]', function(){
            let _this = $(this)
                ,attrEvent = _this.attr('explorer-event'),
                id = _this.data('file-id');
            if (_this.hasClass('selected')){
                _this.removeClass('selected')
            }else{
                _this.addClass('selected')
            }
        })

        $(".explorer_contain > .search").on('click','*[explorer-event]',function(){
            let _this = $(this)
                ,attrEvent = _this.attr('explorer-event'),
                id = _this.data('file-id');
            console.log(attrEvent)
            if (attrEvent === 'del'){
                //询问框
                let selectedList = $('.explorer_file_list .selected');
                if (selectedList.length <= 0){
                    return;
                }
                layer.confirm('确认删除'+ selectedList.length +'个文件？', {
                    title:'确认删除？',
                    btn: ['确认','取消'] //按钮
                }, function(index,layerObj){
                    layer.close(index)
                });
            }
        })

        //自定义样式
        laypage.render({
            elem: 'explorer_page'
            ,count: 100
            ,theme: '#1E9FFF'
        });
    }


    function open(){

        //多窗口模式，层叠置顶
        layer.open({
            type: 1 //此处以iframe举例
            ,title: '资源管理器'
            ,area: ['830px', '80%']
            ,shade: 0
            ,maxmin: true
            // ,offset: [ //为了演示，随机坐标
            //     Math.random()*($(window).height()-300)
            //     ,Math.random()*($(window).width()-390)
            // ]
            ,content: contentHtml

            ,btn: ['确定', '取消'] //只是为了演示
            ,yes: function(){
                $(that).click();
            }
            ,btn2: function(){
                layer.closeAll();
            }

            ,zIndex: layer.zIndex //重点1
            ,success: function(layero, index){
                form.render()
                renderData(getList())
            }
            ,end: function(){
                //更新索引
                if(typeof layer.escIndex === 'object'){
                    layer.escIndex.splice(0, 1);
                }
            }
        });
    }
    exports('explorer',explorer);
})