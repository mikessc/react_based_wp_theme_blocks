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
	useBlockProps, 
	__experimentalLinkControl as LinkControl
} from '@wordpress/block-editor';

import { 
	ToolbarDropdownMenu, 
	ToolbarButton, 
	ToolbarGroup, 
	PanelBody, PanelRow, 
	Button, 
	Popover, 
	TextControl,
	TextareaControl, 
	ToggleControl, 
	ExternalLink, 
	RangeControl,  
	SelectControl,  
	CheckboxControl, 
} from '@wordpress/components';

import { dispatch, select, useSelect } from '@wordpress/data';
import './editor.scss';

import { link as iconLink, linkOff as iconLinkOff } from '@wordpress/icons';

import { ReactComponent as IconBackgroundWhite } from './icons/background-white.svg'; 
import { ReactComponent as IconBackgroundBlack } from './icons/background-black.svg'; 
import { ReactComponent as IconMediaSelect } from './icons/media-select.svg'; 
import { ReactComponent as IconMediaRemove } from './icons/media-remove.svg'; 

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
					loading='lazy' 
					width='400' 
					height='300' 
				/>
			);
		}
		if (attributes.mediaType == 'video') { 
			return (
				<video width='400' height='300' autoPlay loop muted >
					<source src={attributes.mediaUrl} type={attributes.mediaMime} />
				</video>
			);
		}
		return (
			<div className='no-media-selected'>No Media Selected</div>
		);
	}

	const displayClasses = () => { 
		return ['media-type-'+attributes.mediaType, 'background-'+attributes.background].join(' ');
	}

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

	const CategoryTags = () => {

		const categories = useSelect((select) => {
			const catIds = select('core/editor').getEditedPostAttribute('tbwa-work-category');
			if (catIds == null) {  
				return null;
			}
			if (catIds.length <= 0) { 
				return [];
			}
			return select('core').getEntityRecords('taxonomy', 'tbwa-work-category', { include: catIds.join(','), per_page: -1 });
		});

		if (categories == null) {
			return <p></p>;
		}

		var tags = [];
		for (var i=0; i<categories.length; i++) { 
			var category = categories[i];
			tags.push();
		}

		return (
			<div className='tbwa-tag-categories right' >{ categories.map((category, i) => <a key={i} href={category.link} target='' >{category.name}</a>) }</div>
		);

	};

	function unlink() {
		item.link.url = ''; 
		item.link.target = '_blank'; 
		setAttributes({'items': items}); 
		setIsEditingURL(false);
	}

	function link( event ) {
		event.preventDefault();
		setIsEditingURL(true);
	}

	const [ isEditingURL, setIsEditingURL ] = useState( false );

	return (
		<>
			<InspectorControls >
				<PanelBody title="Background Color" initialOpen={false} >
					<SelectControl
						value={ attributes.background }
						options={ [
							{ label: 'Black', value: 'black' },
							{ label: 'White', value: 'white' },
						] }
						onChange={(value) => setAttributes({ 'background': value })}
					/>
				</PanelBody>
				<PanelBody title="Headings" initialOpen={true} >
					<PanelRow >
						<TextControl
							label="Title"
							value={ attributes.title }
							onChange={(value) => setAttributes({ 'title': value })}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label="Client"
							value={ attributes.client }
							onChange={(value) => setAttributes({ 'client': value })}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label="Agency"
							value={ attributes.agency }
							onChange={(value) => setAttributes({ 'agency': value })}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title="CTA Circle" initialOpen={false} >
					<PanelRow >
						<ToggleControl
							label="Enabled"
							checked={ attributes.ctaEnabled }
							onChange={(value) => setAttributes({ 'ctaEnabled': value })}
						/>
					</PanelRow>
					<PanelRow >
						<TextControl
							label="Text"
							value={ attributes.ctaText }
							onChange={(value) => setAttributes({ 'ctaText': value })}
						/>
					</PanelRow>
						{ attributes.ctaUrl == '' && (
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
						{ attributes.ctaUrl != '' && (
							<>
							<PanelRow>
								<ExternalLink variant="link" href={attributes.ctaUrl} target={attributes.ctaTarget} >{attributes.ctaUrl}</ExternalLink>
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
										'url': attributes.ctaUrl, 
										'opensInNewTab': attributes.ctaTarget == '_blank' 
									}}
									onChange={ (value) => {
										setAttributes({
											'ctaUrl': value.url, 
											'ctaTarget': value.opensInNewTab ? '_blank': ''
										}); 
									}}
									onRemove={ unlink }
								/>
							</Popover>
						)}
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
				<div className={displayClasses()} >
					<div className='media'>
						{ displayMedia() }
					</div>
					<div className="column">
						<h2 className='h1 title'>{ attributes.title }</h2>
						<h3 className='h3 title'>{ attributes.client }</h3>
						<h3 className='h3 title'>{ attributes.agency }</h3>
						<CategoryTags />
						{ attributes.ctaEnabled && 
						<div className='cta'>
							<a href={ attributes.ctaUrl } target={ attributes.ctaTarget } >{ attributes.ctaText }</a>
						</div>
						}
						<div className='content' >
							<div className='wp-block-tbwa-blocks-rule-line'><div className='width-full'></div></div>
							<InnerBlocks 
								template={[
									['tbwa-blocks/column-grid', {}, [
										['tbwa-blocks/column-grid-item', {'desktop':6, 'tablet':6, 'mobile':4}, [
											['tbwa-blocks/heading', {'display': 'h6', seo: 'h6', 'content':'Overview'}]
										]],  
										['tbwa-blocks/column-grid-item', {'desktop':6, 'tablet':6, 'mobile':4}, [
											['tbwa-blocks/paragraph'],
										]]
									]],
								]} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


