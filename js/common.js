// JavaScript Document

$(function(){
	
	$('head').append(
		'<style type="text/css">#contents,#pjaxContent > section { display: none; }</style>'
	);
	
	
	jQuery.event.add(window,"load",function() { // 全ての読み込み完了後に呼ばれる関数
	
	$("#contents").css("display", "block");
	$("#pjaxContent > section").css("display", "block");
	
	pjaxComplete();
		
		/*--------ピージャックス【.pjax】--------*/
		$(function(){
			$.pjax({
				area : '#pjaxContent',// 置き換えるコンテナのID カンマで区切って複数可能
				link : '.pjax:not([target])',// pjaxを行うリンクを限定（ない場合全てのリンクが対象）
				ajax: { timeout: 30000 }, // 読み込みにこれ以上かかる場合は通常遷移に移行
				wait : 1200 // エフェクト分待ち時間を作る
			});
			
			//スマートデバイス判別処理
			if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
				$(document).bind('pjax:fetch', function(){
					$('body').css('overflow-y', 'scroll');
					$('#pjaxContent').attr({'class': 'pjaxFadeOut'});
				});
				$(document).bind('pjax:render', function(){
					$('#pjaxContent').attr({'class': 'pjaxFadeIn'});
					$('body').css('overflow-y', 'scroll');
					pjaxComplete();
				});
			}
			
			else {
				
				$(document).bind('pjax:fetch', function(){
					$('body').css('overflow-y', 'scroll');
					$('#pjaxContent').attr({'class': 'pjaxBgColourOut'});
				});
				$(document).bind('pjax:render', function(){
					$('#pjaxContent').attr({'class': 'pjaxBgColourIn'});
					$('body').css('overflow-y', 'scroll');
					
					$('head').append(
					'<style type="text/css">#contents,#pjaxContent > section { display: none; }</style>'
				);
					
					pjaxComplete();
				});
			}
			
			
		});
		
	});
	
});


function pjaxComplete(){
	
	/*--------イントロ--------*/
	$(function() {
		
		if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
			
			if($("pjaxFadeIn").size()){//.pjaxBgColourInクラスがある場合のみ
			}else{
				$("body").addClass("pjaxFadeIn");
				$('body').css('overflow-y', 'scroll');
			}
			
		}else{
			if($("pjaxBgColourIn").size()){//.pjaxBgColourInクラスがある場合のみ
			}else{
				$("body").addClass("pjaxBgColourIn");
				$('body').css('overflow-y', 'scroll');
			}
		}
	});
	
	int();
}

