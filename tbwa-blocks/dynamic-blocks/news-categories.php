<?php

function tbwa_block_news_categories_save_display_category($category, $all) { 
	$className = '';
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
			echo '<a href="/news/" target="_parent" class="'.$className.'" >'.$category->name.'</a>';
		}
	} else { 
		echo '<a href="/news/?category='.$category->slug.'" target="_parent" class="'.$className.'" >'.$category->name.'</a>';
	}
}

function tbwa_block_news_categories_save($attributes, $content) { 
	global $post;

	ob_start();
	?>
	<div class="wp-block-tbwa-blocks-news-categories" >

			<?php

			if ($post->post_type == 'tbwa-news') { 
				echo '<div class="tbwa-tag-categories right" >';
			} else { 
				echo '<div class="tbwa-tag-categories" >';
			}
			
			if ($post->post_type == 'tbwa-news') { 

				//  Show the categories just for this post
				$categories = get_the_terms($post->ID, 'tbwa-news-category');
				if ($categories) { 
					foreach($categories as $category) {
						tbwa_block_news_categories_save_display_category($category, false);
					}
				}

			} else { 

				//  Show all the used categories
				$categories = new WP_Term_Query(array(
					'post_type'              => 'tbwa-news',
					'taxonomy'               => 'tbwa-news-category',
					'hide_empty'             => true,
					'fields'                 => 'all'
				));

				if (!empty($categories) && !is_wp_error($categories)) {
					foreach($categories->terms as $category) {
						tbwa_block_news_categories_save_display_category($category, true);
					}
				}

			}


			?>
		</div>
	</div>
	<?php
	return ob_get_clean();
}

