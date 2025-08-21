<?php
/**
 * Plugin Name:       TBWA Blocks 
 * Description:       Adds blocks used by the TBWA custom theme.
 * Requires at least: 6.0
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Digital Arts Network
 * Author URI:        https://www.dan.co.nz/
 * License:           
 * License URI:       
 * Text Domain:       tbwa-blocks-plugin
 */

//  Register the block category
function tbwa_block_category($categories, $context) {
	return array_merge(
		array(
			array('title' => 'TBWA Blocks', 'slug' => 'tbwa-blocks', 'icon' => null)
		),
		$categories
	);
}
add_filter('block_categories_all', 'tbwa_block_category', 10, 2);

//  Render call backs for dynamic blocks
require('dynamic-blocks/star-rating.php');
require('dynamic-blocks/work-categories.php');
require('dynamic-blocks/work-featured.php');
require('dynamic-blocks/work-hero.php');
require('dynamic-blocks/work-next.php');
require('dynamic-blocks/work-loop.php');
require('dynamic-blocks/leadership-loop.php');
require('dynamic-blocks/news-categories.php');
require('dynamic-blocks/news-featured.php');
require('dynamic-blocks/news-loop.php');
require('dynamic-blocks/search-loop.php');
require('dynamic-blocks/work-featured-loop.php');
require('dynamic-blocks/work-featured-loop-landscape.php');
//  Register the blocks
function tbwa_blocks_init() {
	register_block_type(plugin_dir_path(__FILE__).'build/button/');
	register_block_type(plugin_dir_path(__FILE__).'build/button-cta/');
	register_block_type(plugin_dir_path(__FILE__).'build/card/');
	register_block_type(plugin_dir_path(__FILE__).'build/card-container/');
	register_block_type(plugin_dir_path(__FILE__).'build/card-body/');
	register_block_type(plugin_dir_path(__FILE__).'build/card-label/');
	register_block_type(plugin_dir_path(__FILE__).'build/card-title/');
	register_block_type(plugin_dir_path(__FILE__).'build/card-text/');
	register_block_type(plugin_dir_path(__FILE__).'build/carousel/');
	register_block_type(plugin_dir_path(__FILE__).'build/carousel-item/');
	register_block_type(plugin_dir_path(__FILE__).'build/column-grid/');
	register_block_type(plugin_dir_path(__FILE__).'build/column-grid-item/');
	register_block_type(plugin_dir_path(__FILE__).'build/data-bite/');
	register_block_type(plugin_dir_path(__FILE__).'build/data-bite-container/');
	register_block_type(plugin_dir_path(__FILE__).'build/email-container/');	
	register_block_type(plugin_dir_path(__FILE__).'build/follow-cursor/');
	register_block_type(plugin_dir_path(__FILE__).'build/footer/');
	register_block_type(plugin_dir_path(__FILE__).'build/footer-content/');
	register_block_type(plugin_dir_path(__FILE__).'build/footer-buttons/');
	register_block_type(plugin_dir_path(__FILE__).'build/footer-button/');
	register_block_type(plugin_dir_path(__FILE__).'build/form-download/');
	register_block_type(plugin_dir_path(__FILE__).'build/form-emailed/');
	register_block_type(plugin_dir_path(__FILE__).'build/form-emailed-file/');
	register_block_type(plugin_dir_path(__FILE__).'build/form-emailed-local-storage/');
	register_block_type(plugin_dir_path(__FILE__).'build/form-sign-up/');
	register_block_type(plugin_dir_path(__FILE__).'build/form-pitch/');
	register_block_type(plugin_dir_path(__FILE__).'build/gallery/');
	register_block_type(plugin_dir_path(__FILE__).'build/gallery-item/');
	register_block_type(plugin_dir_path(__FILE__).'build/heading/');
	register_block_type(plugin_dir_path(__FILE__).'build/heading-circle/');
	register_block_type(plugin_dir_path(__FILE__).'build/heading-circle-container/');
	register_block_type(plugin_dir_path(__FILE__).'build/homepage-hero/');
	register_block_type(plugin_dir_path(__FILE__).'build/homepage-hero-item/');
	register_block_type(plugin_dir_path(__FILE__).'build/image/');
	register_block_type(plugin_dir_path(__FILE__).'build/image-animated-sprite/');
	register_block_type(plugin_dir_path(__FILE__).'build/image-with-heading/');
	register_block_type(plugin_dir_path(__FILE__).'build/language-selector/');
	register_block_type(plugin_dir_path(__FILE__).'build/language-selector-item/');
	register_block_type(plugin_dir_path(__FILE__).'build/legal-nav/');
	register_block_type(plugin_dir_path(__FILE__).'build/legal-nav-item/');
	register_block_type(plugin_dir_path(__FILE__).'build/leadership-carousel/');
	register_block_type(plugin_dir_path(__FILE__).'build/leadership-carousel-item/');
	register_block_type(plugin_dir_path(__FILE__).'build/three-items-carousel/');
	register_block_type(plugin_dir_path(__FILE__).'build/three-items-carousel-item/');
	register_block_type(plugin_dir_path(__FILE__).'build/three-items-carousel-item-group/');
	register_block_type(plugin_dir_path(__FILE__).'build/logo-grid/');
	register_block_type(plugin_dir_path(__FILE__).'build/logo-grid-container/');
	register_block_type(plugin_dir_path(__FILE__).'build/logo-grid-item/');
	register_block_type(plugin_dir_path(__FILE__).'build/map-offices/');
	register_block_type(plugin_dir_path(__FILE__).'build/page/');
	register_block_type(plugin_dir_path(__FILE__).'build/paragraph/');
	register_block_type(plugin_dir_path(__FILE__).'build/paragraph-with-lead-in/');
	register_block_type(plugin_dir_path(__FILE__).'build/parallax-container/');
	register_block_type(plugin_dir_path(__FILE__).'build/quote/');
	register_block_type(plugin_dir_path(__FILE__).'build/rule-line/');
	register_block_type(plugin_dir_path(__FILE__).'build/section/');
	register_block_type(plugin_dir_path(__FILE__).'build/section-with-media/');
	register_block_type(plugin_dir_path(__FILE__).'build/section-with-spritesheet-media/');
	register_block_type(plugin_dir_path(__FILE__).'build/social-icon-button/');
	register_block_type(plugin_dir_path(__FILE__).'build/social-icons/');
	register_block_type(plugin_dir_path(__FILE__).'build/stacked-cards/');
	register_block_type(plugin_dir_path(__FILE__).'build/stacked-cards-container/');
	register_block_type(plugin_dir_path(__FILE__).'build/stacked-cards-item/');
	register_block_type(plugin_dir_path(__FILE__).'build/tab/');
	register_block_type(plugin_dir_path(__FILE__).'build/tabs/');
	register_block_type(plugin_dir_path(__FILE__).'build/ticker-text/');
	register_block_type(plugin_dir_path(__FILE__).'build/top-nav/');
	register_block_type(plugin_dir_path(__FILE__).'build/top-nav-button/');
	register_block_type(plugin_dir_path(__FILE__).'build/video/');
	register_block_type(plugin_dir_path(__FILE__).'build/jobs/');
	register_block_type(plugin_dir_path(__FILE__).'build/legal-snippet/');

	register_block_type(plugin_dir_path(__FILE__).'build/work-categories/', ['render_callback' => 'tbwa_block_work_categories_save']);
	register_block_type(plugin_dir_path(__FILE__).'build/work-featured/', ['render_callback' => 'tbwa_block_work_featured_save']);
	register_block_type(plugin_dir_path(__FILE__).'build/work-hero/', ['render_callback' => 'tbwa_block_work_hero_save']);
	register_block_type(plugin_dir_path(__FILE__).'build/work-loop/', ['render_callback' => 'tbwa_block_work_loop_save']);
	register_block_type(plugin_dir_path(__FILE__).'build/work-featured-loop/', ['render_callback' => 'tbwa_block_work_featured_loop_save']);
	register_block_type(plugin_dir_path(__FILE__).'build/work-featured-loop-landscape/', ['render_callback' => 'tbwa_block_work_featured_loop_landscape_save']);
	register_block_type(plugin_dir_path(__FILE__).'build/star-rating/', ['render_callback' => 'tbwa_block_star_rating_save']);
	register_block_type(plugin_dir_path(__FILE__).'build/work-next/', ['render_callback' => 'tbwa_block_work_next_save']);
	register_block_type(plugin_dir_path(__FILE__).'build/leadership-loop/', ['render_callback' => 'tbwa_block_leadership_loop_save']);
	register_block_type(plugin_dir_path(__FILE__).'build/news-categories/', ['render_callback' => 'tbwa_block_news_categories_save']);
	register_block_type(plugin_dir_path(__FILE__).'build/news-featured/', ['render_callback' => 'tbwa_block_news_featured_save']);
	register_block_type(plugin_dir_path(__FILE__).'build/news-loop/', ['render_callback' => 'tbwa_block_news_loop_save']);
	register_block_type(plugin_dir_path(__FILE__).'build/search-loop/', ['render_callback' => 'tbwa_block_search_loop_save']);

	//  Query Vars
	//  Add 'category' and 'keywords' 
	//  Remove 's'
	global $wp;
	$wp->add_query_var('category');
	$wp->add_query_var('keywords');
	/* $wp->remove_query_var('s'); */

}
add_action('init', 'tbwa_blocks_init');

