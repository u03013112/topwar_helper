// const zb = () => {
function zb() {
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
function getBYinfos() {
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

// 建造兵营
function buildBY() {
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
    parentNode.append(rootDiv);
    parentNode.style.setProperty('display','block');
    
    taskSystemInit();
}