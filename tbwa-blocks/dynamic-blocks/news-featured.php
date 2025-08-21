<?php


function tbwa_block_news_featured_save($attributes, $content) { 

	$item = get_post($attributes['postID']);
	ob_start();
	if ($item) { 

		//  External Link?
		$externalLink = get_post_meta($item->ID, '_tbwa_meta_tags_news_external_link', true);

		//  Item start
		echo '<div class="wp-block-tbwa-blocks-news-featured">';
		echo '<div class="tbwa-card">';
		
		//  Link
		if ($externalLink && $externalLink != '' && filter_var($externalLink, FILTER_VALIDATE_URL)) { 
			echo '<a href="'.$externalLink.'" target="_blank" rel="noopener noreferrer" >';
		} else { 
			echo '<a href="'.get_the_permalink($item->ID).'">';
		}

		//  Featured Image
		echo '<div class="image wp-block-tbwa-blocks-image proportion-16-by-9 media-type-image">';
		echo get_the_post_thumbnail($item->ID, 'large', array('loading' => 'eager')); 
		echo '</div>';

		//  Copy
		echo '<div class="copy">';

		//  Date
		echo '<div class="wp-block-tbwa-blocks-paragraph date">';
		echo '<p class="small">';
		echo get_the_date('', $item->ID);
		echo '</p>';
		echo '</div>';
		
		//  Title
		echo '<h5 class="h5 title">';
		echo get_the_title($item->ID);
		echo '</h5>';

		//  Author
		$author = get_post_meta($item->ID, '_tbwa_meta_tags_news_author', true);
		if ($author != '') {
			echo '<div class="wp-block-tbwa-blocks-paragraph author">';
			echo '<p class="small">';
			echo $author;
			echo '</p>';
			echo '</div>';
		}
		
		//  Excerpt
		echo '<div class="wp-block-tbwa-blocks-paragraph excerpt">';
		echo '<p class="standard">';
		if (!empty($item->post_excerpt)) {
			echo $item->post_excerpt;
		} else { 
			echo wp_trim_words($item->post_content, 55);
		}
		echo '</p>';
		echo '</div>';
		
		echo '</div>';
		echo '</a>';
		echo '</div>';
		echo '</div>';
	}
	return ob_get_clean();
}

