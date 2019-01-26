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

// 接下来是Javascript的在对象中绑定函数。这里有大坑！
var stu = {
    name: "Bob",
    age: 18,
    say: function(content){
        console.log(this.name + ":", content);
    },
    say2: function(content){
        var that = this; // 在对象方法内定义的嵌套函数，它的this又会变成空的。所以要把正确的this备份一个给它用
        // 太真实了
        function hahaha(content){
            console.log(that.name + ":", content, "Hahaha!");
        }
        return hahaha(content);
    }
};

stu.say("You are beautiful!");

var bob_say = stu.say;

// bob_say("You are ugly!"); // Who will say the sentence? That's really a problem
// In the strict mode, it occurs an error.

stu.say2("I have a name.");

//可以用apply和call在修复this指向的前提下调用函数
bob_say.call(stu, "I have a pen."); // 参数不打包
bob_say.apply(stu, ["I have a pineapple."]); // 参数打包成Array

// 接下来是魔法环节！
var count = 0;
var oldParseInt = parseInt;
parseInt = function(){ // 貌似Node.js没有window这个全局变量。另外这里的假函数不用写参数表，直接arguments就完事了
    count++;
    return oldParseInt.apply(null, arguments); // 对于一般函数，它的this应当被绑定为null
}// 成功将parseInt换成我们的山寨版

parseInt("45");
parseInt("360");
parseInt("10086");
console.log("parseInt() has been called", count, "times!")

// NB的高阶函数部分开始了！高阶函数让代码更美丽

var x = [1, 2, 3, 3.5, 4, 5, 6, 7];
var y = x.map(function(input){
    return input * input;
}); // Map的作用是把原数组的所有元素都经过指定函数处理后生成新的数组
console.log(x);
console.log(y);

var sum = x.reduce(function(a, b){
    return a + b;
}); // Reduce的作用是把原数组的两个元素经过指定函数处理，得到的返回值和后面第三个元素一起又交给指定函数处理，依次类推
console.log(sum);

var crowd = [2, 3, 4, 5, 6, 7, 8, 9, 
    10, 11, 12, 13, 14, 15, 16, 17]; // 利用Filter筛选质数
var prime_number = crowd.filter(function(element, index, self){
    for(let i = 2; i < element; ++i){
        if(element % i === 0){
            return false;
        }
    }
    return true;
}); // Filter的作用是把每个元素都交给指定函数判断，返回true则保留，false则舍弃，然后将保留的元素组成新数组
console.log(prime_number);

var com = ["goOgle", "aPple", "MicrosOft"];
com.sort(function(a, b){
    var x = a.toUpperCase(), 
    y = b.toUpperCase();
    if(x < y){
        return -1;
    }
    else if(x > y){
        return 1;
    }
    return 0;
}); // sort也是高阶函数，可以传入一个函数以自定义排序方式。
// 返回-1表示a应该在b前，返回1表示a应该在b后，返回0表示a和b相等
console.log(...com);

// Javascript实现一个类似Python的range函数：
let range = (start, end) => new Array(end - start).fill(start).map((el, i) => start + i);
// 从0开始，有个更简单的方法：
console.log(range(0, 5), [...Array(5).keys()]); //  0->4，五个数

var i = 2;

var put2 = (function(n){ // 闭包可以用来保存状态。
    // 外层这个函数用来保存一个参数n，本身是用完即丢的
    // 传递给n这个形参的i，其当前值就会被固定在n里，
    // 里面的函数还可以使用它，但里面的函数只是被返回出来，并没有马上执行
    return function(){
        return n * n;
    }
})(i);

i++; // 即使i改变了
console.log(put2()) // 之前的i值也已经被保存在外层的匿名函数里面了，不会受到影响。函数则想什么时候拿出来用都行

// 如果直接用一层function声明这个匿名函数，则它被调用时使用的是它被实际调用时而不是被生成时的i值
// 所以，如果你希望生成多个处理其实际生成时外部数据的闭包函数（比如在循环里面生成闭包，每个都赋给不同的循环变量值），
// 一定要使用上面的方法“保存现场”，否则生成的若干个闭包函数，执行起来读取的都是一样的数据，结果就也会一样，弄这么多函数就没有意义了

var put = function(){
    return i * i;
}; // 反面教材。这里只有一个，还看不出有什么区别，如果是批量生成，就看得出问题了

i++;
console.log(put()); // 你可能期望得到3*3=9，但是其实是16

// 箭头函数。箭头一时爽，一直箭头一直爽，爽完代码火葬场
var arrow = x => x * x + x;
var stru = {
    te: "Special",
    go: 45.12,
    ok: function(){
        var age = 19;
        var arrow2 = x => this.go + age + x / 2; // 这里的this是它的上层函数中的this，也就是stru
        // 注意！箭头函数是阉割版函数，没有自己的函数特别属性，
        // 它内部访问this和arguments得到的是它的上级作用域的那些！
        // 所以要注意：不要在对象里面（对象里面不算作用域）或者最外层直接定义箭头函数，否则this会绑定到全局
        // 原型里也不要用箭头函数，否则this也不会绑定到它的父对象，而是全局
        // 箭头函数的一个好用法就是提供给前面的那些高阶函数
        return arrow2.call(null, 6); // 箭头函数也无法绑定自定义的this，第一个参数会被忽略
    }
}
stru.ok();

// 迭代器（generator）
function* fib(max){
    var x = 0, y = 1;
    while(y <= max){
        [x, y] = [y, x + y];
        yield x; // 停！在这里停顿，这个迭代器迭代出了一个x，然后暂停运行，直到下一次迭代又恢复运行
    }
    return;
}

var fib1 = fib(50); // 执行迭代器函数实际上生成一个迭代器
var fib2 = fib(100);

console.log(fib1.next().value, ...fib1); // 可以这么一个一个来，可以解包
// 注意next方法返回一个对象，分value和done，done为true时代表没有东西可迭代了
for(let i of fib2){ // 也可以用for，一搞到底
    console.log(i);
}
