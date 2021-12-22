function test() {
    var canvas = document.getElementById('canvas');
    var parentNode = canvas.parentNode;
    canvas.style.setProperty('width','80%');
    var newNode = document.createElement('div');
    newNode.innerHTML = '<h1>123</h1>';
    parentNode.insertBefore(newNode,canvas);
}

// 获取兵营信息
function THGetBGCinfos() {
    ret = [];
    if (!cc.find('Canvas/HomeMap')){
        return ret;
    }
    // bbIdList = [1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 104011, 104012, 104013, 104014, 104015, 104016, 104017, 104018, 104019, 104020, 104021, 104022, 104023, 104024, 104025, 104026, 104027, 104028, 104029, 104030, 104031, 104032, 104033, 104034, 104035, 104036, 104037, 104038, 104039, 104040, 104041, 104042, 104043, 104044, 104045, 104046, 104047, 104048, 104049, 104050, 104051, 104052, 104053, 104054, 104055, 104056, 104057, 104058, 104059, 104060, 104061, 104062, 104063, 104064, 104065, 104066, 104067, 104068, 104069, 104070, 104071, 104072, 104073, 104074, 104075, 104076, 104077, 104078, 104079, 104080, 104081, 104082, 104083, 104084, 104085, 104086, 104087, 104088, 104089, 104090, 104091, 104092, 104093, 104094, 104095, 104096, 104097, 104098, 104099, 104100]
    for(var i = 0; i <THBGCIdList.length;++i){
        ret[i] = 0;
    }
    bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
    for (var i = 0; i < bList.length; ++i) {
        b = bList[i]; if (b.name == 'BuildingItem') {
            c = b.getComponent('BuildingItem');
            index = THBGCIdList.indexOf(c.ItemData.id);
            if (index<0){
                continue;
            }
            ret[index] += 1;
        }
    }
    // console.log(ret)
    return ret;
}
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

// 获得兵工厂科技等级，返回(合成等级,建造等级)
function THGetBGCKJ() {
    var dataCenter = window.__require('DataCenter');
    var maxLevel = dataCenter.DATA.UserData.getScienceByGroupId(311000)._Data.level;
    var buildLevel = dataCenter.DATA.UserData.getScienceByGroupId(301000)._Data.level;
    return [maxLevel,buildLevel];
}


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
            }
        }
    }
    // 更新界面暂时也写在这
    THBGCStatusUpdate();
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
// 显示主界面
function showMainUI() {
    THDataInit();
    var parentNode = document.getElementById("xsLoginDiv");
    var rootDiv = document.createElement("div");
    rootDiv.id = 'topwar_helper_rootDiv';
    rootDiv.style.width='600px';
    rootDiv.style.height='600px';
    rootDiv.style.background='white';
    rootDiv.style.opacity='0.9';
    parentNode.append(rootDiv);
    parentNode.style.setProperty('display','block');

    statusSystemInit();
    taskSystemInit();
    // // 临时功能
    // tmpZBButton = document.createElement("button");
    // tmpZBButton.id = 'topwar_helper_tmpZBButton';
    // tmpZBButton.innerHTML = '所有兵营统一造兵';
    // tmpZBButton.setAttribute("onclick", "THZB()");
    // rootDiv.append(tmpZBButton);
    // // 获得军队信息
    // tmpButton01 = document.createElement("button");
    // tmpButton01.id = 'topwar_helper_tmpButton01';
    // tmpButton01.innerHTML = 'test01';
    // tmpButton01.setAttribute("onclick", "getArmyInfos()");
    // rootDiv.append(tmpButton01);

    // 如果有必要，把其他弹出界面先关了
    if (cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT') && cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT').getChildrenCount() > 0){
        cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT').getChildren()[0].getComponent('DialogContentComponent').close()
    }

    THBGCDivInit();
}

function BGCTaskButtonClicked() {
    var BGCTaskInput = document.getElementById('topwar_helper_BGCTaskInput');("input");
    // 找到旧的同类任务，删掉然后添加新的
    for (var i = 0; i <window.THData.Tasks.length;++i){
        task = window.THData.Tasks[i];
        if (task.type == 'BGCBuild') {
            window.THData.Tasks.splice(i, 1);
            break;
        }
    }

    newTask = {
        type : 'BGCBuild',
        level: THGetBGCKJ()[0],
        count: parseInt(BGCTaskInput.value) 
    }
    window.THData.Tasks.push(newTask);
}

