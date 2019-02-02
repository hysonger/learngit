// Simple HTTP Server for Node.js
'use strict';

// 模块导入
var url = require("url");
var fs = require("fs");
var path = require("path");
var http = require("http");

// 定义工作目录
var workdir = path.resolve('.');
var dataPathname = "htdocs";
const logPathname = "log";
var webroot = '';
var default_files = ["index.html", "index.htm", "default.html", "default.htm"];
var virtual_pages = {};
var server_port = 8000;

var newpath_flag = false;

// 本次日志准备
var startDate = new Date();
var logFileStream = fs.createWriteStream(
    path.join(workdir, logPathname, `${startDate.toISOString()}.txt`)
    , "utf-8");

// 日志记录函数
function log(message, err){
    var datenow = new Date();
    var datetext = `[${datenow.toISOString()}]`;
    if(err){
        var data = datetext + message + ' ' + err.stack;
        console.error(data);
        logFileStream.write(data + "\n");
    }
    else{
        var data = datetext + message;
        console.log(data);
        logFileStream.write(data + "\n");
    }
}

function deliverFile(response, filepath) {
    response.writeHead(200);
    fs.createReadStream(path.join(webroot, filepath)).pipe(response);
    log(`Successfully delivered file ${filepath} to the client`);
}

function declare404(response, error, filepath = "(default)") {
    response.writeHead(404);
    response.end("404 Not Found");
    log(`Failed getting file ${filepath}: 404 Not Found`, error);
}

// 准备工作开始
console.log("----A simple HTTP server based on Node.js----")

process.argv.slice(2).forEach(function(arg, index, array){
    if (arg.startsWith("-")) {
        // 这里定义参数解析规则
        log(`provided running argument ${arg}`);
        try{
            var next_arg = array[index];
        }
        catch{
            // return;
        }
        if(arg === "-p" && !isNaN(next_arg)){
            log(`argument provides special server port: ${arg}`);
            server_port = parseInt(arg);
        }else if(arg === "-d"){
            log(`argument provides special web docs path: ${path.resolve(next_arg)}`);
            webroot = path.resolve(next_arg);
            newpath_flag = true;
        }else{
            // reserved
        }
    } else{
        // To Do
    }
});

if(!newpath_flag){ webroot = path.join(workdir, dataPathname); }
log(`Exact web root directory: ${webroot}`);

var server = http.createServer(function(request, response){
    try {
        // 监听函数第一个参数是请求信息（对象），第二个参数是返回给客户端的数据（Buffer）
        var urldata = url.parse(request.url); // url信息应该从这里读取，而不是request
        var headers = request.headers;
        log(`Client ${headers.host} (${headers["user-agent"]}) send a request for ${request.url}`);

        if (request.url in virtual_pages) {
            log(`It is an virtual page. Turn to certain handler functions.`);
            // 虚拟页面在这里处理
        } else {
            let local_path = path.join(webroot, urldata.pathname);
            fs.stat(local_path, function(err, stats){
                if(!err && stats.isFile()){ // 如果访问的是文件
                    deliverFile(response, urldata.pathname);
                }
                else if(!err && stats.isDirectory()){ // 如果访问的是目录，则试图访问该目录下的默认文件
                    let tasks = [];
                    for(let i of default_files){ // 对每个默认文件，都创建一个Promise任务试图访问
                        var requestDefault = (function (my_name, my_url) {
                            let filepath = path.join(my_url, my_name);
                            return function (resolve, reject) {
                                fs.stat(path.join(webroot, filepath), function (err_d, stats_d) {
                                    if (!err_d && stats_d.isFile()) {
                                        resolve(filepath);
                                    } else {
                                        reject(err_d);
                                    }
                                });
                            }
                        })(i, urldata.pathname); // 生成一个试图访问指定默认文件名的闭包函数
                        tasks.push(new Promise(requestDefault)); // 生成执行这个函数的Promise对象
                    }

                    Promise.race(tasks).then(function(filepath){ // 同时试图访问若干个默认文件
                        deliverFile(response, filepath);
                    })
                    .catch(function(err){ // 如果所有任务都失败了，就报错
                        declare404(response, err);
                    });
                }
                else{ // 如果找不到文件，报404错误
                    declare404(response, err, urldata.pathname);
                }
            });
        }
    }
    catch(err){
        response.writeHead(500);
        response.end("500 Server Internal Error");
        log(`An error occured when dealing with a request from Client ${headers.host} (${headers["user-agent"]})`, err);
    }
});

server.listen(server_port);
