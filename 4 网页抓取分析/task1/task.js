var page = require('webpage').create(),
	system = require('system'),
	keyword = system.args[1],
	url = "http://www.baidu.com/s?wd=" + keyword,
	dataList = [],
	result = {},
	startTime = Date.now();

page.open(url,function(status){
	if(status !== 'success') {
		console.log('Fall to load the address');
		result.code = 0;
		result.msg = '抓取失败';
		console.log(JSON.stringify(result));
		phantom.exit();
	} else {
		console.log('打开成功，正在抓取信息中');

		setTimeout(function() {

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
					word:keyword,
					time:Date.now()-startTime,
					dataList:dataList
				}

				console.log(JSON.stringify(result));
				phantom.exit();
			});
		},2000);
	}
})