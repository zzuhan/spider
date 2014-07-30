var require = patchRequire(require);

var config = require('config');

var casper = require('casper').create(config);
// 这部分和alarm有点耦合，可以写成register(type, handler)
// ls
casper.on('remote.message', function (msg) {
	this.echo('remote message' + msg);
	this.echo('remote message caught: ' + msg);

	var rType = /^\[(\w+)\]/i;

	var type = rType.exec(msg)[1];
	if(type == 'alarm') {
		var data = JSON.parse( msg.replace(rType, '') );
		
		require('modules/alarm')(data)
	}
});

/**
 * 访问核心
 * @param {String} url          抓取的url
 * @param {String} waitSelector 等待出现的DOM的selector
 * @param {[type]} listener     执行函数
 */
exports.addGrab = function addGrab(url, waitSelector, listener) {
	casper.start(url).waitUntilVisible(waitSelector, function then() {
		console.log('--a grab start--');
		this.evaluate(listener);
	});
}

/**
 * 执行启动
 */
exports.run = function run(func) {
	casper.run(function () {
		console.log('--a grab end--');
		func.call(this);
	});
}

/**
 * [addGrabs description]
 * @param {[type]} urls         [description]
 * @param {[type]} waitSelector [description]
 * @param {[type]} listener     [description]
 */
exports.addGrabs = function addGrabs(urls, waitSelector, listener) {
	
};

