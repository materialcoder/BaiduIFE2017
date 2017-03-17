window.onload = function() {
	// 获取元素，定义变量
	var input = document.getElementsByTagName('input'),
		divs = document.getElementsByTagName('div'),
		select = document.getElementById('opt'),
		start = input[0],
		stop = input[1],
		search = input[3],
		treeRoot = divs[0],
		divList = [],
		timer = null;
	// 绑定事件		
	start.onclick = function() {
		var opt = select.options[select.selectedIndex].value; //获取选中的option值
		if(opt == 0) {
			innit();
			preOrder(treeRoot);
			change();
		} else if(opt == 1) {
			innit();
			postOrder(treeRoot);
			change();
		}
	}
	

	//搜索
	search.onclick = function() {
		var opt = select.options[select.selectedIndex].value; //获取选中的option值
		if(opt == 0) {
			innit();
			preOrder(treeRoot);
			find();
		} else if (opt == 1) {
			innit();
			postOrder(treeRoot);
			find();
		}

	} 

	// 深度优先
	function preOrder(node) {
		if(node!=null) {
			divList.push(node);
			for(var i=1;i<node.children.length;i++) {
				preOrder(node.children[i]);
			}
		}
	}

	// 广度优先
	function postOrder(node) {
		if(node!=null) {
			divList.push(node);
			for(var i=1;i<divs.length-1;i++) {
				for(var j=1;j<node.children.length;j++) {
					divList.push(node.children[j]);
				}
				node = divList[i];
			}
		}
	}

	// 停止遍历
	stop.onclick = function () {
		innit();
	}

	// 初始界面
	function innit() {
		divList=[];
		clearInterval(timer);
		for(var i=0;i<divs.length;i++) {
			divs[i].style.backgroundColor = "#fff";
		}
	}

	// 改变背景色
	function change() {
		var i = 0,
			len = divList.length;
		divList[i].style.backgroundColor = "#abcdef";
		timer =setInterval(function() {
			i++;
			if(i < len) {
				divList[i-1].style.backgroundColor = "#fff";
				divList[i].style.backgroundColor = "#abcdef";
			} else {
				clearInterval(timer);
				divList[len-1].style.backgroundColor = "#fff";
			}
		},1000);
	}

	// 搜索
	function find() {
		var val = input[2].value, i = 0, len = divList.length, flag;
		divList[i].style.backgroundColor = "#abcdef";
		timer =setInterval(function() {
			i++;
			if(i < len) {
				divList[i].style.backgroundColor = "#abcdef";
				if(divList[i-1].firstElementChild.innerHTML == val) {
					divList[i-1].style.backgroundColor = "#f00";
					flag = 1;
				} else {
					divList[i-1].style.backgroundColor = "#fff";
				}
			} else {
				clearInterval(timer);
				if(divList[len-1].firstElementChild.innerHTML == val) {
					divList[len-1].style.backgroundColor = "#f00";
					flag = 1;
				} else {
					divList[len-1].style.backgroundColor = "#fff";
				}
				if(flag){
					alert("好开心，找到了^_^");
				} else {
					alert("没有找到哦-_-");
				}
			}
		},500);
	}
}