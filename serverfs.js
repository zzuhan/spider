var http = require('http');
var url = require('url');
var qs = require('querystring');
var file = require('./modules/fs');

// variable
var port = 1117;

var server = http.createServer(function(req, res) {
    var reqMeta = url.parse(req.url),
    	query = qs.parse(reqMeta.query);

    var subject = query.subject || '',
    	content = query.content || '',
        key     = query.key || '';

    file.editFile(key,content);
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8;'});
    res.write(JSON.stringify(query));
    res.end('Ok');
});

server.listen(port, function() {
	console.log('Server start');
	console.log('Server listen at ' + port);
});
