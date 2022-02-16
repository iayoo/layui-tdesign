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

    public function select(){
        return $this->fetch();
    }

    public function inputTable(){
        if ($this->request->isAjax()){
            return $this->success('success',[
                ['title'=>'测试数据1'],
                ['title'=>'测试数据1'],
                ['title'=>'测试数据1'],
                ['title'=>'测试数据1'],
            ]);
        }
        return $this->fetch();
    }
}