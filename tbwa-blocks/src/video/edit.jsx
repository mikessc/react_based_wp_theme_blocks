import { __ } from '@wordpress/i18n';
import { 
	useCallback, 
	useEffect, 
	useState, 
	useRef 
} from '@wordpress/element';
import { 
	InspectorControls, 
	MediaUploadCheck, 
	MediaUpload, 
	InnerBlocks, 
	BlockControls, 
	__experimentalLinkControl as LinkControl, 
	useBlockProps
} from '@wordpress/block-editor';
import { 
	ToolbarDropdownMenu, 
	ToolbarButton, 
	ToolbarGroup, 
	PanelBody, PanelRow, 
	Button, 
	Popover, 
	ExternalLink, 
	CheckboxControl, 
	__experimentalNumberControl as NumberControl, 
} from '@wordpress/components';

import './editor.scss';



//  Display a media item - image / video / none
const DisplayMedia = ({media}) => { 
	if (media) { 
		if (media.type == 'image') { 
			return (
				<img 
					src={media.url} 
					alt={media.alt} 
					loading='lazy' 
					width='400' 
					height='300' 
				/>
			);
		}
		if (media.type == 'video') { 
			return (
				<video width='400' height='300' autoPlay loop muted >
					<source src={media.url} type={media.mime} />
				</video>
			);
		}
	}
	return ''
}

//  Select and display selected media 
const MediaControl = ({name, allowedTypes, attributes, setAttributes}) => {


	const select = (media) => {

		var u = media.url;
		if (media.sizes) { 
			if (media.sizes.large) { 
				u = media.sizes.large.url;
			} else if (media.sizes.full) { 
				u = media.sizes.full.url;
			}
		}

		setAttributes({
			'id': media.id, 
			'alt': media.alt, 
			'title': media.title, 
			'url': u, 
			'type': media.type, 
			'mime': media.mime
		});
	}

	const remove = (bkgFore) => {
		setAttributes({
			'id': 0, 
			'alt': '', 
			'title': '', 
			'url': '', 
			'type': '', 
			'mime': '', 
			'desc': ''
		});
	}


	return (
		<PanelBody title={name} initialOpen={ true } >
			<PanelRow >
				<div>
					<MediaUploadCheck>
						<MediaUpload
							value={ attributes.id }
							onSelect={ select }
							allowedTypes={ allowedTypes }
							render={({open}) => {
								return <div className='wp-block-tbwa-blocks-video-media-select' >
									<div onClick={open}>
										{ attributes.url == '' ? <button >{ name }</button> : <DisplayMedia media={ attributes } /> }
									</div>
									{ attributes.url != '' && <Button variant="link" onClick={remove} >Remove</Button> }
								</div>
							}}
						/>
					</MediaUploadCheck>
				</div>
			</PanelRow >
		</PanelBody>
	);

}


//  Edit
export default function Edit({ attributes, setAttributes }) {
	return (
		<>
			<InspectorControls >
				<PanelBody>
					<p>Videos should be 1920x1080px or 3840x2160px MP4 video files.</p>
					<p>The preview video is played automatically and will loop continuously, muted.  Idealy the preview should be less than 2mb and not contain excessive motion or colours for accessibility reasons.</p>
					<p>The main video can be any size, and plays after the preview video has been clicked on. </p>
				</PanelBody>
				<MediaControl 
					name="Preview Video" 
					allowedTypes={['image', 'video']}
					attributes={ attributes.preview } 
					setAttributes={ (mediaAttributes) => { 
						setAttributes({'preview': mediaAttributes}); 
					} } 
				/>
				<MediaControl 
					name="Main Video" 
					allowedTypes={['video']}
					attributes={ attributes.principal } 
					setAttributes={ (mediaAttributes) => { 
						setAttributes({'principal': mediaAttributes}); 
					} } 
				/>
			</InspectorControls>
			<div {...useBlockProps()} >
				<DisplayMedia media={ attributes.preview } />
			</div>
		</>
	);
}


