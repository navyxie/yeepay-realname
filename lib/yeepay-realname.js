var request = require('request');
var config = require('./config');
var digest = require('./digest');
var util = require('./util');
var p0_Cmd = "FastRealNameAuth";//接口指令，常量。
var pattern = "1";//认证模式为“1”表示只认证信息真实性,常量。
function toString(text){
	return util.toString(text);
}
/**
*易宝实名认证的类
*/
function YeepayRealName(json){
	this.config = util.extend(config,json);
}
/**
*根据提交的数据，获取MD5签名
*@param object jsonData
*return string 
*/
YeepayRealName.prototype.getReqMd5Hmac = function(jsonData){
	jsonData = util.extend(jsonData,this.getConstans(jsonData));
	if(!util.checkParam(jsonData)){
		return "";
	}
	var str = "";
	str += jsonData.p0_Cmd;
	str += jsonData.customerId;
	str += jsonData.name;
	str += jsonData.idCardNumber;
	str += jsonData.bankCode;
	str += jsonData.bankCardNumber;
	jsonData.bankName ? (str += jsonData.bankName) : (str += "");
	jsonData.province ? (str += jsonData.province) : (str += "");
	jsonData.city ? (str += jsonData.city) : (str += "");
	str += jsonData.pattern;
	jsonData.res_desc ? (str += jsonData.res_desc) : (str += "");
	return digest.hmacSign(str,this.config.keyValue);
}
/**
*获取配置中的常量
*@param object data
*return object
*/
YeepayRealName.prototype.getConstans = function(data){
	return {
		p0_Cmd:data.p0_Cmd || p0_Cmd,
		pattern:data.pattern || pattern,
		customerId:data.customerId || this.config.customerId
	}
}
/**
*根据易宝返回的结果进行数据合法性认证，防止被篡改 ==>暂时没用到
*@param object jsonData
*return boolean
*/
YeepayRealName.prototype.verify = function(jsonData){
	jsonData = jsonData || {};
	if(!jsonData.hmac){
		return false;
	}
	var hmac = jsonData.hmac;
	delete jsonData.hmac;
	delete jsonData.authMsg;
	var str = "";
	str += jsonData.command;
	str += jsonData.customerId;
	str += jsonData.flowId;
	str += jsonData.responseCode;
	str += jsonData.authStatus;
	str += jsonData.pattern;
	str += jsonData.auth_Amt;
	str += jsonData.res_desc;
	var verifyHmac = digest.hmacSign(str,this.config.keyValue);
	if(hmac === verifyHmac){
		return true;
	}else{
		return false;
	}
}
/**
*获取获取易宝实名认证的地址
*return string
*/
YeepayRealName.prototype.getAuthorizationURL = function(){
	return this.config.yeepayCommonReqURL;
}
/**
*去易宝进行实名认证
*/
YeepayRealName.prototype.authorize = function(data,cbf){
	data = data || {};
	cbf = cbf || util.noop;
	data = util.extend(data,this.getConstans(data));
	var hmac = this.getReqMd5Hmac(data);
	var self = this;
	if(!hmac){
		return cbf({code:-1,msg:"参数不正确，请检查！"});
	}
	// if(!data.busId){
	// 	return cbf({code:-2,msg:"参数不正确，缺少商户订单号(busId)！"});
	// }	
	var url = this.getAuthorizationURL();
	var formData = {
		p0_Cmd:toString(data.p0_Cmd),
		customerId:toString(data.customerId),
		name:toString(data.name),
		idCardNumber:toString(data.idCardNumber),
		bankCode:toString(data.bankCode),
		bankCardNumber:toString(data.bankCardNumber),
		bankName:toString(data.bankName || ""),
		province:toString(data.province || ""),
		city:toString(data.city || ""),
		pattern:toString(data.pattern),
		res_desc:toString(data.res_desc || ""),
		// busId:toString(data.busId),
		hmac:hmac
	};
	url = digest.encodeGBK(url+'?'+util.jsonToSearch(formData));//这一步很重要，对中文utf8进行GBK转码
	request.get(url,function(err,httpResponse,body){
		if(err){
			cbf({code:-3,msg:'请求易宝实名认证接口失败了。',err:err,url:url});
		}else{
			if(httpResponse.statusCode == 200){
				var text = body.replace(/\n/g,'');
				if(/r1_Code/.test(text)){
					if(/errorMsg=InvalidParam : hmac/.test(text)){
						cbf({code:-4,msg:'签名不正确',data:util.responeTextToJson(body),url:url});
					}else{
						cbf({code:-7,msg:'数据异常',data:util.responeTextToJson(body),url:url});
					}				
				}else{
					var json = util.responeTextToJson(body);
					if(json.responseCode === '00000' && json.authStatus === 'SUCCESS'){
						cbf(null,{code:0,msg:'success',data:json,url:url});
					}else{
						cbf({code:-6,msg:'认证不通过',data:json,url:url});
					}				
				}			
			}else{
				cbf({code:-5,msg:'请求易宝实名认证接口失败了，statusCode:'+httpResponse.statusCode,url:url});
			}	
		}
	});
}
module.exports = YeepayRealName