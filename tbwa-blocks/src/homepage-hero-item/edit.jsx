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
	TextControl,
	ExternalLink, 
	RangeControl,  
	SelectControl,  
	CheckboxControl, 
	__experimentalNumberControl as NumberControl, 
} from '@wordpress/components';
import { dispatch, select, useSelect } from '@wordpress/data';
import { link as iconLink, linkOff as iconLinkOff } from '@wordpress/icons';

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
			'mime': ''
		});
	}

	return (
		<MediaUploadCheck>
			<MediaUpload
				value={ attributes.id }
				onSelect={ select }
				allowedTypes={ allowedTypes }
				render={({open}) => {
					return <div className='wp-block-tbwa-blocks-homepage-hero-media-select' >
						<div onClick={open}>
							{ attributes.url == '' ? <button >{ name }</button> : <DisplayMedia media={ attributes } /> }
						</div>
						{ attributes.url != '' && <Button variant="link" onClick={remove} >Remove</Button> }
					</div>
				}}
			/>
		</MediaUploadCheck>
	);

}


//  Edit
export default function Edit({ attributes, setAttributes }) {

	const [ isEditingURL, setIsEditingURL ] = useState( false );

	function unlink() {
		setAttributes({'linkURL':'', 'linkTarget':'_blank'}); 
		setIsEditingURL(false);
	}

	function link( event ) {
		event.preventDefault();
		setIsEditingURL(true);
	}

	return (
		<>
			<InspectorControls >
				<PanelBody 
					initialOpen={true} 
					className="wp-block-tbwa-blocks-homepage-hero-inspector" 
					>
					<PanelRow >
						<MediaControl 
							name="Background (3840x2160px JPG)" 
							allowedTypes={['image', 'video']}
							attributes={ attributes.background } 
							setAttributes={ (mediaAttributes) => { 
								setAttributes({'background': mediaAttributes}); 
							} } 
						/>
					</PanelRow>
					<PanelRow >
						<MediaControl 
							name="Foreground Masked" 
							allowedTypes={['image']}
							attributes={ attributes.foregroundOpen } 
							setAttributes={ (mediaAttributes) => { 
								setAttributes({'foregroundOpen': mediaAttributes}); 
							} } 
						/>
						<MediaControl 
							name="Foreground" 
							allowedTypes={['image']}
							attributes={ attributes.foregroundClosed } 
							setAttributes={ (mediaAttributes) => { 
								setAttributes({'foregroundClosed': mediaAttributes}); 
							} } 
						/>
					</PanelRow>
					<PanelRow >
						<TextControl
							label="Subtitle"
							hint="Appears first"
							value={ attributes.subtitle }
							onChange={ (value) => setAttributes({'subtitle': value}) }
						/>
					</PanelRow>
					<PanelRow >
						<TextControl
							label="Title"
							value={ attributes.title }
							onChange={ (value) => setAttributes({'title': value}) }
						/>
					</PanelRow>
					{ attributes.linkURL == '' && (
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
					{ attributes.linkURL != '' && (
						<>
							<PanelRow>
								<ExternalLink variant="link" href={attributes.linkURL} target={attributes.linkTarget} >{attributes.linkURL}</ExternalLink>
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
									'url': attributes.linkURL, 
									'opensInNewTab': attributes.linkTarget == '_blank' 
								}}
								onChange={ (value) => {
									var target = value.opensInNewTab ? '_blank': ''; 
									setAttributes({'linkURL': value.url, 'linkTarget': target}); 
								}}
								onRemove={ unlink }
							/>
						</Popover>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} >
				<div className='item' data-url={attributes.linkURL} data-target={attributes.linkTarget}>
					<div className='background'>
						<DisplayMedia media={attributes.background} />
					</div>
					<div className='column' >
						<div className='foreground-closed'>
							<DisplayMedia media={attributes.foregroundClosed} />
						</div>
						<div className='text'>
							<div className="wp-block-tbwa-blocks-paragraph">
								<p className="standard">{attributes.subtitle}</p>
							</div>
							<h4 className="h4" >{attributes.title}</h4>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


