function ActionMethod(method, datatype, url) {
	this.method = method;
	this.datatype = datatype;
	this.url = url;
}

function isMobile(m) {
    var reg = /^(134|135|136|137|138|139|147|150|151|152|157|158|159|182|183|187|188|130|131|132|155|156|185|186|145|133|153|180|189)\d{8}$/;
    return reg.test(m);
}

function isTelecomMobile(m) {
    var reg = /^(133|153|180|189|181)\d{8}$/;
    return reg.test(m);
}

function isUnicomMobile(m) {
    var reg = /^(130|131|132|145|155|156|185|186)\d{8}$/;
    return reg.test(m);
}

function isEmail(e) {
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return reg.test(e);
}

function checkCookie(cookieKey) {
	var arrStr = document.cookie.split("; ");
	 
	for(var i = 0; i < arrStr.length; i++ ) {
		var temp = arrStr[i].split("=");

		if(temp[0] == cookieKey) {
			return unescape(temp[1]);
		}
	} 
}

function getCookie(cookieKey) {//取cookies函数
	var arr = document.cookie.match(new RegExp("(^| )" + cookieKey + "=([^;]*)(;|$)"));

	if(arr != null) return unescape(arr[2]); return null;
}

function delCookie(cookieKey) {//删除cookie
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(cookieKey);

    if(cval != null) document.cookie = cookieKey + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/";
}

function stop() { 
	return false; 
}

//document.oncontextmenu = stop;

var base_path = 'http://www.tonysfarm.com';

//js方法初始化对象，方法中调用方法：对象.属性(如：registerMethod.method即返回'POST')
loginMethod					   = new ActionMethod('get', 'jsonp', base_path + '/login.htm');
logoutMethod				   = new ActionMethod('POST', 'jsonp', base_path + '/logout.htm?random=');
loginStatusMethod			   = new ActionMethod('get', 'jsonp', base_path + '/getLoginInfo.htm?random=');
mobileRegistMethod			   = new ActionMethod('POST', 'jsonp', base_path + '/mobileRegist.htm');
emailRegistMethod			   = new ActionMethod('POST', 'jsonp', base_path + '/emailRegist.htm');
sendSmsMethod				   = new ActionMethod('POST', 'jsonp', base_path + '/sendSms.htm');
reSendEmailMethod			   = new ActionMethod('POST', 'jsonp', base_path + '/reSendEmail.htm');
checkAuthCodeMethod			   = new ActionMethod('POST', 'jsonp', base_path + '/checkAuthCode.htm');
checkMobileMethod			   = new ActionMethod('POST', 'jsonp', base_path + '/validateVerifiedMobile.htm');
checkEmailMethod			   = new ActionMethod('POST', 'jsonp', base_path + '/validateVerifiedEmail.htm');
checkLoginMethod			   = new ActionMethod('POST', 'jsonp', base_path + '/getLoginInfo.htm?random=');
loadEventMethod				   = new ActionMethod('POST', 'jsonp', base_path + '/getLoginInfo.htm');
getLoginAuthCodeMethod		   = new ActionMethod('POST', 'jsonp', base_path + '/getAuthCode.htm');
getMembershipcardMethod		   = new ActionMethod('POST', 'jsonp', base_path + '/getMembershipcard.htm');
cooperationLoginMethod		   = new ActionMethod('POST', 'jsonp', base_path + '/getMemberCooperationInfo.htm');
registByCooperationLoginMethod = new ActionMethod('POST', 'jsonp', base_path + '/cooperationInfoRegist.htm');
bindAccountMethod			   = new ActionMethod('POST', 'jsonp', base_path + '/bindAccount.htm');

deliveryOrderByAddressMethod   = new ActionMethod('POST', 'json', base_path + '/member/loadDeliveryOrderByAddress.htm');
deliveryOrderByCardNoMethod	   = new ActionMethod('POST', 'json', base_path + '/member/loadDeliveryOrderByCardNo.htm');
loadProductImageMethod		   = new ActionMethod('POST', 'json', base_path + '/member/loadProductImage.htm');
loadCardNoMethod			   = new ActionMethod('POST', 'json', base_path + '/member/loadCardNo.htm');
memberLoadMemberMethod		   = new ActionMethod('POST', 'json', base_path + '/member/loadMember.htm');
loadPurchaseOrderMethod		   = new ActionMethod('POST', 'json', base_path + '/purchaseOrder/loadPurchaseOrder.htm');
loadOrderHeaderMethod		   = new ActionMethod('POST', 'json', base_path + '/purchaseOrder/loadPurchaseOrderHeader.htm');
loadOrderItemMethod		       = new ActionMethod('POST', 'json', base_path + '/purchaseOrder/loadOrderItem.htm');

