'use strict';

var fs = require("fs");

fs.readFile("js/canvas.html", "utf-8", function(err, data){ // 异步，一次性读取
    if(!err){ // err为空就是执行成功
        console.log(data);
    }
    else{
        console.log("error while reading file!", err);
    }
});

try{
    console.log(fs.readFileSync("js/jquery.html", "utf-8")) // 同步，一次性读取
}
catch(err){
    // 这里处理错误
    console.log("error while reading file in sync mode!", err);
}

fs.readFile("js/ig-icon3.png", function(err, data){ // 读取二进制文件，异步，读取到的data是Buffer对象
    if(!err){
        console.log(data);
        // data.toString("utf-8") Buffer -> String
        // Buffer.from(text, "utf-8") String -> Buffer
        console.log(data.length, "bytes");
    }
    else{
        console.log("error while reading the byte file!", err);
    }
});

fs.writeFile("js/filewrite.txt", `Action speaks louder than words.
When there is a will, there is a way.`, function(err){ // 异步写文件。同步的和二进制的与上面同理
    if(err){
        console.log("error while writing!", err);
    }
    else{
        console.log("Success writing file!");
    }
});

fs.stat("js/ig-icon3.png", function(err, stat){
    if(err){
        console.log("getting file stat failed!", err);
    }else{
        if(stat.isFile()){ // 是否是文件
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});

// 可以注意到这里面的代码并不按照写的顺序执行，因为都是异步的