(function($) {
	   	//Default settings
	    var methods = {
        	init: function(options) {
        			var defaults = {
				        pageviews: 1,
				        timeonsite: 10000,
				        cookiename: "elvisHasLeft",
				        cookieexpire: 1, //in days
				        
				        /*Simple Modal Settings*/
				        simpleModal: 0,
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
		      		elvisDanceFloor(settings);
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
				$.error( 'Method ' +  method + ' does not exist on jQuery.Elvis' );
				return this;
			}
	 	}
		
		
		
		// Create a private function by creating a public variable within our plugin's container.
		var elvisDanceFloor = function(settings) {
		   		if (settings.simpleModal==1){
		        	 $("#"+settings.simpleModalID).addClass( "md-effect-"+settings.simpleModalEffect );
		        	 simpleModal(settings);
		        }
		        
		        if (settings.googleForm==1){
		        	$("#"+settings.googleFormContainerID).addClass( "md-effect-"+settings.googleFormModalEffect );
		       		googleForm(settings);
		        }
		        
		        if (settings.mailchimpForm==1){
		        	$("#"+settings.mailchimpContainerID).addClass( "md-effect-"+settings.mailchimpFormModalEffect );
		        	mailchimpForm(settings);
		        }
		}
		
		
		
		var simpleModal = function(settings) {
					if(settings.timeonsite>0){
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
								if (counting>=settings.timeonsite){   //If time on site is more than 20000 miliseconds aka 20 seconds
									var pageviews = $.cookie('trackPageViews');
									pageviews = eval(pageviews);  
									if (pageviews==settings.pageviews){ // If user has more than 2 pageviews
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
			        
			       
			       if(settings.pageviews>1){
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
							if($.cookie('trackPageViews')>=settings.pageviews){
								if($.cookie('trackTimeOnSite')>=settings.timeonsite){
									if (!from || from.nodeName == "HTML") {
											$("#"+settings.simpleModalID).addClass("md-show");
											$.cookie('elvisHasLeft', '1', { expires: 1 });
																			}
								}
							}
						}
					});
						/*Close modal*/
					$( "button.md-close" ).click(function() {
				    	$("#"+settings.simpleModalID).removeClass("md-show");
					});
				};	
		
		
		var googleForm = function(settings) {
					if(settings.timeonsite>0){
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
								if (counting>=settings.timeonsite){   //If time on site is more than 20000 miliseconds aka 20 seconds
									var pageviews = $.cookie('trackPageViews');
									pageviews = eval(pageviews);  
									if (pageviews==settings.pageviews){ // If user has more than 2 pageviews
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
			        
			       
			       if(settings.pageviews>1){
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
							if($.cookie('trackPageViews')>=settings.pageviews){
								if($.cookie('trackTimeOnSite')>=settings.timeonsite){
									if (!from || from.nodeName == "HTML") {
										$("#"+settings.googleFormContainerID).addClass("md-show");
										$.cookie('elvisHasLeft', '1', { expires: 1 });
									}
								}
							}
						}
					});
					
					/*Submit Google Form via ajax*/
					$("#"+settings.googleFormID).submit(function (e) {
					    var answer = $('[name="'+settings.googleFormAnswerName+'"]:checked').val();
					    if(answer == "Other"){
					    	answer ="__other_option__";
					    	var otherAnswer = $('[name="'+settings.googleFormAnswerName+'.other_option_response"]').val();
					    }
					    if (answer !== "") {
					        $.ajax({
					            url: "https://docs.google.com/forms/d/1hcxLwgDr7LwYPXbOBDiMqi_Gebh2GXKDTrZD3nZKV-Q/formResponse",
					            data: {"entry.215041315" : answer, "entry.215041315.other_option_response" : otherAnswer},// data: {"entry.215041315" : answer, "entry.3" : email, "entry.4": feed},
					            type: "POST",
					            dataType: "xml",
					            statusCode: {
					                0: function (){
					                    $("#"+settings.googleFormContainerID).removeClass("md-show");
					                    $("#"+settings.googleFormID)[0].reset();
					                },
					                200: function (){
					                   $("#"+settings.googleFormContainerID).removeClass("md-show");
					                    $("#"+settings.googleFormID)[0].reset();
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
				   $("#"+settings.googleFormContainerID).removeClass("md-show");
				});
				};	
			
			var mailchimpForm = function(settings) {
					if(settings.timeonsite>0){
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
								if (counting>=settings.timeonsite){   //If time on site is more than 20000 miliseconds aka 20 seconds
									var pageviews = $.cookie('trackPageViews');
									pageviews = eval(pageviews);  
									if (pageviews==settings.pageviews){ // If user has more than 2 pageviews
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
			        
			       
			       if(settings.pageviews>1){
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
							if($.cookie('trackPageViews')>=settings.pageviews){
								if($.cookie('trackTimeOnSite')>=settings.timeonsite){
									if (!from || from.nodeName == "HTML") {
											$("#"+settings.mailchimpContainerID).addClass("md-show");
											$.cookie('elvisHasLeft', '1', { expires: 1 });
									}
								}
							}
						}
					});
					
					$(settings.mailchimpFormID).submit(function (e) {
					    e.preventDefault();
						$.ajax({
					        url: mailchimpListUrl,
					        type: 'GET',
					        data: $(settings.mailchimpFormID).serialize(),
					        dataType: 'json',
					        contentType: "application/json; charset=utf-8",
					        success: function (data) {
					           if (data['result'] != "success") {
					                //ERROR
					                console.log(data['msg']);
					           } else {
					                $("#"+settings.mailchimpContainerID).removeClass("md-show");
					                $(settings.mailchimpFormID)[0].reset();
					           }
					        }
					    });
					});
						/*Close modal*/
					$( "button.md-close" ).click(function() {
					 	  $("#"+settings.mailchimpContainerID).removeClass("md-show");
					 
					});
				};	

})(jQuery);
