<?php

//  404
http_response_code(404);

//  If an image is not found
if (isset($_SERVER['REQUEST_URI'])) { 
	$a = pathinfo($_SERVER['REQUEST_URI']);
	if (isset($a['extension'])) { 
		if ($a['extension'] == 'png' || $a['extension'] == 'jpg' || $a['extension'] == 'gif') { 
			header('Location: '.get_stylesheet_directory_uri().'/static/blank.gif');
			exit;
		} 
	}
}

//  Other
header('Location: /page-not-found/');