// 兵工厂
function THBGCDivInit() {
    // 底板
    var parentNode = document.getElementById("topwar_helper_rootDiv");
    var BGCDiv = document.createElement("div");
    BGCDiv.id = 'topwar_helper_BGCDiv';
    BGCDiv.style.width='400px';
    BGCDiv.style.height='500px';
    BGCDiv.style.background='pink';
    parentNode.append(BGCDiv);
    
    var BGCTitle = document.createElement("h3");
    BGCTitle.style.margin='8px';
    BGCTitle.innerHTML = '兵工厂';
    BGCDiv.append(BGCTitle);

    // 科技
    var [BGCMaxLevel,BGCBuildLevel] = THGetBGCKJ();
    {
        console.log(BGCMaxLevel,BGCBuildLevel);
        var BGCKJDiv = document.createElement("div");
        BGCKJDiv.id = 'topwar_helper_BGCKJDiv';
        BGCKJDiv.style.width='200px';
        BGCKJDiv.style.height='80px';
        BGCKJDiv.style.background='white';
        BGCDiv.append(BGCKJDiv);
    
        var BGCKJTitle = document.createElement("h4");
        BGCKJTitle.style.margin='8px';
        BGCKJTitle.innerHTML = '科技';
        BGCKJDiv.append(BGCKJTitle);
    
        var BGCBuildLevelLabel = document.createElement("h5");
        BGCBuildLevelLabel.style.margin='0px';
        BGCBuildLevelLabel.innerHTML = '兵工厂建造等级:'+BGCBuildLevel;
        BGCKJDiv.append(BGCBuildLevelLabel);
    
        var BGCMaxLevelLabel = document.createElement("h5");
        BGCMaxLevelLabel.style.margin='0px';
        BGCMaxLevelLabel.innerHTML = '兵工厂合成等级:'+BGCMaxLevel;
        BGCKJDiv.append(BGCMaxLevelLabel);
    }
    
    // 当前状态
    var bgcInfos = THGetBGCinfos();
    {
        var BGCInfoDiv = document.createElement("div");
        BGCInfoDiv.id = 'topwar_helper_BGCInfoDiv';
        BGCInfoDiv.style.width='200px';
        BGCInfoDiv.style.height='200px';
        BGCInfoDiv.style.background='white';
        BGCDiv.append(BGCInfoDiv);

        var BGCInfoTitle = document.createElement("h4");
        BGCInfoTitle.style.margin='8px';
        BGCInfoTitle.innerHTML = '目前状态';
        BGCInfoDiv.append(BGCInfoTitle);

        for (var i=0;i<bgcInfos.length; ++i){
            if (bgcInfos[i]>0){
                var level = i+1;

                var label = document.createElement("h5");
                label.style.margin='0px';
                label.innerHTML = '等级:'+level+'->数量:'+bgcInfos[i];
                BGCInfoDiv.append(label);
            }
        }
    }

    // 制造任务
    {
        var BGCTaskDiv = document.createElement("div");
        BGCTaskDiv.id = 'topwar_helper_BGCTaskDiv';
        BGCTaskDiv.style.width='200px';
        BGCTaskDiv.style.height='100px';
        BGCTaskDiv.style.background='white';
        BGCDiv.append(BGCTaskDiv);

        var BGCTaskTitle = document.createElement("h4");
        BGCTaskTitle.style.margin='8px';
        BGCTaskTitle.innerHTML = '建造任务';
        BGCTaskDiv.append(BGCTaskTitle);

        var BGCTaskDescribtion = document.createElement("h6");
        BGCTaskDescribtion.style.margin='0px';
        BGCTaskDescribtion.innerHTML = '建造最高级兵工厂至下面数量';
        BGCTaskDiv.append(BGCTaskDescribtion);

        var BGCTaskInput = document.createElement("input");
        BGCTaskInput.type = 'text';
        BGCTaskInput.id = 'topwar_helper_BGCTaskInput';
        BGCTaskInput.value = bgcInfos[BGCMaxLevel-1];
        BGCTaskDiv.append(BGCTaskInput);

        BGCTaskButton = document.createElement("button");
        BGCTaskButton.id = 'topwar_helper_BGCTaskButton';
        BGCTaskButton.innerHTML = '下发任务';
        BGCTaskButton.setAttribute("onclick", "BGCTaskButtonClicked()");
        BGCTaskDiv.append(BGCTaskButton);        
    }
}

// 更新兵工厂状态，更新到界面，如果有
function THBGCStatusUpdate() {
    var BGCInfoDiv = document.getElementById('topwar_helper_BGCInfoDiv');
    if (!BGCInfoDiv) {
        return;
    }
    var bgcInfos = THGetBGCinfos();
    var ndList = BGCInfoDiv.childNodes;
    // 清楚旧内容第一个是标题，不用更新
    for (var i = ndList.length-1; i >0; i--) {
        BGCInfoDiv.removeChild(ndList[i]);
    }
    // 添加新内容
    for (var i=0;i<bgcInfos.length; ++i){
        if (bgcInfos[i]>0){
            var level = i+1;

            var label = document.createElement("h5");
            label.style.margin='0px';
            label.innerHTML = '等级:'+level+'->数量:'+bgcInfos[i];
            BGCInfoDiv.append(label);
        }
    }

    if (window.THData.Status.BGCStatus) {
        var label = document.createElement("h5");
        label.style.margin='0px';
        label.innerHTML = window.THData.Status.BGCStatus;
        BGCInfoDiv.append(label);
    }
}

