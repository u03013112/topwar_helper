function addBGCButton() {
    var button = document.createElement("button");
    button.innerHTML = "Barracks";
    button.id = "THButtonBGC";
    button.type = "button";
    button.setAttribute("onclick", "showBGCUI()");
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}
function addJKButton() {
    var button = document.createElement("button");
    button.innerHTML = "Gold Mine";
    button.id = "THButtonJK";
    button.type = "button";
    button.setAttribute("onclick", "showJKUI()");
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}
function addZCCButton() {
    var button = document.createElement("button");
    button.innerHTML = "Shipyard";
    button.id = "THButtonZCC";
    button.type = "button";
    button.setAttribute("onclick", "showZCCUI()");
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}

function addTestButton() {
    var button = document.createElement("button");
    button.innerHTML = "Test";
    button.id = "THButtonTest";
    button.type = "button";
    button.setAttribute("onclick", "showRightUI()");
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}

addTestButton();
addZCCButton();
addBGCButton();
addJKButton();