document.addEventListener('DOMContentLoaded', function () {

	//  Search Field Placeholder Text
	const placeholderText = 'I\'m looking for...';

	function initTopNav(blockIndex, block) { 
		//console.log('initTopNav');

		//  Find the elements within this Top Nav
		const search = block.querySelector('.search');
		const searchForm = block.querySelector('.search form');
		const searchIcon = block.querySelector('.search-icon');
		const searchField = block.querySelector('input');
		const searchClearIcon = block.querySelector('.search-icon-clear');
		const hamburgerIcon = block.querySelector('.hamburger-icon');
		const closeIcon = block.querySelector('.close-icon');
		const tintSearch = block.querySelector('.tint-search');
		const columnOuter1 = block.querySelector('.column-outer-1');
		const columnOuter2 = block.querySelector('.column-outer-2');

		//  Make sure they're all there
		if (search && searchForm && searchIcon && searchField && searchClearIcon && hamburgerIcon && closeIcon && tintSearch && columnOuter1 && columnOuter2) { 

			//  Listeners
			searchForm.addEventListener('submit', searchFormSubmit);
			hamburgerIcon.addEventListener('click', hamburgerIconClick);
			closeIcon.addEventListener('click', closeIconClick);
			searchIcon.addEventListener('click', searchIconClick);
			searchField.addEventListener('input', searchFieldChanged);
			searchClearIcon.addEventListener('click', clearSearchField);
			tintSearch.addEventListener('click', closeIconClick);
			window.addEventListener('resize', resize);

			//  Mark the current page with .active 
			const links = block.querySelectorAll('.wp-block-tbwa-blocks-top-nav-button a');
			for (var i=0; i<links.length; i++) {
				if (window.location.href == links[i].href) { 
					links[i].classList.add('active');
				}
			}

			//  When the search form is submitted
			function searchFormSubmit(event) { 
				event.preventDefault();

				var searchURL = searchForm.action+'?keywords='+encodeURIComponent(searchField.value);

				if (window.tbwaPageTransitionGoToURL) { 
					window.tbwaPageTransitionGoToURL(searchURL, '_parent');
				}  else { 
					window.open(searchURL, '_parent');
				}

				//  Google Analytics
				gtag('event', 'search', {
					'search_term': searchField.value
				});

			}

			//  Open the mobile menu
			function hamburgerIconClick(event) { 
				//console.log('hamburgerIconClick');
				block.classList.add('menu-open');
				block.classList.remove('search-open');
				hamburgerIcon.classList.remove('show');
				searchIcon.classList.remove('show');
				closeIcon.classList.add('show');
				if (blockIndex == 0) { 
					document.body.classList.add('noscroll');
				}
			};

			//  Close the mobile menu or search, whichever is open.
			function closeIconClick(event) {
				//console.log('closeIconClick'); 
				block.classList.remove('menu-open');
				block.classList.remove('search-open');
				closeIcon.classList.remove('show');
				search.classList.remove('show');
				hamburgerIcon.classList.add('show');
				searchIcon.classList.add('show');
				document.body.classList.remove('noscroll');
			};

			//  Open Search 
			function searchIconClick(event) { 
				//console.log('searchIconClick'); 
				block.classList.remove('menu-open');
				hamburgerIcon.classList.remove('show');
				closeIcon.classList.add('show');
				searchFieldChanged();
				searchField.focus();
				searchField.selectionStart = searchField.selectionEnd = searchField.value.length;
				search.classList.add('show');
				block.classList.add('search-open');

				//  Draw the placeholder text into the text field, one letter at a time
				searchField.value = '';
				searchField.setAttribute('placeholder', '');
					searchField.focus();
				setTimeout(function () { 
					searchFieldPlaceholderAnim();
				}, 333);

				document.addEventListener('click', clickAnywhereToCloseSearch);

			};

			//  Click anywhere to close search
			function clickAnywhereToCloseSearch(event) {
				if (!block.contains(event.target)) { 
					document.removeEventListener('click', clickAnywhereToCloseSearch);
					closeIconClick();
				}
			}

			//  Draw the placeholder text into the text field, one letter at a time
			function searchFieldPlaceholderAnim() { 
				const s = placeholderText.substr(0, searchField.placeholder.length+1);
				searchField.placeholder = s;
				if (s.length < placeholderText.length) { 
					setTimeout(function () { 
						searchFieldPlaceholderAnim();
					}, 50);
				} else { 
					searchField.focus();
				}
			}

			//  Search field changed
			function searchFieldChanged(event) { 
				if (searchField.value == '') { 
					searchClearIcon.classList.remove('show');
				} else { 
					searchClearIcon.classList.add('show');
				}
			}

			//  Clear the search field
			function clearSearchField(event) { 
				searchField.value = '';
				searchClearIcon.classList.remove('show');
				searchField.focus();
			}


			//  Resize
			var previousWidth = window.innerWidth;
			function resize() { 

				//  If resized from mobile to desktop breakpoint, close the mobile nav
				const w = window.innerWidth;
				if (previousWidth != w) { 
					previousWidth = w;
					if (w > 768) { 
						closeIconClick();
					}
				}

			}

			//  The first top nav is sticky, offset by elements above it, and on (smooth) scroll sticks to the top
			if (blockIndex == 0) { 
				block.classList.add('first');

				function update() {
					var position1 = 'absolute';
					var position2 = 'relative';
					if (block.getBoundingClientRect().top <= 0) { 
						position1 = 'fixed';
						position2 = 'fixed';
					}
					columnOuter1.style.position = position1;
					columnOuter2.style.position = position2;
				}
				window.addEventListener('resize', update);
				document.addEventListener('scroll', update);
				document.addEventListener("smoothscroll", update);
				update();

			}

			//  Clean up
			document.addEventListener('cleanup', cleanUp);
			function cleanUp() { 
				document.removeEventListener('cleanup', cleanUp);
				window.removeEventListener('resize', resize);
				window.removeEventListener('resize', update);
				document.removeEventListener('scroll', update);
				document.removeEventListener("smoothscroll", update);
			}

		}

	}

	//  For each Top Nav block
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-top-nav');
	for (var i=0; i<blocks.length; i++) {
		const block = blocks[i];  
		initTopNav(i, block);
	}

	

}, false);























