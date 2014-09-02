$(function() {
	/*var tc = new TonysfarmCookie("/");
	var rt = tc._isReturn();
	TonysfarmCookie.DEBUG && window.console && console.info('cannot find sdo checker cookie, need check sdo：%s',rt);
	if(!rt){
		$.ajax({
			type : 'post',
			url : 'http://www.tonysfarm.com/isBeijing.htm',
			dataType:'json',
			async:false,
			timeout:3000,
			success : function(data) {
				if(data.status=="true"){
					writeIsReturnCookie(2);
					window.location.href = "http://www.tonysfarm.com/bj/bj.index.html";
				}else{
					writeIsReturnCookie(1);
				}
			},
			error:function (XMLHttpRequest, textStatus, errorThrown) {
				
			}
		});
	}*/
	initLogin();
});

function writeIsReturnCookie(val){
	var validMin = 90*24*60;
	TonysfarmCookie.writeCookie(TonysfarmCookie.RT, val, TM.COOKIE_DOMAIN, '/', validMin);
}

function initLogin() {
	var requestRandom = Math.round(Math.random() * 1000000);

	$.ajax({
		method     : loginStatusMethod.method,  
		url        : loginStatusMethod.url + requestRandom,
		beforeSend : function(XMLHttpRequest) {},  
		dataType   : loginStatusMethod.datatype, 
		jsonp      : 'jsoncallback',
		success : function(data) {
			if (data.status == "true") {
				var accountType = data.message.accountType;
				var nickName = data.message.nickName;
				$("#logId").remove();

				if(nickName != null && nickName != '') {
					$("#regId").html('您好，' + nickName + '<a info="memberInfoId" href="' + base_path + '/my/member.html" class="loginMember"><b>[进会员中心]</b></a>&nbsp;&nbsp;<a info="memberInfoId" href="javascript:logout(\'' + accountType + '\');">注销</a>');
				} else {
					$("#regId").html('您好，' + data.message.memberName + '<a info="memberInfoId" href="' + base_path + '/my/member.html" class="loginMember"><b>[进会员中心]</b></a>&nbsp;&nbsp;<a info="memberInfoId" href="javascript:logout(\'' + accountType + '\');">注销</a>');
				}
			}
		}
	});
}

function doLogin() {
	var name = $.trim($("#user_name_login").val());
	var password = $.trim($("#passwd_login").val());
	var autoLogin = $("#forever").attr("checked") == 'checked' ? "on" : '';
	var loginJCaptcha = $.trim($("#loginJCaptcha").val());
	
	if (name == "") {
        $("#error").html("用户名不能为空！");
        $("#user_name_login").focus();
        return false;
    }
    if (password == "") {
        $("#error").html("密码不能为空！");
        $("#passwd_login").focus();
        return false;
    }
    if (loginJCaptcha == "") {
        $("#error").html("验证码不能为空！");
        $("#loginJCaptcha").focus();
        return false;
    }

	$("#error").html("");

	$.ajax({
		method: loginMethod.method,
		url: loginMethod.url,
		beforeSend: function(XMLHttpRequest) {},
		data : "name=" + name + "&password=" + password + "&autoLogin=" + autoLogin + "&loginJCaptcha=" + loginJCaptcha + "&random=" + Math.floor(Math.random() * 100), 
		dataType: loginMethod.datatype,
		jsonp: 'jsoncallback',
		success : function(data) {
			if (data.status == "true") {
				var nickName = data.message.nickName;
				$("#logId").remove();
				var accountType = data.message.accountType;
				if(nickName != null && nickName != '') {
					$("#regId").html('您好，' + nickName + '<a info="memberInfoId" href="' + base_path + '/my/member.html" class="loginMember"><b>[进会员中心]</b></a>&nbsp;&nbsp;<a info="memberInfoId" href="javascript:logout(\'' + accountType + '\');">注销</a>');
				} else {
					$("#regId").html('您好，' + data.message.memberName + '<a info="memberInfoId" href="' + base_path + '/my/member.html" class="loginMember"><b>[进会员中心]</b></a>&nbsp;&nbsp;<a info="memberInfoId" href="javascript:logout(\'' + accountType + '\');">注销</a>');
				}
				closeRegisterDialog();
				if(window.opener != null) {
					window.opener.location.reload();
				}

				window.location.reload();
			} else if (data.status == "false") {
				$("#error").html(data.message);
			} else if (data.status == "active") {
				closeRegisterDialog();
				$("#activeEmail").html(data.message.email);
				$("#goEmail").attr("href", "/goEmail.htm?email=" + data.message.email);
				$("#goEmail").attr("partyId", data.message.partyId);
				WinTip2();
//				openEmailDialog();
			} else if (data.status == "show") {
				$("#error").html(data.message);
				$('#authcodeJCaptcha').hide().attr('src', captchaUrl + Math.floor(Math.random() * 100)).fadeIn();
                $("#passwd_login").focus();
			} else if (data.status == "vip") {
				closeRegisterDialog();
				$.dialog({
					type : "warn",
					content : "您是VIP客户不能登录！</br>请致电&nbsp;<font style='color:red;'>4008202162</font>",
					modal : true
				});
				return;
			} else {
				$("#error").html("验证码输入错误，请重新输入！");
				$('#authcodeJCaptcha').hide().attr('src', captchaUrl + Math.floor(Math.random() * 100)).fadeIn();
                $("#loginJCaptcha").focus();
			}
		},
		complete : function(XMLHttpRequest, textStatus) {}
	});
}

