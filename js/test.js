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
/** 
 * HTML被完全加载以及解析时，执行处理器
 * 这时候，我们才将之注入到页面，否则会因为 HTML 未加载，脚本就注入完成，导致 DOM 中获取失败。
 */
// document.addEventListener('DOMContentLoaded', () => { injectCustomJs() })
injectCustomJs();