import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<div {...useBlockProps.save()} >
			<div>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
