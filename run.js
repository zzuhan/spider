var spider = require('spider');

var urls = [
	'http://www.4399.com/flash/47931.htm',
	'http://www.4399.com/flash/90302.htm',
	'http://www.4399.com/flash/135881.htm',
	// 'http://www.4399.com/flash/90302.htm',
	// 'http://www.4399.com/flash/133630.htm',
	// 'http://www.4399.com/flash/6232.htm',
	// 'http://www.4399.com/flash/138380.htm',
	// 'http://www.4399.com/flash/136516.htm',
	// 'http://www.4399.com/flash/70215.htm',
	// 'http://www.4399.com/flash/21674.htm',
	// 'http://www.4399.com/flash/137953.htm',
	// 'http://www.4399.com/flash/138596.htm',
	'http://www.4399.com/flash/138976.htm'
],
	waitSelector = '.lplay';

// var url = 'http://www.4399.com/flash/108635.htm';

function grabData() {
	// 做成map吧
	var selectors = {
		name: '.b1_m_r h1',
		thumb: '#curpic',
		desc: '#introduce2',
		// 将GameKey的el移除
		manual_op: '.operate',
		// 通过判断其附近的title 如何开始，游戏目标
		manual_start: '.game_caption',
		manual_goal: '.game_caption'
	},
		data = {};

	// 删除有影响的数据
	$(selectors.manual_op).find('#GameKey').remove();

	data.name = $(selectors.name).text();
	data.thumbUrl = $(selectors.thumb).attr('src');
	data.desc = $(selectors.desc).text();
	data.manualop = $(selectors.manual_op).text();
	data.start = $($(selectors.manual_start)[0]).text();
	data.goal = $($(selectors.manual_goal)[1]).text();

	// 通知
	// title content 
	console.alarm('游戏:'+data.name, JSON.stringify(data));
}

// casper.start();

// casper.then(function () {
// 	this.echo("Starting grab many pages");
// });

spider.addGrab(urls[0], waitSelector, grabData);

// TODO 下面这一部分，封装进spider, 函数addGrabs
var currentIndex = 1;

var check = function () {
	if(urls[currentIndex]) {
		spider.addGrab(urls[currentIndex], waitSelector, grabData);
		currentIndex++;
		spider.run(check);
	} else {
		this.echo("Congratulation!!! All done");
		this.exit();
	}
}

spider.run(check);
