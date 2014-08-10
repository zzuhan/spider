/**
 * TODO 
 * 'INSPECT ERROR' 做成常量
 */

function inspect() {
    // 做成map吧
    var selectors = {
        name: '.b1_m_r h1',
        thumb: '.b1_m_l img:first',
        thumb2: '#lbox1 img:first',
        desc: '#introduce2',
        // 将GameKey的el移除
        operate: '.operate',
        // 通过判断其附近的title 如何开始，游戏目标
        start: '.game_caption',
        goal: '.game_caption',
        playurl: '.b1_m_l a:last',
        // info: '.game_info1 p:first',
        // 可能为game_info或game_info1
        info: '.b1_m_r p:first',
        rightArea: '.b1_m_r'
    },
    regexps = {
        date: /日期：\s*([\d-]+)/
    },
    ERROR_TXT = 'INSPECT ERROR',
    data = null,
    href = window.location.href,
    gkeyRegex = /\/(\d+)\.htm$/i,
    gkey;

    gkey = href.match(gkeyRegex)[1];
    console.log(gkey);

    var getDate = function () {
        var matches = $(selectors.rightArea).text().match(regexps.date);
        return matches ? matches[1] : undefined;
    };

    // 替换有影响的数据
    $(selectors.operate).find('#GameKey').remove().end()
        .html( $(selectors.operate).html().replace(/<br>/g, '\n'));

    // 记录数据
    data = {};

    // 基本信息
    data.name = $(selectors.name).text();
    data.thumbUrl = $(selectors.thumb).attr('src') || $(selectors.thumb2).attr('src') || ERROR_TXT;
    data.desc = $(selectors.desc).text();

    // 大小，日期
    var $info = $(selectors.info),
        infoParts, size, date;

    if($info.length) {
        infoParts = $info.text().split('|');
        size = infoParts[1] && infoParts[1].split('：')[1].trim(),
        date = infoParts[2] && infoParts[2].split('：')[1].trim();
    }
    
    data.size = size || ERROR_TXT;
    // 日期更进一步，用正则来查找一下
    if(!date) {
        date = getDate();
    }
    data.date = date || ERROR_TXT;

    // 指南区
    data.operate = $(selectors.operate).text().trim();
    data.start = $($(selectors.start)[0]).text();
    data.goal = $($(selectors.goal)[1]).text();
  
    data.playurl = $(selectors.playurl).attr('href');

    // 通知
    // title content 
    // console.alarm('游戏:'+data.name, JSON.stringify(data));
    console.record(gkey, data);
}

function prepare() {
    var gameurls = getGameUrls(),
        waitSelector = '.lplay';

    return {
        url: gameurls,
        waitSelector: waitSelector,
        inspect: inspect
    }    
}

function check(){
    var gameurls = getGameUrls(),
        // gameurls = require('../db/gameurls'),
        data = require('fs').read('db/gamedata.json'),
        gkeys = [];

    if(data) data = JSON.parse(data);

    gameurls.forEach(function (url, index) {
       var gkey =  url.match(/\/(\d+)\.htm$/i)[1];
       
       if(!data[gkey]) {
        console.log('error gkey: ' + gkey + ' not grab success');
       }
    });
}

// Helpers
function getGameUrls () {
    return require('../db/gameurls').slice(0,10);
    // return require('../db/gameurls');
}

module.exports = {
    prepare: prepare,
    check: check
};