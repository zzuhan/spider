var fs = require('fs');

var dbFile = __dirname + '/data.json';

var save = exports.save = function(key, value){
	var id = key;

	fs.readFile(dbFile, function (err, data) {
			data = data ? JSON.parse(data.toString()) : {};

            data[key] = value;

            console.log(data);

            fs.writeFile(dbFile, JSON.stringify(data));
   //          if(data[key]) {}

			// if(data[0].files[id]){
			// 	data[0].files[id] = content;
			// 	fs.writeFile(__dirname + '/data.json',JSON.stringify(data));
			// }else{
			// }
		});
};


