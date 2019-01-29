// NOTICE: This only works on HTML5 navigator

var picArea = document.getElementById("picArea");
var filenameArea = document.getElementById("fileName");

var fileUploadInput = document.getElementsByName("fileUpload")[0];

fileUploadInput.addEventListener("change", function(){ // 在事件回调函数里处理选择的图片
    picArea.style.backgroundImage = null;
    var filename = fileUploadInput.value; // file类型input的value是要上传的文件路径（然而其实是个假路径，保证安全）
    var file = fileUploadInput.files[0]; // 实际选择的文件对应的File对象。看起来这个对象里面有很多东东~
    if(!filename){
        filenameArea.innerText = "Please choose a file!";
        return;
    }
    // if(!(filename.endsWith(".bmp") && filename.endsWith(".jpg") && filename.endsWith(".png"))){
    if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif'){ // 方法2
        alert("Invaild file!");
        return;
    }

    filename = file.name;

    var reader = new FileReader(); // HTML5限定，好戏上演！
    reader.onload = function(f){ // 读取文件后，对文件的处理是通过事件回调函数处理的
        picArea.style.backgroundImage = `url(${f.target.result})`; // 这是结果
        filenameArea.innerText = filename;
    };
    reader.readAsDataURL(file) // 给它File对象进行读取。貌似读取的东西作为一个DataURL，可以写到CSS Style里面当url用，却具有所有的图片数据
});
