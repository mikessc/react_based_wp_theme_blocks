<?php 


function tbwa_block_news_loop_save_display_item($item, $parallax) { 

	//  External Link?
	$externalLink = get_post_meta($item->ID, '_tbwa_meta_tags_news_external_link', true);

	//  Item start
	if ($parallax) { 
		echo '<div class="item" data-parallax="50,0,0">';
	} else { 
		echo '<div class="item" >';
	}
	echo '<div class="tbwa-card">';
	if ($externalLink && $externalLink != '' && filter_var($externalLink, FILTER_VALIDATE_URL)) { 
		echo '<a href="'.$externalLink.'" target="_blank" rel="noopener noreferrer" >';
	} else { 
		echo '<a href="'.get_the_permalink($item->ID).'">';
	}

	//  Image
	echo '<div class="image wp-block-tbwa-blocks-image proportion-16-by-9 media-type-image">';
	echo get_the_post_thumbnail($item->ID, 'large', array('loading' => 'eager')); 
	echo '</div>';

	//  Copy
	echo '<div class="copy" data-parallax="20,0,0">';
	
	//  Date
	echo '<div class="wp-block-tbwa-blocks-paragraph date">';
	echo '<p class="small">'.get_the_date('', $item->ID).'</p>';
	echo '</div>';
	
	//  Title
	echo '<h5 class="h5 title">';
	echo get_the_title($item->ID);
	echo '</h5>';

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

function tbwa_block_news_loop_save($attributes, $content) { 

	ob_start();
	?>
	<div class="wp-block-tbwa-blocks-section width-standard background-white">
		<div class="wp-block-tbwa-blocks-news-loop" >
			
			<?php
			$perPage = 50;
			$offset = 0;
			$items = array();
			$currentCategory = get_query_var('category');

			if ($attributes['category'] != '') {
				$currentCategory = $attributes['category'];
			} 

			while (true) { 
				if ($currentCategory == '') { 
					$a = get_posts(array(
						'post_type'          => 'tbwa-news', 
						'numberposts'        => $perPage,
						'offset'             => $offset,
						'orderby'            => 'date',
						'order'              => 'DESC'
					));
				} else { 
					$a = get_posts(array(
						'post_type'          => 'tbwa-news', 
						'numberposts'        => $perPage,
						'offset'             => $offset,
						'tax_query'          => array(array(
							'taxonomy' => 'tbwa-news-category',
							'field'    => 'slug', 
							'terms'    => $currentCategory 
						)), 
						'orderby'            => 'date',
						'order'              => 'DESC'
					));
				}
				$items = array_merge($items, $a);
				$offset += $perPage;
				if (count($a) < $perPage) { 
					break;
				}
			}

			if ($items) { 

				//  2 side by side
				if (count($items) > 0) { 
					echo '<div class="items desktop-2 tablet-2">';
					for ($i=0; $i<min(2,count($items)); $i++) { 
						tbwa_block_news_loop_save_display_item($items[$i], false);
					}
					echo '</div>';
				}

				//  The rest 3 side by side
				if (count($items) > 2) { 
					echo '<div class="items desktop-3 tablet-2">';
					for ($i=2; $i<count($items); $i++) { 
						tbwa_block_news_loop_save_display_item($items[$i], true);
					}
					echo '</div>';
				}

			}

			?>
		</div>
	</div>
	<?php
	return ob_get_clean();
}

