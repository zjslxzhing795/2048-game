//产生一个数的动画效果
//每次按上下左右键，应先判断是否合并/能移动，再产生一个新值-----------------ok!
//当页面全部都有数的时候，页面产生不了数，这时页面开始转圈圈了，程序死了----------------ok!
//score high_score                    -------------------------------------ok!
//样式修正:文字如何垂直居中？
//响应式？手机/电脑/平板？
//浏览器兼容性？

start_game();
// key_left();

//根据x y坐标得到带.的class名
function getElementByPos(x, y) {
    var flag = 'gr-' + x + '-' + y;
    return '.' + flag;
}

//判断坐标x y处是否有非0的值,返回坐标对应的数值
function hasNum(x, y) {
    // console.log($(getElementByPos(x, y)).html());//string*!/
    return Number($(getElementByPos(x, y)).html());
}

//函数声明与函数表达式
//开始游戏
function start_game() {
    createGrid();
    init(true);                 //初始化面板
    generateOneNumber(true);    //随机产生一个数字
    generateOneNumber(true);    //随机产生一个数字
};

//再玩一次
function re_game() {
    init(false);                 //初始化面板
    generateOneNumber(true);    //随机产生一个数字
    generateOneNumber(true);    //随机产生一个数字
};

//在grid里创建一个格子
function createGrid() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var _class = 'grid-' + i + '-' + j;
            var _class2 = 'gr-' + i + '-' + j;
            $('.' + _class).append("<div class=" + _class2 + "></div>");
        }
    }
}

//init初始化面板：清空面板、清空score、看情况判断是否清空high_score
function init(is_startgame) {
    $('.score').html(0);
    blank();//清空面板
    if (is_startgame) {
        $('.high_score').html(0);
    }
};

function blank() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $(getElementByPos(i, j)).html(0);
            $(getElementByPos(i, j)).css('display', 'none');
        }
    }
}

function generateOneNumber(v) {
    if(v==true){
        var a = Math.floor(4 * Math.random());
        var b = Math.floor(4 * Math.random());
        var c = function () {
            if (Math.random() < 0.5) {
                return 2;
            } else {
                return 4;
            }
        };
        while (hasNum(a, b)) {
            a = Math.floor(4 * Math.random());
            b = Math.floor(4 * Math.random());
        }
        /!*var _class2 = 'gr-' + a + '-' + b;*!/
        var numC=c();
        // console.log(typeof numC);
        $(getElementByPos(a, b)).html(numC);
        //表现与状态分离
        $(getElementByPos(a, b)).css(set_style(numC));
    }else if(!canMove()){
        alert("Game is over!");
        return false;
    }
};


