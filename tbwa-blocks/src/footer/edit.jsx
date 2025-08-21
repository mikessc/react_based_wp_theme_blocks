import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import './editor.scss';


export default function Edit() {
	return (
		<>
			<div {...useBlockProps({'className':'background-black'})} >
				<div className="column" >
					<InnerBlocks 
						templateLock="all"  
						template={[
							['tbwa-blocks/footer-content'],
							['tbwa-blocks/footer-buttons']
						]} 
					/> 
				</div>
			</div>
		</>
	);
}
