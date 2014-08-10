var require = patchRequire(require);
var fs = require('fs');
var utils = require('utils');
var colorizer = require('colorizer').create('Colorizer');


module.exports = function errorHandler(msg, trace){
    console.log(colorizer.colorize("RemoteError: " + msg + ' @' + Date.now(), "ERROR"))
    // trace 看不出来什么东西，有什么办法确认是哪个文件？
    // utils.dump(trace);
    // save to db
    var errFile = 'error.txt';
    fs.write(errFile, msg+'\n', 'a');
}