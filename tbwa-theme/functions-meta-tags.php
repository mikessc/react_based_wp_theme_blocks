<?php


////////////////////
//  Register Open Graph Meta Tag page and post meta fields
function tbwa_meta_tags_register() {

	$keys = ['title', 'description', 'keywords'];
	foreach ($keys as $key) { 
		register_meta(
			'post',
			'_tbwa_meta_tags_'.$key, [
				'type'          => 'string',
				'description'   => 'Meta tag content for '.str_replace('_', ' ', $key).'.',
				'single'        => true,
				'default'       => '',
				'auth_callback' => function($allowed, $meta_key, $object_id, $user_id, $cap, $caps) {
					return current_user_can('edit_posts');
				},
				'show_in_rest'  => true,
			]
		);
	}

	register_meta(
		'post',
		'_tbwa_meta_tags_og_media_id', [
			'type'          => 'number',
			'description'   => 'Open Graph Meta Tag content for media id.',
			'single'        => true,
			'default'       => 0,
			'auth_callback' => function($allowed, $meta_key, $object_id, $user_id, $cap, $caps) {
				return current_user_can('edit_posts');
			},
			'show_in_rest'  => true,
		]
	);

	register_meta(
		'post',
		'_tbwa_meta_tags_og_media_url', [
			'type'          => 'string',
			'description'   => 'Open Graph Meta Tag content for media url.',
			'single'        => true,
			'default'       => '',
			'auth_callback' => function($allowed, $meta_key, $object_id, $user_id, $cap, $caps) {
				return current_user_can('edit_posts');
			},
			'show_in_rest'  => true,
		]
	);

	//  Work posts have a custom Client Name field in the sidebar
	register_meta(
		'post',
		'_tbwa_meta_tags_client_name', [
			'type'          => 'string',
			'description'   => 'Client name meta tag for the Work posts.',
			'single'        => true,
			'default'       => '',
			'auth_callback' => function($allowed, $meta_key, $object_id, $user_id, $cap, $caps) {
				return current_user_can('edit_posts');
			},
			'show_in_rest'  => true,
		]
	);

	//  News posts have a custom external link in the sidebar
	register_meta(
		'post',
		'_tbwa_meta_tags_news_external_link', [
			'type'          => 'string',
			'description'   => 'External link for News posts.',
			'single'        => true,
			'default'       => '',
			'auth_callback' => function($allowed, $meta_key, $object_id, $user_id, $cap, $caps) {
				return current_user_can('edit_posts');
			},
			'show_in_rest'  => true,
		]
	);

	//  News posts have a custom "Author" field in their sidebar
	register_meta(
		'post',
		'_tbwa_meta_tags_news_author', [
			'type'          => 'string',
			'description'   => 'Author text for News posts.',
			'single'        => true,
			'default'       => '',
			'auth_callback' => function($allowed, $meta_key, $object_id, $user_id, $cap, $caps) {
				return current_user_can('edit_posts');
			},
			'show_in_rest'  => true,
		]
	);

	//  Leadership posts sidebar meta tags for the card image and hover image
	register_meta(
		'post',
		'_tbwa_leadership_card_image_id', [
			'type'          => 'number',
			'description'   => 'Image ID for the Leadership Sidebar Card Image.',
			'single'        => true,
			'default'       => 0,
			'auth_callback' => function($allowed, $meta_key, $object_id, $user_id, $cap, $caps) {
				return current_user_can('edit_posts');
			},
			'show_in_rest'  => true,
		]
	);
	register_meta(
		'post',
		'_tbwa_leadership_card_image_url', [
			'type'          => 'string',
			'description'   => 'Image Url for the Leadership Sidebar Card Hover Image.',
			'single'        => true,
			'default'       => '',
			'auth_callback' => function($allowed, $meta_key, $object_id, $user_id, $cap, $caps) {
				return current_user_can('edit_posts');
			},
			'show_in_rest'  => true,
		]
	);
	register_meta(
		'post',
		'_tbwa_leadership_card_image_hover_id', [
			'type'          => 'number',
			'description'   => 'Image ID for the Leadership Sidebar Card Hover Image.',
			'single'        => true,
			'default'       => 0,
			'auth_callback' => function($allowed, $meta_key, $object_id, $user_id, $cap, $caps) {
				return current_user_can('edit_posts');
			},
			'show_in_rest'  => true,
		]
	);
	register_meta(
		'post',
		'_tbwa_leadership_card_image_hover_url', [
			'type'          => 'string',
			'description'   => 'Image Url for the Leadership Sidebar Card Image.',
			'single'        => true,
			'default'       => '',
			'auth_callback' => function($allowed, $meta_key, $object_id, $user_id, $cap, $caps) {
				return current_user_can('edit_posts');
			},
			'show_in_rest'  => true,
		]
	);
	register_meta(
		'post',
		'_tbwa_leadership_card_description1', [
			'type'          => 'string',
			'description'   => 'Description line 1.',
			'single'        => true,
			'default'       => '',
			'auth_callback' => function($allowed, $meta_key, $object_id, $user_id, $cap, $caps) {
				return current_user_can('edit_posts');
			},
			'show_in_rest'  => true,
		]
	);
	register_meta(
		'post',
		'_tbwa_leadership_card_description2', [
			'type'          => 'string',
			'description'   => 'Description line 2.',
			'single'        => true,
			'default'       => '',
			'auth_callback' => function($allowed, $meta_key, $object_id, $user_id, $cap, $caps) {
				return current_user_can('edit_posts');
			},
			'show_in_rest'  => true,
		]
	);


}
add_action('init', 'tbwa_meta_tags_register');


////////////////////
//  Insert meta tags into the header
function tbwa_meta_tags_head() {
	global $wp;

	if (rest_sanitize_boolean(get_option('tbwa_theme_meta_tags_enabled'))) { 

		$meta = get_post_meta(get_the_ID());

		//echo "\n<!-- Meta Tags Start -->\n";

		//  Title
		if (isset($meta['_tbwa_meta_tags_title'][0])) { 
			echo '<meta property="og:title" content="'.esc_attr($meta['_tbwa_meta_tags_title'][0]).'">'."\n";
		}

		//  Description
		if (isset($meta['_tbwa_meta_tags_description'][0])) { 
			echo '<meta property="og:description" content="'.esc_attr($meta['_tbwa_meta_tags_description'][0]).'">'."\n";
		}

		//  Image
		if (isset($meta['_tbwa_meta_tags_og_media_url'][0])) { 
			echo '<meta property="og:image" content="'.esc_attr($meta['_tbwa_meta_tags_og_media_url'][0]).'">'."\n";
		}

		//  URL
		if (wp_get_canonical_url() !== false) { 
			echo '<meta property="og:url" content="'.esc_attr(wp_get_canonical_url()).'">'."\n";
		} else { 
			echo '<meta property="og:url" content="'.esc_attr(home_url($wp->request)).'">'."\n";
		}

		//  Description
		if (isset($meta['_tbwa_meta_tags_description'][0])) { 
			echo '<meta name="description" content="'.esc_attr($meta['_tbwa_meta_tags_description'][0]).'">'."\n";
		}

		//  Keywords
		if (isset($meta['_tbwa_meta_tags_keywords'][0])) { 
			echo '<meta name="keywords" content="'.esc_attr($meta['_tbwa_meta_tags_keywords'][0]).'">'."\n";
		}

		//echo "<!-- Meta Tags End -->\n\n";

	}

}
add_action('wp_head', 'tbwa_meta_tags_head');




























