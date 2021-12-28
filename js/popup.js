var getSelectedTab = (tab) => {
    var tabId = tab.id;
    var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
    document.getElementById('startGameBtn').addEventListener('click', () => {
        var bg = chrome.extension.getBackgroundPage();
        bg.startGame();
        
    });
}
chrome.tabs.getSelected(null, getSelectedTab);

