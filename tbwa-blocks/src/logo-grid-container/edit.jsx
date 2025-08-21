import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		<>
			<div {...useBlockProps()} >
				<InnerBlocks 
					templateLock={ false }  
					template={[
						['tbwa-blocks/rule-line'],
						['tbwa-blocks/heading', {'display':'h5', 'seo':'h3', 'content':'Our Clients'}],  
						['tbwa-blocks/logo-grid']
					]} 
				/> 
			</div>
		</>
	);
}

