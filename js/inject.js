

function getArmyInfos() {
    bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
    for (var i = 0; i < bList.length; ++i) {
        b = bList[i]; if (b.name == 'ArmyItem') {
            c = b.getComponent('ArmyItem');
            console.log(c.ItemId);
        }
    }
}

// 所有的function都加TH（TopwarHelper）开头，毕竟是注入代码，为了避免冲突。
function THDataInit() {
    if (window.THData == null) {
        window.THData = {}
        window.THData.timer = setInterval(function() {THTaskUpdate();},500);
    }
}

function THZB() {
    bbIdList = [1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 104011, 104012, 104013, 104014, 104015, 104016, 104017, 104018, 104019, 104020, 104021, 104022, 104023, 104024, 104025, 104026, 104027, 104028, 104029, 104030, 104031, 104032, 104033, 104034, 104035, 104036, 104037, 104038, 104039, 104040, 104041, 104042, 104043, 104044, 104045, 104046, 104047, 104048, 104049, 104050, 104051, 104052, 104053, 104054, 104055, 104056, 104057, 104058, 104059, 104060, 104061, 104062, 104063, 104064, 104065, 104066, 104067, 104068, 104069, 104070, 104071, 104072, 104073, 104074, 104075, 104076, 104077, 104078, 104079, 104080, 104081, 104082, 104083, 104084, 104085, 104086, 104087, 104088, 104089, 104090, 104091, 104092, 104093, 104094, 104095, 104096, 104097, 104098, 104099, 104100]
    bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
    for (var i = 0; i < bList.length; ++i) {
        b = bList[i]; if (b.name == 'BuildingItem') {
            c = b.getComponent('BuildingItem');
            if (bbIdList.includes(c.ItemData.id)) {
                c.OnClickProductOrHarvest();
                c._aniState = false;
            }
        }
    }
};

// 任务调度器
function THTaskUpdate() {
    if (window.THData.Tasks && window.THData.Tasks.length>0){
        for (var i=0;i<window.THData.Tasks.length;++i){
            task = window.THData.Tasks[i];
            // TODO:判断整体状态，比如界面不对的时候要暂停任务
            if (task.type == 'BGCBuild'){
                var status = THBGCBuildTask(task);
                // 目前任务状态写入
                window.THData.Status.BGCStatus = status;
            }else if(task.type == 'JKBuild'){
                var status = THJKBuildTask(task);
                // 目前任务状态写入
                window.THData.Status.JKStatus = status;
            }
        }
    }
    // 更新界面暂时也写在这
    THBGCStatusUpdate();
    THJKStatusUpdate();
}

function taskMainBtnClicked() {
    var taskMainButton = document.getElementById("topwar_helper_taskMainButton");
    if (window.THData.timer != null) {
        clearInterval(window.THData.timer);
        window.THData.timer = null;
        taskMainButton.innerHTML = '任务暂停中';
    }else{
        window.THData.timer = setInterval(function() {THTaskUpdate();},500);
        taskMainButton.innerHTML = '任务进行中';
    }
}

// 任务相关初始化
function taskSystemInit() {
    // 任务列表
    if (window.THData.Tasks == null) {
        window.THData.Tasks = [];
    }

    var rootDiv = document.getElementById("topwar_helper_rootDiv");
    var taskRootDiv = document.createElement("div");
    taskRootDiv.id = 'topwar_helper_taskRootDiv';
    taskMainButton = document.createElement("button");
    taskMainButton.id = 'topwar_helper_taskMainButton';
    taskMainButton.innerHTML = '任务进行中';
    if (window.THData.timer == null){
        taskMainButton.innerHTML = '任务暂停中';
    }
    taskMainButton.setAttribute("onclick", "taskMainBtnClicked()");
    taskRootDiv.append(taskMainButton);
    rootDiv.append(taskRootDiv);
}
function statusSystemInit() {
    // 暂时只是一个记录状态的map
    if (window.THData.Status == null){
        window.THData.Status = {};
    }
}

// 这里应该不用区分建筑还是兵营
function THMerge(itemList) {
    var homeMap = cc.find('Canvas/HomeMap').getComponent('HomeMap');
    var ItemMergeController = window.__require('ItemMergeController');

    batchMergeAllItemIds = [];
    for (var i = 0; i <itemList.length;++i){
        batchMergeAllItemIds.push(itemList[i].ID);
    }

    // 搞了半天，这个最直接，费劲
    
    ItemMergeController.ItemMergeController.Instance._batchMergeItemIds=batchMergeAllItemIds;
    ItemMergeController.ItemMergeController.Instance._batchMergeAllItemIds=batchMergeAllItemIds;
    
    homeMap._processMerge(itemList[0]);
}

function THCloseUI() {
    var obj = document.getElementById("xsLoginDiv");
    obj.removeChild(obj.lastChild);
    obj.style.setProperty("display","none");
}