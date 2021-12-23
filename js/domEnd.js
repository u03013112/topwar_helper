function addBGCButton() {
    var button = document.createElement("button");
    button.innerHTML = "兵工厂";
    button.id = "THButtonBGC";
    button.type = "button";
    button.setAttribute("onclick", "showBGCUI()");
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}
function addJKButton() {
    var button = document.createElement("button");
    button.innerHTML = "金矿";
    button.id = "THButtonJK";
    button.type = "button";
    button.setAttribute("onclick", "showJKUI()");
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}
function addZCCButton() {
    var button = document.createElement("button");
    button.innerHTML = "造船厂";
    button.id = "THButtonZCC";
    button.type = "button";
    button.setAttribute("onclick", "showZCCUI()");
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}

addBGCButton();
addJKButton();
addZCCButton();