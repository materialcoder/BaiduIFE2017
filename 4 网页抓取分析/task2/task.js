var page = require('webpage').create(),
	system = require('system'),
	device=system.args[1],
	keyword = system.args[2],
	url = "http://www.baidu.com/s?wd=" + keyword,
	dataList = [],
	result = {},
	w,h,
	configs = [
		{
			name: 'iphone5',
			userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
			width:320,
			height:568
		},
		{
			name: 'iphone6',
			userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
			width:375,
			height:667
		},
		{
			name: 'ipad',
			userAgent:'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
			width:768,
			height:1024
		}
	];

// 判断设备
for(var i in configs) {
	if(configs[i].name == device){
		page.settings.userAgent = configs[i].userAgent;
		page.settings.viewportSize = {width:configs[i].width, height:configs[i].height}
		w = configs[i].width;
		h = configs[i].height;
	}
}

var	startTime = Date.now();

page.open(url,function(status){
	if(status !== 'success') {
		console.log('Fall to load the address');
		result.code = 0;
		result.msg = '抓取失败';
		console.log(JSON.stringify(result));
		phantom.exit();
	} else {
		console.log('页面打开成功，正在抓取信息中...');

		// 抓取页面
		page.includeJs('./jquery-3.1.0.min.js',function(){
			dataList = page.evaluate(function() {
				var data = [];
				var $content = $('.c-container');
				$content.each(function(index){
					data[index] = {
						title:$(this).find('.t').text() || '',
						info:$(this).find('.c-abstract').text() || '',
						link:$(this).find('.c-showurl').text() || '',
						pic:$(this).find('.c-img').attr('src') || ''
					};
				})
				return data;
			});

			result = {
				code:1,
				msg:'抓取成功',
				device:device,
				word:keyword,
				time:Date.now()-startTime,
				dataList:dataList
			}

			console.log(JSON.stringify(result));
		});

		// 截取屏幕
		setTimeout(function() {
			page.clipRect = {top:0, left:0, width:w, height:h};
			page.render(device + '.png');
			phantom.exit();
		},2000);
	}
})