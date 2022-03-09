function THGetRightUIInner() {
    var innerHTML = `
        <style>
            .navigation{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: left;
                /* background: rgb(236, 192, 192); */
                padding: 20px;
                transition: 0.5s;
                border-radius: 4px;
                overflow: hidden;
                box-shadow: 0 8px 15px rgba(0,0,0,.2);
                flex-direction: column;
            }
            .navigation span{
                position: absolute;
                left: 26px;
                width: 32px;
                height: 4px;
                background: #666;
                pointer-events: none;
                transition: 0.5s;
            }
            .navigation span:nth-child(2){
                transform: translateY(-8px);
            }
            .navigation span:nth-child(3){
                transform: translateY(8px);
            }
            .navigation input:checked ~ div{
                height: 100%;
            }
            .menu{
                height: 0px;
                overflow: hidden;
            }
            input+label{
                text-decoration: none;
                color: #666;
                text-transform: uppercase;
                font-weight: 600;
                transition: 0.5s;
                display: inline-block;
            }
            .menu1{
                align-items: left;
                background: black;
            }
        </style>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>

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
                            <input type="radio" id="Gold Mine" value="Gold Mine" name="radio0">
                            <label for="Gold Mine">Gold Mine</label>
                            <div class="menu">
                                <div style="height: 80px; background: white;">
                                    <h4 style="margin: 8px;">Technology</h4>
                                    <h5 style="margin: 0px;">Building level:{{ goldMine.buildingLevel }}</h5>
                                    <h5 style="margin: 0px;">Merge level:{{ goldMine.mergeLevel }}</h5>
                                </div>
                                <div style="height: 130px; background: white;">
                                    <h4 style="margin: 8px;">Build task</h4>
                                    <h6 style="margin: 0px;">Build level {{ goldMine.mergeLevel }} to the following quantity</h6>
                                    <h6 style="margin: 0px;" id="topwar_helper_JKTaskInputResult">{{ goldMine.buildMax }}</h6>
                                    <input id="topwar_helper_JKTaskInput" type="range" min="1" max="10"
                                        name="topwar_helper_JKTaskInput">
                                    <script type='text/javascript'>
                                        $(function () {
                                            $('#topwar_helper_JKTaskInput').bind('input propertychange', function () {
                                                $('#topwar_helper_JKTaskInputResult').html($(this).val());
                                            });
                                        })
                                    </script>
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
                            <input type="radio" id="Barrack" value="Barrack" name="radio0">
                            <label for="Barrack">Barrack</label>
                            <div class="menu">
                                <div style="height: 80px; background: white;">
                                    <h4 style="margin: 8px;">Technology</h4>
                                    <h5 style="margin: 0px;">Building level:{{ barrack.buildingLevel }}</h5>
                                    <h5 style="margin: 0px;">Merge level:{{ barrack.mergeLevel }}</h5>
                                </div>
                                <div style="height: 130px; background: white;">
                                    <h4 style="margin: 8px;">Build task</h4>
                                    <h6 style="margin: 0px;">Build level {{ barrack.mergeLevel }} to the following quantity</h6>
                                    <h6 style="margin: 0px;" id="topwar_helper_BGCTaskInputResult">{{ barrack.buildMax }}</h6>
                                    <input id="topwar_helper_BGCTaskInput" type="range" min="1" max="10"
                                        name="topwar_helper_BGCTaskInput">
                                    <script type='text/javascript'>
                                        $(function () {
                                            $('#topwar_helper_BGCTaskInput').bind('input propertychange', function () {
                                                $('#topwar_helper_BGCTaskInputResult').html($(this).val());
                                            });
                                        })
                                    </script>
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
                            <input type="radio" id="Shipyaird" value="Shipyaird" name="radio0">
                            <label for="Shipyaird">Shipyaird</label>
                            <div class="menu">
                                <div style="height: 80px; background: white;">
                                    <h4 style="margin: 8px;">Technology</h4>
                                    <h5 style="margin: 0px;">Building level:{{ shipyard.buildingLevel }}</h5>
                                    <h5 style="margin: 0px;">Merge level:{{ shipyard.mergeLevel }}</h5>
                                </div>
                                <div style="height: 130px; background: white;">
                                    <h4 style="margin: 8px;">Build task</h4>
                                    <h6 style="margin: 0px;">Build level {{ shipyard.mergeLevel }} to the following quantity</h6>
                                    <h6 style="margin: 0px;" id="topwar_helper_ZCCTaskInputResult">{{ shipyard.buildMax }}</h6>
                                    <input id="topwar_helper_ZCCTaskInput" type="range" min="1" max="16"
                                        name="topwar_helper_ZCCTaskInput">
                                    <script type='text/javascript'>
                                        $(function () {
                                            $('#topwar_helper_ZCCTaskInput').bind('input propertychange', function () {
                                                $('#topwar_helper_ZCCTaskInputResult').html($(this).val());
                                            });
                                        })
                                    </script>
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
                buildingLevel: 10,
                mergeLevel: 12,
                buildMax: 10,
                statusStrs: [
                    { text: 'Level 58 count:10' },
                    { text: 'Level 58 count:10' },
                    { text: 'Level 58 count:10' },
                ]
            },
            barrack: {
                buildingLevel: 11,
                mergeLevel: 15,
                buildMax: 16,
                statusStrs: [
                    { text: 'Level 58 count:11' },
                    { text: 'Level 58 count:12' },
                    { text: 'Level 58 count:13' },
                ]
            },
            shipyard: {
                buildingLevel: 11,
                mergeLevel: 15,
                buildMax: 16,
                statusStrs: [
                    { text: 'Level 58 count:11' },
                    { text: 'Level 58 count:12' },
                    { text: 'Level 58 count:13' },
                ]
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
