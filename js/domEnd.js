function addButton() {
    var button = document.createElement("button");
    button.innerHTML = "兵工厂";
    button.id = "THButtonBGC";
    button.type = "button";
    button.setAttribute("onclick", "showBGCUI()");
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}

addButton();