function int(){
	
	/*--------スクロールイージング--------*/ 
	// Mac(iPhone ipad 除外)
	var ua = navigator.userAgent.toLowerCase();
	var isMac = ((ua.indexOf('mac') > -1) && (ua.indexOf('os') > -1)) && !((ua.indexOf('iphone') > -1) || (ua.indexOf('ipad') > -1) || (ua.indexOf('windows') > -1));
	 
	if(isMac) {
	}else{
		
		$(function(){
			scrLength = 230;
			scrSpeed = 460;
			scrEasing = 'easeOutCirc';
		 
			var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
			$(document).on(mousewheelevent,function(e){
				e.preventDefault();
				var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
				if (delta < 0){
					scrSet =  $(document).scrollTop()+scrLength;
				} else {
					scrSet =  $(document).scrollTop()-scrLength;
				}
				$('html,body').stop().animate({scrollTop:scrSet},scrSpeed,scrEasing);
				return false;
			});
		});
	}

	
	/*--------ナビアイコン（ハンバーガーメニュー）【.n_hamburger】--------*/
	$(function(){	
		$('.nav_icon a').on('click touchend', function() {
			$('.globalNavigation-module-01').toggleClass("active");
			$('.n_hamburger').toggleClass('active');
			$('.n_hamburger').removeClass("hover");
			return false;
		});
		
		$('.nav_icon a').on({'mouseenter touchstart': function() {// マウスオーバー時の処理	
			if($('.n_hamburger').hasClass("active")){}else{ $('.n_hamburger').addClass("hover"); }
			return false;
		  },
		  'mouseleave touchend': function() {// マウスアウト時の処理
			$('.n_hamburger').removeClass("hover");
			return false;
		  }
		});
	});
	
	/*--------ホバーアニメ【.border_anm01】--------*/
	$(function(){	
		$('.border_anm01 a').on({'mouseenter touchstart': function() {// マウスオーバー時の処理	
			$('.border_anm01').addClass("hover");
			return false;
		  },
		  'mouseleave touchend': function() {// マウスアウト時の処理
			$('.border_anm01').removeClass("hover");
			return false;
		  }
		});
	});
	
	
	
	/*--------スムーススクロール【smoothScroll】--------*/
	$(function() {
		smoothScroll.init({
			selector: '[data-scroll]',				// スムーススクロールが有効なリンクに付ける属性
			selectorHeader: '[data-scroll-header]',		// 固定ナビに付ける属性
			speed: 600,						// 到達するまでの総時間(ミリ秒)
			easing: 'easeInOutCubic',			// スピードの種類
			offset: -10,							// 到達場所からズラすピクセル数
			updateURL: true,					// URLを[#〜]に変更するか？
			callback: function () {}				// コールバック関数 (到達時に実行される関数)
		}) ;
	
	});
	
	/*--------ドロップダウンメニュー【.dropdown】--------*/
	$(function(){	
		$('.dropdown_btn a').on('click touchend', function() {
			$(".slide-toggle .dropdown_body").slideToggle([1000]);
			return false;
		});
		
		$('.dropdown_body a').on('click touchend', function() {// ナビクリック時の処理			
			$(".slide-toggle .dropdown_body").slideUp();
			$('.n_hamburger').removeClass('active');
		});
	});
	
	/*--------スクロールメニュー制御--------*/
	$(function(){	
	
		var scrollMenu = ".menu-scroll";
		var menuHeight = $(scrollMenu).height();
		var menuSpeed = 100;
		var startPos = 0;
		$(window).scroll(function(){
		  var currentPos = $(this).scrollTop();
		  if (currentPos > startPos) {
			if($(window).scrollTop() >= 0) {
				
				$(scrollMenu).removeClass("menu_active");
				$(scrollMenu).removeClass("click_active");

			}
		  } else if($(window).scrollTop() >= 600) {

			  
			  if(!($(".click_active").size())){//.click_activeクラスがない場合のみ
				 $(scrollMenu).addClass("menu_active");
			  }	
			 
		  }
		  startPos = currentPos;
		});
		
		$('.menu-scroll .Navigation a').on('click touchend', function() {
			
			if(!($("a.pjax").size())){//.click_activeクラスがない場合のみ
				$(scrollMenu).stop().animate({"opacity":0},menuSpeed,function(){
					$(scrollMenu).removeClass("menu_active");
					$(scrollMenu).addClass("click_active");
					$(scrollMenu).css("opacity","1");
				});s
				
			}	
		});
		
		
	
	});
	
	
	/*--------ホバーアニメ--------*/
	$(function(){
		
		$('.future-module').on({'mouseenter touchstart': function() {// マウスオーバー時の処理	
			$(this).addClass("active");
		  },
		  'mouseleave touchend': function() {// マウスアウト時の処理
			$(this).removeClass("active");
			
		  }
		});
		
		$('.about-module').on({'mouseenter touchstart': function() {// マウスオーバー時の処理	
			$(this).addClass("active");

		  },
		  'mouseleave touchend': function() {// マウスアウト時の処理
			$(this).removeClass("active");
			
		  }
		});
		
		$('.detail-module-03').on({'mouseenter touchstart': function() {// マウスオーバー時の処理	
			$(this).addClass("active");

		  },
		  'mouseleave touchend': function() {// マウスアウト時の処理
			$(this).removeClass("active");
			
		  }
		});
		
		$('.works-module .thumbnail .anmation_container').on({'mouseenter touchstart': function() {// マウスオーバー時の処理	
			$(this).addClass("active");
			
		  },
		  'mouseleave touchend': function() {// マウスアウト時の処理
			$(this).removeClass("active");
			
		  }
		});
	});

	/*--------インビュー【inView】--------*/	
	$(function() {
		
		$('.performance.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//要素が見えたとき		
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					$(this).addClass("active");
				}else if (visiblePartY == 'top'){//要素の上が表示域に入ってるとき
					$(this).addClass("active");
				}else if (visiblePartY == 'bottom'){//要素の下が表示域に入ってるとき
					$(this).addClass("active");
				}
			}
		});
		
		$('.performance.efc-bgColour').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//要素が見えたとき		
				
				effect_wrp='.performance.efc-bgColour .effect_wrp';
				effect_box='.performance.efc-bgColour .effect_box';
				
				
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					if(!($(effect_wrp).size())){//.effect_wrpクラスがない場合のみ
						efcStart();
						$(this).addClass('active');
					}			
				}else if (visiblePartY == 'top'){//要素の上が表示域に入ってるとき
					if(!($(effect_wrp).size())){//.effect_wrpクラスがない場合のみ
						efcStart();
						$(this).addClass('active');
					}
				}else if (visiblePartY == 'bottom'){//要素の下が表示域に入ってるとき
					if(!($(effect_wrp).size())){//.effect_wrpクラスがない場合のみ
						efcStart();
						$(this).addClass('active');
					}
				}
			}else{
				if($(effect_wrp).size()){//.effect_wrpクラスがある場合のみ
					efcEnd();
					$(this).removeClass("active");
				}
			}
			function efcStart(){
				/*指定タグの上位にタグを追加*/
				$(effect_box).wrap('<div class="effect_wrp" />');
				$(effect_wrp).wrap('<div class="effect_container" />');
			}
			function efcEnd(){
				/*指定タグの上位のタグを削除*/
				$(effect_wrp).unwrap();
				$(effect_box).unwrap();
			}
		});
		
		$('.firstview-module .efc-bgColour').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//要素が見えたとき
			
			firstview_effect_wrp='.firstview-module .effect_wrp';
			firstview_effect_box='.firstview-module .effect_box';
						
				if(!($(".view_active").size())){//.view_activeクラスがない場合のみ
					if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
						if(!($(firstview_effect_wrp).size())){//.effect_wrpクラスがない場合のみ
							efcStart();
							$(this).addClass('active');
							$(this).addClass('view_active');
						}			
					}else if(visiblePartY == 'top'){
						efcStart();
							$(this).addClass('active');
							$(this).addClass('view_active');
					}			
				}					
				
			}
			
			function efcStart(){
			/*指定タグの上位にタグを追加*/
			$(firstview_effect_box).wrap('<div class="effect_wrp" />');
			$(firstview_effect_wrp).wrap('<div class="effect_container" />');
			}
			function efcEnd(){
				/*指定タグの上位のタグを削除*/
				$(firstview_effect_wrp).unwrap();
				$(firstview_effect_box).unwrap();
			}
		});
		
		
		$('.award-module .efc-bgColour').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//要素が見えたとき
			
			award_effect_wrp='.award-module .effect_wrp';
			award_effect_box='.award-module .effect_box';
						
				if(!($(".award_active").size())){//.view_activeクラスがない場合のみ
					if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
						if(!($(award_effect_wrp).size())){//.effect_wrpクラスがない場合のみ
							efcStart();
							$(this).addClass('active');
							$(this).addClass('award_active');
						}			
					}else if(visiblePartY == 'top'){
						efcStart();
							$(this).addClass('active');
							$(this).addClass('award_active');
					}			
				}					
				
			}
			
			function efcStart(){
			/*指定タグの上位にタグを追加*/
			$(award_effect_box).wrap('<div class="effect_wrp" />');
			$(award_effect_wrp).wrap('<div class="effect_container" />');
			}
			function efcEnd(){
				/*指定タグの上位のタグを削除*/
				$(award_effect_wrp).unwrap();
				$(award_effect_box).unwrap();
			}
		});

		
		$('.separate_anm-extend.anmation_container').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {//要素が見えたとき		
				if (visiblePartY == 'both'){//要素の上下両方が表示域に入ってるとき
					$(this).addClass("active");
				}
			}
		});
	});
	
	
	/*============= 【スライダーflexslider】 ============*/
	$(function(){
		about_slider();
	});
	
	//リサイズ時の処理を定義
	(function () {
	  var timer = 0;
	 
	  window.onresize = function () {
		if (timer > 0) {
		  clearTimeout(timer);
		}
	 
		timer = setTimeout(function () {
		  about_slider(); //ここに処理の内容が入る
		}, 200);
	  };
	}());
	
	function about_slider() {
		$('.about-module .flexslider').flexslider({
		animation: "slide", //fade or slide
		easing:"easeOutExpo",//デフォルトは"swing"
		animationLoop: true, //スライドをループ,
		slideshow:false,//“true”で自動スライドショーになる
		//slideshowSpeed:5000, //スライドする間隔のスピード
		animationSpeed:600, //アニメーション時の動作のスピード
		//initDelay:4000,//スライドショーが始まるまでの遅延。デフォルトは0で、ミリ秒単位で指定できます。
		//itemWidth: 300, //カルーセルを設定した際の画像１枚の幅
		//itemMargin: 30, //カルーセルの画像１枚のマージン
		//minItems: 1, //カルーセルの画像を最低で何枚を一画面に表示するか
		//maxItems: 1, //カルーセルの画像を最大で何枚を一画面に表示するか
		//smoothHeight:true, //スライダーの高さが変わるとき、高さをアニメーションしながら変える
		//randomize:true, //スライドの順番をランダムにする
		pasneOnHover:true, //マウスオーバーでスライドショーを止める
		//video:false,動画をスライドに含むことを許可するかどうか。デフォルトはfalseです。
		controlNav:true,//ナヴィゲーションを表示。デフォルトはtrueで、falseにすると非表示になります。
		directionNav:true,//両サイドにあるprevとnextのコントロールボタン。デフォルトはtrueで、falseにすると非表示になります。
		move:1,//カルーセルの画像をスライドで何枚動かすか。0だと全部動かす。デフォルトは0です。
		prevText:"",//「戻る」のナビゲーションの文字列。デフォルトは"Previous"です。
		nextText:"",//「進む」のナビゲーションの文字列。デフォルトは"Next"です。
		touch:true
		
	  });
	}

	
	
}








