function merge(_array){
    var a=[];
    var b=[];
    var len=_array.length;
    for(var i=0;i<len;i++){
        if(_array[i]!=0){
            a.push(_array[i]);
        }
    }
    for(var j=0;j<a.length;j++){
        if(a[j]===a[j+1]){
            b.push(a[j]+a[j+1]);
            j++;
        }else{
            b.push(a[j]);
        }
    }
    for(var k=0;k<len;k++){
        if(b[k]){
            _array[k]=b[k];
        }else{
            _array[k]=0;
        }
    }
    console.log(_array);
    return _array;
}

/*function moveLeft() {
    for (var i = 0; i < 4; i++) {
        var _class0 = "gr-" + i + "-0";
        var _class1 = "gr-" + i + "-1";
        var _class2 = "gr-" + i + "-2";
        var _class3="gr-" + i + "-3";
        var array_i=[$("."+_class0).html(),$("."+_class1).html(),$("."+_class2).html(),$("."+_class3).html()]
        merge(array_i);
    }
};

moveLeft();*/

$(document).keydown(function(event){
       if(event.keyCode == 13){
             alert('你按下了Enter');
           }});