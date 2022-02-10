<?php

namespace app\services;

/**
 * 工具服务类
 */
class ToolService
{
//    public static function getTree($list){
//
//    }

    /**
     * 递归无限级分类权限
     * @param array $data
     * @param int $pid
     * @param string $field1 父级字段
     * @param string $field2 子级关联的父级字段
     * @param string $field3 子级键值
     * @return mixed
     */
    public static function getTree($data, $pid = 0, $field1 = 'id', $field2 = 'pid', $field3 = 'children')
    {
        $arr = [];
        foreach ($data as $k => $v) {
            if ($v[$field2] == $pid) {
                $v[$field3] = self::getTree($data, $v[$field1]);
                $arr[] = $v;
            }
        }
        return $arr;
    }

    public static function getControllerRoute($module,$pre = '',$exclude = []){
        $appPath = root_path() . 'app';
        $modulePath = $appPath . DIRECTORY_SEPARATOR . $module;
        $controllerPath = $modulePath . DIRECTORY_SEPARATOR . 'controller';

        $namespace = 'app\\' . $module . '\controller';
        dump($modulePath);
        dump($controllerPath);
        if (!is_dir($modulePath) && !is_dir($controllerPath)){
            return false;
        }
        $fileList = self::scandirFolder($controllerPath);
        foreach ($fileList as $item){
            if (is_string($item)){
                $className = str_replace('.php','',$item);
                if (in_array($className,$exclude)){
                    continue;
                }
                $className = $namespace . '\\' . $className;
                dump($className);
                self::getClassMethods($className);
            }
        }

//        foreach ($)



    }

    public static function getClassMethods($classname)
    {
        $ref = new \ReflectionClass($classname);
//        $consts = $ref->getConstants(); //返回所有常量名和值
//        echo "----------------consts:---------------" . PHP_EOL;
//        foreach ($consts as $key => $val)
//        {
//            dump("$key : $val" . PHP_EOL);
//        }
//        $props = $ref->getDefaultProperties(); //返回类中所有属性
//        echo "--------------------props:--------------" . PHP_EOL . PHP_EOL;
//        foreach ($props as $key => $val)
//        {
//            dump("$key : $val" . PHP_EOL);   // 属性名和属性值
//        }
        $methods = $ref->getMethods();   //返回类中所有方法
        echo "-----------------methods:---------------" . PHP_EOL . PHP_EOL;
        foreach ($methods as $method)
        {
            dump($method);
            dump($method->getName());
        }
    }

    public static function scandirFolder($path)
    {
        $list = [];
        $temp_list = scandir($path);
        foreach ($temp_list as $file) {
            //排除根目录
            if ($file != ".." && $file != ".") {
                if (is_dir($path . "/" . $file)) {
                    //子文件夹，进行递归
                    $list[$file] = self::scandirFolder($path . "/" . $file);
                } else {
                    //根目录下的文件
                    $list[] = $file;
                }
            }
        }
        return $list;
    }
}