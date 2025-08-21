import { __ } from '@wordpress/i18n';
import { InnerBlocks, MediaUploadCheck, MediaUpload, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import './editor.scss';

import { ReactComponent as IconBackgroundYellow } from "./icons/background-yellow.svg"; 
import { ReactComponent as IconBackgroundWhite } from "./icons/background-white.svg"; 
import { ReactComponent as IconBackgroundBlack } from "./icons/background-black.svg"; 

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
			''
		);
	}

	const backgroundCurrentIcon = () => { 
		switch (attributes.background) { 
			case 'yellow': return IconBackgroundYellow; break;
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

	return (
		<>
			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={ backgroundCurrentIcon() } 
						label="Background"
						controls={[
							makeControl(IconBackgroundYellow, 'background', 'yellow', 'Background yellow'),
							makeControl(IconBackgroundWhite, 'background', 'white', 'Background white'),
							makeControl(IconBackgroundBlack, 'background', 'black', 'Background black')
						]}
					/>
				</ToolbarGroup>
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
				<div className={ 'center background-'+attributes.background } >
					<div className='media' >
						{ displayMedia() }
					</div>
					<div className='content' >
						<div>
							<InnerBlocks 
								template={[
									['tbwa-blocks/heading'],
									['tbwa-blocks/paragraph']
								]} 
								renderAppender={ InnerBlocks.DefaultBlockAppender }
							/> 
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


