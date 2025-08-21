<?php


function tbwa_block_work_featured_loop_landscape_save($attributes, $content) {
    $numberOfItems = $attributes['numberOfItems'] ?? 3;
    $showSeeMore = $attributes['showSeeMore'] ?? true;
    $seeMoreText = $attributes['seeMoreText'] ?? 'See more work';
    $items = array();
    $i = 0;

    ob_start();

    if (get_query_var('category') == '') { 
        $items = get_posts(array(
            'post_type'          => 'tbwa-work', 
            'numberposts'        => $numberOfItems,
            'orderby'            => 'menu_order',
            'order'              => 'ASC'
        ));
    } else { 
        $items = get_posts(array(
            'post_type'          => 'tbwa-work', 
            'numberposts'        => $numberOfItems,
            'tax_query'          => array(array(
                'taxonomy' => 'tbwa-work-category',
                'field'    => 'slug', 
                'terms'    => get_query_var('category') 
            )), 
            'orderby'            => 'menu_order',
            'order'              => 'ASC'
        ));
    }

    if ($items) {
        echo '<div>';
        echo '<div class="wp-block-tbwa-blocks-section width-standard background-white stripe-none">';
        echo '<div class="wp-block-tbwa-blocks-card-container">';
        echo '<h2 id="noMarginsHeading" class="h4">The Work</h2>';

        echo '<div class="wp-block-tbwa-blocks-column-grid">';

        foreach ($items as $index => $item) {
            // Assign parallax data and styles based on index
            $parallax = match ($index) {
                0 => "30,1,0",
                1 => "60,1,0",
                2 => "90,1,0",
                default => "0,0,0"
            };

            echo '<div class="wp-block-tbwa-blocks-column-grid-item cols-desktop-4 cols-tablet-6 cols-mobile-4" data-parallax="'.$parallax.'">';
            echo '<div class="wp-block-tbwa-blocks-work-featured">';
            echo '<div class="tbwa-card">';
            echo '<a href="'.get_the_permalink($item->ID).'">';

            // Featured Image
            echo '<div class="image wp-block-tbwa-blocks-image proportion-16-by-9 media-type-image">';
            echo get_the_post_thumbnail($item->ID, 'medium', array('loading' => 'eager'));
            echo '</div>';

            // Copy
            echo '<div class="copy">';

            // Client Name
            $clientName = get_post_meta($item->ID, '_tbwa_meta_tags_client_name', true);
            if ($clientName && $clientName != '') {
                echo '<div class="wp-block-tbwa-blocks-paragraph client-name">';
                echo '<p class="small">'.$clientName.'</p>';
                echo '</div>';
            }

            // Title
            echo '<h5 class="h5 title">';
            echo get_the_title($item->ID);
            echo '</h5>';

            // Excerpt
            $post = get_post($item->ID);

            $excerpt = $post->post_excerpt;
            
            if (!$excerpt) {
                
                $excerpt = wp_trim_words(strip_tags($post->post_content), 30);
            }

            echo '<div class="wp-block-tbwa-blocks-paragraph excerpt">';
            echo '<p class="standard">' . esc_html($excerpt) . '</p>';
            echo '</div>';

            echo '</div>'; // End Copy
            echo '</a>';
            echo '</div>'; // End Card
            echo '</div>'; // End Work Featured
            echo '</div>'; // End Column Grid Item
        }

        echo '</div>'; // End Column Grid

        if ($showSeeMore) {
            echo '<div class="wp-block-tbwa-blocks-button-cta alignright">';
            echo '<a href="/work/" class="size-standard color-standard">';
            echo '<div>'.$seeMoreText.'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="arrowIcon"><path d="M12.9 9.7v2.6H2.7V9.7h10.2zM9.6 3.1h3.7l7.9 7.9-7.9 7.9H9.6l7.9-7.9-7.9-7.9z"></path></svg></div>';
            echo '</a>';
            echo '</div>'; // End Button CTA
        }

        echo '</div>'; // End Card Container
        echo '</div>'; // End Block
        echo '</div>';
    }

    return ob_get_clean();
}
