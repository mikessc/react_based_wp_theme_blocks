document.addEventListener('DOMContentLoaded', function () {

	function initLanguageSelector(block) { 
		//console.log('initLanguageSelector');

		//  Find the elements within this Top Nav
		const label = block.querySelector('label');
		const select = block.querySelector('select');

		//  Make sure they're all there
		if (label && select) { 

			//  Resize fixes width
			function resize() { 
				list.classList.add('visible');
				var max = 0;
				var buttons = list.querySelectorAll('button');
				for (var j=0; j<buttons.length; j++) { 
					var w = buttons[j].getBoundingClientRect().width;
					if (max < w) { 
						max = w;
					}
				}
				container.style.width = max+'px';
				list.classList.remove('visible');
			}
			setTimeout(resize, 100);
			window.addEventListener('resize', resize);

			//  Clean up
			document.addEventListener('cleanup', cleanUp);
			function cleanUp() { 
				window.removeEventListener('resize', resize);
			}

			//  Create the drop down
			const options = select.querySelectorAll('option');
			if (options.length >= 1) { 

				//  Button
				function buttonCreate(i) { 
					var button = document.createElement('button');
					var dataImageURL = options[i].getAttribute('data-image-url');

					//  Flag Image
					if (dataImageURL != '') { 
						var img = document.createElement('img');
						img.src = dataImageURL;
						button.appendChild(img);
						img.parentNode.style.opacity = 0;
						img.onload = function () { 
							this.parentNode.style.opacity = 1;
						}
					}

					//  Button title
					var title = document.createElement('span');
					title.innerHTML = options[i].innerHTML;
					button.appendChild(title);

					return button;
				}

				//  Container
				var container = document.createElement('div');
				container.classList.add('dropdown');

				//  Currently selected container
				var selected = document.createElement('div');
				selected.classList.add('selected');
				container.appendChild(selected);

				//  Currently selected button
				function buttonCreateSelected(i) { 
					var button = buttonCreate(i);
					button.addEventListener('click', function (event) { 
						event.preventDefault();
						list.classList.toggle('visible');
					});
					selected.innerHTML = '';
					selected.appendChild(button);
				}
				buttonCreateSelected(0);

				//  List of all buttons container
				var list = document.createElement('div');
				list.classList.add('list');
				container.appendChild(list);

				//  List of all buttons 
				function buttonCreateForList(i) { 
					var button = buttonCreate(i);
					button.addEventListener('click', function (event) { 
						event.preventDefault();
						
						var linkURL = options[i].getAttribute('data-link-url');
						var linkTarget = options[i].getAttribute('data-link-target');

						buttonCreateSelected(i);
						list.classList.remove('visible');

						if (linkURL != '') { 
							if (window.tbwaPageTransitionGoToURL) { 
								window.tbwaPageTransitionGoToURL(linkURL, linkTarget);
							}  else { 
								window.open(linkURL, linkTarget);
							}
						}

					});
					list.appendChild(button);
				}
				for (var i=1; i<options.length; i++) { 
					buttonCreateForList(i);
				}

				select.parentNode.replaceChild(container, select);
			}

		}

		block.style.display = 'flex';
	}

	//  For each Language Selector block
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-language-selector');
	for (var i=0; i<blocks.length; i++) {
		initLanguageSelector(blocks[i]);
	}

	

}, false);