function logout(loginType) {
	var requestRandom = Math.round(Math.random() * 100) + 1;
	$.ajax({
		method : logoutMethod.method,
		datatype : logoutMethod.datatype,
		url : logoutMethod.url + requestRandom,
		success : function(data) {
			if (data.status == "true") {
				if(loginType == 'q') {
					QC.Login.signOut();
					window.location.href = "/index.html";
				} else if(loginType == 'qqwb') {
					T.logout(function(){
						if(checkCookie('QQWBToken3_801436771')) {
							delCookie('QQWBToken3_801436771');
						}

						if(checkCookie('QQWBRefreshToken3_801436771')) {
							delCookie('QQWBRefreshToken3_801436771');
						}
						
						window.location.href = "/index.html";
					});
				} else if(loginType == 'sinawb') {
					WB2.logout(function(){
						window.location.href = "/index.html";
					});
				} else {
					window.location.href = "/index.html";
				}
			} else {
				alert(data.message);
			}
		},
		complete : function(XMLHttpRequest, textStatus) {}
	});
}

/**初始化新浪微博登录*/
function initSinaWb() {
	WB2.anyWhere(function (W) {
	    W.widget.connectButton({
	        id: "wb_connect_btn",
	        type: '3,5',
	        callback: {
	            login: function (o) { //登录后的回调函数
					cooperationLoginValidate('sinawb', o.id, o.screen_name);
	            }
	        }
	    });
	});
}

/**初始化qq登录*/
function initQQ() {
	//调用QC.Login方法，指定btnId参数将按钮绑定在容器节点中
	QC.Login({
		//btnId：插入按钮的节点id，必选
		btnId : "qqLoginBtn",
		//用户需要确认的scope授权项，可选，默认all
		scope : "all",
		//按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
		size : "B_M"
	},
	function(reqData, opts) {//登录成功
		qqLoginSuccess('q', reqData.nickname);
	}, function(opts) {//注销成功
		window.location.href = base_path + "/index.html";
	});
}

/**qq登录成功操作*/
function qqLoginSuccess(accountType, nickName) {
	if(QC.Login.check()) {
		QC.Login.getMe(function(openId, accessToken){
			cooperationLoginValidate(accountType, openId, nickName);
		});
	}
}

function qqWbLogin() {
	T.login(function(loginStatus) {
		getUserInfo();
	}, function(loginError) {
	});
}

function getUserInfo() {
	T
	.api("/user/info")
	.success(
			function(response) {
				if (response.ret === 0) {
					data = response.data;
					cooperationLoginValidate('qqwb', data.openid, data.nick);
				} else {
					alert(response.ret);
				}
			}).error(function(code, message) {
		alert(message);
	});
}

/**初始化腾讯微博登录*/
function initQQWb() {
	T.init({
		appkey : 801436771
	});

	if (!T.loginStatus()) {
	} else {
		getUserInfo();
	}

	login_btn.onclick = qqWbLogin;
}

/**后台验证合作登录用户信息*/
function cooperationLoginValidate(accountType, openId, nickName) {
	$.ajax({
		method: cooperationLoginMethod.method,
		url: cooperationLoginMethod.url,
		beforeSend: function(XMLHttpRequest) {},
		data : "cooperationLoginId=" + (openId + accountType) + "&accountType=" + accountType + "&nickName=" + encodeURIComponent(encodeURIComponent(nickName)),
		dataType: cooperationLoginMethod.datatype,
		jsonp: 'jsoncallback',
		success : function(data) {
			if(data.status == 'notExist') {
				openBindWin(accountType, openId, nickName, data.message.partyId);
			} else {
				if(window.opener != null) {
					window.opener.location.reload();
				}

				window.location.reload();
			}
		},
		complete : function(XMLHttpRequest, textStatus) {
			closeLoginWin();
		}
	});
}

var htmlObject = function(id) {
	return document.getElementById(id);
}

function openBindWin(accountType, openId, nickName, partyId) {
	var win = new WinSize();
	var Tip = htmlObject("bg3");
	Tip.style.width = win.W+"px";
	Tip.style.height = win.H+"px";
	
	Tip.style.display = "block";
	htmlObject("win3").style.display = "block";
	$('#accountType').val(accountType);
	$('#openId').val(openId);
	$('#nickName').val(nickName);
	$('#partyId').val(partyId);

	if(accountType == "q") {
		$('#accountTypeName').html('QQ');
		$('#accountTypeName1').html('QQ');
	} else if(accountType == "qqwb") {
		$('#accountTypeName').html('腾讯微博');
		$('#accountTypeName1').html('腾讯微博');
	} else if(accountType == "sinawb") {
		$('#accountTypeName').html('新浪微博');
		$('#accountTypeName1').html('新浪微博');
	}

	$('#accountNickName').html(nickName);
	$('#user_name_bind_login').focus();
}

function closeBindWin() {
	var Tip = htmlObject("bg3");
	Tip.style.display = "none";
	htmlObject("win3").style.display = "none";

	$("#user_name_bind_login").val("");
	$("#passwd_bind_login").val("");
	$("#bind_error").html("");
	$("#bind_error").removeClass().addClass("loginerror");

	if(window.opener != null) {
		window.opener.location.reload();
	}
	
	window.location.reload();
}

function cancelCooprationRegist() {
	var loginType = $('#accountType').val();

	if(loginType == 'q') {
		QC.Login.signOut(function(){
			//window.location.href = base_path + "/index.htm";
		});
	} else if(loginType == 'qqwb') {
		T.logout(function(){
			//window.location.href = base_path + "/index.htm";
		});
	} else if(loginType == 'sinawb') {
		WB2.logout(function(){
			//window.location.href = base_path + "/index.htm";
		});
	}

	//closePromptWin();
}

