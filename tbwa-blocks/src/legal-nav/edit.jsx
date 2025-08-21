import { InnerBlocks, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { createBlock, insertBlocks } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import './editor.scss';

import { ReactComponent as IconAddLegalNavItem } from "./icons/add-legal-nav-item.svg";

export default function Edit({ attributes, setAttributes, clientId }) {

	const blocks = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
	const blockCount = blocks.length;

	const addLegalNavItem = () => { 
		const newBlock = createBlock('tbwa-blocks/legal-nav-item');
		dispatch('core/block-editor').insertBlocks(newBlock, blockCount, clientId);
	}

	return (
		<>
			<BlockControls group="block">
				<ToolbarGroup>
					 <ToolbarButton
						icon={ IconAddLegalNavItem }
						label="Add Legal Nav Item"
						onClick={ () => addLegalNavItem() }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()} >
				<div>
					<InnerBlocks 
						template={[
							['tbwa-blocks/legal-nav-item'],
							['tbwa-blocks/legal-nav-item'],
							['tbwa-blocks/legal-nav-item'],
							['tbwa-blocks/legal-nav-item'],
							['tbwa-blocks/legal-nav-item']
						]} 
						allowedBlocks={ [ 'tbwa-blocks/legal-nav-item' ] } 
						renderAppender={ InnerBlocks.DefaultBlockAppender }
					/> 
				</div>
			</div>
		</>
	);
}
