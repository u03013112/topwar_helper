// 兵营Id列表，找策划要的
const THBGCIdList = [1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 104011, 104012, 104013, 104014, 104015, 104016, 104017, 104018, 104019, 104020, 104021, 104022, 104023, 104024, 104025, 104026, 104027, 104028, 104029, 104030, 104031, 104032, 104033, 104034, 104035, 104036, 104037, 104038, 104039, 104040, 104041, 104042, 104043, 104044, 104045, 104046, 104047, 104048, 104049, 104050, 104051, 104052, 104053, 104054, 104055, 104056, 104057, 104058, 104059, 104060, 104061, 104062, 104063, 104064, 104065, 104066, 104067, 104068, 104069, 104070, 104071, 104072, 104073, 104074, 104075, 104076, 104077, 104078, 104079, 104080, 104081, 104082, 104083, 104084, 104085, 104086, 104087, 104088, 104089, 104090, 104091, 104092, 104093, 104094, 104095, 104096, 104097, 104098, 104099, 104100];

// 获取兵营信息
function THGetBGCinfos() {
    ret = [];
    if (!cc.find('Canvas/HomeMap')) {
        return ret;
    }
    for (var i = 0; i < THBGCIdList.length; ++i) {
        ret[i] = 0;
    }
    bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
    for (var i = 0; i < bList.length; ++i) {
        b = bList[i];
        if (b.name == 'BuildingItem') {
            c = b.getComponent('BuildingItem');
            index = THBGCIdList.indexOf(c.ItemData.id);
            if (index < 0) {
                continue;
            }
            ret[index] += 1;
        }
    }
    return ret;
}

// 获得Barracks科技等级，返回( Merge level, Building level)
function THGetBGCKJ() {
    var dataCenter = window.__require('DataCenter');
    if (!dataCenter.DATA.UserData.getScienceByGroupId(311000)) {
        // 不能获得用户科技，大概率是没有登录成功
        return;
    }
    var maxLevel = dataCenter.DATA.UserData.getScienceByGroupId(311000)._Data.level;
    var buildLevel = dataCenter.DATA.UserData.getScienceByGroupId(301000)._Data.level;
    return [maxLevel, buildLevel];
}

// 显示主界面
// function showBGCUI() {
//     // 如果截面已打开，就关上
//     var rootDiv = document.getElementById('topwar_helper_rootDiv');
//     if (rootDiv) {
//         THCloseUI();
//         // return;
//     }
//     THDataInit();
//     var parentNode = document.getElementById("xsLoginDiv");
//     rootDiv = document.createElement("div");
//     rootDiv.id = 'topwar_helper_rootDiv';
//     rootDiv.style.width = '400px';
//     rootDiv.style.height = '320px';
//     rootDiv.style.background = 'white';
//     rootDiv.style.opacity = '0.9';
//     parentNode.append(rootDiv);
//     parentNode.style.setProperty('display', 'block');

//     statusSystemInit();
//     taskSystemInit();

//     // 如果有必要，把其他弹出界面先关了
//     if (cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT') && cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT').getChildrenCount() > 0) {
//         cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT').getChildren()[0].getComponent('DialogContentComponent').close()
//     }

//     THBGCDivInit();

//     // 造兵按钮
//     BGCZBButton = document.createElement("button");
//     BGCZBButton.id = 'topwar_helper_BGCZBButton';
//     BGCZBButton.style.margin = '5px';
//     BGCZBButton.innerHTML = 'Train soldiers together!';
//     if (window.THData.timer == null) {
//         BGCZBButton.innerHTML = 'Task is suspended';
//     }
//     BGCZBButton.setAttribute("onclick", "THBGCZB()");
//     rootDiv.append(BGCZBButton);
// }

// function THBGCDivInit() {
//     // 底板
//     var parentNode = document.getElementById("topwar_helper_rootDiv");
//     var BGCDiv = document.createElement("div");
//     BGCDiv.id = 'topwar_helper_BGCDiv';
//     BGCDiv.style.width = '400px';
//     BGCDiv.style.height = '260px';
//     BGCDiv.style.background = 'pink';
//     parentNode.append(BGCDiv);

