'use strict';

var i = 0;
const z = 29;

function f1(p1, p2, ...p){
    var q = 'o';
    console.log(p1, p2, p);
}

var f2 = function(p1, p2, ...p){ // 想接收任意个参数，老方法是用arguments，ES6新增了这种rest参数，可以接收剩余参数组成Array
    var i = 1;
    console.log(i, p1, p2);
    for(let j = 0; j < p.length; ++j){
        console.log(p[j]);
    }
}

// 请看Javascript的神奇特性：它会把所有变量的声明统一提前到函数开头，但不会动初始化和赋值。
// 所以，一定要坚持在函数开头声明并初始化变量，否则会出现非常诡异的现象
var f3 = function(){
    var x = 'Hello, ' + y;
    console.log(x);
    var y = 'Bob';
}

f1(7, "fds", 455, 56);
f2("inks", "8923", "uio", 816);
f3();


