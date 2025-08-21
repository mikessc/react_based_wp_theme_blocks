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
						['tbwa-blocks/heading', {'display':'h5', 'seo':'h3', 'content':'The Results'}],  
						['tbwa-blocks/column-grid', {}, [
							['tbwa-blocks/column-grid-item', {'desktop':4, 'tablet':4, 'mobile':2}, [
								['tbwa-blocks/data-bite']
							]],
							['tbwa-blocks/column-grid-item', {'desktop':4, 'tablet':4, 'mobile':2}, [
								['tbwa-blocks/data-bite']
							]],
							['tbwa-blocks/column-grid-item', {'desktop':4, 'tablet':4, 'mobile':2}, [
								['tbwa-blocks/data-bite']
							]],
							['tbwa-blocks/column-grid-item', {'desktop':4, 'tablet':4, 'mobile':2}, [
								['tbwa-blocks/data-bite']
							]],
							['tbwa-blocks/column-grid-item', {'desktop':4, 'tablet':4, 'mobile':2}, [
								['tbwa-blocks/data-bite']
							]],
							['tbwa-blocks/column-grid-item', {'desktop':4, 'tablet':4, 'mobile':2}, [
								['tbwa-blocks/data-bite']
							]]
						]]
					]} 
				/> 
			</div>
		</>
	);
}

