// 有关雷达部分，主要希望完成自动雷达任务挂机

function THOpenRadarUI() {
    // TODO：没有判断界面，暂时未发现有不可用界面
    cc.find('UICanvas/MainUIWrapper/NMainUI').getComponent('NMainUI').clickRadar();
}

// 判断是否有体力补充界面，这个是由于体力不够自动弹出的
function THIsAddEnergyUIExist() {
    if (!cc.find('UICanvas/PopLayer/UIFrameDialog/BG/CONTENT/BuyEnergyPanel')) {
        return false;
    }
    return true;
}

// 处理升级提示
function THIsLevelUpTip() {
    if (cc.find('UICanvas/TipsLayer/ConfirmPanel') && cc.find('UICanvas/TipsLayer/ConfirmPanel').getComponent('ConfirmPanel')) {
        if (window.THVueApp2.autoGetReward) {
            cc.find('UICanvas/TipsLayer/ConfirmPanel').getComponent('ConfirmPanel').OnSureClick();
        } else {
            cc.find('UICanvas/TipsLayer/ConfirmPanel').getComponent('ConfirmPanel').OnCancelClick();
            window.THRadarSkipReward = true;
        }
    }
}

// 购买体力，由于使用雷达购买体力，要求雷达界面中
function THAddEnergyStep0() {
    // 打开药剂界面
    var node = cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT/RadarMainPrefab');
    if (!node) {
        node = cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT/RadarMainPrefabNew2');
    }
    var radarMainPrefab = node.getComponent('RadarMainPrefab');

    radarMainPrefab.addClick();
}

function THAddEnergyStep1() {
    if (!cc.find('UICanvas/PopLayer/UIFrameDialog/BG/CONTENT/BuyEnergyPanel')) {
        return false;
    }
    var buyEnergyPanel = cc.find('UICanvas/PopLayer/UIFrameDialog/BG/CONTENT/BuyEnergyPanel').getComponent('BuyEnergyPanel');

    let radar = window.THVueApp2;
    if (radar.smallVITCapsules > 0 && radar.autoSmallVIT) {
        buyEnergyPanel.OnUserItemClick(600001);
        return true;
    } else if (radar.largeVITCapsules > 0 && radar.autoLargeVIT) {
        buyEnergyPanel.OnUserItemClick(600002);
        return true;
    }
    return false;
}

function THAddEnergyStep2() {
    // 点击使用按钮
    if (!cc.find('UICanvas/PopLayer/UIFrameDialog/BG/CONTENT/BuyEnergyPanel')) {
        return false;
    }
    var buyEnergyPanel = cc.find('UICanvas/PopLayer/UIFrameDialog/BG/CONTENT/BuyEnergyPanel').getComponent('BuyEnergyPanel');
    buyEnergyPanel.UseItem();
    return true;
}

function THAddEnergyStep3() {
    // 关闭界面
    if (!cc.find('UICanvas/PopLayer/UIFrameDialog/BG/CONTENT/BuyEnergyPanel')) {
        return false;
    }
    var buyEnergyPanel = cc.find('UICanvas/PopLayer/UIFrameDialog/BG/CONTENT/BuyEnergyPanel').getComponent('BuyEnergyPanel');
    buyEnergyPanel.OnCloseClick();
    return true;
}


function THGetAllMessions() {
    var node = cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT/RadarMainPrefab');
    if (!node) {
        node = cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT/RadarMainPrefabNew2');
    }
    var radarMainPrefab = node.getComponent('RadarMainPrefab');

    var messions0 = radarMainPrefab.taskContentNode.getChildren();

    messions = [];
    for (var i = 0; i < messions0.length; i++) {
        mession = THGetRadarMession(messions0[i]);
        messions.push(mession);
    }

    var messions1 = radarMainPrefab.ringTaskContentNode.getChildren();
    for (var i = 0; i < messions1.length; i++) {
        mession = THGetRadarMession(messions1[i]);
        messions.push(mession);
    }
    return messions;
}

