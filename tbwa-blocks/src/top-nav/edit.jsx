import { InnerBlocks, BlockControls, useBlockProps, MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarGroup, ToolbarButton, ToggleControl } from '@wordpress/components';
import { createBlock, insertBlocks } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import './editor.scss';

import { ReactComponent as IconAddButton } from "./icons/add-button.svg";
import { ReactComponent as IconSearch } from "./images/search.svg";
import { ReactComponent as LogoBackslash } from "./images/logo-backslash.svg";
import { ReactComponent as LogoTBWA } from "./images/logo-tbwa.svg";

import { ReactComponent as IconMediaSelect } from "./icons/media-select.svg"; 
import { ReactComponent as IconMediaRemove } from "./icons/media-remove.svg"; 

export default function Edit( props ) {

	const { attributes, setAttributes, clientId } = props;
	const [ hasFilter, setHasFilter ] = useState( attributes.filter );
	const [ hasSolidBG, setHasSolidBG ] = useState( attributes.solidBG );
	const buttons = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
	const buttonCount = buttons.length;

	const addButton = () => { 
		const newButton = createBlock('tbwa-blocks/top-nav-button');
		dispatch('core/block-editor').insertBlocks(newButton, buttonCount, clientId);
	}

	const selectMedia = (media) => {

		//  Large, full, then src
		var u = media.url;
			if (media.sizes) { 
			if (media.sizes.large) { 
				u = media.sizes.large.url;
			} else if (media.sizes.full) { 
				u = media.sizes.full.url;
			}
		}

		setAttributes({
			mediaId: media.id,
			mediaAlt: media.alt,
			mediaTitle: media.title,
			mediaUrl: u,
			mediaType: media.type,
			mediaMime: media.mime
		});
	}

	const removeMedia = () => {
		setAttributes({
			mediaId: 0,
			mediaAlt: '', 
			mediaTitle: '', 
			mediaUrl: '', 
			mediaType:'', 
			mediaMime:''
		});
	}

	const DisplayMedia = () => { 
		if (attributes.mediaType == 'image') { 
			return (
				<img 
					src={attributes.mediaUrl} 
					alt={attributes.mediaAlt} 
					title={attributes.mediaTitle} 
					loading="lazy" 
					width="400" 
					height="300" 
				/>
			);
		}
		if (attributes.mediaType == 'video') { 
			return (
				<video width="400" height="300" autoPlay loop muted >
					<source src={attributes.mediaUrl} type={attributes.mediaMime} />
				</video>
			);
		}
		return (
			''
		);
	}

	return (
		<>
			<BlockControls group="block">
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							value={attributes.mediaId}
							onSelect={selectMedia}
							allowedTypes={ ['image', 'video'] }
							render={ ( { open } ) => (
								<ToolbarButton
									label={'Select Media'}
									icon={IconMediaSelect}
									onClick={open}
								/>
							) }
						/>
						<ToolbarButton 
							label={'Remove Media'}
							icon={IconMediaRemove}
							onClick={removeMedia} 
						/>
					</MediaUploadCheck>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToggleControl
						label="Logo filter&nbsp;&nbsp;&nbsp;"
						checked={ hasFilter }
						onChange={ () => {
							setAttributes({
								filter: !hasFilter
							});
							setHasFilter( (state) => !state);
						} }
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToggleControl
						label="Solid background"
						checked={ hasSolidBG }
						onChange={ () => {
							setAttributes({
								filter: !hasFilter,
								solidBG: !hasSolidBG
							});
							setHasFilter( (state) => !state);
							setHasSolidBG( (state) => !state);
						} }
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					 <ToolbarButton
						icon={ IconAddButton }
						label="Add Button"
						onClick={ () => addButton() }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()} >
				<div className="column-outer" >
					<div className="column">
						<div className="logo">
							<DisplayMedia />
						</div>
						<div className="buttons">
							<InnerBlocks 
								orientation="horizontal"
								template={[
									['tbwa-blocks/top-nav-button'],
									['tbwa-blocks/top-nav-button'],
									['tbwa-blocks/top-nav-button']
								]} 
								allowedBlocks={ [ 'tbwa-blocks/top-nav-button' ] } 
								renderAppender={ InnerBlocks.DefaultBlockAppender }
							/> 
						</div>
						<div className="search">
							<IconSearch className="show" />
						</div> 
					</div>
				</div>
			</div>
		</>
	);
}

