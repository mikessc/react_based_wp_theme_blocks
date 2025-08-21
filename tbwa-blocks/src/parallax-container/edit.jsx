import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, CheckboxControl, RangeControl } from '@wordpress/components';

import './editor.scss';


export default function Edit({ attributes, setAttributes }) {

	var parallaxPluginEnabled = document.body.classList.contains('tbwa-parallax-enabled');
	
	return (
		<>
			{ parallaxPluginEnabled && 
			<InspectorControls key='parallax'>
				<PanelBody title='Parallax' initialOpen={true} >
					<CheckboxControl
						label='Enable Parallax'
						help='Parallax blocks are highlighted with a rainbow border in the admin.'
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
			</InspectorControls>
			}
			<div {...useBlockProps()}>
				<InnerBlocks 
					template={[]} 
				/>
			</div>
		</>
	);
}

