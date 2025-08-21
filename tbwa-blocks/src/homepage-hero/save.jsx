import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';


export default function save({ attributes }) {

	return (
		<div {...useBlockProps.save()} >
			<div className='items'>
				<InnerBlocks.Content />
			</div>
			<div className='hero-column' >
				<div className="bottom-container">
					<div className='indicators'>
						<div className="indicator-min" >1</div>
						<div className="indicator" >
							<div className="indicator-base" ></div>
							<div className="indicator-knob" ></div>
						</div>
						<div className="indicator-max" ></div>
					</div>
					<div className="controls">
						<button className="control start hide">
							<svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 13.0003V0.999512L10.75 6.99989L1 13.0003Z" fill="white" stroke="white" stroke-linejoin="round"/>
							</svg> Start
						</button>
						<button className="control stop">
							<svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect x="1" y="1" width="16" height="16" rx="1" stroke="white"/>
							</svg> Stop
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