// 获取优先级，优先级越低，约优先
function THGetRadarMessionPriorityByName(taskName) {
    // 按照界面上的顺序做优先级
    let radar = window.THVueApp2;
    var priorityMap = {}
    for (var i = 0; i < radar.messionsType.length; i++) {
        priorityMap[radar.messionsType[i]['name']] = i;
    }
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
        10000: 'Eliminate the Dark Legion remnant',
        10001: 'Destroy the Dark Legion Fort',
        10031: 'Kill Dark Forces',
        10021: 'Rescue Mission',
        10022: 'Rescue Mission',
        10023: 'Rescue Mission',
        10024: 'Rescue Mission',
        10025: 'Rescue Mission',
        10031: 'Kill Dark Forces',
        10032: 'Kill Dark Forces',
        10033: 'Kill Dark Forces',
        10034: 'Kill Dark Forces',
        10035: 'Kill Dark Forces',
        4132: 'Discover Dark Legion`s Treasure',
        10002: 'Gold Harvest Ops',
        10003: 'The Lost Treasure',
        10004: 'Treasure Ops',
        10005: 'The Lost Treasure',
    };

    var taskName = 'unknown';
    if (taskId in taskIdMap) {
        taskName = taskIdMap[taskId];
    } else {
        // 10033、10034、10035
        console.log('taskId:', taskId);
    }

    var starCount = 0;
    var name = mession.getChildByName('effectNode').getChildren()[0].name;
    // js 是否支持
    starCount = name[name.length - 1] - '0';
    priority = THGetRadarMessionPriorityByName(taskName);
    return { 'taskName': taskName, 'starCount': starCount, 'mession': mession.getComponent('RadarMainPrefabItemCell'), 'priority': priority, 'state': state };
}

