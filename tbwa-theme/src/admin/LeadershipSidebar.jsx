import { ToggleControl, TextControl, ToolbarButton, Button } from '@wordpress/components';
import { dispatch, select, useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { Component } from '@wordpress/element';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';



export default class LeadershipSidebar extends Component { 

	render() {

		const postType = select('core/editor').getCurrentPostType();
		if (postType !== 'tbwa-leadership') {
			return null;
		}

		const meta = select('core/editor').getEditedPostAttribute('meta');

		if (meta == null) { 
			return (<></>);
		}

		const keyPrefix = '_tbwa_leadership_card_';

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

		const MediaSelector = ({label, keyId, keyUrl}) => {
			return (<MediaUpload
				onSelect={(media) => {
					dispatch('core/editor').editPost({
						meta: {
							[keyPrefix+keyId]: media.id, 
							[keyPrefix+keyUrl]: mediaSizedURL(media)
						}
					});
					this.forceUpdate();
				}}
				allowedTypes={ ['image'] }
				value={ getMeta(keyId) }
				render={({open}) => {
					return <div>
						<div onClick={open}>
							{ 
								!getMeta(keyUrl)  
								? 
									<button style={{ height:'120px', height:'135px' }} className='components-button editor-post-featured-image__toggle' >{label}</button>
								:
									<img style={{ backgroundColor:'#f0f0f0', width:'120px', height:'135px', objectFit:'contain' }} src={ getMeta(keyUrl) } />
							}
						</div>
						{ 
							getMeta(keyUrl) 
							? 
							<Button variant="link" onClick={() => {
								dispatch('core/editor').editPost({
									meta: {
										[keyPrefix+keyId]: 0, 
										[keyPrefix+keyUrl]: ''
									}
								});
								this.forceUpdate();
							}} >Remove image</Button>
							:
							<div></div>
						}
					</div>
				}}
			/>);
		}

		return (
			<>
				<PluginDocumentSettingPanel name="tbwa-leadership-images" title='Card Images' >
					<MediaUploadCheck>
						<MediaSelector label='Select Image' keyId='image_id' keyUrl='image_url' />
						<p></p>
						<MediaSelector label='Select Hover Image' keyId='image_hover_id' keyUrl='image_hover_url' />
					</MediaUploadCheck>
					<p className="components-base-control__help css-1n1x27z">JPGs, 976x1098px.</p>
				</PluginDocumentSettingPanel>
				<PluginDocumentSettingPanel name="tbwa-leadership-description" title='Description' >
					<TextControl
						label="Description Line 1"
						help={getMeta('description1').length+"/36 characters, spaces included. "}
						value={ getMeta('description1') }
						onChange={ (value) => { setMeta('description1', value) } }
					/>
					<TextControl
						label="Description Line 2"
						help={getMeta('description2').length+"/36 characters, spaces included. "}
						value={ getMeta('description2') }
						onChange={ (value) => { setMeta('description2', value) } }
					/>
					<p className="components-base-control__help css-1n1x27z">These descriptions are shown on the leadership cards. </p>
				</PluginDocumentSettingPanel>
			</ >
		);
	}
	
}

