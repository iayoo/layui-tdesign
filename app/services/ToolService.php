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
        if (!is_dir($modulePath) && !is_dir($controllerPath)){
            return false;
        }
        $fileList = self::scandirFolder($controllerPath);
        $re = [];
        self::getClassNameFromFile($fileList,$module . '\\',$exclude,$classList);
        foreach ($classList as $className){
            $class = str_replace($module . '\\','app\\'. $module . '\controller\\',$className['class']);
            $methods = self::getClassMethods($class);
            foreach ($methods as $method){
                $re[] = [
                    'path'  => $className['route'] . '/' . $method['method'],
                    'title' => $method['title']
                ];
            }
        }
        return $re;
    }

    public static function getClassMethods($classname)
    {
        $ref = new \ReflectionClass($classname);
        $methods = $ref->getMethods();   //返回类中所有方法
        $methodList = [];
        foreach ($methods as $method)
        {
            if ($method->class === $classname){
                $docArr = explode(PHP_EOL,$method->getDocComment());
                $loneDoc = '';
                foreach ($docArr as $k => $item){
                    $loneDoc = str_replace(' ','',$item);
                    if (strstr($loneDoc,'@title') !== false){
                        break;
                    }else{
                        $loneDoc = '';
                    }
                }
                $methodList[] = [
                    'method'    => $method->getName(),
                    'title'     => str_replace('*@title','',$loneDoc),
                ];
            }
        }
        return $methodList;
    }

    public static function getClassNameFromFile($list,$pre = '',$exclude = [],&$return = [])
    {
        foreach ($list as $key => $item){
            if (is_string($item)) {
                $className = str_replace('.php', '', $item);
                if (in_array($className, $exclude)) {
                    continue;
                }
                $last = substr($pre,-1,1);
                $return[] = [
                    'route'=>str_replace('\\','/',$pre) . $className,
                    'class'=> $last === '.' ?
                        str_replace('.','\\',substr_replace($pre,'\\',-1,1)) . $className:
                        $pre . $className,
                ];
            }
            if (is_array($item)){
                self::getClassNameFromFile($item,$pre . $key . '.',$exclude,$return);
            }
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