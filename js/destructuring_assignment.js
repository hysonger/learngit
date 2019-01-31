// Destructuring assignment 解构赋值

var arr = [1, 5, "tyu", 8.3, "7op", 777];
var a, b, c, d;

[a, , c, ...d] = arr; // 可以用三个点接收剩余元素，可以省略一些元素

console.log(a, b, c, d);

var arrs = [1, 5, null, 789];

var [p, q, m = 5, n] = arrs; // 可以给一个默认值，防止没有接收到值而变成undefined的情况
// 不过null貌似会覆盖默认值……

[p, q] = [q, p] // 轻松交换变量

console.log(p, q, m, n);

var obj = {foo: "bar", bar: "foo"}; // 对象的解构赋值
var {foo, bar} = obj; // 这种解包要求声明的变量名和object中的key值对应
var {foo: x, bar: y} = obj; // 这种就可以自己改名

console.log(obj); 
console.log(foo, bar, x, y)