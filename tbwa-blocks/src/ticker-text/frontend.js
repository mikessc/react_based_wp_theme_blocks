document.addEventListener('DOMContentLoaded', function () {


	function initTickerText(blockIndex, block) { 

		var ticker = block.querySelector('.ticker');
		var wrap = block.querySelector('.ticker-wrap');
		if (ticker && wrap) { 

			// If this ticker is in the page, and not at the top of the page. 
			var inPage = false;
			if (block.getBoundingClientRect().top != 0) {
				inPage = true;
			}

			//  Get its initial animation duration
			var animationDurationBase = Number(ticker.style.animationDuration.split('s').join(''));

			function update() {

				//  Height is elastic scaled
				var max = 210;
				var w = window.innerWidth;
				if (w > 1920) { 
				} else if (w > 992) { 
					max = w / 1920 * max;
				} else { 
					max = max / 1920 * 992;
				}

				//  In the page
				if (inPage) { 

					//  If the ticker is partly off screen, stop moving sideways
					const rect = block.getBoundingClientRect();
					if (rect.top < 0 || rect.bottom > window.innerHeight) { 
						ticker.style.animationPlayState = 'paused';
					} else { 
						ticker.style.animationPlayState = 'running';
					}

				//  At the top of the page
				} else { 

					//  If the ticker is mostly off screen, stop moving sideways
					const rect = block.getBoundingClientRect();
					const middle = rect.top + rect.height * 0.5;

					if (middle < 0 || middle > window.innerHeight) { 
						ticker.style.animationPlayState = 'paused';
						if (w < 768) {
							ticker.style.marginTop = block.getBoundingClientRect().top + ticker.getBoundingClientRect().height - 20 + "px";
						}
					} else { 
						ticker.style.animationPlayState = 'running';
						ticker.style.marginTop = '0px';
					}

				}


			}
			window.addEventListener('resize', update);
			document.addEventListener('scroll', update);
			document.addEventListener("smoothscroll", update);
			update();


			//  Clean up
			document.addEventListener('cleanup', cleanUp);
			function cleanUp() { 
				document.removeEventListener('cleanup', cleanUp);
				window.removeEventListener('resize', update);
				document.removeEventListener('scroll', update);
				document.removeEventListener("smoothscroll", update);
			}

		}

	}

	//  For each block
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-ticker-text');
	for (var i=0; i<blocks.length; i++) {
		const block = blocks[i]; 
		initTickerText(i, block);
	}

	
	function scrollY() { 
		return document.documentElement.scrollTop || document.body.scrollTop;
	}


}, false);