function tbwa_block_enqueue_frontend_styles() {
    $blocks = [
        'button',
        'button-cta',
        'card',
        'card-container',
        'card-body',
        'card-label',
        'card-title',
        'card-text',
        'carousel',
        'carousel-item',
        'column-grid',
        'column-grid-item',
        'data-bite',
        'data-bite-container',
        'email-container',
        'follow-cursor',
        'footer',
        'footer-content',
        'footer-buttons',
        'footer-button',
        'form-download',
        'form-emailed',
        'form-emailed-file',
        'form-emailed-local-storage',
        'form-sign-up',
        'form-pitch',
        'gallery',
        'gallery-item',
        'heading',
        'heading-circle',
        'heading-circle-container',
        'homepage-hero',
        'homepage-hero-item',
        'image',
        'image-animated-sprite',
        'image-with-heading',
        'language-selector',
        'language-selector-item',
        'legal-nav',
        'legal-nav-item',
        'leadership-carousel',
        'leadership-carousel-item',
        'three-items-carousel',
        'three-items-carousel-item',
        'three-items-carousel-item-group',
        'logo-grid',
        'logo-grid-container',
        'logo-grid-item',
        'map-offices',
        'page',
        'paragraph',
        'paragraph-with-lead-in',
        'parallax-container',
        'quote',
        'rule-line',
        'section',
        'section-with-media',
        'section-with-spritesheet-media',
        'social-icon-button',
        'social-icons',
        'stacked-cards',
        'stacked-cards-container',
        'stacked-cards-item',
        'tab',
        'tabs',
        'ticker-text',
        'top-nav',
        'top-nav-button',
        'video',
        'jobs',
        'legal-snippet',
		'work-categories',
        'work-featured',
        'work-hero',
        'work-loop',
        'work-featured-loop',
        'work-featured-loop-landscape',
        'star-rating',
        'work-next',
        'leadership-loop',
        'news-categories',
        'news-featured',
        'news-loop',
        'search-loop'
    ];

    foreach ($blocks as $slug) {
        $css_path = plugin_dir_path(__FILE__) . 'build/' . $slug . '/style-index.css';
        if (file_exists($css_path)) {
            wp_enqueue_style(
                'tbwa-blocks-' . $slug . '-style',
                plugins_url('build/' . $slug . '/style-index.css', __FILE__),
                array(),
                filemtime($css_path)
            );
        }
    }
}
add_action('wp_enqueue_scripts', 'tbwa_block_enqueue_frontend_styles');


