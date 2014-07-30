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

// registerLisntener
// fuck 这个耦合了。把visible的选择器也提出来
exports.addGuard = function (url, listener) {
	casper.start(url).waitUntilVisible('.lplay', function then() {
		console.log('--monitor start--');
		this.evaluate(listener);
	});
}

exports.run = function () {
	casper.run(function () {
		console.log('--monitor end--');
		casper.exit();
	});
}

