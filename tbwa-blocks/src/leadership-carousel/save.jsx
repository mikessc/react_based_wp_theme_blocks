import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';

import { ReactComponent as ImageLeft } from "./images/arrow-left.svg"; 
import { ReactComponent as ImageRight } from "./images/arrow-right.svg"; 

export default function save({ attributes }) {
	const { text, ctaText } = attributes;

	return (
		<>
			<div className={"carousel-heading wp-block-tbwa-blocks-section width-standard background-"+attributes.background}>
				<div>
					<RichText.Content
						tagName="h3"
						value={ text }
						class="h3"
					/>
				</div>
			</div>
			<div {...useBlockProps.save({'className':'indicator-'+attributes.indicator+' background-'+attributes.background})} >
				<div>
					<div className='items'>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
			<div className={"inserted-carousel-cta wp-block-tbwa-blocks-section width-standard background-"+attributes.background}>
			</div>
		</>
	);
}