//  Enqueue the frontend.js files 
//  case-study-hero won't enqueue from block.json because its a dynamic block
//  and the the others only enqueue from block.json if the block is on the page. 
//  This forces them to always be on the page. 
function tbwa_block_enqueue_frontend_assets() {
	$a = [
		'carousel', 
		'follow-cursor', 
		'form-download',
		'form-emailed', 
		'form-emailed-local-storage', 
		'form-sign-up',
		'form-pitch',
		'form-emailed-file',
		'gallery',
		'heading-circle-container',
		'homepage-hero',
		'image-animated-sprite', 
		'jobs',
		'language-selector', 
		'leadership-carousel',
		'legal-snippet',
		'map-offices', 
		'stacked-cards', 
		'tabs', 
		'three-items-carousel',
		'ticker-text', 
		'top-nav', 
		'video', 
		'work-hero', 
		'work-next'
	];
	foreach ($a as $slug) { 
		wp_enqueue_script(
			'tbwa-blocks-'.$slug.'-view-script', 
			plugins_url('build/'.$slug.'/frontend.js', __FILE__ ), 
			array(), 
			filemtime(plugin_dir_path(__FILE__).'build/'.$slug.'/frontend.js'));
	}
}
add_action('wp_enqueue_scripts', 'tbwa_block_enqueue_frontend_assets');



