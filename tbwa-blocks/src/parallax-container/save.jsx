import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	if (attributes.parallaxEnabled) {
		const options = [
			attributes.parallaxSpeed, 
			attributes.parallaxOpacity ? 1 : 0, 
			attributes.parallaxLineSpacing ? 1 : 0
		];
		return (
			<div {...useBlockProps.save()} data-parallax={ options.join(',') } >
				<InnerBlocks.Content />
			</div>
		);
	}

	return (
		<div {...useBlockProps.save()} >
			<InnerBlocks.Content />
		</div>
	);

}
