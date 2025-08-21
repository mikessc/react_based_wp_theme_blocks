import { InspectorControls, InnerBlocks, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToolbarDropdownMenu, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { createBlock, insertBlocks } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import './editor.scss';

import { ReactComponent as IconAddGalleryItem } from "./icons/add-gallery-item.svg";

export default function Edit({ attributes, setAttributes, clientId }) {

	const blocks = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
	const blockCount = blocks.length;

	const addGalleryItem = () => { 
		const newBlock = createBlock('tbwa-blocks/gallery-item');
		dispatch('core/block-editor').insertBlocks(newBlock, blockCount, clientId);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody initialOpen={true} >
					<p>Ideally Gallery images should be 3840x2160px and videos 1920x1080px. </p>
					<p>They will be scaled to fill the entire browser window, with parts of the image or video cropped.</p>
					<p>Videos will be played as muted, looping videos. </p>
				</PanelBody>
			</InspectorControls>
			<BlockControls group="block">
				<ToolbarGroup>
					 <ToolbarButton
						icon={ IconAddGalleryItem }
						label="Add Gallery Item"
						onClick={ () => addGalleryItem() }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()} >
				
					<InnerBlocks 
						template={[
							['tbwa-blocks/gallery-item'],
							['tbwa-blocks/gallery-item'],
							['tbwa-blocks/gallery-item']
						]} 
						allowedBlocks={ [ 'tbwa-blocks/gallery-item' ] } 
						renderAppender={ InnerBlocks.DefaultBlockAppender }
					/> 
				</div>
			
		</>
	);
}
