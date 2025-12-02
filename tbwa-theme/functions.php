<?php


////////////////////
//  On init
function tbwa_init() { 

	//  Do not add css as inline styles 
	add_filter('styles_inline_size_limit', function () { 
		return 0; 
	});

	//  Register the open graph meta tags
	tbwa_meta_tags_register();

	//  Register the custom post types: news, work, leaders
	tbwa_custom_post_type();

	//  Add excerpt to pages
	add_post_type_support('page', 'excerpt');

	//  Remove comments from pages
	remove_post_type_support('page', 'comments');

	//  Include all block assets (css, js) on every page. 
	add_filter('should_load_separate_core_block_assets', '__return_false');

	//  Disable big image threshold
	add_filter( 'big_image_size_threshold', '__return_false' );

	//  Live reload in the dev env
	if (WP_DEBUG) { 
		if ($_SERVER['SERVER_NAME'] == 'localhost') {
			wp_register_script('livereload', 'http://localhost:35729/livereload.js');
			wp_enqueue_script('livereload');
		}
	}
	
	//  Disable image lazy loading
	add_filter('wp_lazy_loading_enabled', '__return_false');
	function disable_lazy_load_featured_images($attr, $attachment = null) {
		$attr['loading'] = 'eager';
		return $attr;
	}
	add_filter('wp_get_attachment_image_attributes', 'disable_lazy_load_featured_images');

}
add_action('init', 'tbwa_init');




////////////////////
//  Enqueue fonts
function tbwa_enqueue_fonts() {
	$font_family_option = get_option('tbwa_theme_font_family');
	switch ($font_family_option) {
		case 'default':
			$font_to_load = get_stylesheet_directory_uri().'/static/fonts/TBWAGrotesk-22-10-21-v1-009/TBWAGrotesk-subset.css';
			break;
		case 'korean':
			$font_to_load = get_stylesheet_directory_uri().'/static/fonts/HU_140/HU_140.css';
			break;
		default:
			$font_to_load = get_stylesheet_directory_uri().'/static/fonts/TBWAGrotesk-22-10-21-v1-009/TBWAGrotesk-subset.css';
			break;
	}
	wp_enqueue_style('tbwa-fonts', $font_to_load, array(), '1');
}
add_action('wp_enqueue_scripts', 'tbwa_enqueue_fonts', 11);
add_action('admin_enqueue_scripts', 'tbwa_enqueue_fonts');

//  Preload fonts
function tbwa_preload_fonts() { 
	echo '<link rel="preload" href="'.get_stylesheet_directory_uri().'/static/fonts/TBWAGrotesk-22-10-21-v1-009/TBWAGrotesk-Regular.woff2" as="font" type="font/woff2" crossorigin>'."\n";
	echo '<link rel="preload" href="'.get_stylesheet_directory_uri().'/static/fonts/TBWAGrotesk-22-10-21-v1-009/TBWAGroteskBackslash-Regular.woff2" as="font" type="font/woff2" crossorigin>'."\n";
	echo '<link rel="preload" href="'.get_stylesheet_directory_uri().'/static/fonts/TBWAGrotesk-22-10-21-v1-009/TBWAGrotesk-Italic.woff2" as="font" type="font/woff2" crossorigin>'."\n";
	echo '<link rel="preload" href="'.get_stylesheet_directory_uri().'/static/fonts/TBWAGrotesk-22-10-21-v1-009/TBWAGrotesk-SemiBold.woff2" as="font" type="font/woff2" crossorigin>'."\n";
	echo '<link rel="preload" href="'.get_stylesheet_directory_uri().'/static/fonts/HU_140/HU_140.ttf" as="font" type="font/truetype" crossorigin>'."\n";
}
add_action('wp_head', 'tbwa_preload_fonts');
add_action('admin_head', 'tbwa_preload_fonts');
	

////////////////////
//  Frontend Scripts and Styles
function tbwa_enqueue_frontend_assets() {
	wp_enqueue_style('tbwa-frontend-build-style', get_stylesheet_directory_uri().'/build/frontend/index.css', array(), filemtime(dirname(__FILE__).'/build/frontend/index.css'));
	wp_enqueue_script('tbwa-frontend-build-script', get_stylesheet_directory_uri().'/build/frontend/index.js', array(), filemtime(dirname(__FILE__).'/build/frontend/index.js'));
}
add_action('wp_enqueue_scripts', 'tbwa_enqueue_frontend_assets');


