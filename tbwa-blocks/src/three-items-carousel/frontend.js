document.addEventListener('DOMContentLoaded', function () {

	//  For each carousel block
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-three-items-carousel');
	var blocksContainer;
	var itemsContainer;

	if (blocks) {

		function cloneItems (itemsContainer) {
			for (var c=itemsContainer.length; c>0; c--) {
				itemsContainer[c-1].dataset.position = c;
				const clonedItem = itemsContainer[c-1].cloneNode(true);
				const itemImages = clonedItem.querySelectorAll('img');
				replaceSrc(itemImages);
				blocksContainer.prepend(clonedItem, blocksContainer.children[0]);
			}
		}
		// Allow only one instance of carousel
		for (var i=blocks.length-1; i>=0; i--) {
			if (i>0) {
				blocks[i].remove();
			}
		}
		
		blocksContainer = document.querySelector('.wp-block-tbwa-blocks-three-items-carousel .items');

		if (blocksContainer) {
			itemsContainer = blocksContainer.querySelectorAll('.wp-block-tbwa-blocks-three-items-carousel-item');

			
			for (var x=0; x<3; x++) {
				cloneItems(itemsContainer);
			}

			blocksContainer.append(blocksContainer.children[0]);
		
			const block = blocks[0];  
			setTimeout(() => {
				initCarousel(block);
			},500);
		}
	}

	function replaceSrc (itemImages) {
		for (var i=0; i<itemImages.length; i++) {
			if (itemImages[i].dataset.src) {
				itemImages[i].src = itemImages[i].dataset.src;
			}
		}
	}

	////////////////////
	function initCarousel(block) { 

		//  Auto play
		var durationTime = 8; // seconds
		var startTime = ms();
		var autoPlay = false;
		var autoPlayLoop;

		//  Current item
		var current = 0;
		var currentIndicator = 1

		//  Current cursor
		var cursor = '';

		//  Mouse
		var mx = 0; 
		var my = 0;

		//  Items in this carousel
		var items = block.querySelectorAll('.wp-block-tbwa-blocks-three-items-carousel-item');
		if (items.length <= 0) {
			return;
		}

		current = (items.length / 2) - 1;

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
		/* var indicatorPlay = block.querySelector('.indicator-play-pause .button-play');
		var indicatorPause = block.querySelector('.indicator-play-pause .button-pause');
		if (indicatorPlay) { 
			indicatorPlay.addEventListener('click', function () {
				autoPlay = true;
				startTime = ms();
				update();
				indicatorPlay.style.display = 'none';
				indicatorPause.style.display = 'block';
			});
		}
		if (indicatorPause) { 
			indicatorPause.addEventListener('click', function () {
				autoPlay = false;
				update();
				indicatorPlay.style.display = 'block';
				indicatorPause.style.display = 'none';
			});
		} */

		////////////////////
		//  The current item has updated
		update();

		//  Turn on the css animations a moment after page load
		setTimeout(animateOn, 100);

		//  Listeners
		var resizeDebounceTimer;
		var resizeAutoPlayState;
		window.addEventListener('resize', resized);
		//window.addEventListener('mousemove', mouseMoved);
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
			let unactiveOffset = rect.right * 0.76;
			let unactiveOffsetRight = rect.right * 0.7425;
			if (rect.right < 575) {
				unactiveOffset = rect.right * 0.875;
				unactiveOffsetRight = rect.right * 0.8;
			}

			items = block.getElementsByClassName('wp-block-tbwa-blocks-three-items-carousel-item');

			for (var i=0; i<items.length; i++) { 
				var item = items[i];
				const itemImages = item.querySelectorAll('img');
				replaceSrc(itemImages);
				currentIndicator = item.dataset.position;
				//item.style.width = rect.width + 'px';
				//item.style.left = 0 + ((i-current)*rect.width) + 'px';
				item.classList.remove('active');
				if (i == current) { 
					item.classList.add('active');
					item.style.left = '50%';
					item.style.right = null;
				} else {
					let itemWidht = item.getBoundingClientRect().width * 1.2;
					if (i < current) {
						item.style.left = null;
						item.style.right = (unactiveOffsetRight + ((current - i) * itemWidht)) + 'px';
					}
					if (i > current) {
						item.style.left = (unactiveOffset + ((i - current - 1) * itemWidht) ) + 'px';
						item.style.right = null;
					}
					//item.style.left = 0 + ((i-current)*rect.width) + 'px';
				}
			}

			//  Knob
			if (!autoPlay) { 
				if (knob) { 
					knob.style.width = ((1 / (itemsContainer.length))*100) + '%';
					knob.style.left  = (((currentIndicator-1) / itemsContainer.length)*100) + '%';
				}
			}

			//  Increment the indicator counter
			/* if (indicatorMin) { 
				indicatorMin.innerHTML = current+1;
			} */

		}

		////////////////////
		//  Next / Prev item
		function itemPrev() {
			const lastItem = blocksContainer.children[blocksContainer.children.length-1];
			const lastItemClone = lastItem.cloneNode(true);
			//var itemsToChange = blocksContainer.childNodes;
			autoPlay = false;
			/* if (indicatorPlay) {
				indicatorPlay.style.display = 'block';
				indicatorPause.style.display = 'none';
			} */
			/* current -= 1;
			if (current < 0) { 
				current = items.length-1;
			} */
			/* for (i = 0; i < blocksContainer.childNodes.length; i++) {
				if (blocksContainer.childNodes[i].nodeName === "#text") {
					blocksContainer.removeChild(blocksContainer.children[i]);
				}
			} */
			blocksContainer.removeChild(lastItem);
			blocksContainer.prepend(lastItemClone, blocksContainer.children[0]);
			update();
		}

		function itemNext() { 
			autoPlay = false;
/* 			if (indicatorPlay) {
				indicatorPlay.style.display = 'block';
				indicatorPause.style.display = 'none';
			} */
			/* current += 1;
			if (current > items.length-1) { 
				current = 0;
			} */
			blocksContainer.append(blocksContainer.children[0]);
			update();
		}
		function itemNextAutoPlay() { 
			
			//  If we get to the last item, stop auto playing
			/*
			if (current+1 >= items.length) { 
				autoPlay = false;
				indicatorPlay.style.display = 'block';
				indicatorPause.style.display = 'none';
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
		/* function mouseMoved(event) { 
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
		}; */

		////////////////////
		//  On click anywhere in this block
		function clicked(event) { 
			event.preventDefault();

			//  Left 
			if (event.target.classList.contains('arrow-left')) { 
				itemPrev();

				//  Google Analytics
				gtag('event', 'Carousel Previous', {});

			//  Right 
			} else if (event.target.classList.contains('arrow-right')) { 
				itemNext();

				//  Google Analytics
				gtag('event', 'Carousel Next', {});

			}

			//mouseMoved(event);
		}
		////////////////////
		//  Select cursor
		/* function select(c) { 
			cursor = c;
			if (window.tbwaThemeFollowCursorSelect) { 
				window.tbwaThemeFollowCursorSelect(cursor, block, 'small', 'black-white');
			}
		} */

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
	}
}, false);
