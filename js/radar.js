// 有关雷达部分，主要希望完成自动雷达任务挂机

function THOpenRadarUI() {
    // TODO：没有判断界面，暂时未发现有不可用界面
    cc.find('UICanvas/MainUIWrapper/NMainUI').getComponent('NMainUI').clickRadar();
}

function THGetAllMessions() {
    var radarMainPrefab = cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT/RadarMainPrefab').getComponent('RadarMainPrefab');
    var messions0 = radarMainPrefab.taskContentNode.getChildren();

    messions = [];
    for (var i = 0; i < messions0.length; i++){
        mession = THGetMession(messions0[i]);
        messions.push(mession);
    }
    return messions;
}

// input:mession -> output: type + start
// TODO：暂时只能知道这写内容，之后可能再考虑通过奖励来决定做哪个任务
function THGetMession(mession) {
    var taskId = mession.getComponent('RadarMainPrefabItemCell')._data.taskId;
    var taskIdMap = {
        10000:'Eliminate the Dark Legion remnant',
        10001:'Destroy the Dark Legion Fort',
        10031:'Kill Dark Forces'
    };

    var taskName = 'unknown';
    if (taskId in taskIdMap) {
        taskName = taskIdMap[taskId];
    }

    var starCount = 0;
    var name = mession.getChildByName('effectNode').getChildren()[0].name;
    // js 是否支持
    starCount = name[name.length-1] - '0';
    return {'taskName':taskName, 'starCount':starCount};
}