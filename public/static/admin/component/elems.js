layui.define(['jquery', 'layer'], function (exports) {
    "use strict";
    let $ = layui.jquery;
    //乘法
    function mul(a, b) {
        let c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch(f) {}
        try {
            c += e.split(".")[1].length;
        } catch(f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    }
    //除法
    function div(a, b) {
        var c, d, e = 0,
            f = 0;
        try {
            e = a.toString().split(".")[1].length;
        } catch(g) {}
        try {
            f = b.toString().split(".")[1].length;
        } catch(g) {}
        return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
    }

    function add(a, b) {
        let c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch(f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch(f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
    }
    //减法
    function sub(a, b) {
        let c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch(f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch(f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
    }
    let StepNumber = function () {
        this.v = '0.1.0';
        this.init = function () {
            $("input[type=number]").each(function (el) {
                let html = '<div class="layui-inline number-input">';
                html += '<span class="layui-btn minus-btn layui-btn-primary"><i class="layui-icon layui-icon-subtraction"></i></span>'
                html += $(this).prop("outerHTML");
                html += '<span class="layui-btn plus-btn layui-btn-primary"><i class="layui-icon layui-icon-add-1"></i></span>'
                html += '</div>';
                $(this).replaceWith(html)
            });
            $('span.plus-btn').on('click',function (el) {
                let numberInput = $(this).parent().find('input');
                let step = numberInput.attr('step')
                let max = numberInput.attr('max')
                if (step === undefined){
                    step = 1;
                }
                if (max !== undefined && add(numberInput.val(),step) > max){
                    return;
                }
                numberInput.val(add(numberInput.val(),step));
            })
            $('span.minus-btn').on('click',function (el) {
                let numberInput = $(this).parent().find('input');
                let step = numberInput.attr('step')
                let min =  numberInput.attr('min')
                if (step === undefined){
                    step = 1;
                }
                if (min !== undefined && sub(numberInput.val(),step) < min){
                    return;
                }
                numberInput.val(sub(numberInput.val(),step));
            })
        }
    }


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
                        $(this).prev().addClass('layui-form-radioed');
                    }else{
                        $(this).removeAttr('checked');
                        $(this).prev().removeClass('layui-form-radioed');
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
                    BTN_CLASS = 'layui-btn';
                }
                html += "<div class='"+ BTN_CLASS +"' data-value='" + value + "' data-name='"+ name +"'><span>" + title + '</span></div>'
            }
            html += "</div>";
            $(el).append(html);
        }
    }
    let radio = new Radio();
    radio.init();
    let stepNumber = new StepNumber();
    stepNumber.init();
    let elems = {
        radio:radio,
        stepNumber:stepNumber
    }
    exports('elems',elems)
}).addcss('elems.css?v=0.1','elems')