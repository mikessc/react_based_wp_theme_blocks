import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	console.log(InnerBlocks);
	return (
		<div {...useBlockProps.save()} >
			<InnerBlocks.Content />
		</div>
	);
}
