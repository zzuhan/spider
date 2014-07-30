var monitor = require('monitor');

var url = 'http://www.4399.com/flash/138004.htm';

monitor.addGuard(url, function () {
	// 做成map吧
	var selectors = {
		name: '.b1_m_r h1',
		thumb: '#curpic',
		desc: '#introduce2',
		// 将GameKey的el移除
		manual_op: '.operate',
		// 通过判断其附近的title 如何开始，游戏目标
		manual_start: '.game_caption'
		manual_goal: '.game_caption'
	}

		data = {};

	data.name = $(selectors.name).text();
	data.thumbUrl = $(selectors.thumb).attr('src');
	data.desc = $(selectors.desc).text();

	// 通知
	// title content 
	console.alarm('游戏:'+data.name, JSON.stringify(data));
});

monitor.run();