validateCardMethod		  	   = new ActionMethod('POST', 'json', base_path + '/validateCard.htm');
validateCardMethod2		  	   = new ActionMethod('POST', 'json', base_path + '/validateCard2.htm');
loadAddressMethod		       = new ActionMethod('POST', 'json', base_path + '/loadAddress.htm');
addAddressMethod		       = new ActionMethod('POST', 'json', base_path + '/addAddress.htm');
cardActivationMethod		   = new ActionMethod('POST', 'json', base_path + '/cardActivation.htm');

loadMembershipCardMethod	   = new ActionMethod('POST', 'json', base_path + '/member/loadMembershipCard.htm');
loadOnlineUsedBoxMethod		   = new ActionMethod('POST', 'json', base_path + '/member/loadOnlineUsedBox.htm');
loadOrderListMethod			   = new ActionMethod('POST', 'json', base_path + '/member/loadOrderList.htm');
loadPsOrderListMethod		   = new ActionMethod('POST', 'json', base_path + '/member/loadPsOrderList.htm');
loadMemberAddressMethod		   = new ActionMethod('POST', 'json', base_path + '/member/loadMemberAddress.htm');
saveMemberAddressMethod		   = new ActionMethod('POST', 'json', base_path + '/member/saveMemberAddress.htm');
updateAddressMethod			   = new ActionMethod('POST', 'json', base_path + '/member/updateAddress.htm');
loadOrderChangeHistoryMethod   = new ActionMethod('POST', 'json', base_path + '/member/loadOrderChangeHistory.htm');
editAddressMethod			   = new ActionMethod('POST', 'json', base_path + '/member/loadAddress.htm?ajax=true');
setDefaultAddressMethod		   = new ActionMethod('POST', 'json', base_path + '/member/setDefaultAddress.htm');
deleteAddressMethod			   = new ActionMethod('POST', 'json', base_path + '/member/removeAddress.htm');
queryBoxDetailMethod		   = new ActionMethod('POST', 'json', base_path + '/member/queryBoxDetail.htm');
updateMemberAddressMethod	   = new ActionMethod('POST', 'json', base_path + '/member/updateMemberAddress.htm');

initGeoMethod				   = new ActionMethod('POST', 'json', base_path + '/order/initGeo.htm');

dietitianWordsMethod		   = new ActionMethod('GET', 'json', base_path + '/product/dietitianWords.htm');

weekMenMethod                  = new ActionMethod('POST', 'json', base_path + '/product/menuInfo.htm');
boxWeekMenuMethod              = new ActionMethod('POST', 'json', base_path + '/product/boxMenu.htm');

loadVegBoxDateMethod		   = new ActionMethod('POST', 'json', base_path + '/member/loadVegBoxDate.htm');
loadBatchVegBoxDateMethod	   = new ActionMethod('POST', 'json', base_path + '/member/loadBatchVegBoxDate.htm');
updateNextBoxDateMethod		   = new ActionMethod('POST', 'json', base_path + '/member/updateNextBoxDate.htm');
updateBatchNextBoxDateMethod   = new ActionMethod('POST', 'json', base_path + '/member/updateBatchNextBoxDate.htm');
loadAllDeliveryTimespanMethod  = new ActionMethod('POST', 'json', base_path + '/member/loadAllDeliveryTimespan.htm');

loadRecommendMessageMethod	   = new ActionMethod('POST', 'json', base_path + '/member/loadRecommendMessage.htm');
sendRecommendMessageMethod	   = new ActionMethod('GET', 'jsonp', base_path + '/member/sendRecommendMessage.htm');
matchMemberInfoMethod		   = new ActionMethod('GET', 'jsonp', base_path + '/member/matchMemberInfo.htm');

captchaUrl = base_path + '/security/loginJcaptcha.htm?random=';