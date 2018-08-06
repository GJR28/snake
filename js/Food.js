function Food(row, col, img) {
	this.row = row;
	this.col = col;
	this.img = img;
}
//重置食物坐标
Food.prototype.reset = function(row, col) {
	this.row = row;
	this.col = col;
}