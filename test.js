window.__filename = require('system').args[3];

console.log(__filename);
// 需要拆分，中间做检测	
// var __dirname = require('fs').absolute(__filename).split('/')

// if (curFilePath.length > 1) {
//     curFilePath.pop(); // PhantomJS does not have an equivalent path.baseName()-like method
//     fs.changeWorkingDirectory(curFilePath.join('/'));
// }

// 
// console.log(phantom.libraryPath);

var fs = require('fs');
// console.log(fs.workingDirectory);
// 
fs.write('log.js', '这是写入的内容', 'a');
