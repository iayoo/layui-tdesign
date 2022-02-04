<?php
declare (strict_types = 1);

namespace app\admin\controller;

use Iayoo\ApiResponse\Response\ThinkPHP\ResponseTrait;
use think\facade\View;
use think\Request;

class BaseController extends \app\BaseController
{

    use ResponseTrait;

    protected function fetch($template = '', array $vars = []){
        return View::fetch($template, $vars);
    }

    /**
     * 模版变量赋值
     * @param $name
     * @param null $value
     * @return \think\View
     */
    protected function assign($name,$value = null){
        return View::assign($name,$value);
    }

    protected function fetchHandle($template = '',$callable = null){
        if ($this->request->isAjax()){
            if ($template instanceof \Closure){
                return call_user_func($template);
            }elseif ($callable instanceof \Closure){
                return call_user_func($template);
            }else{
                return $this->fail('网络繁忙');
            }
        }
        return $this->fetch();
    }
}
