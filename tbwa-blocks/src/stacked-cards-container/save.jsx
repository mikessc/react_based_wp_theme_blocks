import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const blockProps = useBlockProps.save({
		'className': 'background-'+attributes.background
	});

	return (
		<div {...blockProps} >
			<div>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}



