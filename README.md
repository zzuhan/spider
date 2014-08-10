
如何使用：
    这是一个casperjs的实力，要用casperjs run.js来跑

TODO

高:

- 数据存储，后台使用restful api来搞，非关系数据库


低：
- Spider类 分来两大部分 参照下Casperjs的实现，在debug时能找到
有个Class类负责spider.create的实现，有grab, exit方法
剩下的组成spider上负责log,error，debugMode，libraryPath等

- __spiderpath, __prjroot 是否挂载到phantom或者spider上，挂window上不太好
- 为啥casper自身出错不报了，比如调用casper.log不存在的方法
- colorizer 颜色的使用，再封装成一个util中

- bootstrap是组装文件，还是bootstrap.js是组装文件

- gs中加入array.unique 数据去重

- suites中的是否做成 register({
    init: 
    prepare
})
- 如何去掉baiduAD

优化:

- 引入代码检查，每个js写上jshint注释，jshint
- 抓取的时候，规定存储的keys序列
- 截屏，总是提示错误，权限问题，以及nodejs文件写入，能否有写777权限相关的

## 数据存储

- 小游戏这种，xyx/add xyx/xxx/put xyx/getAll
- dfh这种 



## 

Bugs:

## spider 基于Casperjs(抓取)和Nodejs(存储) 

几个指标，页面解析能力，数据库操作能力，爬取效率，代码量

主要看你的目的，对效率，准确度的要求

如果页面结构复杂，正则就会极其复杂，及时使用xpath（扩展性，可维护性差）

特点：轻巧，快速，准确，易维护

应用：监控，自动化测试，数据抓取

### 优势

轻松处理复杂页面结构
可解析js动态生成的内容
代码量少，维护容易


### 缺点

并发：串行的(需要等前一个请求完成)，自身没有并发管理
数据库操作：没有直接数据库操作能力，需通过http请求方式完成
分布式：支持弱（还没这场景，估计支持）



## log系统

casper是否自带 this.echo this.log 

logLevels `debug, info, warning, error`
logFormats 
logStyles
    debug: "INFO"
    error: "ERROR"
    info: "PARAMETER"
    warning: "COMMENT"


## 调试

`casperjs --remote-debugger-port=8888 --remote-debugger-autorun=yes run.js`
