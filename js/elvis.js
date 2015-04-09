/*Track Time On Site*/
var checkTimeCook = $.cookie('trackTimeOnSite');
if (!checkTimeCook){
	var startTime = new Date();        //Start the clock for first visit 
	window.onbeforeunload = function() //When the user leaves the page(closes the window/tab, clicks a link)...
	{
	    var endTime = new Date();        //Get the current time
	    var timeSpent = endTime - startTime;
	    $.cookie('trackTimeOnSite', timeSpent, { expires: 1 });
	}
} else {
	var countTimeOnSite = setInterval(function(){ //On second page add 5 seconds and store to cookie
		var spentOnPage = $.cookie('trackTimeOnSite');
		spentOnPage = eval(spentOnPage);
		var counting = spentOnPage+5000;
		if (counting>=20000){   //If time on site is more than 20000 miliseconds aka 20 seconds
			var pageviews = $.cookie('trackPageViews');
			pageviews = eval(pageviews);  
			if (pageviews==2){ // If user has more than 2 pageviews
				clearInterval(countTimeOnSite); //Stop adding minutes
			}
		}
		$.removeCookie('trackTimeOnSite', { path: '/' });
		$.cookie('trackTimeOnSite',counting,1);
	},5000);//Calculate every 5 seconds
}
					

/*Track Pageviews*/
var checkTrackCook = $.cookie('trackPageViews');
if (!checkTrackCook) {
	$.cookie('trackPageViews', 1, 1); //Store first pageview for one day
} else {
	var pageviews = $.cookie('trackPageViews');
	pageviews = eval(pageviews);
	if (pageviews==1) {
		var newpageviews = pageviews+1;
		$.removeCookie('trackPageViews', { path: '/' });
		$.cookie('trackPageViews',newpageviews, 1); //Add every pageview for one day
	}
}

/*
$(document).idle({
	 onIdle: function(){
		  var elvisIsIdle = $.cookie('elvisIsIdle');
		  if(elvisIsIdle!=1){
			$("#modal-3").addClass("md-show");
			$.cookie('elvisIsIdle', '1', { expires: 1 });
		  }
	  },
	  onActive: function(){
	  	setTimeout(function(){
		  var elvisIsAlive = $.cookie('elvisIsAlive');
		  if(elvisIsAlive!=1){
			$("#modal-3").addClass("md-show");
			$.cookie('elvisIsAlive', '1', { expires: 1 });
		  }
		 }, 250);
	  }
	  onHide: function(){
		 var kingIsDead = $.cookie('kingIsDead');
		 if(kingIsDead!=1){
			$("#modal-3").addClass("md-show");
			$.cookie('kingIsDead', '1', { expires: 1 });
		 }
	  },
	  onShow: function(){
		setTimeout(function(){
		     var kingIsAlive = $.cookie('kingIsAlive');
			 if(kingIsAlive!=1){
				$("#modal-3").addClass("md-show");
				$.cookie('kingIsAlive', '1', { expires: 1 });
			 }
		}, 250);
	  },
	  idle: 5000
});
*/

function addEvent(obj, evt, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	}
	else if (obj.attachEvent) {
		obj.attachEvent("on" + evt, fn);
	}
}

addEvent(document, "mouseout", function(e) {
	e = e ? e : window.event;
	var from = e.relatedTarget || e.toElement;
	if( $.cookie('elvisHasLeft')!=1){
		if($.cookie('trackPageViews')>=2){
			if($.cookie('trackTimeOnSite')>=20000){
				if (!from || from.nodeName == "HTML") {
					$("#modal-gform").addClass("md-show");
					$.cookie('elvisHasLeft', '1', { expires: 1 });
				}
			}
		}
	}
});



function postContactToGoogle(){
    var answer = $('[name="elvisSong"]:checked').val();
    if(answer == "Other"){
    	answer ="__other_option__";
    	var otherAnswer = $('[name="elvisSong.other_option_response"]').val();
    }
    if (answer !== "") {
        $.ajax({
            url: "https://docs.google.com/forms/d/<form-id>/formResponse",
            data: {"entry.1" : answer, "entry.2.other_option_response" : otherAnswer},// data: {"entry.1" : answer, "entry.3" : answer2, "entry.4": answer3},
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function (){
                    $("#modal-gform").removeClass("md-show");
                    $('#elvis-gform')[0].reset();
                },
                200: function (){
                   $("#modal-gform").removeClass("md-show");
                    $('#elvis-gform')[0].reset();
                }
            }
        });
    }
    else {
        //Error message
    }
}


$( "button.md-close" ).click(function() {
   $("#modal-3").removeClass("md-show");
   $("#modal-gform").removeClass("md-show");
});

