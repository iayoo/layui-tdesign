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
        if ($this->request->isAjax()){
            $params = $this->request->param();
            $res = $adminPermissionService->save($params);
            if ($res){
                return $this->success('保存成功');
            }else{
                return $this->error('保存失败','',$params);
            }
        }
        return $this->fetch('',[
            'permissions' => ToolService::getTree($adminPermissionService->all()->toArray())
        ]);
    }

    /**
     * @title 获取权限列表
     * @return \Iayoo\ApiResponse\Response\ThinkPHP\JsonResponse
     */
    public function getPermissionList(){
        $data = ToolService::getControllerRoute('admin','',['BaseController']);
        $key = $this->request->param('key');
        if (!empty($key)){
            foreach ($data as $l  => $datum){
                if (strstr($datum['path'],$key) === false){
                    unset($data[$l]);
                }
            }
            $data = array_values($data);
        }
        return $this->success('success',$data);
    }
}