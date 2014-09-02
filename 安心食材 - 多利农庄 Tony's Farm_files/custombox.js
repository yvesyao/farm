var using_package='';
$(function(){
	if(!check_login()){
		$("#show_packages").html('会员专享，请您先<a onclick="openLoginDialog();" href="javascript:void(0);" >登录</a>！');
	}else{
		$("#addpro1").css({"padding-bottom":"10px","padding-top":"0px"});
		initUsedPackage();
	}
	
	// 叠加单品-我的宅配菜箱 下拉的效果
	$(".addpro_right .vegbox").hover(function() {
		if(!check_login()){
			$("#show_packages").html('会员专享，请您先<a onclick="openLoginDialog();" href="javascript:void(0);" >登录</a>！');
			$("#vegbox_noinfo").show();
			$(this).find(".vegbox_info").hide();
			return;
		}else{
			var card_no=$("#using_package").val();
			if(!card_no||card_no=="-1"){
				//alert('请您先选择卡号或套餐！');
				window.location.href = "/addpro.html";
				return;
			}
			custom.loadCustomBox();
			$(this).find(".vegbox_info").show();
		}
	}, function() {
		$(this).find(".vegbox_info").hide();
		$("#vegbox_noinfo").hide();
	}).css("cursor", "pointer");

	$('.vegbox_info ul li').live('mouseover mouseout', function(event) {
		if (event.type == 'mouseover') {
			$(this).addClass("on");
		} else {
			$(this).removeClass("on");
		}
	});

	$('.vegbox_info .pre').live('mouseover mouseout', function(event) {
	    if (event.type == 'mouseover') {
			$(this).addClass("hover");	
	    } else {
			$(this).removeClass("hover");
		}
	});
	
	$('.vegbox_info .next').live('mouseover mouseout', function(event) {
	    if (event.type == 'mouseover') {
			$(this).addClass("hover");	
	    } else {
			$(this).removeClass("hover");
		}
	});

    // 叠加单品-我的宅配菜箱 下拉里面的 上下翻滚效果
	var page = 1;
	var i = 1; // 每版放4个图片
	// 向后 按钮
	$(".vegbox_info .part2 .next").live("click",function() { // 绑定click事件
		var $parent = $(this).parents("div.vegbox_info");// 根据当前点击元素获取到父元素
		var $v_show = $parent.find("div.boxinfo"); // 寻找到“视频内容展示区域”
		var $v_content = $parent.find("div.box"); // 寻找到“视频内容展示区域”外围的DIV元素
		var v_height = $v_show.find("li").height()+1;
		var len = $v_show.find("li").length;
		var page_count = Math.ceil(len / i); // 只要不是整数，就往大的方向取最小的整数
		if (!$v_show.is(":animated")) { // 判断“视频内容展示区域”是否正在处于动画
			if (page == page_count) { // 已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
//					$v_show.animate({
//						top : '0px'
//					}, "slow"); // 通过改变left值，跳转到第一个版面
//					page = 1;
			} else {
				$v_show.animate({
					top : '-=' + v_height
				}, "fast"); // 通过改变left值，达到每次换一个版面
				page++;
			}
		}
		// $parent.find("span").eq((page-1)).addClass("current").siblings().removeClass("current");
	}).css("cursor", "pointer");

	// 往前 按钮
	$(".vegbox_info .part2 .pre").live("click",function() {
		var $parent = $(this).parents("div.vegbox_info");// 根据当前点击元素获取到父元素
		var $v_show = $parent.find("div.boxinfo"); // 寻找到“视频内容展示区域”
		var $v_content = $parent.find("div.box"); // 寻找到“视频内容展示区域”外围的DIV元素
		var v_height = $v_show.find("li").height();
		var len = $v_show.find("li").length;
		var page_count = Math.ceil(len / i); // 只要不是整数，就往大的方向取最小的整数
		if (!$v_show.is(":animated")) { // 判断“视频内容展示区域”是否正在处于动画
			if (page == 1) { // 已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
//					$v_show.animate({
//						top : '-=' + v_height * (page_count - 1)
//					}, "slow");
//					page = page_count;
			} else {
				$v_show.animate({
					top : '+=' + v_height
				}, "fast");
				page--;
			}
		}
		// $parent.find("span").eq((page-1)).addClass("current").siblings().removeClass("current");
	}).css("cursor", "pointer");
	
	$("#vegbox_info .prolist").find("input[name]").live("mouseout blur",function(){
		var b=$(this).attr('before');
		var o=$(this).attr('name');
		var p=$(this).attr('id');
		var q=$(this).val();
		if(b&&o&&p&&q){
			var reg=/^[0-9]/;
			if(!reg.test(q)){
				alert('购买数量只能为数字，且不能大于9！');
				$(this).val(b);
				return;
			}
			if(b!=q){
				var r = custom.chnageQ(o,p,q);
				if(r){
					$(this).val(q);
					$(this).attr('before',q);
				}
			}
		}
	});
	
	$("#using_package").live("change",function(){
		if(using_package.length>0){
			var card_no=$(this).val();
			var remain_count=0;
			if(card_no!='-1'){
				for ( var i = 0; i < using_package.length; i++) {
					var p = using_package[i];
					if(card_no==p.cardNo){
						remain_count=p.remain_count;
						break;
					}
				}
			}
			$("#remain_count").text("您还剩余"+remain_count+"个菜箱可定制！");
		}else{
			$("#using_package").hide();
			$("#using_package").next().remove();
			$("#remain_count").text("您暂无菜箱可定制！");
		}
	});

	var custom={
		loadCustomBox:function(){
			var card_no=$("#using_package").val();
			$.ajax({
				type : 'post',
				url : 'http://www.tonysfarm.com/customBox/getBox.htm',
				dataType:'json',
				data:{"cardNo":card_no},
				beforeSend:function(XHR) {
					
				},
				success : function(data) {
					if(data.status=="false"){
						
					}else{
						$("#gotoStackboxconfirm").attr("href","stackboxconfirm.html?cardNo="+card_no);
						var $ul=$($("#vegbox_info").children()[0]);
						$ul.empty();
						var order=data.message.order;
						for ( var i = 0; i < order.length; i++) {
							var o=order[i];
							var str='<li>';
							str+='<div class="part1 leftbox"><h3>'+o.month+'<b>月</b>'+o.day+'<b>日</b></h3><span><b>'+o.week+' '+o.timespan+'</b>送达</span></div>';
							str+='<div class="part2 leftbox">';
							str+='<div class="pre leftbox"></div>';
							str+='   <div class="box leftbox">';
							str+='       <div class="boxinfo leftbox">';
							str+='           <ul class="prolist">'+custom.loadOrderItem(o.item)+'            </ul>';
							str+='        </div>';
							str+='    </div>';
							str+='    <div class="next leftbox"></div>';
							str+='</div>';
							str+='<div class="part3 leftbox">';
							str+='<div class="box_head leftbox"><span><b>第'+(i+1)+'箱</b></span><i>小计&nbsp;&nbsp;¥&nbsp;<lable id="total'+(i+1)+'">0.00</label></i></div>';
				            str+='   <div class="box leftbox">';
				            str+='       <div class="boxinfo leftbox">';
				            str+='            <ul name="custom_box" class="prolist">'+custom.loadCustomItem(data,o.order_id)+'</ul>';
				            str+='       </div>';
				            str+='   </div>';
							str+='</div>';
							str+='</li>';
							$ul.append(str);
						}
						var count=data.message.count;
						for(var i=1;i<=count.length;i++){
							$("#total"+i).text(count[i-1]);
						}
					}
				},
				error:function (XMLHttpRequest, textStatus, errorThrown) {
					
				}
			});
		}
		,
		loadOrderItem:function(item){
			var str='';
			for ( var i = 0; i < item.length; i++) {
				var oi=item[i];
				str+='<li><span>× '+oi.pq+'</span>'+oi.pn+'</li>';
			}
			str+='<li></li>';
			return str;
		},
		loadCustomItem:function(data,orderId){
			var box_product=data.message.box_product;
			var box_num=data.message.box_num;
			if(box_product&&box_num){
				var str='';
				for ( var i = 0; i < box_product.length; i++) {
					var p= box_product[i];
					var n=null;
					for ( var j = 0; j < box_num.length; j++) {
						n=box_num[j];
						if(n.oid==orderId){
							n=n.num;
							break;
						}
					}
					if(n){
						for ( var j = 0; j < n.length; j++) {
							var nn=n[j];
							if(nn.pid==p.pid){
								str+='<li title="'+p.ptip+'"><span><input name="'+orderId+'" id="'+p.pid+'" before="'+nn.pq+'" type="text" class="bordersty txtsty" maxlength=1 style="width:15px;margin-right:4px;cursor:pointer;" value="'+nn.pq+'"/>'+p.pu+'&nbsp;</span>'+p.pn+'</li>';
							}
						}
					}
				}
	            return str;
			}
			return "";
		},chnageQ:function(orderId,productId,quantity){
			var r=false;
			var card_no=$("#using_package").val();
			$.ajax({
				type : 'post',
				url : 'http://www.tonysfarm.com/customBox/addBox.htm',
				data :{"orderId":orderId,"productId":productId,"quantity":quantity,"cardNo":card_no},
				dataType:'json',
				async:false,
				beforeSend:function(XHR) {
					
				},
				success : function(data) {
					if(data.status=="false"){
						alert(data.message);
					}else{
						r=true;
						resetCount(data);
					}
				},
				error:function (XMLHttpRequest, textStatus, errorThrown) {
					
				}
			});
			return r;
		}
	};
});

