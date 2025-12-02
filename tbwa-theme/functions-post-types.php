<?php



////////////////////
function tbwa_custom_post_type() {


	////////////////////
	//  The Work
	register_taxonomy('tbwa-work-category', 'post', array(
		'hierarchical' => true,
		'public' => true, 
		'show_in_rest' => true, 
		'show_in_quick_edit' => true, 
		'show_admin_column' => true, 
		'labels' => array(
			'name' => _x( 'Categories', 'taxonomy general name' ),
			'singular_name' => _x( 'Category', 'taxonomy singular name' ),
			'search_items' =>  __( 'Search Categories' ),
			'all_items' => __( 'All Categories' ),
			'parent_item' => __( 'Parent Category' ),
			'parent_item_colon' => __( 'Parent Category:' ),
			'edit_item' => __( 'Edit Category' ),
			'update_item' => __( 'Update Category' ),
			'add_new_item' => __( 'Add New Category' ),
			'new_item_name' => __( 'New Category Name' ),
			'menu_name' => __( 'Categories' ),
		),
		'rewrite' => array(
			'slug' => 'category', 
			'with_front' => false, 
			'hierarchical' => false
		),
	));
	$labels = array(
		'name'               => _x( 'Work', 'post type general name' ),
		'singular_name'      => _x( 'Work', 'post type singular name' ),
		'add_new'            => _x( 'Add New', 'work' ),
		'add_new_item'       => __( 'Add New Work' ),
		'edit_item'          => __( 'Edit Work' ),
		'new_item'           => __( 'New Work' ),
		'all_items'          => __( 'All Works' ),
		'view_item'          => __( 'View Work' ),
		'search_items'       => __( 'Search Work' ),
		'not_found'          => __( 'No Work found' ),
		'not_found_in_trash' => __( 'No Work found in the Trash' ), 
		'parent_item_colon'  => '’',
		'menu_name'          => 'Work'
	);
	$args = array(
		'labels'        => $labels,
		'description'   => 'Lists all of the Work',
		'public'        => true,
		'menu_position' => 5,
		'show_in_menu'  => true,
		'show_in_rest'  => true, 
		'supports'      => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'custom-fields', 'author'),
		'rewrite'       => ['slug' => 'work', 'with_front' => false ],
		'hierarchical'  => false,
		'map_meta_cap'  => true,
		'menu_icon'     => 'dashicons-editor-paste-word',
		'taxonomies'    => array( 'tbwa-work-category' ),
	);
	register_post_type('tbwa-work', $args);
	//  'title', 'editor', 'comments', 'revisions', 'trackbacks', 'author', 'excerpt', 
	//  'page-attributes', 'thumbnail', 'custom-fields', and 'post-formats'.


	////////////////////
	//  News
	register_taxonomy('tbwa-news-category', 'post', array(
		'hierarchical' => true,
		'public' => true, 
		'show_in_rest' => true, 
		'show_in_quick_edit' => true, 
		'show_admin_column' => true, 
		'labels' => array(
			'name' => _x( 'Categories', 'taxonomy general name' ),
			'singular_name' => _x( 'Category', 'taxonomy singular name' ),
			'search_items' =>  __( 'Search Categories' ),
			'all_items' => __( 'All Categories' ),
			'parent_item' => __( 'Parent Category' ),
			'parent_item_colon' => __( 'Parent Category:' ),
			'edit_item' => __( 'Edit Category' ),
			'update_item' => __( 'Update Category' ),
			'add_new_item' => __( 'Add New Category' ),
			'new_item_name' => __( 'New Category Name' ),
			'menu_name' => __( 'Categories' ),
		),
		'rewrite' => array(
			'slug' => 'category', 
			'with_front' => false, 
			'hierarchical' => false
		),
	));
	$labels = array(
		'name'               => _x( 'News', 'post type general name' ),
		'singular_name'      => _x( 'News', 'post type singular name' ),
		'add_new'            => _x( 'Add New', 'news' ),
		'add_new_item'       => __( 'Add New News' ),
		'edit_item'          => __( 'Edit News' ),
		'new_item'           => __( 'New News' ),
		'all_items'          => __( 'All News' ),
		'view_item'          => __( 'View News' ),
		'search_items'       => __( 'Search News' ),
		'not_found'          => __( 'No News found' ),
		'not_found_in_trash' => __( 'No News found in the Trash' ), 
		'parent_item_colon'  => '’',
		'menu_name'          => 'News'
	);
	$args = array(
		'labels'        => $labels,
		'description'   => 'Lists all of the News',
		'public'        => true,
		'menu_position' => 5,
		'show_in_menu'  => true,
		'show_in_rest'  => true, 
		'supports'      => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'custom-fields', 'author'),
		'rewrite'       => ['slug' => 'news', 'with_front' => false ],
		'hierarchical'  => false,
		'map_meta_cap'  => true,
		'menu_icon'     => 'dashicons-media-text',
		'taxonomies'    => array( 'tbwa-news-category' ),
	);
	register_post_type('tbwa-news', $args);

	////////////////////
	//  Leadership
	$labels = array(
		'name'               => _x( 'Leadership', 'post type general name' ),
		'singular_name'      => _x( 'Leader', 'post type singular name' ),
		'add_new'            => _x( 'Add New', 'leader' ),
		'add_new_item'       => __( 'Add New Leader' ),
		'edit_item'          => __( 'Edit Leader' ),
		'new_item'           => __( 'New Leader' ),
		'all_items'          => __( 'All Leaders' ),
		'view_item'          => __( 'View Leader' ),
		'search_items'       => __( 'Search Leader' ),
		'not_found'          => __( 'No Leaders found' ),
		'not_found_in_trash' => __( 'No Leaders found in the Trash' ), 
		'parent_item_colon'  => '’',
		'menu_name'          => 'Leadership'
	);
	$args = array(
		'labels'        => $labels,
		'description'   => 'Lists all of the Leadership.',
		'public'        => true,
		'menu_position' => 5,
		'show_in_menu'  => true,
		'show_in_rest'  => true, 
		'supports'      => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'custom-fields', 'page-attributes', 'author'),
		'rewrite'       => ['slug' => 'leadership', 'with_front' => false ],
		'hierarchical'  => false,
		'map_meta_cap'  => true,
		'menu_icon'     => 'dashicons-businesswoman',
	);
	register_post_type('tbwa-leadership', $args);

	function wpse28782_remove_menu_items() {
		remove_menu_page( 'edit.php?post_type=tbwa-leadership' );
	}
	add_action( 'admin_menu', 'wpse28782_remove_menu_items' );

	////////////////////

}









