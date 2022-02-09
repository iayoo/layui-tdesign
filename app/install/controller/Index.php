<?php
declare (strict_types = 1);

namespace app\install\controller;

use app\TempBaseController;
use think\Request;

class Index extends TempBaseController
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        //
        return $this->fetch();
    }
}
