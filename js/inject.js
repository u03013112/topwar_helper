function getArmyInfos() {
    bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
    for (var i = 0; i < bList.length; ++i) {
        b = bList[i];
        if (b.name == 'ArmyItem') {
            c = b.getComponent('ArmyItem');
            console.log(c.ItemId);
        }
    }
}

// 所有的function都加TH（TopwarHelper）开头，毕竟是注入代码，为了避免冲突。
function THDataInit() {
    if (!window.THData) {
        window.THData = {};
    }
    if (!window.THData.Tasks) {
        window.THData.Tasks = [];
    }
    if (!window.THData.Status) {
        window.THData.Status = {};
    }
    if (!window.THData.timer) {
        window.THData.timer = setInterval(function() { THTaskUpdate(); }, 1000);
    }
}

// 调度器
function THTaskUpdate() {
    // console.log('THTaskUpdate');
    try {
        if (!window.THRightUIInitStart) {
            // 这里采用新变量window.THRightUIInitStart，为了防止加载过程重复
            window.THRightUIInitStart = true;
            THRightUIInit();
            THRightUIInit2();
        }
        if (!window.THGAInitStart) {
            window.THGAInitStart = true;
            THGAInit();
        }
    } catch (e) {
        console.log(e.message);
        return;
    }

    // 先判断vue部分已经搞定了，这个需要花一些时间
    if (window.THVueApp) {
        if (window.THVueApp.notReady == true) {
            // 还没准备好的时候才进行检测
            if (cc && cc.find('Canvas/HomeMap')) {
                window.THVueApp.notReady = false;
            } else {
                return;
            }
        }
    } else {
        return;
    }


    THRegHotkey();

    if (window.THData.Tasks && window.THData.Tasks.length > 0) {
        for (var i = 0; i < window.THData.Tasks.length; ++i) {
            task = window.THData.Tasks[i];
            // TODO:判断整体状态，比如界面不对的时候要暂停任务
            if (task.type == 'BGCBuild') {
                var status = THBGCBuildTask(task);
                window.THData.Status.BGCStatus = status;
            } else if (task.type == 'JKBuild') {
                var status = THJKBuildTask(task);
                window.THData.Status.JKStatus = status;
            } else if (task.type == 'ZCCBuild') {
                var status = THZCCBuildTask(task);
                window.THData.Status.ZCCStatus = status;
            } else if (task.type == 'FJCBuild') {
                var status = THFJCBuildTask(task);
                window.THData.Status.FJCStatus = status;
            } else if (task.type == 'RadarTask') {
                var status = THRadarTask(task);
            }
        }
    }
    THJKVueUpdate();
    THBGCVueUpdate();
    THZCCVueUpdate();
    THFJCVueUpdate();
}

function taskMainBtnClicked() {
    var taskMainButton = document.getElementById("topwar_helper_taskMainButton");
    if (window.THData.timer != null) {
        clearInterval(window.THData.timer);
        window.THData.timer = null;
        taskMainButton.innerHTML = 'Task is suspended';
    } else {
        window.THData.timer = setInterval(function() { THTaskUpdate(); }, 800);
        taskMainButton.innerHTML = 'Task in progress...';
    }
}

// 这里应该不用区分建筑还是兵营
function THMerge(itemList) {
    var homeMap = cc.find('Canvas/HomeMap').getComponent('HomeMap');
    var ItemMergeController = window.__require('ItemMergeController');

    batchMergeAllItemIds = [];
    for (var i = 0; i < itemList.length; ++i) {
        batchMergeAllItemIds.push(itemList[i].ID);
    }

    // 搞了半天，这个最直接，费劲

    ItemMergeController.ItemMergeController.Instance._batchMergeItemIds = batchMergeAllItemIds;
    ItemMergeController.ItemMergeController.Instance._batchMergeAllItemIds = batchMergeAllItemIds;

    homeMap._processMerge(itemList[0]);
}

function THCloseUI() {
    var obj = document.getElementById("xsLoginDiv");
    obj.removeChild(obj.lastChild);
    obj.style.setProperty("display", "none");
}

// 打开关闭界面都放在这里
function showRightUI() {
    var rightUI = document.getElementById("topwar_helper_rightUI");
    if (rightUI.style.width != "0%") {
        hideRightUI();
        return;
    }

    var rightUI = document.getElementById("topwar_helper_rightUI");
    rightUI.style.width = "20%";
    var headerDiv = document.getElementById("header");
    headerDiv.style.width = "80%";
    canvas.style.width = "80%";
    triggerResize();
}

function showRightUI2() {
    var rightUI = document.getElementById("topwar_helper_rightUI2");
    if (rightUI.style.width != "0%") {
        hideRightUI();
        return;
    }

    var rightUI = document.getElementById("topwar_helper_rightUI2");
    rightUI.style.width = "20%";
    var headerDiv = document.getElementById("header");
    headerDiv.style.width = "80%";
    canvas.style.width = "80%";
    triggerResize();
}

function hideRightUI() {
    var rightUI = document.getElementById("topwar_helper_rightUI");
    rightUI.style.width = "0%";
    var headerDiv = document.getElementById("header");
    headerDiv.style.width = "100%";
    canvas.style.width = "100%";
    triggerResize();
}

function triggerResize() {
    // 为了触发一下，让canvas适应一下
    var e = new Event("resize", { "bubbles": true, "cancelable": true });
    window.dispatchEvent(e);
}

THDataInit();