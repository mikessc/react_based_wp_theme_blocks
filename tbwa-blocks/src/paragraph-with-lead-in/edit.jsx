import { __ } from '@wordpress/i18n';
import { BlockControls, RichText, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarButton, ToolbarGroup, Path, SVG, PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import './editor.scss';

import { ReactComponent as IconSizeStandard } from './icons/size-standard.svg';
import { ReactComponent as IconSizeLarge } from './icons/size-large.svg';

export default function Edit({ attributes, setAttributes }) {

	const sizeCurrentIcon = () => { 
		switch (attributes.size) { 
			case 'standard': return IconSizeStandard; break;
			case 'large': return IconSizeLarge; break;
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
			<BlockControls group='block'>
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={ sizeCurrentIcon() } 
						label='Size'
						controls={[
							makeControl(IconSizeStandard, 'size', 'standard', 'Standard'),
							makeControl(IconSizeLarge,    'size', 'large', 'Large'),
						]}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()} >
				<div className={attributes.size} >
					<RichText
						identifier='leadIn'
						className='lead-in'
						value={attributes.leadIn}
						onChange={ ( value ) =>
							setAttributes( { leadIn: value } )
						}
						tagName='p' 
						allowedFormats={['core/bold', 'core/italic', 'core/link']}
						placeholder='Lead-in...'
						data-empty={attributes.leadIn ? false : true}
					/>
					<RichText
						identifier='content'
						className='content'
						value={attributes.content}
						onChange={ ( value ) =>
							setAttributes( { content: value } )
						}
						tagName='p' 
						allowedFormats={['core/bold', 'core/italic', 'core/link']}
						placeholder='Lorem ipsum dolor emit...'
						data-empty={attributes.content ? false : true}
					/>
				</div>
			</div>
		</>
	);
}


