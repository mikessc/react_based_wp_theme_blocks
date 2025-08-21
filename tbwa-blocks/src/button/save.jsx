import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes, className }) {
	const { fontSize, linkTarget, rel, style, text, title, url, width } = attributes;
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