function set_style(num) {
    switch (num) {
        case(0):
            return {
                'display': 'none'
            };
            break;
        case(2):
            return {
                'display': 'block',
                'color': 'rgb(119,110,101)',
                'font-size': '60px',
                'background-color': 'rgb(238,228,218)',
                'width': '100%',
                'height': '100%',
                'line-height':'100px',
                'border-radius': '10px'
            };
            break;
        case(4):
            return {
                'display': 'block',
                'color': 'rgb(119,110,101)',
                'font-size': '60px',
                'background-color': 'rgb(237,224,200)',
                'width': '100%',
                'height': '100%',
                'line-height':'100px',
                'border-radius': '10px'
            };
            break;
        case(8):
            return {
                'display': 'block',
                'color': 'white',
                'font-size': '60px',
                'background-color': 'rgb(242,177,121)',
                'width': '100%',
                'height': '100%',
                'line-height':'100px',
                'border-radius': '10px'
            };
            break;
        case(16):
            return {
                'display': 'block',
                'color': 'white',
                'font-size': '60px',
                'background-color': 'rgb(245,149,99)',
                'width': '100%',
                'height': '100%',
                'line-height':'100px',
                'border-radius': '10px'
            };
            break;
        case(32):
            return {
                'display': 'block',
                'color': 'white',
                'font-size': '60px',
                'background-color': 'rgb(246,126,95)',
                'width': '100%',
                'height': '100%',
                'line-height':'100px',
                'border-radius': '10px'
            };
            break;
        case(64):
            return {
                'display': 'block',
                'color': 'white',
                'font-size': '60px',
                'background-color': 'rgb(246,94,59)',
                'width': '100%',
                'height': '100%',
                'line-height':'100px',
                'border-radius': '10px'
            };
            break;
        case(128):
            return {
                'display': 'block',
                'color': 'white',
                'font-size': '60px',
                'background-color': 'rgb(237,207,114)',
                'width': '100%',
                'height': '100%',
                'line-height':'100px',
                'border-radius': '10px'
            };
            break;
        case(256):
            return {
                'display': 'block',
                'color': 'white',
                'font-size': '60px',
                'background-color': 'rgb(237,204,97)',
                'width': '100%',
                'height': '100%',
                'border-radius': '10px'
            };
            break;
        case(512):
            return {
                'display': 'block',
                'color': 'white',
                'font-size': '60px',
                'background-color': 'rgb(153,204,0)',
                'width': '100%',
                'height': '100%',
                'line-height':'100px',
                'border-radius': '10px'
            };
            break;
        case(1024):
            return {
                'display': 'block',
                'color': 'white',
                'font-size': '40px',
                'background-color': 'rgb(51,181,229)',
                'width': '100%',
                'height': '100%',
                'line-height':'100px',
                'border-radius': '10px'
            };
            break;
        case(2048):
            return {
                'display': 'block',
                'color': 'white',
                'font-size': '40px',
                'background-color': 'rgb(51,181,229)',
                'width': '100%',
                'height': '100%',
                'line-height':'100px',
                'border-radius': '10px'
            };
            break;
        default:
            break;
    }
}


$(document).keydown(function (event) {
    switch (event.keyCode) {
        case(37):
            key_left();
            break;
        case(38):
            key_up();
            break;
        case(39):
            key_right();
            break;
        case(40):
            key_down();
            break;
        default:
            break;
    }
    return false;
});

/*$(document).keydown(function(event){
    if(event.keyCode == 13){
        alert('你按下了Enter');
    }});*/


function key_left() {
    generateOneNumber(moveLeft());
};

function key_up() {
    generateOneNumber(moveUp());
};

function key_right() {
    generateOneNumber(moveRight());
};

function key_down() {
    generateOneNumber(moveDown());
};


function moveLeft() {
    if(canMoveLeft()){
        for (var i = 0; i < 4; i++) {
            var arr=[];
            for(var j=0;j<4;j++) {
                var str = getElementByPos(i, j);
                arr.push(Number($(str).html()));
            }
            merge(arr);
            for(var k=0;k<4;k++){
                var str_=getElementByPos(i,k);
                $(str_).html(arr[k]);
                $(str_).css(set_style(arr[k]));
            }
            /*var _class0 = "gr-" + i + "-0";
            var _class1 = "gr-" + i + "-1";
            var _class2 = "gr-" + i + "-2";
            var _class3 = "gr-" + i + "-3";*!/
            // var array_i = [$("." + _class0).html(), $("." + _class1).html(), $("." + _class2).html(), $("." + _class3).html()];

            // merge(array_i);
            /!* $("." + _class0).html(array_i[0]);
             $("." + _class1).html(array_i[1]);
             $("." + _class2).html(array_i[2]);
             $("." + _class3).html(array_i[3]);
             var array_j = [$("." + _class0).html(array_i[0]), $("." + _class1).html(array_i[1]),
                 $("." + _class2).html(array_i[2]), $("." + _class3).html(array_i[3])]
             display(array_j);*/
        }
        return true;
    }else{
        return false;
    }

};


