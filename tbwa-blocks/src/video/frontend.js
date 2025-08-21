
import { color } from '../_common.jsx';

document.addEventListener('DOMContentLoaded', function () {

	////////////////////
	function initVideo (block) { 
		
		var state = 'preview';
		var cursor = 'play';
		var barDragging = false;
		var volumeState = 100;

		//  Mouse
		var mx = 0; 
		var my = 0; 

		//  Media 
		const preview 		 = block.querySelector('.media .preview');
		const principal 	 = block.querySelector('.media .principal');
		const principalVideo = block.querySelector('.media .principal video');
		const overlay 		 = block.querySelector('.media .overlay');
		const touchscreenPlay = block.querySelector('.media .touchscreen-play');

		//  Controls 
		const controls 		 = block.querySelector('.controls');
		const volume 		 = block.querySelector('.controls .volume');
		const volume0 		 = block.querySelector('.controls .volume-0');
		const volume33 		 = block.querySelector('.controls .volume-33');
		const volume66		 = block.querySelector('.controls .volume-66');
		const volume100 	 = block.querySelector('.controls .volume-100');
		const duration 		 = block.querySelector('.controls .duration span');
		const bar		 	 = block.querySelector('.controls .bar');
		const barProgress 	 = block.querySelector('.controls .bar .progress');
		const barKnob 		 = block.querySelector('.controls .bar .knob');
		const fullScreenMax  = block.querySelector('.controls .fullscreen-max');

		//  Make sure the elements exist
		if (preview && principal && principalVideo && overlay && touchscreenPlay && controls && volume && volume0 && volume33 && volume66 && volume100 && duration && bar && barProgress && barKnob && fullScreenMax) { 
		} else { 
			return;
		}

		//  Name of the principal video file, used by Google Analytics
		var fileName = '';
		var source = block.querySelector('.media .principal video source')
		if (source) { 
			var a = source.getAttribute('src').split('/');
			fileName = a[a.length-1];
		}
		//console.log(fileName);

		//  Listeners
		window.addEventListener('resize', resized);
		window.addEventListener('mousemove', mouseMoved);
		block.addEventListener('click', clicked);
		if (isTouchScreen()) { 
			bar.addEventListener('touchstart', barDown);
		} else { 
			bar.addEventListener('mousedown', barDown);
		}
		volume.addEventListener('click', volumeClicked);
		fullScreenMax.addEventListener('click', goFullScreen);
		document.addEventListener('fullscreenchange', changeFullScreen);
		principalVideo.addEventListener('ended', principalEnded);
		looper();

		//  Clean up
		document.addEventListener('cleanup', cleanUp);
		function cleanUp() { 
			document.removeEventListener('cleanup', cleanUp);
			window.removeEventListener('resize', resized);
			window.removeEventListener('mousemove', mouseMoved);
			document.removeEventListener('fullscreenchange', changeFullScreen);
		}

		////////////////////
		//  Resize
		function resized(event) { 

			//  Controls start off screen
			if (state == 'preview') { 
				const rect = controls.getBoundingClientRect();
				controls.style.bottom = -rect.height+'px';
			}

		}
		resized();

		////////////////////
		//  Loop 
		function looper() { 
			if (!isNaN(principalVideo.duration)) {

				//  Duration
				if (principalVideo.duration > 60*60) { 
					duration.innerHTML = new Date(principalVideo.duration*1000).toISOString().substr(11, 8);
				} else { 
					duration.innerHTML = new Date(principalVideo.duration*1000).toISOString().substr(14, 5);
				}

				//  Playback bar and knob
				var p = principalVideo.currentTime/principalVideo.duration;
				if (p < 0) { 
					p = 0;
				}
				if (p > 1) { 
					p = 1;
				}
				var x = (bar.getBoundingClientRect().width * p) - barKnob.getBoundingClientRect().width*0.5;
				barProgress.style.width = (p*100)+'%';
				barKnob.style.left = (x)+'px';

			}
			requestAnimationFrame(looper);
		}

		////////////////////
		//  Volume
		function volumeClicked() { 
			switch (volumeState) { 
			case 100: 
				volumeState = 0; 
				volume0.style.display = 'block';
				volume33.style.display = 'none';
				volume66.style.display = 'none';
				volume100.style.display = 'none';
				principalVideo.volume = 0; 
				break;
			case 0:   
				volumeState = 33; 
				volume0.style.display = 'none';
				volume33.style.display = 'block';
				volume66.style.display = 'none';
				volume100.style.display = 'none';
				principalVideo.volume = 0.33; 
				break;
			case 33:  
				volumeState = 66; 
				volume0.style.display = 'none';
				volume33.style.display = 'none';
				volume66.style.display = 'block';
				volume100.style.display = 'none';
				principalVideo.volume = 0.66; 
				break;
			case 66:  
				volumeState = 100; 
				volume0.style.display = 'none';
				volume33.style.display = 'none';
				volume66.style.display = 'none';
				volume100.style.display = 'block';
				principalVideo.volume = 1.0; 
				break;
			}

			//  Google Analytics
			gtag('event', 'Video Volume', {
				'file': fileName ,
				'level': volumeState
			});

		}

		////////////////////
		//  Ended
		function principalEnded(event) {
			console.log('principalEnded'); 
			cursor = 'play';
		}

		////////////////////
		//  Go full screen
		function goFullScreen() { 
			principalVideo.requestFullscreen();

			//  Google Analytics
			gtag('event', 'Video Fullscreen', {
				'file': fileName
			});

		}
		function changeFullScreen() { 
			principalVideo.controls = !principalVideo.controls;
		}
		
		
		////////////////////
		//  Bar down / up
		function barDown(event) { 
			barDragging = true;
			principalVideo.pause();
			cursor = 'play';
			if (isTouchScreen()) { 
				document.addEventListener('touchend', barUp);
			} else { 
				document.addEventListener('mouseup', barUp);
			}
			barDrag();
		}
		function barDrag() { 
			if (barDragging) { 
				const barRect = bar.getBoundingClientRect();
				const p = (mx - barRect.left) / barRect.width;
				principalVideo.currentTime = principalVideo.duration * p;
				principalVideo.pause();
			}
		}
		function barUp(event) { 
			barDragging = false;
			if (isTouchScreen()) { 
				document.removeEventListener('touchend', barUp);
			} else { 
				document.removeEventListener('mouseup', barUp);
			}
			barDrag();
		}

		

		////////////////////
		//  Mouse Move
		function mouseMoved(event) { 
			mx = event.clientX; 
			my = event.clientY; 

			//  Hide near controls
			if (aboveControls()) { 
				select(cursor);
			} else {
				select('');
			}

			//  Dragging
			if (barDragging) { 
				barDrag();
			}

		};

		////////////////////
		//  Select cursor
		function select(c) { 
			if (window.tbwaThemeFollowCursorSelect) { 
				window.tbwaThemeFollowCursorSelect(c, block, 'small', 'black-white');
			}
		}

		////////////////////
		//  On click anywhere in this block
		function clicked(event) { 
			event.preventDefault();

			////////////////////
			//  Preview transitions to principal video
			if (state == 'preview') { 
				state = 'principal';
				cursor = '';

				//  Hide the touchscreen play button
				touchscreenPlay.style.display = 'none';

				//  Background color yellow
				block.style.backgroundColor = color.yellow;

				//  Circle wipe out the preview and overlay
				preview.style.clipPath = 'circle(0%)';
				overlay.style.clipPath = 'circle(0%)';

				//  Circle wipe the principal video on
				setTimeout(function () { 
					principal.style.display = 'block';
					setTimeout(function () { 
						principal.style.clipPath = 'circle(100%)';
					}, 100);
				}, 500);

				//  Controls move on(not on mobile)
                if (!isTouchScreen()) {
				controls.style.transition = 'bottom 0.33s ease-out';
				setTimeout(function () { 
					controls.style.bottom = '0px';
				}, 1000);
			}

				//  Background color black
				setTimeout(function () { 
					block.style.backgroundColor = color.black;
					cursor = 'pause';
				}, 1200);

				//  Play the principal video
				principalVideo.play();

				//  Google Analytics
				gtag('event', 'Video Play First', {
					'file': fileName 
				});


			////////////////////
			} else if (state == 'principal') { 
				if (isTouchScreen()) {
					controls.style.display = 'none';
					principalVideo.controls = !principalVideo.controls;
					
				}
				else{
				if (aboveControls()) { 	
					if (principalVideo.paused) { 
						principalVideo.play();
						cursor = 'pause';

						//  Google Analytics
						gtag('event', 'Video Play', {
							'file': fileName 
						});

					} else { 
						principalVideo.pause();
						cursor = 'play';

						//  Google Analytics
						gtag('event', 'Video Pause', {
							'file': fileName 
						});

					}
				}
			}
		}
			mouseMoved(event);
		}

		////////////////////
		function ms() { 
			return performance.now()/1000;
		}

		////////////////////
		function isTouchScreen() { 
			if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
				return true;
			}
			return false;

		 
		}

		////////////////////
		function aboveControls() { 
			const blockRect = block.getBoundingClientRect();
			const controlsRect = controls.getBoundingClientRect();
			return blockRect.bottom - my > controlsRect.height; 
		}

		////////////////////

	}

	////////////////////
	//  For each Homepage hero block
	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-video');
	for (var i=0; i<blocks.length; i++) {
		const block = blocks[i];  
		initVideo(block);
	}


	////////////////////

}, false);






















