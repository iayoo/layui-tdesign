<?php

namespace app\admin\controller;

use think\facade\Db;

class File extends BaseController
{
    /**
     * @title 上传资源文件
     * @return \think\response\Json
     */
    public function upload()
    {
        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('file');
        // 上传到本地服务器
        $savename = \think\facade\Filesystem::disk('public')->putFile( '', $file);
        $id = Db::name('files')->insertGetId([
            'path'=>'/uploads/' . $savename,
            'filename'=>$file->getOriginalName(),
            'ext'=>$file->getOriginalExtension(),
            'size'=>$file->getSize(),
            'year'=>date('Y'),
            'month'=>date('m'),
            'day'=>date('d'),
            'create_time'=>time(),
        ]);
        if ($id){
            return json(['code'=>0,'data'=>['id'=>$id,'path'=>'/uploads/' . $savename,'title'=>$file->getOriginalName(),'ext'=>$file->getOriginalExtension(),'size'=>$file->getSize()]]);
        }else{
            return json(['code'=>50000,'message'=>"上传失败"]);
        }
    }

    /**
     * @title 文件资源管理器
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function index(){
        $type = $this->request->param('file_type',[]);
        $where = [];
        if ($type){
            $where[] = ['ext','IN',$type];
        }
        $keyword = $this->request->param('keyword','');
        if ($keyword){
            $where[] = ['filename','LIKE',"%{$keyword}%"];
        }
        $list = Db::name('files')->where($where)->page($this->request->param('page',1),$this->request->param('limit',10))->select();
        $count = Db::name('files')->where($where)->count();
        return json(['code'=>0,'data'=>['list'=>$list,'count'=>$count]]);
    }

    /**
     * @title 删除资源文件
     * @return \think\response\Json
     * @throws \think\db\exception\DbException
     */
    public function delete(){
        $files = $this->request->param('file');
        $ids = array_column($files,'id');
        $res = Db::name('files')->whereIn('id',$ids)->delete();
        if ($res){
            return json(['code'=>0,'message'=>'success']);
        }else{
            return json(['code'=>50000,'message'=>'error']);
        }
    }
}