//  Enqueue static Leaflet Map Assets for the map on the contact page
function tbwa_block_enqueue_leaflet_assets() {

	//  Leaflet
	wp_enqueue_style(
		'tbwa-blocks-leaflet-style', 
		plugins_url('static/leaflet/leaflet.css', __FILE__ ), 
		array(), 
		filemtime(plugin_dir_path(__FILE__).'static/leaflet/leaflet.css')
	);

	wp_enqueue_script(
		'tbwa-blocks-leaflet-script', 
		plugins_url('static/leaflet/leaflet.js', __FILE__ ), 
		array(), 
		filemtime(plugin_dir_path(__FILE__).'static/leaflet/leaflet.js'));

	// Leaflet search plugin
	wp_enqueue_style(
		'tbwa-blocks-leaflet-search-style', 
		plugins_url('static/leaflet-animated-searchbox/AnimatedSearchBox.css', __FILE__ ), 
		array(), 
		filemtime(plugin_dir_path(__FILE__).'static/leaflet-animated-searchbox/AnimatedSearchBox.css'));

	wp_enqueue_script(
		'tbwa-blocks-leaflet-search-script', 
		plugins_url('static/leaflet-animated-searchbox/AnimatedSearchBox.js', __FILE__ ), 
		array(), 
		filemtime(plugin_dir_path(__FILE__).'static/leaflet-animated-searchbox/AnimatedSearchBox.js'));

	// Fuse.js
	wp_enqueue_script(
		'tbwa-blocks-fuse-script',
		'https://cdn.jsdelivr.net/npm/fuse.js@5.0.10-beta/dist/fuse.min.js',
		array(),
		'3.3.5',
		true);


	//  Marker cluster
	wp_enqueue_style(
		'tbwa-blocks-leaflet-marker-cluster-style', 
		plugins_url('static/leaflet-marker-cluster/leaflet-marker-cluster.css', __FILE__ ), 
		array(), 
		filemtime(plugin_dir_path(__FILE__).'static/leaflet-marker-cluster/leaflet-marker-cluster.css')
	);

	wp_enqueue_style(
		'tbwa-blocks-leaflet-marker-cluster-default-style', 
		plugins_url('static/leaflet-marker-cluster/leaflet-marker-cluster.default.css', __FILE__ ), 
		array(), 
		filemtime(plugin_dir_path(__FILE__).'static/leaflet-marker-cluster/leaflet-marker-cluster.default.css')
	);

	wp_enqueue_script(
		'tbwa-blocks-leaflet-marker-cluster-script', 
		plugins_url('static/leaflet-marker-cluster/leaflet-marker-cluster.js', __FILE__ ), 
		array(), 
		filemtime(plugin_dir_path(__FILE__).'static/leaflet-marker-cluster/leaflet-marker-cluster.js'));


	// Gesture Handling
	wp_enqueue_style(
		'tbwa-blocks-leaflet-gesture-handling-default-style', 
		plugins_url('static/leaflet-gesture-handling/leaflet-gesture-handling.css', __FILE__ ), 
		array(), 
		filemtime(plugin_dir_path(__FILE__).'static/leaflet-gesture-handling/leaflet-gesture-handling.css')
	);

	wp_enqueue_script(
		'tbwa-blocks-leaflet-gesture-handling-script', 
		plugins_url('static/leaflet-gesture-handling/leaflet-gesture-handling.js', __FILE__ ), 
		array(), 
		filemtime(plugin_dir_path(__FILE__).'static/leaflet-gesture-handling/leaflet-gesture-handling.js'));



}
add_action('wp_enqueue_scripts', 'tbwa_block_enqueue_leaflet_assets');

//  Enqueue static Slick Assets for carousel block
function tbwa_block_enqueue_slick_assets() {

	//  Slick
	wp_enqueue_style(
		'tbwa-blocks-slick-style', 
		plugins_url('static/slick/slick.css', __FILE__ ), 
		array(), 
		filemtime(plugin_dir_path(__FILE__).'static/slick/slick.css')
	);

	wp_enqueue_script(
		'tbwa-blocks-slick-script', 
		plugins_url('static/slick/slick.js', __FILE__ ), 
		array('jquery'), 
		filemtime(plugin_dir_path(__FILE__).'static/slick/slick.js'), 
		true
	);

}
add_action('wp_enqueue_scripts', 'tbwa_block_enqueue_slick_assets');

