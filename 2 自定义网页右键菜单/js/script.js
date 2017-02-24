window.onload=function() {
	var menu = document.getElementById('menu'),
		container = document.getElementById('container');
	container.oncontextmenu = function(event) {
		var e = event || document.event;
		var x=e.clientX,y=e.clientY, //鼠标点击处的坐标
			menu_W=menu.offsetWidth, //菜单的宽度
			menu_H=menu.offsetHeight, //菜单的高度
			width_x=container.offsetWidth + container.offsetLeft, //点击区域上边框距浏览器顶部的距离
			width_y=container.offsetHeight + container.offsetTop, //点击区域右边框距浏览器左边的距离
			scrollTop=document.body.scrollTop; //滚动条的距离
		e.returnValue = false; //阻止默认的鼠标右键行为
		menu.style.display = "block";
		
		//菜单显示位置
		if(y<menu_H) {
			menu.style.top=y+scrollTop+"px";
		} else{
			menu.style.top = (y + menu_H > width_y - scrollTop ? y - menu_H + scrollTop : y + scrollTop)+"px";
		}
		menu.style.left = (x + menu_W > width_x ? x - menu_W : x)+"px";
	}
	//隐藏菜单
	document.onclick=function() {
		menu.style.display="none";
	}
}