layui.define(['jquery', 'layer','loading'], function (exports) {
    "use strict";

    const $ = layui.jquery;
    const layer = layui.layer;
    const loading = layui.loading;

    const Request = function () {
        Request.prototype.v = '0.0.2';
        Request.prototype.config = {
            url:undefined,
            data:undefined,
            triggerAfterSuccess:undefined,
            success:undefined,
            error:undefined,
            // 请求成功后重载表单
            reload_table:0,
            // 请求成功后刷新页面
            reload_page:false,
            // 提交成功关闭当前窗口
            is_close:false,
            type:'POST',
            // 显示loading
            loading:true,
            is_msg:true
        }

        let option = {};

        function init(options){
            if (typeof options === 'object') {
                let o = Object.assign({}, Request.config);
                $.extend(true,o,options);
                option = o;
            }
        }

        Request.prototype.post = function (options) {
            if (typeof options === 'object') {
                this.send(options.url,"POST",options.data,options);
            }
        }

        Request.prototype.get = function (options) {
            if (typeof options === 'object') {
                this.send(options.url,"GET",options.data,options);
            }
        }

        Request.prototype.delete = function (options){
            if (typeof options === 'object') {
                this.send(options.url,"DELETE",options.data,options);
            }
        }
        Request.prototype.msg = function (res,icon,after) {

            if (typeof after === 'function'){
                // if ()
                layer.msg(res, {
                    icon: icon,
                    time: 1000
                },function () {
                    after();
                });
            }else{
                layer.msg(res, {
                    icon: icon,
                    time: 1000
                });
            }
        }
        Request.prototype.send = function (url,type,data,options) {
            init(options);
            let params = {},that = this;
            // 处理请求参数
            if (undefined !== data && 'object' === (typeof data)) {
                params = JSON.stringify(data)
            }
            $.ajax({
                url: url,
                type: type,
                dataType: "json",
                data: params,
                contentType: 'application/json',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                success: function (res) {
                    loading.clear();
                    if (res === undefined) {
                        if (undefined !== option.error) {
                            return option.error(res);
                        } else {
                            layer.msg("网络异常", {
                                icon: 2,
                                time: 1000
                            });
                            return;
                        }
                    }
                    // 判断code是否为未登录code
                    // 判断当前是否为iframe子页面
                    // 触发上级页面跳转登录页面
                    if (
                        undefined !== res.code &&
                        res.code === 40100 &&
                        parent.location.href !== location.href
                    ) {
                        layer.msg("登录已过期，正在跳转至登录页", {
                            icon: 2,
                            time: 1000
                        }, function () {
                            parent.location.href = location.href;
                        });
                        return;
                    }
                    // code 为 0 时请求正常
                    if (undefined !== res.code && res.code === 0) {
                        if (undefined !== res.message) {
                            if (option.loading) {
                                layer.msg(res.message, {
                                    icon: 1,
                                    time: 1000
                                }, function () {
                                    onSuccess(option, res)
                                });
                            } else {
                                onSuccess(option, res)
                            }
                        }
                    } else {
                        layer.msg(res.message, {
                            icon: 2,
                            time: 1000
                        }, function () {
                            if (undefined !== option.error) {
                                option.error(res);
                            }
                        });
                        return false;
                    }
                },
                error: function (res) {
                    loading.clear();
                    if (undefined !== res.responseJSON && undefined !== res.responseJSON.message) {
                        layer.msg(res.responseJSON.message, {
                            icon: 2,
                            time: 1000
                        });
                    } else {
                        layer.msg("网络异常", {
                            icon: 2,
                            time: 1000
                        });
                    }

                    if (undefined !== options.error) {
                        options.error(res);
                    }
                },
                complete: function (res) {
                    loading.clear();
                }
            })
        }
    };



    function onSuccess(options,res){
        if (undefined !== options.is_close && options.is_close){
            parent.layer.close(parent.layer.getFrameIndex(window.name));//关闭当前页
        }
        if (undefined !== options.reload_table && options.reload_table){
            // 刷新上级table
            parent.layui.table.reload(options.reload_table);
        }

        if (parent.layui !== undefined && parent.layui.afterRequestSuccess !== undefined && typeof parent.layui.afterRequestSuccess === "function" && options.triggerAfterSuccess){
            parent.layui.afterRequestSuccess();
        }

        if (undefined !== options.reload_page && options.reload_page){
            // 刷新上级页面
            top.location.reload();
        }
        if (undefined !== options.success){
            options.success(res);
        }
    }

    let request = new Request();
    exports('request', request);
});