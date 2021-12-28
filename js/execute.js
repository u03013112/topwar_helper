const testBtn = () => {
    alert('test');
    chrome.tabs.query({
        currentWindow:true
    }, function(tabs) {
        console.log(tabs);
    } );
};


const onMessage = (message) => {
    switch (message.action) {
        case 'test':
            testBtn();
            break;
        default:
            break;
    }
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

chrome.runtime.onMessage.addListener(onMessage);