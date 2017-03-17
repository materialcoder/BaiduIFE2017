window.onload = function() {
	// 获取元素，定义变量
	var input = document.getElementsByTagName('input'),
		divs = document.getElementsByTagName('div'),
		select = document.getElementById('opt'),
		start = input[0],
		stop = input[1],
		search = input[3],
		addBtn = input[5],
		del = input[6],
		divList = [],
		timer = null;

	// 点击开始遍历按钮，按不同的方式进行遍历		
	start.onclick = function() {
		var treeRoot = document.getElementsByTagName("div")[0];
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

	// 点击时选中，并改变节点的背景色
	for(var i=0;i<divs.length-1;i++) {
		divs[i].style.backgroundColor = "#fff";
		divs[i].onclick = function(e) {
			var e = e || document.event;
			e.stopPropagation();
			innit();
			this.style.backgroundColor = "#abcdef";
			this.id = "selected";
		}
	}
	
	// 点击添加按钮，添加节点
	addBtn.onclick = function() {
		var divs = document.getElementsByTagName('div');
		var addNode = input[4].value?input[4].value:"node";
		var selected = document.getElementById("selected");
		if(selected) {
			selected.innerHTML += " <div style='background-color:rgb(255,255,255);'>"+addNode+"</div>";
			// 更新插入的节点，不加这一段，新加的节点无法点击选中
			for(var i=0;i<divs.length-1;i++) {
				divs[i].onclick = function(e) {
					var e = e || document.event;
					e.stopPropagation();
					innit();
					this.style.backgroundColor = "#abcdef";
					this.id = "selected";
				}
			}
		 } else if(divs.length == 1) { //所有节点都删除后，在body中插入节点，length=1是因为存在一个包含所有按钮的div
		 	var nodeItem = document.createElement("div");
		 	nodeItem.innerText = addNode;
		 	nodeItem.className = "root";
		 	divs[0].parentNode.insertBefore(nodeItem,divs[0]);
			for(var i=0;i<divs.length-1;i++) {
				divs[i].onclick = function(e) {
					var e = e || document.event;
					e.stopPropagation();
					innit();
					this.style.backgroundColor = "#abcdef";
					this.id = "selected";
				}
			}
		} else {
			alert("请先选中要添加内容的节点");
		}
	}

	// 点击删除按钮，删除选中的节点
	del.onclick = function() {
		var selected = document.getElementById("selected");
		if(selected) {
			selected.parentNode.removeChild(selected);
		} else {
			alert("请选择要删除的节点");
		}
	}
	

	//点击搜索按钮开始搜索
	search.onclick = function() {
		var treeRoot = document.getElementsByTagName("div")[0];
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
			for(var i=0;i<node.children.length;i++) {
				preOrder(node.children[i]);
			}
		}
	}

	// 广度优先
	function postOrder(node) {
		if(node!=null) {
			divList.push(node);
			for(var i=1;i<divs.length-1;i++) {
				for(var j=0;j<node.children.length;j++) {
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
		if(timer) clearInterval(timer);
		for(var i=0;i<divs.length-1;i++) {
			divs[i].style.backgroundColor = "#fff";
			divs[i].id = "";
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

	// 搜索并标记
	function find() {
		var val = input[2].value, i = 0, len = divList.length, flag;
		divList[i].style.backgroundColor = "#abcdef";
		timer =setInterval(function() {
			i++;
			if(i < len) {
				divList[i].style.backgroundColor = "#abcdef";
				var tar =divList[i-1].innerText.split(" ")[0]; //获取node的名称
				if(tar == val) {
					divList[i-1].style.backgroundColor = "#f00";
					flag = 1;
				} else {
					divList[i-1].style.backgroundColor = "#fff";
				}
			} else {
				clearInterval(timer);
				// 如果搜索的最后一个的名字与要搜索的值相等，则背景为红色，否则变为白色
				if(divList[len-1].innerText.split(" ")[0] != val) {
					divList[len-1].style.backgroundColor = "#fff";
				} else {
					divList[i-1].style.backgroundColor = "#f00";
					flag = 1;
				}
				if(!flag) {
					alert("没有找到哦-_-");
				}
			}
		},500);
	}
}