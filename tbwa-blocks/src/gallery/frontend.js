document.addEventListener(
    "DOMContentLoaded",
    function () {
        function galleryInit(block) {
            var items = block.querySelectorAll(".wp-block-tbwa-blocks-gallery-item");
            
            // Track loaded images
            let loadedImages = 0;
            const totalImages = items.length;

            // Initialize after all images are loaded
            function initializeGallery() {
                window.addEventListener("resize", resized);
                document.addEventListener("scroll", update);
                document.addEventListener("smoothscroll", update);

                document.addEventListener("cleanup", cleanUp);
                function cleanUp() {
                    document.removeEventListener("cleanup", cleanUp);
                    window.removeEventListener("resize", resized);
                    document.removeEventListener("scroll", update);
                    document.removeEventListener("smoothscroll", update);
                }

                function resized() {
                    let maxImageHeight = 0;
                    
                    // Calculate maximum image height
                    items.forEach(function (item) {
                        const image = item.querySelector("img");
                        if (image && image.complete) {
                            const imageHeight = image.offsetHeight;
                            maxImageHeight = Math.max(maxImageHeight, imageHeight);
                        }
                    });

                    // Set block height based on maximum image height
                    if (maxImageHeight > 0) {
                        block.style.height = (items.length * maxImageHeight * 0.99) + "px";
                    }
                }

                function update() {
                    const y = block.getBoundingClientRect().top;
                    let maxImageHeight = 0;

                    // Recalculate max height on each update
                    items.forEach(function (item) {
                        const image = item.querySelector("img");
                        if (image && image.complete) {
                            const imageHeight = image.offsetHeight;
                            maxImageHeight = Math.max(maxImageHeight, imageHeight);
                        }
                    });

                    // Skip parallax if no valid height
                    if (maxImageHeight === 0) return;

                    const spacing = maxImageHeight * 0.99;

                    items.forEach((item, i) => {
                        let top = y + (i * spacing);
                        top = Math.max(0, top);

                        // Handle bottom boundary
                        if (y < 0 - ((items.length - 1) * spacing)) {
                            top = y + ((items.length - 1) * spacing);
                        }

                        item.style.top = `${top}px`;
                    });
                }

                resized();
                update();
            }

            // Delay to allow layout to stabilize and fix white image
            if (loadedImages === totalImages) {
                setTimeout(() => {
                    initializeGallery();
                }, 50);
            }

            // Wait for all images to load
            items.forEach(item => {
                const image = item.querySelector("img");
                if (image) {
                    if (image.complete) {
                        loadedImages++;
                        if (loadedImages === totalImages) {
                            initializeGallery();
                        }
                    } else {
                        image.addEventListener('load', () => {
                            loadedImages++;
                            if (loadedImages === totalImages) {
                                initializeGallery();
                            }
                        });
                        
                        // Handle broken images
                        image.addEventListener('error', () => {
                            loadedImages++;
                            if (loadedImages === totalImages) {
                                initializeGallery();
                            }
                        });
                    }
                }
            });

            // Fallback if no images are found or loaded
            if (totalImages === 0) {
                initializeGallery();
            }
        }

        // Initialize all gallery blocks
        const blocks = document.getElementsByClassName("wp-block-tbwa-blocks-gallery");
        for (var i = 0; i < blocks.length; i++) {
            galleryInit(blocks[i]);
        }
    },
    false
);
