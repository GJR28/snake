/*Game是整个游戏类
snake: 蛇实例
map: 地图实例
block: 障碍实例
food: 食物实例*/
function Game(map, snake, food, block) {
	this.map = map;
	this.snake = snake;
	this.food = food;
	this.block = block;
	this.flag = true;
	this.timer = null;
	console.log(this.block)
	this.init();
}
Game.prototype.init = function() {
	this.start();
	this.renderMap();
	this.renderSnake();
	this.renderFood();
	this.bindEvent();
}
//渲染地图
Game.prototype.renderMap = function() {
	this.map.fill();
}
//渲染食物
Game.prototype.renderFood = function() {
	//渲染食物就是将地图上的食物坐标元素变成食物的图案   第x行第x列
	var row = this.food.row;
	var col = this.food.col;
	//使用数组的目的就是简化书写
	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img + ")";
	this.map.arr[row][col].style.backgroundSize = "cover";
}
//渲染蛇
Game.prototype.renderSnake = function() {
	//渲染头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";
	//循环渲染蛇的多个身体坐标
	for(var i = 0; i < this.snake.arr.length - 1; i ++) {
		//获取蛇的当前身体坐标
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		//在地图上显示蛇
		this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic + ")";
	}
	//渲染尾巴
	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
}
//开始游戏
Game.prototype.start = function() {
	//将游戏开关设置为true
	this.flag = true;
	var me = this;
	//主循环
	this.timer = setInterval(function() {
		//蛇移动
		me.snake.move();	
		//与地图边界检测
		me.checkMap();
		//与食物检测
		me.checkFood();
		//与蛇的身体检测
		me.checkSnake();
		//与障碍检测
		me.checkBlock();
		//判定游戏是否结束
		if(me.flag) {
			//清屏
			me.map.clear();
			//渲染食物
			me.renderFood();
			//渲染蛇
			me.renderSnake();
			//渲染障碍
			me.renderBlock();
		};
	}, 200);
}
//游戏结束
Game.prototype.gameOver = function() {
	clearInterval(this.timer);
	//将游戏开关设置为flase
	this.flag = false;
}
//添加用户点击事件
Game.prototype.bindEvent = function() {
	//下面不能直接使用this。有作用域产生
	var me = this;
	document.onkeydown = function(e) {
		//获取用户按下的是哪个键
		var code = e.keyCode;
		if(code === 37 || code === 38 || code === 39|| code === 40) {
			//调用蛇的转向方法
			me.snake.change(code);
		} else {
			console.log("别瞎按");
		}
	}
}
//判定蛇头与地图边界
Game.prototype.checkMap = function() {
	//检测蛇是否撞墙
	//获取蛇的头部坐标
	var head = this.snake.arr[this.snake.arr.length - 1];
	//判定是否大于边界
	if(head.col < 0 || head.col > this.map.col - 1 || head.row < 0 || head.row > this.map.row - 1) {
		console.log("撞墙了");
		this.gameOver();
	}
}
//判定蛇与食物的关系
Game.prototype.checkFood = function() {
	//获取蛇的头部坐标
	var head = this.snake.arr[this.snake.arr.length - 1];
	//获取食物的坐标
	var food = this.food;
	if(head.row === food.row && head.col === food.col) {
		console.log("蛇吃到食物了");
		//蛇生长
		this.snake.growUp();
		//食物重置
		this.resetFood();
	}
}
//重置食物
Game.prototype.resetFood = function() {
	//随机生成row和col
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);
	//生成的row和col不可以直接使用，而是要先检查合法性。
	//食物不可以出现在蛇身上
	for(var i = 0; i < this.snake.arr.length; i++) {
		var one = this.snake.arr[i];
		if(one.row === row && one.col === col) {
			alert("食物与蛇重合了");
			//重新调用  递归
			this.resetFood();
			return;
		}
	}
	// 食物不可以出现在障碍物身上
	for(var i = 0; i < this.block.arr.length; i++) {
		var one = this.block.arr[i];
		if(one.row === row && one.col === col) {
			alert("食物与障碍重合了");
			//重新调用  递归
			this.resetFood();
			return;
		}
	}
	this.food.reset(row, col);


}
//检测蛇是否吃到自己
Game.prototype.checkSnake = function() {
	//逻辑：拿着蛇的头部坐标和蛇的身体坐标相比，如果相同，表示蛇吃到自己
	//获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	//获取蛇的身体
	for(var i = 0; i < this.snake.arr.length - 1; i ++) {
		var one = this.snake.arr[i];
		if(head.row === one.row && head.col === one.col) {
			console.log("蛇吃到自己了");
			this.gameOver();
		}
	}
}
//渲染障碍
Game.prototype.renderBlock = function() {
	//渲染多个障碍
	for(var i = 0; i < this.block.arr.length; i ++) {
		//获取障碍的当前身体坐标
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		//在地图上显示障碍
		this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img + ")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}
}
//检测蛇与障碍的关系
Game.prototype.checkBlock = function() {
	//获取蛇的头部坐标
	var head = this.snake.arr[this.snake.arr.length - 1];
	//获取障碍的坐标
	for(var i = 0; i < this.block.arr.length; i++) {
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		//判断
		if(head.row === row && head.col === col) {
			console.log("蛇撞到了障碍");
			this.gameOver();
		}
	}
}
