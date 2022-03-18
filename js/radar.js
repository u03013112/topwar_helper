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
        mession = THGetRadarMession(messions0[i]);
        messions.push(mession);
    }
    return messions;
}

// 获取优先级，优先级越低，约优先
function THGetRadarMessionPriorityByName(taskName) {
    var priorityMap = {
        'Eliminate the Dark Legion remnant':1,
        'Destroy the Dark Legion Fort':2,
        'Rescue Mission':3,
        'Kill Dark Forces':99
    };
    // 默认999
    priority = 999;
    if (taskName in priorityMap) {
        priority = priorityMap[taskName];
    }
    return priority;
}
// input:mession -> output: type + start
// TODO：暂时只能知道这写内容，之后可能再考虑通过奖励来决定做哪个任务
function THGetRadarMession(mession) {
    var taskId = mession.getComponent('RadarMainPrefabItemCell')._data.taskId;
    var state = mession.getComponent('RadarMainPrefabItemCell')._data.state;
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
    priority = THGetRadarMessionPriorityByName(taskName);
    return {'taskName':taskName, 'starCount':starCount,'mession':mession.getComponent('RadarMainPrefabItemCell'),'priority':priority,'state':state};
}

// 所有雷达任务的第0步，打开雷达界面
// TODO：出兵的任务应该先判断是否有空余队列
function THRadarMessionStep0() {
    // 先要判断是否雷达界面
    if (!cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT/RadarMainPrefab')) {
        THOpenRadarUI();
    }
}
// 点开任务
function THRadarMessionStep1(task) {
    var taskName = task['taskName'];
    var starCount = task['starCount'];

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

// 以下的任务指的不是游戏中的任务，而是助手的任务
function THRadarTaskStartButtonClicked() {
    // 防止反复添加，添加之前先把旧的去掉
    THRadarTaskStopButtonClicked();
    // 最好直接进入正确的地图
    // TODO：从页面获取参数
    // TODO:页面变化
    newTask = {
        type: 'RadarTask',
        // 目前状态，数据都放到数据层来，减少与界面耦合度
        // ready -> XXstepX -> interval -> done
        status:'ready',
        // 会做的任务名字列表
        allowTaskNames:[],
        // 保留体力（体力最小值）
        VIYMin:0,
        // 自动小药
        smallVITCapsules:false,
        // 自动大药
        largeVITCapsules:false,
        // 次数限制
        countMax:1,
        count:0,
        // 任务间隔时间（秒）
        intervalMax:30,
        interval:0,
        // 正在做的任务，和status一起组成FSM
        currentTask:{},
        // TODO：优先级
    }
    window.THData.Tasks.push(newTask);
}

function THRadarTaskStopButtonClicked() {
    // 找到旧的同类任务，删掉
    for (var i = 0; i < window.THData.Tasks.length; ++i) {
        task = window.THData.Tasks[i];
        if (task.type == 'RadarTask') {
            window.THData.Tasks.splice(i, 1);
            break;
        }
    }
    // TODO:页面变化
}

// 
function THRadarTask(task) {
    switch (task.status) {
        case 'reward':
            cc.find('UICanvas/PopLayer/UIFrameNone').removeFromParent();
            task.status = 'ready';
            break;
        case 'ready':
            if (task.count >= task.maxCount) {
                // 任务完成
                task.status = 'done';
                return;
            }
            // 选取一个任务
            THRadarMessionStep0();
            // 这里其实应该等一下
            var messions = THGetAllMessions();
            // 可以领奖就先领奖
            for (var i = 0; i < messions.length; i++) {
                mession = messions[i];
                if (mession['state'] == 4) {
                    mession['mession'].itemClick();
                    task.status = 'reward';
                    return;
                }
            }
            
            // 暂时没有优先级，固定写死优先级
            // TODO：先做星高的
            messions.sort(function(a,b){
                return a['priority']-b['priority'];
            })
            if (messions.length <= 0){
                // 任务完成
                // 这个不太可能出现
                return;
            }
            var mession = messions[0];
            // 如果有必要，判断是否有队列
            if (task.taskName == 'Eliminate the Dark Legion remnant' || task.taskName == 'Destroy the Dark Legion Fort') {
                // 如果没有队列怎么办？
                // 终止任务，并给出原因就好
            }
            
            // 判断是否有体力
            if ( true ) {
                // 判断是否吃药，这个可能还是需要添加状态
                // 终止任务，并给出原因就好
            }
            task.currentTask = mession;
            // 跳转到指定任务类型的step0
            task.status = 'step0';
            break;
        case 'interval':
            // 正在间隔，间隔计时器累计
            task.interval += 1;
            // 如果间隔时间足够（可以少1秒提前完成），进入ready状态
            if (task.interval >= task.intervalMax) {
                task.interval = 0;
                task.count += 1;
                task.status = 'ready';
            }
            break;
        case 'step0':
            // 打开雷达界面，如果有必要，其实在选取任务的时候就应该已经打开了
            // 这步也许可以跳过
            THRadarMessionStep0();
            // 进入 step1
            task.status = 'step1';
            break;
        case 'step1':
            // 点开任务
            THRadarMessionStep1(task.currentTask);
            // 进入 step2
            task.status = 'step2';
            break;
        case 'step2':
            // 点击界面上的Go
            THRadarMessionStep2();
            // 根据taskName，判断进入哪个类型的任务下一步
            if (task.currentTask['taskName'] == 'Eliminate the Dark Legion remnant') {
                task.status = 'battleStep0';
            }
            break;
        case 'battleStep0':
            // 点击攻击按钮
            THRadarBattleMessionStep0();
            // TODO：10体力那个好像按钮不一样
            task.status = 'battleStep1';
            // 进入 battleStep1
            break;
        case 'battleStep1':
            // 上阵
            THRadarBattleMessionStep1();
            // 进入 battleStep2
            task.status = 'battleStep2';
            break;
        case 'battleStep2':
            // 出战
            THRadarBattleMessionStep2();
            // 进入 interval
            task.status = 'interval';
            break;
        default:
            // 没有找到状态，直接退出吧
            // TODO：任务终止
            break;
    }
    console.log(task.status);
    return task.status;
}