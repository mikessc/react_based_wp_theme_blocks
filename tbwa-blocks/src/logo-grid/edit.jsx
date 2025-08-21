import { InnerBlocks, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { createBlock, insertBlocks } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import './editor.scss';

import { ReactComponent as IconAddLogoGridItem } from "./icons/add-logo-grid-item.svg";

export default function Edit({ attributes, setAttributes, clientId }) {

	const blocks = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
	const blockCount = blocks.length;

	const addLogoGridItem = () => { 
		const newBlock = createBlock('tbwa-blocks/logo-grid-item');
		dispatch('core/block-editor').insertBlocks(newBlock, blockCount, clientId);
	}

	return (
		<>
			<BlockControls group="block">
				<ToolbarGroup>
					 <ToolbarButton
						icon={ IconAddLogoGridItem }
						label="Add Logo Grid Item"
						onClick={ () => addLogoGridItem() }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()} >
				<InnerBlocks 
					template={[
						['tbwa-blocks/logo-grid-item'],
						['tbwa-blocks/logo-grid-item'],
						['tbwa-blocks/logo-grid-item'],
						['tbwa-blocks/logo-grid-item']
					]} 
					allowedBlocks={ [ 'tbwa-blocks/logo-grid-item' ] } 
					renderAppender={ InnerBlocks.DefaultBlockAppender }
				/> 
			</div>
		</>
	);
}
