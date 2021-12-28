// Gold MineId列表，找策划要的
const THJKIdList = [1701,1702,1703,1704,1705,1706,1707,1708,1709,1710,1711,1712,1713,1714,1715,1716,1717,1718,1719,1720,1721,1722,1723,1724,1725,1726,1727,1728,1729,1730,1731,1732,1733,1734,1735,1736,1737,1738,1739,1740,1741,1742,1743,1744,1745,1746,1747,1748,1749,1750,1751,1752,1753,1754,1755,1756,1757,1758,1759,1760,1761,1762,1763,1764,1765,1766,1767,1768,1769,1770,1771,1772,1773,1774,1775,1776,1777,1778,1779,1780,1781,1782,1783,1784,1785,1786,1787,1788,1789,1790,1791,1792,1793,1794,1795,1796,1797,1798,1799,1800];

// 获取Gold Mine信息
function THGetJKinfos() {
    ret = [];
    if (!cc.find('Canvas/HomeMap')){
        return ret;
    }
    for(var i = 0; i <THJKIdList.length;++i){
        ret[i] = 0;
    }
    bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
    for (var i = 0; i < bList.length; ++i) {
        b = bList[i]; if (b.name == 'BuildingItem') {
            c = b.getComponent('BuildingItem');
            index = THJKIdList.indexOf(c.ItemData.id);
            if (index<0){
                continue;
            }
            ret[index] += 1;
        }
    }
    return ret;
}

// 获得Gold Mine科技等级，返回( Merge level, Building level)
function THGetJKKJ() {
    var dataCenter = window.__require('DataCenter');
    if(!dataCenter.DATA.UserData.getScienceByGroupId(310000)){
        // 不能获得用户科技，大概率是没有登录成功
        return;
    }
    var maxLevel = dataCenter.DATA.UserData.getScienceByGroupId(310000)._Data.level;
    var buildLevel = dataCenter.DATA.UserData.getScienceByGroupId(300000)._Data.level;
    return [maxLevel,buildLevel];
}

// 显示主界面
function showJKUI() {
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
    rootDiv.style.height='300px';
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

    THJKDivInit();
}

function THJKDivInit() {
    // 底板
    var parentNode = document.getElementById("topwar_helper_rootDiv");
    var JKDiv = document.createElement("div");
    JKDiv.id = 'topwar_helper_JKDiv';
    JKDiv.style.width='400px';
    JKDiv.style.height='260px';
    JKDiv.style.background='pink';
    parentNode.append(JKDiv);
    
    var JKTitle = document.createElement("h3");
    JKTitle.style.margin='4px';
    JKTitle.innerHTML = 'Gold Mine';
    JKDiv.append(JKTitle);
    
    var JKContentDiv = document.createElement("div");
    JKContentDiv.id = 'topwar_helper_JKContentDiv';
    JKContentDiv.style.width='390px';
    JKContentDiv.style.height='210px';
    JKContentDiv.style.background='pink';
    JKContentDiv.style.display='flex';
    JKContentDiv.style.padding='5px';
    JKDiv.append(JKContentDiv);

    // 简单排版
    var JKLeftDiv = document.createElement("div");
    JKLeftDiv.id = 'topwar_helper_JKLeftDiv';
    JKLeftDiv.style.width='185px';
    JKLeftDiv.style.height='200px';
    JKLeftDiv.style.background='pink';
    JKLeftDiv.style.padding='5px';
    JKContentDiv.append(JKLeftDiv);

    var JKRightDiv = document.createElement("div");
    JKRightDiv.id = 'topwar_helper_JKRightDiv';
    JKRightDiv.style.width='185px';
    JKRightDiv.style.height='200px';
    JKRightDiv.style.background='pink';
    JKRightDiv.style.padding='5px';
    JKContentDiv.append(JKRightDiv);

    // Technology
    var [JKMaxLevel,JKBuildLevel] = THGetJKKJ();
    {
        // console.log(JKMaxLevel,JKBuildLevel);
        var JKKJDiv = document.createElement("div");
        JKKJDiv.id = 'topwar_helper_JKKJDiv';
        JKKJDiv.style.width='185px';
        JKKJDiv.style.height='80px';
        JKKJDiv.style.background='white';
        JKLeftDiv.append(JKKJDiv);
    
        var JKKJTitle = document.createElement("h4");
        JKKJTitle.style.margin='8px';
        JKKJTitle.innerHTML = 'Technology';
        JKKJDiv.append(JKKJTitle);
    
        var JKBuildLevelLabel = document.createElement("h5");
        JKBuildLevelLabel.style.margin='0px';
        JKBuildLevelLabel.innerHTML = 'Gold Mine building level:'+JKBuildLevel;
        JKKJDiv.append(JKBuildLevelLabel);
    
        var JKMaxLevelLabel = document.createElement("h5");
        JKMaxLevelLabel.style.margin='0px';
        JKMaxLevelLabel.innerHTML = 'Gold Mine merge level:'+JKMaxLevel;
        JKKJDiv.append(JKMaxLevelLabel);
    }
    
    // 当前状态
    var bgcInfos = THGetJKinfos();
    {
        var JKInfoDiv = document.createElement("div");
        JKInfoDiv.id = 'topwar_helper_JKInfoDiv';
        JKInfoDiv.style.width='185px';
        JKInfoDiv.style.height='190px';
        JKInfoDiv.style.background='white';
        JKRightDiv.append(JKInfoDiv);

        var JKInfoTitle = document.createElement("h4");
        JKInfoTitle.style.margin='8px';
        JKInfoTitle.innerHTML = 'Status';
        JKInfoDiv.append(JKInfoTitle);

        for (var i=0;i<bgcInfos.length; ++i){
            if (bgcInfos[i]>0){
                var level = i+1;

                var label = document.createElement("h5");
                label.style.margin='0px';
                label.innerHTML = 'Level:'+level+' count:'+bgcInfos[i];
                JKInfoDiv.append(label);
            }
        }
    }

    // 制造任务
    {
        var JKTaskDiv = document.createElement("div");
        JKTaskDiv.id = 'topwar_helper_JKTaskDiv';
        JKTaskDiv.style.width='185px';
        JKTaskDiv.style.height='100px';
        JKTaskDiv.style.background='white';
        JKLeftDiv.append(JKTaskDiv);

        var JKTaskTitle = document.createElement("h4");
        JKTaskTitle.style.margin='8px';
        JKTaskTitle.innerHTML = 'Build task';
        JKTaskDiv.append(JKTaskTitle);

        var JKTaskDescribtion = document.createElement("h6");
        JKTaskDescribtion.style.margin='0px';
        JKTaskDescribtion.innerHTML = 'Build Gold Mine level '+JKMaxLevel+' to the following quantity';
        JKTaskDiv.append(JKTaskDescribtion);

        var JKTaskInput = document.createElement("input");
        JKTaskInput.type = 'text';
        JKTaskInput.id = 'topwar_helper_JKTaskInput';
        JKTaskInput.value = bgcInfos[JKMaxLevel-1];
        JKTaskDiv.append(JKTaskInput);

        JKTaskButton = document.createElement("button");
        JKTaskButton.id = 'topwar_helper_JKTaskButton';
        JKTaskButton.innerHTML = 'Dispatch a task';
        JKTaskButton.setAttribute("onclick", "JKTaskButtonClicked()");
        JKTaskDiv.append(JKTaskButton);        
    }
}

