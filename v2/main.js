//产生一个数的动画效果
//每次按上下左右键，应先判断是否合并/能移动，再产生一个新值-----------------ok!
//当页面全部都有数的时候，页面产生不了数，这时页面开始转圈圈了，程序死了----------------ok!
//score high_score                    -------------------------------------ok!
//样式修正:文字如何垂直居中？
//响应式？手机/电脑/平板？
//浏览器兼容性？
//20号修复除第一个数外不显示的问题，display函数里加上display：block

//动画效果:文字替换那个时候做出来的滑动效果，不能全部替换完再出效果，应该边替换边出效果才行，否则出不来滑动效果,不过文字和文字背景还是绑定的
//显示和逻辑分开
//浮动后文字与框分离,证实与浮动无关，原因是jquery css()内是font-size/line-height时，要加单位


/*解决动画问题，算法问题，分数问题，regame问题，然后手机上加上滑动手势，然后整理下代码，逻辑与显示分开，基本就ok了*/
//bug：快速按regame出现某些格子有背景没有数字的情况----num没有选择对---原因：并没有设置class为num，即使append那里添加num也没有加对
//bug：动画问题：animate动画 setTimeout异步操作如何影响程序的运行顺序
//bug：animate导致的移位，用remove移除元素再重绘
//框出现了数字错位了：是因为使用gridContainerWidth等数字的时候没有加px单位

//utils：1、特定格式的日期与字符串/时间戳（数字）……的互变   2、字符串的各种拼接变换  3、数组的各种变换、过滤  4、数字


var score;
var high_score;
var game = undefined;
var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellSideLength = 0.18 * documentWidth;
var cellSpace = 0.04 * documentWidth;
var board = [];
var startx;
var starty;
var endx;
var endy;

$(document).ready(function () {
    prepareForMobile();
    game = new Game2048();
    game.start_game();
});

function prepareForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }else{
        $('#Board').css('margin-top', '10px');
    }

    $('#Board').css('width', gridContainerWidth - 2 * cellSpace);
    $('#Board').css('height', gridContainerWidth - 2 * cellSpace);
    $('#Board').css('padding', cellSpace);
    $('#Board').css('border-radius', 0.02 * gridContainerWidth);

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('.grid-' + i + '-' + j).css({
                'width': cellSideLength,
                'height': cellSideLength,
                'border-radius': 0.02 * gridContainerWidth,
                'position': 'absolute',
                'top': getPosTop(i, j),
                'left': getPosLeft(i, j)
            })
        }
    }
}

function Game2048() {
    this.start_game = function () {
        this.init(true);
        this.generateOneNumber();
        this.generateOneNumber();
    };

    this.print_board = function () {
        console.log('now:');
        console.log(board[0].join(','));
        console.log(board[1].join(','));
        console.log(board[2].join(','));
        console.log(board[3].join(','));
        console.log('------------');
    };

    this.init = function (bool) {
        for (var i = 0; i < 4; i++) {
            board[i] = [];
            for (var j = 0; j < 4; j++) {
                board[i][j] = 0;
            }
        }
        score = 0;
        if(bool){
            high_score = 0;
            $('.high_score').text(0);
        }

        updateBoardStyle();
    };
    this.generateOneNumber = function () {
        if (!noSpace(board)) {
            //在空白处产生一个随机数
            var m = Math.floor(Math.random() * 4);
            var n = Math.floor(Math.random() * 4);
            var k = Math.random() < 0.5 ? 2 : 4;
            while (hasNum(m, n)) {
                m = Math.floor(Math.random() * 4);
                n = Math.floor(Math.random() * 4);
            }
            board[m][n] = k;
            //执行渲染函数渲染出效果//背景 字体改变
            showNum(m, n, k);
        }
    };
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case(37):
            event.preventDefault();
            if(moveLeft()){
                setTimeout(game.generateOneNumber(),600);
                setTimeout(checkGameOver(),610);
            }
            break;
        case(38):
            event.preventDefault();
            if(moveUp()){
                setTimeout(game.generateOneNumber(),600);
                checkGameOver(checkGameOver(),610);
            }
            break;
        case(39):
            event.preventDefault();
            if(moveRight()){
                setTimeout(game.generateOneNumber(),600);
                checkGameOver(checkGameOver(),610);
            }
            break;
        case(40):
            event.preventDefault();
            if(moveDown()){
                setTimeout(game.generateOneNumber(),600);
                checkGameOver(checkGameOver(),610);
            }
            break;
        case(32):
            event.preventDefault();

            break;
        default:
            break;
    }
    game.print_board();
});

document.addEventListener('touchstart',function(event){
    event.preventDefault();
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});

document.addEventListener();

document.addEventListener('touchend',function(event){

    event.preventDefault();
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;

    var deltax=endx-startx;
    var deltay=endy-starty;

    if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth){
        return ;
    }
    if(Math.abs(deltax)>Math.abs(deltay)){
        if(deltax>0){
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("checkGameOver()",300);
            }

        }else{
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("checkGameOver()",300);
            }

        }
    }else{
        if(deltay>0){
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("checkGameOver()",300);
            }

        }else{

            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("checkGameOver()",300);
            }

        }

    }
});

function updateBoardStyle () {
    $('.num').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var className = 'num-' + i + '-' + j;
            var num = board[i][j];

            $('#Board').append('<div class="num {0}" ></div>'.format(className));
            if(board[i][j]===0){
                getElementByPos(i, j).html('');
                getElementByPos(i, j).css({
                    'display': 'block',
                    'width': '0px',
                    'height': '0px',
                    'position': 'absolute',
                    'top': getPosTop(i, j)+cellSideLength*0.5,
                    'left': getPosLeft(i, j)+cellSideLength*0.5,
                    'line-height': cellSideLength + 'px'
                })
            }else{
                getElementByPos(i, j).html(num);//错误示范 $('.'+className).html
                // 错误示范 $('.'+className).text().
                //错误示范 $('.'+className).text.
                getElementByPos(i, j).css({
                    'display': 'block',
                    'width': cellSideLength,
                    'height': cellSideLength,
                    'border-radius': 0.02 * gridContainerWidth,
                    'position': 'absolute',
                    'top': getPosTop(i, j),
                    'left': getPosLeft(i, j),
                    'text-align': 'center',
                    'font-weight': 'bold',
                    'line-height': cellSideLength + 'px',
                    'background':background_color(num),
                    'color':num_color(num),
                    'font-size':num_font(num)

                })
            }
        }
    }
    updateScore();
}

function re_game() {
    game.init(false);
    game.generateOneNumber();
    game.generateOneNumber();
}
