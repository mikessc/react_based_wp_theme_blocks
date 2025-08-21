
/* Based on core/button */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, BlockControls, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit( {attributes, setAttributes} ) {
	return (
		<>
			<div {...useBlockProps()} >
				<div className="column-title">
					<RichText
						allowedFormats={[]}
						placeholder={'Tab title…' }
						value={ attributes.title }
						onChange={ (value) => setAttributes({'title':value}) }
						withoutInteractiveFormatting
						identifier="text"
					/>
				</div>
				<div className="column-content">
					<InnerBlocks 
						templateLock={ false }  
						template={[
							['tbwa-blocks/image'],
							['tbwa-blocks/paragraph']
						]} 
					/> 
				</div>
			</div>
		</>
	);
}
