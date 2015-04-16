var should = require('should');
var YPRealName = require('../../lib/yeepay-realname.js');
var YPRN = new YPRealName({customerId:"10001674472",keyValue:"c2F2N65BJi04SkrJ4072K7k0x371i20zHUYX5HZb5219A6t757cKwu5d3Xo7"});
var testData = {name:"**军",idCardNumber:"****4195",bankCode:"CCB",bankCardNumber:"****7533"};
describe('test yeepay realname',function(){
	describe('test hmac',function(){
		it('result must be e734a6b983294227459e79c38fb63bda',function(){
			//必须穿四个参数，姓名，身份证号码，银行编码，银行卡号		
			YPRN.getReqMd5Hmac(testData).should.be.equal("e734a6b983294227459e79c38fb63bda");
		})
	});
	describe('#authorize()',function(){
		it('test api',function(done){
			this.timeout(5000);
			YPRN.authorize(testData,function(err,data){
				if(err){
					if(typeof err !== 'object'){
						return done(err);
					}
					if(err.code = -6){
						return done();
					}
				}			
			})
		});
	})
})