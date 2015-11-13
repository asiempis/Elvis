#Elvis (has left the building)

Detect Exit Intent of a user. 

Detect if user leaves your website and notify her/him with a Simple Modal, a Google Form Survey or a Mailchimp Sign Up Form.

Very easy to implement. 

Just set Pageviews, Time on site, Cookie name, Cookie expiration time, Modal type, Modal's container id and Modal effect.

For Simple Modal just give Elvis modal's container id and modal effect.

For Google Forms Survey give Elvis Google Forms Post Url and answer's name.

For Mailchimp Sign Up form give Elvis Mailchimp Form Post Url and add your Mailchimp API key and list's id to inc/mailchimp.php file.


##Installation
Include the scripts:
```
<!-- jQuery Library e.g. -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<!-- Cookie.js -->
<script type="text/javascript" src="js/jquery.cookie.js"></script>
<!-- classie.js by @desandro: https://github.com/desandro/classie -->
<script src="js/classie.js"></script>
<!-- modalEffects.js -->
<script src="js/modalEffects.js"></script>
<script src="js/jquery.validate.min.js"></script>
<!-- Elvis.js -->
<script type="text/javascript" src="js/elvis.js"></script>
<!-- init.js -->
<script type="text/javascript" src="js/init.js"></script>
```

Simple Modal
------------
```
/* Simple Modal Init*/
$(this).elvis({
	pageviews: 1, //positive integer
  timeonsite: 0,//in miliseconds
  cookiename: "simpleModal",
  cookieexpire: 2, //in days
  modalType:"simpleModal",
  modalID:"modal-elvis",
	modalEffect: 4,
});
```
Google Form Modal
-----------------
```
/*Google Form Modal Init*/

$(this).elvis({
	pageviews: 1,//positive integer
  imeonsite: 1,//in miliseconds
  cookiename: "googleForm",
	cookieexpire: 1, //in days
	modalType:"gform",
	modalID:"modal-gelvisform",
	modalEffect: 2,
	/*Google Form Modal Required Settings
	googleFormActionUrl: "GOOGLE FORM POST URL",
	/* e.g. googleFormActionUrl: "https://docs.google.com/forms/d/asdasdasdasdasdasd21asdasda4sd5asd1a/formResponse",*/
  googleFormAnswerName: "elvisSong2",
});
```
Mailchimp Form Modal
--------------------
```
$(this).elvis({
  pageviews: 1,//positive integer
  timeonsite: 0,//in miliseconds
  cookiename: "mailchimpForm",
	cookieexpire: 1, //in days
	modalID:"modal-elvischimp",
	modalEffect: 15,
	modalType:"chimpform",
	/*Mailchimp Subscription Form Required Settings*/
  mailchimpListUrl: "MAILCHIMP FORM POST URL WITHOUT HTTP OR HTTPS. ADD &c=? AT THE END"
  /*e.g. mailchimpListUrl: "//MAILCHIMPLIST.us10.list-manage.com/subscribe/post-json?u=daa501223545be03a469a8f78&amp;id=c15s4da4c&c=?"*/
});       

```
This plugin is a combination of:

- [jQuery-cookie.js](https://github.com/carhartl/jquery-cookie)
- [Codrops ModalWindowEffects](https://github.com/codrops/ModalWindowEffects)
- Pure JavaScript

##Changelog

###0.5.0
--------
Google Forms and Mailchimp integration
###0.1.0
--------
First beta version
