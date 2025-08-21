
import { __ } from '@wordpress/i18n';
import { InspectorControls, InnerBlocks, MediaUploadCheck, MediaUpload, BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToolbarDropdownMenu, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import './editor.scss';

import { ReactComponent as IconMediaSelect } from "./icons/media-select.svg"; 
import { ReactComponent as IconMediaRemove } from "./icons/media-remove.svg"; 



export default function Edit( {attributes, setAttributes} ) {


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
			<div className='no-media-selected'>No media selected</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody initialOpen={true} >
					<p>Ideal image size: 1180x664px.</p>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
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
				<div className="content">
					<InnerBlocks 
						templateLock={ false }  
						template={[
							['tbwa-blocks/heading', {'display':'h5', 'seo':'h5', 'content':'Stacked Card'}],
							['tbwa-blocks/rule-line', {'width':'narrow'}],
							['tbwa-blocks/paragraph'],
							['tbwa-blocks/paragraph'], 
							['tbwa-blocks/paragraph']
						]} 
					/> 
				</div>	
				<div className='media' >
					{ displayMedia() }
				</div>
			</div>
		</>
	);
}
