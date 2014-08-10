var require = patchRequire(require);

var spider = require('../spider');

var casper = require('casper');
var utils = require('utils');

var colorizer = require('colorizer').create('Colorizer');
// @todo why 这个要加.js后缀才能找到
var defaultConfig = require('../config.js');

var Spider = function (config) {
    // TODO config mix
    this._casper = casper.create(defaultConfig);

    this.listenCasperEvents();
}   

Spider.prototype.listenCasperEvents = function() {
    var consoleAlarm = require('./console.alarm'),
        consoleRecord = require('./console.record'),
        errorHandler = require('./error-handler'),
        casper = this._casper;

    casper.on('remote.message', onRemoteMessage)

    function onRemoteMessage(msg) {
        try {
            msg = JSON.parse(msg);
        } catch(err) {}

        if(typeof msg === 'string') {
            msg = {content: msg};
        }
       
        var action = msg.action,
            subject = msg.subject,
            content = msg.content,
            handlers = {
                alarm: consoleAlarm,
                record: consoleRecord
            },
            supportActions = Object.keys(handlers);

        spider.log('remote message caught: ' + content);

        if(supportActions.indexOf(action) !== -1 ) {
            handlers[action]({
                subject: subject,
                content: content
            })
        }
       
    }

    casper.on('page.error', errorHandler);
}


/**
 * 抓取核心
 * @param {String|Array} urls          抓取的url
 * @param {String} waitSelector - 等待出现的DOM的selector
 * @param {[type]} listener     - 执行函数
 * @param {String} opetions - 
 */
Spider.prototype.grab  = function (urls, waitSelector, listener, options) {
    var currentIndex = 0,
        remoteVars = options.remoteVars || [],
        casper = this._casper;

    if(!utils.isArray(urls)) {
        urls = [urls];
    }

    casper.start();

    casper.then(function () {
        this.echo("## Starting grab " + urls.length + " pages", "COMMENT");
    });

    var check = function () {
        if(urls[currentIndex]) {
            var remoteVar = remoteVars[currentIndex],
                url = urls[currentIndex];
            casper.echo(colorizer.colorize("SUCCESS", "INFO") + " " + colorizer.colorize("[open page]", "PARAMETER") + " " + url);
            casper.start(urls[currentIndex]).waitUntilVisible(waitSelector, function then() {
                this.echo('# a inspect start ', 'COMMENT');
                this.evaluate(listener, remoteVar);
            });
            currentIndex++;
            casper.run(function () {
                this.echo('# a inspect end ', 'COMMENT');
                check.call(this);
            });
        } else {
            this.echo("Congratulation!!! All done", "INFO");
            options.onFinished && options.onFinished();
        }
    }

    casper.run(check);
}

Spider.prototype.exit = function () {
    var casper = this._casper;
    casper.exit();
}

module.exports = Spider;