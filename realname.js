var YPRealName = require('yeepay-realname');
var YPRN = new YPRealName();
var testData = {busId:"1234abcd",name:"**军",idCardNumber:"****4195",bankCode:"CCB",bankCardNumber:"****7533"};
var hmac = YPRN.getReqMd5Hmac(testData);
// console.log('hmac:'+hmac);
YPRN.authorize(testData,function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
})