export function bar(){
    console.log("bar executed!");
}

export function foo(){
    console.log("foo executed!");
}

export {bar as ba}; // 可以为输出内容定义别名