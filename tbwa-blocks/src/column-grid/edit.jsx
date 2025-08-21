import { InnerBlocks, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { createBlock, insertBlocks } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import './editor.scss';

import { ReactComponent as IconAddColumn } from "./icons/add-column.svg";


export default function Edit({ attributes, setAttributes, clientId }) {

	const columns = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
	const columnCount = columns.length;

	const addColumn = () => { 
		const newColumn = createBlock('tbwa-blocks/column-grid-item');
		dispatch('core/block-editor').insertBlocks(newColumn, columnCount, clientId);
	}

	return (
		<>
			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarButton
						icon={ IconAddColumn }
						label="Add Column"
						onClick={ () => addColumn() }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()} >
				<InnerBlocks 
					orientation='horizontal'
					template={[
						['tbwa-blocks/column-grid-item'],
						['tbwa-blocks/column-grid-item']
					]} 
					allowedBlocks={ [ 'tbwa-blocks/column-grid-item' ] } 
					renderAppender={ InnerBlocks.DefaultBlockAppender }
				/> 
			</div>
		</>
	);
}
