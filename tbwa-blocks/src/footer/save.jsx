import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<footer {...useBlockProps.save({'className':'background-black'})} >
			<div className="column" >
				<InnerBlocks.Content />
			</div>
		</footer>
	);
}
