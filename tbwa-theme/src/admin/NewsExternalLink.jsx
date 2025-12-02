import { TextControl } from '@wordpress/components';
import { dispatch, select, useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { Component } from '@wordpress/element';



export default class NewsExternalLink extends Component { 

	render() {

		const postType = select('core/editor').getCurrentPostType();
		if (postType !== 'tbwa-news') {
			return null;
		}

		const meta = select('core/editor').getEditedPostAttribute('meta');
		
		if (meta == null) { 
			return (<></>);
		}

		const setMeta = (value) => { 
			dispatch('core/editor').editPost({
				meta: {'_tbwa_meta_tags_news_external_link': value },
			});
			this.forceUpdate();
		}

		return (
			<PluginDocumentSettingPanel name="tbwa-meta-news-external-link" title='External Link' open={true} >
				<TextControl
					label="If a valid URL to an external site is set here, this news item will link to the external site instead of showing a page on this site."
					value={ meta['_tbwa_meta_tags_news_external_link'] }
					onChange={ (value) => { setMeta(value) } }
				/>
			</PluginDocumentSettingPanel>
		);
	}
	
}

