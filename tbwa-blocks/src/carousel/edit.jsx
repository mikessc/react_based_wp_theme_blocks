import { InnerBlocks, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { createBlock, insertBlocks } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import './editor.scss';

import { ReactComponent as IconIndicatorsBlack } from "./icons/background-white.svg"; 
import { ReactComponent as IconIndicatorsWhite } from "./icons/background-black.svg"; 

import { ReactComponent as IconAddCarouselItem } from "./icons/add-carousel-item.svg";

export default function Edit({ attributes, setAttributes, clientId }) {

	const blocks = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
	const blockCount = blocks.length;

	const addCarouselItem = () => { 
		const newBlock = createBlock('tbwa-blocks/carousel-item');
		dispatch('core/block-editor').insertBlocks(newBlock, blockCount, clientId);
	}

	const indicatorCurrentIcon = () => { 
		switch (attributes.indicator) { 
			case 'white': return IconIndicatorsWhite; break;
			case 'black': return IconIndicatorsBlack; break;
		}
	}

	const makeControl = (icon, name, value, title) => { 
		return {
			'icon': icon, 
			'title': title,
			'isActive': attributes[name] == value, 
			'onClick': () => { 
				setAttributes({[name]:value});
			}
		}
	}

	return (
		<>
			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={ indicatorCurrentIcon() } 
						label="Indicator Color"
						controls={[
							makeControl(IconIndicatorsBlack, 'indicator', 'black', 'Indicators Black'),
							makeControl(IconIndicatorsWhite, 'indicator', 'white', 'Indicators White')
						]}
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					 <ToolbarButton
						icon={ IconAddCarouselItem }
						label="Add Carousel Item"
						onClick={ () => addCarouselItem() }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps({'className':'indicator-'+attributes.indicator})} >
				<div>
					<InnerBlocks 
						template={[
							['tbwa-blocks/carousel-item'],
							['tbwa-blocks/carousel-item'],
							['tbwa-blocks/carousel-item']
						]} 
						allowedBlocks={ [ 'tbwa-blocks/carousel-item' ] } 
						renderAppender={ InnerBlocks.DefaultBlockAppender }
					/> 
				</div>
			</div>
		</>
	);
}
