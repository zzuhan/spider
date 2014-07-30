var fs = require('fs');
exports.editFile = function(key,content){
	var id = key;
	fs.readFile(__dirname + '/data.json', function (err, data) {
		data = JSON.parse(data);
		data.files[id] = content;
		fs.writeFile(__dirname + '/data.json',JSON.stringify(data));
	});
};