function THGetMessionIcon(mession) {
    var effect = mession.getChildByName('effectNode').getChildren()[0];
    effect.getChildren()[0].getChildren()[2].getChildren()[0]._components[0]._spriteFrame;
    // TODO:代码没有写完，拿到整张贴图之后需要裁减，或旋转
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

    if (!(cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT/RadarMainPrefab') || cc.find('UICanvas/PopLayer/UIFrameScreen/CONTENT/RadarMainPrefabNew2'))) {
        // TODO:界面没能打开，任务失败
        return false;
    }
    try {
        task['mession'].itemClick();
    } catch (e) {
        console.log('THRadarMessionStep1 item cant click');
        return false;
    }

    return true;
}

// 点击界面上的Go
function THRadarMessionStep2() {
    if (!cc.find('UICanvas/PopLayer/UIFrameDialog/BG/CONTENT/RadarTaskPrefab')) {
        // TODO:界面没能打开，任务失败
        return false;
    }
    cc.find('UICanvas/PopLayer/UIFrameDialog/BG/CONTENT/RadarTaskPrefab').getComponent("RadarTaskPrefab").taskClick();
    return true;
}

// Eliminate the Dark Legion remnant
// 敌人界面
function THRadarBattleMessionStep0() {
    if (!cc.find('UICanvas/PopLayer/prefabWorldUIEnemy')) {
        // TODO:界面没能打开，任务失败
        return false;
    }
    var worldMapEnemyComponent = cc.find('UICanvas/PopLayer/prefabWorldUIEnemy').getComponent('WorldMapEnemyComponent');
    // 好像所有任务都是单次攻击
    worldMapEnemyComponent.onBtnClickAtack(null, 0);
    return true;
}
// Destroy the Dark Legion Fort
function THRadarDestoryMessionStep0() {
    if (!cc.find('UICanvas/PopLayer/prefabWorldUIAssemblyEnemy')) {
        // TODO:界面没能打开，任务失败
        return false;
    }
    var worldMapEnemyComponent = cc.find('UICanvas/PopLayer/prefabWorldUIAssemblyEnemy').getComponent('WorldMapAssemblyEnemyComponent');
    // 好像所有任务都是单次攻击
    worldMapEnemyComponent.onAttackNormalMonster(null, 0);
    return true;
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
    if (!cc.find('UICanvas/PopLayer/UIFrameNone/CONTENT/prefabWorldUIRadarEnemy')) {
        // TODO:界面没能打开，任务失败
        return false;
    }
    var prefabWorldUIRadarEnemy = cc.find('UICanvas/PopLayer/UIFrameNone/CONTENT/prefabWorldUIRadarEnemy').getComponent("prefabWorldUIRadarEnemy")
    var e = new cc.Event.EventTouch([], false)
    prefabWorldUIRadarEnemy.attackClick(e);
    // TODO:任务完成
    return true;
}

// 以下的任务指的不是游戏中的任务，而是助手的任务
function THRadarTaskStartButtonClicked() {
    gtag && gtag('event', 'THRadarTaskStartButtonClicked', { 'send_to': 'G-EGJ78MKRZC' });
    // 防止反复添加，添加之前先把旧的去掉
    THRadarTaskStopButtonClicked();
    // 最好直接进入正确的地图
    // TODO：从页面获取参数
    // TODO:页面变化
    newTask = {
        type: 'RadarTask',
        // 目前状态，数据都放到数据层来，减少与界面耦合度
        // ready -> XXstepX -> interval -> done
        status: 'ready',
        // 会做的任务名字列表
        allowTaskNames: [],
        // 保留体力（体力最小值）
        VIYMin: 0,
        // 自动小药
        smallVITCapsules: false,
        // 自动大药
        largeVITCapsules: false,
        // 次数限制
        countMax: window.THVueApp.radar.countMax,
        count: 0,
        // 任务间隔时间（秒）
        intervalMax: window.THVueApp.radar.interval,
        interval: 0,
        // 正在做的任务，和status一起组成FSM
        currentTask: {},
        // 重试，为了解决部分时候网络不好不能弹出界面
        retryMax: window.THVueApp.radar.retryCountMax,
        retry: 0,
        retryTimeMax: window.THVueApp.radar.retryInterval,
        retryTimer: 0,
        // 整体日志
        log: '',
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

function THRadarTaskToString(task) {
    ret = task.taskName;
    ret += ' ' + task.starCount + 'star(s)';
    return ret;
}
// 
function THRadarTask(task) {
    switch (task.status) {
        case 'reward':
            task.status = 'ready';
            // task.log += 'reward: '+THRadarTaskToString(task.currentTask)+'\n';
            cc.find('UICanvas/PopLayer/UIFrameNone').removeFromParent();
            break;
        case 'ready':
            if (task.count >= task.countMax) {
                // 任务完成
                task.status = 'done';
                task.log += 'All done!\n';
                THRadarTaskStopButtonClicked();
                break;
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
                    break;
                }
            }

            // 暂时没有优先级，固定写死优先级
            // TODO：先做星高的
            messions.sort(function(a, b) {
                return a['priority'] - b['priority'];
            })
            if (messions.length <= 0) {
                // 任务完成
                task.status = 'done';
                task.log += 'there is no mession here!\n';
                break;
            }

            var mession = {};
            for (var i = 0; i < messions.length; i++) {
                // 要判断状态，0是未开始，1是怪物出现，暂时不明白
                // 2行军中、3进行中、4可领奖
                if (messions[i]['state'] == 0 || messions[i]['state'] == 1) {
                    mession = messions[i];
                    break;
                }
            }
            // TODO:应该不存在找不到任务的情况，暂时没有处理异常

            // 如果有必要，判断是否有队列
            if (task.taskName == 'Eliminate the Dark Legion remnant' || task.taskName == 'Destroy the Dark Legion Fort') {
                // 如果没有队列怎么办？
                // 终止任务，并给出原因就好
                // task.status = 'failed';
                // break;
            }

            task.currentTask = mession;
            task.log += 'start: ' + THRadarTaskToString(task.currentTask) + '\n';
            // 跳转到指定任务类型的step0
            task.status = 'step0';
            break;
        case 'interval':
            // 这段家在这，是因为有一些任务点击开始后就开始等待了，这里需要判断是否有体力
            if (THIsAddEnergyUIExist()) {
                task.status = 'addEnergy1';
                break;
            }
            // 正在间隔，间隔计时器累计
            task.interval += 1;
            // 如果间隔时间足够（可以少1秒提前完成），进入ready状态
            if (task.interval >= task.intervalMax) {
                task.interval = 0;
                task.count += 1;
                task.status = 'ready';
                task.log += 'finish ' + task.count + '/' + task.countMax + '\n';
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
            var ret = THRadarMessionStep1(task.currentTask);
            if (!ret) {
                task.status = 'retry';
                task.log += 'open UI1 failed:' + THRadarTaskToString(task.currentTask) + '\n';
                break;
            }
            // 进入 step2
            task.status = 'step2';
            break;
        case 'step2':
            // 点击界面上的Go
            var ret = THRadarMessionStep2();
            if (!ret) {
                task.status = 'retry';
                task.log += 'open UI2 failed:' + THRadarTaskToString(task.currentTask) + '\n';
                break;
            }
            // 根据taskName，判断进入哪个类型的任务下一步
            if (task.currentTask['taskName'] == 'Eliminate the Dark Legion remnant') {
                task.status = 'battleStep0';
            } else if (task.currentTask['taskName'] == 'Rescue Mission') {
                task.status = 'resueStep0';
            } else if (task.currentTask['taskName'] == 'Destroy the Dark Legion Fort') {
                task.status = 'destoryStep0';
            } else if (task.currentTask['taskName'] == 'Discover Dark Legion`s Treasure') {
                task.status = 'resueStep0';
            } else if (task.currentTask['taskName'] == 'The Lost Treasure') {
                task.status = 'resueStep0';
            } else if (task.currentTask['taskName'] == 'Treasure Ops') {
                task.status = 'battleStep0';
            } else if (task.currentTask['taskName'] == 'Gold Harvest Ops') {
                task.status = 'destoryStep0';
            } else {
                // 未知类型，直接推出
                task.log += 'unsupport mession type failed:' + THRadarTaskToString(task.currentTask) + '\n';
                task.status = 'failed';
                break;
            }
            break;
        case 'addEnergy0':
            if (THIsAddEnergyUIExist()) {
                // 体力不足
                task.status = 'addEnergy1';
                break;
            }
            break;
        case 'addEnergy1':
            // 选用小体力药剂
            // TODO：选择药剂在此
            THAddEnergyStep1();
            task.status = 'addEnergy2';
            break;
        case 'addEnergy2':
            THAddEnergyStep2();
            task.log += 'add energy!\n'
            task.status = 'addEnergy3';
            break;
        case 'addEnergy3':
            THAddEnergyStep3();
            // 直接回到ready重来
            task.status = 'ready';
            break;
        case 'resueStep0':
            var ret = THRadarRescueMessionStep0();
            if (!ret) {
                task.log += 'open resue UI0 failed:' + THRadarTaskToString(task.currentTask) + '\n';
                task.status = 'retry';
                break;
            }
            // 进入 interval
            task.status = 'interval';
            break;
        case 'destoryStep0':
            // 点击攻击按钮
            var ret = THRadarDestoryMessionStep0();
            if (!ret) {
                task.log += 'open destory UI0 failed:' + THRadarTaskToString(task.currentTask) + '\n';
                task.status = 'retry';
                break;
            }
            // TODO：10体力那个好像按钮不一样
            task.status = 'battleStep1';
            // 进入 battleStep1
            break;
        case 'battleStep0':
            // 点击攻击按钮
            var ret = THRadarBattleMessionStep0();
            if (!ret) {
                task.log += 'open battle UI0 failed:' + THRadarTaskToString(task.currentTask) + '\n';
                task.status = 'retry';
                break;
            }
            // TODO：10体力那个好像按钮不一样
            task.status = 'battleStep1';
            // 进入 battleStep1
            break;
        case 'battleStep1':
            // 有可能在这体力不足
            if (THIsAddEnergyUIExist()) {
                task.status = 'addEnergy0';
                break;
            }
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
        case 'retry':
            if (task.retry >= task.retryMax) {
                console.log('task.retry >= task.retryMax')
                task.status = 'failed';
                break;
            }
            // 重试，先计时，时间到了再重试
            task.retryTimer += 1;
            if (task.retryTimer > task.retryTimeMax) {
                task.retryTimer = 0;
                // 重试直接从ready开始
                task.retry += 1;
                task.log += 'retry ' + task.retry + '\n';

                task.status = 'ready';
                break;
            }
            break;
        default:
            // 没有找到状态，直接退出吧
            // TODO：任务终止
            THRadarTaskStopButtonClicked();
            task.log += 'mession failed,stop it\n';
            break;
    }
    window.THVueApp.radar.logStrs = task.log.split('\n');
    console.log(task.status);
    return task.status;
}

// update per sec
function THRadarUpdate() {
    let radar = window.THVueApp2;
    if (radar) {
        let dataCenter = window.__require('DataCenter');
        // energy
        let energy = dataCenter.DATA.UserData.getEnergy(1);
        radar.energy = energy.Point;
        radar.energyMax = energy.PointMax;
        // VIT
        radar.smallVITCapsules = dataCenter.DATA.UserData.getItemAmount(600001);
        radar.largeVITCapsules = dataCenter.DATA.UserData.getItemAmount(600002);
        // mession storage

        // 刷新时间
        let RadarController = window.__require('RadarController');
        let radarData = RadarController.RadarController.Instance.getData();
        let delta = radarData.endTime - dataCenter.DATA.ServerTime;
        radar.newMessionTime = Math.floor(delta / 3600) + ':' + Math.floor(delta / 60) + ':' + delta % 60

        radar.messionStorage = radarData.taskPoolSurplusNum;
        radar.messionStorageMax = RadarController.RadarController.Instance.getTotalPool();

        let NWorldMapCoreBiz = window.__require('NWorldMapCoreBiz');
        if (NWorldMapCoreBiz.default.enabledNewMapSystem) {
            radar.marchingQueue = dataCenter.DATA.UserData.myMarchNum;
            radar.marchingQueueMax = dataCenter.DATA.UserData.myMarchNumMAX;
        } else {
            let WorldMapController = window.__require('WorldMapController');
            radar.marchingQueue = WorldMapController.getInstance().myMarchNum;
            radar.marchingQueueMax = WorldMapController.getInstance().myMarchNumMAX;
        }

        autoMessionUpdate();
    }
}

// 执行自动雷达，之前的THRadarTask作废，这个测试通过后就把之前的THRadarTask删掉
function autoMessionUpdate() {
    let radar = window.THVueApp2;
    switch (radar.status) {
        case 'reward':
            radar.status = 'ready';
            THIsLevelUpTip();
            // 关闭已经点开的奖励
            if (cc.find('UICanvas/PopLayer/UIFrameNone')) {
                cc.find('UICanvas/PopLayer/UIFrameNone').removeFromParent();
            }

            break;
        case 'interval':
            // 这段家在这，是因为有一些任务点击开始后就开始等待了，这里需要判断是否有体力
            if (THIsAddEnergyUIExist()) {
                // TODO: 根据用户选项决定是否添加体力或者直接结束
                radar.status = 'addEnergy1';
                break;
            }
            // 正在间隔，间隔计时器累计
            // radar.interval += 1;
            // 如果间隔时间足够（可以少1秒提前完成），进入ready状态
            // if (radar.interval >= radar.intervalMax) {
            // radar.interval = 0;
            // task.count += 1;
            // radar.status = 'ready';
            // task.log += 'finish ' + task.count + '/' + task.countMax + '\n';
            // }
            // radar.status = 'ready';
            // break;
        case 'ready':
            radar.logs = [];
            if (radar.messionStorage <= 0) {
                // radar.status = 'done';
                // radar.messions = [{ 'name': 'All done!' }];
                // break;
            }
            // 打开雷达界面，这步是必须的
            THRadarMessionStep0();
            radar.status = 'selectMession';
            // radar.messions = [{ 'name': 'Open radar' }];
            break;
        case 'selectMession':
            radar.logs.push({ 'log': 'select mession' });
            var messions = THGetAllMessions();

            if (window.THRadarSkipReward) {
                // 这里逻辑比较慢，每次这里都要重复一次才可以正常进行
                window.THRadarSkipReward = false;
            } else {
                // 可以领奖就先领奖
                for (var i = 0; i < messions.length; i++) {
                    mession = messions[i];
                    if (mession['state'] == 4) {
                        mession['mession'].itemClick();
                        radar.status = 'reward';
                        break;
                    }
                }
                if (radar.status == 'reward') {
                    radar.logs.push({ 'log': 'reward' });
                    break;
                }
            }

            // radar.messions.push({ 'name': 'Select mession' });
            // TODO：界面优先级应用
            messions.sort(function(a, b) {
                return a['priority'] - b['priority'];
            })
            if (messions.length <= 0) {
                radar.status = 'done';
                // task.log += 'there is no mession here!\n';
                break;
            }

            var mession = {};
            for (var i = 0; i < messions.length; i++) {
                // 要判断状态，0是未开始，1是怪物出现，暂时不明白
                // 2行军中、3进行中、4可领奖
                if (messions[i]['state'] == 0 || messions[i]['state'] == 1) {
                    mession = messions[i];
                    break;
                }
            }
            // TODO:应该不存在找不到任务的情况，暂时没有处理异常

            // 如果有必要，判断是否有队列
            if (mession.taskName == 'Eliminate the Dark Legion remnant' || mession.taskName == 'Destroy the Dark Legion Fort' ||
                mession.taskName == 'Treasure Ops' || mession.taskName == 'Gold Harvest Ops') {
                if (radar.marchingQueue >= radar.marchingQueueMax) {
                    // 进入interval状态，这个状态新界面是不可配置的，暂时就比直接进入ready稍微多1秒
                    radar.logs.push({ 'log': 'wait for march queue' });
                    radar.status = 'interval';
                    // if (radar.messions[radar.messions.length - 1]['name'] != 'Waiting for marching queue') {
                    //     radar.messions.push({ 'name': 'Waiting for marching queue' });
                    // }
                    break;
                }
            }
            window.THRadarCurrentTask = mession;
            // radar.messions.push({ 'name': 'start: ' + THRadarTaskToString(window.THRadarCurrentTask) });
            // 跳转到指定任务类型的step0
            radar.status = 'step0';
            break;
        case 'step0':
            // 打开雷达界面，如果有必要，其实在选取任务的时候就应该已经打开了
            // 这步也许可以跳过
            // THRadarMessionStep0();
            // // 进入 step1
            // radar.status = 'step1';
            // break;
        case 'step1':
            // 点开任务
            var ret = THRadarMessionStep1(window.THRadarCurrentTask);
            if (!ret) {
                radar.status = 'retry';
                // radar.messions.push({ 'name': 'open UI1 failed:' + THRadarTaskToString(window.THRadarCurrentTask) });
                break;
            }
            // 进入 step2
            radar.status = 'step2';
            break;
        case 'step2':
            // 点击界面上的Go
            var ret = THRadarMessionStep2();
            if (!ret) {
                radar.status = 'retry';
                // radar.messions.push({ 'name': 'open UI2 failed:' + THRadarTaskToString(window.THRadarCurrentTask) });
                break;
            }
            // 根据taskName，判断进入哪个类型的任务下一步
            if (window.THRadarCurrentTask['taskName'] == 'Eliminate the Dark Legion remnant') {
                radar.status = 'battleStep0';
            } else if (window.THRadarCurrentTask['taskName'] == 'Rescue Mission') {
                radar.status = 'resueStep0';
            } else if (window.THRadarCurrentTask['taskName'] == 'Destroy the Dark Legion Fort') {
                radar.status = 'destoryStep0';
            } else if (window.THRadarCurrentTask['taskName'] == 'Discover Dark Legion`s Treasure') {
                radar.status = 'resueStep0';
            } else if (window.THRadarCurrentTask['taskName'] == 'The Lost Treasure') {
                radar.status = 'resueStep0';
            } else if (window.THRadarCurrentTask['taskName'] == 'Treasure Ops') {
                radar.status = 'battleStep0';
            } else if (window.THRadarCurrentTask['taskName'] == 'Gold Harvest Ops') {
                radar.status = 'destoryStep0';
            } else {
                // 未知类型，直接推出
                // radar.messions.push({ 'name': 'unsupport mession type failed:' + THRadarTaskToString(window.THRadarCurrentTask) });
                radar.status = 'failed';
                break;
            }
            break;
        case 'addEnergy0':
            if (THIsAddEnergyUIExist()) {
                // 体力不足
                radar.logs.push({ 'log': 'not enough energy' });
                radar.status = 'addEnergy1';
                break;
            }
            break;
        case 'addEnergy1':
            // 没有体力默认就结束
            radar.status = 'done';
            if (THAddEnergyStep1()) {
                // 返回true代表吃药
                radar.logs.push({ 'log': 'add energy' });
                radar.status = 'addEnergy2';
            }
            break;
        case 'addEnergy2':
            THAddEnergyStep2();
            // radar.messions.push({ 'name': 'add energy!' });
            radar.status = 'addEnergy3';
            break;
        case 'addEnergy3':
            THAddEnergyStep3();
            // 直接回到ready重来
            radar.status = 'ready';
            break;
        case 'resueStep0':
            var ret = THRadarRescueMessionStep0();
            if (!ret) {
                radar.logs.push({ 'log': 'open resue UI0 failed:' + THRadarTaskToString(window.THRadarCurrentTask) });
                radar.status = 'retry';
                break;
            }
            // 进入 interval
            radar.status = 'interval';
            break;
        case 'destoryStep0':
            // 点击攻击按钮
            var ret = THRadarDestoryMessionStep0();
            if (!ret) {
                radar.logs.push({ 'log': 'open destory UI0 failed:' + THRadarTaskToString(window.THRadarCurrentTask) });
                radar.status = 'retry';
                break;
            }
            // TODO：10体力那个好像按钮不一样
            radar.status = 'battleStep1';
            // 进入 battleStep1
            break;
        case 'battleStep0':
            // 点击攻击按钮
            var ret = THRadarBattleMessionStep0();
            if (!ret) {
                radar.logs.push({ 'log': 'open battle UI0 failed:' + THRadarTaskToString(window.THRadarCurrentTask) });
                radar.status = 'retry';
                break;
            }
            // TODO：10体力那个好像按钮不一样
            radar.status = 'battleStep1';
            // 进入 battleStep1
            break;
        case 'battleStep1':
            // 有可能在这体力不足
            if (THIsAddEnergyUIExist()) {
                radar.status = 'addEnergy0';
                break;
            }
            // 上阵
            THRadarBattleMessionStep1();
            // 进入 battleStep2
            radar.status = 'battleStep2';
            break;
        case 'battleStep2':
            // 出战
            THRadarBattleMessionStep2();
            // 进入 interval
            radar.status = 'interval';
            break;
        case 'retry':
            if (radar.retry >= radar.retryMax) {
                radar.status = 'failed';
                break;
            }
            // 重试，先计时，时间到了再重试
            radar.retryTimer += 1;
            if (radar.retryTimer > radar.retryTimeMax) {
                radar.retryTimer = 0;
                // 重试直接从ready开始
                radar.retry += 1;
                radar.logs.push({ 'log': 'retry ' + radar.retry });

                radar.status = 'ready';
                break;
            }
            break;
        default:
            // 没有找到状态，直接退出吧
            // TODO：任务终止
            // radar.status = 'done';
            // radar.messions.push({ 'name': 'mession failed,stop it' });
            break;
    }
    // console.log(radar.status);
    return radar.status;
}

function THRadarTaskStartButtonClicked2() {
    gtag && gtag('event', 'THRadarTaskStartButtonClicked2', { 'send_to': 'G-EGJ78MKRZC' });
    let radar = window.THVueApp2;
    radar.status = 'ready';
    radar.retry = 0;
}

function THRadarTaskStopButtonClicked2() {
    let radar = window.THVueApp2;
    radar.status = 'done';
}