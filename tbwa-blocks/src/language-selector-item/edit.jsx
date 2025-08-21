import { __ } from '@wordpress/i18n';
import { useCallback, useEffect, useState, useRef } from '@wordpress/element';

import { 
	MediaUploadCheck, 
	MediaUpload, 
	InspectorControls, 
	BlockControls, 
	RichText,
	__experimentalLinkControl as LinkControl, 
	useBlockProps
} from '@wordpress/block-editor';

import { 
	ToolbarDropdownMenu, 
	ToolbarButton, 
	ToolbarGroup, 
	PanelBody, 
	PanelRow, 
	Button, 
	Popover, 
	TextControl,
	ExternalLink, 
	SelectControl,  
	__experimentalNumberControl as NumberControl, 
} from '@wordpress/components';

import { 
	dispatch, 
	useSelect 
} from '@wordpress/data';

import { displayShortcut, isKeyboardEvent } from '@wordpress/keycodes';

import './editor.scss';

import { link as iconLink, linkOff as iconLinkOff } from '@wordpress/icons';

import { ReactComponent as IconMediaSelect } from "./icons/media-select.svg"; 
import { ReactComponent as IconMediaRemove } from "./icons/media-remove.svg"; 



export default function Edit( props ) {

	const { attributes, setAttributes, className, isSelected, onReplace, mergeBlocks } = props;
	const { linkUrl, linkTarget } = attributes;

	function onToggleOpenInNewTab( value ) {
		const newLinkTarget = value ? '_blank' : undefined;
		setAttributes({ linkTarget: newLinkTarget });
	}

	function onKeyDown( event ) {
		if ( isKeyboardEvent.primary( event, 'k' ) ) {
			startEditing( event );
		} else if ( isKeyboardEvent.primaryShift( event, 'k' ) ) {
			unlink();
			richTextRef.current?.focus();
		}
	}

	const ref = useRef();
	const richTextRef = useRef();
	const blockProps = useBlockProps( { ref, onKeyDown } );
	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! linkUrl;
	const opensInNewTab = linkTarget === '_blank';

	function startEditing( event ) {
		event.preventDefault();
		setIsEditingURL( true );
	}

	function unlink() {
		setAttributes({
			linkUrl: '',
			linkTarget: '_parent'
		});
		setIsEditingURL( false );
	}

	useEffect( () => {
		if ( ! isSelected ) {
			setIsEditingURL( false );
		}
	}, [ isSelected ] );


	const selectMedia = (media) => {
		var u = media.url;
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

	const displayMedia = () => { 
		if (attributes.mediaType == 'image') { 
			return (
				<img 
					src={attributes.mediaUrl} 
					alt={attributes.mediaAlt} 
					title={attributes.mediaTitle} 
					loading="lazy" 
					width="160" 
					height="160" 
				/>
			);
		}
		return (
			<div className="no-media-selected"></div>
		);
	}

	var url = linkUrl;

	return (
		<>
			<InspectorControls >
				<PanelBody initialOpen={ true } >
					<p>Language Selector images must be 42x28px PNG images.</p>
				</PanelBody>
			</InspectorControls >
			<BlockControls group="block">
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							value={attributes.mediaId}
							onSelect={selectMedia}
							allowedTypes={ ['image'] }
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
					{ ! isURLSet && (
						<ToolbarButton
							name="link"
							icon={ iconLink }
							title={ __( 'Link' ) }
							shortcut={ displayShortcut.primary( 'k' ) } 
							onClick={ startEditing }
						/>
					) }
					{ isURLSet && (
						<ToolbarButton
							name="link"
							icon={ iconLinkOff }
							title={ __( 'Unlink' ) }
							shortcut={ displayShortcut.primaryShift( 'k' ) }
							onClick={ unlink }
							isActive={ true }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>{ isSelected && ( isEditingURL || isURLSet ) && (
				<Popover
					position="bottom left"
					onClose={ () => {
						setIsEditingURL( false );
						richTextRef.current?.focus();
					} }
					anchorRef={ ref?.current }
					focusOnMount={ isEditingURL ? 'firstElement' : false }
					__unstableSlotName={ '__unstable-block-tools-after' }
				>
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ { url, opensInNewTab } }
						onChange={ ( {
							url: newURL = '',
							opensInNewTab: newOpensInNewTab,
						} ) => {
							setAttributes({ linkUrl: newURL });
							if ( opensInNewTab !== newOpensInNewTab ) {
								onToggleOpenInNewTab( newOpensInNewTab );
							}
						} }
						onRemove={ () => {
							unlink();
							richTextRef.current?.focus();
						} }
						forceIsEditingLink={ isEditingURL }
					/>
				</Popover>
			) }
			<div {...useBlockProps()} >
				{ displayMedia() }
				<RichText
					allowedFormats={ [] }
					placeholder={ __( 'Language name' ) }
					value={ attributes.title }
					onChange={ (value) => { 
						setAttributes({'title': value});
					}}
					withoutInteractiveFormatting
					identifier="text"
				/>
			</div>
		</>
	);


}


