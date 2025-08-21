import { TextControl } from '@wordpress/components';
import { dispatch, select, useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { Component } from '@wordpress/element';



export default class NewsAuthor extends Component { 

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
				meta: {'_tbwa_meta_tags_news_author': value },
			});
			this.forceUpdate();
		}

		return (
			<PluginDocumentSettingPanel name="tbwa-meta-news-author" title='Author' open={true} >
				<TextControl
					label='"Author" text shown on a news featured card.'
					value={ meta['_tbwa_meta_tags_news_author'] }
					onChange={ (value) => { setMeta(value) } }
				/>
			</PluginDocumentSettingPanel>
		);
	}
	
}

