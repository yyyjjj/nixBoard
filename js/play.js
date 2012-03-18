/* some global values */
var pan = new Array(
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
);
var shadow = new Array(
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
);
var jie = new Array();

function showPan() {
	var c = document.getElementById("weiqi");
	var cxt = c.getContext("2d");
	
	/* 清空，重新画线等 */
	cxt.clearRect(0,0,600,600);
	cxt.fillStyle = "silver";
	cxt.fillRect(0,0,600,600);
	grid(cxt);
	ninePoints(cxt);

	for (var i = 0; i < 19; i++) {
		for (var j = 0; j < 19; j++) {
			if (pan[i][j] === 1) { //black
				cxt.beginPath();
				cxt.arc((i+1)*30, (j+1)*30,15,0,2*Math.PI,false);
				cxt.fillStyle="black";
				cxt.fill();
			}
			else if (pan[i][j] === 2) { //white
				cxt.beginPath();
				cxt.arc((i+1)*30, (j+1)*30,15,0,2*Math.PI,false);
				cxt.fillStyle="white";
				cxt.fill();
			}
			else if (pan[i][j] === 7) { // fill color
				cxt.beginPath();
				cxt.arc((i+1)*30, (j+1)*30,15,0,2*Math.PI,false);
				cxt.fillStyle="red";
				cxt.fill();
			}
		}
	}
}

function play(row, col) {
	if (row < 0 || row > 19 || col < 0 || col > 19) {
		alert("index error....");
		return;
	}
	// 处理已有棋子在此
	if (pan[row][col] != 0) {
		alert("此处已有棋子！");
		return;
	}

	var can_down = false; // 是否可落子
	// 得到将落子的棋子的颜色
	var color = 2; // 白
	if (move_count % 2 === 0) { // 未落子前是白
		color = 1; 
	}

	if (!have_air(row, col)) {
		if (have_my_people(row, col)) {
			make_shadow();


			flood_fill(row, col, color);	
			if (fill_block_have_air(row, col, color)) {
				can_down = true;
				var dead_body = new Array();
				can_eat(row, col, color, dead_body);
				clean_dead_body(dead_body);
			} else {
				var dead_body = new Array();
				var cret = can_eat(row, col, color, dead_body);
				clean_dead_body(dead_body);

				if (cret) {
					can_down = true;
				} else {
					alert("无气，不能落子！！");
				}
			}
		} else {
			var dead_body = new Array();
			var cret = can_eat(row, col, color, dead_body);

			// 劫争也应该在此处理，只在此处理？
			if (cret) {
				if (!is_jie(row, col, dead_body)) {
					clean_dead_body(dead_body);
					can_down = true;
				} else {
					alert("劫, 不能落子, 请至少隔一手棋！");
				}	
			}
		}
	} else {
		can_down = true;
		var dead_body = new Array();
		can_eat(row, col, color, dead_body);
		clean_dead_body(dead_body);
	}
	if (can_down) {
		stone_down(row, col);
	}
}
function is_jie(row, col, dead_body) { //是否劫
	//只吃了一个？ 希望我对围棋的理解没错，劫都是只互吃一个。连环劫不考虑（应该也一样）
	if (dead_body.length === 1) {
		for (var i = 0; i < jie.length; i++) {
			//若符合（有坐标，且move_count就是上一手）
			//注意此处比较的是死去的棋子，下面push的是本次落子的棋子
			if (	jie[i][0] === dead_body[0][0] && \
					jie[i][1] === dead_body[0][1] && \
					jie[i][2] === move_count) {
				return true;
			}
		}
		//加入记录表
		jie.push([row, col, move_count+1]);
		return false;
	}
	alert("L2:"+(dead_body.length).toString());
	return false;
}

/* 能提吃吗？ */
function can_eat(row, col, color, dead_body) { // color 是当前要落子的颜色
	var ret = false;
	var anti_color = 2;
	if (color === 2)
		anti_color = 1;

	if (row+1 <= 19-1 && pan[row+1][col] === anti_color) {
		make_shadow();
		shadow[row][col] = color;
		flood_fill(row+1, col, anti_color);
		if (!anti_fill_block_have_air(anti_color)) {
			// 记录下这些7的坐标，以及(row+1,col)，表示可以提吃的对方棋子
			//alert("提吃: "+(row+1).toString()+","+col.toString());
			var rret = record_dead_body(dead_body);
			ret = ret || rret;
		}

	}
	if (row-1 >= 0 && pan[row-1][col] === anti_color) {
		make_shadow();
		shadow[row][col] = color;
		flood_fill(row-1, col, anti_color);
		if (!anti_fill_block_have_air(anti_color)) {
			var rret = record_dead_body(dead_body);
			ret = ret || rret;
		}

	}
	if (col+1 <= 19-1 && pan[row][col+1] === anti_color) {
		make_shadow();
		shadow[row][col] = color;
		flood_fill(row, col+1, anti_color);
		if (!anti_fill_block_have_air(anti_color)) {
			var rret = record_dead_body(dead_body);
			ret = ret || rret;
		}

	}
	if (col-1 >= 0 && pan[row][col-1] === anti_color) {
		make_shadow();
		shadow[row][col] = color;
		flood_fill(row, col-1, anti_color);
		if (!anti_fill_block_have_air(anti_color)) {
			var rret = record_dead_body(dead_body);
			ret = ret || rret;
		}

	}
	return ret;
}

