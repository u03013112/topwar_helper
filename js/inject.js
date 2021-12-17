function test() {
    var canvas = document.getElementById('canvas');
    var parentNode = canvas.parentNode;
    canvas.style.setProperty('width','80%');
    var newNode = document.createElement('div');
    newNode.innerHTML = '<h1>123</h1>';
    parentNode.insertBefore(newNode,canvas);
}

function timerTest() {
    if (window.j_timer != null) {
        clearInterval(window.j_timer);
        window.j_timer = null;
    }else{
        window.j_timer = setInterval(function() {console.log('1');},1000);
    }
}

// 获取兵营信息
function THGetBGCinfos() {
    ret = [];
    bbIdList = [1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 104011, 104012, 104013, 104014, 104015, 104016, 104017, 104018, 104019, 104020, 104021, 104022, 104023, 104024, 104025, 104026, 104027, 104028, 104029, 104030, 104031, 104032, 104033, 104034, 104035, 104036, 104037, 104038, 104039, 104040, 104041, 104042, 104043, 104044, 104045, 104046, 104047, 104048, 104049, 104050, 104051, 104052, 104053, 104054, 104055, 104056, 104057, 104058, 104059, 104060, 104061, 104062, 104063, 104064, 104065, 104066, 104067, 104068, 104069, 104070, 104071, 104072, 104073, 104074, 104075, 104076, 104077, 104078, 104079, 104080, 104081, 104082, 104083, 104084, 104085, 104086, 104087, 104088, 104089, 104090, 104091, 104092, 104093, 104094, 104095, 104096, 104097, 104098, 104099, 104100]
    for(var i = 0; i <bbIdList.length;++i){
        ret[i] = 0;
    }
    bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
    for (var i = 0; i < bList.length; ++i) {
        b = bList[i]; if (b.name == 'BuildingItem') {
            c = b.getComponent('BuildingItem');
            index = bbIdList.indexOf(c.ItemData.id);
            if (index<0){
                continue;
            }
            ret[index] += 1;
        }
    }
    console.log(ret)
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

// 建造兵营
function buildBGC() {
    // BuildNewBuilding
    c = cc.find('Canvas/HomeMap').getComponent('HomeMap');
    c.BuildNewBuilding(104019,-1,true)
    c.BuildNewBuilding(104019,-1,true)
    if (c.AddingItem) {
        c.CancelBuildBuilding(c.AddingItem);
    }
}

// 所有的function都加TH（TopwarHelper）开头，毕竟是注入代码，为了避免冲突。
function THDataInit() {
    if (window.THData == null) {
        window.THData = {}
        window.THData.timer = setInterval(function() {console.log('1');},1000);
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
// 获得科技信息
// 按照顺序，应该是
// 金矿合成 陆军单位 海军单位 空军单位 金矿建造 兵工厂合成 造船厂合成 飞机厂合成 空 兵工厂建造 造船厂建造 飞机厂建造 
function THGetKJ() {
    // 打开科技界面
    bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
    for (var i = 0; i < bList.length; ++i) {
        b = bList[i]; if (b.name == 'BuildingItem') {
            c = b.getComponent('BuildingItem');
            c.OnHeadquartersClick();
        }
    }
    // 这里可能需要等待一下

    // 目前版本是这个，但是可能会变化
    var levels = [];
    var hp = cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT').getChildren()[0].getComponent("HeadquartersPanelOld");
    var itemNodes = hp.centerContent.getChildren();
    for (var i=0;i<itemNodes.length;++i) {
        var item = itemNodes[i].getComponent('HeadquartersItemOld');
        var level = parseInt(item.LabLevel.string);
        levels.push(level);
    }

    // 关闭科技界面
    hp.close();

    window.THData.KJLevel = levels;
}

function taskMainBtnClicked() {
    taskMainButton = document.getElementById("topwar_helper_taskMainButton");
    if (window.THData.timer != null) {
        clearInterval(window.THData.timer);
        window.THData.timer = null;
        taskMainButton.innerHTML = '任务暂停中';
    }else{
        window.THData.timer = setInterval(function() {console.log('1');},1000);
        taskMainButton.innerHTML = '任务进行中';
    }
}

// 任务相关初始化
function taskSystemInit() {
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

    THGetKJ();

    THBGCDivInit();
}

// 兵工厂
function THBGCDivInit() {
    // 底板
    var parentNode = document.getElementById("topwar_helper_rootDiv");
    var BGCDiv = document.createElement("div");
    BGCDiv.id = 'topwar_helper_BGCDiv';
    BGCDiv.style.width='400px';
    BGCDiv.style.height='400px';
    BGCDiv.style.background='pink';
    parentNode.append(BGCDiv);
    
    // 科技
    {
        if (window.THData.KJLevel == null) {
            // 找到当前科技等级是必要的，不然后面都不做
            var BGCKJWaringLabel = document.createElement("h4");
            BGCKJWaringLabel.style.margin='8px';
            BGCKJWaringLabel.innerHTML = '读取科技信息失败，请重试';
            BGCDiv.append(BGCKJWaringLabel);
            return;
        }
        var BGCBuildLevel = window.THData.KJLevel[9];
        var BGCMaxLevel = window.THData.KJLevel[5];
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
    {
        bgcInfos = THGetBGCinfos();

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

}