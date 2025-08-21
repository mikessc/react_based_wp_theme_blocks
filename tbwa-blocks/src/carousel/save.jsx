import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';


export default function save({ attributes }) {

	return (
		<div {...useBlockProps.save({'className':'indicator-'+attributes.indicator})} >
			<div>
				<div className='items'>
					<InnerBlocks.Content />
				</div>
				<div className='indicators'>
					<div className="indicator-min" ></div>
					<div className="indicator" >
						<div className="indicator-base" ></div>
						<div className="indicator-knob" ></div>
					</div>
					<div className="indicator-max" ></div>
				</div>
			</div>
		</div>
	);
}
