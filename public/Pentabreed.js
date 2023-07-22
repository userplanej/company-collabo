var page = {

	gnb : {
		onLoad : function(){
					
			// 전체메뉴 버튼 클릭 이벤트
			var $btnMenu = $('#header .btn_menu');
			var $whitePenta = $('#menu_all .white_penta');

			$btnMenu.stop().on('mouseenter', function(){
				if($(this).css('opacity') == 1) {
					// $('html,body').css('overflow','hidden');
					$("#menu_all .white_penta").delay(650).queue(function(next) {
						$whitePenta.addClass('hover');
						next();
					});
					$('#menu_all .white_penta').hover(function(){
						if($(this).hasClass('hover')){
							$(this).css({transform : 'scale(1.168)',transition:'all 0.5s ease-in-out'});
						}
					},function(){
						if($(this).hasClass('hover')){
							$(this).css({transform : 'scale(1)',transition:'all 0.5s ease-in-out'});
						}
					});
					$btnMenu.addClass('off').removeClass('on');
					$btnMenu.attr('disabled',true);
					$('.main_cursor').removeClass('link');
					$('.wrap_header .top_bg').css('transition','0s').delay(150).fadeOut(300);
					$('#menu_all').show(100, function(){
						$('#menu_all .menu_all_bg').stop().fadeIn(300, function(){
							$('#header').removeClass('main_header');
						});
						$whitePenta.addClass('on');
						$whitePenta.css({top:'50%',transform:'scale(1)'});
					});
					$('#menu_all .btn_close,#menu_all .util').delay(300).fadeIn(700);
				}
			});
			$('#menu_all .btn_close,#menu_all .menu_all_bg').on('click',function(){
				var check_main = $('body').find('.mainPage').length;
				
				$whitePenta.removeClass('hover');
				$whitePenta.removeClass('on');
				// $('html,body').css('overflow','inherit');
				$btnMenu.removeClass('off').addClass('on');
				$btnMenu.attr('disabled',false);
				$('.wrap_header .top_bg').css('transition','0s').delay(800).fadeIn(300);
				$('#menu_all .menu_all_bg').delay(800).fadeOut(300, function(){
					$('#menu_all').hide();
				});
				// $('#menu_all .btn_close,#menu_all .util').delay(300).fadeOut(700);
				$('#menu_all .util').delay(300).fadeOut(700);
				$('#menu_all .btn_close').fadeOut(300);

				if($btnMenu.width() == 60) {
					$whitePenta.css({top:'-111px',transform:'scale(0.168)'});
				}
				else {
					$whitePenta.css({top:'-148px',transform:'scale(0.09)'});
				}
				console.log(check_main);
				
				if (check_main >= 1) {
					$('#header').addClass('main_header');
				}
			});

			$('.wrap_header .logo').off('click').on('click',function(){
				$('.wrap_header').removeClass('on');
			})
		},
	},

	header : {
		scrollHead : function(){
			if($(window).scrollTop()>0){
				$('.wrap_header').addClass('on');
			}
			else {
				$('.wrap_header').removeClass('on');
			}
		},
		logoImgOver : function(ind){
			$('.hover_img .hover_box').removeClass('on').eq(ind).addClass('on');
			$('.main_cursor').addClass('link');
		},
		logoImgOut : function(){
			$('.hover_img .hover_box').removeClass('on');
			$('.main_cursor').removeClass('link');
		}
	},

	// footer : {
	// 	familySite : function(){

	// 		$('.familySite').find('.btn_family').on('click',function(){
	// 			$(this).toggleClass('on');
	// 			$(this).siblings('.list').stop().slideToggle(400);
	// 		});
	// 	}
	// },

	main : {
		onLoad : function(){
			//메인 슬라이드
			var mainSwiper = new Swiper('.mainSwiper', {
				simulateTouch: false,
				speed : 1100,
				parallax: true,
				loop: true,
				// loopAdditionalSlides: 4,
				autoplay: {
					delay: 7000,
					disableOnInteraction: false,
				},
				
				navigation: {
					nextEl: '.mainSwiper .swiper-button-next',
					prevEl: '.mainSwiper .swiper-button-prev',
				},
				pagination: {
					el: ".swiper-pagination",
					type: "fraction",
				},

				on: {
					init: function () {
						var currentVideo =  $("[data-swiper-slide-index=" + this.realIndex + "]").find("video");
						var cursor = $('.main_cursor');
						currentVideo.trigger('play');

						$('.mainSwiper .txt_area').mouseenter(function(){
							cursor.addClass('cursor-plus');
						}).mouseleave(function(){
							cursor.removeClass('cursor-plus');
						});

						$('.mainSwiper .txt_area').off('click').on('click',function(){
							cursor.removeClass('cursor-plus');
						});
					},
				},
			});

			var sliderVideos = $(".swiper-slide video");
			mainSwiper.on('slideChange', function () {			
				sliderVideos.each(function( index ) {
					this.currentTime = 0;
				});
				var prevVideo =  $("[data-swiper-slide-index=" + this.previousIndex + "]").find("video");
				var currentVideo =  $("[data-swiper-slide-index=" + this.realIndex + "]").find("video");
				prevVideo.trigger('stop');
				currentVideo.trigger('play');
			});
	
			$('.mainSwiper .txt_area').mouseenter(function(){
				mainSwiper.autoplay.stop();
			}).mouseleave(function(){
				mainSwiper.autoplay.start();
			});

			$('.wrap_header .btn_menu').on('mouseenter',function(){
				mainSwiper.autoplay.stop();
			});
			$('#menu_all .menu_all_bg, #menu_all .btn_close').on('click',function(){
				mainSwiper.autoplay.start();
			});
		},
		
		//인트로 애니메이션
		introAnimation : function(){	
			$(document).ready(function(){
				//선 애니메이션
				var line = $('.wrap_line_drawing .line');
				var setTimeLast = null;
				var skipBtn = $('.skip');

				$('.intro_moving1').addClass('on');
				for(var i = 0;i<line.length;i++){
					line.eq(i).css({
						'transition-delay' : (i*0.15 + 0.2)+'s'
					});
				}
	
				// 1-별 애니메이션 , 2-펜타 블루로고 show,3-물결배경show,4-펜타 흰색로고 show 및 메뉴 프리뷰
				// 1-별 애니메이션
				$('.svg_star .star').delay(1400).animate({
					'strokeDashoffset': 0
				}, 900, function(){
					//2-펜타 블루로고 show
					$('.wrap_ci').fadeIn(1200,function(){
						//3-물결배경show
						$('canvas').delay(500).fadeIn(1000, function(){
							//4-펜타 흰색로고 show 및 메뉴 프리뷰
							$('.wrap_white_penta.intro_penta').fadeIn(100,function(){
								$('.wrap_white_penta.intro_penta .white_penta').addClass('on');
							});
						});
					});
				});

				//whitePenta 로고 메뉴위치로 이동하는 애니메이션
				setTimeout(function(){
					$('.wrap_white_penta.intro_penta .white_penta').addClass('moving');
				},13300);

				//인트로 hide
				setTimeLast = setTimeout(function(){
					$('#main .intro_moving1').css({
						display : 'none'
					});
					page.main.onLoad();
					$('canvas').fadeOut(1200,function(){
						$('.wrap_white_penta.intro_penta').css({
							display : 'none'
						});
					});
					skipBtn.fadeOut(500);
				},14800);

				//skip
				skipBtn.off('click').on('click',function(){
					$(this).fadeOut(300);
					$('.intro_moving1').css({
						'transition' : '.3s',
						'visibility' : 'hidden',
						'opacity' : '0'
					});
					$('.wrap_white_penta.intro_penta').css({
						'transition' : '.3s',
						'visibility' : 'hidden',
						'opacity' : '0'
					});
					$('canvas').css({
						'transition' : '.3s',
						'visibility' : 'hidden',
						'opacity' : '0'
					});
					$('#header').removeClass('start');
					$('.btn_menu').addClass('tr0').fadeIn(400,function(){
						$(this).removeClass('tr0');
					});	

					clearTimeout(setTimeLast);
					page.main.onLoad();
				});
			});

			//물결 배경 script start
			var spriteImages = document.querySelectorAll( '.penta_img_moving' );
			var spriteImagesSrc = [];
			var texts = [];

			for ( var i = 0; i < spriteImages.length; i++ ) {

				var img = spriteImages[i];
				
				if ( img.nextElementSibling ) {
					texts.push(img.nextElementSibling.innerHTML);
				} else {
					texts.push('');
				}

				spriteImagesSrc.push( img.getAttribute('src' ) );
			}

			var initCanvasSlideshow = new CanvasSlideshow({
				sprites: spriteImagesSrc,
				displacementImage: '../assets/web/img/main/clouds.jpg',
				autoPlay: true,
				autoPlaySpeed: [4, 3],
				displaceScale: [5000, 10000],
				displaceAutoFit: true,
				displacementCenter: true,
				dispatchPointerOver: true,
				interactive: true,
				interactionEvent: 'custom',
			});
			$('canvas').css({
				left : 0,
				top : 0,
				transform : 'none',
				cursor : 'none',
				background : 'url("/assets/web/img/main/bg_intro.jpg")'
			})
			//물결 배경 script end
		},
		
		mainInter : function(){
			$('.btn_menu').hide();
			setTimeout(function(){
				if($('.wrap_white_penta.intro_penta .white_penta').css('opacity') !== 1) {
					$('#header').removeClass('start');
					$('.btn_menu').addClass('tr0').fadeIn(400,function(){
						$(this).removeClass('tr0');
					});	
				}
			},14400);
		},

		utilBlock : function(){
			$('.util').css({'display':'block'});
		},
	},

	about : {
		onLoad : function(){
			page.about.tabFunc();
			page.about.group();
			page.about.business();
			page.about.history();
		},

		tabFunc : function(){
			var tabSwiper = new Swiper('.tab_type1 .tabSwiper', {
				slidesPerView: 'auto',
				freeMode: true,
				preventClicks: true,
				watchOverflow: true,
				on: {
					init: function(){
						$('.tab_type1 .tabSwiper button').on('click', function(){
							// $('.tab_type1 .tabSwiper button').removeClass('active');
							// $(this).addClass('active');
							var dataClass = $(this).attr('data-link');

							if($('#about div').hasClass(dataClass)){
								var moveTop = $('#about .' + dataClass).offset().top - 64;
								$('html, body').animate({scrollTop: moveTop}, 1000);
							}
						})
					}
				}
			});
		},

		group : function(){
			$(document).ready(function(){
				$('#about').addClass('ready');
			});

			var fiveGroupPc = function(){
				$('.division_tit .part').each(function(){
					$(this).on('mouseenter', function(){
						var partIdx = $(this).index();
						$(this).closest('.division_tit').siblings('.tooltip').find('.con').eq(partIdx).stop().fadeIn(400).siblings().stop().fadeOut(400);
					});
					$(this).parent().on('mouseleave',function(){
						$('.division').find('.con').stop().fadeOut(400);
					})
				});
			}
			
			fiveGroupPc();

			var picSwiper = new Swiper('.picSwiper', {
				simulateTouch: false,
				loop:true,
				autoplay: {
					delay: 3000,
					disableOnInteraction : false,
				},
				navigation: {
					nextEl: '.picSwiper .swiper-button-next',
					prevEl: '.picSwiper .swiper-button-prev',
				},
				pagination: {
					el: '.picSwiper .swiper-pagination',
				},
				on: {
					init: function(){
						// 재생,정지버튼
						$('.picSwiper .btn-swiper-play').click(function(){
							if ($(this).hasClass('paused')) {
								$(this).removeClass('paused');
								picSwiper.autoplay.stop();
							} else {
								$(this).addClass('paused');
								picSwiper.autoplay.start();
							}
						});
					}
				}
			});

			$('.link_area').find('.link a').each(function(){
				$(this).on('mouseenter',function(){
					$(this).addClass('on');
				}).on('mouseleave',function(){
					$(this).removeClass('on');
				});
			});
		},

		business : function(){
			var bizSwiper = new Swiper('.bizSwiper', {
				simulateTouch: false,
				autoplay: {
					delay: 5000,
					disableOnInteraction : false,
				},
				loop : true,
				loopAdditionalSlides: 4,
				navigation: {
					nextEl: '.bizSwiper .swiper-button-next',
					prevEl: '.bizSwiper .swiper-button-prev',
				},
				pagination: {
					el: '.bizSwiper .swiper-pagination',
				},
				on: {
					init: function(){
						// 재생,정지버튼
						$('.bizSwiper .btn-swiper-play').click(function(){
							if ($(this).hasClass('paused')) {
								$(this).removeClass('paused');
								bizSwiper.autoplay.stop();
							} else {
								$(this).addClass('paused');
								bizSwiper.autoplay.start();
							}
						});
					},
				}
			});

			var listHover = function(){
				$('.list_biz li').mouseenter(function(){
					var listIndex = $(this).index();
					// $('.list_biz_img li').eq(listIndex).find('.hover_img').stop().fadeIn(700).parent().siblings().find('.hover_img').stop().fadeOut(700);
					$('.list_biz_img li').eq(listIndex).find('.hover_img').addClass('on').parent().siblings().find('.hover_img').removeClass('on');
				}).mouseleave(function(){
					// $('.list_biz_img .hover_img').stop().fadeOut(700);
					$('.list_biz_img .hover_img').removeClass('on');

				});
			};
			listHover();
		},

		award : {
			// 어워드 카운트
			// 2021-10-25 이호인 추가
			// awardCnt : function(value){
			// 	var awardCountConTxt= value;
			// 	console.debug("value = ", value);
			awardCnt : function(value){
				var awardCountConTxt= value;
				
				$({ val : 0 }).animate({ val : awardCountConTxt }, {
					duration: 2000,
					step: function() {
						var num = numberWithCommas(Math.floor(this.val));
						$(".memberCountCon").text(num);
					},
					complete: function() {
						var num = numberWithCommas(Math.floor(this.val));
						$(".memberCountCon").text(num);
					}
				});
				
				function numberWithCommas(x) {
					return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
				}
			},

			// awardScroll : function(){
			// 	var awardTop = $('.award').offset().top;
			// 	var docTop = $(document).scrollTop();
			// 	var awardBottom = $('.brand').offset().top;

			// 	if (docTop > awardTop - 400 && docTop <= awardBottom && stop === true) {
			// 		page.about.award.awardCnt();  
			// 		stop = false;
			// 	}

			// 	if( docTop >= awardTop) {
			// 		$('.total').css({
			// 			position : 'fixed'
			// 		});
			// 		if (docTop >= awardBottom - 800) {
			// 			$('.total').addClass('opacity0');
			// 		}
			// 		else {
			// 			$('.total').removeClass('opacity0');
			// 		}

			// 		if (docTop >= awardBottom - 500) {
			// 			$('.total').hide();
			// 		}
			// 		else {
			// 			$('.total').show();
			// 		}
			// 	}
			// 	else {
			// 		$('.total').css({
			// 			position : 'absolute'
			// 		});
			// 	}
			// }

			// 2021-10-25 이호인 추가
			// awardScroll : function(value){
			awardScroll : function(value){

				// 2021-11-12 이호인 추가
				if(!$('.award').html()){
					return false;
				}
				var awardTop = $('.award').offset().top;
				var docTop = $(document).scrollTop();
				var awardBottom = $('.brand').offset().top;
				var listHeight = $('.list_award').innerHeight();

				if (docTop > awardTop - 400 && docTop <= awardBottom && stop === true) {
					page.about.award.awardCnt(value); 
					stop = false;
				}

				if( docTop >= awardTop) {
					$('.total').css({
						position : 'fixed'
					});

					// 리스트 길이가 700이상일때는 고정
					if(listHeight>700) {
						if (docTop >= awardBottom - 700) {
							$('.total').addClass('opacity0');
						}
						else {
							$('.total').removeClass('opacity0');
						}
					}
					//

					else {
						if (docTop >= awardBottom - listHeight - 250) {
							$('.total').addClass('opacity0');
						}
						else {
							$('.total').removeClass('opacity0');
						}
					}
					
					//다른 곳에서 노출되는 오류
					if (docTop >= awardBottom) {
						$('.total').hide();
					}
					else {
						$('.total').show();
					}
				}
				else {
					$('.total').css({
						position : 'absolute'
					});
				}
			}
		
		},

		history : function(){
			var historySwiper = new Swiper('.historySwiper', {
				slidesPerView: 'auto',
				freeMode: true,
				mousewheel: true,
			});
		},


		Parallax : function(listClass,topStart){
			var list = $('.' + listClass);
			var i = 0;
			var docTop = $(document).scrollTop();
			var groupTop = [];
			for(i = 0; i<list.length; i++) {
				groupTop[i] = list.eq(i).offset().top - topStart;
				if( docTop >= groupTop[i]){
					list.eq(i).css({
						'transform' : 'translateY(0)',
						opacity : 1
					});
				}
			}
		},
	},

	project : {
		listEffect : function(){
			// 이미지 호버 모션
			$('.list_area > ul > li > a').on('mouseenter', function(){
				$(this).find('.over').stop().fadeIn(300);
			});
			$('.list_area > ul > li > a').on('mouseleave', function(){
				$(this).find('.over').stop().fadeOut(300);
			});
	
			// var projectThumbsize = function(){
			// 	var listGroup = $('.list_group');
	
			// 	listGroup.each(function(){
	
			// 		var pjImgH = parseInt($(this).find('img:first').height());
			//		$(this).find('.wrap_img').css({'height': pjImgH});
	
			// 	});

			// }
			
			setTimeout(function(){
				tabSwiper.update();
				// projectThumbsize()
			},350);
			
	
	
			// 리스트 정렬 버튼
			$('.btn_align').on('click', function(){
	
				$('.btn_align').removeClass('active');
				$(this).addClass('active');
	
				if ($(this).hasClass('rectangle') == true) {
					$('.list_container').addClass('sizeMix');
				} else {
					$('.list_container').removeClass('sizeMix');
				}
			});

			var tabSwiper = new Swiper('.tabSwiper', {
				slidesPerView: 'auto',
				spaceBetween: 60,
				freeMode: true,
				preventClicks: true,
				watchOverflow: true,
				on: {
					init: function(){
						$('.tabSwiper button').on('click', function(){
							$('.tabSwiper button').removeClass('active');
							$(this).addClass('active');
						})
					}
				}
			});

			var tabProjectSwiper = new Swiper('.tabProjectSwiper', {
				slidesPerView: 'auto',
				freeMode: true,
				preventClicks: true,
				watchOverflow: true,
				on: {
					init: function(){
						$('.tabProjectSwiper a').on('click', function(){
							$('.tabProjectSwiper a').removeClass('active');
							$(this).addClass('active');
						})
					}
				}
			});
		},

		scrollProject : function(obj,top){
			var scrollTop = $(document).scrollTop();
			var projectDetail = $('.'+obj);
			var projectDetailTop=[];
			var projectLength = projectDetail.length;

			for(i = 0;i<projectLength;i++){
				projectDetailTop[i] = projectDetail.eq(i).offset().top;

				if(projectDetailTop[i] - top <= scrollTop) {
					projectDetail.eq(i).addClass('on'); 
				}
			}
		},

		videoPlay : function(){
			setTimeout(function(){
				$('.btn_position .btn_play').on('click',function(){
					$(this).fadeOut(500);
					$(this).parent().siblings('video').get(0).play();
				});
			},350)
		},

		textAnimation : function(obj,num){
			var view = $('.'+obj);
			var viewTop = view.offset().top;
			var scrollTop = $(document).scrollTop();
			if( num == "100%" ) {
				view.addClass('on');
			}
			else {
				if(scrollTop >= viewTop - parseInt(num)) {
					view.addClass('on');
				}
			}
		},

		titLink : function(){
			$('#project .bg_txt .big_kinds').mouseenter(function(){
				$('.main_cursor').addClass('cursor-plus');
			}).mouseleave(function(){
				$('.main_cursor').removeClass('cursor-plus');
			});
			$('#project .bg_txt .big_kinds').on('click',function(){
				$('.main_cursor').removeClass('cursor-plus');
			})
		}



		// positionCenter : function(){
		// 	var winWidth = $(window).width();
		// 	var marginGap = -(1400 - winWidth);
		// 	if(winWidth < 1400) {
		// 		$('.project_info .detail img').css({'margin-left':marginGap ,width : 'calc(1400px - '+ marginGap +'px'});
		// 	}
		// 	else{
		// 		$('.project_info .detail img').css({'margin-left':0,'width': '100%'});

		// 	}
		// }
	},

	recruit : {
		slide : function(){
			var recruitSwiper;
			var enableSwiper = function() {

				recruitSwiper = new Swiper('.recruitSwiper', {
					loop: false,
					speed: 1000,
					slidesPerView: 'auto',
					spaceBetween: 30,
					watchOverflow: true,
					mousewheel: true,
					scrollbar: {
						el: ".wrap_slide_recruit .swiper-scrollbar",
						draggable: true,
					},
				});

			};

			enableSwiper();
			
		}
	},

	// 2021-11-12 이호인 추가
	collection : function (){
		var $btnMenu = $('#header .btn_menu');
		var $whitePenta = $('#menu_all .white_penta');
			$whitePenta.removeClass('hover');
			$whitePenta.removeClass('on');
			$('html,body').css('overflow','inherit');
			$btnMenu.removeClass('off').addClass('on');
			$btnMenu.attr('disabled',false);
			$('.wrap_header .top_bg').css('transiti/n','0s').delay(800).fadeIn(300);
			$('#menu_all .menu_all_bg').delay(800).fadeOut(300, function(){
				$('#menu_all').hide();
			});
			$('#menu_all .btn_close,#menu_all .util').delay(300).fadeOut(700);
			if($btnMenu.width() == 60) {
				$whitePenta.css({top:'-111px',transform:'scale(0.168)'});
			}
			else {
				$whitePenta.css({top:'-148px',transform:'scale(0.09)'});
			}
			// $(window).off('scroll');
			$(window).on('scroll', function () {
				page.header.scrollHead();
			});
			// 이동시 커서이벤트 사라져서 추가
			var cursor = $('.main_cursor');
			$('html,body').mousemove(function(e){
				cursor.css({
					top: e.clientY - cursor.height() / 2,
					left: e.clientX - cursor.width() / 2,
				});
			});
	
			$('.swiper-button-prev').mouseenter(function(){
				cursor.addClass('cursor-left');
			}).mouseleave(function(){
				cursor.removeClass('cursor-left');
			});
	
			$('.swiper-button-next').mouseenter(function(){
				cursor.addClass('cursor-right');
			}).mouseleave(function(){
				cursor.removeClass('cursor-right');
			});
			$('.mainSwiper .txt_area').mouseenter(function(){
				cursor.addClass('cursor-plus');
			}).mouseleave(function(){
				cursor.removeClass('cursor-plus');
			});
	
			$('a, button,label, input[type="text"],textarea').mouseenter(function(){
				cursor.removeClass('link');
				cursor.addClass('link');
			}).mouseleave(function(){
				cursor.removeClass('link');
			});
	}
}