/**
 * 
 *  Update map data
 * 
 */

 // API request
 /*function jwt_request($api_url, $token) {
	$curl = curl_init();

	curl_setopt($curl, CURLOPT_URL, $api_url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_TIMEOUT, 60);
    curl_setopt($curl, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $token,
        'Content-Type: application/json',
    ]);
	
	$response = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);

	$data = json_decode($response, true);

    return $data;
}

// Cronjob to  update map info
function map_do_this_daily() {
    // Initialize WP Filesystem API
    global $wp_filesystem;
    if ( ! function_exists( 'WP_Filesystem' ) ) {
        require_once( ABSPATH . 'wp-admin/includes/file.php' );
    }

    WP_Filesystem(); // Set up WP filesystem

    // Initialize map object
    $map_object = [];
    $map_file_path = WP_PLUGIN_DIR . '/tbwa-blocks/static/map-offices.json';

    // Define API URL and get token
    $api_url = 'https://compass.omnicomgroup.com/api/v1/agencies.json?format=json';
    $token = get_option('tbwa_theme_compass_token');
    
    // Fetch data from the API
    $response_data = jwt_request($api_url, $token);

    // Check if the API call was successful
    if ( is_wp_error( $response_data ) ) {
        error_log('API request failed: ' . $response_data->get_error_message());
        return;
    }

    // Process the agencies if available
    if ( isset($response_data['agencies']) && !empty($response_data['agencies']) ) {
        foreach ($response_data['agencies'] as $agency) {
            if ($agency['status'] == 'Active') {
                $temp_array = array (
                    'Compass Name' => $agency['compass_profile_name'],
                    'Address' => $agency['rooftop_address'],
                    'Phone' => $agency['phone'],
                    'URL' => $agency['url'],
                    'Latitude' => $agency['map_lat'],
                    'Longitude' => $agency['map_lng'],
                    'Country' => $agency['country']
                );
                array_push($map_object, $temp_array);
            }
        }

        // Encode to JSON and check for errors
        $json_data = json_encode($map_object);
        if ( json_last_error() === JSON_ERROR_NONE ) {
            // Write to the file using WP Filesystem
            $wp_filesystem->put_contents( $map_file_path, $json_data, FS_CHMOD_FILE );
        } else {
            error_log( 'JSON encoding error: ' . json_last_error_msg() );
        }
    }
}

add_action( 'map_cron_hook', 'map_do_this_daily' );

// Schedule the cron event if it's not already scheduled
if ( ! wp_next_scheduled( 'map_cron_hook' ) ) {
    wp_schedule_event( time(), 'daily', 'map_cron_hook' );
}

// Clear the scheduled event upon deactivation
register_deactivation_hook( __FILE__, 'remove_map_cron_hook' );
function remove_map_cron_hook() {
    $timestamp = wp_next_scheduled( 'map_cron_hook' );
    if ( $timestamp ) {
        wp_unschedule_event( $timestamp, 'map_cron_hook' );
    }
}

//add_action('init', 'refresh_token');

function refresh_token() {
    $api_url = 'https://compass.omnicomgroup.com/api/v1/refresh_token';

	// Retrieve the current Bearer token from the WordPress options
    $bearer_token = get_option( 'tbwa_theme_compass_token' );

    // Set up the request arguments
    $args = array(
        'headers' => array(
            'Authorization' => 'Bearer ' . $bearer_token,
        ),
    );
    
    // Perform the API request
    $response = wp_remote_get( $api_url, $args );

    /* // Check for errors
    if ( is_wp_error( $response ) ) {
        error_log('Token refresh failed: ' . $response->get_error_message());
        return;
    }

    // Process the response
    $body = wp_remote_retrieve_body( $response );
    $data = json_decode( $body, true ); 

	$data['token'] = 'Updatedkey2';

    // Assuming the new token is in $data['token']
    if ( isset( $data['token'] ) ) {
        update_option( 'tbwa_theme_compass_token', $data['token'] );
    } else {
        error_log('Token refresh failed: Invalid response structure');
    }
}*/