function record_dead_body(db) {
	var ret = false;
	for (var row = 0; row < shadow.length; row++) {
		for (var col = 0; col < shadow[row].length; col++) {
			if (shadow[row][col] === 7) {
				db.push([row, col]);
				ret = true; // it's true have dead body
				//alert("DEAD: "+(row).toString()+","+col.toString());
			}
		}
	}
	return ret;
}
function clean_dead_body(db) {
	for (var i = 0; i < db.length; i++) {
		pan[db[i][0]][db[i][1]] = 0;
		//alert("OUT: "+(db[i][0]).toString()+","+(db[i][1]).toString());
	}	
}

/* 填充的区域周围是否有空 */
function fill_block_have_air(row, col, color) {
	for (var i = 0; i < pan.length; i++) {
		for (var j = 0; j < pan[i].length; j++) {
			if (i !== row && j !== col) {
				if (shadow[i][j] === 7 && pan[i][j] !== color) {
					return true; // 此块有空，可下
				}
			}
		}
	}
	//alert("fill block 无气！！！");
	return false;
}
/* 提吃判断专用 */
function anti_fill_block_have_air(color) {
	for (var i = 0; i < pan.length; i++) {
		for (var j = 0; j < pan[i].length; j++) {
			if (shadow[i][j] === 7 && pan[i][j] !== color) {
				return true; // 活
			}
		}
	}
	//alert("anti fill block 无气！！！");
	return false; //死
}
/* 将盘面做个影分身 */
function make_shadow() {
	for (var i = 0; i < pan.length; i++) {
		for (var j = 0; j < pan[i].length; j++) {
			shadow[i][j] = pan[i][j];
		}
	}
}
function shadow_to_pan() {
	for (var i = 0; i < pan.length; i++) {
		for (var j = 0; j < pan[i].length; j++) {
			pan[i][j] = shadow[i][j];
		}
	}
}

/* 泛洪填充，只操作影分身 */
function flood_fill(row, col, color) { // color 为当前要填充的颜色
	if (row < 0 || row > 19-1 || col < 0 || col > 19-1)
		return;

	var anti_color = 2;
	if (color === 2)
		anti_color = 1;

	if (shadow[row][col] !== anti_color && shadow[row][col] !== 7) { // 非color颜色，且未被填充
		shadow[row][col] = 7; // 表示已被填充
		flood_fill(row+1, col, color);
		flood_fill(row-1, col, color);
		flood_fill(row, col+1, color);
		flood_fill(row, col-1, color);
	}
}

/* 坐标周围4交叉点有气否？ */
function have_air(row, col) {
	if (row > 0 && row < 19-1 && col > 0 && row < 19-1) { //非边角 1->17(0->18)
		if (	pan[row+1][col] !== 0 &&
				pan[row-1][col] !== 0 &&
				pan[row][col+1] !== 0 &&
				pan[row][col-1] !== 0 ) {
			//alert("have no air");
			return false;
		} else {
			//alert("have air");
			return true;
		}
	} else if (row === 0 && col > 0 && col < 19-1) { // 边
		if (	pan[row+1][col] !== 0 &&
				pan[row][col+1] !== 0 &&
				pan[row][col-1] !== 0 ) {
			//alert("have no air");
			return false;
		} else {
			//alert("have air");
			return true;
		}
	} else if (row === 19-1 && col > 0 && col < 19-1) {
		if (	pan[row-1][col] !== 0 &&
				pan[row][col+1] !== 0 &&
				pan[row][col-1] !== 0 ) {
			return false;
		} else {
			return true;
		}
	} else if (col === 0 && row > 0 && row < 19-1) {
		if (	pan[row][col+1] !== 0 &&
				pan[row+1][col] !== 0 &&
				pan[row-1][col] !== 0 ) {
			return false;
		} else {
			return true;
		}
	} else if (col === 19-1 && row > 0 && row < 19-1) {
		if (	pan[row][col-1] !== 0 &&
				pan[row+1][col] !== 0 &&
				pan[row-1][col] !== 0 ) {
			return false;
		} else {
			return true;
		}
	} else if (row === 0 && col === 0) { // 角
		if (	pan[row][col+1] !== 0 &&
				pan[row+1][col] !== 0) {
			return false;
		} else {
			return true;
		}
	} else if (row === 0 && col === 19-1) {
		if (	pan[row][col-1] !== 0 &&
				pan[row+1][col] !== 0) {
			return false;
		} else {
			return true;
		}
	} else if (row === 19-1 && col === 0) {
		if (	pan[row][col+1] !== 0 &&
				pan[row-1][col] !== 0) {
			return false;
		} else {
			return true;
		}
	} else if (row === 19-1 && col === 19-1) {
		if (	pan[row][col-1] !== 0 &&
				pan[row-1][col] !== 0) {
			return false;
		} else {
			return true;
		}
	}



		
}

