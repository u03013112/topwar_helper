var getSelectedTab = (tab) => {
    document.getElementById('startGameBtn').addEventListener('click', () => {
        var bg = chrome.extension.getBackgroundPage();
        bg.startGame();
    });

    document.getElementById('helperBtn').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "enableFeature" }, function(response) {});
        });
    });

    document.getElementById('autoRadarBtn').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "autoRadarBtnClicked" }, function(response) {});
        });
    });
}
chrome.tabs.getSelected(null, getSelectedTab);