// 兵营Id列表，找策划要的
const THBGCIdList = [1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 104011, 104012, 104013, 104014, 104015, 104016, 104017, 104018, 104019, 104020, 104021, 104022, 104023, 104024, 104025, 104026, 104027, 104028, 104029, 104030, 104031, 104032, 104033, 104034, 104035, 104036, 104037, 104038, 104039, 104040, 104041, 104042, 104043, 104044, 104045, 104046, 104047, 104048, 104049, 104050, 104051, 104052, 104053, 104054, 104055, 104056, 104057, 104058, 104059, 104060, 104061, 104062, 104063, 104064, 104065, 104066, 104067, 104068, 104069, 104070, 104071, 104072, 104073, 104074, 104075, 104076, 104077, 104078, 104079, 104080, 104081, 104082, 104083, 104084, 104085, 104086, 104087, 104088, 104089, 104090, 104091, 104092, 104093, 104094, 104095, 104096, 104097, 104098, 104099, 104100];

// 处理建造兵工厂的任务
function THBGCBuildTask(task) {
    var status = '任务进行中';
    var homeMapNode = cc.find('Canvas/HomeMap');
    if (!homeMapNode) {
        status = '界面不对，暂停工作';
        return status;
    }
    var homeMap = cc.find('Canvas/HomeMap').getComponent('HomeMap');
    // 如果目前有多余的正准备添加建筑，就取消掉
    if (c.AddingItem) {
        c.CancelBuildBuilding(c.AddingItem);
    }
    // 如果已有足够多的兵工厂，任务结束
    var bgcInfos = THGetBGCinfos();
    if (bgcInfos[task.level-1]>= task.count){
        // console.log("任务完成");
        status = '任务完成';
        for (var i = 0; i <window.THData.Tasks.length;++i){
            task = window.THData.Tasks[i];
            if (task.type == 'BGCBuild') {
                window.THData.Tasks.splice(i, 1);
                break;
            }
        }
        return status;
    }
    
    var canMergeBGCId = 0;
    // 从低级开始到合成等级的前一级，找到能合并的兵工厂
    for (var i = 0; i < task.level-1;++i){
        if (bgcInfos[i]>1) {
            canMergeBGCId = THBGCIdList[i];
            break;
        }
    }
    if (canMergeBGCId > 0) {
        // console.log('try 2 merge');
        status = '合并中';
        var itemList = [];
        // 如果有可以合成的兵工厂，就合成
        var bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
        for (var i = 0; i < bList.length; ++i) {
            b = bList[i]; 
            if (b.name == 'BuildingItem') {
                c = b.getComponent('BuildingItem');
                if (c.ItemData.id == canMergeBGCId){ 
                    if (c._curProNum > 0) {
                        status = '正在造兵，暂停工作';
                        // 正在造兵，那就暂停目前任务
                        return status;
                    }
                    itemList.push(c);
                }
            }
        }
        merge(itemList);
    }else {
        status = '建造中';
        // console.log('try 2 build');
        // 不能合成就要建造一个目前可以建造的兵工厂
        // 其实目前可以调接口建更低级的，但是暂时不考虑等级比目前建造等级还低的，没需求
        var [BGCMaxLevel,BGCBuildLevel] = THGetBGCKJ();
        var buidingId =  THBGCIdList[BGCBuildLevel-1];
        homeMap.BuildNewBuilding(buidingId,-1,true);
        homeMap.BuildNewBuilding(buidingId,-1,true);
    }
    return status;
}

// 这里应该不用区分建筑还是兵营
function merge(itemList) {
    var homeMap = cc.find('Canvas/HomeMap').getComponent('HomeMap');
    var ItemMergeController = window.__require('ItemMergeController');

    batchMergeAllItemIds = [];
    for (var i = 0; i <itemList.length;++i){
        batchMergeAllItemIds.push(itemList[i].ID);
    }

    // 搞了半天，这个最直接，这是费劲
    
    ItemMergeController.ItemMergeController.Instance._batchMergeItemIds=batchMergeAllItemIds;
    ItemMergeController.ItemMergeController.Instance._batchMergeAllItemIds=batchMergeAllItemIds;
    
    homeMap._processMerge(itemList[0]);
}