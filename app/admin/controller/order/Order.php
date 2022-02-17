<?php

namespace app\admin\controller\order;

class Order extends \app\admin\controller\BaseController
{
    /**
     * @title 订单列表
     * @return string
     */
    public function index(){
        return $this->fetch();
    }

    /**
     * @title 订单详情
     * @return string
     */
    public function detail(){
        return $this->fetch();
    }
}