//     var BGCTitle = document.createElement("h3");
//     BGCTitle.style.margin = '4px';
//     BGCTitle.innerHTML = 'Barracks';
//     BGCDiv.append(BGCTitle);

//     var BGCContentDiv = document.createElement("div");
//     BGCContentDiv.id = 'topwar_helper_BGCContentDiv';
//     BGCContentDiv.style.width = '390px';
//     BGCContentDiv.style.height = '210px';
//     BGCContentDiv.style.background = 'pink';
//     BGCContentDiv.style.display = 'flex';
//     BGCContentDiv.style.padding = '5px';
//     BGCDiv.append(BGCContentDiv);

//     // 简单排版
//     var BGCLeftDiv = document.createElement("div");
//     BGCLeftDiv.id = 'topwar_helper_BGCLeftDiv';
//     BGCLeftDiv.style.width = '185px';
//     BGCLeftDiv.style.height = '200px';
//     BGCLeftDiv.style.background = 'pink';
//     BGCLeftDiv.style.padding = '5px';
//     BGCContentDiv.append(BGCLeftDiv);

//     var BGCRightDiv = document.createElement("div");
//     BGCRightDiv.id = 'topwar_helper_BGCRightDiv';
//     BGCRightDiv.style.width = '185px';
//     BGCRightDiv.style.height = '200px';
//     BGCRightDiv.style.background = 'pink';
//     BGCRightDiv.style.padding = '5px';
//     BGCContentDiv.append(BGCRightDiv);

//     // Technology
//     var [BGCMaxLevel, BGCBuildLevel] = THGetBGCKJ();
//     {
//         // console.log(BGCMaxLevel,BGCBuildLevel);
//         var BGCKJDiv = document.createElement("div");
//         BGCKJDiv.id = 'topwar_helper_BGCKJDiv';
//         BGCKJDiv.style.width = '185px';
//         BGCKJDiv.style.height = '80px';
//         BGCKJDiv.style.background = 'white';
//         BGCLeftDiv.append(BGCKJDiv);

//         var BGCKJTitle = document.createElement("h4");
//         BGCKJTitle.style.margin = '8px';
//         BGCKJTitle.innerHTML = 'Technology';
//         BGCKJDiv.append(BGCKJTitle);

//         var BGCBuildLevelLabel = document.createElement("h5");
//         BGCBuildLevelLabel.style.margin = '0px';
//         BGCBuildLevelLabel.innerHTML = 'Barracks building level:' + BGCBuildLevel;
//         BGCKJDiv.append(BGCBuildLevelLabel);

//         var BGCMaxLevelLabel = document.createElement("h5");
//         BGCMaxLevelLabel.style.margin = '0px';
//         BGCMaxLevelLabel.innerHTML = 'Barracks merge level:' + BGCMaxLevel;
//         BGCKJDiv.append(BGCMaxLevelLabel);
//     }

//     // 当前状态
//     var bgcInfos = THGetBGCinfos();
//     {
//         var BGCInfoDiv = document.createElement("div");
//         BGCInfoDiv.id = 'topwar_helper_BGCInfoDiv';
//         BGCInfoDiv.style.width = '185px';
//         BGCInfoDiv.style.height = '210px';
//         BGCInfoDiv.style.background = 'white';
//         BGCRightDiv.append(BGCInfoDiv);

//         var BGCInfoTitle = document.createElement("h4");
//         BGCInfoTitle.style.margin = '8px';
//         BGCInfoTitle.innerHTML = 'Status';
//         BGCInfoDiv.append(BGCInfoTitle);

//         for (var i = 0; i < bgcInfos.length; ++i) {
//             if (bgcInfos[i] > 0) {
//                 var level = i + 1;

//                 var label = document.createElement("h5");
//                 label.style.margin = '0px';
//                 label.innerHTML = 'Level:' + level + ' count:' + bgcInfos[i];
//                 BGCInfoDiv.append(label);
//             }
//         }
//     }

