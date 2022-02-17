<?php

namespace app\admin\controller\product;

class Product extends \app\admin\controller\BaseController
{
    /**
     * @title 商品列表
     * @return string
     */
    public function index(){
        return $this->fetch();
    }
}