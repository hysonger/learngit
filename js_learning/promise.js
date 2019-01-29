// Javascript Promise试验
'use strict';

var l = console.log;

function task(resolveFunc, rejectFunc){ // 交由Promise执行的事务函数要准备两个参数：成功后的回调函数和失败后的回调函数
    setTimeout(function (){ // 事务函数里面的东西要求全部执行完后才会触发回调，包括这种申请延时执行的嵌套函数在内
        var isSuccess = false;
        var callbackData = "Yay!";
        if(isSuccess){ // 事务函数判断是否成功，执行对应的回调函数
            resolveFunc(callbackData);
        }
        else{
            rejectFunc(callbackData);
        }
    }, 2000);
    
}

var p = new Promise(task); // 创建一个Promise对象，它“承诺”会执行完成task函数
var resolve = function(callbackData){
    // 这个函数被交给successFunc用
    l("RESOLVE:", callbackData);
};
var reject = function(callbackData){
    // 这个函数被交给failFunc用
    l("REJECT:", callbackData);
};

// p.then(resolve, reject); // 第一种写法，两个回调函数都写在then里面

p.then(resolve).catch(reject); // 第二种写法，用单独的catch方法设置错误时的回调函数

l("A Promise for running 'task' has been set! Please wait for magic..."); // 设置好了Promise，程序就继续线性执行，task则会在未来被执行并触发回调

// 接下来是更复杂的结构！执行then后返回的是一个新的Promise，这个Promise同时“承诺”会把主事务函数和它之前那些then注册的回调函数都执行完毕
// 这样的话我们就可以叠加then，注册多级回调函数，让它们依次按注册先后执行，组成一个Promise链式结构
// 把一个回调函数之前“所有事务和回调函数的组合体”都视作一个更大的“事务”，那么这个回调函数实质上是这个大“事务”的回调函数，本质上是种嵌套
// 但是如果按老方法写这种“嵌套”，那就是真正的嵌套，层数一多就极为丑陋，不便于维护，而以Promise链的方式写，就会非常简洁^_^

// 这里要注意到，一个Promise链式结构的执行过程，要么成功要么失败，不会部分地成功或失败
// 一旦链式中某一步声明“它出错了”，Promise就会查看链的后部，执行后面最近的一个catch声明的失败函数

