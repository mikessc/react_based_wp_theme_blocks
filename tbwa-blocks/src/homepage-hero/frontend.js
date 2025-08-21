
document.addEventListener('DOMContentLoaded', function () {

	function initHomepageHero(block) { 

		//  Auto play
		var durationTime = 8; 
		var startTime = ms();
		var autoPlay = true;
		var autoPlayLoop;

		//  Current item
		var current = -0;

		//  Current item link and target
		var url = '';
		var target = '';

		//  Current cursor
		var cursor = '';

		//  Mouse
		var mx = 0; 
		var my = 0;

		//  Items in this carousel
		var items = block.querySelectorAll('.wp-block-tbwa-blocks-homepage-hero-item');
		var itemsBackground = items[0].querySelector('.background');
				
		
		if (items.length <= 0) {
			return;
		}

		// Controls
		var playBtn = block.querySelector('.controls .start');
		var pauseBtn = block.querySelector('.controls .stop');
		var bottomContainer = document.querySelector('.bottom-container');

		console.log(bottomContainer);
		

		playBtn?.addEventListener('click', play);
		pauseBtn?.addEventListener('click', pause);

		//  The indicator knob
		var knob = block.querySelector('.indicator-knob');

		//  Update the maximum indicator
		var indicatorMax = block.querySelector('.indicator-max');
		if (indicatorMax) { 
			indicatorMax.innerHTML = items.length;
		}

		if (items.length === 1) {
			bottomContainer.style.display = 'none';
		}

		//  Show the items
		for (var i=0; i<items.length; i++) { 
			items[i].style.display = 'inline-block';
		}

		//  Swipe left/right to trigger previous/next
		if (isTouchScreen()) { 
			var minHorizontalMove = 30;
			var maxVerticalMove = 30;
			var withinMS = 1000;
			var startXPos;
			var startYPos;
			var swipeStartTime;
			function swipeTouchStart(event) {
				startXPos = event.touches[0].pageX;
				startYPos = event.touches[0].pageY;
				swipeStartTime = new Date();
			}
			function swipeTouchEnd(event) {
				var endXPos = event.changedTouches[0].pageX;
				var endYPos = event.changedTouches[0].pageY;
				var endTime = new Date();
				let moveX = endXPos - startXPos;
				let moveY = endYPos - startYPos;
				let elapsedTime = endTime - swipeStartTime;
				if (Math.abs(moveX) > minHorizontalMove && Math.abs(moveY) < maxVerticalMove && elapsedTime < withinMS) {
					if (moveX < 0) {
						itemNext();
						gtag('event', 'Homepage Hero Next', {});
					} else {
						itemPrev();
						gtag('event', 'Homepage Hero Previous', {});
					}
				}
			}
			block.addEventListener('touchstart', swipeTouchStart);
			block.addEventListener('touchend', swipeTouchEnd);
		}

		//  The current item has updated
		update();

		//  Turn on the css animations a moment after page load
		setTimeout(animateOn, 100);

		//  Listeners
		window.addEventListener('resize', resized);
		window.addEventListener('mousemove', mouseMoved);
		block.addEventListener('click', clicked);
		looper();

		// Focused
		document.querySelectorAll('.wp-block-tbwa-blocks-homepage-hero-item p, .wp-block-tbwa-blocks-homepage-hero-item h4').forEach((element) => {
			element.addEventListener('focus', function () {
				// Get the parent '.wp-block-tbwa-blocks-homepage-hero-item'
				const parentItem = element.closest('.wp-block-tbwa-blocks-homepage-hero-item');
				
				// Get all items with the same class
				const allItems = document.querySelectorAll('.wp-block-tbwa-blocks-homepage-hero-item');
				
				// Find the index of the parent item
				const index = Array.from(allItems).indexOf(parentItem);

				autoPlay = false;
				current = index;
				update();clicked

				element.addEventListener('keydown', function (event) {
					// Check if Enter (key code 13) or Space (key code 32) is pressed
					if (event.key === 'Enter' || event.key === ' ') {
						// Prevent default action for Space (like scrolling)
						event.preventDefault();
		
						// Call your function here
						clicked(event);
					}
				});
			});
		});

		//  Clean up
		document.addEventListener('cleanup', cleanUp);

		function cleanUp() { 
			document.removeEventListener('cleanup', cleanUp);
			window.removeEventListener('resize', resized);
			window.removeEventListener('mousemove', mouseMoved);
			if (autoPlayLoop) { 
				clearTimeout(autoPlayLoop);
			}
		}

		function animateOn() {
			for (var i=0; i<items.length; i++) { 
				items[i].classList.add('animate');
			}
		}

		//  Resize
		function resized() { 
			update();
		}
		
		//  Loop 
		function looper() { 
			//console.log('looper', autoPlay);
			if (autoPlay) { 

				//  Knob
				if (knob) { 

					//  Fill from the center out, one item at a time
					var p = (ms() - (startTime+1)) / (durationTime-1.5);
					if (p < 0) { 
						p = 0;
					} 
					if (p > 1) { 
						p = 1;
					}
					knob.style.width = (p*100) + '%';
					knob.style.left  = (50-p*50) + '%';					
				}

				//  Auto play
				if (ms() - startTime > durationTime) { 
					startTime = ms();
					itemNextAutoPlay();
				}

			}

			if (autoPlayLoop) { 
				clearTimeout(autoPlayLoop);
			}
			autoPlayLoop = setTimeout(looper, 50);

		}

		//  Update
		function update() { 

			//  Current item url and target
			url = items[current].getAttribute('data-url');
			target = items[current].getAttribute('data-target');			

			//  Fix the position of each item
			const w = document.body.clientWidth;
			for (var i=0; i<items.length; i++) { 
				var item = items[i];
				item.style.width = w + 'px';
				item.style.left = ((i-current)*w) + 'px';
				if (i == current) { 
					item.classList.add('active');
				} else { 
					item.classList.remove('active');
				}
			}
			
			//  Knob
			if (!autoPlay && knob) { 
				if (knob) { 
					knob.style.width = ((1 / items.length)*100) + '%';
					knob.style.left  = ((current / items.length)*100) + '%';
				}
			}
			
			//  Update the minimum indicator
			var indicatorMin = block.querySelector('.indicator-min');
			if (indicatorMin) { 
				indicatorMin.innerHTML = current+1;
			}

			togglePlayPause();
		}

		//  Next / Prev item
		function itemPrev() { 
			//console.log('itemPrev'); 
			autoPlay = false;
			current -= 1;

			if (current < 0) { 
				current = items.length-1;
			}

			update();
		}

		function itemNext() {
			//console.log('itemNext'); 
			autoPlay = false;
			current += 1;

			if (current > items.length-1) { 
				current = 0;
			}

			update();
		}

		function itemNextAutoPlay() { 
			//console.log('itemNextAutoPlay');
			
			//  If we get to the last item, stop auto playing
			/*
			if (current+1 >= items.length) { 
				autoPlay = false;
				update();
				return;
			}
			*/

			//  If we get to the last item, auto play back to the first
			if (current+1 >= items.length) { 
				current = 0;
				update();
				return;
			}

			//  If the homepage hero is mostly off screen, stop autoplaying
			const rect = block.getBoundingClientRect();
			const middle = rect.top + rect.height * 0.5;
			if (middle < 0) { 
				autoPlay = false;
				update();
				return;
			}

			//  Show the next item
			current += 1;
			update();

		}

		// Play
		function play () {
			autoPlay = true;
			startTime = ms();	
			clearTimeout(autoPlayLoop);
			autoPlayLoop = setTimeout(looper, 50);
			update();
		}

		// Pause
		function pause () {
			autoPlay = false;
			update();
		}

		function togglePlayPause () {
			if (!autoPlay && playBtn.classList.contains('hide')) { 				
				playBtn.classList.toggle('hide');
				pauseBtn.classList.toggle('hide');

				return;
			}
			
			if (autoPlay && !playBtn.classList.contains('hide')) { 				
				playBtn.classList.toggle('hide');
				pauseBtn.classList.toggle('hide');

				return;
			}
		}


		//  Mouse Move
		function mouseMoved(event) {
			let itemHeight = itemsBackground.offsetHeight;
			let insideSafeZone = isInYsafeZone(event, itemHeight);
			const w = document.body.clientWidth;

			mx = event.clientX; 
			my = event.clientY;
			
			if (items.length > 1) {
				//  Left 
				if (mx < w/3) { 
					select('arrow-left');

				//  Center 
				} else if (mx < w/3*2) { 
					if (url != '') { 
						select('read-more');
					} else { 
						select('');
					}

				//  Right 
				} else {  
					select('arrow-right');
				}
			} else {
				if (url != '') { 
						select('read-more');
				} else { 
					select('');
				}
			}

			

			if(!insideSafeZone) {
				select('');
			}
		};

		// Get if the mouse is in Y axis safe zone
		function isInYsafeZone (event, elementHeight) {
			// Get the position of the mouse relative to the top of the element
			let mouseY = event.clientY - itemsBackground.getBoundingClientRect().top;
		
			// Calculate 80% of the element's height
			let threshold = elementHeight - 80;
		
			// Check if the mouse is within the top 80% of the element's height
			if (mouseY <= threshold || mouseY > elementHeight) {
				return true;
			}
				
			return false
		}

		//  Select cursor
		function select(c) { 
			cursor = c;
			if (window.tbwaThemeFollowCursorSelect) { 
				window.tbwaThemeFollowCursorSelect(cursor, block, 'small', 'black-white');
			}
		}

		//  On click anywhere in this block
		function clicked(event) { 
			event.preventDefault();

			//  Left 
			if (!isTouchScreen() && cursor == 'arrow-left') { 
				//console.log('follow cursor - previous');
				itemPrev();
				gtag('event', 'Homepage Hero Previous', {});

			//  Center 
			} else if (cursor == 'read-more') { 
				if (url != '') {
					//console.log('follow cursor - go to page');
					if (window.tbwaPageTransitionGoToURL) { 
						window.tbwaPageTransitionGoToURL(url, target);
					} else { 
						window.open(url, target);
					}
				}

			//  Right 
			} else if (!isTouchScreen() && cursor == 'arrow-right') { 
				//console.log('follow cursor - next');
				itemNext();
				gtag('event', 'Homepage Hero Next', {});
			}

			mouseMoved(event);
		}

		function ms() { 
			return performance.now()/1000;
		}

		function isTouchScreen() { 
			if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
				return true;
			}
			return false;
		}


	}

	//  For each Homepage hero block
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-homepage-hero');
	for (var i=0; i<blocks.length; i++) {
		const block = blocks[i];  
		initHomepageHero(block);
	}



}, false);