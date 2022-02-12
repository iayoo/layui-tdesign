layui.define(['jquery', 'layer','loading'], function (exports) {
    "use strict";
    let $ = layui.jquery;
    let Radio = function () {
        this.v = '0.1';

        this.init = function (){
            let radioList = $('input[ia-event=group]').parent();
            for (let i = 0; i < radioList.length; i++) {
                let children = $(radioList[i]).find('input[ia-event=group]');
                createElement(radioList[i],children);
                $(radioList[i]).find('.layui-form-radio').remove();
            }
            $(".layui-radio-group .layui-btn").on('click',function (el){
                let name = $(this).data('name');
                let val = $(this).data('value').toString();
                $('input[type=radio],[name='+name+']').each(function () {
                    if ($(this).attr('value').toString()===val){
                        $(this).prop('checked',true);
                        $(this).prev().addClass('layui-form-radioed')
                    }else{
                        $(this).removeAttr('checked');
                        $(this).prev().removeClass('layui-form-radioed')
                    }
                });
                $(this).addClass('layui-this');
                $(this).prevAll().each(function (el) {
                    $(this).removeClass('layui-this');
                })
                $(this).nextAll().each(function (el) {
                    $(this).removeClass('layui-this');
                })
            })
        }

        function createElement(el,data){
            let html = '<div class="layui-btn-group layui-radio-group">'
            for (let i = 0; i < data.length; i++) {
                let title = $(data[i]).attr('title'),
                    value = $(data[i]).attr('value'),
                    name = $(data[i]).attr('name');
                let BTN_CLASS = ''
                if ($(data[i]).attr('checked')){
                    BTN_CLASS = 'layui-btn layui-this';
                }else{
                    BTN_CLASS = 'layui-btn'
                }
                html += "<span class='"+ BTN_CLASS +"' data-value='" + value + "' data-name='"+ name +"'>" + title + '</span>'
            }
            html += "</div>";
            $(el).append(html);
        }
    }
    let radio = new Radio();
    radio.init();
    exports('radio',radio)
}).addcss('radio.css?v=0.1','radio')