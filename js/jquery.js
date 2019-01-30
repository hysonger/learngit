$(function(){ // 相当于document.onready事件绑定，就是网页加载完成时执行的。
    // 如果脚本在head里面被引用的话，这里其实最合适放DOM操作代码
    // 这样可以保证代码可以在DOM结构加载后再执行，避免找不到对象
    console.log("loading!");

    var igIcon = $("#igIcon");
    var button = $("[name=animateButton]");
    var h1 = $("h1.maintitle"); // 如果取不到节点，jQuery对象表现为一个空数组
    var input = $("#testInput");

    // 选择器
    var li_list = $("li.lang");
    // 注意这里的每一个取节点方法都可以额外传入选择器字符串
    var ul = li_list.parent(); // 取父节点。注意用jQuery获取的一组对象，如果取其单独一个元素（li_list[n]）得到的是DOM对象！
    // CAUTION：jQuery对象类似数组，它的每个元素都是一个引用了DOM节点的对象。
    var li_single = ul.filter(".m,.f") // jQuery对象支持map和filter等高阶函数
    var li_m = ul.find(".lang.m"); // find在该节点所有子节点中寻找

    // 事件绑定
    var anim = function(){ // 动画效果
        igIcon.fadeToggle("slow");
        // igIcon.animate({width: "100px", height: "100px"}); // 这个是万能动画方法，可以让DOM属性渐变的向设定的目标变化

        // ajax部分。用法很像Promise
        // 对于GET或者POST请求，也可以用get()或者post()
        // 对于获取json，甚至可以getJSON()获得一个JSON对象
        $.ajax("https://www.baidu.com/s", {
            async: true,
            method: "GET",
            contentType: "text/plain",
            data: {wd: "special"},
            // jsonp: "callback" // 按jsonp方式加载
        }).done(function (data){
            // 成功时候写这里
        })
        .fail(function (data){
            // 失败时候写这里
        })
        .always(function (data){
            // 收尾工作写这里
        });
    };
    
    button.on("click", anim);
    // button.click(anim); // 两种方法等价

    var isFirstMove = true;
    igIcon.mousemove(function(e){ // 注意事件回调函数可以接收一个Event参数，获取详细信息
        console.log('pageX = ' + e.pageX + ', pageY = ' + e.pageY);
        if(isFirstMove){
            setTimeout(() => igIcon.off("mousemove"), 5000); // 5秒后，解除这个事件绑定
            isFirstMove = false;
        }
    });

    button.trigger("click"); // 手动触发事件
    // button.click(); // 二者等价


    var li_name = ul.map(function (value, index, array) { // 当然也可以传入函数。this代表每个元素，注意这里this是DOM对象，不是jQuery对象
        return $(this).text() || $(this).html() || this.innerText; // 通过jQuery获取元素内容的方式。这几种可以替换
    }).get(); // 不带参数的get获得由jQuery包装的一组元素组成的Array，带参数则获取指定顺序的元素。


    console.log(li_name.join(", "));
    console.log(igIcon.width(), igIcon.height(), igIcon.attr("id")); // 取DOM信息
    console.log(`当前浏览器可视窗口和HTML文档面积：
${$(window).width()}x${$(window).height()}
${$(document).width()}x${$(document).height()}`); // 甚至可以取浏览器和文档信息

    if (li_list.first().next().get(0) === li_list[1] && $(li_list[1]).prev().get(0) === li_list[0]) { // 取前后节点。这里演示绕了个大圈
        let n = li_list.first();
        n.hide(); // 简单隐藏元素。可以用show()还原
        if (n.hasClass("m")) {
            n.addClass("f");
            n.removeClass("m");
            console.log("Success");
        }
    }

    // 增删节点
    ul.append('<li class="lang">C#</li>'); // append可以传入原始HTML，jQuery对象，DOM对象，或者函数（函数可以对jQuery对象中每一个元素都执行特定的append操作）
    ul.prepend('<li class="lang">C</li>') // append加在最后，prepend加在最前面
    $(li_list[0]).after($(li_list[3])); // 插入已经存在的元素，相当于将这个元素换个位置
    $(li_list[2]).remove(); // 删除元素

    // jQuery对象可以包含一批元素，因此可以批量操作
    li_list.css("color: brown;");

    // 修改节点
    if (h1.is("[style]")) { // 判断当前节点是否符合要求。注意jQuery对于选择框是否选中等等有额外的选择器（用:checked表示）
        h1.removeAttr("style"); // 删除属性
    }
    // h1.attr("style", "color: blueviolet"); // 修改属性
    h1.css({color: "blueviolet"}); // 对于style可以直接用css方法修改
    // h1.prop("checked"); // 对于没有键值只需要名称的属性，可以用这个判断

    if (input.val() === "Origin") { // 修改和读取表单的值
        input.val("Modified");
    }
});

