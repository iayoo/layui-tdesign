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

    public function getPermissionList(){
//        $data = [
//            ['id'=>1,'name'=>'登录','path'=>'admin/login'],
//            ['id'=>2,'name'=>'退出登录','path'=>'admin/logout'],
//            ['id'=>3,'name'=>'修改密码','path'=>'admin/change/pass'],
//            ['id'=>4,'name'=>'删除日志','path'=>'admin/log/del'],
//        ];
//        $key = $this->request->param('key');
//        if (!empty($key)){
//            foreach ($data as $l  => $datum){
//                if (strstr($datum['path'],$key) === false){
//                    unset($data[$l]);
//                }
//            }
//            $data = array_values($data);
//        }
        ToolService::getControllerRoute('admin','',['BaseController']);


//        return $this->success('success',$data);
    }
}