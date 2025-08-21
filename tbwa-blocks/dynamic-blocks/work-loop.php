<?php



function tbwa_block_work_loop_save_display_item($index, $item, $jumbo, $class) { 

	if ($item) { 

		//  Item start
		if ($index == 0) {
			echo '<div class="item jumbo '.$class.'" >';
		} else if ($jumbo) { 
			echo '<div class="item jumbo '.$class.'" data-parallax="100,0,0">';
		} else { 
			echo '<div class="item '.$class.'" data-parallax="50,0,0">';
		}
		echo '<div class="tbwa-card">';

		//  Featured Image
		if ($jumbo) { 
			echo '<div class="image wp-block-tbwa-blocks-image proportion-16-by-9 media-type-image">';
		} else { 
			echo '<div class="image wp-block-tbwa-blocks-image proportion-8-by-9 media-type-image">';
		}
		echo get_the_post_thumbnail($item->ID, 'large', array('loading' => 'eager')); 
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
		echo '<a href="'.get_the_permalink($item->ID).'">';
		if ($jumbo) { 
			echo '<h3 class="h3 title">';
			//echo $index.' - ';
			echo get_the_title($item->ID);
			echo '</h3>';
		}
		echo '<h5 class="h5 title">';
		//echo $index.' - ';
		echo get_the_title($item->ID);
		echo '</h5>';
		echo '</a>';

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
		echo '</div>';
		echo '</div>';

	}
}



function tbwa_block_work_loop_save($attributes, $content) { 

	ob_start();
	?>
	<div class="wp-block-tbwa-blocks-section width-standard background-white work-loop-half-black-bar">
		<div class="wp-block-tbwa-blocks-work-loop" >
			<?php

			$perPage = 50;
			$offset = 0;
			$items = array();
			$i = 0;
			while (true) { 
				if (get_query_var('category') == '') { 
					$a = get_posts(array(
						'post_type'          => 'tbwa-work', 
						'numberposts'        => $perPage,
						'offset'             => $offset,
						'orderby'            => 'menu_order',
						'order'              => 'ASC',
						'ignore_custom_sort' => true, 
					));
				} else { 
					$a = get_posts(array(
						'post_type'          => 'tbwa-work', 
						'numberposts'        => $perPage,
						'offset'             => $offset,
						'tax_query'          => array(array(
							'taxonomy' => 'tbwa-work-category',
							'field'    => 'slug', 
							'terms'    => get_query_var('category') 
						)), 
						'orderby'            => 'menu_order',
						'order'              => 'ASC',
						'ignore_custom_sort' => true, 
					));
				}
				$items = array_merge($items, $a);
				$offset += $perPage;
				if (count($a) < $perPage) { 
					break;
				}
			}

			if ($items) { 

				//  One Jumbo
				if (count($items) > 0) { 
					echo '<div class="items layout-standard desktop-1 tablet-1">';
					tbwa_block_work_loop_save_display_item($i, $items[0], true, '');
					echo '</div>';
					$i += 1;
				}

				//  4 Staggered
				if (count($items) > 1) { 
					echo '<div class="items layout-staggered desktop-3 tablet-2">';
					tbwa_block_work_loop_save_display_item($i+0, $items[$i+0], false, 'column-1');
					tbwa_block_work_loop_save_display_item($i+1, $items[$i+1], false, 'column-2');
					tbwa_block_work_loop_save_display_item($i+2, $items[$i+2], false, 'column-3');
					tbwa_block_work_loop_save_display_item($i+3, $items[$i+3], false, 'column-4');
					echo '<div class="columns-3-4">';
					tbwa_block_work_loop_save_display_item($i+2, $items[$i+2], false, 'column-3');
					tbwa_block_work_loop_save_display_item($i+3, $items[$i+3], false, 'column-4');
					echo '</div>';
					echo '</div>';
					$i += 4;
				}

				//  One Jumbo
				if (count($items) > 5) { 
					echo '<div class="items layout-standard desktop-1 tablet-1">';
					tbwa_block_work_loop_save_display_item($i, $items[$i], true, '');
					echo '</div>';
					$i += 1;
				}

				//  3 Staggered
				if (count($items) > 6) { 
					echo '<div class="items layout-staggered desktop-3 tablet-2">';
					tbwa_block_work_loop_save_display_item($i+0, $items[$i+0], false, 'column-1');
					tbwa_block_work_loop_save_display_item($i+1, $items[$i+1], false, 'column-2');
					tbwa_block_work_loop_save_display_item($i+2, $items[$i+2], false, 'column-3');
					echo '<div class="columns-3-4">';
					tbwa_block_work_loop_save_display_item($i+2, $items[$i+2], false, 'column-3');
					echo '</div>';
					echo '</div>';
					$i += 3;
				}

				//  The rest
				if (count($items) > 9) { 
					echo '<div class="items layout-standard desktop-3 tablet-2">';
					for ($i=9; $i<count($items); $i++) { 
						tbwa_block_work_loop_save_display_item($i, $items[$i], false, '');
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

