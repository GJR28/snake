function Block(img) {
	this.img = img;
	//障碍可以看成是不会动的蛇
	this.arr = [
		{row: 6, col: 5},
		{row: 6, col: 6},
		{row: 6, col: 7},
		{row: 6, col: 8},
		{row: 6, col: 9},
		{row: 7, col: 9},
		{row: 8, col: 9},
		{row: 9, col: 9},
		{row: 10, col: 9},
		{row: 11, col: 9},
		
		{row: 2, col: 14},
		{row: 2, col: 15},
		{row: 2, col: 16},
		{row: 2, col: 17},
		{row: 2, col: 18},
		{row: 2, col: 19},

		{row: 18, col: 2},
		{row: 18, col: 3},
		{row: 18, col: 4},
		{row: 18, col: 5},
		{row: 18, col: 6},
		{row: 17, col: 6},
		{row: 16, col: 6},
		{row: 15, col: 6},
		{row: 14, col: 6},
		{row: 13, col: 6},
		
		
		{row: 15, col: 10},
		{row: 15, col: 11},
		{row: 15, col: 12},
		{row: 15, col: 13},
		{row: 15, col: 14},
		{row: 15, col: 15}
	]
};