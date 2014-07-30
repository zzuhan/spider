// normal module
var http = require('http');
var url = require('url');
var qs = require('querystring');
var mailman = require('./mailman');

// variable
var port = 1573;

var server = http.createServer(function(req, res) {
    var reqObj = url.parse(req.url),
    	query = qs.parse(reqObj.query);

    var subject = query.subject || '',
    	content = query.content || '';

    mailman.send(subject, content);

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8;'});
    res.write(JSON.stringify(query));
    res.end('Ok');
});

server.listen(port, function() {
	console.log('Server start');
	console.log('Server listen at ' + port);
});

