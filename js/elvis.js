$(document).idle({
	  onIdle: function(){
		alert("Idle");
	  },
	  onActive: function(){
		alert("Active");
	  },
	  onHide: function(){
		alert("Hidden");
	  },
	  onShow: function(){
		// Add a slight pause so you can see the change
		setTimeout(function(){
		  $('#visibility').toggleClass('idle').html('Visible!');
		}, 250);
	  },
	  idle: 3000
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
	if (!from || from.nodeName == "HTML") {
		//alert("the cursor has left the building");
	}
});
