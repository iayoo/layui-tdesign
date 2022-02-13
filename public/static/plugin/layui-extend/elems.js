layui.define(['jquery', 'layer','table','form'], function (exports) {
    "use strict";
    let $ = layui.jquery,table=layui.table,form=layui.form;
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

    let InputPrompt = function () {
        this.timer = null;
        let that = this;
        this.render = function (params) {
            
        }
        this.init = function () {
            $("input[type=prompt]").each(function (el) {
                let _this = $(this);
                let url = $(this).attr('href');
                let field = $(this).attr('field');
                if (url === undefined || !url){
                    return;
                }
                let curID = "promptID_" + promptID;
                let tableHtml = '<div class="prompt-pop-table layui-anim layui-anim-upbit layui-hide" style="display: none"><table class="layui-hide" id="'+ curID +'" lay-filter="'+ curID +'"></table></div>';
                $(this).after(tableHtml);

                $(this).on('focus',function () {
                    $('.prompt-pop-table.layui-show').removeClass('layui-show').addClass('layui-hide');
                    let focusThis = $(this);
                    if (!focusThis.hasClass('input-focus')){
                        focusThis.addClass('input-focus')
                    }
                    let pop = $(this).parent().find('.prompt-pop-table');
                    if (pop.hasClass('layui-hide')){
                        pop.removeClass('layui-hide');
                        pop.addClass('layui-show');
                    }
                })
                $(document).bind('click', function(el) {
                    let e = el || window.event;
                    let elem = e.target || e.srcElement;
                    while (elem) {
                        if ($(elem).hasClass('prompt-pop-table')){
                            return;
                        }
                        if ($(elem).attr('type') === 'prompt'){
                            return;
                        }
                        elem = elem.parentNode;
                    }
                    $('.prompt-pop-table.layui-show').removeClass('layui-show').addClass('layui-hide')
                    $('.input-focus').removeClass('input-focus');
                });
                //展示已知数据
                table.render({
                    elem: '#' + curID
                    ,url:url
                    ,cols: [[ //标题栏
                        {field: 'title', title: '权限', width: 120}
                        ,{field: 'path', title: '路径', width: 320}
                    ]]
                    ,id:curID
                    ,skin: 'line' //表格风格
                    ,even: true
                    //,page: true //是否显示分页
                    //,limits: [5, 7, 10]
                    //,limit: 5 //每页默认显示的数量
                });
                _this.bind('input propertychange', function() {
                    let valt = _this.val();
                    that.searchInputTable(curID,valt);
                })
                //监听行单击事件（双击事件为：rowDouble）
                if (field === undefined){
                    return;
                }
                table.on('row('+ curID +')', function(obj){
                    let data = obj.data;
                    _this.val(data[field]);
                    if (data.title){
                        $('input[name=title]').val(data.title)
                    }
                    $('.prompt-pop-table.layui-show').removeClass('layui-show').addClass('layui-hide');
                    $('.input-focus').removeClass('input-focus');
                });
            });
        }
        let promptID = 0;
        this.searchInputTable = function(tableId,value){
            if (that.timer){
                clearTimeout(that.timer); // 清除上一个定时器
            }
            that.timer = setTimeout(function () {
                table.reload(tableId,{
                    where:{
                        key:value
                    }
                })
            }, 300);
        }
    }
    
    let FormVerify = function () {
        this.v = '0.1.0';
        this.verifyConfig = {};
        let that = this;
        this.config = {
            verify:{
                required: [
                    /[\S]+/
                    ,'必填项不能为空'
                ]
                ,phone: [
                    /^1\d{10}$/
                    ,'请输入正确的手机号'
                ]
                ,email: [
                    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
                    ,'邮箱格式不正确'
                ]
                ,url: [
                    /^(#|(http(s?)):\/\/|\/\/)[^\s]+\.[^\s]+$/
                    ,'链接格式不正确'
                ]
                ,number: function(value){
                    if(!value || isNaN(value)) return '只能填写数字'
                }
                ,date: [
                    /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/
                    ,'日期格式不正确'
                ]
                ,identity: [
                    /(^\d{15}$)|(^\d{17}(x|X|\d)$)/
                    ,'请输入正确的身份证号'
                ]
            },
        }
        this.required = function (value) {
        }
        
        function handleVerify(value, item){
            let verify_key = $(item).attr('lay-verify');
            let isError = false;
            let errorMsg = '';
            if (that.config.verify[verify_key] === undefined){
                return false;
            }
            if (typeof that.config.verify[verify_key] === 'function'){
                let verifyRes = that.config.verify[verify_key]();
                if (verifyRes === undefined){
                    return false;
                }
                if (verifyRes.result){
                    return null;
                }
                isError = true;
            }else if(typeof that.config.verify[verify_key] === 'object'){
                errorMsg = that.config.verify[verify_key].error === undefined?'':that.config.verify[verify_key].error;
                if (typeof that.config.verify[verify_key].verify === 'string'){
                    let vers = that.config.verify[verify_key].verify.split('|');
                    layui.each(vers, function(_, thisVer){
                        //匹配验证规则
                        if(!that.config.verify[thisVer][0].test(value)) {
                            isError = true;
                            errorMsg = errorMsg?errorMsg:that.config.verify[thisVer][1];
                        }
                    })
                }else if (typeof that.config.verify[verify_key].verify === 'function' && !that.config.verify[verify_key].verify(value, item)){
                    isError = true;
                }
            }
            if (isError){
                $(item).addClass('layui-input-warning');
                if (!$(item).next().hasClass('form-item-msg')){
                    $(item).after("<span class='form-item-msg is-error'>" + errorMsg + "</span>");
                }
                $(item).change(function () {
                    $(this).removeClass('layui-input-warning');
                    if ($(this).next().hasClass('form-item-msg')){
                        $(this).next().remove();
                    }
                })
                return stop = true;
            }
        }
        this.verify = function (obj) {
            console.log(this.config.verify);
            $.extend(true,this.config.verify, obj);
            $.each(obj, function(index,value){
                that.verifyConfig[index] = handleVerify
            });
            form.verify(that.verifyConfig)
            return that.verifyConfig;
        }
    }
    
    let radio = new Radio();
    radio.init();
    let stepNumber = new StepNumber();
    stepNumber.init();
    let inputPrompt = new InputPrompt();
    inputPrompt.init();

    let formVerify = new FormVerify();
    
    let elems = {
        radio:radio,
        stepNumber:stepNumber,
        inputPrompt:inputPrompt,
        form:formVerify
    }
    exports('elems',elems)
}).addcss('elems.css?v=0.1.1','elems')