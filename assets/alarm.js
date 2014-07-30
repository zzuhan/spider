console.alarm = function (subject, content) {
	var str = '[alarm]';
	str += JSON.stringify({
		subject: subject,
		content: content
	});

	console.log(str)
}