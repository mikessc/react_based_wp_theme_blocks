document.addEventListener(
	"DOMContentLoaded",
	function () {
		const blocks = document.querySelectorAll(
			".wp-block-tbwa-blocks-image-animated-sprite,.wp-block-tbwa-blocks-section-with-spritesheet-media .media,.wp-block-tbwa-blocks-section-with-spritesheet-media .column-outer"
		);

		function initSpriteAnimation(block) {
			const sprite = block.querySelector(".sprite");

			if (sprite) {
				const spriteUrl = block.dataset.spriteUrl; // Access data attribute
				const spriteWidth = 900; // Width of a single sprite (original or scaled)
				const spriteHeight = 900; // Height of a single sprite (original or scaled)
				const totalRows = Math.ceil(49 / 9); // Calculate rows based on 49 frames and 9 columns
				const totalColumns = 9; // Number of columns in the sprite sheet
				const totalFrames = 49; // Total number of frames (custom)
				const frameTime = 1000 / 20; // Animation speed (adjust if needed)

				// Initialize currentFrame to the last frame for reverse animation
				let currentFrame = totalFrames - 1;

				function animate() {
					// Wrap around to the last frame when reaching 0
					if (currentFrame < 0) {
						currentFrame = totalFrames - 1;
					}

					const row = Math.floor(currentFrame / totalColumns);
					const col = currentFrame % totalColumns;

					// Get container dimensions
					const containerWidth = block.clientWidth;
					const containerHeight = block.clientHeight;

					// Calculate scaling factor to fit the single sprite within the container
					const maxScaleFactor = Math.min(
						containerWidth / spriteWidth,
						containerHeight / spriteHeight
					);

					// Apply scaling factor to sprite dimensions
					const scaledSpriteWidth = spriteWidth * maxScaleFactor;
					const scaledSpriteHeight = spriteHeight * maxScaleFactor;

					// Update background image and size dynamically
					sprite.style.backgroundImage = `url(${spriteUrl})`;
					sprite.style.backgroundSize = `${8100 * maxScaleFactor}px ${
						5400 * maxScaleFactor
					}px`; // Scale entire sprite sheet

					// Calculate background position for centering and animation
					const horizontalOffset = (containerWidth - scaledSpriteWidth) / 2;
					const centeredXPos =
						-col * scaledSpriteWidth + horizontalOffset + "px";
					const yPos = -row * scaledSpriteHeight + "px";
					sprite.style.backgroundPosition = `${centeredXPos} ${yPos}`;

					// Decrement frame for reverse animation
					currentFrame--;

					// Conditionally center content within 'wp-block-tbwa-blocks-section-with-spritesheet-media'
					const sectionContainer = block.closest(
						".wp-block-tbwa-blocks-section-with-spritesheet-media .column-outer"
					);
					if (sectionContainer) {
						const sectionWidth = sectionContainer.clientWidth;
						const sectionHeight = sectionContainer.clientHeight;
						if (sectionWidth !== sectionHeight) {
							// block.style.display = "flex";
							// block.style.alignItems = "center";
							// block.style.margin = "0 auto"; // Center horizontally
							// block.style.marginTop =
							// (sectionHeight - block.clientHeight) / 2 + "px"; // Center vertically
							const childDiv = block.firstElementChild; // Get the first child div
							childDiv.style.margin = "0 auto"; // Center horizontally
							childDiv.style.width = childDiv.clientHeight + "px"; // Set width to match height
						} else {
							block.style.margin = ""; // Reset margins if dimensions are equal
							childDiv.style.width = ""; // Reset width if dimensions are equal
						}
					}
				}

				setInterval(animate, frameTime);

				// Add event listener for window resize to update scaling on resize
				window.addEventListener("resize", () => {
					animate(); // Call animate function to recalculate scaling and position
				});
			}
		}
		if (blocks.length > 0) {
			for (const block of blocks) {
				initSpriteAnimation(block);
			}
		}
	},
	false
);
