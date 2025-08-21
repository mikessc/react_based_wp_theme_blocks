import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function save({ attributes }) {

	const classes = () => { 
		var a = [];
		if (attributes.enableParagraphSmall) { 
			a.push('enable-paragraph-small');
		}
		if (attributes.enableHeading) { 
			a.push('enable-heading');
		}
		if (attributes.enableParagraphStandard) { 
			a.push('enable-paragraph-standard');
		}
		return {'className':a.join(' ')};
	}
	
	if (attributes.linkUrl == '') { 
		return (
			<div {...useBlockProps.save(classes())} >
				<div className='tbwa-card' >
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}

	return (
		<div {...useBlockProps.save(classes())} >
			<div className='tbwa-card' >
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

