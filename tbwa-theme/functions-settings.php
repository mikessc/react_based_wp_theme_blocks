<?php



////////////////////
//  Add admin menu under Settings
add_action('admin_menu', function () {
	$submenu = add_submenu_page(
		'options-general.php',
		'TBWA Theme',
		'TBWA Theme',
		'manage_options',
		'tbwa_theme_settings',
		'tbwa_theme_settings_settings_page'
	);
});

function tbwa_theme_settings_settings_page() {
	?>
	<div id="tbwa-theme-settings-settings-page"></div>
	<?php
}

////////////////////
//  Register settings
function tbwa_theme_settings_register() {

	// Log to check if this function is called
    error_log('tbwa_theme_settings_register called');

	//  Booleans
	$args = [
		'default' => true, 
		'show_in_rest' => true, 
		'type' => 'boolean', 
		'sanitize_callback' => 'rest_sanitize_boolean'
	];
	register_setting('general', 'tbwa_theme_meta_tags_enabled', $args);
	register_setting('general', 'tbwa_theme_page_transition_enabled', $args);
	register_setting('general', 'tbwa_theme_parallax_enabled', $args);
	register_setting('general', 'tbwa_theme_smooth_scroll_enabled', $args);
	register_setting('general', 'tbwa_theme_cookie_notification_enabled', $args);
	register_setting('general', 'tbwa_theme_google_analytics_enabled', $args);
	register_setting('general', 'tbwa_theme_scrolling_auto_next_enabled', $args);
	add_option('tbwa_theme_scrolling_auto_next_enabled', true, '', 'yes');
	
	$args = [
		'default' => false, 
		'show_in_rest' => true, 
		'type' => 'boolean', 
		'sanitize_callback' => 'rest_sanitize_boolean'
	];
	register_setting('general', 'tbwa_theme_under_maintenance_enabled', $args);

	//  String
	$args = [
		'default' => true, 
		'show_in_rest' => true, 
		'type' => 'string' 
	];
	register_setting('general', 'tbwa_theme_google_analytics_id', $args);
	register_setting('general', 'tbwa_theme_map_update_data_username', $args);
	register_setting('general', 'tbwa_theme_mapbox_access_token', $args);
	register_setting('general', 'tbwa_theme_mailchimp_api_key', $args);
	register_setting('general', 'tbwa_theme_mailchimp_audience_id', $args);
	register_setting('general', 'tbwa_theme_compass_token', $args);
	register_setting('general', 'tbwa_theme_font_family', $args);

	//  Password
	$args = [
		'default' => true, 
		'show_in_rest' => true, 
		'type' => 'string', 
		'sanitize_callback' => 'tbwa_theme_settings_sanitize_password'
	];
	register_setting('general', 'tbwa_theme_map_update_data_password', $args);

}
function tbwa_theme_settings_sanitize_password($input) {
	return wp_hash_password($input);
}
add_action('init', 'tbwa_theme_settings_register');


////////////////////
//  Add classes to the body tag, so JavaScript and CSS know these features are enabled
function tbwa_theme_settings_enabled_classes() { 

	$classes = [];

	//  Disable fancy features in very old IE
	$isIE = false;
	$ua = $_SERVER['HTTP_USER_AGENT'];
	if (strpos($ua, 'MSIE ') !== FALSE || strpos($ua, 'Trident/') !== FALSE) { 
		$isIE = true;
	}

	if (rest_sanitize_boolean(get_option('tbwa_theme_meta_tags_enabled'))) { 
		$classes[] = 'tbwa-meta-tags-enabled';
	}
	if (!$isIE) { 
		if (rest_sanitize_boolean(get_option('tbwa_theme_page_transition_enabled'))) { 
			$classes[] = 'tbwa-page-transition-enabled';
		}
		if (rest_sanitize_boolean(get_option('tbwa_theme_parallax_enabled'))) { 
			$classes[] = 'tbwa-parallax-enabled';
		}
		if (rest_sanitize_boolean(get_option('tbwa_theme_smooth_scroll_enabled'))) { 
			$classes[] = 'tbwa-smooth-scroll-enabled';
		}
	}
	if (rest_sanitize_boolean(get_option('tbwa_theme_cookie_notification_enabled'))) { 
		$classes[] = 'tbwa-cookie-notification-enabled';
	}
	if (rest_sanitize_boolean(get_option('tbwa_theme_google_analytics_enabled'))) { 
		$classes[] = 'tbwa-google-analytics-enabled';
	}
	if (rest_sanitize_boolean(get_option('tbwa_theme_scrolling_auto_next_enabled'))) { 
		$classes[] = 'tbwa-scrolling-auto-next-enabled';
	}
	if ( post_password_required() ) {
			$classes[] = 'password-protected';
			return $classes;
	}
	if (WP_DEBUG) { 
		$classes[] = 'wp-debug';
	}
	return $classes;
}
function tbwa_theme_settings_apply_to_admin($classes) { 
	return $classes.' '.implode(' ', tbwa_theme_settings_enabled_classes()).' ';
}
function tbwa_theme_settings_apply_to_frontend($classes) { 
	return array_merge($classes, tbwa_theme_settings_enabled_classes());
}
add_filter('admin_body_class', 'tbwa_theme_settings_apply_to_admin');
add_filter('body_class',       'tbwa_theme_settings_apply_to_frontend');


////////////////////
//  Pass data from php to JavaScript
add_action('init', function () { 
	$tbwaThemeSettings = array(
		'googleAnalyticsID' => strip_tags(get_option('tbwa_theme_google_analytics_id')), 
		'mapBoxAccessToken' => strip_tags(get_option('tbwa_theme_mapbox_access_token')),
		'mailchimpAPIkey' => strip_tags(get_option('tbwa_theme_mailchimp_api_key')),
		'mailchimpAudienceID' => strip_tags(get_option('tbwa_theme_mailchimp_audience_id')),
		'compassToken' => strip_tags(get_option('tbwa_theme_compass_token')),
		'fontFamily' => strip_tags(get_option('tbwa_theme_fontFamily')),
		'scrollingAutoNext' => get_option('tbwa_theme_scrolling_auto_next_enabled'),
	);
	wp_register_script('tbwa-theme-settings-script', '');
	wp_enqueue_script('tbwa-theme-settings-script');
	wp_add_inline_script('tbwa-theme-settings-script', 'var tbwaThemeSettings = '.wp_json_encode($tbwaThemeSettings), 'before');
});


////////////////////
//  Tidy up the default Wordpress Sitemaps
add_filter('wp_sitemaps_post_types', function($post_types) {
	unset($post_types['post']);
	return $post_types;
});
add_filter('wp_sitemaps_taxonomies', function($taxonomies) {
	return array();
});
add_filter('wp_sitemaps_add_provider', function($provider, $name) {
	if ( 'users' === $name ) {
		return false;
	}
	return $provider;
}, 10, 2);
add_filter('wp_sitemaps_posts_query_args', function($args, $post_type) {
	if ('page' !== $post_type) {
		return $args;
	}
	$args['post__not_in'] = isset( $args['post__not_in'] ) ? $args['post__not_in'] : array();

	$page = get_page_by_path('under-maintenance');
	if ($page) { 
		$args['post__not_in'][] = $page->ID;
	}

	$page = get_page_by_path('page-not-found');
	if ($page) { 
		$args['post__not_in'][] = $page->ID;
	}

	return $args;
}, 10, 2);


////////////////////























