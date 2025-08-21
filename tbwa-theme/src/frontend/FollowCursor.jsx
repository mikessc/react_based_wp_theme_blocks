

export default function FollowCursor() {

	var currentShape = '';
	var currentBlock;
	var currentSize;
	var currentColor;
	var cursor;
	var cursorPosition;
	var mx = 0;
	var my = 0;
	var mxDest = 0;
	var myDest = 0;
	var shapesList = [];
	var shapesLookup = {};

	////////////////////
	//  Enabled
	function enabled() { 
		if (isTouchScreen()) { 
			//console.log('Follow cursor: DISABLED due to touchscreen');
			return false;
		}
		if (document.getElementById('follow-cursor')) {  
			//console.log('Follow cursor: ENABLED');
			return true;
		} 
		//console.log('Follow cursor: DISABLED due to feature disabled');
		return false;
	}

	////////////////////
	//  Once
	function initOnce() {
		document.removeEventListener('DOMContentLoaded', initOnce);
		
		//  Add this class, it's needed by the mobile/tablet css that shows the follow cursor
		if (isTouchScreen()) { 
			document.body.classList.add('tbwa-touch-screen');
		}

		if (enabled()) { 

			//  Cursor
			cursor = document.getElementById('follow-cursor');

			//  Listeners
			window.addEventListener('resize', update);
			window.addEventListener('mousemove', mouseMoved);

			//  Find shapes
			shapesList = cursor.querySelectorAll('svg');
			for (var i=0; i<shapesList.length; i++) { 
				shapesLookup[shapesList[i].className.baseVal] = shapesList[i];
			}

			window.tbwaThemeFollowCursorSelect = select;

			looper();

		}
	}
	document.addEventListener('DOMContentLoaded', initOnce);

	////////////////////
	//  Mouse Move
	function mouseMoved(event) { 
		mxDest = event.clientX; 
		myDest = event.clientY; 
	}

	////////////////////
	//  Loop 
	function looper() { 
		mx = mx + (mxDest - mx) * 0.1;
		my = my + (myDest - my) * 0.1;
		update();
		requestAnimationFrame(looper);
	}

	////////////////////
	//  Update
	function update() { 

		//  Follow the cursor
		var rect = cursor.getBoundingClientRect();
		cursor.style.left = (mx - rect.width*0.5) + 'px';
		cursor.style.top  = (my - rect.height*0.5) + 'px';

		//  Scale 
		if (currentShape == '' || !withinBlock(currentBlock)) { 
			cursor.style.transform = 'scale(0)';
		} else {
			if (currentSize == 'large') { 
				cursor.style.transform = 'scale(1.391)';	//  264.3px
			} else if (currentSize == 'medium') { 
				cursor.style.transform = 'scale(1)';		//  190px
			} else { 
				cursor.style.transform = 'scale(0.631)';	//  120px
			}
		}

	}

	////////////////////
	//  Select a cursor shape
	function select(newShape, block, size, color) { 

		//  Are we are outside the given block stop
		if (!withinBlock(block)) { 
			return;
		}

		//  The block to stay within
		currentBlock = block;
		currentSize = size;
		currentColor = color;

		if (currentColor == 'yellow') { 
			cursor.classList.add('color-yellow');
		} else { 
			cursor.classList.remove('color-yellow');
		}

		if (currentColor == 'yellow-inverted') { 
			cursor.classList.add('color-yellow-inverted');
		} else { 
			cursor.classList.remove('color-yellow-inverted');
		}

		//  Validate the new shape exists
		if (shapesLookup[newShape]) { 

			//  Hide all shapes
			for (var i=0; i<shapesList.length; i++) { 
				shapesList[i].style.display = 'none';
			}

			//  Show the new shape
			shapesLookup[newShape].style.display = 'block';

			currentShape = newShape;
		} else { 
			currentShape = '';
		}


	}

	////////////////////
	function withinBlock(block) { 
		if (block) { 
			var rect = block.getBoundingClientRect();
			if (mx >= rect.x && my >= rect.y && mx <= rect.right && my <= rect.bottom) { 
				return true;
			}
		}
		return false;
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



















