import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const displayClasses = [attributes.size];
	if (attributes.marginBottom) { 
		if (attributes.marginBottom != '' && attributes.marginBottom != 'none') { 
			displayClasses.push('margin-bottom-'+attributes.marginBottom);
		}
	}

	return (
		<div {...useBlockProps.save()} >
			<RichText.Content
				tagName='p'
				className={ displayClasses.join(' ') }
				value={attributes.content}
			/>
		</div>
	);
}
