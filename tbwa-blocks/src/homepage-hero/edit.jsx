import { InspectorControls, InnerBlocks, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToolbarDropdownMenu, ToolbarGroup, ToolbarButton, SelectControl } from '@wordpress/components';
import { createBlock, insertBlocks } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import './editor.scss';

import { ReactComponent as IconAddItem } from "./icons/add-item.svg";

//  Edit
export default function Edit({ attributes, setAttributes, clientId }) {

	const blocks = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
	const blockCount = blocks.length;

	const addItem = () => { 
		const newBlock = createBlock('tbwa-blocks/homepage-hero-item');
		dispatch('core/block-editor').insertBlocks(newBlock, blockCount, clientId);
	}

	return (
		<>
			<InspectorControls >
				<PanelBody title="Background Color" initialOpen={false} >
					<SelectControl
						label="Background Color"
						value={ attributes.backgroundColor }
						options={ [
							{ label: 'Black', value: 'black' },
							{ label: 'White', value: 'white' },
						] }
						onChange={(value) => setAttributes({ 'backgroundColor': value })}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls group="block">
				<ToolbarGroup>
					 <ToolbarButton
						icon={ IconAddItem }
						label="Add Homepage Hero Section"
						onClick={ () => addItem() }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps({'className':'background-'+attributes.backgroundColor})} >
				<div className='items' >
					<InnerBlocks 
						template={[
							['tbwa-blocks/homepage-hero-item'],
							['tbwa-blocks/homepage-hero-item'],
							['tbwa-blocks/homepage-hero-item']
						]} 
						allowedBlocks={ [ 'tbwa-blocks/homepage-hero-item' ] } 
						renderAppender={ InnerBlocks.DefaultBlockAppender }
					/> 
				</div>
			</div>
		</>
	);
}


