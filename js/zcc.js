// 造船厂Id列表，找策划要的
const THZCCIdList = [1101,1102,1103,1104,1105,1106,1107,1108,1109,1110,110011,110012,110013,110014,110015,110016,110017,110018,110019,110020,110021,110022,110023,110024,110025,110026,110027,110028,110029,110030,110031,110032,110033,110034,110035,110036,110037,110038,110039,110040,110041,110042,110043,110044,110045,110046,110047,110048,110049,110050,110051,110052,110053,110054,110055,110056,110057,110058,110059,110060,110061,110062,110063,110064,110065,110066,110067,110068,110069,110070,110071,110072,110073,110074,110075,110076,110077,110078,110079,110080,110081,110082,110083,110084,110085,110086,110087,110088,110089,110090,110091,110092,110093,110094,110095,110096,110097,110098,110099,110100];

// 获取造船厂信息
function THGetZCCinfos() {
    ret = [];
    if (!cc.find('Canvas/HomeMap')){
        return ret;
    }
    for(var i = 0; i <THZCCIdList.length;++i){
        ret[i] = 0;
    }
    bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
    for (var i = 0; i < bList.length; ++i) {
        b = bList[i]; if (b.name == 'BuildingItem') {
            c = b.getComponent('BuildingItem');
            index = THZCCIdList.indexOf(c.ItemData.id);
            if (index<0){
                continue;
            }
            ret[index] += 1;
        }
    }
    return ret;
}

// 获得造船厂科技等级，返回(合成等级,建造等级)
function THGetZCCKJ() {
    var dataCenter = window.__require('DataCenter');
    if(!dataCenter.DATA.UserData.getScienceByGroupId(310000)){
        // 不能获得用户科技，大概率是没有登录成功
        return;
    }
    var maxLevel = dataCenter.DATA.UserData.getScienceByGroupId(312000)._Data.level;
    var buildLevel = dataCenter.DATA.UserData.getScienceByGroupId(302000)._Data.level;
    return [maxLevel,buildLevel];
}

// 显示主界面
function showZCCUI() {
    // 如果截面已打开，就关上
    var rootDiv = document.getElementById('topwar_helper_rootDiv');
    if (rootDiv){
        THCloseUI();
        return;
    }
    THDataInit();
    var parentNode = document.getElementById("xsLoginDiv");
    rootDiv = document.createElement("div");
    rootDiv.id = 'topwar_helper_rootDiv';
    rootDiv.style.width='400px';
    rootDiv.style.height='320px';
    rootDiv.style.background='white';
    rootDiv.style.opacity='0.9';
    parentNode.append(rootDiv);
    parentNode.style.setProperty('display','block');

    statusSystemInit();
    taskSystemInit();
    
    // 如果有必要，把其他弹出界面先关了
    if (cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT') && cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT').getChildrenCount() > 0){
        cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT').getChildren()[0].getComponent('DialogContentComponent').close()
    }

    THZCCDivInit();

    // 造兵按钮
    ZCCZBButton = document.createElement("button");
    ZCCZBButton.id = 'topwar_helper_ZCCZBButton';
    ZCCZBButton.innerHTML = '一起造兵!';
    if (window.THData.timer == null){
        ZCCZBButton.innerHTML = '任务暂停中';
    }
    ZCCZBButton.setAttribute("onclick", "THZCCZB()");
    rootDiv.append(ZCCZBButton);
}