// 更新Gold Mine状态，更新到界面，如果有
function THJKStatusUpdate() {
    var JKInfoDiv = document.getElementById('topwar_helper_JKInfoDiv');
    if (!JKInfoDiv) {
        return;
    }
    var bgcInfos = THGetJKinfos();
    var ndList = JKInfoDiv.childNodes;
    // 清楚旧内容第一个是标题，不用更新
    for (var i = ndList.length-1; i >0; i--) {
        JKInfoDiv.removeChild(ndList[i]);
    }
    // 添加新内容
    for (var i=0;i<bgcInfos.length; ++i){
        if (bgcInfos[i]>0){
            var level = i+1;

            var label = document.createElement("h5");
            label.style.margin='0px';
            label.innerHTML = 'Level '+level+' count:'+bgcInfos[i];
            JKInfoDiv.append(label);
        }
    }

    if (window.THData.Status.JKStatus) {
        var label = document.createElement("h5");
        label.style.margin='0px';
        label.innerHTML = window.THData.Status.JKStatus;
        JKInfoDiv.append(label);
    }
}

// 处理建造Gold Mine的任务
function THJKBuildTask(task) {
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
    // 如果已有足够多的Gold Mine，任务结束
    var bgcInfos = THGetJKinfos();
    if (bgcInfos[task.level-1]>= task.count){
        // console.log("mission completed");
        status = 'mission completed';
        for (var i = 0; i <window.THData.Tasks.length;++i){
            task = window.THData.Tasks[i];
            if (task.type == 'JKBuild') {
                window.THData.Tasks.splice(i, 1);
                break;
            }
        }
        return status;
    }
    
    var canMergeJKId = 0;
    // 从低级开始到 Merge level的前一级，找到能合并的Gold Mine
    for (var i = 0; i < task.level-1;++i){
        if (bgcInfos[i]>1) {
            canMergeJKId = THJKIdList[i];
            break;
        }
    }
    if (canMergeJKId > 0) {
        // console.log('try 2 merge');
        status = 'Merging';
        var itemList = [];
        // 如果有可以合成的Gold Mine，就合成
        var bList = cc.find('Canvas/HomeMap/BuildingNode').getChildren();
        for (var i = 0; i < bList.length; ++i) {
            b = bList[i]; 
            if (b.name == 'BuildingItem') {
                c = b.getComponent('BuildingItem');
                if (c.ItemData.id == canMergeJKId){ 
                    itemList.push(c);
                }
            }
        }
        THMerge(itemList);
    }else {
        status = 'Building';
        // console.log('try 2 build');
        // 不能合成就要建造一个目前可以建造的Gold Mine
        // 其实目前可以调接口建更低级的，但是暂时不考虑等级比目前 Building level还低的，没需求
        var [JKMaxLevel,JKBuildLevel] = THGetJKKJ();
        var buidingId =  THJKIdList[JKBuildLevel-1];
        homeMap.BuildNewBuilding(buidingId,-1,true);
        homeMap.BuildNewBuilding(buidingId,-1,true);
    }
    return status;
}

function JKTaskButtonClicked() {
    var JKTaskInput = document.getElementById('topwar_helper_JKTaskInput');("input");
    // 找到旧的同类任务，删掉然后添加新的
    for (var i = 0; i <window.THData.Tasks.length;++i){
        task = window.THData.Tasks[i];
        if (task.type == 'JKBuild') {
            window.THData.Tasks.splice(i, 1);
            break;
        }
    }

    newTask = {
        type : 'JKBuild',
        level: THGetJKKJ()[0],
        count: parseInt(JKTaskInput.value) 
    }
    window.THData.Tasks.push(newTask);
}