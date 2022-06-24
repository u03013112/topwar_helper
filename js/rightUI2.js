// for radar
function THGetRightUIInner2() {
    var innerHTML = `
        <style>
            .one-line {
                display: flex;
            }
            
            .options {
                background-color: rgb(210, 207, 207);
            }
        </style>

        <div id="topwar_helper_rightUI2" style="position: absolute; width: 100%; height: 100%; right: 0px; background: pink;">
            <div style="align-self:flex-end">
                <button onclick="hideRightUI()">Hide></button>
            </div>
            <div id="radar">
                <h4 style="margin: 0px;">Auto Radar Messions</h4>
                <h6 style="margin: 0px;">Energy: {{ energy }}/{{ energyMax }}</h6>
                <h6 style="margin: 0px;">small VIT Capsules:{{smallVITCapsules}}</h6>
                <h6 style="margin: 0px;">large VIT Capsules:{{largeVITCapsules}}</h6>
                <h6 style="margin: 0px;">Mession Storage: {{ messionStorage }}/{{ messionStorageMax }}</h6>
                <h6 style="margin: 0px;">New messions avalible in:{{ newMessionTime }}</h6>
                <h6 style="margin: 0px;">Marching Queue: {{ marchingQueue }}/{{ marchingQueueMax }}</h6>
                <input type="range" min="1" max="20" style="float:none;" v-model="repeat">
                <h6 style="margin: 0px;">Auto messions count:{{repeat}}</h6>
                <button onclick="THRadarTaskStartButtonClicked2()">start</button>
                <button onclick="THRadarTaskStopButtonClicked2()">stop</button>
                <button v-on:click="optionsBtnClicked()">options</button>
                <div class="options" v-show="optionActive">
                    <div class="one-line">
                        <input type="checkbox" id="Priority" v-model="isPriorityActive">
                        <label for="Priority" class="hint--botton  hint--small" style="border: 1px solid #eee;padding:3px 6px;border-radius:4px;" data-hint='help info here'>Priority</label>
                    </div>
                    <div v-show="isPriorityActive" v-for="messionType in messionsType" draggable="true"
                    @dragstart="dragStart($event,messionType)"
                    @dragover.prevent="dragOver($event,messionType)"
                    @dragenter="dragEnter($event,messionType)"
                    @dragend="dragEnd($event,messionType)">
                        {{messionType.name}}
                    </div>
                    <div class="one-line">
                        <input type="checkbox" id="autoSmallVITCheckBox" v-model="autoSmallVIT">
                        <label for="autoSmallVITCheckBox">auto Small VIT Capsules</label>
                    </div>
                    <div class="one-line">
                        <input type="checkbox" id="autoLargeVITCheckBox" v-model="autoLargeVIT">
                        <label for="autoLargeVITCheckBox">auto Large VIT Capsules</label>
                    </div>
                    <div class="one-line">
                        <input type="checkbox" id="autoGetRewardCheckBox" v-model="autoGetReward">
                        <label for="autoGetRewardCheckBox">auto get reward whether or not it will lead to an upgrade</label>
                    </div>
                    <button>save config</button>
                </div>
                <div id="log">
                    <!-- TODO:change to icon -->
                    <div v-for="log in logs">
                        {{log.log}}
                    </div>
                </div>
            </div>
    </div>
    `;
    return innerHTML;
}

// vue部分代码初始化
function THVueJsInit2() {
    if (window.THVueApp2 != undefined) {
        return;
    }
    window.THVueApp2 = new Vue({
        el: '#radar',
        data: {
            messionStorage: 40,
            messionStorageMax: 45,
            newMessionTime: '00:03:20',
            energy: 0,
            energyMax: 0,
            marchingQueue: 0,
            marchingQueueMax: 3,
            smallVITCapsules: 0,
            largeVITCapsules: 0,

            repeat: 1,
            // retry
            retry: 0,
            retryMax: 10,
            retryTimer: 0,
            retryTimeMax: 3,
            interval: 0,
            intervalMax: 3,

            optionActive: false,
            // priorty
            isPriorityActive: false,
            messionsType: [
                { 'name': 'The Lost Treasure' },
                { 'name': 'Rescue Mission' },
                { 'name': 'Eliminate the Dark Legion remnant' },
                { 'name': 'Destroy the Dark Legion Fort' },
                { 'name': 'Discover Dark Legion`s Treasure' },
                { 'name': 'Kill Dark Forces' },
            ],
            dragging: null,
            // fill energy
            autoSmallVIT: false,
            autoLargeVIT: false,

            // 不管是否升级，领取奖励
            autoGetReward: false,

            logs: [
                // {'log':'XXX'}
            ],

            status: 'done',
        },
        methods: {
            optionsBtnClicked: function() {
                this.optionActive = !this.optionActive;
            },
            dragStart: function(e, item) {
                this.dragging = item;
            },
            dragEnd: function(e, item) {
                this.dragging = null;
            },
            dragOver: function(e) {
                e.dataTransfer.dropEffect = 'move';
            },
            dragEnter: function(e, item) {
                e.dataTransfer.effectAllowed = 'move';
                if (item === this.dragging) {
                    return;
                }
                const newItems = [...this.messionsType];
                const src = newItems.indexOf(this.dragging);
                const dst = newItems.indexOf(item);
                newItems.splice(dst, 0, ...newItems.splice(src, 1))
                this.messionsType = newItems;
                // TODO: save
            }
        }
    })
}

function THRightUIInit2() {
    console.log('THRightUIInit2');
    var xsLoginDiv = document.getElementById("xsLoginDiv");
    var parentNode = xsLoginDiv.parentNode;
    rightUI = document.createElement("div");
    rightUI.id = "topwar_helper_rightUI2";
    rightUI.style.position = "absolute";
    rightUI.style.width = "0%";
    rightUI.style.height = "100%";
    rightUI.style.right = "0";
    rightUI.style.background = "pink";
    rightUI.innerHTML = THGetRightUIInner2();
    parentNode.insertBefore(rightUI, xsLoginDiv);

    THVueJsInit2();
}