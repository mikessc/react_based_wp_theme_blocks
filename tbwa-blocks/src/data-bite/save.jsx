import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	return (
		<div {...useBlockProps.save()} >
			<RichText.Content
				tagName='div'
				className='content' 
				value={attributes.content}
			/>
			<RichText.Content
				tagName='div'
				className='detail' 
				value={attributes.detail}
			/>
		</div>
	);
}
