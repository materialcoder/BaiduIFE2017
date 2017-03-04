var nodes =[{
				name: "父节点1", 
				children: [{
							name: "子节点11"
							},
							{
							name: "子节点12"
							},
							{name: "子节点13",
							 children:[{name:"叶子节点131"}]
							}]
			}, 
			{
				name: "父节点2",
				children: [{name: "子节点21"},
						   {name: "子节点22", 
						    children:[{name:"叶子节点221"},
						    		  {name:"叶子节点222",children:[{name:"叶子节点2221"}]}]
						  }]
			},
			{
				name: "父节点3",
				children: [{name: "子节点31"},
						   {name: "子节点32", 
						    children:[{name:"叶子节点321"}]
						  }]
			}];