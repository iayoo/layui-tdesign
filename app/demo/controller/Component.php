<?php

namespace app\demo\controller;

class Component extends BaseController
{
    public function file_manage()
    {
        return $this->fetch();
    }

    public function notify(){
        return $this->fetch();
    }
}