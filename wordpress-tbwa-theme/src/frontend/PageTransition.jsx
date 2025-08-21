
export default function PageTransition() {

	////////////////////
	var transitioning = false;
	var animateForwards = true;
	var currentURL = null;
	var nextURL = null;
	var nextHtmlDocument = null;
	var animateStartTime = null;
	var animateDuration = 1.0;
	var backButton = false;
	var heightMultiplier = 1.1;

	var wrapper;
	var overlay;

	var spinnerDelayTimer;

	var cleanUpEvent;

	
	////////////////////
	//  Enabled
	function enabled() { 
		return (document.getElementById('page-transition-wrapper') && 
				document.body.classList.contains('tbwa-page-transition-enabled'));
	}

	//  Once
	document.addEventListener('DOMContentLoaded', initOnce);
	function initOnce() {
		cleanUpEvent = new Event('cleanup');
		document.removeEventListener('DOMContentLoaded', initOnce);
		if (enabled()) { 
			window.addEventListener('resize', resize);
			window.addEventListener('popstate', handlePopState);
			init();
			resize();
		}
	}

	////////////////////
	function init() { 

		//  Tell the browser to not mess with the scroll
		history.scrollRestoration = 'manual';
 
		//  Content Wrapper
		wrapper = document.getElementById('page-transition-wrapper');
	
		//  Transition Overlay
		overlay = document.getElementById('page-transition-overlay');
	
		//  Capture links
		linkCapture();

		//  Make these available to other JavaScript 
		//  ... see the top nav search form, and the language selector
		window.tbwaPageTransitionGoToURL = gotoURL;
		//  ... see the cookie notification
		window.tbwaPageTransitionLinkCapture = linkCapture;
		
	}


	////////////////////
	//  Resize
	function resize() { 

		//  Resize the overlay
		const w = window.innerWidth;
		const h = window.innerHeight * heightMultiplier;
		const gap = h*(58-21)/100;
		const a = [0, 0];
		const b = [gap+w, 0];
		const c = [gap+w+gap, h];
		const d = [gap, h];
		overlay.style.clipPath = 'polygon('+a[0]+'px '+a[1]+'px, '+b[0]+'px '+b[1]+'px, '+c[0]+'px '+c[1]+'px, '+d[0]+'px '+d[1]+'px, '+a[0]+'px '+a[1]+'px)';
		overlay.style.width = (gap+w+gap)+'px';

	}


	////////////////////
	//  Capture Links

	//  Capture all links in the document
	function linkCapture() { 
		for (var i=0; i<document.links.length; i++) {
			var link = document.links[i];

			//  Don't capture to links within the page
			if (link.attributes.href.nodeValue.charAt(0) == '#') { 
				continue;
			}

			//  Don't capture external links
			if (isLinkExternal(link)) { 
				continue;
			}

			//  Don't double up 
			link.removeEventListener('click', linkClick);

			//  Listen for the click
			link.addEventListener('click', linkClick);

		}


	}

	//  When a captured link is clicked
	function linkClick(event) {
		backButton = false;
		if (loadURL(this.href)) { 
			event.preventDefault();
		}
	}

	//  Go to this URL
	function gotoURL(url, target) {
		if (isUrlExternal(url, target) || !enabled()) { 
			window.open(url, target);
		} else { 
			backButton = false;
			loadURL(url); 
		}
	}


	//  Browser back / forwards buttons
	// https://www.codeguage.com/courses/js/events-popstate-event
	function handlePopState(event) {
		if (event && event.target.location.hash.charAt(0) != '#') {
			event.preventDefault();
			backButton = true;
			loadURL(location.href);
		} else {
			const elementID = event.target.location.hash.slice(1);
			const elementToScrollTo = document.getElementById(elementID.toString());
			const elementOffsetTop = elementToScrollTo.offsetTop;
			const adjust = 180;

			window.scroll(0, elementOffsetTop + adjust);
		}
	}


	////////////////////
	//  Load a url
	function loadURL(next) { 
		if (transitioning) { 
			return true;
		}

		//  Where we are
		currentURL = location.href;

		//  Where we are going to
		nextURL = next;
		if (nextURL == null) { 
			nextURL = window.location.origin+'/';
		}

		//console.log('currentURL', currentURL);
		//console.log('nextURL', nextURL);

		//  If we are already there, scroll to the top and don't refresh
		/*
		if (currentURL == nextURL) { 
			window.scrollTo(0, 0);
			return true;
		}

		//  Find the first index of the current and next page links in the DOM
		/*
		var currentLinkIndex = null;
		var nextLinkIndex = null;
		for (var i=0; i<document.links.length; i++) {
			var link = document.links[i];
			if (currentLinkIndex == null && link.href == currentURL) { 
				currentLinkIndex = i;
			}
			if (nextLinkIndex == null && link.href == nextURL) { 
				nextLinkIndex = i;
			}
		}

		//  The home page is always the first index
		if (currentURL == window.location.origin+'/') { 
			currentLinkIndex = -1;
		}
		if (nextURL == window.location.origin+'/') { 
			nextLinkIndex = -1;
		}

		//  Animate forwards or backwards?
		animateForwards = true;
		if (currentLinkIndex !== null && nextLinkIndex !== null) { 
			if (nextLinkIndex < currentLinkIndex) { 
				animateForwards = false;
			}
		}
		*/

		//  Mobile back/forward button, use a standard page change
		if (isTouchScreen()) { 
			if (backButton) { 
				window.location = nextURL;
				return;
			}
		}

		//  After 1 second fade the spinner on
		overlay.classList.remove('delayed');
		clearTimeout(spinnerDelayTimer);
		spinnerDelayTimer = setTimeout(function () { 
			overlay.classList.add('delayed');
		}, 1000);

		//  Start loading the next page's HTML
		nextHtmlDocument = null;
		fetch(nextURL)
			.then(response => response.text())
			.then(text => {

				//  Don't fade the spinner on
				clearTimeout(spinnerDelayTimer);

				//	
				const parser = new DOMParser();
				nextHtmlDocument = parser.parseFromString(text, 'text/html');
				if (isTouchScreen() && backButton) { 
					animateOnComplete();
				}

			})
			.catch(error => {
				window.location = nextURL;
			});


		//  Pause before animating to allow the rollover animations to play on buttons, very obvious on CTA buttons.
		if (isTouchScreen()) { 
			setTimeout(function () { 
				animateStartTime = ms();
				animateOn();
			}, 200);
		} else { 
			animateStartTime = ms();
			animateOn();
		}
		
		//  Switch the URL
		//  The instant this happens, mobile browsers screenshot the window to use for the browser back animation
		if (!backButton) {
			var state = {scrollY:scrollY()};
			window.history.replaceState(state, null, currentURL);
			window.history.pushState(null, null, nextURL);
		}

		return true;
		
	}

	////////////////////
	//  Animation
	function animateOn() { 

		//  Show the transition element
		if (overlay) { 
			overlay.style.display = 'block';
		}

		//  Percentage through this part of the transition
		const p = limit((ms() - animateStartTime) / (animateDuration*0.5), 0, 1);

		//  Where should it be in pixels
		const w = window.innerWidth;
		const h = window.innerHeight * heightMultiplier;
		const gap = h*(58-21)/100;
		const a = [-gap, 0];
		const b = [w, 0];
		const c = [w+gap, h];
		const d = [0, h];

		//  Fix the height
		overlay.style.height = (100 * heightMultiplier)+'vh';

		//  Forwards or backwards?
		if (animateForwards) { 
			overlay.style.left = ((0-gap-w-gap) + (w+gap) * p)+'px';
		} else { 
			overlay.style.left = (w - (gap+w) * p)+'px';
		} 

		//  If the animation is still going, or waiting for the content to load, loop
		if (p < 1 || nextHtmlDocument === null) { 
			requestAnimationFrame(animateOn);
			return;
		}

		animateOnComplete();
	}

	function animateOnComplete() { 

		//  Fire a clean up event
		document.dispatchEvent(cleanUpEvent);

		//  Replace the DOM
		wrapper.innerHTML = nextHtmlDocument.querySelector('body #page-transition-wrapper').innerHTML;

		//  Capture new links
		linkCapture();

		//  Switch the page title
		document.title = nextHtmlDocument.title;

		//  Switch the link rel=canonical
		var e = document.querySelector('head > link[rel=canonical]');
		if (e) { 
			e.setAttribute('href', nextURL);
		}

		//  Switch Meta Tags
		var head = document.querySelector('head');
		var meta = document.querySelectorAll('head > meta[property]');
		for (var i=0; i<meta.length; i++) { 
			meta[i].remove();
		}
		var meta = nextHtmlDocument.querySelectorAll('head > meta[property]');
		for (var i=0; i<meta.length; i++) { 
			head.appendChild(meta[i]);
		}
		metaSwitch('head > meta[name=description]');
		metaSwitch('head > meta[name=keywords]');

		//  Remove noscroll which may be added by the top nav
		document.body.classList.remove('noscroll');

		//  If we clicked the back button, then we need to snap to scrollY position saved on the previous page. 
		if (backButton) { 
			if (history.state) { 
				if (history.state.scrollY) { 
					setTimeout(function () { 
						if (window.tbwaSmoothScrollSnapTo) { 
							window.tbwaSmoothScrollSnapTo(history.state.scrollY);
						} else { 
							window.scrollTo(0, history.state.scrollY);
						}
					}, 10);
				}
			}
		} else { 
			//  Scroll to top 
			if (window.tbwaSmoothScrollSnapToTop) { 
				window.tbwaSmoothScrollSnapToTop();
			} else { 
				window.scrollTo(0, 0);
			}
		}
		
		//  Update Parallax and Smooth Scroll
		if (window.tbwaParallaxUpdate) { 
			window.tbwaParallaxUpdate();
		}
		if (window.tbwaSmoothScrollUpdate) { 
			window.tbwaSmoothScrollUpdate();
		}

		//  Fire a DOM loaded event
		window.document.dispatchEvent(new Event('DOMContentLoaded', {
			bubbles: true,
			cancelable: true
		}));

		//  Record the page view
		gtag('event', 'page_view', {
			page_title: document.title,
			page_location: window.location.href,
			page_path: window.location.pathname,
		});

		///  Back button has no animation, just snaps 
		if (isTouchScreen() && backButton) { 

			//  Hide the overlay
			overlay.style.display = 'none';
			transitioning = false;

		} else { 

			//  Draw the animation off
			animateStartTime = ms();
			requestAnimationFrame(animateOff);

		}

	}

	function metaSwitch(selector) { 
		var a = document.querySelector(selector);
		var b = nextHtmlDocument.querySelector(selector);
		if (a && b) { 
			a.setAttribute('content', b.getAttribute('content'));
		}
	}

	function animateOff() { 

		//  Percentage through this part of the transition
		const p = limit((ms() - animateStartTime) / (animateDuration*0.5), 0, 1);

		//  Where should it be in pixels
		const w = window.innerWidth;
		const h = window.innerHeight * heightMultiplier;
		const gap = h*(58-21)/100;
		const a = [-gap, 0];
		const b = [w, 0];
		const c = [w+gap, h];
		const d = [0, h];

		//  Fix the height
		overlay.style.height = (100 * heightMultiplier)+'vh';

		//  Forwards or backwards?
		if (animateForwards) { 
			overlay.style.left = (-gap + (gap+w) * p)+'px';
		} else {  
			overlay.style.left = (-gap - (w+gap) * p)+'px';
		}

		//  If the animation is still going
		if (p < 1) { 
			requestAnimationFrame(animateOff);
			return;
		} 

		//  Hide the overlay
		overlay.style.display = 'none';


		transitioning = false;

		//  Fire a transitioned animation event
		window.document.dispatchEvent(new Event('LoadedFromTransition', {
			bubbles: true,
			cancelable: true
		}));
	}

	////////////////////
	//  Utilities
	function ms() { 
		return performance.now()/1000;
	}
	function limit(value, min, max) { 
		return Math.max(min, Math.min(value, max));
	}
	function isLinkExternal(link) {
		if (link.target == '_blank') { 
			return true;
		}
		return (link.host !== window.location.host);
	}
	function isUrlExternal(url, target) {
		if (target == '_blank') { 
			return true;
		}
		if (url.charAt(0) == '/') {
			return false;
		}
		if (new URL(url).host !== window.location.host) {
			return true;
		}
		return false;
	}
	function isTouchScreen() { 
		if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
			return true;
		}
		return false;
	}
	function scrollY() { 
		return document.documentElement.scrollTop || document.body.scrollTop;
	}
	function scrollYMax() { 
		return scrollH() - window.innerHeight;
	}
	function scrollH() { 
		return document.documentElement.scrollHeight || document.body.scrollHeight;
	}



	////////////////////


}



