function Snake(pic_obj) {
	//数组(里面存放的是蛇的每一个身体坐标)
	this.arr = [
		{row: 4, col: 4},
		{row: 4, col: 5},
		{row: 4, col: 6},
		{row: 4, col: 7},
		{row: 4, col: 8}
	];
	//头部图片
	this.head_pic = pic_obj.head_pic;
	//身体图片
	this.body_pic = pic_obj.body_pic;
	//尾部图片
	this.tail_pic = pic_obj.tail_pic;
	//头部的数组下标
	this.head_idx = 2;
	//尾部的数组下标
	this.tail_idx = 0;
	//定义一个锁
	this.lock = true;
	//默认方向向右
	this.direction = 39;
}
//给蛇添加移动方法
Snake.prototype.move = function(e) {
	//1.判断方向
	//2.决定新头的位置,设置与原头位置重合
	var newHead = {
		row: this.arr[this.arr.length - 1].row,
		col: this.arr[this.arr.length - 1].col
	}
	if(this.direction === 37) {
		//37表示左。新头应该出现在原头的左侧，行不变列--
		newHead.col--;
	} else if(this.direction === 38) {
		newHead.row--;
	} else if(this.direction === 39) {
		newHead.col++;
	} else if(this.direction === 40) {
		newHead.row++;
	}
	this.arr.push(newHead);
	//3.去掉尾巴
	this.arr.shift();
	this.lock = true;

	//在移动时改变尾巴图片
	//改变this.tail_idx
	//获取尾巴
	var tail = this.arr[0];
	//获取屁股的位置
	var pg = this.arr[1];
	//判断尾巴和屁股的位置关系
	if(tail.col === pg.col) {
		this.tail_idx = tail.row > pg.row ? 3 : 1;
	} else {
		this.tail_idx = tail.col > pg.col ? 2 : 0;
	}
}
//给蛇添加转向方法
Snake.prototype.change = function(direction) {
	if(!this.lock) {
		return;
	}
	this.lock = false;
	//判断传递进来的方向是否与蛇的当前方向相背或相同
	//绝对值
	var result = Math.abs(direction - this.direction);
	if(result === 0 || result === 2) {
		//如果用户按下的键与蛇的当前方法相同或者相背，则停止执行
		return;
	} else {
		//如果不同，则可以设置
		this.direction = direction;
	}
	//在change改变头部图片
	if(direction === 37) {
		this.head_idx = 0;
	} else if(direction === 38) {
		this.head_idx = 1;
	} else if(direction === 39) {
		this.head_idx = 2;
	} else if(direction === 40) {
		this.head_idx = 3;
	}
}
//蛇长长
Snake.prototype.growUp = function() {
	//蛇长长就是增加数组的长度
	//slice(start, end)表示截取数组中的某一段，包括start,不包括end
	var tail = this.arr.slice(0, 1)[0];
	this.arr.unshift(tail);
}