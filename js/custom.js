(function($) {

    "use strict";
	
	$(window).on("load", function() {
	
        /* ----------------------------------------------------------- */
		/*  PRELOADER ANIMATION
		/* ----------------------------------------------------------- */
	
		var pageTransitionAnimationDuration = 500
		var preloader = $(".preloader");
		pageTransition({
			target: document.querySelector('.page'),
			delay: 0,
			duration: pageTransitionAnimationDuration,
			classActive: 'animated',
			conditions: function (event, link) {
				return
				!/(\#|callto:|tel:|mailto:|:\/\/)/.test(link)
				&& !event.currentTarget.hasAttribute('data-lightgallery')
				&& event.currentTarget.getAttribute('href') !== 'javascript:void(0);';
			},
			onTransitionStart: function (options) {
				setTimeout(function () {
					preloader.removeClass('loaded');
				}, options.duration * .75);
			},
			onReady: function () {
				preloader.addClass('loaded');
			}
		});
		
		/* ----------------------------------------------------------- */
        /*  TEXT ROTATOR ANIMATION
        /* ----------------------------------------------------------- */
		if ($("#selector").length) {
			$("#selector").animatedHeadline({
				 animationType: "clip"
			});
		}
		
	});

    jQuery(document).ready(function($) {
		
		/* ----------------------------------------------------------- */
        /*  STRETCHY NAVIGATION
        /* ----------------------------------------------------------- */
		
		if ($(".cd-stretchy-nav").length > 0) {
			var n = $(".cd-stretchy-nav");
			n.each(function() {
				var n = $(this),
					t = n.find(".cd-nav-trigger");
				t.on("click", function(t) {
					t.preventDefault(), n.toggleClass("nav-is-visible")
				})
			}), $(document).on("click", function(t) {
				!$(t.target).is(".cd-nav-trigger") && !$(t.target).is(".cd-nav-trigger span") && n.removeClass("nav-is-visible");
			})
		}
		$("body.light.dark-header .cd-stretchy-nav ul li a").on('click', function() {
			if ($(this).hasClass("home")) {
				$(".cd-stretchy-nav").addClass('lighter');
			}
			else
			{
				$(".cd-stretchy-nav").removeClass('lighter');
			}
		});
		
		$("body.light.dark-header .link-project-one, body.light.dark-header .link-project-two").on('click', function() {
			$(".cd-stretchy-nav").removeClass('lighter');
		});
		$("body.light #project-items li a").on('click', function() {
			$(".cd-stretchy-nav").addClass('lighter-in-project');
		});
		/* ----------------------------------------------------------- */
        /*  LINK TO ABOUT SECTION
        /* ----------------------------------------------------------- */
 
		$(".link-project-one").on("click", function(e) {
			var tabNum = $(this).index();
			var nthChild = tabNum + 3;
			$("#main > section.active").removeClass("active");
			$("#main > section:nth-child(" + nthChild + ")").addClass("active");
			$(".stretchy-nav li:first-child").removeClass("active");
			$(".stretchy-nav li:nth-child(2)").addClass("active");
			 e.preventDefault();
        });
		
		/* ----------------------------------------------------------- */
        /*  LINK TO PORTFOLIO SECTION
        /* ----------------------------------------------------------- */
		
		$(".link-project-two").on("click", function(e) {
			var tabNum = $(this).index();
			var nthChild = tabNum + 3;
			$("#main > section.active").removeClass("active");
			$("#main > section:nth-child(" + nthChild + ")").addClass("active");
			$(".stretchy-nav li:nth-child(1)").removeClass("active");
			$(".stretchy-nav li:nth-child(3)").addClass("active");
			 e.preventDefault();
        });
		
        /* ----------------------------------------------------------- */
        /*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */

        $(".contactform").on("submit", function() {
            $(".output_message").text("Loading...");

            var form = $(this);
            $.ajax({
                url: form.attr("action"),
                method: form.attr("method"),
                data: form.serialize(),
                success: function(result) {
                    if (result == "success") {
                        $(".form-inputs").css("display", "none");
                        $(".box p").css("display", "none");
                        $(".contactform").find(".output_message").addClass("success");
                        $(".output_message").text("Message Sent!");
                    } else {
                        $(".tabs-container").css("height", "440px");

                        $(".contactform").find(".output_message").addClass("error");
                        $(".output_message").text("Error Sending!");
                    }
                }
            });

            return false;
        });

        /* ----------------------------------------------------------- */
        /*  PAGE ANIMATION
        /* ----------------------------------------------------------- */

        checkScreenSize();

        function checkScreenSize() {
            var newWindowWidth = $(window).width();
            if (newWindowWidth < 1025) {
                $('#nav > li').on('click', function(e) {
                    e.preventDefault();
                    $('#main').addClass('open');
                });
            } else {}
        }
        var resizeTimer;
        $(window).on('resize', function(e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                checkScreenSize();
            }, 250);
        });
		
		/* ----------------------------------------------------------- */
        /*  STOP VIDEOS WHEN CLICK DETECTED ON MENU LINKS
        /* ----------------------------------------------------------- */

		function stop_videos() {
			var video = document.getElementById("video");
			if (video.paused !== true && video.ended !== true) {
				video.pause();
			}
			$('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
		}
		
		/* ----------------------------------------------------------- */
        /*  MAIN NAVIGATION MENU
        /* ----------------------------------------------------------- */
 
        // MAIN NAVIGATION MENU
        $(".navigation > li, .stretchy-nav > li").on("click", function(e) {
            if (!$(this).hasClass("active")) {
                var tabNum = $(this).index();
                var nthChild = tabNum + 2;
                $(".navigation > li.active, .stretchy-nav > li.active").removeClass("active");
                $(this).addClass("active");
                $("#main > section.active").removeClass("active");
                $("#main > section:nth-child(" + nthChild + ")").addClass("active");
				stop_videos();
				$(".cd-stretchy-nav").removeClass('lighter-in-project');
            }
			e.preventDefault();
			if (($('.project-info-container').hasClass('slide-in')) && ($(window).width() > 1024)){
				setTimeout(function(){ 
					$('.project-info-container').removeClass('slide-in');
				$('.close-project').removeClass('is-visible');
				if( is_firefox ) {
					$('.project-container').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						$('.project-container').removeClass('overflow-hidden');
					});
				} else {
					$('.project-container').removeClass('slide-out');
					$('.project-container').removeClass('overflow-hidden');
				}
				}, 600);
				
			}
        });
		
		/* ----------------------------------------------------------- */
        /*  SHOW/HIDE SECTIONS
        /* ----------------------------------------------------------- */
		
        if (window.location.hash && $('#link-' + window.location.hash.replace(/^#/, '')).length) {
            $('#link-' + window.location.hash.replace(/^#/, '')).trigger('click');
        }
        window.userInteractionTimeout = null;
        window.userInteractionInHTMLArea = false;
        window.onBrowserHistoryButtonClicked = null;
        $(document).ready(function() {
            $(document).mousedown(function() {
                clearTimeout(window.userInteractionTimeout);
                window.userInteractionInHTMLArea = true;
                window.userInteractionTimeout = setTimeout(function() {
                    window.userInteractionInHTMLArea = false;
                }, 500);
            });
            $(document).keydown(function() {
                clearTimeout(window.userInteractionTimeout);
                window.userInteractionInHTMLArea = true;
                window.userInteractionTimeout = setTimeout(function() {
                    window.userInteractionInHTMLArea = false;
                }, 500);
            });
            if (window.history && window.history.pushState) {
                $(window).on('popstate', function() {
                    if (!window.userInteractionInHTMLArea) {
                        if (window.location.hash && $('#link-' + window.location.hash.replace(/^#/, '')).length) {
                            $('#link-' + window.location.hash.replace(/^#/, '')).trigger('click');
                        }
                        if (!window.location.hash) {
                            $('#link-work').trigger('click');
                        }
                    }
                    if (window.onBrowserHistoryButtonClicked) {
                        window.onBrowserHistoryButtonClicked();
                    }
                });
            }
        });
		
		/* ----------------------------------------------------------- */
        /*  BACK TO MAIN SECTION IN MOBILE
        /* ----------------------------------------------------------- */

        $('#back-mobile').on('click', function(e) {
            $('#main').removeClass('open');
			stop_videos();
        });	
		
		
		/* ----------------------------------------------------------- */
        /*  PORTFOLIO SHOW SLIDE
        /* ----------------------------------------------------------- */

		var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

		$('.project-section').find('ul a').on('click', function(event){
			event.preventDefault();
			var selected_member = $(this).data('type');
			$('.project-info-container.'+selected_member+'').addClass('slide-in');
			$('.close-project').addClass('is-visible');
			
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			if( is_firefox ) {
				$('.project-container').addClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('.project-container').addClass('overflow-hidden');
				});
			} else {
				$('.project-container').addClass('slide-out');
				$('.project-container').addClass('overflow-hidden');
			}
			
			if ($(window).width() < 1025) {
				$('#back-mobile').css('pointer-events','none');
			}
			

		});

		/* ----------------------------------------------------------- */
        /*  PORTFOLIO HIDE SLIDE
        /* ----------------------------------------------------------- */

		$(document).on('click', '.close-project, .project-overlay', function(event){
			event.preventDefault();
			$('.project-info-container').removeClass('slide-in');
			$('.close-project').removeClass('is-visible');
			stop_videos();
			$(".cd-stretchy-nav").removeClass('lighter-in-project');
			if( is_firefox ) {
				$('.project-container').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('.project-container').removeClass('overflow-hidden');
				});
			} else {
				$('.project-container').removeClass('slide-out');
				$('.project-container').removeClass('overflow-hidden');
			}
			
			if ($(window).width() < 1025) {
				$('#back-mobile').css('pointer-events','auto');
			}
		});
		
		/* ----------------------------------------------------------- */
        /*  SLIDER IN PORTFOLIO
        /* ----------------------------------------------------------- */
		$('.project-slider').carousel({
			pause: true,
			interval: false
		});
		
	});
	
    /* ----------------------------------------------------------- */

})(jQuery);