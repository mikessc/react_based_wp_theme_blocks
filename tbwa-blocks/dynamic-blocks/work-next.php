<?php


function tbwa_block_work_next_save($attributes, $content) { 

	//  The current work post
	global $post;
	$currentID = $post->ID;

	//  All the work posts
	$items = get_posts(array(
		'post_type'        => 'tbwa-work', 
		'numberposts'      => -1,
		'orderby'          => 'menu_order',
		'order'            => 'ASC',
		'ignore_custom_sort' => true, 
	));
	$currentIndex = null;
	if ($items) { 
		for ($i=0; $i<count($items); $i++) { 
			if ($items[$i]->ID == $currentID) { 
				$currentIndex = $i;
				break;
			}
		}
	}



	ob_start();
	if ($currentIndex !== null) { 
		$currentIndex += 1;
		if ($currentIndex >= count($items)) { 
			$currentIndex = 0;
		}
		$item = $items[$currentIndex];

		//  Item start
		?>
		<div class="wp-block-tbwa-blocks-section width-standard background-black" style="padding-top:0px;padding-bottom:0px">
			<div class="wp-block-tbwa-blocks-work-next" data-parallax="50,0,0">
				<div>
					<div class="wp-block-tbwa-blocks-rule-line"><div class="width-full"></div></div>
					<div class="wp-block-tbwa-blocks-paragraph"><p class="standard bottom-margin-80">Next</p></div>
					<h4 class="h4 title"><?php echo get_the_title($item->ID) ?></h4>
					<?php
					if (has_excerpt($item->ID)) { 
						?>
						<div class="wp-block-tbwa-blocks-paragraph excerpt">
							<p class="standard"><?php echo get_the_excerpt($item->ID); ?></p>
						</div>
						<?php
					}
					?>
					<div class="wp-block-tbwa-blocks-button-cta">
						<a href="<?php echo get_the_permalink($item->ID); ?>" class="read_article size-standard color-standard">
							<div>
								View work 
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24" xml:space="preserve" class="arrowIcon"><path d="M12.9 9.7v2.6H2.7V9.7h10.2zM9.6 3.1h3.7l7.9 7.9-7.9 7.9H9.6l7.9-7.9-7.9-7.9z"></path></svg>
							</div>
						</a>
					</div>
					<div class="image wp-block-tbwa-blocks-image proportion-top-cut media-type-image">
						<?php echo get_the_post_thumbnail($item->ID, 'large', array('loading' => 'eager')); ?>
					</div>
				</div>
			</div>
		</div>
		<div class="wp-block-tbwa-blocks-follow-cursor position-hidden size-small color-black-white" >
			<a 
				href="<?php echo get_the_permalink($item->ID); ?>" 
				target="_parent" 
				data-cursor="go" 
				data-cursor-position="hidden" 
				data-cursor-size="small" 
				data-cursor-color="black-white" 
				rel="noopener"
				>Go</a>
		</div>
		<?php

	}



	return ob_get_clean();
}

