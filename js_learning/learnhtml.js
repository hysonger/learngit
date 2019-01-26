'use strict';

document.writeln("<h2>Hello, world! </h2>");

var inWidth = window.innerWidth || document.body.clientWidth;
var inHeight = window.innerHeight || document.body.clientHeight;

document.writeln(`<p>当前网页区域面积：${inWidth}x${inHeight}</p>`);
document.writeln(`<p>当前浏览器窗口面积：${window.outerWidth}x${window.outerHeight}`);

document.write(`<p><b>浏览器信息</b><br />
浏览器名称：${navigator.appName}<br />
浏览器版本：${navigator.appVersion}<br />
浏览器语言：${navigator.language}<br />
浏览器所在平台：${navigator.platform}<br />
浏览器的User-Agent字符串：${navigator.userAgent}</p>
`);