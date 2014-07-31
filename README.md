
这是一个casperjs的实力，要用casperjs client.js来跑

TODO

高:

- 如何再进入抓取flash的地址
- 如何跑一个序列来并发抓取
- 如何再
- 使用superman 监控server代码的改变

优化:

- 如果evaluate出错了，怎么检测
- 引入代码检查，每个js写上jshint注释，jshint
- console.record modules/record.js 之间传数据，优化的地方

Bugs:

TODO：
// 覆写console.dir 方法，更加类似于node的console.dir方法

ISSUES：

## 疑问
- 游戏页url跟中间页url关系 47931.html 47931_1.html 


## flash地址在哪里
真实url: http://sda.4399.com/4399swf/upload_swf/ftp3/haibo/20110124/1.swf

demo1 

var str1 = "/upload_swf/ftp3/haibo/20110124/1.swf"
var webServer = "http://sda.4399.com/4399swf"

demo2

http://sda.4399.com/4399swf/upload_swf/ftp8/caoxinxin/20120530/3.swf

## capserjs多线程

- 