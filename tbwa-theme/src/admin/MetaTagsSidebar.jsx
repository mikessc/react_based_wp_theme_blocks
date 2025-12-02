import { ToggleControl, TextControl, ToolbarButton, Button } from '@wordpress/components';
import { dispatch, select, useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { Component } from '@wordpress/element';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';



export default class MetaTagsSidebar extends Component { 

	render() {

		const meta = select('core/editor').getEditedPostAttribute('meta');

		if (meta == null) { 
			return (<></>);
		}

		const keyPrefix = '_tbwa_meta_tags_';
		const keyMediaId = keyPrefix+'og_media_id';
		const keyMediaUrl = keyPrefix+'og_media_url';

		const setMeta = (key, value) => { 
			dispatch('core/editor').editPost({
				meta: {[keyPrefix+key]: value },
			});
			this.forceUpdate();
		}

		const getMeta = (key) => { 
			if (meta[keyPrefix+key] == undefined) {
				return '';
			}
			return meta[keyPrefix+key];
		}

		const mediaSizedURL = (media) => { 
			var u = media.url;
			if (media.sizes.medium) { 
				u = media.sizes.medium.url;
			} else if (media.sizes.large) { 
				u = media.sizes.large.url;
			} else if (media.sizes.full) { 
				u = media.sizes.full.url;
			}
			return u;
		}

		return (
			<PluginDocumentSettingPanel name="tbwa-meta-tags" title='Meta Tags' >
				<TextControl
					label="Title"
					help={getMeta('title').length+"/60 characters. If longer it will be truncated in search results. "}
					value={ getMeta('title') }
					onChange={ (value) => { setMeta('title', value) } }
				/>
				<TextControl
					label="Description"
					help={getMeta('description').length+"/160 characters. If longer it will be truncated in search results. "}
					value={ getMeta('description') }
					onChange={ (value) => { setMeta('description', value) } }
				/>
				<TextControl
					label="Keywords"
					help="No more than 10% of page word count. Ideally incorporate keywords into the page headings and image alt tags."
					value={ getMeta('keywords') }
					onChange={ (value) => { setMeta('keywords', value) } }
				/>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={(media) => {
							dispatch('core/editor').editPost({
								meta: {
									[keyMediaId]: media.id, 
									[keyMediaUrl]: mediaSizedURL(media)
								}
							});
							this.forceUpdate();
						}}
						allowedTypes={ ['image'] }
						value={ getMeta('og_media_id') }
						render={({open}) => {
							return <div>
								<div onClick={open}>
									{ 
										!getMeta('og_media_url')  
										? 
											<button style={{ height:'131px' }} className='components-button editor-post-featured-image__toggle' >Select Open Graph Image</button>
										:
											<img style={{ backgroundColor:'#f0f0f0', width:'100%', height:'131px', objectFit:'contain' }} src={ getMeta('og_media_url') } />
									}
								</div>
								{ 
									getMeta('og_media_url') 
									? 
									<Button variant="link" onClick={() => {
										dispatch('core/editor').editPost({
											meta: {
												[keyMediaId]: 0, 
												[keyMediaUrl]: ''
											}
										});
										this.forceUpdate();
									}} >Remove image</Button>
									:
									<div></div>
								}
							</div>
						}}
					/>
				</MediaUploadCheck>
				<p className="components-base-control__help css-1n1x27z">JPG, with pixel dimensions of 1200x630px.</p>
			</PluginDocumentSettingPanel>
		);
	}
	
}

