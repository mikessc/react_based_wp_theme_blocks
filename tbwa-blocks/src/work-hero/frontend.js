

document.addEventListener('DOMContentLoaded', function () {

	function caseStudyHeroInit(block) { 
		const media = block.querySelector('.media');
		if (media) { 

			window.addEventListener('resize', update);
			document.addEventListener('scroll', update);
			document.addEventListener('smoothscroll', update);

			//  Clean up
			document.addEventListener('cleanup', cleanUp);
			function cleanUp() { 
				document.removeEventListener('cleanup', cleanUp);
				window.removeEventListener('resize', update);
				document.removeEventListener('scroll', update);
				document.removeEventListener('smoothscroll', update);
			}

			//  Update
			function update() { 

				//  Capture the scroll
				const h = window.innerHeight * 0.8 * 0.33;
				const top = block.offsetTop;
				var y = top - block.getBoundingClientRect().top;
				if (y > h) { 
					y = h;
				}
				media.style.paddingTop = (y)+'px';

				//  Fix the height
				const column = block.querySelector('.column');
				const inner = block.querySelector('.background-black, .background-white');
				if (column && inner) { 
					const rect = column.getBoundingClientRect();
					const h = column.offsetTop  + rect.height;
					inner.style.height = h+'px';
				}

			}
			update();
	
		}
	}

	//  For each case study hero block
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-case-study-hero');
	for (var i=0; i<blocks.length; i++) {
		const block = blocks[i];  
		caseStudyHeroInit(block);
	}


}, false);


