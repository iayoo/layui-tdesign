<?php

namespace app\admin\controller\develop;

class Icon extends \app\admin\controller\BaseController
{
    public function index()
    {
        if ($this->request->isAjax()){
            $config = [
                'layui'       => 'layui-icon layui-icon-',
                'fontawesome' => 'fa fa-'
            ];
            $type = $this->request->param('type','all');
            $result = [];
            if ($type=== 'all'){

                foreach ($config as $key => $item){
                    $json = file_get_contents(root_path() . 'runtime/icon/' . $key . '.json');
                    $jsonData = json_decode($json,true);
                    foreach ($jsonData as $jsonDatum){
                        $result[] = [
                            'title'     => '',
                            'fontclass' => $item . $jsonDatum,
                            'unicode'   => ''
                        ];
                    }
                }

            }else{
                $json = file_get_contents(root_path() . 'runtime/icon/' . $type . '.json');
                $jsonData = json_decode($json,true);
                foreach ($jsonData as $jsonDatum){
                    $result[] = [
                        'title'     => '',
                        'fontclass' => $config[$type] . $jsonDatum,
                        'unicode'   => ''
                    ];
                }
            }
            return $this->success('success',$result);
        }
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
        }else{
//            $cssFile = "";
        }
        if ((is_file(root_path() . 'runtime/icon/' . $type .'.json') && empty($cssFile)) || $type === 'all'){
            if ($type === 'all'){
                $json = file_get_contents(root_path() . 'runtime/icon/layui.json');
                $layuiRes = json_decode($json,true);
                $result = [];
                foreach ($layuiRes as $item){
                    $result[] = "layui-icon layui-icon-" . $item;
                }
                $json = file_get_contents(root_path() . 'runtime/icon/fontawesome.json');
                $fontawesomeRes = json_decode($json,true);
                foreach ($fontawesomeRes as $item){
                    $result[] = "fa fa-" . $item;
                }
            }else{
                $json = file_get_contents(root_path() . 'runtime/icon/' . $type .'.json');
                $result = json_decode($json,true);
            }
        }else{
            if (!is_file(root_path() . $cssFile)){
                return $this->error("文件不存在");
            }
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