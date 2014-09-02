$(document).ready(function() {

	$(".minusDisable").live('click', function() {
		var itemId = $(this).attr("itemId");

		var n = eval($("#item_p_" + itemId).attr("value"));

		if (n > 1) {
			$("#item_p_" + itemId).attr("value", n - 1);
			setItemCount(itemId, n - 1);
			change_gift_count2(itemId,n-1);
		} else if (n <= 1) {
			deleteItemFromCart(itemId);
			remove_gift_count2(itemId);
		}
	});

	$(".plus").live('click', function() {
		var itemId = $(this).attr("itemId");
		var n = eval($("#item_p_" + itemId).attr("value"));
		$("#item_p_" + itemId).attr("value", n + 1);
		setItemCount(itemId, n + 1);
		change_gift_count2(itemId,n+1);
	});

	var c;
	/*
	 * $(".shopCart_warp").hover(function(){ displayCart();
	 * 
	 *  }, function(){
	 * 
	 * 
	 * $(this).find(".minicart_list").hide();
	 * 
	 * });
	 */

	var c;
	$("#mycart").hover(function() {
		var tc = new TonysfarmCookie("/");
		var scc = tc.getShoppingCartCount();
		if (scc >= 1)
			displayCart();
		else {
			$("#minicart_list").css("display", "block");
			// alert('nonono');
		}
		/*
		 * if ($("#minicart_list").css("display")=="block"){
		 * 
		 * $("#minicart_list").css("display","block"); clearTimeout(c); return; }
		 * 
		 * 
		 * if($("#shoppingCartDetail").val()=="1"){ $("#minicart_list").hide(0);
		 * $('#minicart_list_iframe').hide(); return; }
		 * 
		 * var cartUrl ="http://www.tonysfarm.com/cart/loadByStream.htm";
		 * 
		 * $.ajax({ method: "POST", url:cartUrl, dataType: "JSONP", jsonp:
		 * "callBack", cache: false, success:function(data){ if(data[0])
		 * loadcart(data[0]);
		 *  } });
		 */

	}, function() {
		c = setTimeout(function() {
			$("#minicart_list").hide(0);
			$('#minicart_list_iframe').hide();
		}, 200);
	});

	$("#minicart_list").mouseover(function() {
		clearTimeout(c)
	});

	$("#minicart_list").mouseout(function() {
		c = setTimeout(function() {
			$("#minicart_list").hide(0);
			$('#minicart_list_iframe').hide();
		}, 200);
	});

});

function displayCart() {

	$(this).find("#minicart_list").show();
	/*
	 * if ($("#minicart_list").css("display")=="block"){
	 * 
	 * $("#minicart_list").css("display","block"); //clearTimeout(c); return; }
	 */
	/*
	 * if($("#shoppingCartDetail").val()=="1"){ $("#minicart_list").hide(0);
	 * $('#minicart_list_iframe').hide(); return; }
	 */
	var cartUrl = "http://www.tonysfarm.com/cart/loadByStream.htm";

	$.ajax({
		method : "POST",
		url : cartUrl,
		dataType : "JSONP",
		jsonp : "callBack",
		cache : false,
		success : function(data) {
			// if(data[0])
			loadcart(data[0]);

		}
	});

}

function setpos() {

	/*
	 * var position = $('#mycart').position();
	 * 
	 * 
	 * 
	 * var ie6=!window.XMLHttpRequest;
	 * $("#minicart_list")[0].style.position=(ie6)?"absolute":"fixed";
	 * $("#minicart_list")[0].style.zIndex=999999;
	 * $("#minicart_list")[0].style.top=position.top+$('#mycart').height()+1+"px";
	 * $("#minicart_list")[0].style.left=position.left+"px";
	 */

	setTimeout(function() {
		$("#minicart_list").show(0);
		// if (ie6) {
		// if ($('#minicart_list_iframe').length < 1) {
		// $("#minicart_list").after('<iframe id="minicart_list_iframe"
		// src="about:blank"
		// style="position:absolute;top:0;left:0;z-index:999998;filter:alpha(opacity=0);display:none;"></iframe>');
		// }
		/*
		 * $('#minicart_list_iframe').css({ position : "absolute", top :
		 * position.top+$('#mycart').height()+1+"px", left : position.left+"px",
		 * width : $("#minicart_list").width() + 'px', height :
		 * $("#minicart_list").height() + 'px' }).show();
		 */
		// }
	}, 200);
}

