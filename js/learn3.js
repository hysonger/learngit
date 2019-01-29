// 标准对象
var i = 54;
var fake_i = new Number(i); // 魔性的包装对象
console.log(typeof i, typeof fake_i); // 可以看到fake_i的类型居然变成了object！所以死都别用包装对象

// 类型转换
var num = 32, str = "78", arr= ["37.09", 459];
if(Array.isArray(arr) && typeof noexist === "undefined"){ // 判断Array和undefined的正确方法
    console.log(parseInt(str), Number(str), parseFloat(arr[0])); // 文本到数值
    console.log(num.toString(), String(num)); // 数值到文本
}

// Date对象
var now = new Date(); // 做个笔记
now.getFullYear(); // 2015, 年份
now.getMonth(); // 5, 月份，注意月份范围是0~11！5表示六月（真的神经病）
now.getDate(); // 24, 表示24号
now.getDay(); // 3, 表示星期三
now.getHours(); // 19, 24小时制
now.getMinutes(); // 49, 分钟
now.getSeconds(); // 22, 秒
now.getMilliseconds(); // 875, 毫秒数
now.getTime(); // 1435146562875, 以number形式表示的时间戳now.getDate

var d1 = new Date(2019, 1, 26, 12, 25, 31); // 手动生成
var d2 = new Date(Date.parse("2015-06-24T19:49:22.875+08:00")); 
// Date可以由时间戳生成，而时间戳又可以由parse方法解析一个符合ISO 8601（http://www.w3.org/TR/NOTE-datetime）的字符串得到
console.log(d2.toLocaleString(), d2.toUTCString(), d2.toISOString());
console.log(now.getTime()) // 获得时间戳

// RegExp对象
var re1 = /[0-9][a-z][A-Z]*/;
var re2 = new RegExp("[0-9][a-z][A-Z]");
var re3 = /^(\d{3})-(\d{3,8})$/;

console.log(re1.test("abcdefg"), 'a,b, c  d'.split(/[\s\,]+/));
console.log(re3.exec('010-12345'), re3.lastIndex);

var s = 'JavaScript, VBScript, JScript and ECMAScript';
var re4 = /[a-zA-Z]+Script/g; // 或者new RegExp("[a-zA-Z]+Script", 'g')，加g表示全局搜索
// 还可以加：i标志，表示忽略大小写，m标志，表示执行多行匹配。

re4.exec(s); // 全局模式下多次执行exec可以不断向后搜索
console.log(re4.lastIndex);
re4.exec(s);
console.log(re4.lastIndex);

// JSON
var bob = {
    age: 19,
    name: "Bob",
    description: "A simple person",
    say: function(text){
        console.log(this.name + ":", text);
    }, // JSON解析的时候忽略了函数
    toJSON: function(){ // 给对象定义toJSON函数可以自行控制它怎么被序列化为JSON文本
        return {
            "Name": this.name,
            "Age": this.age,
            "Description": this.description
        }; // 这里干的事情其实是“调包”了提供给JSON用来序列化的对象，
        // 所以下面那句筛选时仍然按原始键名筛选，就什么都没有得到
    }
};
console.log(JSON.stringify(bob, ["name", "age", "description"], '    ')); // 将对象输出为JSON文本
// 第二个参数控制筛选对象的键值（可以传需要的键名的数组，也可以传处理函数），第三个参数可以控制缩进
console.log(JSON.stringify(bob, function(key, value){
    if(typeof value === "string"){
        return value.toUpperCase();
    }
    return value;
}), "    "); // 给第二个参数传一个函数可以在函数内处理键值，并返回处理后的键值

var pa = JSON.parse('["hahaha", 45, "Ink"]'); // 反序列化
// 第二个参数同样可以接收一个处理函数，格式与上面那个是一样的。

