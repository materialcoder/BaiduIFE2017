window.onload = function() {
	var timer = null;
	var container = document.getElementById('container');
	var deg=0;
	// 鼠标悬停时停止滚动
	container.onmouseout = function() {
		timer = setInterval(function(){
			deg +=45;
			container.style.transform = "rotateY(-"+ deg +"deg)";
		},1500);
	}
	container.onmouseout();

	// 鼠标离开时开始滚动
	container.onmouseover = function() {
		clearInterval(timer);
	}

	// 点击图片时进行切换
	var pics = container.getElementsByTagName('div');
	for(var i=0;i<pics.length;i++) {
		pics[i].onclick = function() {
			deg += 45;
			container.style.transform = "rotateY(-"+ deg +"deg)";
		}
	}
}