function moveUp() {
    if(canMoveUp()){
        for (var j = 0; j < 4; j++) {
            var arr=[];
            for(var i=0;i<4;i++){
                var str=getElementByPos(i,j);
                arr.push(Number($(str).html()));
            }
            merge(arr);
            for(var k=0;k<4;k++){
                var str_=getElementByPos(k,j);
                $(str_).html(arr[k]);
                $(str_).css(set_style(arr[k]));
            }
        }
        return true;
    }else{
        return false;
    }
}

function moveRight() {
    if(canMoveRight()){
        for (var i = 0; i < 4; i++) {
            var arr=[];
            for(var j=3;j>=0;j--){
                var str=getElementByPos(i,j);
                arr.push(Number($(str).html()));
            }
            merge(arr);
            for(var k=0;k<4;k++){
                var str_=getElementByPos(i,k);
                $(str_).html(arr[3-k]);
                $(str_).css(set_style(arr[3-k]));
            }
        }
        return true;
    }else{
        return false;
    }
}

function moveDown() {
    if(canMoveDown()){
        for (var j = 0; j < 4; j++) {
            var arr=[];
            for(var i=3;i>=0;i--){
                var str=getElementByPos(i,j);
                arr.push(Number($(str).html()));
            }
            merge(arr);
            for(var k=0;k<4;k++){
                var str_=getElementByPos(k,j);
                $(str_).html(arr[3-k]);
                $(str_).css(set_style(arr[3-k]));
            }
        }
        return true;
    }else{
        return false;
    }
}

function merge(_array) {
    var a = [];
    var b = [];
    var len = _array.length;
    var score=Number($('.score').html());
    for (var i = 0; i < len; i++) {
        if (_array[i] != 0) {
            a.push(_array[i]);
        }
    }
    for (var j = 0; j < a.length; j++) {
        if (a[j] === a[j + 1]) {
            b.push(a[j] + a[j + 1]);
            score+=a[j] + a[j + 1];
            $('.score').html(score);
            if(score>Number($('.high_score').html())){
                $('.high_score').html(score);
            }
            j++;
        } else {
            b.push(a[j]);
        }
    }
        for (var k = 0; k < len; k++) {
            if (b[k]) {
                _array[k] = b[k];
            } else {
                _array[k] = 0;
            }
        }
        return _array;
}

function canMoveLeft() {
    for(var i=0;i<4;i++){
        for (var j=0;j<3;j++){
            var str=getElementByPos(i,j);
            var str_right=getElementByPos(i,j+1);
            if(Number($(str).html())===0&&Number($(str_right).html())>0||
                (Number($(str).html())===Number($(str_right).html())&&Number($(str_right).html())>0)){
                return true;
            };
        }
    }
    return false;
}

function canMoveUp() {
    for(var j=0;j<4;j++){
        for (var i=2;i>=0;i--){
            var str=getElementByPos(i,j);
            var str_down=getElementByPos(i+1,j);
            if(Number($(str).html())===0&&Number($(str_down).html())>0||
                (Number($(str).html())===Number($(str_down).html())&&Number($(str_down).html())>0)){
                return true;
            };
        }
    }
    return false;
}

function canMoveRight() {
    for(var i=0;i<4;i++){
        for (var j=3;j>0;j--){
            var str=getElementByPos(i,j);
            var str_left=getElementByPos(i,j-1);
            if(Number($(str).html())===0&&Number($(str_left).html())>0||
                (Number($(str).html())===Number($(str_left).html())&&Number($(str_left).html())>0)){
                return true;
            };
        }
    }
    return false;
}

function canMoveDown() {
    for(var j=0;j<4;j++){
        for (var i=1;i<4;i++){
            var str=getElementByPos(i,j);
            var str_up=getElementByPos(i-1,j);
            if(Number($(str).html())===0&&Number($(str_up).html())>0||
                (Number($(str).html())===Number($(str_up).html())&&Number($(str_up).html())>0)){
                return true;
            };
        }
    }
    return false;
}

function canMove() {
    if(canMoveLeft()||canMoveUp()||canMoveRight()||canMoveDown()){
        return true;
    }else{
        return false;
    }
}

