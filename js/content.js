function injectCustomJs(jsPath) {
    jsPath = jsPath || 'js/inject.js';
    var tempScript = document.createElement('script');
    tempScript.setAttribute('type', 'text/javascript');
    tempScript.src = chrome.extension.getURL(jsPath);
    document.head.appendChild(tempScript); // 将指定 js 注入（添加）指定页面中

    // 当注入的脚本加载完毕后移除它
    tempScript.onload = function () {
        this.parentNode.removeChild(this);
    };
}

injectCustomJs('js/inject.js');
injectCustomJs('js/bgc.js');
injectCustomJs('js/jk.js');
injectCustomJs('js/zcc.js');