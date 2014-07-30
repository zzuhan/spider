var nodemailer = require('nodemailer');

var config = require('./config');

// 下来创建一个专门的gmail，或163来发送
var smtpTransport = nodemailer.createTransport("SMTP",{
    auth: config.auth
});

var mailOptions = {
		from: "文成服务邮箱",
		to: config.recepients,
		subject: "",
		text: ""
	}, 
	signature = "\n\n" +
				"-----------------\n" + 
				"来自新的监控服务\n" +
				"如有什么意见或建议请发送邮件至hanwencheng@360.cn";

exports.send = function(subject, content) {
	mailOptions.subject = subject;
	mailOptions.text = content + signature;

	console.log("**" + new Date() + " 准备发送邮件 **"); 
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if(error){
			console.log(error);
		} else {
			console.log("发送标题: " + subject);
			console.log("邮件已经发送: " + response.message);
		}
	});
};
