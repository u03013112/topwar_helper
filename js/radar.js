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
        10031:'Kill Dark Forces',
        10021:'Rescue Mission',
        10022:'Rescue Mission',
        10023:'Rescue Mission',
        10024:'Rescue Mission',
        10025:'Rescue Mission',
    };

    var taskName = 'unknown';
    if (taskId in taskIdMap) {
        taskName = taskIdMap[taskId];
    }else{
        console.log(taskId);
    }

    var starCount = 0;
    var name = mession.getChildByName('effectNode').getChildren()[0].name;
    // js 是否支持
    starCount = name[name.length-1] - '0';
    return {'taskName':taskName, 'starCount':starCount,'mession':mession.getComponent('RadarMainPrefabItemCell')};
}

// 所有雷达任务的第0步，打开雷达界面
// TODO：出兵的任务应该先判断是否有空余队列
function THRadarMessionStep0() {
    // 先要判断是否雷达界面
    if (!cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT/RadarMainPrefab')) {
        THOpenRadarUI();
    }
}
// 点开任务，参数统一采用taskName+starCount
function THRadarMessionStep1(taskName,starCount) {
    if (!cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT/RadarMainPrefab')) {
        // TODO:界面没能打开，任务失败
    }
    var messions = THGetAllMessions();
    for (var i = 0; i < messions.length; ++i){
        var mession = messions[i];
        if (mession['taskName'] == taskName && mession['starCount'] == starCount) {
            mession['mession'].itemClick();
            return;
        }
    }
    // TODO:没有找到任务，任务失败
}

// 点击界面上的Go
function THRadarMessionStep2() {
    if (!cc.find('UICanvas/PopLayer/UIFrameDialog/BG/CONTENT/RadarTaskPrefab')) {
        // TODO:界面没能打开，任务失败
    }
    cc.find('UICanvas/PopLayer/UIFrameDialog/BG/CONTENT/RadarTaskPrefab').getComponent("RadarTaskPrefab").taskClick();
    return;
}

// 雷达战斗任务，暂时包括Eliminate the Dark Legion remnant、Destroy the Dark Legion Fort
// 敌人界面
function THRadarBattleMessionStep0() {
    if(!cc.find('UICanvas/PopLayer/prefabWorldUIEnemy')){
        // TODO:界面没能打开，任务失败
    }
    var worldMapEnemyComponent = cc.find('UICanvas/PopLayer/prefabWorldUIEnemy').getComponent('WorldMapEnemyComponent');
    // 好像所有任务都是单次攻击
    worldMapEnemyComponent.onBtnClickAtack(null,0);
    return;
}

// 上阵
// TODO：这里应该是可以选择阵容，但是快速上阵
function THRadarBattleMessionStep1() {
    THYJSZ();
}

function THRadarBattleMessionStep2() {
    THChuZheng();
    // TODO:任务完成
}

function THRadarRescueMessionStep0() {
    if(!cc.find('UICanvas/PopLayer/UIFrameNone/CONTENT/prefabWorldUIRadarEnemy')){
        // TODO:界面没能打开，任务失败
    }
    var prefabWorldUIRadarEnemy = cc.find('UICanvas/PopLayer/UIFrameNone/CONTENT/prefabWorldUIRadarEnemy').getComponent("prefabWorldUIRadarEnemy")
    var e = new cc.Event.EventTouch([],false)
    prefabWorldUIRadarEnemy.attackClick(e);
    // TODO:任务完成
    return;
}