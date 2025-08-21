import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const classes = {'className':[
		'cols-desktop-'+attributes.desktop, 
		'cols-tablet-'+attributes.tablet, 
		'cols-mobile-'+attributes.mobile
	].join(' ')}
	
	if (attributes.parallaxEnabled) {
		const options = [
			attributes.parallaxSpeed, 
			attributes.parallaxOpacity ? 1 : 0, 
			attributes.parallaxLineSpacing ? 1 : 0
		];
		return (
			<div {...useBlockProps.save(classes)} data-parallax={ options.join(',') } >
				<InnerBlocks.Content />
			</div>
		);
	}

	return (
		<div {...useBlockProps.save(classes)} >
			<InnerBlocks.Content />
		</div>
	);

}
