//  

export default function GoogleAnalytics() {
	//console.log('GA: Start');
	//console.log('Cookies: ', document.cookie.split(';'));

	////////////////////
	//  Enabled
	function enabled() { 
		return document.body.classList.contains('tbwa-google-analytics-enabled');
	}

	////////////////////
	//  Before DOM is loaded, create gtag data layer
	if (enabled) { 
		//console.log('GA: Setup Data Layer');
		window.dataLayer = window.dataLayer || [];
		window.gtag = function() {
			//console.log('gtag', arguments);
			window.dataLayer.push(arguments);
		}
		gtag('js', new Date());
	}

	////////////////////
	//  Once
	function initOnce() {
		document.removeEventListener('DOMContentLoaded', initOnce);
		if (enabled()) { 

			//  Listen for Contact Form 7 submits
			document.addEventListener('wpcf7submit', function(event) {
				gtag('event', 'Form submit', {
					'formId' : event.detail.contactFormId,
					'response' : event.detail.inputs
				})
			}); 

			//  Google Analytics Script 
			//console.log('GA: Script appended');
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.async = true;
			script.src = "//www.googletagmanager.com/gtag/js?id="+tbwaThemeSettings.googleAnalyticsID;
			document.getElementsByTagName("head")[0].appendChild(script);

			/*
			if (getCookie(window.tbwaThemeCookieConsentKey) == '1') { 

				//  Accepted
				//console.log('GA: Consent accepted previously by cookie notifcation overlay');
				gtag('consent', 'default', {
					'ad_storage': 'denied', 
					'analytics_storage': 'granted', 
					'functionality_storage': 'denied',
					'personalization_storage': 'denied',
					'security_storage': 'denied'
				});

			} else {
			*/

				//  By default cookie consent is denied
				//console.log('GA: Consent denied by default');
				gtag('consent', 'default', {
					'ad_storage': 'denied', 
					'analytics_storage': 'denied', 
					'functionality_storage': 'denied',
					'personalization_storage': 'denied',
					'security_storage': 'denied'
				});

			//}

			//  Config, do count the page view
			//console.log('GA: Config and page view');
			gtag('config', tbwaThemeSettings.googleAnalyticsID, { 'send_page_view': true });

			//  Note: Page view events are also sent by Pagetransition.jsx


		}
	}
	document.addEventListener('DOMContentLoaded', initOnce);


	////////////////////
	/*
	function getCookie(name) {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	*/
	////////////////////

}

/*

//  Carousel Block
gtag('event', 'Carousel Previous', {});
gtag('event', 'Carousel Next', {});

//  Homepage Hero Block
gtag('event', 'Homepage Hero Previous', {});
gtag('event', 'Homepage Hero Next', {});

//  Contact 7 Forms
gtag('event', 'Form submit', {
	'formId' : event.detail.contactFormId,
	'response' : event.detail.inputs
})

//  Search
gtag('event', 'search', {
	'search_term': 'Potato'
});

//  Tabs Block
gtag('event', 'tab', {
	'tab_name': item.title.innerHTML
});

//  Page Views by Page Transition
gtag('event', 'page_view', {
	page_title: document.title,
	page_location: window.location.href,
	page_path: window.location.pathname,
});

//  Video Block
gtag('event', 'Video Volume', {
	'file': fileName ,
	'level': volumeState
});
gtag('event', 'Video Fullscreen', {
	'file': fileName
});
gtag('event', 'Video Play First', {
	'file': fileName 
});
gtag('event', 'Video Play', {
	'file': fileName 
});
gtag('event', 'Video Pause', {
	'file': fileName 
});

*/