/* 坐标周围是否有我方的棋子 */
function have_my_people(row, col) { //FIXME 边角没有处理呢
	if (row > 0 && row < 19-1 && col > 0 && row < 19-1) { //非边角 1->17(0->18)
		if (move_count % 2 === 0) { //未落子前是白
			if (	pan[row+1][col] === 1 ||
					pan[row-1][col] === 1 ||
					pan[row][col+1] === 1 ||
					pan[row][col-1] === 1 ) {
				//alert("have my people");
				return true;
			}
		} else {
			if (	pan[row+1][col] === 2 ||
					pan[row-1][col] === 2 ||
					pan[row][col+1] === 2 ||
					pan[row][col-1] === 2 ) {
				//alert("have my people");
				return true;
			}
		}
	} else if (row === 0 && col > 0 && col < 19-1) { // 边
		if (move_count % 2 === 0) { //未落子前是白
			if (	pan[row+1][col] === 1 ||
					pan[row][col+1] === 1 ||
					pan[row][col-1] === 1 ) {
				//alert("have my people");
				return true;
			}
		} else {
			if (	pan[row+1][col] === 2 ||
					pan[row][col+1] === 2 ||
					pan[row][col-1] === 2 ) {
				//alert("have my people");
				return true;
			}
		}
	} else if (row === 19-1 && col > 0 && col < 19-1) { // 边
		if (move_count % 2 === 0) { //未落子前是白
			if (	pan[row-1][col] === 1 ||
					pan[row][col+1] === 1 ||
					pan[row][col-1] === 1 ) {
				//alert("have my people");
				return true;
			}
		} else {
			if (	pan[row-1][col] === 2 ||
					pan[row][col+1] === 2 ||
					pan[row][col-1] === 2 ) {
				//alert("have my people");
				return true;
			}
		}
	} else if (col === 19-1 && row > 0 && row < 19-1) {
		if (move_count % 2 === 0) { //未落子前是白
			if (	pan[row+1][col] === 1 ||
					pan[row-1][col] === 1 ||
					pan[row][col-1] === 1 ) {
				//alert("have my people");
				return true;
			}
		} else {
			if (	pan[row+1][col] === 2 ||
					pan[row-1][col] === 2 ||
					pan[row][col-1] === 2 ) {
				//alert("have my people");
				return true;
			}
		}
	} else if (col === 0 && row > 0 && row < 19-1) {
		if (move_count % 2 === 0) { //未落子前是白
			if (	pan[row+1][col] === 1 ||
					pan[row-1][col] === 1 ||
					pan[row][col+1] === 1 ) {
				//alert("have my people");
				return true;
			}
		} else {
			if (	pan[row+1][col] === 2 ||
					pan[row-1][col] === 2 ||
					pan[row][col+1] === 2 ) {
				//alert("have my people");
				return true;
			}
		}
	} else if (row === 0 && col === 0) { // 角
		if (move_count % 2 === 0) { //未落子前是白
			if (	pan[row+1][col] === 1 ||
					pan[row][col+1] === 1 ) {
				//alert("have my people");
				return true;
			}
		} else {
			if (	pan[row+1][col] === 2 ||
					pan[row][col+1] === 2 ) {
				//alert("have my people");
				return true;
			}
		}
	} else if (row === 0 && col === 19-1) { // 角
		if (move_count % 2 === 0) { //未落子前是白
			if (	pan[row+1][col] === 1 ||
					pan[row][col-1] === 1 ) {
				//alert("have my people");
				return true;
			}
		} else {
			if (	pan[row+1][col] === 2 ||
					pan[row][col-1] === 2 ) {
				//alert("have my people");
				return true;
			}
		}
	} else if (row === 19-1 && col === 0) { // 角
		if (move_count % 2 === 0) { //未落子前是白
			if (	pan[row-1][col] === 1 ||
					pan[row][col+1] === 1 ) {
				//alert("have my people");
				return true;
			}
		} else {
			if (	pan[row-1][col] === 2 ||
					pan[row][col+1] === 2 ) {
				//alert("have my people");
				return true;
			}
		}
	} else if (row === 19-1 && col === 19-1) { // 角
		if (move_count % 2 === 0) { //未落子前是白
			if (	pan[row-1][col] === 1 ||
					pan[row][col-1] === 1 ) {
				//alert("have my people");
				return true;
			}
		} else {
			if (	pan[row-1][col] === 2 ||
					pan[row][col-1] === 2 ) {
				//alert("have my people");
				return true;
			}
		}
	}

	return false;
}

// 真正落子
function stone_down(row, col) {
	if (move_count % 2 === 0) { //未落子前是白
		pan[row][col] = 1; //就放黑
	} else {
		pan[row][col] = 2;
	}
	move_count ++;
}
