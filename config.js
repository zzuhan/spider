var __filepath = require('fs').absolute( require('system').args[3] );
// temp hack get __dirname
var filepathArr = __filepath.split('/');
filepathArr.pop();
window.__dirname = filepathArr.join('/');

// casperjs 配置
module.exports = {
	viewportSize: {width:1366, height:768},
	clientScripts: [ __dirname + "/assets/jquery.js", __dirname + "/assets/functions.js" ],
	pageSettings: { loadImages: false },
	verbose: true,
	onError: function (casper, msg) {
		console.log('FATAL with: ' + msg);
		casper.exit();
	}
}

