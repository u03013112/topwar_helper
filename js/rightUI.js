function THGetRightUIInner () {
    var innerHTML = `
        <button id="THButtonJK" type="button" onclick="showJKUI()">Gold Mine</button>
        <button id="THButtonBGC" type="button" onclick="showBGCUI()">Barracks</button>
        <button id="THButtonZCC" type="button" onclick="showZCCUI()">Shipyard</button>
    `;
    return innerHTML;
}