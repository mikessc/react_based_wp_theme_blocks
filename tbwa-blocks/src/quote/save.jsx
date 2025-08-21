import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	return (
		<RichText.Content
			{...useBlockProps.save()}
			tagName='blockquote'
			value={attributes.content}
		/>
	);
}
