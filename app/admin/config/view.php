<?php

return [
    'view_path' => app_path() . 'view' . DIRECTORY_SEPARATOR ,

    'tpl_replace_string' => [
        //
        '__LAYUI_STATIC__'     => '/static/plugin/layui',
        // 配置文件
        '__LAYUI_CONFIG__'     => '/static/plugin/layui/config.js',
        // layui 样式
        '__LAYUI_CSS__'        => '/static/plugin/layui/2.7.0.rc5/css/layui.css',
        // layui js 资源
        '__LAYUI_JS__'         => '/static/plugin/layui/2.7.0.rc5/layui.js',
        // admin theme 主体样式
        '__ADMIN_THEME_CSS__'  => '/static/plugin/layui-extend/css/admin.css',
        // font awesome 字体样式
        '__FONT_AWESOME_CSS__' => '/static/plugin/font-awesome/css/font-awesome.min.css',
    ]
];