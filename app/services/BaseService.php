<?php

namespace app\services;

use think\Model;

class BaseService
{
    /** @var Model */
    protected $model = Model::class;

    public function __construct()
    {
        $model = $this->model;
        $this->model = new $model();
    }

    public function get($id){
        return $this->model->find($id);
    }

    public function all($where = []){
        return $this->model->where($where)->select();
    }
}