function THZCCDivInit() {
    // 底板
    var parentNode = document.getElementById("topwar_helper_rootDiv");
    var ZCCDiv = document.createElement("div");
    ZCCDiv.id = 'topwar_helper_ZCCDiv';
    ZCCDiv.style.width='400px';
    ZCCDiv.style.height='260px';
    ZCCDiv.style.background='pink';
    parentNode.append(ZCCDiv);
    
    var ZCCTitle = document.createElement("h3");
    ZCCTitle.style.margin='4px';
    ZCCTitle.innerHTML = '造船厂';
    ZCCDiv.append(ZCCTitle);
    
    var ZCCContentDiv = document.createElement("div");
    ZCCContentDiv.id = 'topwar_helper_ZCCContentDiv';
    ZCCContentDiv.style.width='390px';
    ZCCContentDiv.style.height='210px';
    ZCCContentDiv.style.background='pink';
    ZCCContentDiv.style.display='flex';
    ZCCContentDiv.style.padding='5px';
    ZCCDiv.append(ZCCContentDiv);

    // 简单排版
    var ZCCLeftDiv = document.createElement("div");
    ZCCLeftDiv.id = 'topwar_helper_ZCCLeftDiv';
    ZCCLeftDiv.style.width='185px';
    ZCCLeftDiv.style.height='200px';
    ZCCLeftDiv.style.background='pink';
    ZCCLeftDiv.style.padding='5px';
    ZCCContentDiv.append(ZCCLeftDiv);

    var ZCCRightDiv = document.createElement("div");
    ZCCRightDiv.id = 'topwar_helper_ZCCRightDiv';
    ZCCRightDiv.style.width='185px';
    ZCCRightDiv.style.height='200px';
    ZCCRightDiv.style.background='pink';
    ZCCRightDiv.style.padding='5px';
    ZCCContentDiv.append(ZCCRightDiv);

    // 科技
    var [ZCCMaxLevel,ZCCBuildLevel] = THGetZCCKJ();
    {
        // console.log(ZCCMaxLevel,ZCCBuildLevel);
        var ZCCKJDiv = document.createElement("div");
        ZCCKJDiv.id = 'topwar_helper_ZCCKJDiv';
        ZCCKJDiv.style.width='185px';
        ZCCKJDiv.style.height='80px';
        ZCCKJDiv.style.background='white';
        ZCCLeftDiv.append(ZCCKJDiv);
    
        var ZCCKJTitle = document.createElement("h4");
        ZCCKJTitle.style.margin='8px';
        ZCCKJTitle.innerHTML = '科技';
        ZCCKJDiv.append(ZCCKJTitle);
    
        var ZCCBuildLevelLabel = document.createElement("h5");
        ZCCBuildLevelLabel.style.margin='0px';
        ZCCBuildLevelLabel.innerHTML = '造船厂建造等级:'+ZCCBuildLevel;
        ZCCKJDiv.append(ZCCBuildLevelLabel);
    
        var ZCCMaxLevelLabel = document.createElement("h5");
        ZCCMaxLevelLabel.style.margin='0px';
        ZCCMaxLevelLabel.innerHTML = '造船厂合成等级:'+ZCCMaxLevel;
        ZCCKJDiv.append(ZCCMaxLevelLabel);
    }
    
    // 当前状态
    var bgcInfos = THGetZCCinfos();
    {
        var ZCCInfoDiv = document.createElement("div");
        ZCCInfoDiv.id = 'topwar_helper_ZCCInfoDiv';
        ZCCInfoDiv.style.width='185px';
        ZCCInfoDiv.style.height='190px';
        ZCCInfoDiv.style.background='white';
        ZCCRightDiv.append(ZCCInfoDiv);

        var ZCCInfoTitle = document.createElement("h4");
        ZCCInfoTitle.style.margin='8px';
        ZCCInfoTitle.innerHTML = '目前状态';
        ZCCInfoDiv.append(ZCCInfoTitle);

        for (var i=0;i<bgcInfos.length; ++i){
            if (bgcInfos[i]>0){
                var level = i+1;

                var label = document.createElement("h5");
                label.style.margin='0px';
                label.innerHTML = '等级:'+level+'->数量:'+bgcInfos[i];
                ZCCInfoDiv.append(label);
            }
        }
    }

    // 制造任务
    {
        var ZCCTaskDiv = document.createElement("div");
        ZCCTaskDiv.id = 'topwar_helper_ZCCTaskDiv';
        ZCCTaskDiv.style.width='185px';
        ZCCTaskDiv.style.height='100px';
        ZCCTaskDiv.style.background='white';
        ZCCLeftDiv.append(ZCCTaskDiv);

        var ZCCTaskTitle = document.createElement("h4");
        ZCCTaskTitle.style.margin='8px';
        ZCCTaskTitle.innerHTML = '建造任务';
        ZCCTaskDiv.append(ZCCTaskTitle);

        var ZCCTaskDescribtion = document.createElement("h6");
        ZCCTaskDescribtion.style.margin='0px';
        ZCCTaskDescribtion.innerHTML = '建造最高级造船厂至下面数量';
        ZCCTaskDiv.append(ZCCTaskDescribtion);

        var ZCCTaskInput = document.createElement("input");
        ZCCTaskInput.type = 'text';
        ZCCTaskInput.id = 'topwar_helper_ZCCTaskInput';
        ZCCTaskInput.value = bgcInfos[ZCCMaxLevel-1];
        ZCCTaskDiv.append(ZCCTaskInput);

        ZCCTaskButton = document.createElement("button");
        ZCCTaskButton.id = 'topwar_helper_ZCCTaskButton';
        ZCCTaskButton.innerHTML = '下发任务';
        ZCCTaskButton.setAttribute("onclick", "ZCCTaskButtonClicked()");
        ZCCTaskDiv.append(ZCCTaskButton);        
    }
}

