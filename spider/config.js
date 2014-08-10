require = patchRequire(require);

var spider = require('./spider');

var errorHandler = require('./modules/error-handler');

// casperjs 配置
module.exports = {
	viewportSize: { 
        width:1366, 
        height:768
    },
	clientScripts: [ 
        __spiderpath + "/public/jquery.js",
        __spiderpath + "/public/functions.js" 
    ],
	pageSettings: { 
        loadImages: false 
    },
	verbose: true,
	onError: function (casper, msg) {
		console.log('FATAL with: ' + msg);
        // 不能退出，因为是顺序的区抓取
		// casper.exit();
	},
    // 防止发生错误，整个串行的都终止了
    exitOnError: false,
    // 
    onWaitTimeout: function () {
        // @todo 写入error
        this.echo('!!!wait timeout');
        spider.error('timeout: ' + this.requestUrl);
        // nothing 怎么跳过这一步，到执行传入run的callback
    },
    waitTimeout: 1000,
    onAlert: function () {
        // this.echo("!!!has a alert dialog, can't handle it");
    }
}