import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes }) {

	return (
		<>
			<div {...useBlockProps()} >
				<InnerBlocks 
					templateLock='All'  
					template={[
						['tbwa-blocks/stacked-cards-item'],
						['tbwa-blocks/stacked-cards-item'],
						['tbwa-blocks/stacked-cards-item'],
						['tbwa-blocks/stacked-cards-item']
					]} 
					allowedBlocks={ [ 'tbwa-blocks/stacked-cards-item' ] } 
				/> 
			</div>
		</>
	);
}