// 更新造船厂状态，更新到界面，如果有
function THZCCStatusUpdate() {
    var ZCCInfoDiv = document.getElementById('topwar_helper_ZCCInfoDiv');
    if (!ZCCInfoDiv) {
        return;
    }
    var bgcInfos = THGetZCCinfos();
    var ndList = ZCCInfoDiv.childNodes;
    // 清楚旧内容第一个是标题，不用更新
    for (var i = ndList.length-1; i >0; i--) {
        ZCCInfoDiv.removeChild(ndList[i]);
    }
    // 添加新内容
    for (var i=0;i<bgcInfos.length; ++i){
        if (bgcInfos[i]>0){
            var level = i+1;

            var label = document.createElement("h5");
            label.style.margin='0px';
            label.innerHTML = '等级:'+level+'->数量:'+bgcInfos[i];
            ZCCInfoDiv.append(label);
        }
    }

    if (window.THData.Status.ZCCStatus) {
        var label = document.createElement("h5");
        label.style.margin='0px';
        label.innerHTML = window.THData.Status.ZCCStatus;
        ZCCInfoDiv.append(label);
    }
}

// 处理建造造船厂的任务
function THZCCBuildTask(task) {
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
    // 如果已有足够多的造船厂，任务结束
    var bgcInfos = THGetZCCinfos();
    if (bgcInfos[task.level-1]>= task.count){
        // console.log("任务完成");
        status = '任务完成';
        for (var i = 0; i <window.THData.Tasks.length;++i){
            task = window.THData.Tasks[i];
            if (task.type == 'ZCCBuild') {
                window.THData.Tasks.splice(i, 1);
                break;
            }
        }
        return status;
    }
    
    var canMergeZCCId = 0;
    // 从低级开始到合成等级的前一级，找到能合并的造船厂
    for (var i = 0; i < task.level-1;++i){
        if (bgcInfos[i]>1) {
            canMergeZCCId = THZCCIdList[i];
            break;
        }
    }
    if (canMergeZCCId > 0) {
        // console.log('try 2 merge');
        status = '合并中';
        var itemList = [];
        // 如果有可以合成的造船厂，就合成
        var bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
        for (var i = 0; i < bList.length; ++i) {
            b = bList[i]; 
            if (b.name == 'BuildingItem') {
                c = b.getComponent('BuildingItem');
                if (c.ItemData.id == canMergeZCCId){ 
                    itemList.push(c);
                }
            }
        }
        THMerge(itemList);
    }else {
        status = '建造中';
        // console.log('try 2 build');
        // 不能合成就要建造一个目前可以建造的造船厂
        // 其实目前可以调接口建更低级的，但是暂时不考虑等级比目前建造等级还低的，没需求
        var [ZCCMaxLevel,ZCCBuildLevel] = THGetZCCKJ();
        var buidingId =  THZCCIdList[ZCCBuildLevel-1];
        homeMap.BuildNewBuilding(buidingId,-1,true);
        homeMap.BuildNewBuilding(buidingId,-1,true);
    }
    return status;
}

function ZCCTaskButtonClicked() {
    var ZCCTaskInput = document.getElementById('topwar_helper_ZCCTaskInput');("input");
    // 找到旧的同类任务，删掉然后添加新的
    for (var i = 0; i <window.THData.Tasks.length;++i){
        task = window.THData.Tasks[i];
        if (task.type == 'ZCCBuild') {
            window.THData.Tasks.splice(i, 1);
            break;
        }
    }

    newTask = {
        type : 'ZCCBuild',
        level: THGetZCCKJ()[0],
        count: parseInt(ZCCTaskInput.value) 
    }
    window.THData.Tasks.push(newTask);
}

// 造兵，每一个兵工厂都尝试造一个兵，会受到各种限制，可能导致部分失败，这个不好改
function THZCCZB() {
    bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
    for (var i = 0; i < bList.length; ++i) {
        b = bList[i]; if (b.name == 'BuildingItem') {
            c = b.getComponent('BuildingItem');
            if (THZCCIdList.includes(c.ItemData.id)) {
                c.OnClickProductOrHarvest();
                c._aniState = false;
            }
        }
    }
};