function doBind() {
	var accountType = $('#accountType').val();
	var openId = $('#openId').val();
	var nickName = $('#nickName').val();
	var partyId = $('#partyId').val();
	var name = $.trim($("#user_name_bind_login").val());
	var password = $.trim($("#passwd_bind_login").val());
	
	if (name == "") {
        $("#bind_error").html("邮箱/手机号不能为空！");
        $("#user_name_bind_login").focus();
        return false;
    }

    if (password == "") {
        $("#bind_error").html("密码不能为空！");
        $("#passwd_login").focus();
        return false;
    }

	$("#bind_error").html("");

	$.ajax({
		method: bindAccountMethod.method,
		url: bindAccountMethod.url,
		beforeSend: function(XMLHttpRequest) {},
		data : "name=" + name + "&password=" + password + "&cooperationLoginId=" + (openId + accountType) + "&accountType=" + accountType + "&nickName=" + encodeURIComponent(encodeURIComponent(nickName)) + "&cooperationLoginPartyId=" + partyId + "&random=" + Math.floor(Math.random() * 100), 
		dataType: bindAccountMethod.datatype,
		jsonp: 'jsoncallback',
		success : function(data) {
			if (data.status == "true") {
				alert(data.message);

				closeBindWin();
			} else {
				$("#bind_error").html(data.message);
			}
		},
		complete : function(XMLHttpRequest, textStatus) {}
	});
}

function closeLoginWin() {
	if(document.getElementById('bg').style.display = "block") {
		document.getElementById('bg').style.display = "none";
	}

	if(document.getElementById('win').style.display = "block") {
		document.getElementById('win').style.display = "none";
	}
}

var flag = false;
var isLogin=false;

function loadEvent() {
	$(document).find(".form_input").keydown(function(event) {
		switch (event.keyCode) {
		case 32:
			return false;
			break
		default:
		}
	});
	$("[info]").live("click",function(){
		requestRandom = Math.round(Math.random()*100)+1;
		$.ajax({
			method: loadEventMethod.method,
			url: loadEventMethod.url + "?random="+requestRandom,
			beforeSend: function(XMLHttpRequest) {},
			dataType: loadEventMethod.datatype,
			jsonp: 'jsoncallback',
			async:false,
			success : function(data) {
				if(data.status=="true"){
					isLogin=true;
				}else{
					isLogin=false;
				}
			},
			error:function (XMLHttpRequest, textStatus, errorThrown) {
				isLogin=false;
			}
		});
		if(!isLogin){
			openLoginDialog();
			return isLogin;
		}
	});
}

