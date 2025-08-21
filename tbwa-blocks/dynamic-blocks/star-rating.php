<?php


function tbwa_block_star_rating_save($attributes, $content) { 

	$utm_id = isset($_GET['utm_id']) ? sanitize_text_field($_GET['utm_id']) : '';
    $rating = isset($_GET['rating']) ? intval($_GET['rating']) : 0;

    if ($utm_id && $rating >= 1 && $rating <= 10) {
        $dt = new DateTime('now', new DateTimeZone('Pacific/Auckland'));
        $timestamp = $dt->format('Y-m-d H:i:s');

        $csv_line = [$timestamp, $utm_id, $rating];

		$upload_dir = wp_upload_dir();
		$csv_file = $upload_dir['basedir'] . '/southern-cross-braze-feedback.csv';


        if (file_exists($csv_file) && is_writable($csv_file) || !file_exists($csv_file)) {
            $fp = fopen($csv_file, 'a');
            if ($fp) {
                fputcsv($fp, $csv_line);
                fclose($fp);
            }
        }
    }

	$customText = isset($attributes['customText']) ? esc_html($attributes['customText']) : '';
	$imageURL = isset($attributes['imageURL']) ? esc_url($attributes['imageURL']) : '';

    ob_start();
	?>
	<style>
		#onetrust-consent-sdk, #ot-sdk-btn-floating {
			display: none !important;
		}
	</style>
	<div class="wp-block-tbwa-feedback-block">
		<header>
			<div class="logo">
				<a href="https://www.southerncross.co.nz">
					<img src="<?php plugins_url('images/logo.svg', __FILE__); ?>" alt="" class="logo-img" />
					<?php echo '<img class="logo-img" src="' . plugins_url('images/logo.svg', __FILE__) . '" alt="Southern Cross Health Insurance" />'; ?>
				</a>
			</div>
		</header>
		<section>
			<div class="content">
				<div class="main_image">
					<?php if ($imageURL): ?>
						<img src="<?php echo $imageURL; ?>" alt="" class="proportion-top-cut" />
					<?php endif; ?>
				</div>
				<div class="text">
					<div class="stars">
						<?php
							for ($i = 1; $i <= 5; $i++) {
								if ($i <= $rating) {
									echo '<img class="star filled" src="' . plugins_url('images/star-filled.svg', __FILE__) . '" alt="Star" />';
								} else {
									echo '<img class="star empty" src="' . plugins_url('images/star-empty.svg', __FILE__) . '" alt="Star" />';
								}
							}
						?>
					</div>
					<h2>Thanks for your feedback</h2>
					<p>We really appreciate you taking the time to let us know how we’re doing. Every response helps us improve and continue delivering the best experience we can.</p>
					<div class="cta">
						<a href="https://www.southerncross.co.nz/society/contact"  class="btn">Contact us</a>
					</div>
				</div>
			</div>
		</section>
	</div>
	<?php
	return ob_get_clean();
}

