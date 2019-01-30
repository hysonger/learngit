function drawCanvas(){
    'use strict';
    var canvas = document.getElementById("testCanvas");

    if(canvas.getContext){
        var area = canvas.getContext("2d"); // 写"webgl"可以绘制3D图形，这里不涉及
        area.clearRect(0, 0, canvas.width, canvas.height); // Canvas坐标以左上角为原点
        area.fillStyle = "grey";
        area.fillRect(100, 100, 300, 300); // 画一个正方形
        
        // 文字
        area.font = "24px Arial";
        area.fillStyle = "red";

        area.shadowOffsetX = 2; // 阴影实现。貌似也会影响后面的路径绘制……
        area.shadowOffsetY = 2;
        area.shadowBlur = 2;
        area.shadowColor = '#666666';

        area.fillText("Canvas drawing", 40, 40);

        // 按路径绘制
        var path = new Path2D();
        path.arc(200, 200, 75, 0, Math.PI * 1.5, false); // 默认是逆时针绘制圆
        path.moveTo(75 + 50, 250); // 更改起点，可以闭合断口
        path.arc(75, 250, 50, Math.PI, 2 * Math.PI, true); // 最后一个参数貌似是智能取最优路径绘制
        path.moveTo(356, 412);
        path.lineTo(123, 456);

        area.strokeStyle = "blue";
        area.stroke(path); // 画上去
    }
    else{
        console.log("Your browser doesn't support canvas!")
        return;
    }
}

