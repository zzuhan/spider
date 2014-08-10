var fs = require('fs');
var util = require('util');

var dbFile = __dirname + '/db/' + 'gamedata.json';

// 不能算真正意义的save，其实是extend数据
var save = exports.save = function(id, value){

	fs.readFile(dbFile, function (err, data) {
            data = data ? JSON.parse(data.toString()) : {};

            var prevValue = data[id] || (util.isArray(value) ? [] : {})

            if(util.isArray(value)) {
                  data[id] = prevValue.concat(value);
            } else if(typeof value === 'object') {
                  console.log('is a object');

                  for(var attr in value) {
                      prevValue[attr] = value[attr];
                  }
                  data[id] = prevValue;
            } else {
                  console.log('is a normal');

                  data[id] = value;
            }

            fs.writeFile(dbFile, JSON.stringify(data));
	});
};

// todo 需要强化，不然之前的flashUrl那种操作就做不了了
