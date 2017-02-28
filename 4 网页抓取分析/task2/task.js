var page = require('webpage').create(),
	system = require('system'),
	fs = require('fs'),
	device=system.args[1],
	keyword = system.args[2],
	url = "http://www.baidu.com/s?wd=" + keyword,
	dataList = [],
	result = {},
	w,h;

//读取配置文件
if(fs.exists('config.json')) {
	var file = fs.open('config.json','r'),
		content = '', config = null;
	while(!file.atEnd()) {
		content += file.readLine();  //string
	}
	config = JSON.parse(content); //object 从一个字符串中解析出json对象
	for(var i = 0 ; i<3;i++){
		if (config[i].name === device) {
			deviceConf = config[i];
		}
	}
	page.settings.userAgent = deviceConf.userAgent;
	page.viewportSize = {width:deviceConf.width, height:deviceConf.height};
	w = deviceConf.width;
	h = deviceConf.height;
}

var	startTime = Date.now();

//抓取页面信息
page.open(url,function(status){
	if(status !== 'success') {
		console.log('Fall to load the address');
		result.code = 0;
		result.msg = '抓取失败';
		console.log(JSON.stringify(result)); //从一个对象解析出字符串
		phantom.exit();
	} else {
		console.log('页面打开成功，正在抓取信息中...');

		// 查找页面信息
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

			//回显结果
			result = {
				code:1,
				msg:'抓取成功',
				device:device, //设备名称
				word:keyword, //搜索关键词
				time:Date.now()-startTime, //运行时间
				dataList:dataList //抓取的信息
			}

			console.log(JSON.stringify(result));
		});

		// 截取屏幕
		setTimeout(function() {
			page.clipRect = {top:0, left:0, width:w, height:h}; //截取屏幕的大小,默认为截取整个页面的大小
			page.render(device + '.png');
			phantom.exit();
		},2000);
	}
})