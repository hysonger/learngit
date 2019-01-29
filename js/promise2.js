// Do some experiment
function mainTask(resolve, _reject){
    resolve("argument data from mainTask");
    // return "return data from mainTask()"; // 第一级写return感觉没什么用 
    // 是否发生错误由Promise构造函数获得的事务函数决定，通过调用的是resolve函数还是reject函数来表现
}

function funcMaker(funcName, isFail){ // 不延时执行的回调函数生成器
    return function(callbackData){
        console.log(`[${funcName}]`, "received callback data:", callbackData);
        if(isFail){
            throw new Error(`error from ${funcName}`); // 引发一个异常也被视作Promise链执行失败
            // 实际输出显示，这时会跳到Promise链的下一级（不是同级！！！）中声明的错误回调函数执行
            // 不过如果这里是延时执行的函数内部，万万不可这么干，否则Promise链抓不到异常，程序会异常中止
        }
        return `returned data from ${funcName}`; // callbackData通过返回值传递
    };
}

function delayFuncMaker(funcName, isFail, delayTime = 1000){ // 延时执行的回调函数生成器
    return callbackData => new Promise( // 返回一个新的Promise相比于上面那种直接返回回调数据的做法，更为通用
        // 这样每一级回调函数也同时充当事务函数，都可以决定自己执行成功与否
        (resolve, reject) => setTimeout(function(){ // setTimeout里面的这个嵌套函数是实际延时执行的内容
            console.log(`[${funcName}]`, "received callback data:", callbackData);
            if(isFail){ // 判断自己这个延时任务成功与否，将工作交由下一级回调函数
                reject(`(rejected) argument data from ${funcName}`); // callbackData通过参数传递
            }
            else{
                resolve(`argument data from ${funcName}`); 
            }
        }, delayTime) // 返回的Promise对象会成为下一级Promise的起点（实际上是成为注册它的then的返回值）
    );
}

var funcs = new Array(4);
var failfuncs = new Array(4);

// var p = new Promise(mainTask);
var p = Promise.resolve("argument data from Promise.resolve method"); // 写法2，语法糖，可以不用写mainTask这个看起来很多余的函数
// 对应的也有Promise.reject()

for(let a of funcs.keys()){
    funcs[a] = delayFuncMaker("task" + parseInt(a), a === 1); // 刻意设置task1会出错。这里用funcMaker和delayFuncMaker都可以试试
    failfuncs[a] = funcMaker("rejected" + parseInt(a));
    p = p.then(funcs[a]).catch(failfuncs[a]);
    // p = p.then(funcs[a], failfuncs[a]); // 注意思考这两种写法的区别
}

console.log("Finished preparation.");