var common = {
	auth: {
	 	user: "wencheng.service@gmail.com",
	    pass: "wenchengservice"
	}
}

// var devConfig = utils.extend(common, {
// 	recepients: ['softzzu@163.com']
// });

// var proConfig = utils.extend(common, {
// 	recepients: ['softzzu@163.com', 'yuanjiamei@360.cn', 'wangjing3-g@360.cn']
// });

module.exports = {
	auth: common.auth,
	recepients: ['softzzu@163.com']
}