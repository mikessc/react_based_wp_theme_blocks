import { __ } from '@wordpress/i18n';
import { InnerBlocks, MediaUploadCheck, MediaUpload, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {

	return (
		<>
			<div {...useBlockProps()} >
				<InnerBlocks 
					template={[
						['tbwa-blocks/three-items-carousel-item-group'],
						['tbwa-blocks/three-items-carousel-item-group'],
						['tbwa-blocks/three-items-carousel-item-group']
					]} 
					renderAppender={ InnerBlocks.DefaultBlockAppender }
				/> 
			</div>
		</>
	);
}