function checkLogin(){
	requestRandom = Math.round(Math.random()*100)+1;
	$.ajax({
		method: checkLoginMethod.method,
		url: checkLoginMethod.url + requestRandom,
		beforeSend: function(XMLHttpRequest) {},
		dataType: checkLoginMethod.datatype,
		jsonp: 'jsoncallback',
		async:false,
		success : function(data) {
			if(data.status=="true"){
				isLogin=true;
			}else{
				isLogin=false;
			}
		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {
			isLogin=false;
		}
	});
	if(!isLogin){
		openLoginDialog();
	}
	return isLogin;
}

function check_login(){
	requestRandom = Math.round(Math.random()*100)+1;
	$.ajax({
		method: checkLoginMethod.method,
		url: checkLoginMethod.url + requestRandom,
		beforeSend: function(XMLHttpRequest) {},
		dataType: checkLoginMethod.datatype,
		jsonp: 'jsoncallback',
		async:false,
		success : function(data) {
			if(data.status=="true"){
				isLogin=true;
			}else{
				isLogin=false;
			}
		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {
			isLogin=false;
		}
	});
	return isLogin;
}

function fbt1() {
    $("#bt1").addClass('current');
    $("#bt2").removeClass('current');
    $("#register").css("display",'block');
    $("#login").css("display",'none');
    $(document).unbind("keydown");
}

function fbt2() {
    refreshCaptcha('');
    $("#bt2").addClass('current');
    $("#bt1").removeClass('current');
    $("#register").css("display",'none');
    $("#login").css("display",'block');
	$("#login .loginbox").show().siblings().hide();
    $(document).bind("keydown",function(event) {
		switch (event.keyCode) {
		case 13:
			doLogin();
			break;
		}
	});
}

function fbt3() {
    refreshCaptcha('');
    $("#bt2").addClass('current');
    $("#bt1").removeClass('current');
    $("#register").css("display",'none');
    $("#login").css("display",'block');
	$("#login .cardloginbox").show().siblings().hide();
    $(document).bind("keydown",function(event) {
		switch (event.keyCode) {
		case 13:
			doLogin();
			break;
		}
	});
}

function regeml1() {
    var c = $("#regemlopt div").attr("class");

	if (!c || c == "") {
		$("#regmobopt div").removeClass("hiopt");
		$("#regcard div").removeClass("hiopt");
		$("#regemlopt div").addClass("hiopt");
	}

	$("#emailregform").css("display",'block');
	$("#phoneregform").css("display",'none');
}

function regmob1() {
    var c = $("#regmobopt div").attr("class");

	if (!c || c == "") {
		$("#regemlopt div").removeClass("hiopt");
		$("#regcard div").removeClass("hiopt");
		$("#regmobopt div").addClass("hiopt");
	}

	$("#emailregform").css("display",'none');
	$("#phoneregform").css("display",'block');
}

function regcard() {
/*    var c = $("#regcard div").attr("class");

	if (!c || c == "") {
		$("#regemlopt div").removeClass("hiopt");
		$("#regmobopt div").removeClass("hiopt");
		$("#regcard div").addClass("hiopt");
	}*/
	
	
   fbt3();

}

function register() {
	checkMobile('phoneregform');
	if (flag) {
		checkAuthCode();
	}
	if (flag && checkPassword1('phoneregform')) {
		var form = $("#phoneregform");
		var authcode = $.trim($("#authcode").val());
		var mobile_input = $
				.trim(form.find("input[name='mobile_input']").val());
		var password_input = $.trim(form.find("input[name='password1']").val());
		var checked = form.find("input[type='checkbox']").attr("checked");
		if (checked != "checked") {
			alert("请确认并勾选注册协议！");
			return false;
		}
		var requestRandom = Math.round(Math.random()*100)+1;
		$.ajax({
			method: mobileRegistMethod.method,
			url: mobileRegistMethod.url,
			beforeSend: function(XMLHttpRequest) {},
			data : "memberDO.mobile_verified=" + mobile_input
					+ "&memberDO.password=" + password_input + "&authCode="
					+ authcode+"&random="+ requestRandom,
			dataType: mobileRegistMethod.datatype,
			jsonp: 'jsoncallback',
			success : function(data) {
				if (data.status == "true") {
					closeRegisterDialog();
					$("#DL_overlay").show();
					$("#DL_window").show();
				} else {
					alert(data.message);
				}
			},
			complete : function(XMLHttpRequest, textStatus) {}
		});
	}
}

function alertMessage(){
	alert('请求已发送，请稍等！');
	return false;
}

function register2() {
	checkEmail('emailregform');
	if (flag && checkMobileEmail('emailregform') && checkPassword1('emailregform')) {
		var form = $("#emailregform");
		var email_input = $.trim(form.find("#email_input").val());
		var mobile_input = $
				.trim(form.find("input[name='mobile_input']").val());
		var password_input = $.trim(form.find("input[name='password1']").val());
		var checked = form.find("input[type='checkbox']").attr("checked");
		if (checked != "checked") {
			alert("请确认并勾选注册协议！");
			return false;
		}
		var requestRandom = Math.round(Math.random()*100)+1;
		$.ajax({
			method: emailRegistMethod.method,
			url: emailRegistMethod.url,
			beforeSend: function(XMLHttpRequest) {
				form.find("#register_btn").attr("onclick","javascript:alertMessage();");
			},
			data : "memberDO.email_verified=" + email_input
					+ "&memberDO.mobile=" + mobile_input
					+ "&memberDO.password=" + password_input+"&random="+ requestRandom,
			dataType: emailRegistMethod.datatype,
			jsonp: 'jsoncallback',
			success : function(data) {
				if (data.status == "true") {
					closeRegisterDialog();
					WinTip2();
					$("#activeEmail").html(data.message.email);
					$("#goEmail").attr("href", "/goEmail.htm?email="+data.message.email);
					$("#goEmail").attr("partyId",data.message.partyId);
//					openEmailDialog();
				} else {
					alert(data.message);
				}
			},
			complete : function(XMLHttpRequest, textStatus) {
				form.find("#register_btn").attr("onclick","javascript:register2();");
			}
		});
	}
}

function checkAuthCode() {
	checkMobile('phoneregform');
	if (flag) {
		var authcode = $.trim($("#authcode").val());
		var p = /^[0-9]{6}$/;
		if (p.test(authcode)) {
			var mobile_input = $.trim($("#phoneregform").find(
					"input[name='mobile_input']").val());
			var requestRandom = Math.round(Math.random()*100)+1;
			$.ajax({
				method: checkAuthCodeMethod.method,
				url: checkAuthCodeMethod.url,
				beforeSend: function(XMLHttpRequest) {},
				data : "mobile=" + mobile_input+"&authCode="+authcode+"&random="+ requestRandom,
				dataType: checkAuthCodeMethod.datatype,
				jsonp: 'jsoncallback',
				success : function(data) {
					if (data.status == "true") {
						$("#authcode").next().children().removeClass().addClass("check_yes");
						$("#authcode").next().children().next().removeClass().addClass("success");
						$("#authcode").next().children().next().removeClass("check_yes");
						$("#authcode").next().children().next().html("验证码输入正确");
						flag = true;
					} else {
						$("#authcode").next().children().removeClass()
								.addClass("check_no");
						$("#authcode").next().children().next().removeClass("check_no");
						$("#authcode").next().children().next().html("验证码错误");
						flag = false;
					}
				}
			});
		} else {
			$("#authcode").next().children().removeClass().addClass("check_no");
			$("#authcode").next().children().next().removeClass("check_no");
			$("#authcode").next().children().next().html("验证码为6位数字");
			flag = false;
		}
	}
}

function getLoginAuthCode(){
	var name=$.trim($("#user_name_login").val());
	$.ajax({
		url:getLoginAuthCodeMethod.url,
		method:getLoginAuthCodeMethod.method,
		datatype : getLoginAuthCodeMethod.datatype,
		data:"name="+name+"&random="+ Math.floor(Math.random() * 100),
		async : true,
		success : function(data) {
			if(data.status=="false"){
			    //$("#authcodeJCaptcha").attr("src",base_path+"/security/loginJcaptcha.jpg?random="+ Math.floor(Math.random() * 100)).fadeIn();
				$(".login-dialog").css("height","380");
				$(".login-dialog-shade").css("height","400");
				$("#div-authcode").show();
			}else{
				//$("#authcodeJCaptcha").attr("src","");
				$("#div-authcode").hide();
				$(".login-dialog").css("height","330");
				$(".login-dialog-shade").css("height","350");
			}
		}
	});
}

// functions: refresh captcha
function refreshCaptcha() {
    $('#authcodeJCaptcha').hide().attr('src', captchaUrl + Math.floor(Math.random() * 100)).fadeIn();
}

// functions: sms
function sendSms() {
	checkMobile('phoneregform');
	if (flag) {
		var mobile_input = $.trim($("#phoneregform").find(
				"input[name='mobile_input']").val());
		var requestRandom = Math.round(Math.random()*100)+1;
		$.ajax({
			method: sendSmsMethod.method,
			url: sendSmsMethod.url,
			beforeSend: function(XMLHttpRequest) {},
			data : "memberDO.mobile_verified=" + mobile_input+"&random="+ requestRandom,
			dataType: sendSmsMethod.datatype,
			jsonp: 'jsoncallback',
			success : function(data) {
				if (data.status == "true") {
					$("#smsId").attr("onclick", "javascript:void(0)");
					countDown("sendSms", 60,"smsId");
				}
				alert(data.message);
			},
			complete : function(XMLHttpRequest, textStatus) {}
		});
	}
}

function checkPassword1(obj) {
	var form = $("#" + obj);
	var password1_input = $.trim(form.find("input[name='password1']").val());
	var password2_input = $.trim(form.find("input[name='password2']").val());
	var p = /^.{6,20}$/;
	
	if(password1_input == '') {
		form.find("input[name='password1']").next().children().removeClass().addClass("check_no");
		form.find("input[name='password2']").next().children().removeClass().addClass("check_no");
		form.find("input[name='password1']").next().children().next().removeClass("check_no");
		form.find("input[name='password2']").next().children().next().removeClass("check_no");
		form.find("input[name='password1']").next().children().next().html("请设置密码");
		return false;
	} else if (p.test(password1_input)) {
		if (password1_input != password2_input) {
			form.find("input[name='password1']").next().children().removeClass().addClass("check_no");
			form.find("input[name='password2']").next().children().removeClass().addClass("check_no");
			form.find("input[name='password1']").next().children().next().removeClass("check_no");
			form.find("input[name='password2']").next().children().next().removeClass("check_no");

			if(password2_input == '') {
				form.find("input[name='password1']").next().children().next().html("请确认密码");
			} else {
				form.find("input[name='password1']").next().children().next().html("两次密码必须相同");
			}
			
			return false;
		} else {
			var uname = '';
			if (obj == "phoneregform") {
				uname = $.trim(form.find("input[name='mobile_input']").val());
			} else {
				uname = $.trim($("#email_input").val());
			}
			if (uname == password2_input && uname != '') {
				form.find("input[name='password1']").next().children().removeClass()
						.addClass("check_no");
				form.find("input[name='password2']").next().children().removeClass()
						.addClass("check_no");
				form.find("input[name='password1']").next().children().next().removeClass("check_no");
				form.find("input[name='password2']").next().children().next().removeClass("check_no");
				//form.find("input[name='password1']").next().next().removeClass().addClass("loginerror");
				form.find("input[name='password1']").next().children().next().html(
						"不可与账号相同");
				return false;
			} else {
				form.find("input[name='password1']").next().children().removeClass()
						.addClass("check_yes");
				form.find("input[name='password2']").next().children().removeClass()
						.addClass("check_yes");
				form.find("input[name='password1']").next().children().next().removeClass().addClass("success");
				form.find("input[name='password2']").next().children().next().removeClass().addClass("success");
				//orm.find("input[name='password1']").next().next().removeClass().addClass("placeholder");
				form.find("input[name='password1']").next().children().next().html(
						"密码输入正确");
				return true;
			}
		}
	} else {
		form.find("input[name='password1']").next().children().removeClass().addClass("check_no");
		form.find("input[name='password2']").next().children().removeClass().addClass("check_no");
		form.find("input[name='password1']").next().children().next().removeClass("check_no");
		form.find("input[name='password2']").next().children().next().removeClass("check_no");
		form.find("input[name='password1']").next().children().next().html("密码6-20位");
		return false;
	}
}

function checkPassword2(obj) {
	var form = $("#" + obj);
	var password2_input = $.trim(form.find("input[name='password2']").val());
	var password1_input = $.trim(form.find("input[name='password1']").val());

	var p = /^.{6,20}$/;
	
	if(password1_input == '') {
		form.find("input[name='password1']").next().children().removeClass().addClass("check_no");
		form.find("input[name='password2']").next().children().removeClass().addClass("check_no");
		form.find("input[name='password1']").next().children().next().removeClass("check_no");
		form.find("input[name='password2']").next().children().next().removeClass("check_no");
		form.find("input[name='password1']").next().children().next().html("请设置密码");
		return false;
	} else if(password2_input == '') {
		form.find("input[name='password1']").next().children().removeClass().addClass("check_no");
		form.find("input[name='password2']").next().children().removeClass().addClass("check_no");
		form.find("input[name='password1']").next().children().next().removeClass("check_no");
		form.find("input[name='password2']").next().children().next().removeClass("check_no");
		form.find("input[name='password1']").next().children().next().html("请确认密码");
		return false;
	} else if (p.test(password1_input)) {
		if (password1_input != password2_input) {
			form.find("input[name='password1']").next().children().removeClass().addClass("check_no");
			form.find("input[name='password2']").next().children().removeClass().addClass("check_no");
			form.find("input[name='password1']").next().children().next().removeClass("check_no");
			form.find("input[name='password2']").next().children().next().removeClass("check_no");
			if(password2_input == '') {
				form.find("input[name='password1']").next().children().next().html("请确认密码");
			} else {
				form.find("input[name='password1']").next().children().next().html("两次密码必须相同");
			}
			return false;
		} else {
			var uname = '';
			if (obj == "phoneregform") {
				uname = $.trim(form.find("input[name='mobile_input']").val());
			} else {
				uname = $.trim($("#email_input").val());
			}
			if (uname == password2_input && uname != '') {
				form.find("input[name='password1']").next().children().removeClass()
						.addClass("check_no");
				form.find("input[name='password2']").next().children().removeClass()
						.addClass("check_no");
				form.find("input[name='password1']").next().children().next().removeClass("check_no");
				form.find("input[name='password2']").next().children().next().removeClass("check_no");
				form.find("input[name='password1']").next().children().next().html(
						"不可与账号相同");
				return false;
			} else {
				form.find("input[name='password1']").next().children().removeClass()
						.addClass("check_yes");
				form.find("input[name='password2']").next().children().removeClass()
						.addClass("check_yes");
				form.find("input[name='password1']").next().children().next().removeClass().addClass("success");
				form.find("input[name='password2']").next().children().next().removeClass().addClass("success");
				form.find("input[name='password1']").next().children().next().html(
						"密码输入正确");
				return true;
			}
		}
	} else {
		form.find("input[name='password1']").next().children().removeClass().addClass("check_no");
		form.find("input[name='password2']").next().children().removeClass().addClass("check_no");
		form.find("input[name='password1']").next().children().next().removeClass("check_no");
		form.find("input[name='password2']").next().children().next().removeClass("check_no");
		form.find("input[name='password1']").next().children().next().html("密码6-20位");
		return false;
	}
}

function checkEmail(obj) {
	var form = $("#" + obj);
	var email_input = $.trim(form.find("#email_input").val());

	if(email_input == '') {
		form.find("#email_input").next().children().removeClass().addClass("check_no");
		form.find("#email_input").next().children().next().removeClass("check_no");
		form.find("#email_input").next().children().next().html("请填写邮箱");
		flag = false;
	} else if (isEmail(email_input)) {
		if (email_input.length > 60) {
			form.find("#email_input").next().children().removeClass().addClass("check_no");
			form.find("#email_input").next().children().next().removeClass("check_no");
			form.find("#email_input").next().children().next().html("邮箱长度小于60位");
			flag = false;
		} else {
			var requestRandom = Math.round(Math.random()*100)+1;
			$.ajax({
				method: checkEmailMethod.method,
				url: checkEmailMethod.url,
				beforeSend: function(XMLHttpRequest) {},
				data : "memberDO.email_verified=" + email_input+"&random="+ requestRandom,
				async: false,
				dataType: checkEmailMethod.datatype,
				jsonp: 'jsoncallback',
				success : function(data) {
					if (data.status == "true") {
						form.find("#email_input").next().children().removeClass()
								.addClass("check_yes");
						form.find("#email_input").next().children().next().removeClass().addClass("success");
						form.find("#email_input").next().children().next().html(
								data.message);
						flag = true;
					} else {
						form.find("#email_input").next().children().removeClass()
								.addClass("check_no");
						form.find("#email_input").next().children().next().removeClass("check_no");
						form.find("#email_input").next().children().next().html(
								data.message);
						flag = false;
					}
				}
			});
		}
	} else {
		form.find("#email_input").next().children().removeClass().addClass("check_no");
		form.find("#email_input").next().children().next().removeClass("check_no");
		form.find("#email_input").next().children().next().html("邮箱格式不正确");
		flag = false;
	}
	return flag;
}

function checkMobile(obj) {
	var form = $("#" + obj);
	var mobile_input = $.trim(form.find("input[name='mobile_input']").val());

	if(mobile_input == '') {
		form.find("#mobile_input").next().children().removeClass().addClass("check_no");
		form.find("#mobile_input").next().children().next().removeClass("check_no");
		form.find("#mobile_input").next().children().next().html("请填写手机");
		flag = false;
	} else if (isMobile(mobile_input)) {
		var requestRandom = Math.round(Math.random()*100)+1;
		$.ajax({
			method: checkMobileMethod.method,
			url: checkMobileMethod.url,
			async: false,
			beforeSend: function(XMLHttpRequest) {},
			data : "memberDO.mobile_verified=" + mobile_input + "&formName=" + obj + "&random=" + requestRandom,
			dataType: checkMobileMethod.datatype,
			jsonp: 'jsoncallback',
			success : function(data) {
				if (data.status == "true") {
					form.find("input[name='mobile_input']").next().children()
							.removeClass().addClass("check_yes");
					form.find("input[name='mobile_input']").next().children().next().removeClass().addClass("success");
					form.find("input[name='mobile_input']").next().children().next()
							.html(data.message);
					$("#messalert").css("display", "none");
					flag = true;
				} else {
					form.find("input[name='mobile_input']").next().children()
							.removeClass().addClass("check_no");
					form.find("input[name='mobile_input']").next().children().next().removeClass("check_no");
					form.find("input[name='mobile_input']").next().children().next()
					.html(data.message);
					$("#messalert").css("display", "none");
					flag = false;
				}
			}
		});
	} else {
		form.find("input[name='mobile_input']").next().children().removeClass().addClass(
				"check_no");
		form.find("input[name='mobile_input']").next().children().next().removeClass("check_no");
		form.find("input[name='mobile_input']").next().children().next().html("手机号码不正确");
		$("#messalert").css("display", "none");
		flag = false;
	}
	return flag;
}


function checkMobileEmail(obj) {
	var form = $("#" + obj);
	var mobile_input = $.trim(form.find("input[name='mobile_input']").val());

	if(mobile_input == '') {
		form.find("#mobile_input").next().children().removeClass().addClass("check_no");
		form.find("#mobile_input").next().children().next().removeClass("check_no");
		form.find("#mobile_input").next().children().next().html("请填写手机");
		flag = false;
//	} else if (isTelecomMobile(mobile_input) || isUnicomMobile(mobile_input)) {//过滤电信和联通号码
//		form.find("input[name='mobile_input']").next().children()
//							.removeClass().addClass("check_no");
//		form.find("input[name='mobile_input']").next().children().next().removeClass("check_no");
//		form.find("input[name='mobile_input']").next().children().next()
//					.html('');
//		$("#messalert").css("display", "block");
//		flag = false;
	} else if (isMobile(mobile_input)) {
		var requestRandom = Math.round(Math.random()*100)+1;
		$.ajax({
			method: checkMobileMethod.method,
			url: checkMobileMethod.url,
			async: false,
			beforeSend: function(XMLHttpRequest) {},
			data : "memberDO.mobile_verified=" + mobile_input + "&formName=" + obj + "&random=" + requestRandom,
			dataType: checkMobileMethod.datatype,
			jsonp: 'jsoncallback',
			success : function(data) {
				if (data.status == "true") {
					form.find("input[name='mobile_input']").next().children()
							.removeClass().addClass("check_yes");
					form.find("input[name='mobile_input']").next().children().next().removeClass().addClass("success");
					form.find("input[name='mobile_input']").next().children().next()
							.html(data.message);
					$("#messalert").css("display", "none");
					flag = true;
				} else {
					form.find("input[name='mobile_input']").next().children()
							.removeClass().addClass("check_no");
					form.find("input[name='mobile_input']").next().children().next().removeClass("check_no");
					form.find("input[name='mobile_input']").next().children().next()
					.html(data.message);
					$("#messalert").css("display", "none");
					flag = false;
				}
			}
		});
	} else {
		form.find("input[name='mobile_input']").next().children().removeClass().addClass(
				"check_no");
		form.find("input[name='mobile_input']").next().children().next().removeClass("check_no");
		form.find("input[name='mobile_input']").next().children().next().html("手机号码不正确");
		$("#messalert").css("display", "none");
		flag = false;
	}
	return flag;
}

function reSendEmailMessage(){
	alert("重发邮件请求已发送，请稍等！");
}

function reSendEmail() {
	var requestRandom = Math.round(Math.random()*100)+1;
	$.ajax({
		method: reSendEmailMethod.method,
		url: reSendEmailMethod.url,
		beforeSend: function(XMLHttpRequest) {
			$("#reSendEmail").attr("href","javascript:reSendEmailMessage();");
		},
		data : "memberDO.partyId=" + $("#goEmail").attr("partyId")+"&random="+ requestRandom,
		dataType: reSendEmailMethod.datatype,
		jsonp: 'jsoncallback',
		success : function(data) {
			alert(data.message);
		},
		complete : function(XMLHttpRequest, textStatus) {
			$("#reSendEmail").attr("href","javascript:reSendEmail();");
		}
	});
}

function countDown(f, secs,smsId) {
	$("#"+smsId).html(secs + "秒后重新发送");
	if (--secs > 0) {
		setTimeout("countDown('"+f+"', " + secs + ",'"+smsId+"')", 1000);
	} else {
		$("#"+smsId).html("重发验证码");
		$("#"+smsId).attr("onclick","javascript:"+f+"();");
	}
}

 function clientSideStrongPassword(value) {
	var num = 1;

	if (value.trim().length == 0) {
		return num;
	}

	if (value.length > 0 && value.length < 7) {
		num = 2;
		return num;
	}

	var pat1 = /[a-zA-Z]+/;

	if (pat1.test(value)) {
		++num;
	}

	var pat2 = /[0-9]+/;

	if (pat2.test(value)) {
		++num;
	}

	var chr = "";

	for (var i = 0; i < value.length; i++) {
		chr = value.substr(i, 1);

		if ("!@#$%^&*()_+-='\";:[{]}\|.>,</?`~".indexOf(chr) >= 0) {
			++num;
			break;
		}
	}

	return num;
}

function setPwdStrengthEx(obj, value) {
	var form = $("#" + obj);
	var ret = clientSideStrongPassword(value);

	if (ret == 1) {
		form.find("#passwd_power").removeClass().addClass("level");
		form.find("#passwd_power1").removeClass().addClass("level");
		form.find("#passwd_power2").removeClass().addClass("level");
		form.find("#pswd_result").html('');
	} else if (ret == 2) {
		form.find("#passwd_power").removeClass().addClass("level level_1");
		form.find("#passwd_power1").removeClass().addClass("level");
		form.find("#passwd_power2").removeClass().addClass("level");
		form.find("#pswd_result").html('弱');
	} else if (ret == 3) {
		form.find("#passwd_power").removeClass().addClass("level level_1");
		form.find("#passwd_power1").removeClass().addClass("level level_2");
		form.find("#passwd_power2").removeClass().addClass("level");
		form.find("#pswd_result").html('中');
	} else if (ret == 4) {
		form.find("#passwd_power").removeClass().addClass("level level_1");
		form.find("#passwd_power1").removeClass().addClass("level level_2");
		form.find("#passwd_power2").removeClass().addClass("level level_3");
		form.find("#pswd_result").html('强');
	}
}

// interaction effects
function chkmob() {
    var mobileNo = $.trim($("#mobile_input").val());
    var v = $("#mobileoption").is(":visible")
    
    if (v && mobileNo == "") {
        msgerr("mobile", "请填写手机");
        return false;
    }
    if (!v && mobileNo != "" && !isMobile(mobileNo)) {
        msgerr("mobile", "格式不正确");
        return false;
    }
    if (v && !isMobile(mobileNo)) {
        msgerr("mobile", "格式不正确");
        return false;
    }
    if (v) msgok("mobile");
    if (!v && mobileNo != "") {msgok("mobile");}
    if (!v && mobileNo == "") {$("#mobile_tip").html("");$("#mobile_ico").removeClass("ico-error");$("#mobile_ico").removeClass("ico-ok");}
    return true;
}

function chkeml() {
    var emailAccount = $.trim($("#email_input").val());
    var v = $("#emailoption").is(":visible")
    
    if (v && emailAccount == "") {
        msgerr("email", "请填写邮箱");
        return false;
    }
    if (!isEmail(emailAccount)) {
        msgerr("email", "格式不正确");
        return false;
    }
    if (v) msgok("email");
    return true;
}

function chkaut() {
    var authcode = $.trim($("#authcode").val());
    var reg = /^[0-9]{6}$/;
    
    if (authcode == "") {
        msgerr("authcode", "请填写验证码");
        return false;
    }
    if (!reg.test(authcode)) {
        msgerr("authcode", "请输6位数字");
        return false;
    }
    msgok("authcode");
    return true;
}

function chkpwd() {
    var pwd = $.trim($("#password1").val());
    
    if (pwd == "") {
        msgerr("pwd", "请设置密码");
        return false;
    }
    msgok("pwd");
    return true;
}

function chkpwd2() {
    var pwd = $.trim($("#password1").val());
    var pwd2 = $.trim($("#password2").val());
    
    if (pwd2 == "") {
        msgerr("pwd2", "请重复输入密码");
        return false;
    }
    if (pwd != "" && pwd != pwd2) {
        msgerr("pwd2", "密码不一致");
        return false;
    }
    msgok("pwd2");
    return true;
}

function msgerr(objId, msg) {
    if (msg != "") {
        $("#" + objId + "_tip").html(msg);
        $("#" + objId + "_ico").removeClass("ico-ok");
        $("#" + objId + "_ico").addClass("ico-error");
        $("#" + objId + "_ico").show();
    }
}

function msgok(objId) {
    $("#" + objId + "_tip").html("");
    $("#" + objId + "_ico").removeClass("ico-error");
    $("#" + objId + "_ico").addClass("ico-ok");
    $("#" + objId + "_ico").show();
}

function openLoginDialog() {
    WinTip();
	refreshCaptcha('');
	$("#bt2").addClass('current');
	$("#bt1").removeClass('current');
	$("#register").css("display",'none');
	$("#login").css("display",'block');
	$("#div-authcode").hide();
	 $(document).bind("keydown",function(event) {
		switch (event.keyCode) {
		case 13:
			doLogin();
			break;
		}
	});

	if(WB2.checkLogin()) {
		WB2.logout();
	}

	if(QC.Login.check()) {
		QC.Login.signOut();
	}

	if(T.loginStatus()) {
		T.logout();
	}

	initQQ();
	var login_btn = document.getElementById("login_btn");
	
	initQQWb();
	initSinaWb();
}

function openRegisterDialog() {
	WinTip();
	$("#bt1").addClass('current');
	$("#bt2").removeClass('current');
	$("#register").css("display",'block');
	$("#login").css("display",'none');
	resetRegForm();

	if(WB2.checkLogin()) {
		WB2.logout();
	}

	if(QC.Login.check()) {
		QC.Login.signOut();
	}

	if(T.loginStatus()) {
		T.logout();
	}

	initQQ();
	var login_btn = document.getElementById("login_btn");
	
	initQQWb();
	initSinaWb();
}

function closeRegisterDialog() {
	WinTip();
	resetRegForm();
	closeLoginDialog();
}

function closeLoginDialog() {
	$("#authcodeJCaptcha").attr("src","");
	$("#user_name_login").val("");
	$("#passwd_login").val("");
	$("#error").html("");
	$("#error").removeClass().addClass("loginerror");
	$(document).unbind("keydown");
}

function closeUserDialog() {
    $('#loginDialog').hide();
    $('.thickdiv').hide();
}

var T1 = function(id) {
	return document.getElementById(id);
}

function WinTip() {
	var win = new WinSize();
	var Tip=T1("bg");
	Tip.style.width=win.W+"px";
	Tip.style.height=win.H+"px";
	
	if(Tip.style.display == "block") {
		Tip.style.display = "none";
		T1("win").style.display = "none";
	} else {
		Tip.style.display = "block";
		T1("win").style.display = "block";
	}
}

var V$ = function(id) {
	return document.getElementById(id);
}

function WinTip2() {
	var win2=new WinSize();
	var Tip2=V$("bg2");
	Tip2.style.width=win2.W+"px";
	Tip2.style.height=win2.H+"px";

	var win=new WinSize();
	var Tip=V$("bg2");
	Tip.style.width=win.W+"px";
	Tip.style.height=win.H+"px";
 
	if(Tip2.style.display=="block") {
		Tip2.style.display="none";
		V$("win2").style.display="none";
  
  
		if(Tip.style.display=="block"){
			Tip.style.display="none";
			T1("win2").style.display="none";
		}else{ 
			Tip.style.display="none";
			T1("win2").style.display="none";   
		}
	}else{
		Tip2.style.display="block";
		V$("win2").style.display="block";
	}
}

var T1 = function(id) {
	return document.getElementById(id);
}

function WinSize() {//函数：获取尺寸
	var winWidth = 0;
	var winHeight = 0;

	yScroll = (document.documentElement.scrollHeight > document.documentElement.clientHeight) ? document.documentElement.scrollHeight :  document.documentElement.clientHeight;
	xScroll = (document.documentElement.scrollWidth>document.documentElement.clientWidth) ? document.documentElement.scrollWidth :  document.documentElement.scrollWidth;

	return{"W":xScroll,"H":yScroll - 37}
}

function resetRegForm() {
	$("#email_input").next().children().next().html("");
	$("#email_input").next().children().removeClass();
	$("#authcode").next().children().next().html("");
	$("#authcode").next().children().next().removeClass();
	$("#authcode").next().next().next().removeClass().addClass("placeholder");

	$(".register-dialog form").find(".form_input").each(function(){
		$(this).val("");
		$(this).next().children().next().html("");
		$(this).next().children().removeClass();
		$(this).next().children().next().removeClass();
	});
}