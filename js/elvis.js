$(document).idle({
	 /*onIdle: function(){
		  var elvisIsIdle = $.cookie('elvisIsIdle');
		  if(elvisIsIdle!=1){
			$("#modal-3").addClass("md-show");
			$.cookie('elvisIsIdle', '1', { expires: 1 });
		  }
	  },*/
	  onActive: function(){
	  	setTimeout(function(){
		  var elvisIsAlive = $.cookie('elvisIsAlive');
		  if(elvisIsAlive!=1){
			$("#modal-3").addClass("md-show");
			$.cookie('elvisIsAlive', '1', { expires: 1 });
		  }
		 }, 250);
	  },
	  /* onHide: function(){
		 var kingIsDead = $.cookie('kingIsDead');
		 if(kingIsDead!=1){
			$("#modal-3").addClass("md-show");
			$.cookie('kingIsDead', '1', { expires: 1 });
		 }
	  },*/
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

$( "button.md-close" ).click(function() {
 $("#modal-3").removeClass("md-show");
});


	
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
	var elvisHasLeft = $.cookie('elvisHasLeft');
	if(elvisHasLeft!=1){
		if (!from || from.nodeName == "HTML") {
			$("#modal-3").addClass("md-show");
			$.cookie('elvisHasLeft', '1', { expires: 1 });
		}
	}
});