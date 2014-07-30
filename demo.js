/*****************
 using casperjs
*****************/

// 如何发送报警？发送邮件？
// 

// var casper = require('casper').create({
// 	viewportSize: {width:1366, height:768},
// 	clientScripts: [ "_includes/jquery.js", "_includes/alarm.js" ],
// 	pageSettings: { loadImages: false },
// 	verbose: true,
// 	onError: function (casper, msg) {
// 		console.log('FATAL with: ' + msg);
// 		casper.exit();
// 	}
// });

// casper.on('remote.message', function (msg) {
// 	this.echo('remote message caught: ' + msg);

// 	// 检测某种类型的log，然后执行相应的函数
// 	var rType = /^\[(\w+)\]/i;

// 	var type = rType.exec(msg)[1];
// 	// 
// 	if(type == 'alarm') {
// 		var dataStr, data;

// 		dataStr = msg.replace(rType, '');
// 		data = JSON.parse(dataStr);
		
// 		// alarm(data);
// 	}
// });

function alarm(data){
	console.log('alarm');
	var page = require('webpage').create();
	page.open(buildUrl(data.title, data.msg), function (status) {
		if(status !== 'success') { console.log('报警失败'); }
		page.close();
	});

	function buildUrl(subject, msg){
		var url = 'http://alarms.ops.qihoo.net:8360/intfs/alarm_intf?group_name=$alarm_group_name';

		url += ('&subject=' + subject);
		url += ('&content=' + msg);

		return url;
	}

}

// TODO 有没有remote.error或者什么？
// remote的报警消息，然后从这里发送

var wanUrl = 'http://wan.360.cn';

casper.start(wanUrl, function checkRepeatServerNames() {
	// 里面算是写的监控脚本
	this.evaluate(function () {
		var containerSelector = '#side_newsvr',
			selector = 'li';

		var $container = $('#side_newsvr');
		var $els = $container.find(selector);

		var gamesData = $els.map(function () {
			var $el = $(this);

			return {
				name: $el.find('.open_service_info_list_name').text(),
				zone: $el.find('.open_service_info_list_servers').text()
			}
		});	

		var trash = {
			_storage: {},

			add: function (key, value) {
				if(!this._storage[key]) {
					this._storage[key] = [];
				}
				if(this._storage[key].indexOf(value) != '-1') return;

				this._storage[key].push(value);
			},

			get: function (key) {
				return this._storage[key];
			},

			getAll: function () {
				return this._storage;
			}
		}

		// 非数字开头，前四个字一样
		gamesData.each(function (i, gameData) {
			var otherZone, zone, j
				rDigitBegin = /^\d+/;

			zone = gameData['zone'];
			while(otherGameData = gamesData[++i]){
				var otherZone = otherGameData['zone'];

				if(!rDigitBegin.test(otherZone) && (cut(zone) == cut(otherZone)) ){
					trash.add(gameData['name'], zone );
					trash.add(gameData['name'], otherZone);

					// TODO 如果删除一个，后面紧邻的相同就会跳过
					// gamesData.splice(i, 1);
				} 
			}

			function cut(val){
				return val.substr(0, 4);
			}
		});

		var repeatZones = trash.getAll();

		$.each(repeatZones, function (key, zones) {
			console.log(key);
			console.log(zones.length);
			if(zones.length >= 3) {
				console.alarm('首页-新开服-游戏区服重复', '重复游戏: '+key + ', 重复区服: '+zones.join(', '));
			}
		});

	});

});	

casper.run(function () {
	console.log('scripts start');
	casper.exit();
});