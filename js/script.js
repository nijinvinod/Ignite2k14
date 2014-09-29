$( document ).ready(function() {
	var header_height = 400;
	var changeFrom = "psm";
	var changeSchFrom = "day1";
	var prev_aid = "home";
	var menu_status = "closed";


	var schStartHeight = 2389;
    var schEndHeight = 4193;

    var secStartHeight = 679;
    var secEndHeight = 1670;
    var currentPop;
    
    var popUpMenuIds = [];
    getAllPopUps();
    function getAllPopUps(){
        var popUps = $(".sessionDescBox");
        for(var i = 0 ; i < popUps.length ; i++){
            popUpMenuIds.push($(popUps[i]).attr("id"));
        }
    }
    function getPopIndex(popId){
        for(var i = 0 ; i < popUpMenuIds.length ; i++){
            if(popUpMenuIds[i]==popId){
                return i;
                break;
            }
        }
    }
    
    
    function moveRight(){
        var currentId = popUpMenuIds[currentPop];
        if(currentPop < popUpMenuIds.length-1){
            var nextId = popUpMenuIds[currentPop+1];
            $("#"+currentId).fadeOut( 100, function() {
                $("#"+nextId).fadeIn( 100, function() {

                });
            });
            currentPop++;
        }
    }
    
    function moveLeft(){
        var currentId = popUpMenuIds[currentPop];
        if(currentPop!=0){
            var nextId = popUpMenuIds[currentPop-1];
            $("#"+currentId).fadeOut( 100, function() {
                $("#"+nextId).fadeIn( 100, function() {

                });
            });
            currentPop--;
        }
        
    }
    
    $(".nextIcon").click(function(){
        moveRight();
    });
    
    $(".prevIcon").click(function(){
        moveLeft();
     });

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
    **/
    $(window).scroll(function() {
	    var height = $(window).scrollTop();
	  //  console.log(height);
	    

	    if(height  > schStartHeight && height < schEndHeight ) {
	    	$("#dateBoxRight").addClass("scrolled");
	    }else{
	    	$("#dateBoxRight").removeClass("scrolled");
	    }

	    if(height  > secStartHeight && height < secEndHeight ) {
	    	$("#sesBoxRight").addClass("scrolled");
	    }else{
	    	$("#sesBoxRight").removeClass("scrolled");
	    }

	});

	/** SESSION --  Category list toggle**/
	$(".catItem").click(function(){
		var aTag = $("#id_sessions");
		$('html,body').animate({scrollTop: aTag.offset().top},'slow');

		if($(this).hasClass(".smallCatItem")){
			sesEndHeight = 1350;
		}
		else{
			sesEndHeight = 1670;
		}

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
		var aTag = $("#id_schedule");
		$('html,body').animate({scrollTop: aTag.offset().top},'slow');

		if($(this).hasClass(".smallCatSchItem")){
			schEndHeight = 2390;
		}
		else{
			schEndHeight = 3893;
		}
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
		console.log(boxId);
		var containerheight = $(".container").height();
		$("body").css("overflow-y","hidden");
		$(".container-overlay").height(containerheight);
		$(".container-overlay").addClass("disabled");
        
        currentPop = getPopIndex("pop_"+boxId);
       
		$("#pop_"+boxId).fadeIn( 300, function() {
			
		});
	});

	$(".container-overlay, .closeIcon").click(function(){
		$("body").css("overflow-y","auto");
        currentPop = undefined;
		$(".container-overlay").removeClass("disabled"); 
		$(".sessionDescBox").fadeOut(300, function() {});
	});

    // Key Event
    $("body").keydown(function(e) {
        if(e.keyCode == 27) { //escape
            $("body").css("overflow-y","auto");
            $(".container-overlay").removeClass("disabled"); 
            $(".sessionDescBox").fadeOut(300, function() {});
        }
        else if(e.keyCode == 37){
            moveLeft();
        }
        else if(e.keyCode == 39){
            moveRight();
        }
    });
    
	/*-- Mobile Navigation --*/
	$(function(){
		$( "body" ).on( "swiperight", swipeRightHandler );
		$( "body" ).on( "swipeleft", swipeLeftHandler );
		
		function swipeRightHandler( event ){
			$(".mobileNav").animate({left:'0px'},100);
			menu_status="opened";
		}

		function swipeLeftHandler( event ){
			$(".mobileNav").animate({left:'-230px'},100);
			menu_status="closed";
		}
	});

	$(".menu").click(function(){
		toggleMenu();
	});

	function toggleMenu(){
		if(menu_status=="closed"){
			$(".mobileNav").animate({left:'0px'},100);
			menu_status="opened";
		}else{
			$(".mobileNav").animate({left:'-230px'},100);
			menu_status="closed";
		}
	}

	/*-- Schedule Accordion Up --*/
	$(".showDesc").click(function(){
		$(this).next().slideToggle();
		var icon = $(this).find("i");
		if($(icon).hasClass("icon-chevron-up")){
			$(icon).removeClass("icon-chevron-up");
		}else{
			$(icon).addClass("icon-chevron-up");
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