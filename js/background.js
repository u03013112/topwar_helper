const gameUrl = 'https://h5.topwargame.com/h5game/index.html';
const gameUrlTail = '?campaignId=chromeExtensions'
function startGame() {
    let queryOptions = { currentWindow: true };
    chrome.tabs.query(queryOptions , function (tabs){
        var tabId = 0;
        for (var i = 0; i <tabs.length;++i){
            var tab = tabs[i];
            if (tab.url.startsWith(gameUrl)){
                tabId = tab.id;
                break;
            }
        }
        if (tabId == 0){
            chrome.tabs.create({
                url: gameUrl+gameUrlTail
              });
        }else{
            chrome.tabs.update(tabId,{active: true});
        }
    });
}