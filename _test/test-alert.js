// phantomjs 自动帮点alert框
var casper = require('casper').create();

var utils = require('utils');

var url = 'http://sxiao.4399.com/4399swf/upload_swf/ftp14/yzg/20140612/7/u3.htm'

casper.start(url).waitUntilVisible("body", function () {
    this.echo('unity shown');

    utils.dump(this.page);
    this.page.send({gkey:'123'});

    this.evaluate(function (args) {
        console.log(args);
         console.log(window.name);
    });
});

casper.on('remote.message', function (msg) {
    console.log(msg);
})

casper.run();