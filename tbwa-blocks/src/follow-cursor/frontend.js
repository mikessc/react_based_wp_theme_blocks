
document.addEventListener('DOMContentLoaded', function () {

	////////////////////
	function initFollowCursor(block) { 

		//  Variables
		const a = block.querySelector('a');
		if (a) { 
			const cursor = a.getAttribute('data-cursor');
			const cursorPosition = a.getAttribute('data-cursor-position');
			const cursorSize = a.getAttribute('data-cursor-size');
			var cursorColor = a.getAttribute('data-cursor-color');
			const linkURL = a.getAttribute('href');
			const linkTarget = a.getAttribute('target');

			//  Required
			if (cursor == '') { 
				return;
			}
			if (linkURL == '') { 
				return;
			}

			//  Invert the yellow?
			if (cursorColor == 'yellow') { 
				if (!block.closest(".background-black")) { 
					cursorColor = 'yellow-inverted';	
				}
			}

			//  Previous sibling from the DOM
			var previousSibling = block.previousElementSibling;
			if (previousSibling) { 

				//  Listeners
				if (isTouchScreen()) { 
					previousSibling.addEventListener('click', clicked);
					previousSibling.style.cursor = 'pointer';
				} else { 
					window.addEventListener('mousemove', mouseMoved);
					previousSibling.addEventListener('click', clicked);
					previousSibling.style.cursor = 'pointer';
				}

				//  Clean up
				document.addEventListener('cleanup', cleanUp);
				function cleanUp() { 
					document.removeEventListener('cleanup', cleanUp);
					window.removeEventListener('mousemove', mouseMoved);
				}

			}

			////////////////////
			//  Mouse Move
			function mouseMoved(event) { 
				mx = event.clientX; 
				my = event.clientY; 
				if (previousSibling) { 
					const rect = previousSibling.getBoundingClientRect();
					if (rect.left < mx && mx < rect.right && rect.top < my && my < rect.bottom) { 
						select(cursor);
					}
				}
			};

			////////////////////
			//  On click anywhere in this block
			function clicked(event) { 
				event.preventDefault();
				if (window.tbwaPageTransitionGoToURL) { 
					window.tbwaPageTransitionGoToURL(linkURL, linkTarget);
				} else { 
					window.open(linkURL, linkTarget);
				}
				mouseMoved(event);
			}

			////////////////////
			//  Select cursor
			function select(c) { 
				if (window.tbwaThemeFollowCursorSelect) { 
					window.tbwaThemeFollowCursorSelect(c, previousSibling, cursorSize, cursorColor);
				}
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
	}

	////////////////////
	//  For each Follow Cursor block
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-follow-cursor');
	for (var i=0; i<blocks.length; i++) {
		const block = blocks[i];  
		initFollowCursor(block);
	}

	////////////////////

}, false);






















