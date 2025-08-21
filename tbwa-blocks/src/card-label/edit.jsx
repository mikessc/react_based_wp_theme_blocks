import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {

	var cardCopyTemplate = [
		['tbwa-blocks/paragraph', { size: 'small' }]
	];

	return (
		<>
			<div {...useBlockProps()} >
				<InnerBlocks 
					templateLock='all'  
					template={cardCopyTemplate} 
				/> 
			</div>
		</>
	);
}
