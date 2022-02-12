<?php

return [
    'view_path' => app_path() . 'view' . DIRECTORY_SEPARATOR ,

    'tpl_replace_string' => [
        '__LAYUI_STATIC__'    => '/static/plugin/layui',
        '__LAYUI_CONFIG__'    => '/static/plugin/layui/config.js',
        '__LAYUI_CSS__'     => '/static/plugin/layui/css/layui.css',
        '__ADMIN_THEME_CSS__'    => '/static/plugin/layui-extend/css/admin.css',
        '__FONT_AWESOME_CSS__'    => '/static/plugin/font-awesome/css/font-awesome.min.css',
    ]
];