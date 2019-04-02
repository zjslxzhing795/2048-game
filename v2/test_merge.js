function Move(value, origin_index) {
    this.value = value;
    this.origin_index = origin_index;
}

// 得到一个让你知道如何动画的结果
// [0, 2 , 2,4 ]  -> [[4, [1, 2]], [4, [3]], [0, []], [0, []]]

// [0, 2 , 2,4 ]  -> [new Move(4, [1,2]), new Move(4, [3]), new Move(0, []), new Move(0, [])]

// [2, 0, 2, 4 ]  -> [[4,[0,2]],[4,[3]],[0,[]],[0,[]]]

// [0,2,4,2]-> [2(1),4(2),2(3),0]

function merge(case_array) {
    case_array.length


}


case1 = [0, 2, 2, 4];
case2 = [2, 0, 0, 2];
case3 = [];
case4 = [];
case5 = [];


console.log(case1, '->', merge(case1));
console.log(case2, '->', merge(case1));
console.log(case1, '->', merge(case1));
console.log(case1, '->', merge(case1));
console.log(case1, '->', merge(case1));
console.log(case1, '->', merge(case1));

function moveLeft() {
    if (canMoveLeft()) {
        //对每一行进行比较，可以移动，则对应坐标更改值，并执行动画效果，显示到面板上
        for (var i = 0; i < 4; i++) {
            var array = [];
            for (var j = 0; j < 4; j++) {
                //先把一行中相等的格子按照移动的方向合并
                if (board[i][j] !== 0) {
                    for (var k = 1; j + k < 4; k++) {
                        if (board[i][j + k] === board[i][j]) {
                            //动画;先滑动，再改变格子数字和背景
                            // get_animate(i, j + k, i, j);
                            board[i][j] = board[i][j + k] + board[i][j];
                            board[i][j + k] = 0;

                            array.push([board[i][j], [j, j + k]]);

                            score += board[i][j];
                            if (score > high_score) {
                                high_score = score;
                            }
                            //背景 字体改变
                            // this.set_style();
                            j++;
                            break;
                        } else if (board[i][j + k] !== 0 && board[i][j + k] !== board[i][j]) {
                            array.push([board[i][j], [j]]);
                            break;
                        }/*算法有问题，第一个不为0 ，隔壁数字为0居然不会push进去*/
                    }
                }
            }
            if(array.length<4){
                for(var m=array.length;m<4;m++){
                    array.push([0,[]]);
                }
            }
            //已经剔除相等的数字，接下来直接全部向左移动
            for (var n = 0; n < 4; n++) {
                if(array[n][0]!==0){
                    board[i][n]=array[n][0];
                    if(array[n][1].length===1){
                        get_animate(i,array[n][1][0],i,n);
                    }else if(array[n][1].length===2){
                        get_animate(i,array[n][1][0],i,n);
                        get_animate(i,array[n][1][1],i,n);
                    }
                }else{
                    board[i][n]=0;
                }
            }
            //背景 字体改变
            setTimeout(updateBoardStyle(), 300);
        }
        return true;
    } else {
        return false;
    }
}