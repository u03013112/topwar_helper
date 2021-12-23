

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
        window.THData.timer = setInterval(function() {THTaskUpdate();},800);
    }
}

// 任务调度器
function THTaskUpdate() {
    if (window.THData.Tasks && window.THData.Tasks.length>0){
        for (var i=0;i<window.THData.Tasks.length;++i){
            task = window.THData.Tasks[i];
            // TODO:判断整体状态，比如界面不对的时候要暂停任务
            if (task.type == 'BGCBuild'){
                var status = THBGCBuildTask(task);
                window.THData.Status.BGCStatus = status;
            }else if(task.type == 'JKBuild'){
                var status = THJKBuildTask(task);
                window.THData.Status.JKStatus = status;
            }else if(task.type == 'ZCCBuild'){
                var status = THZCCBuildTask(task);
                window.THData.Status.ZCCStatus = status;
            }
        }
    }
    // 更新界面暂时也写在这
    THBGCStatusUpdate();
    THJKStatusUpdate();
    THZCCStatusUpdate();
}

function taskMainBtnClicked() {
    var taskMainButton = document.getElementById("topwar_helper_taskMainButton");
    if (window.THData.timer != null) {
        clearInterval(window.THData.timer);
        window.THData.timer = null;
        taskMainButton.innerHTML = '任务暂停中';
    }else{
        window.THData.timer = setInterval(function() {THTaskUpdate();},800);
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