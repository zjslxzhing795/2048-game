function noSpace (board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function checkGameOver () {
    if (!this.canMove()) {
        alert('Game over!');
    }
}

function hasNum (i, j) {
    if (board[i][j] !== 0) {
        return true;
    } else {
        return false;
    }
}

function updateScore() {
    $('.score').html(score);
    $('.high_score').html(high_score);
}

function getPosLeft(i, j) {
    return cellSpace + j * (cellSideLength + cellSpace);
}

function getPosTop(i, j) {
    return cellSpace + i * (cellSideLength + cellSpace);
}

function getElementByPos(x, y) {
    var flag = 'num-' + x + '-' + y;
    return $('.' + flag);
}

function canMove () {
    if (this.canMoveLeft() || this.canMoveUp() || this.canMoveRight() || this.canMoveDown()) {
        return true;
    } else {
        return false;
    }
}

function canMoveLeft () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            var str = board[i][j];
            var str_right = board[i][j + 1];
            if (str_right > 0)
                if (str === 0 || str === str_right) {
                    return true;
                }
        }
    }
    return false;
}

function canMoveUp () {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            var str = board[i][j];
            var str_down = board[i + 1][j];
            if (str_down > 0)
                if (str === 0 || str === str_down) {
                    return true;
                }
        }
    }
    return false;
}

function canMoveRight () {
    for (var i = 0; i < 4; i++) {
        for (var j = 3; j > 0; j--) {
            var str = board[i][j];
            var str_left = board[i][j - 1];
            if (str_left > 0)
                if (str === 0 || str === str_left) {
                    return true;
                }
        }
    }
    return false;
}

function canMoveDown () {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            var str = board[i][j];
            var str_up = board[i - 1][j];
            if (str_up > 0)
                if (str === 0 || str === str_up) {
                    return true;
                }
        }
    }
    return false;
}

function moveLeft () {
    if (canMoveLeft()) {
        //对每一行进行比较，可以移动，则对应坐标更改值，并执行动画效果，显示到面板上
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                //先把一行中相等的格子按照移动的方向合并
                if (board[i][j] !== 0) {
                    for (var k = 1; j + k < 4; k++) {
                        if (board[i][j + k] === board[i][j]) {
                            get_animate(i, j + k, i, j);
                            board[i][j] = board[i][j + k] + board[i][j];
                            board[i][j + k] = 0;
                            score+=board[i][j];
                            if(score>high_score){
                                high_score=score;
                            }
                            j++;
                            break;
                        } else if (board[i][j + k] !== 0 && board[i][j + k] !== board[i][j]) {
                            break;
                        }
                    }
                }
            }
            //已经剔除相等的数字，接下来直接全部向左移动
            for (var n = 0; n < 4; n++) {
                if (board[i][n] === 0) {
                    for (var m = n + 1; m < 4; m++) {
                        if (board[i][m] !== 0) {
                            get_animate(i, m, i, n);
                            board[i][n] = board[i][m];
                            board[i][m] = 0;
                            break;
                        }
                    }
                }
            }
            //背景 字体改变
            setTimeout(updateBoardStyle(), 2000);
        }
        return true;
    } else {
        return false;
    }
}

