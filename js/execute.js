const testBtn = () => {
    alert('test');
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

chrome.runtime.onMessage.addListener(onMessage);