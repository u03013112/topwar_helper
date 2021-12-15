var getSelectedTab = (tab) => {
    var tabId = tab.id;
    var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
    document.getElementById('zb').addEventListener('click', () => sendMessage({ action: 'zb' }));
}
chrome.tabs.getSelected(null, getSelectedTab);