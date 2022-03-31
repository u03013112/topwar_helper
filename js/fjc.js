// 兵营Id列表，找策划要的
const THFJCIdList = [1051,1052,1053,1054,1055,1056,1057,1058,1059,1060,105011,105012,105013,105014,105015,105016,105017,105018,105019,105020,105021,105022,105023,105024,105025,105026,105027,105028,105029,105030,105031,105032,105033,105034,105035,105036,105037,105038,105039,105040,105041,105042,105043,105044,105045,105046,105047,105048,105049,105050,105051,105052,105053,105054,105055,105056,105057,105058,105059,105060,105061,105062,105063,105064,105065,105066,105067,105068,105069,105070,105071,105072,105073,105074,105075,105076,105077,105078,105079,105080,105081,105082,105083,105084,105085,105086,105087,105088,105089,105090,105091,105092,105093,105094,105095,105096,105097,105098,105099,105100];

// 获取兵营信息
function THGetFJCinfos() {
    ret = [];
    if (!cc.find('Canvas/HomeMap')) {
        return ret;
    }
    for (var i = 0; i < THFJCIdList.length; ++i) {
        ret[i] = 0;
    }
    bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
    for (var i = 0; i < bList.length; ++i) {
        b = bList[i]; if (b.name == 'BuildingItem') {
            c = b.getComponent('BuildingItem');
            index = THFJCIdList.indexOf(c.ItemData.id);
            if (index < 0) {
                continue;
            }
            ret[index] += 1;
        }
    }
    return ret;
}

// 获得Barracks科技等级，返回( Merge level, Building level)
function THGetFJCKJ() {
    var dataCenter = window.__require('DataCenter');
    if (!dataCenter.DATA.UserData.getScienceByGroupId(310000) ||
        !dataCenter.DATA.UserData.getScienceByGroupId(313000) ||
        !dataCenter.DATA.UserData.getScienceByGroupId(303000)) {
        // 不能获得用户科技，大概率是没有登录成功
        return [0,0];
    }
    var maxLevel = dataCenter.DATA.UserData.getScienceByGroupId(313000)._Data.level;
    var buildLevel = dataCenter.DATA.UserData.getScienceByGroupId(303000)._Data.level;
    return [maxLevel, buildLevel];
}

function THFJCVueUpdate() {
    var [FJCMaxLevel, FJCBuildLevel] = THGetFJCKJ();
    window.THVueApp.airBase.buildingLevel = FJCBuildLevel;
    window.THVueApp.airBase.mergeLevel = FJCMaxLevel;

    var fjcInfos = THGetFJCinfos();
    window.THVueApp.airBase.statusStrs = []
    for (var i = 0; i < fjcInfos.length; ++i) {
        if (fjcInfos[i] > 0) {
            var level = i + 1;
            statusStr = {text:'Level:' + level + ' count:' + fjcInfos[i]};
            window.THVueApp.airBase.statusStrs.push(statusStr);
        }
    }
    if (window.THData.Status.FJCStatus) {
        window.THVueApp.airBase.statusStrs.push({text:window.THData.Status.FJCStatus});
    }
}

// 处理建造Barracks的任务
function THFJCBuildTask(task) {
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
    var fjcInfos = THGetFJCinfos();
    if (fjcInfos[task.level - 1] >= task.count) {
        // console.log("mission completed");
        status = 'mission completed';
        for (var i = 0; i < window.THData.Tasks.length; ++i) {
            task = window.THData.Tasks[i];
            if (task.type == 'FJCBuild') {
                window.THData.Tasks.splice(i, 1);
                break;
            }
        }
        return status;
    }

    var canMergeFJCId = 0;
    // 从低级开始到 Merge level的前一级，找到能合并的Barracks
    for (var i = 0; i < task.level - 1; ++i) {
        if (fjcInfos[i] > 1) {
            canMergeFJCId = THFJCIdList[i];
            break;
        }
    }
    if (canMergeFJCId > 0) {
        // console.log('try 2 merge');
        status = 'Merging';
        var itemList = [];
        // 如果有可以合成的Barracks，就合成
        var bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
        for (var i = 0; i < bList.length; ++i) {
            b = bList[i];
            if (b.name == 'BuildingItem') {
                c = b.getComponent('BuildingItem');
                if (c.ItemData.id == canMergeFJCId) {
                    if (c._curProNum > 0) {
                        status = 'Is building troops, suspended work';
                        // 正在造兵，那就暂停目前任务
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
        var [FJCMaxLevel, FJCBuildLevel] = THGetFJCKJ();
        var buidingId = THFJCIdList[FJCBuildLevel - 1];
        homeMap.BuildNewBuilding(buidingId, -1, true);
        homeMap.BuildNewBuilding(buidingId, -1, true);
    }
    return status;
}

function FJCTaskButtonClicked() {

    var count = window.THVueApp.airBase.buildCount;
    if (count == NaN) {
        // 输入的不是数字
        return;
    }
    // 找到旧的同类任务，删掉然后添加新的
    for (var i = 0; i < window.THData.Tasks.length; ++i) {
        task = window.THData.Tasks[i];
        if (task.type == 'FJCBuild') {
            window.THData.Tasks.splice(i, 1);
            break;
        }
    }

    newTask = {
        type: 'FJCBuild',
        level: THGetFJCKJ()[0],
        count: count
    }
    window.THData.Tasks.push(newTask);
}