/////////

function cc_mime_types($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

/**
 * Register Mailchimp Member via REST API.
 */
function register_mailchimp_member($data) {
    // Check if the required parameters are present
    if (empty($data['email_address'])) {
        return new WP_Error('invalid_parameter', 'Email parameter is required.', array('status' => 400));
    }

    $email_address = $data['email_address'];
	$MD5emailHash = md5($email_address);
	$full_name = $data['full_name'];
	$status = $data['status'];
    $list_id = get_option('tbwa_theme_mailchimp_audience_id');
    $api_key = get_option('tbwa_theme_mailchimp_api_key');
	$data_center = substr($api_key, strpos($api_key, '-') + 1);
	$memberId = md5(strtolower($data['email_address']));
	$auth = base64_encode( 'user:'.$api_key );
	$file_name = $data['tag'];

    // Mailchimp API endpoint
    $listEndpoint = 'https://' . $data_center . '.api.mailchimp.com/3.0/lists/' . $list_id . '/members';
	$userEndpoint = $listEndpoint . '/' . $MD5emailHash;
	$tagsEndpoint = $userEndpoint . '/tags';

    // Subscriber data
	$subscriber_data = array(
		'email_address' => $email_address,
		'status'        => $status,
		'full_name'		=> $full_name,
		'merge_fields' 	=> $data['merge_fields'],
	);

	$tags_data = array(
		'tags' => $data['tags']
	);
	
	$createUser = curl_init($listEndpoint);

	curl_setopt($createUser, CURLOPT_USERPWD, 'user:' . $api_key);
	curl_setopt($createUser, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($createUser, CURLOPT_TIMEOUT, 10);
	curl_setopt($createUser, CURLOPT_POST, true);
	curl_setopt($createUser, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($createUser, CURLOPT_POSTFIELDS, json_encode($subscriber_data));
	curl_setopt($createUser, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Basic '.$auth));
	curl_setopt($createUser, CURLOPT_USERAGENT, 'PHP-MCAPI/2.0');

	$response = curl_exec($createUser);

	if (curl_errno($createUser)) {
		return new WP_Error('mailchimp_error', 'Error connecting to Mailchimp for user.', array('status' => 500));
	}

	curl_close($createUser);

	if (!empty($tags_data['tags'])) {
		$updateTags = curl_init($tagsEndpoint);

		curl_setopt($updateTags, CURLOPT_USERPWD, 'user:' . $api_key);
		curl_setopt($updateTags, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($updateTags, CURLOPT_TIMEOUT, 10);
		curl_setopt($createUser, CURLOPT_POST, true);
		curl_setopt($updateTags, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($updateTags, CURLOPT_POSTFIELDS, json_encode($tags_data));
		curl_setopt($updateTags, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Basic '.$auth));
		curl_setopt($updateTags, CURLOPT_USERAGENT, 'PHP-MCAPI/2.0');
		$tagResponse = curl_exec($updateTags);

		if (curl_errno($updateTags)) {
			return new WP_Error('mailchimp_error', 'Error connecting to Mailchimp for Tags.', array('status' => 500));
		}

		curl_close($updateTags);
	}

    // Decode and return the response
	$tagResult = "added tags: " . $tags_data;
    $result = json_decode($response, true);

	$payloadDataToMCServer = array(
		"tag_result" => $tagResponse,
		"create_user" => $result
	);

	if (isset($result['id'])) {
		return array('message' => 'User subscribed successfully to Mailchimp!', 
		"sent_data" => $payloadDataToMCServer, "status" => 200, "endpoint" => $listEndpoint);
	} elseif (isset($result['status']) && $result['status'] === 400) {
		return new WP_Error('invalid_request', 'Invalid request. Please check your parameters.', array('status' => 400, 
		"sent_data" => $payloadDataToMCServer, "endpoint" => $listEndpoint));
	} else {
		return new WP_Error('mailchimp_error', 'Subscription to Mailchimp failed.', array('status' => 500, "sent_data" => $payloadDataToMCServer, "endpoint" => $listEndpoint));
	}
}

function send_email_form($data) {

    if (isset($data['to'], $data['subject'], $data['message'])) {
        $to = sanitize_email($data['to']);
        $subject = sanitize_text_field($data['subject']);
		$striped = strip_tags($data['message']);
		$lines = nl2br($striped);
        $message = wp_kses_post($lines);
		$headers = array(
			'Content-Type: text/html; charset=UTF-8',
		);

        $sent = wp_mail($to, $subject, $message, $headers);

        if ($sent) {

            return rest_ensure_response(array('message' => 'Email sent!'));
        } else {

            return rest_ensure_response(array('error' => 'Error sending email'));
        }
    } else {
        return rest_ensure_response(array('error' => 'Missing data'));
    }
}

function send_email_file_form($data) {
    if (!isset($data['to'], $data['subject'], $data['message'])) {
        return rest_ensure_response(array('error' => 'Missing data'), 400);
    }

    $to = sanitize_email($data['to']);
    $subject = sanitize_text_field($data['subject']);
    $striped = strip_tags($data['message']);
    $lines = nl2br($striped);
    $message = wp_kses_post($lines);
    
    $headers = array('Content-Type: text/html; charset=UTF-8');
    $attachments = [];

    // Verifica si hay un archivo subido
    if (!empty($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
        $uploaded_file = $_FILES['attachment'];

        // Validar tipo de archivo (solo PDF, PNG, JPG)
        $allowed_types = ['application/pdf', 'image/png', 'image/jpeg'];
        if (!in_array($uploaded_file['type'], $allowed_types)) {
            return rest_ensure_response(array('error' => 'Invalid file type. Only PDF, PNG, and JPG are allowed.'), 400);
        }

        // Validar tamaño del archivo (máximo 10MB)
        if ($uploaded_file['size'] > 10 * 1024 * 1024) {
            return rest_ensure_response(array('error' => 'File size exceeds 10MB'), 400);
        }

        // Cargar el archivo en la biblioteca de medios de WordPress
        $upload_overrides = array('test_form' => false);
        $movefile = wp_handle_upload($uploaded_file, $upload_overrides);

        if ($movefile && !isset($movefile['error'])) {
            // Obtener la URL del archivo subido
            $file_url = $movefile['url'];
            $file_path = $movefile['file'];

            // Insertar en la biblioteca de medios
            $attachment = array(
                'post_mime_type' => $uploaded_file['type'],
                'post_title'     => sanitize_file_name($uploaded_file['name']),
                'post_content'   => '',
                'post_status'    => 'inherit'
            );

            // Adjuntar archivo a la Media Library
            $attach_id = wp_insert_attachment($attachment, $file_path);

            // Generar los metadatos del archivo
            require_once ABSPATH . 'wp-admin/includes/image.php';
            $attach_data = wp_generate_attachment_metadata($attach_id, $file_path);
            wp_update_attachment_metadata($attach_id, $attach_data);

            // Agregar el archivo como adjunto al email
            $attachments[] = get_attached_file($attach_id);
        } else {
            return rest_ensure_response(array('error' => 'File upload failed'), 400);
        }
    }

    // Enviar el email con el archivo adjunto
    $sent = wp_mail($to, $subject, $message, $headers);

    if ($sent) {
        return rest_ensure_response(array(
            'message' => 'Email sent!',
            'file_url' => isset($file_url) ? $file_url : null
        ));
    } else {
        return rest_ensure_response(array('error' => 'Error sending email'), 500);
    }
}



add_action('rest_api_init', function () {
    register_rest_route('mailchimp/v1', '/subscribe/', array(
        'methods' => 'POST',
        'callback' => 'register_mailchimp_member',
    ));

	register_rest_route('custom-email-api/v1', '/send-email/', array(
        'methods' => 'POST',
        'callback' => 'send_email_form',
		'permission_callback' => '__return_true',
    ));

	register_rest_route('custom-email-api/v1', '/send-email-file/', array(
        'methods' => 'POST',
        'callback' => 'send_email_file_form',
		'permission_callback' => '__return_true',
    ));
});

// Translations
function tbwa_blocks_load_textdomain() {
    load_plugin_textdomain( 'text-domain', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'tbwa_blocks_load_textdomain' );

function remove_protected_title_prefix_blocks( $title ) {
    return '%s';
}
add_filter( 'protected_title_format', 'remove_protected_title_prefix_blocks' );

function custom_excerpt($excerpt) {
    global $post;

    if ( post_password_required($post) ) {
        return has_excerpt($post) ? $post->post_excerpt : '';
    }

    return $excerpt;
}
add_filter('get_the_excerpt', 'custom_excerpt');