function moveUp () {
    if (canMoveUp()) {
        //对每一行进行比较，可以移动，则对应坐标更改值，并执行动画效果，显示到面板上
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 4; i++) {
                //先把一lie中相等的格子按照移动的方向合并
                if (board[i][j] !== 0) {
                    for (var k = 1; i + k < 4; k++) {
                        if (board[i + k][j] === board[i][j]) {
                            // this.rePos(i+k,j);
                            //动画;先滑动，再改变格子数字和背景
                            get_animate(i + k, j, i, j);
                            board[i][j] = board[i + k][j] + board[i][j];
                            board[i + k][j] = 0;
                            score+=board[i][j];
                            if(score>high_score){
                                high_score=score;
                            }
                            i++;
                            break;
                        } else if (board[i + k][j] !== 0 && board[i + k][j] !== board[i][j]) {
                            break;
                        }
                    }
                }
            }
            //已经剔除相等的数字，接下来直接全部向shang移动
            for (var n = 0; n < 4; n++) {
                if (board[n][j] === 0) {
                    for (var m = n + 1; m < 4; m++) {
                        if (board[m][j] !== 0) {
                            board[n][j] = board[m][j];
                            board[m][j] = 0;
                            //动画
                            get_animate(i, m, i, n);
                            break;
                        }
                    }
                }
            }
            setTimeout(updateBoardStyle(), 3000);
        }
        return true;
    } else {
        return false;
    }
}

function moveRight () {
    if (canMoveRight()) {
        //对每一行进行比较，可以移动，则对应坐标更改值，并执行动画效果，显示到面板上
        for (var i = 0; i < 4; i++) {
            for (var j = 3; j >= 0; j--) {
                //先把一行中相等的格子按照移动的方向合并
                if (board[i][j] !== 0) {
                    for (var k = 1; j - k >= 0; k++) {
                        if (board[i][j - k] === board[i][j]) {
                            get_animate(i, j - k, i, j);
                            board[i][j] = board[i][j - k] + board[i][j];
                            board[i][j - k] = 0;
                            score+=board[i][j];
                            if(score>high_score){
                                high_score=score;
                            }
                            j--;
                            break;
                        } else if (board[i][j - k] !== 0 && board[i][j - k] !== board[i][j]) {
                            break;
                        }
                    }
                }
            }
            //已经剔除相等的数字，接下来直接全部向you移动
            for (var n = 3; n >= 0; n--) {
                if (board[i][n] === 0) {
                    for (var m = n - 1; m >= 0; m--) {
                        if (board[i][m] !== 0) {
                            // this.rePos(i,m);
                            //动画
                            get_animate(i, m, i, n);
                            board[i][n] = board[i][m];
                            board[i][m] = 0;
                            break;
                        }
                    }
                }
            }
            setTimeout(updateBoardStyle(), 3000);
        }
        return true;
    } else {
        return false;
    }
}

function moveDown () {
    if (canMoveDown()) {
        //对每一行进行比较，可以移动，则对应坐标更改值，并执行动画效果，显示到面板上
        for (var j = 0; j < 4; j++) {
            for (var i = 3; i >= 0; i--) {
                //先把一lie中相等的格子按照移动的方向合并
                if (board[i][j] !== 0) {
                    for (var k = 1; i - k >= 0; k++) {
                        if (board[i - k][j] === board[i][j]) {
                            // this.rePos(i-k,j);
                            board[i][j] = board[i - k][j] + board[i][j];
                            this.board[i - k][j] = 0;
                            //动画,先滑动，再改变格子数字和背景
                            get_animate(i - k, j, i, j);
                            score+=board[i][j];
                            if(score>high_score){
                                high_score=score;
                            }
                            //背景 字体改变
                            // this.bind();
                            // this.set_style();
                            i--;
                            break;
                        } else if (board[i - k][j] !== 0 && board[i - k][j] !== board[i][j]) {
                            break;
                        }
                    }
                }
            }
            //已经剔除相等的数字，接下来直接全部向xia移动
            for (var n = 3; n >= 0; n--) {
                if (board[n][j] === 0) {
                    for (var m = n - 1; m >= 0; m--) {
                        if (board[m][j] !== 0) {
                            get_animate(m,j,n,j);
                            board[n][j] = board[m][j];
                            board[m][j] = 0;
                            break;
                        }
                    }
                }
            }
            setTimeout(updateBoardStyle(), 3000);
        }
        return true;
    } else {
        return false;
    }
}


//---------------------

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] !== undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};

'dsd{0}'.format('dsd','fnwk');

String.format = function () {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};
