import { __ } from '@wordpress/i18n';

import { 
	useCallback, 
	useEffect, 
	useState, 
	useRef 
} from '@wordpress/element';

import { 
	InspectorControls, 
	BlockControls, 
	useBlockProps, 
} from '@wordpress/block-editor';

import { 
	ToolbarDropdownMenu, 
	ToolbarButton, 
	ToolbarGroup, 
	PanelBody, 
	PanelRow, 
	TextareaControl, 
	SelectControl
} from '@wordpress/components';

import { dispatch, select, useSelect } from '@wordpress/data';
import './editor.scss';

import { link as iconLink, linkOff as iconLinkOff } from '@wordpress/icons';

import { ReactComponent as IconBackgroundWhite } from './icons/background-white.svg'; 
import { ReactComponent as IconBackgroundBlack } from './icons/background-black.svg'; 

export default function Edit({ attributes, setAttributes }) {

	const backgroundCurrentIcon = () => { 
		switch (attributes.background) { 
			case 'white': return IconBackgroundWhite; break;
			case 'black': return IconBackgroundBlack; break;
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

	const timing = { 'animationDuration': (attributes.title.length*3)+'s' }

	return (
		<>
			<InspectorControls >
				<PanelBody title='Background Color' initialOpen={false} >
					<SelectControl
						value={ attributes.background }
						options={ [
							{ label: 'Black', value: 'black' },
							{ label: 'White', value: 'white' },
						] }
						onChange={(value) => setAttributes({ 'background': value })}
					/>
				</PanelBody>
				<PanelBody title='Ticker Text' initialOpen={false} >
					<PanelRow >
						<TextareaControl
							value={ attributes.title }
							onChange={(value) => setAttributes({ 'title': value })}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls group='block'>
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={ backgroundCurrentIcon() } 
						label='Background'
						controls={[
							makeControl(IconBackgroundWhite, 'background', 'white', 'White background'),
							makeControl(IconBackgroundBlack, 'background', 'black', 'Black background')
						]}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps({'className':'background-'+attributes.background})} >
				<div className='ticker-wrap'>
					<div className='ticker'  style={timing} >
						<span className='item-collection-1' style={timing}>
							<span className='item'>{ attributes.title }</span>
							<span className='item'>{ attributes.title }</span>
							<span className='item'>{ attributes.title }</span>
							<span className='item'>{ attributes.title }</span>
						</span>
						<span className='item-collection-2'>
							<span className='item'>{ attributes.title }</span>
							<span className='item'>{ attributes.title }</span>
							<span className='item'>{ attributes.title }</span>
							<span className='item'>{ attributes.title }</span>
						</span>
					</div>
				</div>
			</div>
		</>
	);
}


