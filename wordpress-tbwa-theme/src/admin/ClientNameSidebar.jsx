import { TextControl } from '@wordpress/components';
import { dispatch, select, useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { Component } from '@wordpress/element';



export default class ClientNameSidebar extends Component { 

	render() {

		const postType = select('core/editor').getCurrentPostType();
		if (postType !== 'tbwa-work') {
			return null;
		}

		const meta = select('core/editor').getEditedPostAttribute('meta');
		
		if (meta == null) { 
			return (<></>);
		}

		const setMeta = (value) => { 
			dispatch('core/editor').editPost({
				meta: {'_tbwa_meta_tags_client_name': value },
			});
			this.forceUpdate();
		}

		return (
			<PluginDocumentSettingPanel name="tbwa-meta-client-name" title='Client Name' >
				<TextControl
					label="This is shown with summaries of this work."
					value={ meta['_tbwa_meta_tags_client_name'] }
					onChange={ (value) => { setMeta(value) } }
				/>
			</PluginDocumentSettingPanel>
		);
	}
	
}

