
document.addEventListener('DOMContentLoaded', function () {

	var DATA_FILE = '/wp-content/plugins/tbwa-blocks/static/map-offices.json'; 

	//  Map Offices
	async function mapOfficesInit(block) { 
		//  Load the map data
		const response = await fetch(
			DATA_FILE, 
			{
				method: "GET",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			}
		);
		const data = await response.json();
        const agencies = data.agencies;
		const inner = block.querySelector('.inner');
		const accessToken = window.tbwaThemeSettings.mapBoxAccessToken;
		const documentBody = document.getElementsByTagName('body')[0];
		const mapBlockContainer = document.getElementsByClassName('wp-block-tbwa-blocks-map-offices')[0];
		const resultsListContainer = document.getElementById('map-search-results');
		const controlContainer = document.getElementsByClassName('leaflet-control-container');
		const noResultsDisplay = document.createElement('div');
		const noResultsDisplayTitle = document.createElement('h3');
		const noResultsDisplayText = document.createElement('p');
		const noResultsDisplayTipTitle1 = document.createElement('p');
		const noResultsDisplayTipText1 = document.createElement('p');
		const noResultsDisplayTipTitle2 = document.createElement('p');
		const noResultsDisplayTipText2 = document.createElement('p');
		var map;
		var markers;
        console.log(agencies);
        
		noResultsDisplay.classList.add('no-results-container');
		noResultsDisplayTitle.classList.add('h3');
		noResultsDisplayTipTitle1.classList.add('bold');
		noResultsDisplayTipTitle2.classList.add('bold');

		noResultsDisplayTitle.innerText = 'No results for “';
		noResultsDisplayText.innerText = 'Can’t find what you need? This should help:';
		noResultsDisplayTipTitle1.innerText = 'Keep it simple';
		noResultsDisplayTipText1.innerText = 'Instead of “Where in Australia is the head office?”, try just “TBWA Australia”.';
		noResultsDisplayTipTitle2.innerText = 'Search by region';
		noResultsDisplayTipText2.innerText = 'Rather than looking for a specific area like “offices in the East Coast”, try “United State” or “North America”.';

		noResultsDisplay.append(noResultsDisplayText);
		noResultsDisplay.append(noResultsDisplayTipTitle1);
		noResultsDisplay.append(noResultsDisplayTipText1);
		noResultsDisplay.append(noResultsDisplayTipTitle2);
		noResultsDisplay.append(noResultsDisplayTipText2);

		if(agencies && inner) {
			map = L.map(inner, {
				gestureHandling: true
			});

			function addMobileClass () {
				if (window.innerWidth <= 490) {
					for(i=0; i < blocks.length; i++) {
						blocks[i].classList.add('mobile');
					}
				} else {
					for(i=0; i < blocks.length; i++) {
						blocks[i].classList.remove('mobile');
					}
				}
			};

			window.onresize = (event) => {
				addMobileClass();
			};

			addMobileClass();

			//  Start looking at...
			if (window.innerWidth <= 768) { 
				//  New York
				map.setView([40.7306, -73.935242], 2);
			} else { 
				//  The whole world
				map.setView([18.951301853056744, 7.207031250000001], 2.5);
			}

			//  https://groups.google.com/d/msg/leaflet-js/fA6M7fbchOs/JTNVhqdc7JcJ
			map.attributionControl.setPrefix(false);

			//  Tile Set URL
			var tileSetURL = '//api.mapbox.com/styles/v1/davidcolquhountbwa/cl75de5jx000c14sail6jfg4a/tiles/512/{z}/{x}/{y}';
			tileSetURL += (L.Browser.retina ? '@2x' : '');
			tileSetURL += '?access_token='+accessToken;

			L.tileLayer(
				tileSetURL, {
				tileSize: 512,
				zoomOffset: -1, 
				attributionControl: false
			}).addTo(map);

			markers = L.markerClusterGroup({
				disableClusteringAtZoom: 6,
			});
			map.addLayer(markers);

			var searchbox = L.control.searchbox({
				autocompleteFeatures: ['setValueOnClick'],
				collapsed: false,
				position: 'topleft',
				expand: 'left',
				width: '360px',
				iconPath: '/wp-content/plugins/tbwa-blocks/static/images/search.svg',
			}).addTo(map);

			searchboxContainer = document.getElementsByClassName('leaflet-searchbox');
			searchboxContainer[0].placeholder = 'Find a local office';

			setTimeout(function () {
				map.invalidateSize();
			}, 1000);

			//  Tool tip layer
			var tooltip = L.popup({closeOnClick: false, autoClose: false, closeButton: true});

			//  Marker Icon
			var markerIconWidth = 103 * 0.25;
			var markerIconHeight = 145 * 0.25;
			var markerIcon = new L.Icon({
				iconUrl: '/wp-content/plugins/tbwa-blocks/static/leaflet/images/marker-icon-2x.png',
				iconSize: [markerIconWidth, markerIconHeight], 
				iconAnchor: [markerIconWidth*0.5, markerIconHeight],
				popupAnchor: [1, -34]
			});

			// Create Markers
			for (var i=0; i<agencies.length; i++) { 
				mapMakeMarker(agencies[i], i);
			}

			var fuseOptions = {
				keys: [
					'full_address',
					'compass_profile_name',
					'url',
					'country',
				],
				threshold: 0.3
			};
			var fuseSearch = new Fuse(agencies, fuseOptions);
			var searchboxWrapper = document.getElementsByClassName('leaflet-searchbox-wrapper');
			var clearSearch = document.createElement('span');
			clearSearch.classList.add('clear-search');
			clearSearch.onclick = function (event) {
				searchbox.clear();
				clearSearch.classList.remove('active');
				searchboxContainer[0].focus();
			};
			searchboxWrapper[0].append(clearSearch);

			searchbox.onInput('keyup', (e) => {
				resultsListContainer.innerHTML = '';
				if (e.keyCode == 13) {
					search();
				} else {
					var value = searchbox.getValue();
					if (value != "") {
						var suggestion = fuseSearch.search(value);
						clearSearch.classList.add('active');
						searchbox.setItems(suggestion.map(res => res.item['compass_profile_name']));
					} else {
						clearSearch.classList.remove('active');
						searchbox.clearItems();
					}
				}
			});
			searchbox.onButton("click", search);
			searchbox.onAutocomplete("click", search);

			var searchboxContainerBox = document.getElementsByClassName('leaflet-searchbox-container')[0];
			var closeSearchBtn = document.createElement('div');
			closeSearchBtn.classList.add('closeBtn');
			closeSearchBtn.innerText = 'Close';	

			searchboxContainerBox.onclick = (event) => {
				if (controlContainer[0].classList.contains('mobile')) {
					if (event.target.classList.contains('leaflet-searchbox')) {
						documentBody.classList.add('map-searching');
						//mapBlockContainer.scrollIntoView();
						//searchboxContainerBox.classList.add('active');
						//searchboxContainerBox.append(closeSearchBtn);
					}
				}
			};

			closeSearchBtn.onclick = (event) => {
				documentBody.classList.remove('map-searching');
				searchboxContainerBox.classList.remove('active');
				resultsListContainer.classList.remove('active');
				resultsListContainer.innerHTML = '';
			};

			function search () {
				var value = searchbox.getValue();
				resultsListContainer.innerHTML = '';
				clearSearch.classList.remove('active');
				if (value != "") {
					var results = fuseSearch.search(value);
					var row;
					var rowElement;
					if (results.length < 1) {
						noResultsDisplayTitle.innerText += value+'"';
						noResultsDisplay.prepend(noResultsDisplayTitle);
						resultsListContainer.append(noResultsDisplay);
					}
                    
					for(let i = 0; i < results.length; i++) {
						row = {
							'Compass Name' : results[i].item.compass_profile_name,
							'Address' : results[i].item.full_address,
							'Phone' : results[i].item.phone,
							'URL' : results[i].item.url,
							'Latitude' : results[i].item.map_lat ? results[i].item.map_lat : '',
							'Longitude' : results[i].item.map_lng ? results[i].item.map_lng : '',
						}
						rowElement = htmlToElement(mapToolTipHTML(row));
						resultsListContainer.append(rowElement);
						resultsListContainer.style.maxHeight = (map.getSize().y - 75) + "px";
						resultsListContainer.onclick = function (e) {
							currentData = e.target.closest('.tbwa-blocks-map-offices-tool-tip').dataset;
							var clickedRow = {
								'Compass Name' : currentData.name,
								'Address' : currentData.address,
								'Phone' : currentData.phone,
								'URL' : currentData.url,
								'Latitude' : currentData.lat,
								'Longitude' : currentData.lon,
							};
                            
							map.setView([currentData.lat, currentData.lon], 2.5);
							setTimeout(function () {
								map.setView(new L.LatLng(currentData.lat, currentData.lon), 10);
							}, 50);
							tooltipEvent(e, clickedRow, {
								lat: currentData.lat,
								lng: currentData.lon
							}, [1, -34]);
							documentBody.classList.remove('map-searching');
							searchboxContainerBox.classList.remove('active');
							resultsListContainer.classList.remove('active');
							resultsListContainer.innerHTML = '';
						};
					};
					document.getElementsByClassName('leaflet-searchbox-container')[0].append(resultsListContainer);
					resultsListContainer.classList.add('active');
					document.activeElement.blur();
					//inner.scrollIntoView();
				}
	
				setTimeout(function () {
					searchbox.clear();
				}, 100);
			}

			//  Tool Tip HTML
			function mapToolTipHTML(row) {                
				var s = '<div class="tbwa-blocks-map-offices-tool-tip" ';
				s += 'data-lat="'+row['Latitude']+'" data-lon="'+row['Longitude']+'" data-name="'+row['Compass Name']+'" data-address="'+row['Address']+'" data-phone="'+row['Phone']+'" data-url="'+row['URL']+'" >';
				s += '<h6 class="h6">'+row['Compass Name']+'</h6>';
				if (row['Address'] != '') { 
					s += '<div class="tbwa-blocks-map-offices-tool-tip-address"><span></span>'+row['Address']+'</div>';
				}
				if (row['Phone'] != '') { 
					s += '<div class="tbwa-blocks-map-offices-tool-tip-phone"><span></span><a href="tel:'+row['Phone']+'">'+row['Phone']+'</a></div>';
				}
				if (row['URL'] != '') { 
					s += '<div class="tbwa-blocks-map-offices-tool-tip-url"><span></span><a href="'+row['URL']+'">'+row['URL']+'</a></div>';
				}
				s += '</div>';
				return s;
			}

			//  Make a marker from this data
			function mapMakeMarker(row) { 
				if (row['map_lat'] && row['map_lat'] != '' && row['map_lng'] && row['map_lng'] != '') { 
					var marker = L.marker([row['map_lat'], row['map_lng']], {icon:markerIcon});
					marker.on('click', function (event) {
						tooltipEvent(event, row, event.target.getLatLng(), event.target.options.icon.options.popupAnchor);
					});
					markers.addLayer(marker);
					return marker;
				}
				return null;
			};

			function tooltipEvent(event, row, latLong, popupAnchor) {
				tooltip.options.offset = popupAnchor;
				tooltip.setContent(mapToolTipHTML(row)).setLatLng(latLong).addTo(map);

				//  Force the x close button to close the tool tip 
				var closeButton = block.querySelector('.leaflet-popup-close-button');
				closeButton.addEventListener('click', function (e) {
					e.preventDefault();
					tooltip.close();
				});
			};

			function htmlToElement(html) {
				var template = document.createElement('template');
				html = html.trim(); // Never return a text node of whitespace as the result
				template.innerHTML = html;
				return template.content.firstChild;
			}
		}
	}

	//  For each map block
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-map-offices');
	for (var i=0; i<blocks.length; i++) {
		const block = blocks[i];  
		mapOfficesInit(block);
	}

}, false);