//加载用户当前使用的套餐
function initUsedPackage() {
	$.ajax({
		type : 'post',
		url : "http://www.tonysfarm.com/customBox/usedPackageByType.htm",
		dataType : 'json',
		success : function(data){
			if(data.status=="true"){
				using_package=data.message.using_package;
				if(using_package.length>0){
					var str='<select id="using_package" style="width:160px;" class="txtfld2">';
					var remain_count=0;
					for ( var i = 0; i < using_package.length; i++) {
						var p = using_package[i];
						if(i==0){
							remain_count=p.remain_count;
						}
						str+='<option value="'+p.cardNo+'">'+p.package_name+'('+p.cardNo+')'+'</option>';
					}
					str+='</select><br><span id="remain_count">您还剩余'+remain_count+'个菜箱可定制</span>';
					$("#show_packages").html(str);
					$("#using_package option:eq(0)").attr("selected","selected");
				}else{
					$("#using_package").hide();
					$("#using_package").next().remove();
					$("#remain_count").text("您暂无菜箱可定制！");
				}
			}else{
				$("#using_package").hide();
				$("#using_package").next().remove();
				$("#remain_count").text("您暂无菜箱可定制！");
			}
			
		}
	})
}

function resetCount(data){
	var count=data.message.count;
	for(var i=1;i<=count.length;i++){
		$("#total"+i).text(count[i-1]);
	}
}

function clearBox(){
	if(!checkLogin()){
		return;
	}
	var card_no=$("#using_package").val();
	$.ajax({
		type : 'post',
		url : 'http://www.tonysfarm.com/customBox/clearBox.htm',
		dataType:'json',
		data:{"cardNo":card_no},
		beforeSend:function(XHR) {
			
		},
		success : function(data) {
			if(data.status=="false"){
				alert(data.message);
			}else{
				$("#vegbox_info").find("ul[name='custom_box']").empty();
				resetCount(data);
			}
		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
}

function addBox(productId){
	if(!checkLogin()){
		return;
	}
	var card_no=$("#using_package").val();
	$.ajax({
		type : 'post',
		url : 'http://www.tonysfarm.com/customBox/addBox.htm',
		data :{"productId":productId,"cardNo":card_no},
		dataType:'json',
		beforeSend:function(XHR) {
			
		},
		success : function(data) {
			if(data.status=="false"){
				alert(data.message);
			}else{
				//custom.resetCount(data);
			}
		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
}
