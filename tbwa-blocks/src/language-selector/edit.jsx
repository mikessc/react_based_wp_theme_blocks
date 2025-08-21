import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	return (
		<>
			<InspectorControls >
				<PanelBody initialOpen={ true } >
					<PanelRow>
						<TextControl
							label="Instructions"
							value={ attributes.instructions }
							onChange={(value) => setAttributes({ 'instructions': value })}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls >
			<div {...useBlockProps()} >
				<div className='instructions' >{ attributes.instructions }</div>
				<div className='options' >
					<InnerBlocks 
						allowedBlocks={ [ 'tbwa-blocks/language-selector-item' ] } 
						template={[
							['tbwa-blocks/language-selector-item'],
							['tbwa-blocks/language-selector-item']
						]} 
					/> 
				</div>
			</div>
		</>
	);
}

