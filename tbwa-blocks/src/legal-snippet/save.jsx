import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const blockProps = useBlockProps.save({
		'className': 'width-'+attributes.width+' background-'+attributes.background+' stripe-'+attributes.stripe
	});

	return (
		<div {...blockProps} >
			<div>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

