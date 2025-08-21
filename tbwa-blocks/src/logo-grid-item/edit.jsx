import { __ } from '@wordpress/i18n';
import { 
	useCallback, 
	useEffect, 
	useState, 
	useRef 
} from '@wordpress/element';
import { 
	MediaUploadCheck, 
	MediaUpload, 
	InspectorControls, 
	BlockControls, 
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

import './editor.scss';

import { link as iconLink, linkOff as iconLinkOff } from '@wordpress/icons';

import { ReactComponent as IconMediaSelect } from "./icons/media-select.svg"; 
import { ReactComponent as IconMediaRemove } from "./icons/media-remove.svg"; 

export default function Edit({ attributes, setAttributes }) {

	const [ isEditingURL, setIsEditingURL ] = useState( false );

	function unlink() {
		setAttributes({
			'linkUrl': '',
			'linkTarget': '_parent'
		}); 
		setIsEditingURL(false);
	}

	function link( event ) {
		event.preventDefault();
		setIsEditingURL(true);
	}

	function panelToggle(newState) { 
		if (newState) { 
			setAttributes({
				'itemOpen': index,
				'isEditingURL' : false
			}); 
		}
	}

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
			<InspectorControls >
				<PanelBody initialOpen={ true } >
					<p>Logo Grid images must be 320x320px transparent PNG images, with the logo solid black within the PNG.</p>
				</PanelBody>
				<PanelBody 
					title={ 'Link: (optional)' } 
					initialOpen={ true } 
					onToggle={ panelToggle }
					>
					<p></p>
					{ attributes.linkUrl == '' && (
						<PanelRow >
							<Button
								name="link"
								icon={ iconLink }
								title={ __( 'Link' ) }
								onClick={ link }
								style={ {'paddingLeft':'0px'} }
							>Select Link</Button>
						</PanelRow>
					)}
					{ attributes.linkUrl != '' && (
						<>
						<PanelRow>
							<ExternalLink variant="link" href={attributes.linkUrl} target={attributes.linkTarget} >{attributes.linkUrl}</ExternalLink>
						</PanelRow>
						<PanelRow >
							<Button
								name="unlink"
								icon={ iconLinkOff }
								title={ __( 'Unlink' ) }
								onClick={ unlink }
								style={ {'paddingLeft':'0px'} }
							>Remove Link</Button>
							<Button
								name="link"
								icon={ iconLink }
								title={ __( 'Link' ) }
								onClick={ link }
							>Edit Link</Button>
						</PanelRow>
						</>
					)}
					{ isEditingURL && (
						<Popover>
							<LinkControl 
								value={{
									'url': attributes.linkUrl, 
									'opensInNewTab': attributes.linkTarget == '_blank' 
								}}
								onChange={ (value) => {
									setAttributes({
										'linkUrl': value.url, 
										'linkTarget': value.opensInNewTab ? '_blank': '_parent'
									}); 
								}}
								onRemove={ unlink }
							/>
						</Popover>
					)}
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
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()} >
				{ displayMedia() }
			</div>
		</>
	);
}


