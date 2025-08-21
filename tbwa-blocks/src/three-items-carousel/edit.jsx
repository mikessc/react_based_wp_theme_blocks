import { InnerBlocks, BlockControls, useBlockProps, RichText } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { createBlock, insertBlocks } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import './editor.scss';

import { ReactComponent as IconIndicatorsBlack } from "./icons/background-white.svg"; 
import { ReactComponent as IconIndicatorsWhite } from "./icons/background-black.svg"; 
import { ReactComponent as IconBackgroundYellow } from "./icons/background-yellow.svg"; 
import { ReactComponent as IconBackgroundWhite } from "./icons/background-white.svg"; 
import { ReactComponent as IconBackgroundBlack } from "./icons/background-black.svg"; 

import { ReactComponent as IconAddCarouselItem } from "./icons/add-carousel-item.svg";

import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes, clientId }) {

	const blocks = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
	const blockCount = blocks.length;
	const { text } = attributes;

	const addCarouselItem = () => { 
		const newBlock = createBlock('tbwa-blocks/three-items-carousel-item');
		dispatch('core/block-editor').insertBlocks(newBlock, blockCount, clientId);
	}

	const indicatorCurrentIcon = () => { 
		switch (attributes.indicator) { 
			case 'white': return IconIndicatorsWhite; break;
			case 'black': return IconIndicatorsBlack; break;
		}
	}

	const backgroundCurrentIcon = () => { 
		switch (attributes.background) { 
			case 'white': return IconBackgroundWhite; break;
			case 'black': return IconBackgroundBlack; break;
			case 'yellow': return IconBackgroundYellow; break;
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

	function setHeadingText( newText ) {
		setAttributes( { text: newText.replace( /<\/?a[^>]*>/g, '' ) } );
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
					<ToolbarDropdownMenu
						icon={ backgroundCurrentIcon() } 
						label="Background"
						controls={[
							makeControl(IconBackgroundYellow, 'background', 'black', 'Background black'),
							makeControl(IconBackgroundWhite, 'background', 'white', 'Background white'),
							makeControl(IconBackgroundBlack, 'background', 'yellow', 'Background yellow')
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

			<div {...useBlockProps({'className':'indicator-'+attributes.indicator+' background-'+attributes.background})} >
				<RichText
					allowedFormats={ [] }
					aria-label={ __( '3 Items Carousel Title' ) }
					placeholder={ __( '3 Items Block Heading...' ) }
					value={ text }
					onChange={ ( value ) => setHeadingText( value ) }
					withoutInteractiveFormatting
					identifier="text"
					className='h3'
				/>
				<InnerBlocks 
					template={[
						['tbwa-blocks/three-items-carousel-item']
					]} 
					allowedBlocks={ [ 'tbwa-blocks/three-items-carousel-item' ] } 
					renderAppender={ InnerBlocks.DefaultBlockAppender }
				/> 
			</div>
		</>
	);
}
