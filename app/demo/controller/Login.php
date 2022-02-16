<?php

namespace app\admin\controller;

class Login extends BaseController
{
    /**
     * @title 登录
     * @return false|\Iayoo\ApiResponse\Response\ThinkPHP\JsonResponse|mixed|string
     */
    public function index(){
        return $this->fetchHandle(function (){

        });
//        return $this->fetch();
    }
}