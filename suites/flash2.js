var fs = require('fs');

/**
 * @todo 是不是网页里都只有一个embed，那我获取embed就行了
 */

function inspect(gkey){
    var selector = '#flashgame embed',
        selector2 = '#swf1_em',
        selector3 = 'embed:first',
        flashUrl = '',
        embedSrc = '',
        $embed = null;

    if(($embed = $(selector)).length ){
        embedSrc  = $embed.attr('src');
    } else {
        $embed = $(selector2);
        // 更好的应该是数组last，或者最后一位
        embedSrc = $embed.attr('src').split('=')[2];
    }

    flashUrl = window.location.href.replace(/\w+\.htm(l)?$/, embedSrc);

    console.record(gkey, {"flashurl": flashUrl});
}

function prepare(){
    var gameData = JSON.parse(fs.read('db/gamedata.json')),
        waitSelector = 'body',
        playUrls = [],
        gkeys = [],
        prepareData = function () {
            // playUrls, gkeys
            for(var gkey in gameData){
                var game = gameData[gkey],
                    flashUrl = game['flashUrl'];

                if(flashUrl && flashUrl.match(/\.htm(l)?$/)) {
                // if(gkeys.indexOf(gkey) != -1) {
                    playUrls.push(flashUrl);
                    gkeys.push(gkey);
                }
            }
        }

  
    // Main
    prepareData();

    return {
        urls: playUrls,
        waitSelector: waitSelector,
        inspect: inspect,
        options: {
            remoteVars: gkeys
        }
    }
}

module.exports = {
    prepare: prepare
};