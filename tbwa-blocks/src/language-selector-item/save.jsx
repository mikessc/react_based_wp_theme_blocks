import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	return <option 
		{...useBlockProps.save()} 
		data-link-url={ attributes.linkUrl } 
		data-link-target={ attributes.linkTarget } 
		data-image-url={ attributes.mediaUrl }
		>{ attributes.title }</option>

}
