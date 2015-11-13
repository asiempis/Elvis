/*Track Time On Site*/
var checkTimeCook = $.cookie('trackTimeOnSite');
if (!checkTimeCook){
	var startTime = new Date();        //Start the clock for first visit on Pennie.gr
	window.onbeforeunload = function() //When the user leaves the page(closes the window/tab, clicks a link)...
	{
	    var endTime = new Date();        //Get the current t(function($) {
	$.fn.elvis = function(options) {
		 //Default settings
	    var defaults = {
	        pageviews: "1",
	        timeonsite: "10000",
	        
	        /*Simple Modal Settings*/
	        simpleModal: 1,
	        simpleModalID:"modal-elvis",
	        simpleModalEffect:"1",
	         
	        /*Google Form Modal Settings*/
	        googleForm: 0,
	        googleFormContainerID: "modal-elvisGoogleForm",
	        googleFormID: "elvis-googleform",
	        googleFormAnswerName: "elvisSong",
	        googleFormModalEffect:"1",
	        
	        /*Mailchimp Subscription Form*/
	        mailchimpForm:0,
	        mailchimpContainerID: "modal-elvisMailchimp",
        	mailchimpFormID: "elvis-mailchimpform",
        	mailchimpFormModalEffect:"2",
        	mailchimpListUrl: "Mailchimp Form URL"
        };
        
        var settings = $.extend( {}, defaults, options );
  
  
  
        
        var timeOnSite = settings.timeonsite;
        var userPageviews = settings.pageviews;
        if (settings.simpleModal==1){
        	 var modalID = "#"+settings.simpleModalID;
        	 $(modalID).addClass( "md-effect-"+settings.simpleModalEffect );
        }
        
        if (settings.googleForm==1){
        	var googleFormContainerID = "#"+settings.googleFormContainerID;
        	var formID = "#"+settings.googleFormID;
        	$(googleFormContainerID).addClass( "md-effect-"+settings.googleFormModalEffect );
       		var formAnswerName = settings.googleFormAnswerName;
        }
        
        if (settings.mailchimpForm==1){
        	var mailchimpContainerID = "#"+settings.mailchimpContainerID;
        	var mailchimpFormID = "#"+settings.mailchimpFormID;
        	$(mailchimpContainerID).addClass( "md-effect-"+settings.mailchimpFormModalEffect );
        }
        
        
        
        if(timeOnSite>0){
        	/*Track Time On Site*/
			var checkTimeCook = $.cookie('trackTimeOnSite');
			if (!checkTimeCook){
				var startTime = new Date();        //Start the clock for first visit on Pennie.gr
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
					if (counting>=timeOnSite){   //If time on site is more than 20000 miliseconds aka 20 seconds
						var pageviews = $.cookie('trackPageViews');
						pageviews = eval(pageviews);  
						if (pageviews==userPageviews){ // If user has more than 2 pageviews
							clearInterval(countTimeOnSite); //Stop adding minutes
						}
					}
					$.removeCookie('trackTimeOnSite', { path: '/' });
					$.cookie('trackTimeOnSite',counting,1);
				},5000);//Calculate every 5 seconds
			}
       } else {
       		$.cookie('trackTimeOnSite',1000,1);
       }
        
       
       if(userPageviews>1){
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
		} else {
       		$.cookie('trackPageViews',1,1);
        }
		
		
		/*Track if the cursor try to escape from King*/
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
				if($.cookie('trackPageViews')>=userPageviews){
					if($.cookie('trackTimeOnSite')>=timeOnSite){
						if (!from || from.nodeName == "HTML") {
							
							if (settings.googleForm==1){
								$(googleFormContainerID).addClass("md-show");
								$.cookie('elvisHasLeft', '1', { expires: 1 });
							}
							
							if (settings.simpleModal==1){
								$(modalID).addClass("md-show");
								$.cookie('elvisHasLeft', '1', { expires: 1 });
							}
							
							if (settings.mailchimpForm==1){
								$(mailchimpContainerID).addClass("md-show");
								$.cookie('elvisHasLeft', '1', { expires: 1 });
							}
							
						}
					}
				}
			}
		});
		
		
		
		$(mailchimpFormID).submit(function (e) {
		    e.preventDefault();
			$.ajax({
		        url: mailchimpListUrl,
		        type: 'GET',
		        data: $(mailchimpFormID).serialize(),
		        dataType: 'json',
		        contentType: "application/json; charset=utf-8",
		        success: function (data) {
		           if (data['result'] != "success") {
		                //ERROR
		                console.log(data['msg']);
		           } else {
		                $(mailchimpContainerID).removeClass("md-show");
		                $(mailchimpFormID)[0].reset();
		           }
		        }
		    });
		});
		
		
		/*Submit Google Form via ajax*/
		$(formID).submit(function (e) {
		    var answer = $('[name="'+formAnswerName+'"]:checked').val();
		    if(answer == "Other"){
		    	answer ="__other_option__";
		    	var otherAnswer = $('[name="'+formAnswerName+'.other_option_response"]').val();
		    }
		    if (answer !== "") {
		        $.ajax({
		            url: "https://docs.google.com/forms/d/1hcxLwgDr7LwYPXbOBDiMqi_Gebh2GXKDTrZD3nZKV-Q/formResponse",
		            data: {"entry.215041315" : answer, "entry.215041315.other_option_response" : otherAnswer},// data: {"entry.215041315" : answer, "entry.3" : email, "entry.4": feed},
		            type: "POST",
		            dataType: "xml",
		            statusCode: {
		                0: function (){
		                    $(googleFormContainerID).removeClass("md-show");
		                    $(formID)[0].reset();
		                },
		                200: function (){
		                   $(googleFormContainerID).removeClass("md-show");
		                    $(formID)[0].reset();
		                }
		            }
		        });
		    }
		    else {
		        //Error message
		    }
		});
		
		/*Close modal*/
		$( "button.md-close" ).click(function() {
		   if (settings.simpleModal==1){
			  $(modalID).removeClass("md-show");
		   }
		   if (settings.googleForm==1){
		   	  $(googleFormContainerID).removeClass("md-show");
		   }
		   if (settings.mailchimpForm==1){
			  $(mailchimpContainerID).removeClass("md-show");
		   }
		});
		
	};
})(jQuery);
ime
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

/*Track if the cursor try to escape from King*/
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


/*Submit Google Form via ajax*/
function postContactToGoogle(){
    var answer = $('[name="elvisSong"]:checked').val();
    if(answer == "Other"){
    	answer ="__other_option__";
    	var otherAnswer = $('[name="elvisSong.other_option_response"]').val();
    }
    if (answer !== "") {
        $.ajax({
            url: "https://docs.google.com/forms/d/1hcxLwgDr7LwYPXbOBDiMqi_Gebh2GXKDTrZD3nZKV-Q/formResponse",
            data: {"entry.215041315" : answer, "entry.215041315.other_option_response" : otherAnswer},// data: {"entry.215041315" : answer, "entry.3" : email, "entry.4": feed},
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

/*Close modal*/
$( "button.md-close" ).click(function() {
   $("#modal-3").removeClass("md-show");
   $("#modal-gform").removeClass("md-show");
});

