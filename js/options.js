(function () {
	'use strict';

	var teslaThemes = {

		init: function () {
			this.changeDefaults();
			this.smallToggles();
			this.inputHasValue();
			this.bxSliderInit();
			this.parallaxInit();
			this.fixedElements();
			this.googleMapsInit();
			this.loadFlickr();
			this.isotopeInit();
			this.nrOnly();
			this.courseDescriptionToggle();
			this.startBlogpostMedia();
			this.popups();
			this.removeFromWishlist();
			this.myAccountTabs();
			this.coursesFilters();
			this.loadBlogPosts();
			this.lightBox();
		},

		// Theme Custom Functions
		changeDefaults: function () {
			// Wrap the first letter of a paragraph in a span
			var paragraph = jQuery('.highlighted-start').text(),
				firstChar = paragraph.substr(0,1);

			firstChar = '<span class="first-letter">' + firstChar + '</span>';
			jQuery('.highlighted-start').html(paragraph.replace(/^./, firstChar));

			// Wrap page numbers in a span
			var pageNumbers = jQuery('ul.page-numbers li');

			pageNumbers.each(function () {
				jQuery(this).find('span').wrap('<span class="current page-wrapper"></span>');
				jQuery(this).find('a').wrap('<span class="page-wrapper"></span>');
			});
		},

		smallToggles: function () {
			var nav = jQuery('header nav'),
				navToggle = jQuery('.menu-toggle'),
				searchForm = jQuery('.global-search-form'),
				searchFormToggle = jQuery('.search-box-toggle'),
				cart = jQuery('.shopping-cart'),
				cartToggle = jQuery('.shopping-cart-toggle'),
				paymentType = jQuery('#payment-type'),
				creditCard = jQuery('#credit-card-payment');


			function hamburgerToggle() {
				jQuery('.top-menu').toggleClass('top-animate');
				jQuery('.mid-menu').toggleClass('mid-animate');
				jQuery('.bottom-menu').toggleClass('bottom-animate');
			}

			// Menu Toggle
			navToggle.on('click', function () {
				hamburgerToggle();
				nav.toggleClass('open');
				jQuery(this).toggleClass('menu-opened');
				nav.hasClass('open') ? nav.velocity('slideDown', {duration: 280}) : nav.velocity('slideUp', {duration: 200});
				return false;
			});

			jQuery(document).on('click', function () {
				if (nav.hasClass('open')) {
					hamburgerToggle();
				}

				nav.removeClass('open');
				navToggle.removeClass('menu-opened');
				nav.hasClass('open') ? nav.velocity('slideDown', {duration: 280}) : nav.velocity('slideUp', {duration: 200});
			});

			nav.on('click', function (e) {
				e.stopPropagation();
			});

			// Search Form Toggle
			searchFormToggle.on('click', function () {
				searchForm.toggleClass('open');
				searchForm.hasClass('open') ? searchForm.velocity('slideDown', {duration: 280}) : searchForm.velocity('slideUp', {duration: 200});
				return false;
			});

			jQuery(document).on('click', function () {
				if (searchForm.hasClass('open')) {
					searchForm.velocity('slideUp', {duration: 230});
					searchForm.removeClass('open');
				}
			});

			searchForm.on('click', function (e) {
				e.stopPropagation();
			});

			// Shopping Cart
			cartToggle.on('click', function () {
				cart.toggleClass('open');
				return false;
			});

			jQuery(document).on('click', function () {
				cart.removeClass('open');
			});

			cart.on('click', function (e) {
				e.stopPropagation();
			});

			cart.find('.cart-course').each(function () {
				var obj = jQuery(this);

				obj.find('.remove-from-cart').on('click', function (e) {
					e.preventDefault();
					obj.velocity('slideUp', {duration: 350}, 'easeInCubic');
					obj.css({
						'min-height': 0
					});

					cart.find('.cart-items-total').text(parseInt(cart.find('.cart-items-total').text(), 10) - 1);
				});
			});

			// Checkout Forms Toggle
			jQuery('.checkout-btn, .credit-card-btn').on('click', function (e) {
				e.preventDefault();
			});

			jQuery('.checkout-btn').one('click', function () {
				paymentType.velocity('slideDown', {duration: 290});

				paymentType.velocity("scroll", {
					offset: -((paymentType.height()/2) + jQuery('header').outerHeight(true)),
					delay: 30
				});
			});

			jQuery('.credit-card-btn').one('click', function () {
				creditCard.velocity('slideDown', {duration: 290});

				creditCard.velocity("scroll", {
					offset: -((creditCard.height()/2) + jQuery('header').outerHeight(true)),
					delay: 30
				});
			});

			// Enroll to course
			jQuery('.section-courses').on('click', '.single-course .enroll-btn', function (e) {
				e.preventDefault();
				cart.addClass('open');
				return false;
			});

			// Save course
			jQuery('.section-courses').on('click', '.single-course .save-btn', function () {
				var obj = jQuery(this),
					popup = obj.find('.popup');

				obj.toggleClass('saved');
				if (obj.hasClass('saved')) {
					popup.addClass('visible');

					setTimeout(function () {
						popup.addClass('slow').removeClass('visible');
					}, 1500);

					popup.removeClass('slow');
				}
			});
		},

		inputHasValue: function () {
			jQuery('.js-input').on('focusout', function () {
				var text_val = jQuery(this).val();
				if (text_val === "") {
					jQuery(this).removeClass('has-value');
				} else {
					jQuery(this).addClass('has-value');
				}
			});
		},

		bxSliderInit: function () {
			// Hero Slider (Main)
			var heroSliderPrev = jQuery('.hero-slider .custom-nav .prev'),
				heroSliderNext = jQuery('.hero-slider .custom-nav .next'),

				heroSlider = jQuery('.hero-slider .slides').bxSlider({
					speed: 980,
					auto: true,
					pause: 5500,
					mode: 'fade',					
					pager: false,
					autoHover: true,
					controls: false,
					adaptiveHeight: true,
					onSliderLoad: function () {
						jQuery('.slider-component').addClass('ready');
					},
					onSlideAfter: function () {
						jQuery('.slider-component').addClass('ready');
					},
					onSlideBefore: function () {
						jQuery('.slider-component').removeClass('ready');
					}
				});

			heroSliderPrev.on('click', function () {
				heroSlider.goToPrevSlide();
			});

			heroSliderNext.on('click', function () {
				heroSlider.goToNextSlide();
			});

			// Testimonial Carousel
			var testimonialCarousel = jQuery('.testimonials-list');

			testimonialCarousel.bxSlider({
				controls: false,
				startSlide: 1,
				speed: 650
			});
		},

		parallaxInit: function () {
			var container = jQuery('[data-parallax-bg]');

			if(container.length) {
				container.each(function(index) {
					var boxImg = container.eq(index),
						boxImgData = boxImg.data('parallax-bg'),
						parallaxBox = boxImg.find('.box-img > span');

					parallaxBox.css({
						'background-image': 'url("' + boxImgData + '")'
					});

					function scrollEffect() {
						var elCont = container[index],
							el = elCont.getBoundingClientRect(),
							wHeight = jQuery(window).height(),
							scrl =  wHeight-(el.bottom - el.height),
							scrollBox = boxImg.children('.box-img'),
							condition = wHeight+el.height,
							progressCoef = scrl/condition;

						if( scrl > 0  && scrl < condition) {
							scrollBox.css({
								transform: 'translateY('+(progressCoef* 100)+'px)'
							});
						}
					}

					scrollEffect();

					jQuery(window).scroll(function() {
						scrollEffect();
					});
				});
			}
		},

		fixedElements: function () {
			var footer = jQuery('footer'),
				header = jQuery('header'),
				fh = footer.height();

			jQuery(window).on('scroll', function () {
				var st = jQuery(this).scrollTop();

				// Fixed Footer
				if (footer.hasClass('fixed')) {
					if (jQuery(window).width() > 767) {
						var dh = jQuery(document).height(),
							wh = jQuery(window).height(),
							cb = jQuery('.content-wrapper')[0].getBoundingClientRect();

						if (wh - cb.bottom <= fh) {
							footer.css({
								'opacity': Math.ceil(((wh - cb.bottom) / fh) * 100) / 100
							});
						}
					}
				}

				// Fixed Header
				(st > header.outerHeight(true)) ? header.addClass('not-visible') : header.removeClass('not-visible');

				(st > header.outerHeight(true) + 70) ? header.addClass('fixed') : header.removeClass('fixed');
			});

			if (footer.hasClass('fixed')) {
				if (jQuery(window).width() > 767) {
					jQuery('.content-wrapper').css({
						'margin-bottom': fh
					});
				} else {
					jQuery('.content-wrapper').css({
						'margin-bottom': 0
					});
				}

				jQuery(window).on('resize', function () {
					fh = footer.height();
					
					if (jQuery(window).width() > 767) {
						jQuery('.content-wrapper').css({
							'margin-bottom': fh
						});
					} else {
						jQuery('.content-wrapper').css({
							'margin-bottom': 0
						});
					}
				});
			}
		},

		googleMapsInit: function () {
			var mapCanvas = jQuery('#map-canvas');

			function initialize_contact_map() {
			    var mapOptions = {
						center: new google.maps.LatLng(-37.882281, 144.791277),
						zoom: 15,
						// disableDefaultUI: true,
						scrollwheel: false,
						disableDefaultUI: true,
						mapTypeId: google.maps.MapTypeId.ROADMAP
			        };
			    var contact_map = new google.maps.Map(mapCanvas[0],mapOptions),
			    	marker = new google.maps.Marker({
		              map: contact_map,
		              position: new google.maps.LatLng(-37.882281,144.791277),
		              animation: google.maps.Animation.DROP,
		              icon: 'img/map-pin.png'
		            });
		    }
		    
			if (mapCanvas.length) {
		    	google.maps.event.addDomListener(window, 'load', initialize_contact_map);
			}
		},

		isotopeInit: function () {
			var isotopeContainer = jQuery('.isotope-container');

			if (isotopeContainer.length) {
				isotopeContainer.imagesLoaded(function () {
					isotopeContainer.isotope({
						itemSelector: '.isotope-item'
					});
				});
			}

			jQuery('body').on('sidebarIsotope', function () {
				jQuery('.sidebar-isotope').isotope({
					itemSelector: '.sidebar-isotope-item'
				});
			});
		},

		nrOnly: function () {
			jQuery('.nr-only').keypress(function (e) {
				if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
					return false;
				}
			});
		},

		loadFlickr: function () {
			jQuery('.flickr_widget').each(function () {
				var stream = jQuery(this);
				var stream_userid = stream.attr('data-userid');
				var stream_items = parseInt(stream.attr('data-items'), 10);
				jQuery.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&id=" + stream_userid + "&jsoncallback=?", function (stream_feed) {
					var i;
					var stream_function = function (i) {
						if (stream_feed.items[i].media.m) {
							var stream_a = jQuery('<a>').addClass('PhotostreamLink').attr('href', stream_feed.items[i].link).attr('target', '_blank');
							var stream_img = jQuery('<img>').addClass('PhotostreamImage').attr('src', stream_feed.items[i].media.m).attr('alt', '').each(function () {
								var t_this = this;
								var j_this = jQuery(this);
								var t_loaded_function = function () {
									stream_a.append(t_this);
								};
								var t_loaded_ready = false;
								var t_loaded_check = function () {
									if (!t_loaded_ready) {
										t_loaded_ready = true;
										t_loaded_function();
									}
								};
								var t_loaded_status = function () {
									if (t_this.complete && j_this.height() !== 0)
										t_loaded_check();
								};
								t_loaded_status();
								jQuery(this).load(function () {
									t_loaded_check();
								});
							});
							stream.append(jQuery('<li>').append(stream_a));
						}
					};
					for (i = 0; i < stream_items && i < stream_feed.items.length; i++) {
						stream_function(i);

						if (i === stream_feed.items.length-1) {
							setTimeout(function () {
								jQuery('body').trigger('sidebarIsotope');
							}, 400);
						}
					}
				});
			});
		},

		courseDescriptionToggle: function () {
			var courseDescription = jQuery('.course-description-list'),
				courseLessons = jQuery('.course-description-list .lesson');

			courseLessons.each(function () {
				var lesson = jQuery(this),
					lessonDescription = jQuery(this).find('.lesson-description'),
					lessonDescriptionItems = jQuery(this).find('.lesson-description li');

				lesson.find('.lesson-nr').on('click', function () {
					lessonDescription.toggleClass('visible');

					if (lessonDescription.hasClass('visible')) {
						lessonDescription.velocity('slideDown', {duration: 200});

						lessonDescriptionItems.each(function (i) {
							var obj = jQuery(this);
							setTimeout(function () {
								obj.find('.icon').addClass('visible');
							}, 100 * (i + 1));
						});
					} else {
						lessonDescription.velocity('slideUp', {duration: 170});

						lessonDescriptionItems.each(function (i) {
							var obj = jQuery(this);
							obj.find('.icon').removeClass('visible');
						});
					}
				});
			});
		},

		startBlogpostMedia: function () {
			var playBtn = jQuery('.blog-post .play-button'),
				popup = jQuery('.video-popup'),
				iframeHolder = jQuery('.video-popup iframe'),
				closePopupBtn = jQuery('.video-popup .close-popup');

			// Scroll Events
			// left: 37, up: 38, right: 39, down: 40,
			// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
			var keys = {37: 1, 38: 1, 39: 1, 40: 1};

			function preventDefault(e) {
			  e = e || window.event;
			  if (e.preventDefault)
			      e.preventDefault();
			  e.returnValue = false;  
			}

			function preventDefaultForScrollKeys(e) {
			    if (keys[e.keyCode]) {
			        preventDefault(e);
			        return false;
			    }
			}

			function disableScroll() {
				if (window.addEventListener) window.addEventListener('DOMMouseScroll', preventDefault, false);
				window.onwheel = preventDefault; // modern standard
				window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
				window.ontouchmove  = preventDefault; // mobile
				document.onkeydown  = preventDefaultForScrollKeys;
				jQuery('body').addClass('no-scroll');
			}

			function enableScroll() {
				if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
				window.onmousewheel = document.onmousewheel = null; 
				window.onwheel = null; 
				window.ontouchmove = null;  
				document.onkeydown = null;
				jQuery('body').removeClass('no-scroll');
			}

			if (popup.length) {
				playBtn.on('click', function (e) {
					e.preventDefault();
					iframeHolder.attr('src', jQuery(this).attr('data-media-src'));
					iframeHolder[0].src += "?autoplay=1";
	  				popup.addClass('visible');
	  				// disable scroll
	  				disableScroll();
	  				return false;
				});

				closePopupBtn.on('click', function () {
					popup.removeClass('visible');
					iframeHolder[0].src = "";
					jQuery('html').removeClass('popup-visible');
				});

				jQuery(document).on('click', function () {
					popup.removeClass('visible');
					iframeHolder[0].src = "";
					// enable scroll
	  				enableScroll();
				});

				iframeHolder.on('click', function (e) {
					e.stopPropagation();
				});
			}
		},

		popups: function () {
			var popup = jQuery('.register-popup'),
				popupWrapper = jQuery('.register-popup .popup-wrapper'),
				closePopup = jQuery('.register-popup .close-popup-btn'),
				loginFormShow = jQuery('.register-popup .login-btn'),
				registerFormShow = jQuery('.register-popup .register-btn');

			jQuery('.section-courses').on('click', '.register-btn, .register-to-course, .status a', function (e) {
				e.preventDefault();

				if (jQuery(window).scrollTop() > 220) {
					popup.css({
						'padding-top': jQuery(window).scrollTop() + 100
					});
				} else {
					popup.css({'padding-top': '100px'});
				}

				setTimeout(function () {
					popup.addClass('active');
				}, 300);

				return false;
			}); 

			jQuery(document).on('click', function () {
				popup.removeClass('active');
			});
			closePopup.on('click', function () {
				popup.removeClass('active');
			});

			popupWrapper.on('click', function (e) {
				e.stopPropagation();
			});

			loginFormShow.on('click', function (e) {
				e.preventDefault();

				jQuery('.register-popup #register-form').velocity('fadeOut', {
					duration: 350
				});
				jQuery('.register-popup #login-form').velocity('fadeIn', {
					duration: 350,
					delay: 350
				});
			});

			registerFormShow.on('click', function (e) {
				e.preventDefault();

				jQuery('.register-popup #login-form').velocity('fadeOut', {
					duration: 350
				});
				jQuery('.register-popup #register-form').velocity('fadeIn', {
					duration: 350,
					delay: 350
				});
			});
		},

		removeFromWishlist: function () {
			var course = jQuery('.wishlist .course');

			course.each(function () {
				var obj = jQuery(this),
					removeCourseBtn = obj.find('.remove-from-saved'),
					removeCourseAction = obj.find('.remove-course'),
					removeCourseActionVisible = false,
					keepCourseBtn = removeCourseAction.find('.keep'),
					deleteCourseBtn = removeCourseAction.find('.remove');

				

				removeCourseBtn.on('click', function (e) {
					e.preventDefault();
					if (!removeCourseActionVisible) {
						removeCourseActionVisible = true;
						jQuery(this).addClass('active');
						removeCourseAction.velocity('slideDown', {duration: 200});
					}
				});

				keepCourseBtn.on('click', function (e) {
					e.preventDefault();
					removeCourseBtn.removeClass('active');
					removeCourseActionVisible = false;
					removeCourseAction.velocity('slideUp', {duration: 170});
				});

				deleteCourseBtn.on('click', function (e) {
					e.preventDefault();
					obj.velocity('slideUp', {duration: 350});
					obj.css({
						'min-height': '0'
					});
				});
			});
		},

		myAccountTabs: function () {
			var tabs = jQuery('.section-myaccount .tabs-box .tab-box'),
				myProfileBtn = jQuery('.section-myaccount .my-profile'),
				menuOptions = jQuery('.section-myaccount .menu li');

			menuOptions.each(function () {
				var obj = jQuery(this).find('a');

				if (!obj.hasClass('log-out')) {
					obj.on('click', function (e) {
						e.preventDefault();
						var current = jQuery(this),
							location = current.attr('href');

						tabs.each(function () {
							var object = jQuery(this);

							if (("#"+object.attr('id')) != location) {
								object.removeClass('visible current');
							} else if (!object.hasClass('current')) {
								object.velocity('fadeIn', {
									duration: 800
								});
								object.addClass('visible current');
							}
						});
					});
				}
			});

			myProfileBtn.on('click', function (e) {
				e.preventDefault();
				tabs.each(function () {
					var object = jQuery(this);

					if (("#"+object.attr('id')) != "#general-info") {
						object.removeClass('visible current');
					} else if (!object.hasClass('current')) {
						object.velocity('fadeIn', {
							duration: 800
						});
						object.addClass('visible current');
					}
				});
			});	
		},

		coursesFilters: function () {
			var ajaxTarget = jQuery('.section-courses .ajax-target'),
				projects = jQuery('.section-courses .projects'),
				filterOptions = jQuery('.section-courses .courses-filters li a'),
				advancedFiltersToggle = jQuery('.section-courses .filters-box .advanced-filters-toggle'),
				advancedFiltersBox = jQuery('.section-courses .filters-box .advanced-filters-box'),
				filterBtn = jQuery('.section-courses .filters-box .advanced-filters-box .filters-action .apply'),
				resetBtn = jQuery('.section-courses .filters-box .advanced-filters-box .filters-action .reset'),
				loader = jQuery('.section-courses .main-loader'),
				selectBoxes = jQuery('.filters-box .filter-input-box .selext-box');

			// Global Filter (all, online, offline)
			filterOptions.on('click', function (e) {
				e.preventDefault();
				var obj = jQuery(this),
					target = obj.attr('data-target');

				if (!obj.hasClass('current')) {
					filterOptions.each(function () {
						jQuery(this).removeClass('current');
					});

					loader.addClass('visible');

					projects.velocity('scroll', {
						duration: 450,
						offset: -200
					});

					setTimeout(function () {
						ajaxTarget.load('ajax/courses/' + target + '.html', function (responseTxt, statusTxt, xhr) {
							if(statusTxt === "success") {
								setTimeout(function () {
									loader.removeClass('visible');
								}, 950);
							}
						});
					}, 500);

					obj.addClass('current');
				}
			});

			// Advanced Filters 
			advancedFiltersToggle.on('click', function (e) {
				e.preventDefault();

				advancedFiltersToggle.toggleClass('active');
				if (advancedFiltersToggle.hasClass('active')) {
					advancedFiltersToggle.find('p').text('Hide advanced filters');
				} else {
					advancedFiltersToggle.find('p').text('Show advanced filters');
				}

				advancedFiltersBox.toggleClass('open');

				advancedFiltersBox.hasClass('open') ? advancedFiltersBox.velocity('slideDown', {duration: 300}) : advancedFiltersBox.velocity('slideUp', {duration: 250});
			});

			// Apply Filters
			filterBtn.on('click', function (e) {
				e.preventDefault();

				loader.addClass('visible');

				projects.velocity('scroll', {
					duration: 450,
					offset: -200
				});

				setTimeout(function () {

					// Load Necessary Posts
					setTimeout(function () {
						loader.removeClass('visible');
					}, 950);

				}, 500);
			});

			// Filter Select Boxes
			selectBoxes.each(function (i) {
				var current = i,
					obj = jQuery(this),
					input = obj.find('input'),
					listItem = obj.find('.dropdown ul li');

				input.on('click', function () {
					obj.toggleClass('open');

					selectBoxes.each(function (i) {
						if (i != current) {
							jQuery(this).removeClass('open');
						}
					});

					return false;
				});

				listItem.on('click', function () {
					input.attr('data-selection', jQuery(this).attr('data-option'));
					input.attr('value', jQuery(this).text());
					obj.removeClass('open');
				});

				if (obj.hasClass('date-select')) {
					// Calendar Init
					jQuery('#calendar').datepicker({
						onSelect: function (date) {
							input.attr('data-selection', date);
							input.attr('value', date);
							obj.removeClass('open');	
						}
					});
				}
			});

			jQuery(document).on('click', function () {
				selectBoxes.removeClass('open');
			});

			selectBoxes.find('.dropdown').on('click', function (e) {
				e.stopPropagation();
			});

			// Reset Filters  
			resetBtn.on('click', function (e) {
				e.preventDefault();

				jQuery('.filters-box .filter-input-box .input-box').each(function () {
					var input = jQuery(this).find('input');

					input.attr('value', "");
					input.attr('data-selection', "");
					
					if (input.attr('name') === "course-category") {
						input.attr('placeholder', "All categories (95)");
					}

					if (input.attr('name') === "course-sorting") {
						input.attr('placeholder', "Newest courses");
					}

					if (input.attr('name') === "course-keywords") {
						input.val("");
					}

					if (input.attr('name') === "course-date") {
						input.attr('placeholder', "Newest courses");
					}

					if (input.attr('name') === "course-instructor") {
						input.val("");
					}
				});
			});
		},

		loadBlogPosts: function () {
			var loader = jQuery('.section-blog .main-loader'),
				loadBlogPostsBtn = jQuery('.section-blog .load-more');

			loadBlogPostsBtn.on('click', function (e) {
				e.preventDefault();

				loadBlogPostsBtn.css({
					'opacity': '0'
				});

				loader.velocity('slideDown', {
					duration: 150
				});

				loader.addClass('visible');

				// To do - AJAX Request
				setTimeout(function () {
					loader.velocity('slideUp', {
						duration: 180
					});

					loader.removeClass('visible');

					loadBlogPostsBtn.css({
						'opacity': '1'
					});
				}, 1450);
			});
		},

		lightBox: function () {
			lightbox.option({
				'fadeDuration': 700,
				'positionFromTop': 200
			});
		}
	};

	jQuery(document).ready(function(){
		teslaThemes.init();

		setTimeout(function () {
			jQuery('body').addClass('dom-ready');
		}, 200);
	});
}());