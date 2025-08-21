

document.addEventListener('DOMContentLoaded', function () {

	//  Tabs
	function tabsInit(block) { 

		var items = [];

		//  The cloud of links container
		const cloud = block.querySelector('.cloud');

		//  For each tab
		const tabs = block.querySelectorAll('.wp-block-tbwa-blocks-tab');
		for (var i=0; i<tabs.length; i++) { 
			tabInit(tabs, i);
		}

		function tabInit(tabs, i) {

			var item = {}
			item.tab = tabs[i];

			//  Title
			item.title = item.tab.querySelector('.title');

			//  Cloud a link
			item.cloudLink = document.createElement('a');
			item.cloudLink.innerHTML = item.title.innerHTML;
			cloud.append(item.cloudLink);

			//  Cloud backslash
			if (i < tabs.length-1) { 
				var cloudBackslash = document.createElement('span');
				cloudBackslash.classList.add('backslash');
				cloudBackslash.innerHTML = ' / ';
				cloud.append(cloudBackslash);
			}

			//  First is active
			if (i == 0) { 
				item.tab.classList.add('active-desktop');
				item.cloudLink.classList.add('active-desktop');
			}

			//  Title click
			item.title.addEventListener('click', function (event) { 
				event.preventDefault();
				this.parentNode.classList.toggle('active-mobile');
			});

			//  Cloud click
			item.cloudLink.addEventListener('click', function (event) { 
				event.preventDefault();
				tabSelect(items, item);
			});

			//  Remember this item
			items.push(item);

		}

		//  Select a tab
		function tabSelect(items, item) { 
			for (var i=0; i<items.length; i++) { 
				items[i].tab.classList.remove('active-desktop');
				items[i].cloudLink.classList.remove('active-desktop');
			}
			item.tab.classList.add('active-desktop'); 
			item.cloudLink.classList.add('active-desktop'); 

			//  Google Analytics
			gtag('event', 'tab', {
				'tab_name': item.title.innerHTML
			});

		}

	}

	//  For each tabs block
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-tabs');
	for (var i=0; i<blocks.length; i++) {
		const block = blocks[i];  
		tabsInit(block);
	}


}, false);


