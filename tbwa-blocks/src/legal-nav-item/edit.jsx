import { __ } from '@wordpress/i18n';
import { useCallback, useEffect, useState, useRef } from '@wordpress/element';
import { InspectorControls, RichText, MediaUploadCheck, MediaUpload, BlockControls, useBlockProps, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { PanelBody, Popover, ToolbarDropdownMenu, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import './editor.scss';

import { link, linkOff } from '@wordpress/icons';

import { ReactComponent as IconMediaSelect } from "./icons/media-select.svg"; 
import { ReactComponent as IconMediaRemove } from "./icons/media-remove.svg"; 

export default function Edit(props) {

	const { attributes, setAttributes, className, isSelected, onReplace, mergeBlocks } = props;
	const { linkTarget, text, url, width } = attributes;

	function onToggleOpenInNewTab( value ) {
		const newLinkTarget = value ? '_blank' : undefined;
		setAttributes( { linkTarget: newLinkTarget } );
	}

	const ref = useRef();
	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! url;
	const opensInNewTab = linkTarget === '_blank';

	function startEditing( event ) {
		event.preventDefault();
		setIsEditingURL( true );
	}

	function unlink() {
		setAttributes( {
			url: undefined,
			linkTarget: undefined
		} );
		setIsEditingURL( false );
	}

	useEffect( () => {
		if ( ! isSelected ) {
			setIsEditingURL( false );
		}
	}, [ isSelected ] );


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

	const displayMedia = () => { 
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
			<InspectorControls>
				<PanelBody initialOpen={true} >
					<p>These images or videos should be square proportions. Ideally 1200x1200px. </p>
				</PanelBody>
			</InspectorControls>
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
					{ ! isURLSet && (
						<ToolbarButton
							name="link"
							icon={ link }
							title={ __( 'Link' ) }
							onClick={ startEditing }
						/>
					) }
					{ isURLSet && (
						<ToolbarButton
							name="link"
							icon={ linkOff }
							title={ __( 'Unlink' ) }
							onClick={ unlink }
							isActive={ true }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()} >
				{ isSelected && ( isEditingURL || isURLSet ) && (
					<Popover
						position="bottom left"
						onClose={ () => {
							setIsEditingURL( false );
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
								setAttributes( { url: newURL } );
								if ( opensInNewTab !== newOpensInNewTab ) {
									onToggleOpenInNewTab( newOpensInNewTab );
								}
							} }
							onRemove={ () => {
								unlink();
							} }
							forceIsEditingLink={ isEditingURL }
						/>
					</Popover>
				) }
				<div className={ 'center background-'+attributes.background } >
					<div className='media' >
						{ displayMedia() }
					</div>
					<RichText
						identifier="title"
						value={ attributes.title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
						allowedFormats={[]}
						tagName='a' 
						placeholder='Title...'
					/>
				</div>
			</div>
		</>
	);
}