function loadcart(data) {

	if (data.productList == null || data.productList.length == 0) {
		return;
	}

	var itemText = "";

	if (data.productList == null || data.productList.length == 0) {
		$("#minicart_list").hide();
		$('#minicart_list_iframe').hide();
		$("#minicart_list").html("");
		$('#carts').html("0");
		return;
	} else {
		itemText += '<div class="list_detail" id="showMiniCartDetail">';
		itemText += '<ul>';
	}

	$.each(data.productList, function(n, item) {
		var quantityPriceRange = getQuantityPriceRange(item.id,item.number)
		itemText += '<li id="cartItem_' + item.id + '" org_price_' + item.id + '="'+item.price+'">';

		if (item.picUrl == "") {
			itemText += '<a href="http://www.tonysfarm.com/detail/' + item.id + '.htm" class="pro_img" traget="_blank">';
			itemText += '<img width="40px" height="40px" src="http://www.tonysfarm.com\/images\/card_smal1.jpg" \/><\/a>';
		} else {

			var picurl = item.image;
			// itemText +='<a
			// href="http://www.tonysfarm.com/detail/'+item.id+'.htm"
			// class="pro_img" traget="_blank">';
			itemText += '<a href="#" class="pro_img" traget="_blank">';
			itemText += '<img width="40px" height="40px" src="http://www.tonysfarm.com/' + picurl + '" \/><\/a>';

		}

		// itemText +='<a href="http://www.tonysfarm.com/detail/'+item.id+'.htm"
		// class="pro_name" traget="_blank">' + item.productName + '<\/a><span
		// class="pro_price">¥' + item.price + '<\/span>' +
		
		var price_html="";
		if(quantityPriceRange.price ==0 || parseFloat(quantityPriceRange.price)==parseFloat(item.price)){
			price_html= '<span class="pro_price">¥' + item.price + '</span>';
		}else{
			price_html= '<span class="pro_price">¥' + quantityPriceRange.price + '<b>¥' + item.price + '</b></span>';
		}
		
		if(is_free(item.id)){
			itemText += '<a href="#" class="pro_name">' + item.productName + '<\/a>'+ price_html +'<div class="num_box">' + '<input id="item_p_' + item.id + '" itemId="' + item.id + '" type="text" value="' + item.number + '" class="minicart_num" orinum="1" style="border:none;" readonly="readonly">'
			+ '<\/div><\/li>';
		}else{
			itemText += '<a href="#" class="pro_name">' + item.productName + '<\/a>'+ price_html + '<div class="num_box"><b itemId="' + item.id
			+ '" class="minusDisable"></b>' + '<input id="item_p_' + item.id + '" itemId="' + item.id + '" type="text" value="' + item.number + '" class="minicart_num" orinum="1">'
			+ '<b itemId="' + item.id + '" class="plus"><\/b><a href=javascript:remove_shopping_cart("' + item.id + '");>删除<\/a><\/div><\/li>';
		}
	});

	if (data.productList.length > 0) {

		itemText += '<div class="checkout_box">';

		var shoppingCartTotalCount = getShoppingCartCount();
		itemText += '<p><span class="fl">共<strong><span id="shoppingCartTotalCount">' + shoppingCartTotalCount + '</span></strong>件商品</span>';

		var totalPrice = getShoppingCartPrice();
		itemText += '合计：<strong>¥<span id="shoppingCartTotalPrice">' + totalPrice + '</span></strong></p><a class="checkout_btn" href="/order/shopcart.html">去结算</a></div></div>';

		/*
		 * itemText+='<div class="minicart_list_items_f cf">';
		 * (data.productList.length>5)? itemText+='<p>购物车里还有<span>'+(data.productList.length-5)+'<\/span>件商品<\/p>':
		 * ""; //itemText+='<p>购物车里还有<span>4</span>件商品</p>'; //<!--购物车大于5件
		 * 出现--> itemText+='<a
		 * href="http://www.tonysfarm.com\/cart\/initShoppingCar.htm"
		 * class="minicart_list_items_but">查看我的购物车<\/a><\/div>';
		 */
	}

	$("#minicart_list").html(itemText);
	$('#carts').html(data.productList.length);

	setpos();
	// $("#minicart_list").show(0);
}

function getQuantityPriceRange(productId,quantity){
	
	var price ;
		$.ajax({
			url : 'http://www.tonysfarm.com/cart/loadQuantityPriceRange.htm',
			type : 'post',
			data : 'productId='+productId+'&quantity='+quantity,
			async : false,
			success : function(data) {
				price=data;
			}
		});
	return price;
}


