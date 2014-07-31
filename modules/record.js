function record(data){
    var page = require('webpage').create();

    function buildUrl(subject, content){
        var url = 'http://localhost:1121?';

        url += ('&subject=' + encodeURIComponent(subject));
        url += ('&content=' + encodeURIComponent(content));

        return url;
    }

    var url = buildUrl(data.subject, data.content);

    console.log('【记录】 url: ' + url);

    page.open(url, function (status) {
        if(status !== 'success') { 
            console.log('报警失败'); 
        } else {
            console.log('【报警】成功');
        }
    });

    
}
module.exports = record;