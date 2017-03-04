// 获取菜单
var menu = document.getElementById("menu");

// 读取数据，构建页面
findChild(nodes,menu);

// 获取menu下的所有的tree
var divs = menu.getElementsByTagName('div');

// 点击时显示和隐藏
for(var i=0;i<divs.length;i++){
	divs[i].id = i; //设置tree的id，便于onclick时获取对应的tree

	// 获取没有children的分支
	var file = document.getElementById(i);
	if(file.nextSibling == null){
		file.style.color = "#999";
		file.className = "tree nomore";
	}

	divs[i].onclick = function() {
		var tree = document.getElementById(this.id), //获取点击的tree
			node = tree.nextSibling; //获取tree的主分支

		// 如果tree上存在分支，即children，则点击时展开和收起
		if(node!=null){
			var uls = node.getElementsByTagName('ul'); //获取该tree下的主分支的所有小分支

			// 如果是展开的，点击时收起，否则点击时展开
			if(node.style.display == "block") {
				node.style.display = "none";
				tree.className = "tree close";
				// 将主分支上的所有小分支也收起
				for(var j=0;j<uls.length;j++) {
					uls[j].style.display = "none";
				}
			} else {
				node.style.display = "block";
				tree.className = "tree span";
			}
		}
	}
}

// 读取数据函数
/*
 * nodes Array 数据
 * parentnode 要插入树形结构的父元素节点
 */
function findChild(nodes,parentnode) {
	var node = document.createElement("ul");
	node.className = "node";
	parentnode.appendChild(node);

	for(var i=0;i<nodes.length;i++) {
		var li = document.createElement("li");
		var ul = parentnode.getElementsByTagName('ul')[0];  //获取node
		var tree = document.createElement("div"); //创建tree
		ul.appendChild(li);
		tree.className = "tree close";
		tree.innerHTML = nodes[i].name;

		var lis = childNode(ul)[i]; //获取ul下的li，作为children的父节点
		lis.appendChild(tree); //插入children

		//如果存在子节点，则遍历子节点信息
		if(nodes[i].children){
			findChild(nodes[i].children, lis);
		}
	}
}


// 查找指定父节点下的所有子节点
// pNode 父节点
function childNode(pNode) {
	var cNode = [];
	var childNode = pNode.childNodes;
	for(var i=0;i<childNode.length;i++) {
		if(childNode[i].nodeType == 1) {
			cNode.push(childNode[i]);
		}
	}
	return cNode;
}