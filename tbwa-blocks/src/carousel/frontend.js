
document.addEventListener('DOMContentLoaded', function () {

	////////////////////
	function initCarousel(block) { 

		//  Auto play
		var durationTime = 8; // seconds
		var startTime = ms();
		var autoPlay = true;
		var autoPlayLoop;

		//  Current item
		var current = -0;

		//  Current cursor
		var cursor = '';

		//  Mouse
		var mx = 0; 
		var my = 0; 

		//  Items in this carousel
		var items = block.querySelectorAll('.wp-block-tbwa-blocks-carousel-item');
		if (items.length <= 0) {
			return;
		}

		//  Indicator min / max
		var indicatorMin = block.querySelector('.indicator-min');
		var indicatorMax = block.querySelector('.indicator-max');
		if (indicatorMin) { 
			indicatorMin.innerHTML = '1';
		}
		if (indicatorMax) { 
			indicatorMax.innerHTML = items.length;
		}

		//  The indicator knob
		var knob = block.querySelector('.indicator-knob');
		
		//  Show the items
		for (var i=0; i<items.length; i++) { 
			items[i].style.display = 'inline-block';
		}

		////////////////////
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
						//console.log('swipe next');
						itemNext();
						gtag('event', 'Homepage Hero Next', {});
					} else {
						//console.log('swipe prev');
						itemPrev();
						gtag('event', 'Homepage Hero Previous', {});
					}
				}
			}
			block.addEventListener('touchstart', swipeTouchStart);
			block.addEventListener('touchend', swipeTouchEnd);
		}

		
		////////////////////
		//  The current item has updated
		update();

		//  Turn on the css animations a moment after page load
		setTimeout(animateOn, 100);

		//  Listeners
		var resizeDebounceTimer;
		var resizeAutoPlayState;
		window.addEventListener('resize', resized);
		window.addEventListener('mousemove', mouseMoved);
		block.addEventListener('click', clicked);
		looper();

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

		////////////////////
		function animateOn() {
			for (var i=0; i<items.length; i++) { 
				items[i].classList.add('animate');
			}
		}
		function animateOff() {
			for (var i=0; i<items.length; i++) { 
				items[i].classList.remove('animate');
			}
		}

		////////////////////
		//  Resize
		function resized() { 
			animateOff();
			update();
			if (resizeDebounceTimer) {
				clearTimeout(resizeDebounceTimer);
			}
			resizeDebounceTimer = setTimeout(animateOn, 500);
		}
		
		////////////////////
		//  Loop 
		function looper() { 
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

		////////////////////
		//  Update
		function update() { 

			//  Fix the position of each item
			const rect = block.getBoundingClientRect();
			for (var i=0; i<items.length; i++) { 
				var item = items[i];
				item.style.width = rect.width + 'px';
				item.style.left = 0 + ((i-current)*rect.width) + 'px';
				if (i == current) { 
					item.classList.add('active');
				} else { 
					item.classList.remove('active');
				}
			}

			//  Knob
			if (!autoPlay) { 
				if (knob) { 
					knob.style.width = ((1 / items.length)*100) + '%';
					knob.style.left  = ((current / items.length)*100) + '%';
				}
			}

			//  Increment the indicator counter
			if (indicatorMin) { 
				indicatorMin.innerHTML = current+1;
			}

		}

		////////////////////
		//  Next / Prev item
		function itemPrev() { 
			autoPlay = false;
			current -= 1;
			if (current < 0) { 
				current = items.length-1;
			}
			update();
		}
		function itemNext() { 
			autoPlay = false;
			current += 1;
			if (current > items.length-1) { 
				current = 0;
			}
			update();
		}
		function itemNextAutoPlay() { 
			
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

			//  If the carousel is mostly off screen, stop autoplaying
			const rect = block.getBoundingClientRect();
			const middle = rect.top + rect.height * 0.5;
			if (middle < 0) { 
				autoPlay = false;
				update();
				return;
			}

			current += 1;
			if (current >= items.length) { 
				current = 0;
			}
			update();
		}


		////////////////////
		//  Mouse Move
		function mouseMoved(event) { 
			mx = event.clientX; 
			my = event.clientY; 
			const rect = block.getBoundingClientRect();

			//  Left 
			if (mx-rect.left < rect.width*0.25) { 
				select('arrow-left');

			//  Middle
			} else if (mx-rect.left < rect.width*0.75) { 
				select('');

			//  Right 
			} else {  
				select('arrow-right');
			}
		};

		////////////////////
		//  On click anywhere in this block
		function clicked(event) { 
			event.preventDefault();

			//  Left 
			if (!isTouchScreen() && cursor == 'arrow-left') { 
				itemPrev();

				//  Google Analytics
				gtag('event', 'Carousel Previous', {});

			//  Right 
			} else if (!isTouchScreen() && cursor == 'arrow-right') { 
				itemNext();

				//  Google Analytics
				gtag('event', 'Carousel Next', {});

			}

			mouseMoved(event);

			// Manually continue the click event after processing
			const target = event.target;
			if (target && target.tagName === 'A') {
				window.location.href = target.href;
			}
		}
		////////////////////
		//  Select cursor
		function select(c) { 
			cursor = c;
			if (window.tbwaThemeFollowCursorSelect) { 
				window.tbwaThemeFollowCursorSelect(cursor, block, 'small', 'black-white');
			}
		}

		////////////////////
		function ms() { 
			return performance.now()/1000;
		}

		////////////////////
		function isTouchScreen() { 
			if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
				return true;
			}
			return false;
		}

		////////////////////

	}

	////////////////////
	//  For each carousel block
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-carousel');
	for (var i=0; i<blocks.length; i++) {
		const block = blocks[i];  
		initCarousel(block);
	}


	////////////////////

}, false);






















