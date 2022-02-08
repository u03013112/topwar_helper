var isHotkeyRegistered = false;

function THRegHotkey() {
    if (isHotkeyRegistered == false) {
        isHotkeyRegistered = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            switch (event.keyCode) {
                case cc.macro.KEY.escape:
                    THPopWindowBack();
                    THSkipBattle();
                    break;
                case cc.macro.KEY.q:
                    THYJSZ();
                    break;
                case cc.macro.KEY.enter:
                    THChuZheng();
                    break;
                
            }
        });
    }
}

// 弹出串口的退出
function THPopWindowBack() {
    // 如果有打开窗口，关闭打开窗口
    if (cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT') && cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT').getChildrenCount() > 0) {
        cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT').getChildren()[0].getComponent('DialogContentComponent').close()
    }
}

function THSkipBattle() {
    if (cc.find('UICanvas/PopLayer/NBattleMain/ui/BattleingPanel')) {
        cc.find('UICanvas/PopLayer/NBattleMain/ui/BattleingPanel').getComponent('BattleingPanel').SkipBtnClick();
    }
}

// 一键上阵
function THYJSZ() {
    // TODO:加一个是否在战斗状态判断，可能也用不上，非战斗状态没啥用
    var QuickArmyEnterBtn = window.__require('QuickArmyEnterBtn');
    // 这个写法很古怪，没有深究
    var quickArmyEnterBtn = new QuickArmyEnterBtn.default();
    quickArmyEnterBtn.onClick();
}

// 出征，指的是战斗中开始战斗的大按钮
function THChuZheng() {
    if (cc.find('UICanvas/PopLayer/NBattleMain/ui/BattlePanel')) {
        cc.find('UICanvas/PopLayer/NBattleMain/ui/BattlePanel').getComponent('BattleEmPanel').StartFight();
    }
}

// 选择预设编队，从0开始
function THPresetMarch(number) {
    if (cc.find('UICanvas/PopLayer/NBattleMain/ui/BattlePanel')) {
        // event.target.parent.name
        var event = {'target':{'parent':{'name':number}}};
        cc.find('UICanvas/PopLayer/NBattleMain/ui/BattlePanel').getComponent('BattleEmPanel').onPresetMarchBtnClick(event);
    }
}