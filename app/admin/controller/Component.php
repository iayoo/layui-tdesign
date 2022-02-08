<?php

namespace app\admin\controller;

class Component extends BaseController
{
    public function file_manage()
    {
        return $this->fetch();
    }

    public function step()
    {
        return $this->fetch();
    }
}