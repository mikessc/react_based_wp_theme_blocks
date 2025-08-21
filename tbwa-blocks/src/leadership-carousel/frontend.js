document.addEventListener('DOMContentLoaded', function () {

	var $;
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-leadership-carousel');

	function initCarousel(block) { 

		const items = $(block).find('.items');
		const ctaPlaceholder = $(block).next('.inserted-carousel-cta');
		
		const slickOptions = {
			lazyLoad: 'ondemand',
			adaptiveHeight: true,
			centerMode: true,
			dots: true,
			infinite: true,
			slidesToShow: 7,
			speed: 0,
			variableWidth: true,
		}
		$(ctaPlaceholder).append($(items).find('.wp-block-tbwa-blocks-button-cta'));
		/* if (itemsNumber < 17) {
			slickOptions.slidesToShow = itemsNumber;
		} */

		// If there are not items, carousel does not init
		if (items.length <= 0) {
			return;
		}

		items
			.on('init', function(event, slick, direction){
				changeImgSrcData();
				clearImmediateSlidesClasses(items);
				addImmediateSlidesClasses(items);
				
			})
			.on('beforeChange', function(event, slick, direction){
				clearImmediateSlidesClasses(items);
				$(items).find('.slick-center h4, .slick-center ');
			})
			.on('afterChange', function(event, slick, direction){
				clearImmediateSlidesClasses(items);
				addImmediateSlidesClasses(items);
			})
			.slick(slickOptions);

			function changeImgSrcData () {
				console.log('clearing carousel images source');
				
				let clonedImages = document.querySelectorAll('.slick-cloned img');
				// Iterate over each cloned image
				clonedImages.forEach((img) => {
					// Check if the image has a `data-src` attribute
					if (img.hasAttribute('data-src')) {
						// Set the `src` to the value of `data-src`
						img.src = img.getAttribute('data-src');
					}
				});
			}

			function addImmediateSlidesClasses (items) {
				const currentSlide = $(items).find('.slick-center');

				$(currentSlide)
					.next('.slick-slide')
					.addClass('center-right');
				$(currentSlide)
					.prev('.slick-slide')
					.addClass('center-left');
			}

			function clearImmediateSlidesClasses (items) {
				$(items).find('.slick-slide')
					.removeClass('center-left')
					.removeClass('center-right');
				$(items).find('.slick-cloned')
					.removeClass('center-left')
					.removeClass('center-right')
					.removeClass('slick-center');
			}

	}

	function initCarouselMethod() {
		for (var i=0; i<blocks.length; i++) {
			const block = blocks[i];
			initCarousel(block);
		}
	}

	// Wait to jQuery to be loaded
	function defer(initCarouselMethod) {
		if (window.jQuery) {
			$ = window.jQuery;
			initCarouselMethod();
		} else {
			console.log('no');
			setTimeout(function() { defer(initCarouselMethod) }, 50);
		}
	}

	defer(initCarouselMethod);

}, false);
