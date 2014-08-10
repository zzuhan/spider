var fs = require('fs');

// fs.changeWorkingDirectory(fs.);

// TODO 使用dirname来拼接

function inspect(){
    var gkey = window.location.href.match(/\/(\d+)_\d\.htm$/i)[1],
        flashUrl = '';

    // flash地址有很多种情况
    if(window.str1) {
        // 存在str1 直接抓取flashUrl
        flashUrl = window.webServer +  window.str1;
    } else {
        // 存在iframe，则先把iframe地址搞出来
        flashUrl = $('#flash22').attr('src');
    } 

    console.record(gkey, {"flashurl": flashUrl});
}

function prepare(){
    var gameData = JSON.parse(fs.read('db/gamedata.json')),
        waitSelector = '.b11_bg',
        playUrls = [];

    function getPlayUrls(){
        var ret = []
        for(var gkey in gameData){
            var game = gameData[gkey];
            ret.push('http://www.4399.com/' + game['playurl']);
        }
        return ret;
    }

    playUrls = getPlayUrls();

    return {
        url: playUrls,
        waitSelector: waitSelector,
        inspect: inspect
    }
}

module.exports = {
    prepare: prepare
};
