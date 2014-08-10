var require = patchRequire(require);

var page = require('webpage').create();
var colorizer = require('colorizer').create('Colorizer');

/**
 * 数据存储请求接口，和node通信
 * @param  {Object} data {subject: 'I am the save key or call me key', content: 'true content'}
 * @todo  如何做content的储存，可能是字符串，数组，对象
 * @return {[type]}      [description]
 */
function record(data){

    function buildUrl(subject, content){
        var url = 'http://localhost:1177/?';

        url += ('subject=' + encodeURIComponent(subject));
        // url += ('&content=' + encodeURIComponent(content));

        return url;
    }

    // function serialize(obj){
    //     var str = '';
    //     for(var key in obj) {
    //         str += (key + '=' + encodeURIComponent(obj[key]) + '&');
    //     }
    //     // 截掉最后一位
    //     str = str.slice(0, str.length-1);
    //     return str;
    // }
    function buildReqBody(content){
        return "content=" + encodeURIComponent(JSON.stringify(content));
    }

    var url = buildUrl(data.subject, JSON.stringify(data.content));

    page.open(url, 'POST', buildReqBody(data.content), function (status) {

        if(status !== 'success') { 
            console.log(colorizer.colorize("FAIL", "INFO") + colorizer.colorize('[record]', 'PARAMETER') +  'failed, url' + url); 
        } else {
            console.log(colorizer.colorize("SUCCESS", "INFO") + " " + colorizer.colorize('[record]', 'PARAMETER') + ' ' + url);
        }
    });
    
}
module.exports = record;