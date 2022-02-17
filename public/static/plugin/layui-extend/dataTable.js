layui.define(['jquery','table','form','element','laydate'], function (exports) {
    let $ = layui.jquery,table = layui.table,form = layui.form,element = layui.element,laydate = layui.laydate;
    let timeSelectArr = [];
    let DataTable = function () {
        
    }
    
    DataTable.prototype.render = function (options) {

        if (options.table === undefined){
            return console.error('table 参数错误');
        }

        let html = '<div class="layui-card-header layui-table-card">' +
            '<form class="layui-form layui-table-form-filter" lay-filter="'+ form.lay_filter +'" style="width: 800px">';

        if (typeof options.filter !== undefined && options.filter.fields.length > 0){
            $.each(options.filter.fields, (idx, item) => {
                let itemHtml = '<div class="layui-form-item">';
                itemHtml += '<label class="layui-form-label">' + item.label + '</label>'
                console.log(item)
                if (item.children !== undefined && item.children.length > 0){
                    let childHtml = '<div class="layui-inline layui-form-item layui-form-pane">';
                    $.each(item.children, (idx, childItem) => {
                        let pane ='pane=""';
                        if (childItem.type === 'radio' || childItem.type === 'checkbox'){

                        }else{
                            pane = ''
                        }
                        let childItemHtml = '<div class="layui-inline layui-form-item" '+ pane +'>';
                        childItemHtml+= '<label class="layui-form-label" >' + childItem.label + '</label>';
                        console.log('111111')
                        switch (childItem.type) {
                            case 'input':
                                childItemHtml += '<div class="layui-input-inline" >';
                                childItemHtml += '<input type="text" name="' + childItem.field + '" autocomplete="off" class="layui-input">'
                                childItemHtml += '</div>';
                                break;
                            case 'select':
                                childItemHtml += '<div class="layui-input-inline"  pane=""><select name="quiz2">';
                                if (childItem.data !== undefined && childItem.data.length > 0){
                                    $.each(childItem.data,function(idx,dataItem){
                                        childItemHtml+= '<option value="' + dataItem.value + '">' + dataItem.title + '</option>';
                                    })
                                }
                                childItemHtml += '</select></div>';
                                break;
                            case 'checkbox':
                                childItemHtml += '<div class="layui-input-inline"  >';
                                if (childItem.data !== undefined && childItem.data.length > 0){
                                    $.each(childItem.data,function(idx,dataItem){
                                        childItemHtml+= '<input type="checkbox" name="' + item.field + '[' + dataItem.value + ']" lay-skin="primary" title="' + dataItem.title + '">';
                                    })
                                }
                                childItemHtml += '</div>';
                                break;
                            case 'radio':
                                childItemHtml += '<div class="layui-input-inline">';
                                if (childItem.data !== undefined && childItem.data.length > 0){
                                    $.each(childItem.data,function(idx,dataItem){
                                        childItemHtml+= '<input type="radio" name="' + childItem.field + '" value="' + dataItem.value + '" title="' + dataItem.title + '">';
                                    })
                                }
                                childItemHtml += '</div>';
                                break;
                            default:
                                break;
                        }
                        childItemHtml += '</div>';
                        childHtml+= childItemHtml;
                        console.log(childHtml)
                    });
                    childHtml += '</div>'
                    itemHtml += childHtml;
                }else{
                    switch (item.type){
                        case 'input':
                            itemHtml += '<div class="layui-input-block">';
                            itemHtml += '<input type="text" name="' + item.field + '" autocomplete="off" class="layui-input">';
                            itemHtml += '</div>';
                            break;
                        case 'checkbox':
                            itemHtml += '<div class="layui-input-block"  pane="">';
                            if (item.data !== undefined && item.data.length > 0){
                                $.each(item.data,function(idx,dataItem){
                                    itemHtml+= '<input type="checkbox" name="' + item.field + '[' + dataItem.value + ']" lay-skin="primary" title="' + dataItem.title + '">';
                                })
                            }
                            itemHtml += '</div>';
                            break;
                        case 'radio':
                            itemHtml += '<div class="layui-input-block"  pane="">';
                            if (item.data !== undefined && item.data.length > 0){
                                $.each(item.data,function(idx,dataItem){
                                    itemHtml+= '<input type="radio" name="' + item.field + '" value="' + dataItem.value + '" title="' + dataItem.title + '">';
                                })
                            }
                            itemHtml += '</div>';
                            break;
                        case 'date_range':
                            itemHtml += '<div class="layui-input-block"  pane="">';
                            itemHtml += '<input type="text" name="' + item.field + '" id="date_range_'+ timeSelectArr.length +'" autocomplete="off" class="layui-input">';
                            itemHtml += '</div>';
                            timeSelectArr.push({
                                id:'date_range_' + timeSelectArr.length,
                                type:'datetime',
                                range:true
                            })
                            break;
                        default:
                            break;
                    }
                }
                itemHtml += '</div>';
                html += itemHtml;
            });

        }
        html += '<div class="layui-form-item" pane="">' +
            ' <label class="layui-form-label"></label>' +
            '<div class="layui-input-block"><div class="layui-inline">' +
            '<button class="layui-btn" type="reset">重置</button>' +
            '<button class="layui-btn layui-btn-primary" lay-submit >搜索</button>' +
            '</div></div></div>';

        html+= '</form></div>';
        console.log(options.table.elem.replace('#',''))
        console.log(html);
        html += '<div class="layui-card-body">' +
            '<table class="layui-hide" id="'+ options.table.elem.replace('#','') +'"></table>' +
            '</div></div>';

        $(options.el).addClass('layui-card layui-table-form-card').html(html);
        form.render();

        timeSelectArr.map(function (item) {
            //日期时间范围
            laydate.render({
                elem: '#' + item.id
                ,type: item.type
                ,range: item.range
            });
        })
        
        let tableObj = table.render(options.table);

        if (options.form !== undefined && options.form.lay_filter !== undefined){
            form.on('submit('+ form.lay_filter +')', function(data){
                tableObj.reload({
                    where: data.field
                    ,page: {
                        curr: 1 //重新从第 1 页开始
                    }
                })
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
        }
    }

    let dataTable = new DataTable();
    exports('dataTable', dataTable);
})