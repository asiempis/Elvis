<?php 
	require_once 'MCAPI.class.php';
	$apikey = 'YOUR MAILCHIMP API KEY';
	$listId = 'LIST ID';
	$apiUrl = 'http://api.mailchimp.com/1.3/';
	
	$email = $_POST['email'];
	
	$api = new MCAPI($apikey);
	
	$merge_vars = null;
	if($email !== '') {
	  $return_value = $api->listSubscribe( $listId, $email, $merge_vars, 'html', false, true );
	  // check for error code
	  if ($api->errorCode){
	      echo "<p>Error: $api->errorCode, $api->errorMessage</p>";
	  } else {
	      echo '<p>Please check your inbox.</p>';
	  }
	}
?>