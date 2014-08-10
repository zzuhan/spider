require = patchRequire(require);

// system modules
var system = require('system');
var fs = require('fs');

var utils = require('./modules/utils');
var errorHandler = require('./modules/error-handler');

/**
 * cli 参数
 */
var args = system.args;
args = utils.parseCLIArgs(args);

window.debugMode = args._debug;

/**
 * global paths
 * args[3] -> run.js
 * 
 */
var filepath = fs.absolute(args[3]),
    filedir = filepath.replace(/\/[^\/]+\.js$/, '/');

// export to gloabl
// TODO 这里不应该沾染__prjroot项目相关的东西
window.__prjroot = filedir;
window.__spiderpath = __prjroot + '/spider';

/*********************************************
 * spider 类方法
 *********************************************/
function log() {
    if (window.debugMode) {
        console.log.apply(console, Array.prototype.slice.call(arguments));
    }
}


/**
 * spider.create方法
 */
function create(config) {
    var Class = require('./modules/class');
    return new Class(config);
}

module.exports = {
    create: create,
	utils: utils,
    log: log,
    error: errorHandler
}