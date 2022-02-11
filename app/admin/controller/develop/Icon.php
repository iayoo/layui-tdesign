<?php

namespace app\admin\controller\develop;

class Icon extends \app\admin\controller\BaseController
{
    public function index()
    {
        return $this->fetch();
    }

    public function getJson(){
        $path = $this->request->param('path');
        $type = $this->request->param('type','layui');
        $cssFile = '';
        if ($type === 'layui'){
            $default = '';
//            $default = 'public/static/admin/layui/css/layui.css';
            $cssFile = $path??$default;
        }elseif ($type === 'fontawesome'){
            $default = '';
//            $default = 'public/static/admin/font-awesome/css/font-awesome.min.css';
            $cssFile = $path??$default;
        }
        if (is_file(root_path() . 'runtime/icon/' . $type .'.json') && empty($cssFile)){
            $json = file_get_contents(root_path() . 'runtime/icon/' . $type .'.json');
            $result = json_decode($json,true);
        }else{
            $this->makeIconCache('runtime/icon/' . $type .'.json');
            $result = $this->readIconFromCssFile($type,root_path() . $cssFile);
            file_put_contents(root_path() . 'runtime/icon/' . $type .'.json',json_encode($result));
        }
        return $this->success('success',$result);
    }

    protected function makeIconCache($path){
        $pathInfo = explode('/',$path);
        $dir = root_path();
        foreach ($pathInfo as $item){
            if (strstr($item,'.') !== false){
                return;
            }
            if (!is_dir($dir . $item)){
                mkdir($dir . $item);
            }
            $dir .= $item . '/';
        }
    }

    public function readIconFromCssFile($type,$path){
        $reg = '';
        $content = file_get_contents($path);
        if ($type === 'layui'){
            $reg = '/layui-icon-(.*?)(\{(.*?)\})/';
        }elseif ($type === 'fontawesome'){
            $reg = '/fa-(\S[^{]+?):before/';
        }
        preg_match_all($reg,$content,$matches);
        $result = [];
        if (isset($matches[1]) && !empty($matches[1])){
            foreach ($matches[1] as $item){
                $result[] = str_replace(':before','',$item);
            }
        }
        return $result;
    }
}