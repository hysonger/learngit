function onSubmit(){
    var form = document.getElementById("mainForm");
    var input = form.getElementsByTagName("input")[0];
    if(input.value === "special"){
        console.log("User submits 'special'! Aborted...")
        return false;
    }
    return true;
}

// 截留表单onsubmit事件，一种是HTML里设置onsubmit为return onSubmit()，
// 另一种理论上是取代默认的onsubmit方法，但在head里面由于DOM没加载所以不行
