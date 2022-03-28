function THGetRightUIInner() {
    var innerHTML = `
        <style>
            .navigation
            {
                position: relative;
                display: flex;
                justify-content: flex-start;
                align-items: left;
                /* background: rgb(236, 192, 192); */
                padding: 20px;
                border-radius: 4px;
                overflow: hidden;
                box-shadow: 0 8px 15px rgba(0,0,0,.2);
                flex-direction: column;
            }
            .navigation input:checked ~ .menu
            {
                height: 580px;
            }
            .menu
            {
                transition: 0.5s;
                height: 0px;
                overflow: hidden;
            }
            .navigation input:checked ~ .buildingMenu
            {
                height: 480px;
            }
            .buildingMenu
            {
                transition: 0.5s;
                height: 0px;
                overflow: hidden;
            }
            
            input+label
            {
                text-decoration: none;
                color: #666;
                text-transform: uppercase;
                font-weight: 600;
                display: inline-block;
            }
            .menu>div
            {
                padding-left: 10px;
                background-color: rgb(245, 206, 171);
            }
            .menu label
            {
                font-size:10px;
            }
        </style>

        <div id="topwar_helper_rightUI" style="position: absolute; width: 100%; height: 100%; right: 0px; background: pink;">
        <div id="app">
            <div v-show="notReady">
                <h1>loading...</h1>
                <h3>please stand by...</h3>
            </div>
            <div v-show="!notReady">
                <div class="navigation">
                    <div>
                        <input type="radio" id="Hotkey" value="Hotkey" name="radio0">
                        <label for="Hotkey">Hotkey</label>
                        <div class="menu">
                            <li v-for="hotkey in hotkeys">
                                {{ hotkey.text }}
                            </li>
                        </div>
                    </div>
                    <div>
                        <input type="radio" id="Building" value="Building" name="radio0">
                        <label for="Building">Building</label>
                        <div class="menu">
                            <div>
                                <input type="radio" id="Gold Mine" value="Gold Mine" name="radio1">
                                <label for="Gold Mine">Gold Mine</label>
                                <div class="buildingMenu">
                                    <div style="height: 80px; background: white;">
                                        <h4 style="margin: 8px;">Technology</h4>
                                        <h5 style="margin: 0px;">Building level:{{ goldMine.buildingLevel }}</h5>
                                        <h5 style="margin: 0px;">Merge level:{{ goldMine.mergeLevel }}</h5>
                                    </div>
                                    <div style="height: 130px; background: white;">
                                        <h4 style="margin: 8px;">Build task</h4>
                                        <h6 style="margin: 0px;">Build level {{ goldMine.mergeLevel }} to the following quantity</h6>
                                        <h6 style="margin: 0px;"> {{ goldMine.buildingLevel}} </h6>
                                        <input type="range" min="1" max="10"
                                            name="topwar_helper_JKTaskInput" v-model="goldMine.buildingLevel">
                                        <button onclick="JKTaskButtonClicked()">Dispatch a
                                            task</button>
                                    </div>
                                    <div style="height: 210px; background: white;">
                                        <h4 style="margin: 8px;">Status</h4>
                                        <li v-for="statusStr in goldMine.statusStrs">
                                            {{ statusStr.text }}
                                        </li>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input type="radio" id="Barrack" value="Barrack" name="radio1">
                                <label for="Barrack">Barrack</label>
                                <div class="buildingMenu">
                                    <div style="height: 80px; background: white;">
                                        <h4 style="margin: 8px;">Technology</h4>
                                        <h5 style="margin: 0px;">Building level:{{ barrack.buildingLevel }}</h5>
                                        <h5 style="margin: 0px;">Merge level:{{ barrack.mergeLevel }}</h5>
                                    </div>
                                    <div style="height: 130px; background: white;">
                                        <h4 style="margin: 8px;">Build task</h4>
                                        <h6 style="margin: 0px;">Build level {{ barrack.mergeLevel }} to the following quantity</h6>
                                        <h6 style="margin: 0px;" id="topwar_helper_BGCTaskInputResult"> {{ barrack.buildCount}} </h6>
                                        <input id="topwar_helper_BGCTaskInput" type="range" min="1" max="32"
                                            name="topwar_helper_BGCTaskInput" v-model="barrack.buildCount">
                                        
                                        <button onclick="BGCTaskButtonClicked()">Dispatch a
                                            task</button>
                                    </div>
                                    <div style="height: 210px; background: white;">
                                        <h4 style="margin: 8px;">Status</h4>
                                        <li v-for="statusStr in barrack.statusStrs">
                                            {{ statusStr.text }}
                                        </li>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input type="radio" id="Shipyaird" value="Shipyaird" name="radio1">
                                <label for="Shipyaird">Shipyaird</label>
                                <div class="buildingMenu">
                                    <div style="height: 80px; background: white;">
                                        <h4 style="margin: 8px;">Technology</h4>
                                        <h5 style="margin: 0px;">Building level:{{ shipyard.buildingLevel }}</h5>
                                        <h5 style="margin: 0px;">Merge level:{{ shipyard.mergeLevel }}</h5>
                                    </div>
                                    <div style="height: 130px; background: white;">
                                        <h4 style="margin: 8px;">Build task</h4>
                                        <h6 style="margin: 0px;">Build level {{ shipyard.mergeLevel }} to the following quantity</h6>
                                        <h6 style="margin: 0px;"> {{ shipyard.buildCount}} </h6>
                                        <input id="topwar_helper_ZCCTaskInput" type="range" min="1" max="16"
                                            name="topwar_helper_ZCCTaskInput" v-model="shipyard.buildCount">
                                        <button onclick="ZCCTaskButtonClicked()">Dispatch a
                                            task</button>
                                    </div>
                                    <div style="height: 210px; background: white;">
                                        <h4 style="margin: 8px;">Status</h4>
                                        <li v-for="statusStr in shipyard.statusStrs">
                                            {{ statusStr.text }}
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="radio" id="Radar" value="Radar" name="radio0">
                        <label for="Radar">Radar</label>
                        <div class="menu">
                            <label>helper text here</label>
                            <h6 style="margin: 0px;">repeat count:{{ radar.countMax }}</h6>
                            <input type="range" min="1" max="50" v-model="radar.countMax">
                            <h6 style="margin: 0px;">interval(s):{{ radar.interval }}</h6>
                            <input type="range" min="0" max="60" v-model="radar.interval">
                            <h6 style="margin: 0px;">retry interval(s):{{ radar.retryInterval }}</h6>
                            <input type="range" min="0" max="60" v-model="radar.retryInterval">
                            <h6 style="margin: 0px;">retry count max:{{ radar.retryCountMax }}</h6>
                            <input type="range" min="0" max="10" v-model="radar.retryCountMax">
                            <br>
                            <button onclick="THRadarTaskStartButtonClicked()">start</button>
                            <button onclick="THRadarTaskStopButtonClicked()">stop</button>
                            <br>
                            <label style="font-size:15px;margin:10px;">log here:<br></label>
                            <div style="height: 240px; background: white;overflow:scroll">
                            <p v-for="logStr in radar.logStrs" style="font-size:3px;margin:0px;">
                                {{ logStr }}<br>
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return innerHTML;
}

// vue部分代码初始化
function THVueJsInit(){
    if ( window.THVueApp != undefined ){
        return;
    }
    window.THVueApp = new Vue({
        el: '#app',
        data: {
            notReady: true,
            hotkeys: [
                { text: 'Escape : Skip the battle' },
                { text: 'Escape : Quit from some menu' },
                { text: 'Q : Quick deploy in battle' },
                { text: 'Enter: Start battle' }
            ],
            goldMine: {
                buildingLevel: 0,
                mergeLevel: 0,
                buildCount:10,
                statusStrs: []
            },
            barrack: {
                buildingLevel: 0,
                mergeLevel: 0,
                buildCount:32,
                statusStrs: []
            },
            shipyard: {
                buildingLevel: 0,
                mergeLevel: 0,
                buildCount:16,
                statusStrs: []
            },
            radar: {
                countMax:1,
                interval:30,
                retryInterval:10,
                retryCountMax:3,
                logStrs:[],
            }
        }
    })
}

function THRightUIInit() {
    console.log('THRightUIInit');
    var xsLoginDiv = document.getElementById("xsLoginDiv");
    var parentNode = xsLoginDiv.parentNode;
    rightUI = document.createElement("div");
    rightUI.id = "topwar_helper_rightUI";
    rightUI.style.position = "absolute";
    rightUI.style.width="0%";
    rightUI.style.height="100%";
    rightUI.style.right = "0";
    rightUI.style.background="pink";
    rightUI.innerHTML = THGetRightUIInner();
    parentNode.insertBefore(rightUI, xsLoginDiv);

    THVueJsInit();
}