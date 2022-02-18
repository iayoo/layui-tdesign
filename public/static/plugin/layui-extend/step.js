layui.extend({

}).define(['element','jquery','form'], function(exports) {
    let $ = layui.jquery,element = layui.element,form = layui.form;

    let step = {
        render:render,
        set:set,
        step:1,
        cur_step:1,
        el:'',
        width:'100%'
    };

    function init(el){
        let elm;
        if (typeof el === 'string'){
            elm = $(el);
        }else if(typeof el === 'object'){
            elm = $(el.el);
            // step.step = el.step
            step.width = el.width
            if (typeof el.next === 'function'){
                step.next = el.next
            }
        }
        return elm;
    }

    function set(number){
        if (number < 1){
            return false;
        }
        if (number > step.step){
            return false;
        }
        step.cur_step = number
        refresh()
    }

    function refresh(){
        let allItem = step.el.find('.ia-step-item');
        for (let i = 1;allItem.length >= i ;i ++){
            if ($(allItem[i]).hasClass('item-active') && i>=step.cur_step){
                $(allItem[i]).removeClass('item-active');
            }
            if (!$(allItem[i]).hasClass('item-active') && i<step.cur_step){
                $(allItem[i]).addClass('item-active');
            }
        }
        renderData()
    }

    function renderData(){
        let allData = step.el.find('[ia-step]');
        for (let i = 0;i<allData.length;i++){
            if (Number($(allData[i]).attr('ia-step')) === step.cur_step){
                $(allData[i]).show();
            }else{
                $(allData[i]).hide();
            }
        }
    }

    function render(el){
        let elm = init(el);
        elm.addClass('ia-step');
        elm.width(step.width);
        elm.prepend("<div class='step-contain'></div>")
        let stepElm = elm.children('.step-contain');
        let stepItemList = elm.find('[ia-step]');
        for (let i = 1; stepItemList.length >= i; i++){
            let html = "<div class='ia-step-item ";
            if (i===1){
                html += "item-active'><div class='icon-item'><div class='step-number'>";
            }else{
                html += "'><div class='icon-item'><div class='step-number'>"
            }
            let title = $(stepItemList[i-1]).attr('ia-step-title')
            html +=  i + "</div><div class='step-line'></div><div class='step-line-active'></div></div><div class='step-title'>" + title + "</div></div>";
            stepElm.append(html)
        }
        step.step = stepItemList.length;
        elm.append("<div class='step-btn-group'></div>")
        let stepBtnGroup = elm.children('.step-btn-group');
        stepBtnGroup.append("<button class='layui-btn layui-btn-normal' ia-event='last-step'>上一步</button>")
        stepBtnGroup.append("<button class='layui-btn layui-btn-normal' lay-submit lay-filter='*' ia-event='next-step'>下一步</button>")
        stepBtnGroup.on('click', '*[ia-event]', function(){
            let _this = $(this)
            let ev = _this.attr('ia-event');
            if (ev === 'last-step'){
                set(step.cur_step - 1)
            }
            if (ev === 'next-step'){
                let formElm = '[ia-step='+ step.cur_step +']'
                // console.log($(formElm).children('form').submit())
                // $("form").submit(function(e){
                //     // alert("Submitted");
                //     console.log(e)
                // });
                if (typeof step.next === "function"){
                    if (step.next(step.el,step.cur_step) !== false){
                        set(step.cur_step + 1)
                    }
                }else{
                    set(step.cur_step + 1)
                }
            }
        })
        step.el = elm;
        refresh()
        return this;
    }

    exports('step',step);
})