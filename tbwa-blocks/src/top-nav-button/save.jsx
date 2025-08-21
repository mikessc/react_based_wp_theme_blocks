import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes, className }) {
	const { linkTarget, rel, text, title, url } = attributes;
	return (
		<div {...useBlockProps.save()} >
			<RichText.Content
				tagName="a"
				href={ url }
				title={ title }
				value={ text }
				target={ linkTarget }
				rel={ rel }
			/>
		</div>
	);
}