function deleteItemFromCart(itemId) {
	var tc = new TonysfarmCookie("/");
	var a = tc.getShoppingCartContent();

	var nc = "";
	var items = a.split("~");

	for ( var i = 0; i < items.length; i++) {

		var b = items[i].split(",");
		if (b[0] == itemId) {
			continue;
		} else {
			if (nc == "")
				nc = items[i];
			else
				nc = nc + "~" + items[i];
		}

	}

	writeShoppingCartCookie(nc);

	$("#cartItem_" + itemId).remove();

	var count = tc.getShoppingCartCount();

	if (count > 0)
		count--;

	writeShoppingCartCookieCount(count);
	$('#carts').html(count);

	if (count == 0) {
		$("#minicart_list").html("");
		$("#minicart_list").hide(0);
		$('#minicart_list_iframe').hide();
	}

	// $("#shoppingCartTotalCount").html(getShoppingCartCount());
	// $("#shoppingCartTotalPrice").html(getShoppingCartPrice());

	/*
	 * if(count >= 5){
	 * 
	 * var cartUrl
	 * ="http://www.tonysfarm.com/cart/loadByStream.htm?version="+new
	 * Date().getTime();
	 * 
	 * $.ajax({ method: "POST", url:cartUrl, dataType: "JSONP", jsonp:
	 * "callBack", cache: false, success:function(data){ if(data[0])
	 * loadcart(data[0]);
	 *  } }); }
	 */
}

function writeShoppingCartCookie(content) {
	var validMin = 90 * 24 * 60;
	TonysfarmCookie.writeCookie(TonysfarmCookie.SC, content, TM.COOKIE_DOMAIN, '/', validMin);
}

function writeShoppingCartCookieCount(count) {
	var validMin = 90 * 24 * 60;
	TonysfarmCookie.writeCookie(TonysfarmCookie.SD, count, TM.COOKIE_DOMAIN, '/', validMin);
}

function getShoppingCartCount() {
	var tc = new TonysfarmCookie("/");
	return tc.getShoppingCartCount();
}

function getShoppingCartPrice() {
	var tc = new TonysfarmCookie("/");
	var a = tc.getShoppingCartContent();

	if (a == "")
		return 0;

	var items = a.split("~");
	var price = 0;

	for ( var i = 0; i < items.length; i++) {
		var b = items[i].split(",");
		
		var quantityPriceRange = getQuantityPriceRange(b[0],b[1]);
		if(quantityPriceRange&&quantityPriceRange.price !=0){
			price += b[1] * quantityPriceRange.price;
		}else{
			price += b[1] * b[2];
		}
		
		
	}

	return price;
}

function setItemCount(itemId, count) {
	var tc = new TonysfarmCookie("/");
	var a = tc.getShoppingCartContent();

	var nc = "";
	var items = a.split("~");

	for ( var i = 0; i < items.length; i++) {

		var b = items[i].split(",");
		if (b[0] == itemId) {
			b[1] = count;
			
			var org_pric=$("#cartItem_"+itemId).attr("org_price_"+itemId);
			var priceRange = getQuantityPriceRange(itemId,count);
			var price_html="";
			if(priceRange.price ==0){
				price_html= '<span class="pro_price">¥' + org_pric + '</span>';
			}else{
				b[2] = priceRange.price;
				price_html= '<span class="pro_price">¥' + priceRange.price + '<b>¥' + org_pric + '</b></span>';
			}
			
			$("#cartItem_"+itemId).find("span").html(price_html);
			
			
			
			var ni = "";
			for (j = 0; j < b.length; j++) {
				if (ni == "")
					ni = b[j];
				else
					ni = ni + "," + b[j];
			}

			if (nc == "")
				nc = ni;
			else
				nc = nc + "~" + ni;

		} else {
			if (nc == "")
				nc = items[i];
			else
				nc = nc + "~" + items[i];
		}

	}

	writeShoppingCartCookie(nc);
	$("#shoppingCartTotalCount").html(getShoppingCartCount());
	$("#shoppingCartTotalPrice").html(getShoppingCartPrice());

}

function getItem(itemId, itemPrice, itemCount, date) {
	return "" + itemId + "," + itemCount + "," + itemPrice + "," + date;

}

