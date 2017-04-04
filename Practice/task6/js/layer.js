;(function($) {
	
	var Layer = function() {
		this.setting = {
			width: 500,
			height: 300,
			// top: 100,
			// left: 100,
			title: "提示",
			content: '这是一个浮层',
			closeBtn: '.layer_mask',
			btn: ['确认','取消'],
			isDragable: true
		};
	}

	Layer.prototype = {
		// 插入浮层结点
		render: function() {
			this.layerBox = $('<div class="layer_main">'+
								'<div class="layer_title" onselectstart="return false">'+this.setting.title+'</div>'+
								'<div class="layer_content">'+this.setting.content+'</div>'+
								'<div class="layer_btn">'+
									'<input type="button" class="layer_confirm_btn" value="'+this.setting.btn[0]+'"><input type="button" class="layer_cancle_btn" value="'+this.setting.btn[1]+'">'+
								'</div>'+
							'</div>');
			this.mask = $('<div class="layer_mask"></div>');
			this.mask.appendTo('body');
			this.layerBox.appendTo("body");

			// 设置浮层样式
			this.layerBox.css({
				width: this.setting.width,
				height: this.setting.height,
				left: (this.setting.left || (document.documentElement.clientWidth - this.setting.width)/2) + 'px',
				top: (this.setting.top || (document.documentElement.clientHeight - this.setting.height)/2) + 'px'
			});
		},

		// 拖动浮层
		isDragable: function() {
			var that = this;
				mouseOffsetX = 0,
				mouseOffsetY = 0,
				isDraging = false; //是否正在拖动
			// 在标题栏上按下，计算鼠标相对拖拽元素的左上角的坐标，并标记元素为可拖动
			$(".layer_title").bind('mousedown',function(e) {
				var e = e || window.event;
				mouseOffsetX = e.pageX - that.layerBox.offset().left; //鼠标相对拖拽元素的左上角的位置
				mouseOffsetY = e.pageY - that.layerBox.offset().top;
				isDraging = true;
			});

			// 鼠标移动时，元素是否标记为可移动，如果是，则更新元素的位置，到当前鼠标的位置
			document.onmousemove = function(e) {
				var e = e || window.event,
					mouseX = e.pageX, //鼠标当前位置
					mouseY = e.pageY,
					moveX = 0, //浮层元素的新位置
					moveY = 0;
				if(isDraging) {
					moveX = mouseX - mouseOffsetX;
					moveY = mouseY - mouseOffsetY;

					// 限定拖动范围不能超过屏幕
					var pageWidth = document.documentElement.clientWidth,
						pageHeight = document.documentElement.clientHeight,
						dialogWidth = that.setting.width,
						dialogHeight = that.setting.height,
						maxX = pageWidth - dialogWidth,
						maxY = pageHeight - dialogHeight;

					moveX = Math.min(maxX, Math.max(0, moveX));
					moveY = Math.min(maxY, Math.max(0, moveY));
 
					$(".layer_main").css({
						left: moveX + 'px',
						top: moveY + 'px'
					});
				}
			}

			// 鼠标松开时，标记元素为不可拖动
			document.onmouseup = function() {
				isDraging = false;
			}
		},

		// 隐藏浮层
		hide: function() {
			this.mask.remove();
			this.layerBox.remove();
		},

		// 隐藏浮层接口
		close: function() {
			var that = this;
			if(this.setting.closeBtn instanceof Array) {
				for(var i=0,len=this.setting.closeBtn.length;i<len;i++) {
					$(this.setting.closeBtn[i]).click(function() {
						that.hide();
					});
				}
			} else if(typeof this.setting.closeBtn === 'string') {
				$(this.setting.closeBtn).click(function() {
					that.hide();
				});
			}
		},

		// 点击确认或取消按钮后执行函数接口
		bindUI: function() {
			var that = this;
			if(this.setting.yes) {
				$(".layer_confirm_btn").click(function() {
					that.setting.yes();
					that.hide();
				});
			}
			if(this.setting.no) {
				$(".layer_cancle_btn").click(function() {
					that.setting.no();
					that.hide();
				});
			}
		},

		// 弹出浮层
		alertMsg: function(setting) {
			$.extend(this.setting, setting);
			this.render();
			if(this.setting.isDragable){
				this.isDragable();
			}
			this.bindUI();
			this.close();
			return this;
		}
	}

	window['Layer'] = Layer;

})(jQuery);