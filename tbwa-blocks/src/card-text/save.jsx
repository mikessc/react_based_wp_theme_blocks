import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function save({ attributes }) {

	return (
		<div {...useBlockProps.save()}  >
			<InnerBlocks.Content />
		</div>
	);

}

