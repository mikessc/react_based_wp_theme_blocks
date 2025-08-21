import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, CheckboxControl  } from '@wordpress/components';

import './editor.scss';


export default function Edit({ attributes, setAttributes }) {

	const parallaxPluginEnabled = document.body.classList.contains('tbwa-parallax-enabled');

	const classes = {'className':[
		'cols-desktop-'+attributes.desktop, 
		'cols-tablet-'+attributes.tablet, 
		'cols-mobile-'+attributes.mobile
	].join(' ')}

	return (
		<>
			<div {...useBlockProps(classes)}>
				<div className={ attributes.parallaxEnabled ? 'parallax-enabled' : '' }>
					<InnerBlocks 
						templateLock={ false }  
						template={[]} 
					/>
				</div>
			</div>
			<InspectorControls >
				<PanelBody title="Grid Columns" initialOpen={true} >
					<RangeControl 
						label='Desktop' 
						value={ attributes.desktop }
						onChange={(value) => setAttributes({ 'desktop': value })}
						min={0}
						max={12}
					/>
					<RangeControl 
						label='Tablet' 
						value={ attributes.tablet }
						onChange={(value) => setAttributes({ 'tablet': value })}
						min={0}
						max={12}
					/>
					<RangeControl 
						label='Mobile' 
						value={ attributes.mobile }
						onChange={(value) => setAttributes({ 'mobile': value })}
						min={0}
						max={4}
					/>
				</PanelBody>
				{ parallaxPluginEnabled && 
					<PanelBody title='Parallax' initialOpen={false} >
						<CheckboxControl
							label='Enable Parallax' 
							help='Columns with parallax enabled are highlighted with a rainbow border in the admin.'
							checked={ attributes.parallaxEnabled }
							onChange={() => setAttributes({ 'parallaxEnabled': !attributes.parallaxEnabled })}
						/>
						<RangeControl 
							label='Speed (%)' 
							help='The higher the speed the faster the item moves.  Negative speeds make the item appear from opposite direction. '
							value={ attributes.parallaxSpeed }
							onChange={(value) => setAttributes({ 'parallaxSpeed': value })}
							min={-100}
							max={100}
						/>
						<CheckboxControl
							label='Animate the opacity'
							checked={ attributes.parallaxOpacity }
							onChange={() => setAttributes({ 'parallaxOpacity': !attributes.parallaxOpacity })}
						/>
						<CheckboxControl
							label='Animate the line spacing'
							checked={ attributes.parallaxLineSpacing }
							onChange={() => setAttributes({ 'parallaxLineSpacing': !attributes.parallaxLineSpacing })}
						/>
					</PanelBody>
				}
			</InspectorControls>

		</>
	);
}

