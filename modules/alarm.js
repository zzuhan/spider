function alarm(data){
	var page = require('webpage').create();

	var url = buildUrl(data.subject, data.content);
	console.log('【报警】 url: ' + url);
	page.open(url, function (status) {
		if(status !== 'success') { 
			console.log('报警失败'); 
		} else {
			console.log('【报警】成功');
		}
	});

	function buildUrl(subject, content){
		var url = 'http://localhost:1573?';

		url += ('&subject=' + encodeURIComponent(subject));
		url += ('&content=' + encodeURIComponent(content));

		return url;
	}
}
module.exports = alarm;

function localAlarm(data){
	var fs = require('fs');

	var logStr = + '[Time' + Date() + ']'
		+ data.subject + ' => '
		+ data.content
		+ '\n';

	fs.write( window.__dirname + '/log.js', logStr, 'a');
}
