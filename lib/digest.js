var crypto = require("crypto");
var utf8 = require('utf8');
var Iconv = require('iconv').Iconv;
/**生成md5签名
 * @param string aValue
 * @param string aKey
 * @return string
 */
function hmacSign(aValue,aKey) {
	aValue = utf8.encode(aValue);//中文需要转化为utf8编码
	var hmac = crypto.createHmac('md5',aKey);
	hmac.update(aValue);
	return hmac.digest('hex');
}
function encodeGBK(text){
    var iconv = new Iconv('UTF-8','GBK');
    var from = iconv.convert(text);
    var rt='';
    for(var i=0;i<from.length;i++){
        var c = from.readUInt8(i);
        if(c>127){
            i++;
            var c2 = from.readUInt8(i);
            rt+='%'+c.toString(16)+'%'+c2.toString(16);
        }else{
            rt+=String.fromCharCode(c);
        }
    }
    return rt;
}
module.exports = {
	hmacSign:hmacSign,
	encodeGBK:encodeGBK
}