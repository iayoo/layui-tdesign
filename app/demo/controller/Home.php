<?php

namespace app\admin\controller;

class Home extends BaseController
{
    /**
     * @title 首页
     * @return string
     */
    public function index(){
        return $this->fetch();
    }
}