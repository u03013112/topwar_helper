function addButton() {
    var button = document.createElement("button");
    button.innerHTML = "Test";
    button.id = "aButton123";
    button.type = "button";
    button.setAttribute("onclick", "showMainUI()");
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}

addButton();