function injectCustomJs(jsPath) {
    jsPath = jsPath || 'js/inject.js';
    var tempScript = document.createElement('script');
    tempScript.setAttribute('type', 'text/javascript');
    tempScript.src = chrome.extension.getURL(jsPath);
    document.head.appendChild(tempScript); // 将指定 js 注入（添加）指定页面中

    // 当注入的脚本加载完毕后移除它
    tempScript.onload = function () {
        // this.parentNode.removeChild(this);
        console.log('injectCustomJs',jsPath);
    };
}

// injectCustomJs2 : 注入第三方JS
function injectCustomJs2(jsPath) {
    var tempScript = document.createElement('script');
    tempScript.setAttribute('type', 'text/javascript');
    tempScript.src = jsPath;
    document.head.appendChild(tempScript); // 将指定 js 注入（添加）指定页面中

    // 当注入的脚本加载完毕后移除它
    tempScript.onload = function () {
        // this.parentNode.removeChild(this);
        console.log('injectCustomJs2',jsPath);
    };
}

injectCustomJs('js/inject.js');
injectCustomJs('js/bgc.js');
injectCustomJs('js/jk.js');
injectCustomJs('js/zcc.js');
injectCustomJs('js/hotkey.js');
injectCustomJs('js/rightUI.js');
injectCustomJs('js/radar.js');

injectCustomJs2('https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
injectCustomJs2('https://cdn.jsdelivr.net/npm/vue@2');