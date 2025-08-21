
document.addEventListener('DOMContentLoaded', function () {

	function appendChildrenNumberClass(block) { 
		const blockCount = block.children.length;
		if (blockCount % 5 == 1) {
			block.classList.add("lonely-circle-companion");
		}
	}

	const blocks = document.getElementsByClassName('wp-block-tbwa-blocks-heading-circle-container');
	if (blocks) {
		for (var i=0; i<blocks.length; i++) {
			const block = blocks[i];  
			appendChildrenNumberClass(block);
		}
	}

}, false);






