//     // 制造任务
//     {
//         var BGCTaskDiv = document.createElement("div");
//         BGCTaskDiv.id = 'topwar_helper_BGCTaskDiv';
//         BGCTaskDiv.style.width = '185px';
//         BGCTaskDiv.style.height = '120px';
//         BGCTaskDiv.style.background = 'white';
//         BGCLeftDiv.append(BGCTaskDiv);

//         var BGCTaskTitle = document.createElement("h4");
//         BGCTaskTitle.style.margin = '8px';
//         BGCTaskTitle.innerHTML = 'Build task';
//         BGCTaskDiv.append(BGCTaskTitle);

//         var BGCTaskDescribtion = document.createElement("h6");
//         BGCTaskDescribtion.style.margin = '0px';
//         BGCTaskDescribtion.innerHTML = 'Build Barracks level ' + BGCMaxLevel + ' to the following quantity';
//         BGCTaskDiv.append(BGCTaskDescribtion);

//         var BGCTaskInputLabel = document.createElement("h6");
//         BGCTaskInputLabel.style.margin = '0px';
//         BGCTaskInputLabel.innerHTML = bgcInfos[BGCMaxLevel - 1];
//         BGCTaskDiv.append(BGCTaskInputLabel);

//         var BGCTaskInput = document.createElement("input");
//         BGCTaskInput.id = 'topwar_helper_BGCTaskInput';
//         BGCTaskInput.type = 'range';
//         BGCTaskInput.min = bgcInfos[BGCMaxLevel - 1];
//         BGCTaskInput.max = "16";
//         BGCTaskInput.value = bgcInfos[BGCMaxLevel - 1];
//         BGCTaskInput.oninput = function () {
//             BGCTaskInputLabel.innerHTML = this.value;
//         }
//         BGCTaskDiv.append(BGCTaskInput);

//         BGCTaskButton = document.createElement("button");
//         BGCTaskButton.id = 'topwar_helper_BGCTaskButton';
//         BGCTaskButton.innerHTML = 'Dispatch a task';
//         BGCTaskButton.setAttribute("onclick", "BGCTaskButtonClicked()");
//         BGCTaskDiv.append(BGCTaskButton);
//     }
// }

function THBGCVueUpdate() {
    var [BGCMaxLevel, BGCBuildLevel] = THGetBGCKJ();
    window.THVueApp.barrack.buildingLevel = BGCBuildLevel;
    window.THVueApp.barrack.mergeLevel = BGCMaxLevel;

    var bgcInfos = THGetBGCinfos();
    window.THVueApp.barrack.statusStrs = []
    for (var i = 0; i < bgcInfos.length; ++i) {
        if (bgcInfos[i] > 0) {
            var level = i + 1;
            if (window.THVueApp.barrack.nowMaxLevel < level) {
                // 给目前最大等级赋值，为了可以提示红点
                window.THVueApp.barrack.nowMaxLevel = level;
            }
            statusStr = { text: 'Level:' + level + ' count:' + bgcInfos[i] };
            window.THVueApp.barrack.statusStrs.push(statusStr);
        }
    }
    if (window.THData.Status.BGCStatus) {
        window.THVueApp.barrack.statusStrs.push({ text: window.THData.Status.BGCStatus });
    }
}

// 更新Barracks状态，更新到界面，如果有
// function THBGCStatusUpdate() {
//     var BGCInfoDiv = document.getElementById('topwar_helper_BGCInfoDiv');
//     if (!BGCInfoDiv) {
//         return;
//     }
//     var bgcInfos = THGetBGCinfos();
//     var ndList = BGCInfoDiv.childNodes;
//     // 清楚旧内容第一个是标题，不用更新
//     for (var i = ndList.length - 1; i > 0; i--) {
//         BGCInfoDiv.removeChild(ndList[i]);
//     }
//     // 添加新内容
//     for (var i = 0; i < bgcInfos.length; ++i) {
//         if (bgcInfos[i] > 0) {
//             var level = i + 1;

//             var label = document.createElement("h5");
//             label.style.margin = '0px';
//             label.innerHTML = 'Level ' + level + ' count:' + bgcInfos[i];
//             BGCInfoDiv.append(label);
//         }
//     }

