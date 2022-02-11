<?php

namespace app\admin\controller\administrator;

use app\admin\controller\BaseController;
use app\services\admin\AdminPermissionService;
use app\services\ToolService;

class Permission extends BaseController
{
    /**
     * @title 查看权限列表
     * @return string
     */
    public function index(){
        return $this->fetch();
    }

    /**
     * @title 权限列表接口
     * @param AdminPermissionService $adminPermissionService
     * @return \Iayoo\ApiResponse\Response\ThinkPHP\JsonResponse
     */
    public function getList(AdminPermissionService $adminPermissionService){
        return $this->success('success',$adminPermissionService->all());
    }

    /**
     * @title 添加权限
     * @param AdminPermissionService $adminPermissionService
     * @return \Iayoo\ApiResponse\Response\ThinkPHP\JsonResponse|string
     */
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
     * @title 获取所有路由权限
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

    public function delete(AdminPermissionService $adminPermissionService)
    {
        if ($adminPermissionService->delete($this->request->param('ids',[]))){
            return $this->success('删除成功');
        }else{
            return $this->error('删除失败');
        }
    }
}