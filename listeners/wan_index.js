var monitor = require('monitor');

var url = 'http://wan.360.cn';

monitor.addGuard(url, function () {
	var containerSelector = '#side_newsvr',
		selector = 'li';

	var $container = $(containerSelector),
		$els = $container.find(selector);

	// 所有游戏数据
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

	// 重复的放入垃圾桶中
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

	// 获取所有重复项
	var repeatZones = trash.getAll();
	$.each(repeatZones, function (key, zones) {
		if(zones.length >= 2) {
			console.log('重复等于或大于2次了');
			console.alarm('首页-新开服-游戏区服重复', '重复游戏: '+key + ', 重复区服: '+zones.join(', '));
		} 
	});

});

monitor.run();