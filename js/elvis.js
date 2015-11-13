(function($) {
	   	//Default settings
	    var methods = {
        	init: function(options) {
        			var defaults = {
				        pageviews: 1, //positive integer
				        timeonsite: 10000, //in miliseconds
				        cookiename: "elvisHasLeft", //Name your modal cookie
				        cookieexpire: 1, //in days
				        modalType: "simpleModal", //Choose between simpleModal, gform or chimpform
				        modalID:"modal-elvis", //Modal Container ID
				        modalEffect: 1, // Choose between 19 effects Demo: http://tympanus.net/Development/ModalWindowEffects
				        
				        /*Google Form Modal Settings*/
				        googleFormAnswerName: "Google Form Answer Input name",
				        googleFormActionUrl:"Google Form Action URL",
				        /*Mailchimp Subscription Form*/
				      	mailchimpListUrl: "Mailchimp Form URL"
			        };
		          	var settings = $.extend( {}, defaults, options );
		          	
		          	if (settings.modalType=="simpleModal"||settings.modalType=="gform"||settings.modalType=="chimpform"){
			          		if (settings.modalType=="gform") {
					          	if ((settings.googleFormAnswerName==defaults.googleFormAnswerName)||(settings.googleFormActionUrl==defaults.googleFormActionUrl)){
					          		$.error( 'Please fill required settings for using ' +  settings.modalType + ' type on Elvis.js' );
									return this;
					          	}
					      	} else if (settings.modalType=="chimpform") {
					         	if (settings.mailchimpListUrl==defaults.mailchimpListUrl){
					          		$.error( 'Please fill required settings for using ' +  settings.modalType + ' type on Elvis.js' );
									return this;
					          	}
					       }
					       elvisDanceFloor(settings);
		          	} else {
		          		$.error( 'Modal Type ' +  settings.modalType + ' does not exist on Elvis.js' );
						return this;
		          	}
		    },
	        destroy : function( ) {    },// IS
	    };
        
        
        $.fn.elvis = function() {
			var method = arguments[0];
	
			// Check if the passed method exists
			if(methods[method]) {
				// If the method exists, store it for use
				// Note: I am only doing this for repetition when using "each()", later.
				method = methods[method];
	 		// If the method is not found, check if the method is an object (JSON Object) or one was not sent.
			} else if( typeof(method) == 'object' || !method ) {
	 			// If we passed parameters as the first object or no arguments, just use the "init" methods
				return methods.init.apply( this, arguments );
			} else {
	 			// Not a method and not parameters, so return an error.  Something wasn't called correctly.
				$.error( 'Method ' +  method + ' does not exist on Elvis.js' );
				return this;
			}
	 	}
		
		
		
		// Create a private function by creating a public variable within our plugin's container.
		var elvisDanceFloor = function(settings) {
   			$("#"+settings.modalID).addClass( "md-effect-"+settings.modalEffect );
       		trackTimeonSite(settings.timeonsite,settings.pageviews);
   			trackPageViews(settings.pageviews);
   			kingIsAlive(settings);
	   	    if (settings.modalType=="gform"){
	   	   	 	googleForm(settings.modalID,settings.googleFormActionUrl,settings.googleFormAnswerName);
	   	    } else if(settings.modalType=="chimpform") {
	       		mailchimpForm(settings.modalID,settings.mailchimpListUrl);
	        }
	   }
		
		
		
		var trackTimeonSite = function(timeonsite,pageviews){
			if(timeonsite>0){
	        	/*Track Time On Site*/
				var checkTimeCook = $.cookie('trackTimeOnSite');
				if (!checkTimeCook){
					var startTime = new Date();        //Start the clock for first visit on website
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
						var counting = spentOnPage+3000;
						if (counting>=timeonsite){   //If time on site is more than 20000 miliseconds aka 20 seconds
							var pageviews = $.cookie('trackPageViews');
							pageviews = eval(pageviews);  
							if (pageviews==pageviews){ // If user has more than 2 pageviews
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
		};
		
		
		var trackPageViews = function(pageviews){
			if(pageviews>1){
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
		};
		
		
		
		var kingIsAlive = function(settings){
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
				if( $.cookie(settings.cookiename)!=1){
					if($.cookie('trackPageViews')>=settings.pageviews){
						if($.cookie('trackTimeOnSite')>=settings.timeonsite){
							if (!from || from.nodeName == "HTML") {
							    $("#"+settings.modalID).addClass("md-show");
								$.cookie(settings.cookiename, '1', { expires: settings.cookieexpire });
							}
						}
					}
				}
			});
			/*Close modal*/
			$( ".md-close" ).click(function() {
		    	$("#"+settings.modalID).removeClass("md-show");
			});
		};
		
		
		var googleForm = function(modalID,googleFormActionUrl,googleFormAnswerName) {
				/*Submit Google Form via ajax*/
				$("#"+modalID+" form").submit(function (e) {
				    var answer = $('[name="'+googleFormAnswerName+'"]:checked').val();
				    if(answer == "Other"){
				    	answer ="__other_option__";
				    	var otherAnswer = $('[name="'+googleFormAnswerName+'.other_option_response"]').val();
				    }
				    if (answer !== "") {
				        $.ajax({
				            url: googleFormActionUrl,
				            data: {"entry.215041315" : answer, "entry.215041315.other_option_response" : otherAnswer},// data: {"entry.215041315" : answer, "entry.3" : email, "entry.4": feed},
				            type: "POST",
				            dataType: "xml",
				            statusCode: {
				                0: function (){
				                    $("#"+modalID).removeClass("md-show");
				                    $("#"+modalID+" form")[0].reset();
				                },
				                200: function (){
				                   $("#"+modalID).removeClass("md-show");
				                    $("#"+modalID+" form")[0].reset();
				                }
				            }
				        });
				    }
				    else {
				        //Error message
				    }
				});
			};	
			
         
            var mailchimpForm = function(modalID,mailchimpListUrl) {
				$("#"+modalID+" form").submit(function (e) {
					e.preventDefault();
					var email = jQuery("#email").val();
					var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
					
					if (email==0){
						 $('#notification_container').html('Πρέπει να συμπληρώσετε το email σας.');
						 return false;
					} else {
						if(!pattern.test(email)){
					  	 	$('#notification_container').html('Το email σας δεν είναι σωστό');
					   		return false;
						}
					}
					
					$.ajax({
				        url: './inc/mailchimp.php',
				        type: 'POST',
				        data: { email: email },
				        async: true,
				        error: function(err) { $('#notification_container').html('<span class="alert">Could not connect to server. Please try again later.</span>'); },
				        success: function (data) {
				        	//$('#notification_container').html(data);
				        	$("#"+modalID).removeClass("md-show");
						}
				    });
				});
			};
            
            
            /*
			var mailchimpForm = function(modalID,mailchimpListUrl) {
				$("#"+modalID+" form").submit(function (e) {
				    e.preventDefault();
					$.ajax({
				        url: mailchimpListUrl,
				        type: 'POST',
				        data: $("#"+modalID+" form").serialize(),
				        dataType: 'json',
				        cache: false,
				        contentType: "application/json; charset=utf-8",
				        error: function(err) { $('#notification_container').html('<span class="alert">Could not connect to server. Please try again later.</span>'); },
				        success: function (data) {
				            if (data.result != "success") {
						        var message = data.msg;
						        $('#notification_container').html('<span class="alert">'+message+'</span>');
						      } 
						      else {
						        var message = data.msg;
						        $('#notification_container').html('<span class="success">'+message+'</span>');
						      }
				        }
				    });
				});
			};	
			*/

})(jQuery);
