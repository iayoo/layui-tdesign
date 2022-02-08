layui.define(['table', 'jquery', 'element'], function (exports) {
    "use strict";

    var MOD_NAME = 'loading',
        $ = layui.jquery,
		element = layui.element;

	let config = {
		scene:'curwindow',
		type:0,
		curID:0,
		ID:'IA_LOADING',
		time:0,
		el:undefined
	};
		
    let Loading = function () {
		this.config = config
	}


	Loading.prototype.getWindow = function (){
		if (this.config.scene === 'curwindow'){
			return $('body')
		}else{
			return $(top.window)
		}
	}

	Loading.prototype.getCurID = function(refresh){
		if (refresh === true){
			this.config.curID++;
		}
		return this.config.curID;
	}

	Loading.prototype.getLoadingElm = function (){
		if (this.config.scene === 'curwindow'){
			if (!this.config.curWinLoadingEl){
				this.config.curWinLoadingEl = $(getHtml(this.config.ID + "_" + this.getCurID(true)));
				this.getWindow().append(this.config.curWinLoadingEl)
			}
			return this.config.curWinLoadingEl;
		}
		return $(getHtml(this.config.ID + "_" + this.getCurID(true)));
	}

	function getHtml(id){
		let divStart = '<div class="page-loading" ia-event="page-loading" id="'+id+'">';
		let divEnd = '</div>';
		let iconDivStart = '<div class="loading-icon">';
		let iconDivEnd = '</div>';
		let icon = '<i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>';

		return divStart + iconDivStart + icon + iconDivEnd + divEnd;
	}



	Loading.prototype.load = function (type,scene) {
		let option = this.config;

		if (scene !== undefined){
			this.config.scene = scene
		}
		if (type !== undefined && typeof type === 'string'){
			this.config.type = type
		}
		if (typeof type === 'object'){
			this.config.scene = 'el'
			if (type.el === undefined){
				console.error('loading el error');
				return this;
			}
			option = Object.assign(this.config,type)
			let el = $(type.el);
			this.config.el = type.el
			el.attr("disabled","disabled")
			el.css("opacity","0.7")
			el.append('<i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop btn-loading"></i>');
			this.clear(option);
			return this;
		}
		this.getLoadingElm().fadeIn(300)
	}

	Loading.prototype.clear = function (option) {
		if (option !== undefined && typeof option === 'object'){
			let el = $(option.el);
			if (option.time !== undefined){
				if (option.time === 0){
					// 表示不关闭
					return this;
				}
				setTimeout(function () {
					el.children('i.btn-loading').remove();
					el.removeAttr('disabled');
					el.css("opacity","1");
				},option.time)

				return this;
			}
		}
		if (typeof option === "number"){
			let el = this.config.el
			setTimeout(function (){
				el.children('i.btn-loading').remove();
				el.removeAttr('disabled');
				el.css("opacity","1");
			},option)
		}
		let loadingList = this.getWindow().find('div[id^='+this.config.ID+']').fadeOut(1000)
		return this;
	}

	exports('loading',new Loading());
}).addcss('./modules/loading/loading.css?v=2', 'skincodecss')

