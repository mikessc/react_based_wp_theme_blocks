<?php

function tbwa_block_work_hero_save($attributes, $content) { 
	global $post;
	ob_start();
	?>
	<div class="wp-block-tbwa-blocks-work-hero" >
		<div class="work-breadcrumb" aria-label="Breadcrumbs navigation - You have come from the main work page and are now on a case study page <?php echo $attributes['title']; ?>">
			<div class="column">
				<a href="/work/">
					<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M7.95045 0.489746L9.04964 1.51042L3.71995 7.25008H16V8.75008H3.71995L9.04964 14.4897L7.95045 15.5104L0.976562 8.00008L7.95045 0.489746Z" fill="white"/>
					</svg>
					Work
				</a>
				<div class="divisor">
					<svg viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M1.78033 12.7803L0.719666 11.7196L5.68934 6.74994L0.719666 1.78027L1.78033 0.719614L7.81066 6.74994L1.78033 12.7803Z" fill="white"/>
					</svg>
				</div>
				<div class="work_title"><?php echo $attributes['title']; ?></div>
			</div>
		</div>
		<div class="media-type-<?php echo $attributes['mediaType']; ?> background-<?php echo $attributes['background']; ?>" >
			<div class="media">
				<?php 
				if ($attributes['mediaType'] == 'image') { 
					echo '<img src="'.$attributes['mediaUrl'].'" alt="'.$attributes['mediaAlt'].'" title="'.$attributes['mediaTitle'].'" loading="eager" width="400" height="300" />';
				}
				if ($attributes['mediaType'] == 'video') { 
					echo '<video width="400" height="300" autoPlay loop muted >';
					echo '<source src="'.$attributes['mediaUrl'].'" type="'.$attributes['mediaMime'].'"  />';
					echo '</video>';
				}
				?>
			</div>
			<div class="column">
				<div class="title" >
					<h1 class="h1" ><?php echo $attributes['title']; ?></h1>
					<h3 class="h3" ><?php echo $attributes['client']; ?></h2>
					<h3 class="h3" ><?php echo $attributes['agency']; ?></h3>
				</div>
				<div class="tbwa-tag-categories right" data-parallax="65,1,0" >
					<?php
					$categories = get_the_terms($post->ID, 'tbwa-work-category');
					$page = get_page_by_path('our-work');
					$current_url = 'work';

					if ($page) {
						$current_url = 'our-work';
					}
					if ($categories) { 
						foreach($categories as $category) {
							if ($category->slug == 'all') { 
							} else if ($category->slug == 'uncategorized') { 
							} else { 
								echo '<a href="/' . $current_url . '/?category='.$category->slug.'" target="" >'.$category->name.'</a>';
							}
						}
					}
					?>
				</div>
				<?php
				if ($attributes['ctaEnabled']) { 
					?>
					<div class="cta" data-parallax="75,1,0">
						<a href="<?php echo $attributes['ctaUrl']; ?>" target="<?php echo $attributes['ctaTarget']; ?>" ><?php echo $attributes['ctaText']; ?></a>
					</div>
					<?php 
				}
				?>
				<div class='content' data-parallax="50,1,1">
					<div class='wp-block-tbwa-blocks-rule-line'><div class='width-full'></div></div>
					<?php echo do_blocks($content); ?>
				</div>
			</div>
		</div>
	</div>
	<?php
	return ob_get_clean();
}

