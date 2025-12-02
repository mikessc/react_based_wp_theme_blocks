<?php



////////////////////
//  Add admin menu under Settings
add_action('admin_menu', function () {
	$submenu = add_submenu_page(
		'options-general.php',
		'Color Settings',
		'Color Settings',
		'manage_options',
		'tbwa_theme_color_settings',
		'tbwa_theme_color_settings_page'
	);
});

function tbwa_theme_color_settings_page() {
	?>
	<div id="tbwa-theme-color-settings-page"></div>
	<?php
}

////////////////////
//  Register settings
function tbwa_theme_color_settings_register() {

	// Log to check if this function is called
    error_log('tbwa_theme_color_settings_register called');

	//  Booleans
	register_setting('general', 'tbwa_theme_color_invert_links', [
		'default' => false, 
		'show_in_rest' => true, 
		'type' => 'boolean', 
		'sanitize_callback' => 'rest_sanitize_boolean'
	]);

	register_setting('general', 'tbwa_theme_color_black', [
		'default' => '#0A0A0D', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);
	register_setting('general', 'tbwa_theme_color_white', [
		'default' => '#FFFFFF', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);
	register_setting('general', 'tbwa_theme_color_yellow', [
		'default' => '#FECC00', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);
	register_setting('general', 'tbwa_theme_color_yellow_inverted', [
		'default' => '#0133FF', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);
	register_setting('general', 'tbwa_theme_color_dark_grey', [
		'default' => '#4D4D4D', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);
	register_setting('general', 'tbwa_theme_color_light_grey', [
		'default' => '#BDBDBD', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);
	register_setting('general', 'tbwa_theme_color_error_red', [
		'default' => '#E45A3B', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);
	register_setting('general', 'tbwa_theme_color_legal_nav_grey', [
		'default' => '#868686', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);
	register_setting('general', 'tbwa_theme_color_white_hint', [
		'default' => '#868686', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);
	register_setting('general', 'tbwa_theme_color_white_hint', [
		'default' => '#000000', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);
	register_setting('general', 'tbwa_theme_color_white_disabled', [
		'default' => '#D0D0D0', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);
	register_setting('general', 'tbwa_theme_color_black_hint', [
		'default' => '#D0D0D0', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);
	register_setting('general', 'tbwa_theme_color_black_disabled', [
		'default' => '#4D4D4D', 
		'show_in_rest' => true, 
		'type' => 'string', 
	]);

}

add_action('init', 'tbwa_theme_color_settings_register');


add_action('wp_enqueue_scripts', function () {
	$tbwa_theme_color_black = get_option('tbwa_theme_color_black', '#0A0A0D');
	$tbwa_theme_color_white = get_option('tbwa_theme_color_white', '#FFFFFF');
	$tbwa_theme_color_yellow = get_option('tbwa_theme_color_yellow', '#FECC00');
	$tbwa_theme_color_yellow_inverted = get_option('tbwa_theme_color_yellow_inverted', '#0133FF');
	$tbwa_theme_color_dark_grey = get_option('tbwa_theme_color_dark_grey', '#4D4D4D');
	$tbwa_theme_color_light_grey = get_option('tbwa_theme_color_light_grey', '#BDBDBD');
	$tbwa_theme_color_error_red = get_option('tbwa_theme_color_error_red', '#E45A3B');
	$tbwa_theme_color_legal_nav_grey = get_option('tbwa_theme_color_legal_nav_grey', '#868686');
	$tbwa_theme_color_white_hint = get_option('tbwa_theme_color_white_hint', '#868686');
	$tbwa_theme_color_white_disabled = get_option('tbwa_theme_color_white_disabled', '#D0D0D0');
	$tbwa_theme_color_black_hint = get_option('tbwa_theme_color_black_hint', '#D0D0D0');
	$tbwa_theme_color_black_disabled = get_option('tbwa_theme_color_black_disabled', '#4D4D4D');
	$tbwa_theme_color_invert_links = get_option('tbwa_theme_color_invert_links', false);

    wp_register_style('tbwa-theme-color-settings-style', false);
    wp_enqueue_style('tbwa-theme-color-settings-style');

    $custom_css = ":root {
		--tbwa_theme_color_black: {$tbwa_theme_color_black};
		--tbwa_theme_color_white: {$tbwa_theme_color_white};
		--tbwa_theme_color_yellow: {$tbwa_theme_color_yellow};
		--tbwa_theme_color_yellow_inverted: {$tbwa_theme_color_yellow_inverted};
		--tbwa_theme_color_dark_grey: {$tbwa_theme_color_dark_grey};
		--tbwa_theme_color_light_grey: {$tbwa_theme_color_light_grey};
		--tbwa_theme_color_error_red: {$tbwa_theme_color_error_red};
		--tbwa_theme_color_legal_nav_grey: {$tbwa_theme_color_legal_nav_grey};
		--tbwa_theme_color_white_hint: {$tbwa_theme_color_white_hint};
		--tbwa_theme_color_white_disabled: {$tbwa_theme_color_white_disabled};
		--tbwa_theme_color_black_hint: {$tbwa_theme_color_black_hint};
		--tbwa_theme_color_black_disabled: {$tbwa_theme_color_black_disabled};
    }";

	if ($tbwa_theme_color_invert_links) {
		$custom_css .= "
		.wp-block-tbwa-blocks-button-cta {
			mix-blend-mode: difference;
		}
		";
	}
    
    wp_add_inline_style('tbwa-theme-color-settings-style', $custom_css);
});
