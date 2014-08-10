var startTime = Date.now();

var fs = require('fs');

var path = 'output.json',
    appendContent = 'Hello',
    content;

content = fs.readFileSync(path).toString();

content += appendContent;

fs.writeFileSync(path, content);

console.log('done');

console.log(Date.now() - startTime);

