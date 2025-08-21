<?php


function tbwa_block_work_featured_save($attributes, $content) { 

	$item = get_post($attributes['postID']);
	ob_start();
	if ($item) { 

		//  Item start
		echo '<div class="wp-block-tbwa-blocks-work-featured">';
		echo '<div class="tbwa-card">';
		echo '<a href="'.get_the_permalink($item->ID).'">';

		//  Featured Image
		echo '<div class="image wp-block-tbwa-blocks-image proportion-8-by-9 media-type-image">';
		echo get_the_post_thumbnail($item->ID, 'medium', array('loading' => 'eager')); 
		echo '</div>';

		//  Copy
		echo '<div class="copy">';

		//  Client Name
		$clientName = get_post_meta($item->ID, '_tbwa_meta_tags_client_name', true);
		if ($clientName && $clientName != '') { 
			echo '<div class="wp-block-tbwa-blocks-paragraph client-name">';
			echo '<p class="small">'.$clientName.'</p>';
			echo '</div>';
		}
		
		//  Title
		echo '<h5 class="h5 title">';
		echo get_the_title($item->ID);
		echo '</h5>';

		//  Excerpt
		if (has_excerpt($item->ID)) { 
			echo '<div class="wp-block-tbwa-blocks-paragraph excerpt">';
			echo '<p class="standard">'.get_the_excerpt($item->ID).'</p>';
			echo '</div>';
		}

		echo '</div>';
		echo '</a>';
		echo '</div>';
		echo '</div>';
	}
	return ob_get_clean();
}

