<?php

namespace app\admin\controller\administrator;

use app\admin\controller\BaseController;
use app\services\admin\AdminPermissionService;
use app\services\ToolService;

class Permission extends BaseController
{
    public function index(){
        return $this->fetch();
    }

    public function getList(AdminPermissionService $adminPermissionService){
        return $this->success('success',$adminPermissionService->all());
    }

    public function add(AdminPermissionService $adminPermissionService)
    {
        return $this->fetch('',[
            'permissions' => ToolService::getTree($adminPermissionService->all()->toArray())
        ]);
    }
}