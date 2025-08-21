
document.addEventListener('DOMContentLoaded', function () {

	function initWorkNext(block) { 

		const holdAtBottomDuration = 1000;

		var transitioningTimer;

		//  Next sibling from the DOM
		var nextSibling = block.parentElement.nextElementSibling;
		if (nextSibling) { 

			//  Variables
			const a = nextSibling.querySelector('a');
			if (a) { 
				const cursor = a.getAttribute('data-cursor');
				const linkURL = a.getAttribute('href');
				const linkTarget = a.getAttribute('target');

				//  Required
				if (cursor == '') { 
					return;
				}
				if (linkURL == '') { 
					return;
				}

				//  Listeners
				window.addEventListener('scroll', scrolled);
				window.addEventListener('smoothscroll', smoothScrolled);

				//  Clean up
				document.addEventListener('cleanup', cleanUp);
				function cleanUp() { 
					if (transitioningTimer) { 
						clearTimeout(transitioningTimer);
						transitioningTimer = null;
					}
					document.removeEventListener('cleanup', cleanUp);
					window.removeEventListener('scroll', scrolled);
					window.removeEventListener('smoothscroll', smoothScrolled);
				}

				//  Bottom of scroll changes page
				function scrolled(event) {
					update(document.documentElement.scrollTop || document.body.scrollTop);
				}
				function smoothScrolled(event) {
					update(event.scrollY);
				}
				function update(position) {

					//  If we are at the bottom of the screen
					var positionLimit = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
					if (position >= positionLimit - window.innerHeight) { 

						if (transitioningTimer == null) { 
							transitioningTimer = setTimeout(function () { 
								if (window.tbwaPageTransitionGoToURL) { 
									window.tbwaPageTransitionGoToURL(linkURL, linkTarget);
								} else { 
									window.open(linkURL, linkTarget);
								}
							}, holdAtBottomDuration);
						}

					//  If we are not at the bottom, clear the timer
					} else { 
						if (transitioningTimer) { 
							clearTimeout(transitioningTimer);
							transitioningTimer = null;
						}
					}

				}


			}
		}
	}

	//  For only the LAST Work Next block per page
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-work-next');
	const scrollingAutoNext = window.tbwaThemeSettings.scrollingAutoNext ? true : false;

  	if (blocks.length > 0) {
		if (scrollingAutoNext) {
			const block = blocks[blocks.length-1];
			document.body.classList.add('scrolling-auto-next');
			initWorkNext(block);
		}
	}


}, false);






















