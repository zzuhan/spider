var fs = require('fs');

var utils = require('utils');

var spider = require('spider');

// TODO 使用dirname来拼接
var gameData = JSON.parse(fs.read('./db/gamedata.json')),
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

function grabFlash(){
    var gkey = window.location.href.match(/\/(\d+)_\d\.htm$/i)[1],
        flashUrl = '';

    // flash地址有很多种情况
    if(window.str1) {
        // 存在str1
        flashUrl = window.webServer +  window.str1;
    } else {
        // 还有play888.swf game888.html, play.swf,  game3.htm  main.swf
        // http://www.4399.com//flash/21674_3.htm
        flashUrl = $('#flash22').attr('src').replace(/\/\w+\.htm$/i, '/play.swf');
    } else {

    }

    console.record(gkey, {"flashurl": flashUrl});
}

// Main 
playUrls = getPlayUrls();

spider.addGrab(playUrls[0], waitSelector, grabFlash);

// var currentIndex = 1;

// var check = function () {
//     if(gameurls[currentIndex]) {
//         spider.addGrab(gameurls[currentIndex], waitSelector, grabData);
//         currentIndex++;
//         spider.run(check);
//     } else {
//         this.echo("Congratulation!!! All done");
//         this.exit();
//     }
// }

spider.run(function () {
    
});


