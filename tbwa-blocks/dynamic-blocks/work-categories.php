<?php

function tbwa_block_work_categories_save_display_category($category, $all) { 
	$className = '';
	$page = get_page_by_path('our-work');
	$current_url = 'work';

	if ($page) {
		$current_url = 'our-work';
	}

	if (get_query_var('category') == $category->slug) { 
		$className = 'active';
	}
	if (get_query_var('category') == '' && $category->slug == 'all') { 
		$className = 'active';
	}
	if ($category->slug == 'uncategorized') { 
		//
	} else if ($category->slug == 'all') { 
		if ($all) { 
			echo '<a href="/' . $current_url . '" target="_parent" class="'.$className.'" >'.$category->name.'</a>';
		}
	} else { 
		echo '<a href="/' . $current_url . '?category='.$category->slug.'" target="_parent" class="'.$className.'" >'.$category->name.'</a>';
	}
}

function tbwa_block_work_categories_save($attributes, $content) { 
	global $post;

	ob_start();
	?>
	<div class="wp-block-tbwa-blocks-work-categories" >
		<div class="tbwa-tag-categories" >

			<?php

			if ($post->post_type == 'tbwa-work') { 

				//  Show the categories just for this post
				$categories = get_the_terms($post->ID, 'tbwa-work-category');
				if ($categories) { 
					foreach($categories as $category) {
						tbwa_block_work_categories_save_display_category($category, false);
					}
				}

			} else { 

				//  Show all the used categories
				$categories = new WP_Term_Query(array(
					'post_type'              => 'tbwa-work',
					'taxonomy'               => 'tbwa-work-category',
					'hide_empty'             => true,
					'fields'                 => 'all'
				));

				if (!empty($categories) && !is_wp_error($categories)) {
					foreach($categories->terms as $category) {
						tbwa_block_work_categories_save_display_category($category, true);
					}
				}

			}


			?>
		</div>
	</div>
	<?php
	return ob_get_clean();
}

