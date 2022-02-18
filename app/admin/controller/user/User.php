<?php

namespace app\admin\controller\user;

class User extends \app\admin\controller\BaseController
{
    /**
     * @title 会员列表
     * @return string
     */
    public function index()
    {
        return $this->fetch();
    }

    /**
     * @title 会员详情
     * @return string
     */
    public function detail()
    {
        return $this->fetch();
    }
}