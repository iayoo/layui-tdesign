<?php

namespace app\admin\controller\authentication;

use app\services\admin\AdminService;

class Wechat extends \app\admin\controller\BaseController
{
    public function index()
    {
        return $this->fetch();
    }

    /**
     * @title 微信授权登录
     * @param AdminService $adminService
     * @return \Iayoo\ApiResponse\Response\ThinkPHP\JsonResponse
     */
    public function login(AdminService $adminService){
        $code = $this->request->param('code');
        if (empty($code)){
            return $this->error('参数错误');
        }
        $json = file_get_contents("https://api.weixin.qq.com/sns/oauth2/access_token?appid=&secret=&code={$code}&grant_type=authorization_code");
        $res = json_decode($json,true);
        if (isset($res['openid'])){
            try {
                $adminService->wechatLogin($res['openid']);
            }catch (\Exception $e){
                return $this->error($e->getMessage() . ' openid:' . $res['openid']);
            }
            return $this->success("登录成功");
        }
        return $this->error("登录失败");
    }
}