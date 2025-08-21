<?php

function tbwa_block_leadership_loop_save_display_item($index, $item, $class) { 

	if ($item) { 

		//  Start
		if ($index < 4) { 
			echo '<div class="item '.$class.'" >';
		} else { 
			echo '<div class="item '.$class.'" data-parallax="50,0,0" >';
		}
		echo '<div class="leadership-card">';
		echo '<a href="'.get_the_permalink($item->ID).'">';

		//  Image
		echo '<div class="image wp-block-tbwa-blocks-image proportion-8-by-9 media-type-image">';
		//  echo get_the_post_thumbnail($item->ID, 'large'); 
		$imageUrl      = get_post_meta($item->ID, '_tbwa_leadership_card_image_url', true);
		$imageHoverUrl = get_post_meta($item->ID, '_tbwa_leadership_card_image_hover_url', true);
		if ($imageUrl && $imageUrl != '') { 
			echo '<img class="normal" loading="eager" src="'.$imageUrl.'" alt="'.get_the_title($item->ID).'" width="976" height="1098">';
		}
		if ($imageHoverUrl && $imageHoverUrl != '') { 
			echo '<img class="hover" loading="eager" src="'.$imageHoverUrl.'" alt="" width="976" height="1098">';
		}
		echo '</div>';

		//  Copy
		echo '<div class="copy" >';

		//  Title
		echo '<h5 class="h5 title">';
		//echo $index.' - ';
		echo get_the_title($item->ID);
		echo '</h4>';

		//  Description
		$desc1 = get_post_meta($item->ID, '_tbwa_leadership_card_description1', true);
		$desc2 = get_post_meta($item->ID, '_tbwa_leadership_card_description2', true);
		echo '<div class="wp-block-tbwa-blocks-paragraph excerpt">';
		if (!empty($desc1)) { 
			echo '<p class="standard">'.$desc1.'</p>';
		}
		if (!empty($desc2)) { 
			echo '<p class="standard">'.$desc2.'</p>';
		}
		echo '</div>';

		echo '</div>';
		echo '</a>';
		echo '</div>';
		echo '</div>';

	}
}

function tbwa_block_leadership_loop_save($attributes, $content) { 


	ob_start();
	?>
	<div class="wp-block-tbwa-blocks-section width-standard background-white">
		<div class="wp-block-tbwa-blocks-leadership-loop" >
			<?php

			$items = get_posts(array(
				'post_type'        => 'tbwa-leadership', 
				'numberposts'      => -1,
//				'category'         => get_category_by_slug(get_query_var('category'))->term_id,
				'orderby'          => 'menu_order',
				'order'            => 'ASC'
			));

			if ($items) { 

				//  4 Staggered
				$i = 0;
				if (count($items) > 1) { 
					echo '<div class="items layout-staggered desktop-3 tablet-2">';
					tbwa_block_leadership_loop_save_display_item($i+0, $items[$i+0], 'column-1');
					tbwa_block_leadership_loop_save_display_item($i+1, $items[$i+1], 'column-2');
					tbwa_block_leadership_loop_save_display_item($i+2, $items[$i+2], 'column-3');
					tbwa_block_leadership_loop_save_display_item($i+3, $items[$i+3], 'column-4');
					echo '<div class="columns-3-4">';
					tbwa_block_leadership_loop_save_display_item($i+2, $items[$i+2], 'column-3');
					tbwa_block_leadership_loop_save_display_item($i+3, $items[$i+3], 'column-4');
					echo '</div>';
					echo '</div>';
					$i += 4;
				}

				//  6 Straight
				if (count($items) > 4) { 
					echo '<div class="items layout-standard desktop-3 tablet-2">';
					for ($i=4; $i<min(10,count($items)); $i++) { 
						tbwa_block_leadership_loop_save_display_item($i, $items[$i], '');
					}
					echo '</div>';
				}


				//  4 Staggered
				if (count($items) > 10) { 
					echo '<div class="items layout-staggered desktop-3 tablet-2">';
					tbwa_block_leadership_loop_save_display_item($i+0, $items[$i+0], 'column-1');
					tbwa_block_leadership_loop_save_display_item($i+1, $items[$i+1], 'column-2');
					tbwa_block_leadership_loop_save_display_item($i+2, $items[$i+2], 'column-3');
					tbwa_block_leadership_loop_save_display_item($i+3, $items[$i+3], 'column-4');
					echo '<div class="columns-3-4">';
					tbwa_block_leadership_loop_save_display_item($i+2, $items[$i+2], 'column-3');
					tbwa_block_leadership_loop_save_display_item($i+3, $items[$i+3], 'column-4');
					echo '</div>';
					echo '</div>';
					$i += 4;
				}

				//  The rest
				if (count($items) > 14) { 
					echo '<div class="items layout-standard desktop-3 tablet-2">';
					for ($i=14; $i<count($items); $i++) { 
						tbwa_block_leadership_loop_save_display_item($i, $items[$i], '');
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

