<?php
declare (strict_types = 1);

namespace app\demo\controller;

use app\services\admin\AdminPermissionService;
use app\services\menu\MenuService;
use app\services\ToolService;
use Iayoo\ApiResponse\Response\ThinkPHP\JsonResponse;
use think\Request;

class Index extends BaseController
{
    /**
     * @title 后台
     * @return string
     */
    public function index()
    {
        return $this->fetch();
    }

    /**
     * @title 后台首页
     * @return string
     */
    public function home()
    {
        //
        return $this->fetch();
    }

    /**
     * @title 获取后台导航列表
     * @param AdminPermissionService $adminPermissionService
     * @return JsonResponse
     */
    public function menu(AdminPermissionService $adminPermissionService)
    {
        $menu = [
            ['id'=>1,'title'=>'后台示例','pid'=>0],
            ['id'=>2,'title'=>'组件','pid'=>1,'href'=>''],
            ['id'=>3,'title'=>'消息通知（notify）','pid'=>2,'href'=>'component/notify'],
            ['id'=>4,'title'=>'下拉框（select）','pid'=>2,'href'=>'component/select'],
            ['id'=>5,'title'=>'输入框表格提示（input-table）','pid'=>2,'href'=>'component/inputTable'],
        ];
        return $this->success(ToolService::getTree($menu));
    }
}
