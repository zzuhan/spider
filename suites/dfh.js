// http://www.dongfanghong.com.cn/bbs/forum.php?mod=forumdisplay&fid=11&page=1
function inspect() {
    var selectors = {
        titleWrap: '#moderate tbody th',
        title: '> a:first'
    }, 
    items = [],
    $titles,
    keywordsRegex = /整车|公路车|山地车|骑行服/;

    $titles = $(selectors.titleWrap).find(selectors.title);

    $titles.each(function () {
        var $title = $(this),
            item;

        item = {
            title: $title.text(),
            tid: $title.attr('href').match(/(?:\?|&)tid=(\d+)(&|$)/)[1]
        }

        if(keywordsRegex.test(item.title)) items.push(item);
    });

    console.record('dfh', items);
}


function prepare() {
// function setup|getData() {
    var urlBase = 'http://www.dongfanghong.com.cn/bbs/forum.php?mod=forumdisplay&fid=11&page=',
        pageIds =[1,2,3,4,5],
        urls,
        waitSelector = '#moderate';

    urls = pageIds.map(function (pageId) {
       return urlBase + pageId;
    });

    return {    
        url: urls,
        waitSelector: waitSelector,
        inspect: inspect
    } 
}

function check() {

}

module.exports = {
    prepare: prepare
}