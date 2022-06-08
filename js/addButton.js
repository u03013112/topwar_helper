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
    button.innerHTML = `<button id="THButtonTest" type="button" onclick="showRightUI()">Test</button>`;

    var parentElement = document.getElementById("header")
    parentElement.insertBefore(button, parentElement.children[1]);
}

addTestButton();
// addTSButton();
// addTEButton();


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(request.method, true, true);
        document.dispatchEvent(evt);
    });