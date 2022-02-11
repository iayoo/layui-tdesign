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

    public function save($data){
        return $this->model->save($data);
    }

    public function delete($ids){
        if (is_array($ids) && isset($ids[0]) && (is_numeric($ids[0]) || is_string($ids[0]))){
            return $this->model->where('id','IN',$ids)->delete();
        }
        if (is_numeric($ids) || is_string($ids)){
            return $this->model->where('id',$ids)->delete();
        }
        if (is_array($ids)){
            return $this->model->where($ids)->delete();
        }
        throw new \Exception('参数错误');
    }
}