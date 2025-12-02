

export default function SmoothScroll() {

	var moving = false;
	var position = 0;
	var positionDest = 0;
	var first = true;
	var smoothScrollEvent;
	var wrapperOuter;
	var wrapperInner;

	////////////////////
	//  Enabled
	function enabled() { 
		if (isTouchScreen()) {  
			document.body.classList.remove('tbwa-smooth-scroll-enabled');
			return false;
		}
		return (document.getElementById('smooth-scroll-wrapper-outer') && 
				document.getElementById('smooth-scroll-wrapper-inner') && 
				document.body.classList.contains('tbwa-smooth-scroll-enabled'));
	}

	//  Once
	function initOnce() {
		document.removeEventListener('DOMContentLoaded', initOnce);
		if (enabled()) { 
			document.addEventListener('scroll', scrolled);
			window.addEventListener('resize', resized);
			wrapperOuter = document.getElementById('smooth-scroll-wrapper-outer');
			wrapperInner = document.getElementById('smooth-scroll-wrapper-inner');
			window.tbwaSmoothScrollUpdate = update;
			window.tbwaSmoothScrollSnapTo = snapTo;
			window.tbwaSmoothScrollSnapToTop = snapToTop;
			smoothScrollEvent = new Event('smoothscroll');
		}
	}
	document.addEventListener('DOMContentLoaded', initOnce);

	//  Everytime
	function initEverytime() {
		if (enabled()) { 
			positionDest = position = scrollY();
			update();
		}
	}
	document.addEventListener('DOMContentLoaded', initEverytime);

	////////////////////
	function scrolled(event) { 
		event.preventDefault();
		positionDest = Math.max(0, Math.min(scrollY(), scrollH() - window.innerHeight));
		if (first) {
			first = false; 
			position = positionDest;
		}
		update();
	}
	
	////////////////////
	//  Resized
	function resized(event) { 
		scrolled(event);
	}

	////////////////////
	//	Update on loop
	function update() { 

		//var fred = performance.now();

		//  Smooth scroll is not needed on mobile
		if (!enabled()) { 
			return;
		}

		//  Loop only as needed
		moving = true;

		//  Ease
		position = position + (positionDest - position) * 0.01; 

		//  Limit
		position = Math.max(0, Math.min(position, scrollH() - window.innerHeight));

		//  Move
		if (wrapperOuter) { 
			wrapperOuter.style.top = Math.round(-position)+'px';
		}

		//  Fix page height
		if (wrapperInner) { 
			document.body.style.height = wrapperInner.offsetHeight+'px';
		}

		//  Loop
		if (Math.abs(positionDest - position) > 0.5) {
			requestAnimationFrame(update);
		} else {
			moving = false;
		}

		//  Smooth Scroll event used by other blocks to sync with the smooth scroll
		smoothScrollEvent.scrollY = position;
		document.dispatchEvent(smoothScrollEvent);

		//console.log(performance.now() - fred);

	}
	
	////////////////////
	function snapTo(y) { 
		position = positionDest = y;
		window.scrollTo(0, y);
		update();
	}
	function snapToTop() { 
		snapTo(0);
	}

	////////////////////
	//  Utilities
	function scrollY() { 
		return document.documentElement.scrollTop || document.body.scrollTop;
	}
	function scrollH() { 
		return document.documentElement.scrollHeight || document.body.scrollHeight;
	}
	function isTouchScreen() { 
		if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
			return true;
		}
		return false;
	}

	////////////////////

}




