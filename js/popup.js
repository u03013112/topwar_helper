var getSelectedTab = (tab) => {
    document.getElementById('startGameBtn').addEventListener('click', () => {
        var bg = chrome.extension.getBackgroundPage();
        bg.startGame();
    });
}
chrome.tabs.getSelected(null, getSelectedTab);

