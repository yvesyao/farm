
$(function(){
	
			
	
//如何成为会员
$(".preferential .text span").hover(function(){
	$(".beMemberDes").show();
	},function(){	
	$(".beMemberDes").hide();	
	});	
	
	$(".product_details_2012r .part1 b").hover(function(){
	$(".beMemberDes2").show();
	},function(){	
	$(".beMemberDes2").hide();	
	});	
	
	

//随箱定制页面 点击单品name弹窗效果
$(".showdesbg").width($(document).width());
$(".showdesbg").height($(document).height());

$(".name").click(function(){
 var par=$(this).parents("li");
 if($(".showdesbg",par).is(":visible")){
	  $(".showdesbg",par).hide();
	  $(".showdeswin",par).hide();
  }else{
	  $(".showdesbg",par).show();
	  $(".showdeswin",par).show();
  }

});


$(".close").click(function(){
	  var par=$(this).parents("li");
	  $(".showdesbg",par).hide();
	  $(".showdeswin",par).hide();
});

	
	//新鲜菜箱 菜箱列表鼠标hover以及点击的效果
	$(".choose_right .list li").each(function(i) {	
		$(this).hover(function(){
			$(this).addClass("hover");
			},function(){	
			$(this).removeClass("hover");
			});
    });
	
	
	//想吃点击的效果
	$(".vegdesc .likeit").click(function(){
		
		if($(".mod_go_top .my").hasClass("my_loved")){
			alert("已经收藏了哦~")
			return;
			}
		
		var $endtop=$(".add_snacks_pa .my").offset().top;
		var $endleft=$(".add_snacks_pa .my").offset().left;
				
		//原图片的位置
		var $orgtop=$("#thumbnail").offset().top;
		var $orgleft=$("#thumbnail").offset().left;
		var $orgwidth=$("#thumbnail").css("width");
		var $orgheight=$("#thumbnail").css("height");
	
		//然后赋值给需要动的图片
		$("#thumbnail2").css({"left":$orgleft,"top":$orgtop,"width":$orgwidth,"height":$orgheight});
		
		if( !$("#thumbnail2").is(":animated") ){
		$("#thumbnail2").fadeIn("fast");
	    $("#thumbnail2").animate({width: "40px" , height :"40px",left: $endleft, top:$endtop }, 600)
			            .fadeOut("fast",function(){
							$(".mod_go_top .my").addClass("my_loved");
							});
		}
		
		})
		
		
	//安心食材 点击加入购物车 效果
	$(".prolist2 li .addshopcart_btn").click(function(){
		//购物车位置
		var $endtop=$(".shopCart_warp").offset().top;
		var $endleft=$(".shopCart_warp").offset().left;
				
		//原图片的位置
		var $orgtop=$(this).parents("li").find(".proimg1").offset().top-10;
		var $orgleft=$(this).parents("li").find(".proimg1").offset().left;
		var $orgwidth=$(this).parents("li").find(".proimg1").css("width");
		var $orgheight=$(this).parents("li").find(".proimg1").css("height");
		var $orgsrc=$(this).parents("li").find(".proimg1").attr("src")
		//alert($orgtop);
	
		//然后赋值给需要动的图片
		$(".proimg2").css({"left":$orgleft,"top":$orgtop,"width":$orgwidth,"height":$orgheight});
		$(".proimg2").attr("src",$orgsrc);

		
		if( !$(".proimg2").is(":animated") ){
			$(".proimg2").fadeIn("fast");
			$(".proimg2").animate({width: "30px" , height :"30px",left: $endleft, top:$endtop }, 600)
							.fadeOut("fast");
		}


		
		});	
		
	

	
	
	//详细页面 tab切换
	$("#bodyTab li").click(function(){
			$(this).addClass("this").siblings().removeClass("this");
	});	
	
	//套餐切换
	$(".tc_area dd a").each(function(i) {
        $(this).hover(function(){
			if($(this).hasClass("curr")){
				return;
			}else{
				$(this).addClass("hover").siblings().removeClass("hover");
			}
			
			},function(){
				$(this).removeClass("hover");
			});
			
				
		$(this).click(function(){
			$(this).addClass("curr").siblings().removeClass("curr");
		});	
    });
	
	
	//新鲜菜箱-本周菜单切换
	$(".vegmenu_warp .tabs li").each(function(i) {
        
	  $(this).click(function(){
	    $(this).addClass("on").siblings(".tabs li").removeClass("on");
		$(".veg").eq(i).show().siblings(".veg").hide(); 
	   });

    }).css("cursor","pointer");
	
	
	initCustomizebox();

	//加载本周菜单
	$.ajax({
	    	type:boxWeekMenuMethod.method,
	    	url:boxWeekMenuMethod.url,
	    	data:'flagMenu=week',
	    	success:function(data){
				$("vegmenu").html("")
				var menuHtml=""
				for ( var i = 0; i < data.length; i++) {
					var c=data[i].cmsProductImage;
					menuHtml=menuHtml+"<li> <img src='/"+c.imageUrl+"' width='70' height='55' />";
					menuHtml=menuHtml+"<div class='name'>"+data[i].productName+"</div>";
					menuHtml=menuHtml+"<div class='info'><a href='#' class='like'>155</a> <a href='#' class='comments'>18</a></div>";
					menuHtml=menuHtml+"</li>";
				}
				
				if(data.length==0)
				{
						$("#vegmenu").html(" <div class='nomenu'>本周菜单暂未发布，请保持关注。</div>");
				}
				else
				{
						$("#vegmenu").html(menuHtml);
				}
				
	    	 }
	 });	  

	$(".leftbar li").hover(function () {
		$(this).toggleClass("hover");
	}).click(function () {
		$(this).addClass("on").siblings().removeClass("on");
	});


	$(".leftbar2 li").hover(function () {
	$(this).toggleClass("hover");
	}).click(function () {
		$(this).addClass("on").siblings().removeClass("on");
	});
	
	

	
	
	
	//点击收起/展开 “选择菜箱” 栏目
	$(".choose_tit p").click(function(){
			if($('.choose_cont2').is(":visible")){
					$('.choose_cont2').hide();                   		
					$('.choose_tit p')     
						.text("")
						.addClass("open");              
			  }else{
					$('.choose_cont2').show();                   		
					$('.choose_tit p')    
						.text("")
						.removeClass("open");               
			  }
		
		}).css("cursor","pointer");
	
	
	
	
	
	
 //新会员添加单品 效果
  $('.choose_btn').click(function(){
  $('.box').show();;//you can give it a speed
  $(".choose_cont2").hide();
  });
  
  $('.addpro_btn').click(function(){
  $('.item').show();;//you can give it a speed
  });


//新会员添加菜箱 后 删除菜箱 效果
  $('.delBox').click(function(){
  $(this).parent(".box").hide(); //.remove()
  $(".choose_cont2").show();
  });
	
	
	
  //新会员添加单品 后 删除单品 效果
  $('.del').click(function(){
  $(this).parent(".item").hide(); //.remove()
  });
	

//新会员定制菜箱 单次送 周期送 切换	
$(".distribution_method ul li").each(function(i){
   $(this).click(function(){
    $(this).addClass("hover").siblings().removeClass("hover");
$(".distribution_cont").eq(i).show().siblings().hide();

if($(this).eq(i).is("1")){
	
				    $('.weeks_table_warp').show();                   		
					$('#show_weeks')    
						.text("收起周配送情况");
               
			  }else{	
					$('.weeks_table_warp').hide();                   		
					$('#show_weeks')     
						.text("展开周配送情况");                   
			  }


}).css("cursor","pointer");

})

//加载本周菜单


//新会员定制菜箱 周期送 查看/收起详情	
		$('#show_weeks').click(function(){
		      if($('.weeks_table_warp').is(":visible")){
					$('.weeks_table_warp').hide();                   		
					$('#show_weeks')     
						.text("展开周配送情况")
						.removeClass("close");                 
			  }else{
					$('.weeks_table_warp').show();                   		
					$('#show_weeks')    
						.text("收起周配送情况")
						.addClass("close");                 
			  }
			return false;					      
		}).css("cursor","pointer");




  //新会员添加单品 后 删除单品 效果
  $('.customVeg_total_left a').click(function(){
  $(".tips").show(); //.remove()
  });
	
	
  //新会员添加单品 后 删除单品 效果
  $('.tips a').click(function(){
  $(this).parent(".tips").hide(); //.remove()
  });
  
  

  

	//加号
	$(".number .plus").bind("click",function(){
		var $parent=$(this).parent(".number");
		var $num=window.Number($parent.find("input").val());
		$parent.find("input").val($num+1);
		$parent.find(".delete").addClass("minus").removeClass("minus_disable");
		});
	
	
	
	//减号
	$(".number .delete").bind("click",function(){
	 var $parent=$(this).parent(".number");
	 var $num=window.Number($parent.find("input").val());
		 if($num>1){
			$parent.find("input").val($num-1);
			}else{
			$parent.find("input").val(0);
			$parent.find(".delete").addClass("minus_disable").removeClass("minus");	
		}
	});
	
	
	








	//套餐详细介绍里面的 本周菜单效果
	$(".week_vegetable li").each(function(i) {
		
		$(this).hover(
		
		function(){
		$(this).find(".des").show();
		},
		function(){
		$(this).find(".des").hide();
		}
	);

    });
  })
    function initCustomizebox(){
		var url=location.href;
		var productId=paramsUtil(url,"productId");
		var weekCount=paramsUtil(url,"weekCount");
		var item=paramsUtil(url,"item");
		if(null!=productId && ""!=productId){
			$("#choose_cont_leftbox_choose_cont2").hide();
			$("#basicBoxDiv").show();
			if(weekCount<=0){
				weekCount=1;
			}
			$("#basicWeek").val(weekCount);
			addBasicBox(productId,weekCount);
			if(null!=item&&""!=item){
				var products=item.split(",");
				for(var i=0;i<products.length;i++){
					var details=products[i].split("_");
					addBox(details[0],details[2]);
				}
			}
		}
	}
	function paramsUtil(url,name){
			  var params=url.substring(url.indexOf('?')+1,url.length);
			  var arrays=params.split("&");
			  for(var i=0;i<arrays.length;i++){
				var str=arrays[i];
					if(str==null||str==""){
						return "";
					}
				var paramsName=str.substring(0,str.indexOf('='));
				if(paramsName==name){
					return str.substring(str.indexOf('=')+1,params.length)
				}
			  }
			
	  }
	var boxArray=new Array();
	//boxProductId	产品ID
	//boxNumber		每次配送的数量
	//productName	产品名字
	//deliveryCount 每××次配送
	//uomName		单位名称
	//imageUrl		图片路径
	//deliveryType	配送配型	1:每箱送	2:每周送	3:每2周送	4:每3周送	5:每4周送
	function box(boxProductId,boxNumber,amount,productName,deliveryCount,uomName,imageUrl,deliveryType){
		//盒子中产品ID
		this.boxProductId=boxProductId;
		//盒子的产品数量
		this.boxNumber=boxNumber;
		//盒子产品单价
		this.amount=amount;
		//产品名
		this.productName=productName;
		//每××配送的次数
		this.deliveryCount=initDeliveryCount(deliveryType);
		//单位名称
		this.uomName=uomName;
		//图片路径
		this.imageUrl=imageUrl;
		//双配or单配
		var basicFrequency=$("#basicFrequency").val();
		//当前选择的套餐多少周
		var basicWeek=$("#basicWeek").val();
		var totalDelivery=parseFloat(basicFrequency)*parseFloat(basicWeek);
		//按照规则产品配送的总次数
		this.productDeliveryCount=basicDeliveyTotal(this.deliveryCount,totalDelivery);
		//产品配送的总次数+每次多少盒
		this.productDeliveryBoxNumber=parseFloat(this.productDeliveryCount)*parseFloat(this.boxNumber);
		var p=queryProduct(boxProductId,this.productDeliveryBoxNumber);
		this.amount=p.displayProductPromotionPrice;
		//产品小计
		this.amountTotal=parseFloat(amount)*(parseFloat(this.productDeliveryCount)*parseFloat(this.boxNumber));

		this.deliveryType=deliveryType;

	}
	function basicDeliveyTotal(deliveryCount,weekTotal){
			var count=1;
			if(parseInt(deliveryCount)<parseInt(weekTotal)){
				count=parseInt(weekTotal/deliveryCount);
				if(((count*deliveryCount)+1)<=weekTotal){
					count=(count+1);
				}
			}
			return count;
	}
	//根据当前的规则计算每××次送
	function initDeliveryCount(deliveryType){
		var count=1;
		//获取当前的产品是单配还是双配
		var basicFrequency=$("#basicFrequency").val();
		//1:每箱送
		if(deliveryType==0){
			count=1;
		//2:每周送
		}else if(deliveryType==1){
			if(basicFrequency==1){
				count=1;
			}else{
				count=2*1;
			}
		//3:每2周送
		}else if(deliveryType==2){
			if(basicFrequency==1){
				count=2;
			}else{
				count=2*2;
			}
		//4:每3周送
		}else if(deliveryType==3){
			if(basicFrequency==1){
				count=3;
			}else{
				count=3*2;
			}
		//5:每4周送
		}else if(deliveryType==4){
			if(basicFrequency==1){
				count=4;
			}else{
				count=4*2;
			}
		}
		return count;
	}
	//将产品添加到盒子里面
	function addBox(boxProductId,boxNumber,t){
		var basicProductId=$("#basicProductId").val();
		if(basicProductId==undefined){
			alert("请您选择菜箱！");
					$('.choose_cont2').show();                   		
					$('.choose_tit p').text("收起").removeClass("open");  
			return;
		}
		var flag=false;
		var index;
		var len=$("#cycle_list_nolist li").length;
		if(len>=4){
			alert("目前菜箱一次最多添加4类菜品");
			return;
		}
		//boxArray.push(new box(1,boxArray.length,1,100,100,"南瓜"+boxArray.length));
		//判断单次or周期送产品列表是否包含新加入的产品
		for(var i=0;i<boxArray.length;i++){
			var o=boxArray[i];
			if(o.boxProductId==boxProductId){
				flag=true;
				index=i;
				break;
			}
		}
		//如果包含，将数量累加
		if(flag){
			var temp=boxArray[index];
			alert("您当前选择的("+temp.productName+")已加入菜箱");
		}else{
			//已选择的菜箱的位置
			var $endtop=$(".cycle_box .part1 img").offset().top-20;
			var $endleft=$(".cycle_box .part1 img").offset().left-30;
			//原图片的位置
			var $orgtop=$(t).parents("li").find(".boxproimg1").offset().top;
			var $orgleft=$(t).parents("li").find(".boxproimg1").offset().left;
			var $orgwidth=$(t).parents("li").find(".boxproimg1").css("width");
			var $orgheight=$(t).parents("li").find(".boxproimg1").css("height");
			var $orgsrc=$(t).parents("li").find(".boxproimg1").attr("src")
			//alert($orgsrc);
		
			//然后赋值给需要动的图片
			$(".boxproimg2").css({"left":$orgleft,"top":$orgtop,"width":$orgwidth,"height":$orgheight});
			$(".boxproimg2").attr("src",$orgsrc);

			if( !$(".boxproimg2").is(":animated") ){
			$(".boxproimg2").fadeIn("fast");
			$(".boxproimg2").animate({width: "30px" , height :"30px",left: $endleft, top:$endtop }, 600).fadeOut("fast",function(){});
			}
			var basicFrequency=$("#basicFrequency").val();
			var basicWeek=$("#basicWeek").val();
			var product=queryProduct(boxProductId,parseInt(basicFrequency)*parseInt(basicWeek));
			//每次添加真的产品，往里面写每次默认送一盒，每次送一个，每一次都送
			var productBox=new box(product.productId,boxNumber,product.displayProductPromotionPrice,product.productName,1,product.productUom,product.cmsProductImage.imageUrl,1);
			boxArray.push(productBox);
			addWeekDelivery(productBox);
		}
	}
	
	//查询产品明细
	function queryProduct(productId,number){
		var product;
		$.ajax({
				url : 'http://www.tonysfarm.com/product/queryProduct.htm',
				type : 'post',
				data : 'productId='+productId+"&number="+number,
				async : false,
				dataType : "json",
				success : function(data) {
					if(data.result=="0000"){
						product=data.cmsProduct;
					}else{
						alert("找不到该产品相关信息!");
					}
				}
		});
		return product;
	}
	function addBasicBox(pId,addBasicBox){
		var productId=pId;
		var frequency;
		var basicWeek=1;
		if(addBasicBox!=null&&addBasicBox!=""){
			basicWeek=addBasicBox;
		}else{
			basicWeek=$("#productWeek"+pId).val();
		}
		var ids=productId.split(",");
		var productNames="";
		var image="";
		for(var i=0;i<ids.length;i++){
			var product=queryProduct(ids[i],(basicWeek*ids.length));
			if(ids.length==1){
				productNames=productNames+product.productName;
			}else{
				productNames=productNames+product.productName+"+";
			}
			image=product.cmsProductImage.imageUrl;
		}
		frequency=ids.length;
		if(ids.length==2){
			productNames=productNames.substring(0,productNames.length-1);
		}
		var str="";
            str=str+"<div class='part1 leftbox'> <img src='/"+image+"' style='width:120px;height:76' /> </div>";
            str=str+"<div class='part2 leftbox'> "+productNames+" 每周"+frequency+"箱 </div>";
            str=str+"<div class='part3 leftbox'> <a href='javascript:reduceBoxWeekNumber()'><b class='minusDisable'></b></a>";
            str=str+"<input class='box_minicart_num' style='IME-MODE: disabled' type='text' orinum='1' maxlength='2' onchange='onchangeBoxWeekNumber()' id='basicWeek' name='basicWeek' value='"+basicWeek+"' onkeyup='value=value.replace(/[^\\d]/g,1)' onbeforepaste='clipboardData.setData('text',clipboardData.getData('text').replace(/[^\\d]/g,1))' />";
            str=str+"<a href='javascript:addBoxWeekNumber()'><b class='plus'></b></a>周";
			str=str+"</div>";
			str=str+"<input type='hidden' id='basicProductId' name='basicProductId' value='"+productId+"'/>";
			str=str+"<input type='hidden' id='basicFrequency' name='basicFrequency' value='"+frequency+"'/>";
		$("#basicBoxDiv").html(str);
		countWeekProductAmount();
	}


	function removeBasicBox(){
		$("#basicBoxDiv").empty();
		$("#cycle_list_nolist").empty();
		boxArray=new Array();
		$("#boxProductDesc").html("");
		$("#weekDeliveryTotalAmount").html("0");
		$("#weeks_table").empty();
		$('.weeks_table_warp').hide();                   		
		$('#show_weeks').text("展开周配送情况");    
	}	

	function addBoxDeliveryWeekNumber(productId){
		var boxDeliveryWeekNumber=$("#boxDeliveryWeekNumber"+productId).val();
		if(parseInt(boxDeliveryWeekNumber)<9){
			$("#boxDeliveryWeekNumber"+productId).val(parseInt(boxDeliveryWeekNumber)+1);
			updateWeekDelivery(productId);
		}
	}
	function onchangeBoxDeliveryWeekNumber(productId){
		var boxDeliveryWeekNumber=$("#boxDeliveryWeekNumber"+productId).val();
		updateWeekDelivery(productId);
	}
	function reduceBoxDeliveryWeekNumber(productId){
		var boxDeliveryWeekNumber=$("#boxDeliveryWeekNumber"+productId).val();
		if(parseInt(boxDeliveryWeekNumber)>1){
			$("#boxDeliveryWeekNumber"+productId).val(parseInt(boxDeliveryWeekNumber)-1);
			updateWeekDelivery(productId);
		}
	}
	//修改周配的某个属性
	function updateWeekDelivery(productId){
		var flag=false;
		var index;
		for(var i=0;i<boxArray.length;i++){
			var o=boxArray[i];
			if(o.boxProductId==productId){
				index=i;
				flag=true;
				break;
			}
		}
		if(!flag){
			return;
		}
		var weekType=$("#weekType"+productId).val();
		var boxDeliveryWeekNumber=$("#boxDeliveryWeekNumber"+productId).val();
		var t=boxArray[index];
		//function box(boxType,boxProductId,boxNumber,amount,productName,deliveryCount,uomName,imageUrl){
		//var product p=queryProduct(t.boxProductId,boxDeliveryWeekNumber);
		var temp=new box(t.boxProductId,boxDeliveryWeekNumber,t.amount,t.productName,t.deliveryCount,t.uomName,t.imageUrl,weekType);
		boxArray[index]=temp;
		updateViewWeekDelivery(temp);
		countWeekProductAmount();
	}
	//添加周期送
	function addWeekDelivery(b){
		var len=$("#cycle_list_nolist li").length;
		if(len>=4){
			alert("目前菜箱一次最多添加4类菜品");
			return;
		}

			var productDesc="<li id='weekProductDiv"+b.boxProductId+"'>";
                productDesc=productDesc+"<div class='item'> <a href='javascript:removeWeek("+b.boxProductId+")' class='del' title='删除'> </a>";
                productDesc=productDesc+"    <div class='pro pro3 leftbox'>";
                productDesc=productDesc+"      <div class='part1 leftbox'><img src='/"+b.imageUrl+"'  style='width:120px;height:76px' /> </div>";
                productDesc=productDesc+"      <div class='part2 leftbox'>"+b.productName+"</div>";
                productDesc=productDesc+"      <div class='part3 leftbox'>";
                productDesc=productDesc+"        <select name='' class='part3_1'  id='weekType"+b.boxProductId+"'  onchange='changeDeliveryType("+b.boxProductId+")'>";
                productDesc=productDesc+"          <option value='0'>每次</option>";
                productDesc=productDesc+"          <option value='1'>每1周</option>";
				productDesc=productDesc+"          <option value='2'>每2周</option>";
				productDesc=productDesc+"          <option value='3'>每3周</option>";
				productDesc=productDesc+"          <option value='4'>每4周</option>";
                productDesc=productDesc+"        </select>";
                productDesc=productDesc+"        <span class='part3_2'>送</span>";
                productDesc=productDesc+"        <div class='part3_3'>";
                productDesc=productDesc+"          <input name='boxDeliveryWeekNumber"+b.boxProductId+"' onchange='onchangeBoxDeliveryWeekNumber("+b.boxProductId+")' id='boxDeliveryWeekNumber"+b.boxProductId+"' type='text'  style='IME-MODE: disabled' class='numborder' maxlength='1' value='"+b.boxNumber+"' />";
                productDesc=productDesc+"          <div class='numbtn'>";
                productDesc=productDesc+"            <p><a href='javascript:addBoxDeliveryWeekNumber("+b.boxProductId+")'><img src='/images/btn-reduce.jpg' width='16' height='11' /></a></p>";
                productDesc=productDesc+"            <p><a href='javascript:reduceBoxDeliveryWeekNumber("+b.boxProductId+")'><img src='/images/btn-add.jpg' width='16' height='11' /></a></p>";
                productDesc=productDesc+"          </div>";
                productDesc=productDesc+"        </div>";
                productDesc=productDesc+"        <span class='part3_4'>"+b.uomName+"</span> </div>";
                productDesc=productDesc+"    </div>";
                productDesc=productDesc+"  </div>";
                productDesc=productDesc+"</li>";
			$("#cycle_list_nolist").append(productDesc);
			$('.pro3').show()
		countWeekProductAmount();
	}
	function updateViewWeekDelivery(b){
			var productDesc="";
                productDesc=productDesc+"<div class='item'> <a href='javascript:removeWeek("+b.boxProductId+")' class='del' title='删除'> </a>";
                productDesc=productDesc+"    <div class='pro pro3 leftbox'>";
                productDesc=productDesc+"      <div class='part1 leftbox'><img src='/"+b.imageUrl+"' width='120' height='76' /> </div>";
                productDesc=productDesc+"      <div class='part2 leftbox'>"+b.productName+"</div>";
                productDesc=productDesc+"      <div class='part3 leftbox'>";
                productDesc=productDesc+"        <select name='' class='part3_1'  id='weekType"+b.boxProductId+"'  onchange='changeDeliveryType("+b.boxProductId+")'>";
                productDesc=productDesc+"          <option value='0'>每次</option>";
                productDesc=productDesc+"          <option value='1'>每1周</option>";
				productDesc=productDesc+"          <option value='2'>每2周</option>";
				productDesc=productDesc+"          <option value='3'>每3周</option>";
				productDesc=productDesc+"          <option value='4'>每4周</option>";
                productDesc=productDesc+"        </select>";
                productDesc=productDesc+"        <span class='part3_2'>送</span>";
                productDesc=productDesc+"        <div class='part3_3'>";
                productDesc=productDesc+"          <input name='boxDeliveryWeekNumber"+b.boxProductId+"' onchange='onchangeBoxDeliveryWeekNumber("+b.boxProductId+")' id='boxDeliveryWeekNumber"+b.boxProductId+"' type='text' class='numborder' maxlength='1' value='"+b.boxNumber+"' />";
                productDesc=productDesc+"          <div class='numbtn'>";
                productDesc=productDesc+"            <p><a href='javascript:addBoxDeliveryWeekNumber("+b.boxProductId+")'><img src='/images/btn-reduce.jpg' width='16' height='11' /></a></p>";
                productDesc=productDesc+"            <p><a href='javascript:reduceBoxDeliveryWeekNumber("+b.boxProductId+")'><img src='/images/btn-add.jpg' width='16' height='11' /></a></p>";
                productDesc=productDesc+"          </div>";
                productDesc=productDesc+"        </div>";
                productDesc=productDesc+"        <span class='part3_4'>"+b.uomName+"</span> </div>";
                productDesc=productDesc+"    </div>";
                productDesc=productDesc+"  </div>";
			$("#weekProductDiv"+b.boxProductId).html(productDesc);
			$("#weekType"+b.boxProductId+" option[value='"+b.deliveryType+"']").attr("selected","true")
		countWeekProductAmount();
	}
	//查询产品明细
	function countWeekProductAmount(){
		var basicFrequency=$("#basicFrequency").val();
		var basicWeek=$("#basicWeek").val();
		var basicProductId=$("#basicProductId").val();
		var boxProductDesc="";
		var totalAmount=0;
		if(parseInt(basicFrequency)==1){
			var product=queryProduct(basicProductId,parseFloat(basicFrequency)*parseFloat(basicWeek));
			totalAmount=parseFloat(basicFrequency)*parseFloat(basicWeek)*parseFloat(product.displayProductPromotionPrice);
			boxProductDesc=parseFloat(basicFrequency)*parseFloat(basicWeek)+"菜箱+";
			if(null!=boxArray&&boxArray.length>0){
				for(var i=0;i<boxArray.length;i++){
						var o=boxArray[i];
						var weekTypeValue=$("#weekType"+o.boxProductId).val();
						var boxDeliveryWeekNumberValue=$("#boxDeliveryWeekNumber"+o.boxProductId).val();
						var temp=new box(o.boxProductId,boxDeliveryWeekNumberValue,o.amount,o.productName,o.deliveryCount,o.uomName,o.imageUrl,weekTypeValue);
						boxArray[i]=temp;
						totalAmount=totalAmount+temp.amountTotal;
						boxProductDesc=boxProductDesc+""+temp.productName+""+temp.productDeliveryBoxNumber+""+temp.uomName+"+";
				}
			}else{
				boxProductDesc=boxProductDesc+"";
			}
			if(boxProductDesc.length>1){
				boxProductDesc=boxProductDesc.substring(0,boxProductDesc.length-1);
			}
		}else{
			var ids=basicProductId.split(",");
			for(var i=0;i<ids.length;i++){
				var product=queryProduct(ids[i],parseFloat(basicFrequency)*parseFloat(basicWeek));
				totalAmount=totalAmount+parseFloat(basicWeek)*parseFloat(product.displayProductPromotionPrice);
			}
				boxProductDesc=parseFloat(basicFrequency)*parseFloat(basicWeek)+"菜箱+";
				if(null!=boxArray&&boxArray.length>0){
					for(var i=0;i<boxArray.length;i++){
						var o=boxArray[i];
						var weekTypeValue=$("#weekType"+o.boxProductId).val();
						var boxDeliveryWeekNumberValue=$("#boxDeliveryWeekNumber"+o.boxProductId).val();
						var temp=new box(o.boxProductId,boxDeliveryWeekNumberValue,o.amount,o.productName,o.deliveryCount,o.uomName,o.imageUrl,weekTypeValue);
						boxArray[i]=temp;
						totalAmount=totalAmount+temp.amountTotal;
						boxProductDesc=boxProductDesc+""+temp.productName+""+temp.productDeliveryBoxNumber+""+temp.uomName+"+";
					}
				}else{
					boxProductDesc=boxProductDesc+"";
				}
				if(boxProductDesc.length>1){
					boxProductDesc=boxProductDesc.substring(0,boxProductDesc.length-1);
				}
		}
		$("#boxProductDesc").html(boxProductDesc);
		$("#weekDeliveryTotalAmount").html(totalAmount.toFixed(0));
		bindWeeksTable();
	}
	//生成周期送table
	function bindWeeksTable(){
		$("#weeks_table").empty();
		var basicFrequency=$("#basicFrequency").val();
		var basicWeek=$("#basicWeek").val();
		var totalDeliveryWeek=basicWeek;
		var str="";
		var weekShow=1;
		var count=0;
		for(var i=0;i<totalDeliveryWeek;i++){
			var week=i+1;
			if(parseInt(basicFrequency)==1){
				 count=i+1;
				 if(i==0){
					str=str+" <tr>";
					str=str+"   <td><table width='100%' border='0' cellspacing='0' cellpadding='0' >";
					str=str+"       <tr>";
					str=str+"         <td width='43' class='bg'>第"+week+"周</td>";
					str=str+"         <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					str=str+"             <tr>";
					str=str+"               <td width='79' class='bg'>第"+(i+1)+"个菜箱</td>";
										if(boxArray[0]!=undefined&&boxArray[0]!="undefined"){
											 var o=boxArray[0];
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[1]!=undefined&&boxArray[1]!="undefined"){
											 var o=boxArray[1];
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[2]!=undefined&&boxArray[2]!="undefined"){
											 var o=boxArray[2];
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[3]!=undefined&&boxArray[3]!="undefined"){
											 var o=boxArray[3];
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
										}else{
					str=str+"					<td width='173'></td>";
										}
					str=str+"             </tr>";
					str=str+"           </table></td>";
					str=str+"       </tr>";
					str=str+"     </table></td>";
					str=str+" </tr>";
				 }else{
					str=str+" <tr>";
					str=str+"   <td><table width='100%' border='0' cellspacing='0' cellpadding='0' >";
					str=str+"       <tr>";
					str=str+"         <td width='43' class='bg'>第"+week+"周</td>";
					str=str+"         <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					str=str+"             <tr>";
					str=str+"               <td width='79' class='bg'>第"+count+"个菜箱</td>";
										if(boxArray[0]!=undefined&&boxArray[0]!="undefined"){
											 var o=boxArray[0];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[1]!=undefined&&boxArray[1]!="undefined"){
											 var o=boxArray[1];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[2]!=undefined&&boxArray[2]!="undefined"){
											 var o=boxArray[2];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[3]!=undefined&&boxArray[3]!="undefined"){
											 var o=boxArray[3];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
					str=str+"             </tr>";
					str=str+"           </table></td>";
					str=str+"       </tr>";
					str=str+"     </table></td>";
					str=str+" </tr>";
				 }
			}else{
				 if(i==0){
					count=(count+1);
					str=str+" <tr>";
					str=str+"   <td><table width='100%' border='0' cellspacing='0' cellpadding='0' >";
					str=str+"       <tr>";
					str=str+"         <td width='43' class='bg'>第"+week+"周</td>";
					str=str+"         <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					str=str+"             <tr>";
					str=str+"               <td width='79' class='bg'>第"+count+"个菜箱</td>";
										if(boxArray[0]!=undefined&&boxArray[0]!="undefined"){
											 var o=boxArray[0];
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[1]!=undefined&&boxArray[1]!="undefined"){
											 var o=boxArray[1];
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[2]!=undefined&&boxArray[2]!="undefined"){
											 var o=boxArray[2];
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[3]!=undefined&&boxArray[3]!="undefined"){
											 var o=boxArray[3];
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
										}else{
					str=str+"					<td width='173'></td>";
										}
					str=str+"             </tr>";

					count=(count+1);

					str=str+"             <tr>";
					str=str+"               <td class='bg'>第"+count+"个菜箱</td>";
										if(boxArray[0]!=undefined&&boxArray[0]!="undefined"){
											 var o=boxArray[0];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[1]!=undefined&&boxArray[1]!="undefined"){
											 var o=boxArray[1];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[2]!=undefined&&boxArray[2]!="undefined"){
											 var o=boxArray[2];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[3]!=undefined&&boxArray[3]!="undefined"){
											 var o=boxArray[3];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
					str=str+"             </tr>";
					str=str+"           </table></td>";
					str=str+"       </tr>";
					str=str+"     </table></td>";
					str=str+" </tr>";
				 }else{
					count=(count+1);

					str=str+" <tr>";
					str=str+"   <td><table width='100%' border='0' cellspacing='0' cellpadding='0' >";
					str=str+"       <tr>";
					str=str+"         <td width='43' class='bg'>第"+week+"周</td>";
					str=str+"         <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					str=str+"             <tr>";
					str=str+"               <td width='79' class='bg'>第"+count+"个菜箱</td>";
										if(boxArray[0]!=undefined&&boxArray[0]!="undefined"){
											 var o=boxArray[0];
											if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[1]!=undefined&&boxArray[1]!="undefined"){
											 var o=boxArray[1];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[2]!=undefined&&boxArray[2]!="undefined"){
											 var o=boxArray[2];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[3]!=undefined&&boxArray[3]!="undefined"){
											 var o=boxArray[3];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
					str=str+"             </tr>";

					count=(count+1);

					str=str+"             <tr>";
					str=str+"               <td class='bg'>第"+count+"个菜箱</td>";
										if(boxArray[0]!=undefined&&boxArray[0]!="undefined"){
											 var o=boxArray[0];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[1]!=undefined&&boxArray[1]!="undefined"){
											 var o=boxArray[1];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[2]!=undefined&&boxArray[2]!="undefined"){
											 var o=boxArray[2];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
										if(boxArray[3]!=undefined&&boxArray[3]!="undefined"){
											 var o=boxArray[3];
											 if(parseInt((count-1)%o.deliveryCount)==0){
					str=str+"							<td width='173'>"+o.boxNumber+""+o.uomName+"</td>";
											}else{
					str=str+"							<td width='173'></td>";
											}
										}else{
					str=str+"					<td width='173'></td>";
										}
					str=str+"             </tr>";
					str=str+"           </table></td>";
					str=str+"       </tr>";
					str=str+"     </table></td>";
					str=str+" </tr>";
				 }
			}
		}
		$("#weeks_table").html(str);
	}
	//改变配送类型时触发
	function changeDeliveryType(productId){
		updateWeekDelivery(productId);
	}
	
	function addBoxWeekNumber(){
		var basicWeek=$("#basicWeek").val();
		if(parseInt(basicWeek)<200){
			$("#basicWeek").val(parseInt(basicWeek)+1);
		}
		countWeekProductAmount();
	}
	function reduceBoxWeekNumber(){
		var basicWeek=$("#basicWeek").val();
		if(parseInt(basicWeek)>1){
			$("#basicWeek").val(parseInt(basicWeek)-1);
		}
		countWeekProductAmount();
	}
	
	function onchangeBoxWeekNumber(){
		var basicWeek=$("#basicWeek").val();
		$("#basicWeek").val(parseInt(basicWeek));
		countWeekProductAmount();
	}

	function removeWeek(id){
		var flag=false;
		var index=0;
		for(var i=0;i<boxArray.length;i++){
			var o=boxArray[i];
			if(o.boxProductId==id){
				flag=true;
				index=i;
				break;
			}
		}
		if(flag){
			boxArray.splice(index,1);
		}
		$("#weekProductDiv"+id).remove();
		countWeekProductAmount();
	}
	function togoInitOrderWeek(){
		if(!checkLogin()){
			return;
		}
		var basicProductId=$("#basicProductId").val();
		if(basicProductId==undefined){
			alert("请您选择你的菜箱！");
			return;
		}
		//var product=queryProduct(basicProductId);
		var basicFrequency=$("#basicFrequency").val();
		var basicWeek=$("#basicWeek").val();
		var params="&continueNumber="+basicWeek+"&productId="+basicProductId+"&item=";
		var itemParams="";
		for(var i=0;i<boxArray.length;i++){
			var o=boxArray[i];
				//ProductId产品ID，deliveryCount每××次送，boxNumber每次送多少，productDeliveryBoxNumber，根据规则配送总数
				itemParams=itemParams+""+o.boxProductId+"_"+o.deliveryCount+"_"+o.boxNumber+"_"+o.productDeliveryBoxNumber+"_"+o.deliveryType+",";

		}
		if(itemParams.length>0){
			itemParams=itemParams.substring(0,itemParams.length-1);
		}
		params=params+itemParams
		window.location="http://www.tonysfarm.com/order/boxconfirm.html?"+params;
	}





  
//查看支持的卡片类型 弹窗
var $stipwin=function(id){return document.getElementById(id);}
function StipWin(){
 var win=new WinSize2();
 var StipWin=$stipwin("stipbg");
 StipWin.style.width=win.W+"px";
 StipWin.style.height=win.H+"px";
 if(StipWin.style.display=="block"){
  StipWin.style.display="none";
  $stipwin("stipwin").style.display="none";
  }else{
    StipWin.style.display="block";
    $stipwin("stipwin").style.display="block";
   }
 }



//地区选择
var $m = function(id) {
	return document.getElementById(id);
}
function CommentWinTip() {
	var win = new WinSize2();
	var commentTip = $m("commentbg");
	commentTip.style.width = win.W + "px";
	commentTip.style.height = win.H + "px";
	if (commentTip.style.display == "block") {
		commentTip.style.display = "none";
		$m("commentwin").style.display = "none";
	} else {
		commentTip.style.display = "block";
		$m("commentwin").style.display = "block";
	}
}






