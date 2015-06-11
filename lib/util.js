/**
 * 将字符串转化为查询字符串
 * @param object json
 * @return str
*/
function jsonToSearch(json){
	var str = "";
	for(var key in json){
		if(json.hasOwnProperty(key)){
			str += key + '=' + json[key]+'&';
		}
	}
	//把最后的&去掉
	if(str){
		str = str.substring(0,str.length -1);
	}
	return str;
}
/**
*
*/
function extend(target,source){
	target = target || {};
	source = source || {};
	for(var key in source){
		if(source.hasOwnProperty(key)){
			target[key] = source[key];
		}
	}
	return target;
}
/**
*将易宝认证返回的字符串格式的数据转化为json
*@param string str
*return object
*/
function responeTextToJson(str){
	var tmpArr = str.split("\n");
	var json = {};
	for(var i = 0 , len = tmpArr.length ; i < len ; i++){
		if(tmpArr[i]){
			var tempSubArr = tmpArr[i].split('=');
			json[tempSubArr[0]] = tempSubArr[1];
		}
	}	
	return json;
}
function toString(text){
	return text.toString();
}
function noop(){};
/**
*检易宝支付必须用的参数
*return array
*/
function getInNeedKeys(){
	return inNeedParamList = ['p0_Cmd','customerId','name','idCardNumber','bankCode','bankCardNumber','pattern'];
}
/**
*检查易宝要求的参数是否齐全，只有齐全了才会向易宝发起实名认证，节约成本
*@param object json
*return boolean
*/
function checkParam(json){
	json = json || {};
	var inNeedParamList = getInNeedKeys();
	var flag = true;
	for(var i = 0 ,len = inNeedParamList.length; i < len ; i++){
		if(!json[inNeedParamList[i]]){
			flag = false;
			break;
		}
	}
	return flag;
}
/**
*检易宝支付必须用的参数
*return array
*/
function getInNeedQueryKeys(){
	return inNeedParamList = ['p0_Cmd','customerId','busId'];
}
/**
*检查易宝要求的参数是否齐全，只有齐全了才会向易宝发起实名认证，节约成本
*@param object json
*return boolean
*/
function checkQueryParam(json){
	json = json || {};
	var inNeedParamList = getInNeedQueryKeys();
	var flag = true;
	for(var i = 0 ,len = inNeedParamList.length; i < len ; i++){
		if(!json[inNeedParamList[i]]){
			flag = false;
			break;
		}
	}
	return flag;
}
module.exports = {
	jsonToSearch:jsonToSearch,
	extend:extend,
	responeTextToJson:responeTextToJson,
	toString:toString,
	noop:noop,
	getInNeedKeys:getInNeedKeys,
	checkParam:checkParam,
	checkQueryParam:checkQueryParam
}