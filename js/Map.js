function Map(row, col, width, height) {
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	//定义一个数组
	this.arr = [];
	//因为最终要显示到页面上，所以借助dom元素
	this.dom = document.createElement("div");
}
//定义填充方法，用于将dom元素填满
Map.prototype.fill = function() {
	//要一行一行元素的创建
	//循环所有的行，填满所有的行
	for(var j = 0; j < this.row; j ++) {
		//创建行容器
		var row_dom = document.createElement("div");
		row_dom.className = "row";
		//定义一个行数组
		var row_arr = [];
		//循环将一个行容器填满
		for(var i = 0; i < this.col; i ++) {
			//创建小格子元素
			var col_dom = document.createElement("p");
			col_dom.className = "grid";
			row_dom.appendChild(col_dom);
			//将每一个元素放入新的数组
			row_arr.push(col_dom);
		}
		//将创建的一行放入页面this.dom中
		this.dom.appendChild(row_dom);
		//将每创建的一行放入新的数组
		this.arr.push(row_arr);
	}
	this.dom.className = "box";
	document.body.appendChild(this.dom);
}
//清屏
Map.prototype.clear = function() {
	for(var i = 0; i < this.arr.length; i++) {
		for(var j = 0; j < this.arr[i].length; j ++){
			this.arr[i][j].style.backgroundImage = "none";
		}
	}
}