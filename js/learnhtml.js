'use strict';

// document.open();
// 这个表示正式打开文档流开始写入内容，最好放window.onload里面，但是这个会把之前的文档内容全部清空
// 所以我屏蔽了它

document.write("<h2>Hello, world! </h2>");

var inWidth = window.innerWidth || document.body.clientWidth;
var inHeight = window.innerHeight || document.body.clientHeight;

document.write(`<p>当前网页区域面积：${inWidth}x${inHeight}</p>`);
document.write(`<p>当前浏览器窗口面积：${window.outerWidth}x${window.outerHeight}`);
document.write(`<p>屏幕面积：${screen.width}x${screen.height}</p>`);
document.write(`<p>显示器色深：${screen.pixelDepth}`);

document.write(`<p><b>浏览器信息（其实不可信）</b><br />
浏览器名称：${navigator.appName}<br />
浏览器版本：${navigator.appVersion}<br />
浏览器语言：${navigator.language}<br />
浏览器所在平台：${navigator.platform}<br />
浏览器的User-Agent字符串：${navigator.userAgent}</p>
`);

document.write(`<p id="urlInfo"><b>URL信息：</b><br />
URL：${location.href} 其中：<br />
协议：${location.protocol}<br />
主机：${location.host}<br />
端口：${location.port}<br />
路径：${location.pathname}<br />
GET参数：${location.search}<br />
Hash：${location.hash}<br />
</p>`);

document.title = "The title has been changed by Javascript code";

// location.reload();
// location.assign("https://game.qq.com/"); // 访问外部网页时，路径要写全，否则就会被识别为同目录下文件而访问

var first_part = document.getElementById("firstPart"); // 根据id匹配到唯一元素
var p = document.getElementsByTagName("p"); // 根据标签名称匹配一批元素，组成一个Array
// getElement(s)By家族： Id Name(name/id) TagName ClassName TagNameNS（这个不懂）
var p1 = document.querySelector("p.specialText"); // 这个可以通过CSS选择器选择元素，但是IE<8不支持，IE8仅有限支持
var pxx = document.querySelectorAll("p"); // 上面那个是取第一个，这个是取所有元素
// Tips：CSS多类选择器用div.class1.class2的方式写！

document.write(`<p>本页面的Cookie：${document.cookie}</p>`); // 可以直接读Cookie，好危险！
// 所以服务器端应当使用httpOnly来申请Cookie，这样JS就动不了它了。

// history.back() // 历史遗留对象，谁用谁是傻子
// 在真实浏览器里面使用，出现了死循环……

// 上述对于document的DOM方法对取出的子DOM对象也可用！他们都是同一种对象，document是根DOM对象

console.log(p1.innerHTML, p1.innerText, p1.textContent); // 三个显示一样
// 区别在于对它们赋值，第一个会将其直接视为HTML，可以直接修改DOM结构，但也可能导致XSS攻击（写入恶意代码）
// 而后两者将其视为在浏览器里面显示的文本，因此会对html结构编码，保证其不会实际生效
// innerText不返回隐藏元素的文本，而textContent返回全部文本。IE<9不支持textContent

console.log(p1.className, p1.classList); // 获取某个元素的class属性的方法

var div_new = document.createElement("div");
div_new.innerText = "<b>这个是新加入的div标签哦~</b>";
document.body.appendChild(div_new); // 往最顶层插入东西好像只能这样，写body

document.write(`<ul id="langList">
<li>C++</li>
<li>PHP</li>
<li>Python</li>
<li>Javascript</li>
</ul>`) // 写入完就会自动解析

var lang_list = document.getElementById("langList");
var li_Kotlin = document.createElement("li");
li_Kotlin.innerText = "Kotlin";
lang_list.insertBefore(li_Kotlin, lang_list.children[3]);

lang_list.removeChild(lang_list.children[0]); // 调用父对象的removeChild删除一个子节点。注意删除的节点仍然在内存中，只是不在文档结构里了

document.close() // 表明页面载入完毕。页面载入完毕后如果调用document.write会自动再次调用document.open()清空原有内容
// 不过……貌似在body里面同步执行的脚本并不能真的close……
// document.write("I have DESTROYED everything!!! --An unnamed evil man"); 