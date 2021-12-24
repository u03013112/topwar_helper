var getSelectedTab = (tab) => {
    var tabId = tab.id;
    var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
    document.getElementById('testBtn').addEventListener('click', () => sendMessage({ action: 'test' }));
}
chrome.tabs.getSelected(null, getSelectedTab);