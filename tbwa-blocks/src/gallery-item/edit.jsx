import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUploadCheck, MediaUpload, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToolbarDropdownMenu, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import './editor.scss';

import { ReactComponent as IconMediaSelect } from "./icons/media-select.svg"; 
import { ReactComponent as IconMediaRemove } from "./icons/media-remove.svg"; 

export default function Edit({ attributes, setAttributes }) {

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
			<div className="no-media-selected">No Media Selected</div>
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
					<p>Ideally Gallery images should be 3840x2160px and videos 1920x1080px. </p>
					<p>They will be scaled to fill the entire browser window, with parts of the image or video cropped.</p>
					<p>Videos will be played as muted, looping videos. </p>
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
			</BlockControls>
			<div {...useBlockProps()} >
				{ displayMedia() }
			</div>
		</>
	);
}


