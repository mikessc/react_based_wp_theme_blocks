import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';

import { ReactComponent as ImageLeft } from "./images/arrow-left.svg"; 
import { ReactComponent as ImageRight } from "./images/arrow-right.svg"; 

export default function save({ attributes }) {
	const { text } = attributes;

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
				<div className="arrows">
					<div className='arrow-left'></div>
					<div className='arrow-right'></div>
				</div>
				<div className='items'>
					<InnerBlocks.Content />
				</div>
				<div className='indicators'>
					<div className="indicator" >
						<div className="indicator-base" ></div>
						<div className="indicator-knob" ></div>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}
