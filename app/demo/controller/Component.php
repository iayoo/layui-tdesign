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
                ["id"=>1,'title'=>'测试数据1'],
                ["id"=>2,'title'=>'测试数据1'],
                ["id"=>3,'title'=>'测试数据1'],
                ["id"=>4,'title'=>'测试数据1'],
            ]);
        }
        return $this->fetch();
    }
}