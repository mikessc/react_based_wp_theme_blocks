

export default function Parallax() {

	var moving = false;
	var parallaxElements = [];

	////////////////////
	//  Enabled
	function enabled() { 
		return document.body.classList.contains('tbwa-parallax-enabled');
	}

	//  Once
	function initOnce() {
		document.removeEventListener('DOMContentLoaded', initOnce);
		if (enabled()) { 
			document.addEventListener('scroll', scrolled);
			document.addEventListener('smoothscroll', update);
		}
	}
	document.addEventListener('DOMContentLoaded', initOnce);

	//  Everytime
	function initEverytime() {
		if (enabled()) { 
			initElements();
			update();
		}
	}
	document.addEventListener('DOMContentLoaded', initEverytime);


	////////////////////
	function initElements() { 
		parallaxElements = [];
		var elements = document.querySelectorAll('div[data-parallax]');
		for (var i=0; i<elements.length; i++) {
			var o = {};
			o.element = elements[i];
			o.speed = 25;
			o.opacity = false;
			o.lineHeight = false;
			var a = elements[i].getAttribute('data-parallax').split(',');
			if (a.length == 3) { 
				o.speed = Number(a[0]);
				o.opacity = (a[1] == 1);
				o.lineHeight = (a[2] == 1);
			}
			if (o.lineHeight) {
				o.lineHeightElements = [];

				//  H1 and H2 have a line height of 1em
				var a = o.element.querySelectorAll('.h1, .h2');
				for (var j=0; j<a.length; j++) { 
					o.lineHeightElements.push( {
						'base' : 1, 
						'element' : a[j]
					});
				}

				//  All have a line height of 1.5
				var a = o.element.querySelectorAll('.h3, .h4, .h5, .h6, p');
				for (var j=0; j<a.length; j++) { 
					var element = a[j];
					var base = 1.5;

					//  Except this has 1.3 
					if (element.tagName == 'h5') { 
						base = 1.3;
					}
					
					//  Except the paragraph with lead in block...
					//  .wp-block-tbwa-blocks-paragraph-with-lead-in .large p.content		>    1
					if (element.parentNode.parentNode.classList.contains('wp-block-tbwa-blocks-paragraph-with-lead-in')) {
						if (element.parentNode.classList.contains('standard')) { 
							if (element.classList.contains('lead-in')) { 
								base = 1.3;
							}
						}
						if (element.parentNode.classList.contains('large')) { 
							if (element.classList.contains('lead-in')) { 
								//  Yes its line height changes on firefox
								if (navigator.userAgent.toLowerCase().includes('firefox')) { 
									base = 1.375;
								} else { 
									base = 1.65;
								}
							}
							if (element.classList.contains('content')) { 
								base = 1;
							}
						}
					}

					o.lineHeightElements.push({
						'base' : base, 
						'element' : element
					});
				}

			}
			parallaxElements.push(o);
		}
	}

	////////////////////
	function scrolled(event) { 
		event.preventDefault();
		if (!document.body.classList.contains('tbwa-smooth-scroll-enabled')) { 
			update();
		}
	}
	
	////////////////////
	//	Update on loop
	function update() { 

		//var fred = performance.now();

		const w = window.innerWidth;
		const h = window.innerHeight;
		for (var i=0; i<parallaxElements.length; i++) {
			var o = parallaxElements[i];  

			//  Where is the element relative to the scroll window?
			const rect = o.element.getBoundingClientRect();
			const y = rect.top + rect.height * 0.5;
			const min = 0 - rect.height * 0.5;
			const max = h + rect.height * 0.5;

			//  Calculate the position percentage
			//  -1 when off the top of the screen, and +1 when just off the bottom of the screen.
			var p = (y - min) / (max - min) - 0.5;
			if (p < 0) { 
				p = 0;
			} else if (p > 0) { 
				//  Ease in sine
				p  = 1 - Math.cos((p * Math.PI) / 2);
			} 

			//  Speed modified on mobile
			var speed = o.speed;
			if (w <= 768) { 
				speed *= 0.5;
			}

			//  position...  p is -100 when off the top of the screen, and +100 when just off the bottom of the screen.
			//  speed...  is -100 to +100, multiply by the position
			o.element.style.transform = 'translateY('+(p*200)*(speed/100*4)+'px)';

			//  Opacity  
			if (o.opacity) {  
				var opacity = 1;
				if (p > 0) { 
					opacity = 1-p;
					if (opacity < 0) { 
						opacity = 0;
					}
					if (opacity > 1) { 
						opacity = 1;
					}
				}
				o.element.style.opacity = opacity;
			}

			//  Line height
			if (o.lineHeight) {
				for (var j=0; j<o.lineHeightElements.length; j++) {
					o.lineHeightElements[j].element.style.lineHeight = (o.lineHeightElements[j].base+p*3)+'em';
				}
			}

		}		

		//console.log(performance.now() - fred);

	}



	////////////////////

}




