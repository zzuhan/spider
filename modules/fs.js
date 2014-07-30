var fs = require('fs');
exports.editFile = function(key,content){
	var id = key;
	fs.readFile(__dirname + '/data.json', function (err, data) {
			data = JSON.parse(data);
			if(data[0].files[id]){
				data[0].files[id] = content;
				fs.writeFile(__dirname + '/data.json',JSON.stringify(data));
			}else{
			}
		});
};