////////////////////
//  Admin Scripts and Styles
function tbwa_enqueue_admin_assets() {
	wp_enqueue_style('tbwa-admin-theme-style', get_stylesheet_directory_uri().'/style.css', array(), filemtime(dirname(__FILE__).'/style.css'));
	wp_enqueue_style('tbwa-admin-build-style', get_stylesheet_directory_uri().'/build/admin/index.css', array(), filemtime(dirname(__FILE__).'/build/admin/index.css'));
	wp_enqueue_script(
		'tbwa-admin-build-script', 
		get_stylesheet_directory_uri().'/build/admin/index.js', 
		array('wp-blocks', 'wp-element', 'wp-edit-post', 'wp-data', 'wp-i18n', 'wp-api', 'wp-components', 'wp-block-library'), 
		filemtime(dirname(__FILE__).'/build/admin/index.js'),
		10
	);
}
add_action('admin_enqueue_scripts', 'tbwa_enqueue_admin_assets');


////////////////////
//  After Setup theme
function tbwa_after_setup_theme()  {

	//  Remove the theme features
	remove_theme_support('core-block-patterns');
	remove_theme_support('wp-block-styles');
	remove_theme_support('widgets');

	//  Never show the admin bar - it always breaks the frontend layout
	show_admin_bar(false);

	//  Remove the duotone svg filters 
	remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');

	//  Remove skip links
	remove_action( 'wp_footer', 'the_block_template_skip_link' );

	//  Colour palette in the editor
	add_theme_support('disable-custom-colors');
	add_theme_support(
		'editor-color-palette',
		array(
			array('name' => 'TBWA Black',	'slug' => 'tbwa-black',	 'color' => '#0A0A0D'),
			array('name' => 'TBWA White',	'slug' => 'tbwa-white',	 'color' => '#FFFFFF'),
			array('name' => 'TBWA Yellow',	'slug' => 'tbwa-yellow', 'color' => '#FECC00'),
		)
	);

}
add_action('after_setup_theme', 'tbwa_after_setup_theme');


////////////////////
//  Tidy up the admin menu
function tbwa_custom_menu_order($menu_ord) {
	if (!$menu_ord) return true;
	return array(
		'wpengine-common', 
		'index.php', 
		'separator1', 
		'edit.php?post_type=page', 
		'edit.php?post_type=tbwa_work',
		'edit.php?post_type=tbwa_news', 
		'edit.php?post_type=tbwa_leader', 
		'separator2', 
	);
}
add_filter('custom_menu_order', 'tbwa_custom_menu_order');
add_filter('menu_order', 'tbwa_custom_menu_order');


function tbwa_tidy_admin_menu() { 

	//  Add a Reusable Blocks menu item 
	add_menu_page(
		esc_html__( 'Reusable Blocks', 'reusable-blocks-admin-menu-option' ),
		esc_html__( 'Reusable Blocks', 'reusable-blocks-admin-menu-option' ),
		'delete_published_posts',
		'edit.php?post_type=wp_block',
		'',
		'dashicons-layout',
		21
	);

	//  Disable the template and template part menu options
	if ( !current_user_can('administrator')) {
		remove_menu_page('edit-comments.php', 'site-editor.php');
		remove_submenu_page('themes.php', 'site-editor.php');
	}

	//  Hide Posts
	remove_menu_page('edit.php');

	//  Hide comments
	remove_menu_page('edit-comments.php');
	
	//  Print all the menu and submenu slugs
	/*
	global $menu;
	global $submenu;
	foreach ($menu as  $i => $item) { 
		echo $item[2]."\n";
		foreach ($submenu[$item[2]] as $j => $subitem) { 
			echo '- '.$subitem[2]."\n";
		}
		echo "\n";
	}
	exit;
	*/


}
add_action('admin_menu', 'tbwa_tidy_admin_menu', 999);


////////////////////
//  Create favicon files using this tool:
//  https://realfavicongenerator.net/
function tbwa_favicon() {
	//echo "\n<!-- Favicon Tags Start -->\n";
	require('static/favicon.html');
	//echo "\n<!-- Favicon Tags End -->\n";
}
add_action('wp_head', 'tbwa_favicon');
add_action('admin_head', 'tbwa_favicon');


////////////////////
//  Clear unnecessary head links
remove_action('wp_head', '_custom_logo_header_styles');
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wc_products_rss_feed');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wp_oembed_add_discovery_links');
remove_action('wp_head', 'wp_post_preview_js');
remove_action('wp_head', 'wp_print_head_scripts');
remove_action('wp_head', 'wp_print_styles');
remove_action('wp_head', 'wp_resource_hints', 2);
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'wp_site_icon');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles', 'print_emoji_styles');
remove_action('wp_print_styles', 'print_emoji_styles');
//remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');

