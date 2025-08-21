<?php


/*

////////////////////
function tbwa_map_data_update() {

	//  This probably isn't the greatest URL to use. 
	//  /api/map-update-data 
	if (str_starts_with($_SERVER["REQUEST_URI"], '/api/map-update-data')) {

		//  Incoming basic authentication values
		$incoming_username = $_SERVER['PHP_AUTH_USER'];
		$incoming_password = $_SERVER['PHP_AUTH_PW'];

		//  Saved values
		$saved_username = get_option('tbwa_theme_map_update_data_username');
		$saved_password_hash = get_option('tbwa_theme_map_update_data_password');

		//  Standard wordpress hasher
		global $wp_hasher;
		if (empty($wp_hasher)) {
			require_once ABSPATH . WPINC . '/class-phpass.php';
			$wp_hasher = new PasswordHash( 8, true );
		}

		//  Validate
		$valid = true;
		if (!isset($incoming_username)) {
			$valid = false;
		} else if ($incoming_username != $saved_username) {
			$valid = false;
		} else if (!$wp_hasher->CheckPassword($incoming_password, $saved_password_hash)) {
			$valid = false;
		}

		//  Invalid credentials
		if (!$valid) { 
			header('WWW-Authenticate: Basic realm="tbwacomstg"');
			header('HTTP/1.0 401 Unauthorized');
			echo 'Access Denied';
			exit;
		}

		//  Valid credentials 

		//  Dump this to an email for testing
		$to = 'david.colquhoun@tbwa.com';
		$subject = 'Map Update Data';
		$body = 'The email body content';
		ob_start();
		echo '_SERVER'."\n";
		print_r($_SERVER);
		echo "\n\n\n";
		echo '_POST'."\n";
		print_r($_POST);
		echo "\n\n\n";
		echo '_GET'."\n";
		print_r($_GET);
		echo "\n\n\n";
		echo '_FILES'."\n";
		print_r($_FILES);
		echo "\n\n\n";
		$body = ob_get_clean();
		$headers = array();
		wp_mail($to, $subject, $body, $headers);

		//  No error response
		echo "&error=false&error_message=&";
		exit();

	}
}
add_action('parse_request', 'tbwa_map_data_update');


*/
















