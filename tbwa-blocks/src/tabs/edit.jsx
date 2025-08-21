import { InnerBlocks, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { createBlock, insertBlocks } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import './editor.scss';

import { ReactComponent as IconAddButton } from "./icons/add-button.svg";

export default function Edit({ attributes, setAttributes, clientId }) {

	const buttons = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
	const buttonCount = buttons.length;

	const addButton = () => { 
		const newButton = createBlock('tbwa-blocks/tab');
		dispatch('core/block-editor').insertBlocks(newButton, buttonCount, clientId);
	}

	return (
		<>
			<BlockControls group="block">
				<ToolbarGroup>
					 <ToolbarButton
						icon={ IconAddButton }
						label="Add Button"
						onClick={ () => addButton() }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()} >
				<InnerBlocks 
					templateLock={ false }  
					template={[
						['tbwa-blocks/tab'],
						['tbwa-blocks/tab'],
						['tbwa-blocks/tab']
					]} 
					allowedBlocks={ [ 'tbwa-blocks/tab' ] } 
				/> 
			</div>
		</>
	);
}

