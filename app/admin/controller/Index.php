<?php
declare (strict_types = 1);

namespace app\admin\controller;

use app\services\admin\AdminPermissionService;
use app\services\menu\MenuService;
use app\services\ToolService;
use Iayoo\ApiResponse\Response\ThinkPHP\JsonResponse;
use think\Request;

class Index extends BaseController
{
    /**
     * 显示资源列表
     *
     * @return string
     */
    public function index()
    {
        return $this->fetch();
    }

    /**
     * 显示创建资源表单页.
     *
     */
    public function home()
    {
        //
        return $this->fetch();
    }

    /**
     * @param AdminPermissionService $adminPermissionService
     * @return JsonResponse
     */
    public function menu(AdminPermissionService $adminPermissionService)
    {
        $menu = $adminPermissionService->all(['status'=>1,'type'=>1]);
        return $this->success(ToolService::getTree($menu->toArray()));
    }
}
