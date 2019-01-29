'use strict';

var a = 2, b = 1, c;

console.log("Hello, world! ");
// alert("Hahaha! "); //node.js不支持这个命令
console.log(b / 2); // 与C的“两整相除小数去”行为不同
console.log(b = Math.sqrt(a)); // 赋值语句的返回值也是所赋的值
console.log(a++, ++a); // 自增运算符的行为与C一致

// (Number.)NaN（没错NaN也是一种Number） 在计算和类型转换时无法算出一个数时产生
console.log(typeof parseInt("abc"), parseFloat("abc")); // typeof返回对象的类型，对NaN用得到的是number
// NaN(Not a number)与一切东西都不相等，包括它自己，除非使用isNaN()
// isNaN()用来判断一个非数的东西是否可以转换为数，或者一个Number对象是否为NaN（后者仅适用于ES6）
// null undefined 0 NaN '' 都相当于false
if(c === undefined){ // 不要使用==比较！
    console.log("c is undefined"); 
    /* 以下是undefined：
    未传递的函数参数，未初始化的变量，未返回一个值的函数的返回值
    不存在的东西（如空数组或数组越界部分的元素，不存在的对象属性）
    undefined：对象属性或方法不存在，或声明了变量但从未赋值。
    */
}

// var arr = new Array(3, 2e-14, "okai!", 'That\'s impressive!'); // 蛇皮的数组定义法
var arr = [3, 2e-14, "okai!", 'That\'s impressive!']; // 这个定义法才是正常的定义方法

var obj = { // 这是对象，也相当于Python里面的dict。键名不用加引号，中间用冒号和逗号
    name: "object",
    description: 'This is an object, or can be described as a dictionary, hahaha!',
    age: 14
};
if("name" in obj && obj.hasOwnProperty("name")){ // 判断name是否是obj成员，而且不是继承得来的而是自己拥有的
    console.log(obj.description); // 访问不存在的属性会返回undefined
}

var s = "\x41Inkspace000\t", p = "\u1d4eyuiop";// 转义字符
console.log(s + ` Open your mind
If your name is ${p}`); // 多行与模板字符串，ES6特性

console.log(`The length of s is:${s.length}`); // 字符串长度
console.log(s.toUpperCase() + ' ' + s.toLowerCase()); // 变大小写；不改变原字符串
console.log('"spa" is in the postiion ' + s.indexOf('spa')); // indexOf搜索字符串出现位置，找不到返回-1
console.log(s.substring(0, 5)); // 截取字符串，取头去尾

// 数组
var k = [1, "4ksls", 34.95, "ppp"];
k.length = 4; // length是数组长度，直接给length赋值会导致数组长度的变化
k[5] = "Bbox"; // 越界复制也会导致数组长度变化。(设置断点观察)
// JavaScript的数组可以像这样直接改变大小。但是这两种数组变化方式不应当使用。
console.log(k.indexOf(1)); // 寻找1在数组k中的位置 
var ze = k.slice(1, 3); // 切片操作
var ke = k.slice(); // 不带参数可以复制一个数组

ze.push("oops", 0.8702); // push增加项
console.log(ze.pop()); // pop弹出项，返回该项。弹出空数组返回undefined
ze.unshift("A", "bint");
console.log(ze.shift()); // 这两个与push pop类似，但是是在数组头部操作

var ip = [45, 69.2, 48, 32, 76, 19, 55.3]; // 注意排序函数是直接对原数组进行操作！返回的也是原数组
ip.reverse();
console.log(...ip);
ip.sort();
console.log(...ip);
//console.log(ip.reverse()); // 反序
//console.log(ip.sort()); // 排序

ip.splice(1, 2, "6tyu", "hjkL"); // 从指定位置1删除2个元素，然后添加两个元素
ip.concat(k); // 连接两个数组，返回新的数组
console.log(ip.join('-')); // 将数组中每个元素用指定字符串分隔后连接成一整个字符串
// 多维数组略过不提。

// for循环
for(i = 1; i <= 10; ++i){ // 第一种for循环
    console.log(i); 
}

for(var i in ip){ // 第二种for循环，遍历的是对象的属性名称。由于历史遗留问题不推荐使用
    console.log(i, ip[i]);
}

for(var i of ip){ // 第三种for循环（ES6限定，可用于iterable对象），遍历的是值
    console.log(i);
}
// while和do...while和C语言一致，略去。

// Map和Set数据类型（ES6限定）
var m = new Map([["Piss", 78], ["Openm", 89], [46, "tyu"]]);// Map，注意用一个二维数组来初始化
m.get("Openm");
m.set("Bob", 59);
if(m.has(46)){
    m.delete(46);
}
console.log(m.size, m); // Map的大小
console.log(...m.keys(), ...m.values()); // 分别获取Map的键和值
// 注意！！！这里的keys和values不是数组（这和Python不同），而是迭代器！
// 如果要获取所有内容，用三个点进行全部获取并解包（要变成数组还要自己加上中括号）

var s1 = new Set([1,5,4,2,1,2]); // Set
s1.add(8);
s1.delete(1);
console.log(s1.size, s1, s1.values()); // 没有键（key），其他可类比Map

// 迭代器
m.forEach(function (element, index) { // 不想要的回调参数可以省略，Javascript允许这种做法
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    console.log(element + ', index = ' + index, `, ${arguments}`); // arguments是当前函数的所有参数的集合
});

ip.forEach(function (element, index, array){
    console.log(index, element);
});