
import './index.scss';
import './forms.scss';
import './oddity.scss';
import './tags.scss';

import PageTransition from './PageTransition.jsx';
import Parallax from './Parallax.jsx';
import SmoothScroll from './SmoothScroll.jsx';
import FollowCursor from './FollowCursor.jsx';
//import CookieNotification from './CookieNotification.jsx';
import GoogleAnalytics from './GoogleAnalytics.jsx';

SmoothScroll();
PageTransition();
Parallax();
FollowCursor();
//CookieNotification();
GoogleAnalytics();




////////////////////
//  Forms Oddity
//
//  Our select drop down forms need to be a different color 
//  when they have their default "Please select" option selected. 
//  This code adds a data-value attribute to the selects, 
//  and then css can use that to color the drop downs. 
//
//  The contact form is not used
//
/*
function tbwaThemeFormSelectDataAttribute() {
	const selects = document.querySelectorAll('.wpcf7-select');
	for (var i=0; i<selects.length; i++) { 
		var select = selects[i];
		select.setAttribute('data-value', select.value);
		select.addEventListener('change', function (event) { 
			this.setAttribute('data-value', this.value);
		});
	}
}
document.addEventListener('DOMContentLoaded', tbwaThemeFormSelectDataAttribute);
*/

////////////////////
//  Video Oddity
// 
//  Pause videos when the scroll off the top of the screen. 
function tbwaThemeVideoPausedWhenOffscreen() { 
	const videos = document.querySelectorAll('video');
	for (var i=0; i<videos.length; i++) { 
		var video = videos[i];
		if (video.hasAttribute('muted') && video.hasAttribute('playsinline')) { 
			var bounds = video.getBoundingClientRect();
			if (bounds) { 
				//if (bounds.bottom < window.innerHeight * 0.25) { 
				if (bounds.top < -window.innerHeight * 0.10) { 
					video.pause();
				} else { 
					video.play();
				}
			}
		}
	}
}
document.addEventListener('scroll', tbwaThemeVideoPausedWhenOffscreen);
document.addEventListener('smoothscroll', tbwaThemeVideoPausedWhenOffscreen);
