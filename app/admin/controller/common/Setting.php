<?php

namespace app\admin\controller\common;

class Setting extends \app\admin\controller\BaseController
{
    /**
     * @title 网站设置
     * @return string
     */
    public function site()
    {
        return $this->fetch();
    }
}