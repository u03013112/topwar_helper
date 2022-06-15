function addTSButton() {
    var button = document.createElement("button");
    button.innerHTML = "task start";
    button.type = "button";
    button.setAttribute("onclick", "THRadarTaskStartButtonClicked()");
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}

function addTEButton() {
    var button = document.createElement("button");
    button.innerHTML = "task stop";
    button.type = "button";
    button.setAttribute("onclick", "THRadarTaskStopButtonClicked()");
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}

function addTestButton() {
    var button = document.createElement('div');
    button.innerHTML = `<button id="THHelperButton" type="button" style="display: none;" onclick="showRightUI()">Helper</button>`;
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}

function addTestButton2() {
    var button = document.createElement('div');
    // button.innerHTML = `<button id="THHelperButton2" type="button" style="display: none;" onclick="showRightUI2()">AutoRadar</button>`;
    button.innerHTML = `<button id="THHelperButton2" type="button" onclick="showRightUI2()">AutoRadar</button>`;
    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}

addTestButton();
addTestButton2();


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(request.method, true, true);
        document.dispatchEvent(evt);
    });