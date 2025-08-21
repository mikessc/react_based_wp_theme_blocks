<?php


function tbwa_block_search_loop_save_display_item($item) { 

	//  Item start
	echo '<div class="search-item" >';
	echo '<div class="tbwa-card">';
	echo '<a href="'.get_the_permalink($item->ID).'">';

	//  Image
	echo '<div class="image wp-block-tbwa-blocks-image proportion-8-by-9 media-type-image" >';
	if (has_post_thumbnail($item->ID)) { 
		echo get_the_post_thumbnail($item->ID, 'medium', array('loading' => 'eager')); 
	}
	echo '</div>';

	//  Copy
	echo '<div class="copy" data-parallax="50,0,0">';

	//  News - date
	if ($item->post_type == 'tbwa-news') { 
		echo '<div class="wp-block-tbwa-blocks-paragraph sub-title">';
		echo '<p class="small">'.get_the_date('', $item->ID).'</p>';
		echo '</div>';
	}

	//  Work - client name
	if ($item->post_type == 'tbwa-work') { 
		$clientName = get_post_meta($item->ID, '_tbwa_meta_tags_client_name', true);
		if ($clientName && $clientName != '') { 
			echo '<div class="wp-block-tbwa-blocks-paragraph sub-title">';
			echo '<p class="small">'.$clientName.'</p>';
			echo '</div>';
		}
	}
	
	//  Title
	echo '<h5 class="h5 title">';
	echo $item->post_title;
	echo '</h5>';

	//  Excerpt
	echo '<div class="wp-block-tbwa-blocks-paragraph excerpt">';
	echo '<p class="">';
	if (!empty($item->post_excerpt)) {
		echo $item->post_excerpt;
	} else { 
		$s = $item->post_content;
		if (preg_match('%(<p[^>]*>.*?</p>)%i', $s, $regs)) {
			$s = $regs[1];
		} else {
			$s = '';
		}
		$s = wp_strip_all_tags($s);
		$s = wp_trim_words($s, 55);
		echo $s;
	}
	echo '</p>';
	echo '</div>';

	echo '</div>';
	echo '</a>';
	echo '</div>';
	echo '</div>';
}

function tbwa_block_search_loop_save($attributes, $content) { 
	ob_start();
	?>
	<div class="wp-block-tbwa-blocks-section width-standard background-white">
		<div class="wp-block-tbwa-blocks-search-loop" >

			<?php

			//  Load the results
			$perPage = 99;
			$offset = 0;
			$items = array();
			$search_term = isset($_GET['keywords']) ? sanitize_text_field($_GET['keywords']) : '';

			while (true) { 
				$query = new WP_Query(array(
					's' => $search_term, 
					'posts_per_page' => $perPage,
					'offset'         => $offset,
					'orderby'        => 'date',
					'order'          => 'DESC', 
					'post_status'    => array('publish')
				));

				$items = array_merge($items, $query->posts);
				$offset += $perPage;
				if (count($query->posts) < $perPage) { 
					break;
				}
			}

			//  Remove Search and Page not found
			$itemsClean = array();
			foreach ($items as $item) { 
				if ($item->post_name == 'search') { 
					//
				} else if ($item->post_name == 'page-not-found') { 

				} else {
					$itemsClean[] = $item;
				}
			}
			$items = $itemsClean;

			//  41 search results for ...
			if (get_query_var('keywords') == '') { 
				echo '<h1 class="h4">Use the search in the nav to search.</h1>';
			} else if (count($items) == 0) { 
				echo '<h1 class="h4">No search results for</h1>';
			} else if (count($items) == 1) { 
				echo '<h1 class="h4">One search result for</h1>';
			} else { 
				echo '<h1 class="h4">'.count($items).' search results for</h1>';
			}

			//  "McDonalds"
			if (get_query_var('keywords') != '') { 
				echo '<h2 class="h2">&ldquo;'. esc_html(get_query_var('keywords')) .'&rdquo;</h2>';

				//  Items 
				if ($items) { 
					echo '<div class="search-items">';
					foreach ($items as $item) { 
						tbwa_block_search_loop_save_display_item($item);
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