//  Remove the block directory from the editor
remove_action( 'enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets' );


////////////////////
//  Template redirect overrides
function tbwa_template_redirect_overrides() {
	global $post;

	//  Is Under Maintenance Mode enabled?
	if (get_option('tbwa_theme_under_maintenance_enabled')) { 
		$path = '/under-maintenance/';
		$page = get_page_by_path($path);

		//  Is there an under maintenance page?
		if ($page) { 
			$permalink = home_url($path);

			//  Is this the under maintenance page?
			if ($permalink == get_permalink($page->id)) { 
				return;
			}

			//  Redirect to the under maintenance page.
			wp_redirect(home_url($path));
			exit;

		//  Display plain text message
		} else { 
			echo 'Site under maintenance.';
			exit;
		}

	}

	//  Disable media attachment pages
	if (is_attachment()) {
		if ($post && $post->post_parent) {
			wp_redirect( esc_url( get_permalink( $post->post_parent ) ), 301 );
			exit;
		} else {
			wp_redirect( esc_url( home_url( '/' ) ), 301 );
			exit;
		}
	}

	//  Disable author profile pages
	if (is_author()) {
		wp_redirect( esc_url( home_url( '/' ) ), 301 );
		exit; 
	}

	//  Override news post pages that have external links
	if (is_singular('tbwa-news')) {
		$externalLink = get_post_meta(get_the_ID(), '_tbwa_meta_tags_news_external_link', true);
		if ($externalLink && $externalLink != '' && filter_var($externalLink, FILTER_VALIDATE_URL)) { 
			header('Location: '.$externalLink);
			exit;
		}
	}

}
add_action('template_redirect', 'tbwa_template_redirect_overrides');

function tbwa_password_form( $output, $post = 0 ) {
	$post   = get_post( $post );
	$label  = 'pwbox-' . ( empty( $post->ID ) ? wp_rand() : $post->ID );
	$placeholder = "&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;";
	$output = '<p class="post-password-message">' . esc_html__( 'This content is password protected.', 'tbwa' ) . '<br />' . esc_html__( 'Please enter a password to view.', 'tbwa' ) . '</p>
	<form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" id="passForm" class="post-password-form" method="post"><input class="post-password-form__input" placeholder="' . $placeholder . '" name="post_password" id="' . esc_attr( $label ) . '" type="password" spellcheck="false" size="20" /><div class="wp-block-tbwa-blocks-button-cta aligncenter"><a href="javascript:document.getElementById(\'passForm\').submit()" class="size-large color-yellow">' . esc_attr_x( 'View', 'Post password form', 'tbwa' ) . '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24" xml:space="preserve" class="arrowIcon"><path d="M12.9 9.7v2.6H2.7V9.7h10.2zM9.6 3.1h3.7l7.9 7.9-7.9 7.9H9.6l7.9-7.9-7.9-7.9z"></path></svg></a></div></form>
	';
	return $output;
}
add_filter( 'the_password_form', 'tbwa_password_form', 10, 2 );


////////////////////
require('functions-map-update-data.php');
require('functions-meta-tags.php');
require('functions-settings.php');
require('functions-color-settings.php');
require('functions-post-types.php');

// Order search result from newest to oldest
function order_search_results_by_date( $query ) {
    // Ensure this only applies to the main search query
    if ( !is_admin() && $query->is_search() && $query->is_main_query() ) {
        $query->set( 'orderby', 'date' ); // Order by date
        $query->set( 'order', 'DESC' );  // Newest to oldest
    }
}
add_action( 'pre_get_posts', 'order_search_results_by_date' );

// Include password proteted posts in search results
function include_password_protected_in_search($where, $query) {
	if (!is_admin() && $query->is_search()) {
		global $wpdb;
		$where = str_replace("{$wpdb->posts}.post_password = '' AND ", '', $where);
	}
	return $where;
}
add_filter('posts_where', 'include_password_protected_in_search', 10, 2);

// Remove the "Protected:" and "Private: " prefix from the title of password protected posts
function remove_private_title_prefix( $title ) {
    return '%s';
}
add_filter( 'private_title_format', 'remove_private_title_prefix' );

function custom_excerpt_theme($excerpt) {
    global $post;

    if ( post_password_required($post) ) {
        return has_excerpt($post) ? $post->post_excerpt : '';
    }

    return $excerpt;
}
add_filter('get_the_excerpt', 'custom_excerpt_theme');