// 产品加入购物车, itemCount为负数表示数量减
function addShoppingCarItem(itemId, itemPrice, itemCount) {
	
	var d = new Date().getTime();

	var tc = new TonysfarmCookie("/");

	var a = tc.getShoppingCartContent();

	var nc = "";
	var scc = tc.getShoppingCartCount();
	var added = false;

	if (a == "undefined") {
		scc++;
		nc = getItem(itemId, itemPrice, itemCount, d);
		var data=gift_count(itemId,itemCount,d);
		if(data.status=="true"){
			data=$.parseJSON(data.message);
			scc=scc+parseInt(data.scc);
			nc=data.nc+nc;
		}
		writeShoppingCartCookie(nc);
		writeShoppingCartCookieCount(scc);
		return;
	}

	var items = a.split("~");
	
	for ( var i = 0; i < items.length; i++) {

		var b = items[i].split(",");
		if (b[0] == itemId) {
			added = true;
			var count = eval(b[1]) + eval(itemCount);

			if (count <= 0)
				continue;

			b[1] = count;

			var ni = "";

			for (j = 0; j < b.length; j++) {
				if (ni == "")
					ni = b[j];
				else
					ni = ni + "," + b[j];
			}

			if (nc == "")
				nc = ni;
			else
				nc = nc + "~" + ni;
		} else {
			if (nc == "")
				nc = items[i];
			else
				nc = nc + "~" + items[i];
		}
	}

	if (!added) {
		scc++;

		var ni = getItem(itemId, itemPrice, itemCount, d);

		if (nc == "")
			nc = ni;
		else
			nc = nc + "~" + ni;
			
		var data=gift_count(itemId,itemCount,d);
		if(data.status=="true"){
			data=$.parseJSON(data.message);
			scc=scc+parseInt(data.scc);
			nc=data.nc+nc;
		}
	}else{
		nc="";
		for ( var i = 0; i < items.length; i++) {
			var b = items[i].split(",");
			var pid=b[0];
			if (is_free(pid)||pid==itemId) {
				var count = eval(b[1]) + eval(itemCount);

				if (count <= 0)
					continue;

				b[1] = count;

				var ni = "";

				for (j = 0; j < b.length; j++) {
					if (ni == "")
						ni = b[j];
					else
						ni = ni + "," + b[j];
				}

				if (nc == "")
					nc = ni;
				else
					nc = nc + "~" + ni;
			} else {
				if (nc == "")
					nc = items[i];
				else
					nc = nc + "~" + items[i];
			}
		}
	}
	
	writeShoppingCartCookie(nc);
	writeShoppingCartCookieCount(scc);

}

function gift_count(pid,itemCount,d){
	var status='false';
	var message='';
	$.ajax({
		url : 'http://www.tonysfarm.com/product/queryProducts.htm',
		type : 'post',
		data : 'pid='+pid,
		async : false,
		dataType : "json",
		success : function(data) {
			status=data.status;
			if(status=="true"){
				var nc='';
				for(var i=0;i<data.message.length;i++){
					var o=data.message[i];
					nc+=o.freeProductId+","+itemCount+",0.00,"+d+"~";
				}
				message = '{"nc":"'+nc+'","scc":'+2+'}' ;
			}
		}
	});
	return {status:status,
			message:message
			};
}

function change_gift_count2(pid,productNumber){
	$.ajax({
		url : 'http://www.tonysfarm.com/product/queryProducts.htm',
		type : 'post',
		data : 'pid='+pid,
		async : false,
		dataType : "json",
		success : function(data) {
			var status=data.status;
			if(status=="true"){
				var nc='';
				for(var i=0;i<data.message.length;i++){
					var o=data.message[i];
					setItemCount(parseInt(o.freeProductId), productNumber);
					$("#showMiniCartDetail").find("#item_p_"+o.freeProductId).val(productNumber);
				}
			}
		}
	});
}

function remove_gift_count2(pid){
	$.ajax({
		url : 'http://www.tonysfarm.com/product/queryProducts.htm',
		type : 'post',
		data : 'pid='+pid,
		async : false,
		dataType : "json",
		success : function(data) {
			var status=data.status;
			if(status=="true"){
				var nc='';
				for(var i=0;i<data.message.length;i++){
					var o=data.message[i];
					deleteItemFromCart(parseInt(o.freeProductId));
				}
			}
		}
	});
}

function remove_shopping_cart(itemId){
	deleteItemFromCart(itemId);
	remove_gift_count2(itemId);
}

function is_free(pid){
	var p_l=[1757,2142];
	for ( var i = 0; i < p_l.length; i++) {
		if(pid==p_l[i]){
			return true;
		}
	}
	return false;
}
