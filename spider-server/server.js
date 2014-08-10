var http = require('http');
var urlMod = require('url');
var qs = require('querystring');
var formBody = require('body/form');

var db = require('../db');

// variables
var port = 1177;


var server = http.createServer(function handleRequest(req, res) {
    // url related
    // decodeURIComponent 处理顺序不知道对不对
    var url = decodeURIComponent(req.url),
        reqObj = urlMod.parse(url),
    	query = qs.parse(reqObj.query),
        id = query.subject;

    if(!id) {
        // res传不同数据
        // trigger('error', please input id);cas
        throw new Error('please input id');
    }

    function process(err, body){
        content = decodeURIComponent(body.content);
        try {
            content = JSON.parse(content);
        } catch(err) {}

        db.save(id, content);
    }

    formBody(req, process);

    // 返回数据
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8;'});
    res.write(JSON.stringify(query));
    res.end('OK');
});

server.listen(port, function() {
	console.log('DB Server start');
	console.log('Server listen at ' + port);
});
