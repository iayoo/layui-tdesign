<?php

namespace app\services\admin;

use app\model\Admin;

class AdminService extends \app\services\BaseService
{
    protected $model = Admin::class;

    public function wechatLogin($openId){
        $admin = $this->model->where('openid',$openId)->find();
        if (!$admin){
            throw new \Exception('用户不存在');
        }
        if ($admin['status'] !== 1){
            throw new \Exception('用户已被禁止登录');
        }
        session('admin',$admin->toArray());
        return true;
    }
}