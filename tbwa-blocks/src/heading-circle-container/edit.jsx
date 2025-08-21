import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		<>
			<div {...useBlockProps()} >
				<InnerBlocks 
					templateLock={ false }  
					template={[
						['tbwa-blocks/heading-circle']
					]} 
				/> 
			</div>
		</>
	);
}