//     if (window.THData.Status.BGCStatus) {
//         var label = document.createElement("h5");
//         label.style.margin = '0px';
//         label.innerHTML = window.THData.Status.BGCStatus;
//         BGCInfoDiv.append(label);
//     }
// }

// 处理建造Barracks的任务
function THBGCBuildTask(task) {
    var status = 'Task in progress...';
    var homeMapNode = cc.find('Canvas/HomeMap');
    if (!homeMapNode) {
        status = 'Not in the Base interface, suspended work';
        return status;
    }
    var homeMap = cc.find('Canvas/HomeMap').getComponent('HomeMap');
    // 如果目前有多余的正准备添加建筑，就取消掉
    if (c.AddingItem) {
        c.CancelBuildBuilding(c.AddingItem);
    }
    // 如果已有足够多的Barracks，任务结束
    var bgcInfos = THGetBGCinfos();
    if (bgcInfos[task.level - 1] >= task.count) {
        // console.log("mission completed");
        status = 'mission completed';
        THBGCTaskStop();
        return status;
    }

    var canMergeBGCId = 0;
    // 从低级开始到 Merge level的前一级，找到能合并的Barracks
    for (var i = 0; i < task.level - 1; ++i) {
        if (bgcInfos[i] > 1) {
            canMergeBGCId = THBGCIdList[i];
            break;
        }
    }
    if (canMergeBGCId > 0) {
        // console.log('try 2 merge');
        status = 'Merging';
        var itemList = [];
        // 如果有可以合成的Barracks，就合成
        var bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
        for (var i = 0; i < bList.length; ++i) {
            b = bList[i];
            if (b.name == 'BuildingItem') {
                c = b.getComponent('BuildingItem');
                if (c.ItemData.id == canMergeBGCId) {
                    if (c._curProNum > 0) {
                        status = 'Is building troops, suspended work';
                        // 正在造兵，那就暂停目前任务
                        THBGCTaskStop();
                        return status;
                    }
                    itemList.push(c);
                }
            }
        }
        THMerge(itemList);
    } else {
        status = 'Building';
        // console.log('try 2 build');
        // 不能合成就要建造一个目前可以建造的Barracks
        // 其实目前可以调接口建更低级的，但是暂时不考虑等级比目前 Building level还低的，没需求
        var [BGCMaxLevel, BGCBuildLevel] = THGetBGCKJ();
        var buidingId = THBGCIdList[BGCBuildLevel - 1];
        homeMap.BuildNewBuilding(buidingId, -1, true);
        homeMap.BuildNewBuilding(buidingId, -1, true);
    }
    return status;
}

function BGCTaskButtonClicked() {
    gtag && gtag('event', 'BGCTaskButtonClicked', { 'send_to': 'G-EGJ78MKRZC' });
    var count = window.THVueApp.barrack.buildCount;
    if (count == NaN) {
        // 输入的不是数字
        return;
    }
    THBGCTaskStop();

    newTask = {
        type: 'BGCBuild',
        level: THGetBGCKJ()[0],
        count: count
    }
    window.THData.Tasks.push(newTask);
}

function THBGCTaskStop() {
    for (var i = 0; i < window.THData.Tasks.length; ++i) {
        var task = window.THData.Tasks[i];
        if (task.type == 'BGCBuild') {
            window.THData.Tasks.splice(i, 1);
            break;
        }
    }
}

// 造兵，每一个Barracks都尝试造一个兵，会受到各种限制，可能导致部分失败，这个不好改
// function THBGCZB() {
//     bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
//     for (var i = 0; i < bList.length; ++i) {
//         b = bList[i]; if (b.name == 'BuildingItem') {
//             c = b.getComponent('BuildingItem');
//             if (THBGCIdList.includes(c.ItemData.id)) {
//                 c.OnClickProductOrHarvest();
//                 c._aniState = false;
//             }
//         }
//     }
// };

document.addEventListener('enableFeature', function(e) {
    console.log('enableFeature');
    var btn = document.getElementById('THHelperButton');
    if (btn.style.display == 'block') {
        btn.style.display = 'none';
    } else {
        btn.style.display = 'block';
    }

});