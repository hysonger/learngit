'use strict';

var fs = require("fs");

var readf = fs.createReadStream("js/ig-icon3.png"); // 流式读取

readf.on("open", function(){
    console.log("opening file...")
});

readf.on("data", function(chunk){
    console.log("read", chunk.length, "bytes");
});

readf.on("end", function(){
    console.log("read END!");
});

readf.on("err", function(err){
    console.log("ERROR: " + err);
});

var writef = fs.createWriteStream("js/filewritestream.txt", "utf-8");
writef.write("All right!\n");
writef.write("You have written a file successfully.\n");

var source = fs.createReadStream("js/filewrite.txt");
var destn = fs.createWriteStream("js/filepipe.txt");
source.pipe(destn, {end: true}); // 注意这里是读的源执行pipe方法 
// 默认pipe完后，WriteStream自动关闭。可以修改end属性改变该行为