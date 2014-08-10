// #!/usr/bin/env casperjs
// @todo 
// - 这个文件就不要动了，自动读取suites中的内容，然后执行抓取
// - 加入支持suites=dfh,4399 的输入

/**
 * 可以方便的控制只走哪一步，
 */

var require = patchRequire(require);
var fs = require('fs');

var Spider = require('./spider/spider');

var grabInfo = require('suites/info');
var	grabFlash = require('suites/flash');
var	grabFlash2 = require('suites/flash2');
var	test = require('suites/test');
var	dfh = require('suites/dfh');

var spider;

function prepare(){
	var errFile = 'error.txt';
	if (fs.isFile(errFile)) {
		fs.remove(errFile);
	}
}

// obj是一个
function startGrab(obj ,then){
	var options = Spider.utils.extend( (obj.options || {}), {
		onFinished: then
	});

	spider.grab(obj.url, obj.waitSelector, obj.inspect, options);
}

function runSequence(grabs){
	var grabObj,
		runOne = function () {
			// 逻辑
			if (grabObj = grabs.shift()) {
				var check = grabObj.check;
				startGrab(grabObj.prepare(), function () {
					check && check();
					runOne();
				});
			} else {
				console.log('All done');
				spider.exit();
			}
		};

	runOne();
}

/**
 * Main Logic
 */
function init() {
	spider = Spider.create();
	// 清空error.fs._toUnixTimestamp(time);
	prepare();

	// 
	runSequence([
		grabInfo,
		grabFlash,
		// grabFlash2,
		// test,
		// dfh
	]);

}
init();

