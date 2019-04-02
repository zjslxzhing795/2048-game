function background_color (num) {
    switch (num) {
        case(2):
            return 'rgb(238,228,218)';
            /*display不能省略，因为如果之前产生0，display值为none，导致后来产生的数不显示，除非case0的display不为none*/
            break;
        case(4):
            return 'rgb(237,224,200)';
            break;
        case(8):
            return 'rgb(242,177,121)';
            break;
        case(16):
            return 'rgb(245,149,99)';
            break;
        case(32):
            return 'rgb(246,126,95)';
            break;
        case(64):
            return 'rgb(246,94,59)';
            break;
        case(128):
            return 'rgb(237,207,114)';
            break;
        case(256):
            return 'rgb(237,204,97)';
            break;
        case(512):
            return 'rgb(153,204,0)';
            break;
        case(1024):
            return 'rgb(51,181,229)';
            break;
        case(2048):
            return 'rgb(51,181,229)';
            break;
        default:
            break;
    }
}

function num_color (num) {
    if (num === 2 || num === 4) {
        return 'rgb(119,110,101)'
    } else {
        return 'white'
    }
}

function num_font (num) {
    if (num < 1000) {
        return '5rem'
    } else {
        return '4rem'
        /*错误示范：   "'font-size':'40px'"*/
    }
}

function get_animate(from_x, from_y, to_x, to_y) {
    var numCell = getElementByPos(from_x, from_y);
    numCell.animate({
        top: getPosTop(to_x, to_y),
        left: getPosLeft(to_x, to_y)
    }, 1000)
}

function showNum (x, y, num) {
    getElementByPos(x, y).html(num);
    getElementByPos(x, y).css({
        // 'width': cellSideLength,
        // 'height': cellSideLength,
        'border-radius': 0.02 * gridContainerWidth,
        // 'top': getPosTop(x, y),
        // 'left': getPosLeft(x, y),
        'text-align': 'center',
        'font-weight': 'bold',
        'line-height': cellSideLength + 'px',
        'background':background_color(num),
        'color':num_color(num),
        'font-size':num_font(num)

    });
    getElementByPos(x, y).animate({
        width:cellSideLength,
        height:cellSideLength,
        top: getPosTop(x, y),
        left: getPosLeft(x, y)
    }, 50)
}