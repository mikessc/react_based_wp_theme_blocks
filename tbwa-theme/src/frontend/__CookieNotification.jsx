//  

export default function CookieNotification() {

	////////////////////
	const copyMessage = 'This website uses cookies for analytics purposes only. By clicking "Accept", \
						 you consent to our use of cookies. <a href="/legals/cookie-policy/">Read the full Cookie Policy here</a>. ';
	const copyReject = 'Reject&nbsp;Cookies';
	const copyAccept = 'Accept&nbsp;Cookies';

	////////////////////
	//  The name of the cookie consent cookie (also used by Google Analtyics)
	window.tbwaThemeCookieConsentKey = 'cookieConsent';

	//  How long to remember their cookie consent
	var cookieConsentDuration = 60*60*24*31;  // In seconds, 31 days. 

	//  Notifcation container
	var container;

	//  Enabled
	function enabled() { 
		return (document.getElementById('cookie-notification-overlay') && 
				document.body.classList.contains('tbwa-cookie-notification-enabled'));
	}

	//  Once
	function initOnce() {
		document.removeEventListener('DOMContentLoaded', initOnce);

		if (document.body.classList.contains('wp-debug')) { 
			cookieConsentDuration = 2000*60; // 2000 minutes
		}

		if (true) { 

			//  Only if the user hasn't accepted or rejected the cookie yet
			if (getCookie(window.tbwaThemeCookieConsentKey) == undefined) { 

				container = document.getElementById('cookie-notification-overlay');
				if (container) { 

					//  Create the cookie notification DOM only when it's needed.

					container.classList.add('background-white');

					var inner = document.createElement('div');
					container.appendChild(inner);

					var messageOuter = document.createElement('div');
					messageOuter.classList.add('wp-block-tbwa-blocks-paragraph');
					messageOuter.classList.add('message');
					inner.appendChild(messageOuter);

					var message = document.createElement('p');
					message.classList.add('standard');
					message.innerHTML = copyMessage;
					messageOuter.appendChild(message);

					var rejectOuter = document.createElement('div');
					rejectOuter.classList.add('wp-block-tbwa-blocks-button');
					rejectOuter.classList.add('reject');
					rejectOuter.classList.add('secondary');
					inner.appendChild(rejectOuter);

					var buttonReject = document.createElement('button');
					buttonReject.innerHTML = copyReject;
					buttonReject.addEventListener('click', rejected);
					rejectOuter.appendChild(buttonReject);

					var acceptOuter = document.createElement('div');
					acceptOuter.classList.add('wp-block-tbwa-blocks-button');
					acceptOuter.classList.add('accept');
					inner.appendChild(acceptOuter);

					var buttonAccept = document.createElement('button');
					buttonAccept.innerHTML = copyAccept;
					buttonAccept.addEventListener('click', accepted);
					acceptOuter.appendChild(buttonAccept);

					if (window.tbwaPageTransitionLinkCapture) { 
						window.tbwaPageTransitionLinkCapture();
					}

				}
			}

		}
	}
	document.addEventListener('DOMContentLoaded', initOnce);

	
	////////////////////
	function hide() { 
		if (container) { 
			container.style.display = 'none';
			container.innerHTML = '';
		}
	}
	
	function rejected(event) { 
		event.preventDefault();
		deleteAllCookies();
		document.cookie = window.tbwaThemeCookieConsentKey+'=0; Secure; SameSite=Strict; path=/; max-age='+cookieConsentDuration+';';
		console.log('GA: Consent denied');
		gtag('consent', 'update', {
			'analytics_storage': 'denied'
		});
		hide();
	}

	function accepted(event) { 
		event.preventDefault();
		document.cookie = window.tbwaThemeCookieConsentKey+'=1; Secure; SameSite=Strict; path=/; max-age='+cookieConsentDuration+';';
		console.log('GA: Consent granted');
		gtag('consent', 'update', {
			'analytics_storage': 'granted'
		});
		hide();
	}

	////////////////////
	function getCookie(name) {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	function deleteCookie(name) {
		document.cookie = name + "=; path=/; max-age=" + -1;
	}
	function deleteAllCookies() {
		var cookies = document.cookie.split(";");
		for (var i=0; i<cookies.length; i++) {
			deleteCookie(cookies[i].split("=")[0]);
		}
	}
	
	////////////////////

}




