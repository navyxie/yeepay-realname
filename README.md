yeepay-易宝支付-实名认证 SDK

=======

### 新增实名认证查询接口

###  use case

		var YPRealName = require('yeepay-realname');
		var YPRN = new YPRealName({customerId:"10001674472",keyValue:"c2F2N65BJi04SkrJ4072K7k0x371i20zHUYX5HZb5219A6t757cKwu5d3Xo7"});
		//必须传个五参数:商户订单号，姓名，身份证号码，银行编码，银行卡号
		var testData = {busId:"商户订单号",name:"**军",idCardNumber:"****4195",bankCode:"CCB",bankCardNumber:"****7533"};
		//use case
		//实名认证接口
		YPRN.authorize(testData,function(err,data){
			if(err){
				console.log(err);
			}else{
				// data => { 
				// 	code: 0,
				// 	msg: 'success',
				// 	data: 
				// 	{
				// 		command: 'FastRealNameAuth',
				// 		customerId: '10001674472',
				// 		flowId: '10001674472297yeepay_73384906',
				// 		responseCode: '00000',
				// 		authStatus: 'SUCCESS',
				// 		pattern: '1',
				// 		auth_Amt: '0.0+RMB',
				// 		res_desc: '',
				// 		authMsg: '',
				// 		hmac: '522108e6ccc8bc901216af0ad459112b' 
				// 	},
				// 	url: 'https://www.yeepay.com/app-merchant-proxy/command?p0_Cmd=FastRealNameAuth&customerId=10001674472&name=%d0%bb%ba%a3%be%fc&idCardNumber=440882199102104195&bankCode=CCB&bankCardNumber=6227003320240037533&bankName=&province=&city=&pattern=1&res_desc=&hmac=c1f48dfd55c556d760fad8a8e7a691a0' 
				// }
				console.log(data);
			}
		});
		//实名认证查询接口
		YPRN.query({busId:"商户订单号"},function(err,data){
			if(err){
				console.log(err);
			}else{
				data =>{
					code:0,
					msg:'success',
					data:{
						command: 'FastRealNameAuthSearch',
						customerId: '10001674472',
						flowId: '10001674472977yeepay_77933076',
						busId: '1433999845356',
						responseCode: '00000',
						authStatus: 'SUCCESS',
						pattern: '1',
						auth_Amt: '0.0+RMB',
						res_desc: '',
						authMsg: '',
						hmac: 'f77333c81d7a91343362caa0d4e2bbb6' 
					}
				}
				console.log(data);
			}
		})