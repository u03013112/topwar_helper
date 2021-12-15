function addButton() {
    var button = document.createElement("button");
    button.innerHTML = "Test";
    button.id = "aButton123";
    button.type = "button";
    button.setAttribute("onclick", "zb()");
    document.getElementById("header").appendChild(button);
}

addButton();