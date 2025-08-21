
document.addEventListener('DOMContentLoaded', function () {

	//  Stacked Cards
	function stackedCardsInit(block) { 

		//  For each item
		const items = block.querySelectorAll('.wp-block-tbwa-blocks-stacked-cards-item');
		if (items.length != 4) { 
			return;
		}
		for (var i=0; i<items.length; i++) { 
			itemInit(i, items[i]);
		}

		var itemInner0 = items[0].querySelector('div');
		var itemInner1 = items[1].querySelector('div');
		var itemInner2 = items[2].querySelector('div');
		var itemInner3 = items[3].querySelector('div');

		//  Setup each item
		function itemInit(i, item) { 
			var index = i;

			//  Click each item 
			item.addEventListener('click', function (event) { 
				event.preventDefault();
				changeTo(index);
			});
		}

		//  Mark first item as selected
		var selectedItem = 0;
		block.setAttribute('data-selected', 0);
		items[0].classList.add('selected');

		//  Change to this item
		function changeTo(n) { 

			//  Limit
			if (n > 3) {
				n = 3;
			}
			if (n < 0) {
				n = 0;
			}

			//  All items unselect
			for (var i=0; i<items.length; i++) { 
				items[i].classList.remove('selected');
			}

			//  Select this item
			selectedItem = n;
			block.setAttribute('data-selected', n);
			items[n].classList.add('selected');
			resized();

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
						changeTo(selectedItem+1);
					} else {
						changeTo(selectedItem-1);
					}
				}
			}
			block.addEventListener('touchstart', swipeTouchStart);
			block.addEventListener('touchend', swipeTouchEnd);
		}

		////////////////////
		//  On resize
		function resized(event) {

			//  Calculate the column width in pixels
			var w = window.innerWidth;
			if (w > 1920) { 
				w = 1536;
			} else if (w > 992) { 
				w = 1536 / 1920 * w;
			}

			//  Half and third
			w2 = w / 2;
			w3 = w / 3;

			//  Mobile has different proportions, 
			//  9 columns wide cards, with each remaining card getting 1 column. 
			if (w <= 768) { 
				w2 = w * 9/12;
				w3 = w * 8/12;
			}

			//  Margin Left
			if (selectedItem == 0) { 
				itemInner0.style.marginLeft = '0px';
				itemInner1.style.marginLeft = '0px';
				itemInner2.style.marginLeft = '0px';
			} else if (selectedItem == 1) { 
				itemInner0.style.marginLeft = -w3+'px';
				itemInner1.style.marginLeft = '0px';
				itemInner2.style.marginLeft = '0px';
			} else if (selectedItem == 2) { 
				itemInner0.style.marginLeft = -w3+'px';
				itemInner1.style.marginLeft = -w3+'px';
				itemInner2.style.marginLeft = '0px';
			} else if (selectedItem == 3) { 
				itemInner0.style.marginLeft = -w3+'px';
				itemInner1.style.marginLeft = -w3+'px';
				itemInner2.style.marginLeft = -w3+'px';
			}

			//  Margin Right
			itemInner0.style.marginRight = -w3+'px';
			itemInner1.style.marginRight = -w3+'px';
			itemInner2.style.marginRight = -w3+'px';

			//  Width
			itemInner0.style.width = w2+'px';
			itemInner1.style.width = w2+'px';
			itemInner2.style.width = w2+'px';
			itemInner3.style.width = w2+'px';

		}
		window.addEventListener('resize', resized);
		resized();

		////////////////////
		//  Clean up
		document.addEventListener('cleanup', cleanUp);
		function cleanUp() { 
			window.removeEventListener('resize', resized);
		}

		////////////////////
		function isTouchScreen() { 
			if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
				return true;
			}
			return false;
		}


	}


	//  For each stacked cards block
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-stacked-cards');
	for (var i=0; i<blocks.length; i++) {
		const block = blocks[i];  
		stackedCardsInit(block);
	}



}, false);





