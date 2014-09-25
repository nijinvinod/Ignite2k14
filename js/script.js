$( document ).ready(function() {
	var header_height = 400;
	var changeFrom = "psm";
	var changeSchFrom = "day1";
	var prev_aid = "home";
	var menu_status = "closed";
	/**
		Navigation Scroll
	**/
    $(".navItem, .navMobItem").click(function(){
    	var aid = $(this).attr("name");

		prev_aid = aid;

    	var aTag = $("#id_"+aid);
   	 	$('html,body').animate({scrollTop: aTag.offset().top},'slow');
    });

    /**
    Method to add Navigation Menu -- Fixed
    
    $(window).scroll(function() {
	    var height = $(window).scrollTop();

	    if(height  > header_height) {
	    	$(".topNavigation, .leftNav").addClass("scrolled");
	    }else{
	    	$(".topNavigation, .leftNav").removeClass("scrolled");
	    }
	});**/

	/** SESSION --  Category list toggle**/
	$(".catItem").click(function(){
		var changeTo = $(this).attr("name");
		$("li[name='"+changeTo+"']").addClass("active");
		$("li[name='"+changeFrom+"']").removeClass("active");

		$("#slide_"+changeFrom).fadeOut( 300, function() {
	    	$("#slide_"+changeTo).fadeIn( 300, function() {
	    		changeFrom = changeTo;
	    	});
	  	});
	});

	/** SCHEDULE --  Category list toggle**/
	$(".catSchItem").click(function(){
		var changeSchTo = $(this).attr("name");
		$("li[name='"+changeSchTo+"']").addClass("active");
		$("li[name='"+changeSchFrom+"']").removeClass("active");

		$("#slide_"+changeSchFrom).fadeOut( 300, function() {
	    	$("#slide_"+changeSchTo).fadeIn( 300, function() {
	    		changeSchFrom = changeSchTo;
	    	});
	  	});
	});


	$(".box").click(function(){
		var boxId = $(this).attr("name");
		var containerheight = $(".container").height();
		$(".container-overlay").height(containerheight);
		$(".container-overlay").addClass("disabled"); 
		$("#pop_"+boxId).fadeIn( 300, function() {
			
		});
	});

	$(".container-overlay, .closeIcon").click(function(){
		$(".container-overlay").removeClass("disabled"); 
		$(".sessionDescBox").fadeOut(300, function() {});
	});


	/*-- Mobile Navigation --*/
	$(".menu").click(function(){
		toggleMenu();
	});

	function toggleMenu(){
		if(menu_status=="closed"){
			$(".mobileNav").animate({left:'0px'});
			menu_status="opened";
		}else{
			$(".mobileNav").animate({left:'-230px'});
			menu_status="closed";
		}
	}

	/*-- Schedule Accordion Up --*/
	$(".showDesc").click(function(){
		$(this).next().slideToggle();
		var icon = $(this).find("i");
		if($(icon).hasClass("icon-arrow-up")){
			$(icon).removeClass("icon-arrow-up");
		}else{
			$(icon).addClass("icon-arrow-up");
		}
	});
	function countDownTimer(){
		console.log("called");
		var target_date = new Date("Oct 6, 2014").getTime();
 		var days, hours, minutes, seconds;
		setInterval(function () {
		    var current_date = new Date().getTime();
		    var seconds_left = (target_date - current_date) / 1000;
		    days = parseInt(seconds_left / 86400);
		    seconds_left = seconds_left % 86400;
		    hours = parseInt(seconds_left / 3600);
		    seconds_left = seconds_left % 3600;
		    minutes = parseInt(seconds_left / 60);
		   	if((days+"").length == 1){
		    	days = "0"+days;
		    }
		    if((hours+"").length == 1){
		    	hours = "0"+hours;
		    } 
		    if((minutes+"").length == 1){
		    	minutes = "0"+minutes;
		    }
		    seconds = parseInt(seconds_left % 60);
		    if((seconds+"").length == 1){
		    	seconds = "0"+seconds;
		    }
		    $("#t_days").html(days);
		    $("#t_hrs").html(hours);
		    $("#t_mins").html(minutes);
		    $("#t_sec").html(seconds); 
		}, 1000);
	}
	countDownTimer();

	var circleId = 1;
	var prevCircleId = 1;
	setInterval(function(){
		$(".circle"+prevCircleId).removeClass("active");
		$(".circle"+circleId).addClass("active");
		prevCircleId = circleId;
		if(circleId==4){
			circleId = 0;
		}
		circleId++;
	}, 2000);
});