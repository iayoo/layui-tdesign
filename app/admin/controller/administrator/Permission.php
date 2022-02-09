<?php

namespace app\admin\controller\administrator;

use app\admin\controller\BaseController;

class Permission extends BaseController
{
    public function index(){
        return $this->fetch();
    }
}